# fetch the phone's saved app state from Supabase into /tmp/xp/state.json (never printed)
import os, json, requests
K=os.environ['SUPA_SERVICE']; U=os.environ['SUPA_URL'].rstrip('/'); H={'apikey':K,'Authorization':'Bearer '+K}
rows=requests.get(f'{U}/rest/v1/docs?select=data,updated_at&path=eq.okr/state',headers=H,timeout=60).json()
d=rows[0]['data']; json.dump(d,open('/tmp/xp/state.json','w')); print('state ok · days', len(d.get('days',{})), '· lvlSeen', d.get('lvlSeen'), '· updated', rows[0].get('updated_at'))
