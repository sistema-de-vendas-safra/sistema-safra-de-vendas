// Teste local do garçom · não toca nenhum serviço real
// Rodar da raiz do repositório:  node entregas/garcom/teste/testar-garcom.mjs
//
// Importa o handler de entregas/garcom/garcom.mjs e o chama com o pacote do exemplo do
// README do quiz-01 (entregas/quizzes/quiz-01/pagina/README.md, "pacote do exemplo") e com
// casos inválidos. O fetch é falso: só registra o que seria gravado e nunca sai da máquina.
// Os valores do env são de mentira e não apontam para lugar nenhum (domínio .invalid).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import garcom from '../garcom.mjs';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..', '..', '..');

// ··· Pacote do exemplo, lido do README do quiz-01 (dados fictícios) ···
const readmeQuiz = readFileSync(join(raiz, 'entregas/quizzes/quiz-01/pagina/README.md'), 'utf8');
const linha = readmeQuiz.split('\n').find(l => l.trim().startsWith('pacote do exemplo:'));
const PACOTE_EXEMPLO = JSON.parse(linha.slice(linha.indexOf('{')));
const copia = () => structuredClone(PACOTE_EXEMPLO);

// ··· Ambiente de mentira ···
const ORIGEM = 'https://quiz.exemplo.invalid';
const ENV = {
  SUPABASE_URL: 'https://banco.exemplo.invalid',
  SUPABASE_SERVICE_KEY: 'valor-de-mentira-para-teste',
  ORIGEM_PERMITIDA: ORIGEM
};

// ··· Fetch falso: registra e responde como o banco responderia ···
let gravados = [];
let respostaDoBanco = { status: 204 };
globalThis.fetch = async (endereco, opcoes) => {
  if (!String(endereco).startsWith(ENV.SUPABASE_URL)) throw new Error('teste tentou sair para fora: ' + endereco);
  gravados.push({ endereco: String(endereco), metodo: opcoes.method, cabecalhos: Object.keys(opcoes.headers), corpo: JSON.parse(opcoes.body) });
  if (respostaDoBanco.falha) throw new Error('banco fora do ar (simulado)');
  return new Response(respostaDoBanco.status === 204 ? null : '{"code":"23503","message":"detalhe interno do banco"}', { status: respostaDoBanco.status });
};

// Silencia o registro do garçom no console, mas guarda para conferir que não leva dado pessoal
const registros = [];
const logOriginal = console.log;
console.log = (...a) => registros.push(a.join(' '));

function pedido({ metodo = 'POST', origem = ORIGEM, corpo, tipo = 'application/json' } = {}) {
  const cabecalhos = {};
  if (origem) cabecalhos.Origin = origem;
  if (tipo) cabecalhos['Content-Type'] = tipo;
  const init = { method: metodo, headers: cabecalhos };
  if (corpo !== undefined) init.body = typeof corpo === 'string' ? corpo : JSON.stringify(corpo);
  return new Request('https://garcom.exemplo.invalid/', init);
}

const resultados = [];
async function caso(nome, req, esperado, gravacoesEsperadas, env = ENV) {
  gravados = [];
  const r = await garcom.fetch(req, env);
  const texto = await r.text();
  const vazou = /supabase|exemplo\.invalid|23503|detalhe interno|valor-de-mentira/i.test(texto);
  const ok = r.status === esperado && gravados.length === gravacoesEsperadas && !vazou;
  resultados.push({ ok, linha: (ok ? 'OK    ' : 'FALHOU') + ' · ' + nome + ' (status ' + r.status + ', gravações ' + gravados.length + (texto ? ', resposta ' + texto : '') + ')' });
  return gravados;
}

// 1. Pacote do exemplo: aceito e gravado uma vez
const g = await caso('pacote do exemplo do quiz-01', pedido({ corpo: copia() }), 201, 1);
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

// 2b. Utm fora da lista: o pacote entra e a utm é gravada vazia (planta, 5.5; 18.7)
async function utmVazia(nome, mexer, parte, campo) {
  const p = copia(); mexer(p);
  const antes = registros.length;
  const g = await caso(nome, pedido({ corpo: p }), 201, 1);
  const gravado = g[0] && g[0].corpo.pacote[parte][campo];
  const anotado = registros.slice(antes).some(r => r.includes('utm-fora-da-lista') && r.includes(campo));
  const ok = gravado === '' && anotado;
  resultados.push({ ok, linha: (ok ? 'OK    ' : 'FALHOU') + ' · ' + nome + ': gravada vazia e anotada no registro do garçom' });
}
await utmVazia('utm_source fora da lista (tiktok)', p => { p.evento.utm_source = 'tiktok'; }, 'evento', 'utm_source');
await utmVazia('utm_source reservada fora do MVP (meta-ads)', p => { p.evento.utm_source = 'meta-ads'; }, 'evento', 'utm_source');
await utmVazia('primeira_utm_campaign fora da lista', p => { p.pessoa.primeira_utm_campaign = 'outra-campanha'; }, 'pessoa', 'primeira_utm_campaign');

// 3. Portaria: método, origem, tipo do corpo, tamanho, JSON
await caso('método GET', pedido({ metodo: 'GET', tipo: null }), 405, 0);
await caso('outra origem', pedido({ origem: 'https://outro.exemplo.invalid', corpo: copia() }), 403, 0);
await caso('sem origem', pedido({ origem: null, corpo: copia() }), 403, 0);
await caso('pré-voo do navegador (OPTIONS)', pedido({ metodo: 'OPTIONS', tipo: null }), 204, 0);
await caso('corpo que não é JSON declarado', pedido({ corpo: 'a=1', tipo: 'text/plain' }), 415, 0);
await caso('JSON quebrado', pedido({ corpo: '{"pessoa":' }), 400, 0);
{ const p = copia(); p.evento.respostas.extra = 'x'.repeat(20000);
  await caso('pacote grande demais', pedido({ corpo: p }), 413, 0); }

// 4. Banco: recusa e falha não vazam detalhe
respostaDoBanco = { status: 409 };
await caso('banco recusa (entrega fora do catálogo, simulado)', pedido({ corpo: copia() }), 422, 1);
respostaDoBanco = { status: 401 };
await caso('banco recusa a chave (simulado)', pedido({ corpo: copia() }), 502, 1);
respostaDoBanco = { falha: true };
await caso('banco fora do ar (simulado)', pedido({ corpo: copia() }), 502, 1);
respostaDoBanco = { status: 204 };
await caso('cofre vazio (sem SUPABASE_SERVICE_KEY)', pedido({ corpo: copia() }), 503, 0, { ...ENV, SUPABASE_SERVICE_KEY: '' });

// 5. O registro do garçom não leva dado pessoal
const pessoais = [PACOTE_EXEMPLO.pessoa.nome, PACOTE_EXEMPLO.pessoa.email, PACOTE_EXEMPLO.pessoa.telefone];
const registroLimpo = registros.every(r => pessoais.every(d => !r.includes(d)));
resultados.push({ ok: registroLimpo, linha: (registroLimpo ? 'OK    ' : 'FALHOU') + ' · registro do garçom sem dado pessoal (' + registros.length + ' linhas)' });

console.log = logOriginal;
for (const r of resultados) console.log(r.linha);
console.log('');
console.log('O que seria gravado no caso do exemplo (fetch falso, nada saiu da máquina):');
console.log('  endereço: ' + gravacaoExemplo.endereco.replace(ENV.SUPABASE_URL, '{SUPABASE_URL}'));
console.log('  método: ' + gravacaoExemplo.metodo + ' · cabeçalhos: ' + gravacaoExemplo.cabecalhos.join(', '));
console.log('  pessoa: ' + Object.keys(gravacaoExemplo.corpo.pacote.pessoa).join(', '));
console.log('  evento: ' + Object.keys(gravacaoExemplo.corpo.pacote.evento).join(', '));
const e = gravacaoExemplo.corpo.pacote.evento;
console.log('  etiquetas: ' + [e.funil, e.entrega, 'v' + e.versao_entrega, e.utm_source, e.utm_campaign].join(', ') + ' · lead score ' + e.lead_score_nota + ', faixa ' + e.lead_score_faixa);
const falhas = resultados.filter(r => !r.ok).length;
console.log('');
console.log(falhas ? 'Falharam ' + falhas + ' de ' + resultados.length : 'Tudo certo: ' + resultados.length + ' de ' + resultados.length + ' conferências passaram');
process.exit(falhas ? 1 : 0);
