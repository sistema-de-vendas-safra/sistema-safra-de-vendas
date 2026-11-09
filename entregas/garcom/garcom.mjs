// Garçom do funil-01 · Cloudflare Worker, sem dependências externas
// id: garcom · versao 1 · rascunho · otavio: pendente
// Ver entregas/garcom/README.md. RASCUNHO: nunca foi publicado nem ligado a um banco real.
//
// O que faz (funis/funil-01/funil.md, "Caminho do dado", passo 2):
//   recebe o pacote do fim do quiz-01 (montarPacote, em entregas/quizzes/quiz-01/pagina/index.html),
//   confere método, tamanho, formato, etiquetas e consentimento,
//   e grava no banco pela função registrar_fim_quiz (dados/banco/esquema.sql).
//
// Segredos: só os nomes. Os valores ficam nas variáveis secretas da Cloudflare (o cofre):
//   env.SUPABASE_URL          endereço do projeto no Supabase
//   env.SUPABASE_SERVICE_KEY  chave do papel de serviço; nunca vai para a página nem para o navegador
//   env.ORIGEM_PERMITIDA      a única origem (endereço da página do quiz) que pode enviar
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

// ··· Respostas: curtas, sem detalhe interno ···
function responder(status, corpo, origem) {
  const cabecalhos = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  };
  if (origem) {
    cabecalhos['Access-Control-Allow-Origin'] = origem;
    cabecalhos['Vary'] = 'Origin';
  }
  return new Response(corpo === null ? null : JSON.stringify(corpo), { status, headers: cabecalhos });
}
const RECUSADO = { ok: false, erro: 'pacote recusado' };
const INDISPONIVEL = { ok: false, erro: 'servico indisponivel' };

// ··· Conferências ···
const ehTexto = v => typeof v === 'string';
const ehObjeto = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const ehInteiro = (v, min, max) => Number.isInteger(v) && v >= min && v <= max;
const ehData = v => ehTexto(v) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/.test(v) && !Number.isNaN(Date.parse(v));
const soCampos = (obj, lista) => Object.keys(obj).every(k => lista.includes(k));
const temCampos = (obj, lista) => lista.every(k => Object.prototype.hasOwnProperty.call(obj, k));
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
  if (!ehTexto(p.telefone) || !/^\+[0-9 ()-]{8,30}$/.test(p.telefone)) return 'telefone';
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

// Só o motivo vai para o registro da Cloudflare; nenhum dado do pacote (nucleo/regras/seguranca.md, regra 4).
function registrar(motivo) {
  console.log('[garcom] ' + motivo);
}

// ··· Gravação no banco: só a função registrar_fim_quiz (dados/banco/esquema.sql) ···
async function gravarNoBanco(pacote, env) {
  const chave = env.SUPABASE_SERVICE_KEY;
  const cabecalhos = { 'Content-Type': 'application/json', apikey: chave };
  // A chave antiga do papel de serviço é um JWT e vai também no Authorization.
  // A chave secreta nova do Supabase não é JWT e vai só no apikey (18.9).
  if (chave.split('.').length === 3) cabecalhos.Authorization = 'Bearer ' + chave;
  const endereco = env.SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/rpc/registrar_fim_quiz';
  return fetch(endereco, {
    method: 'POST',
    headers: cabecalhos,
    body: JSON.stringify({ pacote }),
    signal: AbortSignal.timeout(ESPERA_DO_BANCO_MS)
  });
}

export default {
  async fetch(request, env) {
    const origemPermitida = env.ORIGEM_PERMITIDA;
    if (!origemPermitida || !env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
      registrar('configuracao-incompleta');
      return responder(503, INDISPONIVEL, null);
    }

    // CORS: só a origem da página do quiz
    const origem = request.headers.get('Origin');
    if (origem !== origemPermitida) {
      registrar('origem');
      return responder(403, RECUSADO, null);
    }
    if (request.method === 'OPTIONS') {
      const r = responder(204, null, origemPermitida);
      r.headers.set('Access-Control-Allow-Methods', 'POST');
      r.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      r.headers.set('Access-Control-Max-Age', '600');
      return r;
    }

    // método
    if (request.method !== 'POST') {
      registrar('metodo');
      const r = responder(405, RECUSADO, origemPermitida);
      r.headers.set('Allow', 'POST, OPTIONS');
      return r;
    }

    // formato do corpo
    const tipoCorpo = (request.headers.get('Content-Type') || '').toLowerCase();
    if (!tipoCorpo.startsWith('application/json')) {
      registrar('tipo-do-corpo');
      return responder(415, RECUSADO, origemPermitida);
    }

    // tamanho: pelo cabeçalho e, de novo, pelo corpo lido
    const declarado = Number(request.headers.get('Content-Length') || '0');
    if (declarado > TAMANHO_MAXIMO) {
      registrar('tamanho');
      return responder(413, RECUSADO, origemPermitida);
    }
    let bruto;
    try {
      bruto = await request.arrayBuffer();
    } catch {
      registrar('leitura');
      return responder(400, RECUSADO, origemPermitida);
    }
    if (bruto.byteLength > TAMANHO_MAXIMO) {
      registrar('tamanho');
      return responder(413, RECUSADO, origemPermitida);
    }

    let pacote;
    try {
      pacote = JSON.parse(new TextDecoder().decode(bruto));
    } catch {
      registrar('json');
      return responder(400, RECUSADO, origemPermitida);
    }

    const motivo = conferirPacote(pacote);
    if (motivo) {
      registrar('recusado: ' + motivo);
      return responder(422, RECUSADO, origemPermitida);
    }

    // utm fora da lista: grava vazia e registra só os nomes dos campos (5.5; 18.7)
    const esvaziados = esvaziarUtmForaDaLista(pacote);
    if (esvaziados.length) registrar('utm-fora-da-lista, gravada vazia: ' + esvaziados.join(', '));

    // gravação
    let resposta;
    try {
      resposta = await gravarNoBanco(pacote, env);
    } catch {
      registrar('banco-sem-resposta');
      return responder(502, INDISPONIVEL, origemPermitida);
    }
    if (resposta.ok) return responder(201, { ok: true }, origemPermitida);
    // O banco recusou (restrição, catálogo) ou falhou. O detalhe fica fora da resposta.
    registrar('banco-' + resposta.status);
    // 400 e 409 são recusa do pacote (restrição, catálogo); 401 e 403 são chave errada, e
    // o resto é falha do banco: os dois últimos aparecem como serviço indisponível.
    if (resposta.status === 400 || resposta.status === 409) return responder(422, RECUSADO, origemPermitida);
    return responder(502, INDISPONIVEL, origemPermitida);
  }
};
