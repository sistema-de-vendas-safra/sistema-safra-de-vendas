// Teste local do garçom v2 · não toca nenhum serviço real
// Rodar da raiz do repositório:  node entregas/garcom/teste/testar-garcom.mjs
//
// Importa o handler de entregas/garcom/garcom.mjs e o chama nas três partes do Worker:
//   · porta pública POST /api/fim-quiz, com o pacote do exemplo do README do quiz-01
//     (entregas/quizzes/quiz-01/pagina/README.md, "pacote do exemplo") e casos inválidos;
//   · porta privada GET /api/planilha/leads-novos, com chave, cursor e limite;
//   · arquivos do protótipo, com um ASSETS falso.
// O fetch é falso: só registra o que seria chamado e nunca sai da máquina.
// Os valores do env são de mentira e não apontam para lugar nenhum (domínio .invalid).
// Leads de teste com nome começando por TESTE e e-mail @teste.invalid (decisão #102).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import garcom from '../garcom.mjs';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..', '..', '..');

// ··· Pacote do exemplo, lido do README do quiz-01 (dados fictícios), marcado como teste (#102) ···
const readmeQuiz = readFileSync(join(raiz, 'entregas/quizzes/quiz-01/pagina/README.md'), 'utf8');
const linha = readmeQuiz.split('\n').find(l => l.trim().startsWith('pacote do exemplo:'));
const PACOTE_EXEMPLO = JSON.parse(linha.slice(linha.indexOf('{')));
PACOTE_EXEMPLO.pessoa.nome = 'TESTE ' + PACOTE_EXEMPLO.pessoa.nome;
PACOTE_EXEMPLO.pessoa.email = 'marina@teste.invalid';
const copia = () => structuredClone(PACOTE_EXEMPLO);

// ··· Ambiente de mentira ···
const ORIGEM = 'https://prototipo.exemplo.invalid';
const PUBLICAVEL = 'chave-publicavel-de-mentira';
const SECRETA = 'chave-secreta-de-mentira';
const CHAVE_PLANILHA = 'chave-da-planilha-de-mentira-com-mais-de-32-letras';
const ENV = {
  SUPABASE_URL: 'https://banco.exemplo.invalid',
  SUPABASE_CHAVE_PUBLICAVEL: PUBLICAVEL,
  SUPABASE_CHAVE_SECRETA: SECRETA,
  CHAVE_PLANILHA,
  ORIGEM_PERMITIDA: ORIGEM
};

// ··· Leads de mentira que o banco falso devolve à porta privada (#102) ···
const LEADS_FALSOS = [
  { id_pessoa: '11111111-1111-4111-8111-111111111111', nome: 'TESTE Ana', telefone: '+55 (00) 90000-0001', email: 'ana@teste.invalid',
    empresa: '', consentimento_whatsapp: 'sim', consentimento_email: 'sim', lead_score_faixa: 'a', lead_score_nota: 96,
    respostas_a_confirmar: null, entrou_em: '2026-11-08T12:00:00.123456+00:00', tentativas_feitas: 0,
    estagio: null, estado: null, data_volta: null, cursor_gravado_em: '2026-11-08T12:00:00.123456+00:00' },
  { id_pessoa: '22222222-2222-4222-8222-222222222222', nome: 'TESTE Bruno', telefone: '+55 (00) 90000-0002', email: 'bruno@teste.invalid',
    empresa: 'TESTE Empresa', consentimento_whatsapp: 'sim', consentimento_email: 'nao', lead_score_faixa: 'b', lead_score_nota: 70,
    respostas_a_confirmar: { 'valor-medio': 'x', vendedores: 'y' }, entrou_em: '2026-11-08T12:00:00.654321+00:00', tentativas_feitas: 0,
    estagio: null, estado: null, data_volta: null, cursor_gravado_em: '2026-11-08T12:00:00.654321+00:00' }
];

// ··· Fetch falso: registra e responde como o banco responderia ···
let chamadas = [];
let todasAsChamadas = [];
let respostaDoBanco = { status: 204 };
globalThis.fetch = async (endereco, opcoes) => {
  if (!String(endereco).startsWith(ENV.SUPABASE_URL)) throw new Error('teste tentou sair para fora: ' + endereco);
  const c = { endereco: String(endereco), funcao: String(endereco).split('/rpc/')[1], metodo: opcoes.method, cabecalhos: { ...opcoes.headers }, corpo: JSON.parse(opcoes.body) };
  chamadas.push(c); todasAsChamadas.push(c);
  if (respostaDoBanco.falha) throw new Error('banco fora do ar (simulado)');
  if (respostaDoBanco.corpo !== undefined) {
    return new Response(typeof respostaDoBanco.corpo === 'string' ? respostaDoBanco.corpo : JSON.stringify(respostaDoBanco.corpo),
      { status: respostaDoBanco.status, headers: { 'Content-Type': 'application/json' } });
  }
  return new Response(respostaDoBanco.status === 204 ? null : '{"code":"23503","message":"detalhe interno do banco"}', { status: respostaDoBanco.status });
};

// ··· ASSETS falso: responde como o binding de arquivos da Cloudflare ···
let pedidosAosArquivos = [];
const ASSETS = {
  async fetch(req) {
    pedidosAosArquivos.push(new URL(req.url).pathname);
    return new Response('<!doctype html><title>pagina de mentira</title>', { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', ETag: '"mentira"' } });
  }
};

// Silencia o registro do garçom no console, mas guarda para conferir que não leva dado pessoal
const registros = [];
const logOriginal = console.log;
console.log = (...a) => registros.push(a.join(' '));

function pedido({ metodo = 'POST', origem = ORIGEM, corpo, tipo = 'application/json', caminho = '/api/fim-quiz' } = {}) {
  const cabecalhos = {};
  if (origem) cabecalhos.Origin = origem;
  if (tipo) cabecalhos['Content-Type'] = tipo;
  const init = { method: metodo, headers: cabecalhos };
  if (corpo !== undefined) init.body = typeof corpo === 'string' ? corpo : JSON.stringify(corpo);
  return new Request(ORIGEM + caminho, init);
}
function pedidoPlanilha({ chave = CHAVE_PLANILHA, busca = '', metodo = 'GET' } = {}) {
  const cabecalhos = {};
  if (chave !== null) cabecalhos['X-Chave-Planilha'] = chave;
  return new Request(ORIGEM + '/api/planilha/leads-novos' + busca, { method: metodo, headers: cabecalhos });
}

const resultados = [];
const marcar = (ok, texto) => resultados.push({ ok, linha: (ok ? 'OK    ' : 'FALHOU') + ' · ' + texto });
const semNoindex = [];
const VAZAMENTO = /supabase|exemplo\.invalid|23503|detalhe interno|de-mentira|teste\.invalid|TESTE/i;

// Chama o Worker e confere status, número de chamadas ao banco, noindex e que a resposta não vaza nada.
// Devolve { r, texto, chamadas }.
async function caso(nome, req, esperado, chamadasEsperadas, { env = ENV, podeTerLeads = false } = {}) {
  chamadas = [];
  const r = await garcom.fetch(req, env);
  const texto = await r.text();
  const noindex = r.headers.get('X-Robots-Tag') === 'noindex';
  if (!noindex) semNoindex.push(nome);
  // resposta com leads pode ter dado de teste; nunca segredo nem detalhe interno do banco
  const vazou = podeTerLeads
    ? /de-mentira|23503|detalhe interno|banco\.exemplo/.test(texto)
    : VAZAMENTO.test(texto);
  const ok = r.status === esperado && chamadas.length === chamadasEsperadas && noindex && !vazou;
  const mostrar = podeTerLeads ? '(com leads)' : texto;
  marcar(ok, nome + ' (status ' + r.status + ', chamadas ao banco ' + chamadas.length + (mostrar ? ', resposta ' + mostrar : '') + ')');
  return { r, texto, chamadas: chamadas.slice() };
}

// ════════ Porta pública: POST /api/fim-quiz (todos os casos da v1) ════════

// 1. Pacote do exemplo: aceito e gravado uma vez
const { chamadas: g } = await caso('pacote do exemplo do quiz-01', pedido({ corpo: copia() }), 201, 1);
const gravacaoExemplo = g[0];

// 2. Inválidos: recusados, nada gravado
{ const p = copia(); p.pessoa.consentimento_whatsapp = 'nao'; p.pessoa.consentimento_email = 'nao';
  await caso('sem consentimento (nenhum canal aceito)', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.pessoa.consentimento_texto = '';
  await caso('consentimento sem texto', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); delete p.pessoa.consentimento_em;
  await caso('consentimento sem data', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); delete p.evento.funil;
  await caso('etiqueta faltando (funil)', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); delete p.evento.versao_entrega;
  await caso('etiqueta faltando (versao_entrega)', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); delete p.evento.utm_campaign;
  await caso('etiqueta faltando (utm_campaign)', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.evento.utm_source = 7;
  await caso('utm_source que não é texto', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.evento.funil = 'funil-99';
  await caso('funil fora da lista', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.evento.tipo = 'interesse_pos_relatorio';
  await caso('tipo proposto, ainda não ligado (interesse_pos_relatorio)', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.evento.lead_score_faixa = 'z';
  await caso('faixa fora da lista', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.pessoa.cpf = '000';
  await caso('campo que a planta não tem (cpf)', pedido({ corpo: p }), 422, 0); }
// novo na v2: a mesma regra do banco v2, de 8 a 15 dígitos no telefone
{ const p = copia(); p.pessoa.telefone = '+55 (00) 9-00';
  await caso('telefone com menos de 8 dígitos', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.pessoa.telefone = '+55 00 90000 0000 0000';
  await caso('telefone com mais de 15 dígitos', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.pessoa.telefone = '+() -- -- () --';
  await caso('telefone só com sinais', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.pessoa.telefone = '+5500900000';
  await caso('telefone com 10 dígitos', pedido({ corpo: p }), 201, 1); }

// 2b. Utm fora da lista: o pacote entra e a utm é gravada vazia (planta, 5.5; 18.7)
async function utmVazia(nome, mexer, parte, campo) {
  const p = copia(); mexer(p);
  const antes = registros.length;
  const { chamadas: gv } = await caso(nome, pedido({ corpo: p }), 201, 1);
  const gravado = gv[0] && gv[0].corpo.pacote[parte][campo];
  const anotado = registros.slice(antes).some(r => r.includes('utm-fora-da-lista') && r.includes(campo));
  marcar(gravado === '' && anotado, nome + ': gravada vazia e anotada no registro do garçom');
}
await utmVazia('utm_source fora da lista (tiktok)', p => { p.evento.utm_source = 'tiktok'; }, 'evento', 'utm_source');
await utmVazia('utm_source reservada fora do MVP (meta-ads)', p => { p.evento.utm_source = 'meta-ads'; }, 'evento', 'utm_source');
await utmVazia('primeira_utm_campaign fora da lista', p => { p.pessoa.primeira_utm_campaign = 'outra-campanha'; }, 'pessoa', 'primeira_utm_campaign');

// 3. Portaria: método, origem, tipo do corpo, tamanho, JSON
await caso('método GET', pedido({ metodo: 'GET', tipo: null }), 405, 0);
await caso('outra origem', pedido({ origem: 'https://outro.exemplo.invalid', corpo: copia() }), 403, 0);
await caso('sem origem', pedido({ origem: null, corpo: copia() }), 403, 0);
{ const { r } = await caso('pré-voo do navegador (OPTIONS)', pedido({ metodo: 'OPTIONS', tipo: null }), 204, 0);
  const acao = r.headers.get('Access-Control-Allow-Origin');
  marcar(acao === ORIGEM, 'pré-voo libera só a própria origem, nunca "*" (Access-Control-Allow-Origin = ORIGEM_PERMITIDA)'); }
await caso('corpo que não é JSON declarado', pedido({ corpo: 'a=1', tipo: 'text/plain' }), 415, 0);
await caso('JSON quebrado', pedido({ corpo: '{"pessoa":' }), 400, 0);
{ const p = copia(); p.evento.respostas.extra = 'x'.repeat(20000);
  await caso('pacote grande demais', pedido({ corpo: p }), 413, 0); }
// novo na v2: corpo grande sem Content-Length, mandado em partes; a leitura para ao passar de 16 KB
{ let partesLidas = 0;
  const parte = new TextEncoder().encode('x'.repeat(4096));
  const fluxo = new ReadableStream({ pull(c) { partesLidas++; if (partesLidas > 100) c.close(); else c.enqueue(parte); } });
  const req = new Request(ORIGEM + '/api/fim-quiz', { method: 'POST', headers: { Origin: ORIGEM, 'Content-Type': 'application/json' }, body: fluxo, duplex: 'half' });
  await caso('corpo grande sem Content-Length (em partes)', req, 413, 0);
  marcar(partesLidas <= 7, 'corpo grande sem Content-Length: a leitura parou logo depois de 16 KB (' + partesLidas + ' partes de 4 KB lidas, de 100)'); }
await caso('Content-Type application/jsonx', pedido({ corpo: copia(), tipo: 'application/jsonx' }), 415, 0);
await caso('Content-Type application/json; charset=utf-8', pedido({ corpo: copia(), tipo: 'application/json; charset=utf-8' }), 201, 1);
await caso('Content-Type em maiúsculas com espaço (APPLICATION/JSON ;charset=utf-8)', pedido({ corpo: copia(), tipo: 'APPLICATION/JSON ;charset=utf-8' }), 201, 1);
await caso('ORIGEM_PERMITIDA com barra no fim: a barra é ignorada', pedido({ corpo: copia() }), 201, 1, { env: { ...ENV, ORIGEM_PERMITIDA: ORIGEM + '/' } });
await caso('Origin com barra no fim não é a mesma origem', pedido({ origem: ORIGEM + '/', corpo: copia() }), 403, 0);

// 4. Banco: recusa e falha não vazam detalhe
respostaDoBanco = { status: 409 };
await caso('banco recusa (entrega fora do catálogo, simulado)', pedido({ corpo: copia() }), 422, 1);
respostaDoBanco = { status: 401 };
await caso('banco recusa a chave (simulado)', pedido({ corpo: copia() }), 502, 1);
respostaDoBanco = { falha: true };
await caso('banco fora do ar (simulado)', pedido({ corpo: copia() }), 502, 1);
respostaDoBanco = { status: 204 };
await caso('cofre vazio (sem SUPABASE_CHAVE_PUBLICAVEL)', pedido({ corpo: copia() }), 503, 0, { env: { ...ENV, SUPABASE_CHAVE_PUBLICAVEL: '' } });
await caso('cofre sem a publicável e com a secreta: não usa a secreta', pedido({ corpo: copia() }), 503, 0, { env: { ...ENV, SUPABASE_CHAVE_PUBLICAVEL: undefined } });
await caso('sem ORIGEM_PERMITIDA', pedido({ corpo: copia() }), 503, 0, { env: { ...ENV, ORIGEM_PERMITIDA: '' } });

// 5. Chave usada na porta pública: a publicável, só no apikey (não é JWT), nunca a secreta
{ const h = gravacaoExemplo.cabecalhos;
  marcar(gravacaoExemplo.funcao === 'registrar_fim_quiz' && h.apikey === PUBLICAVEL && !('Authorization' in h),
    'porta pública chama registrar_fim_quiz com a chave publicável, só no apikey'); }
{ const publicas = todasAsChamadas.filter(c => c.funcao === 'registrar_fim_quiz');
  const usouSecreta = publicas.some(c => Object.values(c.cabecalhos).some(v => String(v).includes(SECRETA)));
  marcar(publicas.length > 0 && !usouSecreta, 'porta pública nunca usou a chave secreta (' + publicas.length + ' gravações conferidas)'); }
{ chamadas = [];
  const jwtDeMentira = 'mentira.de.jwt';
  await garcom.fetch(pedido({ corpo: copia() }), { ...ENV, SUPABASE_CHAVE_PUBLICAVEL: jwtDeMentira });
  const h = chamadas[0] && chamadas[0].cabecalhos;
  marcar(!!h && h.apikey === jwtDeMentira && h.Authorization === 'Bearer ' + jwtDeMentira, 'chave antiga em formato JWT (mentira) vai também no Authorization, como na v1'); }

// ════════ Porta privada: GET /api/planilha/leads-novos ════════

respostaDoBanco = { status: 200, corpo: LEADS_FALSOS };

// 6. Chave
await caso('planilha sem chave', pedidoPlanilha({ chave: null }), 401, 0);
await caso('planilha com chave vazia', pedidoPlanilha({ chave: '' }), 401, 0);
await caso('planilha com chave errada (mesmo tamanho)', pedidoPlanilha({ chave: CHAVE_PLANILHA.slice(0, -1) + 'X' }), 401, 0);
await caso('planilha com chave de tamanho diferente', pedidoPlanilha({ chave: CHAVE_PLANILHA + 'a' }), 401, 0);
await caso('planilha com chave curta', pedidoPlanilha({ chave: 'x' }), 401, 0);
await caso('planilha com a chave publicável no lugar', pedidoPlanilha({ chave: PUBLICAVEL }), 401, 0);
await caso('segredo vazio no cofre (CHAVE_PLANILHA vazia), pedido com chave vazia', pedidoPlanilha({ chave: '' }), 401, 0, { env: { ...ENV, CHAVE_PLANILHA: '' } });
await caso('segredo vazio no cofre, pedido sem chave', pedidoPlanilha({ chave: null }), 401, 0, { env: { ...ENV, CHAVE_PLANILHA: '' } });
await caso('segredo ausente no cofre', pedidoPlanilha(), 401, 0, { env: { ...ENV, CHAVE_PLANILHA: undefined } });
await caso('segredo curto demais no cofre (menos de 32), pedido com o mesmo valor', pedidoPlanilha({ chave: 'curta' }), 401, 0, { env: { ...ENV, CHAVE_PLANILHA: 'curta' } });
await caso('planilha sem chave e com método POST', pedidoPlanilha({ chave: null, metodo: 'POST' }), 401, 0);

// 6b. O caminho do Workers: crypto.subtle.timingSafeEqual (no Node não existe; aqui, um de mentira
// feito com o timingSafeEqual do próprio Node) é usado quando existe
{ const { timingSafeEqual } = await import('node:crypto');
  let usado = 0;
  Object.defineProperty(crypto.subtle, 'timingSafeEqual', { configurable: true, value: (a, b) => { usado++; return timingSafeEqual(a, b); } });
  await caso('planilha com chave certa, pelo timingSafeEqual do Workers', pedidoPlanilha(), 200, 1, { podeTerLeads: true });
  await caso('planilha com chave errada, pelo timingSafeEqual do Workers', pedidoPlanilha({ chave: CHAVE_PLANILHA.slice(0, -1) + 'X' }), 401, 0);
  delete crypto.subtle.timingSafeEqual;
  marcar(usado === 2 && typeof crypto.subtle.timingSafeEqual === 'undefined', 'timingSafeEqual usado quando existe (2 vezes) e retirado depois do teste'); }

// 7. Método e cofre
await caso('planilha com chave e método POST', pedidoPlanilha({ metodo: 'POST' }), 405, 0);
await caso('planilha com chave e cofre sem SUPABASE_CHAVE_SECRETA', pedidoPlanilha(), 503, 0, { env: { ...ENV, SUPABASE_CHAVE_SECRETA: '' } });
await caso('planilha com chave e sem SUPABASE_URL', pedidoPlanilha(), 503, 0, { env: { ...ENV, SUPABASE_URL: '' } });

// 8. Primeira vez, sem cursor: corpo certo, chave secreta, cursor seguinte da última linha
{ const { r, texto, chamadas: c } = await caso('planilha primeira vez, sem cursor', pedidoPlanilha(), 200, 1, { podeTerLeads: true });
  const ch = c[0];
  const corpoCerto = ch && JSON.stringify(ch.corpo) === JSON.stringify({ apos_gravado_em: null, apos_id_pessoa: null, quantos: 200 });
  marcar(corpoCerto && ch.funcao === 'leads_para_planilha' && ch.metodo === 'POST',
    'planilha chama leads_para_planilha por POST com {apos_gravado_em: null, apos_id_pessoa: null, quantos: 200}');
  marcar(ch && ch.cabecalhos.apikey === SECRETA && !('Authorization' in ch.cabecalhos) && !Object.values(ch.cabecalhos).some(v => String(v).includes(PUBLICAVEL)),
    'porta privada usa a chave secreta, só no apikey, e nunca a publicável');
  const corpo = JSON.parse(texto);
  marcar(corpo.leads.length === 2 && corpo.cursor_seguinte
    && corpo.cursor_seguinte.depois_de_gravado_em === '2026-11-08T12:00:00.654321Z'
    && corpo.cursor_seguinte.depois_de_id_pessoa === LEADS_FALSOS[1].id_pessoa
    && corpo.pode_ter_mais === false,
    'resposta com cursor_seguinte da última linha, microssegundos mantidos, fuso em Z, pode_ter_mais false');
  marcar(r.headers.get('Cache-Control') === 'no-store' && !r.headers.get('Access-Control-Allow-Origin'),
    'porta privada responde com Cache-Control: no-store e sem cabeçalho de CORS'); }

// 9. Cursor válido nas formas aceitas: vai ao banco exatamente como veio
async function cursorValido(nome, busca, horarioEsperado) {
  const { chamadas: c } = await caso(nome, pedidoPlanilha({ busca }), 200, 1, { podeTerLeads: true });
  const b = c[0] && c[0].corpo;
  marcar(!!b && b.apos_gravado_em === horarioEsperado && b.apos_id_pessoa === LEADS_FALSOS[0].id_pessoa && b.quantos === 200,
    nome + ': chega ao banco como ' + horarioEsperado);
}
const ID0 = LEADS_FALSOS[0].id_pessoa;
await cursorValido('cursor com o "+" codificado (%2B)', '?depois_de_gravado_em=2026-11-08T12%3A00%3A00.123456%2B00%3A00&depois_de_id_pessoa=' + ID0, '2026-11-08T12:00:00.123456+00:00');
await cursorValido('cursor com o fuso em Z', '?depois_de_gravado_em=2026-11-08T12:00:00.123456Z&depois_de_id_pessoa=' + ID0, '2026-11-08T12:00:00.123456Z');
await cursorValido('cursor sem fração de segundo', '?depois_de_gravado_em=2026-11-08T12:00:00Z&depois_de_id_pessoa=' + ID0, '2026-11-08T12:00:00Z');
{ const { chamadas: c } = await caso('limite 50', pedidoPlanilha({ busca: '?limite=50' }), 200, 1, { podeTerLeads: true });
  marcar(c[0] && c[0].corpo.quantos === 50, 'limite 50 chega ao banco como quantos 50'); }
{ const { texto } = await caso('limite 2 com 2 leads (página cheia)', pedidoPlanilha({ busca: '?limite=2' }), 200, 1, { podeTerLeads: true });
  marcar(JSON.parse(texto).pode_ter_mais === true, 'página cheia: pode_ter_mais true'); }
await caso('limite 200 (o teto)', pedidoPlanilha({ busca: '?limite=200' }), 200, 1, { podeTerLeads: true });

// 10. Cursor e limite inválidos: 400, banco não é chamado
await caso('cursor com o "+" sem codificar (vira espaço)', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-11-08T12:00:00.123456+00:00&depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('cursor com horário inválido', pedidoPlanilha({ busca: '?depois_de_gravado_em=ontem&depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('cursor com data impossível (mês 13, dia 45)', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-13-45T12:00:00Z&depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('cursor com data impossível (30 de fevereiro)', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-02-30T12:00:00.123456Z&depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('cursor com 29 de fevereiro fora de ano bissexto', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-02-29T12:00:00Z&depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('cursor com hora 24', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-11-08T24:00:00Z&depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('cursor com 29 de fevereiro em ano bissexto', pedidoPlanilha({ busca: '?depois_de_gravado_em=2028-02-29T12:00:00Z&depois_de_id_pessoa=' + ID0 }), 200, 1, { podeTerLeads: true });
await caso('cursor com id_pessoa inválido', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-11-08T12:00:00Z&depois_de_id_pessoa=nao-e-uuid' }), 400, 0);
await caso('cursor com mais de 6 casas de fração', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-11-08T12:00:00.1234567Z&depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('cursor pela metade (só o horário)', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-11-08T12:00:00Z' }), 400, 0);
await caso('cursor pela metade (só o id_pessoa)', pedidoPlanilha({ busca: '?depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('cursor repetido', pedidoPlanilha({ busca: '?depois_de_gravado_em=2026-11-08T12:00:00Z&depois_de_gravado_em=2026-11-08T12:00:01Z&depois_de_id_pessoa=' + ID0 }), 400, 0);
await caso('parâmetro desconhecido', pedidoPlanilha({ busca: '?select=*' }), 400, 0);
await caso('limite acima de 200 (201): recusado, não cortado', pedidoPlanilha({ busca: '?limite=201' }), 400, 0);
await caso('limite 1000', pedidoPlanilha({ busca: '?limite=1000' }), 400, 0);
await caso('limite 0', pedidoPlanilha({ busca: '?limite=0' }), 400, 0);
await caso('limite negativo', pedidoPlanilha({ busca: '?limite=-1' }), 400, 0);
await caso('limite com fração', pedidoPlanilha({ busca: '?limite=1.5' }), 400, 0);
await caso('limite que não é número', pedidoPlanilha({ busca: '?limite=abc' }), 400, 0);
await caso('limite vazio', pedidoPlanilha({ busca: '?limite=' }), 400, 0);

// 11. Lista vazia e banco fora
respostaDoBanco = { status: 200, corpo: [] };
{ const { texto } = await caso('lista vazia', pedidoPlanilha(), 200, 1);
  const corpo = JSON.parse(texto);
  marcar(Array.isArray(corpo.leads) && corpo.leads.length === 0 && corpo.cursor_seguinte === null && corpo.pode_ter_mais === false,
    'lista vazia: leads [], cursor_seguinte null, pode_ter_mais false'); }
respostaDoBanco = { falha: true };
await caso('planilha com banco fora do ar (simulado)', pedidoPlanilha(), 502, 1);
respostaDoBanco = { status: 401 };
await caso('planilha com banco recusando a chave (simulado)', pedidoPlanilha(), 502, 1);
respostaDoBanco = { status: 500 };
await caso('planilha com banco em erro (simulado)', pedidoPlanilha(), 502, 1);
respostaDoBanco = { status: 400, corpo: { code: '22023', message: 'detalhe interno do banco' } };
await caso('planilha com banco recusando o cursor (simulado)', pedidoPlanilha(), 400, 1);
respostaDoBanco = { status: 200, corpo: 'isto nao e json' };
await caso('planilha com resposta ilegível do banco', pedidoPlanilha(), 502, 1);
respostaDoBanco = { status: 200, corpo: { nao: 'lista' } };
await caso('planilha com resposta do banco que não é lista', pedidoPlanilha(), 502, 1);
respostaDoBanco = { status: 200, corpo: [{ ...LEADS_FALSOS[0], cursor_gravado_em: 'quebrado' }] };
await caso('planilha com cursor do banco fora do formato', pedidoPlanilha(), 502, 1);
respostaDoBanco = { status: 204 };

// ════════ Rotas e arquivos ════════

await caso('rota /api/ desconhecida', pedido({ metodo: 'GET', tipo: null, caminho: '/api/outra-coisa' }), 404, 0);
await caso('rota /api sozinha', pedido({ metodo: 'GET', tipo: null, caminho: '/api' }), 404, 0);
await caso('rota /api/fim-quiz/ com barra no fim', pedido({ corpo: copia(), caminho: '/api/fim-quiz/' }), 404, 0);
{ pedidosAosArquivos = [];
  const env = { ...ENV, ASSETS };
  for (const caminho of ['/', '/b/', '/quiz/']) {
    chamadas = [];
    const r = await garcom.fetch(new Request(ORIGEM + caminho), env);
    const texto = await r.text();
    const ok = r.status === 200 && r.headers.get('X-Robots-Tag') === 'noindex' && r.headers.get('ETag') === '"mentira"'
      && texto.includes('pagina de mentira') && chamadas.length === 0;
    if (r.headers.get('X-Robots-Tag') !== 'noindex') semNoindex.push('arquivo ' + caminho);
    marcar(ok, 'arquivo ' + caminho + ' vai para ASSETS e ganha noindex, mantendo os outros cabeçalhos (status ' + r.status + ')');
  }
  marcar(JSON.stringify(pedidosAosArquivos) === JSON.stringify(['/', '/b/', '/quiz/']), 'ASSETS recebeu só os pedidos de arquivo, nunca os de /api/'); }
{ chamadas = [];
  pedidosAosArquivos = [];
  const r = await garcom.fetch(pedido({ corpo: copia() }), { ...ENV, ASSETS });
  marcar(r.status === 201 && pedidosAosArquivos.length === 0 && chamadas.length === 1, '/api/fim-quiz com ASSETS ligado é atendido pelo garçom, antes dos arquivos'); }
await caso('arquivo sem ASSETS (teste): 404 simples', new Request(ORIGEM + '/'), 404, 0);
await caso('ASSETS com falha: 502 simples', new Request(ORIGEM + '/quiz/'), 502, 0, { env: { ...ENV, ASSETS: { fetch: async () => { throw new Error('falha de mentira'); } } } });

// ════════ Conferências gerais ════════

marcar(semNoindex.length === 0, 'X-Robots-Tag: noindex em toda resposta' + (semNoindex.length ? ' (faltou em: ' + semNoindex.join('; ') + ')' : ''));

// O registro do garçom não leva dado pessoal, cursor nem segredo
const pessoais = [PACOTE_EXEMPLO.pessoa.nome, PACOTE_EXEMPLO.pessoa.email, PACOTE_EXEMPLO.pessoa.telefone, 'TESTE', 'teste.invalid'];
for (const l of LEADS_FALSOS) pessoais.push(l.nome, l.email, l.telefone, l.id_pessoa, l.cursor_gravado_em);
const segredos = [PUBLICAVEL, SECRETA, CHAVE_PLANILHA];
const registroLimpo = registros.every(r => pessoais.every(d => !r.includes(d)) && segredos.every(s => !r.includes(s)) && !/2026-11-08T/.test(r));
marcar(registroLimpo, 'registro do garçom sem dado pessoal, sem cursor e sem segredo (' + registros.length + ' linhas)');
marcar(registros.length > 0 && registros.every(r => /^\[garcom\] [a-z0-9 :,_-]+$/.test(r)), 'registro do garçom só com códigos e contagens');

console.log = logOriginal;
for (const r of resultados) console.log(r.linha);
console.log('');
console.log('O que seria gravado no caso do exemplo (fetch falso, nada saiu da máquina):');
console.log('  endereço: ' + gravacaoExemplo.endereco.replace(ENV.SUPABASE_URL, '{SUPABASE_URL}'));
console.log('  método: ' + gravacaoExemplo.metodo + ' · cabeçalhos: ' + Object.keys(gravacaoExemplo.cabecalhos).join(', '));
console.log('  pessoa: ' + Object.keys(gravacaoExemplo.corpo.pacote.pessoa).join(', '));
console.log('  evento: ' + Object.keys(gravacaoExemplo.corpo.pacote.evento).join(', '));
const e = gravacaoExemplo.corpo.pacote.evento;
console.log('  etiquetas: ' + [e.funil, e.entrega, 'v' + e.versao_entrega, e.utm_source, e.utm_campaign].join(', ') + ' · lead score ' + e.lead_score_nota + ', faixa ' + e.lead_score_faixa);
const leitura = todasAsChamadas.find(c => c.funcao === 'leads_para_planilha');
console.log('O que seria pedido pela porta privada (fetch falso):');
console.log('  endereço: ' + leitura.endereco.replace(ENV.SUPABASE_URL, '{SUPABASE_URL}'));
console.log('  método: ' + leitura.metodo + ' · cabeçalhos: ' + Object.keys(leitura.cabecalhos).join(', ') + ' · corpo: ' + Object.keys(leitura.corpo).join(', '));
const falhas = resultados.filter(r => !r.ok).length;
console.log('');
console.log(falhas ? 'Falharam ' + falhas + ' de ' + resultados.length : 'Tudo certo: ' + resultados.length + ' de ' + resultados.length + ' conferências passaram');
process.exit(falhas ? 1 : 0);
