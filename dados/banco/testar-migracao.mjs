// Teste das migrações 001 (banco v2 para v3), 002 (as respostas na planilha), 003 (a origem e os ids
// do lead; #121, 18/11/2026) e 004 (as utm na abertura e a contagem das recusas; pedido 24, 25/11/2026)
// e da limpeza dos leads de teste (v2, com a linha real de 09/11) num Postgres local, sem rede e sem
// serviço real (etapa 32; planilha do SDR v3, 15/11/2026)
// Parte de dados/banco/ (ver README.md desta pasta, "Conferido nesta máquina"). Confere
// dados/banco/migracoes/001-v3.sql, dados/banco/migracoes/002-respostas-na-planilha.sql,
// dados/banco/migracoes/003-origem-e-ids.sql (seção 8), dados/banco/conferir.sql (v4),
// dados/banco/conferir.sql (v3) e dados/banco/limpar-leads-de-teste.sql.
//
// Um comando só, da raiz do repositório:   node dados/banco/testar-migracao.mjs
// Usa o PGlite já instalado em nucleo/ferramentas/ensaio/ (npm install lá, uma vez). Sem rede.
//
// O que faz, na ordem (cada conferência sai com OK ou FALHOU; termina com código 1 se algo falhar):
//   1. PGlite com os papéis do Supabase de mentira, como em ensaio.mjs (o "dono" faz o papel do
//      postgres do Supabase e começa com as permissões padrão do pior caso).
//   2. esquema.sql (v2) pelo dono, a linha do catálogo do quiz (catalogo-prototipo.sql) e uma da
//      landing, só para o teste; conferir.sql v2 num banco só v2 tem de dar false (falta a migração).
//   3. Dados de teste do jeito v2 (#102: nome começando por TESTE, e-mail @teste.invalid,
//      telefones com zeros): fins de quiz pelas portas do v2 (faixas a, b, c e eliminatório),
//      uma visita e eventos do SDR gravados pelo dono.
//   4. A migração 001 duas vezes, pelo dono. Os dados não mudam (cada linha igual, antes e depois), e
//      a segunda rodada deixa o esquema igual ao da primeira (restrições, funções e permissões).
//      Depois, a migração 002 duas vezes, do mesmo jeito; num banco sem a 001, ela para e não muda nada.
//   5. conferir.sql v4: todas as linhas true (só as linhas 19 e 20 falsas entre a 001 e a 002; só a 20
//      entre a 002 e a 003). A 003 roda duas vezes logo depois da 002, sobre os mesmos dados.
//   6. As funções novas e alteradas, trocando de papel (SET ROLE anon, service_role, authenticated),
//      com a coluna respostas da função da planilha.
//   9. (pedido 24) A migração 004: as três utm no início do quiz e a contagem das recusas, trocando de papel.
//   7. A limpeza dos leads de teste (limpar-leads-de-teste.sql), duas vezes: só quem tem o nome TESTE
//      e o e-mail @teste.invalid sai, com os eventos dele; quem tem só uma das marcas, a pessoa de
//      mentira "de verdade" e os eventos sem pessoa ficam; a trava continua ligada.
//
// Só valores de mentira, só na memória. Nada vai para o Supabase de verdade nem para a rede.

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../..');
// o PGlite da pasta do ensaio (node_modules fica fora do Git)
const doEnsaio = createRequire(join(RAIZ, 'nucleo/ferramentas/ensaio/package.json'));
const { PGlite } = await import(pathToFileURL(doEnsaio.resolve('@electric-sql/pglite')).href);
const ler = (c) => readFileSync(join(RAIZ, c), 'utf8');
const ESQUEMA = ler('dados/banco/esquema.sql');
const MIGRACAO = ler('dados/banco/migracoes/001-v3.sql');
const MIGRACAO_002 = ler('dados/banco/migracoes/002-respostas-na-planilha.sql');
const MIGRACAO_003 = ler('dados/banco/migracoes/003-origem-e-ids.sql');
const MIGRACAO_004 = ler('dados/banco/migracoes/004-utm-na-abertura-e-recusas.sql');
// o código da linha real do Otávio de 09/11/2026 (pedido 24, item 5); no teste, uma pessoa de mentira com esse código
const ID_LINHA_DE_09_11 = 'f794c36d-7116-4ab3-aec3-54a147de97bc';
const LIMPEZA = ler('dados/banco/limpar-leads-de-teste.sql');
const CONFERIR = ler('dados/banco/conferir.sql');
const CATALOGO = ler('dados/banco/catalogo-prototipo.sql');

const resultados = [];
function conferir(ok, texto) {
  resultados.push(!!ok);
  console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto);
}
const secao = (t) => console.log('\n· ' + t);

const PAPEIS_DE_MENTIRA = `
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
`;
const db = new PGlite();
await db.exec(`set time zone 'UTC'`);
await db.exec(PAPEIS_DE_MENTIRA);

const comoDono = async (sql) => {
  await db.exec('set role dono');
  try { return await db.exec(sql); } finally { await db.exec('reset role'); }
};
const comoPapel = (papel, sql, params = []) => db.transaction(async (tx) => {
  await tx.exec('set local role ' + papel);
  return tx.query(sql, params);
});
const codigoComo = async (papel, sql, params) => {
  try { await comoPapel(papel, sql, params); return 'ok'; } catch (e) { return e.code || 'sem codigo'; }
};
const umaLinha = async (sql, params = []) => (await db.query(sql, params)).rows[0];
// o jsonb guarda as chaves em outra ordem: compara com as chaves em ordem
const ordenado = (v) => Array.isArray(v) ? v.map(ordenado)
  : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, ordenado(v[k])])) : v;
const mesmoJson = (a, b) => JSON.stringify(ordenado(a)) === JSON.stringify(ordenado(b));

async function rodarConferir() {
  const saidas = await comoDono(CONFERIR);
  return saidas[saidas.length - 1].rows;
}

// ··· pacotes de teste (#102) ···
const agora = () => new Date().toISOString();
function pacoteFim(n, { faixa, nota, sessao, respostas, whatsapp = 'sim' }) {
  return {
    pessoa: {
      nome: 'TESTE Migracao ' + n, telefone: '+55 (00) 90000-00' + String(n).padStart(2, '0'),
      email: 'migracao' + n + '@teste.invalid', empresa: 'TESTE Empresa ' + n,
      consentimento_whatsapp: whatsapp, consentimento_email: 'sim',
      consentimento_texto: 'Texto do consentimento do teste (mentira).', consentimento_em: agora(),
      primeira_utm_source: 'bio', primeira_utm_campaign: 'funil-01'
    },
    evento: {
      tipo: 'fim_quiz', funil: 'funil-01', entrega: 'quiz-01', versao_entrega: 1,
      utm_source: 'bio', utm_campaign: 'funil-01', id_sessao: sessao, ocorrido_em: agora(),
      respostas, lead_score_nota: nota, lead_score_faixa: faixa, lead_score_versao: 3
    }
  };
}
// respostas no formato de respostasDoQuiz() da página (entregas/quizzes/quiz-01/pagina/index.html)
const RESPOSTAS_B = {
  faturamento: 'R$ 150 mil a R$ 500 mil', vendedores: '2 ou 3', 'valor-medio': 'R$ 15.000',
  crm: 'Sim, mas pouca gente atualiza', cargo: 'Dono(a) ou sócio(a)', lembra: 'Sim',
  numeros: [
    { linha: 'Leads por mês', valor: '200', unidade: 'nº' },
    { linha: 'Pré-qualificados', valor: '50', unidade: 'nº' }
  ]
};
const RESPOSTAS_A = { faturamento: 'R$ 500 mil a R$ 1,5 milhão', crm: 'Sim, e o time atualiza todo dia', lembra: 'Não', chute: '20%' };
const gravarFim = (p) => comoPapel('anon', 'select public.registrar_fim_quiz($1::jsonb)', [JSON.stringify(p)]);
const evento = (tipo, sessao, extra = {}) => ({
  evento: {
    tipo, funil: 'funil-01', entrega: tipo === 'visita' ? 'landing-page-01' : 'quiz-01', versao_entrega: 1,
    utm_source: 'bio', utm_campaign: 'funil-01', id_sessao: sessao, ocorrido_em: agora(), ...extra
  }
});
const gravarEvento = (papel, p) => codigoComo(papel, 'select public.registrar_evento($1::jsonb)', [JSON.stringify(p)]);

// fotografia dos dados: cada linha das tabelas com dado, em ordem fixa
async function fotografia() {
  const r = await umaLinha(`
    select (select count(*) from public.pessoas) as pessoas,
           (select count(*) from public.eventos) as eventos,
           (select count(*) from public.entregas) as entregas,
           (select md5(coalesce(string_agg(to_jsonb(p)::text, '|' order by p.id_pessoa), '')) from public.pessoas p) as h_pessoas,
           (select md5(coalesce(string_agg((to_jsonb(e) - 'clique_fim_quiz' - 'utm_medium' - 'utm_content' - 'utm_term' - 'fbclid' - 'fbp' - 'fbc' - 'id_lead' - 'id_qualificado' - 'qualificado')::text, '|' order by e.id_evento), '')) from public.eventos e) as h_eventos,
           (select md5(coalesce(string_agg(to_jsonb(x)::text, '|' order by x.id_entrega, x.versao), '')) from public.entregas x) as h_entregas`);
  return r;
}
// fotografia do esquema: restrições, colunas, funções e permissões
async function esquemaAtual() {
  return (await umaLinha(`
    select md5(concat_ws('#',
      (select string_agg(conname || '=' || pg_get_constraintdef(oid) || convalidated, '|' order by conname)
         from pg_constraint where connamespace = 'public'::regnamespace),
      (select string_agg(attrelid::regclass::text || '.' || attname || ':' || format_type(atttypid, atttypmod), '|' order by attrelid::regclass::text, attnum)
         from pg_attribute where attrelid in (select oid from pg_class where relnamespace = 'public'::regnamespace) and attnum > 0 and not attisdropped),
      (select string_agg(proname || '(' || pg_get_function_identity_arguments(oid) || ')' || md5(prosrc) || coalesce(proacl::text, 'padrao') || prosecdef || coalesce(array_to_string(proconfig, ','), ''), '|' order by proname)
         from pg_proc where pronamespace = 'public'::regnamespace),
      (select string_agg(relname || coalesce(relacl::text, 'padrao') || relrowsecurity, '|' order by relname)
         from pg_class where relnamespace = 'public'::regnamespace),
      (select string_agg(defaclobjtype::text || coalesce(defaclacl::text, ''), '|' order by defaclobjtype) from pg_default_acl)
    )) as h`)).h;
}

// ═══ 1 e 2. Esquema v2 ═══
secao('1. Banco v2 (esquema.sql), como está no Supabase');
const versao = (await umaLinha('select version() as v')).v.split(' on ')[0];
console.log('INFO   · ' + versao + ', papéis anon, authenticated, service_role e dono de mentira');
{
  let erro = null;
  try { await comoDono(ESQUEMA); await comoDono(CATALOGO); } catch (e) { erro = e; }
  conferir(!erro, 'esquema.sql v2 e catalogo-prototipo.sql aplicados pelo dono' + (erro ? ' (' + erro.message + ')' : ''));
  // a landing no catálogo, só neste teste, para a visita poder entrar (32.4)
  await comoDono(`insert into public.entregas (id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em)
                  values ('landing-page-01', 1, 'landing', 'funil-01', 'entregas/landings/landing-page-01/', now())
                  on conflict do nothing`);
  const linhas = await rodarConferir();
  const falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
  const final = linhas.find(l => l.n === 99);
  conferir(final.ok === false && JSON.stringify(falsas) === JSON.stringify([4, 8, 14, 15, 16, 17, 18, 19, 20, 21]),
    'conferir.sql v3 num banco só v2 avisa que faltam as migrações: false nas linhas ' + falsas.join(', ') + ' (' + final.encontrado + ')');
}

// ═══ 3. Dados de teste do jeito v2 ═══
secao('2. Dados de teste no banco v2 (#102)');
await gravarFim(pacoteFim(1, { faixa: 'a', nota: 96, sessao: 'sessao-migracao-1', respostas: RESPOSTAS_A }));
await gravarFim(pacoteFim(2, { faixa: 'b', nota: 55, sessao: 'sessao-migracao-2', respostas: RESPOSTAS_B }));
await gravarFim(pacoteFim(3, { faixa: 'c', nota: 40, sessao: 'sessao-migracao-3', respostas: RESPOSTAS_A }));
await gravarFim(pacoteFim(4, { faixa: 'eliminatorio', nota: 81, sessao: 'sessao-migracao-4', respostas: RESPOSTAS_A }));
// uma visita (gravada pelo dono, como o garçom v3 não grava) e eventos do SDR
await comoDono(`
  insert into public.eventos (tipo, id_sessao, funil, entrega, versao_entrega, utm_source, utm_campaign, ocorrido_em, gravado_por)
  values ('visita', 'sessao-migracao-antiga', 'funil-01', 'landing-page-01', 1, '', '', now(), 'garcom');
  insert into public.eventos (tipo, id_pessoa, funil, entrega, versao_entrega, utm_source, utm_campaign, ocorrido_em, gravado_por, canal, estado)
  select 'contato_sdr', id_pessoa, 'funil-01', 'quiz-01', 1, 'bio', 'funil-01', now(), 'volta-do-status', 'telefone', 'tentativa'
    from public.pessoas where email = 'migracao1@teste.invalid';
  insert into public.eventos (tipo, id_pessoa, funil, entrega, versao_entrega, utm_source, utm_campaign, ocorrido_em, gravado_por, estagio, estado, data_volta)
  select 'mudanca_status', id_pessoa, 'funil-01', 'quiz-01', 1, 'bio', 'funil-01', now(), 'volta-do-status', 'pre-qualificado', 'stand-by', date '2026-12-01'
    from public.pessoas where email = 'migracao2@teste.invalid';
`);
const antes = await fotografia();
conferir(Number(antes.pessoas) === 4 && Number(antes.eventos) === 7,
  'dados v2: ' + antes.pessoas + ' pessoas, ' + antes.eventos + ' eventos (4 fins de quiz, 1 visita, 2 do SDR), ' + antes.entregas + ' entregas');

// ═══ 4. Migração duas vezes ═══
secao('3. Migração 001 duas vezes, sobre os dados');
let depoisDaPrimeira = null;
for (const vez of ['primeira', 'segunda']) {
  let erro = null;
  try { await comoDono(MIGRACAO); } catch (e) { erro = e; }
  conferir(!erro, 'migracoes/001-v3.sql aplicada pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
  const depois = await fotografia();
  conferir(JSON.stringify(depois) === JSON.stringify(antes),
    vez + ' vez: os dados não mudaram (' + depois.pessoas + ' pessoas e ' + depois.eventos + ' eventos, cada linha igual)');
  const h = await esquemaAtual();
  if (vez === 'primeira') depoisDaPrimeira = h;
  else conferir(h === depoisDaPrimeira, 'segunda vez: restrições, colunas, funções e permissões iguais às da primeira');
}
{
  const r = await umaLinha(`select count(*) filter (where clique_fim_quiz is null) as vazios, count(*) as todos from public.eventos`);
  conferir(r.vazios === r.todos, 'clique_fim_quiz nasceu vazio em todos os ' + r.todos + ' eventos antigos');
}
{
  // a migração recusa rodar num banco sem o esquema v2, e não deixa nada pela metade
  const vazio = new PGlite();
  let erro = null;
  try { await vazio.exec(MIGRACAO); } catch (e) { erro = e; }
  await vazio.exec('rollback');   // a transação da migração ficou aberta e abortada: desfaz
  const sobrou = (await vazio.query(`select count(*)::int as n from pg_class where relnamespace = 'public'::regnamespace`)).rows[0].n;
  conferir(erro && /esquema v2/.test(erro.message) && sobrou === 0, 'num banco sem o esquema v2, a migração para no passo 0 e não cria nada');
  await vazio.close();
}

{
  // entre a 001 e a 002, o conferir.sql v5 avisa nas linhas 19 a 21 e nas 4 e 8 (a porta da 004)
  const linhas = await rodarConferir();
  const falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
  const final = linhas.find(l => l.n === 99);
  conferir(JSON.stringify(falsas) === '[4,8,19,20,21]' && final.encontrado === '16 de 21',
    'conferir.sql v5 com a 001 e sem a 002: false só nas linhas 4, 8, 19, 20 e 21 (' + final.encontrado + ')');
}

// ═══ 4b. Migração 002 duas vezes ═══
secao('3b. Migração 002 duas vezes, sobre os dados');
let depoisDa002 = null;
for (const vez of ['primeira', 'segunda']) {
  let erro = null;
  try { await comoDono(MIGRACAO_002); } catch (e) { erro = e; }
  conferir(!erro, 'migracoes/002-respostas-na-planilha.sql aplicada pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
  const depois = await fotografia();
  conferir(JSON.stringify(depois) === JSON.stringify(antes),
    vez + ' vez: os dados não mudaram (' + depois.pessoas + ' pessoas e ' + depois.eventos + ' eventos, cada linha igual)');
  const h = await esquemaAtual();
  if (vez === 'primeira') depoisDa002 = h;
  else conferir(h === depoisDa002, 'segunda vez: restrições, colunas, funções e permissões iguais às da primeira');
}
{
  // a 002 recusa rodar num banco só com o esquema v2 (sem a 001), e não muda nada
  const so2 = new PGlite();
  await so2.exec(PAPEIS_DE_MENTIRA);
  await so2.exec('set role dono'); await so2.exec(ESQUEMA); await so2.exec('reset role');
  const funcaoAntes = (await so2.query(`select pg_get_function_result('public.leads_para_planilha(timestamptz, uuid, integer)'::regprocedure) as r`)).rows[0].r;
  let erro = null;
  try { await so2.exec(MIGRACAO_002); } catch (e) { erro = e; }
  await so2.exec('rollback');
  const funcaoDepois = (await so2.query(`select pg_get_function_result('public.leads_para_planilha(timestamptz, uuid, integer)'::regprocedure) as r`)).rows[0].r;
  conferir(erro && /migração 001/.test(erro.message) && funcaoDepois === funcaoAntes && !/respostas jsonb/.test(funcaoDepois),
    'num banco sem a migração 001, a 002 para no passo 0 e não muda a função da planilha');
  await so2.close();
}
{
  // entre a 002 e a 003, o conferir.sql v5 avisa nas linhas 20 e 21 e nas 4 e 8
  const linhas = await rodarConferir();
  const falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
  const final = linhas.find(l => l.n === 99);
  conferir(JSON.stringify(falsas) === '[4,8,20,21]' && final.encontrado === '17 de 21',
    'conferir.sql v5 com a 002 e sem a 003: false só nas linhas 4, 8, 20 e 21 (' + final.encontrado + ')');
}

// ═══ 4c. Migração 003 duas vezes ═══
secao('3c. Migração 003 duas vezes, sobre os dados');
let depoisDa003 = null;
for (const vez of ['primeira', 'segunda']) {
  let erro = null;
  try { await comoDono(MIGRACAO_003); } catch (e) { erro = e; }
  conferir(!erro, 'migracoes/003-origem-e-ids.sql aplicada pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
  const depois = await fotografia();
  conferir(JSON.stringify(depois) === JSON.stringify(antes),
    vez + ' vez: os dados que já existiam não mudaram (' + depois.pessoas + ' pessoas e ' + depois.eventos + ' eventos, cada linha igual)');
  const h = await esquemaAtual();
  if (vez === 'primeira') depoisDa003 = h;
  else conferir(h === depoisDa003, 'segunda vez: restrições, colunas, funções e permissões iguais às da primeira');
}
{
  const r = await umaLinha(`select count(*) filter (where utm_medium = '' and utm_content = '' and utm_term = '' and fbclid = ''
                                                     and fbp is null and fbc is null and id_lead is null and id_qualificado is null
                                                     and qualificado is null) as vazios, count(*) as todos from public.eventos`);
  conferir(r.vazios === r.todos, 'as nove colunas novas nasceram vazias (texto) ou sem valor nos ' + r.todos + ' eventos antigos');
  const listas = await umaLinha(`select count(*)::int as n from pg_constraint
                                  where conrelid in ('public.eventos'::regclass, 'public.pessoas'::regclass)
                                    and contype = 'c' and pg_get_constraintdef(oid) like '%utm_source%'`);
  conferir(listas.n === 2, 'uma restrição só para utm_source (eventos) e uma para primeira_utm_source (pessoas), sem sobra da v2 (' + listas.n + ')');
}
{
  // a 003 recusa rodar num banco com a 001 e sem a 002, e não muda nada
  const so1 = new PGlite();
  await so1.exec(PAPEIS_DE_MENTIRA);
  await so1.exec('set role dono'); await so1.exec(ESQUEMA); await so1.exec(MIGRACAO); await so1.exec('reset role');
  let erro = null;
  try { await so1.exec(MIGRACAO_003); } catch (e) { erro = e; }
  await so1.exec('rollback');
  const colunas = (await so1.query(`select count(*)::int as n from pg_attribute where attrelid = 'public.eventos'::regclass and attname = 'id_lead'`)).rows[0].n;
  conferir(erro && /migração 002/.test(erro.message) && colunas === 0,
    'num banco sem a migração 002, a 003 para no passo 0 e não cria coluna nenhuma');
  await so1.close();
}
{
  // entre a 003 e a 004, o conferir.sql v5 avisa nas linhas 4, 8 e 21
  const linhas = await rodarConferir();
  const falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
  const final = linhas.find(l => l.n === 99);
  conferir(JSON.stringify(falsas) === '[4,8,21]' && final.encontrado === '18 de 21',
    'conferir.sql v5 com a 003 e sem a 004: false só nas linhas 4, 8 e 21 (' + final.encontrado + ')');
}

// ═══ 4d. Migração 004 duas vezes ═══
secao('3d. Migração 004 duas vezes, sobre os dados');
let depoisDa004 = null;
{
  const antes004 = await fotografia();
  for (const vez of ['primeira', 'segunda']) {
    let erro = null;
    try { await comoDono(MIGRACAO_004); } catch (e) { erro = e; }
    conferir(!erro, 'migracoes/004-utm-na-abertura-e-recusas.sql aplicada pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
    const depois = await fotografia();
    conferir(JSON.stringify(depois) === JSON.stringify(antes004),
      vez + ' vez: os dados que já existiam não mudaram (' + depois.pessoas + ' pessoas e ' + depois.eventos + ' eventos, cada linha igual)');
    const h = await esquemaAtual();
    if (vez === 'primeira') depoisDa004 = h;
    else conferir(h === depoisDa004, 'segunda vez: restrições, colunas, funções e permissões iguais às da primeira');
  }
  const r = await umaLinha(`select count(*)::int as n from public.recusas`);
  conferir(r.n === 0, 'a tabela recusas nasce vazia');
}
{
  // a 004 recusa rodar num banco com a 002 e sem a 003, e não muda nada
  const so2 = new PGlite();
  await so2.exec(PAPEIS_DE_MENTIRA);
  await so2.exec('set role dono'); await so2.exec(ESQUEMA); await so2.exec(MIGRACAO); await so2.exec(MIGRACAO_002); await so2.exec('reset role');
  let erro = null;
  try { await so2.exec(MIGRACAO_004); } catch (e) { erro = e; }
  await so2.exec('rollback');
  const tabela = (await so2.query(`select to_regclass('public.recusas') is null as sem`)).rows[0].sem;
  conferir(erro && /migração 003/.test(erro.message) && tabela, 'num banco sem a migração 003, a 004 para no passo 0 e não cria a tabela recusas');
  await so2.close();
}

// ═══ 5. conferir.sql ═══
secao('4. conferir.sql v3 depois das migrações');
let totalConferir = '';
{
  const linhas = await rodarConferir();
  for (const l of linhas.filter(l => l.n !== 99 && !l.ok)) conferir(false, 'conferir.sql ' + l.n + ' (' + l.conferencia + '): encontrado ' + l.encontrado);
  const final = linhas.find(l => l.n === 99);
  totalConferir = final.encontrado;
  conferir(final.ok === true && final.encontrado === '21 de 21', 'conferir.sql: linha "tudo certo" = ' + final.ok + ' (' + final.encontrado + ')');
}

// ═══ 6. Funções, trocando de papel ═══
secao('5. Portas, trocando de papel');
// visita sem etiqueta (10.8): utm presentes e vazias, e utm que nem vieram
conferir(await gravarEvento('anon', evento('visita', 'sessao-migracao-5', { utm_source: '', utm_campaign: '' })) === 'ok',
  'anon grava a visita com as etiquetas de origem presentes e vazias (10.8)');
{
  const p = evento('visita', 'sessao-migracao-6'); delete p.evento.utm_source; delete p.evento.utm_campaign;
  conferir(await gravarEvento('anon', p) === 'ok', 'anon grava a visita sem as etiquetas de origem no pacote: entram vazias (10.8)');
  const r = await umaLinha(`select utm_source, utm_campaign, id_pessoa, gravado_por from public.eventos where id_sessao = 'sessao-migracao-6'`);
  conferir(r.utm_source === '' && r.utm_campaign === '' && r.id_pessoa === null && r.gravado_por === 'garcom',
    'a visita sem etiqueta ficou com origem vazia, sem pessoa, gravada pelo garçom');
}
conferir(await gravarEvento('anon', evento('inicio_quiz', 'sessao-migracao-5')) === 'ok', 'anon grava o início do quiz da mesma sessão, sem aceite (10.6)');
conferir(await gravarEvento('anon', evento('visita', 'sessao-migracao-7', { utm_source: 'tiktok' })) === '23514',
  'origem fora da lista é recusada pela tabela (23514; o garçom esvazia antes, 5.5)');
{
  const p = evento('visita', 'sessao-migracao-8'); delete p.evento.id_sessao;
  conferir(await gravarEvento('anon', p) === '22023', 'visita sem sessão é recusada (22023)');
}
conferir(await gravarEvento('anon', { ...evento('visita', 'sessao-migracao-9'), pessoa: { nome: 'TESTE X' } }) === '22023',
  'pacote com dado de pessoa é recusado nesta porta (22023)');
conferir(await gravarEvento('anon', evento('visita', 'sessao-migracao-9', { nome: 'TESTE X' })) === '22023',
  'campo fora da lista no evento é recusado (22023)');
conferir(await gravarEvento('anon', evento('fim_quiz', 'sessao-migracao-9')) === '22023',
  'fim do quiz por esta porta é recusado: só por registrar_fim_quiz (22023)');
conferir(await gravarEvento('anon', evento('contato_sdr', 'sessao-migracao-9')) === '22023', 'evento do SDR por esta porta é recusado (22023)');
conferir(await gravarEvento('anon', { evento: { ...evento('visita', 'sessao-migracao-9').evento, entrega: 'landing-page-99' } }) === '23503',
  'entrega fora do catálogo é recusada pela chave estrangeira (23503)');
conferir(await gravarEvento('anon', evento('visita', 'sessao-migracao-9', { clique_fim_quiz: 'quero-conversa' })) === '23514',
  'clique numa visita é recusado (23514)');

// clique no fim do quiz (18.4)
conferir(await gravarEvento('anon', evento('interesse_pos_relatorio', 'sessao-migracao-5', { clique_fim_quiz: 'quero-conversa' })) === '22023',
  'clique numa sessão sem fim do quiz é recusado (22023; quem desmarcou a caixa não envia nada, 30.3; 32.2)');
await gravarFim(pacoteFim(5, { faixa: 'b', nota: 60, sessao: 'sessao-migracao-5', respostas: RESPOSTAS_B }));
{
  const r = await umaLinha(`select count(*) filter (where id_pessoa is not null)::int as ligados, count(*)::int as todos,
                                   (select primeira_visita_em is not null from public.pessoas where email = 'migracao5@teste.invalid') as primeira
                              from public.eventos where id_sessao = 'sessao-migracao-5'`);
  conferir(r.ligados === 3 && r.todos === 3 && r.primeira, 'o fim do quiz liga à pessoa a visita e o início do quiz da sessão, e preenche primeira_visita_em (6.2; 18.5)');
}
conferir(await gravarEvento('anon', evento('interesse_pos_relatorio', 'sessao-migracao-5', { clique_fim_quiz: 'chamar-whatsapp' })) === 'ok',
  'anon grava o clique no fim do quiz numa sessão com fim do quiz');
conferir(await gravarEvento('anon', evento('interesse_pos_relatorio', 'sessao-migracao-5', { clique_fim_quiz: 'quero-conversa' })) === 'ok',
  'um segundo clique da mesma pessoa também entra (cada clique é um evento)');
{
  const r = await umaLinha(`select count(*)::int as n, bool_and(id_pessoa = (select id_pessoa from public.pessoas where email = 'migracao5@teste.invalid')) as certo
                              from public.eventos where tipo = 'interesse_pos_relatorio'`);
  conferir(r.n === 2 && r.certo, 'os cliques nasceram ligados à pessoa do fim do quiz da sessão');
}
conferir(await gravarEvento('anon', evento('interesse_pos_relatorio', 'sessao-migracao-5', { clique_fim_quiz: 'botao-inventado' })) === '23514',
  'clique fora da lista é recusado (23514)');
conferir(await gravarEvento('anon', evento('interesse_pos_relatorio', 'sessao-migracao-5')) === '23514', 'clique sem dizer o que foi clicado é recusado (23514)');
// visita que chega depois do fim do quiz já nasce ligada
conferir(await gravarEvento('anon', evento('visita', 'sessao-migracao-1')) === 'ok', 'visita que chega depois do fim do quiz da sessão entra');
{
  const r = await umaLinha(`select v.id_pessoa = f.id_pessoa as ligada from public.eventos v join public.eventos f on f.id_sessao = v.id_sessao and f.tipo = 'fim_quiz'
                             where v.id_sessao = 'sessao-migracao-1' and v.tipo = 'visita'`);
  conferir(r && r.ligada, 'e já nasce ligada à pessoa do fim do quiz da sessão');
}

// eliminatório com nota guardada (14.8) e listas novas do SDR
{
  const r = await umaLinha(`select lead_score_nota from public.eventos where tipo = 'fim_quiz' and lead_score_faixa = 'eliminatorio'`);
  conferir(r && r.lead_score_nota === 81, 'o eliminatório tem a nota guardada (81; 14.8)');
  const sem = pacoteFim(6, { faixa: 'eliminatorio', nota: null, sessao: 'sessao-migracao-10', respostas: RESPOSTAS_A });
  let codigo = 'ok';
  try { await gravarFim(sem); } catch (e) { codigo = e.code; }
  conferir(codigo === '23514', 'eliminatório sem nota é recusado (23514; 14.8)');
}
const sdr = (sql) => comoDono(sql).then(() => 'ok', e => e.code);
const linhaSdr = (tipo, extra) => `insert into public.eventos (tipo, id_pessoa, funil, entrega, versao_entrega, ocorrido_em, gravado_por ${extra[0]})
  select '${tipo}', id_pessoa, 'funil-01', 'quiz-01', 1, now(), 'volta-do-status' ${extra[1]} from public.pessoas where email = 'migracao2@teste.invalid'`;
conferir(await sdr(linhaSdr('mudanca_status', [', estado', ", 'nutricao'"])) === 'ok', 'estado nutricao aceito (5.3; 15.11)');
conferir(await sdr(linhaSdr('mudanca_status', [', estado', ", 'sumiu'"])) === '23514', 'estado fora da lista recusado (23514)');
conferir(await sdr(linhaSdr('venda', [', estagio, produto', ", 'venda', 'iasv'"])) === 'ok', 'venda com produto iasv aceita (5.3)');
conferir(await sdr(linhaSdr('venda', [', estagio, produto', ", 'venda', 'outro'"])) === '23514', 'produto fora da lista recusado (23514)');
conferir(await sdr(`insert into public.eventos (tipo, id_pessoa, id_sessao, funil, entrega, versao_entrega, ocorrido_em, gravado_por, clique_fim_quiz)
  select 'interesse_pos_relatorio', id_pessoa, 'sessao-migracao-2', 'funil-01', 'quiz-01', 1, now(), 'volta-do-status', 'agora-nao'
    from public.pessoas where email = 'migracao2@teste.invalid'`) === '23514', 'clique gravado como volta do status é recusado: é do garçom (23514)');

// a planilha, pela porta privada (com o contorno da margem de 1 minuto, como no ensaio)
await db.exec(`set session_replication_role = replica;
  update public.eventos set gravado_em = gravado_em - interval '2 minutes' where tipo = 'fim_quiz';
  set session_replication_role = origin;`);
{
  const leads = (await comoPapel('service_role', 'select * from public.leads_para_planilha()')).rows;
  const porEmail = Object.fromEntries(leads.map(l => [l.email, l]));
  conferir(leads.length === 3 && porEmail['migracao1@teste.invalid'] && porEmail['migracao2@teste.invalid'] && porEmail['migracao5@teste.invalid'],
    'service_role chama leads_para_planilha: 3 leads, só faixas a e b (' + leads.length + ')');
  const b = porEmail['migracao2@teste.invalid'];
  conferir(b && JSON.stringify(b.respostas_a_confirmar) === JSON.stringify({ crm: 'Sim, mas pouca gente atualiza', vendedores: '2 ou 3', 'valor-medio': 'R$ 15.000', 'leads-por-mes': '200' }),
    'faixa b: respostas_a_confirmar com valor da venda, vendedores, leads por mês e CRM (15.4): ' + JSON.stringify(b && b.respostas_a_confirmar));
  const a = porEmail['migracao1@teste.invalid'];
  conferir(a && a.respostas_a_confirmar === null && a.clique_fim_quiz === null && a.tentativas_feitas === 1,
    'faixa a: sem respostas_a_confirmar, sem clique, 1 tentativa (15.3)');
  const c5 = porEmail['migracao5@teste.invalid'];
  conferir(c5 && c5.clique_fim_quiz === 'quero-conversa', 'clique_fim_quiz: o último clique da pessoa (quero-conversa; 18.4)');
  conferir(b && b.estado === 'nutricao' && b.estagio === 'venda',
    'estado e estágio atuais com os valores novos (nutricao; venda) (21.9)');
  const nomes = Object.keys(leads[0]);
  conferir(leads.every(l => 'entrou_em' in l && 'cursor_gravado_em' in l) && nomes.length === 29 && nomes[17] === 'respostas' &&
      JSON.stringify(nomes.slice(18)) === JSON.stringify(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
        'fbclid', 'fbp', 'fbc', 'id_lead', 'id_qualificado', 'qualificado']),
    'as 29 colunas: as 16 do v2, clique_fim_quiz (001), respostas (002) e, no fim, as 11 da origem e dos ids (003)');
  conferir(b && mesmoJson(b.respostas, RESPOSTAS_B) && a && mesmoJson(a.respostas, RESPOSTAS_A),
    'respostas (002): as respostas completas do quiz, iguais às que a página mandou, na faixa a e na faixa b (com a lista dos números)');
  const pagina1 = (await comoPapel('service_role', 'select * from public.leads_para_planilha(null, null, 2)')).rows;
  const ultimo = pagina1[pagina1.length - 1];
  const pagina2 = (await comoPapel('service_role', 'select * from public.leads_para_planilha($1, $2, 2)', [ultimo.cursor_gravado_em, ultimo.id_pessoa])).rows;
  conferir(pagina1.length === 2 && pagina2.length === 1 && !pagina1.some(l => l.id_pessoa === pagina2[0].id_pessoa),
    'cursor: duas páginas (2 e 1), sem repetir nem perder');
  conferir(await codigoComo('service_role', 'select * from public.leads_para_planilha(now(), null)') === '22023', 'cursor pela metade recusado (22023)');
}

// quem pode o quê
const PAPEIS = [
  ['anon', 'select public.leads_para_planilha()', '42501', 'anon não chama leads_para_planilha'],
  ['anon', 'select * from public.eventos', '42501', 'anon não lê a tabela eventos'],
  ['anon', 'select * from public.pessoas', '42501', 'anon não lê a tabela pessoas'],
  ['anon', 'select * from public.painel_numeros', '42501', 'anon não lê a visão do painel'],
  ['service_role', `select public.registrar_evento('{"evento":{}}'::jsonb)`, '42501', 'service_role não executa registrar_evento'],
  ['service_role', `select public.registrar_fim_quiz('{}'::jsonb)`, '42501', 'service_role não executa registrar_fim_quiz'],
  ['service_role', 'select * from public.eventos', '42501', 'service_role não lê a tabela eventos'],
  ['authenticated', `select public.registrar_evento('{"evento":{}}'::jsonb)`, '42501', 'authenticated não executa registrar_evento'],
  ['authenticated', 'select public.leads_para_planilha()', '42501', 'authenticated não chama leads_para_planilha'],
  ['outro_papel', `select public.registrar_evento('{"evento":{}}'::jsonb)`, '42501', 'um papel qualquer (PUBLIC) não executa registrar_evento'],
  ['anon', `select public.registrar_evento('{"evento":{}}'::jsonb)`, '22023', 'anon executa registrar_evento (passa da permissão e para na conferência do pacote)'],
  ['anon', `select public.registrar_fim_quiz('{}'::jsonb)`, '22023', 'anon continua executando registrar_fim_quiz']
];
for (const [papel, sql, esperado, texto] of PAPEIS) {
  const c = await codigoComo(papel, sql);
  conferir(c === esperado, texto + ' (' + c + ')');
}

// a trava dos eventos continua valendo
conferir(await sdr(`delete from public.eventos where tipo = 'visita'`) === 'P0001', 'apagar evento continua recusado pela trava (P0001)');
conferir(await sdr(`update public.eventos set clique_fim_quiz = 'agora-nao' where tipo = 'interesse_pos_relatorio'`) === 'P0001',
  'reescrever o clique continua recusado pela trava (P0001)');

// esquema.sql rodado de novo por engano: a porta nova perde a permissão; as migrações de novo consertam
{
  const antesDeNovo = await fotografia();
  await comoDono(ESQUEMA);
  let linhas = await rodarConferir();
  let falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
  conferir(falsas.length > 0, 'esquema.sql rodado de novo depois das migrações: conferir.sql avisa (false nas linhas ' + falsas.join(', ') + ')');
  await comoDono(MIGRACAO);
  linhas = await rodarConferir();
  falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
  // a função registrar_recusa (004) continua lá, com definer: só perde a permissão do anon (linha 4)
  conferir(JSON.stringify(falsas) === '[4,19,20,21]',
    'só a 001 de novo: conferir.sql avisa nas linhas 4 e 19 a 21 (faltam a 002, a 003 e a 004; veio ' + falsas.join(', ') + ')');
  await comoDono(MIGRACAO_002);
  await comoDono(MIGRACAO_003);
  await comoDono(MIGRACAO_004);
  const depois = await fotografia();
  conferir(JSON.stringify(depois) === JSON.stringify(antesDeNovo) && (await esquemaAtual()) === depoisDa004,
    'a 002, a 003 e a 004 de novo deixam o esquema igual ao de antes, sem mudar nenhum dado');
}

// e o conferir.sql no fim, de novo
{
  const linhas = await rodarConferir();
  const final = linhas.find(l => l.n === 99);
  conferir(final.ok === true, 'no fim, conferir.sql de novo: ' + final.encontrado);
}

// ═══ 7. Limpeza dos leads de teste ═══
secao('7. Limpeza dos leads de teste (limpar-leads-de-teste.sql), duas vezes');
{
  // Pessoas de mentira para o teste (#102 e o contrário dele; nada real): uma com só o nome TESTE,
  // uma com só o e-mail de teste e uma "de verdade" de mentira, cada uma com a visita e o início do
  // quiz da sessão dela (ligados pelo fim do quiz) e uma com um clique.
  const pessoaFora = (n, nome, email, sessao) => {
    const p = pacoteFim(n, { faixa: 'a', nota: 96, sessao, respostas: RESPOSTAS_A });
    p.pessoa.nome = nome; p.pessoa.email = email;
    return p;
  };
  const FORA = [
    ['TESTE So O Nome', 'so.o.nome@exemplo.invalid', 'sessao-limpeza-1'],
    ['Pessoa So O Email', 'so.o.email@teste.invalid', 'sessao-limpeza-2'],
    ['Pessoa Exemplo Real', 'pessoa.real@exemplo.invalid', 'sessao-limpeza-3']
  ];
  for (let i = 0; i < FORA.length; i++) {
    const [nome, email, sessao] = FORA[i];
    await gravarEvento('anon', evento('visita', sessao));
    await gravarEvento('anon', evento('inicio_quiz', sessao));
    await gravarFim(pessoaFora(20 + i, nome, email, sessao));
  }
  await gravarEvento('anon', evento('interesse_pos_relatorio', 'sessao-limpeza-3', { clique_fim_quiz: 'quero-conversa' }));
  // uma de teste com o nome em minúsculas e o e-mail em maiúsculas (as duas marcas, sem diferenciar maiúsculas)
  {
    const p = pessoaFora(23, 'teste minusculas', 'MAIUSCULAS@TESTE.INVALID', 'sessao-limpeza-4');
    await gravarEvento('anon', evento('visita', 'sessao-limpeza-4'));
    await gravarFim(p);
  }
  // e uma visita sem pessoa (sessão sem fim do quiz)
  await gravarEvento('anon', evento('visita', 'sessao-limpeza-5'));
  // v2 (pedido 24, item 5): a linha "real" de 09/11, de mentira, com o código da linha do Otávio, criada em 09/11/2026 às
  // 08h56 de Brasília e sem as duas marcas; o fim do quiz dela entra pela porta, achado pelo e-mail
  await comoDono(`insert into public.pessoas (id_pessoa, nome, telefone, email, consentimento_whatsapp, consentimento_email,
      consentimento_texto, consentimento_em, primeira_utm_source, primeira_utm_campaign, criado_em)
    values ('${ID_LINHA_DE_09_11}', 'Pessoa Linha De Nove', '+55 (00) 90000-0099', 'linha.nove@exemplo.invalid', 'sim', 'sim',
      'Texto do consentimento do teste (mentira).', '2026-11-09 11:56:00+00', 'stories', 'funil-01', '2026-11-09 11:56:00+00')`);
  await gravarEvento('anon', evento('visita', 'sessao-limpeza-9'));
  await gravarFim(pessoaFora(29, 'Pessoa Linha De Nove', 'linha.nove@exemplo.invalid', 'sessao-limpeza-9'));

  // "fora" = quem fica: sem as duas marcas e sem o código da linha de 09/11
  const N = `'${ID_LINHA_DE_09_11}'::uuid`;
  const contagem = async () => umaLinha(`
    select (select count(*)::int from public.pessoas where nome ilike 'TESTE%' and lower(email) like '%@teste.invalid') as pessoas_teste,
           (select count(*)::int from public.eventos e join public.pessoas p using (id_pessoa)
             where p.nome ilike 'TESTE%' and lower(p.email) like '%@teste.invalid') as eventos_teste,
           (select count(*)::int from public.pessoas where id_pessoa = ${N}) as linha_nove,
           (select count(*)::int from public.eventos where id_pessoa = ${N}) as eventos_nove,
           (select count(*)::int from public.pessoas where not (nome ilike 'TESTE%' and lower(email) like '%@teste.invalid') and id_pessoa <> ${N}) as pessoas_fora,
           (select count(*)::int from public.eventos e join public.pessoas p using (id_pessoa)
             where not (p.nome ilike 'TESTE%' and lower(p.email) like '%@teste.invalid') and p.id_pessoa <> ${N}) as eventos_fora,
           (select count(*)::int from public.eventos where id_pessoa is null) as sem_pessoa,
           (select md5(coalesce(string_agg(to_jsonb(p)::text, '|' order by p.id_pessoa), '')) from public.pessoas p
             where not (p.nome ilike 'TESTE%' and lower(p.email) like '%@teste.invalid') and p.id_pessoa <> ${N}) as h_pessoas_fora,
           (select md5(coalesce(string_agg(to_jsonb(e)::text, '|' order by e.id_evento), '')) from public.eventos e
             where e.id_pessoa is null or e.id_pessoa in (select id_pessoa from public.pessoas
                                                          where not (nome ilike 'TESTE%' and lower(email) like '%@teste.invalid') and id_pessoa <> ${N})) as h_eventos_fora`);
  // os fins de quiz novos passam da margem de 1 minuto da planilha (o mesmo contorno de antes)
  await db.exec(`set session_replication_role = replica;
    update public.eventos set gravado_em = gravado_em - interval '2 minutes' where tipo = 'fim_quiz' and gravado_em > now() - interval '1 minute';
    set session_replication_role = origin;`);
  const antesDaLimpeza = await contagem();
  conferir(antesDaLimpeza.pessoas_teste === 6 && antesDaLimpeza.linha_nove === 1 && antesDaLimpeza.eventos_nove === 2 && antesDaLimpeza.pessoas_fora === 3 && antesDaLimpeza.eventos_fora === 10 && antesDaLimpeza.sem_pessoa >= 2,
    'antes da limpeza: ' + antesDaLimpeza.pessoas_teste + ' pessoas de teste com ' + antesDaLimpeza.eventos_teste + ' eventos; ' + antesDaLimpeza.pessoas_fora +
    ' pessoas que ficam (só o nome TESTE, só o e-mail de teste, a "de verdade" de mentira) com ' + antesDaLimpeza.eventos_fora + ' eventos; ' + antesDaLimpeza.sem_pessoa + ' eventos sem pessoa; a linha de 09/11 com ' + antesDaLimpeza.eventos_nove + ' eventos (v2)');

  const rodarLimpeza = async () => {
    const saidas = await comoDono(LIMPEZA);
    // a tabela do fim, a que o SQL Editor mostra (a última consulta com linhas; depois dela só vem o commit)
    return saidas.filter(x => x.fields && x.fields.some(f => f.name === 'conferencia')).at(-1).rows;
  };
  let tabela = null, erro = null;
  try { tabela = await rodarLimpeza(); } catch (e) { erro = e; }
  conferir(!erro && tabela && tabela.length === 7 && tabela.every(l => l.ok === true),
    'limpar-leads-de-teste.sql (v2) pelo dono, primeira vez: a tabela do fim com 7 linhas, todas ok' + (erro ? ' (' + erro.message + ')' : ''));
  const porN = Object.fromEntries((tabela || []).map(l => [l.n, l]));
  conferir(porN[1] && porN[1].antes === '6' && porN[1].depois === '0' && porN[2].antes === '1' && porN[2].depois === '0'
      && porN[3].antes === String(antesDaLimpeza.eventos_teste + antesDaLimpeza.eventos_nove) && porN[3].depois === '0',
    'a tabela do fim mostra o que saiu, só em números: pessoas de teste 6 para 0, a linha de 09/11 1 para 0, eventos delas ' + (porN[3] && porN[3].antes) + ' para 0');
  conferir(!JSON.stringify(tabela || []).match(/TESTE |teste\.invalid|exemplo\.invalid|90000/),
    'a tabela do fim não tem nome, e-mail nem telefone');
  const depoisDaLimpeza = await contagem();
  conferir(depoisDaLimpeza.pessoas_teste === 0 && depoisDaLimpeza.eventos_teste === 0, 'nenhuma pessoa de teste e nenhum evento delas sobrou');
  conferir(depoisDaLimpeza.linha_nove === 0 && depoisDaLimpeza.eventos_nove === 0, 'a linha de 09/11 e os eventos dela saíram, achados só pelo código (v2)');
  conferir(depoisDaLimpeza.pessoas_fora === 3 && depoisDaLimpeza.h_pessoas_fora === antesDaLimpeza.h_pessoas_fora,
    'ficaram as 3 pessoas que não têm as duas marcas (só o nome TESTE, só o e-mail de teste e a "de verdade" de mentira), cada linha igual');
  conferir(depoisDaLimpeza.eventos_fora === antesDaLimpeza.eventos_fora && depoisDaLimpeza.sem_pessoa === antesDaLimpeza.sem_pessoa && depoisDaLimpeza.h_eventos_fora === antesDaLimpeza.h_eventos_fora,
    'ficaram os ' + depoisDaLimpeza.eventos_fora + ' eventos delas e os ' + depoisDaLimpeza.sem_pessoa + ' eventos sem pessoa, cada linha igual');
  const trava = await umaLinha(`select tgenabled from pg_trigger where tgname = 'eventos_sem_mudanca'`);
  conferir(trava.tgenabled === 'O' && await sdr(`delete from public.eventos where id_pessoa is null`) === 'P0001',
    'depois da limpeza, a trava continua ligada: apagar evento é recusado (P0001)');
  const leadsDepois = (await comoPapel('service_role', 'select * from public.leads_para_planilha()')).rows;
  conferir(leadsDepois.length === 3 && leadsDepois.every(l => !(/^teste/i.test(l.nome) && /@teste\.invalid$/i.test(l.email))),
    'leads_para_planilha depois da limpeza: só os 3 que ficaram, nenhum lead de teste (' + leadsDepois.length + ')');

  erro = null;
  try { tabela = await rodarLimpeza(); } catch (e) { erro = e; }
  const p2 = Object.fromEntries((tabela || []).map(l => [l.n, l]));
  conferir(!erro && tabela.every(l => l.ok === true) && p2[1].antes === '0' && p2[2].antes === '0' && p2[3].antes === '0' && JSON.stringify(await contagem()) === JSON.stringify(depoisDaLimpeza),
    'segunda vez: não acha ninguém, não apaga nada, mostra zero, e o banco fica igual' + (erro ? ' (' + erro.message + ')' : ''));
  const linhas = await rodarConferir();
  conferir(linhas.find(l => l.n === 99).ok === true, 'conferir.sql depois da limpeza: ' + linhas.find(l => l.n === 99).encontrado);
}
{
  // se uma conferência falhar dentro da limpeza, nada é apagado: simulado com a trava desligada antes
  const p = pacoteFim(30, { faixa: 'a', nota: 96, sessao: 'sessao-limpeza-6', respostas: RESPOSTAS_A });
  await gravarFim(p);
  await comoDono('alter table public.eventos disable trigger eventos_sem_mudanca');
  let erro = null;
  await db.exec('set role dono');
  try { await db.exec(LIMPEZA); } catch (e) { erro = e; }
  await db.exec('rollback');   // a transação da limpeza ficou aberta e abortada: desfaz
  await db.exec('reset role');
  await comoDono('alter table public.eventos enable trigger eventos_sem_mudanca');
  const r = await umaLinha(`select count(*)::int as n from public.pessoas where email = 'migracao30@teste.invalid'`);
  conferir(erro && /trava/.test(erro.message) && r.n === 1, 'com a trava desligada antes, a limpeza para no passo 0 e não apaga nada');
}
{
  // v2: o código da linha de 09/11 numa pessoa criada em outro dia é código errado: a limpeza para no passo 0 e não apaga nada
  await comoDono(`insert into public.pessoas (id_pessoa, nome, telefone, email, consentimento_whatsapp, consentimento_email,
      consentimento_texto, consentimento_em, criado_em)
    values ('${ID_LINHA_DE_09_11}', 'Pessoa Outro Dia', '+55 (00) 90000-0098', 'outro.dia@exemplo.invalid', 'sim', 'sim',
      'Texto do consentimento do teste (mentira).', '2026-11-10 12:00:00+00', '2026-11-10 12:00:00+00')`);
  const testesAntes = await umaLinha(`select count(*)::int as n from public.pessoas where nome ilike 'TESTE%' and lower(email) like '%@teste.invalid'`);
  let erro = null;
  await db.exec('set role dono');
  try { await db.exec(LIMPEZA); } catch (e) { erro = e; }
  await db.exec('rollback');
  await db.exec('reset role');
  const r = await umaLinha(`select (select count(*)::int from public.pessoas where id_pessoa = '${ID_LINHA_DE_09_11}') as nove,
                                   (select count(*)::int from public.pessoas where nome ilike 'TESTE%' and lower(email) like '%@teste.invalid') as testes`);
  conferir(erro && /código errado/.test(erro.message) && r.nove === 1 && r.testes === testesAntes.n && testesAntes.n > 0,
    'código da linha de 09/11 numa pessoa criada em outro dia: a limpeza para no passo 0 e não apaga nada, nem os ' + testesAntes.n + ' de teste (v2)');
  await comoDono(`delete from public.pessoas where id_pessoa = '${ID_LINHA_DE_09_11}'`);
}

// ═══ 8. Migração 003 · a origem e os ids do lead (#121) ═══
secao('8. Migração 003 · a origem e os ids, pela porta do fim do quiz');
{
  const sorte = (n) => String(n).padStart(6, '0');
  const ID = (tipo, n) => tipo + '-1763500000000-' + sorte(n);
  const novo = (n, extra, pessoa = {}) => {
    const p = pacoteFim(n, { faixa: 'a', nota: 96, sessao: 'sessao-origem-' + n, respostas: RESPOSTAS_A });
    Object.assign(p.pessoa, pessoa);
    Object.assign(p.evento, { versao_entrega: 2 }, extra);
    return p;
  };
  const gravar = async (p) => { try { await gravarFim(p); return 'ok'; } catch (e) { return e.code || 'sem codigo'; } };
  const linha = (id) => umaLinha(`select utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, fbp, fbc,
                                         id_lead, id_qualificado, qualificado from public.eventos where id_lead = $1`, [id]);

  // 1. o pacote antigo, sem nenhum campo novo, continua gravando, com as colunas novas vazias
  const antigo = pacoteFim(40, { faixa: 'a', nota: 96, sessao: 'sessao-origem-40', respostas: RESPOSTAS_A });
  conferir(await gravar(antigo) === 'ok', 'pacote antigo (sem os campos novos) grava como antes');
  const ra = await umaLinha(`select e.utm_medium, e.fbclid, e.fbp, e.id_lead, e.qualificado from public.eventos e
                              join public.pessoas p using (id_pessoa) where p.email = 'migracao40@teste.invalid' and e.tipo = 'fim_quiz'`);
  conferir(ra && ra.utm_medium === '' && ra.fbclid === '' && ra.fbp === null && ra.id_lead === null && ra.qualificado === null,
    'pacote antigo: utm_medium e fbclid vazios, fbp, id_lead e qualificado sem valor');

  // 2. o pacote novo, qualificado, vindo de um anúncio
  const q = novo(41, { utm_source: 'meta-ads', utm_campaign: 'funil-01', utm_medium: 'cpc', utm_content: 'teste', utm_term: '',
                       fbclid: 'IwAR0abc_DEF-123', id_lead: ID('lead', 41), id_qualificado: ID('qualificado', 41), qualificado: true },
                 { primeira_utm_source: 'meta-ads' });
  conferir(await gravar(q) === 'ok', 'pacote novo qualificado, com utm_source meta-ads, grava');
  const rq = await linha(ID('lead', 41));
  conferir(rq && rq.utm_source === 'meta-ads' && rq.utm_medium === 'cpc' && rq.utm_content === 'teste' && rq.utm_term === '' &&
      rq.fbclid === 'IwAR0abc_DEF-123' && rq.fbp === null && rq.fbc === null && rq.id_qualificado === ID('qualificado', 41) && rq.qualificado === true,
    'qualificado: as cinco utm, o fbclid (com maiúsculas), fbp e fbc sem valor, id_qualificado e qualificado = true');
  const pq = await umaLinha(`select primeira_utm_source from public.pessoas where email = 'migracao41@teste.invalid'`);
  conferir(pq && pq.primeira_utm_source === 'meta-ads', 'a pessoa nova guarda meta-ads em primeira_utm_source');

  // 3. o pacote novo, não qualificado
  const nq = novo(42, { utm_source: 'meta-ads', utm_content: 'teste', fbclid: 'teste', id_lead: ID('lead', 42), qualificado: false });
  conferir(await gravar(nq) === 'ok', 'pacote novo não qualificado grava');
  const rn = await linha(ID('lead', 42));
  conferir(rn && rn.id_qualificado === null && rn.qualificado === false && rn.fbclid === 'teste', 'não qualificado: sem id_qualificado, qualificado = false');

  // 4. o mesmo id_lead de novo (o "Tentar de novo" depois de uma resposta perdida): não duplica e não dá erro
  const antesDoReenvio = await umaLinha(`select (select count(*) from public.eventos)::int as e, (select count(*) from public.pessoas)::int as p`);
  conferir(await gravar(q) === 'ok', 'reenvio do mesmo id_lead: sem erro');
  const depoisDoReenvio = await umaLinha(`select (select count(*) from public.eventos)::int as e, (select count(*) from public.pessoas)::int as p`);
  conferir(JSON.stringify(antesDoReenvio) === JSON.stringify(depoisDoReenvio), 'reenvio do mesmo id_lead: nenhuma linha nova');

  // 5. o banco é a última trava: fora do formato, recusa (o garçom saneia antes, e a página também)
  const RECUSAS = [
    [{ utm_medium: 'Com Espaço' }, 'utm_medium fora do formato'],
    [{ utm_content: 'x'.repeat(101) }, 'utm_content com mais de 100 caracteres'],
    [{ utm_campaign: 'outra' }, 'utm_campaign fora de funil-01 (continua fechada)'],
    [{ utm_source: 'facebook' }, 'utm_source fora da lista'],
    [{ fbclid: 'com espaço' }, 'fbclid fora do formato'],
    [{ fbp: 'qualquer-coisa' }, 'fbp fora do formato fb.N.N.xxx'],
    [{ id_lead: 'lead-sem-numero' }, 'id_lead fora do formato'],
    [{ id_lead: ID('lead', 43), qualificado: true }, 'qualificado verdadeiro sem id_qualificado'],
    [{ id_lead: ID('lead', 44), id_qualificado: ID('qualificado', 44), qualificado: false }, 'id_qualificado com qualificado falso'],
    [{ id_qualificado: ID('qualificado', 45), qualificado: true }, 'id_qualificado sem id_lead']
  ];
  let n = 50;
  for (const [extra, texto] of RECUSAS) {
    const c = await gravar(novo(n++, extra));
    conferir(c === '23514', 'recusado pelo banco: ' + texto + ' (' + c + ')');
  }
  conferir(await gravar(novo(n++, { id_lead: ID('lead', 42) }, {})) === 'ok' &&
      Number((await umaLinha(`select count(*) from public.eventos where id_lead = $1`, [ID('lead', 42)])).count) === 1,
    'outro pacote com um id_lead que já existe não grava outra linha');

  // 6. os eventos sem pessoa (visita, início do quiz) continuam sem os campos do fim, e aceitam meta-ads
  conferir(await gravarEvento('anon', evento('inicio_quiz', 'sessao-origem-60', { utm_source: 'meta-ads' })) === 'ok',
    'início do quiz com utm_source meta-ads grava');
  conferir(await gravarEvento('anon', evento('inicio_quiz', 'sessao-origem-61', { id_lead: ID('lead', 61) })) === '22023',
    'início do quiz com id_lead é recusado pela porta dele (registrar_evento não mudou)');

  // 7. a planilha devolve a origem e os ids no fim (com o contorno da margem de 1 minuto)
  await db.exec(`set session_replication_role = replica;
    update public.eventos set gravado_em = gravado_em - interval '2 minutes' where tipo = 'fim_quiz' and gravado_em > now() - interval '1 minute';
    set session_replication_role = origin;`);
  const leads = (await comoPapel('service_role', 'select * from public.leads_para_planilha()')).rows;
  const l41 = leads.find(l => l.email === 'migracao41@teste.invalid');
  conferir(l41 && l41.utm_source === 'meta-ads' && l41.utm_medium === 'cpc' && l41.utm_campaign === 'funil-01' && l41.utm_content === 'teste' &&
      l41.fbclid === 'IwAR0abc_DEF-123' && l41.id_lead === ID('lead', 41) && l41.id_qualificado === ID('qualificado', 41) && l41.qualificado === true,
    'planilha: o lead qualificado chega com a origem e os ids nas colunas do fim');
  const l40 = leads.find(l => l.email === 'migracao40@teste.invalid');
  conferir(l40 && l40.utm_source === 'bio' && l40.id_lead === null && l40.qualificado === null, 'planilha: o lead do pacote antigo chega com a origem de antes e sem ids');

  // 8. as permissões continuam as mesmas, e o conferir.sql continua todo certo
  conferir(await codigoComo('authenticated', `select public.registrar_fim_quiz('{}'::jsonb)`) === '42501' &&
      await codigoComo('anon', 'select * from public.eventos') === '42501',
    'sem mudança de permissão: authenticated não grava, anon não lê a tabela');
  const linhas = await rodarConferir();
  conferir(linhas.find(l => l.n === 99).ok === true, 'conferir.sql no fim da seção 8: ' + linhas.find(l => l.n === 99).encontrado);
}

// ═══ 9. Migração 004 · as utm na abertura e a contagem das recusas (pedido 24) ═══
secao('9. Migração 004 · as utm de texto livre no início do quiz e a contagem das recusas, trocando de papel');
{
  const S = 'sessao-utm-abertura';
  const ultimoInicio = (sessao) => umaLinha(`select utm_medium, utm_content, utm_term from public.eventos where id_sessao = $1 and tipo = 'inicio_quiz' order by id_evento desc limit 1`, [sessao]);
  conferir(await gravarEvento('anon', evento('inicio_quiz', S, { utm_medium: 'cpc', utm_content: 'criativo-07', utm_term: 'donos_de_agencia' })) === 'ok',
    'anon grava o início do quiz com utm_medium, utm_content e utm_term');
  let r = await ultimoInicio(S);
  conferir(r && r.utm_medium === 'cpc' && r.utm_content === 'criativo-07' && r.utm_term === 'donos_de_agencia', 'as três utm gravadas como vieram');
  conferir(await gravarEvento('anon', evento('inicio_quiz', S + '-2', { utm_medium: 'COM ESPAÇO', utm_content: 'x'.repeat(101), utm_term: 'ok_1' })) === 'ok',
    'utm fora do formato não recusa o início do quiz');
  r = await ultimoInicio(S + '-2');
  conferir(r && r.utm_medium === '' && r.utm_content === '' && r.utm_term === 'ok_1', 'fora do formato, a utm é gravada vazia; a que está no formato fica');
  conferir(await gravarEvento('anon', evento('inicio_quiz', S + '-3')) === 'ok', 'o pacote antigo, sem as três, continua gravando');
  r = await ultimoInicio(S + '-3');
  conferir(r && r.utm_medium === '' && r.utm_content === '' && r.utm_term === '', 'sem as três, gravadas vazias');
  conferir(await gravarEvento('anon', evento('inicio_quiz', S + '-4', { fbclid: 'IwAR0abc' })) === '22023', 'o fbclid continua fora desta porta (22023)');

  // a contagem das recusas: só registrar_recusa grava, e só número
  const recusar = (papel, porta, motivo) => codigoComo(papel, 'select public.registrar_recusa($1, $2)', [porta, motivo]);
  conferir(await recusar('anon', 'fim-quiz', 'armadilha') === 'ok' && await recusar('anon', 'fim-quiz', 'armadilha') === 'ok' && await recusar('anon', 'evento', 'limite') === 'ok',
    'anon soma recusas pela registrar_recusa');
  const linhas = (await db.query(`select porta, motivo, quantas, dia = (now() at time zone 'America/Sao_Paulo')::date as hoje from public.recusas order by porta, motivo`)).rows;
  conferir(JSON.stringify(linhas.map(l => [l.porta, l.motivo, l.quantas, l.hoje])) === JSON.stringify([['evento', 'limite', 1, true], ['fim-quiz', 'armadilha', 2, true]]),
    'uma linha por dia (Brasília), porta e motivo, com quantas: ' + linhas.map(l => l.porta + '/' + l.motivo + '=' + l.quantas).join(', '));
  conferir(await recusar('anon', 'planilha', 'limite') === '23514', 'porta fora da lista é recusada pela restrição (23514)');
  conferir(await recusar('anon', 'fim-quiz', 'fulano@exemplo.invalid') === '23514' && await recusar('anon', 'fim-quiz', 'banco 400') === '23514' && await recusar('anon', 'fim-quiz', 'x'.repeat(41)) === '23514',
    'motivo fora do formato (e-mail, número, espaço, longo demais) é recusado: dado pessoal não entra (23514)');
  conferir(await codigoComo('anon', 'select * from public.recusas') === '42501' && await codigoComo('anon', `insert into public.recusas (dia, porta, motivo, quantas) values (current_date, 'evento', 'limite', 99)`) === '42501',
    'anon não lê nem grava a tabela recusas direto (42501)');
  conferir(await recusar('authenticated', 'evento', 'limite') === '42501' && await recusar('service_role', 'evento', 'limite') === '42501' && await recusar('outro_papel', 'evento', 'limite') === '42501',
    'authenticated, service_role e um papel qualquer não executam registrar_recusa (42501)');
  const c = await rodarConferir();
  conferir(c.find(l => l.n === 99).ok === true, 'conferir.sql no fim da seção 9: ' + c.find(l => l.n === 99).encontrado);
}

await db.close();
const ok = resultados.filter(Boolean).length;
console.log('\nconferir.sql depois da migração: ' + totalConferir);
console.log((ok === resultados.length ? 'Tudo certo: ' : 'FALHOU: ') + ok + ' de ' + resultados.length + ' conferências passaram');
process.exit(ok === resultados.length ? 0 : 1);
