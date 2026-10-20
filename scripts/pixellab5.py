# b226: the six new area bosses — still image, then idle, then defeated animation (in that order so a short budget still gets every boss on screen).
import os, sys, time, json, base64, io, requests
from PIL import Image
K = os.environ.get('PXKEY'); B = 'https://api.pixellab.ai/v2'; H = {'Authorization': 'Bearer ' + (K or '')}
D = 'sprites'; log = lambda *a: print(*a, flush=True)
def b64(im): bio = io.BytesIO(); im.save(bio, 'PNG'); return {'type': 'base64', 'base64': base64.b64encode(bio.getvalue()).decode(), 'format': 'png'}
def img(o):
    if isinstance(o, dict): o = o.get('base64') or o.get('image') or o.get('url')
    if isinstance(o, str) and o.startswith('http'): return Image.open(io.BytesIO(requests.get(o, timeout=60).content)).convert('RGBA')
    if isinstance(o, str) and o.startswith('data:'): o = o.split(',', 1)[1]
    return Image.open(io.BytesIO(base64.b64decode(o))).convert('RGBA')
def post(path, body):
    for _ in range(20):
        r = requests.post(B + path, json=body, headers=H, timeout=300)
        if r.status_code == 429: time.sleep(10); continue
        if r.status_code >= 300: log('ERR', path, r.status_code, r.text[:600]); return None
        return r.json()
def wait(jid):
    t0 = time.time()
    while time.time() - t0 < 600:
        time.sleep(6); j = requests.get(f'{B}/background-jobs/{jid}', headers=H, timeout=60).json()
        if j.get('status') == 'completed': return j.get('last_response') or {}
        if j.get('status') == 'failed': log('FAILED', json.dumps(j)[:500]); return None
    return None
log('balance', requests.get(B + '/balance', headers=H, timeout=60).text[:300])
plan = json.load(open(f'{D}/plan4.json'))
pal = Image.open(f'{D}/base.png').convert('RGB')
for it in plan:
    bal = requests.get(B + '/balance', headers=H, timeout=60).json()
    left = ((bal.get('subscription') or {}).get('generations') or 0) + ((bal.get('credits') or {}).get('usd') or 0)
    if left <= 0: log('out of credits, stopping at', it['id']); break
    out = f"{D}/{it['id']}.png"
    if os.path.exists(out): continue
    if it['kind'] == 'image':
        body = {'description': it['desc'], 'image_size': {'width': it['size'], 'height': it['size']}, 'no_background': True, 'background_removal_task': 'remove_complex_background'}
        if it.get('view'): body['view'] = it['view']
        if it.get('direction'): body['direction'] = it['direction']
        if it.get('palette'): body['color_image'] = b64(pal)
        r = post('/create-image-pixflux', body)
        if r: img(r['image']).save(out); log('image', it['id'], r.get('usage'))
    else:
        src = Image.open(f"{D}/{it['from']}.png").convert('RGBA')
        r = post('/animate-with-text-v3', {'first_frame': b64(src), 'action': it['action'], 'frame_count': it['frames'], 'no_background': it.get('nobg', True), 'enhance_prompt': it.get('enhance', True)})
        if not r: continue
        lr = wait(r['background_job_id'])
        fr = [img(x) for x in ((lr or {}).get('images') or [])]
        if not fr: log('no frames', it['id']); continue
        w, h = fr[0].size; sh = Image.new('RGBA', (w * len(fr), h))
        for i, f in enumerate(fr): sh.paste(f, (i * w, 0))
        sh.save(out); log('anim', it['id'], len(fr), 'frames', w, h)
log('balance after', requests.get(B + '/balance', headers=H, timeout=60).text[:300])
