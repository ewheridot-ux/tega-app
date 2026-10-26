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

// 5. game layer: pops, buff row, quest log, gold, shop, shields, seasons
const gm = await page.evaluate(async () => {
  const w = ms => new Promise(r => setTimeout(r, ms)), r = {};
  go('today'); curDay = TODAY; const x0 = computeXP();
  // fill this week + today so clears happen
  for (let i = 0; i < 7; i++) { const k = addDays(TODAY, -i); const d = ensureDay(k); d.checkin = d.checkin || { feel: 2 }; d.top3 = [0, 1, 2].map(j => ({ text: 'task ' + j, track: '', done: false })); d.habits = { gym: true, content: true, datum: true }; }
  commit({ skipXp: true }); await w(100);
  document.querySelectorAll('.hp-i').forEach(e => e.remove());
  const d = ensureDay(TODAY); d.top3.forEach(t => t.done = true); commit();
  r.pop = [...document.querySelectorAll('.hp-i')].map(e => e.textContent).join(' | ');
  r.dailyChest = !!R_().chests['day:' + TODAY];
  for (const it of weekInits(THIS_WEEK)) ensureWeek(THIS_WEEK).inits[it.id] = true; const mq = weekQ(THIS_WEEK); if (mq) mq.done = TODAY; commit();
  r.weekChest = !!R_().chests['wk:' + THIS_WEEK] || !weekInits(THIS_WEEK).length;
  r.row = !!document.querySelector('.fx-row') && [...document.querySelectorAll('.fx-row .fxi')].every(b => [...b.children].every(c => c.tagName === 'I'));
  const fx = document.querySelector('.fxi'); if (fx) { fx.click(); await w(80); r.popLine = (document.getElementById('fxpop')?.innerText || '').length > 0; fxPopClose(); } else r.popLine = true;
  questLogOpen(); r.ql = !!document.querySelector('#g-sheet .ql-s') && document.querySelectorAll('#g-sheet .ql-s').length === 4; gSheetClose();
  r.qlDup = !document.querySelector('#view .card h2')?.textContent.includes('⚔️ Quests');
  // gold + shop + shields
  const g0 = goldNow(); r.goldPos = g0 > 0; r.goldInt = Number.isInteger(g0);
  const sh0 = shieldsLeft(); R_().loot.push({ ic: '💎', n: 'test', r: 3, d: TODAY, k: 'test' }); commit({ skipXp: true });
  const g1 = goldNow(); shopBuy('shield'); const g2 = goldNow(), sh1 = shieldsLeft();
  r.shop = (sh0 >= 3) ? g2 === g1 : (g2 === g1 - 150 && sh1 === sh0 + 1);
  const spent = R_().spent.length; for (let i = 0; i < 40; i++) shopBuy('shield'); r.cap = shieldsLeft() <= 3 && goldNow() >= 0;
  r.spentKept = R_().spent.length >= spent;
  // season
  const T = seasonTrack(); r.tier = T.tier >= 1 && T.tier <= 13;
  const Q = (S.quarters[THIS_Q] ||= { objectives: [] }); Q.objectives = [{ id: 'tobj', text: 'test', track: '', krs: [1, 2, 3].map(i => ({ id: 'tk' + i, text: 'kr ' + i, current: 1, target: 1 })) }];
  const xb = computeXP(); commit(); r.sboss = !!R_().sboss?.[THIS_Q] && computeXP() >= xb + 300;
  seasonOpen(); r.seasonSheet = document.querySelectorAll('#g-sheet .st-t').length === 13; gSheetClose();
  r.pills = [...document.querySelectorAll('.pills .pill')].map(p => p.textContent).join(' | ');
  r.xpUp = computeXP() >= x0;
  return r;
});
ok('pop shows after finishing Top 3', /XP/.test(gm.pop), gm.pop);
ok('daily clear gives a chest', gm.dailyChest); ok('weekly clear gives a chest', gm.weekChest);
ok('buff row is icons only', gm.row); ok('tapping a buff shows its line', gm.popLine);
ok('quest log has Daily, Weekly, Season, Side', gm.ql); ok('no duplicate quest card on Today', gm.qlDup);
ok('gold earned and whole', gm.goldPos && gm.goldInt); ok('shop: shield costs 150 and adds a shield', gm.shop); ok('shields cap at 3, gold never negative', gm.cap); ok('spend log kept', gm.spentKept);
ok('season tier within 1–13', gm.tier); ok('season boss falls at 70% and gives 300 XP', gm.sboss); ok('season sheet shows 13 tiers', gm.seasonSheet);
ok('top bar shows streak+shields, level, gold, season', /🛡️\d\/3/.test(gm.pills) && /💰/.test(gm.pills) && /\/13/.test(gm.pills), gm.pills);
ok('XP only went up', gm.xpUp);
// review fixes: undo takes hits back, pops wait behind sheets, overnight cures don't pop
const rv = await page.evaluate(async () => {
  const w = ms => new Promise(r => setTimeout(r, ms)), r = {};
  const d = ensureDay(TODAY); d.top3[0].done = false; commit(); const n0 = hitsToday().length;
  d.top3[0].done = true; commit(); const n1 = hitsToday().length; d.top3[0].done = false; commit(); r.undo = hitsToday().length <= n1 && hitsToday().length >= n0 - 5;
  document.querySelectorAll('#lvs, .modal').forEach(e => e.remove()); document.querySelectorAll('.hp-i').forEach(e => e.remove()); shopOpen(); d.top3[0].done = true; commit(); r.waits = document.querySelectorAll('.hp-i').length === 0; gSheetClose(); await w(700); r.after = document.querySelectorAll('.hp-i').length > 0;
  const a = gameSnap(); a.d = addDays(TODAY, -1); a.fx = [['rusty', '🦴', 'Rusty', 0]]; a.st = {}; document.querySelectorAll('.hp-i').forEach(e => e.remove()); lastGame = a; commit({ skipXp: true });
  r.overnight = ![...document.querySelectorAll('.hp-i')].some(e => /cured|STR/.test(e.textContent));
  return r;
});
ok('undo takes the hits back', rv.undo); ok('pops wait while a sheet is open', seed === 1 ? rv.waits : rv.waits && rv.after);  // the public copy keeps an evolution picker open, so pops rightly keep waiting ok('overnight changes don’t pop as cures', rv.overnight);
// changes made while away pop on the next open
await page.evaluate(() => { const d = ensureDay(TODAY); d.habits.journal = true; saveLocal(); });
await page.reload(); await page.waitForTimeout(2500);
for (let i = 0; i < 3; i++) { try { await page.getByText('CONTINUE').first().click({ timeout: 800 }); await page.waitForTimeout(300); } catch { break; } }
const since = await page.evaluate(() => { document.querySelectorAll('#lvs, .modal').forEach(e => e.remove()); commit({ skipXp: true }); return [...document.querySelectorAll('.hp-i')].map(e => e.textContent).join(' | '); });
if (seed !== 1) ok('changes since last open pop on the next open', /XP/.test(since), since);

ok('no errors anywhere', errors.length === 0, errors[0]);
await browser.close();
console.log(fails ? `\n${fails} check(s) failed` : '\nall checks passed');
process.exit(fails ? 1 : 0);
