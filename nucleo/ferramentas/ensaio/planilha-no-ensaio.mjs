// A planilha do SDR no ensaio geral (etapa 25): roda entregas/planilha-sdr-funil-01/Codigo.gs com o
// Google de mentira (teste/falsos.mjs) contra o garçom que está rodando em 127.0.0.1.
// Parte de nucleo/ferramentas/ensaio/ (id ensaio-prototipo-funil-01, v3, rascunho; ver README.md).
//
// Roda em outro processo, chamado por ensaio.mjs: o UrlFetchApp do Google é síncrono, e o de
// mentira também (a linha principal deste processo fica parada esperando a resposta). Assim o
// processo do ensaio, onde moram o banco e o Supabase de mentira, continua livre para atender.
//
// Recebe pelo ambiente: ENSAIO_PORTA_GARCOM e ENSAIO_CHAVE_PLANILHA (de mentira, gerada pelo ensaio).
// Lê um comando por linha na entrada (instalar, buscar, esquecer-cursor, estado, sair) e responde
// uma linha JSON na saída para cada um. Nada sai de 127.0.0.1.

import { createInterface } from 'node:readline';
import { criarFalsos, carregarCodigo, criarUrlFetchSincrono } from '../../../entregas/planilha-sdr-funil-01/teste/falsos.mjs';

const URL_DE_MENTIRA = 'https://garcom.teste.invalid';
const PORTA = process.env.ENSAIO_PORTA_GARCOM;
const CHAVE = process.env.ENSAIO_CHAVE_PLANILHA;
if (!/^[0-9]+$/.test(PORTA || '') || !CHAVE) {
  console.log(JSON.stringify({ erro: 'faltou ENSAIO_PORTA_GARCOM ou ENSAIO_CHAVE_PLANILHA' }));
  process.exit(1);
}

const http = criarUrlFetchSincrono({
  traduzir: (u) => {
    if (!u.startsWith(URL_DE_MENTIRA + '/')) throw new Error('endereco fora do ensaio');
    return 'http://127.0.0.1:' + PORTA + u.slice(URL_DE_MENTIRA.length);
  }
});
const falsos = criarFalsos({
  propriedades: { GARCOM_URL: URL_DE_MENTIRA, CHAVE_PLANILHA: CHAVE },
  urlFetch: http.urlFetch
});
const gs = carregarCodigo(falsos);
const copia = (v) => JSON.parse(JSON.stringify(v));

function estado() {
  const aba = falsos.estado.abas.find(a => a.getName() === 'fila');
  const ultima = aba ? aba.getLastRow() : 0;
  const linhas = [];
  for (let n = 2; n <= ultima; n++) linhas.push(aba.linha(n, 20));
  return {
    cabecalho: aba ? aba.linha(1, 20) : null,
    linhas,
    registros: falsos.estado.registros.slice(),
    gatilhos: falsos.estado.gatilhos.map(g => ({ funcao: g.funcao, minutos: g.minutos })),
    tem_cursor: !!falsos.estado.propriedades.CURSOR_GRAVADO_EM && !!falsos.estado.propriedades.CURSOR_ID_PESSOA,
    chamadas: falsos.estado.chamadas.length
  };
}

const COMANDOS = {
  instalar: () => copia(gs.instalar()),
  buscar: () => copia(gs.buscar_()),
  'esquecer-cursor': () => {
    delete falsos.estado.propriedades.CURSOR_GRAVADO_EM;
    delete falsos.estado.propriedades.CURSOR_ID_PESSOA;
    return { ok: true };
  },
  estado
};

const leitor = createInterface({ input: process.stdin });
leitor.on('line', (linha) => {
  const comando = linha.trim();
  if (comando === 'sair') { http.fechar(); process.exit(0); }
  let saida;
  try {
    saida = COMANDOS[comando] ? { ok: true, resultado: COMANDOS[comando]() } : { ok: false, erro: 'comando desconhecido' };
  } catch (e) {
    saida = { ok: false, erro: String(e && e.message || e) };
  }
  process.stdout.write(JSON.stringify(saida) + '\n');
});
leitor.on('close', () => { http.fechar(); process.exit(0); });
