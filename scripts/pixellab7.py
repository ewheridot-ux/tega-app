# b267: your character, rebuilt in PixelLab from your picture — base bust, every build/style upgrade, moods, backgrounds
import os, sys, time, json, base64, io, requests
from PIL import Image
K = os.environ.get('PXKEY'); B = 'https://api.pixellab.ai/v2'; H = {'Authorization': 'Bearer ' + (K or '')}
D = 'sprites/avatar'; os.makedirs(D + '/full', exist_ok=True); log = lambda *a: print(*a, flush=True)
N = 96
def b64(im): bio = io.BytesIO(); im.save(bio, 'PNG'); return {'type': 'base64', 'base64': base64.b64encode(bio.getvalue()).decode(), 'format': 'png'}
def img(o):
    if isinstance(o, dict): o = o.get('base64') or o.get('image') or o.get('url')
    if isinstance(o, dict): return img(o)
    if isinstance(o, str) and o.startswith('http'): return Image.open(io.BytesIO(requests.get(o, timeout=60).content)).convert('RGBA')
    if isinstance(o, str) and o.startswith('data:'): o = o.split(',', 1)[1]
    return Image.open(io.BytesIO(base64.b64decode(o))).convert('RGBA')
def post(path, body):
    for _ in range(20):
        r = requests.post(B + path, json=body, headers=H, timeout=300)
        if r.status_code == 429: time.sleep(10); continue
        if r.status_code == 402: log('OUT OF CREDITS'); raise SystemExit(0)
        if r.status_code >= 300: log('ERR', path, r.status_code, r.text[:500]); return None
        return r.json()
def wait(jid):
    t0 = time.time()
    while time.time() - t0 < 900:
        time.sleep(5); j = requests.get(f'{B}/background-jobs/{jid}', headers=H, timeout=60).json()
        if j.get('status') == 'completed': return j.get('last_response') or {}
        if j.get('status') == 'failed': log('FAILED', json.dumps(j)[:400]); return None
    return None
def result(r):
    if not r: return None
    lr = wait(r['background_job_id']) if r.get('background_job_id') else r
    if not lr: return None
    if lr.get('image'): return img(lr['image'])
    ims = lr.get('images') or []
    return img(ims[0]) if ims else None
log('balance', requests.get(B + '/balance', headers=H, timeout=60).text[:200])

# 1. base: your picture → pixel art → transparent background
base_p = f'{D}/me_base.png'
if not os.path.exists(base_p):
    src = Image.open(f'{D}/me_src.png').convert('RGB'); W, Hh = src.size
    raw = result(post('/image-to-pixelart', {'image': b64(src), 'image_size': {'width': W, 'height': Hh}, 'output_size': {'width': N, 'height': N}, 'fixer': True, 'init_image_strength': 700}))
    if raw: raw.save(f'{D}/full/me_raw.png'); log('raw', raw.size)
    pro = result(post('/image-to-pixelart-pro', {'image': b64(src), 'description': 'clean pixel art character bust, bold dark outline, keep glasses, face and expression exactly'}))
    if pro: pro.save(f'{D}/full/me_raw_pro.png'); log('pro', pro.size)
    for nm, im in (('me_base', raw), ('me_base_pro', pro)):
        if not im: continue
        if im.size != (N, N): im = im.resize((N, N), Image.NEAREST)
        nb = result(post('/remove-background', {'image': b64(im), 'image_size': {'width': N, 'height': N}, 'background_removal_task': 'remove_complex_background', 'text': 'cartoon character bust: head with glasses and black shirt'}))
        (nb or im).save(f'{D}/{nm}.png'); log('base', nm, bool(nb))
if not os.path.exists(base_p): log('no base, stopping'); raise SystemExit(0)
base = Image.open(base_p).convert('RGBA')

# 2. every upgrade, inpainted onto your character; we keep only the masked area as a layer
MASK = {'eyes': (16, 33, 66, 55), 'mouth': (32, 52, 58, 66), 'ears': (62, 38, 82, 58), 'neck': (32, 63, 64, 84), 'pendant': (36, 68, 60, 94),
        'torso': (14, 66, 82, 96), 'head': (14, 6, 94, 38), 'crown': (20, 0, 76, 22), 'hud': (62, 0, 96, 26), 'glint': (48, 34, 72, 54), 'face': (16, 28, 66, 68), 'mouthx': (28, 52, 62, 70)}
KEEP = ' Keep the same character, same skin tone, same clean pixel art style with a crisp 1-pixel dark outline and flat colors.'
ITEMS = json.load(open(f'{D}/items.json'))
for it in ITEMS:
    out = f"{D}/{it['id']}.png"
    if os.path.exists(out): continue
    if it.get('bg'):
        r = post('/create-image-pixflux', {'description': it['desc'], 'image_size': {'width': N, 'height': N}, 'no_background': False})
        if r: img(r['image']).save(out); log('bg', it['id'])
        continue
    x0, y0, x1, y1 = MASK[it['mask']]
    m = Image.new('RGB', (N, N), 'black'); m.paste((255, 255, 255), (x0, y0, x1, y1))
    r = post('/inpaint-v3', {'description': it['desc'] + KEEP, 'inpainting_image': {'image': b64(base), 'size': {'width': N, 'height': N}},
                             'mask_image': {'image': b64(m), 'size': {'width': N, 'height': N}}, 'no_background': True, 'crop_to_mask': True})
    full = result(r)
    if not full: log('no result', it['id']); continue
    if full.size != (N, N): full = full.resize((N, N), Image.NEAREST)
    full.save(f"{D}/full/{it['id']}.png")
    lay = Image.new('RGBA', (N, N), (0, 0, 0, 0)); lay.paste(full.crop((x0, y0, x1, y1)), (x0, y0)); lay.save(out); log('layer', it['id'])
log('balance after', requests.get(B + '/balance', headers=H, timeout=60).text[:200])
