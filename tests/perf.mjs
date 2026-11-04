// Phone-feel checks on a real-sized state: render time per page, page never blank on swipe, one #view, Life look, avatar paint.
// Prints numbers only — never data.   PW_ENGINE=webkit|chromium  node tests/perf.mjs [app.html] [--shots DIR]
import pw from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2), shotIx = args.indexOf('--shots'), SHOTS = shotIx >= 0 ? args[shotIx + 1] : null;
const APP = path.resolve(args.find((a, i) => !a.startsWith('--') && (shotIx < 0 || i !== shotIx + 1)) || path.join(root, 'web/app.html'));
console.log('testing', path.basename(APP), '· engine', process.env.PW_ENGINE || 'chromium');
const WEB = path.join(root, 'web'), ENGINE = process.env.PW_ENGINE || 'chromium';
const BUDGET = +process.env.RENDER_BUDGET || 100;
let fails = 0;
const ok = (name, cond, extra = '') => { console.log(`${cond ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`); if (!cond) fails++; };

const bt = pw[ENGINE];
const browser = await bt.launch(ENGINE === 'chromium' && process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
const dev = { ...pw.devices['iPhone 13'] }; if (ENGINE === 'chromium') delete dev.defaultBrowserType;
const ctx = await browser.newContext(dev);
// the phone's cloud copy takes a while to arrive — the avatar must not wait for it
await ctx.addInitScript(() => { if (!window.claude) window.claude = { use: () => new Promise(r => setTimeout(() => r(null), 2500)) };
  window.__frames = []; const f = t => { __frames.push(t); if (__frames.length < 120) requestAnimationFrame(f); }; requestAnimationFrame(f); });
const page = await ctx.newPage();
const errors = []; page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
await ctx.route('https://tega.test/**', async r => {
  const p = r.request().url().split('tega.test/')[1].split('?')[0] || 'app.html';
  const f = p === 'app.html' ? APP : p === 'fixture.js' ? path.join(root, 'tests/fixture.js') : path.join(WEB, p);
  // the page gets the same viewport tag the iPhone build gives it (scripts/build-www.mjs) — without it a phone lays the page out 980 px wide
  if (fs.existsSync(f)) await r.fulfill({ body: p.endsWith('.html') ? '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">' + fs.readFileSync(f, 'utf8') : fs.readFileSync(f), contentType: p.endsWith('.html') ? 'text/html; charset=utf-8' : p.endsWith('.js') ? 'text/javascript' : undefined });
  else await r.fulfill({ status: 404, body: '' });
});
await ctx.route(/^https:\/\/(?!tega\.test)/, r => r.abort()); // offline: no network noise in timings
// iPhone-ish CPU: Chromium slowed 2× by default (CPU_RATE=4 for a harsh check); WebKit runs at the machine's speed
const throttle = async p => { if (ENGINE !== 'chromium') return; const c = await ctx.newCDPSession(p); await c.send('Emulation.setCPUThrottlingRate', { rate: +process.env.CPU_RATE || 2 }); };
await throttle(page);
const boot = async () => { await page.waitForFunction(() => typeof S !== 'undefined' && S && document.getElementById('view') && _dbSettled, null, { timeout: 30000 }); await page.waitForTimeout(1200);
  for (let i = 0; i < 3; i++) { try { await page.getByText('CONTINUE').first().click({ timeout: 800 }); await page.waitForTimeout(200); } catch { break; } } };
await page.goto('https://tega.test/app.html'); await boot();
await page.addScriptTag({ url: 'https://tega.test/fixture.js' });
const size = await page.evaluate(() => tegaFixture());
console.log('fixture', JSON.stringify(size));

// avatar: reload with the fixture in storage (cloud copy still on its way); the picture must be in the very first render
await page.reload(); await boot();
const av = await page.evaluate(() => { const f1 = __frames.find(t => t >= (window.__r0 ?? 0));   // the first frame that shows the app
  return { img: window.__avFirst === true, d: window.__avPaint != null && f1 != null ? window.__avPaint - f1 : null }; });
ok('avatar is a real picture on the first render (not a placeholder), cloud still loading', av.img);
ok('avatar painted within 300 ms of the app\'s first frame', av.d != null && av.d < 300, av.d == null ? 'not recorded' : Math.round(av.d) + ' ms');

// render time per page (median of 5): a page change (cached numbers) and a render right after your data changed
const PAGES = ['today', 'week', 'quests', 'model', 'content', 'datum', 'gym', 'money', 'social', 'hustle', 'learn', 'city', 'evolve'];
const times = {}, fresh = {};
for (const v of PAGES) {
  const r = await page.evaluate(async v => { location.hash = v; await new Promise(r => setTimeout(r, 300)); const nav = [], dat = [], med = a => a.sort((x, y) => x - y)[a.length >> 1];
    for (let i = 0; i < 5; i++) { let a = performance.now(); _navR = true; render(); nav.push(performance.now() - a); await new Promise(r => setTimeout(r, 40));
      a = performance.now(); render(); dat.push(performance.now() - a); await new Promise(r => setTimeout(r, 40)); }
    return [med(nav), med(dat)]; }, v);
  times[v] = r[0]; fresh[v] = r[1];
}
console.log('page-change render ms', Object.entries(times).map(([k, t]) => `${k}:${Math.round(t)}`).join(' '));
console.log('after-data-change render ms', Object.entries(fresh).map(([k, t]) => `${k}:${Math.round(t)}`).join(' '));
for (const [k, t0] of Object.entries(times)) { let t = t0;
  if (t >= BUDGET) t = Math.min(t, await page.evaluate(async v => { location.hash = v; await new Promise(r => setTimeout(r, 400)); const a = [];   // a noisy runner gets one more look before failing
    for (let i = 0; i < 7; i++) { const s = performance.now(); _navR = true; render(); a.push(performance.now() - s); await new Promise(r => setTimeout(r, 60)); } return a.sort((x, y) => x - y)[3]; }, k));
  ok(`render ${k} < ${BUDGET} ms`, t < BUDGET, Math.round(t) + ' ms' + (t !== t0 ? ` (first look ${Math.round(t0)})` : '')); }

// tap cost: a small in-page change (checkbox-style commit) on Today
const tap = await page.evaluate(async () => { location.hash = 'today'; await new Promise(r => setTimeout(r, 250)); const t = []; for (let i = 0; i < 5; i++) { const a = performance.now(); commit({ skipXp: true }); t.push(performance.now() - a); await new Promise(r => setTimeout(r, 60)); } return t.sort((x, y) => x - y)[2]; });
ok(`a tap that saves data (commit) on Today < ${2 * BUDGET} ms`, tap < 2 * BUDGET, Math.round(tap) + ' ms');

// Life look: every Life entry (nav icon + each tab) shows Streetwear · Safety Orange
for (const v of ['life', 'social', 'hustle', 'learn']) {
  const a = await page.evaluate(async v => { location.hash = 'today'; await new Promise(r => setTimeout(r, 200)); location.hash = v; await new Promise(r => setTimeout(r, 300));
    const h = document.documentElement; return { skin: h.dataset.skin, look: h.dataset.look, hl: getComputedStyle(document.querySelector('.nav button.on')).backgroundColor }; }, v);
  ok(`Life look via #${v}`, a.skin === 'study' && a.look === 'street', `${a.skin}/${a.look}`);
}
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

// swipe on each tabbed page: sample every frame — never blank, never two #view, only the changing part moves
const swipe = async (v, dir) => {
  await page.evaluate(async v => { location.hash = v; await new Promise(r => setTimeout(r, 300)); scrollTo(0, 0); }, v);
  const has = await page.evaluate(() => !!(typeof swInfo === 'function' && swInfo())); if (!has) return null;
  return page.evaluate(async dir => {
    const S0 = { minOp: 1, maxViews: 0, blank: 0, frames: 0, stuckTransform: '', fixedShift: 0, contentShift: 0 };
    // what stays the same between tabs (everything up to the tab bar) must hold still; what comes after it slides
    const pos = () => { const v = document.getElementById('view'), bar = swBar(); if (!v || !bar) return null; const after = swParts(v, bar)[0];
      return { bar: bar.getBoundingClientRect().left, top: v.firstElementChild.getBoundingClientRect().left, after: after ? after.getBoundingClientRect().left : null }; };
    const p0 = pos();
    let on = true; const tick = () => { if (!on) return; const vs = document.querySelectorAll('#view'); S0.maxViews = Math.max(S0.maxViews, vs.length);
      // what the user sees: the most opaque visible page layer
      let best = 0; for (const el of document.querySelectorAll('#view, .sw-ghost')) { let o = 1; for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') { o = 0; break; } o *= +cs.opacity; }
        const r = el.getBoundingClientRect(); if (r.right <= 0 || r.left >= innerWidth || !el.textContent.trim()) o = 0; best = Math.max(best, o); }
      const p = pos(); if (p && p0) { S0.fixedShift = Math.max(S0.fixedShift, Math.abs(p.bar - p0.bar), Math.abs(p.top - p0.top)); if (p.after != null) S0.contentShift = Math.max(S0.contentShift, Math.abs(p.after - p0.top)); }
      S0.minOp = Math.min(S0.minOp, best); if (best < 0.5) S0.blank++; S0.frames++; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    const before = swInfo().i; swipeTab(dir); await new Promise(r => setTimeout(r, 900)); on = false;
    const v = document.getElementById('view'); S0.stuckTransform = (v.style.transform || '') + (getComputedStyle(v).transform !== 'none' ? ' computed:' + getComputedStyle(v).transform : '') + (getComputedStyle(v).willChange.includes('transform') ? ' will-change' : '');
    S0.moved = (swInfo() || {}).i !== before; return S0; }, dir);
};
for (const v of ['social', 'hustle', 'today', 'money', 'gym']) {
  const r = await swipe(v, 1) || await swipe(v, -1);
  if (!r) { console.log(`· ${v}: no tab bar`); continue; }
  ok(`swipe ${v}: page never blank`, r.blank === 0, `min opacity ${r.minOp.toFixed(2)} over ${r.frames} frames`);
  ok(`swipe ${v}: one #view`, r.maxViews === 1, String(r.maxViews));
  ok(`swipe ${v}: no transform left on #view`, !r.stuckTransform, r.stuckTransform);
  ok(`swipe ${v}: moved to next tab`, r.moved);
  ok(`swipe ${v}: header and tab bar hold still`, r.fixedShift < 1, Math.round(r.fixedShift) + ' px');
  ok(`swipe ${v}: the tab's content slides`, r.contentShift > 20, Math.round(r.contentShift) + ' px');
}

// scrolled down, then swipe: the next tab opens at the same height (or its bottom, if it is shorter)
for (const v of ['social', 'today', 'money']) {
  const r = await page.evaluate(async v => { location.hash = 'gym'; await new Promise(r => setTimeout(r, 200)); location.hash = v; await new Promise(r => setTimeout(r, 400));
    if (!swInfo()) return null; const y0 = Math.min(500, document.documentElement.scrollHeight - innerHeight); scrollTo(0, y0); await new Promise(r => setTimeout(r, 100));
    const I = swInfo(), dir = I.i < I.B.length - 1 ? 1 : -1; swipeTab(dir); await new Promise(r => setTimeout(r, 900));
    const max = document.documentElement.scrollHeight - innerHeight; return { y0, y: scrollY, want: Math.min(y0, max) }; }, v);
  if (!r) continue;
  ok(`swipe ${v}: next tab keeps your scroll`, r.y0 > 50 && Math.abs(r.y - r.want) < 4, `was ${Math.round(r.y0)} → ${Math.round(r.y)}`);
}

if (SHOTS) { // one frame in the middle of a swipe: old page leaving, new page arriving, nothing blank
  await page.evaluate(async () => { try { evoSnooze = true; closeEvo(); } catch (e) { } location.hash = 'social'; await new Promise(r => setTimeout(r, 400)); scrollTo(0, 0); swipeTab(1); await new Promise(r => setTimeout(r, 110)); });
  await page.screenshot({ path: path.join(SHOTS, `${ENGINE}-swipe-mid.png`) }); await page.waitForTimeout(600); }
if (SHOTS) for (const v of ['today', 'social', 'hustle', 'learn', 'gym', 'money', 'model', 'city']) {
  await page.evaluate(async v => { try { evoSnooze = true; closeEvo(); } catch (e) { } location.hash = v; await new Promise(r => setTimeout(r, 500)); scrollTo(0, 0); }, v); await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOTS, `${ENGINE}-${v}.png`) });
}
ok('no page errors', errors.length === 0, errors[0]);
await browser.close();
console.log(fails ? `${fails} check(s) failed` : 'all perf checks passed');
process.exit(fails ? 1 : 0);
