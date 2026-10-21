# numbers only: how much history each cloud copy holds (phone state, weekly auto-backup, any other docs)
import os, json, requests
K=os.environ['SUPA_SERVICE']; U=os.environ['SUPA_URL'].rstrip('/'); H={'apikey':K,'Authorization':'Bearer '+K}
rows=requests.get(f'{U}/rest/v1/docs?select=path,data,updated_at',headers=H,timeout=60).json()
def rich(d):
    if not isinstance(d,dict): return {}
    return {'days':len(d.get('days') or {}),'wins':len(d.get('wins') or []),'weeks':len(d.get('weeks') or {}),'quests':len(d.get('quests') or []),
            'checks':len((d.get('money') or {}).get('checks') or []),'txns':len(((d.get('money') or {}).get('budget') or {}).get('txns') or []),
            'gym':len(((d.get('gym') or {}).get('sessions')) or []),'gymLive':bool((d.get('gym') or {}).get('live')),'liveSets':sum(len(e.get('sets') or []) for e in (((d.get('gym') or {}).get('live') or {}).get('ex') or [])),'liveStart':((d.get('gym') or {}).get('live') or {}).get('t0') or ((d.get('gym') or {}).get('live') or {}).get('start'),'liveDone':sum(1 for e in (((d.get('gym') or {}).get('live') or {}).get('ex') or []) for z in (e.get('sets') or []) if z.get('done')),'yoga':len(((d.get('yoga') or {}).get('log')) or []),'today':{k:(len(v) if isinstance(v,(list,dict)) else bool(v)) for k,v in ((d.get('days') or {}).get('2026-10-20') or {}).items()},'shield':sorted((d.get('shieldUsed') or {}).keys())[-3:],'rescue':d.get('rescueDone'),'lvlSeen':d.get('lvlSeen'),'updatedAt':d.get('updatedAt'),'build':d.get('build')}
for r in sorted(rows,key=lambda r:r['path']):
    if r['path'].startswith('feed/') or r['path'].startswith('inbox/'): print(r['path'],'· updated',r['updated_at']); continue
    print(r['path'],'· updated',r['updated_at'],'·',json.dumps(rich(r['data'])))
