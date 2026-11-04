// Synthetic, real-sized state for perf tests. Made-up data only — sized above the phone's real counts
// (ci/health.md: ~21+ days, ~850 txns, 30 checks, gym + yoga logs). Run inside the page after boot.
window.tegaFixture = function (n = { days: 60, txns: 1400, gym: 24, yoga: 20, wins: 30 }) {
  const D = ['WHOLE FOODS', 'UBER EATS', 'MTA*NYCT', 'SWEETGREEN', 'AMAZON MKTP', 'SPOTIFY', 'CVS', 'TRADER JOES', 'LYFT RIDE', 'BLUE BOTTLE', 'EQUINOX', 'APPLE.COM/BILL'];
  const list = [];
  for (let i = 0; i < n.txns; i++) list.push({ d: addDays(TODAY, -(i % 120)), desc: D[i % D.length] + ' #' + i, amt: -(5 + (i * 37 % 140)), acct: i % 3 ? 'BofA' : 'Discover' });
  try { importTxns(list, S, true); } catch (e) { }
  for (let i = 0; i < n.days; i++) {
    const d = ensureDay(addDays(TODAY, -i));
    d.checkin = d.checkin || { feel: 1 + i % 3 };
    d.top3 = d.top3 && d.top3.length ? d.top3 : [0, 1, 2].map(j => ({ text: 'task ' + i + '.' + j, track: '', done: (i + j) % 2 === 0 }));
    d.habits = Object.assign({ gym: i % 2 === 0, content: i % 3 === 0, datum: i % 4 === 0 }, d.habits || {});
  }
  const g = G_(), ks = Object.keys(GX).slice(0, 6);
  for (let i = 0; i < n.gym; i++) g.sessions.push({ id: 'fx' + i, d: addDays(TODAY, -i * 2), t0: Date.now() - i * 2 * 864e5, t1: Date.now() - i * 2 * 864e5 + 3e6, name: 'Fixture', mode: 'push',
    ex: ks.map(x => ({ x, sets: [1, 2, 3].map(r => ({ w: 40 + r * 5, r: 8, t: 'n', ok: true })) })), prs: [] });
  try { S.yoga = S.yoga || {}; S.yoga.log = S.yoga.log || []; for (let i = 0; i < n.yoga; i++) S.yoga.log.push({ d: addDays(TODAY, -i * 3), id: 'quick', min: 12 }); } catch (e) { }
  try { S.wins = S.wins || []; for (let i = 0; i < n.wins; i++) S.wins.push({ d: addDays(TODAY, -i), text: 'win ' + i }); } catch (e) { }
  commit({ skipXp: true });
  return { days: Object.keys(S.days).length, txns: S.money.budget.txns.length, gym: g.sessions.length };
};
