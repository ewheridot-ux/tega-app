// Tega.exe native layer.
// The web app (web/app.html) was written against Claude's artifact runtime (window.claude.use('db' | 'assets' | 'sample' | 'downloads' | 'mcp')).
// This file provides the same interface on iPhone, backed by Supabase (data + files), a Supabase Edge Function (Claude API),
// and Capacitor plugins (notifications, haptics, share sheet). The app code itself stays identical to the web version.
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
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
const saveAuth = a => { auth = a; try { a ? localStorage.setItem(AUTH_KEY, JSON.stringify(a)) : localStorage.removeItem(AUTH_KEY); } catch (e) {} };
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
  el.innerHTML = `<div class="tl-card"><div class="tl-logo">Tega.exe</div><div class="tl-sub">${msg || 'Sign in to sync your app'}</div>
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

window.claude = {
  native: true,
  async use(cap) {
    await ready;
    if (cap === 'db') return makeDb();
    if (cap === 'assets') return assets;
    if (cap === 'downloads') return downloads;
    if (cap === 'sample') return sample;
    return null; // 'mcp' (Gmail, Era, Instagram, Yelp) lives in the Claude version for now
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
  haptic() { Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {}); },
};
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
        if (before > now && before - now < 30 * 864e5 && i < 20) list.push({ id: 3000 + i++, title: 'Due tomorrow', body: x.text, schedule: { at: before } });
        if (due > now && due - now < 30 * 864e5 && i < 20) list.push({ id: 3000 + i++, title: 'Due today', body: x.text, schedule: { at: due } });
      }
    } catch (e) {}
    try {
      let i = 0;
      for (const c of (S.money && S.money.checks) || []) {
        if (c.got) continue; const d = at(c.d, 12); if (d > now && i < 10) list.push({ id: 4000 + i++, title: 'Check expected today', body: `$${Math.round(c.amt).toLocaleString()} ${c.note || ''}`.trim(), schedule: { at: d } });
      }
    } catch (e) {}
    try { for (const r of (typeof window.tegaReminders === 'function' ? window.tegaReminders() : []).slice(0, 20)) list.push({ id: r.id, title: r.title, body: r.body, schedule: { at: r.at } }); } catch (e) {}
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

/* ---------------- boot ---------------- */
App.addListener('appStateChange', ({ isActive }) => { if (isActive) { for (const p of pollers) p.run(); window.native.syncReminders(); } });
StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
document.addEventListener('DOMContentLoaded', () => {
  SplashScreen.hide().catch(() => {});
  if (!URL0 || !CFG.anon) { showLogin('Setup isn’t finished: the app has no Supabase address yet.'); return; }
  if (auth) afterLogin(); else showLogin();
});
