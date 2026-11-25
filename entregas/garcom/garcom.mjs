// Garçom do funil-01 · Cloudflare Worker, sem dependências externas
// id: garcom · versao 7 · rascunho · otavio: pendente
// Ver entregas/garcom/README.md. RASCUNHO: a v2 foi publicada no protótipo em 09/11/2026, só com
// leads de teste, e a v4, no mesmo dia, às 19h16 (README do protótipo, "Publicações"). A v5
// (decisão #120) foi ao ar pelo roteiro APLICAR-21, em 15/11/2026. A v6 (decisão #121) só vai ao ar
// pelo roteiro APLICAR-22, depois da migração 003 no banco.
// v6 (#121, 18/11/2026): meta-ads entra na lista de utm_source; o fim do quiz aceita nove campos
// novos, todos opcionais (o pacote de antes continua passando igual): utm_medium, utm_content,
// utm_term, fbclid, fbp, fbc, id_lead, id_qualificado e qualificado. Eles são saneados, nunca
// recusam o lead: utm de texto livre fora do formato vira vazia; fbclid fora do formato vira vazio;
// fbp e fbc fora do formato saem do pacote; os três ids, se não forem coerentes, saem juntos.
// O formato dos pacotes é o da planta do banco (dados/planta/planta.md v4; 23.11).
// v7 (pedido 24, 25/11/2026): (1) proteção contra robô, leve e sem novo operador de dados, nas duas portas
// públicas: o limite de pedidos por IP (limitadores LIMITE_FIM_QUIZ e LIMITE_EVENTO da Cloudflare, no
// wrangler.toml); no fim do quiz, a armadilha e o tempo mínimo entre abrir a página e enviar o contato
// (o bloco "protecao" do pacote, conferido aqui e tirado antes de gravar). (2) Toda recusa das portas
// públicas soma 1 na tabela recusas do banco (migração 004), só com a porta e o motivo, pela função
// registrar_recusa; o limitador LIMITE_REGISTRO segura uma enxurrada de gravações. (3) /api/evento
// aceita utm_medium, utm_content e utm_term, opcionais e saneadas como no fim do quiz (migração 004).
// Nenhuma recusa nova é silenciosa: a página mostra o aviso de falha com "Tentar de novo", e a
// contagem fica no banco. Só vai ao ar pelo roteiro APLICAR-24, depois da migração 004.
//
// Um Worker só para o protótipo (decisão #101): safra-prototipo-funil-01 serve as páginas e o
// garçom no mesmo endereço. As rotas /api/ são atendidas antes dos arquivos.
//
//   POST /api/fim-quiz               porta pública: recebe o pacote do fim do quiz-01, confere
//                                    método, origem, tamanho, formato, etiquetas e consentimento,
//                                    e grava pela função registrar_fim_quiz (dados/banco/esquema.sql)
//                                    com a chave publicável (papel anon; #100)
//   POST /api/evento                 porta pública, v4: a visita, o início do quiz e o clique no
//                                    fim do quiz, sem dado de pessoa e por isso sem aceite; as
//                                    mesmas travas, e grava pela função registrar_evento
//                                    (dados/banco/migracoes/001-v3.sql) com a chave publicável
//                                    (18.4, 18.5, 10.6, 10.8)
//   GET  /api/planilha/leads-novos   porta privada: só com o cabeçalho X-Chave-Planilha certo;
//                                    devolve os leads novos da planilha do SDR pela função
//                                    leads_para_planilha, com a chave secreta (papel service_role; #100)
//   todo o resto                     pedido de página. v5 (#120): no endereço antigo (env.ENDERECO_ANTIGO),
//                                    leva (302) ao endereço novo (env.ORIGEM_PERMITIDA), no mesmo
//                                    caminho, com /quiz virando /analise e a consulta inteira; no
//                                    endereço novo, /quiz e /quiz/ levam (302) a /analise/; o resto
//                                    são os arquivos do protótipo, pelo binding de assets (env.ASSETS)
// As rotas /api/ nunca são redirecionadas, em nenhum endereço: um POST redirecionado se perde, e a
// planilha do SDR chama a porta privada pelo endereço antigo (#120, ponto 3).
//
// Toda resposta leva X-Robots-Tag: noindex (#101). Nenhuma leva cabeçalho de CORS, e o pré-voo
// (OPTIONS) não é atendido: na mesma origem o navegador não precisa dele (v4; 22.2).
// Todo arquivo HTML, CSS ou JavaScript que chega sem charset sai com "; charset=utf-8" (v3, pedido 09).
//
// Segredos: só os nomes. Os valores ficam nas variáveis secretas da Cloudflare (o cofre):
//   env.SUPABASE_CHAVE_PUBLICAVEL  chave publicável do Supabase; só a porta pública usa
//   env.SUPABASE_CHAVE_SECRETA     chave secreta do Supabase; só a porta privada usa
//   env.CHAVE_PLANILHA             abre a porta privada; mora também nas propriedades do script da planilha
// Variáveis comuns, que não são segredo:
//   env.SUPABASE_URL               endereço do projeto no Supabase
//   env.ORIGEM_PERMITIDA           o próprio endereço do protótipo (mesma origem); desde a v5, o endereço novo
//   env.ENDERECO_ANTIGO            v5: o endereço antigo do protótipo, de onde as páginas levam ao novo.
//                                  Sem ela, ou com ela igual ao endereço novo, nenhum pedido muda de endereço
//
// Destino dos contatos em conflito (conflito-17): este código segue o lado 2 (banco e planilha
// da #90). Bloqueado para entrega até a decisão.

// ··· Listas fechadas (funis/funil-01/funil.md, "Origens e links"; dados/planta/planta.md) ···
const FUNIS = ['funil-01'];
const UTM_ACEITAS = {
  utm_source: ['stories', 'bio', 'reels', 'email', 'whatsapp', 'meta-ads'],  // meta-ads fora da reserva desde a v6 (#121)
  utm_campaign: ['funil-01']
};
const FAIXAS = ['a', 'b', 'c', 'eliminatorio'];
const SIM_NAO = ['sim', 'nao'];
// Tipos de cada porta pública (planta v4, "Tipos de evento"). O fim do quiz só entra por
// /api/fim-quiz; a visita, o início do quiz e o clique no fim do quiz, só por /api/evento.
const TIPOS_FIM_QUIZ = ['fim_quiz'];
const TIPOS_EVENTO = ['visita', 'inicio_quiz', 'interesse_pos_relatorio'];
// O que a pessoa clicou no fim do quiz: a mesma lista da restrição eventos_clique_lista do banco.
// PROPOSTA (31.15; 32.1): se a lista mudar, muda aqui e numa migração nova, juntos.
const CLIQUES_FIM_QUIZ = ['quero-conversa', 'chamar-whatsapp', 'tenho-interesse', 'agora-nao'];

// ··· Limites ···
const TAMANHO_MAXIMO = 16 * 1024;  // bytes; o pacote do exemplo tem perto de 2 KB
const TAMANHO_MAXIMO_EVENTO = 2 * 1024;  // bytes; o pacote de um evento tem perto de 300 (33.2)
const ESPERA_DO_BANCO_MS = 8000;
const LIMITE_PLANILHA = 200;       // o mesmo teto de leads_para_planilha
const CHAVE_PLANILHA_MINIMO = 32;  // segredo mais curto que isto no cofre não abre a porta (22.4)
// v7 (pedido 24): a proteção do fim do quiz. Pessoa nenhuma termina o quiz (umas 20 perguntas e o contato) em
// menos de 20 segundos; o robô que preenche formulário termina num instante e preenche a armadilha.
const TEMPO_MINIMO_S = 20;
const DURACAO_MAXIMA_S = 7 * 24 * 3600;   // uma aba aberta por uma semana ainda vale
const ARMADILHA_MAXIMO = 200;

// ··· Rotas ···
const ROTA_FIM_QUIZ = '/api/fim-quiz';
const ROTA_EVENTO = '/api/evento';   // a planta não dá o nome da rota (33.1)
const ROTA_PLANILHA = '/api/planilha/leads-novos';

// ··· Endereço e caminho novos (v5; decisão #120) ···
// O quiz saiu de /quiz/ e foi para /analise/. O prefixo é trocado: /quiz e /quiz/ viram /analise/, e
// /quiz/qualquer-coisa vira /analise/qualquer-coisa. Qualquer outro caminho fica como veio.
const CAMINHO_ANTIGO_DO_QUIZ = '/quiz';
const CAMINHO_DO_QUIZ = '/analise';
export function caminhoNovo(caminho) {
  if (caminho === CAMINHO_ANTIGO_DO_QUIZ) return CAMINHO_DO_QUIZ + '/';
  if (caminho.startsWith(CAMINHO_ANTIGO_DO_QUIZ + '/')) return CAMINHO_DO_QUIZ + caminho.slice(CAMINHO_ANTIGO_DO_QUIZ.length);
  return caminho;
}
// O nome do endereço (o host, sem a porta) de uma variável como ORIGEM_PERMITIDA, em minúsculas, que é
// como new URL o devolve. Variável ausente, vazia ou que não é endereço: ''.
function nomeDoEndereco(valor) {
  try { return new URL(valor).hostname; } catch { return ''; }
}
// Redirecionamento temporário (302, porque ainda é protótipo; #120), com noindex e sem CORS
function levar(destino) {
  return new Response(null, {
    status: 302,
    headers: { Location: destino, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }
  });
}

// ··· Campos aceitos: nada além disto entra ···
// v6 (#121): os campos opcionais do fim do quiz, só nele (a visita, o início e o clique não levam)
const CAMPOS_ORIGEM_E_IDS = ['utm_medium', 'utm_content', 'utm_term', 'fbclid', 'fbp', 'fbc', 'id_lead', 'id_qualificado', 'qualificado'];
const CAMPOS_PESSOA = [
  'nome', 'telefone', 'email', 'empresa',
  'consentimento_whatsapp', 'consentimento_email', 'consentimento_texto', 'consentimento_em',
  'primeira_utm_source', 'primeira_utm_campaign'
];
const CAMPOS_EVENTO = [
  'tipo', 'funil', 'entrega', 'versao_entrega', 'utm_source', 'utm_campaign',
  'id_sessao', 'ocorrido_em', 'respostas', 'lead_score_nota', 'lead_score_faixa', 'lead_score_versao',
  // v6 (#121): opcionais; quem não manda continua passando (migração 003; planta v5)
  ...CAMPOS_ORIGEM_E_IDS
];
// Campos do evento sem pessoa (/api/evento): os mesmos que registrar_evento aceita, e nada mais
const CAMPOS_EVENTO_SEM_PESSOA = [
  'tipo', 'funil', 'entrega', 'versao_entrega', 'utm_source', 'utm_campaign',
  'id_sessao', 'ocorrido_em', 'clique_fim_quiz',
  // v7 (pedido 24): opcionais; quem não manda continua passando (migração 004)
  'utm_medium', 'utm_content', 'utm_term'
];
// Campos que levam dado de pessoa: nunca entram por /api/evento
const CAMPOS_COM_DADO_DE_PESSOA = [...CAMPOS_PESSOA, 'respostas', 'lead_score_nota', 'lead_score_faixa'];
// Parâmetros aceitos na porta privada: nada além disto
const PARAMETROS_PLANILHA = ['depois_de_gravado_em', 'depois_de_id_pessoa', 'limite'];

// ··· Respostas: curtas, sem detalhe interno, sempre com noindex, sem CORS (v4; 22.2) ···
function responder(status, corpo) {
  const cabecalhos = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex'
  };
  return new Response(JSON.stringify(corpo), { status, headers: cabecalhos });
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
const UTM_DO_EVENTO = [
  ['evento', 'utm_source', 'utm_source'], ['evento', 'utm_campaign', 'utm_campaign']
];
const UTM_DO_PACOTE = [
  ...UTM_DO_EVENTO,
  ['pessoa', 'primeira_utm_source', 'utm_source'], ['pessoa', 'primeira_utm_campaign', 'utm_campaign']
];
// Esvazia a utm que veio fora da lista e devolve os nomes dos campos esvaziados (nunca o valor).
// Chamar só depois de conferirPacote (fim do quiz) ou de conferirEvento (com UTM_DO_EVENTO).
export function esvaziarUtmForaDaLista(pacote, campos = UTM_DO_PACOTE) {
  const esvaziados = [];
  for (const [parte, campo, lista] of campos) {
    const v = pacote[parte][campo];
    if (v !== '' && !UTM_ACEITAS[lista].includes(v)) {
      pacote[parte][campo] = '';
      esvaziados.push(campo);
    }
  }
  return esvaziados;
}

// v6 (#121): saneia os campos opcionais do fim do quiz, sem nunca recusar o lead por causa deles.
// Chamar só depois de conferirPacote. Devolve os nomes dos campos mexidos (nunca o valor).
//   utm_medium, utm_content, utm_term: minúsculas; só letras, números, hífen e sublinhado, até 100;
//     fora disso (ou que não seja texto), vazio. Ausente continua ausente (o banco grava vazio).
//   fbclid: letras (maiúsculas e minúsculas), números, hífen e sublinhado, até 500; fora disso, vazio.
//   fbp e fbc: só no formato fb.N.N.xxx, até 500; fora disso, saem do pacote.
//   id_lead, id_qualificado e qualificado: valem juntos. id_lead no formato lead-<ms>-<sorte>,
//     qualificado verdadeiro ou falso, e id_qualificado (qualificado-<ms>-<sorte>) só quando
//     verdadeiro. Se algo não bater, os três saem do pacote e o lead é gravado sem eles.
const UTM_LIVRE = /^[a-z0-9_-]{1,100}$/;
const FBCLID = /^[A-Za-z0-9_-]{1,500}$/;
const COOKIE_META = /^fb\.[0-9]+\.[0-9]+\.[A-Za-z0-9_.-]+$/;
const ID_LEAD = /^lead-[0-9]{10,16}-[a-z0-9]{4,32}$/;
const ID_QUALIFICADO = /^qualificado-[0-9]{10,16}-[a-z0-9]{4,32}$/;
const tem = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
// As três utm de texto livre: minúsculas; só letras, números, hífen e sublinhado, até 100; fora disso, vazio.
// Ausente continua ausente (o banco grava vazio). v7: a mesma regra no fim do quiz e em /api/evento.
function sanearUtmLivres(e, mexidos) {
  for (const k of ['utm_medium', 'utm_content', 'utm_term']) {
    if (!tem(e, k)) continue;
    const v = ehTexto(e[k]) ? e[k].trim().toLowerCase() : '';
    const limpo = v === '' || UTM_LIVRE.test(v) ? v : '';
    if (limpo !== e[k]) mexidos.push(k);
    e[k] = limpo;
  }
  return mexidos;
}
// v7 (pedido 24): /api/evento saneia as três utm de texto livre, sem nunca recusar o evento por elas.
// Chamar só depois de conferirEvento. Devolve os nomes dos campos mexidos (nunca o valor).
export function sanearEvento(pacote) {
  return sanearUtmLivres(pacote.evento, []);
}
export function sanearOrigemEIds(pacote) {
  const e = pacote.evento, mexidos = [];
  sanearUtmLivres(e, mexidos);
  if (tem(e, 'fbclid')) {
    const v = ehTexto(e.fbclid) ? e.fbclid.trim() : '';
    const limpo = v === '' || FBCLID.test(v) ? v : '';
    if (limpo !== e.fbclid) mexidos.push('fbclid');
    e.fbclid = limpo;
  }
  for (const k of ['fbp', 'fbc']) {
    if (!tem(e, k)) continue;
    if (e[k] === '' || !ehTexto(e[k]) || e[k].length > 500 || !COOKIE_META.test(e[k])) {
      if (e[k] !== '') mexidos.push(k);
      delete e[k];
    }
  }
  if (tem(e, 'id_qualificado') && e.id_qualificado === '') delete e.id_qualificado;
  if (tem(e, 'id_lead') || tem(e, 'id_qualificado') || tem(e, 'qualificado')) {
    const coerente = ehTexto(e.id_lead) && ID_LEAD.test(e.id_lead) && typeof e.qualificado === 'boolean' &&
      (e.qualificado ? ehTexto(e.id_qualificado) && ID_QUALIFICADO.test(e.id_qualificado) : !tem(e, 'id_qualificado'));
    if (!coerente) {
      for (const k of ['id_lead', 'id_qualificado', 'qualificado']) if (tem(e, k)) { delete e[k]; mexidos.push(k); }
    }
  }
  return mexidos;
}

// Etiquetas obrigatórias em todo evento (planta v4, "Etiquetas obrigatórias em todo evento"):
// funil, entrega, versão e as duas utm, com a chave presente. Utm presente e vazia conta como
// etiqueta (10.8). Devolve o motivo ou null.
function conferirEtiquetas(e) {
  if (!temCampos(e, ['funil', 'entrega', 'versao_entrega', 'utm_source', 'utm_campaign'])) return 'etiqueta-faltando';
  if (!FUNIS.includes(e.funil)) return 'etiqueta-funil';
  if (!ehTexto(e.entrega) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.entrega) || e.entrega.length > 60) return 'etiqueta-entrega';
  if (!ehInteiro(e.versao_entrega, 1, 9999)) return 'etiqueta-versao';
  if (!utmOk(e.utm_source) || !utmOk(e.utm_campaign)) return 'utm-formato';
  // o par entrega e versão é conferido no catálogo pelo próprio banco (chave estrangeira; 18.8)
  return null;
}

// Pacote de /api/evento: { "evento": { ... } }, sem pessoa e sem aceite (planta v4; 18.5).
// Devolve o motivo da recusa (só para o registro interno) ou null.
export function conferirEvento(pacote) {
  if (!ehObjeto(pacote)) return 'formato';
  if (Object.prototype.hasOwnProperty.call(pacote, 'pessoa')) return 'dado-de-pessoa';
  if (!soCampos(pacote, ['evento'])) return 'formato';
  const e = pacote.evento;
  if (!ehObjeto(e)) return 'formato';
  if (Object.keys(e).some(k => CAMPOS_COM_DADO_DE_PESSOA.includes(k))) return 'dado-de-pessoa';
  if (!soCampos(e, CAMPOS_EVENTO_SEM_PESSOA)) return 'campo-desconhecido';

  const etiquetas = conferirEtiquetas(e);
  if (etiquetas) return etiquetas;

  if (!TIPOS_EVENTO.includes(e.tipo)) return 'tipo';
  // a sessão é obrigatória: é ela que liga o evento ao fim do quiz (6.2; 18.5)
  if (!ehTexto(e.id_sessao) || !/^sessao-[a-z0-9-]{1,60}$/.test(e.id_sessao)) return 'sessao';
  if (!ehData(e.ocorrido_em)) return 'data-evento';

  // o clique leva o que foi clicado, da lista; os outros tipos não levam clique
  if (e.tipo === 'interesse_pos_relatorio') {
    if (!CLIQUES_FIM_QUIZ.includes(e.clique_fim_quiz)) return 'clique';
  } else if (Object.prototype.hasOwnProperty.call(e, 'clique_fim_quiz')) {
    return 'clique-fora-do-tipo';
  }
  // Se a sessão tem o fim do quiz de uma pessoa só, quem confere é o banco: o garçom não lê
  // tabela nenhuma. Sem isso, o clique volta recusado (registrar_evento; 32.2).
  return null;
}

// Pacote de /api/fim-quiz. Devolve o motivo da recusa (só para o registro interno, nunca para
// quem enviou) ou null.
export function conferirPacote(pacote) {
  if (!ehObjeto(pacote) || !soCampos(pacote, ['pessoa', 'evento', 'protecao'])) return 'formato';
  // v7 (pedido 24): o bloco da proteção é obrigatório e só tem a armadilha e a duração
  const pr = pacote.protecao;
  if (pr === undefined) return 'protecao-faltando';
  if (!ehObjeto(pr) || !soCampos(pr, ['armadilha', 'duracao_s']) || !ehTexto(pr.armadilha) || pr.armadilha.length > ARMADILHA_MAXIMO
      || !ehInteiro(pr.duracao_s, 0, DURACAO_MAXIMA_S)) return 'protecao-formato';
  const p = pacote.pessoa, e = pacote.evento;
  if (!ehObjeto(p) || !ehObjeto(e)) return 'formato';
  if (!soCampos(p, CAMPOS_PESSOA) || !soCampos(e, CAMPOS_EVENTO)) return 'campo-desconhecido';

  const etiquetas = conferirEtiquetas(e);
  if (etiquetas) return etiquetas;

  // evento
  if (!TIPOS_FIM_QUIZ.includes(e.tipo)) return 'tipo';
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

// v7 (pedido 24): a proteção do fim do quiz, depois de conferirPacote. Devolve o motivo da recusa ou null.
//   armadilha     o campo que pessoa nenhuma vê veio preenchido
//   rapido-demais menos de TEMPO_MINIMO_S segundos entre abrir a página e enviar o contato
export function conferirProtecao(pacote) {
  const pr = pacote.protecao;
  if (pr.armadilha.trim() !== '') return 'armadilha';
  if (pr.duracao_s < TEMPO_MINIMO_S) return 'rapido-demais';
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
async function lerCorpoLimitado(request, maximo) {
  if (!request.body) return new Uint8Array(0);
  const leitor = request.body.getReader();
  const partes = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await leitor.read();
      if (done) break;
      total += value.byteLength;
      if (total > maximo) {
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

// ··· As duas portas públicas: as mesmas travas, cada uma com o seu pacote e a sua função ···
//   nome      prefixo do registro ('fim-quiz' ou 'evento')
//   maximo    tamanho máximo do corpo, em bytes
//   conferir  conferência do pacote (devolve o motivo ou null)
//   utm       campos de utm que, fora da lista, são gravados vazios (5.5)
//   funcao    a função do banco que grava
//   sanear    saneia os campos opcionais e devolve os nomes mexidos (o fim do quiz desde a v6; o evento desde a v7)
//   protecao  (só o fim do quiz, v7) a armadilha e o tempo mínimo; o bloco sai do pacote antes de gravar
//   limite    (v7) o nome do limitador da Cloudflare desta porta (wrangler.toml, [[ratelimits]])
const PORTA_FIM_QUIZ = {
  nome: 'fim-quiz', maximo: TAMANHO_MAXIMO, conferir: p => conferirPacote(p),
  utm: UTM_DO_PACOTE, funcao: 'registrar_fim_quiz', sanear: p => sanearOrigemEIds(p),
  protecao: p => conferirProtecao(p), limite: 'LIMITE_FIM_QUIZ'
};
const PORTA_EVENTO = {
  nome: 'evento', maximo: TAMANHO_MAXIMO_EVENTO, conferir: p => conferirEvento(p),
  utm: UTM_DO_EVENTO, funcao: 'registrar_evento', sanear: p => sanearEvento(p), limite: 'LIMITE_EVENTO'
};

// v7 (pedido 24): o limite de pedidos por IP, pelo limitador da Cloudflare (Workers Rate Limiting, GA desde 19/09/2025;
// documentação lida em 25/11/2026). A chave é o IP de quem pede (cabeçalho CF-Connecting-IP), que fica só no limitador
// da Cloudflare, por um minuto, e não vai a registro nem ao banco. O limite vale por local da Cloudflare e é aproximado.
// Folgado de propósito: no celular, muita gente sai pelo mesmo IP da operadora. Sem o limitador (o contorno Node do
// ensaio, os testes) ou com ele em falha, ninguém é limitado: na dúvida, o lead passa.
async function dentroDoLimite(limitador, request) {
  if (!limitador || typeof limitador.limit !== 'function') return true;
  const ip = request.headers.get('CF-Connecting-IP') || 'sem-ip';
  try {
    const r = await limitador.limit({ key: ip });
    return !r || r.success !== false;
  } catch {
    return true;
  }
}

// v7 (pedido 24): soma 1 recusa na tabela recusas (migração 004), só com a porta e o motivo (código fixo deste
// arquivo; fora do formato, "outro"). Para uma enxurrada de recusas não virar uma enxurrada de gravações, o limitador
// LIMITE_REGISTRO (por porta e motivo, 30 por minuto em cada local) deixa passar só as primeiras: as outras ficam só no
// registro da Cloudflare, como "recusa-nao-contada". Se o banco falhar, a recusa também só fica no registro.
// Nunca atrasa a resposta: com o ctx do Worker, roda depois dela (waitUntil); sem ele (testes), devolve a promessa.
const MOTIVO_GRAVAVEL = /^[a-z]+(-[a-z]+)*$/;
export function contarRecusa(env, ctx, porta, motivo) {
  const m = MOTIVO_GRAVAVEL.test(motivo) && motivo.length <= 40 ? motivo : 'outro';
  const tarefa = (async () => {
    if (!env.SUPABASE_URL || !env.SUPABASE_CHAVE_PUBLICAVEL) return;
    const lim = env.LIMITE_REGISTRO;
    if (lim && typeof lim.limit === 'function') {
      try {
        const r = await lim.limit({ key: porta + ':' + m });
        if (r && r.success === false) { registrar(porta + ': recusa-nao-contada: ' + m); return; }
      } catch { /* sem o limitador, conta */ }
    }
    try {
      const resposta = await chamarFuncao('registrar_recusa', { porta, motivo: m }, env.SUPABASE_CHAVE_PUBLICAVEL, env);
      if (!resposta.ok) registrar(porta + ': recusa-nao-contada: banco-' + resposta.status);
    } catch {
      registrar(porta + ': recusa-nao-contada: banco-sem-resposta');
    }
  })();
  if (ctx && typeof ctx.waitUntil === 'function') { ctx.waitUntil(tarefa); return null; }
  return tarefa;
}

async function portaPublica(request, env, porta, ctx) {
  const nome = porta.nome;
  // v7: toda recusa soma 1 na contagem do banco (contarRecusa), além do registro da Cloudflare
  const recusa = async (status, corpo, motivo, registro) => {
    registrar(nome + ': ' + (registro || motivo));
    const t = contarRecusa(env, ctx, nome, motivo);
    if (t) await t;
    return responder(status, corpo);
  };
  // o navegador manda o Origin sem barra no fim; uma barra no fim do valor da variável é ignorada
  const origemPermitida = (env.ORIGEM_PERMITIDA || '').replace(/\/+$/, '');
  // Só a chave publicável. Sem ela, nada é gravado; a secreta nunca é usada aqui.
  if (!origemPermitida || !env.SUPABASE_URL || !env.SUPABASE_CHAVE_PUBLICAVEL) {
    registrar(nome + ': configuracao-incompleta');
    return responder(503, INDISPONIVEL);
  }

  // v7 (pedido 24): o limite de pedidos por IP, antes de tudo (é o que segura uma enxurrada)
  if (!(await dentroDoLimite(env[porta.limite], request))) {
    const r = await recusa(429, RECUSADO, 'limite');
    r.headers.set('Retry-After', '60');
    return r;
  }

  // Mesma origem: o protótipo é servido por este Worker, e o navegador manda Origin no POST.
  // Só a origem do próprio protótipo passa; nada de CORS. Isto NÃO protege contra robô:
  // um robô fora do navegador forja o cabeçalho Origin sem esforço. A conferência de origem só
  // barra páginas de outros sites abertas no navegador (log.md, Pendências).
  const origem = request.headers.get('Origin');
  if (origem !== origemPermitida) return recusa(403, RECUSADO, 'origem');

  // método: só POST. O pré-voo (OPTIONS) saiu na v4 e cai aqui, como qualquer outro (22.2).
  if (request.method !== 'POST') {
    const r = await recusa(405, RECUSADO, 'metodo');
    r.headers.set('Allow', 'POST');
    return r;
  }

  // formato do corpo
  const tipoCorpo = (request.headers.get('Content-Type') || '').split(';')[0].trim().toLowerCase();
  if (tipoCorpo !== 'application/json') return recusa(415, RECUSADO, 'tipo-do-corpo');

  // tamanho: pelo cabeçalho e, de novo, pelo corpo lido em partes, parando assim que passar
  // do máximo (sem Content-Length, o corpo nunca é lido inteiro na memória)
  const declarado = Number(request.headers.get('Content-Length') || '0');
  if (declarado > porta.maximo) return recusa(413, RECUSADO, 'tamanho');
  const lido = await lerCorpoLimitado(request, porta.maximo);
  if (lido === 'tamanho') return recusa(413, RECUSADO, 'tamanho');
  if (lido === 'leitura') return recusa(400, RECUSADO, 'leitura');

  let pacote;
  try {
    pacote = JSON.parse(new TextDecoder().decode(lido));
  } catch {
    return recusa(400, RECUSADO, 'json');
  }

  const motivo = porta.conferir(pacote);
  if (motivo) return recusa(422, RECUSADO, motivo, 'recusado: ' + motivo);

  // v7 (pedido 24): a armadilha e o tempo mínimo (só o fim do quiz). O bloco sai do pacote antes de gravar.
  if (porta.protecao) {
    const suspeito = porta.protecao(pacote);
    if (suspeito) return recusa(422, RECUSADO, suspeito, 'recusado: ' + suspeito);
    delete pacote.protecao;
  }

  // utm fora da lista: grava vazia e registra só os nomes dos campos (5.5; 18.7)
  const esvaziados = esvaziarUtmForaDaLista(pacote, porta.utm);
  if (esvaziados.length) registrar(nome + ': utm-fora-da-lista, gravada vazia: ' + esvaziados.join(', '));
  // v6 (#121): os campos opcionais do fim do quiz, saneados; v7: também os do evento; registra só os nomes
  if (porta.sanear) {
    const mexidos = porta.sanear(pacote);
    if (mexidos.length) registrar(nome + ': saneado: ' + mexidos.join(', '));
  }

  // gravação, só pela função da porta e só com a chave publicável
  let resposta;
  try {
    resposta = await chamarFuncao(porta.funcao, { pacote }, env.SUPABASE_CHAVE_PUBLICAVEL, env);
  } catch {
    return recusa(502, INDISPONIVEL, 'banco-sem-resposta');
  }
  if (resposta.ok) {
    registrar(nome + ': gravado');
    return responder(201, { ok: true });
  }
  // O banco recusou (restrição, catálogo, clique sem fim do quiz na sessão) ou falhou. O detalhe
  // fica fora da resposta.
  // 400 e 409 são recusa do pacote (restrição, catálogo); 401 e 403 são chave errada, e
  // o resto é falha do banco: os dois últimos aparecem como serviço indisponível.
  if (resposta.status === 400 || resposta.status === 409) return recusa(422, RECUSADO, 'banco-recusou', 'banco-' + resposta.status);
  return recusa(502, INDISPONIVEL, 'banco-falhou', 'banco-' + resposta.status);
}

// ··· Porta privada: GET /api/planilha/leads-novos ···
async function portaPlanilha(request, env, url) {
  // A chave vem antes de tudo: sem ela, 401 sem detalhe, qualquer que seja o método ou o cursor.
  // Segredo vazio, ausente ou curto demais no cofre também dá 401 (a porta fica fechada).
  if (!(await chaveConfere(request.headers.get('X-Chave-Planilha'), env.CHAVE_PLANILHA))) {
    registrar('planilha: chave');
    return responder(401, NAO_AUTORIZADO);
  }
  if (request.method !== 'GET') {
    registrar('planilha: metodo');
    const r = responder(405, PEDIDO_RECUSADO);
    r.headers.set('Allow', 'GET');
    return r;
  }
  if (!env.SUPABASE_URL || !env.SUPABASE_CHAVE_SECRETA) {
    registrar('planilha: configuracao-incompleta');
    return responder(503, INDISPONIVEL);
  }

  const cursor = lerCursor(url.searchParams);
  if (cursor.motivo) {
    registrar('planilha: recusado: ' + cursor.motivo);
    return responder(400, PEDIDO_RECUSADO);
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
    return responder(502, INDISPONIVEL);
  }
  if (!resposta.ok) {
    registrar('planilha: banco-' + resposta.status);
    if (resposta.status === 400) return responder(400, PEDIDO_RECUSADO);
    return responder(502, INDISPONIVEL);
  }
  let leads;
  try {
    leads = await resposta.json();
  } catch {
    registrar('planilha: banco-resposta-ilegivel');
    return responder(502, INDISPONIVEL);
  }
  if (!Array.isArray(leads) || leads.length > cursor.quantos || !leads.every(ehObjeto)) {
    registrar('planilha: banco-resposta-fora-do-formato');
    return responder(502, INDISPONIVEL);
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
      return responder(502, INDISPONIVEL);
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
  });
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
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const caminho = url.pathname;
    // as rotas /api/ vêm antes dos arquivos (#101)
    if (caminho === '/api' || caminho.startsWith('/api/')) {
      if (caminho === ROTA_FIM_QUIZ) return portaPublica(request, env, PORTA_FIM_QUIZ, ctx);
      if (caminho === ROTA_EVENTO) return portaPublica(request, env, PORTA_EVENTO, ctx);
      if (caminho === ROTA_PLANILHA) return portaPlanilha(request, env, url);
      registrar('api: rota-desconhecida');
      return responder(404, NAO_ENCONTRADO);
    }
    // v5 (#120): daqui para baixo, pedido de página. As rotas /api/ já foram atendidas acima.
    const novo = caminhoNovo(caminho);
    // No endereço antigo, a página leva ao endereço novo, no mesmo caminho, com a consulta inteira.
    // Só com as duas variáveis no lugar e de nomes diferentes: no endereço novo, nada volta ao antigo.
    const origemNova = String(env.ORIGEM_PERMITIDA || '').replace(/\/+$/, '');
    const antigo = nomeDoEndereco(env.ENDERECO_ANTIGO);
    const nomeNovo = nomeDoEndereco(origemNova);
    // o nome do pedido sem o ponto final que um nome completo pode trazer ("nome.workers.dev.")
    const nomeDoPedido = url.hostname.replace(/\.$/, '');
    if (antigo && nomeNovo && antigo !== nomeNovo && nomeDoPedido === antigo) {
      return levar(origemNova + novo + url.search);
    }
    // No endereço novo, /quiz e /quiz/ levam a /analise/, com a consulta inteira
    if (novo !== caminho) return levar(novo + url.search);
    return arquivos(request, env);
  }
};
