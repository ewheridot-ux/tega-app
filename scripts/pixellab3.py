# Sharper profile character: 128px versions of the base portrait (two strengths to pick from).
import os, json, time, base64, io, requests
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
log('balance', requests.get(B + '/balance', headers=H, timeout=60).text[:300])
src = Image.open(f'{D}/src.png').convert('RGBA')
for name, st in [('base128a', 300), ('base128b', 550)]:
    out = f'{D}/{name}.png'
    if os.path.exists(out): continue
    r = post('/image-to-pixelart', {'image': b64(src), 'image_size': {'width': 256, 'height': 256}, 'output_size': {'width': 128, 'height': 128}, 'init_image_strength': st})
    if r: img(r['image']).save(out); log('done', name, r.get('usage'))
log('balance after', requests.get(B + '/balance', headers=H, timeout=60).text[:300])
