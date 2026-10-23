// Automatic checks before every iPhone build. Prints pass/fail only — never your data.
//   node tests/run.mjs [path/to/app.html]        (default web/app.html; CI runs it after the private seed is injected)
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const APP = path.resolve(process.argv[2] || path.join(root, 'web/app.html'));
const WEB = path.join(root, 'web');
let fails = 0;
const ok = (name, cond, extra = '') => { console.log(`${cond ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`); if (!cond) fails++; };

const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = []; page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
await page.route('https://tega.test/**', async r => {
  const p = r.request().url().split('tega.test/')[1].split('?')[0] || 'app.html';
  const f = p === 'app.html' ? APP : path.join(WEB, p);
  if (fs.existsSync(f)) await r.fulfill({ body: fs.readFileSync(f), contentType: p.endsWith('.html') ? 'text/html; charset=utf-8' : undefined });
  else await r.fulfill({ status: 404, body: '' });
});
// https origin: crypto.subtle needs a secure context
await page.goto('https://tega.test/app.html'); await page.waitForTimeout(2500);
for (let i = 0; i < 3; i++) { try { await page.getByText('CONTINUE').first().click({ timeout: 1000 }); await page.waitForTimeout(300); } catch { break; } }

// 1. the page boots and every main page renders without a crash
ok('app boots', errors.length === 0, errors[0]);
const seed = await page.evaluate(() => typeof SEED_STUB !== 'undefined' ? SEED_STUB : null);
if (process.env.CI) ok('private data is in this build', seed === 0);
const xp0 = await page.evaluate(() => computeXP());
for (const v of ['today', 'money', 'model', 'gym', 'settings', 'social', 'datum', 'week']) {
  const n = errors.length; try { await page.evaluate(v => go(v), v); await page.waitForTimeout(300); } catch (e) { errors.push(v + ': ' + e.message.slice(0, 80)); }
  ok(`${v} page renders`, errors.length === n, errors[n]);
}

// 2. XP never drops — not from rendering, not from a reload
ok('XP unchanged after visiting every page', (await page.evaluate(() => computeXP())) >= xp0);
await page.reload(); await page.waitForTimeout(2500);
ok('XP unchanged after a reload', (await page.evaluate(() => computeXP())) >= xp0);
ok('XP floor holds', await page.evaluate(() => { const v = computeXP(); S.xpFloor = { d: TODAY, v: v + 100, raw: v }; const r = computeXP() >= v + 100; S.xpFloor = { d: TODAY, v, raw: v }; return r; }));

// 3. booking emails parse: both days, start time, per-day rate from the full email
const job = await page.evaluate(() => {
  const body = 'Monday, October 26th 2026 | Job / 8:30am | Client | CALVIN KLEIN | Info | Model Day Rate: $3,000.00 + 20% = $3,600.00 Tuesday 10/27 Model Day Rate: $6,000.00 + 20% = $7,200.00 | Tuesday, October 27th 2026 | Job / 8:30am | Model Day Rate: $3,000.00 Model Day Rate: $6,000.00';
  const th = { id: 't', messages: [{ subject: 'Job CALVIN KLEIN - ONE Men', snippet: 'Monday, October 26th 2026 Job / 8:30am Client CALVIN KLEIN Info Model Day Rate: $3000.00 + 20% = $3600.00 Tuesday 10/27' }] };
  const a = mParse(th, body), b = mParse(th);
  return { days: a.d.join(','), tm: a.tm, rn: a.rn, rnSnip: b.rn, daysSnip: b.d.length, t: a.t };
});
ok('booking: both days found', job.days === '2026-10-26,2026-10-27' && job.daysSnip === 2, job.days);
ok('booking: start time', job.tm === '8:30am', job.tm);
ok('booking: per-day rate from full email ($9,000 over 2 days)', job.rn === 4500, String(job.rn));
ok('booking: rate from preview is a clean number', job.rnSnip === 3000, String(job.rnSnip));

// 4. yoga timer counts on the real clock, pauses, and moves on by itself
const y = await page.evaluate(async () => {
  const w = ms => new Promise(r => setTimeout(r, ms));
  yogaStart('quick'); const t0 = yLeft(); await w(1300); const t1 = yLeft();
  yogaPause(); const p0 = yLeft(); await w(1200); const p1 = yLeft(); yogaPause();
  const btn = document.getElementById('yg-pp'); await w(500); const same = btn === document.getElementById('yg-pp');
  const i0 = YG.i; YG.endAt = Date.now() - 50; await w(450); const moved = YG.i === i0 + 1;
  const breath = document.getElementById('yg-bl').textContent;
  YG.paused = true; yogaStop(false); return { counts: t1 < t0, held: p0 === p1, same, moved, breath };
});
ok('yoga: timer counts down', y.counts); ok('yoga: pause holds', y.held); ok('yoga: buttons are not rebuilt every tick', y.same);
ok('yoga: moves to the next pose by itself', y.moved); ok('yoga: breathing guide shows', /breathe (in|out)/i.test(y.breath), y.breath);

ok('no errors anywhere', errors.length === 0, errors[0]);
await browser.close();
console.log(fails ? `\n${fails} check(s) failed` : '\nall checks passed');
process.exit(fails ? 1 : 0);
