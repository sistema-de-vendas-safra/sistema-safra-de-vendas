// Teste do detector de chaves. Node puro, sem dependências: node testar-detector.mjs
// Os casos que devem barrar são montados agora, em tempo de execução, juntando pedaços e
// caracteres aleatórios. Nenhum valor parecido com chave fica escrito neste arquivo,
// e o próprio arquivo passa no detector (último bloco).

import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, chmodSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { examinarTexto, examinarNome, examinarConteudo } from './detector.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const DETECTOR = path.join(AQUI, 'detector.mjs');
const GANCHO = path.join(AQUI, '..', '..', '..', '.githooks', 'pre-commit');

const resultados = [];
const conferir = (ok, nome) => resultados.push({ ok, linha: (ok ? 'OK    ' : 'FALHOU') + ' · ' + nome });

// Caracteres aleatórios, sempre com minúscula, maiúscula e dígito.
const LETRAS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function aleatorio(n, alfabeto = LETRAS) {
  const bytes = randomBytes(n);
  let s = '';
  for (let i = 0; i < n; i++) s += alfabeto[bytes[i] % alfabeto.length];
  return ('aZ7' + s).slice(0, n);
}
// Aleatório com dígito a cada três caracteres: nunca parece um identificador de código.
const misturado = n => aleatorio(n).split('').map((c, i) => (i % 3 === 2 ? String(randomBytes(1)[0] % 10) : c)).join('');
const hex = n => randomBytes(n).toString('hex').slice(0, n).replace(/^./, 'a').replace(/.$/, '7');
const b64url = n => randomBytes(n).toString('base64url').slice(0, n);

// Pedaços dos formatos, nunca escritos inteiros.
const SB = 'sb' + '_';
const pedaco = {
  sbSecreta: () => SB + 'sec' + 'ret_' + aleatorio(40),
  sbPublicavel: () => SB + 'publish' + 'able_' + aleatorio(40),
  jwt: () => 'ey' + 'J' + b64url(30) + '.' + 'ey' + 'J' + b64url(60) + '.' + b64url(43),
  google: () => 'AI' + 'za' + aleatorio(35, LETRAS + '_-'),
  cloudflare: () => aleatorio(40, LETRAS + '_-'),
  cloudflareGlobal: () => hex(37),
  privada: () => '-'.repeat(5) + 'BEGIN ' + 'RSA PRI' + 'VATE KEY' + '-'.repeat(5) + '\n' + b64url(64) + '\n',
  privadaOpenssh: () => '-'.repeat(5) + 'BEGIN OPENSSH ' + 'PRI' + 'VATE KEY' + '-'.repeat(5) + '\n',
  longo: () => misturado(32),
  uuid: () => [hex(8), hex(4), hex(4), hex(4), hex(12)].join('-'),
};

// ---------------------------------------------------------------------------
// 1. Casos que devem barrar (conteúdo)

const barrar = [];
let v;
v = pedaco.sbSecreta(); barrar.push(['chave secreta do Supabase num texto', 'a chave é ' + v, v, 'sb_secret_']);
v = pedaco.sbPublicavel(); barrar.push(['chave publicável do Supabase num código', "const k = '" + v + "';", v, 'sb_publishable_']);
v = pedaco.jwt(); barrar.push(['JWT solto', 'Authorization: Bearer ' + v, v, 'JWT']);
v = pedaco.google(); barrar.push(['chave do Google', 'mapa?key=' + v, v, 'Google']);
v = pedaco.cloudflare(); barrar.push(['token da Cloudflare em linha que fala de Cloudflare', 'token da Cloudflare: ' + v, v, 'Cloudflare']);
v = pedaco.cloudflare(); barrar.push(['token da Cloudflare em comando do wrangler', 'wrangler deploy --token ' + v, v, 'Cloudflare']);
v = pedaco.cloudflareGlobal(); barrar.push(['chave global da Cloudflare', 'cloudflare global ' + v, v, 'Cloudflare']);
v = pedaco.privada(); barrar.push(['bloco de chave privada RSA', 'texto\n' + v, v.split('\n')[1], 'chave privada']);
v = pedaco.privadaOpenssh(); barrar.push(['bloco de chave privada OpenSSH', v, null, 'chave privada']);
v = pedaco.longo(); barrar.push(['atribuição estilo .env', 'SUPABASE_CHAVE_SECRETA=' + v, v, 'nome de segredo']);
v = pedaco.longo(); barrar.push(['atribuição em JavaScript com aspas', 'const senha = "' + v + '";', v, 'nome de segredo']);
v = pedaco.longo(); barrar.push(['atribuição em JSON', '{ "apiKey": "' + v + '" }', v, 'nome de segredo']);
v = pedaco.longo(); barrar.push(['atribuição em YAML', 'cloud_password: ' + v, v, 'nome de segredo']);
v = aleatorio(24); barrar.push(['atribuição a CHAVE_PLANILHA em shell', 'export CHAVE_PLANILHA="' + v + '"', v, 'nome de segredo']);
v = hex(40); barrar.push(['segredo em hexadecimal', 'TOKEN = ' + v, v, 'nome de segredo']);
v = pedaco.sbSecreta(); barrar.push(['chave real dentro de endereço .invalid', 'https://x.invalid/?k=' + v, v, 'sb_secret_']);
v = pedaco.sbSecreta(); barrar.push(['chave com cara de real seguida de .invalid', 'chave: ' + v + '.invalid', v, 'sb_secret_']);
v = misturado(40); barrar.push(['token no cabeçalho Authorization', 'Authorization: Bearer ' + v, v, 'Bearer']);
v = misturado(20); barrar.push(['string de conexão com senha', 'postgres://postgres:' + v + '@db.projeto.supabase.co:5432/postgres', v, 'senha']);
v = misturado(20); barrar.push(['string de conexão com senha real em .invalid', 'postgres://u:' + v + '@db.x.invalid', v, 'senha']);
v = misturado(24); barrar.push(['apikey em minúsculas', 'apikey=' + v, v, 'nome de segredo']);
v = misturado(24); barrar.push(['nome em camelCase', 'const minhaChave = "' + v + '";', v, 'nome de segredo']);

for (const [nome, texto, valor, esperado] of barrar) {
  const achados = examinarTexto(texto);
  const ok = achados.length > 0 && achados.some(a => a.tipo.includes(esperado)) && achados.every(a => !valor || !a.tipo.includes(valor));
  conferir(ok, 'barra: ' + nome);
}

// A linha certa no meio de um arquivo maior.
v = pedaco.sbSecreta();
const linhas = ['# título', 'texto', '', 'chave = ' + v, 'fim'];
const achadosLinha = examinarTexto(linhas.join('\n'));
conferir(achadosLinha.length > 0 && achadosLinha.every(a => a.linha === 4), 'barra: aponta a linha 4 de 5');

// ---------------------------------------------------------------------------
// 2. Casos que devem passar (conteúdo)

const passar = [
  ['nome de segredo citado em texto', 'O segredo SUPABASE_CHAVE_SECRETA fica no cofre da Cloudflare.'],
  ['nome de segredo lido do cofre', 'const chave = env.SUPABASE_CHAVE_SECRETA;'],
  ['process.env', 'const chave = process.env.CHAVE_PLANILHA;'],
  ['comando de segredo do wrangler', 'wrangler secret put CHAVE_PLANILHA'],
  ['nome atribuído a nome', 'SEGREDO: SUPABASE_CHAVE_SECRETA'],
  ['endereço de mentira em .invalid', 'SUPABASE_URL=https://banco-de-teste.invalid'],
  ['chave de mentira em .invalid', 'SUPABASE_CHAVE_SECRETA=' + aleatorio(32) + '.teste.invalid'],
  ['formato do Supabase de mentira em .invalid', 'chave: ' + SB + 'sec' + 'ret_mentira-para-teste-' + hex(8) + '.invalid'],
  ['string de conexão de mentira', 'postgres://u:mentira@db.exemplo.invalid'],
  ['string de conexão de mentira com senha longa', 'postgres://u:senha-de-mentira-01@db.exemplo.invalid'],
  ['palavra de segredo no meio do nome', 'monkey = "abc123def456ghi789"'],
  ['identificador de código sem aspas', 'tokenCount = calcularTotal2024ParaLeads'],
  ['UUID atribuído a nome de segredo', 'id_chave: ' + pedaco.uuid()],
  ['prefixo citado sem valor', 'a chave nova começa por sb_secret_ e a publicável por sb_publishable_...'],
  ['valor de mentira escrito por extenso', "SUPABASE_SERVICE_KEY: 'valor-de-mentira-para-teste',"],
  ['nome de armazenamento local', "var CHAVE = 'simulador-implementacao-decisoes-v3';"],
  ['comparação em código minificado', 'return"keypress"===e.type?13:0'],
  ['Object.keys', 'const nomes = Object.keys(objeto).join(", ");'],
  ['molde com chaves duplas', 'CHAVE_PLANILHA={{a definir no cofre}}'],
  ['molde com sinal de menor', 'SUPABASE_CHAVE_SECRETA=<cole no painel, nunca aqui>'],
  ['valor curto', 'token: abc123'],
  ['frase entre aspas', 'senha: "nunca escreva a senha aqui"'],
  ['data e versão', 'chave_versao: 2026-11-08'],
  ['hash de commit sem contexto de segredo', 'commit ' + hex(40)],
  ['texto que fala de Cloudflare sem token', 'A conta da Cloudflare do Safra usa o subdomínio safra-prototipo-funil-01.workers.dev'],
  ['comentário com Bearer e nome', "cabecalhos.Authorization = 'Bearer ' + chave;"],
];
for (const [nome, texto] of passar) {
  const achados = examinarTexto(texto);
  conferir(achados.length === 0, 'passa: ' + nome + (achados.length ? ' (achou: ' + achados.map(a => a.tipo).join('; ') + ')' : ''));
}

// ---------------------------------------------------------------------------
// 3. Nomes de arquivo

for (const nome of ['.env', 'config/.env', '.env.local', 'pasta/.env.production', '.dev.vars', 'entregas/x/.dev.vars', 'certificado.pem', 'chave.PEM', 'secrets.env', 'pasta/producao.env', '.envrc', 'id_rsa', '.ssh/id_rsa.pub']) {
  conferir(Boolean(examinarNome(nome)), 'barra pelo nome: ' + nome);
}
for (const nome of ['ambiente.md', 'nucleo/regras/seguranca.md', 'wrangler.toml.exemplo', 'env.mjs', 'dev-vars.md', 'pem.txt', 'ambiente.envio.md', 'envrc.md']) {
  conferir(!examinarNome(nome), 'passa pelo nome: ' + nome);
}

// Binário (imagem, PDF) não é examinado por dentro.
conferir(examinarConteudo(Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0, 0]), Buffer.from('dados')])).length === 0, 'passa: arquivo binário');

// ---------------------------------------------------------------------------
// 4. Num repositório de verdade, numa pasta temporária: índice, gancho, histórico

const pasta = mkdtempSync(path.join(tmpdir(), 'detector-de-chaves-'));
const SEM_CONFIG = { ...process.env, GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_NOSYSTEM: '1' };
const g = (...args) => spawnSync('git', ['-c', 'user.name=teste', '-c', 'user.email=teste@teste.invalid', '-c', 'commit.gpgsign=false', ...args], { cwd: pasta, env: SEM_CONFIG, encoding: 'utf8' });
const detectar = (...args) => spawnSync(process.execPath, [path.join(pasta, 'nucleo/ferramentas/detector-de-chaves/detector.mjs'), ...args], { cwd: pasta, env: SEM_CONFIG, encoding: 'utf8' });
const escrever = (nome, texto) => { mkdirSync(path.dirname(path.join(pasta, nome)), { recursive: true }); writeFileSync(path.join(pasta, nome), texto); };

try {
  g('init', '-q', '-b', 'main');
  mkdirSync(path.join(pasta, 'nucleo/ferramentas/detector-de-chaves'), { recursive: true });
  mkdirSync(path.join(pasta, '.githooks'));
  copyFileSync(DETECTOR, path.join(pasta, 'nucleo/ferramentas/detector-de-chaves/detector.mjs'));
  copyFileSync(GANCHO, path.join(pasta, '.githooks/pre-commit'));
  chmodSync(path.join(pasta, '.githooks/pre-commit'), 0o755);
  escrever('leia.md', 'O segredo SUPABASE_CHAVE_SECRETA mora no cofre.\n');
  g('add', '-A');

  let r = detectar('--preparados');
  conferir(r.status === 0, 'repositório: primeiro commit limpo passa (sem HEAD ainda)');
  g('commit', '-q', '--no-verify', '-m', 'inicio');
  g('config', 'core.hooksPath', '.githooks');

  // O detector lê o índice, não o disco.
  const segredo = pedaco.sbSecreta();
  escrever('codigo.mjs', 'const a = 1;\nconst chave = "' + segredo + '";\n');
  g('add', 'codigo.mjs');
  escrever('codigo.mjs', 'const a = 1;\nconst chave = env.SUPABASE_CHAVE_SECRETA;\n');
  r = detectar('--preparados');
  conferir(r.status === 1, 'repositório: barra o que está preparado, mesmo com o disco já limpo');
  conferir(r.stderr.includes('codigo.mjs, linha 2') && r.stderr.includes('Supabase'), 'repositório: a recusa diz arquivo, linha e tipo');
  conferir(!r.stderr.includes(segredo) && !r.stdout.includes(segredo) && !r.stderr.includes(segredo.slice(10, 30)), 'repositório: a recusa não repete o valor');
  conferir(!/[\u2013\u2014]/.test(r.stderr), 'repositório: a recusa não tem travessão');

  g('add', 'codigo.mjs');
  escrever('codigo.mjs', 'const chave = "' + segredo + '";\n');
  r = detectar('--preparados');
  conferir(r.status === 0, 'repositório: passa quando o índice está limpo, mesmo com o disco sujo');

  // O gancho de verdade, pelo git commit.
  g('add', 'codigo.mjs');
  r = g('commit', '-q', '-m', 'tentativa com chave');
  conferir(r.status !== 0 && r.stderr.includes('Commit recusado') && !r.stderr.includes(segredo), 'gancho: git commit com chave é recusado, sem repetir o valor');
  escrever('codigo.mjs', 'const chave = env.SUPABASE_CHAVE_SECRETA;\n');
  g('add', 'codigo.mjs');
  r = g('commit', '-q', '-m', 'commit limpo');
  conferir(r.status === 0, 'gancho: git commit limpo passa');

  // Arquivo .env pelo nome, e apagar um .env que já estava no repositório pode.
  escrever('.env', 'NADA=1\n');
  g('add', '-f', '.env');
  r = detectar('--preparados');
  conferir(r.status === 1 && r.stderr.includes('.env'), 'repositório: .env preparado é recusado pelo nome');
  g('commit', '-q', '--no-verify', '-m', 'env entrou por fora do gancho');
  g('rm', '-q', '--cached', '.env');
  r = detectar('--preparados');
  conferir(r.status === 0, 'repositório: tirar o .env do repositório passa');
  g('commit', '-q', '--no-verify', '-m', 'env saiu');

  // Histórico: um commit antigo com chave, já apagada depois.
  const segredoAntigo = pedaco.google();
  escrever('antigo.txt', 'mapa ' + segredoAntigo + '\n');
  g('add', 'antigo.txt');
  g('commit', '-q', '--no-verify', '-m', 'chave antiga');
  const commitAntigo = g('rev-parse', 'HEAD').stdout.trim();
  g('rm', '-q', 'antigo.txt');
  g('commit', '-q', '--no-verify', '-m', 'chave apagada');
  r = detectar('--historico');
  conferir(r.status === 1 && r.stdout.includes(commitAntigo.slice(0, 10)) && r.stdout.includes('antigo.txt, linha 1') && r.stdout.includes('Google'), 'histórico: acha a chave apagada, com commit, arquivo e linha');
  conferir(r.stdout.includes('.env') && !r.stdout.includes(segredoAntigo), 'histórico: acha o .env antigo e não repete valor');
  r = detectar('--rastreados');
  conferir(r.status === 0, 'rastreados: o estado atual está limpo');
} finally {
  rmSync(pasta, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// 5. Este arquivo e o detector passam no detector

for (const arquivo of [fileURLToPath(import.meta.url), DETECTOR, GANCHO]) {
  const achados = examinarConteudo(readFileSync(arquivo));
  conferir(achados.length === 0, 'passa no próprio detector: ' + path.basename(arquivo));
}

for (const r of resultados) console.log(r.linha);
const falhas = resultados.filter(r => !r.ok).length;
console.log('');
console.log(falhas ? 'Falharam ' + falhas + ' de ' + resultados.length : 'Tudo certo: ' + resultados.length + ' de ' + resultados.length + ' conferências passaram');
process.exit(falhas ? 1 : 0);
