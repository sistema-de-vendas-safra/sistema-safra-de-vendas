// Garçom do funil-01 · Cloudflare Worker, sem dependências externas
// id: garcom · versao 3 · rascunho · otavio: pendente
// Ver entregas/garcom/README.md. RASCUNHO: a v2 foi publicada no protótipo em 09/11/2026, só com leads de teste.
//
// Um Worker só para o protótipo (decisão #101): safra-prototipo-funil-01 serve as páginas e o
// garçom no mesmo endereço. As rotas /api/ são atendidas antes dos arquivos.
//
//   POST /api/fim-quiz               porta pública: recebe o pacote do fim do quiz-01, confere
//                                    método, origem, tamanho, formato, etiquetas e consentimento,
//                                    e grava pela função registrar_fim_quiz (dados/banco/esquema.sql)
//                                    com a chave publicável (papel anon; #100)
//   GET  /api/planilha/leads-novos   porta privada: só com o cabeçalho X-Chave-Planilha certo;
//                                    devolve os leads novos da planilha do SDR pela função
//                                    leads_para_planilha, com a chave secreta (papel service_role; #100)
//   todo o resto                     arquivos do protótipo, pelo binding de assets (env.ASSETS)
//
// Toda resposta leva X-Robots-Tag: noindex (#101).
// Todo arquivo HTML, CSS ou JavaScript que chega sem charset sai com "; charset=utf-8" (v3, pedido 09).
//
// Segredos: só os nomes. Os valores ficam nas variáveis secretas da Cloudflare (o cofre):
//   env.SUPABASE_CHAVE_PUBLICAVEL  chave publicável do Supabase; só a porta pública usa
//   env.SUPABASE_CHAVE_SECRETA     chave secreta do Supabase; só a porta privada usa
//   env.CHAVE_PLANILHA             abre a porta privada; mora também nas propriedades do script da planilha
// Variáveis comuns, que não são segredo:
//   env.SUPABASE_URL               endereço do projeto no Supabase
//   env.ORIGEM_PERMITIDA           o próprio endereço do protótipo (mesma origem)
//
// Destino dos contatos em conflito (conflito-17): este código segue o lado 2 (banco e planilha
// da #90). Bloqueado para entrega até a decisão.

// ··· Listas fechadas (funis/funil-01/funil.md, "Origens e links"; dados/planta/planta.md) ···
const FUNIS = ['funil-01'];
const UTM_ACEITAS = {
  utm_source: ['stories', 'bio', 'reels', 'email', 'whatsapp'],  // meta-ads reservada, fora do MVP
  utm_campaign: ['funil-01']
};
const FAIXAS = ['a', 'b', 'c', 'eliminatorio'];
const SIM_NAO = ['sim', 'nao'];
// Tipos que o garçom grava hoje. A página só envia o fim do quiz.
const TIPOS_ACEITOS = ['fim_quiz'];
// PROPOSTA, não ligada (14.15; 16.13; 18.4): o clique em "Tenho interesse".
// Só passa para TIPOS_ACEITOS com decisão do Otávio e uma versão nova da planta e do esquema.
const TIPOS_PROPOSTOS = ['interesse_pos_relatorio'];

// ··· Limites ···
const TAMANHO_MAXIMO = 16 * 1024;  // bytes; o pacote do exemplo tem perto de 2 KB
const ESPERA_DO_BANCO_MS = 8000;
const LIMITE_PLANILHA = 200;       // o mesmo teto de leads_para_planilha
const CHAVE_PLANILHA_MINIMO = 32;  // segredo mais curto que isto no cofre não abre a porta (22.4)

// ··· Rotas ···
const ROTA_FIM_QUIZ = '/api/fim-quiz';
const ROTA_PLANILHA = '/api/planilha/leads-novos';

// ··· Campos aceitos: nada além disto entra ···
const CAMPOS_PESSOA = [
  'nome', 'telefone', 'email', 'empresa',
  'consentimento_whatsapp', 'consentimento_email', 'consentimento_texto', 'consentimento_em',
  'primeira_utm_source', 'primeira_utm_campaign'
];
const CAMPOS_EVENTO = [
  'tipo', 'funil', 'entrega', 'versao_entrega', 'utm_source', 'utm_campaign',
  'id_sessao', 'ocorrido_em', 'respostas', 'lead_score_nota', 'lead_score_faixa', 'lead_score_versao'
];
// Parâmetros aceitos na porta privada: nada além disto
const PARAMETROS_PLANILHA = ['depois_de_gravado_em', 'depois_de_id_pessoa', 'limite'];

// ··· Respostas: curtas, sem detalhe interno, sempre com noindex ···
function responder(status, corpo, origem) {
  const cabecalhos = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex'
  };
  if (origem) {
    cabecalhos['Access-Control-Allow-Origin'] = origem;
    cabecalhos['Vary'] = 'Origin';
  }
  return new Response(corpo === null ? null : JSON.stringify(corpo), { status, headers: cabecalhos });
}
const RECUSADO = { ok: false, erro: 'pacote recusado' };
const PEDIDO_RECUSADO = { ok: false, erro: 'pedido recusado' };
const NAO_AUTORIZADO = { ok: false, erro: 'nao autorizado' };
const NAO_ENCONTRADO = { ok: false, erro: 'nao encontrado' };
const INDISPONIVEL = { ok: false, erro: 'servico indisponivel' };

// ··· Conferências ···
const ehTexto = v => typeof v === 'string';
const ehObjeto = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const ehInteiro = (v, min, max) => Number.isInteger(v) && v >= min && v <= max;
const ehData = v => ehTexto(v) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/.test(v) && !Number.isNaN(Date.parse(v));
const soCampos = (obj, lista) => Object.keys(obj).every(k => lista.includes(k));
const temCampos = (obj, lista) => lista.every(k => Object.prototype.hasOwnProperty.call(obj, k));
const digitos = v => v.replace(/[^0-9]/g, '');
// utm: presente e texto. Valor fora da lista fechada não recusa o pacote: é gravado vazio,
// como a planta manda (dados/planta/planta.md, utm_source e primeira_utm_source; 5.5; 18.7).
const utmOk = v => ehTexto(v);
const UTM_DO_PACOTE = [
  ['evento', 'utm_source', 'utm_source'], ['evento', 'utm_campaign', 'utm_campaign'],
  ['pessoa', 'primeira_utm_source', 'utm_source'], ['pessoa', 'primeira_utm_campaign', 'utm_campaign']
];
// Esvazia a utm que veio fora da lista e devolve os nomes dos campos esvaziados (nunca o valor).
// Chamar só depois de conferirPacote.
export function esvaziarUtmForaDaLista(pacote) {
  const esvaziados = [];
  for (const [parte, campo, lista] of UTM_DO_PACOTE) {
    const v = pacote[parte][campo];
    if (v !== '' && !UTM_ACEITAS[lista].includes(v)) {
      pacote[parte][campo] = '';
      esvaziados.push(campo);
    }
  }
  return esvaziados;
}

// Devolve o motivo da recusa (só para o registro interno, nunca para quem enviou) ou null.
export function conferirPacote(pacote) {
  if (!ehObjeto(pacote) || !soCampos(pacote, ['pessoa', 'evento'])) return 'formato';
  const p = pacote.pessoa, e = pacote.evento;
  if (!ehObjeto(p) || !ehObjeto(e)) return 'formato';
  if (!soCampos(p, CAMPOS_PESSOA) || !soCampos(e, CAMPOS_EVENTO)) return 'campo-desconhecido';

  // etiquetas obrigatórias: funil, entrega, versão e as duas utm
  if (!temCampos(e, ['funil', 'entrega', 'versao_entrega', 'utm_source', 'utm_campaign'])) return 'etiqueta-faltando';
  if (!FUNIS.includes(e.funil)) return 'etiqueta-funil';
  if (!ehTexto(e.entrega) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.entrega) || e.entrega.length > 60) return 'etiqueta-entrega';
  if (!ehInteiro(e.versao_entrega, 1, 9999)) return 'etiqueta-versao';
  if (!utmOk(e.utm_source) || !utmOk(e.utm_campaign)) return 'utm-formato';
  // o par entrega e versão é conferido no catálogo pelo próprio banco (chave estrangeira; 18.8)

  // evento
  if (!TIPOS_ACEITOS.includes(e.tipo)) return 'tipo';
  if (!ehTexto(e.id_sessao) || !/^sessao-[a-z0-9-]{1,60}$/.test(e.id_sessao)) return 'sessao';
  if (!ehData(e.ocorrido_em)) return 'data-evento';
  if (!ehObjeto(e.respostas) || JSON.stringify(e.respostas).length > 8000) return 'respostas';
  if (!ehInteiro(e.lead_score_nota, 0, 100)) return 'lead-score-nota';
  if (!FAIXAS.includes(e.lead_score_faixa)) return 'lead-score-faixa';
  if (!ehInteiro(e.lead_score_versao, 1, 9999)) return 'lead-score-versao';

  // pessoa
  if (!temCampos(p, CAMPOS_PESSOA.filter(k => k !== 'empresa'))) return 'pessoa-faltando';
  if (!ehTexto(p.nome) || p.nome.trim().length < 2 || p.nome.length > 120) return 'nome';
  // telefone: o mesmo formato do banco e de 8 a 15 dígitos (dados/banco/esquema.sql v2, gaveta pessoas)
  if (!ehTexto(p.telefone) || !/^\+[0-9 ()-]{8,30}$/.test(p.telefone)) return 'telefone';
  const qtdDigitos = digitos(p.telefone).length;
  if (qtdDigitos < 8 || qtdDigitos > 15) return 'telefone';
  if (!ehTexto(p.email) || p.email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) return 'email';
  if (p.empresa !== undefined && (!ehTexto(p.empresa) || p.empresa.length > 160)) return 'empresa';
  if (!utmOk(p.primeira_utm_source) || !utmOk(p.primeira_utm_campaign)) return 'utm-formato';

  // consentimento obrigatório: pelo menos um canal aceito, com o texto e a data do aceite
  if (!SIM_NAO.includes(p.consentimento_whatsapp) || !SIM_NAO.includes(p.consentimento_email)) return 'consentimento';
  if (p.consentimento_whatsapp !== 'sim' && p.consentimento_email !== 'sim') return 'consentimento';
  if (!ehTexto(p.consentimento_texto) || p.consentimento_texto.trim() === '' || p.consentimento_texto.length > 3000) return 'consentimento-texto';
  if (!ehData(p.consentimento_em)) return 'consentimento-data';

  return null;
}

// ··· Cursor da porta privada ···
// O horário do cursor vem do banco com microssegundos e fuso, por exemplo
// 2026-11-08T12:00:00.123456+00:00. Aceito com o fuso em Z, em +HH:MM (o "+" codificado como %2B
// no endereço) ou em -HH:MM. O "+" sem codificar chega como espaço e é recusado.
// A data precisa existir de verdade: Date.parse aceita 30/02 e passa para março, então o dia,
// o mês, a hora e o fuso são conferidos um por um, sem chamar o banco.
function ehHorarioDoCursor(v) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,6})?(Z|[+-](\d{2}):(\d{2}))$/.exec(v);
  if (!m) return false;
  const [ano, mes, dia, hora, minuto, segundo] = m.slice(1, 7).map(Number);
  if (mes < 1 || mes > 12 || hora > 23 || minuto > 59 || segundo > 59) return false;
  if (m[9] !== undefined && (Number(m[9]) > 14 || Number(m[10]) > 59)) return false;
  const d = new Date(Date.UTC(ano, mes - 1, dia));
  return dia >= 1 && d.getUTCFullYear() === ano && d.getUTCMonth() === mes - 1 && d.getUTCDate() === dia;
}
const ehUuid = v => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(v);

// Devolve { motivo } ou { apos_gravado_em, apos_id_pessoa, quantos }.
export function lerCursor(busca) {
  for (const k of busca.keys()) if (!PARAMETROS_PLANILHA.includes(k)) return { motivo: 'parametro-desconhecido' };
  for (const k of PARAMETROS_PLANILHA) if (busca.getAll(k).length > 1) return { motivo: 'parametro-repetido' };
  const gravado = busca.get('depois_de_gravado_em');
  const pessoa = busca.get('depois_de_id_pessoa');
  const limite = busca.get('limite');
  // o cursor vem inteiro ou não vem (a função do banco também recusa)
  if ((gravado === null) !== (pessoa === null)) return { motivo: 'cursor-pela-metade' };
  if (gravado !== null && !ehHorarioDoCursor(gravado)) return { motivo: 'cursor-horario' };
  if (pessoa !== null && !ehUuid(pessoa)) return { motivo: 'cursor-id-pessoa' };
  let quantos = LIMITE_PLANILHA;
  if (limite !== null) {
    // inteiro de 1 a 200; acima de 200 é recusado, não cortado (22.3)
    if (!/^[0-9]{1,3}$/.test(limite)) return { motivo: 'limite' };
    quantos = Number(limite);
    if (quantos < 1 || quantos > LIMITE_PLANILHA) return { motivo: 'limite' };
  }
  return { apos_gravado_em: gravado, apos_id_pessoa: pessoa, quantos };
}

// ··· Chave da planilha: comparação de tempo constante ···
// Compara os SHA-256 dos dois valores, que têm sempre 32 bytes: o tempo não depende de onde os
// valores diferem nem do tamanho da chave enviada. Usa crypto.subtle.timingSafeEqual, que existe
// no Workers; fora dele (no teste local), um laço XOR que percorre os 32 bytes inteiros.
async function sha256(texto) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto)));
}
export async function chaveConfere(enviada, segredo) {
  if (typeof segredo !== 'string' || segredo.length < CHAVE_PLANILHA_MINIMO) return false;
  if (typeof enviada !== 'string' || enviada === '') return false;
  const [a, b] = await Promise.all([sha256(enviada), sha256(segredo)]);
  if (typeof crypto.subtle.timingSafeEqual === 'function') return crypto.subtle.timingSafeEqual(a, b);
  let diferenca = 0;
  for (let i = 0; i < a.length; i++) diferenca |= a[i] ^ b[i];
  return diferenca === 0;
}

// Só o motivo vai para o registro da Cloudflare; nenhum dado do pacote, dos leads nem do cursor
// (nucleo/regras/seguranca.md, regra 4).
function registrar(motivo) {
  console.log('[garcom] ' + motivo);
}

// ··· Chamada a uma função do banco pela API REST do Supabase ···
function chamarFuncao(nome, corpo, chave, env) {
  const cabecalhos = { 'Content-Type': 'application/json', Accept: 'application/json', apikey: chave };
  // Uma chave antiga (legacy) é um JWT e vai também no Authorization.
  // As chaves novas do Supabase (publicável e secreta) não são JWT e vão só no apikey (18.9).
  if (chave.split('.').length === 3) cabecalhos.Authorization = 'Bearer ' + chave;
  const endereco = env.SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/rpc/' + nome;
  return fetch(endereco, {
    method: 'POST',
    headers: cabecalhos,
    body: JSON.stringify(corpo),
    signal: AbortSignal.timeout(ESPERA_DO_BANCO_MS)
  });
}

// Lê o corpo em partes, somando os bytes. Devolve os bytes, 'tamanho' (passou do máximo; a
// leitura para ali) ou 'leitura' (falhou).
async function lerCorpoLimitado(request) {
  if (!request.body) return new Uint8Array(0);
  const leitor = request.body.getReader();
  const partes = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await leitor.read();
      if (done) break;
      total += value.byteLength;
      if (total > TAMANHO_MAXIMO) {
        leitor.cancel().catch(() => {});
        return 'tamanho';
      }
      partes.push(value);
    }
  } catch {
    return 'leitura';
  }
  const bytes = new Uint8Array(total);
  let pos = 0;
  for (const p of partes) { bytes.set(p, pos); pos += p.byteLength; }
  return bytes;
}

// ··· Porta pública: POST /api/fim-quiz ···
async function portaFimQuiz(request, env) {
  // o navegador manda o Origin sem barra no fim; uma barra no fim do valor da variável é ignorada
  const origemPermitida = (env.ORIGEM_PERMITIDA || '').replace(/\/+$/, '');
  // Só a chave publicável. Sem ela, nada é gravado; a secreta nunca é usada aqui.
  if (!origemPermitida || !env.SUPABASE_URL || !env.SUPABASE_CHAVE_PUBLICAVEL) {
    registrar('fim-quiz: configuracao-incompleta');
    return responder(503, INDISPONIVEL, null);
  }

  // Mesma origem: o protótipo é servido por este Worker, e o navegador manda Origin no POST.
  // Só a origem do próprio protótipo passa; nada de CORS aberto. Isto NÃO protege contra robô:
  // um robô fora do navegador forja o cabeçalho Origin sem esforço. A conferência de origem só
  // barra páginas de outros sites abertas no navegador (log.md, Pendências).
  const origem = request.headers.get('Origin');
  if (origem !== origemPermitida) {
    registrar('fim-quiz: origem');
    return responder(403, RECUSADO, null);
  }
  // Pré-voo: na mesma origem o navegador não manda; fica só para a própria origem, como na v1 (22.2).
  if (request.method === 'OPTIONS') {
    const r = responder(204, null, origemPermitida);
    r.headers.set('Access-Control-Allow-Methods', 'POST');
    r.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    r.headers.set('Access-Control-Max-Age', '600');
    return r;
  }

  // método
  if (request.method !== 'POST') {
    registrar('fim-quiz: metodo');
    const r = responder(405, RECUSADO, origemPermitida);
    r.headers.set('Allow', 'POST, OPTIONS');
    return r;
  }

  // formato do corpo
  const tipoCorpo = (request.headers.get('Content-Type') || '').split(';')[0].trim().toLowerCase();
  if (tipoCorpo !== 'application/json') {
    registrar('fim-quiz: tipo-do-corpo');
    return responder(415, RECUSADO, origemPermitida);
  }

  // tamanho: pelo cabeçalho e, de novo, pelo corpo lido em partes, parando assim que passar
  // do máximo (sem Content-Length, o corpo nunca é lido inteiro na memória)
  const declarado = Number(request.headers.get('Content-Length') || '0');
  if (declarado > TAMANHO_MAXIMO) {
    registrar('fim-quiz: tamanho');
    return responder(413, RECUSADO, origemPermitida);
  }
  const lido = await lerCorpoLimitado(request);
  if (lido === 'tamanho') {
    registrar('fim-quiz: tamanho');
    return responder(413, RECUSADO, origemPermitida);
  }
  if (lido === 'leitura') {
    registrar('fim-quiz: leitura');
    return responder(400, RECUSADO, origemPermitida);
  }

  let pacote;
  try {
    pacote = JSON.parse(new TextDecoder().decode(lido));
  } catch {
    registrar('fim-quiz: json');
    return responder(400, RECUSADO, origemPermitida);
  }

  const motivo = conferirPacote(pacote);
  if (motivo) {
    registrar('fim-quiz: recusado: ' + motivo);
    return responder(422, RECUSADO, origemPermitida);
  }

  // utm fora da lista: grava vazia e registra só os nomes dos campos (5.5; 18.7)
  const esvaziados = esvaziarUtmForaDaLista(pacote);
  if (esvaziados.length) registrar('fim-quiz: utm-fora-da-lista, gravada vazia: ' + esvaziados.join(', '));

  // gravação, só pela função registrar_fim_quiz e só com a chave publicável
  let resposta;
  try {
    resposta = await chamarFuncao('registrar_fim_quiz', { pacote }, env.SUPABASE_CHAVE_PUBLICAVEL, env);
  } catch {
    registrar('fim-quiz: banco-sem-resposta');
    return responder(502, INDISPONIVEL, origemPermitida);
  }
  if (resposta.ok) {
    registrar('fim-quiz: gravado');
    return responder(201, { ok: true }, origemPermitida);
  }
  // O banco recusou (restrição, catálogo) ou falhou. O detalhe fica fora da resposta.
  registrar('fim-quiz: banco-' + resposta.status);
  // 400 e 409 são recusa do pacote (restrição, catálogo); 401 e 403 são chave errada, e
  // o resto é falha do banco: os dois últimos aparecem como serviço indisponível.
  if (resposta.status === 400 || resposta.status === 409) return responder(422, RECUSADO, origemPermitida);
  return responder(502, INDISPONIVEL, origemPermitida);
}

// ··· Porta privada: GET /api/planilha/leads-novos ···
async function portaPlanilha(request, env, url) {
  // A chave vem antes de tudo: sem ela, 401 sem detalhe, qualquer que seja o método ou o cursor.
  // Segredo vazio, ausente ou curto demais no cofre também dá 401 (a porta fica fechada).
  if (!(await chaveConfere(request.headers.get('X-Chave-Planilha'), env.CHAVE_PLANILHA))) {
    registrar('planilha: chave');
    return responder(401, NAO_AUTORIZADO, null);
  }
  if (request.method !== 'GET') {
    registrar('planilha: metodo');
    const r = responder(405, PEDIDO_RECUSADO, null);
    r.headers.set('Allow', 'GET');
    return r;
  }
  if (!env.SUPABASE_URL || !env.SUPABASE_CHAVE_SECRETA) {
    registrar('planilha: configuracao-incompleta');
    return responder(503, INDISPONIVEL, null);
  }

  const cursor = lerCursor(url.searchParams);
  if (cursor.motivo) {
    registrar('planilha: recusado: ' + cursor.motivo);
    return responder(400, PEDIDO_RECUSADO, null);
  }

  // só a função leads_para_planilha e só com a chave secreta
  let resposta;
  try {
    resposta = await chamarFuncao('leads_para_planilha', {
      apos_gravado_em: cursor.apos_gravado_em,
      apos_id_pessoa: cursor.apos_id_pessoa,
      quantos: cursor.quantos
    }, env.SUPABASE_CHAVE_SECRETA, env);
  } catch {
    registrar('planilha: banco-sem-resposta');
    return responder(502, INDISPONIVEL, null);
  }
  if (!resposta.ok) {
    registrar('planilha: banco-' + resposta.status);
    if (resposta.status === 400) return responder(400, PEDIDO_RECUSADO, null);
    return responder(502, INDISPONIVEL, null);
  }
  let leads;
  try {
    leads = await resposta.json();
  } catch {
    registrar('planilha: banco-resposta-ilegivel');
    return responder(502, INDISPONIVEL, null);
  }
  if (!Array.isArray(leads) || leads.length > cursor.quantos || !leads.every(ehObjeto)) {
    registrar('planilha: banco-resposta-fora-do-formato');
    return responder(502, INDISPONIVEL, null);
  }

  // O cursor seguinte é o da última linha, exatamente como veio (com os microssegundos), só com
  // o fuso +00:00 escrito como Z, para poder ir no endereço sem codificar. Lista vazia: null, e
  // quem chama continua com o cursor que já tem.
  let cursorSeguinte = null;
  if (leads.length) {
    const ultimo = leads[leads.length - 1];
    const horario = ultimo.cursor_gravado_em;
    if (!ehTexto(horario) || !ehHorarioDoCursor(horario) || !ehTexto(ultimo.id_pessoa) || !ehUuid(ultimo.id_pessoa)) {
      registrar('planilha: banco-cursor-fora-do-formato');
      return responder(502, INDISPONIVEL, null);
    }
    cursorSeguinte = {
      depois_de_gravado_em: horario.replace(/\+00:00$/, 'Z'),
      depois_de_id_pessoa: ultimo.id_pessoa
    };
  }
  registrar('planilha: ' + leads.length + ' leads');
  return responder(200, {
    leads,
    cursor_seguinte: cursorSeguinte,
    // página cheia: pode haver mais; quem chama pede de novo com o cursor seguinte
    pode_ter_mais: leads.length === cursor.quantos
  }, null);
}

// ··· Charset dos arquivos de texto (v3, pedido 09) ···
// Na Cloudflare, os arquivos chegam como "text/html", sem charset. A página do quiz não tem
// <meta charset> nem doctype (herança do mockup), e o navegador a lia como windows-1252.
const TIPOS_DE_TEXTO = ['text/html', 'text/css', 'text/javascript', 'application/javascript', 'application/x-javascript'];
export function comCharset(tipo) {
  if (!tipo) return tipo;
  const base = tipo.split(';')[0].trim().toLowerCase();
  if (!TIPOS_DE_TEXTO.includes(base)) return tipo;
  if (/;\s*charset\s*=/i.test(tipo)) return tipo;
  return tipo.replace(/;?\s*$/, '') + '; charset=utf-8';
}

// ··· Arquivos do protótipo, pelo binding de assets, com noindex e charset ···
async function arquivos(request, env) {
  if (!env.ASSETS || typeof env.ASSETS.fetch !== 'function') {
    return new Response('nao encontrado', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' }
    });
  }
  let r;
  try {
    r = await env.ASSETS.fetch(request);
  } catch {
    registrar('arquivos: falha');
    return new Response('servico indisponivel', {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' }
    });
  }
  // A resposta dos arquivos não pode ser mexida direto: copia e acrescenta o cabeçalho.
  const copiaResposta = new Response(r.body, r);
  copiaResposta.headers.set('X-Robots-Tag', 'noindex');
  const tipo = copiaResposta.headers.get('Content-Type');
  const tipoCerto = comCharset(tipo);
  if (tipoCerto !== tipo) copiaResposta.headers.set('Content-Type', tipoCerto);
  return copiaResposta;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const caminho = url.pathname;
    // as rotas /api/ vêm antes dos arquivos (#101)
    if (caminho === '/api' || caminho.startsWith('/api/')) {
      if (caminho === ROTA_FIM_QUIZ) return portaFimQuiz(request, env);
      if (caminho === ROTA_PLANILHA) return portaPlanilha(request, env, url);
      registrar('api: rota-desconhecida');
      return responder(404, NAO_ENCONTRADO, null);
    }
    return arquivos(request, env);
  }
};
