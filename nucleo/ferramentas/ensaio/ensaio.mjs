// Ensaio geral do protótipo do funil-01, ponta a ponta, sem serviço real (etapa 25)
// id: ensaio-prototipo-funil-01 · versao 5 · rascunho · otavio: pendente (ver README.md desta pasta)
//
// Um comando só, de dentro desta pasta:   npm run ensaio
// ou da raiz do repositório:              node nucleo/ferramentas/ensaio/ensaio.mjs
// Opções: --sem-wrangler roda o garçom num servidor Node em vez do wrangler dev (contorno).
//         --esperar-margem espera de verdade a margem de 1 minuto da planilha (21.6), sem o contorno.
//
// O que faz, na ordem (cada conferência sai com OK ou FALHOU; termina com código 1 se algo falhar):
//   1. Banco v2 como está no Supabase: PGlite com os papéis do Supabase de mentira; esquema.sql
//      duas vezes; conferir.sql v2 avisa que falta a migração; a linha do catálogo de antes
//      (quiz-01, 1); dados de antes, de teste (#102), entre eles uma linha que imita a do Otávio.
//   2. Migração 001 (v3) duas vezes sobre esses dados: os dados não mudam; conferir.sql 18 de 18;
//      permissões de verdade trocando de papel (SET ROLE), com a porta nova registrar_evento.
//   3. Supabase de mentira em 127.0.0.1 (supabase-de-mentira.mjs): chave de mentira vira papel.
//   4. Site montado (montar-site.mjs) e o garçom v4 no wrangler dev --local, com a configuração do
//      protótipo copiada para uma pasta temporária e só SUPABASE_URL e ORIGEM_PERMITIDA trocadas.
//   5. Sem as linhas novas do catálogo, o fim do quiz novo, a visita e o início do quiz são
//      recusados; depois, dados/banco/catalogo-prototipo.sql (v3) duas vezes.
//   6. Landing (a landing-page-02 em /, v4) e quiz num navegador sem tela: visita, início do quiz, fim do quiz e clique no fim;
//      caixa marcada e desmarcada; o corte mais restritivo; a faixa B; fontes locais e nenhum
//      pedido fora de 127.0.0.1; a conferência da landing que estava fora do repositório (34.17).
//   7. A planilha do SDR (Codigo.gs v2, 20 colunas, com o Google de mentira, em outro processo).
//   8. Casos de erro: chaves no lugar errado, pacote sem consentimento, clique sem fim do quiz,
//      a mesma pessoa enviando duas vezes ao mesmo tempo.
//   9. Fechamento: conferir.sql de novo e registros sem dado pessoal.
//
// Só valores de mentira, gerados em tempo de execução. Só 127.0.0.1. Dados de pessoa de teste,
// marcados (#102): nome começando por TESTE, e-mail @teste.invalid. Nada é gravado no repositório:
// a configuração e os segredos de mentira do wrangler moram numa pasta temporária fora dele,
// apagada no fim. Todo processo (wrangler, navegador, servidores) é encerrado no fim, mesmo em falha.

import { PGlite } from '@electric-sql/pglite';
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createInterface } from 'node:readline';
import { randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, copyFileSync, mkdtempSync, rmSync, existsSync, statSync } from 'node:fs';
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
const ESPERAR_MARGEM = process.argv.includes('--esperar-margem');

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
// No navegador (pela página):
const PESSOA_A = { nome: 'TESTE Marina Ensaio', email: 'marina.ensaio@teste.invalid', tel: '00900000001' };
const PESSOA_ELIM = { nome: 'TESTE Paulo Ensaio', email: 'paulo.ensaio@teste.invalid', tel: '00900000002' };
const PESSOA_CORTE = { nome: 'TESTE Carla Ensaio', email: 'carla.ensaio@teste.invalid', tel: '00900000006' };
const PESSOA_B = { nome: 'TESTE Bia Ensaio', email: 'bia.ensaio@teste.invalid', tel: '00900000007' };
const PESSOA_DESMARCADA = { nome: 'TESTE Davi Ensaio', email: 'davi.ensaio@teste.invalid', tel: '00900000008' };
// Pelo Node (casos de erro):
const PESSOA_SEM_CATALOGO = { nome: 'TESTE Sem Catalogo', email: 'sem.catalogo@teste.invalid', telefone: '+55 (00) 90000-0003' };
const PESSOA_SEM_CONSENTIMENTO = { nome: 'TESTE Sem Consentimento', email: 'sem.consentimento@teste.invalid', telefone: '+55 (00) 90000-0004' };
const PESSOA_DUPLA = { nome: 'TESTE Envio Duplo', email: 'envio.duplo@teste.invalid', telefone: '+55 (00) 90000-0005' };
// Os dados de antes da migração, gravados pelas portas do v2 (como os do teste de 09/11, prompts/10-prototipo-ligado.md).
// A linha que imita a do Otávio só imita o formato dela (faixa a, nota 86, utm stories, os dois aceites); nada dela é real.
const ANTES = {
  imitaOtavio: { nome: 'TESTE Imita Linha Real', email: 'imita.linha.real@teste.invalid', telefone: '+55 (00) 90000-0011', empresa: '', utm: 'stories', faixa: 'a', nota: 86 },
  ana: { nome: 'TESTE Ana Antes', email: 'ana.antes@teste.invalid', telefone: '+55 (00) 90000-0012', empresa: '=1+1', utm: 'bio', faixa: 'a', nota: 96 },
  bruno: { nome: 'TESTE Bruno Antes', email: 'bruno.antes@teste.invalid', telefone: '+55 (00) 90000-0013', empresa: '', utm: 'stories', faixa: 'eliminatorio', nota: 81 },
  duplo: { nome: 'TESTE Duplo Antes', email: 'duplo.antes@teste.invalid', telefone: '+55 (00) 90000-0014', empresa: '', utm: 'bio', faixa: 'a', nota: 96 }
};
// nada disto pode aparecer nos registros do garçom, do Supabase de mentira e da planilha
const DADO_PESSOAL = /TESTE|teste\.invalid|9000000|90000-00|Marina|Paulo|Carla|Bia |Davi/;

// Respostas do exemplo de base/lead-score.md (v3, mesmos pontos da v2): 96, faixa A. O eliminatório troca o
// faturamento por "Menos de R$ 50 mil" (base/lead-score.md, "Eliminatórios"). As mesmas de testar-quiz-01.js.
const EXEMPLO = {
  ramo: 'Serviços para empresas', faturamento: 'R$ 500 mil a R$ 1,5 milhão', vendedores: '2 ou 3',
  'quem-marca': 'Sim. O vendedor faz tudo', ticket: '10000', origem: 'Indicação de clientes',
  crm: 'Sim, e o time atualiza todo dia', cargo: 'Dono(a) ou sócio(a)',
  numeros: ['200', '50', '50', '40', '2'], causa: 'Em até 1 hora', causa2: '1 ou 2', causa3: 'Alguns'
};
const ELIMINATORIO = Object.assign({}, EXEMPLO, { faturamento: 'Menos de R$ 50 mil' });
// O corte mais restritivo (14.2; quiz-01-pagina v3): faixa c que passa no corte do Júnior. Até a v2 ia para o
// plano; agora vai para o relatório de quem não se qualifica. Nota 24 (a conta está em testar-quiz-01.js, FAIXA_C).
const FAIXA_C = Object.assign({}, EXEMPLO, {
  faturamento: 'R$ 50 mil a R$ 150 mil', ticket: '6000', vendedores: '1', crm: 'Não. Fica no WhatsApp e na cabeça de cada um',
  cargo: 'Vendedor(a)', numeros: ['30', '50', '5', '4', '1']
});
// Faixa B com o funil todo na meta (relatório de funil saudável, que tem o botão "Quero marcar uma conversa"):
// faturamento R$ 150 mil a R$ 500 mil 15 · venda de R$ 10 mil 15 · 2 ou 3 vendedores 10 · 200 leads 10 ·
// CRM "pouca gente atualiza" 7 · vendedor(a) 2 · funil 200 · 50% · 50 · 40 · 10 na meta, dinheiro na mesa zero
// ("menos de 0,5") 3 · tentativas "1 ou 2" 4, sobra "Alguns" 2, primeiro contato "Em até 1 hora" 0 = 68, faixa b.
const FAIXA_B = Object.assign({}, EXEMPLO, {
  faturamento: 'R$ 150 mil a R$ 500 mil', crm: 'Sim, mas pouca gente atualiza', cargo: 'Vendedor(a)',
  numeros: ['200', '50', '50', '40', '10']
});

const COLUNAS_PLANILHA = ['id_pessoa', 'nome', 'telefone', 'email', 'empresa', 'consentimento_whatsapp', 'consentimento_email',
  'lead_score_faixa', 'lead_score_nota', 'respostas_a_confirmar', 'entrou_em', 'tentativas_feitas', 'clique_fim_quiz',
  'estagio', 'estado', 'data_volta', 'canal', 'contato_em', 'reuniao_em', 'produto'];

const novaSessao = () => 'sessao-ensaio-' + randomBytes(4).toString('hex');

// Pacote montado no Node, no formato de montarPacote() da página v3 (para os casos de erro)
function pacoteDeTeste(pessoa, { whatsapp = 'sim', email = 'sim', sessao = novaSessao() } = {}) {
  const agora = new Date().toISOString();
  return {
    pessoa: {
      nome: pessoa.nome, telefone: pessoa.telefone, email: pessoa.email, empresa: '',
      consentimento_whatsapp: whatsapp, consentimento_email: email,
      consentimento_texto: 'Texto do consentimento do ensaio (mentira).', consentimento_em: agora,
      primeira_utm_source: 'bio', primeira_utm_campaign: 'funil-01'
    },
    evento: {
      tipo: 'fim_quiz', funil: 'funil-01', entrega: 'quiz-01', versao_entrega: 2,
      utm_source: 'bio', utm_campaign: 'funil-01', id_sessao: sessao, ocorrido_em: agora,
      respostas: { faturamento: 'R$ 500 mil a R$ 1,5 milhão' },
      lead_score_nota: 96, lead_score_faixa: 'a', lead_score_versao: 3
    }
  };
}
// Evento sem pessoa, no formato de registrarEvento() das páginas
function eventoDeTeste(tipo, { entrega = tipo === 'visita' ? 'landing-page-02' : 'quiz-01', versao = tipo === 'visita' ? 1 : 2, sessao = novaSessao(), extra = {} } = {}) {
  return { evento: Object.assign({ tipo, funil: 'funil-01', entrega, versao_entrega: versao, utm_source: 'bio', utm_campaign: 'funil-01',
    id_sessao: sessao, ocorrido_em: new Date().toISOString() }, extra) };
}
// Pacote do jeito do garçom v3 e da página v2 (antes da migração): quiz-01 versão 1, lead score versão 2
function pacoteDeAntes(p, sessao) {
  const agora = new Date().toISOString();
  return {
    pessoa: {
      nome: p.nome, telefone: p.telefone, email: p.email, empresa: p.empresa,
      consentimento_whatsapp: 'sim', consentimento_email: 'sim',
      consentimento_texto: 'Texto do consentimento de antes (mentira).', consentimento_em: agora,
      primeira_utm_source: p.utm, primeira_utm_campaign: 'funil-01'
    },
    evento: {
      tipo: 'fim_quiz', funil: 'funil-01', entrega: 'quiz-01', versao_entrega: 1,
      utm_source: p.utm, utm_campaign: 'funil-01', id_sessao: sessao, ocorrido_em: agora,
      respostas: { faturamento: 'R$ 500 mil a R$ 1,5 milhão' },
      lead_score_nota: p.nota, lead_score_faixa: p.faixa, lead_score_versao: 2
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

  // ═══ 1. Banco v2, como está no Supabase ═══
  secao('1. Banco v2 (PGlite) como está no Supabase, com os papéis de mentira e dados de antes');
  const db = new PGlite();
  limpezas.push(() => db.close());
  const fila = criarFila();
  const naFila = (f) => fila(f);
  await db.exec(`set time zone 'UTC'`);
  // Os papéis do Supabase, de mentira. "dono" faz o papel do postgres do Supabase, que é dono das
  // tabelas mas não é superusuário. service_role passa por cima da RLS, como no Supabase.
  // As permissões padrão abaixo imitam o pior caso do Supabase (tudo dado a anon, authenticated e
  // service_role no que o dono criar), para conferir que o esquema e a migração tiram tudo sozinhos (#99).
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
  const MIGRACAO = readFileSync(join(RAIZ, 'dados/banco/migracoes/001-v3.sql'), 'utf8');
  const CONFERIR = readFileSync(join(RAIZ, 'dados/banco/conferir.sql'), 'utf8');
  const CATALOGO = readFileSync(join(RAIZ, 'dados/banco/catalogo-prototipo.sql'), 'utf8');

  for (const vez of ['primeira', 'segunda']) {
    let erro = null;
    try { await comoDono(ESQUEMA); } catch (e) { erro = e; }
    conferir(!erro, 'esquema.sql (v2) aplicado pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
  }

  const linhasDoConferir = async () => { const s = await comoDono(CONFERIR); return s[s.length - 1].rows; };
  async function rodarConferir(rotulo) {
    const linhas = await linhasDoConferir();
    for (const l of linhas.filter(l => l.n !== 99)) {
      if (!l.ok) conferir(false, rotulo + ' · conferir.sql ' + l.n + ' (' + l.conferencia + '): encontrado ' + l.encontrado);
    }
    const final = linhas.find(l => l.n === 99);
    conferir(final && final.ok === true && final.encontrado === '18 de 18',
      rotulo + ' · conferir.sql: linha "tudo certo" = ' + (final && final.ok) + ' (' + (final && final.encontrado) + ')');
  }
  {
    // Num banco só v2, o conferir.sql v2 tem de avisar que falta a migração (dados/banco/README.md, "Como conferir")
    const linhas = await linhasDoConferir();
    const falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
    const final = linhas.find(l => l.n === 99);
    conferir(final && final.ok === false && final.encontrado === '11 de 18' && JSON.stringify(falsas) === JSON.stringify([4, 8, 14, 15, 16, 17, 18]),
      'antes da migração · conferir.sql avisa que falta a migração: false nas linhas ' + falsas.join(', ') + ' (' + (final && final.encontrado) + ')');
  }

  // A linha do catálogo que o banco do protótipo já tem (catalogo-prototipo.sql v1, rodado em 09/11)
  await comoDono(`insert into public.entregas (id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em)
    values ('quiz-01', 1, 'quiz', 'funil-01', 'entregas/quizzes/quiz-01/pagina/', pg_catalog.now() - interval '6 hours')
    on conflict (id_entrega, versao) do nothing`);
  const dataDaLinhaAntiga = (await naFila(() => db.query(`select publicada_em::text as d from public.entregas where id_entrega = 'quiz-01' and versao = 1`))).rows[0].d;

  // Permissões de verdade, trocando de papel
  const comoPapel = (papel, sql, params = []) => naFila(() => db.transaction(async (tx) => {
    await tx.exec('set local role ' + papel);
    return tx.query(sql, params);
  }));
  const codigoComo = async (papel, sql, params) => {
    try { await comoPapel(papel, sql, params); return 'ok'; } catch (e) { return e.code || 'sem codigo'; }
  };

  // Dados de antes, pela porta do v2 (registrar_fim_quiz com a chave publicável), como os do teste de 09/11
  const gravarAntes = (p, sessao) => codigoComo('anon', 'select public.registrar_fim_quiz($1::jsonb)', [JSON.stringify(pacoteDeAntes(p, sessao))]);
  const gravados = [
    await gravarAntes(ANTES.imitaOtavio, 'sessao-antes-1'), await gravarAntes(ANTES.ana, 'sessao-antes-2'),
    await gravarAntes(ANTES.bruno, 'sessao-antes-3'), await gravarAntes(ANTES.duplo, 'sessao-antes-4'), await gravarAntes(ANTES.duplo, 'sessao-antes-5')
  ];
  // Eles foram gravados de manhã: o gravado_em volta 6 horas, como o superusuário do PGlite, com os gatilhos
  // desligados só nesta sessão (o mesmo contorno da seção 7; ver README.md, "O contorno da margem de 1 minuto").
  await naFila(async () => {
    await db.exec(`set session_replication_role = replica`);
    try { await db.query(`update public.eventos set gravado_em = gravado_em - interval '6 hours', ocorrido_em = ocorrido_em - interval '6 hours'`); }
    finally { await db.exec(`set session_replication_role = origin`); }
  });
  const contar = async (sql, params = []) => Number((await naFila(() => db.query(sql, params))).rows[0].n);
  conferir(gravados.every(g => g === 'ok') && await contar(`select count(*) as n from public.pessoas`) === 4 && await contar(`select count(*) as n from public.eventos`) === 5,
    'dados de antes pelo v2: 4 pessoas e 5 fins de quiz de teste (uma linha que imita a do Otávio, faixa a, nota 86, stories; uma faixa a com empresa "=1+1"; um eliminatório; uma pessoa com dois envios)');

  // ═══ 2. Migração 001 duas vezes ═══
  secao('2. Migração 001 (v3) duas vezes sobre os dados de antes');
  // fotografia dos dados: cada linha das tabelas com dado, em ordem fixa (como em dados/banco/testar-migracao.mjs)
  const fotografia = async () => (await naFila(() => db.query(`
    select (select count(*) from public.pessoas) as pessoas, (select count(*) from public.eventos) as eventos,
           (select md5(coalesce(string_agg(to_jsonb(p)::text, '|' order by p.id_pessoa), '')) from public.pessoas p) as h_pessoas,
           (select md5(coalesce(string_agg((to_jsonb(e) - 'clique_fim_quiz')::text, '|' order by e.id_evento), '')) from public.eventos e) as h_eventos,
           (select md5(coalesce(string_agg(to_jsonb(x)::text, '|' order by x.id_entrega, x.versao), '')) from public.entregas x) as h_entregas`))).rows[0];
  // fotografia do esquema: restrições, colunas, funções e permissões
  const esquemaAtual = async () => (await naFila(() => db.query(`
    select md5(concat_ws('#',
      (select string_agg(conname || '=' || pg_get_constraintdef(oid) || convalidated, '|' order by conname) from pg_constraint where connamespace = 'public'::regnamespace),
      (select string_agg(attrelid::regclass::text || '.' || attname || ':' || format_type(atttypid, atttypmod), '|' order by attrelid::regclass::text, attnum)
         from pg_attribute where attrelid in (select oid from pg_class where relnamespace = 'public'::regnamespace) and attnum > 0 and not attisdropped),
      (select string_agg(proname || '(' || pg_get_function_identity_arguments(oid) || ')' || md5(prosrc) || coalesce(proacl::text, 'padrao') || prosecdef || coalesce(array_to_string(proconfig, ','), ''), '|' order by proname)
         from pg_proc where pronamespace = 'public'::regnamespace),
      (select string_agg(relname || coalesce(relacl::text, 'padrao') || relrowsecurity, '|' order by relname) from pg_class where relnamespace = 'public'::regnamespace)
    )) as h`))).rows[0].h;
  const antesDaMigracao = await fotografia();
  let esquemaDaPrimeira = null;
  for (const vez of ['primeira', 'segunda']) {
    let erro = null;
    try { await comoDono(MIGRACAO); } catch (e) { erro = e; }
    conferir(!erro, 'migracoes/001-v3.sql aplicada pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
    const depois = await fotografia();
    conferir(JSON.stringify(depois) === JSON.stringify(antesDaMigracao),
      vez + ' vez: os dados de antes não mudaram (' + depois.pessoas + ' pessoas e ' + depois.eventos + ' eventos, cada linha igual)');
    const h = await esquemaAtual();
    if (vez === 'primeira') esquemaDaPrimeira = h;
    else conferir(h === esquemaDaPrimeira, 'segunda vez: restrições, colunas, funções e permissões iguais às da primeira');
  }
  conferir(await contar(`select count(*) as n from public.eventos where clique_fim_quiz is not null`) === 0, 'clique_fim_quiz nasceu vazio nos eventos de antes');
  fotografiaDeAntesInicial = await fotografiaDeAntes(naFila, db);
  await rodarConferir('depois da migração');

  const TABELAS = ['entregas', 'pessoas', 'eventos', 'investimento'];
  const VISOES = ['painel_numeros', 'contagem_analises_gratuitas'];
  const REGISTRAR = `select public.registrar_fim_quiz('{}'::jsonb)`;
  const EVENTO = `select public.registrar_evento('{}'::jsonb)`;
  const LEADS = `select * from public.leads_para_planilha()`;

  let c = await codigoComo('anon', REGISTRAR);
  conferir(c === '22023', 'anon executa registrar_fim_quiz (passa da permissão e para na conferência do pacote: ' + c + ')');
  c = await codigoComo('anon', EVENTO);
  conferir(c === '22023', 'anon executa registrar_evento, a porta nova (passa da permissão e para na conferência do pacote: ' + c + ')');
  for (const t of [...TABELAS, ...VISOES]) {
    c = await codigoComo('anon', `select * from public.${t} limit 1`);
    conferir(c === '42501', 'anon não lê ' + (VISOES.includes(t) ? 'a visão ' : 'a tabela ') + t + ' (' + c + ')');
  }
  c = await codigoComo('anon', `insert into public.pessoas (nome) values ('x')`);
  conferir(c === '42501', 'anon não grava direto na tabela pessoas (' + c + ')');
  c = await codigoComo('anon', `insert into public.eventos (tipo) values ('visita')`);
  conferir(c === '42501', 'anon não grava direto na tabela eventos (' + c + ')');
  c = await codigoComo('anon', LEADS);
  conferir(c === '42501', 'anon não chama leads_para_planilha (' + c + ')');
  c = await codigoComo('anon', `select public.eventos_imutaveis()`);
  conferir(c === '42501', 'anon não chama a função da trava (' + c + ')');
  for (const [sql, rotulo] of [[REGISTRAR, 'registrar_fim_quiz'], [EVENTO, 'registrar_evento'], [LEADS, 'leads_para_planilha'], [`select * from public.pessoas limit 1`, 'a tabela pessoas'], [`select * from public.painel_numeros limit 1`, 'a visão painel_numeros']]) {
    c = await codigoComo('authenticated', sql);
    conferir(c === '42501', 'authenticated não pode ' + rotulo + ' (' + c + ')');
  }
  c = await codigoComo('service_role', LEADS);
  conferir(c === 'ok', 'service_role chama leads_para_planilha (' + c + ')');
  for (const [sql, rotulo] of [[REGISTRAR, 'executar registrar_fim_quiz'], [EVENTO, 'executar registrar_evento'], [`select * from public.pessoas limit 1`, 'ler a tabela pessoas'], [`select * from public.eventos limit 1`, 'ler a tabela eventos'], [`select * from public.painel_numeros limit 1`, 'ler a visão painel_numeros']]) {
    c = await codigoComo('service_role', sql);
    conferir(c === '42501', 'service_role não pode ' + rotulo + ' (' + c + ')');
  }
  for (const [sql, rotulo] of [[REGISTRAR, 'registrar_fim_quiz'], [EVENTO, 'registrar_evento']]) {
    c = await codigoComo('outro_papel', sql);
    conferir(c === '42501', 'um papel qualquer, sem permissão dada (PUBLIC), não executa ' + rotulo + ' (' + c + ')');
  }

  // ═══ 3. Supabase de mentira ═══
  secao('3. Supabase de mentira em 127.0.0.1');
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
  let lidos = [];
  try { lidos = JSON.parse(r.texto); } catch { /* fica vazio */ }
  conferir(r.status === 200 && lidos.length === 3 && lidos.every(l => 'clique_fim_quiz' in l),
    'chave secreta (service_role) chama leads_para_planilha v3: 200, os 3 leads de antes nas faixas a e b, com o campo do clique (' + r.status + ', ' + lidos.length + ')');
  r = await direto('/rest/v1/rpc/funcao_que_nao_existe', { chave: CHAVE_SECRETA, corpo: {} });
  conferir(r.status === 404, 'função que não existe: 404 (' + r.status + ')');

  // ═══ 4. Site montado e garçom ═══
  secao('4. Site montado e garçom rodando localmente');
  let montou = true, saidaMontador = '';
  try { saidaMontador = execFileSync(process.execPath, [join(PROTOTIPO, 'montar-site.mjs')], { cwd: RAIZ, stdio: 'pipe' }).toString(); } catch { montou = false; }
  conferir(montou && existsSync(join(SITE, 'quiz/index.html')) && /nenhuma página pede arquivo a outro endereço/.test(saidaMontador),
    'montar-site.mjs: site montado em entregas/prototipo-funil-01/site/ (fora do Git), sem nenhuma página pedindo arquivo a outro endereço');
  const LISTA_FONTES = JSON.parse(readFileSync(join(RAIZ, 'nucleo/ferramentas/fontes/fontes.json'), 'utf8'));
  const arquivosDeFonte = [...LISTA_FONTES.quiz.map(f => 'quiz/fontes/' + f.arquivo), ...LISTA_FONTES['landing-02'].map(f => 'fontes/' + f.arquivo)];
  conferir(arquivosDeFonte.every(a => existsSync(join(SITE, a))), 'as fontes estão no site montado, ao lado das páginas (' + arquivosDeFonte.length + ' arquivos; 10.7)');

  const temp = mkdtempSync(join(tmpdir(), 'ensaio-safra-'));
  limpezas.push(() => rmSync(temp, { recursive: true, force: true }));
  const portaGarcom = await portaLivre();
  const BASE = 'http://127.0.0.1:' + portaGarcom;
  const saidaGarcom = [];
  const registroDeRede = join(temp, 'rede-de-fora.txt');
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

    // A trava de rede (rede-so-local.cjs), copiada para a pasta temporária (sem espaço no caminho, para o NODE_OPTIONS):
    // todo pedido do wrangler para fora da máquina é recusado e anotado. E os quatro avisos que o wrangler entende para
    // não procurar versão nova, não mandar métricas e não buscar o cf.json da Cloudflare.
    copyFileSync(join(AQUI, 'rede-so-local.cjs'), join(temp, 'rede-so-local.cjs'));
    writeFileSync(registroDeRede, '');
    const proc = spawn(WRANGLER, ['dev', '--local', '--config', join(temp, 'wrangler.toml'),
      '--ip', '127.0.0.1', '--port', String(portaGarcom), '--inspector-port', String(await portaLivre()),
      '--persist-to', join(temp, 'estado'), '--env-file', join(temp, 'segredos-de-mentira.env'),
      '--show-interactive-dev-session=false', '--log-level', 'log'], {
      cwd: temp, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, WRANGLER_SEND_METRICS: 'false', DO_NOT_TRACK: '1', WRANGLER_HIDE_BANNER: 'true', CLOUDFLARE_CF_FETCH_ENABLED: 'false',
        WRANGLER_LOG_PATH: join(temp, 'registros'), NO_COLOR: '1', CI: '1',
        NODE_OPTIONS: ((process.env.NODE_OPTIONS || '') + ' --require ' + join(temp, 'rede-so-local.cjs')).trim(), ENSAIO_REDE_REGISTRO: registroDeRede }
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
    // Sem charset, como a Cloudflare entrega (pedido 09): quem acrescenta é o garçom
    const TIPOS = { '.html': 'text/html', '.css': 'text/css', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.txt': 'text/plain' };
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

  for (const [caminho, rotulo] of [['/', 'landing-page-02'], ['/quiz/', 'quiz']]) {
    const x = await fetch(BASE + caminho);
    const html = await x.text();
    conferir(x.status === 200 && x.headers.get('x-robots-tag') === 'noindex' && /<meta\s+name="robots"[^>]*noindex/.test(html),
      'GET ' + caminho + ' (' + rotulo + '): 200, X-Robots-Tag noindex e meta noindex (' + x.status + ')');
    // pedido 09: o cabeçalho com charset e, de reserva, a meta charset nos primeiros 1024 bytes
    const tipo = x.headers.get('content-type') || '';
    const inicio1024 = Buffer.from(html, 'utf8').subarray(0, 1024).toString('utf8');
    conferir(/^text\/html\s*;.*charset=utf-8/i.test(tipo) && /<meta\s+charset=["']?utf-8/i.test(inicio1024),
      'GET ' + caminho + ' (' + rotulo + '): Content-Type com charset utf-8 (' + tipo + ') e meta charset nos primeiros 1024 bytes');
  }
  // O estilo e o programa da landing-page-02, pelo nome que o index.html dela cita (v4)
  const indexDaLanding = readFileSync(join(SITE, 'index.html'), 'utf8');
  const estiloDaLanding = (indexDaLanding.match(/href="(\/assets\/[^"]+\.css)"/) || [])[1] || '/assets/sem-estilo.css';
  const programaDaLanding = (indexDaLanding.match(/src="(\/assets\/[^"]+\.js)"/) || [])[1] || '/assets/sem-programa.js';
  for (const [caminho, tipoCerto] of [[estiloDaLanding, /^text\/css\s*;.*charset=utf-8/i], [programaDaLanding, /^(text|application)\/javascript\s*;.*charset=utf-8/i]]) {
    const x = await fetch(BASE + caminho);
    await x.arrayBuffer();
    const tipo = x.headers.get('content-type') || '';
    conferir(x.status === 200 && tipoCerto.test(tipo), 'GET ' + caminho + ': Content-Type com charset utf-8 (' + tipo + ')');
  }
  let x = await fetch(BASE + '/api/nao-existe');
  conferir(x.status === 404 && x.headers.get('x-robots-tag') === 'noindex', 'GET /api/nao-existe: 404 com noindex (' + x.status + ')');
  x = await fetch(BASE + '/api/evento', { method: 'OPTIONS', headers: { Origin: BASE } });
  await x.arrayBuffer();
  conferir(x.status === 405 && !x.headers.get('access-control-allow-origin'), 'OPTIONS /api/evento: 405 sem cabeçalho de CORS (22.2; ' + x.status + ')');

  // ═══ 5. Catálogo ═══
  secao('5. Catálogo de entregas v3 (perguntas 23.10, 32.4 e 34.4; landing-page-02)');
  const postFimQuiz = (pacote, origem = BASE) => fetch(BASE + '/api/fim-quiz', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origem }, body: JSON.stringify(pacote)
  });
  const postEvento = (pacote, origem = BASE) => fetch(BASE + '/api/evento', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origem }, body: JSON.stringify(pacote)
  });
  const ultimaDoBanco = () => supabase.registro[supabase.registro.length - 1];
  const pessoasDeAntes = await contar(`select count(*) as n from public.pessoas`);
  const eventosDeAntes = await contar(`select count(*) as n from public.eventos`);
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CATALOGO));
  let u = ultimaDoBanco();
  conferir(x.status === 422 && u.rota === '/rest/v1/rpc/registrar_fim_quiz' && u.status === 409,
    'sem a linha (quiz-01, 2), o fim do quiz da página nova é recusado pela chave estrangeira (409) e o garçom responde ' + x.status);
  x = await postEvento(eventoDeTeste('visita'));
  u = ultimaDoBanco();
  conferir(x.status === 422 && u.rota === '/rest/v1/rpc/registrar_evento' && u.status === 409,
    'sem a linha (landing-page-02, 1), a visita é recusada (409 no banco, ' + x.status + ' no garçom)');
  x = await postEvento(eventoDeTeste('inicio_quiz'));
  u = ultimaDoBanco();
  conferir(x.status === 422 && u.rota === '/rest/v1/rpc/registrar_evento' && u.status === 409,
    'sem a linha (quiz-01, 2), o início do quiz é recusado (409 no banco, ' + x.status + ' no garçom)');
  conferir(await contar(`select count(*) as n from public.pessoas`) === pessoasDeAntes && await contar(`select count(*) as n from public.eventos`) === eventosDeAntes,
    'e nada novo ficou no banco');
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CATALOGO), 'http://127.0.0.1:1');
  conferir(x.status === 403, 'outra origem no fim do quiz: 403 (' + x.status + ')');
  x = await postEvento(eventoDeTeste('visita'), 'http://127.0.0.1:1');
  conferir(x.status === 403, 'outra origem na visita: 403 (' + x.status + ')');
  const LINHAS_DO_CATALOGO = 'landing-page-01 1 landing|landing-page-02 1 landing|quiz-01 1 quiz|quiz-01 2 quiz';
  for (const vez of ['primeira', 'segunda']) {
    let erro = null, linhas = [];
    try { const s = await comoDono(CATALOGO); linhas = s[s.length - 1].rows; } catch (e) { erro = e; }
    const vistas = linhas.map(l => l.id_entrega + ' ' + l.versao + ' ' + l.tipo_entrega).join('|');
    conferir(!erro && vistas === LINHAS_DO_CATALOGO && linhas.every(l => l.retirada_em === null && l.publicada_em),
      'dados/banco/catalogo-prototipo.sql (v3) aplicado pelo dono, ' + vez + ' vez: mostra as quatro linhas (' + (erro ? erro.message : vistas.replace(/\|/g, '; ')) + ')');
  }
  const dataDepois = (await naFila(() => db.query(`select publicada_em::text as d from public.entregas where id_entrega = 'quiz-01' and versao = 1`))).rows[0].d;
  conferir(await contar(`select count(*) as n from public.entregas`) === 4 && dataDepois === dataDaLinhaAntiga,
    'catálogo com quatro linhas (rodar de novo não duplica) e a linha antiga (quiz-01, 1) com a mesma data');

  // ═══ 6. Landing e quiz no navegador sem tela ═══
  secao('6. Landing e quiz no navegador sem tela (só 127.0.0.1)');
  // Sem os tratadores de sinal do Playwright: senão ele encerra o processo no Ctrl+C antes de
  // limparTudo() desligar o wrangler, o workerd e a pasta temporária.
  // O próprio Chromium, por conta dele, fala com o Google em segundo plano (atualização, conta, mensagens), mesmo
  // sem a página pedir nada. Para nada sair: todo nome que não seja 127.0.0.1 vira "não encontrado", e todo pedido
  // de fora vai para um proxy que não existe (127.0.0.1:9). O registro de rede do Chromium (netlog) fica na pasta
  // temporária e é conferido no fechamento.
  const netlog = join(temp, 'netlog-do-navegador.json');
  const navegador = await chromium.launch({ executablePath: acharChromium(), handleSIGINT: false, handleSIGTERM: false, handleSIGHUP: false,
    args: ['--host-resolver-rules=MAP * ~NOTFOUND , EXCLUDE 127.0.0.1', '--proxy-server=http://127.0.0.1:9', '--log-net-log=' + netlog] });
  limpezas.push(() => navegador.close());
  const fora = [];            // todo pedido do navegador para fora de 127.0.0.1 (deve ficar vazio)
  const consoleTexto = [];
  const tipoDoPedido = (rq) => { try { return JSON.parse(rq.postData() || '{}').evento.tipo; } catch { return null; } };
  const ehEvento = (tipo) => (rr) => rr.url() === BASE + '/api/evento' && rr.request().method() === 'POST' && tipoDoPedido(rr.request()) === tipo;

  async function novoContexto(largura, { eventoForaDoAr = false } = {}) {
    const ctx = await navegador.newContext({ viewport: { width: largura, height: largura === 375 ? 812 : 900 }, reducedMotion: 'reduce' });
    // Só 127.0.0.1: qualquer outro endereço é anotado e bloqueado (desde a v3, nada deve tentar sair; 10.7)
    await ctx.route('**/*', (rota) => {
      const end = rota.request().url();
      if (end.startsWith(BASE + '/') || end.startsWith('data:')) {
        if (eventoForaDoAr && end === BASE + '/api/evento') return rota.abort();
        return rota.continue();
      }
      fora.push(new URL(end).hostname || end.slice(0, 20));
      return rota.abort();
    });
    return ctx;
  }
  const lerPagina = (page) => page.evaluate(async () => {
    await document.fonts.ready;
    return { charset: document.characterSet, modo: document.compatMode, titulo: document.title,
      fontes: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '')) };
  });

  // Os botões da landing-page-02 que levam ao quiz (v4): o do topo e o grande, que se repete pela página
  const BOTAO_DO_TOPO = 'Fazer a Análise', BOTAO_GRANDE = 'Faça uma Análise Estratégica';
  const botaoDaLanding = (page, texto) => page.locator('button:visible', { hasText: texto }).first();
  async function fazerQuiz({ landing, busca, respostas, pessoa, largura, telaFinal, desmarcar = false, clique = null, botao = BOTAO_GRANDE }) {
    const ctx = await novoContexto(largura);
    const page = await ctx.newPage();
    const api = [];
    page.on('console', m => consoleTexto.push(m.text()));
    page.on('response', rr => { const e = new URL(rr.url()); if (rr.url().startsWith(BASE + '/api/')) api.push({ rota: e.pathname, tipo: tipoDoPedido(rr.request()), status: rr.status() }); });
    try {
      const visita = page.waitForResponse(ehEvento('visita'), { timeout: 15000 });
      await page.goto(BASE + landing + busca);
      const rv = await visita;
      const naLanding = await lerPagina(page);
      const inicioQuiz = page.waitForResponse(ehEvento('inicio_quiz'), { timeout: 15000 });
      await botaoDaLanding(page, botao).click();
      await page.waitForURL(/\/quiz\/\?/, { timeout: 15000 });
      const ri = await inicioQuiz;
      const endereco = new URL(page.url());
      const noQuiz = await lerPagina(page);
      const naTela = (id) => page.waitForFunction(i => location.hash === '#' + i, id, { timeout: 15000 });
      const opcao = (v) => page.locator('[data-corpo] .opcao[data-valor="' + v + '"]').click();
      await naTela('abertura'); // v5: o quiz abre na abertura (a capa saiu do funil, quiz-01-pagina v4)
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
      // A caixa única (13.4) já vem marcada
      const caixaMarcada = await page.locator('#consAceite').isChecked();
      const caixas = await page.locator('input[type="checkbox"]').count();
      if (desmarcar) await page.uncheck('#consAceite');
      const fim = desmarcar ? null : page.waitForResponse(rr => rr.url() === BASE + '/api/fim-quiz' && rr.request().method() === 'POST', { timeout: 15000 });
      await page.click('#enviar');
      const rf = fim ? await fim : null;
      // Espera a tela do fim, qualquer que seja; a conferência diz se foi a esperada (assim um corte errado vira FALHOU, não erro)
      await page.waitForFunction(() => /^#(plano|relatorio(-nao|-saudavel|-saudavel-nao)?)$/.test(location.hash), null, { timeout: 15000 });
      const chegou = await page.evaluate(() => location.hash);
      let rc = null;
      if (clique && chegou === '#' + telaFinal) {
        const doClique = desmarcar ? null : page.waitForResponse(ehEvento('interesse_pos_relatorio'), { timeout: 15000 });
        await page.locator('[data-acao="' + clique + '"]').first().click();
        rc = doClique ? await doClique : null;
      }
      await page.waitForTimeout(desmarcar ? 1000 : 300);
      const aviso = await page.locator('#avisoEnvio').isVisible();
      return { endereco, sessao: endereco.searchParams.get('id_sessao'), visita: rv.status(), inicio: ri.status(), fim: rf && rf.status(),
        clique: rc && rc.status(), aviso, caixaMarcada, caixas, naLanding, noQuiz, api, telaFinal: chegou };
    } finally {
      await ctx.close();
    }
  }

  // Lead 1: landing-page-02 pelo botão do topo, utm bio, 1440, o exemplo do lead score (96, faixa a), caixa marcada
  const q1 = await fazerQuiz({ landing: '/', busca: '?utm_source=bio&utm_campaign=funil-01', respostas: EXEMPLO, pessoa: PESSOA_A, largura: 1440, telaFinal: 'plano', botao: BOTAO_DO_TOPO });
  conferir(q1.visita === 201, 'landing: a visita foi gravada (POST /api/evento, ' + q1.visita + ')');
  conferir(q1.naLanding.modo === 'CSS1Compat' && q1.naLanding.charset === 'UTF-8', 'landing: modo padrão (' + q1.naLanding.modo + ') e UTF-8 (34.13)');
  conferir(LISTA_FONTES['landing-02'].length === 0 || q1.naLanding.fontes.includes('Geist'), 'landing: Geist carregada de /fontes/, sem o Google (' + q1.naLanding.fontes.join(', ') + ')');
  conferir(q1.endereco.pathname === '/quiz/' && q1.endereco.searchParams.get('utm_source') === 'bio' && q1.endereco.searchParams.get('utm_campaign') === 'funil-01' && /^sessao-[a-z0-9-]{1,60}$/.test(q1.sessao || ''),
    'landing: o botão do topo ("' + BOTAO_DO_TOPO + '") leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco');
  conferir(q1.inicio === 201, 'quiz: o início do quiz foi gravado ao abrir (POST /api/evento, ' + q1.inicio + ')');
  conferir(q1.noQuiz.modo === 'CSS1Compat' && q1.noQuiz.charset === 'UTF-8' && q1.noQuiz.titulo.includes('público') && q1.noQuiz.titulo.includes('Análise') && !/Ã|Â/.test(q1.noQuiz.titulo),
    'quiz: modo padrão (' + q1.noQuiz.modo + '; 09.1), lido como UTF-8, título com os acentos certos');
  // v5: o quiz abre na abertura, com o cabeçalho e o botão da landing-page-02 (Geist); a letra de mão (Permanent Marker) fica para o relatório
  conferir(['Inter', 'Space Grotesk', 'Geist'].every(n => q1.noQuiz.fontes.includes(n)), 'quiz: Inter, Space Grotesk e Geist carregadas de /quiz/fontes/ na abertura (' + q1.noQuiz.fontes.join(', ') + ')');
  conferir(q1.caixaMarcada && q1.caixas === 1, 'quiz: uma caixa de aceite só, já marcada (13.4)');
  conferir(q1.fim === 201 && !q1.aviso && q1.telaFinal === '#plano', 'lead A: POST /api/fim-quiz gravado (' + q1.fim + '), tela do plano, sem aviso de falha');

  // Lead 2: landing-page-02 pelo botão grande, utm stories, 375, eliminatório, caixa marcada, clique "Tenho interesse"
  const q2 = await fazerQuiz({ landing: '/', busca: '?utm_source=stories&utm_campaign=funil-01', respostas: ELIMINATORIO, pessoa: PESSOA_ELIM, largura: 375, telaFinal: 'relatorio-nao', clique: 'interesse' });
  conferir(q2.visita === 201 && q2.naLanding.modo === 'CSS1Compat', 'landing em 375: a visita foi gravada (' + q2.visita + ') e a página está no modo padrão (' + q2.naLanding.modo + ')');
  conferir(q2.endereco.pathname === '/quiz/' && q2.endereco.searchParams.get('utm_source') === 'stories', 'landing em 375: o botão grande ("' + BOTAO_GRANDE + '...") leva a /quiz/ com utm_source=stories');
  conferir(q2.fim === 201 && !q2.aviso && q2.telaFinal === '#relatorio-nao', 'eliminatório: POST /api/fim-quiz gravado (' + q2.fim + '), tela do relatório de não qualificado, sem aviso de falha');
  conferir(q2.clique === 201, 'eliminatório: o clique "Tenho interesse" foi gravado (POST /api/evento, ' + q2.clique + ')');

  // Lead 3: o corte mais restritivo (14.2): faixa c que passa no corte do Júnior vai para o relatório de quem não se qualifica
  const q3 = await fazerQuiz({ landing: '/', busca: '?utm_source=bio&utm_campaign=funil-01', respostas: FAIXA_C, pessoa: PESSOA_CORTE, largura: 1440, telaFinal: 'relatorio-nao', clique: 'interesse' });
  conferir(q3.fim === 201 && q3.telaFinal === '#relatorio-nao' && q3.clique === 201,
    'corte mais restritivo: quem passa no corte do Júnior e fica na faixa c vai para o relatório de não qualificado (antes, plano); fim do quiz e clique gravados (' + q3.telaFinal + ')');

  // Lead 4: faixa b com o funil todo na meta (relatório saudável), clique "Quero marcar uma conversa"
  const q4 = await fazerQuiz({ landing: '/', busca: '?utm_source=bio&utm_campaign=funil-01', respostas: FAIXA_B, pessoa: PESSOA_B, largura: 375, telaFinal: 'relatorio-saudavel', clique: 'marcar' });
  conferir(q4.fim === 201 && !q4.aviso && q4.telaFinal === '#relatorio-saudavel' && q4.clique === 201, 'faixa b: fim do quiz gravado (' + q4.fim + '), relatório do funil saudável, clique "Quero marcar uma conversa" gravado (' + q4.clique + ')');

  // Lead 5: as mesmas respostas da faixa b, com a caixa desmarcada (13.4; 30.3): nada da pessoa vai a lugar nenhum
  const q5 = await fazerQuiz({ landing: '/', busca: '?utm_source=bio&utm_campaign=funil-01', respostas: FAIXA_B, pessoa: PESSOA_DESMARCADA, largura: 1440, telaFinal: 'relatorio-saudavel', desmarcar: true, clique: 'marcar' });
  conferir(q5.visita === 201 && q5.inicio === 201, 'desmarcada: a visita e o início do quiz, que vêm antes da caixa e não têm pessoa, foram gravados (34.18)');
  conferir(!q5.api.some(a => a.rota === '/api/fim-quiz') && !q5.api.some(a => a.tipo === 'interesse_pos_relatorio') && !q5.aviso && q5.telaFinal === '#relatorio-saudavel',
    'desmarcada: nenhum POST /api/fim-quiz e nenhum clique mandado; o diagnóstico aparece na tela, sem aviso');

  // A conferência da landing que ficou fora do repositório na etapa 34 (34.17), no que não repete o que está acima
  {
    // Com o garçom fora do ar para a visita, a página não muda e o botão leva ao quiz com a sessão (10.10)
    const ctx = await novoContexto(375, { eventoForaDoAr: true });
    const page = await ctx.newPage();
    page.on('console', m => consoleTexto.push(m.text()));
    await page.goto(BASE + '/?utm_source=bio');
    await botaoDaLanding(page, BOTAO_GRANDE).click();
    await page.waitForURL(/\/quiz\/\?/, { timeout: 15000 }).catch(() => {});
    const ida = new URL(page.url());
    conferir(ida.pathname === '/quiz/' && ida.searchParams.get('utm_source') === 'bio' && /^sessao-[a-z0-9-]{1,60}$/.test(ida.searchParams.get('id_sessao') || '') && !ida.searchParams.has('utm_campaign'),
      'landing com /api/evento fora do ar: o botão continua levando a /quiz/ com a utm presente e a sessão (10.10)');
    await ctx.close();
    // Aberta direto do arquivo, para revisão: não manda nada (sem rota de bloqueio: só se anota)
    const ctx2 = await navegador.newContext();
    const pedidos = [];
    ctx2.on('request', rq => pedidos.push(rq.url()));
    const p2 = await ctx2.newPage();
    await p2.goto(pathToFileURL(join(RAIZ, 'entregas/landings/landing-page-02/pagina/index.html')).href + '?utm_source=bio');
    await p2.waitForTimeout(300);
    await ctx2.close();
    conferir(pedidos.every(end => end.startsWith('file:') || end.startsWith('data:')), 'a landing-page-02 aberta pelo arquivo (file://): nada é enviado e nada é pedido a outro endereço (' + pedidos.length + ' pedidos, todos file: ou data:)');
  }
  conferir(consoleTexto.every(t => !DADO_PESSOAL.test(t)), 'console das páginas sem dado de pessoa (' + consoleTexto.length + ' linhas)');

  // No banco
  const linhaPessoa = async (email) => (await naFila(() => db.query(`select * from public.pessoas where email = $1`, [email]))).rows;
  // Só os eventos com nota ou clique (o fim do quiz e o clique no fim). A visita e o início do quiz da mesma
  // sessão também ficam ligados à pessoa, pelo fim do quiz (6.2; esquema v2), e são conferidos pela sessão.
  const eventosDe = async (id) => (await naFila(() => db.query(`select * from public.eventos where id_pessoa = $1 and tipo in ('fim_quiz', 'interesse_pos_relatorio') order by gravado_em`, [id]))).rows;
  const eventosDaSessao = async (s) => (await naFila(() => db.query(`select * from public.eventos where id_sessao = $1 order by gravado_em`, [s || '']))).rows;
  // Se um lead não gravou, as seções seguintes rodam assim mesmo, com um id vazio que não acha
  // ninguém: as conferências dele dão FALHOU e o código final continua 1.
  const VAZIO = { id_pessoa: '00000000-0000-0000-0000-000000000000' };
  const paDoBanco = (await linhaPessoa(PESSOA_A.email))[0];
  const pa = paDoBanco || VAZIO;
  const ea = paDoBanco ? await eventosDe(pa.id_pessoa) : [];
  conferir(paDoBanco && pa.nome === PESSOA_A.nome && pa.telefone === '+55 (00) 90000-0001', 'banco · pessoas: o lead A, com nome TESTE, e-mail @teste.invalid e telefone como a página mandou');
  // a caixa única preenche os dois consentimentos com o mesmo valor e o mesmo texto (#104)
  const fonteQuiz = readFileSync(join(RAIZ, 'entregas/quizzes/quiz-01/pagina/index.html'), 'utf8');
  const doQuiz = (campo) => (fonteQuiz.match(new RegExp('^\\s*' + campo + ":'([^']+)'", 'm')) || [])[1];
  const esperadoCons = [doQuiz('texto'), 'Tudo explicado na política de privacidade', doQuiz('caixa')];
  const textoCons = paDoBanco ? pa.consentimento_texto : '';
  conferir(paDoBanco && pa.consentimento_whatsapp === 'sim' && pa.consentimento_email === 'sim' && pa.consentimento_em instanceof Date,
    'banco · pessoas: a caixa marcada vira consentimento por WhatsApp e por e-mail, com a data (#104)');
  conferir(esperadoCons.every(t => t && textoCons.includes(t)) && /diagnóstico/.test(textoCons) && !/Ã|Â|�/.test(textoCons),
    'banco · pessoas: texto aceito com os acentos certos (o combinado, a política de privacidade e a caixa, iguais aos da página)');
  conferir(paDoBanco && pa.primeira_utm_source === 'bio' && pa.primeira_utm_campaign === 'funil-01', 'banco · pessoas: primeira visita bio, funil-01');
  conferir(ea.length === 1 && ea[0].tipo === 'fim_quiz' && ea[0].lead_score_nota === 96 && ea[0].lead_score_faixa === 'a' && ea[0].lead_score_versao === 3,
    'banco · eventos: um fim_quiz do lead A com nota 96, faixa a, versão 3 do lead score' + (ea[0] ? ' (veio ' + ea[0].lead_score_nota + ', ' + ea[0].lead_score_faixa + ', v' + ea[0].lead_score_versao + ')' : ''));
  conferir(ea.length === 1 && ea[0].funil === 'funil-01' && ea[0].entrega === 'quiz-01' && ea[0].versao_entrega === 2 && ea[0].utm_source === 'bio' && ea[0].utm_campaign === 'funil-01' && ea[0].gravado_por === 'garcom' && ea[0].id_sessao === q1.sessao,
    'banco · eventos: etiquetas funil-01, quiz-01 versão 2, utm bio e funil-01, gravado pelo garçom, com a sessão que veio da landing');
  conferir(ea.length === 1 && ea[0].respostas && ea[0].respostas.faturamento === EXEMPLO.faturamento && Array.isArray(ea[0].respostas.numeros), 'banco · eventos: as respostas do quiz gravadas');
  {
    const s1 = await eventosDaSessao(q1.sessao);
    const vis = s1.find(e => e.tipo === 'visita'), ini = s1.find(e => e.tipo === 'inicio_quiz');
    conferir(s1.map(e => e.tipo).join(',') === 'visita,inicio_quiz,fim_quiz',
      'banco · a sessão do lead A tem, na ordem, visita, início do quiz e fim do quiz (' + s1.map(e => e.tipo).join(', ') + ')');
    conferir(vis && vis.entrega === 'landing-page-02' && vis.versao_entrega === 1 && vis.utm_source === 'bio' && vis.utm_campaign === 'funil-01' && vis.id_pessoa === pa.id_pessoa && vis.gravado_por === 'garcom',
      'banco · visita: landing-page-02 versão 1, utm bio e funil-01, gravada pelo garçom sem pessoa e ligada à pessoa pelo fim do quiz da mesma sessão (6.2)');
    conferir(ini && ini.entrega === 'quiz-01' && ini.versao_entrega === 2 && ini.id_pessoa === pa.id_pessoa && ini.lead_score_faixa === null && ini.respostas === null,
      'banco · início do quiz: quiz-01 versão 2, sem nota e sem respostas, ligado à pessoa pelo fim do quiz (6.2)');
  }
  const [pe] = await linhaPessoa(PESSOA_ELIM.email);
  const ee = pe ? await eventosDe(pe.id_pessoa) : [];
  conferir(pe && ee.length === 2 && ee[0].tipo === 'fim_quiz' && ee[0].lead_score_faixa === 'eliminatorio' && pe.primeira_utm_source === 'stories' && ee[0].utm_source === 'stories',
    'banco · o eliminatório: faixa eliminatorio' + (ee[0] ? ' (nota ' + ee[0].lead_score_nota + ')' : '') + ', utm stories');
  conferir(ee[1] && ee[1].tipo === 'interesse_pos_relatorio' && ee[1].clique_fim_quiz === 'tenho-interesse' && ee[1].id_sessao === q2.sessao && ee[1].entrega === 'quiz-01' && ee[1].versao_entrega === 2,
    'banco · o clique do eliminatório: interesse_pos_relatorio, tenho-interesse, ligado à pessoa pela sessão (18.4; 32.2)');
  const [pc] = await linhaPessoa(PESSOA_CORTE.email);
  const ec = pc ? await eventosDe(pc.id_pessoa) : [];
  conferir(ec.length === 2 && ec[0].lead_score_faixa === 'c' && ec[1].clique_fim_quiz === 'tenho-interesse',
    'banco · o corte mais restritivo: faixa c' + (ec[0] ? ' (nota ' + ec[0].lead_score_nota + ')' : '') + ' e o clique tenho-interesse');
  const [pb] = await linhaPessoa(PESSOA_B.email);
  const eb = pb ? await eventosDe(pb.id_pessoa) : [];
  const numerosB = eb[0] && eb[0].respostas && eb[0].respostas.numeros;
  conferir(eb.length === 2 && eb[0].lead_score_faixa === 'b' && eb[0].lead_score_nota === 68 && eb[1].clique_fim_quiz === 'quero-conversa',
    'banco · faixa b: nota 68 e o clique quero-conversa' + (eb[0] ? ' (veio ' + eb[0].lead_score_nota + ', ' + eb[0].lead_score_faixa + ')' : ''));
  conferir(eb[0] && eb[0].respostas.crm === FAIXA_B.crm && Array.isArray(numerosB) && numerosB.some(n => n.linha === 'Leads por mês' && n.valor === '200'),
    'banco · faixa b: as respostas trazem o CRM e a linha "Leads por mês" que a planilha lê (15.4)');
  {
    const s5 = await eventosDaSessao(q5.sessao);
    conferir((await linhaPessoa(PESSOA_DESMARCADA.email)).length === 0 && s5.every(e => e.id_pessoa === null) && s5.map(e => e.tipo).join(',') === 'visita,inicio_quiz',
      'banco · desmarcada: nenhuma pessoa, nenhum fim do quiz e nenhum clique; da sessão, só a visita e o início do quiz, sem pessoa (' + s5.map(e => e.tipo).join(', ') + ')');
  }
  conferir(await contar(`select count(*) as n from public.pessoas`) === pessoasDeAntes + 4 && await contar(`select count(*) as n from public.eventos where tipo = 'fim_quiz'`) === 5 + 4,
    'banco: 4 pessoas novas e 4 fins de quiz novos, nada a mais');

  // ═══ 7. Planilha do SDR ═══
  secao('7. Planilha do SDR (Codigo.gs v2 com o Google de mentira) pela porta privada');
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
  const idDe = async (email) => ((await linhaPessoa(email))[0] || VAZIO).id_pessoa;
  const idsDeAntes = [await idDe(ANTES.imitaOtavio.email), await idDe(ANTES.ana.email), await idDe(ANTES.duplo.email)];
  const idsNovos = [pa.id_pessoa, (pb || VAZIO).id_pessoa];
  const planilha = abrirPlanilha(CHAVE_PLANILHA);
  let p = await planilha.pedir('instalar');
  conferir(p.ok && p.resultado.aba === 'criada', 'instalar() numa aba nova (como depois de renomear a antiga): aba fila criada, cabeçalhos e gatilho' + (p.ok ? '' : ' (' + p.erro + ')'));
  let est = (await planilha.pedir('estado')).resultado;
  conferir(JSON.stringify(est.cabecalho) === JSON.stringify(COLUNAS_PLANILHA), 'aba fila: as 20 colunas de planilha-sdr.md v2, na ordem, com clique_fim_quiz na 13');
  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.situacao === 'ok' && p.resultado.codigo === 200 && p.resultado.acrescentadas === 3 && JSON.stringify(est.linhas.map(l => l[0])) === JSON.stringify(idsDeAntes),
    'primeira busca: 200 e só os 3 leads de antes (a linha que imita a do Otávio, a faixa a com "=1+1" e a pessoa dos dois envios, uma vez só); os novos ainda não (margem de 1 minuto, 21.6)' + (p.ok ? ' (' + p.resultado.acrescentadas + ')' : ' (' + p.erro + ')'));

  const ultimoFimNovo = (await naFila(() => db.query(`select max(gravado_em) as m from public.eventos where tipo = 'fim_quiz'`))).rows[0].m;
  if (ESPERAR_MARGEM) {
    // Sem contorno: espera de verdade a margem de 1 minuto do banco (21.6), contada do último fim do quiz novo
    const falta = Math.max(0, ultimoFimNovo.getTime() + 65000 - Date.now());
    informar('esperando de verdade a margem de 1 minuto: ' + Math.round(falta / 1000) + ' s');
    await esperar(falta);
    informar('margem de 1 minuto esperada de verdade, sem mexer no banco (--esperar-margem)');
  } else {
    // Contorno da margem de 1 minuto (21.6), sem mexer no esquema e sem esperar: como o superusuário
    // do PGlite, com session_replication_role = replica (que desliga os gatilhos só nesta sessão),
    // o gravado_em dos fins de quiz novos volta 2 minutos. A trava continua ligada na tabela.
    const atrasados = await naFila(async () => {
      await db.exec(`set session_replication_role = replica`);
      try {
        return (await db.query(`update public.eventos set gravado_em = gravado_em - interval '2 minutes'
          where tipo = 'fim_quiz' and gravado_em > now() - interval '1 hour'
            and id_pessoa in (select id_pessoa from public.pessoas where email like '%@teste.invalid')`)).affectedRows;
      } finally { await db.exec(`set session_replication_role = origin`); }
    });
    conferir(atrasados === 4, 'contorno da margem: gravado_em dos 4 fins de quiz novos de teste atrasado 2 minutos (trava desligada só nesta sessão e religada)');
  }
  const trava = (await naFila(() => db.query(`select tgenabled from pg_catalog.pg_trigger where tgname = 'eventos_sem_mudanca'`))).rows[0];
  c = await naFila(async () => { try { await db.query(`delete from public.eventos where tipo = 'fim_quiz'`); return 'apagou'; } catch (e) { return e.code; } });
  conferir(trava && trava.tgenabled === 'O' && c === 'P0001', 'a trava dos eventos continua ligada: apagar evento é recusado (' + c + ')');

  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.situacao === 'ok' && p.resultado.acrescentadas === 2 && p.resultado.fora_da_faixa === 0 && JSON.stringify(est.linhas.map(l => l[0])) === JSON.stringify([...idsDeAntes, ...idsNovos]),
    'segunda busca: 2 linhas novas, o lead A e a faixa b, na ordem de chegada (o eliminatório e a faixa c nem vêm do banco)' + (p.ok ? ' (' + p.resultado.acrescentadas + ')' : ''));
  const linhaDe = (id) => est.linhas.find(l => l[0] === id) || [];
  const col = (linha, n) => linha[COLUNAS_PLANILHA.indexOf(n)];
  const la = linhaDe(pa.id_pessoa), lb = linhaDe((pb || VAZIO).id_pessoa), lo = linhaDe(idsDeAntes[0]);
  conferir(col(la, 'nome') === PESSOA_A.nome && col(la, 'email') === PESSOA_A.email && col(la, 'telefone') === pa.telefone,
    'linha do lead A: id_pessoa, nome, telefone e e-mail iguais aos do banco');
  conferir(col(la, 'lead_score_faixa') === 'a' && col(la, 'lead_score_nota') === 96 && col(la, 'consentimento_whatsapp') === 'sim' && col(la, 'consentimento_email') === 'sim' && col(la, 'empresa') === '' && col(la, 'respostas_a_confirmar') === '' && col(la, 'clique_fim_quiz') === '',
    'linha do lead A: faixa a, nota 96, consentimentos sim, empresa, respostas_a_confirmar e clique vazios');
  conferir(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(col(la, 'entrou_em') || '') && col(la, 'tentativas_feitas') === 0 && col(la, 'estagio') === 'captado' && col(la, 'estado') === '' && col(la, 'data_volta') === '',
    'linha do lead A: entrou_em no horário de Brasília (AAAA-MM-DD HH:MM:SS), 0 tentativas, estágio captado, estado e data_volta vazios');
  conferir(['canal', 'contato_em', 'reuniao_em', 'produto'].every(k => col(la, k) === ''), 'linha do lead A: as colunas do SDR (canal, contato_em, reuniao_em, produto) ficaram vazias');
  const resB = String(col(lb, 'respostas_a_confirmar') || '');
  conferir(col(lb, 'lead_score_faixa') === 'b' && col(lb, 'lead_score_nota') === 68 && resB.includes('leads-por-mes: 200') && resB.includes('crm: ' + FAIXA_B.crm) && resB.includes('vendedores: 2 ou 3'),
    'linha da faixa b: nota 68, respostas a confirmar com as respostas novas leads-por-mes e crm (15.4; ' + resB + ')');
  conferir(col(lb, 'clique_fim_quiz') === 'quero-conversa', 'linha da faixa b: clique_fim_quiz quero-conversa (18.4)');
  conferir(col(lo, 'lead_score_faixa') === 'a' && col(lo, 'lead_score_nota') === 86 && col(lo, 'consentimento_whatsapp') === 'sim' && col(lo, 'clique_fim_quiz') === '',
    'linha que imita a do Otávio: faixa a, nota 86, consentimento sim, sem clique (dado de antes da migração)');
  const fora_da_planilha = [pe, pc].filter(Boolean).map(x => x.id_pessoa);
  conferir(fora_da_planilha.length === 2 && est.linhas.every(l => !fora_da_planilha.includes(l[0]) && l[3] !== PESSOA_DESMARCADA.email && l[3] !== ANTES.bruno.email),
    'o eliminatório, a faixa c do corte, a desmarcada e o eliminatório de antes não estão na planilha');
  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.acrescentadas === 0 && est.linhas.length === 5, 'rodar de novo: 0 linhas novas, a aba continua com 5 leads (não duplica)');
  await planilha.pedir('esquecer-cursor');
  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.acrescentadas === 0 && p.resultado.repetidas === 5 && est.linhas.length === 5 && est.tem_cursor,
    'cursor perdido: pede desde o início, acha os 5 leads repetidos e não duplica; cursor salvo de novo');
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

  // ═══ 8. Casos de erro ═══
  secao('8. Casos de erro');
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
  r = await direto('/rest/v1/rpc/registrar_evento', { chave: CHAVE_SECRETA, corpo: { pacote: eventoDeTeste('visita') } });
  conferir(r.status === 403, 'chave secreta: registrar_evento recusado com 403 (' + r.status + ')');

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
  conferir(x.status === 200 && corpo.leads.length === 5 && corpo.leads.some(l => l.id_pessoa === pa.id_pessoa) && !!corpo.cursor_seguinte && /Z$/.test(corpo.cursor_seguinte.depois_de_gravado_em) && corpo.pode_ter_mais === false,
    'garçom · porta privada com a chave certa: 200, 5 leads, cursor_seguinte com fuso em Z');

  const antes = supabase.registro.length;
  const pessoasAntes = await contar(`select count(*) as n from public.pessoas`);
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CONSENTIMENTO, { whatsapp: 'nao', email: 'nao' }));
  conferir(x.status === 422 && supabase.registro.length === antes, 'garçom · pacote sem consentimento: 422 e o banco nem é chamado (' + x.status + ')');
  r = await direto('/rest/v1/rpc/registrar_fim_quiz', { chave: CHAVE_PUBLICAVEL, corpo: { pacote: pacoteDeTeste(PESSOA_SEM_CONSENTIMENTO, { whatsapp: 'nao', email: 'nao' }) } });
  conferir(r.status === 400 && /"code":"23514"/.test(r.texto), 'banco · registrar_fim_quiz chamado direto com a publicável, sem consentimento: recusado pela restrição (400, 23514)');
  conferir(await contar(`select count(*) as n from public.pessoas`) === pessoasAntes, 'e nenhuma pessoa nova entrou');
  const eventosAntes = await contar(`select count(*) as n from public.eventos`);
  x = await postEvento(eventoDeTeste('interesse_pos_relatorio', { extra: { clique_fim_quiz: 'tenho-interesse' } }));
  u = ultimaDoBanco();
  conferir(x.status === 422 && u.rota === '/rest/v1/rpc/registrar_evento' && u.status === 400 && await contar(`select count(*) as n from public.eventos`) === eventosAntes,
    'garçom · clique numa sessão sem fim do quiz: o banco recusa (22023) e o garçom responde 422, nada gravado (32.2)');
  const antesIntrusa = supabase.registro.length;
  x = await postEvento({ pessoa: { nome: 'TESTE Intrusa' }, evento: eventoDeTeste('visita').evento });
  conferir(x.status === 422 && supabase.registro.length === antesIntrusa, 'garçom · /api/evento com pessoa no pacote: 422 e o banco nem é chamado (' + x.status + ')');

  // A mesma pessoa, dois envios ao mesmo tempo (sessões diferentes). O PGlite atende um de cada vez.
  const [d1, d2] = await Promise.all([
    postFimQuiz(pacoteDeTeste(PESSOA_DUPLA)), postFimQuiz(pacoteDeTeste(PESSOA_DUPLA))
  ]);
  const [pd] = await linhaPessoa(PESSOA_DUPLA.email);
  const ed = pd ? await eventosDe(pd.id_pessoa) : [];
  conferir(d1.status === 201 && d2.status === 201, 'dois POST ao mesmo tempo da mesma pessoa: os dois gravados (' + d1.status + ', ' + d2.status + ')');
  conferir(await contar(`select count(*) as n from public.pessoas where email = $1`, [PESSOA_DUPLA.email]) === 1 && ed.length === 2,
    'uma pessoa só no banco e dois eventos fim_quiz ligados a ela (' + ed.length + ')');

  // ═══ 9. Fechamento ═══
  secao('9. Fechamento');
  await rodarConferir('no fim');
  conferir(JSON.stringify(await fotografiaDeAntes(naFila, db)) === JSON.stringify(fotografiaDeAntesInicial),
    'os dados de antes da migração continuam iguais no fim do ensaio');
  const doGarcom = saidaGarcom.join('').split('\n').filter(l => l.includes('[garcom]'));
  const textoGarcom = saidaGarcom.join('');
  conferir(!DADO_PESSOAL.test(textoGarcom) && !SEGREDOS.some(s => textoGarcom.includes(s)) && !textoGarcom.includes(pa.id_pessoa),
    'saída do garçom (' + (modo === 'wrangler' ? 'wrangler dev' : 'servidor Node') + ', ' + doGarcom.length + ' linhas [garcom]) sem dado pessoal, sem id_pessoa e sem chave');
  const porPapel = supabase.registro.filter(l => l.origem === 'garcom');
  const PORTAS = { '/rest/v1/rpc/registrar_fim_quiz': 'anon', '/rest/v1/rpc/registrar_evento': 'anon', '/rest/v1/rpc/leads_para_planilha': 'service_role' };
  conferir(porPapel.length > 0 && porPapel.every(l => PORTAS[l.rota] === l.papel),
    'o garçom só chamou registrar_fim_quiz e registrar_evento com a publicável (anon) e leads_para_planilha com a secreta (service_role) (' + porPapel.length + ' chamadas)');
  conferir(fora.length === 0, 'navegador · páginas: nenhum pedido para fora de 127.0.0.1, nem fonte do Google (10.7; ' + (fora.length ? [...new Set(fora)].join(', ') : 'nenhum') + ')');
  // O registro de rede do Chromium: só existe inteiro depois de o navegador fechar
  await navegador.close();
  let rede = null;
  try {
    const texto = readFileSync(netlog, 'utf8');
    try { rede = JSON.parse(texto); } catch { rede = JSON.parse(texto.replace(/,\s*$/, '') + ']}'); }   // registro cortado no fim
  } catch { rede = null; }
  if (rede) {
    const tipos = Object.fromEntries(Object.entries(rede.constants.logEventTypes).map(([k, v]) => [v, k]));
    const tcp = new Set(), udp = new Set(), nomes = new Set();
    for (const ev of rede.events) {
      const t = tipos[ev.type], pr = ev.params || {};
      if (t === 'TCP_CONNECT_ATTEMPT' && pr.address) tcp.add(pr.address);
      if (t === 'UDP_CONNECT' && pr.address) udp.add(pr.address);
      if (typeof pr.url === 'string') { try { nomes.add(new URL(pr.url).hostname); } catch { /* não é endereço */ } }
    }
    const tcpFora = [...tcp].filter(a => !/^127\.0\.0\.1:\d+$/.test(a));
    const nomesFora = [...nomes].filter(n => n && n !== '127.0.0.1');
    conferir(tcpFora.length === 0 && tcp.size > 0, 'navegador · Chromium inteiro (netlog): nenhuma conexão TCP fora de 127.0.0.1 (' + tcp.size + ' endereços, ' + (tcpFora.join(', ') || 'todos locais') + ')');
    informar('tentativas de fundo do próprio Chromium, recusadas antes de sair (nome não encontrado e proxy local inexistente): ' + (nomesFora.join(', ') || 'nenhuma'));
    if (udp.size) informar('UDP sem envio de dado (o teste de IPv6 do Chromium, que só "conecta" para descobrir o endereço local): ' + [...udp].join(', '));
  } else {
    conferir(false, 'navegador · Chromium inteiro (netlog): o registro de rede não pôde ser lido');
  }
  if (modo === 'wrangler') {
    const tentativas = readFileSync(registroDeRede, 'utf8').split('\n').filter(Boolean);
    conferir(tentativas.length === 0, 'wrangler dev: nenhuma tentativa de falar com fora da máquina (trava rede-so-local.cjs; ' + (tentativas.length ? [...new Set(tentativas)].join(', ') : 'nenhuma') + ')');
  }
  console.log('  tempo do ensaio: ' + Math.round((Date.now() - inicio) / 1000) + ' s');
}

// A fotografia dos dados de antes (só as pessoas e os eventos das sessões de antes), para o fechamento
let fotografiaDeAntesInicial = null;
async function fotografiaDeAntes(naFila, db) {
  return (await naFila(() => db.query(`
    select (select md5(coalesce(string_agg(to_jsonb(p)::text, '|' order by p.id_pessoa), '')) from public.pessoas p
             where p.id_pessoa in (select id_pessoa from public.eventos where id_sessao like 'sessao-antes-%')) as h_pessoas,
           (select md5(coalesce(string_agg(to_jsonb(e)::text, '|' order by e.id_evento), '')) from public.eventos e
             where e.id_sessao like 'sessao-antes-%') as h_eventos`))).rows[0];
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
