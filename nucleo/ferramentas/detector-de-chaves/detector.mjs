#!/usr/bin/env node
// Detector de chaves do Sistema de Vendas Safra. Node puro, sem dependências.
// Procura coisas parecidas com chave, senha ou token e arquivos de segredo pelo nome.
// Nunca imprime o valor encontrado: só o arquivo, a linha e o tipo de achado.
//
// Modos:
//   node detector.mjs                 o mesmo que --preparados
//   node detector.mjs --preparados    o que está preparado para o commit (conteúdo do índice, não do disco)
//   node detector.mjs --rastreados    todos os arquivos rastreados hoje (conteúdo do índice)
//   node detector.mjs --historico     todas as versões de todos os arquivos em todos os commits
// Saída: 0 quando não acha nada, 1 quando acha, 2 quando não consegue ler o Git.

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { realpathSync } from 'node:fs';

// ---------------------------------------------------------------------------
// Regras de conteúdo

const ALFABETO_TOKEN = '[A-Za-z0-9_-]';

// Padrões fortes: o formato sozinho já diz que é chave.
const PADROES_FORTES = [
  { tipo: 'chave secreta do Supabase (sb_secret_)', re: new RegExp('sb_secret_' + ALFABETO_TOKEN + '{16,}', 'g') },
  { tipo: 'chave publicável do Supabase (sb_publishable_)', re: new RegExp('sb_publishable_' + ALFABETO_TOKEN + '{16,}', 'g') },
  { tipo: 'token JWT (chave antiga do Supabase ou outro serviço)', re: /eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/g },
  { tipo: 'chave do Google (AIza)', re: /AIza[0-9A-Za-z_-]{35}/g },
  { tipo: 'chave de origem da Cloudflare (Origin CA)', re: /v1\.0-[a-f0-9]{24}-[a-f0-9]{146}/g },
  { tipo: 'bloco de chave privada', re: /-{5}BEGIN[A-Z0-9 ]* PRIVATE KEY( BLOCK)?-{5}/g },
  { tipo: 'token num cabeçalho Authorization (Bearer)', re: /\bBearer\s+[A-Za-z0-9._~+\/-]{20,}/g },
  { tipo: 'endereço com senha (por exemplo a string de conexão do banco)', re: /:\/\/[^\s:\/@]+:[^\s@\/]{8,}@/g },
];

// Tokens da Cloudflare não têm prefixo: só contam numa linha que fala de Cloudflare.
const CONTEXTO_CLOUDFLARE = /cloudflare|wrangler|\bCF_[A-Z]/i;
const TOKEN_CLOUDFLARE = /(?<![A-Za-z0-9_-])[A-Za-z0-9_-]{40}(?![A-Za-z0-9_-])/g;
const CHAVE_GLOBAL_CLOUDFLARE = /(?<![A-Za-z0-9])[a-f0-9]{37}(?![A-Za-z0-9])/g;

// Atribuição a um nome de segredo: NOME = valor, NOME: valor, NOME := valor, NOME => valor.
// A palavra de segredo tem de começar o nome ou uma parte dele: no início, depois de _ - . ou api,
// ou numa troca de minúscula para maiúscula (apiKey). Assim monkey e chaves no meio de palavra não contam.
const NOME = /(?<![A-Za-z0-9_.-])[A-Za-z0-9_.-]+/g;
const PALAVRA_DE_SEGREDO = /(?:^|[_.-]|api)(?:key|secret|token|chave|senha|password|passwd)/i;
const PALAVRA_DE_SEGREDO_CAMEL = /[a-z0-9](?:Key|Secret|Token|Chave|Senha|Password|Passwd|KEY|SECRET|TOKEN|CHAVE|SENHA|PASSWORD)/;
const ehNomeDeSegredo = nome => PALAVRA_DE_SEGREDO.test(nome) || PALAVRA_DE_SEGREDO_CAMEL.test(nome);
const DEPOIS_DO_NOME = /^["']?[ \t]*(?:=>|:=|=(?![=>])|:(?!:))[ \t]*(["'`]?)/;
const TAMANHO_LONGO = 16;

// Sinais de que o valor é de mentira ou é um molde, não um segredo.
const MOLDE = /[{}<>]|\.\.\.|\$\(|\$\{|x{4,}|\*{3,}|exemplo|example|mentira|placeholder|changeme|seu[_-]|your[_-]/i;

const tem = {
  digito: s => /[0-9]/.test(s),
  letra: s => /[A-Za-z]/.test(s),
  maiuscula: s => /[A-Z]/.test(s),
  minuscula: s => /[a-z]/.test(s),
};

function ehDeMentira(palavra) {
  return /\.invalid(?![A-Za-z0-9])/i.test(palavra);
}

// Padrão forte de mentira: o achado tem marca de mentira (mentira, exemplo, teste...) e o domínio
// .invalid vem logo depois dele. Um valor com cara de real seguido de .invalid continua barrado.
function padraoForteDeMentira(texto, inicio, fim) {
  const depois = texto.slice(fim, fim + 200);
  if (!/^[A-Za-z0-9_.-]*\.invalid(?![A-Za-z0-9])/i.test(depois)) return false;
  const achado = texto.slice(inicio, fim);
  return MOLDE.test(achado) || /teste/i.test(achado);
}

// Identificador de código sem aspas (por exemplo calcularTotal2024ParaLeads): palavras e números
// em blocos, com no máximo duas trocas entre letra e dígito. Um valor aleatório troca muito mais.
function pareceIdentificador(valor) {
  if (!/^[A-Za-z_$][\w$]*$/.test(valor)) return false;
  const trocas = (valor.match(/[A-Za-z](?=[0-9])|[0-9](?=[A-Za-z])/g) || []).length;
  return trocas <= 2;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Decide se o valor de uma atribuição parece um segredo de verdade.
export function pareceValorSecreto(valor, entreAspas) {
  if (valor.length < TAMANHO_LONGO) return false;
  if (ehDeMentira(valor)) return false;
  if (MOLDE.test(valor)) return false;
  // Nome de variável citado como valor (por exemplo SUPABASE_CHAVE_SECRETA).
  if (/^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+$/.test(valor)) return false;
  // Sem aspas, um nome com ponto ou parêntese é código lendo do cofre (env.X, process.env.X, ler(...)).
  if (!entreAspas && /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*(?:\(.*)?$/.test(valor) && /[.(]/.test(valor)) return false;
  // Um UUID sozinho é identificador, não segredo.
  if (UUID.test(valor)) return false;
  // Sem aspas, um identificador de código (calcularTotal2024ParaLeads) é código, não segredo.
  if (!entreAspas && pareceIdentificador(valor)) return false;
  // Palavras ligadas por hífen, sublinhado ou ponto (por exemplo simulador-decisoes-v3): nome, não segredo.
  const partes = valor.split(/[-_.]/);
  if (partes.length > 1 && partes.every(p => /^[A-Za-z]*$/.test(p) || p.length <= 3)) return false;
  // Caminho ou endereço sem nada de segredo.
  if (/^(?:https?:\/\/|\.{0,2}\/)/.test(valor) && !/[?&](?:key|token|secret)=/i.test(valor)) return false;
  if (tem.digito(valor) && tem.letra(valor)) return true;
  if (valor.length >= 32 && tem.maiuscula(valor) && tem.minuscula(valor)) return true;
  return false;
}

function numeroDaLinha(texto, indice) {
  let n = 1;
  for (let i = 0; i < indice; i++) if (texto.charCodeAt(i) === 10) n++;
  return n;
}

// Examina um texto e devolve os achados: [{ linha, tipo }]. Nunca devolve o valor.
export function examinarTexto(texto) {
  const achados = [];
  const vistos = new Set();
  const anotar = (indice, tipo) => {
    const linha = numeroDaLinha(texto, indice);
    const chave = linha + '|' + tipo;
    if (vistos.has(chave)) return;
    vistos.add(chave);
    achados.push({ linha, tipo });
  };

  for (const { tipo, re } of PADROES_FORTES) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(texto))) {
      if (padraoForteDeMentira(texto, m.index, m.index + m[0].length)) continue;
      anotar(m.index, tipo);
    }
  }

  // Cloudflare, linha a linha, só com contexto.
  let inicioDaLinha = 0;
  for (const linha of texto.split('\n')) {
    if (CONTEXTO_CLOUDFLARE.test(linha)) {
      for (const re of [TOKEN_CLOUDFLARE, CHAVE_GLOBAL_CLOUDFLARE]) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(linha))) {
          const v = m[0];
          const parece = re === TOKEN_CLOUDFLARE
            ? tem.maiuscula(v) && tem.minuscula(v) && tem.digito(v)
            : tem.digito(v) && /[a-f]/.test(v);
          if (!parece) continue;
          if (padraoForteDeMentira(linha, m.index, m.index + v.length)) continue;
          anotar(inicioDaLinha + m.index, 'token da Cloudflare');
        }
      }
    }
    inicioDaLinha += linha.length + 1;
  }

  // Atribuições a nomes de segredo com valor longo.
  NOME.lastIndex = 0;
  let m;
  while ((m = NOME.exec(texto))) {
    if (!ehNomeDeSegredo(m[0])) continue;
    const resto = texto.slice(m.index + m[0].length, m.index + m[0].length + 400);
    const op = DEPOIS_DO_NOME.exec(resto);
    if (!op) continue;
    const aspas = op[1];
    const depois = resto.slice(op[0].length);
    let valor;
    if (aspas) {
      const fim = depois.indexOf(aspas);
      if (fim < 0) continue;
      valor = depois.slice(0, fim);
      if (/\s/.test(valor)) continue; // frase entre aspas, não segredo
    } else {
      valor = (/^[^\s"'`,;)\]}]+/.exec(depois) || [''])[0];
    }
    if (pareceValorSecreto(valor, Boolean(aspas))) anotar(m.index, 'valor longo atribuído a um nome de segredo (' + m[0].replace(/^.*\./, '') + ')');
  }

  achados.sort((a, b) => a.linha - b.linha);
  return achados;
}

// Arquivos de segredo pelo nome. Devolve o tipo ou null.
export function examinarNome(caminho) {
  const base = path.posix.basename(caminho).toLowerCase();
  if (base === '.env' || base.startsWith('.env.') || base.endsWith('.env') || base === '.envrc') return 'arquivo de segredos (.env) não pode entrar no repositório';
  if (base.startsWith('id_rsa')) return 'arquivo de chave SSH (id_rsa) não pode entrar no repositório';
  if (base === '.dev.vars' || base.startsWith('.dev.vars.')) return 'arquivo de segredos do wrangler (.dev.vars) não pode entrar no repositório';
  if (base.endsWith('.pem')) return 'arquivo de chave ou certificado (.pem) não pode entrar no repositório';
  return null;
}

// Arquivo binário (imagem, PDF, zip): tem byte zero no começo. Não é examinado por dentro.
export function ehBinario(buffer) {
  const n = Math.min(buffer.length, 8000);
  for (let i = 0; i < n; i++) if (buffer[i] === 0) return true;
  return false;
}

export function examinarConteudo(buffer) {
  if (ehBinario(buffer)) return [];
  return examinarTexto(buffer.toString('utf8'));
}

// ---------------------------------------------------------------------------
// Leitura do Git

const VAZIA = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'; // árvore vazia do Git

function git(args, cwd) {
  const r = spawnSync('git', args, { cwd, maxBuffer: 1 << 30 });
  if (r.error || r.status !== 0) {
    const erro = new Error('git ' + args[0] + ' falhou');
    erro.saida = r.stderr ? r.stderr.toString() : String(r.error);
    throw erro;
  }
  return r.stdout;
}

const lerBlob = (oid, cwd) => git(['cat-file', 'blob', oid], cwd);

// [{ caminho, oid }] do que está preparado (acrescentado, mudado, renomeado). Apagar não conta.
export function listarPreparados(cwd) {
  let base = VAZIA;
  try { git(['rev-parse', '--verify', '-q', 'HEAD'], cwd); base = 'HEAD'; } catch { /* repositório sem commit */ }
  const saida = git(['diff-index', '--cached', '--raw', '-z', '--no-abbrev', '--no-renames', '--diff-filter=ACMT', base], cwd).toString('utf8');
  const partes = saida.split('\0');
  const lista = [];
  for (let i = 0; i + 1 < partes.length; i += 2) {
    const meta = partes[i].trim().split(' ');
    const caminho = partes[i + 1];
    if (!meta[0] || !caminho) continue;
    const modo = meta[1];
    const oid = meta[3];
    if (modo === '160000') continue; // submódulo
    lista.push({ caminho, oid });
  }
  return lista;
}

export function listarRastreados(cwd) {
  const saida = git(['ls-files', '-s', '-z'], cwd).toString('utf8');
  const lista = [];
  for (const item of saida.split('\0')) {
    if (!item) continue;
    const tab = item.indexOf('\t');
    const [modo, oid] = item.slice(0, tab).split(' ');
    if (modo === '160000') continue;
    lista.push({ caminho: item.slice(tab + 1), oid });
  }
  return lista;
}

function examinarLista(lista, cwd) {
  const relato = [];
  for (const { caminho, oid } of lista) {
    const nome = examinarNome(caminho);
    if (nome) relato.push({ caminho, linha: null, tipo: nome });
    for (const a of examinarConteudo(lerBlob(oid, cwd))) relato.push({ caminho, ...a });
  }
  return relato;
}

export function examinarPreparados(cwd) {
  return examinarLista(listarPreparados(cwd), cwd);
}

export function examinarRastreados(cwd, { semFontes = false } = {}) {
  let lista = listarRastreados(cwd);
  if (semFontes) lista = lista.filter(i => !i.caminho.startsWith('fontes/'));
  return examinarLista(lista, cwd);
}

// Todas as versões de todos os arquivos em todos os commits. Cada versão (blob) é lida uma vez
// e o achado aponta o primeiro commit (o mais antigo) em que ela aparece.
export function examinarHistorico(cwd) {
  const commits = git(['rev-list', '--all', '--reverse'], cwd).toString('utf8').split('\n').filter(Boolean);
  const primeiroDoBlob = new Map();
  const nomesVistos = new Set();
  const relato = [];
  for (const commit of commits) {
    const arvore = git(['ls-tree', '-r', '-z', '--full-tree', commit], cwd).toString('utf8');
    for (const item of arvore.split('\0')) {
      if (!item) continue;
      const tab = item.indexOf('\t');
      const [, tipo, oid] = item.slice(0, tab).split(' ');
      const caminho = item.slice(tab + 1);
      if (tipo !== 'blob') continue;
      const nome = examinarNome(caminho);
      if (nome && !nomesVistos.has(caminho)) {
        nomesVistos.add(caminho);
        relato.push({ commit, caminho, linha: null, tipo: nome });
      }
      if (!primeiroDoBlob.has(oid)) primeiroDoBlob.set(oid, { commit, caminho });
    }
  }
  for (const [oid, { commit, caminho }] of primeiroDoBlob) {
    for (const a of examinarConteudo(lerBlob(oid, cwd))) relato.push({ commit, caminho, ...a });
  }
  return { relato, commits: commits.length, versoes: primeiroDoBlob.size };
}

// ---------------------------------------------------------------------------
// Mensagens

function linhaDoRelato(r) {
  const onde = r.linha ? r.caminho + ', linha ' + r.linha : r.caminho;
  const commit = r.commit ? 'commit ' + r.commit.slice(0, 10) + ' · ' : '';
  return '  · ' + commit + onde + ': ' + r.tipo;
}

function recusa(relato) {
  return [
    '',
    'Commit recusado pelo detector de chaves.',
    '',
    'Encontrei algo que parece chave, senha ou token:',
    ...relato.map(linhaDoRelato),
    '',
    'O valor não foi repetido aqui, de propósito.',
    '',
    'O que fazer:',
    '  1. Tire o valor do arquivo. Chave mora no cofre do serviço, nunca no repositório (nucleo/regras/seguranca.md).',
    '  2. Se for um arquivo de segredos, tire do commit: git rm --cached <arquivo>.',
    '  3. Prepare de novo (git add) e tente o commit outra vez.',
    'Se for uma chave de verdade que já foi copiada para algum lugar, revogue a chave primeiro (conexoes.md).',
    'Se for alarme falso, ajuste a regra em nucleo/ferramentas/detector-de-chaves/detector.mjs, nunca pule o detector.',
    '',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Linha de comando

function principal(argv) {
  const cwd = process.cwd();
  const modo = argv.find(a => a.startsWith('--') && a !== '--sem-fontes') || '--preparados';
  try {
    if (modo === '--preparados') {
      const relato = examinarPreparados(cwd);
      if (relato.length) { process.stderr.write(recusa(relato)); return 1; }
      return 0;
    }
    if (modo === '--rastreados') {
      const relato = examinarRastreados(cwd, { semFontes: argv.includes('--sem-fontes') });
      const total = listarRastreados(cwd).length;
      if (relato.length) {
        console.log('Achados nos arquivos rastreados (' + relato.length + '):');
        relato.forEach(r => console.log(linhaDoRelato(r)));
        console.log('O valor não foi repetido aqui, de propósito.');
        return 1;
      }
      console.log('Nada encontrado nos arquivos rastreados (' + total + ' arquivos' + (argv.includes('--sem-fontes') ? ', sem fontes/' : '') + ').');
      return 0;
    }
    if (modo === '--historico') {
      const { relato, commits, versoes } = examinarHistorico(cwd);
      if (relato.length) {
        console.log('Achados no histórico (' + relato.length + '), em ' + commits + ' commits e ' + versoes + ' versões de arquivo:');
        relato.forEach(r => console.log(linhaDoRelato(r)));
        console.log('O valor não foi repetido aqui, de propósito. O histórico não foi alterado.');
        return 1;
      }
      console.log('Nada encontrado no histórico: ' + commits + ' commits e ' + versoes + ' versões de arquivo examinadas.');
      return 0;
    }
    console.error('Modo desconhecido. Use --preparados, --rastreados (com --sem-fontes, se quiser) ou --historico.');
    return 2;
  } catch (erro) {
    console.error('O detector de chaves não conseguiu ler o Git, então o commit fica bloqueado por segurança.');
    if (erro.saida) console.error(erro.saida.trim());
    return 2;
  }
}

const chamadoDireto = () => {
  try { return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url)); } catch { return false; }
};
if (process.argv[1] && chamadoDireto()) {
  process.exitCode = principal(process.argv.slice(2));
}
