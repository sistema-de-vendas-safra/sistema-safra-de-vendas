// Falsos do Google Apps Script para rodar Codigo.gs no Node, sem Google e sem rede.
// Parte de entregas/planilha-sdr-funil-01/ (id planilha-sdr-funil-01, v1, rascunho; ver README.md).
//
// O que este arquivo exporta (o ensaio da etapa 25 usa os mesmos):
//   criarFalsos({ propriedades, urlFetch })   SpreadsheetApp, PropertiesService, UrlFetchApp,
//                                             LockService, ScriptApp, Logger, Utilities e console
//                                             de mentira, mais o estado de cada um para conferir
//   carregarCodigo(falsos)                    carrega Codigo.gs num contexto vm com os falsos e
//                                             devolve o contexto (instalar, buscarLeadsNovos, ...)
//   garcomFalso({ chave, leads })             um garçom de mentira no formato da porta privada
//                                             (entregas/garcom/README.md), para o urlFetch
//   criarUrlFetchSincrono({ traduzir })       um urlFetch que faz HTTP de verdade, mas só para um
//                                             endereço local (127.0.0.1), de forma síncrona,
//                                             como o UrlFetchApp do Google; o servidor tem de
//                                             rodar fora da linha principal (outro processo ou
//                                             Worker), porque a linha principal fica parada
//                                             esperando a resposta
//
// Sem dependências. Só valores de mentira; endereços em .invalid ou 127.0.0.1.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { Worker } from 'node:worker_threads';

const CAMINHO_CODIGO = fileURLToPath(new URL('../Codigo.gs', import.meta.url));

// ··· Planilha de mentira ···
class AbaFalsa {
  constructor(nome, linhas = 1000, colunas = 26) {
    this.nome = nome;
    this.maxLinhas = linhas;
    this.maxColunas = colunas;
    this.celulas = new Map();       // "linha,coluna" -> { valor, formula, texto }
    this.validacoes = [];           // { linha, coluna, linhas, colunas, regra }
    this.congeladas = 0;
    this.formatos = [];             // { linha, coluna, linhas, colunas, formato }
    this.escritas = [];             // cada setValues: { linha, coluna, linhas, colunas, quem }
  }
  getName() { return this.nome; }
  getMaxRows() { return this.maxLinhas; }
  getMaxColumns() { return this.maxColunas; }
  getLastRow() {
    let ultima = 0;
    for (const [k, c] of this.celulas) if (c.valor !== '' && c.valor !== null && c.valor !== undefined) ultima = Math.max(ultima, Number(k.split(',')[0]));
    return ultima;
  }
  insertRowsAfter(depois, n) { if (depois !== this.maxLinhas) throw new Error('falso: só inserir no fim'); this.maxLinhas += n; return this; }
  insertColumnsAfter(depois, n) { if (depois !== this.maxColunas) throw new Error('falso: só inserir no fim'); this.maxColunas += n; return this; }
  setFrozenRows(n) { this.congeladas = n; return this; }
  getFrozenRows() { return this.congeladas; }
  getRange(linha, coluna, linhas = 1, colunas = 1) {
    if (typeof linha !== 'number') throw new Error('falso: getRange só com números');
    if (linha < 1 || coluna < 1 || linhas < 1 || colunas < 1) throw new Error('falso: intervalo inválido');
    if (linha + linhas - 1 > this.maxLinhas || coluna + colunas - 1 > this.maxColunas) {
      throw new Error('The coordinates of the range are outside the dimensions of the sheet.');
    }
    return new IntervaloFalso(this, linha, coluna, linhas, colunas);
  }
  // ··· só para o teste ···
  valor(linha, coluna) { return (this.celulas.get(linha + ',' + coluna) || { valor: '' }).valor; }
  celula(linha, coluna) { return this.celulas.get(linha + ',' + coluna) || { valor: '' }; }
  escreverAMao(linha, coluna, valor) {
    this.celulas.set(linha + ',' + coluna, { valor, formula: false, texto: false });
    this.escritas.push({ linha, coluna, linhas: 1, colunas: 1, quem: 'mao' });
  }
  linha(n, colunas) {
    const r = [];
    for (let c = 1; c <= colunas; c++) r.push(this.valor(n, c));
    return r;
  }
  validacaoDaColuna(coluna) {
    return this.validacoes.filter(v => v.coluna <= coluna && coluna < v.coluna + v.colunas);
  }
}

class IntervaloFalso {
  constructor(aba, linha, coluna, linhas, colunas) { Object.assign(this, { aba, linha, coluna, linhas, colunas }); }
  getValues() {
    const r = [];
    for (let i = 0; i < this.linhas; i++) {
      const l = [];
      for (let j = 0; j < this.colunas; j++) l.push(this.aba.valor(this.linha + i, this.coluna + j));
      r.push(l);
    }
    return r;
  }
  setValues(matriz) {
    if (!Array.isArray(matriz) || matriz.length !== this.linhas || matriz.some(l => !Array.isArray(l) || l.length !== this.colunas)) {
      throw new Error('The number of rows or columns in the data does not match the range.');
    }
    for (let i = 0; i < this.linhas; i++) {
      for (let j = 0; j < this.colunas; j++) {
        let v = matriz[i][j];
        let formula = false, texto = false;
        // como o Google: apóstrofo na frente guarda texto (e some); "=" na frente vira fórmula
        if (typeof v === 'string' && v.startsWith("'")) { v = v.slice(1); texto = true; }
        else if (typeof v === 'string' && v.startsWith('=')) formula = true;
        this.aba.celulas.set((this.linha + i) + ',' + (this.coluna + j), { valor: v, formula, texto });
      }
    }
    this.aba.escritas.push({ linha: this.linha, coluna: this.coluna, linhas: this.linhas, colunas: this.colunas, quem: 'script' });
    return this;
  }
  setNumberFormat(formato) {
    this.aba.formatos.push({ linha: this.linha, coluna: this.coluna, linhas: this.linhas, colunas: this.colunas, formato });
    return this;
  }
  setDataValidation(regra) {
    this.aba.validacoes.push({ linha: this.linha, coluna: this.coluna, linhas: this.linhas, colunas: this.colunas, regra });
    return this;
  }
}

// ··· Todos os falsos ···
export function criarFalsos({ propriedades = {}, urlFetch = null } = {}) {
  const estado = {
    abas: [],
    propriedades: { ...propriedades },
    gatilhos: [],
    registros: [],           // tudo o que foi para Logger e console
    chamadas: [],            // cada UrlFetchApp.fetch: { url, opcoes }
    flushes: 0,
    travaDeOutro: false,     // true: outra execução está com a trava
    travaPresa: false,
    proximoGatilho: 1
  };
  const registrar = (...a) => estado.registros.push(a.map(x => typeof x === 'string' ? x : JSON.stringify(x)).join(' '));

  const planilhaAtiva = {
    getSheetByName: (nome) => estado.abas.find(a => a.nome === nome) || null,
    insertSheet: (nome) => {
      if (estado.abas.some(a => a.nome === nome)) throw new Error('A sheet with the name "' + nome + '" already exists.');
      const aba = new AbaFalsa(nome);
      estado.abas.push(aba);
      return aba;
    },
    getSheets: () => estado.abas.slice(),
    // só para o teste: imita renomear a aba na planilha
    renomearAba: (de, para) => { estado.abas.find(a => a.nome === de).nome = para; }
  };

  const SpreadsheetApp = {
    getActiveSpreadsheet: () => planilhaAtiva,
    flush: () => { estado.flushes++; },
    newDataValidation: () => {
      const regra = { tipo: null, valores: null, lista: null, permiteInvalido: true, ajuda: '' };
      const construtor = {
        requireValueInList: (valores, lista) => { regra.tipo = 'lista'; regra.valores = valores.slice(); regra.lista = lista; return construtor; },
        setAllowInvalid: (b) => { regra.permiteInvalido = b; return construtor; },
        setHelpText: (t) => { regra.ajuda = t; return construtor; },
        build: () => ({ ...regra, valores: regra.valores && regra.valores.slice() })
      };
      return construtor;
    }
  };

  const loja = {
    getProperty: (k) => Object.prototype.hasOwnProperty.call(estado.propriedades, k) ? estado.propriedades[k] : null,
    setProperty: (k, v) => { estado.propriedades[k] = String(v); return loja; },
    setProperties: (obj) => { for (const k of Object.keys(obj)) estado.propriedades[k] = String(obj[k]); return loja; },
    deleteProperty: (k) => { delete estado.propriedades[k]; return loja; },
    getProperties: () => ({ ...estado.propriedades })
  };
  const PropertiesService = { getScriptProperties: () => loja };

  const LockService = {
    getScriptLock: () => ({
      tryLock: () => { if (estado.travaDeOutro || estado.travaPresa) return false; estado.travaPresa = true; return true; },
      waitLock: () => { if (estado.travaDeOutro || estado.travaPresa) throw new Error('Lock timeout'); estado.travaPresa = true; },
      releaseLock: () => { estado.travaPresa = false; },
      hasLock: () => estado.travaPresa
    })
  };

  const ScriptApp = {
    getProjectTriggers: () => estado.gatilhos.slice(),
    deleteTrigger: (g) => { estado.gatilhos = estado.gatilhos.filter(x => x !== g); },
    newTrigger: (funcao) => ({
      timeBased: () => {
        const cfg = { minutos: null };
        const c = {
          everyMinutes: (n) => { if (![1, 5, 10, 15, 30].includes(n)) throw new Error('everyMinutes inválido'); cfg.minutos = n; return c; },
          create: () => {
            const id = String(estado.proximoGatilho++);
            const g = { funcao, minutos: cfg.minutos, getHandlerFunction: () => funcao, getUniqueId: () => id, getEventType: () => 'CLOCK' };
            estado.gatilhos.push(g);
            return g;
          }
        };
        return c;
      }
    })
  };

  const UrlFetchApp = {
    fetch: (url, opcoes) => {
      estado.chamadas.push({ url, opcoes: JSON.parse(JSON.stringify(opcoes || {})) });
      if (!urlFetch) throw new Error('Address unavailable');
      const r = urlFetch(url, opcoes || {});                 // { codigo, corpo } ou lança erro
      return { getResponseCode: () => r.codigo, getContentText: () => r.corpo, getHeaders: () => ({}) };
    }
  };

  const Utilities = {
    formatDate: (data, fuso, padrao) => {
      if (padrao !== 'yyyy-MM-dd HH:mm:ss') throw new Error('falso: só yyyy-MM-dd HH:mm:ss');
      const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
        timeZone: fuso, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
      }).formatToParts(data).map(x => [x.type, x.value]));
      return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
    }
  };

  const Logger = { log: (...a) => { registrar(...a); return Logger; } };
  const console = { log: registrar, info: registrar, warn: registrar, error: registrar };

  return {
    estado,
    globais: { SpreadsheetApp, PropertiesService, UrlFetchApp, LockService, ScriptApp, Logger, Utilities, console },
    // troca o urlFetch depois de criado (por exemplo, para simular o garçom fora do ar)
    trocarUrlFetch: (f) => { urlFetch = f; }
  };
}

export function carregarCodigo(falsos) {
  const contexto = vm.createContext({ ...falsos.globais });
  vm.runInContext(readFileSync(CAMINHO_CODIGO, 'utf8'), contexto, { filename: 'Codigo.gs' });
  return contexto;
}

// ··· Garçom de mentira no formato da porta privada ···
// leads: cada um com as colunas de leads_para_planilha, inclusive cursor_gravado_em.
export function garcomFalso({ chave, leads }) {
  const ordenados = leads.slice().sort((a, b) =>
    a.cursor_gravado_em < b.cursor_gravado_em ? -1 : a.cursor_gravado_em > b.cursor_gravado_em ? 1
      : a.id_pessoa < b.id_pessoa ? -1 : a.id_pessoa > b.id_pessoa ? 1 : 0);
  const pedidos = [];
  const atender = (url, opcoes) => {
    const u = new URL(url);
    const cabecalhos = opcoes.headers || {};
    pedidos.push({ caminho: u.pathname, busca: u.search });
    if (cabecalhos['X-Chave-Planilha'] !== chave) return { codigo: 401, corpo: '{"ok":false,"erro":"nao autorizado"}' };
    if (u.pathname !== '/api/planilha/leads-novos') return { codigo: 404, corpo: '{"ok":false,"erro":"nao encontrado"}' };
    const g = u.searchParams.get('depois_de_gravado_em');
    const i = u.searchParams.get('depois_de_id_pessoa');
    const limite = Number(u.searchParams.get('limite') || 200);
    if ((g === null) !== (i === null) || !(limite >= 1 && limite <= 200)) return { codigo: 400, corpo: '{"ok":false,"erro":"pedido recusado"}' };
    const gz = g && g.replace(/\+00:00$/, 'Z');
    const depois = ordenados.filter(l => g === null || l.cursor_gravado_em.replace(/\+00:00$/, 'Z') > gz ||
      (l.cursor_gravado_em.replace(/\+00:00$/, 'Z') === gz && l.id_pessoa > i));
    const pagina = depois.slice(0, limite);
    const ultimo = pagina[pagina.length - 1];
    return {
      codigo: 200,
      corpo: JSON.stringify({
        leads: pagina,
        cursor_seguinte: ultimo ? { depois_de_gravado_em: ultimo.cursor_gravado_em.replace(/\+00:00$/, 'Z'), depois_de_id_pessoa: ultimo.id_pessoa } : null,
        pode_ter_mais: pagina.length === limite
      })
    };
  };
  return { atender, pedidos };
}

// ··· urlFetch síncrono, por HTTP local, para o ensaio da etapa 25 ···
// traduzir(url) devolve o endereço local (http://127.0.0.1:PORTA/...) ou lança erro para recusar.
// Só aceita 127.0.0.1 ou localhost depois da tradução: nada sai para a rede.
export function criarUrlFetchSincrono({ traduzir, tamanhoMaximo = 8 * 1024 * 1024 }) {
  const memoria = new SharedArrayBuffer(8 + tamanhoMaximo);
  const sinal = new Int32Array(memoria, 0, 2);   // [0] pronto, [1] tamanho
  const bytes = new Uint8Array(memoria, 8);
  const trabalhador = new Worker(`
    const { parentPort, workerData } = require('node:worker_threads');
    const sinal = new Int32Array(workerData, 0, 2);
    const bytes = new Uint8Array(workerData, 8);
    parentPort.on('message', async (p) => {
      let saida;
      try {
        const r = await fetch(p.url, { method: p.metodo, headers: p.cabecalhos, redirect: p.redirecionar ? 'follow' : 'manual' });
        saida = { codigo: r.status, corpo: await r.text() };
      } catch (e) { saida = { erro: 'rede' }; }
      const b = new TextEncoder().encode(JSON.stringify(saida));
      const n = Math.min(b.length, bytes.length);
      bytes.set(b.subarray(0, n));
      Atomics.store(sinal, 1, n);
      Atomics.store(sinal, 0, 1);
      Atomics.notify(sinal, 0);
    });
  `, { eval: true, workerData: memoria });
  trabalhador.unref();

  const urlFetch = (url, opcoes) => {
    const local = new URL(traduzir(url));
    if (!['127.0.0.1', 'localhost'].includes(local.hostname)) throw new Error('falso: só endereço local');
    Atomics.store(sinal, 0, 0);
    trabalhador.postMessage({
      url: local.href,
      metodo: String(opcoes.method || 'get').toUpperCase(),
      cabecalhos: opcoes.headers || {},
      redirecionar: opcoes.followRedirects !== false
    });
    if (Atomics.wait(sinal, 0, 0, 30000) === 'timed-out') throw new Error('Timeout');
    const saida = JSON.parse(new TextDecoder().decode(bytes.slice(0, Atomics.load(sinal, 1))));
    if (saida.erro) throw new Error('Address unavailable');
    return saida;
  };
  return { urlFetch, fechar: () => trabalhador.terminate() };
}
