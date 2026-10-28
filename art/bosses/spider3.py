import sys, math; import os; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from px2 import *; from fx3 import cracks
BODY=ramp('#0a0a0c','#22202a','#5a5666',7,shadow='#030204')
LEG=ramp('#08080a','#1c1a22','#4a4654',5,shadow='#020102')
EYE=ramp('#2a5a04','#9cff2a','#f6ffd0',5,shadow='#0a1a02',glint='#ffffff')
WEB='#9aa0b0'
tB=Noise(17,2)
def frame(t, hit=False):
    C=Canvas(); a=t/9*2*math.pi; bob=round(math.sin(a)*1.5); cy=50+bob
    C.part(ell(48,91,30,3), [hexc('#07051a')], flat=True, ao=False); C.id[91][48]=998
    # web thread from above
    C.line(48,0,48,cy-16,WEB,140)
    # 8 legs: two segments each, jagged knees, swaying
    for side in (-1,1):
        for k in range(4):
            ph=a+k*.9+(0 if side<0 else 1.6); sw=math.sin(ph)*2.5
            hx,hy=48+side*8, cy-2+k*3
            kx,ky=48+side*(22+k*2), cy-18+k*9+sw
            fx,fy=48+side*(34+k*1.5), cy+28-k*2+sw*.6
            C.part(tube([(hx,hy),(kx,ky)],3.2,2.4), LEG, tex=tB, texamt=.25, bias=-.2)
            C.part(tube([(kx,ky),(fx,fy)],2.4,.9), LEG, tex=tB, texamt=.25, bias=-.2)
            C.px(kx,ky-2,'#7a7488'); C.px(fx,fy,'#c6ff4d')
    # abdomen with glowing hourglass-like mark + cracks
    ab=ell(48,cy+15,18,15); C.part(ab, BODY, tex=tB, texamt=.15, bias=-.12)
    cracks(C, ab, ['#c6ff4d','#5a9a10'], seed=4, n=5, length=7)
    C.part(poly([(44,cy+8),(52,cy+8),(49,cy+14),(52,cy+20),(44,cy+20),(47,cy+14)]), EYE, emis=True)
    # head / cephalothorax
    hd=ell(48,cy-4,13,10); C.part(hd, BODY, tex=tB, texamt=.12, bias=-.1)
    # 8 eyes: two big, six small
    for (ex,ey,r) in [(44,cy-6,3),(52,cy-6,3),(40,cy-9,1.6),(56,cy-9,1.6),(45,cy-11,1.3),(51,cy-11,1.3),(38,cy-4,1.2),(58,cy-4,1.2)]:
        if t==7 and r>2: C.line(ex-2,ey,ex+2,ey,'#5a9a10'); continue
        C.part(ell(ex,ey,r,r), EYE, emis=True)
        if r>2: C.px(ex-1,ey-1,'#ffffff')
    # fangs (chelicerae) dripping
    for side in (-1,1):
        C.part(poly([(48+side*2,cy+2),(48+side*6,cy+2),(48+side*4,cy+10)]), ramp('#4a4452','#c8c0cc','#ffffff',4))
    d=(t%9)/8; C.part(ell(46,cy+12+d*5,1.2,1.8), EYE, emis=True, alpha=int(255*(1-d*.7)))
    # brow plate (angry)
    C.part(poly([(37,cy-13),(48,cy-8),(59,cy-13),(59,cy-15),(48,cy-11),(37,cy-15)]), BODY, bias=-.05)
    C.outline('#020102')
    im=C.img(); glow(im,48,cy-7,14,'#9cff2a',.35); glow(im,48,cy+14,12,'#9cff2a',.18)
    if hit: im=flash(im,.85)
    return im
def make():
    idle=[frame(t) for t in range(9)]
    hit=[flash(frame(t),[.9,.6,.35,0,.5,.2,0][t]) for t in range(7)]
    return idle[0], idle, hit
if __name__=='__main__':
    s,i,h=make(); preview(i[3],'/tmp/d_spider.png')
