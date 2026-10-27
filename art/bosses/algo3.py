import os, sys, math; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from px2 import *; from fx3 import cracks
HULL=ramp('#0c0a14','#26222e','#6a6276',7,shadow='#050308')
STEEL=ramp('#16141c','#3a3644','#8e889a',6,shadow='#06040a')
CABLE=ramp('#0e0c14','#24202c','#5a5266',5,shadow='#040208')
RED=ramp('#5a0408','#d4141e','#ffd0a0',6,shadow='#1a0004',glint='#ffffff')
SCL=ramp('#3a0a0c','#7a1416','#e04a2a',4,shadow='#140204')
tex=Noise(4,3)
def frame(t, blink=-1, hit=False):
    C=Canvas(); a=t/9*2*math.pi; bob=round(math.sin(a)*2.6); oy=44+bob
    C.part(ell(48,91,28,3), [hexc('#07051a')], flat=True, ao=False); C.id[91][48]=998
    # tentacle cables with barbed tips
    pods=[(-40,-2),(40,0),(-32,-30),(32,-32),(0,-42),(-30,40),(30,42)]
    podpos=[]
    for k,(ex,ey) in enumerate(pods):
        sw=math.sin(a+k*1.7)*4.5; pts=[]
        for j in range(8):
            u=j/7; pts.append((48+ex*u+sw*u*u, oy+ey*u+math.sin(a+k)*1.4*u-(6*math.sin(u*math.pi) if ey<-20 else 0)))
        C.part(tube(pts,3.8,1.6), CABLE, tex=tex, texamt=.12)
        for j in range(1,7):
            x,y=pts[j]; C.px(x,y-3,'#8e889a'); C.px(x,y-4,'#c8c0d0')   # barbs
        podpos.append(pts[-1])
    for k,(x,y) in enumerate(podpos):
        if k>=5:                                                         # lower two end in blades
            C.part(poly([(x-3,y-2),(x+3,y-2),(x,y+9)]), STEEL); C.px(x,y+8,'#ff3a2a'); continue
        C.part(ell(x,y,6.5,6.5), HULL, tex=tex)
        if blink==k: C.part(ell(x,y,5,1.2), HULL); continue
        C.part(ell(x,y,4.4,4.4), RED, emis=True)
        C.part(ell(x+math.sin(a+k)*1.2,y,1,3.4), [hexc('#050003')], flat=True)
        C.part(poly([(x-7,y-4),(x+7,y-4),(x+6,y-.5),(x-6,y+.5)] if k%2 else [(x-7,y-4),(x+7,y-4),(x+6,y+.5),(x-6,y-.5)]), STEEL)  # scowling lids
    # orb hull with spikes
    for k in range(10):
        ang=k/10*2*math.pi+.15; bx=48+math.cos(ang)*23; by=oy+4+math.sin(ang)*22
        C.part(poly([(bx+math.cos(ang+1.6)*4,by+math.sin(ang+1.6)*4),(bx+math.cos(ang)*10,by+math.sin(ang)*10),(bx+math.cos(ang-1.6)*4,by+math.sin(ang-1.6)*4)]), STEEL)
    body=ell(48,oy+4,25,24); C.part(body, HULL, tex=tex, texamt=.14, bias=-.12)
    for k in range(6):
        ang=-math.pi*.95+k*math.pi*.38
        for r in range(9,25):
            x=48+math.cos(ang)*r; y=oy+4+math.sin(ang)*r*.96
            if body(x,y): C.px(x,y,HULL[0])
    cracks(C, minus(body, ell(48,oy+1,18,16)), ['#ff2a1a','#a00810'], seed=9, n=7, length=9)
    for k in range(12):
        ang=k/12*2*math.pi+.3; x=48+math.cos(ang)*22; y=oy+4+math.sin(ang)*21; C.px(x,y,'#8e889a')
    # heavy brow plate over the eye, angled down in the middle
    C.part(ell(48,oy+1,18,16), STEEL, tex=tex, texamt=.1)
    C.part(ell(48,oy+1,15,13), [hexc('#030103')], flat=True)
    if blink==9: C.part(ell(48,oy+2,14,2.4), STEEL)
    else:
        C.part(ell(48,oy+2,14,11.5), SCL)
        for k in range(10):                                  # veins
            ang=k/10*2*math.pi; r0=8
            for r in range(9,14): C.px(48+math.cos(ang+r*.05)*r, oy+2+math.sin(ang+r*.05)*r*.8, '#3a0a0c' if r%2 else '#5a0e10')
        lx=round(math.sin(a)*2.5)
        C.part(ell(48+lx,oy+2,8.5,8.5), RED, emis=True)
        for k in range(24): ang=k/24*2*math.pi; C.px(48+lx+math.cos(ang)*8.2,oy+2+math.sin(ang)*8.2,'#5a0408')
        C.part(ell(48+lx,oy+2,1.6,7.5), [hexc('#020001')], flat=True)       # slit pupil
        C.px(44+lx,oy-2,'#ffffff'); C.px(45+lx,oy-2,'#ffe0c0')
    brow=poly([(29,oy-12),(48,oy-3),(67,oy-12),(67,oy-17),(48,oy-9),(29,oy-17)])
    C.part(brow, STEEL, tex=tex, texamt=.1, bias=-.05)
    for x in (34,41,55,62): C.px(x,oy-12+(3 if x in (41,55) else 0),'#c8c0d0')
    # jaw of blades under the eye
    gape=1.5+abs(math.sin(a))*1.5
    C.part(ell(48,oy+19,12,2.5+gape), [hexc('#1a0002'),hexc('#3a0204')], flat=True)
    C.part(ell(48,oy+19.5,7,1+gape*.5), RED, emis=True)
    T=ramp('#5a5060','#c8c0cc','#ffffff',4)
    for k in range(6):
        x=38+k*4; C.part(poly([(x-1.8,oy+15.5),(x+1.8,oy+15.5),(x,oy+19.5+gape*.4)]), T)
    for k in range(5):
        x=40+k*4; C.part(poly([(x-1.6,oy+23+gape),(x+1.6,oy+23+gape),(x,oy+19.5+gape*.5)]), T)
    # glitch shards orbiting (red)
    for k in range(4):
        an=a+k*math.pi/2; x=48+math.cos(an)*37; y=oy+12+math.sin(an)*9
        if math.sin(an)<-.2: continue
        for dx,dy in [(0,0),(1,0),(1,1),(2,1),(2,2),(-1,1)]: C.px(x+dx,y+dy,'#ff3a2a')
        C.px(x+3,y,'#ffffff')
    for k in range(6):
        u=((t/9)+k/6)%1; C.px(20+k*11+math.sin(a+k)*2, 84-u*30, '#ff3a2a', int(255*(1-u)))
    C.outline('#040206')
    im=C.img(); glow(im,48,oy+2,26,'#ff2a1a',.4)
    for (x,y) in podpos[:5]: glow(im,x,y,9,'#ff2a1a',.25)
    glow(im,48,oy+19,8,'#ff5a2a',.3); glow(im,48,88,24,'#ff2a1a',.15)
    if hit: im=flash(im,.85)
    return im
def make():
    idle=[frame(t, blink=(0 if t==2 else 3 if t==5 else -1)) for t in range(9)]
    hit=[flash(frame(t),[.9,.6,.35,0,.5,.2,0][t]) for t in range(7)]
    return idle[0], idle, hit
if __name__=='__main__':
    s,i,h=make(); preview(s,'/tmp/d_algo.png')
