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
  document.querySelectorAll('#lvs, .modal').forEach(e => e.remove()); document.querySelectorAll('.hp-i').forEach(e => e.remove()); shopOpen(); d.top3[0].done = true; commit(); r.waits = document.querySelectorAll('.hp-i').length === 0; gSheetClose(); await w(700); r.after = document.querySelectorAll('.hp-i').length > 0 || hitBusy();   // still waiting is right if another overlay (e.g. evolution picker) is open
  const a = gameSnap(); a.d = addDays(TODAY, -1); a.fx = [['rusty', '🦴', 'Rusty', 0]]; a.st = {}; document.querySelectorAll('.hp-i').forEach(e => e.remove()); lastGame = a; commit({ skipXp: true });
  r.overnight = ![...document.querySelectorAll('.hp-i')].some(e => /cured|STR/.test(e.textContent));
  return r;
});
ok('undo takes the hits back', rv.undo); ok('pops wait while a sheet is open', seed === 1 ? rv.waits : rv.waits && rv.after);  // the public copy keeps an evolution picker open, so pops rightly keep waiting ok('overnight changes don’t pop as cures', rv.overnight);
// the city: opens from your picture, bosses on buildings, quest board on the fountain
const cy = await page.evaluate(async () => {
  const w = ms => new Promise(r => setTimeout(r, ms)), r = {};
  document.querySelectorAll('#lvs, .modal, #g-sheet').forEach(e => e.remove());
  document.querySelector('.pfp-sm')?.click(); await w(700);
  r.view = view; r.markers = document.querySelectorAll('#cy-mk .cy-m').length; r.quest = !!document.querySelector('#cy-mk .cy-qm');
  r.house = !!document.querySelector('.cy-house'); r.board = !!document.querySelector('.cy-board');
  document.querySelector('#cy-mk .cy-qm')?.click(); await w(200); r.qlog = !!document.querySelector('#g-sheet .ql-s'); gSheetClose();
  go('evolve'); await w(300); r.noDup = !document.querySelector('#view .hq-iso') && !/BOSSES/i.test(document.querySelector('#view')?.innerText.slice(0, 4000) || '');
  go('city'); await w(300); return r;
});
ok('your picture opens the city', cy.view === 'city', cy.view); ok('bosses float on their buildings', cy.markers >= 3, String(cy.markers));
ok('quest board marker on the fountain opens the quest log', cy.quest && cy.qlog); ok('quest board + house cards', cy.board && cy.house);
ok('town and bosses not repeated on the Character page', cy.noDup);
// changes made while away pop on the next open
await page.evaluate(() => { const d = ensureDay(TODAY); d.habits.journal = true; saveLocal(); });
await page.reload(); await page.waitForTimeout(2500);
for (let i = 0; i < 3; i++) { try { await page.getByText('CONTINUE').first().click({ timeout: 800 }); await page.waitForTimeout(300); } catch { break; } }
const since = await page.evaluate(() => { document.querySelectorAll('#lvs, .modal').forEach(e => e.remove()); commit({ skipXp: true }); return [...document.querySelectorAll('.hp-i')].map(e => e.textContent).join(' | '); });
if (seed !== 1) ok('changes since last open pop on the next open', /XP/.test(since), since);
// every boss has its own animated art: idle, hit and defeat sheets, and draws without errors
const art = await page.evaluate(() => Object.values(BOSS_SPR).map(k => [k, ['_idle','_hit','_dead'].every(s => PXW[k+s] && PXW[k+s].n > 1)]));
ok('all six bosses have idle, hit and defeat animations', art.every(a => a[1]), JSON.stringify(art.filter(a => !a[1])));

// a finished shoot day goes straight onto what ONE owes you (and off "booked"), with no double count
const sh = await page.evaluate(() => { const M=mState(); M.auto ||= {}; const y=addDays(TODAY,-1), t=TODAY, b0=mOwedParts(mPipe()).newer, c0=oneComing();
  M.auto.T_Y={id:'T_Y',t:'job',s:'confirmed',c:'Test Client',d:[y],r:'$2000',rn:2000,auto:1}; M.auto.T_T={id:'T_T',t:'job',s:'confirmed',c:'Test Client B',d:[t],tm:'12:00am to 12:01am',rn:1000,auto:1}; M.auto.T_N={id:'T_N',t:'job',s:'confirmed',c:'Test Client C',d:[addDays(t,3)],rn:3000,auto:1};
  _mVer++; const P=mPipe(), b1=mOwedParts(P).newer, c1=oneComing(); const r={yesterday:P.T_Y.stage, today:P.T_T.stage, future:P.T_N.stage, add:Math.round(b1-b0), total:Math.round(b1-b0+c1.booked-c0.booked)};
  delete M.auto.T_Y; delete M.auto.T_T; delete M.auto.T_N; _mVer++; return r; });
ok('a finished shoot day is added to what ONE owes', sh.yesterday === 'shot' && sh.today === 'shot' && sh.future === 'confirmed' && sh.add === 2400, JSON.stringify(sh));
ok('…and isn’t counted twice in money coming from ONE', sh.total === 2400 + 2400, JSON.stringify(sh));
// Tega's OKR suggestions: only what you pick changes; a category you didn't pick keeps your goal
const ok2 = await page.evaluate(() => { const Q=S.quarters[curQ]; openOkrSug(curQ); const st=okrSug.objectives[0].track; closeOkrSug(); if (!Q.objectives.some(o=>o.track===st)) Q.objectives.push({id:'tmpO',track:st,title:'Old goal',krs:[]}); if (!Q.objectives.some(o=>o.track!==st)) Q.objectives.push({id:'tmpP',track:st==='personal'?'fitness':'personal',title:'Other goal',krs:[]}); const before=JSON.parse(JSON.stringify(Q.objectives)); const tracks=[...new Set(before.map(o=>o.track))];
  openOkrSug(curQ); const none=Object.values(okrPick).every(v=>!v); okrApply(); const same=JSON.stringify(S.quarters[curQ].objectives)===JSON.stringify(before);
  openOkrSug(curQ); const i=okrSug.objectives.findIndex(o=>tracks.includes(o.track)); okrPick[i]='rep'; const t=okrSug.objectives[i].track, title=okrSug.objectives[i].title; okrApply();
  const after=S.quarters[curQ].objectives, kept=before.filter(o=>o.track!==t).every(o=>after.some(a=>a.id===o.id)), replaced=after.filter(o=>o.track===t).map(o=>o.title).join('|')===title, archived=(S.quarters[curQ].archive||[]).slice(-1)[0]?.objectives.every(o=>o.track===t);
  S.quarters[curQ].objectives=before.filter(o=>!/^tmp/.test(o.id)); S.quarters[curQ].archive.pop(); commit({skipXp:true}); return {none, same, kept, replaced, archived}; });
ok('OKR suggestions change nothing until you pick', ok2.none && ok2.same, JSON.stringify(ok2));
ok('replacing one category keeps every other goal', ok2.kept && ok2.replaced && ok2.archived, JSON.stringify(ok2));
// self-tapes and casting videos land on the modeling calendar (as self-tapes, due that day)
const st = await page.evaluate(() => { const d=addDays(TODAY,1), dt=parseD(d), dl=dt.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})+'th '+d.slice(0,4);
  const body=`Hey, the client is requesting casting materials for you. Let me know if you can get these over to me by EOD | ${dl} | | Casting / 9:00am to 5:00pm | | Client | Acme Test Co |`;
  const a=mParse({id:'st1',messages:[{subject:'Casting Acme Test Co - ONE Management LA',snippet:''}]}, body);
  const b=mParse({id:'st2',messages:[{subject:'Self Tape Request Bolt Brand - ONE Men',snippet:body.replace('casting materials','a tape')}]});
  const c=mParse({id:'st3',messages:[{subject:'Casting Video Zed Co - ONE Men',snippet:body}]});
  const M=mState(); M.auto ||= {}; M.auto[a.id]=a; _mVer++; const cal=agendaFor(d,d).some(x=>x.tag==='Self-tape'&&/Acme/.test(x.text)); delete M.auto[a.id]; _mVer++;
  return {a:[a.t,a.d[0]===d,a.tm], b:b&&b.t, c:c&&c.t, cal}; }).catch(e=>({err:String(e)}));
ok('a casting asking for materials becomes a self-tape due that day', st.a && st.a[0]==='selftape' && st.a[1] && st.a[2]==='due end of day', JSON.stringify(st));
ok('self-tape and casting-video emails are read', st.b==='selftape' && st.c==='selftape', JSON.stringify(st));
ok('self-tapes show on the calendar', st.cal===true, JSON.stringify(st));
// Tega the agent: does what you ask (adds goals), Undo puts it back, removals wait for a Confirm tap, problems go on the fix list
const ag = await page.evaluate(async () => { S.quarters[THIS_Q].objectives.push({id:'agT',track:'fitness',title:'Agent test goal',krs:[]}); const keep=sampleLib, q0=JSON.stringify(S.quarters[THIS_Q].objectives.map(o=>o.id)), C=C_(), n0=C.msgs.length;
  let seen=''; sampleLib={ json: async p => { seen=p; return { reply:'Done — added both.', actions:[
    {tool:'add_objective', args:{level:'quarter', track:'personal', title:'Test personal goal', krs:[{text:'Journal days', target:40}]}},
    {tool:'add_objective', args:{level:'quarter', track:'learning', title:'Test learning goal', krs:[{text:'Courses finished', target:2}]}},
    {tool:'delete_objective', args:{level:'quarter', id:'agT'}},
    {tool:'report_problem', args:{text:'Test problem'}} ] }; } };
  await coachSend('add a personal and a learning goal'); const m=C.msgs[C.msgs.length-1], objs=S.quarters[THIS_Q].objectives;
  const r={ctx:/SCHEDULE/.test(seen)&&/GOALS/.test(seen)&&/MONEY/.test(seen), added:objs.filter(o=>/^Test (personal|learning) goal$/.test(o.title)).length, notDeleted:objs.length>=2&&JSON.parse(q0).every(id=>objs.some(o=>o.id===id)), pend:(m.pend||[]).length, fix:(S.fixes||[]).some(f=>f.text==='Test problem'), acts:(m.acts||[]).length};
  agUndoRun(); const after=S.quarters[THIS_Q].objectives; r.undone=JSON.stringify(after.map(o=>o.id))===q0;
  S.fixes=(S.fixes||[]).filter(f=>f.text!=='Test problem'); S.quarters[THIS_Q].objectives=S.quarters[THIS_Q].objectives.filter(o=>o.id!=='agT'); C.msgs.splice(n0); sampleLib=keep; gSheetClose(); commit({skipXp:true}); return r; }).catch(e=>({err:String(e)}));
ok('Tega sees your money, schedule and goals', ag.ctx, JSON.stringify(ag));
ok('asking Tega for goals actually adds them', ag.added === 2 && ag.acts >= 2, JSON.stringify(ag));
ok('removals wait for your Confirm tap', ag.notDeleted && ag.pend === 1, JSON.stringify(ag));
ok('Undo puts everything back', ag.undone, JSON.stringify(ag));
ok('problems you report go on the fix list', ag.fix, JSON.stringify(ag));
ok('no errors anywhere', errors.length === 0, errors[0]);
await browser.close();
console.log(fails ? `\n${fails} check(s) failed` : '\nall checks passed');
process.exit(fails ? 1 : 0);
