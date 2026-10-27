import os, sys, json, base64, io, random, math; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from px2 import strip, flash, glow, preview
from PIL import Image
import algo3 as algo2, hermit3 as hermit2, fog3 as fog2, stinger3 as stinger2, drake3 as drake2
def crumble(still, seed=5, n=9):
    W0,H0=still.size; B=5; rnd=random.Random(seed); out=[]
    blocks=[(bx,by) for by in range(0,H0,B) for bx in range(0,W0,B) if still.crop((bx,by,bx+B,by+B)).getbbox()]
    info={b:(rnd.random()*2.2, rnd.uniform(-1.8,1.8), rnd.random()) for b in blocks}; floor=H0-5
    for t in range(n):
        f=Image.new('RGBA',(W0,H0),(0,0,0,0)); k=t/(n-1)
        for (bx,by) in blocks:
            d,vx,r=info[(bx,by)]; tt=max(0,t-d)
            dy=min(floor-by-B+int(r*3), (tt**2)*1.7*(1+(by/H0))); dx=vx*tt*1.3
            ch=still.crop((bx,by,bx+B,by+B)); px=ch.load()
            for y in range(B):
                for x in range(B):
                    R,G,Bb,A=px[x,y]
                    if A: gr=(R+G+Bb)//3; px[x,y]=(int(R*(1-k*.75)+gr*k*.35),int(G*(1-k*.75)+gr*k*.35),int(Bb*(1-k*.6)+gr*k*.45),A)
            f.alpha_composite(ch,(int(bx+dx),int(by+dy)))
        if t<4:                                    # dust puffs as it breaks
            for i in range(10):
                x=int(W0/2+math.cos(i)*20*(t+1)/4); y=H0-8-int(math.sin(i*1.7)*4)
                if 0<=x<W0: f.putpixel((x,y),(200,190,210,int(160*(1-t/4))))
        out.append(f)
    return out
def golem_idle(g, n=9):
    out=[]; W0,H0=g.size; src=g.load()
    for t in range(n):
        a=t/n*2*math.pi; f=g.copy(); P=f.load(); lift=round((math.sin(a)+1)); pulse=.5+.5*math.sin(a)
        for y in range(H0):
            for x in range(W0):
                r,gg,b,A=src[x,y]
                if not A: continue
                lava = r>170 and gg>60 and b<90 and r>gg            # molten pixels glow in and out
                if lava: r=min(255,int(r+40*pulse)); gg=min(255,int(gg+55*pulse)); b=min(255,int(b+25*pulse))
                yy=y-lift if y<62 else (y-(lift>1) if y<74 else y)                            # breathing: chest and head rise a pixel
                if 0<=yy<H0: P[x,yy]=(r,gg,b,A)
        for i in range(5):                                          # embers drifting up
            u=((t/n)+i/5)%1; x=int(36+i*6+math.sin(a+i)*2); y=int(56-u*40)
            if 0<=y<H0: P[x,y]=(255,int(170+60*(1-u)),60,int(255*(1-u)))
        glow(f,48,46,14,'#ff8a2e',.18*pulse)
        out.append(f)
    return out
sheets={}
for name,mod in (('algo',algo2),('hermit',hermit2),('fog',fog2),('stinger',stinger2),('drake',drake2)):
    still,idle,hit=mod.make(); sheets[name+'_still']=[still]; sheets[name+'_idle']=idle; sheets[name+'_hit']=hit; sheets[name+'_dead']=crumble(still, seed=len(name)*7)
d=json.load(open(sys.argv[1] if len(sys.argv)>1 else 'pxw.json')); g=Image.open(io.BytesIO(base64.b64decode(d['golem_still']['src'].split(',')[1]))).convert('RGBA')
sheets['golem_idle']=golem_idle(g); sheets['golem_hit']=[flash(g,[.9,.6,.35,0,.5,.2,0][t]) for t in range(7)]; sheets['golem_dead']=crumble(g, seed=3)
out={}
for k,fr in sheets.items():
    im=strip(fr); bio=io.BytesIO(); im.save(bio,'PNG',optimize=True); im.save(f'os.path.dirname(os.path.abspath(__file__))/out3_{k}.png')
    out[k]={'src':'data:image/png;base64,'+base64.b64encode(bio.getvalue()).decode(),'n':len(fr),'w':fr[0].width,'h':fr[0].height}
json.dump(out, open('os.path.dirname(os.path.abspath(__file__))/new_pxw3.json','w'))
print(sum(len(v['src']) for v in out.values())//1024,'KB')
