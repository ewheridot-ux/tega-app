/* ---- Tega.exe logo: chunky 3D pixel wordmark (b184) ---- */
const N_LOGO_G={
 T:['######','######','..##..','..##..','..##..','..##..','..##..','..##..'],
 E:['######','######','##....','#####.','#####.','##....','######','######'],
 G:['.#####','######','##....','##.###','##.###','##..##','######','.####.'],
 A:['.####.','######','##..##','##..##','######','######','##..##','##..##'],
 e:['.##.','#..#','####','#...','.###'],
 x:['#..#','#..#','.##.','#..#','#..#'],
 '.':['##','##'] };
function nLogo(h){ h=h||26; const F=[]; let cx=1;
  const put=(g,ox,oy,kind)=>g.forEach((row,y)=>[...row].forEach((ch,x)=>{ if(ch==='#') F.push({x:ox+x,y:oy+y,kind}); }));
  for (const L of 'TEGA'){ put(N_LOGO_G[L],cx,1,'big'); cx+=N_LOGO_G[L][0].length+1; }
  put(N_LOGO_G['.'],cx,7,'exe'); cx+=3; for (const L of 'exe'){ put(N_LOGO_G[L],cx,4,'exe'); cx+=N_LOGO_G[L][0].length+1; }
  const cur={x:cx,y:3}; const W=cx+6, H=12, bigW=4*7;
  const key=(x,y)=>x+','+y, face=new Map(F.map(p=>[key(p.x,p.y),p]));
  const ext=new Map(); for (const p of F){ const dmax=p.kind==='big'?2:1; for (let d=1; d<=dmax; d++){ const k=key(p.x+d,p.y+d); if(!face.has(k) && (!ext.has(k)||ext.get(k).d>d)) ext.set(k,{x:p.x+d,y:p.y+d,d,kind:p.kind}); } }
  for (let d=1; d<=2; d++){ for (let j=0;j<5;j++) for (let i=0;i<2;i++){ const k=key(cur.x+i+d,cur.y+j+d); if (d===1 && !ext.has(k)) ext.set(k,{x:cur.x+i+d,y:cur.y+j+d,d,kind:'cur'}); } }
  const all=new Set([...face.keys(), ...ext.keys()]); for (let j=0;j<5;j++) for (let i=0;i<2;i++) all.add(key(cur.x+i,cur.y+j));
  const lerp=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t)), stops=[[255,61,242],[180,107,255],[77,216,255]];
  const grad=x=>{ const t=Math.max(0,Math.min(1,(x-1)/(bigW-2))); return t<.5?lerp(stops[0],stops[1],t*2):lerp(stops[1],stops[2],(t-.5)*2); };
  const rgb=a=>`rgb(${a})`, light=a=>lerp(a,[255,255,255],.45), dark=(a,k)=>lerp(a,[10,4,24],k);
  let s='';
  // outline around the whole silhouette so it reads on any background
  const ol=new Set(); for (const k of all){ const [x,y]=k.split(',').map(Number); for (const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){ const kk=key(x+a,y+b); if(!all.has(kk)) ol.add(kk); } }
  for (const k of ol){ const [x,y]=k.split(','); s+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#0a0614"/>`; }
  for (const e of ext.values()){ const base=e.kind==='big'?grad(e.x-e.d):[77,216,255]; s+=`<rect x="${e.x}" y="${e.y}" width="1" height="1" fill="${rgb(dark(base, e.d===1?.55:.75))}"/>`; }
  for (const p of F){ const base=p.kind==='big'?grad(p.x):[77,216,255]; const top=!face.has(key(p.x,p.y-1)); s+=`<rect x="${p.x}" y="${p.y}" width="1" height="1" fill="${rgb(top?light(base):base)}"/>`; }
  s+=`<g class="logo-cur">${[0,1,2,3,4].map(j=>`<rect x="${cur.x}" y="${cur.y+j}" width="2" height="1" fill="${j===0?'#d9f7ff':'#4dd8ff'}"/>`).join('')}</g>`;
  return `<svg class="logo-svg" viewBox="0 0 ${W} ${H}" height="${h}" width="${Math.round(h*W/H)}" shape-rendering="crispEdges" role="img" aria-label="Tega.exe">${s}</svg>`; }

// Tega.exe native layer.
// The web app (web/app.html) was written against Claude's artifact runtime (window.claude.use('db' | 'assets' | 'sample' | 'downloads' | 'mcp')).
// This file provides the same interface on iPhone, backed by Supabase (data + files), a Supabase Edge Function (Claude API),
// and Capacitor plugins (notifications, haptics, share sheet). The app code itself stays identical to the web version.
import { LocalNotifications } from '@capacitor/local-notifications';
import { Health } from '@capgo/capacitor-health';
import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { registerPlugin } from '@capacitor/core';
// Tega's own Swift module (badge, Face ID, quick actions, Siri, Health, widgets, Live Activity). Missing on older builds: every call is guarded.
const TegaNative = registerPlugin('TegaNative');
const tn = async (m, o) => { try { return await TegaNative[m](o || {}); } catch (e) { return null; } };
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Geolocation } from '@capacitor/geolocation';

const CFG = window.TEGA_CONFIG || {};
const URL0 = (CFG.url || '').replace(/\/$/, '');
window.BLOBURL = URL0 + '/storage/v1/object/public/blobs/';

/* ---------------- auth (Supabase GoTrue REST) ---------------- */
const AUTH_KEY = 'tega-auth';
let auth = null;
try { auth = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch (e) { auth = null; }
const saveAuth = a => { auth = a; try { a ? localStorage.setItem(AUTH_KEY, JSON.stringify(a)) : localStorage.removeItem(AUTH_KEY); } catch (e) {} tn('setShared', { key: 'auth', value: a ? JSON.stringify({ ...a, url: (window.TEGA_CONFIG || {}).url, anon: (window.TEGA_CONFIG || {}).anon }) : '' }); };
async function authFromKeychain() { const r = await tn('getShared', { key: 'auth' }); try { const k = r && r.value ? JSON.parse(r.value) : null; if (k && k.refresh_token && (!auth || (k.exp || 0) > (auth.exp || 0))) { auth = { access_token: k.access_token, refresh_token: k.refresh_token, exp: k.exp, user: k.user || (auth && auth.user) }; try { localStorage.setItem(AUTH_KEY, JSON.stringify(auth)); } catch (e) {} } } catch (e) {} }
const withExp = j => ({ access_token: j.access_token, refresh_token: j.refresh_token, exp: Date.now() + (j.expires_in || 3600) * 1000, user: j.user });

async function authCall(path, body) {
  const r = await fetch(URL0 + '/auth/v1/' + path, { method: 'POST', headers: { apikey: CFG.anon, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.msg || j.error_description || j.message || ('Sign-in failed (' + r.status + ')'));
  return j;
}
let refreshing = null;
async function token() {
  if (!auth) return null;
  if (Date.now() > auth.exp - 60e3) {
    refreshing ||= authCall('token?grant_type=refresh_token', { refresh_token: auth.refresh_token })
      .then(j => saveAuth(withExp(j)))
      .catch(e => { if (!navigator.onLine) return; saveAuth(null); showLogin(); })
      .finally(() => { refreshing = null; });
    await refreshing;
  }
  return auth && auth.access_token;
}

async function api(method, path, body, headers = {}) {
  const t = await token();
  const isRaw = body instanceof Blob || typeof body === 'string';
  const r = await fetch(URL0 + path, { method, headers: { apikey: CFG.anon, Authorization: 'Bearer ' + (t || CFG.anon), ...(isRaw ? {} : { 'Content-Type': 'application/json' }), ...headers }, body: body == null ? undefined : isRaw ? body : JSON.stringify(body) });
  if (!r.ok) { const e = new Error(await r.text()); e.status = r.status; throw e; }
  const ct = r.headers.get('content-type') || '';
  return ct.includes('json') ? r.json() : r.text();
}

/* ---------------- login screen ---------------- */
let readyResolve; const ready = new Promise(r => (readyResolve = r));
function showLogin(msg) {
  let el = document.getElementById('tega-login');
  if (!el) { el = document.createElement('div'); el.id = 'tega-login'; document.body.appendChild(el); }
  el.innerHTML = `<div class="tl-card"><div class="tl-logo">${(typeof logoSVG==='function'?logoSVG:nLogo)(44)}</div><div class="tl-sub">${msg || 'Sign in to sync your app'}</div>
    <form id="tl-form"><input id="tl-email" type="email" autocomplete="email" placeholder="Email" required>
    <input id="tl-pass" type="password" autocomplete="current-password" placeholder="Password (6+ characters)" required minlength="6">
    <button type="submit" id="tl-in">Sign in</button><button type="button" id="tl-up" class="ghost">Create account</button>
    <div id="tl-err"></div></form></div>`;
  const go = async signup => {
    const email = document.getElementById('tl-email').value.trim(), password = document.getElementById('tl-pass').value;
    const err = document.getElementById('tl-err'); err.textContent = '';
    try {
      const j = signup ? await authCall('signup', { email, password }) : await authCall('token?grant_type=password', { email, password });
      if (!j.access_token) { err.textContent = 'Check your email to confirm, then sign in.'; return; }
      saveAuth(withExp(j)); el.remove(); await afterLogin();
    } catch (e) { let m = e.message; try { const j = JSON.parse(m); m = j.msg || j.error_description || j.message || m; } catch (_) {} err.textContent = /not confirmed/i.test(m) ? 'Your email isn’t confirmed yet. Tap the link in the confirmation email, then sign in.' : /invalid login/i.test(m) ? 'Wrong email or password. (New here? Tap Create account.)' : m; }
  };
  el.querySelector('#tl-form').onsubmit = e => { e.preventDefault(); go(false); };
  el.querySelector('#tl-up').onclick = () => go(true);
}
async function afterLogin() {
  try { await importIfFirstRun(); } catch (e) { console.warn('import failed', e); }
  readyResolve();
}

/* ---------------- one-time import of the Claude version's data ---------------- */
async function importIfFirstRun() {
  const rows = await api('GET', '/rest/v1/docs?select=path&limit=1');
  if (rows.length) return;                       // this account already has data
  const man = await fetch('migration/manifest.json').then(r => r.ok ? r.json() : null).catch(() => null);
  if (!man) return;
  const box = document.createElement('div'); box.id = 'tega-import'; document.body.appendChild(box);
  const say = t => { box.innerHTML = `<div class="tl-card"><div class="tl-logo">Moving your data</div><div class="tl-sub">${t}</div></div>`; };
  let n = 0;
  for (const [id, file] of Object.entries(man.assets || {})) {
    say(`Photos & clips ${++n} of ${Object.keys(man.assets).length}…`);
    const b = await fetch('migration/assets/' + file).then(r => r.blob());
    await fetch(`${URL0}/storage/v1/object/blobs/${id}`, { method: 'POST', headers: { apikey: CFG.anon, Authorization: 'Bearer ' + await token(), 'Content-Type': b.type || 'application/octet-stream', 'x-upsert': 'true' }, body: b });
  }
  say('Your history…');
  for (const path of man.docs || []) {
    const data = await fetch('migration/db/' + path + '.json').then(r => r.json());
    await putDoc(path, data);
  }
  box.remove();
}

/* ---------------- db (Firestore-like doc API over a Postgres table) ---------------- */
const enc = encodeURIComponent;
async function getDoc(path) { const rows = await api('GET', `/rest/v1/docs?path=eq.${enc(path)}&select=path,data,updated_at`); return rows[0] || null; }
async function putDoc(path, data) { await api('POST', '/rest/v1/docs?on_conflict=user_id,path', [{ path, data, user_id: auth.user.id }], { Prefer: 'resolution=merge-duplicates,return=minimal' }); }
const snapOf = row => ({ exists: !!row, id: row ? row.path.split('/').pop() : undefined, data: () => (row ? row.data : undefined), metadata: { hasPendingWrites: false } });
const pollers = new Set();
function poller(fn, ms) { let last = null, stop = false; const run = async () => { if (stop) return; try { await fn(v => { const k = JSON.stringify(v); if (k !== last) { last = k; return true; } return false; }); } catch (e) {} }; const p = { run }; pollers.add(p); run(); const t = setInterval(run, ms); return () => { stop = true; clearInterval(t); pollers.delete(p); }; }
function makeDb() {
  const doc = path => ({
    async get() { return snapOf(await getDoc(path)); },
    async set(data) { await putDoc(path, data); },
    async update(patch) { const cur = (await getDoc(path))?.data || {}; await putDoc(path, { ...cur, ...patch }); },
    async delete() { const cur = await getDoc(path); if (cur) await putDoc('trash/' + path.replace(/\//g, '_') + '_' + Date.now(), cur.data); await api('DELETE', `/rest/v1/docs?path=eq.${enc(path)}`, null, { Prefer: 'return=minimal' }); },
    onSnapshot(cb, onErr) { return poller(async changed => { const row = await getDoc(path); if (changed(row && row.updated_at)) cb(snapOf(row)); }, 20000); },
  });
  const collection = path => ({
    onSnapshot(cb, onErr) { return poller(async changed => { const rows = await api('GET', `/rest/v1/docs?path=like.${enc(path + '/*')}&select=path,data,updated_at`); if (changed(rows.map(r => r.path + r.updated_at))) cb({ docs: rows.map(snapOf) }); }, 30000); },
  });
  return { doc, collection };
}

/* ---------------- assets ---------------- */
const hex32 = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
const assets = {
  async upload(blob, opts) {
    const id = hex32(), type = (opts && opts.type) || blob.type || 'application/octet-stream';
    const r = await fetch(`${URL0}/storage/v1/object/blobs/${id}`, { method: 'POST', headers: { apikey: CFG.anon, Authorization: 'Bearer ' + await token(), 'Content-Type': type, 'x-upsert': 'true' }, body: blob });
    if (!r.ok) { const e = new Error('upload failed'); e.code = r.status === 413 ? 'quota_or_state' : 'upload_failed'; throw e; }
    return { id, url: window.BLOBURL + id };
  },
  async delete(id) { /* never lose data: files stay in storage */ },
};

/* ---------------- downloads → iOS share sheet (Save Image / Save to Files) ---------------- */
const b64 = blob => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(String(fr.result).split(',')[1]); fr.onerror = rej; fr.readAsDataURL(blob); });
const downloads = {
  async save({ filename, data }) {
    const blob = data instanceof Blob ? data : new Blob([typeof data === 'string' ? data : JSON.stringify(data)], { type: 'application/octet-stream' });
    const w = await Filesystem.writeFile({ path: filename, data: await b64(blob), directory: Directory.Cache });
    await Share.share({ title: filename, files: [w.uri] });
  },
};

/* ---------------- Claude (via Edge Function, key stays on the server) ---------------- */
const sample = {
  async json(prompt, opts) { const r = await api('POST', '/functions/v1/claude', { prompt, tier: (opts && opts.modelTier) || 'default', json: true }); return r && r.json !== undefined ? r.json : r; },
  async vision(prompt, image, opts) { const r = await api('POST', '/functions/v1/claude', { prompt, image, tier: (opts && opts.modelTier) || 'default', json: true }); return r && r.json !== undefined ? r.json : r; },
  async text(prompt, opts) { const r = await api('POST', '/functions/v1/claude', { prompt, tier: (opts && opts.modelTier) || 'default', json: false }); return r && r.text; },
};


/* ---------------- connectors on the phone: answered from the daily cloud sync (feed/latest) ---------------- */
// The Claude version calls Gmail / bank / Instagram directly. The phone app gets the same answers from a feed
// that a daily scheduled sync writes, so all the existing sync code just works.
let feedCache = null, feedAt = 0;
async function feedCalls() { if (!feedCache || Date.now() - feedAt > 60000) { const row = await getDoc('feed/latest'); feedCache = row && row.data && row.data.calls; feedAt = Date.now(); } return feedCache; }
const mcpFeed = {
  native: true,
  async callTool(server, tool, input = {}) {
    const C = await feedCalls(); if (!C) throw { code: 'no_feed' };
    let v;
    if (server === 'Gmail' && tool === 'search_threads') v = /posh|partiful/i.test(input.query || '') ? C.gmail_social : C.gmail_agency;
    else if (server === 'Era Context' && tool === 'accounts__list_financial_accounts') v = C.era_accounts;
    else if (server === 'Era Context' && tool === 'transactions__search_transactions') {
      let t = ((C.era_tx || {}).transactions || []).slice();
      if (input.period_start) t = t.filter(x => x.date >= input.period_start); if (input.period_end) t = t.filter(x => x.date <= input.period_end);
      if (input.direction === 'credit') t = t.filter(x => x.amount > 0); if (input.direction === 'debit') t = t.filter(x => x.amount < 0);
      if (input.min_amount != null) t = t.filter(x => x.amount >= input.min_amount); if (input.max_amount != null) t = t.filter(x => x.amount <= input.max_amount);
      t = t.slice(0, input.limit || 50); v = { transactions: t, total_results: t.length };
    }
    else if (tool === 'instagram_insights') v = (C.ig || {})[String(input.fields || '')];
    if (v === undefined || v === null) throw { code: 'no_feed' };
    return { payload: v };
  },
};

window.claude = {
  native: true,
  async use(cap) {
    await ready;
    if (cap === 'db') return makeDb();
    if (cap === 'assets') return assets;
    if (cap === 'downloads') return downloads;
    if (cap === 'sample') return sample;
    if (cap === 'mcp') return mcpFeed;
    return null;
  },
};

/* ---------------- native extras the app calls: rest alarm, reminders, haptics ---------------- */
let permAsked = false;
async function perm() { if (permAsked) return; permAsked = true; try { const p = await LocalNotifications.checkPermissions(); if (p.display !== 'granted') await LocalNotifications.requestPermissions(); } catch (e) {} }
const at = (dateKey, h, m = 0) => { const [y, mo, d] = dateKey.split('-').map(Number); return new Date(y, mo - 1, d, h, m, 0); };
const keyOf = dt => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
let remT = null, lastState = null;
window.native = {
  async restAlarm(ts) {
    try {
      await LocalNotifications.cancel({ notifications: [{ id: 1001 }] });
      if (ts && ts - Date.now() > 3000) { await perm(); await LocalNotifications.schedule({ notifications: [{ id: 1001, title: 'Rest done', body: 'Next set 💪', schedule: { at: new Date(ts), allowWhileIdle: true } }] }); }
      Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    } catch (e) {}
  },
  syncReminders(st) { if (st) lastState = st; clearTimeout(remT); remT = setTimeout(syncReminders, 2500); },
  async locate() { const p = await Geolocation.getCurrentPosition({ enableHighAccuracy: false, timeout: 10000 }); return `${p.coords.latitude.toFixed(4)},${p.coords.longitude.toFixed(4)}`; },
  haptic(kind) {
    if (kind === 'success') return Haptics.notification({ type: NotificationType.Success }).catch(() => {});
    if (kind === 'warning') return Haptics.notification({ type: NotificationType.Warning }).catch(() => {});
    Haptics.impact({ style: kind === 'light' ? ImpactStyle.Light : kind === 'heavy' ? ImpactStyle.Heavy : ImpactStyle.Medium }).catch(() => {});
  },
  badge(n) { clearTimeout(badgeT); badgeT = setTimeout(() => tn('badge', { count: Math.max(0, n | 0) }), 400); },
  async unlock() { const r = await tn('unlock', { reason: 'Unlock Tega.exe' }); return !!(r && r.ok); },
  widgetData(o) { clearTimeout(widT); widT = setTimeout(async () => { tn('setShared', { key: 'widget', value: JSON.stringify(o) }); try { await putDoc('widget/latest', o); } catch (e) {} }, 800); },
  pull() { feedCache = null; for (const p of pollers) p.run(); window.native.syncReminders(); },
  async calendarSync(items) { clearTimeout(calT); calT = setTimeout(() => calSync(items).catch(e => console.warn('cal', e)), 2500); },
  async saveWorkout(o) { return tn('healthSaveWorkout', o); },
  async live(kind, o) { return tn(kind === 'start' ? 'liveStart' : kind === 'end' ? 'liveEnd' : 'liveUpdate', o); },
  async share(o) { try { if (o.dataUrl) { const w = await Filesystem.writeFile({ path: o.file || 'tega.png', data: o.dataUrl.split(',')[1], directory: Directory.Cache }); await Share.share({ title: o.title, text: o.text, files: [w.uri] }); } else await Share.share({ title: o.title, text: o.text, url: o.url }); return true; } catch (e) { return false; } },
  // Apple Health: last N days of workouts, sleep, steps and weight
  async health(days = 14) {
    const own = await tn('healthRead', { days }); if (own && own.ok) return own;
    const av = await Health.isAvailable().catch(() => ({ available: false }));
    if (!av.available) return { ok: false, reason: av.reason || 'unavailable' };
    const types = ['steps', 'sleep', 'weight', 'workouts'];
    await Health.requestAuthorization({ read: types, write: [] }).catch(() => {});
    const end = new Date(), start = new Date(end.getTime() - days * 864e5), iso = d => d.toISOString();
    const out = { ok: true, workouts: [], sleep: [], steps: [], weight: [] };
    try { const r = await Health.queryWorkouts({ startDate: iso(start), endDate: iso(end), limit: 200 }); out.workouts = (r.workouts || []).map(w => ({ type: w.workoutType || w.type, start: w.startDate, end: w.endDate, cal: w.totalEnergyBurned || w.calories || 0, src: w.sourceName || '' })); } catch (e) {}
    try { const r = await Health.readSamples({ dataType: 'sleep', startDate: iso(start), endDate: iso(end), limit: 2000 }); out.sleep = (r.samples || []).map(s => ({ start: s.startDate, end: s.endDate, state: s.sleepState || '' })); } catch (e) {}
    try { const r = await Health.queryAggregated({ dataType: 'steps', startDate: iso(start), endDate: iso(end), bucket: 'day', aggregation: 'sum' }); out.steps = (r.samples || []).map(s => ({ start: s.startDate, value: s.value })); } catch (e) {}
    try { const r = await Health.readSamples({ dataType: 'weight', startDate: iso(new Date(end.getTime() - 90 * 864e5)), endDate: iso(end), limit: 30, ascending: false }); out.weight = (r.samples || []).map(s => ({ d: s.startDate, value: s.value, unit: s.unit })); } catch (e) {}
    return out;
  },
  // iPhone Calendar: events in a range (read only)
  async calendar(fromMs, toMs) {
    const p = await CapacitorCalendar.requestFullCalendarAccess().catch(() => ({ result: 'denied' }));
    if (p.result !== 'granted') return { ok: false };
    const r = await CapacitorCalendar.listEventsInRange({ from: fromMs, to: toMs }).catch(() => ({ result: [] }));
    const mine = localStorage.getItem('tega-calid') || '';
    return { ok: true, events: (r.result || []).filter(e => !mine || e.calendarId !== mine).map(e => ({ id: e.id, title: e.title || '', start: e.startDate, end: e.endDate, allDay: !!e.isAllDay, loc: e.location || '', cal: e.calendarId || '' })) };
  },
};
let badgeT = null, widT = null, calT = null;
// bookings + deadlines → a "Tega.exe" calendar on the phone; edits and removals follow
async function calSync(items) {
  let map = {}; try { map = JSON.parse(localStorage.getItem('tega-calmap') || '{}'); } catch (e) {}
  if (!items.length && !Object.keys(map).length) return;
  const p = await CapacitorCalendar.requestFullCalendarAccess().catch(() => ({ result: 'denied' })); if (p.result !== 'granted') return;
  let cid = localStorage.getItem('tega-calid');
  const cals = await CapacitorCalendar.listCalendars().catch(() => ({ result: [] }));
  if (!cid || !(cals.result || []).some(c => c.id === cid)) { const c = (cals.result || []).find(c => c.title === 'Tega.exe'); cid = c ? c.id : (await CapacitorCalendar.createCalendar({ title: 'Tega.exe', color: '#39ff9f' })).id; localStorage.setItem('tega-calid', cid); }
  const day = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).getTime(); };
  const want = new Map(items.map(i => [i.key, i]));
  for (const [key, ev] of Object.entries(map)) { const i = want.get(key), sig = i && JSON.stringify([i.title, i.start, i.end, i.loc]); if (!i || sig !== ev.sig) { await CapacitorCalendar.deleteEventsById({ ids: [ev.id] }).catch(() => {}); delete map[key]; } }
  for (const i of items) { if (map[i.key]) continue; const r = await CapacitorCalendar.createEvent({ title: i.title, calendarId: cid, startDate: day(i.start), endDate: day(i.end) + 864e5 - 60e3, isAllDay: true, location: i.loc || undefined, description: i.notes || undefined }).catch(() => null); if (r && r.id) map[i.key] = { id: r.id, sig: JSON.stringify([i.title, i.start, i.end, i.loc]) }; }
  localStorage.setItem('tega-calmap', JSON.stringify(map));
}
async function syncReminders() {
  try {
    const S = lastState; if (!S || !S.days) return; await perm();
    const now = new Date(), today = keyOf(now), tomorrow = keyOf(new Date(now.getTime() + 864e5)), list = [];
    const startKey = !(S.days[today] && S.days[today].checkin) && now.getHours() < 9 ? today : tomorrow;
    list.push({ id: 2001, title: 'Start the day', body: 'Check in and set your top 3 · Tega.exe', schedule: { at: at(startKey, 9, 0) } });
    const dow = now.getDay(), sun = keyOf(new Date(now.getTime() + ((7 - dow) % 7) * 864e5));
    if (at(sun, 18) > now) list.push({ id: 2002, title: 'Sunday Review', body: 'Recap, grade, plan next week · +50 XP', schedule: { at: at(sun, 18, 0) } });
    try {
      const dls = (typeof dlAll === 'function' ? dlAll() : []).filter(x => !x.done && x.src !== 'check');
      let i = 0;
      for (const x of dls) {
        const due = at(x.d, 10), before = new Date(due.getTime() - 864e5);
        const ex = { go: 'today', dl: x.src === 'own' ? x.id : '' };
        if (before > now && before - now < 30 * 864e5 && i < 20) list.push({ id: 3000 + i++, title: 'Due tomorrow', body: x.text, schedule: { at: before }, actionTypeId: ex.dl ? 'TEGA_DONE' : 'TEGA_GO', extra: ex });
        if (due > now && due - now < 30 * 864e5 && i < 20) list.push({ id: 3000 + i++, title: 'Due today', body: x.text, schedule: { at: due }, actionTypeId: ex.dl ? 'TEGA_DONE' : 'TEGA_GO', extra: ex });
      }
    } catch (e) {}
    try {
      let i = 0;
      for (const c of (S.money && S.money.checks) || []) {
        if (c.got) continue; const d = at(c.d, 12); if (d > now && i < 10) list.push({ id: 4000 + i++, title: 'Check expected today', body: `$${Math.round(c.amt).toLocaleString()} ${c.note || ''}`.trim(), schedule: { at: d } });
      }
    } catch (e) {}
    try { for (const r of (typeof window.tegaReminders === 'function' ? window.tegaReminders() : []).slice(0, 20)) list.push({ id: r.id, title: r.title, body: r.body, schedule: { at: r.at }, actionTypeId: r.act === 'post' ? 'TEGA_LOG' : 'TEGA_GO', extra: { go: r.go || '', act: r.act || '' } }); } catch (e) {}
    for (const n of list) { if (!n.actionTypeId) { n.actionTypeId = n.id >= 3000 && n.id < 4000 ? 'TEGA_DONE' : 'TEGA_GO'; n.extra = n.extra || { go: n.id >= 3000 && n.id < 4000 ? 'today' : n.id >= 4000 && n.id < 5000 ? 'money/waterfall' : 'today' }; } }
    const pend = await LocalNotifications.getPending();
    const old = (pend.notifications || []).filter(n => n.id >= 2000 && n.id < 6000).map(n => ({ id: n.id }));
    if (old.length) await LocalNotifications.cancel({ notifications: old });
    if (list.length) await LocalNotifications.schedule({ notifications: list });
  } catch (e) { console.warn('reminders', e); }
}

/* ---------------- deep links (tegaexe://win?text=…, Siri Shortcuts) + screen awake during a workout ---------------- */
App.addListener('appUrlOpen', ({ url }) => { const go = () => window.tegaDeepLink ? window.tegaDeepLink(url) : setTimeout(go, 400); go(); });
let awake = false, wl = null;
async function wakeLock(on) { try { if (on && 'wakeLock' in navigator) { wl = await navigator.wakeLock.request('screen'); } else if (wl) { await wl.release(); wl = null; } } catch (e) {} }
document.addEventListener('visibilitychange', () => { if (awake && document.visibilityState === 'visible') wakeLock(true); });
new MutationObserver(() => { const on = !!document.getElementById('g-live'); if (on !== awake) { awake = on; wakeLock(on); } }).observe(document.documentElement, { childList: true, subtree: true });

/* ---------------- notification buttons, quick actions, Siri, share inbox ---------------- */
LocalNotifications.registerActionTypes({ types: [
  { id: 'TEGA_GO', actions: [{ id: 'snooze', title: 'Snooze 1h' }] },
  { id: 'TEGA_DONE', actions: [{ id: 'done', title: 'Done' }, { id: 'snooze', title: 'Snooze 1h' }] },
  { id: 'TEGA_LOG', actions: [{ id: 'log', title: 'Log it', foreground: true }, { id: 'snooze', title: 'Snooze 1h' }] },
] }).catch(() => {});
const appCall = (fn, ...a) => { const run = () => typeof window[fn] === 'function' ? window[fn](...a) : setTimeout(run, 400); run(); };
LocalNotifications.addListener('localNotificationActionPerformed', async ({ actionId, notification }) => {
  const ex = (notification && notification.extra) || {};
  if (actionId === 'snooze') { await LocalNotifications.schedule({ notifications: [{ id: 6100 + Math.floor(Math.random() * 800), title: notification.title, body: notification.body, schedule: { at: new Date(Date.now() + 3600e3) }, actionTypeId: notification.actionTypeId, extra: ex }] }).catch(() => {}); return; }
  appCall('tegaNotifAction', actionId === 'tap' ? 'open' : actionId, ex);
});
try { Promise.resolve(TegaNative.addListener('shortcut', ({ id }) => appCall('tegaShortcut', id))).catch(() => {}); } catch (e) {}
async function takePending() { const r = await tn('takePending'); for (const id of (r && r.ids) || []) appCall('tegaShortcut', id);
  const ib = await tn('getShared', { key: 'inbox' }); try { const L = ib && ib.value ? JSON.parse(ib.value) : []; if (L.length) { await tn('setShared', { key: 'inbox', value: '[]' }); appCall('tegaInbox', L); } } catch (e) {} }
tn('setShortcuts', { items: [
  { id: 'start', title: 'Start the day', subtitle: 'Check in + Top 3', icon: 'sun.max.fill' },
  { id: 'post', title: 'Log a post', subtitle: 'Content', icon: 'play.rectangle.fill' },
  { id: 'workout', title: 'Start workout', subtitle: 'Gym', icon: 'dumbbell.fill' },
  { id: 'receipt', title: 'Scan receipt', subtitle: 'Write-offs', icon: 'doc.text.viewfinder' },
] });

/* ---------------- boot ---------------- */
App.addListener('appStateChange', ({ isActive }) => { if (isActive) { takePending(); for (const p of pollers) p.run(); window.native.syncReminders(); try { window.tegaNativeSync && window.tegaNativeSync(); } catch (e) {} } });
StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
document.addEventListener('DOMContentLoaded', () => {
  SplashScreen.hide().catch(() => {});
  if (!URL0 || !CFG.anon) { showLogin('Setup isn’t finished: the app has no Supabase address yet.'); return; }
  authFromKeychain().finally(() => { if (auth) afterLogin(); else showLogin(); setTimeout(takePending, 2500); });
});
