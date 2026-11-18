// Teste local de Codigo.gs (planilha do SDR do funil-01), sem Google e sem rede.
// Parte de entregas/planilha-sdr-funil-01/ (id planilha-sdr-funil-01, v4, rascunho; ver README.md).
// v4 (#121): a aba respostas ganha onze colunas no fim, com a origem e os ids do lead (migração 003).
// v3: os casos da aba respostas (a segunda aba, com as respostas completas do quiz) estão no fim,
// em "aba respostas". Os casos de antes continuam; só o de "instalar duas vezes" passou a contar
// as duas abas.
//
//   node entregas/planilha-sdr-funil-01/teste/testar-planilha.mjs
//
// Só leads de mentira (#102: nome começando por TESTE, e-mail @teste.invalid), endereço do garçom
// em .invalid e chave de mentira montada em tempo de execução. A única conexão de verdade é a do
// último caso, com um servidorzinho em 127.0.0.1 que só existe durante o teste.

import { Worker } from 'node:worker_threads';
import { criarFalsos, carregarCodigo, garcomFalso, criarUrlFetchSincrono } from './falsos.mjs';

const URL_GARCOM = 'https://garcom.teste.invalid';
const CHAVE = ['mentira', 'planilha', '0123456789abcdef'.repeat(3)].join('-');     // 66 caracteres, de mentira
const CHAVE_ERRADA = ['mentira', 'errada', 'fedcba9876543210'.repeat(3)].join('-');

const COLUNAS = ['id_pessoa', 'nome', 'telefone', 'email', 'empresa', 'consentimento_whatsapp', 'consentimento_email',
  'lead_score_faixa', 'lead_score_nota', 'respostas_a_confirmar', 'entrou_em', 'tentativas_feitas', 'clique_fim_quiz',
  'estagio', 'estado', 'data_volta', 'canal', 'contato_em', 'reuniao_em', 'produto'];
const COL = Object.fromEntries(COLUNAS.map((c, i) => [c, i + 1]));
const COLUNAS_RESPOSTAS = ['id_pessoa', 'nome', 'entrou_em', 'lead_score_faixa', 'lead_score_nota',
  'ramo', 'faturamento', 'vendedores', 'quem marca a conversa', 'valor médio da venda',
  'origem dos leads', 'CRM', 'cargo', 'lembra dos números',
  'leads por mês', 'pré-qualificados', 'agendados', 'conversas realizadas', 'vendas fechadas',
  'chute de comparecimento', 'causa · primeiro contato', 'causa · tentativas', 'causa · lead sem contato',
  'outras respostas',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'fbp', 'fbc', 'id_lead', 'id_qualificado', 'qualificado'];
const CR = Object.fromEntries(COLUNAS_RESPOSTAS.map((c, i) => [c, i + 1]));

// Respostas no formato de respostasDoQuiz() da página (entregas/quizzes/quiz-01/pagina/index.html), de mentira
const RESP_NUMEROS = {
  ramo: 'Serviços para empresas', faturamento: 'R$ 150 mil a R$ 500 mil', vendedores: '2 ou 3',
  'quem-marca': 'Sim. O vendedor faz tudo', 'valor-medio': 'R$ 15.000',
  origem: ['Anúncios pagos (Meta, Google)', 'Indicação de clientes'], crm: 'Sim, mas pouca gente atualiza',
  cargo: 'Dono(a) ou sócio(a)', lembra: 'Sim',
  numeros: [
    { linha: 'Leads por mês', valor: '1.200', unidade: 'nº' },
    { linha: 'Pré-qualificados', valor: '50', unidade: '%' },
    { linha: 'Agendados', valor: '300', unidade: 'nº' },
    { linha: 'Conversas realizadas', valor: '12,5', unidade: '%' },
    { linha: 'Vendas fechadas', valor: '40', unidade: 'nº' }
  ],
  causa: 'No mesmo dia', causa2: 'Depende do vendedor', causa3: 'Alguns'
};
const RESP_CHUTE = {
  ramo: 'Outro', faturamento: 'R$ 500 mil a R$ 1,5 milhão', vendedores: '1', 'quem-marca': 'Depende do vendedor',
  'valor-medio': 'R$ 8.000', origem: ['Prospecção ativa'], crm: 'Usamos planilha', cargo: 'Gestor(a) de vendas',
  lembra: 'Não', chute: 'Menos de 75%', causa: 'Em até 10 minutos', causa2: '6 ou mais, com roteiro definido', causa3: 'Não'
};

// ··· leads de mentira ···
function horario(n) {
  // um por segundo a partir de 08/11/2026 12:00:00 UTC (09:00 em Brasília), com microssegundos
  const d = new Date(Date.UTC(2026, 10, 8, 12, 0, 0) + n * 1000);
  return d.toISOString().replace(/\.\d{3}Z$/, '.123456+00:00');
}
function lead(n, extra = {}) {
  const faixa = n % 2 ? 'a' : 'b';
  const g = horario(n);
  return {
    id_pessoa: '00000000-0000-4000-8000-' + String(n).padStart(12, '0'),
    nome: 'TESTE Pessoa ' + n,
    telefone: '+55 00 00000-' + String(n).padStart(4, '0'),
    email: 'pessoa' + n + '@teste.invalid',
    empresa: 'TESTE Empresa ' + n,
    consentimento_whatsapp: 'sim',
    consentimento_email: n % 3 ? 'sim' : 'nao',
    lead_score_faixa: faixa,
    lead_score_nota: faixa === 'a' ? 96 : 55,
    respostas_a_confirmar: faixa === 'b' ? { 'valor-medio': 'de-10-a-50-mil', vendedores: '2-a-5' } : null,
    entrou_em: g,
    tentativas_feitas: 0,
    clique_fim_quiz: n === 2 ? 'quero-conversa' : null,
    estagio: null,
    estado: null,
    data_volta: null,
    cursor_gravado_em: g,
    ...extra
  };
}
const leads = (de, ate) => Array.from({ length: ate - de + 1 }, (_, i) => lead(de + i));

// ··· montagem ···
function montar({ propriedades = { GARCOM_URL: URL_GARCOM, CHAVE_PLANILHA: CHAVE }, base = leads(1, 3), instalar = true } = {}) {
  const garcom = garcomFalso({ chave: CHAVE, leads: base });
  const falsos = criarFalsos({ propriedades, urlFetch: garcom.atender });
  const gs = carregarCodigo(falsos);
  if (instalar) gs.instalar();
  const aba = () => falsos.estado.abas.find(a => a.nome === 'fila');
  return { garcom, falsos, gs, aba, estado: falsos.estado };
}
function trocarBase(m, base) {
  m.garcom = garcomFalso({ chave: CHAVE, leads: base });
  m.falsos.trocarUrlFetch(m.garcom.atender);
}

// ··· conferências ···
const resultados = [];
const todosOsRegistros = [];
const todosOsErros = [];
async function caso(nome, fn) {
  try {
    const detalhe = await fn();
    resultados.push({ ok: true, nome, detalhe });
  } catch (e) {
    resultados.push({ ok: false, nome, detalhe: e.message });
  }
}
function igual(a, b, oque) {
  const ja = JSON.stringify(a), jb = JSON.stringify(b);
  if (ja !== jb) throw new Error((oque || 'valor') + ': esperado ' + jb + ', veio ' + ja);
}
function certo(cond, oque) { if (!cond) throw new Error(oque); }
function erroDe(fn) {
  try { fn(); } catch (e) { todosOsErros.push(e.message); return e.message; }
  throw new Error('esperava erro, não veio');
}
function guardarRegistros(m) { todosOsRegistros.push(...m.estado.registros); }
function linhasDeDados(aba) { return aba.getLastRow() - 1; }
function cursorSalvo(m) { return [m.estado.propriedades.CURSOR_GRAVADO_EM || null, m.estado.propriedades.CURSOR_ID_PESSOA || null]; }

// ························· instalação ·························
await caso('instalar sem propriedades: cria a aba, não cria gatilho e avisa em português', () => {
  const m = montar({ propriedades: {}, instalar: false });
  const msg = erroDe(() => m.gs.instalar());
  certo(/GARCOM_URL/.test(msg) && /CHAVE_PLANILHA/.test(msg) && /gatilho não foi criado/.test(msg), 'mensagem: ' + msg);
  certo(m.aba(), 'aba não criada');
  igual(m.aba().linha(1, 20), COLUNAS, 'cabeçalho');
  igual(m.estado.gatilhos.length, 0, 'gatilhos');
  guardarRegistros(m);
  return 'gatilhos 0; mensagem com os nomes das propriedades';
});

await caso('instalar com só uma propriedade: também não cria gatilho', () => {
  const m = montar({ propriedades: { GARCOM_URL: URL_GARCOM }, instalar: false });
  erroDe(() => m.gs.instalar());
  igual(m.estado.gatilhos.length, 0, 'gatilhos');
  guardarRegistros(m);
  return 'gatilhos 0';
});

await caso('instalar com GARCOM_URL sem https: recusa e não cria gatilho', () => {
  const m = montar({ propriedades: { GARCOM_URL: 'http://garcom.teste.invalid', CHAVE_PLANILHA: CHAVE }, instalar: false });
  const msg = erroDe(() => m.gs.instalar());
  certo(/https:\/\//.test(msg), msg);
  igual(m.estado.gatilhos.length, 0, 'gatilhos');
  guardarRegistros(m);
  return 'gatilhos 0';
});

await caso('instalar com CHAVE_PLANILHA curta (menos de 32): recusa e não cria gatilho', () => {
  const m = montar({ propriedades: { GARCOM_URL: URL_GARCOM, CHAVE_PLANILHA: 'curta' }, instalar: false });
  const msg = erroDe(() => m.gs.instalar());
  certo(/32 caracteres/.test(msg), msg);
  igual(m.estado.gatilhos.length, 0, 'gatilhos');
  guardarRegistros(m);
  return 'gatilhos 0';
});

await caso('instalar: aba "fila", 20 cabeçalhos na ordem de planilha-sdr.md, primeira linha congelada', () => {
  const m = montar();
  const aba = m.aba();
  igual(aba.linha(1, 20), COLUNAS, 'cabeçalho');
  igual(aba.getFrozenRows(), 1, 'linhas congeladas');
  igual(linhasDeDados(aba), 0, 'linhas de dados');
  guardarRegistros(m);
  return '20 colunas, congelada 1';
});

await caso('instalar: lista fechada em estagio, estado e canal, com os valores exatos e sem aceitar valor de fora', () => {
  const m = montar();
  const aba = m.aba();
  const esperado = {
    estagio: ['captado', 'pré-qualificado', 'agendado', 'realizado', 'venda'],
    estado: ['conversando', 'tentativa', 'abandonado', 'stand-by', 'perdido'],
    canal: ['telefone', 'whatsapp']
  };
  for (const [coluna, valores] of Object.entries(esperado)) {
    const v = aba.validacaoDaColuna(COL[coluna]);
    igual(v.length, 1, 'validações em ' + coluna);
    igual(v[0].regra.valores, valores, 'valores de ' + coluna);
    igual(v[0].regra.permiteInvalido, false, 'aceita inválido em ' + coluna);
    igual(v[0].regra.lista, true, 'lista suspensa em ' + coluna);
    igual([v[0].linha, v[0].linhas], [2, aba.getMaxRows() - 1], 'linhas cobertas em ' + coluna);
  }
  for (const c of ['id_pessoa', 'nome', 'data_volta', 'contato_em', 'reuniao_em', 'produto']) {
    igual(aba.validacaoDaColuna(COL[c]).length, 0, 'validação inesperada em ' + c);
  }
  guardarRegistros(m);
  return 'estagio 5, estado 5, canal 2; produto sem lista (5.3)';
});

await caso('instalar: um gatilho de tempo, a cada 5 minutos, para buscarLeadsNovos', () => {
  const m = montar();
  igual(m.estado.gatilhos.map(g => [g.funcao, g.minutos]), [['buscarLeadsNovos', 5]], 'gatilhos');
  guardarRegistros(m);
  return '1 gatilho';
});

await caso('instalar duas vezes (e três): continua um gatilho só, aba e linhas intactas', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  m.aba().escreverAMao(2, COL.canal, 'telefone');
  const antes = JSON.stringify([...m.aba().celulas]);
  const r2 = m.gs.instalar();
  const r3 = m.gs.instalar();
  igual(m.estado.gatilhos.length, 1, 'gatilhos');
  igual([r2.aba, r2.gatilho, r3.gatilho], ['mantida', 'mantido', 'mantido'], 'resultado');
  igual(JSON.stringify([...m.aba().celulas]), antes, 'células');
  igual(m.estado.abas.map(a => a.nome), ['fila', 'respostas'], 'abas (v3: a fila e a respostas)');
  guardarRegistros(m);
  return 'gatilhos 1; células iguais';
});

await caso('instalar com gatilhos repetidos de antes: fica um só', () => {
  const m = montar({ instalar: false });
  for (let i = 0; i < 3; i++) m.falsos.globais.ScriptApp.newTrigger('buscarLeadsNovos').timeBased().everyMinutes(5).create();
  m.falsos.globais.ScriptApp.newTrigger('outraFuncao').timeBased().everyMinutes(30).create();
  m.gs.instalar();
  igual(m.estado.gatilhos.map(g => g.funcao).sort(), ['buscarLeadsNovos', 'outraFuncao'], 'gatilhos');
  guardarRegistros(m);
  return 'buscarLeadsNovos 1; gatilho de outra função não foi tocado';
});

await caso('instalar com uma aba "fila" de outro cabeçalho: não mexe em nada e avisa', () => {
  const m = montar({ instalar: false });
  const aba = m.falsos.globais.SpreadsheetApp.getActiveSpreadsheet().insertSheet('fila');
  aba.escreverAMao(1, 1, 'outra coisa');
  aba.escreverAMao(2, 1, 'linha antiga');
  const antes = JSON.stringify([...aba.celulas]);
  const msg = erroDe(() => m.gs.instalar());
  certo(/outro cabeçalho/.test(msg), msg);
  igual(JSON.stringify([...aba.celulas]), antes, 'células');
  igual(m.estado.gatilhos.length, 0, 'gatilhos');
  guardarRegistros(m);
  return 'nada mudou';
});

await caso('desligar: apaga o gatilho e não mexe na aba nem nas propriedades', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  const props = JSON.stringify(m.estado.propriedades);
  const linhas = linhasDeDados(m.aba());
  igual(m.gs.desligar().apagados, 1, 'apagados');
  igual(m.estado.gatilhos.length, 0, 'gatilhos');
  igual(JSON.stringify(m.estado.propriedades), props, 'propriedades');
  igual(linhasDeDados(m.aba()), linhas, 'linhas');
  guardarRegistros(m);
  return 'gatilhos 0';
});

await caso('instalar: texto simples (@) em nome, telefone, email, empresa e respostas_a_confirmar, e em nenhuma outra', () => {
  const m = montar();
  const aba = m.aba();
  const comTexto = ['nome', 'telefone', 'email', 'empresa', 'respostas_a_confirmar'];
  for (const c of COLUNAS) {
    const f = aba.formatos.filter(x => x.coluna === COL[c]);
    if (comTexto.includes(c)) {
      igual(f.map(x => [x.formato, x.linha, x.linhas]), [['@', 2, aba.getMaxRows() - 1]], 'formato de ' + c);
    } else igual(f.length, 0, 'formato inesperado em ' + c);
  }
  guardarRegistros(m);
  return '5 colunas com @';
});

await caso('aba renomeada e instalar de novo: a aba nova recebe os leads desde o início, sem duplicar', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  certo(m.estado.propriedades.CURSOR_ID_PESSOA, 'cursor não salvo');
  m.falsos.globais.SpreadsheetApp.getActiveSpreadsheet().renomearAba('fila', 'fila antiga');
  const r = m.gs.instalar();
  igual(r.aba, 'criada', 'aba');
  igual(cursorSalvo(m), [null, null], 'cursor apagado');
  igual(m.estado.gatilhos.length, 1, 'gatilhos');
  m.gs.buscarLeadsNovos();
  m.gs.buscarLeadsNovos();
  const nova = m.aba();
  igual(linhasDeDados(nova), 3, 'linhas na aba nova');
  igual([2, 3, 4].map(n => nova.valor(n, 1)), leads(1, 3).map(l => l.id_pessoa), 'ordem');
  igual(linhasDeDados(m.estado.abas.find(a => a.nome === 'fila antiga')), 3, 'aba antiga intacta');
  guardarRegistros(m);
  return 'linhas 3 na aba nova; aba antiga com 3';
});

await caso('instalar com a aba já existente não apaga o cursor', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  const antes = cursorSalvo(m);
  m.gs.instalar();
  igual(cursorSalvo(m), antes, 'cursor');
  guardarRegistros(m);
  return 'cursor igual';
});

// ························· busca ·························
await caso('primeira busca: acrescenta os 3 leads na ordem, só nas colunas do banco', () => {
  const m = montar();
  const r = m.gs.buscarLeadsNovos();
  const aba = m.aba();
  igual([r.situacao, r.acrescentadas, r.voltas], ['ok', 3, 1], 'resultado');
  igual(linhasDeDados(aba), 3, 'linhas');
  igual([2, 3, 4].map(n => aba.valor(n, COL.id_pessoa)), leads(1, 3).map(l => l.id_pessoa), 'ordem');
  const escritasDoScript = aba.escritas.filter(e => e.quem === 'script' && e.linha > 1);
  igual(escritasDoScript.map(e => [e.linha, e.coluna, e.linhas, e.colunas]), [[2, 1, 3, 16]], 'escritas');
  for (let n = 2; n <= 4; n++) for (let c = COL.canal; c <= COL.produto; c++) igual(aba.valor(n, c), '', 'coluna do SDR ' + c);
  guardarRegistros(m);
  return 'linhas 3; uma escrita, colunas 1 a 16';
});

await caso('valores da linha: captado no estágio vazio, não com acento, horário de Brasília, respostas da faixa b', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  const aba = m.aba();
  const l1 = aba.linha(2, 20), l2 = aba.linha(3, 20), l3 = aba.linha(4, 20);
  igual(l1.slice(0, 16), [lead(1).id_pessoa, 'TESTE Pessoa 1', '+55 00 00000-0001', 'pessoa1@teste.invalid', 'TESTE Empresa 1',
    'sim', 'sim', 'a', 96, '', '2026-11-08 09:00:01', 0, '', 'captado', '', ''], 'linha 1');
  igual(l2.slice(5, 13), ['sim', 'sim', 'b', 55, 'valor-medio: de-10-a-50-mil; vendedores: 2-a-5', '2026-11-08 09:00:02', 0, 'quero-conversa'], 'linha 2');
  igual(l3[COL.consentimento_email - 1], 'não', 'nao vira não');
  igual(aba.celula(2, COL.telefone).texto, true, 'telefone com + vai como texto');
  guardarRegistros(m);
  return 'estagio captado; entrou_em 09:00:01; clique quero-conversa';
});

await caso('cursor salvo nas propriedades depois de gravar, igual ao cursor_seguinte (com Z)', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  igual(cursorSalvo(m), [horario(3).replace('+00:00', 'Z'), lead(3).id_pessoa], 'cursor');
  igual(Object.keys(m.estado.propriedades).sort(), ['CHAVE_PLANILHA', 'CURSOR_GRAVADO_EM', 'CURSOR_ID_PESSOA', 'GARCOM_URL'], 'propriedades');
  guardarRegistros(m);
  return 'cursor do lead 3';
});

await caso('pedido: endereço e chave das propriedades, chave no cabeçalho, limite 200, sem seguir redirecionamento', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  const c = m.estado.chamadas[0];
  igual(c.url, URL_GARCOM + '/api/planilha/leads-novos?limite=200', 'endereço');
  igual(c.opcoes.headers, { 'X-Chave-Planilha': CHAVE }, 'cabeçalhos');
  igual([c.opcoes.method, c.opcoes.muteHttpExceptions, c.opcoes.followRedirects], ['get', true, false], 'opções');
  certo(!c.url.includes(CHAVE), 'chave no endereço');
  guardarRegistros(m);
  return 'chamadas 1';
});

await caso('GARCOM_URL com barra no fim: a barra sai', () => {
  const m = montar({ propriedades: { GARCOM_URL: URL_GARCOM + '/', CHAVE_PLANILHA: CHAVE } });
  m.gs.buscarLeadsNovos();
  igual(m.estado.chamadas[0].url, URL_GARCOM + '/api/planilha/leads-novos?limite=200', 'endereço');
  guardarRegistros(m);
  return 'sem barra dupla';
});

await caso('segunda busca: manda o cursor codificado e não duplica', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  const r = m.gs.buscarLeadsNovos();
  igual([r.situacao, r.acrescentadas], ['ok', 0], 'resultado');
  igual(linhasDeDados(m.aba()), 3, 'linhas');
  const g = horario(3).replace('+00:00', 'Z');
  igual(m.estado.chamadas[1].url, URL_GARCOM + '/api/planilha/leads-novos?depois_de_gravado_em=' + encodeURIComponent(g) +
    '&depois_de_id_pessoa=' + lead(3).id_pessoa + '&limite=200', 'endereço');
  igual(cursorSalvo(m), [g, lead(3).id_pessoa], 'cursor continua');
  guardarRegistros(m);
  return 'linhas 3; cursor igual';
});

await caso('cursor com +00:00 (como o banco escreve): vai como %2B', () => {
  const m = montar();
  m.estado.propriedades.CURSOR_GRAVADO_EM = horario(1);
  m.estado.propriedades.CURSOR_ID_PESSOA = lead(1).id_pessoa;
  m.gs.buscarLeadsNovos();
  certo(m.estado.chamadas[0].url.includes('%2B00%3A00'), m.estado.chamadas[0].url);
  igual(linhasDeDados(m.aba()), 2, 'linhas (leads 2 e 3)');
  guardarRegistros(m);
  return 'linhas 2';
});

await caso('leads novos no garçom: entram no fim, depois dos que já estavam', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  trocarBase(m, leads(1, 5));
  const r = m.gs.buscarLeadsNovos();
  igual(r.acrescentadas, 2, 'acrescentadas');
  igual([2, 3, 4, 5, 6].map(n => m.aba().valor(n, 1)), leads(1, 5).map(l => l.id_pessoa), 'ordem');
  guardarRegistros(m);
  return 'linhas 5';
});

await caso('cursor perdido (propriedades apagadas): pede desde o início e não duplica, pela conferência do id_pessoa', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  delete m.estado.propriedades.CURSOR_GRAVADO_EM;
  delete m.estado.propriedades.CURSOR_ID_PESSOA;
  const r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.repetidas], [0, 3], 'resultado');
  igual(linhasDeDados(m.aba()), 3, 'linhas');
  igual(cursorSalvo(m)[1], lead(3).id_pessoa, 'cursor de volta');
  guardarRegistros(m);
  return 'repetidas 3; linhas 3';
});

await caso('cursor pela metade: começa do início, sem duplicar', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  delete m.estado.propriedades.CURSOR_ID_PESSOA;
  m.gs.buscarLeadsNovos();
  igual(m.estado.chamadas[1].url, URL_GARCOM + '/api/planilha/leads-novos?limite=200', 'endereço');
  igual(linhasDeDados(m.aba()), 3, 'linhas');
  guardarRegistros(m);
  return 'linhas 3';
});

await caso('mesmo lead duas vezes na mesma página: entra uma vez', () => {
  const m = montar({ base: [] });
  const repetida = { leads: [lead(1), lead(1)], cursor_seguinte: { depois_de_gravado_em: horario(1).replace('+00:00', 'Z'), depois_de_id_pessoa: lead(1).id_pessoa }, pode_ter_mais: false };
  m.falsos.trocarUrlFetch(() => ({ codigo: 200, corpo: JSON.stringify(repetida) }));
  const r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.repetidas, linhasDeDados(m.aba())], [1, 1, 1], 'resultado');
  guardarRegistros(m);
  return 'linhas 1';
});

await caso('paginação: 450 leads numa execução, em 3 voltas (200, 200, 50), na ordem', () => {
  const base = leads(1, 450);
  const m = montar({ base });
  const r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.voltas, r.pode_ter_mais], [450, 3, false], 'resultado');
  igual(m.estado.chamadas.length, 3, 'chamadas');
  const ids = [];
  for (let n = 2; n <= 451; n++) ids.push(m.aba().valor(n, 1));
  igual(ids, base.map(l => l.id_pessoa), 'ordem');
  igual(cursorSalvo(m)[1], lead(450).id_pessoa, 'cursor');
  guardarRegistros(m);
  return 'linhas 450; chamadas 3';
});

await caso('paginação: página cheia exata (200) pede mais uma e para na lista vazia', () => {
  const m = montar({ base: leads(1, 200) });
  const r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.voltas, m.estado.chamadas.length], [200, 2, 2], 'resultado');
  igual(cursorSalvo(m)[1], lead(200).id_pessoa, 'cursor mantido na lista vazia');
  guardarRegistros(m);
  return 'chamadas 2';
});

await caso('limite de voltas: 2050 leads entram em duas execuções (2000 e 50), a aba cresce e a validação acompanha', () => {
  const m = montar({ base: leads(1, 2050) });
  const r1 = m.gs.buscarLeadsNovos();
  igual([r1.acrescentadas, r1.voltas, r1.pode_ter_mais], [2000, 10, true], 'primeira');
  const r2 = m.gs.buscarLeadsNovos();
  igual([r2.acrescentadas, r2.pode_ter_mais], [50, false], 'segunda');
  const aba = m.aba();
  igual(linhasDeDados(aba), 2050, 'linhas');
  certo(aba.getMaxRows() >= 2051, 'aba não cresceu');
  const ultimas = aba.validacaoDaColuna(COL.estagio).at(-1);
  igual(ultimas.linha + ultimas.linhas - 1, aba.getMaxRows(), 'validação até a última linha');
  guardarRegistros(m);
  return 'linhas 2050; voltas 10 + 1';
});

// ························· erros ·························
function casoDeErro(nome, urlFetch, situacao, codigo) {
  return caso(nome, () => {
    const m = montar();
    m.gs.buscarLeadsNovos();
    const cursorAntes = cursorSalvo(m);
    const celulasAntes = JSON.stringify([...m.aba().celulas]);
    m.falsos.trocarUrlFetch(urlFetch);
    const r = m.gs.buscar_();
    igual([r.situacao, r.acrescentadas], [situacao, 0], 'resultado');
    if (codigo !== undefined) igual(r.codigo, codigo, 'código');
    igual(cursorSalvo(m), cursorAntes, 'cursor');
    igual(JSON.stringify([...m.aba().celulas]), celulasAntes, 'células');
    const msg = erroDe(() => m.gs.buscarLeadsNovos());
    certo(/^Planilha do SDR: /.test(msg), msg);
    guardarRegistros(m);
    return 'linhas 3; cursor igual; erro: ' + msg.replace(/^Planilha do SDR: /, '').slice(0, 60);
  });
}

await casoDeErro('401 do garçom: nada acrescentado, cursor não perdido, erro para o aviso do Google', () => ({ codigo: 401, corpo: '{"ok":false,"erro":"nao autorizado"}' }), 'nao-autorizado', 401);
await caso('chave errada nas propriedades: 401 de verdade do garçom falso, nada acrescentado', () => {
  const m = montar({ propriedades: { GARCOM_URL: URL_GARCOM, CHAVE_PLANILHA: CHAVE_ERRADA } });
  const r = m.gs.buscar_();
  igual([r.situacao, r.codigo, linhasDeDados(m.aba())], ['nao-autorizado', 401, 0], 'resultado');
  igual(cursorSalvo(m), [null, null], 'cursor');
  guardarRegistros(m);
  return 'linhas 0';
});
await casoDeErro('502 do garçom', () => ({ codigo: 502, corpo: '{"ok":false,"erro":"servico indisponivel"}' }), 'erro-garcom', 502);
await casoDeErro('400 do garçom', () => ({ codigo: 400, corpo: '{"ok":false,"erro":"pedido recusado"}' }), 'erro-garcom', 400);
await casoDeErro('302 (redirecionamento) não é seguido', () => ({ codigo: 302, corpo: '' }), 'erro-garcom', 302);
await casoDeErro('erro de rede (o fetch lança)', () => { throw new Error('Address unavailable'); }, 'erro-rede', null);
await casoDeErro('resposta ilegível (HTML no lugar de JSON)', () => ({ codigo: 200, corpo: '<html>erro</html>' }), 'resposta-ilegivel', 200);
await casoDeErro('fora do formato: leads não é lista', () => ({ codigo: 200, corpo: '{"leads":{},"cursor_seguinte":null,"pode_ter_mais":false}' }), 'resposta-fora-do-formato');
await casoDeErro('fora do formato: lead sem id_pessoa', () => ({ codigo: 200, corpo: JSON.stringify({ leads: [{ ...lead(9), id_pessoa: undefined }], cursor_seguinte: { depois_de_gravado_em: 'x', depois_de_id_pessoa: 'y' }, pode_ter_mais: false }) }), 'resposta-fora-do-formato');
await casoDeErro('fora do formato: leads sem cursor_seguinte', () => ({ codigo: 200, corpo: JSON.stringify({ leads: [lead(9)], cursor_seguinte: null, pode_ter_mais: false }) }), 'resposta-fora-do-formato');
await casoDeErro('fora do formato: sem pode_ter_mais', () => ({ codigo: 200, corpo: JSON.stringify({ leads: [], cursor_seguinte: null }) }), 'resposta-fora-do-formato');
await casoDeErro('fora do formato: mais de 200 leads', () => ({ codigo: 200, corpo: JSON.stringify({ leads: leads(10, 210), cursor_seguinte: { depois_de_gravado_em: 'x', depois_de_id_pessoa: 'y' }, pode_ter_mais: true }) }), 'resposta-fora-do-formato');
await casoDeErro('fora do formato: JSON que é lista', () => ({ codigo: 200, corpo: '[]' }), 'resposta-fora-do-formato');

await caso('erro na segunda página: a primeira fica gravada com o cursor dela, a segunda não', () => {
  const m = montar({ base: leads(1, 250) });
  let n = 0;
  const original = m.garcom.atender;
  m.falsos.trocarUrlFetch((u, o) => (++n === 2 ? { codigo: 502, corpo: '{}' } : original(u, o)));
  const r = m.gs.buscar_();
  igual([r.situacao, r.acrescentadas, linhasDeDados(m.aba())], ['erro-garcom', 200, 200], 'resultado');
  igual(cursorSalvo(m)[1], lead(200).id_pessoa, 'cursor da primeira página');
  m.falsos.trocarUrlFetch(original);
  m.gs.buscarLeadsNovos();
  igual(linhasDeDados(m.aba()), 250, 'depois, as 50 que faltavam');
  guardarRegistros(m);
  return 'linhas 200, depois 250';
});

await caso('sem propriedades na busca: não chama o garçom', () => {
  const m = montar();
  delete m.estado.propriedades.CHAVE_PLANILHA;
  igual(m.gs.buscar_().situacao, 'sem-propriedades', 'situação');
  igual(m.estado.chamadas.length, 0, 'chamadas');
  erroDe(() => m.gs.buscarLeadsNovos());
  guardarRegistros(m);
  return 'chamadas 0';
});

await caso('sem a aba "fila": não chama o garçom', () => {
  const m = montar({ instalar: false });
  igual(m.gs.buscar_().situacao, 'sem-aba', 'situação');
  igual(m.estado.chamadas.length, 0, 'chamadas');
  guardarRegistros(m);
  return 'chamadas 0';
});

await caso('cabeçalho mexido na aba: não grava nada', () => {
  const m = montar();
  m.aba().escreverAMao(1, COL.estagio, 'etapa');
  const r = m.gs.buscar_();
  igual([r.situacao, linhasDeDados(m.aba()), m.estado.chamadas.length], ['cabecalho-diferente', 0, 0], 'resultado');
  guardarRegistros(m);
  return 'linhas 0';
});

await caso('outra execução com a trava: sai sem fazer nada e sem erro', () => {
  const m = montar();
  m.estado.travaDeOutro = true;
  const r = m.gs.buscarLeadsNovos();
  igual([r.situacao, m.estado.chamadas.length, linhasDeDados(m.aba())], ['ocupado', 0, 0], 'resultado');
  guardarRegistros(m);
  return 'chamadas 0';
});

await caso('a trava é solta depois da busca, mesmo com erro', () => {
  const m = montar();
  m.falsos.trocarUrlFetch(() => { throw new Error('x'); });
  erroDe(() => m.gs.buscarLeadsNovos());
  igual(m.estado.travaPresa, false, 'trava presa');
  guardarRegistros(m);
  return 'trava solta';
});

// ························· SDR e fórmulas ·························
await caso('colunas do SDR preenchidas à mão não são tocadas; linhas antigas não são reescritas', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  const aba = m.aba();
  aba.escreverAMao(2, COL.estagio, 'agendado');
  aba.escreverAMao(2, COL.estado, 'conversando');
  aba.escreverAMao(2, COL.canal, 'telefone');
  aba.escreverAMao(2, COL.contato_em, '2026-11-08 10:00');
  aba.escreverAMao(2, COL.reuniao_em, '2026-11-10 10:00');
  aba.escreverAMao(3, COL.data_volta, '2026-11-20');
  aba.escreverAMao(3, COL.estado, 'stand-by');
  const antes = [2, 3, 4].map(n => aba.linha(n, 20));
  const escritasAntes = aba.escritas.length;
  trocarBase(m, leads(1, 6));
  m.gs.buscarLeadsNovos();
  igual([2, 3, 4].map(n => aba.linha(n, 20)), antes, 'linhas antigas');
  const novas = aba.escritas.slice(escritasAntes).filter(e => e.quem === 'script');
  igual(novas.map(e => [e.linha, e.coluna, e.linhas, e.colunas]), [[5, 1, 3, 16]], 'escritas novas');
  for (let n = 5; n <= 7; n++) for (let c = COL.canal; c <= COL.produto; c++) igual(aba.valor(n, c), '', 'coluna do SDR na linha nova');
  guardarRegistros(m);
  return 'linhas 2 a 4 iguais; escrita só em 5 a 7, colunas 1 a 16';
});

await caso('anotação à direita das 20 colunas não empurra os leads para baixo', () => {
  const m = montar();
  m.gs.buscarLeadsNovos();
  const aba = m.aba();
  aba.escreverAMao(40, 21, 'anotacao');
  trocarBase(m, leads(1, 5));
  m.gs.buscarLeadsNovos();
  igual([5, 6].map(n => aba.valor(n, 1)), leads(4, 5).map(l => l.id_pessoa), 'linhas 5 e 6');
  igual(aba.valor(41, 1), '', 'nada depois da anotação');
  igual(aba.valor(40, 21), 'anotacao', 'anotação intacta');
  guardarRegistros(m);
  return 'leads nas linhas 5 e 6';
});

await caso('fórmula injetada pelo quiz vira texto (= + - @), nada vira fórmula', () => {
  const perigosos = [
    lead(1, { empresa: '=IMPORTXML("https://x.teste.invalid";"//a")' }),
    lead(2, { empresa: '+1+1', respostas_a_confirmar: { 'valor-medio': '=1+1' } }),
    lead(3, { empresa: '-2+3', nome: 'TESTE =HYPERLINK("https://x.teste.invalid")' }),
    lead(4, { empresa: '@SOMA(1)' }),
    lead(5, { empresa: '\t=1' }),
    lead(6, { empresa: "'=1" })
  ];
  const m = montar({ base: perigosos });
  m.gs.buscarLeadsNovos();
  const aba = m.aba();
  let formulas = 0;
  for (const [, c] of aba.celulas) if (c.formula) formulas++;
  igual(formulas, 0, 'células com fórmula');
  for (let i = 0; i < perigosos.length; i++) {
    igual(aba.valor(i + 2, COL.empresa), perigosos[i].empresa, 'empresa ' + (i + 1));
    igual(aba.celula(i + 2, COL.empresa).texto, true, 'empresa como texto ' + (i + 1));
  }
  igual(aba.valor(3, COL.respostas_a_confirmar), 'valor-medio: =1+1', 'respostas');
  igual(aba.valor(4, COL.nome), perigosos[2].nome, 'nome que não começa com fórmula fica igual');
  guardarRegistros(m);
  return 'fórmulas 0; 6 empresas como texto';
});

await caso('estágio e estado do banco: pre-qualificado vira pré-qualificado; valor fora da lista fica vazio', () => {
  const base = [
    lead(1, { estagio: 'pre-qualificado', estado: 'stand-by', data_volta: '2026-11-20' }),
    lead(2, { estagio: 'inventado', estado: 'sumiu' }),
    lead(3, { estagio: '', estado: '' })
  ];
  const m = montar({ base });
  m.gs.buscarLeadsNovos();
  const aba = m.aba();
  igual([aba.valor(2, COL.estagio), aba.valor(2, COL.estado), aba.valor(2, COL.data_volta)], ['pré-qualificado', 'stand-by', '2026-11-20'], 'lead 1');
  igual([aba.valor(3, COL.estagio), aba.valor(3, COL.estado)], ['', ''], 'lead 2');
  igual([aba.valor(4, COL.estagio), aba.valor(4, COL.estado)], ['captado', ''], 'lead 3');
  guardarRegistros(m);
  return 'mapa conferido';
});

await caso('lead fora das faixas a e b (defesa): não entra, mas o cursor avança', () => {
  const m = montar({ base: [lead(1), lead(2, { lead_score_faixa: 'c' }), lead(3, { lead_score_faixa: 'eliminatorio' })] });
  const r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.fora_da_faixa, linhasDeDados(m.aba())], [1, 2, 1], 'resultado');
  igual(cursorSalvo(m)[1], lead(3).id_pessoa, 'cursor');
  guardarRegistros(m);
  return 'linhas 1; fora da faixa 2';
});

// ························· HTTP local síncrono (o caminho do ensaio da etapa 25) ·························
await caso('urlFetch síncrono por HTTP local: a busca inteira contra um servidorzinho em 127.0.0.1, sem duplicar', async () => {
  const servidor = new Worker(`
    const { parentPort, workerData } = require('node:worker_threads');
    const http = require('node:http');
    import(workerData.falsos).then(({ garcomFalso }) => {
      const g = garcomFalso({ chave: workerData.chave, leads: workerData.leads });
      const s = http.createServer((req, res) => {
        const r = g.atender('https://garcom.teste.invalid' + req.url, { headers: { 'X-Chave-Planilha': req.headers['x-chave-planilha'] } });
        res.writeHead(r.codigo, { 'Content-Type': 'application/json' });
        res.end(r.corpo);
      });
      s.listen(0, '127.0.0.1', () => parentPort.postMessage(s.address().port));
    });
  `, { eval: true, workerData: { falsos: new URL('./falsos.mjs', import.meta.url).href, chave: CHAVE, leads: leads(1, 230) } });
  const porta = await new Promise((ok, falha) => { servidor.once('message', ok); servidor.once('error', falha); });
  const http = criarUrlFetchSincrono({ traduzir: (u) => u.replace(URL_GARCOM, 'http://127.0.0.1:' + porta) });
  try {
    const falsos = criarFalsos({ propriedades: { GARCOM_URL: URL_GARCOM, CHAVE_PLANILHA: CHAVE }, urlFetch: http.urlFetch });
    const gs = carregarCodigo(falsos);
    gs.instalar();
    const r1 = gs.buscarLeadsNovos();
    const r2 = gs.buscarLeadsNovos();
    const aba = falsos.estado.abas[0];
    igual([r1.acrescentadas, r1.voltas, r2.acrescentadas, linhasDeDados(aba)], [230, 2, 0, 230], 'resultado');
    falsos.estado.propriedades.CHAVE_PLANILHA = CHAVE_ERRADA;
    igual(gs.buscar_().situacao, 'nao-autorizado', 'chave errada');
    todosOsRegistros.push(...falsos.estado.registros);
    return 'linhas 230 em 2 voltas; segunda busca 0; chave errada 401';
  } finally {
    http.fechar();
    await servidor.terminate();
  }
});


// ························· aba respostas (v3) ·························
const abaR = (m) => m.estado.abas.find(a => a.nome === 'respostas');

await caso('aba respostas · instalar: as duas abas na ordem (fila 1ª, respostas 2ª), mesmo com outra aba antes', () => {
  const m = montar({ instalar: false });
  m.falsos.globais.SpreadsheetApp.getActiveSpreadsheet().insertSheet('Página1');
  const r = m.gs.instalar();
  igual(m.estado.abas.map(a => a.nome), ['fila', 'respostas', 'Página1'], 'ordem das abas');
  igual([r.aba, r.aba_respostas, r.gatilho], ['criada', 'criada', 'criado'], 'resultado');
  igual([m.aba().getIndex(), abaR(m).getIndex()], [1, 2], 'posições');
  guardarRegistros(m);
  return 'fila 1, respostas 2, Página1 3';
});

await caso('aba respostas · instalar: os 35 cabeçalhos (os 24 do quiz e os 11 da origem e dos ids, no fim), primeira linha congelada, texto simples só nas colunas de texto, sem lista', () => {
  const m = montar();
  const aba = abaR(m);
  igual(aba.linha(1, 35), COLUNAS_RESPOSTAS, 'cabeçalho');
  igual(aba.getFrozenRows(), 1, 'congelada');
  igual(linhasDeDados(aba), 0, 'linhas');
  const comTexto = ['nome', 'ramo', 'faturamento', 'vendedores', 'quem marca a conversa', 'origem dos leads', 'CRM', 'cargo',
    'lembra dos números', 'chute de comparecimento', 'causa · primeiro contato', 'causa · tentativas', 'causa · lead sem contato', 'outras respostas',
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'fbp', 'fbc', 'id_lead', 'id_qualificado', 'qualificado'];
  for (const c of COLUNAS_RESPOSTAS) {
    const f = aba.formatos.filter(x => x.coluna === CR[c]);
    if (comTexto.includes(c)) igual(f.map(x => [x.formato, x.linha, x.linhas]), [['@', 2, aba.getMaxRows() - 1]], 'formato de ' + c);
    else igual(f.length, 0, 'formato inesperado em ' + c);
  }
  igual(aba.validacoes.length, 0, 'validações');
  guardarRegistros(m);
  return '35 colunas; 25 com @; números sem formato';
});

await caso('aba respostas · primeira busca: os mesmos leads da fila, na mesma ordem, na mesma rodada, numa escrita só', () => {
  const base = [lead(1, { respostas: RESP_NUMEROS }), lead(2, { respostas: RESP_CHUTE }), lead(3, { respostas: RESP_NUMEROS })];
  const m = montar({ base });
  const r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.respostas_acrescentadas, m.estado.chamadas.length], [3, 3, 1], 'resultado');
  igual([2, 3, 4].map(n => abaR(m).valor(n, 1)), [2, 3, 4].map(n => m.aba().valor(n, 1)), 'mesmas pessoas, mesma ordem');
  igual(abaR(m).escritas.filter(e => e.quem === 'script' && e.linha > 1).map(e => [e.linha, e.coluna, e.linhas, e.colunas]), [[2, 1, 3, 35]], 'escritas');
  certo(m.estado.registros.some(t => /respostas: 3 linha\(s\) nova\(s\)/.test(t)), 'registro sem a contagem da aba respostas');
  guardarRegistros(m);
  return 'fila 3, respostas 3, uma chamada';
});

await caso('aba respostas · a linha com cada coluna (modo números): lista com "; ", números como número, porcentagem como texto', () => {
  const m = montar({ base: [lead(1, { respostas: RESP_NUMEROS })] });
  m.gs.buscarLeadsNovos();
  const aba = abaR(m);
  igual(aba.linha(2, 24), [lead(1).id_pessoa, 'TESTE Pessoa 1', '2026-11-08 09:00:01', 'a', 96,
    'Serviços para empresas', 'R$ 150 mil a R$ 500 mil', '2 ou 3', 'Sim. O vendedor faz tudo', 15000,
    'Anúncios pagos (Meta, Google); Indicação de clientes', 'Sim, mas pouca gente atualiza', 'Dono(a) ou sócio(a)', 'Sim',
    1200, '50%', 300, '12,5%', 40, '', 'No mesmo dia', 'Depende do vendedor', 'Alguns', ''], 'linha');
  igual(aba.linha(2, 35).slice(24), Array(11).fill(''), 'origem e ids vazios (lead sem eles)');
  igual([aba.celula(2, CR['pré-qualificados']).texto, aba.celula(2, CR['conversas realizadas']).texto], [true, true], 'porcentagem como texto');
  igual(['leads por mês', 'agendados', 'vendas fechadas', 'valor médio da venda', 'lead_score_nota'].map(c => typeof aba.valor(2, CR[c])), ['number', 'number', 'number', 'number', 'number'], 'números');
  guardarRegistros(m);
  return 'leads 1200, pré-qualificados 50%, valor médio 15000';
});

await caso('aba respostas · a linha no modo chute: o chute na coluna dele, os números do funil vazios', () => {
  const m = montar({ base: [lead(2, { respostas: RESP_CHUTE })] });
  m.gs.buscarLeadsNovos();
  const l = abaR(m).linha(2, 24);
  igual(l.slice(3, 24), ['b', 55, 'Outro', 'R$ 500 mil a R$ 1,5 milhão', '1', 'Depende do vendedor', 8000, 'Prospecção ativa',
    'Usamos planilha', 'Gestor(a) de vendas', 'Não', '', '', '', '', '', 'Menos de 75%', 'Em até 10 minutos',
    '6 ou mais, com roteiro definido', 'Não', ''], 'linha');
  guardarRegistros(m);
  return 'chute Menos de 75%; vendedores "1" como texto';
});

await caso('aba respostas · resposta sem coluna vai para "outras respostas" e não quebra a rodada', () => {
  const estranhas = {
    ramo: 'Outro', 'pergunta-nova': 'Sim', 'lista-nova': ['x', 'y'], objeto: { a: 1 }, numero: 7, vazia: null, vazio: '',
    numeros: [{ linha: 'Leads por mês', valor: '10', unidade: 'nº' }, { linha: 'Linha nova', valor: '3', unidade: 'nº' }, 'solto'],
    constructor: 'x', crm: ['Usamos planilha', 'Sim, e o time atualiza todo dia']
  };
  const m = montar({ base: [lead(1, { respostas: estranhas }), lead(2, { respostas: 'texto solto' }), lead(3, { respostas: [1, 2] })] });
  const r = m.gs.buscarLeadsNovos();
  igual([r.situacao, r.acrescentadas, r.respostas_acrescentadas], ['ok', 3, 3], 'resultado');
  const aba = abaR(m);
  igual(aba.valor(2, CR['outras respostas']),
    'pergunta-nova: Sim; lista-nova: x, y; objeto: {"a":1}; numero: 7; numeros: {"linha":"Linha nova","valor":"3","unidade":"nº"}; numeros: solto; constructor: x', 'outras respostas');
  igual([aba.valor(2, CR.ramo), aba.valor(2, CR['leads por mês']), aba.valor(2, CR.CRM)], ['Outro', 10, 'Usamos planilha; Sim, e o time atualiza todo dia'], 'as que têm coluna');
  igual([aba.valor(3, CR['outras respostas']), aba.valor(4, CR['outras respostas'])], ['texto solto', '1, 2'], 'respostas que não são objeto');
  guardarRegistros(m);
  return '7 respostas sem coluna numa célula; a rodada inteira entrou';
});

await caso('aba respostas · sem a coluna respostas (migração 002 não rodada): a linha entra com o que houver, as respostas vazias, sem erro', () => {
  const m = montar({ base: [lead(1), lead(2, { respostas: null })] });
  const r = m.gs.buscarLeadsNovos();
  igual([r.situacao, r.acrescentadas, r.respostas_acrescentadas], ['ok', 2, 2], 'resultado');
  igual(abaR(m).linha(2, 35), [lead(1).id_pessoa, 'TESTE Pessoa 1', '2026-11-08 09:00:01', 'a', 96, ...Array(30).fill('')], 'linha 1');
  igual(abaR(m).linha(3, 24).slice(5), Array(19).fill(''), 'linha 2');
  igual(m.aba().linha(2, 16), (() => { const x = montar({ base: [lead(1)] }); x.gs.buscarLeadsNovos(); return x.aba().linha(2, 16); })(), 'fila igual à de sempre');
  guardarRegistros(m);
  return 'linhas 2; 19 colunas de respostas vazias';
});

await caso('aba respostas · v4: a origem e os ids do lead nas onze colunas do fim, como vieram; qualificado em sim ou não', () => {
  const origem = { utm_source: 'meta-ads', utm_medium: 'cpc', utm_campaign: 'funil-01', utm_content: 'teste', utm_term: '',
    fbclid: 'IwAR0abc_DEF-123', fbp: null, fbc: null, id_lead: 'lead-1763500000000-abc123', id_qualificado: 'qualificado-1763500000000-abc123', qualificado: true };
  const m = montar({ base: [lead(1, { respostas: RESP_NUMEROS, ...origem }),
    lead(3, { respostas: RESP_NUMEROS, ...origem, id_lead: 'lead-1763500000001-def456', id_qualificado: null, qualificado: false })] });
  const r = m.gs.buscarLeadsNovos();
  igual([r.situacao, r.acrescentadas, r.respostas_acrescentadas], ['ok', 2, 2], 'resultado');
  const aba = abaR(m);
  igual(aba.linha(2, 35).slice(24), ['meta-ads', 'cpc', 'funil-01', 'teste', '', 'IwAR0abc_DEF-123', '', '', 'lead-1763500000000-abc123',
    'qualificado-1763500000000-abc123', 'sim'], 'linha qualificada');
  igual(aba.linha(3, 35).slice(32), ['lead-1763500000001-def456', '', 'não'], 'linha não qualificada');
  igual(aba.linha(2, 24).slice(0, 5), [lead(1).id_pessoa, 'TESTE Pessoa 1', '2026-11-08 09:00:01', 'a', 96], 'as colunas de antes no mesmo lugar');
  igual(m.aba().linha(2, 16), (() => { const x = montar({ base: [lead(1)] }); x.gs.buscarLeadsNovos(); return x.aba().linha(2, 16); })(), 'fila igual à de sempre');
  guardarRegistros(m);
  return 'meta-ads, cpc, teste, fbclid e ids nas colunas 25 a 35';
});

await caso('aba respostas · sem duplicar: segunda busca e cursor perdido não repetem na aba respostas', () => {
  const m = montar({ base: leads(1, 3).map(l => ({ ...l, respostas: RESP_NUMEROS })) });
  m.gs.buscarLeadsNovos();
  let r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.respostas_acrescentadas], [0, 0], 'segunda busca');
  delete m.estado.propriedades.CURSOR_GRAVADO_EM;
  delete m.estado.propriedades.CURSOR_ID_PESSOA;
  r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.respostas_acrescentadas, r.repetidas, linhasDeDados(abaR(m))], [0, 0, 3, 3], 'cursor perdido');
  trocarBase(m, leads(1, 5).map(l => ({ ...l, respostas: RESP_NUMEROS })));
  r = m.gs.buscarLeadsNovos();
  igual([r.respostas_acrescentadas, [2, 3, 4, 5, 6].map(n => abaR(m).valor(n, 1))], [2, leads(1, 5).map(l => l.id_pessoa)], 'novos no fim');
  guardarRegistros(m);
  return 'respostas 3, depois 5, sem repetir';
});

await caso('aba respostas · recriar as duas abas (renomear as antigas e instalar): o cursor sai e as duas recebem tudo de novo', () => {
  const m = montar({ base: leads(1, 3).map(l => ({ ...l, respostas: RESP_NUMEROS })) });
  m.gs.buscarLeadsNovos();
  const planilha = m.falsos.globais.SpreadsheetApp.getActiveSpreadsheet();
  planilha.renomearAba('fila', 'fila antiga');
  planilha.renomearAba('respostas', 'respostas antiga');
  const r = m.gs.instalar();
  igual([r.aba, r.aba_respostas], ['criada', 'criada'], 'abas');
  igual(cursorSalvo(m), [null, null], 'cursor apagado');
  igual(m.estado.abas.map(a => a.nome), ['fila', 'respostas', 'fila antiga', 'respostas antiga'], 'ordem');
  // a base mudou (como depois do SQL de limpeza): a busca traz o que o banco tem hoje
  trocarBase(m, [lead(2, { respostas: RESP_NUMEROS }), lead(4, { respostas: RESP_CHUTE })]);
  const b = m.gs.buscarLeadsNovos();
  igual([b.acrescentadas, b.respostas_acrescentadas], [2, 2], 'busca');
  igual([[2, 3].map(n => m.aba().valor(n, 1)), [2, 3].map(n => abaR(m).valor(n, 1))], [[lead(2).id_pessoa, lead(4).id_pessoa], [lead(2).id_pessoa, lead(4).id_pessoa]], 'as duas com tudo do banco');
  igual([linhasDeDados(m.estado.abas[2]), linhasDeDados(m.estado.abas[3])], [3, 3], 'antigas intactas');
  guardarRegistros(m);
  return 'fila 2 e respostas 2 com o banco de hoje; antigas com 3';
});

await caso('aba respostas · apagar as duas abas e instalar: as duas nascem de novo e recebem tudo', () => {
  const m = montar({ base: leads(1, 3) });
  m.gs.buscarLeadsNovos();
  const planilha = m.falsos.globais.SpreadsheetApp.getActiveSpreadsheet();
  planilha.insertSheet('Página1', 0);
  planilha.apagarAba('fila');
  planilha.apagarAba('respostas');
  m.gs.instalar();
  igual(m.estado.abas.map(a => a.nome), ['fila', 'respostas', 'Página1'], 'ordem');
  const r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.respostas_acrescentadas, linhasDeDados(m.aba()), linhasDeDados(abaR(m))], [3, 3, 3, 3], 'resultado');
  guardarRegistros(m);
  return 'fila 3, respostas 3';
});

await caso('aba respostas · vindo da v2 (a fila já existe com os leads, sem a aba respostas): instalar cria só a respostas, que recebe todos, e a fila não repete', () => {
  const m = montar({ base: leads(1, 3) });
  m.gs.buscarLeadsNovos();
  m.falsos.globais.SpreadsheetApp.getActiveSpreadsheet().apagarAba('respostas');
  const antes = JSON.stringify([...m.aba().celulas]);
  const i = m.gs.instalar();
  igual([i.aba, i.aba_respostas, cursorSalvo(m)], ['mantida', 'criada', [null, null]], 'instalar');
  igual(m.estado.abas.map(a => a.nome), ['fila', 'respostas'], 'ordem');
  const r = m.gs.buscarLeadsNovos();
  igual([r.acrescentadas, r.respostas_acrescentadas, linhasDeDados(abaR(m))], [0, 3, 3], 'resultado');
  igual(JSON.stringify([...m.aba().celulas]), antes, 'fila intacta');
  guardarRegistros(m);
  return 'fila 0 nova; respostas 3';
});

await caso('aba respostas · sem a aba respostas ou com o cabeçalho dela mexido: a busca não chama o garçom e não grava nada, nem na fila', () => {
  const m = montar();
  m.falsos.globais.SpreadsheetApp.getActiveSpreadsheet().apagarAba('respostas');
  igual([m.gs.buscar_().situacao, m.estado.chamadas.length], ['sem-aba', 0], 'sem a aba');
  const msg = erroDe(() => m.gs.buscarLeadsNovos());
  certo(/respostas/.test(msg), msg);
  const m2 = montar();
  abaR(m2).escreverAMao(1, CR.ramo, 'setor');
  const r = m2.gs.buscar_();
  igual([r.situacao, m2.estado.chamadas.length, linhasDeDados(m2.aba())], ['cabecalho-diferente', 0, 0], 'cabeçalho mexido');
  guardarRegistros(m); guardarRegistros(m2);
  return 'sem-aba e cabecalho-diferente; chamadas 0';
});

await caso('aba respostas · instalar com uma aba "respostas" de outro cabeçalho: não mexe em nada, nem cria a fila', () => {
  const m = montar({ instalar: false });
  const aba = m.falsos.globais.SpreadsheetApp.getActiveSpreadsheet().insertSheet('respostas');
  aba.escreverAMao(1, 1, 'outra coisa');
  const antes = JSON.stringify([...aba.celulas]);
  const msg = erroDe(() => m.gs.instalar());
  certo(/"respostas" já existe com outro cabeçalho/.test(msg), msg);
  igual([JSON.stringify([...aba.celulas]), m.estado.abas.map(a => a.nome), m.estado.gatilhos.length], [antes, ['respostas'], 0], 'nada mudou');
  guardarRegistros(m);
  return 'nada mudou';
});

await caso('aba respostas · fórmula injetada pelas respostas vira texto, nada vira fórmula', () => {
  const m = montar({ base: [lead(1, { nome: '=1+1', respostas: { ramo: '=IMPORTXML("https://x.teste.invalid";"//a")', origem: ['+1', '@x'], 'valor-medio': '=2', 'pergunta-nova': '-3', numeros: [{ linha: 'Agendados', valor: '=4', unidade: 'nº' }] } })] });
  m.gs.buscarLeadsNovos();
  const aba = abaR(m);
  let formulas = 0;
  for (const [, c] of aba.celulas) if (c.formula) formulas++;
  igual(formulas, 0, 'fórmulas');
  igual([aba.valor(2, CR.nome), aba.valor(2, CR.ramo), aba.valor(2, CR['origem dos leads']), aba.valor(2, CR['valor médio da venda']), aba.valor(2, CR.agendados), aba.valor(2, CR['outras respostas'])],
    ['=1+1', '=IMPORTXML("https://x.teste.invalid";"//a")', '+1; @x', '=2', '=4', 'pergunta-nova: -3'], 'valores como texto');
  guardarRegistros(m);
  return 'fórmulas 0';
});

await caso('aba respostas · muitos leads: 1200 numa rodada, a aba cresce e o texto simples acompanha', () => {
  const m = montar({ base: leads(1, 1200).map(l => ({ ...l, respostas: RESP_CHUTE })) });
  const r = m.gs.buscarLeadsNovos();
  const aba = abaR(m);
  igual([r.acrescentadas, r.respostas_acrescentadas, linhasDeDados(aba)], [1200, 1200, 1200], 'resultado');
  const f = aba.formatos.filter(x => x.coluna === CR.ramo).at(-1);
  igual(f.linha + f.linhas - 1, aba.getMaxRows(), 'formato até a última linha');
  igual(aba.valor(1201, 1), lead(1200).id_pessoa, 'último');
  guardarRegistros(m);
  return 'respostas 1200 em ' + r.voltas + ' voltas';
});

// ························· registro sem dado pessoal ·························
await caso('nenhum dado pessoal, cursor, endereço ou chave no registro nem nas mensagens de erro', () => {
  const proibidos = [CHAVE, CHAVE_ERRADA, 'teste.invalid', 'garcom.teste', '127.0.0.1', 'TESTE', '+55', '00000-',
    '00000000-0000-4000', '2026-11-08T', '@'];
  const textos = [...todosOsRegistros, ...todosOsErros];
  certo(todosOsRegistros.length > 50, 'poucos registros capturados: ' + todosOsRegistros.length);
  for (const t of textos) for (const p of proibidos) if (t.includes(p)) throw new Error('achado no registro: ' + JSON.stringify(t).slice(0, 80));
  return 'registros ' + todosOsRegistros.length + ', mensagens de erro ' + todosOsErros.length + ', nenhum achado';
});

// ························· saída ·························
let ok = 0;
for (const r of resultados) {
  if (r.ok) ok++;
  console.log((r.ok ? 'OK    ' : 'FALHOU') + ' · ' + r.nome + (r.detalhe ? ' (' + r.detalhe + ')' : ''));
}
console.log('\n' + ok + ' de ' + resultados.length + ' casos passaram.');
process.exit(ok === resultados.length ? 0 : 1);
