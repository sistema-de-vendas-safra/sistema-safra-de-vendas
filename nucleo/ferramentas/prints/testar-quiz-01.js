// Teste do quiz-01 (entregas/quizzes/quiz-01/pagina/index.html, v4), sem rede de verdade.
// Uso: node nucleo/ferramentas/prints/testar-quiz-01.js
// A página é servida por um servidorzinho em 127.0.0.1, só durante o teste, em /quiz/ (como no site
// do protótipo), com as fontes em /quiz/fontes/ tiradas de nucleo/ferramentas/fontes/ (como faz o montador).
// Os POST para /api/fim-quiz e /api/evento são interceptados pelo navegador sem tela e respondidos aqui:
// nada sai para o garçom nem para o Supabase. Cada pacote recebido passa pelas mesmas conferências do
// garçom v4 (conferirPacote e conferirEvento, importadas de entregas/garcom/garcom.mjs).
// 1. Exemplo de base/lead-score.md, caixa marcada (o padrão): início do quiz ao abrir, total 96, faixa a.
// 2. Eliminatório com a sessão vinda da landing: faixa e nota, e o clique em "Tenho interesse" depois do fim gravado.
// 3. Corte mais restritivo (14.2): faixa c, que passa no corte do Júnior, vai para o relatório de não qualificado;
//    com /api/evento fora do ar, a pessoa segue sem aviso (10.10).
// 4. Caixa desmarcada (13.4): o diagnóstico aparece e nada é enviado, nem o fim do quiz nem o clique.
// 5. Envio que falha: aviso visível, diagnóstico na tela, "Tentar de novo" reenvia o mesmo pacote;
//    no eliminatório, o clique feito durante a falha só sai depois de o reenvio gravar (32.2).
// 6. Aberta direto do arquivo (file://): percorre tudo e nada é enviado.
// Abertura (v4): o quiz abre nela, sem a capa, com o cabeçalho e o botão "Fazer a Análise" da landing-page-02. No computador,
// título, promessa e botão ficam parados enquanto o relatório de exemplo rola; no celular, o texto vem antes e o botão fica fixo
// no rodapé quando o da página sai da tela. A entrada no quiz é pelo botão da abertura, pelo do cabeçalho (eliminatório) e,
// no celular, pelo do rodapé (corte).
// Em todos: o console não mostra o pacote nem nenhum dado de pessoa, e nenhuma requisição sai para outro endereço.
// Medição (v9 do protótipo, pedido 17, 17.2; decisão #116): a página é servida com o bloco que a montagem acrescenta
// (entregas/prototipo-funil-01/medicao.mjs), salvo no caso 6, que abre a entrega crua. Os casos 1 a 6 rodam em 375, 360 (com 640
// de altura) e 1440, sem tocar no aviso de cookies, que fica no topo. Duas conferências da abertura mudaram de ponto de partida por
// causa dele: "só o relatório rola" começa com o aviso rolado para fora (a forma original, de scroll 0, roda na seção da medição
// com "recusado" guardado); e "sem a barra antes de rolar" virou a regra da página, que vale com e sem o aviso: a barra aparece
// se, e só se, o botão da abertura está fora da tela ou sob o cabeçalho. Seção nova da medição, nas três larguras: sem escolha (o
// aviso no topo, em fluxo normal, sem cobrir os botões nem a barra do celular, nada guardado, nada para fora); "Recusar" (guarda
// "recusado", nada para fora, nem depois de recarregar; o foco não fica no body); "Aceitar" com o id_sessao no endereço (o
// primeiro pedido para fora é o gtm.js do GTM-T6L4QTB8, só o Google, pagina_limpa e origem_limpa sem o id_sessao, o endereço da
// barra limpo, só a análise concedida); uma rodada inteira com o "Aceitar" no começo (o mesmo id_sessao no início, no fim e no
// clique); teclado (o foco vai ao "Pular para o conteúdo" depois da escolha); o link "Cookies"; e a troca de aceito para recusado
// (cookies _ga apagados). Em todo contexto, o pedido a www.googletagmanager.com é respondido aqui com 404, como enquanto o
// contêiner não é publicado, e anotado como requisição para outro endereço: nenhum pedido ao Google sai da máquina.
// Tira prints em 375 e 1440 pixels em entregas/quizzes/quiz-01/prints/ (e os do aviso, aviso-375 e aviso-1440); em 360, nenhum.
// Dados de pessoa de teste, marcados (#102): nome começando por TESTE, e-mail @teste.invalid.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { pathToFileURL } = require('url');
const { acharChromium } = require('./print.js');

const RAIZ = path.resolve(__dirname, '../../..');
const PASTA = path.join(RAIZ, 'entregas/quizzes/quiz-01/pagina');
const FONTES = path.join(RAIZ, 'nucleo/ferramentas/fontes');
const LISTA_FONTES = JSON.parse(fs.readFileSync(path.join(FONTES, 'fontes.json'), 'utf8')).quiz;
const BUSCA = '?utm_source=bio&utm_campaign=funil-01';
const ARQUIVO = 'file://' + path.join(PASTA, 'index.html') + BUSCA;
const PRINTS = path.join(RAIZ, 'entregas/quizzes/quiz-01/prints');
const PESSOA = { nome: 'TESTE Marina', email: 'marina@teste.invalid', tel: '00900000000' };
const SESSAO_DA_LANDING = 'sessao-landing-teste-0001';
const CAIXA = 'Aceito receber o meu diagnóstico e o contato da equipe por WhatsApp, por mensagem ou ligação, e por e-mail.';
const NOTA_LEAD_SCORE = 'Anotado. Seu interesse fica registrado com o seu diagnóstico.';
const FORMATO_SESSAO = /^sessao-[a-z0-9-]{1,60}$/;
// nada disto pode aparecer no console da página
const DADO_PESSOAL = /TESTE|teste\.invalid|90000|pacote fim_quiz|"pessoa"/;

// Servidorzinho só para o teste: serve a pasta da página em /quiz/ e as fontes da lista em /quiz/fontes/, nada mais
const TIPOS = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
function servir() {
  const srv = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://127.0.0.1');
    let arq = null;
    const fonte = u.pathname.startsWith('/quiz/fontes/') && LISTA_FONTES.find(f => '/quiz/fontes/' + f.arquivo === u.pathname);
    if (fonte) arq = path.join(FONTES, 'node_modules', fonte.pacote, 'files', fonte.arquivo);
    else {
      const nome = u.pathname === '/quiz/' ? 'index.html' : u.pathname.startsWith('/quiz/') ? u.pathname.slice(6) : null;
      arq = nome && path.join(PASTA, path.normalize(nome));
      if (arq && !arq.startsWith(PASTA)) arq = null;
    }
    if (!arq || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream' });
    // A página vai com o bloco da medição, como no site montado (o mesmo medicao.mjs da montagem; v9 do protótipo)
    if (arq === path.join(PASTA, 'index.html')) return res.end(medicao.acrescentarMedicao(fs.readFileSync(arq, 'utf8')));
    fs.createReadStream(arq).pipe(res);
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

// Exemplo de conferência de base/lead-score.md (v3, mesmos pontos da v2):
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
// Faixa c que passa no corte do Júnior (fatura a partir de R$ 50 mil e tem vendedor):
// faturamento 5 · venda de R$ 6 mil 5 · 1 vendedor 3 · 30 leads 0 · sem CRM 0 · vendedor 2 · funil 30 · 50% · 5 · 4 · 1,
// que na meta continua com 1 venda (dinheiro na mesa zero, "menos de 0,5": 3) · sinais 6 = 24, faixa c.
const FAIXA_C = Object.assign({}, EXEMPLO, {
  faturamento: 'R$ 50 mil a R$ 150 mil', ticket: '6000', vendedores: '1', crm: 'Não. Fica no WhatsApp e na cabeça de cada um',
  cargo: 'Vendedor(a)', numeros: ['30', '50', '5', '4', '1']
});

// Altura da janela em cada largura: 375 e 1440 como sempre; 360 com 640, o celular pequeno (medição, v9 do protótipo)
const ALTURA = { 375: 812, 360: 640, 1440: 900 };
let falhas = 0;
const conferir = (ok, texto) => { console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto); if (!ok) falhas++; };

// fim: lista de status que o garçom de mentira devolve em /api/fim-quiz, um por envio (o último se repete)
// evento: status de /api/evento, ou 'abortar' para a conexão cair
let garcom = null, medicao = null;
// O pedido a www.googletagmanager.com é respondido aqui com 404 em todo contexto (medição, v9 do protótipo), como o Google
// enquanto o contêiner não é publicado: nenhum pedido ao Google sai da máquina, e ele continua anotado em externas, para as
// conferências "nenhuma requisição para outro endereço" pegarem o vazamento. opcoes.referer abre a página como se viesse dali.
async function abrir(browser, largura, endereco, fim, evento, opcoes = {}) {
  const ctx = await browser.newContext({ viewport: { width: largura, height: ALTURA[largura] || 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.route('https://www.googletagmanager.com/**', rota => rota.fulfill({ status: 404, contentType: 'text/plain', body: '' }));
  const t = { ctx, page, pacotes: [], envios: [], eventos: [], ordem: [], consoleTexto: [], externas: [], pedidos: [] };
  page.on('console', m => t.consoleTexto.push(m.text()));
  await page.route('**/api/fim-quiz', async rota => {
    const r = rota.request();
    t.envios.push({ metodo: r.method(), tipo: r.headers()['content-type'], endereco: r.url() });
    let pacote = null;
    try { pacote = JSON.parse(r.postData()); } catch (e) {}
    t.pacotes.push(pacote);
    const status = fim[Math.min(t.envios.length - 1, fim.length - 1)];
    t.ordem.push('fim:' + status);
    await rota.fulfill({ status, contentType: 'application/json', body: status === 201 ? '{"ok":true}' : '{"ok":false,"erro":"servico indisponivel"}' });
  });
  await page.route('**/api/evento', async rota => {
    const r = rota.request();
    let pacote = null;
    try { pacote = JSON.parse(r.postData()); } catch (e) {}
    t.eventos.push({ metodo: r.method(), tipo: r.headers()['content-type'], endereco: r.url(), pacote });
    t.ordem.push('evento:' + (pacote && pacote.evento && pacote.evento.tipo));
    if (evento === 'abortar') return rota.abort();
    await rota.fulfill({ status: evento, contentType: 'application/json', body: evento === 201 ? '{"ok":true}' : '{"ok":false,"erro":"servico indisponivel"}' });
  });
  page.on('request', r => {
    const u = r.url();
    t.pedidos.push(u);
    if (!u.startsWith('file://') && !u.startsWith('data:') && !u.startsWith(BASE)) t.externas.push(u);
  });
  await page.goto(endereco, opcoes.referer ? { referer: opcoes.referer } : undefined);
  return t;
}
let BASE = '';
const semDadoNoConsole = t => t.consoleTexto.every(x => !DADO_PESSOAL.test(x));
const naTela = (page, id) => page.waitForFunction(i => location.hash === '#' + i, id, { timeout: 15000 });
const opcao = (page, valor) => page.locator('[data-corpo] .opcao[data-valor="' + valor + '"]').click();
// Prints só em 375 e 1440, como sempre; em 360 os casos rodam sem print
const print = (page, nome, largura) => largura === 360 ? Promise.resolve() : page.screenshot({ path: path.join(PRINTS, nome + '-' + largura + '.png'), fullPage: true });
const doTipo = (t, tipo) => t.eventos.filter(e => e.pacote && e.pacote.evento && e.pacote.evento.tipo === tipo);
const espera = ms => new Promise(ok => setTimeout(ok, ms));

// Percorre da abertura até a tela de contato; devolve o que viu dos campos de número e do valor médio.
// entrada: 'botao' (o da abertura), 'cabecalho' (o do cabeçalho da landing-page-02) ou 'barra' (o fixo no rodapé, só no celular)
async function ateContato(page, r, largura, comPrints, entrada = 'botao') {
  const visto = {};
  await naTela(page, 'abertura');
  if (comPrints) await print(page, 'abertura', largura);
  if (entrada === 'barra') {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForFunction(() => document.body.hasAttribute('data-barra'), null, { timeout: 5000 });
    await page.locator('#barraSafra [data-acao="proximo"]').click();
  } else {
    await page.locator(entrada === 'cabecalho' ? '#cabSafra [data-acao="proximo"]' : '.abertura__copy [data-acao="proximo"]').click();
  }
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
  visto.ticketVazioDesligado = (await page.inputValue('#ticket')) === '' && await page.locator('#seguirTicket').isDisabled();
  await page.fill('#ticket', r.ticket);
  await page.click('#seguirTicket');
  await naTela(page, 'origem'); await opcao(page, r.origem);
  await page.click('[data-corpo] [data-acao="proximo"]');
  await naTela(page, 'crm'); await opcao(page, r.crm);
  await naTela(page, 'cargo'); await opcao(page, r.cargo);
  await naTela(page, 'lembra'); await opcao(page, 'Sim');
  await naTela(page, 'numeros');
  visto.numerosVazios = await page.evaluate(() => [0, 1, 2, 3, 4].every(i => document.getElementById('num' + i).value === ''));
  for (let i = 0; i < 5; i++) await page.fill('#num' + i, r.numeros[i]);
  await page.click('[data-corpo] [data-acao="proximo"]');
  await naTela(page, 'causa'); await opcao(page, r.causa);
  await naTela(page, 'causa2'); await opcao(page, r.causa2);
  await naTela(page, 'causa3'); await opcao(page, r.causa3);
  await naTela(page, 'contato');
  await page.fill('#nome', PESSOA.nome);
  await page.fill('#email', PESSOA.email);
  await page.fill('#tel', PESSOA.tel);
  return visto;
}

(async () => {
  const { conferirPacote, conferirEvento } = await import(pathToFileURL(path.join(RAIZ, 'entregas/garcom/garcom.mjs')).href);
  garcom = { conferirPacote, conferirEvento };
  medicao = await import(pathToFileURL(path.join(RAIZ, 'entregas/prototipo-funil-01/medicao.mjs')).href);
  fs.mkdirSync(PRINTS, { recursive: true });
  const srv = await servir();
  BASE = 'http://127.0.0.1:' + srv.address().port + '/';
  const PAGINA = BASE + 'quiz/' + BUSCA;
  const browser = await chromium.launch({ executablePath: acharChromium() });

  // A barra fixa do rodapé (só no celular) aparece se, e só se, o botão da abertura está fora da tela ou sob o cabeçalho
  // (a regra da página, vigiarBotaoAbertura): vale com e sem o aviso de cookies, que, no alto, pode empurrar o botão para baixo da dobra
  const regraDaBarra = page => page.evaluate(async () => {
    await new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
    const b = document.getElementById('botaoAbertura').getBoundingClientRect(), cab = document.getElementById('cabSafra').getBoundingClientRect();
    const fora = b.bottom <= Math.max(0, cab.bottom) || b.top >= innerHeight;
    const aparece = document.body.hasAttribute('data-barra') && getComputedStyle(document.getElementById('barraSafra')).display !== 'none';
    return { fora, aparece, celular: innerWidth < 900, botao: Math.round(b.top) + '-' + Math.round(b.bottom), visivel: Math.max(0, Math.round(Math.min(b.bottom, innerHeight) - Math.max(b.top, cab.bottom))) };
  });

  for (const largura of [375, 360, 1440]) {
    console.log('\n· ' + largura + ' pixels' + (largura === 360 ? ', 640 de altura' : ''));

    // 1. Exemplo do lead score, caixa marcada (o padrão)
    let t = await abrir(browser, largura, PAGINA, [201], 201);
    conferir(await t.page.evaluate(() => document.compatMode) === 'CSS1Compat', 'doctype: modo padrão (CSS1Compat), não mais BackCompat (09.1)');
    // na abertura aparecem Inter, Space Grotesk e Geist (a do cabeçalho e do botão da landing-page-02); a de mão fica para o relatório
    const estadoFontes = await t.page.evaluate(async () => { await document.fonts.ready; return [...document.fonts].map(f => f.family.replace(/"/g, '') + ':' + f.status).join(', '); });
    conferir(['Inter', 'Space Grotesk', 'Geist'].every(n => estadoFontes.includes(n + ':loaded')), 'exemplo: Inter, Space Grotesk e Geist carregadas na abertura (' + estadoFontes + ')');
    const ab = await t.page.evaluate(() => {
      const vis = s => { const e = document.querySelector(s); return !!e && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0; };
      return { hash: location.hash, num: document.getElementById('protoNum').textContent, capa: !!document.querySelector('[data-ir="capa"]'),
        cab: vis('#cabSafra'), topo: vis('#topo'), logo: !!document.querySelector('#cabSafra .logo-safra svg'),
        botoes: [...document.querySelectorAll('#cabSafra .btn-safra, .abertura__copy .btn-safra')].map(b => b.textContent.trim()),
        comecar: document.body.textContent.includes('Começar diagnóstico') };
    });
    conferir(ab.hash === '#abertura' && ab.num === '1/27' && !ab.capa, 'abertura: o quiz abre nela, sem a capa (tela 1 de 27; ' + ab.hash + ', ' + ab.num + ')');
    conferir(ab.cab && !ab.topo && ab.logo, 'abertura: cabeçalho da landing-page-02 com o logo do Safra, no lugar do cabeçalho do quiz');
    conferir(ab.botoes.join('|') === 'Fazer a Análise|Fazer a Análise' && !ab.comecar, 'abertura: botões do cabeçalho e da página dizem "Fazer a Análise" (' + ab.botoes.join(' | ') + ')');
    await t.page.waitForTimeout(200);
    const rb = await regraDaBarra(t.page);
    conferir(rb.aparece === (rb.fora && rb.celular), 'abertura, antes de rolar: a barra do rodapé aparece se, e só se, o botão da abertura está fora da tela ou sob o cabeçalho (botão ' + rb.botao + ', ' + rb.visivel + ' pixels à vista; barra ' + (rb.aparece ? 'aparece' : 'não aparece') + ')');
    // espera a entrada da tela (desliza alguns pixels) terminar; as animações sem fim (a luz dos botões) não contam
    await t.page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect && a.effect.getComputedTiming().iterations !== Infinity).map(a => a.finished.catch(() => {}))));
    // Sem escolha guardada, o aviso de cookies (v9 do protótipo) fica no topo, em fluxo normal, e sai da tela com a rolagem: a medida
    // começa com ele rolado para fora (a altura dele), onde a abertura encosta no alto como antes. O aviso não é tocado.
    await t.page.evaluate(() => { const a = document.getElementById('aviso-cookies'); window.scrollTo(0, a ? a.offsetHeight : 0); }); await t.page.waitForTimeout(300);
    const antes =await t.page.evaluate(() => ['.abertura h1', '.abertura__lede', '#botaoAbertura', '.previa', '#cabSafra'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().top)));
    await t.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await t.page.waitForTimeout(400);
    const depois = await t.page.evaluate(() => ['.abertura h1', '.abertura__lede', '#botaoAbertura', '.previa', '#cabSafra'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().top)));
    const comBarra = await t.page.evaluate(() => document.body.hasAttribute('data-barra') && getComputedStyle(document.getElementById('barraSafra')).display !== 'none');
    if (largura === 1440) {
      conferir(depois[0] === antes[0] && depois[1] === antes[1] && depois[2] === antes[2] && depois[3] < antes[3] && depois[4] === 0, 'abertura (computador): ao rolar, só o relatório se mexe; título, promessa, botão e cabeçalho ficam (' + antes.join(',') + ' → ' + depois.join(',') + ')');
      conferir(!comBarra, 'abertura (computador): a barra do rodapé não aparece');
    } else {
      conferir(antes[0] < antes[3] && depois[4] === 0, 'abertura (celular): o texto vem antes do relatório e o cabeçalho fica no alto (' + antes.join(',') + ' → ' + depois.join(',') + ')');
      conferir(comBarra, 'abertura (celular): rolando, o botão sai da tela e "Fazer a Análise" fica fixo no rodapé');
    }
    await t.page.evaluate(() => window.scrollTo(0, 0)); await t.page.waitForTimeout(300);
    await t.page.waitForTimeout(300);
    let ini = doTipo(t, 'inicio_quiz');
    const ei = ini[0] && ini[0].pacote.evento;
    conferir(ini.length === 1 && t.ordem[0] === 'evento:inicio_quiz', 'exemplo: um início do quiz, mandado quando o quiz abre (10.6; 18.5)');
    conferir(ini[0] && ini[0].metodo === 'POST' && ini[0].tipo === 'application/json' && ini[0].endereco === BASE + 'api/evento', 'exemplo: início do quiz por POST, application/json, na mesma origem (/api/evento)');
    conferir(ini[0] && garcom.conferirEvento(ini[0].pacote) === null, 'exemplo: início do quiz passa nas conferências do garçom v4 (' + (ini[0] && garcom.conferirEvento(ini[0].pacote)) + ')');
    conferir(ei && ei.funil === 'funil-01' && ei.entrega === 'quiz-01' && ei.versao_entrega === 2 && ei.utm_source === 'bio' && ei.utm_campaign === 'funil-01' && FORMATO_SESSAO.test(ei.id_sessao), 'exemplo: início com etiquetas funil-01, quiz-01, versão 2, utm do endereço e sessão no formato do banco');
    conferir(ini[0] && Object.keys(ini[0].pacote).join() === 'evento', 'exemplo: início do quiz sem pessoa');
    let visto = await ateContato(t.page, EXEMPLO, largura, true);
    conferir(visto.numerosVazios, 'exemplo: campos de número começam vazios (14.4)');
    conferir(visto.ticketVazioDesligado, 'exemplo: valor médio vazio e "Continuar" desligado até ter valor (14.5)');
    conferir(await t.page.locator('#consAceite').isChecked(), 'exemplo: a caixa única já vem marcada (13.4)');
    conferir(await t.page.locator('input[type="checkbox"]').count() === 1, 'exemplo: uma caixa só');
    conferir(!(await t.page.locator('#consAviso').isVisible()), 'exemplo: com a caixa marcada, o aviso de desmarcada não aparece');
    conferir((await t.page.locator('#consentimento').innerText()).includes(CAIXA), 'exemplo: texto da caixa da copy v2 (M16)');
    await print(t.page, 'contato-consentimento', largura);
    await t.page.click('#enviar');
    await naTela(t.page, 'plano');
    await t.page.waitForTimeout(300);
    await print(t.page, 'resultado-a', largura);
    let p = t.pacotes[0], e = t.envios[0];
    conferir(t.envios.length === 1, 'exemplo: um envio para /api/fim-quiz');
    conferir(e && e.metodo === 'POST' && e.tipo === 'application/json' && e.endereco === BASE + 'api/fim-quiz', 'exemplo: POST, application/json, na mesma origem (' + (e && e.endereco.replace(BASE, '/')) + ')');
    conferir(p && garcom.conferirPacote(p) === null, 'exemplo: o pacote passa nas conferências do garçom v4 (' + (p && garcom.conferirPacote(p)) + ')');
    conferir(p && p.evento.lead_score_nota === 96, 'exemplo: total 96 (veio ' + (p && p.evento.lead_score_nota) + ')');
    conferir(p && p.evento.lead_score_faixa === 'a', 'exemplo: faixa a (veio ' + (p && p.evento.lead_score_faixa) + ')');
    conferir(p && p.evento.lead_score_versao === 3, 'exemplo: lead_score_versao 3 (lead-score v3)');
    conferir(p && p.evento.tipo === 'fim_quiz' && p.evento.funil === 'funil-01' && p.evento.entrega === 'quiz-01' && p.evento.versao_entrega === 2, 'exemplo: etiquetas funil-01, quiz-01, versão 2');
    conferir(p && p.evento.utm_source === 'bio' && p.evento.utm_campaign === 'funil-01', 'exemplo: utm lidas do endereço (bio, funil-01)');
    conferir(p && ei && p.evento.id_sessao === ei.id_sessao, 'exemplo: o fim do quiz leva a mesma sessão do início');
    conferir(p && p.pessoa.consentimento_whatsapp === 'sim' && p.pessoa.consentimento_email === 'sim' && !!p.pessoa.consentimento_em, 'exemplo: a caixa preenche os dois consentimentos com o mesmo valor (#104)');
    conferir(p && p.pessoa.consentimento_texto.endsWith(CAIXA) && p.pessoa.consentimento_texto.includes('por mensagem ou ligação no WhatsApp e por e-mail'), 'exemplo: o texto aceito é o texto de antes da caixa e o da caixa');
    conferir(p && p.pessoa.nome === PESSOA.nome && p.pessoa.email === PESSOA.email, 'exemplo: pessoa de teste marcada (TESTE, @teste.invalid)');
    conferir(p && Object.keys(p).join() === 'pessoa,evento', 'exemplo: pacote só com pessoa e evento');
    conferir(!(await t.page.locator('#avisoEnvio').isVisible()), 'exemplo: nenhum aviso de falha');
    conferir(doTipo(t, 'interesse_pos_relatorio').length === 0, 'exemplo: nenhum clique mandado sem clique');
    conferir(semDadoNoConsole(t), 'exemplo: console sem o pacote e sem dado de pessoa');
    conferir(t.externas.length === 0, 'exemplo: nenhuma requisição para outro endereço' + (t.externas.length ? ' (' + t.externas.join(', ') + ')' : ''));
    conferir(LISTA_FONTES.filter(f => !f.arquivo.startsWith('permanent-marker')).every(f => t.pedidos.includes(BASE + 'quiz/fontes/' + f.arquivo)), 'exemplo: as fontes vêm de /quiz/fontes/, junto com a página (10.7; a de mão só no relatório)');
    if (largura === 1440) console.log('  pacote do exemplo: ' + JSON.stringify(p) + '\n  início do quiz: ' + JSON.stringify(ini[0] && ini[0].pacote));
    await t.ctx.close();

    // 2. Eliminatório, com a sessão vinda da landing, e o clique no fim
    t = await abrir(browser, largura, PAGINA + '&id_sessao=' + SESSAO_DA_LANDING, [201], 201);
    await ateContato(t.page, ELIMINATORIO, largura, false, 'cabecalho');
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await print(t.page, 'resultado-eliminatorio', largura);
    p = t.pacotes[0];
    conferir(t.envios.length === 1, 'eliminatório: um envio');
    conferir(p && p.evento.lead_score_faixa === 'eliminatorio' && p.evento.lead_score_nota === 81, 'eliminatório: faixa eliminatorio, com a nota guardada (14.8; veio ' + (p && p.evento.lead_score_faixa) + ', nota ' + (p && p.evento.lead_score_nota) + ')');
    conferir(doTipo(t, 'inicio_quiz')[0] && doTipo(t, 'inicio_quiz')[0].pacote.evento.id_sessao === SESSAO_DA_LANDING && p && p.evento.id_sessao === SESSAO_DA_LANDING, 'eliminatório: início e fim com a sessão que a landing mandou no endereço (10.5)');
    conferir(await t.page.locator('[data-acao="interesse"]').isVisible(), 'eliminatório: tela do relatório com "Tenho interesse"');
    conferir((await t.page.locator('.rel-copia').innerText()).trim() === 'Uma cópia deste diagnóstico vai para o seu e-mail e WhatsApp.', 'eliminatório: com a caixa marcada, a linha da cópia é a do mockup (copy v2, M21)');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(400);
    let cl = doTipo(t, 'interesse_pos_relatorio');
    conferir(cl.length === 1 && cl[0].pacote.evento.clique_fim_quiz === 'tenho-interesse', 'eliminatório: o clique vai como interesse_pos_relatorio, tenho-interesse (18.4)');
    conferir(cl[0] && garcom.conferirEvento(cl[0].pacote) === null && cl[0].pacote.evento.id_sessao === SESSAO_DA_LANDING, 'eliminatório: o clique passa nas conferências do garçom v4, com a mesma sessão');
    conferir(t.ordem.indexOf('fim:201') > -1 && t.ordem.indexOf('fim:201') < t.ordem.indexOf('evento:interesse_pos_relatorio'), 'eliminatório: o clique só sai depois do fim do quiz gravado (32.2)');
    conferir((await t.page.locator('#ctaNota').innerText()) === NOTA_LEAD_SCORE, 'eliminatório: nota do "Tenho interesse" do lado do lead score, sem prometer ligação (31.14)');
    await t.page.click('[data-acao="agora-nao"]');
    await t.page.click('[data-acao="agora-nao"]');
    await t.page.waitForTimeout(300);
    cl = doTipo(t, 'interesse_pos_relatorio');
    conferir(cl.length === 2 && cl[1].pacote.evento.clique_fim_quiz === 'agora-nao', 'eliminatório: "Agora não" vai uma vez só, mesmo com dois toques');
    conferir(semDadoNoConsole(t), 'eliminatório: console sem dado de pessoa');
    await t.ctx.close();

    // 3. Corte mais restritivo, com /api/evento fora do ar
    t = await abrir(browser, largura, PAGINA, [201], 'abortar');
    await ateContato(t.page, FAIXA_C, largura, false, largura < 900 ? 'barra' : 'cabecalho');
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await print(t.page, 'resultado-faixa-c', largura);
    p = t.pacotes[0];
    conferir(p && p.evento.lead_score_faixa === 'c', 'corte: faixa c (veio ' + (p && p.evento.lead_score_faixa) + ', nota ' + (p && p.evento.lead_score_nota) + ')');
    conferir(await t.page.evaluate(() => location.hash) === '#relatorio-nao', 'corte: quem passa no corte do Júnior e fica na faixa c vai para o relatório de não qualificado (14.2; antes ia para o plano)');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(300);
    conferir(doTipo(t, 'inicio_quiz').length === 1 && doTipo(t, 'interesse_pos_relatorio').length === 1, 'corte: com /api/evento fora do ar, o início e o clique foram tentados uma vez cada, sem nova tentativa');
    conferir(!(await t.page.locator('#avisoEnvio').isVisible()) && (await t.page.locator('#ctaNota').isVisible()), 'corte: a falha do registro de evento não trava nem avisa (10.10)');
    await t.ctx.close();

    // 4. Caixa desmarcada (e sessão do endereço fora do formato)
    t = await abrir(browser, largura, PAGINA + '&id_sessao=SESSAO-Fora-Do-Formato', [201], 201);
    await ateContato(t.page, ELIMINATORIO, largura, false);
    await t.page.uncheck('#consAceite');
    conferir(await t.page.locator('#consAviso').isVisible() && (await t.page.locator('#consAviso').innerText()).includes('nada é enviado'), 'desmarcada: aviso "Sem o aceite, ..." visível');
    conferir(!(await t.page.locator('#enviar').isDisabled()), 'desmarcada: o botão continua ligado (nome, e-mail e WhatsApp válidos)');
    await print(t.page, 'contato-sem-consentimento', largura);
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(800);
    conferir(t.envios.length === 0, 'desmarcada: nenhum envio para /api/fim-quiz');
    conferir(doTipo(t, 'interesse_pos_relatorio').length === 0, 'desmarcada: o clique no fim não é mandado');
    conferir(await t.page.evaluate(() => location.hash) === '#relatorio-nao' && !(await t.page.locator('#avisoEnvio').isVisible()), 'desmarcada: o diagnóstico aparece na tela, sem aviso de falha');
    conferir((await t.page.locator('.rel-copia').innerText()).trim() === 'Este diagnóstico fica só aqui na tela. Sem o aceite, nada foi enviado.', 'desmarcada: a linha da cópia diz que nada foi enviado (copy v2, M21)');
    ini = doTipo(t, 'inicio_quiz');
    conferir(ini.length === 1 && FORMATO_SESSAO.test(ini[0].pacote.evento.id_sessao) && ini[0].pacote.evento.id_sessao !== 'SESSAO-Fora-Do-Formato', 'desmarcada: sessão do endereço fora do formato é trocada por uma nova, no formato do banco');
    conferir(semDadoNoConsole(t), 'desmarcada: console sem dado de pessoa');
    await t.ctx.close();

    // 5. Envio que falha (o garçom de mentira responde 502 e, na segunda vez, 201)
    t = await abrir(browser, largura, PAGINA, [502, 201], 201);
    await ateContato(t.page, EXEMPLO, largura, false);
    await t.page.click('#enviar');
    await t.page.locator('#avisoEnvio').waitFor({ state: 'visible', timeout: 15000 });
    await naTela(t.page, 'plano');
    const aviso = (await t.page.locator('#avisoEnvio').innerText()) || '';
    conferir(await t.page.locator('#avisoEnvio').isVisible() && aviso.includes('diagnóstico continua'), 'falha: aviso visível, dizendo que o diagnóstico continua na tela');
    conferir(!/502|servico|indisponivel|erro|api|fetch/i.test(aviso), 'falha: aviso sem detalhe técnico');
    conferir(await t.page.locator('#avisoEnvio').isVisible() && await t.page.evaluate(() => location.hash) === '#plano', 'falha: o diagnóstico continua na tela, com o aviso por cima');
    // só a tela visível, onde o aviso fica preso no alto
    if (largura !== 360) await t.page.screenshot({ path: path.join(PRINTS, 'envio-falhou-' + largura + '.png') });
    await t.page.click('#reenviar');
    await t.page.locator('#avisoEnvio').waitFor({ state: 'hidden', timeout: 15000 });
    conferir(t.envios.length === 2, 'falha: "Tentar de novo" reenvia (2 envios)');
    conferir(JSON.stringify(t.pacotes[0]) === JSON.stringify(t.pacotes[1]), 'falha: o reenvio manda o mesmo pacote');
    conferir(semDadoNoConsole(t), 'falha: console sem dado de pessoa');
    await t.ctx.close();

    // 5b. Clique durante a falha do fim do quiz: espera o reenvio gravar
    t = await abrir(browser, largura, PAGINA, [502, 201], 201);
    await ateContato(t.page, ELIMINATORIO, largura, false);
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(500);
    conferir(doTipo(t, 'interesse_pos_relatorio').length === 0, 'falha e clique: com o fim do quiz sem gravar, o clique espera na memória da aba');
    await t.page.click('#reenviar');
    await t.page.locator('#avisoEnvio').waitFor({ state: 'hidden', timeout: 15000 });
    await t.page.waitForTimeout(400);
    cl = doTipo(t, 'interesse_pos_relatorio');
    conferir(cl.length === 1 && t.ordem.indexOf('fim:201') < t.ordem.indexOf('evento:interesse_pos_relatorio'), 'falha e clique: o clique sai depois do reenvio gravado, uma vez só');
    await t.ctx.close();

    // 6. Aberta direto do arquivo: revisão sem gravar
    t = await abrir(browser, largura, ARQUIVO, [201], 201);
    await ateContato(t.page, EXEMPLO, largura, false);
    await t.page.click('#enviar');
    await naTela(t.page, 'plano');
    await t.page.waitForTimeout(500);
    conferir(t.envios.length === 0 && t.eventos.length === 0, 'arquivo (file://): percorre tudo e nada é enviado, nem o fim do quiz nem os eventos');
    conferir(!(await t.page.locator('#avisoEnvio').isVisible()), 'arquivo (file://): nenhum aviso de falha');
    conferir(t.externas.length === 0, 'arquivo (file://): nenhuma requisição para outro endereço (sem a pasta fontes/, cai na letra do sistema)');
    conferir(semDadoNoConsole(t), 'arquivo (file://): console sem dado de pessoa');
    await t.ctx.close();
  }

  // ··· Medição (v9 do protótipo; decisão #116): o aviso de cookies e o Tag Manager, no bloco que a montagem acrescenta ···
  // O Google é respondido com 404 em todo contexto (abrir); nenhum pedido ao Google sai da máquina.
  const T = medicao.TEXTO_DO_AVISO;
  const ALVO_GTM = medicao.ENDERECO_GTM;
  const DO_GOOGLE = /^https:\/\/([a-z0-9-]+\.)*(googletagmanager\.com|google-analytics\.com|google\.com)\//;
  const SESSAO_TESTE = 'sessao-teste-0001';
  const doAviso = (page, texto) => page.locator('#aviso-cookies button').filter({ hasText: new RegExp('^' + texto + '$') });
  const lerMedicao = page => page.evaluate(chave => {
    const ls = f => { try { return f(); } catch (e) { return 'erro'; } };
    return { escolha: ls(() => localStorage.getItem(chave)), guardados: ls(() => localStorage.length), aviso: !!document.getElementById('aviso-cookies'),
      camada: (window.dataLayer || []).map(x => x && typeof x === 'object' && typeof x.length === 'number' && !Array.isArray(x) ? { gtag: Array.from(x) } : x),
      cookies: document.cookie, hash: location.hash };
  }, medicao.CHAVE_ESCOLHA);
  const consentimentos = (m, tipo) => m.camada.filter(x => x && x.gtag && x.gtag[0] === 'consent' && x.gtag[1] === tipo).map(x => x.gtag[2]);
  const padraoNegado = m => {
    const d = consentimentos(m, 'default');
    return d.length === 1 && m.camada[0] && m.camada[0].gtag && m.camada[0].gtag[1] === 'default' &&
      JSON.stringify(d[0]) === '{"ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","analytics_storage":"denied"}';
  };
  const anuncioNuncaMuda = m => consentimentos(m, 'update').every(u => Object.keys(u).join() === 'analytics_storage');
  const focoNoAviso = page => page.evaluate(() => {
    const e = document.activeElement, c = getComputedStyle(e);
    return { texto: (e.textContent || '').trim(), dentro: !!e.closest('#aviso-cookies'), visivel: e.matches(':focus-visible') && c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) >= 2 };
  });
  const pedidoAoGoogle = page => page.waitForRequest(r => r.url().startsWith('https://www.googletagmanager.com/'), { timeout: 10000 }).catch(() => null);
  const enderecoDe = page => new URL(page.url());

  for (const largura of [375, 360, 1440]) {
    const rotulo = 'medição ' + largura;
    console.log('\n· medição (aviso de cookies e Tag Manager) · ' + largura + ' pixels' + (largura === 360 ? ', 640 de altura' : ''));

    // M1. Sem escolha: o aviso no topo, em fluxo normal, sem cobrir nenhum botão; nada guardado e nada para fora
    let t = await abrir(browser, largura, PAGINA, [201], 201);
    await naTela(t.page, 'abertura');
    await t.page.evaluate(() => document.fonts.ready);
    await t.page.waitForTimeout(400);
    let m = await lerMedicao(t.page);
    const av = await t.page.evaluate(() => {
      const a = document.getElementById('aviso-cookies');
      if (!a) return null;
      const r = a.getBoundingClientRect(), fim = document.body.lastElementChild;
      const bot = [...a.querySelectorAll('button')].map(b => {
        const c = getComputedStyle(b), q = b.getBoundingClientRect();
        return { texto: b.textContent.trim(), tipo: b.getAttribute('type'), w: Math.round(q.width), h: Math.round(q.height),
          estilo: [c.backgroundColor, c.color, c.borderTopWidth, c.borderTopStyle, c.borderTopColor, c.borderRadius, c.fontFamily, c.fontSize, c.fontWeight, c.paddingTop, c.paddingLeft].join(' | ') };
      });
      return { primeiro: document.body.firstElementChild === a, pos: getComputedStyle(a).position, topo: Math.round(r.top), esq: Math.round(r.left), larg: Math.round(r.width), alt: Math.round(r.height),
        papel: a.getAttribute('role'), rotulo: a.getAttribute('aria-label'), texto: a.innerText.replace(/\s+/g, ' '), bot,
        ultimo: fim.id, link: fim.innerText.trim(), linkPos: getComputedStyle(fim).position, lateral: document.documentElement.scrollWidth - window.innerWidth };
    });
    conferir(av && av.primeiro && av.pos === 'static' && av.topo === 0 && av.esq === 0 && av.larg === largura,
      rotulo + ' · sem escolha: o aviso aparece no topo, primeiro filho do body, em fluxo normal (' + (av ? av.pos + ', topo ' + av.topo + ', ' + av.larg + ' por ' + av.alt : 'sem aviso') + ')');
    conferir(av && av.papel === 'region' && av.rotulo === T.titulo && [T.titulo, T.texto, T.politica].every(x => av.texto.includes(x)) &&
      av.bot.map(b => b.texto).join('|') === T.aceitar + '|' + T.recusar && av.bot.every(b => b.tipo === 'button'),
      rotulo + ' · sem escolha: o texto do aviso-de-cookies v' + medicao.VERSAO_DO_AVISO + ', região com rótulo e os botões "' + T.aceitar + '" e "' + T.recusar + '" (button type="button")');
    conferir(av && av.bot.length === 2 && av.bot[0].w === av.bot[1].w && av.bot[0].h === av.bot[1].h && av.bot[0].estilo === av.bot[1].estilo,
      rotulo + ' · sem escolha: os dois botões com o mesmo peso visual (' + (av && av.bot[0] ? av.bot[0].w + ' por ' + av.bot[0].h + '; ' + av.bot[0].estilo : '') + ')');
    conferir(av && av.ultimo === 'aviso-cookies-reabrir' && av.link === T.reabrir && av.linkPos === 'static', rotulo + ' · o link "' + T.reabrir + '" é o último filho do body, em fluxo normal');
    conferir(av && av.lateral <= 0, rotulo + ' · sem rolagem para o lado com o aviso (' + (av && av.lateral) + ')');
    conferir(m.escolha === null && m.guardados === 0 && m.cookies === '', rotulo + ' · sem escolha: nada guardado no navegador, nem escolha nem cookie');
    conferir(padraoNegado(m) && consentimentos(m, 'update').length === 0 && !m.camada.some(x => x && x.event === 'gtm.js'),
      rotulo + ' · sem escolha: consentimento padrão com a análise e os três de anúncio negados, antes de tudo; nenhum update e nenhum carregador');
    if (largura !== 360) { await t.page.evaluate(() => window.scrollTo(0, 0)); await t.page.waitForTimeout(200); await t.page.screenshot({ path: path.join(PRINTS, 'aviso-' + largura + '.png') }); }
    // O aviso não cobre o "Fazer a Análise" do cabeçalho (com a página no alto) nem o da abertura (rolado até ele)
    const cobertura = await t.page.evaluate(async () => {
      const quadro = () => new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
      const a = document.getElementById('aviso-cookies');
      const cruza = (p, q) => p.left < q.right && q.left < p.right && p.top < q.bottom && q.top < p.bottom;
      const ver = async (sel, rolar) => {
        const b = document.querySelector(sel);
        if (rolar) b.scrollIntoView({ block: 'center', behavior: 'instant' }); else window.scrollTo({ top: 0, behavior: 'instant' });
        await quadro();
        const r = b.getBoundingClientRect(), ra = a.getBoundingClientRect();
        const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return { cruza: cruza(r, ra), centro: !!el && b.contains(el), naTela: r.top >= 0 && r.bottom <= innerHeight, r: [Math.round(r.top), Math.round(r.bottom)].join('-'), ra: [Math.round(ra.top), Math.round(ra.bottom)].join('-') };
      };
      const cab = await ver('#cabSafra [data-acao="proximo"]', false);
      const abe = await ver('.abertura__copy [data-acao="proximo"]', true);
      window.scrollTo(0, 0);
      return { cab, abe };
    });
    for (const [k, nome] of [['cab', 'do cabeçalho'], ['abe', 'da abertura']]) {
      const c = cobertura[k];
      conferir(!c.cruza && c.centro && c.naTela, rotulo + ' · sem escolha: o aviso não cobre o "Fazer a Análise" ' + nome + ' (botão ' + c.r + ', aviso ' + c.ra + '; no centro do botão está o botão)');
    }
    if (largura < 900) {
      // No celular, rolando até a barra fixa do rodapé aparecer: o aviso (em fluxo, lá no alto) não cobre a barra
      await t.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await t.page.waitForFunction(() => document.body.hasAttribute('data-barra'), null, { timeout: 5000 }).catch(() => {});
      await t.page.waitForTimeout(400);
      const barra = await t.page.evaluate(() => {
        const a = document.getElementById('aviso-cookies'), b = document.querySelector('#barraSafra [data-acao="proximo"]');
        const r = b.getBoundingClientRect(), ra = a.getBoundingClientRect();
        const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return { aparece: document.body.hasAttribute('data-barra') && r.height > 0, cruza: r.left < ra.right && ra.left < r.right && r.top < ra.bottom && ra.top < r.bottom, centro: !!el && b.contains(el) };
      });
      conferir(barra.aparece && !barra.cruza && barra.centro, rotulo + ' · sem escolha (celular): rolando, a barra fixa do rodapé aparece e o aviso não cobre o botão dela');
    }
    // O link "Cookies" no fim da página não fica coberto (rolado até ele)
    const link = await t.page.evaluate(async () => {
      const b = document.querySelector('#aviso-cookies-reabrir button');
      b.scrollIntoView({ block: 'center', behavior: 'instant' });
      await new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
      const r = b.getBoundingClientRect(), el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return !!el && b.contains(el);
    });
    conferir(link, rotulo + ' · o link "' + T.reabrir + '" no fim da página fica livre (no centro dele está ele)');
    await t.page.waitForTimeout(300);
    conferir(t.externas.length === 0, rotulo + ' · sem escolha: nenhuma requisição para outro endereço' + (t.externas.length ? ' (' + t.externas.join(', ') + ')' : ''));
    await t.ctx.close();

    // M2. Recusar: guarda "recusado", o aviso some, nada sai, nem depois de recarregar; a medição própria continua
    t = await abrir(browser, largura, PAGINA, [201], 201);
    await naTela(t.page, 'abertura');
    await doAviso(t.page, T.recusar).click();
    await t.page.waitForTimeout(400);
    m = await lerMedicao(t.page);
    conferir(m.escolha === medicao.ESCOLHAS.recusar && m.guardados === 1 && !m.aviso && m.hash === '#abertura', rotulo + ' · Recusar: guarda só "recusado" (' + medicao.CHAVE_ESCOLHA + '), o aviso some e o quiz continua na abertura');
    // Escolhido pelo mouse, o foco vai ao primeiro elemento focável à vista depois do aviso: nunca ao body, e sem fazer surgir o "Pular para o conteúdo"
    const focoMouse = await t.page.evaluate(() => { const e = document.activeElement, r = e.getBoundingClientRect();
      return { body: e === document.body, pular: e.matches('.pular'), naTela: r.bottom > 0 && r.top < innerHeight, quem: e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + ' ' + (e.textContent || '').trim().slice(0, 20) }; });
    conferir(!focoMouse.body && !focoMouse.pular && focoMouse.naTela, rotulo + ' · Recusar pelo mouse: o foco vai ao primeiro elemento focável à vista depois do aviso, nunca ao body (' + focoMouse.quem + ')');
    conferir(padraoNegado(m) && consentimentos(m, 'update').length === 0 && !m.camada.some(x => x && ('pagina_limpa' in x || x.event === 'gtm.js')), rotulo + ' · Recusar: o consentimento continua negado e nada vai para a camada de dados');
    await t.page.reload();
    await naTela(t.page, 'abertura');
    await t.page.waitForTimeout(600);
    m = await lerMedicao(t.page);
    conferir(m.escolha === medicao.ESCOLHAS.recusar && !m.aviso && m.cookies === '', rotulo + ' · Recusar e recarregar: o aviso não volta e nenhum cookie aparece');
    if (largura === 1440) {
      // A forma original da conferência da abertura (v4), com a escolha guardada: sem o aviso, de scroll 0 até o fim, título, promessa,
      // botão e cabeçalho não saem do lugar e só o relatório se mexe; depois da escolha, a abertura é exatamente a de antes
      await t.page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect && a.effect.getComputedTiming().iterations !== Infinity).map(a => a.finished.catch(() => {}))));
      await t.page.evaluate(() => window.scrollTo(0, 0)); await t.page.waitForTimeout(300);
      const pos = () => t.page.evaluate(() => ['.abertura h1', '.abertura__lede', '#botaoAbertura', '.previa', '#cabSafra'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().top)));
      const a0 = await pos();
      await t.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await t.page.waitForTimeout(400);
      const a1 = await pos();
      conferir(a0[4] === 0 && a1[0] === a0[0] && a1[1] === a0[1] && a1[2] === a0[2] && a1[3] < a0[3] && a1[4] === 0,
        rotulo + ' · com "recusado" guardado, a forma original: de scroll 0 até o fim, só o relatório se mexe; título, promessa, botão e cabeçalho ficam (' + a0.join(',') + ' → ' + a1.join(',') + ')');
      await t.page.evaluate(() => window.scrollTo(0, 0)); await t.page.waitForTimeout(200);
    }
    conferir(t.externas.length === 0, rotulo + ' · Recusar: nenhuma requisição para outro endereço, nem depois de recarregar' + (t.externas.length ? ' (' + t.externas.join(', ') + ')' : ''));
    conferir(doTipo(t, 'inicio_quiz').length === 2, rotulo + ' · Recusar: a medição própria, sem cookie, continua (o início do quiz foi mandado nas duas aberturas; política v3, item 7)');
    await t.ctx.close();

    // M3. Aceitar, com o id_sessao no endereço e na página de origem
    t = await abrir(browser, largura, PAGINA + '&id_sessao=' + SESSAO_TESTE, [201], 201, { referer: BASE + '?utm_source=bio&id_sessao=' + SESSAO_TESTE });
    await naTela(t.page, 'abertura');
    let pedido = pedidoAoGoogle(t.page);
    await doAviso(t.page, T.aceitar).click();
    await pedido;
    await t.page.waitForTimeout(400);
    m = await lerMedicao(t.page);
    let end = enderecoDe(t.page);
    conferir(t.externas[0] === ALVO_GTM, rotulo + ' · Aceitar: a primeira requisição para outro endereço é ' + ALVO_GTM + ' (' + (t.externas[0] || 'nenhuma') + ')');
    conferir(t.externas.length > 0 && t.externas.every(u => DO_GOOGLE.test(u)), rotulo + ' · Aceitar: nenhuma requisição vai para fora do Google (' + t.externas.length + ': ' + [...new Set(t.externas)].join(', ') + ')');
    conferir(m.escolha === medicao.ESCOLHAS.aceitar && m.guardados === 1 && !m.aviso, rotulo + ' · Aceitar: guarda só "aceito" e o aviso some');
    const limpa = m.camada.find(x => x && 'pagina_limpa' in x);
    const camadaTexto = JSON.stringify(m.camada);
    conferir(limpa && limpa.pagina_limpa === BASE + 'quiz/' + BUSCA && !camadaTexto.includes('id_sessao') && !camadaTexto.includes(SESSAO_TESTE),
      rotulo + ' · Aceitar: pagina_limpa sem o id_sessao e sem o # (' + (limpa && limpa.pagina_limpa.replace(BASE, '/')) + '); nada da camada de dados tem o código da visita');
    conferir(limpa && limpa.origem_limpa === BASE + '?utm_source=bio', rotulo + ' · Aceitar: origem_limpa sem o id_sessao da página de origem (' + (limpa && limpa.origem_limpa.replace(BASE, '/')) + ')');
    conferir(end.searchParams.get('id_sessao') === null && end.searchParams.get('utm_source') === 'bio' && end.searchParams.get('utm_campaign') === 'funil-01' && end.hash === '#abertura',
      rotulo + ' · Aceitar: o endereço da barra fica sem o id_sessao, com os outros parâmetros e o # (' + end.search + end.hash + ')');
    const atualizacoes = consentimentos(m, 'update');
    conferir(atualizacoes.length === 1 && JSON.stringify(atualizacoes[0]) === '{"analytics_storage":"granted"}' && padraoNegado(m),
      rotulo + ' · Aceitar: o consentimento muda só a análise para concedida; os três de anúncio ficam negados');
    const iUpd = m.camada.findIndex(x => x && x.gtag && x.gtag[1] === 'update'), iLimpa = m.camada.indexOf(limpa), iGtm = m.camada.findIndex(x => x && x.event === 'gtm.js');
    conferir(iUpd > 0 && iUpd < iLimpa && iLimpa < iGtm && m.camada.filter(x => x && x.event === 'gtm.js').length === 1,
      rotulo + ' · Aceitar: na camada de dados, o consentimento, depois a pagina_limpa e só então o carregador, uma vez (' + [iUpd, iLimpa, iGtm].join(', ') + ')');
    const iniM3 = doTipo(t, 'inicio_quiz')[0];
    conferir(iniM3 && iniM3.pacote.evento.id_sessao === SESSAO_TESTE, rotulo + ' · Aceitar: o quiz leu o id_sessao antes de ele sair do endereço (o início do quiz leva ' + SESSAO_TESTE + ')');
    // Com "aceito" guardado, a página seguinte não mostra o aviso e carrega o Tag Manager direto
    const jaPedidas = t.externas.length;
    pedido = pedidoAoGoogle(t.page);
    await t.page.reload();
    await naTela(t.page, 'abertura');
    await pedido;
    await t.page.waitForTimeout(400);
    m = await lerMedicao(t.page);
    const novas = t.externas.slice(jaPedidas);
    conferir(!m.aviso && novas[0] === ALVO_GTM && novas.every(u => DO_GOOGLE.test(u)) && consentimentos(m, 'update').length === 1 && m.camada.some(x => x && 'pagina_limpa' in x),
      rotulo + ' · com "aceito" guardado, ao abrir de novo: sem o aviso, o consentimento e a pagina_limpa e o gtm.js direto, só do Google');
    conferir(semDadoNoConsole(t), rotulo + ' · Aceitar: console sem dado de pessoa');
    await t.ctx.close();

    // M4. Rodada inteira (eliminatório) com o "Aceitar" logo no começo e o id_sessao da landing no endereço
    t = await abrir(browser, largura, PAGINA + '&id_sessao=' + SESSAO_DA_LANDING, [201], 201);
    await naTela(t.page, 'abertura');
    pedido = pedidoAoGoogle(t.page);
    await doAviso(t.page, T.aceitar).click();
    await pedido;
    const limpoNoComeco = enderecoDe(t.page).searchParams.get('id_sessao') === null;
    await ateContato(t.page, ELIMINATORIO, largura, false, 'cabecalho');
    end = enderecoDe(t.page);
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(500);
    const pacoteDe = tipo => doTipo(t, tipo)[0] && doTipo(t, tipo)[0].pacote;
    const sessoes = [pacoteDe('inicio_quiz'), t.pacotes[0], pacoteDe('interesse_pos_relatorio')].map(x => x && x.evento && x.evento.id_sessao);
    conferir(limpoNoComeco && sessoes.length === 3 && sessoes.every(s => s === SESSAO_DA_LANDING),
      rotulo + ' · rodada inteira com "Aceitar" no começo: o início, o fim do quiz e o clique levam o id_sessao do endereço original, com o endereço já limpo (' + sessoes.join(', ') + ')');
    conferir(end.searchParams.get('id_sessao') === null && end.searchParams.get('utm_source') === 'bio' && enderecoDe(t.page).searchParams.get('id_sessao') === null,
      rotulo + ' · rodada inteira: o endereço segue sem o id_sessao de tela em tela, com as utm (' + end.search + end.hash + ')');
    conferir(t.externas.filter(u => u === ALVO_GTM).length === 1 && t.externas.every(u => DO_GOOGLE.test(u)), rotulo + ' · rodada inteira: só o gtm.js do Google, uma vez, e nada mais para fora');
    conferir(semDadoNoConsole(t), rotulo + ' · rodada inteira: console sem dado de pessoa');
    await t.ctx.close();

    // M5. Teclado: o Tab chega aos dois botões do aviso, com o foco visível, e o Enter funciona
    t = await abrir(browser, largura, PAGINA, [201], 201);
    await naTela(t.page, 'abertura');
    await t.page.keyboard.press('Tab');
    const f1 = await focoNoAviso(t.page);
    await t.page.keyboard.press('Tab');
    const f2 = await focoNoAviso(t.page);
    conferir(f1.dentro && f1.texto === T.aceitar && f1.visivel && f2.dentro && f2.texto === T.recusar && f2.visivel,
      rotulo + ' · teclado: o primeiro Tab chega ao "' + T.aceitar + '" e o segundo ao "' + T.recusar + '", com o foco visível (' + f1.texto + ', ' + f2.texto + ')');
    await t.page.keyboard.press('Enter');
    await t.page.waitForTimeout(300);
    m = await lerMedicao(t.page);
    conferir(m.escolha === medicao.ESCOLHAS.recusar && !m.aviso && t.externas.length === 0, rotulo + ' · teclado: Enter no "' + T.recusar + '" guarda a escolha e fecha o aviso, sem nada para fora');
    const focoTeclado = await t.page.evaluate(() => { const e = document.activeElement; return { pular: e.matches('a.pular'), body: e === document.body, quem: e.tagName.toLowerCase() + ' ' + (e.textContent || '').trim().slice(0, 30) }; });
    conferir(focoTeclado.pular && !focoTeclado.body, rotulo + ' · teclado: depois da escolha, o foco vai ao primeiro elemento focável depois do aviso, o "Pular para o conteúdo", nunca ao body (' + focoTeclado.quem + ')');

    // M6. O link "Cookies" reabre o aviso no topo, com o foco nele; de recusado para aceito, pelo teclado
    await t.page.locator('#aviso-cookies-reabrir button').click();
    await t.page.waitForTimeout(300);
    const re = await t.page.evaluate(() => { const a = document.getElementById('aviso-cookies'); return a && { primeiro: document.body.firstElementChild === a, foco: document.activeElement === a, topo: Math.round(a.getBoundingClientRect().top) }; });
    conferir(re && re.primeiro && re.foco && re.topo === 0, rotulo + ' · o link "' + T.reabrir + '" reabre o aviso no topo e leva o foco a ele' + (re ? ' (topo ' + re.topo + ')' : ''));
    await t.page.keyboard.press('Tab');
    const f3 = await focoNoAviso(t.page);
    pedido = pedidoAoGoogle(t.page);
    await t.page.keyboard.press('Enter');
    await pedido;
    await t.page.waitForTimeout(400);
    m = await lerMedicao(t.page);
    const voltou = await t.page.evaluate(() => !!document.activeElement.closest('#aviso-cookies-reabrir'));
    conferir(f3.texto === T.aceitar && m.escolha === medicao.ESCOLHAS.aceitar && !m.aviso && t.externas[0] === ALVO_GTM && consentimentos(m, 'update').length === 1,
      rotulo + ' · de recusado para aceito pelo link: Tab até o "' + T.aceitar + '", Enter, guarda "aceito" e só então o gtm.js (' + (t.externas[0] || 'nenhum') + ')');
    conferir(voltou, rotulo + ' · depois da escolha pelo link, o foco volta ao link "' + T.reabrir + '"');

    // M7. De aceito para recusado: guarda "recusado", manda a análise negada e apaga os cookies _ga (um de teste, posto antes)
    await t.page.evaluate(() => {
      document.cookie = '_ga=GA1.1.000000000.0000000000; path=/';
      document.cookie = '_ga_TESTE00=GS1.1.0000000000.1.0.0000000000.0.0.0; path=/';
      document.cookie = 'outro_teste=1; path=/';
    });
    const cookiesAntes = (await t.ctx.cookies()).map(c => c.name).sort().join(',');
    await t.page.locator('#aviso-cookies-reabrir button').click();
    await doAviso(t.page, T.recusar).click();
    await t.page.waitForTimeout(300);
    m = await lerMedicao(t.page);
    const cookiesDepois = (await t.ctx.cookies()).map(c => c.name).sort().join(',');
    conferir(m.escolha === medicao.ESCOLHAS.recusar && !m.aviso && cookiesAntes === '_ga,_ga_TESTE00,outro_teste' && cookiesDepois === 'outro_teste',
      rotulo + ' · de aceito para recusado: guarda "recusado" e apaga os cookies _ga de teste, e só eles (antes ' + cookiesAntes + '; depois ' + cookiesDepois + ')');
    const atu = consentimentos(m, 'update');
    conferir(atu.length === 2 && JSON.stringify(atu[1]) === '{"analytics_storage":"denied"}' && anuncioNuncaMuda(m), rotulo + ' · de aceito para recusado: manda a análise negada; o consentimento de anúncio nunca muda');
    const gtmAntes = t.externas.filter(u => u === ALVO_GTM).length;
    await t.page.reload();
    await naTela(t.page, 'abertura');
    await t.page.waitForTimeout(600);
    m = await lerMedicao(t.page);
    conferir(!m.aviso && m.escolha === medicao.ESCOLHAS.recusar && t.externas.filter(u => u === ALVO_GTM).length === gtmAntes && consentimentos(m, 'update').length === 0,
      rotulo + ' · de aceito para recusado: na página seguinte, o aviso não volta e nada do Google carrega');
    await t.ctx.close();
  }

  await browser.close();
  srv.close();
  console.log('\n' + (falhas ? falhas + ' conferência(s) falharam' : 'Tudo certo: todas as conferências passaram'));
  process.exit(falhas ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
