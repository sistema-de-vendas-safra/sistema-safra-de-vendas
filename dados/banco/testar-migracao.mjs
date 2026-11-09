// Teste da migração 001 (banco v2 para v3) num Postgres local, sem rede e sem serviço real (etapa 32)
// Parte de dados/banco/ (ver README.md desta pasta, "Conferido nesta máquina"). Confere
// dados/banco/migracoes/001-v3.sql e dados/banco/conferir.sql (v2).
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
//   4. A migração duas vezes, pelo dono. Os dados não mudam (cada linha igual, antes e depois), e
//      a segunda rodada deixa o esquema igual ao da primeira (restrições, funções e permissões).
//   5. conferir.sql v2: todas as linhas true.
//   6. As funções novas e alteradas, trocando de papel (SET ROLE anon, service_role, authenticated).
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
const CONFERIR = ler('dados/banco/conferir.sql');
const CATALOGO = ler('dados/banco/catalogo-prototipo.sql');

const resultados = [];
function conferir(ok, texto) {
  resultados.push(!!ok);
  console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto);
}
const secao = (t) => console.log('\n· ' + t);

const db = new PGlite();
await db.exec(`set time zone 'UTC'`);
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
           (select md5(coalesce(string_agg((to_jsonb(e) - 'clique_fim_quiz')::text, '|' order by e.id_evento), '')) from public.eventos e) as h_eventos,
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
  conferir(final.ok === false && JSON.stringify(falsas) === JSON.stringify([4, 8, 14, 15, 16, 17, 18]),
    'conferir.sql v2 num banco só v2 avisa que falta a migração: false nas linhas ' + falsas.join(', ') + ' (' + final.encontrado + ')');
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

// ═══ 5. conferir.sql ═══
secao('4. conferir.sql v2 depois da migração');
let totalConferir = '';
{
  const linhas = await rodarConferir();
  for (const l of linhas.filter(l => l.n !== 99 && !l.ok)) conferir(false, 'conferir.sql ' + l.n + ' (' + l.conferencia + '): encontrado ' + l.encontrado);
  const final = linhas.find(l => l.n === 99);
  totalConferir = final.encontrado;
  conferir(final.ok === true && final.encontrado === '18 de 18', 'conferir.sql: linha "tudo certo" = ' + final.ok + ' (' + final.encontrado + ')');
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
  conferir(leads.every(l => 'entrou_em' in l && 'cursor_gravado_em' in l) && Object.keys(leads[0]).length === 17,
    'as 17 colunas: as 16 do v2 mais clique_fim_quiz');
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

// esquema.sql rodado de novo por engano: a porta nova perde a permissão; a migração de novo conserta
{
  const antesDeNovo = await fotografia();
  await comoDono(ESQUEMA);
  const linhas = await rodarConferir();
  const falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
  conferir(falsas.length > 0, 'esquema.sql rodado de novo depois da migração: conferir.sql avisa (false nas linhas ' + falsas.join(', ') + ')');
  await comoDono(MIGRACAO);
  const depois = await fotografia();
  conferir(JSON.stringify(depois) === JSON.stringify(antesDeNovo) && (await esquemaAtual()) === depoisDaPrimeira,
    'a migração rodada de novo deixa o esquema igual ao de antes, sem mudar nenhum dado');
}

// e o conferir.sql no fim, de novo
{
  const linhas = await rodarConferir();
  const final = linhas.find(l => l.n === 99);
  conferir(final.ok === true, 'no fim, conferir.sql de novo: ' + final.encontrado);
}

await db.close();
const ok = resultados.filter(Boolean).length;
console.log('\nconferir.sql depois da migração: ' + totalConferir);
console.log((ok === resultados.length ? 'Tudo certo: ' : 'FALHOU: ') + ok + ' de ' + resultados.length + ' conferências passaram');
process.exit(ok === resultados.length ? 0 : 1);
