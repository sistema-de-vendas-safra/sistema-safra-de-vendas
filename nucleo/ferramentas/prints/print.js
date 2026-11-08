// Tira prints de uma página local em 375 e 1440 pixels de largura.
// Uso: node print.js <arquivo.html> <pasta-de-saida> <prefixo>
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
    const [arquivo, saida, prefixo] = process.argv.slice(2);
    fs.mkdirSync(saida, { recursive: true });
    const browser = await chromium.launch({ executablePath: acharChromium() });
    for (const largura of [375, 1440]) {
      const page = await browser.newPage({ viewport: { width: largura, height: largura === 375 ? 812 : 900 } });
      await page.goto('file://' + path.resolve(arquivo));
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(saida, `${prefixo}-${largura}.png`), fullPage: true });
      await page.close();
    }
    await browser.close();
  })().catch(e => { console.error(e); process.exit(1); });
}
