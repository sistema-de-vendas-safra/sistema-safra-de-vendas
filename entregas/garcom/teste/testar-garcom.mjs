// Teste local do garçom v4 · não toca nenhum serviço real
// Rodar da raiz do repositório:  node entregas/garcom/teste/testar-garcom.mjs
//
// Importa o handler de entregas/garcom/garcom.mjs e o chama nas quatro partes do Worker:
//   · porta pública POST /api/fim-quiz, com o pacote do exemplo do README do quiz-01
//     (entregas/quizzes/quiz-01/pagina/README.md, "pacote do exemplo") e casos inválidos;
//   · porta pública POST /api/evento (v4), com a visita, o início do quiz e o clique no fim do
//     quiz no formato da planta (dados/planta/planta.md v4) e casos inválidos;
//   · porta privada GET /api/planilha/leads-novos, com chave, cursor e limite;
//   · arquivos do protótipo, com um ASSETS falso.
// O fetch é falso: só registra o que seria chamado e nunca sai da máquina.
// Os valores do env são de mentira e não apontam para lugar nenhum (domínio .invalid).
// Leads de teste com nome começando por TESTE e e-mail @teste.invalid (decisão #102).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import garcom, { comCharset } from '../garcom.mjs';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..', '..', '..');

// ··· Pacote do exemplo, lido do README do quiz-01 (dados fictícios), marcado como teste (#102) ···
const readmeQuiz = readFileSync(join(raiz, 'entregas/quizzes/quiz-01/pagina/README.md'), 'utf8');
const linha = readmeQuiz.split('\n').find(l => l.trim().startsWith('pacote do exemplo:'));
const PACOTE_EXEMPLO = JSON.parse(linha.slice(linha.indexOf('{')));
// o exemplo do README já vem marcado como teste (22.9); v3 tirou a troca que o teste fazia (23.4)
if (!PACOTE_EXEMPLO.pessoa.nome.startsWith('TESTE ') || !PACOTE_EXEMPLO.pessoa.email.endsWith('@teste.invalid')) throw new Error('o exemplo do README do quiz não está marcado como teste (#102)');
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
const comCors = [];
const VAZAMENTO = /supabase|exemplo\.invalid|23503|detalhe interno|de-mentira|teste\.invalid|TESTE/i;

// Chama o Worker e confere status, número de chamadas ao banco, noindex e que a resposta não vaza nada.
// Devolve { r, texto, chamadas }.
async function caso(nome, req, esperado, chamadasEsperadas, { env = ENV, podeTerLeads = false } = {}) {
  chamadas = [];
  const r = await garcom.fetch(req, env);
  const texto = await r.text();
  const noindex = r.headers.get('X-Robots-Tag') === 'noindex';
  if (!noindex) semNoindex.push(nome);
  // v4: nenhuma resposta do garçom leva cabeçalho de CORS (22.2)
  if ([...r.headers.keys()].some(k => k.toLowerCase().startsWith('access-control-'))) comCors.push(nome);
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
// v4: o clique no fim do quiz foi ligado, mas só pela porta /api/evento; aqui continua recusado
{ const p = copia(); p.evento.tipo = 'interesse_pos_relatorio';
  await caso('clique no fim do quiz pela porta do fim do quiz (interesse_pos_relatorio; vai por /api/evento)', pedido({ corpo: p }), 422, 0); }
{ const p = copia(); p.evento.tipo = 'visita';
  await caso('visita pela porta do fim do quiz (vai por /api/evento)', pedido({ corpo: p }), 422, 0); }
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
// v4 (22.2): o pré-voo saiu. Até a v3, OPTIONS da própria origem dava 204 com
// Access-Control-Allow-Origin; agora cai na conferência de método, como qualquer outro, e dá 405.
{ const { r } = await caso('pré-voo do navegador (OPTIONS): não é mais atendido', pedido({ metodo: 'OPTIONS', tipo: null }), 405, 0);
  marcar(r.headers.get('Allow') === 'POST' && r.headers.get('Access-Control-Allow-Origin') === null && r.headers.get('Access-Control-Allow-Methods') === null,
    'OPTIONS: 405 com Allow: POST e sem nenhum cabeçalho de CORS'); }
await caso('pré-voo de outra origem (OPTIONS)', pedido({ metodo: 'OPTIONS', tipo: null, origem: 'https://outro.exemplo.invalid' }), 403, 0);
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

// ════════ Porta pública: POST /api/evento (v4) ════════
// Visita, início do quiz e clique no fim do quiz, no formato da planta v4 e de registrar_evento
// (dados/banco/migracoes/001-v3.sql). Sem pessoa e sem aceite. Sessão de teste fictícia.

const EVENTOS = {
  visita: { evento: { tipo: 'visita', funil: 'funil-01', entrega: 'landing-page-01', versao_entrega: 1,
    utm_source: 'bio', utm_campaign: 'funil-01', id_sessao: 'sessao-teste-0001', ocorrido_em: '2026-11-09T12:00:00Z' } },
  inicio_quiz: { evento: { tipo: 'inicio_quiz', funil: 'funil-01', entrega: 'quiz-01', versao_entrega: 1,
    utm_source: 'bio', utm_campaign: 'funil-01', id_sessao: 'sessao-teste-0001', ocorrido_em: '2026-11-09T12:01:00.123Z' } },
  interesse_pos_relatorio: { evento: { tipo: 'interesse_pos_relatorio', funil: 'funil-01', entrega: 'quiz-01', versao_entrega: 1,
    utm_source: 'bio', utm_campaign: 'funil-01', id_sessao: 'sessao-teste-0001', ocorrido_em: '2026-11-09T12:09:00-03:00',
    clique_fim_quiz: 'quero-conversa' } }
};
const evento = tipo => structuredClone(EVENTOS[tipo]);
const pedidoEvento = (o = {}) => pedido({ caminho: '/api/evento', ...o });
let gravacaoEvento = null;

for (const tipo of Object.keys(EVENTOS)) {
  // 12. Aceito: uma chamada a registrar_evento, com a chave publicável e o pacote como veio
  { const { chamadas: c } = await caso(tipo + ': aceito, sem pessoa e sem aceite', pedidoEvento({ corpo: evento(tipo) }), 201, 1);
    const ch = c[0];
    marcar(!!ch && ch.funcao === 'registrar_evento' && ch.metodo === 'POST' && ch.cabecalhos.apikey === PUBLICAVEL && !('Authorization' in ch.cabecalhos)
      && JSON.stringify(ch.corpo) === JSON.stringify({ pacote: EVENTOS[tipo] }),
      tipo + ': chama registrar_evento com a chave publicável, só no apikey, e o pacote exatamente como veio');
    if (tipo === 'visita') gravacaoEvento = ch; }

  // 13. Portaria: origem, método, tamanho, formato
  await caso(tipo + ': outra origem', pedidoEvento({ origem: 'https://outro.exemplo.invalid', corpo: evento(tipo) }), 403, 0);
  await caso(tipo + ': sem origem', pedidoEvento({ origem: null, corpo: evento(tipo) }), 403, 0);
  await caso(tipo + ': método GET', pedidoEvento({ metodo: 'GET', tipo: null }), 405, 0);
  await caso(tipo + ': método PUT com o pacote', pedidoEvento({ metodo: 'PUT', corpo: evento(tipo) }), 405, 0);
  { const p = evento(tipo); p.evento.id_sessao = 'sessao-' + 'x'.repeat(3000);
    await caso(tipo + ': pacote grande demais (mais de 2 KB)', pedidoEvento({ corpo: p }), 413, 0); }
  await caso(tipo + ': corpo que não é JSON declarado', pedidoEvento({ corpo: JSON.stringify(evento(tipo)), tipo: 'text/plain' }), 415, 0);
  await caso(tipo + ': JSON quebrado', pedidoEvento({ corpo: '{"evento":' }), 400, 0);
  await caso(tipo + ': pacote que é lista', pedidoEvento({ corpo: [evento(tipo)] }), 422, 0);
  { const p = evento(tipo); p.outra = 1;
    await caso(tipo + ': pacote com outra chave além de evento', pedidoEvento({ corpo: p }), 422, 0); }
  { const p = evento(tipo); p.evento.extra = 'x';
    await caso(tipo + ': campo que a planta não tem (extra)', pedidoEvento({ corpo: p }), 422, 0); }

  // 14. Dado de pessoa no pacote: recusado, nada gravado, e o registro diz por quê (sem o dado)
  const antesPessoa = registros.length;
  { const p = evento(tipo); p.pessoa = { nome: 'TESTE Ana', email: 'ana@teste.invalid', telefone: '+55 (00) 90000-0001' };
    await caso(tipo + ': pacote com pessoa', pedidoEvento({ corpo: p }), 422, 0); }
  { const p = evento(tipo); p.evento.email = 'ana@teste.invalid';
    await caso(tipo + ': e-mail dentro do evento', pedidoEvento({ corpo: p }), 422, 0); }
  { const p = evento(tipo); p.evento.respostas = { faturamento: 'x' };
    await caso(tipo + ': respostas do quiz dentro do evento', pedidoEvento({ corpo: p }), 422, 0); }
  marcar(registros.slice(antesPessoa).filter(r => r === '[garcom] evento: recusado: dado-de-pessoa').length === 3,
    tipo + ': os três pacotes com dado de pessoa recusados pelo motivo dado-de-pessoa');


  // 15. Etiqueta ausente: cada uma das cinco, recusado
  const antesEtiqueta = registros.length;
  for (const etiqueta of ['funil', 'entrega', 'versao_entrega', 'utm_source', 'utm_campaign']) {
    const p = evento(tipo); delete p.evento[etiqueta];
    await caso(tipo + ': etiqueta ausente (' + etiqueta + ')', pedidoEvento({ corpo: p }), 422, 0);
  }
  marcar(registros.slice(antesEtiqueta).filter(r => r === '[garcom] evento: recusado: etiqueta-faltando').length === 5,
    tipo + ': as cinco etiquetas ausentes recusadas pelo motivo etiqueta-faltando (a chave tem de vir, mesmo vazia; 10.8)');

  // 16. Etiqueta presente e vazia conta como etiqueta (10.8): entra, com a origem vazia
  { const p = evento(tipo); p.evento.utm_source = ''; p.evento.utm_campaign = '';
    const { chamadas: c } = await caso(tipo + ': etiquetas utm presentes e vazias', pedidoEvento({ corpo: p }), 201, 1);
    const e = c[0] && c[0].corpo.pacote.evento;
    marcar(!!e && e.utm_source === '' && e.utm_campaign === '', tipo + ': utm vazias gravadas vazias (10.8)'); }

  // 17. Utm fora da lista: grava vazia e anota só o nome do campo (5.5)
  { const p = evento(tipo); p.evento.utm_source = 'tiktok';
    const antes = registros.length;
    const { chamadas: c } = await caso(tipo + ': utm_source fora da lista (tiktok)', pedidoEvento({ corpo: p }), 201, 1);
    const anotado = registros.slice(antes).some(r => r.includes('evento: utm-fora-da-lista') && r.includes('utm_source'));
    marcar(!!c[0] && c[0].corpo.pacote.evento.utm_source === '' && anotado, tipo + ': utm_source fora da lista gravada vazia e anotada no registro'); }
}

// 18. Tipo fora da lista desta porta
for (const t of ['fim_quiz', 'contato_sdr', 'venda', 'qualquer', '']) {
  const p = evento('visita'); p.evento.tipo = t;
  await caso('evento com tipo fora desta porta (' + (t || 'vazio') + ')', pedidoEvento({ corpo: p }), 422, 0);
}
{ const p = evento('visita'); delete p.evento.tipo;
  await caso('evento sem tipo', pedidoEvento({ corpo: p }), 422, 0); }
// o pacote inteiro do fim do quiz, mandado para /api/evento: recusado (tem pessoa)
await caso('pacote do fim do quiz mandado para /api/evento', pedidoEvento({ corpo: copia() }), 422, 0);

// 19. Sessão, data e etiquetas fora do formato
{ const p = evento('visita'); delete p.evento.id_sessao;
  await caso('evento sem sessão', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('visita'); p.evento.id_sessao = 'abc';
  await caso('evento com sessão fora do formato', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('visita'); p.evento.ocorrido_em = 'ontem';
  await caso('evento com data inválida', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('visita'); delete p.evento.ocorrido_em;
  await caso('evento sem data', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('visita'); p.evento.funil = 'funil-99';
  await caso('evento com funil fora da lista', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('visita'); p.evento.versao_entrega = '1';
  await caso('evento com versao_entrega em texto', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('visita'); p.evento.utm_source = null;
  await caso('evento com utm_source nula (não é texto)', pedidoEvento({ corpo: p }), 422, 0); }

// 20. O clique no fim do quiz: valor da lista proposta (31.15), só no tipo dele
for (const v of ['quero-conversa', 'chamar-whatsapp', 'tenho-interesse', 'agora-nao']) {
  const p = evento('interesse_pos_relatorio'); p.evento.clique_fim_quiz = v;
  await caso('clique no fim do quiz com o valor ' + v, pedidoEvento({ corpo: p }), 201, 1);
}
{ const p = evento('interesse_pos_relatorio'); delete p.evento.clique_fim_quiz;
  await caso('clique no fim do quiz sem dizer o que foi clicado', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('interesse_pos_relatorio'); p.evento.clique_fim_quiz = 'outro-botao';
  await caso('clique no fim do quiz com valor fora da lista', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('visita'); p.evento.clique_fim_quiz = 'quero-conversa';
  await caso('visita com clique_fim_quiz', pedidoEvento({ corpo: p }), 422, 0); }
{ const p = evento('inicio_quiz'); p.evento.clique_fim_quiz = 'quero-conversa';
  await caso('início do quiz com clique_fim_quiz', pedidoEvento({ corpo: p }), 422, 0); }

// 21. Mais portaria: tamanho sem Content-Length, OPTIONS, rota com barra
{ let partesLidas = 0;
  const parte = new TextEncoder().encode('x'.repeat(1024));
  const fluxo = new ReadableStream({ pull(c) { partesLidas++; if (partesLidas > 100) c.close(); else c.enqueue(parte); } });
  const req = new Request(ORIGEM + '/api/evento', { method: 'POST', headers: { Origin: ORIGEM, 'Content-Type': 'application/json' }, body: fluxo, duplex: 'half' });
  await caso('evento: corpo grande sem Content-Length (em partes)', req, 413, 0);
  marcar(partesLidas <= 4, 'evento: a leitura parou logo depois de 2 KB (' + partesLidas + ' partes de 1 KB lidas, de 100)'); }
{ const p = evento('visita'); p.evento.id_sessao = 'sessao-' + 'a'.repeat(60);
  const tamanho = new TextEncoder().encode(JSON.stringify(p)).length;
  await caso('evento de ' + tamanho + ' bytes, abaixo de 2 KB, com sessão no tamanho máximo', pedidoEvento({ corpo: p }), 201, 1); }
{ const { r } = await caso('evento: pré-voo (OPTIONS) não é atendido', pedidoEvento({ metodo: 'OPTIONS', tipo: null }), 405, 0);
  marcar(r.headers.get('Allow') === 'POST', 'evento: OPTIONS dá 405 com Allow: POST'); }
await caso('rota /api/evento/ com barra no fim', pedidoEvento({ corpo: evento('visita'), caminho: '/api/evento/' }), 404, 0);

// 22. Banco: recusa e falha não vazam detalhe
respostaDoBanco = { status: 400, corpo: { code: '22023', message: 'clique sem fim do quiz de uma pessoa nesta sessao' } };
await caso('clique recusado pelo banco (sessão sem fim do quiz, simulado; 32.2)', pedidoEvento({ corpo: evento('interesse_pos_relatorio') }), 422, 1);
respostaDoBanco = { status: 409 };
await caso('visita recusada pelo banco (entrega fora do catálogo, simulado; 32.4)', pedidoEvento({ corpo: evento('visita') }), 422, 1);
respostaDoBanco = { status: 401 };
await caso('evento: banco recusa a chave (simulado)', pedidoEvento({ corpo: evento('visita') }), 502, 1);
respostaDoBanco = { status: 404 };
await caso('evento: função registrar_evento ainda não existe no banco (migração não rodou, simulado)', pedidoEvento({ corpo: evento('visita') }), 502, 1);
respostaDoBanco = { falha: true };
await caso('evento: banco fora do ar (simulado)', pedidoEvento({ corpo: evento('visita') }), 502, 1);
respostaDoBanco = { status: 204 };
await caso('evento: cofre sem a publicável e com a secreta: não usa a secreta', pedidoEvento({ corpo: evento('visita') }), 503, 0, { env: { ...ENV, SUPABASE_CHAVE_PUBLICAVEL: '' } });
await caso('evento: sem ORIGEM_PERMITIDA', pedidoEvento({ corpo: evento('visita') }), 503, 0, { env: { ...ENV, ORIGEM_PERMITIDA: '' } });
await caso('evento: sem SUPABASE_URL', pedidoEvento({ corpo: evento('visita') }), 503, 0, { env: { ...ENV, SUPABASE_URL: '' } });

// 23. As duas portas públicas só chamam a sua função, e só com a publicável
{ const eventos = todasAsChamadas.filter(c => c.funcao === 'registrar_evento');
  const fins = todasAsChamadas.filter(c => c.funcao === 'registrar_fim_quiz');
  marcar(eventos.length > 0 && eventos.every(c => 'pacote' in c.corpo && !('pessoa' in c.corpo.pacote) && c.corpo.pacote.evento.tipo !== 'fim_quiz'),
    '/api/evento só chamou registrar_evento, nunca com pessoa nem com fim_quiz (' + eventos.length + ' gravações)');
  marcar(fins.every(c => c.corpo.pacote.evento.tipo === 'fim_quiz'), '/api/fim-quiz só chamou registrar_fim_quiz com fim_quiz (' + fins.length + ' gravações)'); }

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
// novo na v3: charset nos arquivos de texto (pedido 09). Na Cloudflare, o HTML chega sem charset.
{ const ACENTOS = '<title>nome público da Análise</title><p>está, diagnóstico</p>';
  const assetsCom = (tipo) => ({ async fetch() {
    const h = tipo === null ? {} : { 'Content-Type': tipo };
    const r = new Response(new TextEncoder().encode(ACENTOS), { status: 200, headers: h });
    if (tipo === null) r.headers.delete('Content-Type');
    return r;
  } });
  const casos = [
    ['text/html', 'text/html; charset=utf-8'],
    ['text/css', 'text/css; charset=utf-8'],
    ['application/javascript', 'application/javascript; charset=utf-8'],
    ['text/javascript', 'text/javascript; charset=utf-8'],
    ['TEXT/HTML', 'TEXT/HTML; charset=utf-8'],
    ['text/html; charset=utf-8', 'text/html; charset=utf-8'],
    ['text/html;charset=UTF-8', 'text/html;charset=UTF-8'],
    ['text/html; charset=iso-8859-1', 'text/html; charset=iso-8859-1'],
    ['image/jpeg', 'image/jpeg'],
    ['application/json', 'application/json']
  ];
  for (const [veio, esperado] of casos) {
    const r = await garcom.fetch(new Request(ORIGEM + '/quiz/'), { ...ENV, ASSETS: assetsCom(veio) });
    const bytes = new Uint8Array(await r.arrayBuffer());
    const corpoIgual = new TextDecoder('utf-8').decode(bytes) === ACENTOS;
    if (r.headers.get('X-Robots-Tag') !== 'noindex') semNoindex.push('charset ' + veio);
    marcar(r.status === 200 && r.headers.get('Content-Type') === esperado && corpoIgual,
      'arquivo com Content-Type "' + veio + '" sai como "' + r.headers.get('Content-Type') + '", corpo com acentos intacto');
  }
  const r = await garcom.fetch(new Request(ORIGEM + '/quiz/'), { ...ENV, ASSETS: assetsCom(null) });
  marcar(r.status === 200 && r.headers.get('Content-Type') === null, 'arquivo sem Content-Type continua sem (o garçom não inventa tipo)');
  marcar(comCharset('text/html;') === 'text/html; charset=utf-8' && comCharset('text/css ') === 'text/css; charset=utf-8' && comCharset('') === '' && comCharset(null) === null,
    'comCharset: ";" ou espaço no fim, vazio e nulo');
}
await caso('arquivo sem ASSETS (teste): 404 simples', new Request(ORIGEM + '/'), 404, 0);
await caso('ASSETS com falha: 502 simples', new Request(ORIGEM + '/quiz/'), 502, 0, { env: { ...ENV, ASSETS: { fetch: async () => { throw new Error('falha de mentira'); } } } });

// ════════ Conferências gerais ════════

marcar(semNoindex.length === 0, 'X-Robots-Tag: noindex em toda resposta' + (semNoindex.length ? ' (faltou em: ' + semNoindex.join('; ') + ')' : ''));
marcar(comCors.length === 0, 'nenhuma resposta com cabeçalho de CORS (v4; 22.2)' + (comCors.length ? ' (veio em: ' + comCors.join('; ') + ')' : ''));
{ const publicas = todasAsChamadas.filter(c => c.funcao === 'registrar_fim_quiz' || c.funcao === 'registrar_evento');
  const usouSecreta = publicas.some(c => Object.values(c.cabecalhos).some(v => String(v).includes(SECRETA)));
  const soAsTres = todasAsChamadas.every(c => ['registrar_fim_quiz', 'registrar_evento', 'leads_para_planilha'].includes(c.funcao));
  marcar(publicas.length > 0 && !usouSecreta && soAsTres, 'as duas portas públicas nunca usaram a chave secreta, e o garçom só chamou as três funções (' + todasAsChamadas.length + ' chamadas)'); }

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
console.log('O que seria gravado na visita (fetch falso):');
console.log('  endereço: ' + gravacaoEvento.endereco.replace(ENV.SUPABASE_URL, '{SUPABASE_URL}'));
console.log('  método: ' + gravacaoEvento.metodo + ' · cabeçalhos: ' + Object.keys(gravacaoEvento.cabecalhos).join(', '));
console.log('  pacote: ' + Object.keys(gravacaoEvento.corpo.pacote).join(', ') + ' · evento: ' + Object.keys(gravacaoEvento.corpo.pacote.evento).join(', '));
const leitura = todasAsChamadas.find(c => c.funcao === 'leads_para_planilha');
console.log('O que seria pedido pela porta privada (fetch falso):');
console.log('  endereço: ' + leitura.endereco.replace(ENV.SUPABASE_URL, '{SUPABASE_URL}'));
console.log('  método: ' + leitura.metodo + ' · cabeçalhos: ' + Object.keys(leitura.cabecalhos).join(', ') + ' · corpo: ' + Object.keys(leitura.corpo).join(', '));
const falhas = resultados.filter(r => !r.ok).length;
console.log('');
console.log(falhas ? 'Falharam ' + falhas + ' de ' + resultados.length : 'Tudo certo: ' + resultados.length + ' de ' + resultados.length + ' conferências passaram');
process.exit(falhas ? 1 : 0);
