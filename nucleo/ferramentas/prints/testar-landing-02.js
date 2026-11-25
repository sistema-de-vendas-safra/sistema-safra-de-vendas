// Teste da landing-page-02 v8 no site montado, sem rede de verdade (respostas do Otávio ao pedido 24, 25/11/2026; #126 a #131)
// id: testar-landing-02 · versao 1 · rascunho · otavio: pendente
// Uso, da raiz do repositório: node nucleo/ferramentas/prints/testar-landing-02.js
// Monta o site (entregas/prototipo-funil-01/montar-site.mjs) e serve a pasta site/ num servidorzinho em 127.0.0.1, só durante o
// teste. Todo pedido para fora de 127.0.0.1 é recusado e anotado. O aviso de cookies já vem recusado (nada do Google carrega).
// Em 1440, 375 e 360 pixels:
//   1. #129 · o logo do Safra não aparece: as cinco peças "Logo Safra" do programa (cabeçalho e rodapé, nas duas versões, e a
//      janela da demonstração) escondidas, nenhuma imagem do logo à vista, o rodapé (que só tinha o logo) fora, e o "Fazer a
//      Análise" do cabeçalho no mesmo lugar, à direita;
//   2. #126 · o R$ 497 riscado de volta no cartão da oferta, ao lado de "Gratuita"; e os textos aprovados (#124), sem promoção,
//      prazo, barra de escassez ou porcentagem de resgate à vista;
//   3. #127 · o nome da Análise igual em tudo: as chamadas dizem "Faça uma Análise Estratégica do Sistema de Vendas", e nenhum
//      texto à vista diz "Análise Estratégica do seu";
//   4. #131 · a contagem do mês com os números de verdade: com a hora do navegador presa em datas escolhidas (e em três fusos), o
//      texto é o da conta feita aqui, à parte, pela hora de Brasília; com o programa lento (3 segundos de espera), nenhum texto
//      com os marcadores de antes aparece em momento nenhum; com o JavaScript desligado, a página não mostra os marcadores (nem
//      nada: a landing é um programa React e, sem JavaScript, fica em branco, como sempre ficou).
// Prints (só em 375 e 1440, como os do pedido 20, com 2 pixels por ponto e a hora presa em 25/11/2026, 15h, de Brasília):
// topo e oferta, em entregas/landings/landing-page-02/prints/. Nenhum dado de pessoa.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { execFileSync } = require('child_process');
const { acharChromium } = require('./print.js');

const RAIZ = path.resolve(__dirname, '../../..');
const SITE = path.join(RAIZ, 'entregas/prototipo-funil-01/site');
const PRINTS = path.join(RAIZ, 'entregas/landings/landing-page-02/prints');
const CHAVE_ESCOLHA = JSON.parse(fs.readFileSync(path.join(RAIZ, 'entregas/prototipo-funil-01/medicao.json'), 'utf8')).chave_do_navegador;
const ALTURA = { 1440: 900, 375: 812, 360: 640 };
const PRINT_ALTURA = { topo: { 1440: 1100, 375: 1400 }, oferta: { 1440: 900, 375: 812 } };
const NOME = 'Faça uma Análise Estratégica do Sistema de Vendas';
const ESCASSEZ = /resgatadas|Restam|pouco tempo|promoção|por enquanto/;
const HORA_DOS_PRINTS = '2026-11-25T15:00:00-03:00';

let falhas = 0;
const conferir = (ok, texto) => { console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto); if (!ok) falhas++; };

// A conta à parte, sem olhar o programa: quanto falta até a 0h do dia 1 do mês seguinte, na hora de Brasília (UTC-3)
function contaAParte(iso) {
  const agora = Date.parse(iso), z = 3 * 3600e3;
  const b = new Date(agora - z);
  const vira = Date.UTC(b.getUTCFullYear(), b.getUTCMonth() + 1, 1) + z;
  const falta = vira - agora, d = Math.floor(falta / 864e5), h = Math.floor((falta % 864e5) / 36e5);
  const D = d + (d === 1 ? ' dia' : ' dias'), H = h + (h === 1 ? ' hora' : ' horas');
  return 'O seu mês vira em ' + (d > 0 ? (h > 0 ? D + ' e ' + H : D) : (h > 0 ? H : 'menos de 1 hora')) + '.';
}
// As datas da conta: um dia comum, a véspera da virada, a última hora, a virada do ano, o dia 1, um fevereiro
const DATAS = [
  ['2026-11-25T15:00:00-03:00', 'O seu mês vira em 5 dias e 9 horas.'],
  ['2026-11-29T23:00:00-03:00', 'O seu mês vira em 1 dia e 1 hora.'],
  ['2026-11-30T23:30:00-03:00', 'O seu mês vira em menos de 1 hora.'],
  ['2026-12-31T10:00:00-03:00', 'O seu mês vira em 14 horas.'],
  ['2026-12-01T00:00:00-03:00', 'O seu mês vira em 31 dias.'],
  ['2027-02-27T12:00:00-03:00', 'O seu mês vira em 1 dia e 12 horas.']
];

function servir() {
  const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
  const srv = http.createServer((q, r) => {
    let u = decodeURIComponent(q.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html';
    const f = path.normalize(path.join(SITE, u));
    if (!f.startsWith(SITE + path.sep) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': tipos[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(r);
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

(async () => {
  const saida = execFileSync(process.execPath, [path.join(RAIZ, 'entregas/prototipo-funil-01/montar-site.mjs')], { cwd: RAIZ }).toString();
  conferir(/Tudo certo/.test(saida), 'montar-site.mjs: site montado, com as conferências da montagem (inclusive a regra do logo e a contagem sem marcadores)');
  const srv = await servir();
  const BASE = 'http://127.0.0.1:' + srv.address().port + '/';
  const browser = await chromium.launch({ executablePath: acharChromium() });
  const fora = [];
  async function contexto(largura, opcoes = {}) {
    const ctx = await browser.newContext(Object.assign({ viewport: { width: largura, height: ALTURA[largura] }, isMobile: largura < 900, hasTouch: largura < 900 }, opcoes));
    await ctx.addInitScript(([k]) => { try { localStorage.setItem(k, 'recusado'); } catch (e) {} }, [CHAVE_ESCOLHA]);
    await ctx.route('**/*', r => { const u = r.request().url(); if (u.startsWith(BASE) || u.startsWith('data:')) return r.continue(); fora.push(u); return r.abort(); });
    return ctx;
  }
  // As seções entram com a rolagem: rola a página inteira devagar antes de ler
  const rolarTudo = async page => { const alto = await page.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y <= alto + 900; y += 900) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(40); } };
  // A contagem que está na página (nas duas versões, a de computador e a de celular, as duas no código da página): só a frase da contagem
  const contagens = page => page.evaluate(() => document.body.textContent.match(/O seu mês vira em [^.]*\./g) || []);
  const ler = page => page.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.visibility !== 'hidden' && c.display !== 'none' && c.opacity !== '0'; };
    const folhas = [...document.querySelectorAll('p,span,button,h1,h2,h3')].filter(vis).map(e => e.textContent.trim());
    const logos = [...document.querySelectorAll('[data-name="Logo Safra"]')];
    const cab = document.querySelector('[data-node-id="405:6"]') && vis(document.querySelector('[data-node-id="405:6"]')) ? document.querySelector('[data-node-id="405:6"]') : document.querySelector('[data-node-id="473:3"]');
    // O "Fazer a Análise" do cabeçalho: no computador é um botão; no celular, um bloco com o texto. Vale o filho do cabeçalho que o contém
    const botao = cab && [...cab.children].find(e => vis(e) && /Fazer a Análise/.test(e.textContent));
    const rb = botao && botao.getBoundingClientRect(), rc = cab && cab.getBoundingClientRect();
    const riscado = [...document.querySelectorAll('p,span')].filter(e => e.textContent.trim() === 'R$ 497' && vis(e))
      .map(e => [e, e.parentElement].some(x => getComputedStyle(x).textDecorationLine.includes('line-through')));
    return {
      logos: logos.length, logosVisiveis: logos.filter(vis).length,
      imagensDoLogo: [...document.querySelectorAll('[data-name="Logo Safra"] img')].filter(vis).length,
      rodapes: ['412:204', '473:5588'].map(id => document.querySelector('[data-node-id="' + id + '"]')).filter(e => e && vis(e)).length,
      botaoADireita: !!(rb && rc && Math.abs(rc.right - rb.right) < 2),
      riscado, mes: [...new Set(folhas.filter(t => /^O seu mês vira em/.test(t)).map(t => t.match(/O seu mês vira em [^.]*\./)[0]))],
      escassez: folhas.filter(t => /resgatadas|Restam|pouco tempo|promoção|por enquanto/.test(t)),
      textos: ['Sempre gratuita', 'Gratuita', 'agora e depois.', 'A Análise não tem custo, nem hoje nem depois.'].filter(x => folhas.includes(x)),
      chamadas: folhas.filter(t => t === 'Faça uma Análise Estratégica do Sistema de Vendas').length,
      doSeu: folhas.filter(t => /Análise Estratégica do seu/i.test(t)),
      marcadores: /\[X\]|\[Y\]|vira em \[/.test(document.body.innerText)
    };
  });

  for (const largura of [1440, 375, 360]) {
    console.log('\n· ' + largura + ' pixels');
    let ctx = await contexto(largura);
    let page = await ctx.newPage();
    await page.clock.setFixedTime(new Date(DATAS[0][0]));
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await rolarTudo(page);
    const v = await ler(page);
    conferir(v.logos === 5 && v.logosVisiveis === 0 && v.imagensDoLogo === 0, '#129 · o logo do Safra não aparece: as ' + v.logos + ' peças "Logo Safra" do programa escondidas, nenhuma imagem dele à vista');
    conferir(v.rodapes === 0, '#129 · o rodapé, que só tinha o logo, não aparece');
    conferir(v.botaoADireita, '#129 · sem o logo, o "Fazer a Análise" do cabeçalho fica à direita, onde estava');
    conferir(v.riscado.length === 1 && v.riscado[0] === true, '#126 · o R$ 497 riscado de volta no cartão da oferta (' + v.riscado.length + ' à vista, riscado: ' + v.riscado.join(', ') + ')');
    conferir(v.textos.length === 4 && v.escassez.length === 0, '#124 e #126 · os textos aprovados no cartão da oferta (' + v.textos.join(' | ') + '), sem promoção, prazo nem resgate à vista' + (v.escassez.length ? ' (sobrou: ' + v.escassez.join(' | ') + ')' : ''));
    conferir(v.chamadas >= 1 && v.doSeu.length === 0, '#127 · as chamadas dizem "' + NOME + '" (' + v.chamadas + ' à vista) e nenhum texto diz "Análise Estratégica do seu"');
    conferir(v.mes.length === 1 && v.mes[0] === DATAS[0][1] && v.mes[0] === contaAParte(DATAS[0][0]) && !v.marcadores, '#131 · com a hora em 25/11/2026, 15h, a contagem diz "' + v.mes[0] + '", a mesma da conta à parte, e nenhum marcador na página' + (v.mes.length !== 1 || v.marcadores ? ' (contagens à vista: ' + v.mes.length + '; marcador: ' + v.marcadores + ')' : ''));
    await ctx.close();

    // A contagem nas outras datas e em três fusos do navegador (a conta é pela hora de Brasília, não pelo fuso de quem abre)
    const erradas = [];
    for (const [iso, esperado] of DATAS.slice(1)) {
      for (const fuso of ['America/Sao_Paulo', 'Asia/Tokyo', 'UTC']) {
        if (largura !== 1440 && fuso !== 'America/Sao_Paulo') continue;
        ctx = await contexto(largura, { timezoneId: fuso });
        page = await ctx.newPage();
        await page.clock.setFixedTime(new Date(iso));
        await page.goto(BASE, { waitUntil: 'networkidle' });
        const m = await contagens(page);
        if (!(m.length >= 1 && m.every(x => x === esperado) && esperado === contaAParte(iso))) erradas.push(iso + ' em ' + fuso + ': ' + (m.join(' | ') || 'nada'));
        await ctx.close();
      }
    }
    conferir(erradas.length === 0, '#131 · a contagem em 5 outras datas (véspera, última meia hora, virada do ano, dia 1, fevereiro)' + (largura === 1440 ? ', em 3 fusos do navegador' : '') + ', igual à conta à parte pela hora de Brasília' + (erradas.length ? ' (erradas: ' + erradas.join(' | ') + ')' : ''));

    // Programa lento: o programa da página só chega depois de 3 segundos; um vigia anota todo texto que aparecer na página
    ctx = await contexto(largura);
    await ctx.addInitScript(() => {
      window.__marcadores = 0; window.__mesVisto = [];
      // Olha cada pedaço de texto que entra ou muda na página (barato: só o que mudou, sem medir a página inteira)
      const olhar = t => { if (!t) return; if (/\[X\]|\[Y\]|vira em \[/.test(t)) window.__marcadores++; const m = t.match(/O seu mês vira em [^.]*\./g); if (m) window.__mesVisto.push(...m); };
      new MutationObserver(lista => {
        for (const r of lista) {
          if (r.type === 'characterData') olhar(r.target.data);
          else for (const n of r.addedNodes) olhar(n.textContent);
        }
      }).observe(document, { childList: true, subtree: true, characterData: true });
    });
    await ctx.route('**/assets/*.js', async r => { await new Promise(ok => setTimeout(ok, 3000)); return r.continue(); });
    page = await ctx.newPage();
    await page.clock.setFixedTime(new Date(DATAS[0][0]));
    const t0 = Date.now();
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    const antes = await page.evaluate(() => document.body.textContent);
    await page.waitForFunction(() => /O seu mês vira em/.test(document.body.textContent), null, { timeout: 30000 });
    const espera = Date.now() - t0;
    await rolarTudo(page);
    const vigia = await page.evaluate(() => ({ marcadores: window.__marcadores, mes: [...new Set(window.__mesVisto)] }));
    conferir(!/\[X\]|\[Y\]/.test(antes) && vigia.marcadores === 0 && vigia.mes.length === 1 && vigia.mes[0] === DATAS[0][1] && espera >= 3000,
      '#131 · com o programa chegando 3 segundos depois (' + Math.round(espera / 100) / 10 + ' s até a contagem), nenhum marcador apareceu em momento nenhum, e o único texto da contagem foi "' + (vigia.mes[0] || 'nenhum') + '"');
    await ctx.close();

    // JavaScript desligado
    ctx = await browser.newContext({ viewport: { width: largura, height: ALTURA[largura] }, javaScriptEnabled: false });
    page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'load' });
    const html = await page.content();
    const corpo = (await page.locator('body').innerText()).trim();
    conferir(!/\[X\]|\[Y\]/.test(html) && !/O seu mês vira em/.test(corpo), '#131 · com o JavaScript desligado, nenhum marcador: a landing não aparece (é um programa React e fica em branco sem JavaScript, como sempre ficou; texto à vista: ' + (corpo.length ? '"' + corpo.slice(0, 60) + '"' : 'nenhum') + ')');
    await ctx.close();

    // Prints, só em 375 e 1440, com 2 pixels por ponto e a hora presa
    if (largura !== 360) {
      for (const nome of ['topo', 'oferta']) {
        ctx = await contexto(largura, { viewport: { width: largura, height: PRINT_ALTURA[nome][largura] }, deviceScaleFactor: 2 });
        page = await ctx.newPage();
        await page.clock.setFixedTime(new Date(HORA_DOS_PRINTS));
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(1200);
        if (nome === 'oferta') {
          await rolarTudo(page);
          await page.evaluate(() => {
            const alvo = [...document.querySelectorAll('p,span')].filter(e => e.children.length === 0 && /Sempre gratuita/.test(e.textContent) && e.getBoundingClientRect().height > 0).pop();
            if (alvo) window.scrollTo(0, Math.max(0, alvo.getBoundingClientRect().top + scrollY - 200));
          });
          await page.waitForTimeout(1200);
        }
        await page.screenshot({ path: path.join(PRINTS, nome + '-' + largura + '.png') });
        await ctx.close();
      }
    }
  }
  conferir(fora.length === 0, 'nenhum pedido para fora de 127.0.0.1' + (fora.length ? ' (' + [...new Set(fora)].join(', ') + ')' : ''));
  await browser.close();
  srv.close();
  console.log('\n' + (falhas ? falhas + ' conferência(s) falharam' : 'Tudo certo: todas as conferências passaram'));
  process.exit(falhas ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
