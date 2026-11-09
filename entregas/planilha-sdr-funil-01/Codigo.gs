/*
 * ---
 * id: planilha-sdr-funil-01
 * versao: 2
 * status: rascunho
 * aprovado_por:
 *   otavio: pendente
 * depende_de:
 *   - id: funil-01-planilha-sdr
 *     versao: 2
 *   - id: garcom
 *     versao: 2
 *   - id: banco-rascunho
 *     versao: 3
 *   - id: regra-seguranca
 *     versao: 2
 *   - id: decisoes
 *     versao: 4
 * desatualizado: true
 * ---
 *
 * Planilha do SDR do funil-01 · Apps Script (JavaScript V8, sem bibliotecas).
 * Leia entregas/planilha-sdr-funil-01/README.md antes de usar.
 *
 * SÓ DADOS DE TESTE até a decisão de onde a planilha mora (5.4; pergunta 24.1): dado pessoal
 * não entra no Google Drive (nucleo/regras/seguranca.md, regra 4). No teste, só leads de
 * mentira (#102: nome começando por TESTE, e-mail @teste.invalid).
 *
 * Destino dos contatos em conflito (conflito-17): este código segue o lado 2 (banco e planilha,
 * #90), sem escolher. Protótipo de teste não é entrega.
 *
 * O que faz:
 *   instalar()          o Otávio roda uma vez (rodar de novo não estraga nada): aba "fila",
 *                       cabeçalhos na ordem de funis/funil-01/planilha-sdr.md, primeira linha
 *                       congelada, lista fechada em estagio, estado e canal, gatilho de 5 minutos
 *   buscarLeadsNovos()  o gatilho roda a cada 5 minutos: pede ao garçom os leads novos pela porta
 *                       privada (GET /api/planilha/leads-novos) e acrescenta linhas no fim da aba
 *   desligar()          apaga o gatilho; não mexe na aba nem nas propriedades
 *
 * Propriedades do script (Configurações do projeto, Propriedades do script), nunca no código:
 *   GARCOM_URL          endereço do protótipo, com https:// e sem barra no fim
 *   CHAVE_PLANILHA      a mesma do segredo CHAVE_PLANILHA do Worker (pelo menos 32 caracteres)
 * O script guarda sozinho o cursor em CURSOR_GRAVADO_EM e CURSOR_ID_PESSOA (pergunta 24.3).
 *
 * Nada de dado pessoal no registro: só contagens e códigos.
 * A volta do status para o banco não existe ainda (não há porta para isso): não está aqui.
 *
 * Versão 2 (etapa 32): coluna nova clique_fim_quiz, só de leitura, entre tentativas_feitas e
 * estagio, como em planilha-sdr v2; vem do banco v3 (leads_para_planilha, migração 001). A aba
 * passa de 19 para 20 colunas. A aba de 19 colunas que já existe tem outro cabeçalho: renomear a
 * aba e rodar instalar() de novo (README, "Atualizar da versão 1"). O estado nutrição e a lista do
 * produto ainda não estão aqui (pergunta 31.20; prompts/11-fila-perguntas.md, 32.5).
 */

var NOME_ABA = 'fila';

// Todas as colunas de funis/funil-01/planilha-sdr.md ("Colunas"), na mesma ordem.
var COLUNAS = [
  'id_pessoa', 'nome', 'telefone', 'email', 'empresa',
  'consentimento_whatsapp', 'consentimento_email',
  'lead_score_faixa', 'lead_score_nota', 'respostas_a_confirmar',
  'entrou_em', 'tentativas_feitas', 'clique_fim_quiz',
  'estagio', 'estado', 'data_volta',
  'canal', 'contato_em', 'reuniao_em', 'produto'
];

// As que vêm do banco: as 16 primeiras (de id_pessoa a data_volta). estagio, estado e data_volta
// vêm do banco só na linha nova; depois, quem muda é o SDR. Linha que já existe nunca é reescrita.
var COLUNAS_DO_BANCO = COLUNAS.slice(0, 16);

// Lista fechada (planilha-sdr.md, "Lista fechada de status"), com os nomes "Na planilha".
var ESTAGIOS = ['captado', 'pré-qualificado', 'agendado', 'realizado', 'venda'];
var ESTADOS = ['conversando', 'tentativa', 'abandonado', 'stand-by', 'perdido'];
var CANAIS = ['telefone', 'whatsapp'];

// Do nome no banco (sem acento) para o nome na planilha.
var ESTAGIO_DO_BANCO = {
  'captado': 'captado', 'pre-qualificado': 'pré-qualificado', 'agendado': 'agendado',
  'realizado': 'realizado', 'venda': 'venda'
};
var ESTADO_DO_BANCO = {
  'conversando': 'conversando', 'tentativa': 'tentativa', 'abandonado': 'abandonado',
  'stand-by': 'stand-by', 'perdido': 'perdido'
};

var ROTA = '/api/planilha/leads-novos';
var LIMITE = 200;                   // o teto do garçom e do banco (22.3)
var MAX_VOLTAS = 10;                // páginas por execução; o resto fica para a próxima
var CHAVE_MINIMO = 32;              // o mesmo mínimo do garçom (22.4)
var FUSO = 'America/Sao_Paulo';
var MINUTOS_GATILHO = 5;
var FUNCAO_GATILHO = 'buscarLeadsNovos';

var PROP_URL = 'GARCOM_URL';
var PROP_CHAVE = 'CHAVE_PLANILHA';
var PROP_CURSOR_GRAVADO_EM = 'CURSOR_GRAVADO_EM';
var PROP_CURSOR_ID_PESSOA = 'CURSOR_ID_PESSOA';

var MENSAGENS = {
  'sem-propriedades': 'faltam as propriedades do script GARCOM_URL e CHAVE_PLANILHA, ou uma delas. Veja o README, passo 5.',
  'endereco-invalido': 'GARCOM_URL precisa começar com https:// (sem barra no fim). Veja o README, passo 5.',
  'chave-curta': 'CHAVE_PLANILHA tem menos de 32 caracteres; o garçom não abre a porta com ela.',
  'sem-aba': 'a aba "fila" não existe. Rode instalar() de novo.',
  'cabecalho-diferente': 'o cabeçalho da aba "fila" não é o esperado; nada foi gravado. Veja o README.',
  'nao-autorizado': 'o garçom respondeu 401: a CHAVE_PLANILHA das propriedades não é a mesma do Worker.',
  'erro-garcom': 'o garçom respondeu com erro; nada novo foi gravado nesta página. Tenta de novo em 5 minutos.',
  'erro-rede': 'não deu para falar com o garçom (rede ou endereço). Tenta de novo em 5 minutos.',
  'resposta-ilegivel': 'a resposta do garçom não é JSON; nada foi gravado nesta página.',
  'resposta-fora-do-formato': 'a resposta do garçom veio fora do formato; nada foi gravado nesta página.'
};


// ··· Registro: só contagens e códigos, nunca dado de pessoa, cursor, endereço ou chave ···
function registrar_(texto) {
  console.log('[planilha] ' + texto);
}


// ··· instalar() · o Otávio roda uma vez ···
function instalar() {
  var trava = LockService.getScriptLock();
  trava.waitLock(30000);
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var aba = planilha.getSheetByName(NOME_ABA);
    var criouAba = false;
    if (!aba) {
      aba = planilha.insertSheet(NOME_ABA);
      criouAba = true;
      // Aba nova: o cursor antigo (de uma aba renomeada ou apagada) deixaria os leads de fora.
      // Sem cursor, o garçom manda tudo desde o início, e a conferência do id_pessoa evita duplicata.
      var props = PropertiesService.getScriptProperties();
      props.deleteProperty(PROP_CURSOR_GRAVADO_EM);
      props.deleteProperty(PROP_CURSOR_ID_PESSOA);
    }

    // Cabeçalho: só escreve numa aba vazia. Se já existe e é o certo, deixa. Se é outro, não mexe.
    if (aba.getLastRow() === 0) {
      garantirColunas_(aba);
      aba.getRange(1, 1, 1, COLUNAS.length).setValues([COLUNAS.slice()]);
    } else if (!cabecalhoConfere_(aba)) {
      registrar_('instalar: cabecalho-diferente');
      throw new Error('Planilha do SDR: a aba "fila" já existe com outro cabeçalho na linha 1. Nada foi mudado. ' +
        'Renomeie essa aba (por exemplo, "fila antiga") e rode instalar() de novo: a aba nova recebe todos os leads desde o início.');
    }
    aba.setFrozenRows(1);
    aplicarValidacoes_(aba);
    aplicarFormatos_(aba);

    // Propriedades: sem elas, o gatilho falharia a cada 5 minutos. Confere antes de criar.
    var problema = conferirPropriedades_(PropertiesService.getScriptProperties());
    if (problema) {
      registrar_('instalar: ' + problema);
      throw new Error('Planilha do SDR: a aba está pronta, mas o gatilho não foi criado: ' + MENSAGENS[problema] +
        ' Depois, rode instalar() de novo.');
    }

    var gatilho = garantirGatilhoUnico_();
    registrar_('instalar: aba ' + (criouAba ? 'criada' : 'mantida') + '; gatilho ' + gatilho);
    return { aba: criouAba ? 'criada' : 'mantida', gatilho: gatilho };
  } finally {
    trava.releaseLock();
  }
}

// ··· desligar() · apaga o gatilho; aba e propriedades ficam como estão ···
function desligar() {
  var apagados = 0;
  var gatilhos = ScriptApp.getProjectTriggers();
  for (var i = 0; i < gatilhos.length; i++) {
    if (gatilhos[i].getHandlerFunction() === FUNCAO_GATILHO) {
      ScriptApp.deleteTrigger(gatilhos[i]);
      apagados++;
    }
  }
  registrar_('desligar: ' + apagados + ' gatilho(s) apagado(s)');
  return { apagados: apagados };
}


// ··· buscarLeadsNovos() · o gatilho de 5 minutos ···
// Falha vira erro (sem dado pessoal), para o Google mandar o aviso de falha do gatilho por e-mail.
function buscarLeadsNovos() {
  var resultado = buscar_();
  if (resultado.situacao !== 'ok' && resultado.situacao !== 'ocupado') {
    throw new Error('Planilha do SDR: ' + MENSAGENS[resultado.situacao] +
      ' (acrescentadas antes do erro: ' + resultado.acrescentadas + ')');
  }
  return resultado;
}

function buscar_() {
  var resultado = { situacao: 'ok', acrescentadas: 0, repetidas: 0, fora_da_faixa: 0, voltas: 0, codigo: null, pode_ter_mais: false };

  var trava = LockService.getScriptLock();
  if (!trava.tryLock(10000)) {
    registrar_('busca: ocupado (outra execucao em curso)');
    resultado.situacao = 'ocupado';
    return resultado;
  }
  try {
    var propriedades = PropertiesService.getScriptProperties();
    var problema = conferirPropriedades_(propriedades);
    if (problema) {
      registrar_('busca: ' + problema);
      resultado.situacao = problema;
      return resultado;
    }
    var endereco = propriedades.getProperty(PROP_URL).replace(/\/+$/, '') + ROTA;
    var chave = propriedades.getProperty(PROP_CHAVE);

    var aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA);
    if (!aba) {
      registrar_('busca: sem-aba');
      resultado.situacao = 'sem-aba';
      return resultado;
    }
    if (!cabecalhoConfere_(aba)) {
      registrar_('busca: cabecalho-diferente');
      resultado.situacao = 'cabecalho-diferente';
      return resultado;
    }

    // Os id_pessoa que já estão na aba: além do cursor, nunca acrescentar quem já tem linha (21.6).
    var presentes = idsPresentes_(aba);

    while (resultado.voltas < MAX_VOLTAS) {
      resultado.voltas++;
      var cursor = lerCursor_(propriedades);
      var pagina = pedirPagina_(endereco, chave, cursor);
      resultado.codigo = pagina.codigo;
      if (pagina.situacao !== 'ok') {
        registrar_('busca: ' + pagina.situacao + (pagina.codigo ? ' (' + pagina.codigo + ')' : ''));
        resultado.situacao = pagina.situacao;
        return resultado;
      }

      var linhas = [];
      for (var i = 0; i < pagina.leads.length; i++) {
        var lead = pagina.leads[i];
        if (presentes[lead.id_pessoa]) { resultado.repetidas++; continue; }
        if (lead.lead_score_faixa !== 'a' && lead.lead_score_faixa !== 'b') { resultado.fora_da_faixa++; continue; }
        linhas.push(linhaDoLead_(lead));
        presentes[lead.id_pessoa] = true;
      }

      if (linhas.length) {
        acrescentarLinhas_(aba, linhas);
        SpreadsheetApp.flush();
        resultado.acrescentadas += linhas.length;
      }
      // O cursor só é salvo DEPOIS de as linhas estarem gravadas. Lista vazia: cursor como está.
      if (pagina.cursor_seguinte) {
        var novo = {};
        novo[PROP_CURSOR_GRAVADO_EM] = pagina.cursor_seguinte.depois_de_gravado_em;
        novo[PROP_CURSOR_ID_PESSOA] = pagina.cursor_seguinte.depois_de_id_pessoa;
        propriedades.setProperties(novo);   // os dois juntos, numa gravação só
      }

      resultado.pode_ter_mais = pagina.pode_ter_mais;
      if (!pagina.pode_ter_mais || !pagina.leads.length) break;
    }

    registrar_('busca: ' + resultado.acrescentadas + ' linha(s) nova(s), ' + resultado.repetidas +
      ' repetida(s), ' + resultado.fora_da_faixa + ' fora da faixa, ' + resultado.voltas + ' volta(s)' +
      (resultado.pode_ter_mais ? ', continua na proxima' : ''));
    return resultado;
  } finally {
    trava.releaseLock();
  }
}


// ··· Garçom ···
function pedirPagina_(endereco, chave, cursor) {
  var url = endereco + '?';
  if (cursor) {
    url += 'depois_de_gravado_em=' + encodeURIComponent(cursor.depois_de_gravado_em) +
      '&depois_de_id_pessoa=' + encodeURIComponent(cursor.depois_de_id_pessoa) + '&';
  }
  url += 'limite=' + LIMITE;

  var resposta;
  try {
    resposta = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: { 'X-Chave-Planilha': chave },
      muteHttpExceptions: true,
      followRedirects: false
    });
  } catch (e) {
    return { situacao: 'erro-rede', codigo: null };
  }

  var codigo = resposta.getResponseCode();
  if (codigo === 401) return { situacao: 'nao-autorizado', codigo: codigo };
  if (codigo !== 200) return { situacao: 'erro-garcom', codigo: codigo };

  var corpo;
  try {
    corpo = JSON.parse(resposta.getContentText());
  } catch (e) {
    return { situacao: 'resposta-ilegivel', codigo: codigo };
  }
  if (!respostaConfere_(corpo)) return { situacao: 'resposta-fora-do-formato', codigo: codigo };

  return {
    situacao: 'ok', codigo: codigo,
    leads: corpo.leads, cursor_seguinte: corpo.cursor_seguinte, pode_ter_mais: corpo.pode_ter_mais
  };
}

// { leads: [...], cursor_seguinte: {...} ou null, pode_ter_mais: true ou false }
// (entregas/garcom/README.md, "Porta privada", item 7). Qualquer coisa fora disso: nada é gravado.
function respostaConfere_(corpo) {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return false;
  if (!Array.isArray(corpo.leads) || corpo.leads.length > LIMITE) return false;
  if (typeof corpo.pode_ter_mais !== 'boolean') return false;
  for (var i = 0; i < corpo.leads.length; i++) {
    var lead = corpo.leads[i];
    if (!lead || typeof lead !== 'object' || Array.isArray(lead)) return false;
    if (typeof lead.id_pessoa !== 'string' || !lead.id_pessoa) return false;
  }
  var c = corpo.cursor_seguinte;
  if (corpo.leads.length === 0) return c === null || c === undefined;
  return !!c && typeof c === 'object' &&
    typeof c.depois_de_gravado_em === 'string' && c.depois_de_gravado_em !== '' &&
    typeof c.depois_de_id_pessoa === 'string' && c.depois_de_id_pessoa !== '';
}


// ··· Linha nova: só as colunas do banco, na ordem da planilha ···
function linhaDoLead_(lead) {
  var estagio = vazio_(lead.estagio) ? 'captado' : (ESTAGIO_DO_BANCO[lead.estagio] || '');  // 21.9; 15.5; 24.5
  var estado = vazio_(lead.estado) ? '' : (ESTADO_DO_BANCO[lead.estado] || '');
  var valores = {
    id_pessoa: lead.id_pessoa,
    nome: lead.nome,
    telefone: lead.telefone,
    email: lead.email,
    empresa: lead.empresa,
    consentimento_whatsapp: simOuNao_(lead.consentimento_whatsapp),
    consentimento_email: simOuNao_(lead.consentimento_email),
    lead_score_faixa: lead.lead_score_faixa,
    lead_score_nota: numero_(lead.lead_score_nota),
    respostas_a_confirmar: respostasEmTexto_(lead.respostas_a_confirmar),
    entrou_em: horarioLocal_(lead.entrou_em),
    tentativas_feitas: numero_(lead.tentativas_feitas),
    clique_fim_quiz: vazio_(lead.clique_fim_quiz) ? '' : String(lead.clique_fim_quiz),
    estagio: estagio,
    estado: estado,
    data_volta: vazio_(lead.data_volta) ? '' : String(lead.data_volta)
  };
  return COLUNAS_DO_BANCO.map(function (nome) { return comoTexto_(valores[nome]); });
}

function acrescentarLinhas_(aba, linhas) {
  var primeira = ultimaLinhaDaFila_(aba) + 1;
  var faltam = primeira + linhas.length - 1 - aba.getMaxRows();
  if (faltam > 0) {
    aba.insertRowsAfter(aba.getMaxRows(), faltam);
    aplicarValidacoes_(aba);
    aplicarFormatos_(aba);
  }
  // Só as colunas do banco (1 a 16), só nas linhas novas. As do SDR (17 em diante) não são tocadas.
  aba.getRange(primeira, 1, linhas.length, COLUNAS_DO_BANCO.length).setValues(linhas);
}

// Valor que começa por = + - @ (ou tabulação, retorno, apóstrofo) vira texto com o apóstrofo na
// frente: ninguém injeta fórmula pelo nome ou pela empresa do quiz. O apóstrofo não aparece na célula.
function comoTexto_(valor) {
  if (valor === null || valor === undefined) return '';
  if (typeof valor === 'number') return valor;
  var texto = String(valor);
  if (/^[=+\-@\t\r']/.test(texto)) return "'" + texto;
  return texto;
}

function vazio_(v) { return v === null || v === undefined || v === ''; }

function numero_(v) {
  return typeof v === 'number' && isFinite(v) ? v : '';
}

function simOuNao_(v) {
  if (v === 'sim') return 'sim';
  if (v === 'nao') return 'não';
  return '';
}

// respostas_a_confirmar vem como objeto (faixa b) ou vazio (faixa a): "chave: valor; chave: valor".
function respostasEmTexto_(v) {
  if (vazio_(v)) return '';
  if (typeof v !== 'object') return String(v);
  var partes = [];
  var chaves = Object.keys(v);
  for (var i = 0; i < chaves.length; i++) {
    var item = v[chaves[i]];
    var texto = typeof item === 'string' ? item
      : Array.isArray(item) ? item.join(', ')
      : JSON.stringify(item);
    partes.push(chaves[i] + ': ' + texto);
  }
  return partes.join('; ');
}

// entrou_em vem do banco com fuso (por exemplo 2026-11-08T12:00:00.123456+00:00); na planilha vai
// no horário de Brasília, como texto. Se não der para ler, vai como veio.
function horarioLocal_(v) {
  if (vazio_(v)) return '';
  var data = new Date(v);
  if (isNaN(data.getTime())) return String(v);
  return Utilities.formatDate(data, FUSO, 'yyyy-MM-dd HH:mm:ss');
}


// ··· Aba, cabeçalho, validações, gatilho, propriedades ···
function garantirColunas_(aba) {
  var faltam = COLUNAS.length - aba.getMaxColumns();
  if (faltam > 0) aba.insertColumnsAfter(aba.getMaxColumns(), faltam);
}

function cabecalhoConfere_(aba) {
  if (aba.getLastRow() < 1 || aba.getMaxColumns() < COLUNAS.length) return false;
  var linha = aba.getRange(1, 1, 1, COLUNAS.length).getValues()[0];
  for (var i = 0; i < COLUNAS.length; i++) {
    if (String(linha[i]) !== COLUNAS[i]) return false;
  }
  return true;
}

// A última linha com algo nas 20 colunas da fila. Anotação à direita delas não empurra os leads.
function ultimaLinhaDaFila_(aba) {
  var ultima = aba.getLastRow();
  if (ultima < 1) return 0;
  var valores = aba.getRange(1, 1, ultima, COLUNAS.length).getValues();
  for (var i = valores.length - 1; i >= 0; i--) {
    for (var j = 0; j < COLUNAS.length; j++) {
      if (valores[i][j] !== '' && valores[i][j] !== null) return i + 1;
    }
  }
  return 0;
}

// Texto simples nas colunas de texto livre do quiz: o Google não transforma "00123", "TRUE"
// ou "1/2" em número, verdadeiro ou data (24.12).
var COLUNAS_TEXTO = ['nome', 'telefone', 'email', 'empresa', 'respostas_a_confirmar'];
function aplicarFormatos_(aba) {
  if (aba.getMaxRows() < 2) aba.insertRowsAfter(aba.getMaxRows(), 1);
  var linhas = aba.getMaxRows() - 1;
  for (var i = 0; i < COLUNAS_TEXTO.length; i++) {
    aba.getRange(2, COLUNAS.indexOf(COLUNAS_TEXTO[i]) + 1, linhas, 1).setNumberFormat('@');
  }
}

function aplicarValidacoes_(aba) {
  if (aba.getMaxRows() < 2) aba.insertRowsAfter(aba.getMaxRows(), 1);
  var linhas = aba.getMaxRows() - 1;
  var listas = [
    { coluna: 'estagio', valores: ESTAGIOS, ajuda: 'Estágio da lista fechada; só avança (planilha-sdr).' },
    { coluna: 'estado', valores: ESTADOS, ajuda: 'Estado da lista fechada; stand-by sempre com data_volta (planilha-sdr).' },
    { coluna: 'canal', valores: CANAIS, ajuda: 'Por onde foi o contato: telefone ou whatsapp.' }
  ];
  for (var i = 0; i < listas.length; i++) {
    var regra = SpreadsheetApp.newDataValidation()
      .requireValueInList(listas[i].valores, true)
      .setAllowInvalid(false)
      .setHelpText(listas[i].ajuda)
      .build();
    aba.getRange(2, COLUNAS.indexOf(listas[i].coluna) + 1, linhas, 1).setDataValidation(regra);
  }
}

function idsPresentes_(aba) {
  var presentes = {};
  var ultima = aba.getLastRow();
  if (ultima < 2) return presentes;
  var valores = aba.getRange(2, 1, ultima - 1, 1).getValues();
  for (var i = 0; i < valores.length; i++) {
    var id = String(valores[i][0]);
    if (id) presentes[id] = true;
  }
  return presentes;
}

function garantirGatilhoUnico_() {
  var gatilhos = ScriptApp.getProjectTriggers();
  var achados = 0;
  for (var i = 0; i < gatilhos.length; i++) {
    if (gatilhos[i].getHandlerFunction() !== FUNCAO_GATILHO) continue;
    achados++;
    if (achados > 1) ScriptApp.deleteTrigger(gatilhos[i]);   // sobra de instalação antiga: fica um só
  }
  if (achados > 0) return achados > 1 ? 'mantido (repetidos apagados)' : 'mantido';
  ScriptApp.newTrigger(FUNCAO_GATILHO).timeBased().everyMinutes(MINUTOS_GATILHO).create();
  return 'criado';
}

function conferirPropriedades_(propriedades) {
  var url = propriedades.getProperty(PROP_URL);
  var chave = propriedades.getProperty(PROP_CHAVE);
  if (!url || !chave) return 'sem-propriedades';
  if (!/^https:\/\/[^\s\/?#]+/.test(url) || /[?#\s]/.test(url)) return 'endereco-invalido';
  if (chave.length < CHAVE_MINIMO) return 'chave-curta';
  return null;
}

function lerCursor_(propriedades) {
  var gravadoEm = propriedades.getProperty(PROP_CURSOR_GRAVADO_EM);
  var idPessoa = propriedades.getProperty(PROP_CURSOR_ID_PESSOA);
  if (!gravadoEm || !idPessoa) return null;   // primeira vez (ou cursor pela metade: começa do início)
  return { depois_de_gravado_em: gravadoEm, depois_de_id_pessoa: idPessoa };
}
