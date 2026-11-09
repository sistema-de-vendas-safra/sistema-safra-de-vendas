// Tira prints de uma página local em 375 e 1440 pixels de largura.
// Uso: node print.js <arquivo.html> <pasta-de-saida> <prefixo> [--celular]
// Com --celular, o print de 375 imita um celular (isMobile, toque, densidade 2), para a meta viewport valer,
// e o script diz a largura útil (innerWidth) da página. O de 1440 continua igual.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const os = require('os');

function acharChromium() {
  const base = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  const pastas = fs.readdirSync(base).filter(p => p.startsWith('chromium-')).sort().reverse();
  for (const p of pastas) {
    const exe = path.join(base, p, 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');
    if (fs.existsSync(exe)) return exe;
    const exe2 = path.join(base, p, 'chrome-mac/Chromium.app/Contents/MacOS/Chromium');
    if (fs.existsSync(exe2)) return exe2;
  }
  throw new Error('Chromium não encontrado');
}

module.exports = { acharChromium };

if (require.main === module) {
  (async () => {
    const args = process.argv.slice(2);
    const celular = args.includes('--celular');
    const [arquivo, saida, prefixo] = args.filter(a => a !== '--celular');
    fs.mkdirSync(saida, { recursive: true });
    const browser = await chromium.launch({ executablePath: acharChromium() });
    for (const largura of [375, 1440]) {
      const movel = celular && largura === 375 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {};
      const page = await browser.newPage(Object.assign({ viewport: { width: largura, height: largura === 375 ? 812 : 900 } }, movel));
      await page.goto('file://' + path.resolve(arquivo));
      await page.waitForTimeout(800);
      if (movel.isMobile) console.log(prefixo + '-' + largura + ': celular, largura útil ' + await page.evaluate(() => innerWidth));
      await page.screenshot({ path: path.join(saida, `${prefixo}-${largura}.png`), fullPage: true });
      await page.close();
    }
    await browser.close();
  })().catch(e => { console.error(e); process.exit(1); });
}
