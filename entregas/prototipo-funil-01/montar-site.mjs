// Monta a pasta do site do protótipo do funil-01 a partir das entregas · Node, sem dependências
// id: prototipo-funil-01 · versao 9 · rascunho · otavio: pendente (ver README.md desta pasta)
// Rodar da raiz do repositório:  node entregas/prototipo-funil-01/montar-site.mjs
//
// O que faz (decisão #101; v6, 12/11/2026: a landing-page-02 no lugar das duas variantes da landing-page-01):
//   /            landing-page-02 (index.html, com o programa em assets/ e as imagens em a/, na raiz do site)
//   /quiz/       página do quiz-01 (index.html, poster-junior.jpg)
//   fontes/      ao lado de cada página que usa fonte própria (/fontes/ da landing-page-02 e /quiz/fontes/), os arquivos
//                de fonte de licença livre instalados pelo npm em nucleo/ferramentas/fontes/ (lista em fontes.json
//                daquela pasta) e a licença de cada um. Nada vem do Google nem de outro terceiro (10.7; v4, etapa 34).
//   /api/...     não é arquivo: é o garçom (entregas/garcom/garcom.mjs), pela configuração wrangler.toml
//
// Nos HTML montados (nunca nas entregas), acrescenta <meta charset="utf-8"> como primeiríssima linha quando
// não houver nos primeiros 1024 bytes (o quiz; v3, pedido 09), <meta name="robots" content="noindex, nofollow">
// quando não houver e a meta viewport (width=device-width) quando não houver. A landing-page-02 já leva ao quiz
// por /quiz/ e não muda na montagem.
// v9 (pedido 17, 17.2; decisão #116): acrescenta também, logo depois da meta charset, o bloco da medição de medicao.mjs
// (entre <!-- medicao: inicio --> e <!-- medicao: fim -->): o consentimento padrão do Google com tudo negado, o aviso de
// cookies com o texto de entregas/documentos/aviso-de-cookies.md e o carregador do Google Tag Manager, que só roda depois
// do "Aceitar". O código do contêiner mora em medicao.json.
// Depois confere cada caminho de css, imagem, fonte e link nos arquivos montados, cada imagem que o programa da
// landing-page-02 cita, e que nenhuma página pede arquivo a outro endereço (folha de estilo, script, imagem, fonte
// ou @import de http, e nada de fonts.googleapis, fonts.gstatic nem vercel.live; v4 e v6). Os links que a pessoa
// clica (<a href="https://...">) não são pedidos da página e ficam. A única exceção (v9) é o carregador do Tag Manager,
// exatamente https://www.googletagmanager.com/gtm.js?id=, só dentro do bloco da medição: dentro do bloco, qualquer outro
// endereço é barrado; fora dele, qualquer menção ao Tag Manager, ao gtm.js ou ao Google Analytics é barrada. E confere que
// cada HTML tem o bloco uma vez só, antes de qualquer outro programa, com o consentimento padrão negado antes do carregador.
// A pasta montada (site/) fica fora do Git (.gitignore). Ela é apagada e montada de novo a cada vez.

import { mkdirSync, rmSync, readFileSync, writeFileSync, copyFileSync, cpSync, existsSync, statSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acrescentarMedicao, MARCA_INICIO, MARCA_FIM, CARREGADOR_GTM, CODIGO_GTM, CHAVE_ESCOLHA, VERSAO_DO_AVISO } from './medicao.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../..');
const SITE = join(AQUI, 'site');

const LANDING = 'entregas/landings/landing-page-02/pagina';
// Fontes (10.7): os pacotes ficam em nucleo/ferramentas/fontes/node_modules (fora do Git); a lista, em fontes.json
const FONTES = 'nucleo/ferramentas/fontes';
const LISTA_FONTES = JSON.parse(readFileSync(join(RAIZ, FONTES, 'fontes.json'), 'utf8'));
const QUIZ = 'entregas/quizzes/quiz-01/pagina';
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

// O que vai para onde. Só estes arquivos e pastas entram no site (README.md e prints ficam no repositório).
const MAPA = [
  { de: LANDING, para: '', arquivos: ['index.html'], pastas: ['assets', 'a'], fontes: 'landing-02' },
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
const paginasComMedicao = [];
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
    const c = garantirCharset(html);
    html = c.html;
    mudancas.push(c.acrescentou ? 'meta charset acrescentada na primeira linha' : 'meta charset já existia no início');
    const r = garantirNoindex(html, nomeNoSite);
    html = r.html;
    mudancas.push(r.acrescentou ? 'meta noindex acrescentada' : 'meta noindex já existia');
    const v = garantirViewport(html, nomeNoSite);
    html = v.html;
    mudancas.push(v.acrescentou ? 'meta viewport acrescentada' : 'meta viewport já existia');
    // Medição (v9; #116): o bloco de medicao.mjs logo depois da meta charset
    try {
      html = acrescentarMedicao(html);
      mudancas.push('aviso de cookies e Tag Manager acrescentados depois da meta charset');
      paginasComMedicao.push(nomeNoSite);
    } catch (e) { problema(nomeNoSite + ': ' + e.message); }
    writeFileSync(alvo, html);
    relatorio.push(nomeNoSite + ' (' + mudancas.join('; ') + ')');
  }
  // Pastas inteiras, copiadas como estão (o programa e as imagens da landing-page-02)
  for (const pasta of item.pastas || []) {
    const origem = join(RAIZ, item.de, pasta);
    if (!existsSync(origem)) { problema('falta na entrega: ' + relative(RAIZ, origem) + '/'); continue; }
    cpSync(origem, join(destino, pasta), { recursive: true });
    relatorio.push(posix.join(item.para, pasta) + '/ (cópia da pasta inteira)');
  }
}
relatorio.push('medição (v9; #116): aviso de cookies (texto do aviso-de-cookies v' + VERSAO_DO_AVISO + ') e Google Tag Manager ' + CODIGO_GTM +
  ', que só carrega depois do "Aceitar"; o navegador guarda só a escolha (' + CHAVE_ESCOLHA + '); em ' + (paginasComMedicao.join(' e ') || 'nenhuma página'));

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
const semComentarios = t => t
  .replace(/<!--[\s\S]*?-->/g, '')    // comentários HTML: o que está ali não carrega
  .replace(/\/\*[\s\S]*?\*\//g, '')   // comentários CSS e JS de bloco
  .replace(/^\s*\/\/.*$/gm, '');         // linhas só de comentário JS (ex.: o vídeo da versão final do quiz)
// Pedidos a outro endereço (v4; 10.7): src, href de <link>, url() e @import não podem apontar para http(s)
function pedidosDe(texto) {
  const pedidos = [];
  for (const m of texto.matchAll(/\bsrc\s*=\s*["'](https?:[^"']*)["']/gi)) pedidos.push(m[1]);
  for (const m of texto.matchAll(/<link\b[^>]*\bhref\s*=\s*["'](https?:[^"']*)["']/gi)) pedidos.push(m[1]);
  for (const m of texto.matchAll(/url\(\s*["']?(https?:[^"')]+)["']?\s*\)/gi)) pedidos.push(m[1]);
  for (const m of texto.matchAll(/@import\s+(?:url\()?\s*["']?(https?:[^"')\s;]+)/gi)) pedidos.push(m[1]);
  return pedidos;
}
// Medição (v9; #116). O bloco é separado do resto pelos marcadores, antes de apagar os comentários (os marcadores são
// comentários). Fora do bloco, nada do Tag Manager nem do Google Analytics; dentro, só o carregador, exatamente.
const GOOGLE_DA_MEDICAO = /googletagmanager\.com|gtm\.js|google-analytics\.com|gtag\/js/i;
function separarMedicao(bruto, arquivo) {
  const inicios = bruto.split(MARCA_INICIO).length - 1, fins = bruto.split(MARCA_FIM).length - 1;
  if (!arquivo.endsWith('.html')) {
    if (inicios || fins) problema(arquivo + ': marcador do bloco da medição fora de um HTML');
    return { bloco: '', fora: bruto, inicio: -1 };
  }
  // Sem o bloco certo, tudo conta como fora dele: o carregador, se houver, vira pedido a outro endereço
  if (inicios !== 1 || fins !== 1) {
    problema(arquivo + ': o bloco da medição tem de aparecer uma vez só (' + inicios + ' início, ' + fins + ' fim)');
    return { bloco: '', fora: bruto, inicio: -1 };
  }
  const i = bruto.indexOf(MARCA_INICIO), f = bruto.indexOf(MARCA_FIM);
  if (f < i) { problema(arquivo + ': o fim do bloco da medição vem antes do início'); return { bloco: '', fora: bruto, inicio: -1 }; }
  return { bloco: bruto.slice(i + MARCA_INICIO.length, f), fora: bruto.slice(0, i) + bruto.slice(f + MARCA_FIM.length), inicio: i };
}
function conferirBloco(arquivo, bruto, bloco, inicio) {
  // Dentro do bloco, o único endereço é o carregador do Tag Manager, uma vez, sem <noscript> (que carregaria sem consentimento)
  const enderecos = [...bloco.matchAll(/https?:\/\/[^\s"'`<>()\\]+/gi)].map(m => m[0]);
  for (const e of enderecos) if (e !== CARREGADOR_GTM) problema(arquivo + ': dentro do bloco da medição, endereço que não é o carregador do Tag Manager (' + e + ')');
  const carregadores = enderecos.filter(e => e === CARREGADOR_GTM).length;
  if (carregadores !== 1) problema(arquivo + ': o carregador do Tag Manager tem de aparecer uma vez só no bloco da medição (' + carregadores + ')');
  if (/<noscript/i.test(bloco)) problema(arquivo + ': <noscript> no bloco da medição');
  if (/google-analytics\.com|gtag\/js/i.test(bloco)) problema(arquivo + ': o bloco da medição cita o Google Analytics direto (só o Tag Manager entra no código)');
  if (!bloco.includes(JSON.stringify(CODIGO_GTM))) problema(arquivo + ': o bloco da medição não tem o código ' + CODIGO_GTM + ' de medicao.json');
  // O consentimento padrão com a análise e os três de anúncio negados, no primeiro programa do bloco, antes do carregador
  const padrao = bloco.match(/gtag\(\s*['"]consent['"]\s*,\s*['"]default['"]\s*,\s*\{([^}]*)\}\s*\)/);
  const negado = !!padrao && !/granted/.test(padrao[1]) &&
    ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage'].every(k => new RegExp('\\b' + k + '\\s*:\\s*[\'"]denied[\'"]').test(padrao[1]));
  const primeiroPrograma = (bloco.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i) || [])[1] || '';
  if (!negado || !primeiroPrograma.includes(padrao[0]) || bloco.indexOf(padrao[0]) > bloco.indexOf(CARREGADOR_GTM)) {
    problema(arquivo + ': sem o consentimento padrão negado (análise e os três de anúncio) no primeiro programa do bloco, antes do carregador');
  }
  // Anúncio fica sempre negado: nenhum update dos três de anúncio
  for (const m of bloco.matchAll(/gtag\(\s*['"]consent['"]\s*,\s*['"]update['"]\s*,\s*\{([^}]*)\}/g)) {
    if (/\bad_/.test(m[1])) problema(arquivo + ': o bloco da medição muda o consentimento de anúncio (' + m[1].trim() + ')');
  }
  // O bloco vem antes de qualquer outro programa da página
  if (bruto.search(/<script\b/i) < inicio) problema(arquivo + ': há programa antes do bloco da medição');
}
let conferidas = 0;
for (const arquivo of arquivosDoSite) {
  if (!/\.(html|css)$/.test(arquivo)) continue;
  const bruto = readFileSync(join(SITE, arquivo), 'utf8');
  const { bloco, fora, inicio } = separarMedicao(bruto, arquivo);
  if (bloco) conferirBloco(arquivo, bruto, bloco, inicio);
  if (GOOGLE_DA_MEDICAO.test(fora)) problema(arquivo + ': cita o Tag Manager, o gtm.js ou o Google Analytics fora do bloco da medição');
  const texto = semComentarios(fora), textoDoBloco = semComentarios(bloco);
  const refs = [];
  for (const t of [texto, textoDoBloco]) {
    for (const m of t.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) refs.push(m[1]);
    for (const m of t.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) refs.push(m[1]);
  }
  for (const r of CARREGADOS_PELO_PROGRAMA[arquivo] || []) refs.push(r);
  // Fora do bloco, nenhum pedido a outro endereço; dentro, só o carregador do Tag Manager (v9)
  for (const u of pedidosDe(texto)) problema(arquivo + ': pede arquivo a outro endereço (' + u + ')');
  for (const u of pedidosDe(textoDoBloco)) if (u !== CARREGADOR_GTM) problema(arquivo + ': pede arquivo a outro endereço (' + u + ')');
  if (/fonts\.(googleapis|gstatic)\.com/i.test(texto + textoDoBloco)) problema(arquivo + ': ainda cita fonts.googleapis ou fonts.gstatic');
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(ref) || ref.includes("'") || ref.includes('+')) continue;
    const alvo = resolverNoSite(arquivo, ref);
    if (alvo === null || ROTAS_DO_GARCOM.test(alvo)) continue;
    conferidas++;
    if (!arquivosDoSite.includes(alvo.slice(1))) problema(arquivo + ': "' + ref + '" não existe no site montado (' + alvo + ')');
  }
  if (arquivo.endsWith('.html')) {
    if (!temCharsetNoInicio(bruto)) problema(arquivo + ': sem meta charset utf-8 nos primeiros ' + BYTES_DO_CHARSET + ' bytes');
    if (!/<meta\s+name=["']robots["'][^>]*noindex/i.test(bruto)) problema(arquivo + ': sem meta noindex');
    if (!/<meta\s+name=["']viewport["'][^>]*width=device-width/i.test(bruto)) problema(arquivo + ': sem meta viewport');
  }
}
// O programa da landing-page-02 (React e Vite, v6) monta o caminho das imagens em duas partes: uma constante com a
// pasta (ol="/a/00bf60e5") e o arquivo depois dela (`${ol}/76509.svg`). Cada imagem citada assim, ou por inteiro,
// tem de existir no site. E o programa não pode citar o Google Fonts nem a Vercel.
for (const arquivo of arquivosDoSite) {
  if (!arquivo.endsWith('.js')) continue;
  const js = readFileSync(join(SITE, arquivo), 'utf8');
  if (/fonts\.(googleapis|gstatic)\.com|vercel\.live/i.test(js)) problema(arquivo + ': cita fonts.googleapis, fonts.gstatic ou vercel.live');
  if (GOOGLE_DA_MEDICAO.test(js)) problema(arquivo + ': cita o Tag Manager, o gtm.js ou o Google Analytics (só o bloco da medição pode, v9)');
  const imagens = new Set();
  for (const [, nome, pasta] of js.matchAll(/([A-Za-z_$][\w$]*)="(\/a\/[0-9a-z]+)"/g)) {
    const depois = new RegExp('\\$\\{' + nome.replace(/\$/g, '\\$') + '\\}(/[A-Za-z0-9_.-]+)', 'g');
    for (const m of js.matchAll(depois)) imagens.add(pasta + m[1]);
  }
  for (const m of js.matchAll(/["'`](\/(?:a|assets)\/[A-Za-z0-9_.\/-]+\.[a-z0-9]+)["'`]/g)) imagens.add(m[1]);
  for (const img of imagens) {
    conferidas++;
    if (!arquivosDoSite.includes(img.slice(1))) problema(arquivo + ': "' + img + '" não existe no site montado');
  }
}
// As duas páginas do mapa de rotas existem
for (const p of ['index.html', 'quiz/index.html']) if (!arquivosDoSite.includes(p)) problema('falta a página ' + p);

// ··· 3. Resultado ···
console.log('Site montado em ' + relative(RAIZ, SITE) + '/');
for (const linha of relatorio) console.log('  ' + linha);
const bytes = arquivosDoSite.reduce((t, a) => t + statSync(join(SITE, a)).size, 0);
console.log(arquivosDoSite.length + ' arquivos, ' + Math.round(bytes / 1024) + ' KB; ' + conferidas + ' caminhos conferidos');
if (problemas.length) {
  console.log('\nProblemas:');
  for (const p of problemas) console.log('  ' + p);
  process.exit(1);
}
console.log('Tudo certo: charset utf-8 no início, noindex e viewport em todo HTML, o bloco da medição uma vez em cada HTML, antes de qualquer outro programa, com o consentimento padrão negado antes do carregador do Tag Manager, todos os caminhos e todas as imagens do programa da landing existem no site e nenhuma página pede arquivo a outro endereço, salvo o carregador do Tag Manager (' + CARREGADOR_GTM + '), só dentro do bloco da medição, que só roda depois do "Aceitar".');
