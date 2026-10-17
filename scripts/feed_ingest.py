# GitHub job: open the sealed feed, put it in the app's database, publish the chase list. Never prints data.
import os, sys, json, base64, hashlib, subprocess, requests
from nacl.public import PrivateKey, SealedBox
KEY = os.environ.get('SUPA_SERVICE', ''); URL = os.environ.get('SUPA_URL', '').rstrip('/')
if not KEY: print('MISSING SECRET: SUPABASE_SERVICE_ROLE_KEY'); open('ci/feed/status.md','w').write('Missing GitHub secret SUPABASE_SERVICE_ROLE_KEY\n'); sys.exit(0)
sk = PrivateKey(hashlib.sha256((KEY + '|tega-feed').encode()).digest())
pub = base64.b64encode(bytes(sk.public_key)).decode()
if not os.path.exists('ci/feed/pubkey.txt') or open('ci/feed/pubkey.txt').read().strip() != pub:
    open('ci/feed/pubkey.txt', 'w').write(pub + '\n'); print('pubkey published')
H = {'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json'}
rows = requests.get(f'{URL}/rest/v1/docs?select=user_id,data&path=eq.okr/state', headers=H, timeout=60).json()
if not rows: print('no app state yet'); sys.exit(0)
uid = rows[0]['user_id']; state = rows[0].get('data') or {}
status = []
if os.path.exists('ci/feed/feed.bin'):
    try:
        feed = json.loads(SealedBox(sk).decrypt(base64.b64decode(open('ci/feed/feed.bin').read().strip())))
        r = requests.post(f'{URL}/rest/v1/docs?on_conflict=user_id,path', headers={**H, 'Prefer': 'resolution=merge-duplicates,return=minimal'}, json=[{'user_id': uid, 'path': 'feed/latest', 'data': feed}], timeout=60)
        status.append(f"feed {feed.get('at','?')}: {r.status_code} · {', '.join(sorted((feed.get('calls') or {}).keys()))}")
    except Exception as e:
        status.append('feed failed: ' + type(e).__name__)
    subprocess.run(['git', 'rm', '-q', '--cached', 'ci/feed/feed.bin']); os.remove('ci/feed/feed.bin')
q = state.get('chaseQ')
json.dump(q or {}, open('ci/feed/chase.json', 'w'), indent=1)
status.append('chase: ' + ('queued ' + q['key'] if q else 'none'))
open('ci/feed/status.md', 'w').write('\n'.join(status) + '\n'); print('\n'.join(status))
