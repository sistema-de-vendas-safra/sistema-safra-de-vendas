// Ensaio geral do protótipo do funil-01, ponta a ponta, sem serviço real (etapa 25)
// id: ensaio-prototipo-funil-01 · versao 1 · rascunho · otavio: pendente (ver README.md desta pasta)
//
// Um comando só, de dentro desta pasta:   npm run ensaio
// ou da raiz do repositório:              node nucleo/ferramentas/ensaio/ensaio.mjs
// Opção: --sem-wrangler roda o garçom num servidor Node em vez do wrangler dev (contorno).
//
// O que faz, na ordem (cada conferência sai com OK ou FALHOU; termina com código 1 se algo falhar):
//   1. Banco: PGlite (Postgres dentro do Node) com os papéis do Supabase de mentira; esquema.sql
//      duas vezes; conferir.sql; permissões de verdade trocando de papel (SET ROLE).
//   2. Supabase de mentira em 127.0.0.1 (supabase-de-mentira.mjs): chave de mentira vira papel.
//   3. Site montado (montar-site.mjs) e o garçom no wrangler dev --local, com a configuração do
//      protótipo copiada para uma pasta temporária e só SUPABASE_URL e ORIGEM_PERMITIDA trocadas.
//   4. Sem a linha do catálogo, o envio é recusado (422); depois, dados/banco/catalogo-prototipo.sql.
//   5. O quiz preenchido num navegador sem tela, entrando pela landing: exemplo do lead score
//      (96, faixa A) e um eliminatório; as linhas no banco.
//   6. A planilha do SDR (Codigo.gs com o Google de mentira, em outro processo) pela porta privada.
//   7. Casos de erro: chave publicável lendo tabela, chave da planilha errada, pacote sem
//      consentimento, a mesma pessoa enviando duas vezes ao mesmo tempo.
//   8. Fechamento: conferir.sql de novo e registros sem dado pessoal.
//
// Só valores de mentira, gerados em tempo de execução. Só 127.0.0.1. Dados de pessoa de teste,
// marcados (#102): nome começando por TESTE, e-mail @teste.invalid. Nada é gravado no repositório:
// a configuração e os segredos de mentira do wrangler moram numa pasta temporária fora dele,
// apagada no fim. Todo processo (wrangler, navegador, servidores) é encerrado no fim, mesmo em falha.

import { PGlite } from '@electric-sql/pglite';
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createInterface } from 'node:readline';
import { randomBytes, randomUUID } from 'node:crypto';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, normalize, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import http from 'node:http';
import net from 'node:net';
import { criarFila, criarSupabaseDeMentira } from './supabase-de-mentira.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../../..');
const PROTOTIPO = join(RAIZ, 'entregas/prototipo-funil-01');
const SITE = join(PROTOTIPO, 'site');
const WRANGLER = join(RAIZ, 'nucleo/ferramentas/prototipo/node_modules/.bin/wrangler');
const exigirDosPrints = createRequire(join(RAIZ, 'nucleo/ferramentas/prints/package.json'));
const { chromium } = exigirDosPrints('playwright-core');
const { acharChromium } = exigirDosPrints('./print.js');
const SEM_WRANGLER = process.argv.includes('--sem-wrangler');

// ··· Conferências ···
const resultados = [];
function conferir(ok, texto) {
  resultados.push({ ok: !!ok, texto });
  console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto);
}
const secao = (t) => console.log('\n· ' + t);
// Linha informativa: não é conferência e não entra na contagem
const informar = (texto) => console.log('INFO   · ' + texto);

// ··· Limpeza: tudo o que foi aberto é fechado no fim, mesmo em falha ···
const limpezas = [];
let limpando = null;
function limparTudo() {
  if (!limpando) {
    limpando = (async () => {
      for (const f of limpezas.reverse()) { try { await f(); } catch { /* segue limpando */ } }
    })();
  }
  return limpando;
}
for (const sinal of ['SIGINT', 'SIGTERM']) {
  process.on(sinal, () => { console.log('\nInterrompido: encerrando tudo.'); limparTudo().then(() => process.exit(1)); });
}

// ··· Valores de mentira, montados agora (nada parecido com chave fica escrito no repositório) ···
const mentira = (nome) => ['mentira', nome, randomBytes(24).toString('hex')].join('-');
const CHAVE_PUBLICAVEL = mentira('publicavel');
const CHAVE_SECRETA = mentira('secreta');
const CHAVE_PLANILHA = mentira('planilha');
const CHAVE_PLANILHA_ERRADA = mentira('planilha');
const SEGREDOS = [CHAVE_PUBLICAVEL, CHAVE_SECRETA, CHAVE_PLANILHA, CHAVE_PLANILHA_ERRADA];

// Pessoas de teste (#102). Telefones só com zeros e um dígito no fim; nenhum número real.
const PESSOA_A = { nome: 'TESTE Marina Ensaio', email: 'marina.ensaio@teste.invalid', tel: '00900000001' };
const PESSOA_ELIM = { nome: 'TESTE Paulo Ensaio', email: 'paulo.ensaio@teste.invalid', tel: '00900000002' };
const PESSOA_SEM_CATALOGO = { nome: 'TESTE Sem Catalogo', email: 'sem.catalogo@teste.invalid', telefone: '+55 (00) 90000-0003' };
const PESSOA_SEM_CONSENTIMENTO = { nome: 'TESTE Sem Consentimento', email: 'sem.consentimento@teste.invalid', telefone: '+55 (00) 90000-0004' };
const PESSOA_DUPLA = { nome: 'TESTE Envio Duplo', email: 'envio.duplo@teste.invalid', telefone: '+55 (00) 90000-0005' };
// nada disto pode aparecer nos registros do garçom, do Supabase de mentira e da planilha
const DADO_PESSOAL = /TESTE|teste\.invalid|9000000|90000-000|Marina|Paulo/;

// Respostas do exemplo de base/lead-score.md (v2): 96, faixa A. O eliminatório troca o faturamento
// por "Menos de R$ 50 mil" (base/lead-score.md, "Eliminatórios"). As mesmas de testar-quiz-01.js.
const EXEMPLO = {
  ramo: 'Serviços para empresas', faturamento: 'R$ 500 mil a R$ 1,5 milhão', vendedores: '2 ou 3',
  'quem-marca': 'Sim. O vendedor faz tudo', ticket: '10000', origem: 'Indicação de clientes',
  crm: 'Sim, e o time atualiza todo dia', cargo: 'Dono(a) ou sócio(a)',
  numeros: ['200', '50', '50', '40', '2'], causa: 'Em até 1 hora', causa2: '1 ou 2', causa3: 'Alguns'
};
const ELIMINATORIO = Object.assign({}, EXEMPLO, { faturamento: 'Menos de R$ 50 mil' });

const COLUNAS_PLANILHA = ['id_pessoa', 'nome', 'telefone', 'email', 'empresa', 'consentimento_whatsapp', 'consentimento_email',
  'lead_score_faixa', 'lead_score_nota', 'respostas_a_confirmar', 'entrou_em', 'tentativas_feitas',
  'estagio', 'estado', 'data_volta', 'canal', 'contato_em', 'reuniao_em', 'produto'];

// Pacote montado no Node, no formato de montarPacote() da página (para os casos de erro)
function pacoteDeTeste(pessoa, { whatsapp = 'sim', email = 'sim', sessao = 'sessao-ensaio-' + randomBytes(4).toString('hex') } = {}) {
  const agora = new Date().toISOString();
  return {
    pessoa: {
      nome: pessoa.nome, telefone: pessoa.telefone, email: pessoa.email, empresa: '',
      consentimento_whatsapp: whatsapp, consentimento_email: email,
      consentimento_texto: 'Texto do consentimento do ensaio (mentira).', consentimento_em: agora,
      primeira_utm_source: 'bio', primeira_utm_campaign: 'funil-01'
    },
    evento: {
      tipo: 'fim_quiz', funil: 'funil-01', entrega: 'quiz-01', versao_entrega: 1,
      utm_source: 'bio', utm_campaign: 'funil-01', id_sessao: sessao, ocorrido_em: agora,
      respostas: { faturamento: 'R$ 500 mil a R$ 1,5 milhão' },
      lead_score_nota: 96, lead_score_faixa: 'a', lead_score_versao: 2
    }
  };
}

function portaLivre() {
  return new Promise((ok, falha) => {
    const s = net.createServer();
    s.once('error', falha);
    s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => ok(p)); });
  });
}
const esperar = (ms) => new Promise(ok => setTimeout(ok, ms));

async function principal() {
  const inicio = Date.now();
  console.log('Ensaio geral do protótipo do funil-01 · ' + new Date().toISOString());
  console.log('Só 127.0.0.1, só valores de mentira, só leads de teste (#102).');

  // ═══ 1. Banco ═══
  secao('1. Banco local (PGlite) com os papéis do Supabase de mentira');
  const db = new PGlite();
  limpezas.push(() => db.close());
  const fila = criarFila();
  const naFila = (f) => fila(f);
  await db.exec(`set time zone 'UTC'`);
  // Os papéis do Supabase, de mentira. "dono" faz o papel do postgres do Supabase, que é dono das
  // tabelas mas não é superusuário. service_role passa por cima da RLS, como no Supabase.
  // As permissões padrão abaixo imitam o pior caso do Supabase (tudo dado a anon, authenticated e
  // service_role no que o dono criar), para conferir que o esquema tira tudo sozinho (#99).
  await db.exec(`
    create role anon nologin noinherit;
    create role authenticated nologin noinherit;
    create role service_role nologin noinherit bypassrls;
    create role outro_papel nologin noinherit;
    create role dono nologin;
    grant usage on schema public to anon, authenticated, service_role, outro_papel;
    grant usage, create on schema public to dono;
    alter default privileges for role dono in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges for role dono in schema public grant all on sequences to anon, authenticated, service_role;
    alter default privileges for role dono in schema public grant all on functions to anon, authenticated, service_role;
  `);
  const versao = (await db.query('select pg_catalog.version() as v')).rows[0].v.split(' on ')[0];
  informar('PGlite no ar (' + versao + '), papéis anon, authenticated, service_role e dono criados');

  const comoDono = async (sql) => naFila(async () => {
    await db.exec('set role dono');
    try { return await db.exec(sql); } finally { await db.exec('reset role'); }
  });
  const ESQUEMA = readFileSync(join(RAIZ, 'dados/banco/esquema.sql'), 'utf8');
  const CONFERIR = readFileSync(join(RAIZ, 'dados/banco/conferir.sql'), 'utf8');
  const CATALOGO = readFileSync(join(RAIZ, 'dados/banco/catalogo-prototipo.sql'), 'utf8');

  for (const vez of ['primeira', 'segunda']) {
    let erro = null;
    try { await comoDono(ESQUEMA); } catch (e) { erro = e; }
    conferir(!erro, 'esquema.sql aplicado pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
  }

  async function rodarConferir(rotulo) {
    const saidas = await comoDono(CONFERIR);
    const linhas = saidas[saidas.length - 1].rows;
    for (const l of linhas.filter(l => l.n !== 99)) {
      if (!l.ok) conferir(false, rotulo + ' · conferir.sql ' + l.n + ' (' + l.conferencia + '): encontrado ' + l.encontrado);
    }
    const final = linhas.find(l => l.n === 99);
    conferir(final && final.ok === true && final.encontrado === '13 de 13',
      rotulo + ' · conferir.sql: linha "tudo certo" = ' + (final && final.ok) + ' (' + (final && final.encontrado) + ')');
  }
  await rodarConferir('depois do esquema');

  // Permissões de verdade, trocando de papel
  const comoPapel = (papel, sql, params = []) => naFila(() => db.transaction(async (tx) => {
    await tx.exec('set local role ' + papel);
    return tx.query(sql, params);
  }));
  const codigoComo = async (papel, sql, params) => {
    try { await comoPapel(papel, sql, params); return 'ok'; } catch (e) { return e.code || 'sem codigo'; }
  };
  const TABELAS = ['entregas', 'pessoas', 'eventos', 'investimento'];
  const VISOES = ['painel_numeros', 'contagem_analises_gratuitas'];
  const REGISTRAR = `select public.registrar_fim_quiz('{}'::jsonb)`;
  const LEADS = `select * from public.leads_para_planilha()`;

  let c = await codigoComo('anon', REGISTRAR);
  conferir(c === '22023', 'anon executa registrar_fim_quiz (passa da permissão e para na conferência do pacote: ' + c + ')');
  for (const t of [...TABELAS, ...VISOES]) {
    c = await codigoComo('anon', `select * from public.${t} limit 1`);
    conferir(c === '42501', 'anon não lê ' + (VISOES.includes(t) ? 'a visão ' : 'a tabela ') + t + ' (' + c + ')');
  }
  c = await codigoComo('anon', `insert into public.pessoas (nome) values ('x')`);
  conferir(c === '42501', 'anon não grava direto na tabela pessoas (' + c + ')');
  c = await codigoComo('anon', LEADS);
  conferir(c === '42501', 'anon não chama leads_para_planilha (' + c + ')');
  c = await codigoComo('anon', `select public.eventos_imutaveis()`);
  conferir(c === '42501', 'anon não chama a função da trava (' + c + ')');
  for (const [sql, rotulo] of [[REGISTRAR, 'registrar_fim_quiz'], [LEADS, 'leads_para_planilha'], [`select * from public.pessoas limit 1`, 'a tabela pessoas'], [`select * from public.painel_numeros limit 1`, 'a visão painel_numeros']]) {
    c = await codigoComo('authenticated', sql);
    conferir(c === '42501', 'authenticated não pode ' + rotulo + ' (' + c + ')');
  }
  c = await codigoComo('service_role', LEADS);
  conferir(c === 'ok', 'service_role chama leads_para_planilha (' + c + ')');
  for (const [sql, rotulo] of [[REGISTRAR, 'executar registrar_fim_quiz'], [`select * from public.pessoas limit 1`, 'ler a tabela pessoas'], [`select * from public.eventos limit 1`, 'ler a tabela eventos'], [`select * from public.painel_numeros limit 1`, 'ler a visão painel_numeros']]) {
    c = await codigoComo('service_role', sql);
    conferir(c === '42501', 'service_role não pode ' + rotulo + ' (' + c + ')');
  }
  c = await codigoComo('outro_papel', REGISTRAR);
  conferir(c === '42501', 'um papel qualquer, sem permissão dada (PUBLIC), não executa registrar_fim_quiz (' + c + ')');

  // ═══ 2. Supabase de mentira ═══
  secao('2. Supabase de mentira em 127.0.0.1');
  const supabase = criarSupabaseDeMentira({ db, fila, chaves: { [CHAVE_PUBLICAVEL]: 'anon', [CHAVE_SECRETA]: 'service_role' } });
  const portaSupabase = await supabase.abrir();
  limpezas.push(() => supabase.fechar());
  const URL_SUPABASE = 'http://127.0.0.1:' + portaSupabase;
  informar('Supabase de mentira no ar em ' + URL_SUPABASE.replace(/:\d+$/, ':(porta livre)'));
  const direto = async (caminho, { chave, metodo = 'POST', corpo } = {}) => {
    const cab = { 'Content-Type': 'application/json', 'X-Ensaio': 'direto' };
    if (chave) cab.apikey = chave;
    const r = await fetch(URL_SUPABASE + caminho, { method: metodo, headers: cab, body: corpo === undefined ? undefined : JSON.stringify(corpo) });
    const texto = await r.text();
    return { status: r.status, texto };
  };
  let r = await direto('/rest/v1/rpc/leads_para_planilha', { corpo: {} });
  conferir(r.status === 401, 'sem apikey: 401 (' + r.status + ')');
  r = await direto('/rest/v1/rpc/leads_para_planilha', { chave: mentira('desconhecida'), corpo: {} });
  conferir(r.status === 401, 'chave desconhecida: 401 (' + r.status + ')');
  r = await direto('/rest/v1/rpc/leads_para_planilha', { chave: CHAVE_SECRETA, corpo: {} });
  conferir(r.status === 200 && r.texto === '[]', 'chave secreta (service_role) chama leads_para_planilha: 200, lista vazia (' + r.status + ')');
  r = await direto('/rest/v1/rpc/funcao_que_nao_existe', { chave: CHAVE_SECRETA, corpo: {} });
  conferir(r.status === 404, 'função que não existe: 404 (' + r.status + ')');

  // ═══ 3. Site montado e garçom ═══
  secao('3. Site montado e garçom rodando localmente');
  let montou = true;
  try { execFileSync(process.execPath, [join(PROTOTIPO, 'montar-site.mjs')], { cwd: RAIZ, stdio: 'pipe' }); } catch { montou = false; }
  conferir(montou && existsSync(join(SITE, 'quiz/index.html')), 'montar-site.mjs: site montado em entregas/prototipo-funil-01/site/ (fora do Git)');

  const temp = mkdtempSync(join(tmpdir(), 'ensaio-safra-'));
  limpezas.push(() => rmSync(temp, { recursive: true, force: true }));
  const portaGarcom = await portaLivre();
  const BASE = 'http://127.0.0.1:' + portaGarcom;
  const saidaGarcom = [];
  let modo = SEM_WRANGLER ? 'node' : 'wrangler';

  if (modo === 'wrangler') {
    // A configuração do protótipo, copiada para a pasta temporária, com só quatro trocas:
    // os caminhos ficam absolutos (main e assets), e as duas variáveis comuns apontam para cá.
    const original = readFileSync(join(PROTOTIPO, 'wrangler.toml'), 'utf8');
    const trocas = [
      [/^main = "\.\.\/garcom\/garcom\.mjs"$/m, 'main = ' + JSON.stringify(join(RAIZ, 'entregas/garcom/garcom.mjs'))],
      [/^directory = "\.\/site"$/m, 'directory = ' + JSON.stringify(SITE)],
      [/^SUPABASE_URL = ".*"$/m, 'SUPABASE_URL = ' + JSON.stringify(URL_SUPABASE)],
      [/^ORIGEM_PERMITIDA = ".*"$/m, 'ORIGEM_PERMITIDA = ' + JSON.stringify(BASE)]
    ];
    let config = original, trocou = 0;
    for (const [de, para] of trocas) if (de.test(config)) { config = config.replace(de, para); trocou++; }
    const semEnderecoReal = !/supabase\.co|workers\.dev/.test(config.replace(/^#.*$/gm, ''));
    conferir(trocou === 4 && semEnderecoReal, 'configuração temporária fora do repositório: só main, assets, SUPABASE_URL e ORIGEM_PERMITIDA trocados; nenhum endereço real');
    writeFileSync(join(temp, 'wrangler.toml'), config);
    // Os três segredos, de mentira, num arquivo da pasta temporária (nunca no repositório)
    writeFileSync(join(temp, 'segredos-de-mentira.env'),
      'SUPABASE_CHAVE_PUBLICAVEL=' + CHAVE_PUBLICAVEL + '\nSUPABASE_CHAVE_SECRETA=' + CHAVE_SECRETA + '\nCHAVE_PLANILHA=' + CHAVE_PLANILHA + '\n');
    if (!(trocou === 4 && semEnderecoReal)) throw new Error('configuração temporária fora do esperado; o wrangler não foi ligado');

    const proc = spawn(WRANGLER, ['dev', '--local', '--config', join(temp, 'wrangler.toml'),
      '--ip', '127.0.0.1', '--port', String(portaGarcom), '--inspector-port', String(await portaLivre()),
      '--persist-to', join(temp, 'estado'), '--env-file', join(temp, 'segredos-de-mentira.env'),
      '--show-interactive-dev-session=false', '--log-level', 'log'], {
      cwd: temp, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, WRANGLER_SEND_METRICS: 'false', WRANGLER_LOG_PATH: join(temp, 'registros'), NO_COLOR: '1', CI: '1' }
    });
    let saiu = false;
    proc.on('exit', () => { saiu = true; });
    proc.stdout.on('data', d => saidaGarcom.push(String(d)));
    proc.stderr.on('data', d => saidaGarcom.push(String(d)));
    limpezas.push(async () => {
      if (saiu) return;
      try { process.kill(-proc.pid, 'SIGTERM'); } catch { /* já saiu */ }
      for (let i = 0; i < 50 && !saiu; i++) await esperar(100);
      if (!saiu) { try { process.kill(-proc.pid, 'SIGKILL'); } catch { /* já saiu */ } }
    });
    let pronto = false;
    for (let i = 0; i < 120 && !saiu && !pronto; i++) {
      try { pronto = (await fetch(BASE + '/', { signal: AbortSignal.timeout(1000) })).status === 200; } catch { await esperar(500); }
    }
    conferir(pronto, 'wrangler dev --local no ar (workerd), sem login, com os segredos de mentira por arquivo temporário');
    if (!pronto) {
      console.log('  O wrangler dev não subiu; o ensaio segue com o contorno (garçom num servidor Node).');
      try { process.kill(-proc.pid, 'SIGKILL'); } catch { /* já saiu */ }
      modo = 'node';
    }
  }
  if (modo === 'node') {
    // Contorno: o handler do garçom num servidor Node, com um ASSETS que lê a pasta montada.
    const garcom = (await import(pathToFileURL(join(RAIZ, 'entregas/garcom/garcom.mjs')).href)).default;
    const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg' };
    const ASSETS = {
      fetch: async (req) => {
        let caminho = decodeURIComponent(new URL(req.url).pathname);
        if (caminho.endsWith('/')) caminho += 'index.html';
        const arq = normalize(join(SITE, caminho));
        if (!arq.startsWith(SITE + '/') || !existsSync(arq) || statSync(arq).isDirectory()) return new Response('nao encontrado', { status: 404 });
        return new Response(readFileSync(arq), { status: 200, headers: { 'Content-Type': TIPOS[extname(arq)] || 'application/octet-stream' } });
      }
    };
    const env = { ASSETS, SUPABASE_URL: URL_SUPABASE, ORIGEM_PERMITIDA: BASE,
      SUPABASE_CHAVE_PUBLICAVEL: CHAVE_PUBLICAVEL, SUPABASE_CHAVE_SECRETA: CHAVE_SECRETA, CHAVE_PLANILHA: CHAVE_PLANILHA };
    const logOriginal = console.log;
    const srv = http.createServer(async (req, res) => {
      const partes = [];
      for await (const p of req) partes.push(p);
      const corpo = partes.length ? Buffer.concat(partes) : undefined;
      const pedido = new Request(BASE + req.url, { method: req.method, headers: req.headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : corpo });
      console.log = (...a) => saidaGarcom.push(a.join(' ') + '\n');
      let resposta;
      try { resposta = await garcom.fetch(pedido, env); } finally { console.log = logOriginal; }
      res.writeHead(resposta.status, Object.fromEntries(resposta.headers));
      res.end(Buffer.from(await resposta.arrayBuffer()));
    });
    await new Promise(ok => srv.listen(portaGarcom, '127.0.0.1', ok));
    limpezas.push(() => new Promise(ok => { srv.closeAllConnections?.(); srv.close(() => ok()); }));
    informar('contorno: garçom num servidor Node com ASSETS lendo a pasta montada');
  }
  console.log('  modo do garçom: ' + (modo === 'wrangler' ? 'wrangler dev --local' : 'servidor Node (contorno)'));
  if (modo === 'wrangler') {
    // Avisos do wrangler (por exemplo, compatibility_date mais nova que o workerd local), sem caminho de pasta
    const avisos = saidaGarcom.join('').split('\n').filter(l => /WARNING|▲/.test(l)).map(l => l.replace(/\/[^\s"]+/g, '(caminho)').trim());
    console.log('  avisos do wrangler: ' + (avisos.length ? avisos.join(' | ') : 'nenhum'));
  }

  for (const [caminho, rotulo] of [['/', 'variante A'], ['/b/', 'variante B'], ['/quiz/', 'quiz']]) {
    const x = await fetch(BASE + caminho);
    const html = await x.text();
    conferir(x.status === 200 && x.headers.get('x-robots-tag') === 'noindex' && /<meta\s+name="robots"[^>]*noindex/.test(html),
      'GET ' + caminho + ' (' + rotulo + '): 200, X-Robots-Tag noindex e meta noindex (' + x.status + ')');
  }
  let x = await fetch(BASE + '/api/nao-existe');
  conferir(x.status === 404 && x.headers.get('x-robots-tag') === 'noindex', 'GET /api/nao-existe: 404 com noindex (' + x.status + ')');

  // ═══ 4. Catálogo ═══
  secao('4. Catálogo de entregas (pergunta 23.10)');
  const postFimQuiz = (pacote, origem = BASE) => fetch(BASE + '/api/fim-quiz', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origem }, body: JSON.stringify(pacote)
  });
  const contar = async (sql, params = []) => Number((await naFila(() => db.query(sql, params))).rows[0].n);
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CATALOGO));
  const ultimaDoBanco = supabase.registro[supabase.registro.length - 1];
  conferir(x.status === 422 && ultimaDoBanco.rota === '/rest/v1/rpc/registrar_fim_quiz' && ultimaDoBanco.status === 409,
    'sem a linha (quiz-01, 1) no catálogo, o banco recusa pela chave estrangeira (409) e o garçom responde ' + x.status);
  conferir(await contar(`select count(*) as n from public.pessoas`) === 0, 'e nada ficou no banco (0 pessoas)');
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CATALOGO), 'http://127.0.0.1:1');
  conferir(x.status === 403, 'outra origem: 403 (' + x.status + ')');
  for (const vez of ['primeira', 'segunda']) {
    let erro = null, linhas = [];
    try { const s = await comoDono(CATALOGO); linhas = s[s.length - 1].rows; } catch (e) { erro = e; }
    conferir(!erro && linhas.length === 1 && linhas[0].id_entrega === 'quiz-01' && linhas[0].versao === 1 && linhas[0].retirada_em === null,
      'dados/banco/catalogo-prototipo.sql aplicado pelo dono, ' + vez + ' vez: mostra a linha quiz-01, versão 1' + (erro ? ' (' + erro.message + ')' : ''));
  }
  conferir(await contar(`select count(*) as n from public.entregas`) === 1, 'catálogo com uma linha só (rodar de novo não duplica)');

  // ═══ 5. Quiz no navegador sem tela ═══
  secao('5. Quiz no navegador sem tela, entrando pela landing');
  // Sem os tratadores de sinal do Playwright: senão ele encerra o processo no Ctrl+C antes de
  // limparTudo() desligar o wrangler, o workerd e a pasta temporária.
  const navegador = await chromium.launch({ executablePath: acharChromium(), handleSIGINT: false, handleSIGTERM: false, handleSIGHUP: false });
  limpezas.push(() => navegador.close());
  const bloqueadas = [];

  async function fazerQuiz({ landing, busca, respostas, pessoa, largura, telaFinal }) {
    const ctx = await navegador.newContext({ viewport: { width: largura, height: largura === 375 ? 812 : 900 }, reducedMotion: 'reduce' });
    // Só 127.0.0.1: o resto (as fontes do Google que o mockup carrega) é bloqueado e anotado
    await ctx.route('**/*', (rota) => {
      const u = rota.request().url();
      if (u.startsWith(BASE + '/') || u.startsWith('data:')) return rota.continue();
      bloqueadas.push(new URL(u).hostname);
      return rota.abort();
    });
    const page = await ctx.newPage();
    const consoleTexto = [];
    page.on('console', m => consoleTexto.push(m.text()));
    try {
      await page.goto(BASE + landing + busca);
      await page.locator('[data-quiz]').first().click();
      await page.waitForURL(/\/quiz\/\?/, { timeout: 15000 });
      const endereco = new URL(page.url());
      const naTela = (id) => page.waitForFunction(i => location.hash === '#' + i, id, { timeout: 15000 });
      const opcao = (v) => page.locator('[data-corpo] .opcao[data-valor="' + v + '"]').click();
      await page.locator('.cartao__link[data-acao="proximo"]').click();
      await naTela('abertura');
      await page.locator('.abertura__copy [data-acao="proximo"]').click();
      await naTela('nome'); await page.fill('#nomeIn', pessoa.nome.split(' ')[1]); await page.click('#seguir');
      await naTela('ramo'); await opcao(respostas.ramo);
      await naTela('faturamento'); await opcao(respostas.faturamento);
      await naTela('vendedores'); await opcao(respostas.vendedores);
      await naTela('quem-marca'); await opcao(respostas['quem-marca']);
      await naTela('valor-medio'); await page.fill('#ticket', respostas.ticket); await page.click('#seguirTicket');
      await naTela('origem'); await opcao(respostas.origem); await page.click('[data-corpo] [data-acao="proximo"]');
      await naTela('crm'); await opcao(respostas.crm);
      await naTela('cargo'); await opcao(respostas.cargo);
      await naTela('lembra'); await opcao('Sim');
      await naTela('numeros');
      for (let i = 0; i < 5; i++) await page.fill('#num' + i, respostas.numeros[i]);
      await page.click('[data-corpo] [data-acao="proximo"]');
      await naTela('causa'); await opcao(respostas.causa);
      await naTela('causa2'); await opcao(respostas.causa2);
      await naTela('causa3'); await opcao(respostas.causa3);
      await naTela('contato');
      await page.fill('#nome', pessoa.nome);
      await page.fill('#email', pessoa.email);
      await page.fill('#tel', pessoa.tel);
      await page.check('#consWhats');
      await page.check('#consEmail');
      const resposta = page.waitForResponse(rr => rr.url() === BASE + '/api/fim-quiz' && rr.request().method() === 'POST', { timeout: 15000 });
      await page.click('#enviar');
      const rr = await resposta;
      await naTela(telaFinal);
      await page.waitForTimeout(300);
      const aviso = await page.locator('#avisoEnvio').isVisible();
      return { endereco, status: rr.status(), aviso, consoleTexto };
    } finally {
      await ctx.close();
    }
  }

  const q1 = await fazerQuiz({ landing: '/', busca: '?utm_source=bio&utm_campaign=funil-01', respostas: EXEMPLO, pessoa: PESSOA_A, largura: 1440, telaFinal: 'plano' });
  conferir(q1.endereco.pathname === '/quiz/' && q1.endereco.searchParams.get('utm_source') === 'bio' && q1.endereco.searchParams.get('utm_campaign') === 'funil-01' && !!q1.endereco.searchParams.get('id_sessao'),
    'exemplo (1440): a landing / leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao');
  conferir(q1.status === 201 && !q1.aviso, 'exemplo: POST /api/fim-quiz gravado (' + q1.status + '), tela do plano, sem aviso de falha');
  const q2 = await fazerQuiz({ landing: '/b/', busca: '?utm_source=stories&utm_campaign=funil-01', respostas: ELIMINATORIO, pessoa: PESSOA_ELIM, largura: 375, telaFinal: 'relatorio-nao' });
  conferir(q2.endereco.pathname === '/quiz/' && q2.endereco.searchParams.get('utm_source') === 'stories', 'eliminatório (375): a landing /b/ leva a /quiz/ com utm_source=stories');
  conferir(q2.status === 201 && !q2.aviso, 'eliminatório: POST /api/fim-quiz gravado (' + q2.status + '), tela do relatório, sem aviso de falha');
  conferir([...q1.consoleTexto, ...q2.consoleTexto].every(t => !DADO_PESSOAL.test(t)), 'console das páginas sem dado de pessoa');

  const linhaPessoa = async (email) => (await naFila(() => db.query(`select * from public.pessoas where email = $1`, [email]))).rows;
  const eventosDe = async (id) => (await naFila(() => db.query(`select * from public.eventos where id_pessoa = $1 order by gravado_em`, [id]))).rows;
  // Se o lead A não gravou, as seções 6 a 8 rodam assim mesmo, com um id vazio que não acha
  // ninguém: as conferências dele dão FALHOU e o código final continua 1.
  const paDoBanco = (await linhaPessoa(PESSOA_A.email))[0];
  const pa = paDoBanco || { id_pessoa: '00000000-0000-0000-0000-000000000000' };
  const ea = paDoBanco ? await eventosDe(pa.id_pessoa) : [];
  conferir(paDoBanco && pa.nome === PESSOA_A.nome && pa.telefone === '+55 (00) 90000-0001', 'banco · pessoas: o lead do exemplo, com nome TESTE, e-mail @teste.invalid e telefone como a página mandou');
  conferir(paDoBanco && pa.consentimento_whatsapp === 'sim' && pa.consentimento_email === 'sim' && pa.consentimento_texto.length > 50 && pa.consentimento_em instanceof Date,
    'banco · pessoas: consentimento por WhatsApp e e-mail, com o texto aceito e a data');
  conferir(paDoBanco && pa.primeira_utm_source === 'bio' && pa.primeira_utm_campaign === 'funil-01', 'banco · pessoas: primeira visita bio, funil-01');
  conferir(ea.length === 1 && ea[0].tipo === 'fim_quiz' && ea[0].lead_score_nota === 96 && ea[0].lead_score_faixa === 'a' && ea[0].lead_score_versao === 2,
    'banco · eventos: um fim_quiz com nota 96, faixa a, versão 2 do lead score' + (ea[0] ? ' (veio ' + ea[0].lead_score_nota + ', ' + ea[0].lead_score_faixa + ')' : ''));
  conferir(ea.length === 1 && ea[0].funil === 'funil-01' && ea[0].entrega === 'quiz-01' && ea[0].versao_entrega === 1 && ea[0].utm_source === 'bio' && ea[0].utm_campaign === 'funil-01' && ea[0].gravado_por === 'garcom' && /^sessao-/.test(ea[0].id_sessao),
    'banco · eventos: etiquetas funil-01, quiz-01 v1, utm bio e funil-01, gravado pelo garçom, com sessão');
  conferir(ea.length === 1 && ea[0].respostas && ea[0].respostas.faturamento === EXEMPLO.faturamento && Array.isArray(ea[0].respostas.numeros), 'banco · eventos: as respostas do quiz gravadas');
  const [pe] = await linhaPessoa(PESSOA_ELIM.email);
  const ee = pe ? await eventosDe(pe.id_pessoa) : [];
  conferir(pe && ee.length === 1 && ee[0].lead_score_faixa === 'eliminatorio' && pe.primeira_utm_source === 'stories' && ee[0].utm_source === 'stories',
    'banco · o eliminatório: faixa eliminatorio' + (ee[0] ? ' (nota ' + ee[0].lead_score_nota + ')' : '') + ', utm stories');
  conferir(await contar(`select count(*) as n from public.pessoas`) === 2 && await contar(`select count(*) as n from public.eventos`) === 2, 'banco: 2 pessoas e 2 eventos, nada a mais');

  // ═══ 6. Planilha do SDR ═══
  secao('6. Planilha do SDR (Apps Script de mentira) pela porta privada');
  function abrirPlanilha(chave) {
    const proc = spawn(process.execPath, [join(AQUI, 'planilha-no-ensaio.mjs')], {
      cwd: AQUI, stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, ENSAIO_PORTA_GARCOM: String(portaGarcom), ENSAIO_CHAVE_PLANILHA: chave }
    });
    const linhas = createInterface({ input: proc.stdout });
    const esperando = [];
    linhas.on('line', l => { const f = esperando.shift(); if (f) f(JSON.parse(l)); });
    let saiu = false;
    proc.on('exit', () => { saiu = true; while (esperando.length) esperando.shift()({ ok: false, erro: 'processo da planilha saiu' }); });
    limpezas.push(() => { if (!saiu) proc.kill('SIGKILL'); });
    return {
      pedir: (comando) => new Promise(ok => { esperando.push(ok); proc.stdin.write(comando + '\n'); }),
      sair: () => new Promise(ok => { if (saiu) return ok(); proc.once('exit', ok); proc.stdin.write('sair\n'); })
    };
  }
  const planilha = abrirPlanilha(CHAVE_PLANILHA);
  let p = await planilha.pedir('instalar');
  conferir(p.ok && p.resultado.aba === 'criada', 'instalar(): aba fila criada, cabeçalhos e gatilho' + (p.ok ? '' : ' (' + p.erro + ')'));
  p = await planilha.pedir('buscar');
  conferir(p.ok && p.resultado.situacao === 'ok' && p.resultado.acrescentadas === 0 && p.resultado.codigo === 200,
    'primeira busca logo depois do quiz: 200 e 0 linhas (a margem de 1 minuto do banco segura os leads recém-gravados, 21.6)');

  // Contorno da margem de 1 minuto (21.6), sem mexer no esquema e sem esperar: como o superusuário
  // do PGlite, com session_replication_role = replica (que desliga os gatilhos só nesta sessão),
  // o gravado_em dos fins de quiz de teste volta 2 minutos. A trava continua ligada na tabela.
  const atrasados = await naFila(async () => {
    await db.exec(`set session_replication_role = replica`);
    try {
      return (await db.query(`update public.eventos set gravado_em = gravado_em - interval '2 minutes'
        where tipo = 'fim_quiz' and id_pessoa in (select id_pessoa from public.pessoas where email like '%@teste.invalid')`)).affectedRows;
    } finally { await db.exec(`set session_replication_role = origin`); }
  });
  conferir(atrasados === 2, 'contorno da margem: gravado_em dos 2 fins de quiz de teste atrasado 2 minutos (trava desligada só nesta sessão e religada)');
  const trava = (await naFila(() => db.query(`select tgenabled from pg_catalog.pg_trigger where tgname = 'eventos_sem_mudanca'`))).rows[0];
  c = await naFila(async () => { try { await db.query(`delete from public.eventos where tipo = 'fim_quiz'`); return 'apagou'; } catch (e) { return e.code; } });
  conferir(trava && trava.tgenabled === 'O' && c === 'P0001', 'a trava dos eventos continua ligada: apagar evento é recusado (' + c + ')');

  p = await planilha.pedir('buscar');
  conferir(p.ok && p.resultado.situacao === 'ok' && p.resultado.acrescentadas === 1 && p.resultado.fora_da_faixa === 0,
    'segunda busca: 1 linha nova (só o lead faixa A; o eliminatório nem vem do banco)' + (p.ok ? ' (' + p.resultado.acrescentadas + ')' : ''));
  let est = (await planilha.pedir('estado')).resultado;
  conferir(JSON.stringify(est.cabecalho) === JSON.stringify(COLUNAS_PLANILHA), 'aba fila: as 19 colunas de planilha-sdr.md, na ordem');
  const linha = est.linhas[0] || [];
  const col = (n) => linha[COLUNAS_PLANILHA.indexOf(n)];
  conferir(est.linhas.length === 1 && col('id_pessoa') === pa.id_pessoa && col('nome') === PESSOA_A.nome && col('email') === PESSOA_A.email && col('telefone') === pa.telefone,
    'linha do lead A: id_pessoa, nome, telefone e e-mail iguais aos do banco');
  conferir(est.linhas.every(l => l[0] !== (pe && pe.id_pessoa)), 'o eliminatório não está na planilha');
  conferir(col('lead_score_faixa') === 'a' && col('lead_score_nota') === 96 && col('consentimento_whatsapp') === 'sim' && col('consentimento_email') === 'sim' && col('empresa') === '' && col('respostas_a_confirmar') === '',
    'linha do lead A: faixa a, nota 96, consentimentos sim, empresa e respostas_a_confirmar vazias');
  conferir(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(col('entrou_em') || '') && col('tentativas_feitas') === 0 && col('estagio') === 'captado' && col('estado') === '' && col('data_volta') === '',
    'linha do lead A: entrou_em no horário de Brasília (AAAA-MM-DD HH:MM:SS), 0 tentativas, estágio captado, estado e data_volta vazios');
  conferir(['canal', 'contato_em', 'reuniao_em', 'produto'].every(k => col(k) === ''), 'linha do lead A: as colunas do SDR (canal, contato_em, reuniao_em, produto) ficaram vazias');
  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.acrescentadas === 0 && est.linhas.length === 1, 'rodar de novo: 0 linhas novas, a aba continua com 1 lead (não duplica)');
  await planilha.pedir('esquecer-cursor');
  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.acrescentadas === 0 && p.resultado.repetidas === 1 && est.linhas.length === 1 && est.tem_cursor,
    'cursor perdido: pede desde o início, acha o lead repetido e não duplica; cursor salvo de novo');
  conferir(est.registros.length > 0 && est.registros.every(t => !DADO_PESSOAL.test(t) && !SEGREDOS.some(s => t.includes(s)) && !t.includes(pa.id_pessoa)),
    'registro da planilha (' + est.registros.length + ' linhas) sem dado pessoal, sem id_pessoa e sem chave');
  await planilha.sair();

  const planilhaErrada = abrirPlanilha(CHAVE_PLANILHA_ERRADA);
  await planilhaErrada.pedir('instalar');
  p = await planilhaErrada.pedir('buscar');
  est = (await planilhaErrada.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.situacao === 'nao-autorizado' && p.resultado.codigo === 401 && est.linhas.length === 0,
    'planilha com a CHAVE_PLANILHA errada: 401, nada gravado (' + (p.ok ? p.resultado.situacao : p.erro) + ')');
  await planilhaErrada.sair();

  // ═══ 7. Casos de erro ═══
  secao('7. Casos de erro');
  r = await direto('/rest/v1/pessoas', { chave: CHAVE_PUBLICAVEL, metodo: 'GET' });
  conferir(r.status === 401 && !DADO_PESSOAL.test(r.texto), 'chave publicável: GET /rest/v1/pessoas recusado com 401 e sem dado (' + r.status + ')');
  r = await direto('/rest/v1/eventos', { chave: CHAVE_PUBLICAVEL, metodo: 'GET' });
  conferir(r.status === 401, 'chave publicável: GET /rest/v1/eventos recusado com 401 (' + r.status + ')');
  r = await direto('/rest/v1/painel_numeros', { chave: CHAVE_PUBLICAVEL, metodo: 'GET' });
  conferir(r.status === 401, 'chave publicável: GET /rest/v1/painel_numeros (visão) recusado com 401 (' + r.status + ')');
  r = await direto('/rest/v1/pessoas', { chave: CHAVE_PUBLICAVEL, corpo: { nome: 'TESTE Direto' } });
  conferir(r.status === 401, 'chave publicável: POST /rest/v1/pessoas (gravar direto) recusado com 401 (' + r.status + ')');
  r = await direto('/rest/v1/rpc/leads_para_planilha', { chave: CHAVE_PUBLICAVEL, corpo: {} });
  conferir(r.status === 401 && !DADO_PESSOAL.test(r.texto), 'chave publicável: leads_para_planilha recusado com 401 e sem dado (' + r.status + ')');
  r = await direto('/rest/v1/pessoas', { chave: CHAVE_SECRETA, metodo: 'GET' });
  conferir(r.status === 403 && !DADO_PESSOAL.test(r.texto), 'chave secreta: GET /rest/v1/pessoas recusado com 403 (service_role só tem a função da planilha) (' + r.status + ')');
  r = await direto('/rest/v1/rpc/registrar_fim_quiz', { chave: CHAVE_SECRETA, corpo: { pacote: pacoteDeTeste(PESSOA_DUPLA) } });
  conferir(r.status === 403, 'chave secreta: registrar_fim_quiz recusado com 403 (' + r.status + ')');

  const planilhaGet = (chave) => fetch(BASE + '/api/planilha/leads-novos', { headers: chave === undefined ? {} : { 'X-Chave-Planilha': chave } });
  x = await planilhaGet(CHAVE_PLANILHA_ERRADA);
  let corpo = await x.text();
  conferir(x.status === 401 && corpo === '{"ok":false,"erro":"nao autorizado"}', 'garçom · porta privada com a chave da planilha errada: 401 sem detalhe');
  x = await planilhaGet(undefined);
  conferir(x.status === 401, 'garçom · porta privada sem chave: 401 (' + x.status + ')');
  x = await planilhaGet(CHAVE_PUBLICAVEL);
  conferir(x.status === 401, 'garçom · porta privada com a chave publicável no lugar: 401 (' + x.status + ')');
  x = await planilhaGet(CHAVE_PLANILHA);
  corpo = await x.json();
  conferir(x.status === 200 && corpo.leads.length === 1 && corpo.leads[0].id_pessoa === pa.id_pessoa && !!corpo.cursor_seguinte && /Z$/.test(corpo.cursor_seguinte.depois_de_gravado_em) && corpo.pode_ter_mais === false,
    'garçom · porta privada com a chave certa: 200, 1 lead, cursor_seguinte com fuso em Z');

  const antes = supabase.registro.length;
  const pessoasAntes = await contar(`select count(*) as n from public.pessoas`);
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CONSENTIMENTO, { whatsapp: 'nao', email: 'nao' }));
  conferir(x.status === 422 && supabase.registro.length === antes, 'garçom · pacote sem consentimento: 422 e o banco nem é chamado (' + x.status + ')');
  r = await direto('/rest/v1/rpc/registrar_fim_quiz', { chave: CHAVE_PUBLICAVEL, corpo: { pacote: pacoteDeTeste(PESSOA_SEM_CONSENTIMENTO, { whatsapp: 'nao', email: 'nao' }) } });
  conferir(r.status === 400 && /"code":"23514"/.test(r.texto), 'banco · registrar_fim_quiz chamado direto com a publicável, sem consentimento: recusado pela restrição (400, 23514)');
  conferir(await contar(`select count(*) as n from public.pessoas`) === pessoasAntes, 'e nenhuma pessoa nova entrou');

  // A mesma pessoa, dois envios ao mesmo tempo (sessões diferentes). O PGlite atende um de cada vez.
  const [d1, d2] = await Promise.all([
    postFimQuiz(pacoteDeTeste(PESSOA_DUPLA)), postFimQuiz(pacoteDeTeste(PESSOA_DUPLA))
  ]);
  const [pd] = await linhaPessoa(PESSOA_DUPLA.email);
  const ed = pd ? await eventosDe(pd.id_pessoa) : [];
  conferir(d1.status === 201 && d2.status === 201, 'dois POST ao mesmo tempo da mesma pessoa: os dois gravados (' + d1.status + ', ' + d2.status + ')');
  conferir(await contar(`select count(*) as n from public.pessoas where email = $1`, [PESSOA_DUPLA.email]) === 1 && ed.length === 2,
    'uma pessoa só no banco e dois eventos fim_quiz ligados a ela (' + ed.length + ')');

  // ═══ 8. Fechamento ═══
  secao('8. Fechamento');
  await rodarConferir('no fim');
  const doGarcom = saidaGarcom.join('').split('\n').filter(l => l.includes('[garcom]'));
  const textoGarcom = saidaGarcom.join('');
  conferir(!DADO_PESSOAL.test(textoGarcom) && !SEGREDOS.some(s => textoGarcom.includes(s)) && !textoGarcom.includes(pa.id_pessoa),
    'saída do garçom (' + (modo === 'wrangler' ? 'wrangler dev' : 'servidor Node') + ', ' + doGarcom.length + ' linhas [garcom]) sem dado pessoal, sem id_pessoa e sem chave');
  const porPapel = supabase.registro.filter(l => l.origem === 'garcom');
  conferir(porPapel.length > 0 && porPapel.every(l => (l.rota === '/rest/v1/rpc/registrar_fim_quiz' && l.papel === 'anon') || (l.rota === '/rest/v1/rpc/leads_para_planilha' && l.papel === 'service_role')),
    'o garçom só chamou registrar_fim_quiz com a publicável (anon) e leads_para_planilha com a secreta (service_role) (' + porPapel.length + ' chamadas)');
  const fora = [...new Set(bloqueadas)];
  const FONTES = ['fonts.googleapis.com', 'fonts.gstatic.com'];
  conferir(fora.every(h => FONTES.includes(h)),
    'navegador: fora de 127.0.0.1 só tentou as fontes do Google, e foram bloqueadas: ' + bloqueadas.length + ' pedidos (' + (fora.join(', ') || 'nenhum') + ')');
  console.log('  tempo do ensaio: ' + Math.round((Date.now() - inicio) / 1000) + ' s');
}

let codigo = 0;
try {
  await principal();
} catch (e) {
  conferir(false, 'erro inesperado: ' + String(e && e.message || e).split('\n')[0]);
}
await limparTudo();
const falhas = resultados.filter(x => !x.ok).length;
console.log('\n' + (falhas ? 'FALHOU: ' + falhas + ' de ' + resultados.length + ' conferências falharam' : 'Tudo certo: ' + resultados.length + ' de ' + resultados.length + ' conferências passaram'));
codigo = falhas ? 1 : 0;
process.exit(codigo);
