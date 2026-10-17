# Builds Tega's pixel sprite set with PixelLab: base portrait, then one animation per mood.
import os, sys, time, json, base64, io, requests
from PIL import Image
K = os.environ.get('PXKEY'); B = 'https://api.pixellab.ai/v2'; H = {'Authorization': 'Bearer ' + (K or '')}
os.makedirs('sprites', exist_ok=True)
log = lambda *a: print(*a, flush=True)
def b64(im): bio = io.BytesIO(); im.save(bio, 'PNG'); return {'type': 'base64', 'base64': base64.b64encode(bio.getvalue()).decode(), 'format': 'png'}
def img(o):
    if isinstance(o, dict): o = o.get('base64') or o.get('image') or o.get('url')
    if isinstance(o, str) and o.startswith('http'): return Image.open(io.BytesIO(requests.get(o, timeout=60).content)).convert('RGBA')
    if isinstance(o, str) and o.startswith('data:'): o = o.split(',', 1)[1]
    return Image.open(io.BytesIO(base64.b64decode(o))).convert('RGBA')
def post(path, body):
    r = requests.post(B + path, json=body, headers=H, timeout=300)
    if r.status_code >= 300: log('ERR', path, r.status_code, r.text[:800]); return None
    return r.json()
bal = requests.get(B + '/balance', headers=H, timeout=60); log('balance', bal.status_code, bal.text[:400])
plan = json.load(open('sprites/plan.json'))
# 1) base portrait
if not os.path.exists('sprites/base.png'):
    src = Image.open('sprites/src.png').convert('RGB')
    r = post('/image-to-pixelart', {'image': b64(src), 'image_size': {'width': 256, 'height': 256}, 'output_size': {'width': 64, 'height': 64}, 'fixer': True, 'init_image_strength': 600})
    if not r: sys.exit(1)
    img(r['image']).save('sprites/base.png'); log('base ok', r.get('usage'))
base = Image.open('sprites/base.png').convert('RGBA')
# 2) animations: submit all, then poll
jobs = {}
for m in plan:
    if os.path.exists(f"sprites/{m['id']}.png"): continue
    r = post('/animate-with-text-v3', {'first_frame': b64(base), 'action': m['action'], 'frame_count': m['frames'], 'enhance_prompt': True})
    if r: jobs[m['id']] = r['background_job_id']; log('submitted', m['id'], r.get('usage'))
    time.sleep(1)
t0 = time.time()
while jobs and time.time() - t0 < 2400:
    time.sleep(8)
    for mid, jid in list(jobs.items()):
        j = requests.get(f'{B}/background-jobs/{jid}', headers=H, timeout=60).json()
        st = j.get('status')
        if st == 'completed':
            lr = j.get('last_response') or {}; ims = lr.get('images') or lr.get('frames') or []
            fr = [img(x) for x in ims]
            if not fr: log('no frames', mid, json.dumps(lr)[:500]); del jobs[mid]; continue
            w, h = fr[0].size; sheet = Image.new('RGBA', (w * len(fr), h))
            for i, f in enumerate(fr): sheet.paste(f, (i * w, 0))
            sheet.save(f'sprites/{mid}.png'); log('done', mid, len(fr), 'frames', w, h); del jobs[mid]
        elif st == 'failed': log('FAILED', mid, json.dumps(j)[:600]); del jobs[mid]
log('left', list(jobs))
man = {m['id']: {'frames': m['frames'], 'ms': m['ms'], 'loop': m['loop']} for m in plan if os.path.exists(f"sprites/{m['id']}.png")}
json.dump(man, open('sprites/manifest.json', 'w'), indent=1)
bal = requests.get(B + '/balance', headers=H, timeout=60); log('balance after', bal.text[:300])
