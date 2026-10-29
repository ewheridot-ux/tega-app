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
    {tool:'report_problem', args:{text:'Test problem'}}, {tool:'add_quest', args:{text:'Agent test quest', size:'S'}} ] }; } };
  await coachSend('add a personal and a learning goal'); const m=C.msgs[C.msgs.length-1], objs=S.quarters[THIS_Q].objectives;
  const r={ctx:/SCHEDULE/.test(seen)&&/GOALS/.test(seen)&&/MONEY/.test(seen), added:objs.filter(o=>/^Test (personal|learning) goal$/.test(o.title)).length, notDeleted:objs.length>=2&&JSON.parse(q0).every(id=>objs.some(o=>o.id===id)), pend:(m.pend||[]).length, fix:(S.fixes||[]).some(f=>f.text==='Test problem'), quest:S.quests.some(q=>q.text==='Agent test quest'), acts:(m.acts||[]).length};
  agUndoRun(); const after=S.quarters[THIS_Q].objectives; r.undone=JSON.stringify(after.map(o=>o.id))===q0;
  S.fixes=(S.fixes||[]).filter(f=>f.text!=='Test problem'); S.quarters[THIS_Q].objectives=S.quarters[THIS_Q].objectives.filter(o=>o.id!=='agT'); C.msgs.splice(n0); sampleLib=keep; gSheetClose(); commit({skipXp:true}); return r; }).catch(e=>({err:String(e)}));
ok('Tega sees your money, schedule and goals', ag.ctx, JSON.stringify(ag));
ok('asking Tega for goals actually adds them', ag.added === 2 && ag.acts >= 2, JSON.stringify(ag));
ok('removals wait for your Confirm tap', ag.notDeleted && ag.pend === 1, JSON.stringify(ag));
ok('Undo puts everything back', ag.undone, JSON.stringify(ag));
ok('problems you report go on the fix list', ag.fix, JSON.stringify(ag));
ok('Tega can add quests', ag.quest, JSON.stringify(ag));
ok('Ask Tega button sits next to your picture', await page.evaluate(() => !!document.querySelector('.brand .tg-ask')));
// the side hustle area: starter goal, logging counts everywhere, XP only goes up, it's on the city, stats, skill trees and bosses
const hz = await page.evaluate(() => { delete S.hustle; S.quarters[THIS_Q].objectives=S.quarters[THIS_Q].objectives.filter(o=>o.track!=='hustle'); hustleSeed(); _mVer++; commit({skipXp:true}); const x0=computeXP(); go('hustle'); const H=ensureHustle(), seeded=(S.quarters[THIS_Q].objectives||[]).some(o=>o.track==='hustle');
  H.log.push({id:'hzT', d:TODAY, mins:120, note:'test'}); H.ships.push({id:'hzS', d:TODAY, text:'test'}); _mVer++; commit({skipXp:true});
  const kr=(S.quarters[THIS_Q].objectives.find(o=>o.track==='hustle')?.krs||[]).find(k=>k.src==='hustlehrs');
  const r={seeded, hrs:fact('hustlehrs',TODAY), kr:kr&&kr.current, xpUp:computeXP()>x0, stat:statAttrs().some(a=>a.n==='HUSTLE'), tree:!!areaInfo('HUSTLE'), boss:bossList().some(b=>b.id==='hustle'), track:T.hustle.name, renamed:''};
  ensureHustle().name='CAD'; ensureHustle().icon='⚙️'; r.renamed=T.hustle.name+T.hustle.icon; ensureHustle().name='Side Hustle'; ensureHustle().icon='🚀';
  H.log=H.log.filter(l=>l.id!=='hzT'); H.ships=H.ships.filter(l=>l.id!=='hzS'); _mVer++; commit({skipXp:true}); r.xpKept=computeXP()>=x0; go('city'); return r; }).catch(e=>({err:String(e)}));
await page.waitForTimeout(400);
const hzCity = await page.evaluate(() => [...document.querySelectorAll('.cy-m')].map(e=>e.getAttribute('aria-label')).join('|'));
ok('side hustle gets a starter goal', hz.seeded, JSON.stringify(hz));
ok('logging side hustle time counts toward its goal', hz.hrs === 2 && hz.kr >= 2, JSON.stringify(hz));
ok('side hustle work earns XP, and XP never drops when it is deleted', hz.xpUp && hz.xpKept, JSON.stringify(hz));
ok('side hustle has a stat, skill tree and boss', hz.stat && hz.tree && hz.boss, JSON.stringify(hz));
ok('you can rename it (e.g. to CAD)', hz.renamed === 'CAD⚙️', JSON.stringify(hz));
ok('the city shows the side hustle', /Workshop/.test(hzCity), hzCity);
// Top 3 stays empty until you write it; one way into Tega
const t3 = await page.evaluate(() => { const d=ensureDay(TODAY); const keep=JSON.stringify(d.top3); d.top3[0]={text:'auto thing',track:'',done:false,auto:1}; d.top3[1]={text:'mine',track:'',done:false}; d.top3[2]={text:'',track:'',done:false}; S.t3clear=''; d.t3auto=0; runAutos();
  const r={cleared:d.top3[0].text==='', kept:d.top3[1].text==='mine', notFilled:d.top3[2].text===''}; d.top3=JSON.parse(keep); go('today'); return r; });
await page.waitForTimeout(300);
const doors = await page.evaluate(() => ({ head:document.querySelectorAll('.tg-ask').length, quip:document.querySelectorAll('.co-open').length, sug:document.querySelectorAll('.t3sug').length }));
ok('Top 3 is never filled in for you', t3.cleared && t3.kept && t3.notFilled && doors.sug===0, JSON.stringify([t3,doors]));
ok('one Ask Tega button (next to your picture)', doors.head===1 && doors.quip===0, JSON.stringify(doors));
if (seed !== 1) ok('Lululemon self-tape is on the calendar', await page.evaluate(() => agendaFor('2026-10-28','2026-10-28').some(x=>x.tag==='Self-tape'&&/Lululemon/.test(x.text))));
// piece photos: move one to the right piece, delete one (two taps), Undo brings it back
const ph = await page.evaluate(() => { const D=ensureDatum(), A={id:'PXA',name:'Test A',status:'wax',log:[{kind:'photo',d:TODAY,t:'photo',photo:'phA1'},{kind:'session',d:TODAY,mins:30,photo:'phA2'}]}, B={id:'PXB',name:'Test B',status:'wax',log:[]}; D.prototypes.push(A,B);
  openPhotoP('PXA','phA1'); const ui=!!document.querySelector('#ph .ph-fix select') && !!document.getElementById('ph-del');
  phMove('phA1','PXB'); const moved=B.log.some(l=>l.photo==='phA1') && !A.log.some(l=>l.photo==='phA1');
  openPhotoP('PXA','phA2'); phDel('phA2'); const notYet=A.log.some(l=>l.photo==='phA2'); phDel('phA2'); const gone=!A.log.some(l=>l.photo==='phA2'), keptSession=A.log.some(l=>l.kind==='session'&&l.mins===30);
  phUndo('phA2'); const back=A.log.some(l=>l.photo==='phA2');
  D.prototypes=D.prototypes.filter(q=>!/^PX[AB]$/.test(q.id)); D.photoTrash=(D.photoTrash||[]).filter(x=>!/^ph[AB]/.test(x.e.photo)); document.getElementById('ph')?.remove(); commit({skipXp:true});
  return {ui, moved, notYet, gone, keptSession, back}; });
ok('a photo on the wrong piece can be moved', ph.ui && ph.moved, JSON.stringify(ph));
ok('photos delete on a second tap, keep the session, and Undo restores them', ph.notYet && ph.gone && ph.keptSession && ph.back, JSON.stringify(ph));
// Mom's financial-independence roadmap: same math as her PDF, milestones added once, investing counts toward goals
const fi = await page.evaluate(() => { const F=FI_(), keep=JSON.stringify(F); Object.assign(F,{start:60000, monthly:1000, from:'2026-11'}); const a30=Math.round(fiPlanAt('2030-10')), a55=Math.round(fiAt55().today);
  Object.assign(F, JSON.parse(keep)); const ms=S.vision.milestones.filter(m=>m.fi).length; fiMilestones(); const ms2=S.vision.milestones.filter(m=>m.fi).length;
  const n0=F.inv.length; F.inv.push({id:'fiT', d:'2026-11-15', amt:F.monthly}); const months=srcVal('fimonths','2026-11-01','2026-11-30'); F.inv=F.inv.filter(x=>x.id!=='fiT');
  return {a30, a55, ms, ms2, months}; });
ok('FI plan matches Mom’s PDF ($142,850 at 30, $1,529,615 at 55)', fi.a30===142850 && fi.a55===1529615, JSON.stringify(fi));
ok('FI milestones are in the 5-year plan once', fi.ms===5 && fi.ms2===5, JSON.stringify(fi));
ok('investing on plan counts as a month for goals', fi.months===1, JSON.stringify(fi));
ok('no errors anywhere', errors.length === 0, errors[0]);
await browser.close();
console.log(fails ? `\n${fails} check(s) failed` : '\nall checks passed');
process.exit(fails ? 1 : 0);
