# GitHub job: find one short, clear YouTube demo for every stretch in the app and save it for the ▶ button (docs: yoga/videos).
# Claude searches; YouTube's oEmbed confirms each video exists and is embeddable. Prints counts only.
import os, sys, json, re, requests
KEY = os.environ.get('SUPA_SERVICE', ''); URL = os.environ.get('SUPA_URL', '').rstrip('/'); AK = os.environ.get('ANTHROPIC_API_KEY', '')
MODEL = os.environ.get('CLAUDE_MODEL', 'claude-sonnet-5-5')
if not KEY or not AK: print('missing secret'); sys.exit(0)
H = {'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json'}
rows = requests.get(f'{URL}/rest/v1/docs?select=user_id&path=eq.okr/state', headers=H, timeout=60).json()
if not rows: print('no app state'); sys.exit(0)
uid = rows[0]['user_id']
poses = json.load(open('ci/poses.json'))
old = requests.get(f'{URL}/rest/v1/docs?select=data&path=eq.yoga/videos&user_id=eq.{uid}', headers=H, timeout=60).json()
have = (old[0].get('data') or {}) if old else {}
todo = [p for p in poses if p[0] not in have]
def oembed(v):
    r = requests.get('https://www.youtube.com/oembed', params={'url': f'https://www.youtube.com/watch?v={v}', 'format': 'json'}, timeout=20)
    return r.json() if r.status_code == 200 else None
found = 0
for i in range(0, len(todo), 9):
    chunk = todo[i:i+9]
    prompt = ("Find one YouTube video for each stretch below that clearly shows a real person demonstrating it, ideally a short (under 3 minutes) "
              "tutorial or a YouTube Short from a reputable yoga/physio/fitness channel. Use web search. Return ONLY JSON: "
              '{"videos":[{"id":"<pose id>","v":"<11-char YouTube video id>","short":true|false,"start":0}]}' + "\nStretches (id, name): " + json.dumps(chunk))
    r = requests.post('https://api.anthropic.com/v1/messages', headers={'x-api-key': AK, 'anthropic-version': '2023-06-01', 'content-type': 'application/json'},
        json={'model': MODEL, 'max_tokens': 3000, 'tools': [{'type': 'web_search_20250305', 'name': 'web_search', 'max_uses': 18}], 'messages': [{'role': 'user', 'content': prompt}]}, timeout=600)
    if r.status_code != 200: print('claude error', r.status_code); continue
    txt = ''.join(b.get('text', '') for b in r.json().get('content', []) if b.get('type') == 'text')
    m = re.search(r'\{.*\}', txt, re.S)
    try: L = json.loads(m.group(0)).get('videos', []) if m else []
    except Exception: L = []
    for x in L:
        v = str(x.get('v', '')); pid = x.get('id')
        if not re.fullmatch(r'[A-Za-z0-9_-]{11}', v) or pid not in dict(chunk): continue
        o = oembed(v)
        if not o: continue
        have[pid] = {'v': v, 'short': bool(x.get('short')) or (o.get('height', 0) > o.get('width', 1)), 'start': int(x.get('start') or 0), 'ch': o.get('author_name', '')[:60]}
        found += 1
w = requests.post(f'{URL}/rest/v1/docs?on_conflict=user_id,path', headers={**H, 'Prefer': 'resolution=merge-duplicates,return=minimal'}, json=[{'user_id': uid, 'path': 'yoga/videos', 'data': have}], timeout=60)
print('saved' if w.status_code < 300 else f'save failed {w.status_code}', 'new', found, 'total', len(have), 'of', len(poses))
