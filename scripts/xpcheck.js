// Loads the phone's real saved state into several app versions and prints ONLY XP numbers (no personal data).
const {chromium}=require('playwright'); const fs=require('fs');
(async()=>{ const st=JSON.parse(fs.readFileSync('/tmp/xp/state.json','utf8')); const b=await chromium.launch();
  const vers=fs.readFileSync('/tmp/xp/versions.txt','utf8').trim().split('\n');
  for (const v of vers){ const body=fs.readFileSync(`/tmp/xp/${v}.html`,'utf8');
    const html='<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"></head><body>'+body+'</body></html>';
    const ctx=await b.newContext({viewport:{width:390,height:844}}); await ctx.addInitScript(([k,val])=>{ try{ localStorage.setItem(k,val); }catch(e){} },['okrquest-v2',JSON.stringify(st)]);
    const p=await ctx.newPage(); await p.route('http://x.test/a.html',r=>r.fulfill({body:html,contentType:'text/html'}));
    try { await p.goto('http://x.test/a.html#today'); await p.waitForTimeout(4000);
      const r=await p.evaluate(()=>{ const o={xp:computeXP()}; o.lvl=levelFor(o.xp); for (const k of ['questXP','rpgExtraXP','datumXP','gymXP','gtrXP','moneyXP','bossXP']) try { if (typeof window[k]==='function') o[k]=window[k](); } catch(e){ o[k]='err'; } o.days=Object.keys(S.days||{}).length; o.lvlSeen=S.lvlSeen; return o; });
      console.log(v, JSON.stringify(r)); } catch(e){ console.log(v,'ERR',String(e).slice(0,200)); }
    await ctx.close(); }
  await b.close(); })();
