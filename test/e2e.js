// End-to-end: sign up, first-run import, app boots from cloud data, writes sync, uploads, Claude call, notifications.
const {chromium}=require('/home/claude/.npm-global/lib/node_modules/playwright');
const fs=require('fs'), path=require('path');
(async()=>{ const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,colorScheme:'dark',timezoneId:'America/Chicago'});
const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
const docs={}, blobs={}, calls=[]; let user={id:'u-1',email:'t@x.com'};
await p.route('http://app.test/**', r=>{ const u=new URL(r.request().url()); let f=path.join('www', decodeURIComponent(u.pathname)); if(u.pathname==='/') f='www/index.html'; if(!fs.existsSync(f)) return r.fulfill({status:404,body:''}); const ext=path.extname(f); r.fulfill({body:fs.readFileSync(f), contentType:{'.html':'text/html','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.webp':'image/webp'}[ext]||'application/octet-stream'}); });
await p.route('https://sb.test/**', async r=>{ const req=r.request(), u=new URL(req.url()), m=req.method(); calls.push(m+' '+u.pathname+u.search.slice(0,60));
  const J=(o,s=200)=>r.fulfill({status:s, contentType:'application/json', body:JSON.stringify(o), headers:{'access-control-allow-origin':'*'}});
  if (m==='OPTIONS') return r.fulfill({status:200, headers:{'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'}});
  if (u.pathname.startsWith('/auth/v1/')) return J({access_token:'tok', refresh_token:'ref', expires_in:3600, user});
  if (u.pathname==='/rest/v1/docs'){
    if (m==='GET'){ const pe=u.searchParams.get('path'); let rows=Object.entries(docs).map(([k,v])=>({path:k,...v}));
      if (pe&&pe.startsWith('eq.')) rows=rows.filter(x=>x.path===pe.slice(3)); if (pe&&pe.startsWith('like.')) { const pre=pe.slice(5).replace('*',''); rows=rows.filter(x=>x.path.startsWith(pre)); }
      if (u.searchParams.get('limit')) rows=rows.slice(0,+u.searchParams.get('limit')); return J(rows); }
    if (m==='POST'){ for (const row of JSON.parse(req.postData())) docs[row.path]={data:row.data, updated_at:new Date().toISOString()+Math.random()}; return r.fulfill({status:201, body:'', headers:{'access-control-allow-origin':'*'}}); }
  }
  if (u.pathname.startsWith('/storage/v1/object/public/blobs/')){ const id=u.pathname.split('/').pop(); const x=blobs[id]; return x? r.fulfill({body:x.body, contentType:x.type}) : r.fulfill({status:404,body:''}); }
  if (u.pathname.startsWith('/storage/v1/object/blobs/')){ const id=u.pathname.split('/').pop(); blobs[id]={body:req.postDataBuffer(), type:req.headers()['content-type']}; return J({Key:'blobs/'+id}); }
  if (u.pathname==='/functions/v1/claude'){ return J({json:{reply:'stub coach reply', objectives:[]}}); }
  return J({},404);
});
await p.goto('http://app.test/'); await p.waitForTimeout(800);
await p.screenshot({path:'test/s1_login.png'});
await p.fill('#tl-email','t@x.com'); await p.fill('#tl-pass','secret123'); await p.click('#tl-up');
for (let i=0;i<40 && await p.$('#tega-import');i++) await p.waitForTimeout(300);
await p.waitForTimeout(2500);
await p.screenshot({path:'test/s2_app.png'});
const st=await p.evaluate(()=>[BUILD, Object.keys(S.days||{}).length, (S.datum?.prototypes||[]).length, typeof dbRef, dbStatus, BLOBURL]);
console.log('app', st, 'docs', Object.keys(docs), 'blobs', Object.keys(blobs).length);
// a write should land in the cloud
await p.evaluate(()=>{ S.wins.push({d:TODAY,text:'native test win'}); commit(); }); await p.waitForTimeout(3500);
console.log('synced win', JSON.stringify(docs['okr/state']?.data||{}).includes('native test win'));
// upload through assets
const up=await p.evaluate(async()=>{ const r=await benchAssets.upload(new Blob(['hi'],{type:'text/plain'})); return r; }); console.log('upload', up.id.length, !!blobs[up.id]);
// avatar video served from storage
console.log('avatar src', await p.evaluate(()=>document.querySelector('video.av-v')?.getAttribute('src')||document.querySelector('.pfp-v')?.getAttribute('src')?.slice(0,30)));
// claude
console.log('sample', JSON.stringify(await p.evaluate(async()=>sampleLib && await sampleLib.json('hi'))));
// rest alarm + reminders
await p.evaluate(()=>{ window.native.restAlarm(Date.now()+60000); window.native.syncReminders(S); }); await p.waitForTimeout(3200);
console.log('native', JSON.stringify(await p.evaluate(()=>(window.__native_calls||[]).map(c=>c[0]+':'+c[1].slice(0,120)))).slice(0,900));
console.log('calls', calls.length, 'errs', errs);
await b.close(); })();
