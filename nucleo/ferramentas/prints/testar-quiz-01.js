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
// Tira prints em 375 e 1440 pixels em entregas/quizzes/quiz-01/prints/.
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

let falhas = 0;
const conferir = (ok, texto) => { console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto); if (!ok) falhas++; };

// fim: lista de status que o garçom de mentira devolve em /api/fim-quiz, um por envio (o último se repete)
// evento: status de /api/evento, ou 'abortar' para a conexão cair
let garcom = null;
async function abrir(browser, largura, endereco, fim, evento) {
  const ctx = await browser.newContext({ viewport: { width: largura, height: largura === 375 ? 812 : 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
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
  await page.goto(endereco);
  return t;
}
let BASE = '';
const semDadoNoConsole = t => t.consoleTexto.every(x => !DADO_PESSOAL.test(x));
const naTela = (page, id) => page.waitForFunction(i => location.hash === '#' + i, id, { timeout: 15000 });
const opcao = (page, valor) => page.locator('[data-corpo] .opcao[data-valor="' + valor + '"]').click();
const print = (page, nome, largura) => page.screenshot({ path: path.join(PRINTS, nome + '-' + largura + '.png'), fullPage: true });
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
  fs.mkdirSync(PRINTS, { recursive: true });
  const srv = await servir();
  BASE = 'http://127.0.0.1:' + srv.address().port + '/';
  const PAGINA = BASE + 'quiz/' + BUSCA;
  const browser = await chromium.launch({ executablePath: acharChromium() });

  for (const largura of [375, 1440]) {
    console.log('\n· ' + largura + ' pixels');

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
        comecar: document.body.textContent.includes('Começar diagnóstico'), barra: vis('#barraSafra') };
    });
    conferir(ab.hash === '#abertura' && ab.num === '1/27' && !ab.capa, 'abertura: o quiz abre nela, sem a capa (tela 1 de 27; ' + ab.hash + ', ' + ab.num + ')');
    conferir(ab.cab && !ab.topo && ab.logo, 'abertura: cabeçalho da landing-page-02 com o logo do Safra, no lugar do cabeçalho do quiz');
    conferir(ab.botoes.join('|') === 'Fazer a Análise|Fazer a Análise' && !ab.comecar, 'abertura: botões do cabeçalho e da página dizem "Fazer a Análise" (' + ab.botoes.join(' | ') + ')');
    conferir(!ab.barra, 'abertura: sem a barra do rodapé antes de rolar');
    // espera a entrada da tela (desliza alguns pixels) terminar; as animações sem fim (a luz dos botões) não contam
    await t.page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect && a.effect.getComputedTiming().iterations !== Infinity).map(a => a.finished.catch(() => {}))));
    const antes = await t.page.evaluate(() => ['.abertura h1', '.abertura__lede', '#botaoAbertura', '.previa', '#cabSafra'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().top)));
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
    await ateContato(t.page, FAIXA_C, largura, false, largura === 375 ? 'barra' : 'cabecalho');
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
    await t.page.screenshot({ path: path.join(PRINTS, 'envio-falhou-' + largura + '.png') });
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

  await browser.close();
  srv.close();
  console.log('\n' + (falhas ? falhas + ' conferência(s) falharam' : 'Tudo certo: todas as conferências passaram'));
  process.exit(falhas ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
