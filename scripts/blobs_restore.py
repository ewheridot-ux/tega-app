# Put the Claude-version photos/clips (migration/assets) into cloud storage if they're missing. Prints counts only.
import os, json, mimetypes, requests
K=os.environ['SUPA_SERVICE']; U=os.environ['SUPA_URL'].rstrip('/'); H={'apikey':K,'Authorization':'Bearer '+K}
man=json.load(open('migration/assets.json')); up=have=fail=0; codes={}
for i,f in man.items():
    if requests.head(f'{U}/storage/v1/object/public/blobs/{i}',timeout=30).status_code==200: have+=1; continue
    t=mimetypes.guess_type(f)[0] or 'application/octet-stream'
    r=requests.post(f'{U}/storage/v1/object/blobs/{i}',headers={**H,'Content-Type':t},data=open('migration/assets/'+f,'rb').read(),timeout=300)
    if r.ok: up+=1
    else: fail+=1; codes[r.status_code]=codes.get(r.status_code,0)+1
print('pictures restore · in manifest',len(man),'· already there',have,'· uploaded',up,'· failed',fail,json.dumps(codes))
