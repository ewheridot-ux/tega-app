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
await page.evaluate(() => { const x0=computeXP(); for (let i=0;i<200 && computeXP()<=x0;i++) S.wins.push({id:'popT'+i, d:TODAY, text:'test win'}); saveLocal(); });   // something new (XP never drops, so re-ticking an old habit adds nothing)
await page.reload(); await page.waitForTimeout(2500);
for (let i = 0; i < 3; i++) { try { await page.getByText('CONTINUE').first().click({ timeout: 800 }); await page.waitForTimeout(300); } catch { break; } }
const since = await page.evaluate(() => { document.querySelectorAll('#lvs, #chestm, .modal').forEach(e => e.remove()); commit({ skipXp: true }); const t=[...document.querySelectorAll('.hp-i')].map(e => e.textContent).join(' | '); return t || ((Date.now()-(R_().hitLast||0))<20000 ? 'XP (popped at open)' : ''); });
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
await page.waitForFunction(() => [...document.querySelectorAll('.cy-m')].some(e => /Workshop/.test(e.getAttribute('aria-label') || '')), null, { timeout: 4000 }).catch(() => {});   // the city can take a moment to draw
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
// Money: filter any category over any period; subscriptions found from the bank feed
const mf = await page.evaluate(() => { const T=S.money.budget.txns, add=[]; const ref=(bankThrough&&bankThrough())||TODAY;
  for (let i=0;i<4;i++) add.push({id:'tsN'+i, d:addDays(ref,-30*i-1), desc:'NETFLIX.COM 123'+i, amt:-15.49, acct:'BofA', cat:'flex'});
  add.push({id:'tsR', d:addDays(ref,-3), desc:'TEST RENT CO', amt:-1200, acct:'BofA', cat:'fixed'}, {id:'tsR2', d:addDays(ref,-33), desc:'TEST RENT CO', amt:-1200, acct:'BofA', cat:'fixed'});
  T.push(...add); _mVer++;
  const L=subsList(), nf=L.find(x=>x.k==='NETFLIX'), rent=L.find(x=>/Rent/.test(x.name));
  bCatF='s:subs'; bPer='all'; const subsRows=txRows(TODAY.slice(0,7)).filter(t=>/^tsN/.test(t.id)).length;
  bCatF='b:fixed'; const fixedRows=txRows(TODAY.slice(0,7)).filter(t=>/^tsR/.test(t.id)).length;
  bCatF='m:NETFLIX'; const merch=txRows(TODAY.slice(0,7)).filter(t=>/^tsN/.test(t.id)).length;
  bCatF=''; bPer='month'; S.money.budget.txns=T.filter(t=>!/^ts[NR]/.test(t.id)); _mVer++;
  return {nf:nf&&nf.cad, nfBill:nf&&nf.bill, rentBill:rent&&rent.bill, subsRows, fixedRows, merch}; });
ok('subscriptions are found from the bank (monthly, not bills)', mf.nf==='monthly' && mf.nfBill===false && mf.rentBill===true, JSON.stringify(mf));
ok('transactions filter by any category, bucket or merchant across all months', mf.subsRows===4 && mf.fixedRows===2 && mf.merch===4, JSON.stringify(mf));
// On schedule: real balances vs where the checks that landed say each bucket should be
const sb = await page.evaluate(() => { const keepS=S.money.sched, keepL=S.money.links, A=S.money.budget.accounts; A.push({name:'Test 360 Performance Savings', type:'savings', bal:500});
  delete S.money.links; S.money.sched={v:2, at:addDays(TODAY,-3), start:{tax:900,ef:0,cards:cardDebt(),house:0,ret:0}, rows:[]}; const tc={id:'tchk', d:addDays(TODAY,-1), gotOn:addDays(TODAY,-1), amt:400, got:true, split:{tax:100}}; S.money.checks.push(tc);
  const R=sbRows(), t=R.find(r=>r.k==='tax'); const r={linked:t.src.includes('360'), v:t.v, plan:t.plan, st:t.st, diff:Math.round(t.diff)};
  S.money.budget.accounts=A.filter(a=>a.name!=='Test 360 Performance Savings'); S.money.checks=S.money.checks.filter(c=>c.id!=='tchk'); S.money.sched=keepS; S.money.links=keepL; return r; });
ok('each bucket shows its real account vs the plan (ahead / behind)', sb.linked && sb.v===500 && sb.plan===1000 && sb.st==='behind' && sb.diff===-500, JSON.stringify(sb));
// Datum write-offs: log a purchase or confirm a bank charge → one Datum deductible each, never twice; money plan invests Mom's FI amount
const dw = await page.evaluate(() => { const D=ensureDatum(), B=S.money.budget, n0=D.expenses.length;
  B.txns.push({id:'tdOF', d:addDays(TODAY,-3), desc:'SP OTTO FREI OAKLAND CA', amt:-42.5, acct:'BofA', cat:'flex'}); _mVer++;
  const sug=dDedSugg().some(x=>x.t.id==='tdOF'&&x.sure); dDedYes('tdOF'); syncDatumDeductibles(S);
  const rows=B.deductibles.filter(x=>x.cat==='datum' && Math.abs(x.amt-42.5)<.01).length;
  const f=document.createElement('form'); f.innerHTML='<input name="n" value="Test wax"><input name="amt" value="12"><input name="v" value="Ferris"><input name="d" value="'+TODAY+'"><select name="b"><option>Wax Work</option></select>'; dLogBuy({preventDefault(){}, target:f}); syncDatumDeductibles(S);
  const logged=B.deductibles.some(x=>x.cat==='datum'&&x.desc==='Test wax'&&x.amt===12);
  const ret=fiRetMonthly(FI_().from+'-15')===FI_().monthly;
  D.expenses=D.expenses.filter(e=>e.txn!=='tdOF'&&e.name!=='Test wax'); B.txns=B.txns.filter(t=>t.id!=='tdOF'); syncDatumDeductibles(S); _mVer++; commit({skipXp:true});
  return {sug, rows, logged, ret}; });
ok('Datum: bank charges that look like supplies are suggested and count once', dw.sug && dw.rows===1, JSON.stringify(dw));
ok('Datum: logged purchases become write-offs', dw.logged, JSON.stringify(dw));
ok('money plan invests the FI plan amount once it starts', dw.ret, JSON.stringify(dw));
// Datum shopping list: suggestions skip what you have, ＋ adds to the list
const shp = await page.evaluate(() => { const D=ensureDatum(), n0=D.expenses.length, L=dShopSugg(); const first=L[0]&&L[0].n; dShopAdd(0); const added=D.expenses.some(e=>e.name===first&&e.status==='planned'); const gone=!dShopSugg().some(x=>x.n===first);
  D.expenses=D.expenses.filter(e=>!(e.name===first&&e.note==='suggested')); commit({skipXp:true}); return {n:L.length, added, gone}; });
ok('Datum shopping suggestions add to the list and disappear once added', shp.n>0 && shp.added && shp.gone, JSON.stringify(shp));
// Consistency: everything you do counts somewhere. Every KR source returns a number; learning, inspo and hangouts earn XP and feed KRs/areas; undoing returns it.
const cons = await page.evaluate(() => { const bad=ksrcAll().filter(k=>{ try { const v=fact(k[1]); return typeof v!=='number'||isNaN(v); } catch(e){ return true; } }).map(k=>k[1]);
  ensureDay(TODAY); const g=lrSub('guitar'), keepG=JSON.parse(JSON.stringify(g)), keepDL=JSON.parse(JSON.stringify(S.drawLearn||{})), x0=computeXP0(), m0=areaInfo('MIND').on, k0=fact('lessons');
  lrDone('guitar',g.lessons[0].id); const x1=computeXP0(); (g.inspo ||= []).push(inspoItem('https://example.com/x','')); const x2=computeXP0();
  const r={bad, lesson:x1>x0, inspo:x2>x1, kr:fact('lessons')===k0+1&&fact('learn:guitar')>=1, area:areaInfo('MIND').on>=m0};
  for (const k of Object.keys(g)) if (!(k in keepG)) delete g[k]; Object.assign(g, keepG); S.drawLearn=keepDL; autoHabits(); commit({skipXp:true}); r.back=computeXP0()===x0; return r; });
ok('every KR source returns a number', cons.bad.length===0, cons.bad.join(','));
ok('a lesson done earns XP and moves the Lessons KR', cons.lesson && cons.kr, JSON.stringify(cons));
ok('saving inspo earns XP', cons.inspo, JSON.stringify(cons));
ok('undoing a lesson takes today’s XP back', cons.back, JSON.stringify(cons));
// Old tax bills: they fold into the money plan — paid after cards, investing waits, plans are bills, deadlines show, paying earns XP and undoes
const td = await page.evaluate(() => { const keep = JSON.parse(JSON.stringify(S.money.taxDebts || [])), r = {};
  S.money.taxDebts = [{ id: 't1', yr: 2025, who: 'IRS', amt: 8000, pen: 2000, paid: [], plan: null, filed: '', fileBy: addDays(TODAY, 14) }, { id: 't2', yr: 2025, who: 'Illinois', amt: 1700, pen: 0, paid: [], plan: null, filed: '' }]; commit({ skipXp: true });
  r.total = tdTotal() === 11700;
  const P = projection(), hold = P.rows.filter(x => x.oldLeft > 0.5); r.rows = P.rows.length; r.paysOld = P.rows.some(x => x.old > 0) || !P.rows.length; r.investWaits = hold.every(x => x.ret === 0 && x.house === 0);
  const b0 = billsFor(TODAY, addDays(TODAY, 40)).amt; S.money.taxDebts[0].plan = { mo: 300, day: 28 }; _mVer++; r.planIsBill = billsFor(TODAY, addDays(TODAY, 40)).amt >= b0 + 300 - 0.01;
  r.calendar = dlAll().some(x => /File 2025 federal tax return/.test(x.text)) && dlAll().some(x => /IRS payment plan/.test(x.text));
  const x0 = computeXP(); tdPay(500, TODAY, 'test'); commit(); r.oldestFirst = tdPaid(S.money.taxDebts[0]) === 500 && tdPaid(S.money.taxDebts[1]) === 0;
  r.xp = computeXP() >= x0 + 50; r.kr = fact('taxdebt', TODAY, TODAY) === 500;
  tdUnpay('test'); commit({ skipXp: true }); r.undo = computeXP() === x0 && tdTotal() === 11700;
  location.hash = 'money'; view = 'money'; moneyTab = 'taxes'; render(); r.card = !!document.querySelector('.td-card .td-r');
  S.money.taxDebts = keep; commit({ skipXp: true }); moneyTab = 'now'; return r; });
ok('old tax bills: amounts add up', td.total);
ok('old tax bills: checks pay them after the cards, investing waits', td.paysOld && td.investWaits);
ok('old tax bills: a payment plan counts as a bill', td.planIsBill, JSON.stringify(td));
ok('old tax bills: filing + plan dates show on the calendar', td.calendar, JSON.stringify(td));
ok('old tax bills: paid oldest first, earn XP, count for KRs, undo cleanly', td.oldestFirst && td.xp && td.kr && td.undo, JSON.stringify(td));
ok('old tax bills: card shows on Money → Taxes', td.card, JSON.stringify(td));
// Piece board: references next to your own photos, side by side or sliding; removing keeps a copy; references count
const pb = await page.evaluate(() => { const D = ensureDatum(), keepP = JSON.parse(JSON.stringify(D.prototypes)), keepT = JSON.parse(JSON.stringify(D.refsTrash || [])), r = {};
  D.prototypes.push({ id: 'PT-TEST', name: 'Board test', status: 'carving', hours: 0, log: [{ d: TODAY, kind: 'photo', photo: 'w1' }], refs: [{ id: 'r1', img: 'a1', d: TODAY, from: 'upload' }, { id: 'r2', img: 'a2', d: TODAY, from: 'upload' }] });
  const k0 = fact('refs', TODAY, TODAY); r.kr = k0 >= 2;
  pbOpen('PT-TEST'); const m = document.getElementById('pb'); r.side = !!m && m.querySelectorAll('.pb-side .pb-pane img').length === 2;
  pbMode = 'slide'; pbRender(); r.slide = !!m.querySelector('.pb-slide .pb-top') && !!m.querySelector('.pb-range');
  pbSetCut(30); r.cut = m.querySelector('.pb-top').style.clipPath.includes('30%');
  pbSel('r', 1); pbRemove(); r.armed = D.prototypes.find(p => p.id === 'PT-TEST').refs.length === 2; pbRemove();
  r.removed = D.prototypes.find(p => p.id === 'PT-TEST').refs.length === 1 && (D.refsTrash || []).some(x => x.id === 'r2');
  pbClose(); pbMode = 'side'; D.prototypes = keepP; D.refsTrash = keepT; commit({ skipXp: true }); return r; });
ok('piece board: reference and your photo side by side', pb.side, JSON.stringify(pb));
ok('piece board: slide mode compares on one picture', pb.slide && pb.cut, JSON.stringify(pb));
ok('piece board: remove takes two taps and keeps a copy', pb.armed && pb.removed, JSON.stringify(pb));
ok('piece board: references count for the "References pinned" KR', pb.kr, JSON.stringify(pb));
// Piece design: change or clear the library design; attach / detach sketches; loose sketches don't repeat on every card
const ds = await page.evaluate(() => { const D = ensureDatum(), keepP = JSON.parse(JSON.stringify(D.prototypes)), keepA = JSON.parse(JSON.stringify(S.art || [])), r = {};
  D.prototypes.push({ id: 'PT-D1', name: 'One', status: 'carving', hours: 0, design: D.designs[0]?.id || '', log: [] }, { id: 'PT-D2', name: 'Two', status: 'carving', hours: 0, design: '', log: [] });
  (S.art ||= []).push({ id: 'ART-L', d: TODAY, kind: 'sketch', title: 'loose', imgs: ['x1'], proto: 'datum' });
  commit({ skipXp: true }); const two = D.prototypes.find(p => p.id === 'PT-D2');
  r.noRepeat = !pieceCard(D, two, 'bare').includes('x1');
  pSetDesign('PT-D2', D.designs[0]?.id || ''); r.design = two.design === (D.designs[0]?.id || '');
  pSetDesign('PT-D2', ''); r.clear = two.design === '';
  artAttach('ART-L', 'PT-D2'); r.attach = S.art.find(a => a.id === 'ART-L').proto === 'PT-D2' && pieceCard(D, two, 'bare').includes('x1');
  artDetach('ART-L'); r.detach = S.art.find(a => a.id === 'ART-L').proto === 'datum';
  artPickFor('PT-D1'); r.picker = !!document.querySelector('#g-sheet .ds-pick button'); gSheetClose();
  const ba = benchAssets; benchAssets = benchAssets || {}; artPickFor('PT-D1'); const nb = [...document.querySelectorAll('#g-sheet button')].find(b => /New sketch/.test(b.textContent)); nb && nb.click(); r.fromDatum = typeof artDraft === 'object' && artDraft && artDraft.proto === 'PT-D1'; document.querySelectorAll('.modal').forEach(m => m.remove()); benchAssets = ba;
  D.prototypes = keepP; S.art = keepA; commit({ skipXp: true }); return r; });
ok('piece design: unattached sketches no longer repeat on every piece', ds.noRepeat, JSON.stringify(ds));
ok('piece design: change or clear the design after creating a piece', ds.design && ds.clear, JSON.stringify(ds));
ok('piece design: attach and detach a sketch', ds.attach && ds.detach && ds.picker, JSON.stringify(ds));
ok('piece design: add a new sketch from Datum, already on the piece', ds.fromDatum, JSON.stringify(ds));
// Long-press menu on the Life icon wears the Life look, not Night CRT
const nq = await page.evaluate(() => { const b = document.querySelector('.nav button[data-tab="life"]'); if (!b) return { skip: true }; navMenu(b); const m = document.getElementById('navqa'), hl = m && m.dataset.hl; navMenuClose(); return { hl }; });
ok('Life long-press menu uses the Life look', nq.skip || nq.hl === 'street', JSON.stringify(nq));
// Press and hold a picture in Art / Datum → delete; it goes to Recently deleted and comes back with Restore
const pd = await page.evaluate(() => { const D = ensureDatum(), keep = JSON.stringify({ p: D.prototypes, a: S.art || [], m: D.mood || [], at: S.artTrash, pt: D.photoTrash, mt: D.moodTrash, rt: D.refsTrash }), r = {};
  D.prototypes.push({ id: 'PT-H', name: 'Hold', status: 'carving', hours: 0, design: '', log: [{ kind: 'photo', d: TODAY, t: 'photo', photo: 'php1' }], refs: [{ id: 'rf1', img: 'rimg', d: TODAY }] });
  (S.art ||= []).push({ id: 'ART-H', d: TODAY, kind: 'paper', title: 'hold me', imgs: ['aimg'] }); (D.mood ||= []).push({ id: 'MD-H', d: TODAY, img: 'mimg', cols: ['#000'] }); commit({ skipXp: true });
  const xp0 = computeXP();
  r.tagged = vArt().includes('data-hold="art:ART-H"') && galleryHtml().includes('data-hold="dph:php1"') && dMood().includes('data-hold="mood:MD-H"');
  r.sheet = !!holdInfo('art', 'ART-H')?.acts.some(a => /Delete/.test(a[0])) && !!holdInfo('dph', 'php1') && !!holdInfo('mood', 'MD-H') && !!holdInfo('pbref', 'PT-H|rf1');
  holdOpen('art:ART-H'); const btn = [...document.querySelectorAll('#hold-m button')].find(b => /Delete picture/.test(b.textContent)); btn && btn.click();
  picDel('dph', 'php1'); picDel('mood', 'MD-H'); picDel('pbref', 'PT-H|rf1');
  const p = D.prototypes.find(q => q.id === 'PT-H');
  r.gone = !S.art.some(a => a.id === 'ART-H') && !p.log.some(l => l.photo) && !D.mood.some(m => m.id === 'MD-H') && !p.refs.length;
  r.kept = S.artTrash.some(a => a.id === 'ART-H') && D.photoTrash.some(x => x.e.photo === 'php1') && D.moodTrash.some(x => x.id === 'MD-H') && D.refsTrash.some(x => x.id === 'rf1');
  r.fold = picTrashFold('art').includes('Restore') && (picTrashFold('datum').match(/Restore/g) || []).length >= 3;
  picUndo('art', 'ART-H'); picUndo('dph', 'php1'); picUndo('mood', 'MD-H'); picUndo('pbref', 'PT-H|rf1');
  r.back = S.art.some(a => a.id === 'ART-H' && !a.deletedAt) && p.log.some(l => l.photo === 'php1') && D.mood.some(m => m.id === 'MD-H') && p.refs.some(x => x.id === 'rf1');
  r.xp = computeXP() >= xp0;
  document.querySelectorAll('.modal,#toast-act').forEach(m => m.remove());
  const k = JSON.parse(keep); D.prototypes = k.p; S.art = k.a; D.mood = k.m; S.artTrash = k.at; D.photoTrash = k.pt; D.moodTrash = k.mt; D.refsTrash = k.rt; commit({ skipXp: true }); return r; });
ok('pictures: Art and Datum pictures respond to press and hold', pd.tagged && pd.sheet, JSON.stringify(pd));
ok('pictures: delete moves to Recently deleted, nothing wiped', pd.gone && pd.kept && pd.fold, JSON.stringify(pd));
ok('pictures: Restore puts every kind back', pd.back && pd.xp, JSON.stringify(pd));
// No two functions share a name (b306 had two artPick → picking photos in Add art silently broke)
{ const src = fs.readFileSync(APP, 'utf8'), seen = {}, dup = [];
  for (const m of src.matchAll(/^\s*(?:async\s+)?function\s+([A-Za-z0-9_$]+)\s*\(/gm)) { if (seen[m[1]]) dup.push(m[1]); seen[m[1]] = 1; }
  ok('no function is defined twice', dup.length === 0, dup.join(', ')); }
// Add art: picking photos fills the draft, Post saves one Art piece (no Procreate / Paper split)
const aa = await page.evaluate(async () => { const keep = JSON.stringify(S.art || []), ba = benchAssets, r = {};
  benchAssets = { upload: async () => ({ id: 'up' + Math.random().toString(36).slice(2, 7) }), delete: async () => {} };
  openArtAdd(); r.noKinds = ![...document.querySelectorAll('#ar .seg button')].some(b => /Procreate|Paper/.test(b.textContent));
  const f = new File([new Uint8Array([137, 80, 78, 71])], 'a.png', { type: 'image/png' });
  artPick({ files: [f] }); r.picked = artDraft && artDraft.files.length === 1 && !document.querySelector('#ar .btn.good')?.disabled;
  const n0 = (S.art || []).length; await artSave(); r.saved = (S.art || []).length === n0 + 1 && S.art[S.art.length - 1].kind === 'art';
  r.wall = !/Procreate|Paper/.test(vArt());
  benchAssets = ba; S.art = JSON.parse(keep); commit({ skipXp: true }); document.querySelectorAll('.modal').forEach(m => m.remove()); return r; });
ok('add art: picking photos works and Post saves it', aa.picked && aa.saved, JSON.stringify(aa));
ok('add art: one wall, no Procreate / Paper split', aa.noKinds && aa.wall, JSON.stringify(aa));
// Press and hold rows everywhere: every kind opens a menu; Delete is soft and Undo / Restore puts it back in place
const hk = await page.evaluate(() => { const r = {}, keep = JSON.stringify({ w: S.wins, i: S.ideas, q: S.quests, t: S.holdTrash, tx: S.money.budget.txns.length });
  (S.wins ||= []).push({ id: 'WH', d: TODAY, text: 'held win' }); (S.ideas ||= []).push({ id: 'IH', text: 'held idea', st: 'idea' }); (S.quests ||= []).push({ id: 'QH', text: 'held quest', size: 'S' });
  S.money.budget.txns.push({ id: 'TH', d: TODAY, desc: 'HELD TXN', amt: -5, acct: 'X', cat: 'other' }); commit({ skipXp: true });
  r.menus = ['win:WH', 'idea:IH', 'quest:QH', 'txn:TH'].every(sp => { const [k, id] = sp.split(':'); return !!holdInfo(k, id)?.acts.length; });
  const ii = S.ideas.findIndex(x => x.id === 'IH'); holdGo('idea', 'IH'); r.gone = !S.ideas.some(x => x.id === 'IH') && S.holdTrash.some(e => e.id === 'IH');
  r.card = holdTrashCard().includes('held idea'); holdBack('idea', 'IH'); r.back = S.ideas.findIndex(x => x.id === 'IH') === ii;
  holdGo('txn', 'TH'); holdBack('txn', 'TH'); r.txn = S.money.budget.txns.some(t => t.id === 'TH');
  const d = ensureDay(curDay), k3 = JSON.stringify(d.top3); d.top3[0] = { ...d.top3[0], text: 'move me', done: false }; r.t3 = !!holdInfo('t3', '0');
  const nx = ensureDay(addDays(curDay, 1)), kn = JSON.stringify(nx.top3); t3Tomorrow(0); r.moved = nx.top3.some(t => t.text === 'move me') && !d.top3[0].text;
  d.top3 = JSON.parse(k3); nx.top3 = JSON.parse(kn);
  const k = JSON.parse(keep); S.wins = k.w; S.ideas = k.i; S.quests = k.q; S.holdTrash = k.t; S.money.budget.txns = S.money.budget.txns.filter(t => t.id !== 'TH'); commit({ skipXp: true });
  document.querySelectorAll('#toast-act').forEach(m => m.remove()); return r; });
ok('hold menus: wins, ideas, quests, transactions, Top 3', hk.menus && hk.t3, JSON.stringify(hk));
ok('hold delete is soft: Recently deleted + restore in the same spot', hk.gone && hk.card && hk.back && hk.txn, JSON.stringify(hk));
ok('hold: move a Top 3 to tomorrow', hk.moved, JSON.stringify(hk));
// Deleted transactions stay deleted: the bank sync (Era feed) and imports never bring them back; Undo lets it back in
const tg = await page.evaluate(async () => { const B = S.money.budget, keep = JSON.stringify({ t: B.txns, g: B.gone, h: S.holdTrash, s: B.syncedAt }), lib = mcpLib, r = {};
  const acc = { accounts: [{ account_group_key: 'AK', institution: 'Bank of America', name: 'Checking', type: 'checking', balance: { current: 100 } }] };
  const era = [{ transaction_id: 'ZT1', date: TODAY, description: 'ZOMBIE COFFEE', amount: -4.5, account_group_key: 'AK' }, { transaction_id: 'ZT2', date: TODAY, description: 'ZOMBIE TACO', amount: -9, account_group_key: 'AK' }];
  mcpLib = { callTool: async (sv, tool) => ({ payload: tool === 'accounts__list_financial_accounts' ? acc : { transactions: era, total_results: era.length } }) };
  const sync = async () => { bankBusy = false; await bankRefresh(false); };
  await sync(); const z = () => B.txns.filter(t => /ZOMBIE/.test(t.desc)); r.in = z().length === 2;
  delTxn(z().find(t => t.tid === 'ZT1').id); holdGo('txn', z().find(t => t.tid === 'ZT2').id);
  await sync(); await sync(); r.stayGone = z().length === 0;
  importTxns([{ d: TODAY, desc: 'ZOMBIE COFFEE', amt: -4.5, acct: 'BofA' }], S, true); r.importGone = z().length === 0;
  holdBack('txn', 'x'); const e = S.holdTrash.filter(e => e.k === 'txn' && /ZOMBIE TACO/.test(e.x.desc)).pop(); holdBack('txn', e.id); await sync(); r.undo = z().length === 1 && z()[0].tid === 'ZT2';
  // rows that came back before this fix are taken out again on start
  const back = { ...era[0] }; const k = JSON.parse(keep); B.gone = {}; delete B.goneFix; const ex = S.holdTrash.find(e => e.k === 'txn' && /ZOMBIE COFFEE/.test(e.x.desc));
  B.txns.push({ id: 'again', d: TODAY, desc: 'ZOMBIE COFFEE', amt: -4.5, acct: 'BofA', tid: 'ZT1', cat: 'other' }); migrate(S); r.migrated = !B.txns.some(t => t.id === 'again') && !!B.gone['tid:ZT1'] && !!ex;
  mcpLib = lib; B.txns = k.t; B.gone = k.g; S.holdTrash = k.h; B.syncedAt = k.s; commit({ skipXp: true }); document.querySelectorAll('#toast-act').forEach(m => m.remove()); return r; });
ok('deleted transactions stay deleted after bank syncs and imports', tg.in && tg.stayGone && tg.importGone, JSON.stringify(tg));
ok('undo a deleted transaction lets it back in; ones that came back before the fix are removed', tg.undo && tg.migrated, JSON.stringify(tg));
// The line under the character is a quote with who said it; tap → next; hold → save / never again
const sg = await page.evaluate(() => { const r = {}, keep = JSON.stringify({ a: S.sageSaved, n: S.sageNo }); curDay = TODAY; view = 'today'; render();
  const el = document.getElementById('quip'); r.quote = !!el && /—/.test(el.textContent) && SAGE.some(q => el.textContent.includes(q[1]));
  const t0 = el.textContent; sageNext(); r.next = sageHtml() !== '' && sageNow() !== SAGE[-1] && t0 !== `“${sageNow()[0]}” — ${sageNow()[1]}`;
  const q = sageNow(), k = sageKey(q), h = holdInfo('sage', '0'); r.menu = !!h && h.acts.length === 2;
  sageSave(k); r.saved = sageCard().includes(q[1]); sageHide(k); r.hidden = !sageList().includes(q);
  const k2 = JSON.parse(keep); S.sageSaved = k2.a; S.sageNo = k2.n; commit({ skipXp: true }); document.querySelectorAll('#toast-act').forEach(m => m.remove()); return r; });
ok('character line is a quote with its author; tap for the next one', sg.quote && sg.next, JSON.stringify(sg));
ok('hold a quote: save it (Settings) or never see it again', sg.menu && sg.saved && sg.hidden, JSON.stringify(sg));
// iPhone app: YouTube refuses embeds from capacitor:// (error 153) → the phone plays through our https page (docs/yt.html); web embeds directly
const yt = await page.evaluate(() => { const keepV = YVID, id = Object.keys(YP)[0]; YVID = { [id]: { v: 'dQw4w9WgXcQ', start: 12 } }; const r = {};
  r.web = /youtube-nocookie\.com\/embed\/dQw4w9WgXcQ/.test(yLoop(id)); const was = window.claude; window.claude = Object.assign({}, was || {}, { native: true });
  const L = yLoop(id); r.phone = L.includes(YT_HOST + '?v=dQw4w9WgXcQ') && /loop=1/.test(L) && /mute=1/.test(L);
  yVidPlay(id); const f = [...document.querySelectorAll('iframe')].map(x => x.src).find(u => u.startsWith(YT_HOST)); r.sheet = !!f && /start=12/.test(f);
  document.querySelectorAll('.modal,.g-sh,#gsh').forEach(m => m.remove()); window.claude = was; YVID = keepV; return r; });
ok('YouTube on the phone plays through the https video page; web keeps the direct player', yt.web && yt.phone && yt.sheet, JSON.stringify(yt));
// Home: quests are back on the page (side quests + this week + season), the old “More” fold is gone, log lives in Content
const hq = await page.evaluate(() => { const r = {}, keep = JSON.stringify({ q: S.quests, w: S.wins }); curDay = TODAY; view = 'today';
  (S.quests ||= []).push({ id: 'HQ1', text: 'home quest', size: 'S' }); commit({ skipXp: true }); render(); const v = document.getElementById('view').innerHTML;
  r.quests = /⚔️ Quests/.test(v) && v.includes('home quest') && /Defeat|defeated/.test(v); r.noMore = !/more-fold/.test(v) && !/📝 Log/.test(v);
  r.oneQuests = (v.match(/⚔️ Quests/g) || []).length === 1; r.win = v.includes('homeOpen.win') || /winInput/.test(v);
  ctTab = 'plan'; view = 'content'; render(); r.log = /📝 Log/.test(document.getElementById('view').innerHTML);
  const k = JSON.parse(keep); S.quests = k.q; S.wins = k.w; view = 'today'; commit({ skipXp: true }); return r; });
ok('home shows Quests again (side quests, this week, season), once', hq.quests && hq.oneQuests, JSON.stringify(hq));
ok('the More fold is gone; wins stay on Today; the log moved to Content', hq.noMore && hq.win && hq.log, JSON.stringify(hq));
// Hold anything deletable → red ✕ in its corner deletes it (Undo/restore as always); ⋯ opens the full menu; tap elsewhere cancels
const hx = await page.evaluate(() => { const r = {}, keep = JSON.stringify({ w: S.wins, h: S.holdTrash, l: S.learn }); curDay = TODAY; view = 'today';
  S.wins.push({ id: 'HX1', d: TODAY, text: 'corner x win' }); commit({ skipXp: true }); render();
  const el = document.querySelector('[data-hold="win:HX1"]'); holdOpen('win:HX1', el);
  r.badge = !!document.querySelector('.hold-x.hx-del') && el.classList.contains('hold-on') && !document.getElementById('hold-m');
  document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); r.cancel = !document.querySelector('.hold-x');
  holdOpen('win:HX1', document.querySelector('[data-hold="win:HX1"]')); document.querySelector('.hold-x.hx-del').click(); r.deleted = !S.wins.some(w => w.id === 'HX1') && S.holdTrash.some(e => e.id === 'HX1');
  holdBack('win', 'HX1'); r.undo = S.wins.some(w => w.id === 'HX1');
  // Learning subjects: hold → ✕ deletes the subject (restorable), ⋯ offers Archive
  const subs = lrSubs(); subs.push({ id: 'SUBX', name: 'Spanish', icon: '🇪🇸', kind: 'custom', lessons: [], log: [] }); commit({ skipXp: true }); view = 'learn'; lrTab = 'SUBX'; render();
  const t = document.querySelector('[data-hold="lrsub:SUBX"]'); r.subTile = !!t; holdOpen('lrsub:SUBX', t); r.subMore = !!document.querySelector('.hold-x.hx-more');
  document.querySelector('.hold-x.hx-del').click(); r.subGone = !lrSubs().some(x => x.id === 'SUBX') && lrTab !== 'SUBX'; holdBack('lrsub', 'SUBX'); r.subBack = lrSubs().some(x => x.id === 'SUBX');
  const k = JSON.parse(keep); S.wins = k.w; S.holdTrash = k.h; S.learn = k.l; view = 'today'; commit({ skipXp: true }); holdBadgeOff(); document.querySelectorAll('#toast-act').forEach(m => m.remove()); return r; });
ok('hold: a red ✕ appears in the corner, tap elsewhere cancels, ✕ deletes with Undo', hx.badge && hx.cancel && hx.deleted && hx.undo, JSON.stringify(hx));
ok('hold a Learning subject: ✕ deletes it (restorable), ⋯ has Archive', hx.subTile && hx.subMore && hx.subGone && hx.subBack, JSON.stringify(hx));
// ⋯ on a held item opens the full menu with no error (b315 broke it: its tap code carried &quot;)
const hm = await page.evaluate(async () => { const keep = JSON.stringify(S.ideas || []); (S.ideas ||= []).push({ id: 'HM1', text: 'idea', st: 'idea' });
  const el = document.createElement('div'); el.setAttribute('data-hold', 'idea:HM1'); document.body.appendChild(el); holdOpen('idea:HM1', el);
  let err = null; try { document.querySelector('.hx-more').click(); } catch (e) { err = e.message; } await new Promise(r => setTimeout(r, 60));
  const r = { err, sheet: !!document.getElementById('hold-m'), errbar: !!document.getElementById('errbar') }; document.getElementById('hold-m')?.remove(); el.remove(); holdBadgeOff(); S.ideas = JSON.parse(keep); return r; });
ok('hold → ⋯ opens the full menu, no error', !hm.err && hm.sheet && !hm.errbar, JSON.stringify(hm));
// Mass delete: hold one → bar; tap others to add; Delete N removes all; one Undo brings all back
const md = await page.evaluate(async () => { const keep = JSON.stringify({ w: S.wins, h: S.holdTrash }); curDay = TODAY; view = 'today';
  for (const n of [1, 2, 3]) S.wins.push({ id: 'MD' + n, d: TODAY, text: 'bulk ' + n }); commit({ skipXp: true }); render();
  const q = n => document.querySelector(`[data-hold="win:MD${n}"]`), r = {};
  holdOpen('win:MD1', q(1)); r.bar = !!document.getElementById('selbar'); q(2).click(); q(3).click(); r.count = /Delete 3/.test(document.getElementById('selbar')?.textContent || '');
  q(3).click(); r.untoggle = /Delete 2/.test(document.getElementById('selbar')?.textContent || ''); q(3).click();
  document.querySelector('#selbar .sel-del').click(); r.gone = !S.wins.some(w => /^MD/.test(w.id)); r.noBar = !document.getElementById('selbar');
  const u = document.querySelector('#toast-act button'); u && u.click(); r.back = S.wins.filter(w => /^MD/.test(w.id)).length === 3;
  const k = JSON.parse(keep); S.wins = k.w; S.holdTrash = k.h; commit({ skipXp: true }); document.querySelectorAll('#toast-act').forEach(m => m.remove()); return r; });
ok('mass delete: hold one, tap others, delete them all, one Undo brings all back', md.bar && md.count && md.untoggle && md.gone && md.noBar && md.back, JSON.stringify(md));
// Wishlist loot: add (rarity by price), wants cool off, ★ target, stash, claim → XP + win; hold to delete
const wl = await page.evaluate(async () => { const keep = JSON.stringify({ w: S.money.wish, wins: S.wins, h: S.holdTrash }), r = {}; S.money.wish = [];
  wishSheet(); document.getElementById('wishN').value = 'Steamer'; document.getElementById('wishP').value = '120'; wishKind(true); wishSave();
  wishSheet(); document.getElementById('wishN').value = 'Jordan 4s'; document.getElementById('wishP').value = '230'; wishSave();
  const L = wishL(), st = L.find(w => w.name === 'Steamer'), jd = L.find(w => w.name === 'Jordan 4s');
  r.rar = wishRar(120)[0] === 'Rare' && wishRar(230)[0] === 'Epic' && wishRar(800)[0] === 'Legendary'; r.target = st.target && !jd.target; r.cool = /cooling/.test(wishLock(jd) || '') && !wishLock(st);
  moneyTab = 'now'; view = 'money'; render(); r.card = /🎁 Wishlist/.test(document.getElementById('view').innerHTML) && !!document.querySelector('[data-hold="wish:' + st.id + '"]');
  const x0 = computeXP(), w0 = S.wins.length; wishStashGo(st.id, 100); r.notYet = !st.claimed; wishClaim(st.id); r.blocked = !st.claimed; wishStashGo(st.id, 20); wishClaim(st.id);
  r.claimed = !!st.claimed && S.wins.length === w0 + 1 && computeXP() >= x0 + 10; r.nextTarget = jd.target === false || jd.target === true;
  holdGo('wish', jd.id); r.del = !wishL().some(w => w.id === jd.id); holdBack('wish', jd.id); r.back = wishL().some(w => w.id === jd.id);
  const k = JSON.parse(keep); S.money.wish = k.w || []; S.wins = k.wins; S.holdTrash = k.h; view = 'today'; commit({ skipXp: true }); document.querySelectorAll('.modal,#toast-act').forEach(m => m.remove()); return r; });
ok('wishlist: rarity by price, wants cool off, one ★ target, shows in Money', wl.rar && wl.target && wl.cool && wl.card, JSON.stringify(wl));
ok('wishlist: stash, claim only when fully saved → XP + a win; hold to delete, restorable', wl.notYet && wl.blocked && wl.claimed && wl.del && wl.back, JSON.stringify(wl));
// Life → “Next up” opens that subject's lessons even when you're already on the Learning page
const nxu = await page.evaluate(async () => { const keep = JSON.stringify(S.learn), r = {}; const subs = lrSubs(); subs.unshift({ id: 'NXS', name: 'Piano', icon: '🎹', kind: 'custom', lessons: [{ id: 'L1', t: 'C major scale', url: 'https://example.com', mins: 10 }], log: [] });
  commit({ skipXp: true }); location.hash = 'learn'; await new Promise(r => setTimeout(r, 300)); lrTab = 'goals'; render(); const nx = lifeNext(); r.points = /lrGoNext\('NXS'\)/.test(nx.go);
  (0, eval)(nx.go); await new Promise(r => setTimeout(r, 300)); r.opened = lrTab === 'NXS' && !!document.getElementById('lr-upnext') && document.getElementById('view').innerHTML.includes('C major scale');
  S.learn = JSON.parse(keep); commit({ skipXp: true }); location.hash = 'today'; await new Promise(r => setTimeout(r, 200)); return r; });
ok('Life “Next up” opens the subject and its lesson, even from the Learning page', nxu.points && nxu.opened, JSON.stringify(nxu));
// Keyboard open (visible screen shrinks) → the New quest sheet and its text box stay above the keyboard
const kb = await page.evaluate(async () => { const R = document.documentElement;
  openQuick(); await new Promise(r => setTimeout(r, 450)); R.style.setProperty('--vvt', '0px'); R.style.setProperty('--vvh', '380px'); R.classList.add('kb-open'); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); const m = [...document.querySelectorAll('.modal')].pop(), c = m && m.querySelector('.card'), inp = m && m.querySelector('input,textarea');
  const cb = c ? c.getBoundingClientRect() : null, ib = inp ? inp.getBoundingClientRect() : null;
  const r = { sheet: !!cb && cb.bottom <= 381 && cb.top >= 0, input: !!ib && ib.bottom <= 381 && ib.top >= 0 };
  m && m.remove(); R.style.removeProperty('--vvt'); R.style.removeProperty('--vvh'); R.classList.remove('kb-open'); return r; });
ok('keyboard open: the New quest sheet and its text box stay above the keyboard', kb.sheet && kb.input, JSON.stringify(kb));
// Pose demo: the circle crops it → tap opens the whole pose (vertical shorts at 9:16, uncropped, looping); tap closes
const yx = await page.evaluate(() => { const keepV = YVID, id = Object.keys(YP)[0]; YVID = { [id]: { v: 'dQw4w9WgXcQ', short: 1 } }; const r = {};
  const h = document.createElement('div'); h.innerHTML = yLoop(id); document.body.appendChild(h); h.querySelector('.yg-vid').click();
  const m = document.getElementById('yx'), f = m && m.querySelector('.yx-f'); r.open = !!m && /loop=1|loop%3D1/.test(m.innerHTML); if (f) { const b = f.getBoundingClientRect(); r.whole = Math.abs(b.width / b.height - 9 / 16) < 0.02 && b.bottom <= innerHeight && b.top >= 0; }
  m && m.click(); r.closed = !document.getElementById('yx'); h.remove(); YVID = keepV; return r; });
ok('pose demo: tap the circle to see the whole pose (uncropped), tap to close', yx.open && yx.whole && yx.closed, JSON.stringify(yx));
{ const vp = await browser.newPage(); await vp.route('https://www.youtube-nocookie.com/**', r => r.fulfill({ body: '<p>yt</p>', contentType: 'text/html' }));
  await vp.route('https://ewheridot-ux.github.io/**', r => r.fulfill({ body: fs.readFileSync(new URL('../docs/yt.html', import.meta.url)), contentType: 'text/html' }));
  await vp.goto('https://ewheridot-ux.github.io/tega-app/yt.html?v=dQw4w9WgXcQ&loop=1&mute=1&start=9'); const src = await vp.evaluate(() => document.querySelector('iframe')?.src || '');
  await vp.goto('https://ewheridot-ux.github.io/tega-app/yt.html?v=bad"><script>'); const bad = await vp.evaluate(() => document.querySelectorAll('iframe').length); await vp.close();
  ok('video page builds the YouTube player and ignores bad links', /embed\/dQw4w9WgXcQ\?/.test(src) && /playlist=dQw4w9WgXcQ/.test(src) && /start=9/.test(src) && bad === 0, src + ' bad=' + bad); }
ok('no errors anywhere', errors.length === 0, errors[0]);
await browser.close();
console.log(fails ? `\n${fails} check(s) failed` : '\nall checks passed');
process.exit(fails ? 1 : 0);
