// Teste do quiz-01 (entregas/quizzes/quiz-01/pagina/index.html, v2), sem rede de verdade.
// Uso: node nucleo/ferramentas/prints/testar-quiz-01.js
// A página é servida por um servidorzinho em 127.0.0.1, só durante o teste, em /quiz/ (como no site
// do protótipo). O POST para /api/fim-quiz é interceptado pelo navegador sem tela e respondido aqui:
// nada sai para o garçom nem para o Supabase.
// 1. Percorre o quiz com as respostas do exemplo de base/lead-score.md e confere o POST: total 96, faixa a.
// 2. Percorre um caso eliminatório (faturamento "Menos de R$ 50 mil") e confere a faixa e a tela.
// 3. Confere que, sem consentimento, nada é enviado e o aviso aparece.
// 4. Envio que falha: aviso visível, diagnóstico na tela, "Tentar de novo" reenvia o mesmo pacote.
// 5. Aberta direto do arquivo (file://): percorre tudo e nada é enviado.
// Em todos: o console não mostra o pacote nem nenhum dado de pessoa.
// Tira prints em 375 e 1440 pixels em entregas/quizzes/quiz-01/prints/.
// Dados de pessoa de teste, marcados (#102): nome começando por TESTE, e-mail @teste.invalid.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { acharChromium } = require('./print.js');

const RAIZ = path.resolve(__dirname, '../../..');
const PASTA = path.join(RAIZ, 'entregas/quizzes/quiz-01/pagina');
const BUSCA = '?utm_source=bio&utm_campaign=funil-01';
const ARQUIVO = 'file://' + path.join(PASTA, 'index.html') + BUSCA;
const PRINTS = path.join(RAIZ, 'entregas/quizzes/quiz-01/prints');
const PESSOA = { nome: 'TESTE Marina', email: 'marina@teste.invalid', tel: '00900000000' };
// nada disto pode aparecer no console da página
const DADO_PESSOAL = /TESTE|teste\.invalid|90000|pacote fim_quiz|"pessoa"/;

// Servidorzinho só para o teste: serve a pasta da página em /quiz/, nada mais
const TIPOS = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg' };
function servir() {
  const srv = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://127.0.0.1');
    let nome = u.pathname === '/quiz/' ? 'index.html' : u.pathname.startsWith('/quiz/') ? u.pathname.slice(6) : null;
    const arq = nome && path.join(PASTA, path.normalize(nome));
    if (!arq || !arq.startsWith(PASTA) || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream' });
    fs.createReadStream(arq).pipe(res);
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

// Exemplo de conferência de base/lead-score.md (v2):
// faturamento R$ 500 mil a R$ 1,5 milhão (15) · venda média R$ 10 mil (15) · 2 ou 3 vendedores (10) · 200 leads (10)
// CRM em dia (10) · dono (15) · dinheiro na mesa de 4 vezes o custo mensal (15) · tentativas "1 ou 2" e sobra "Alguns" (6) = 96
// O funil 200 · 50% · 50 · 40 · 2, com venda de R$ 10 mil, deixa 6 vendas na mesa: R$ 60 mil = 4 × (R$ 45 mil ÷ 3).
// Primeiro contato "Em até 1 hora" vale 0, para os sinais somarem os 6 do exemplo.
const EXEMPLO = {
  ramo: 'Serviços para empresas', faturamento: 'R$ 500 mil a R$ 1,5 milhão', vendedores: '2 ou 3',
  'quem-marca': 'Sim. O vendedor faz tudo', ticket: '10000', origem: 'Indicação de clientes',
  crm: 'Sim, e o time atualiza todo dia', cargo: 'Dono(a) ou sócio(a)',
  numeros: ['200', '50', '50', '40', '2'], causa: 'Em até 1 hora', causa2: '1 ou 2', causa3: 'Alguns'
};
const ELIMINATORIO = Object.assign({}, EXEMPLO, { faturamento: 'Menos de R$ 50 mil' });

let falhas = 0;
const conferir = (ok, texto) => { console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto); if (!ok) falhas++; };

// respostas: lista de status que o garçom de mentira devolve, um por envio (o último se repete)
async function abrir(browser, largura, endereco, respostas) {
  const ctx = await browser.newContext({ viewport: { width: largura, height: largura === 375 ? 812 : 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const pacotes = [], envios = [], consoleTexto = [];
  page.on('console', m => consoleTexto.push(m.text()));
  await page.route('**/api/fim-quiz', async rota => {
    const r = rota.request();
    envios.push({ metodo: r.method(), tipo: r.headers()['content-type'], endereco: r.url() });
    try { pacotes.push(JSON.parse(r.postData())); } catch (e) { pacotes.push(null); }
    const status = respostas[Math.min(envios.length - 1, respostas.length - 1)];
    await rota.fulfill({ status, contentType: 'application/json', body: status === 201 ? '{"ok":true}' : '{"ok":false,"erro":"servico indisponivel"}' });
  });
  // Nenhuma requisição sai para fora, a não ser as fontes do Google que o mockup já carregava (visual, conflito-18)
  const externas = [];
  page.on('request', r => { const u = r.url(); if (!u.startsWith('file://') && !u.startsWith('data:') && !u.startsWith(BASE)) externas.push(u); });
  await page.goto(endereco);
  return { ctx, page, pacotes, envios, consoleTexto, externas };
}
let BASE = '';
const semDadoNoConsole = t => t.consoleTexto.every(x => !DADO_PESSOAL.test(x));
const naTela = (page, id) => page.waitForFunction(i => location.hash === '#' + i, id, { timeout: 15000 });
const opcao = (page, valor) => page.locator('[data-corpo] .opcao[data-valor="' + valor + '"]').click();
const print = (page, nome, largura) => page.screenshot({ path: path.join(PRINTS, nome + '-' + largura + '.png'), fullPage: true });

// Percorre da capa até a tela de contato
async function ateContato(page, r, largura, comPrints) {
  if (comPrints) await print(page, 'capa', largura);
  await page.locator('.cartao__link[data-acao="proximo"]').click();
  await naTela(page, 'abertura');
  await page.locator('.abertura__copy [data-acao="proximo"]').click();
  await naTela(page, 'nome');
  await page.fill('#nomeIn', 'Marina');
  await page.click('#seguir');
  await naTela(page, 'ramo'); await opcao(page, r.ramo);
  await naTela(page, 'faturamento');
  if (comPrints) await print(page, 'pergunta', largura);
  await opcao(page, r.faturamento);
  await naTela(page, 'vendedores'); await opcao(page, r.vendedores);
  await naTela(page, 'quem-marca'); await opcao(page, r['quem-marca']);
  await naTela(page, 'valor-medio');
  await page.fill('#ticket', r.ticket);
  await page.click('#seguirTicket');
  await naTela(page, 'origem'); await opcao(page, r.origem);
  await page.click('[data-corpo] [data-acao="proximo"]');
  await naTela(page, 'crm'); await opcao(page, r.crm);
  await naTela(page, 'cargo'); await opcao(page, r.cargo);
  await naTela(page, 'lembra'); await opcao(page, 'Sim');
  await naTela(page, 'numeros');
  for (let i = 0; i < 5; i++) await page.fill('#num' + i, r.numeros[i]);
  await page.click('[data-corpo] [data-acao="proximo"]');
  await naTela(page, 'causa'); await opcao(page, r.causa);
  await naTela(page, 'causa2'); await opcao(page, r.causa2);
  await naTela(page, 'causa3'); await opcao(page, r.causa3);
  await naTela(page, 'contato');
  await page.fill('#nome', PESSOA.nome);
  await page.fill('#email', PESSOA.email);
  await page.fill('#tel', PESSOA.tel);
}
async function enviarComConsentimento(page, largura, comPrints) {
  await page.check('#consWhats');
  await page.check('#consEmail');
  if (comPrints) await print(page, 'contato-consentimento', largura);
  await page.click('#enviar');
}

(async () => {
  fs.mkdirSync(PRINTS, { recursive: true });
  const srv = await servir();
  BASE = 'http://127.0.0.1:' + srv.address().port + '/';
  const PAGINA = BASE + 'quiz/' + BUSCA;
  const browser = await chromium.launch({ executablePath: acharChromium() });

  for (const largura of [375, 1440]) {
    console.log('\n· ' + largura + ' pixels');

    // 1. Exemplo do lead score
    let t = await abrir(browser, largura, PAGINA, [201]);
    await ateContato(t.page, EXEMPLO, largura, true);
    await enviarComConsentimento(t.page, largura, true);
    await t.page.waitForFunction(() => location.hash === '#plano', null, { timeout: 15000 });
    await print(t.page, 'resultado-a', largura);
    let p = t.pacotes[0], e = t.envios[0];
    conferir(t.envios.length === 1, 'exemplo: um envio para /api/fim-quiz');
    conferir(e && e.metodo === 'POST' && e.tipo === 'application/json' && e.endereco === BASE + 'api/fim-quiz', 'exemplo: POST, application/json, na mesma origem (' + (e && e.endereco.replace(BASE, '/')) + ')');
    conferir(p && p.evento.lead_score_nota === 96, 'exemplo: total 96 (veio ' + (p && p.evento.lead_score_nota) + ')');
    conferir(p && p.evento.lead_score_faixa === 'a', 'exemplo: faixa a (veio ' + (p && p.evento.lead_score_faixa) + ')');
    conferir(p && p.evento.lead_score_versao === 2, 'exemplo: lead_score_versao 2');
    conferir(p && p.evento.tipo === 'fim_quiz' && p.evento.funil === 'funil-01' && p.evento.entrega === 'quiz-01' && p.evento.versao_entrega === 1, 'exemplo: etiquetas funil-01, quiz-01, versão 1');
    conferir(p && p.evento.utm_source === 'bio' && p.evento.utm_campaign === 'funil-01', 'exemplo: utm lidas do endereço (bio, funil-01)');
    conferir(p && p.pessoa.consentimento_whatsapp === 'sim' && p.pessoa.consentimento_email === 'sim' && !!p.pessoa.consentimento_em, 'exemplo: consentimento no pacote');
    conferir(p && p.pessoa.nome === PESSOA.nome && p.pessoa.email === PESSOA.email, 'exemplo: pessoa de teste marcada (TESTE, @teste.invalid)');
    conferir(p && Object.keys(p).join() === 'pessoa,evento', 'exemplo: pacote só com pessoa e evento');
    conferir(!(await t.page.locator('#avisoEnvio').isVisible()), 'exemplo: nenhum aviso de falha');
    conferir(semDadoNoConsole(t), 'exemplo: console sem o pacote e sem dado de pessoa');
    conferir(t.externas.every(u => /fonts\.(googleapis|gstatic)\.com/.test(u)), 'exemplo: nenhuma requisição externa além das fontes do mockup');
    if (largura === 1440) console.log('  pacote do exemplo: ' + JSON.stringify(p));
    await t.ctx.close();

    // 2. Caso eliminatório
    t = await abrir(browser, largura, PAGINA, [201]);
    await ateContato(t.page, ELIMINATORIO, largura, false);
    await enviarComConsentimento(t.page, largura, false);
    await t.page.waitForFunction(() => location.hash === '#relatorio-nao', null, { timeout: 15000 });
    await print(t.page, 'resultado-eliminatorio', largura);
    p = t.pacotes[0];
    conferir(t.envios.length === 1, 'eliminatório: um envio');
    conferir(p && p.evento.lead_score_faixa === 'eliminatorio', 'eliminatório: faixa eliminatorio (veio ' + (p && p.evento.lead_score_faixa) + ', nota ' + (p && p.evento.lead_score_nota) + ')');
    conferir(await t.page.locator('[data-acao="interesse"]').isVisible(), 'eliminatório: tela do relatório com "Tenho interesse"');
    conferir(semDadoNoConsole(t), 'eliminatório: console sem dado de pessoa');
    await t.ctx.close();

    // 3. Sem consentimento
    t = await abrir(browser, largura, PAGINA, [201]);
    await ateContato(t.page, EXEMPLO, largura, false);
    conferir(await t.page.locator('#enviar').isDisabled(), 'sem consentimento: botão desligado');
    conferir(await t.page.locator('#consAviso').isVisible(), 'sem consentimento: aviso visível');
    await print(t.page, 'contato-sem-consentimento', largura);
    // força o clique, como se o botão tivesse sido religado por fora
    await t.page.evaluate(() => { const b = document.getElementById('enviar'); b.disabled = false; b.click(); });
    await t.page.waitForTimeout(1500);
    conferir(t.envios.length === 0, 'sem consentimento: nenhum envio, mesmo forçando o clique');
    conferir(await t.page.evaluate(() => location.hash) === '#contato', 'sem consentimento: continua na tela de contato');
    await t.ctx.close();

    // 4. Envio que falha (o garçom de mentira responde 502 e, na segunda vez, 201)
    t = await abrir(browser, largura, PAGINA, [502, 201]);
    await ateContato(t.page, EXEMPLO, largura, false);
    await enviarComConsentimento(t.page, largura, false);
    await t.page.locator('#avisoEnvio').waitFor({ state: 'visible', timeout: 15000 });
    await t.page.waitForFunction(() => location.hash === '#plano', null, { timeout: 15000 });
    const aviso = (await t.page.locator('#avisoEnvio').innerText()) || '';
    conferir(await t.page.locator('#avisoEnvio').isVisible() && aviso.includes('diagnóstico continua'), 'falha: aviso visível, dizendo que o diagnóstico continua na tela');
    conferir(!/502|servico|indisponivel|erro|api|fetch/i.test(aviso), 'falha: aviso sem detalhe técnico');
    conferir(await t.page.locator('#avisoEnvio').isVisible() && await t.page.evaluate(() => location.hash) === '#plano', 'falha: o diagnóstico continua na tela, com o aviso por cima');
    // só a tela visível, onde o aviso fica preso no alto
    await t.page.screenshot({ path: path.join(PRINTS, 'envio-falhou-' + largura + '.png') });
    await t.page.click('#reenviar');
    await t.page.locator('#avisoEnvio').waitFor({ state: 'hidden', timeout: 15000 });
    conferir(t.envios.length === 2, 'falha: "Tentar de novo" reenvia (2 envios)');
    conferir(JSON.stringify(t.pacotes[0]) === JSON.stringify(t.pacotes[1]), 'falha: o reenvio manda o mesmo pacote');
    conferir(semDadoNoConsole(t), 'falha: console sem dado de pessoa');
    await t.ctx.close();

    // 5. Aberta direto do arquivo: revisão sem gravar
    t = await abrir(browser, largura, ARQUIVO, [201]);
    await ateContato(t.page, EXEMPLO, largura, false);
    await enviarComConsentimento(t.page, largura, false);
    await t.page.waitForFunction(() => location.hash === '#plano', null, { timeout: 15000 });
    await t.page.waitForTimeout(500);
    conferir(t.envios.length === 0, 'arquivo (file://): percorre tudo e nada é enviado');
    conferir(!(await t.page.locator('#avisoEnvio').isVisible()), 'arquivo (file://): nenhum aviso de falha');
    conferir(semDadoNoConsole(t), 'arquivo (file://): console sem dado de pessoa');
    await t.ctx.close();
  }

  await browser.close();
  srv.close();
  console.log('\n' + (falhas ? falhas + ' conferência(s) falharam' : 'Tudo certo: todas as conferências passaram'));
  process.exit(falhas ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
