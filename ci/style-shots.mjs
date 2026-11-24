// Renders the 5 talent-tree styles with the real fonts (CI can reach Google Fonts). Made-up demo state only.
import { chromium } from 'playwright'; import fs from 'node:fs';
fs.mkdirSync('shots', { recursive: true });
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await pg.route('https://tega.test/**', r => r.fulfill({ body: fs.readFileSync('web/app.html'), contentType: 'text/html; charset=utf-8' }));
await pg.goto('https://tega.test/app.html'); await pg.waitForTimeout(3000);
await pg.addScriptTag({ path: 'tests/fixture.js' }); await pg.evaluate(() => { try { tegaFixture(); } catch (e) {} });
await pg.evaluate(() => { const T = TT_(); const give = (id, r) => T.log.push({ id, d: TODAY, r }); give('camera', 3); give('headliner', 1); give('silver', 1); give('callback', 2); give('runway', 1); give('reachout', 1);
  tEarned = () => 18; tMet = () => new Proxy({}, { get: () => 999999 }); document.querySelectorAll('.modal').forEach(m => m.remove()); document.documentElement.dataset.skin = 'crt'; });
for (const sty of ['arcade', 'jrpg', 'stars', 'dungeon', 'gameboy']) {
  await pg.evaluate(s => { S.ttStyle = s; tAreaTab = 'tree'; charGo('skills', 'MODEL'); }, sty); await pg.waitForTimeout(1200);
  await pg.evaluate(async () => { await document.fonts.ready; [...document.querySelectorAll('body *')].filter(e => /LEVEL\s*UP/i.test(e.textContent || '') && getComputedStyle(e).position === 'fixed').forEach(e => e.remove()); document.querySelectorAll('.modal,[class*="toast"],.nav,#cd-pop,[class*="pop"],[class*="chest"]').forEach(e => { if (!e.closest('.tt')) e.remove(); }); });
  await pg.waitForTimeout(500); const el = await pg.$('.tt'); await el.screenshot({ path: `shots/${sty}.png` });
}
console.log(await pg.evaluate(() => ['Cinzel', 'Jacquard 12', 'Pixelify Sans', 'DotGothic16', 'Silkscreen', 'Press Start 2P'].map(f => f + ':' + [...document.fonts].some(x => x.family.replace(/"/g, '') === f && x.status === 'loaded')).join(' ')));
await b.close();
