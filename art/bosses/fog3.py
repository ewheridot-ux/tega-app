import os, sys, math; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from px2 import *
CL=ramp('#141220','#2e2a40','#6a6484',7,shadow='#06050c')
CL2=ramp('#0c0a14','#1e1a2c','#3e3854',5,shadow='#040308')
PK=ramp('#6a0408','#ff2a1a','#fff0a0',6,shadow='#200002',glint='#ffffff')
tC=Noise(5,4); tS=Noise(9,2)
def frame(t, hit=False):
    C=Canvas(); a=t/9*2*math.pi
    C.part(ell(48,92,28,3), [hexc('#07051a')], flat=True, ao=False); C.id[92][48]=998
    # wisps (translucent, wavy) trailing below
    for k in range(5):
        x0=30+k*9; pts=[]
        for j in range(9):
            u=j/8; pts.append((x0+math.sin(a+j*.9+k*1.7)*4*u+(k-2)*5*u, 60+u*28))
        C.part(tube(pts,4.5,.8), CL2, tex=tS, texamt=.15, alpha=215)
    # back puffs (darker), then front puffs
    back=[(30,38,11,9),(66,37,11,9),(48,26,12,9)]
    for i,(x,y,rx,ry) in enumerate(back):
        C.part(ell(x+math.sin(a+i)*1.2,y+math.cos(a+i)*.8,rx,ry), CL2, tex=tC, texamt=.12)
    front=[(48,46,22,17),(28,52,12,10),(68,51,13,11),(37,34,12,10),(59,33,12,10),(19,44,7,6),(77,43,7,6),(48,60,16,7)]
    for i,(x,y,rx,ry) in enumerate(front):
        f=ell(x+math.sin(a+i*1.3)*2,y+math.cos(a+i)*1.6,rx+math.sin(a*2+i)*.8,ry+math.cos(a*2+i)*.6); C.part(f, CL, tex=tC, texamt=.18, bias=-.1)
    # inner swirl lines (the fog thinking in circles)
    for k in range(2):
        cx,cy=(31,52) if k==0 else (67,52)
        for i in range(18):
            an=i/18*2*math.pi*1.4+a; r=2+i*.35; C.px(cx+math.cos(an)*r, cy+math.sin(an)*r*.8, CL[2])
    # glowing pink core showing through
    # lightning crackling inside the cloud
    if t in (2,3,6):
        bolt=[(30,40),(34,46),(31,49),(37,56)] if t!=6 else [(66,38),(62,45),(66,48),(60,57)]
        for i in range(len(bolt)-1): C.line(*bolt[i],*bolt[i+1],'#fff6c0'); C.line(bolt[i][0]+1,bolt[i][1],bolt[i+1][0]+1,bolt[i+1][1],'#ffb347')
    # eyes: narrow, slanted, burning
    for k,ex in enumerate((38,58)):
        ey=42+math.sin(a)*.7; sg=1 if k==0 else -1
        C.part(poly([(ex-7*sg,ey-5),(ex+6*sg,ey+1),(ex+5*sg,ey+4),(ex-6*sg,ey+2)]), [hexc('#050208'),hexc('#100410')], flat=True)
        C.part(poly([(ex-5*sg,ey-2.5),(ex+4.5*sg,ey+1.5),(ex+3.5*sg,ey+3),(ex-4.5*sg,ey+1.5)]), PK, emis=True)
        C.px(ex,ey+1,'#ffffff')
        d=(t%9)/8; C.px(ex+2*sg, ey+5+d*6, '#ff5a2a', int(255*(1-d)))
    # jagged grin full of fangs
    gp=1+abs(math.sin(a))*1.5
    mouth=poly([(32,52),(40,55),(48,56),(56,55),(64,52),(60,59+gp),(48,62+gp),(36,59+gp)])
    C.part(mouth, [hexc('#0a0004'),hexc('#2a0206')], flat=True)
    C.part(ell(48,58+gp*.5,9,2+gp*.5), PK[:4], emis=True)
    for k in range(8):
        x=34+k*4; yt=52.5+min(k,7-k)*.9
        C.part(poly([(x-1.6,yt),(x+1.6,yt),(x,yt+3.5)]), ramp('#8a8494','#d8d4e0','#ffffff',4))
    for k in range(6):
        x=38+k*4; yb=59.5+gp+min(k,5-k)*.6
        C.part(poly([(x-1.4,yb),(x+1.4,yb),(x,yb-3)]), ramp('#8a8494','#d8d4e0','#ffffff',4))
    # rain / ash falling from the wisps
    for k in range(8):
        u=((t/9)+k/8)%1; C.px(24+k*7, 70+u*20, '#6a6484', int(200*(1-u)))
    C.outline('#030206')
    im=C.img(); glow(im,48,58,14,'#ff3a1a',.3)
    for ex in (38,58): glow(im,ex,43,9,'#ff2a1a',.4)
    if t in (2,3,6): glow(im,33 if t!=6 else 63,48,16,'#fff0a0',.35)
    if hit: im=flash(im,.85)
    return im
def make():
    idle=[frame(t) for t in range(9)]
    hit=[flash(frame(t),[.9,.6,.35,0,.5,.2,0][t]) for t in range(7)]
    return idle[0], idle, hit
if __name__=='__main__':
    s,i,h=make(); preview(s,'/tmp/d_fog.png')
