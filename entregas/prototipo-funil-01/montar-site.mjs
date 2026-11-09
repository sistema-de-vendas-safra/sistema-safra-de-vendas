// Monta a pasta do site do protótipo do funil-01 a partir das entregas · Node, sem dependências
// id: prototipo-funil-01 · versao 4 · rascunho · otavio: pendente (ver README.md desta pasta)
// Rodar da raiz do repositório:  node entregas/prototipo-funil-01/montar-site.mjs
//
// O que faz (decisão #101):
//   /            variante A da landing-page-01 (index.html, tokens.css, estilo.css)
//   /b/          variante B da landing-page-01 (index.html, estilo.css)
//   /quiz/       página do quiz-01 (index.html, poster-junior.jpg)
//   fontes/      ao lado de cada página que usa fonte própria (/fontes/ da variante A e /quiz/fontes/), os arquivos
//                de fonte de licença livre instalados pelo npm em nucleo/ferramentas/fontes/ (lista em fontes.json
//                daquela pasta) e a licença de cada um. Nada vem do Google nem de outro terceiro (10.7; v4, etapa 34).
//   /api/...     não é arquivo: é o garçom (entregas/garcom/garcom.mjs), pela configuração wrangler.toml
//
// Nos HTML montados (nunca nas entregas), acrescenta <meta charset="utf-8"> como primeiríssima linha quando
// não houver nos primeiros 1024 bytes (o quiz; v3, pedido 09), <meta name="robots" content="noindex, nofollow">
// quando não houver, a meta viewport (width=device-width) quando não houver, e troca o link do botão da landing para o quiz (caminho do repositório) por /quiz/.
// Depois confere cada caminho relativo de css, imagem, fonte e link nos arquivos montados, e que nenhuma página
// pede arquivo a outro endereço (folha de estilo, script, imagem, fonte ou @import de http, e nada de fonts.googleapis
// nem fonts.gstatic; v4). Os links que a pessoa clica (<a href="https://...">) não são pedidos da página e ficam.
// A pasta montada (site/) fica fora do Git (.gitignore). Ela é apagada e montada de novo a cada vez.

import { mkdirSync, rmSync, readFileSync, writeFileSync, copyFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../..');
const SITE = join(AQUI, 'site');

const LANDING = 'entregas/landings/landing-page-01';
// Fontes (10.7): os pacotes ficam em nucleo/ferramentas/fontes/node_modules (fora do Git); a lista, em fontes.json
const FONTES = 'nucleo/ferramentas/fontes';
const LISTA_FONTES = JSON.parse(readFileSync(join(RAIZ, FONTES, 'fontes.json'), 'utf8'));
const QUIZ = 'entregas/quizzes/quiz-01/pagina';
// O href do botão da landing para o quiz, como está nas entregas (caminho do repositório, para a revisão local)
const LINK_QUIZ_NO_REPOSITORIO = '../../../quizzes/quiz-01/pagina/index.html';
const LINK_QUIZ_NO_SITE = '/quiz/';
const META_ROBOTS = '<meta name="robots" content="noindex, nofollow">';
// O quiz não tem viewport (vem do mockup): sem ela, o celular desenha a página com 980 pixels e encolhe (23.8)
const META_VIEWPORT = '<meta name="viewport" content="width=device-width, initial-scale=1">';
// O quiz não tem <meta charset> nem doctype (vem do mockup): sem o charset, o navegador o lia como
// windows-1252 e os acentos quebravam (pedido 09). O navegador só procura o charset nos primeiros 1024 bytes,
// e o comentário de cabeçalho do quiz passa disso; por isso a meta vai antes de tudo. O doctype não entra
// aqui: muda o modo de desenho da página (pergunta 09.1).
const META_CHARSET = '<meta charset="utf-8">';
const BYTES_DO_CHARSET = 1024;
const temCharsetNoInicio = html => /<meta\s+charset=["']?utf-8["']?\s*\/?>/i.test(Buffer.from(html, 'utf8').subarray(0, BYTES_DO_CHARSET).toString('utf8'));

// O que vai para onde. Só estes arquivos entram no site (README.md e prints ficam no repositório).
const MAPA = [
  { de: LANDING + '/variante-a-design-system-v1', para: '', arquivos: ['index.html', 'tokens.css', 'estilo.css'], landing: true, fontes: 'landing-a' },
  { de: LANDING + '/variante-b-branco-e-verde', para: 'b', arquivos: ['index.html', 'estilo.css'], landing: true, fontes: 'landing-b' },
  { de: QUIZ, para: 'quiz', arquivos: ['index.html', 'poster-junior.jpg'], fontes: 'quiz' }
];
// Arquivos que o programa da página carrega sem estar num atributo src ou href
const CARREGADOS_PELO_PROGRAMA = { 'quiz/index.html': ['poster-junior.jpg'] };

const problemas = [];
const problema = t => problemas.push(t);

// Acrescenta a meta noindex se não houver: depois de <head>, ou antes do <title> quando a página não tem <head>
function garantirNoindex(html, nome) {
  if (/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)) return { html, acrescentou: false };
  let novo;
  if (/<head(\s[^>]*)?>/i.test(html)) novo = html.replace(/<head(\s[^>]*)?>/i, m => m + '\n' + META_ROBOTS);
  else if (/<title[\s>]/i.test(html)) novo = html.replace(/<title[\s>]/i, m => META_ROBOTS + '\n' + m);
  else { problema(nome + ': sem <head> nem <title> para pôr a meta noindex'); return { html, acrescentou: false }; }
  return { html: novo, acrescentou: true };
}

// Acrescenta a meta viewport se não houver, antes do <title> (só no site montado; a entrega não muda)
function garantirViewport(html, nome) {
  if (/<meta\s+name=["']viewport["']/i.test(html)) return { html, acrescentou: false };
  if (!/<title[\s>]/i.test(html)) { problema(nome + ': sem <title> para pôr a meta viewport antes'); return { html, acrescentou: false }; }
  return { html: html.replace(/<title[\s>]/i, m => META_VIEWPORT + '\n' + m), acrescentou: true };
}

// Acrescenta a meta charset como primeiríssima linha se não houver nos primeiros 1024 bytes
function garantirCharset(html) {
  if (temCharsetNoInicio(html)) return { html, acrescentou: false };
  return { html: META_CHARSET + '\n' + html, acrescentou: true };
}

// ··· 1. Montar ···
if (!SITE.startsWith(AQUI + '/')) throw new Error('pasta do site fora de entregas/prototipo-funil-01');
rmSync(SITE, { recursive: true, force: true });
const relatorio = [];
for (const item of MAPA) {
  const destino = join(SITE, item.para);
  mkdirSync(destino, { recursive: true });
  for (const arq of item.arquivos) {
    const origem = join(RAIZ, item.de, arq);
    if (!existsSync(origem)) { problema('falta na entrega: ' + relative(RAIZ, origem)); continue; }
    const alvo = join(destino, arq);
    const nomeNoSite = posix.join(item.para, arq);
    if (!arq.endsWith('.html')) { copyFileSync(origem, alvo); relatorio.push(nomeNoSite + ' (cópia)'); continue; }
    let html = readFileSync(origem, 'utf8');
    const mudancas = [];
    if (item.landing) {
      const vezes = html.split('href="' + LINK_QUIZ_NO_REPOSITORIO + '"').length - 1;
      if (vezes !== 1) problema(nomeNoSite + ': esperava 1 link para o quiz no caminho do repositório, achou ' + vezes);
      html = html.replace('href="' + LINK_QUIZ_NO_REPOSITORIO + '"', 'href="' + LINK_QUIZ_NO_SITE + '"');
      if (vezes === 1) mudancas.push('link do quiz trocado por ' + LINK_QUIZ_NO_SITE);
    }
    const c = garantirCharset(html);
    html = c.html;
    mudancas.push(c.acrescentou ? 'meta charset acrescentada na primeira linha' : 'meta charset já existia no início');
    const r = garantirNoindex(html, nomeNoSite);
    html = r.html;
    mudancas.push(r.acrescentou ? 'meta noindex acrescentada' : 'meta noindex já existia');
    const v = garantirViewport(html, nomeNoSite);
    html = v.html;
    mudancas.push(v.acrescentou ? 'meta viewport acrescentada' : 'meta viewport já existia');
    writeFileSync(alvo, html);
    relatorio.push(nomeNoSite + ' (' + mudancas.join('; ') + ')');
  }
}

// ··· 1b. Fontes de cada página (10.7): o arquivo de fonte e a licença do pacote, em fontes/ ao lado da página ···
for (const item of MAPA) {
  const lista = LISTA_FONTES[item.fontes] || [];
  if (!lista.length) continue;
  const pasta = join(SITE, item.para, 'fontes');
  mkdirSync(pasta, { recursive: true });
  for (const f of lista) {
    const dir = join(RAIZ, FONTES, 'node_modules', f.pacote);
    const origem = join(dir, 'files', f.arquivo);
    if (!existsSync(origem)) { problema('falta a fonte ' + f.pacote + '/' + f.arquivo + ': rodar npm install em ' + FONTES + '/'); continue; }
    copyFileSync(origem, join(pasta, f.arquivo));
    const licenca = join(dir, 'LICENSE');
    const nomeLicenca = 'licenca-' + f.pacote.split('/').pop() + '.txt';
    if (existsSync(licenca)) copyFileSync(licenca, join(pasta, nomeLicenca));
    else problema('falta a licença de ' + f.pacote);
    relatorio.push(posix.join(item.para, 'fontes', f.arquivo) + ' (cópia de ' + f.pacote + ', com ' + nomeLicenca + ')');
  }
}

// ··· 2. Conferir os caminhos depois da montagem ···
function listar(pasta) {
  return readdirSync(pasta).flatMap(n => {
    const c = join(pasta, n);
    return statSync(c).isDirectory() ? listar(c) : [c];
  });
}
const arquivosDoSite = listar(SITE).map(c => relative(SITE, c).split('\\').join('/'));
// Caminho no site, a partir de uma referência dentro de um arquivo (sem a busca e o #)
function resolverNoSite(arquivo, ref) {
  const limpo = ref.split('#')[0].split('?')[0];
  if (limpo === '') return null; // só âncora ou só busca: fica na própria página
  const caminho = limpo.startsWith('/') ? posix.normalize(limpo) : posix.normalize(posix.join('/', posix.dirname(arquivo), limpo));
  return caminho.endsWith('/') ? caminho + 'index.html' : caminho;
}
const ROTAS_DO_GARCOM = /^\/api\//;
let conferidas = 0;
for (const arquivo of arquivosDoSite) {
  if (!/\.(html|css)$/.test(arquivo)) continue;
  const texto = readFileSync(join(SITE, arquivo), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')    // comentários HTML: o que está ali não carrega
    .replace(/\/\*[\s\S]*?\*\//g, '')   // comentários CSS e JS de bloco
    .replace(/^\s*\/\/.*$/gm, '');         // linhas só de comentário JS (ex.: o vídeo da versão final do quiz)
  const refs = [];
  for (const m of texto.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) refs.push(m[1]);
  for (const m of texto.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) refs.push(m[1]);
  for (const r of CARREGADOS_PELO_PROGRAMA[arquivo] || []) refs.push(r);
  // Pedidos a outro endereço (v4; 10.7): src, href de <link>, url() e @import não podem apontar para http(s)
  const pedidos = [];
  for (const m of texto.matchAll(/\bsrc\s*=\s*["'](https?:[^"']*)["']/gi)) pedidos.push(m[1]);
  for (const m of texto.matchAll(/<link\b[^>]*\bhref\s*=\s*["'](https?:[^"']*)["']/gi)) pedidos.push(m[1]);
  for (const m of texto.matchAll(/url\(\s*["']?(https?:[^"')]+)["']?\s*\)/gi)) pedidos.push(m[1]);
  for (const m of texto.matchAll(/@import\s+(?:url\()?\s*["']?(https?:[^"')\s;]+)/gi)) pedidos.push(m[1]);
  for (const u of pedidos) problema(arquivo + ': pede arquivo a outro endereço (' + u + ')');
  if (/fonts\.(googleapis|gstatic)\.com/i.test(texto)) problema(arquivo + ': ainda cita fonts.googleapis ou fonts.gstatic');
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(ref) || ref.includes("'") || ref.includes('+')) continue;
    const alvo = resolverNoSite(arquivo, ref);
    if (alvo === null || ROTAS_DO_GARCOM.test(alvo)) continue;
    conferidas++;
    if (!arquivosDoSite.includes(alvo.slice(1))) problema(arquivo + ': "' + ref + '" não existe no site montado (' + alvo + ')');
  }
  if (arquivo.endsWith('.html')) {
    const html = readFileSync(join(SITE, arquivo), 'utf8');
    if (!temCharsetNoInicio(html)) problema(arquivo + ': sem meta charset utf-8 nos primeiros ' + BYTES_DO_CHARSET + ' bytes');
    if (!/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)) problema(arquivo + ': sem meta noindex');
    if (!/<meta\s+name=["']viewport["'][^>]*width=device-width/i.test(html)) problema(arquivo + ': sem meta viewport');
    if (html.includes(LINK_QUIZ_NO_REPOSITORIO)) problema(arquivo + ': ainda tem o caminho do quiz no repositório');
  }
}
// As três páginas do mapa de rotas existem
for (const p of ['index.html', 'b/index.html', 'quiz/index.html']) if (!arquivosDoSite.includes(p)) problema('falta a página ' + p);

// ··· 3. Resultado ···
console.log('Site montado em ' + relative(RAIZ, SITE) + '/');
for (const linha of relatorio) console.log('  ' + linha);
const bytes = arquivosDoSite.reduce((t, a) => t + statSync(join(SITE, a)).size, 0);
console.log(arquivosDoSite.length + ' arquivos, ' + Math.round(bytes / 1024) + ' KB; ' + conferidas + ' caminhos relativos conferidos');
if (problemas.length) {
  console.log('\nProblemas:');
  for (const p of problemas) console.log('  ' + p);
  process.exit(1);
}
console.log('Tudo certo: charset utf-8 no início, noindex e viewport em todo HTML, link da landing para /quiz/, todos os caminhos existem no site e nenhuma página pede arquivo a outro endereço.');
