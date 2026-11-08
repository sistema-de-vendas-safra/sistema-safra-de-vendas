// Teste do quiz-01 (entregas/quizzes/quiz-01/pagina/index.html), na página local, sem rede.
// Uso: node nucleo/ferramentas/prints/testar-quiz-01.js
// 1. Percorre o quiz com as respostas do exemplo de base/lead-score.md e confere: total 96, faixa a.
// 2. Percorre um caso eliminatório (faturamento "Menos de R$ 50 mil") e confere a faixa e a tela.
// 3. Confere que, sem consentimento, nada é enviado e o aviso aparece.
// Tira prints em 375 e 1440 pixels em entregas/quizzes/quiz-01/prints/.
// Todos os dados de pessoa são fictícios.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const { acharChromium } = require('./print.js');

const RAIZ = path.resolve(__dirname, '../../..');
const PAGINA = 'file://' + path.join(RAIZ, 'entregas/quizzes/quiz-01/pagina/index.html') + '?utm_source=bio&utm_campaign=funil-01';
const PRINTS = path.join(RAIZ, 'entregas/quizzes/quiz-01/prints');
const MARCA = '[quiz-01] pacote fim_quiz ';

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

async function abrir(browser, largura) {
  const ctx = await browser.newContext({ viewport: { width: largura, height: largura === 375 ? 812 : 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const pacotes = [];
  page.on('console', m => { const t = m.text(); if (t.startsWith(MARCA)) pacotes.push(JSON.parse(t.slice(MARCA.length))); });
  // Nenhuma requisição sai para fora, a não ser as fontes do Google que o mockup já carregava (visual, conflito-18)
  const externas = [];
  page.on('request', r => { const u = r.url(); if (!u.startsWith('file://') && !u.startsWith('data:')) externas.push(u); });
  await page.goto(PAGINA);
  return { ctx, page, pacotes, externas };
}
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
  await page.fill('#email', 'marina@example.com');
  await page.fill('#tel', '00900000000');
}
async function enviarComConsentimento(page, largura, comPrints) {
  await page.check('#consWhats');
  await page.check('#consEmail');
  if (comPrints) await print(page, 'contato-consentimento', largura);
  await page.click('#enviar');
}

(async () => {
  fs.mkdirSync(PRINTS, { recursive: true });
  const browser = await chromium.launch({ executablePath: acharChromium() });

  for (const largura of [375, 1440]) {
    console.log('\n· ' + largura + ' pixels');

    // 1. Exemplo do lead score
    let t = await abrir(browser, largura);
    await ateContato(t.page, EXEMPLO, largura, true);
    await enviarComConsentimento(t.page, largura, true);
    await t.page.waitForFunction(() => location.hash === '#plano', null, { timeout: 15000 });
    await print(t.page, 'resultado-a', largura);
    let p = t.pacotes[0];
    conferir(t.pacotes.length === 1, 'exemplo: um pacote no console');
    conferir(p && p.evento.lead_score_nota === 96, 'exemplo: total 96 (veio ' + (p && p.evento.lead_score_nota) + ')');
    conferir(p && p.evento.lead_score_faixa === 'a', 'exemplo: faixa a (veio ' + (p && p.evento.lead_score_faixa) + ')');
    conferir(p && p.evento.lead_score_versao === 2, 'exemplo: lead_score_versao 2');
    conferir(p && p.evento.tipo === 'fim_quiz' && p.evento.funil === 'funil-01' && p.evento.entrega === 'quiz-01' && p.evento.versao_entrega === 1, 'exemplo: etiquetas funil-01, quiz-01, versão 1');
    conferir(p && p.evento.utm_source === 'bio' && p.evento.utm_campaign === 'funil-01', 'exemplo: utm lidas do endereço (bio, funil-01)');
    conferir(p && p.pessoa.consentimento_whatsapp === 'sim' && p.pessoa.consentimento_email === 'sim' && !!p.pessoa.consentimento_em, 'exemplo: consentimento gravado no pacote');
    conferir(t.externas.every(u => /fonts\.(googleapis|gstatic)\.com/.test(u)), 'exemplo: nenhuma requisição externa além das fontes do mockup');
    if (largura === 1440) console.log('  pacote do exemplo: ' + JSON.stringify(p));
    await t.ctx.close();

    // 2. Caso eliminatório
    t = await abrir(browser, largura);
    await ateContato(t.page, ELIMINATORIO, largura, false);
    await enviarComConsentimento(t.page, largura, false);
    await t.page.waitForFunction(() => location.hash === '#relatorio-nao', null, { timeout: 15000 });
    await print(t.page, 'resultado-eliminatorio', largura);
    p = t.pacotes[0];
    conferir(p && p.evento.lead_score_faixa === 'eliminatorio', 'eliminatório: faixa eliminatorio (veio ' + (p && p.evento.lead_score_faixa) + ', nota ' + (p && p.evento.lead_score_nota) + ')');
    conferir(await t.page.locator('[data-acao="interesse"]').isVisible(), 'eliminatório: tela do relatório com "Tenho interesse"');
    await t.ctx.close();

    // 3. Sem consentimento
    t = await abrir(browser, largura);
    await ateContato(t.page, EXEMPLO, largura, false);
    conferir(await t.page.locator('#enviar').isDisabled(), 'sem consentimento: botão desligado');
    conferir(await t.page.locator('#consAviso').isVisible(), 'sem consentimento: aviso visível');
    await print(t.page, 'contato-sem-consentimento', largura);
    // força o clique, como se o botão tivesse sido religado por fora
    await t.page.evaluate(() => { const b = document.getElementById('enviar'); b.disabled = false; b.click(); });
    await t.page.waitForTimeout(1500);
    conferir(t.pacotes.length === 0, 'sem consentimento: nenhum pacote enviado, mesmo forçando o clique');
    conferir(await t.page.evaluate(() => location.hash) === '#contato', 'sem consentimento: continua na tela de contato');
    await t.ctx.close();
  }

  await browser.close();
  console.log('\n' + (falhas ? falhas + ' conferência(s) falharam' : 'Tudo certo: todas as conferências passaram'));
  process.exit(falhas ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
