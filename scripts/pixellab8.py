# b273: a PixelLab pixel-art icon for every emoji the app uses
import os, time, json, base64, io, requests
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
K = os.environ.get('PXKEY'); B = 'https://api.pixellab.ai/v2'; H = {'Authorization': 'Bearer ' + (K or '')}
D = 'sprites/emoji'; log = lambda *a: print(*a, flush=True)
FIX = {'white heavy check mark': 'green check mark in a rounded square', 'black universal recycling symbol': 'recycling arrows', 'heavy black heart': 'red heart',
       'anticlockwise downwards and upwards open circle arrows': 'two circular refresh arrows', 'clockwise rightwards and leftwards open circle arrows': 'two circular repeat arrows'}
def img(o):
    if isinstance(o, dict): o = o.get('base64') or o.get('image')
    if isinstance(o, dict): return img(o)
    if isinstance(o, str) and o.startswith('data:'): o = o.split(',', 1)[1]
    return Image.open(io.BytesIO(base64.b64decode(o))).convert('RGBA')
def one(it):
    out = f"{D}/{it['id']}.png"
    if os.path.exists(out): return
    nm = FIX.get(it['name'], it['name'])
    body = {'description': f"pixel art icon of {nm}, single object centered, bold dark outline, bright saturated colors, cute game UI icon like an emoji, transparent background",
            'image_size': {'width': 32, 'height': 32}, 'no_background': True, 'text_guidance_scale': 9}
    for a in range(8):
        try: r = requests.post(B + '/create-image-pixflux', json=body, headers=H, timeout=180)
        except Exception as e: time.sleep(5); continue
        if r.status_code == 429: time.sleep(8 + a * 4); continue
        if r.status_code == 402: log('OUT OF CREDITS'); return
        if r.status_code >= 300: log('ERR', it['id'], r.status_code, r.text[:200]); return
        img(r.json()['image']).save(out); log('ok', it['id'], it['name']); return
log('balance', requests.get(B + '/balance', headers=H, timeout=60).text[:200])
items = json.load(open(f'{D}/items.json'))
with ThreadPoolExecutor(4) as ex: list(ex.map(one, items))
log('done', sum(os.path.exists(f"{D}/{i['id']}.png") for i in items), 'of', len(items))
log('balance after', requests.get(B + '/balance', headers=H, timeout=60).text[:200])
