import os, sys, math; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from px2 import *
SH=ramp('#0e0a0e','#241a20','#6a4a4a',7,shadow='#040204')
SH2=ramp('#080508','#160e12','#3a2626',5,shadow='#020102')
CU=ramp('#3a3440','#a09aa8','#ffffff',6,shadow='#100c14')
CARD=ramp('#6a6e7a','#c8ccd6','#ffffff',5,shadow='#2a2c38')
VEN=ramp('#1e5a0a','#6aff2a','#f0ffc0',5,shadow='#081a04')
tS=Noise(13,1.8)
def frame(t, hit=False):
    C=Canvas(); a=t/9*2*math.pi; sway=math.sin(a)
    C.part(ell(46,91,34,3), [hexc('#07051a')], flat=True, ao=False); C.id[91][46]=998
    # far legs (darker)
    for k in range(4):
        lx=38+k*8; st=math.sin(a*2+k*1.5+1)*2.2
        C.part(tube([(lx,72),(lx+3,78),(lx+1+st,86)],1.8,1.2), SH2)
    # tail: plated segments + card-like scales
    def bz(u):
        P=[(60,70),(77+sway*2,44),(60+sway*3,10+sway*4),(41+sway*4,24+sway*5)]; m=1-u
        return tuple(m**3*P[0][k]+3*m*m*u*P[1][k]+3*m*u*u*P[2][k]+u**3*P[3][k] for k in (0,1))
    pts=[bz(j/10) for j in range(11)]
    C.part(tube(pts,6.4,3), SH, tex=tS, texamt=.06, bias=-.12)
    for j in range(1,10):
        x,y=pts[j]; x2,y2=pts[j+1]; ang=math.atan2(y2-y,x2-x)
        r=7-j*.4
        for s_ in range(-int(r),int(r)+1):
            C.px(x+math.cos(ang+math.pi/2)*s_, y+math.sin(ang+math.pi/2)*s_, '#ff3a1a' if abs(s_)<r-1 and (s_+j)%3 else '#8a0a0a')
        C.px(x-1,y-r*.6,SH[5]); C.px(x,y-r*.6,SH[6])                                  # glints
    # stinger with venom
    x,y=pts[-1]
    C.part(poly([(x-3,y-3),(x+3,y),(x-4,y+12),(x-7,y+11)]), CU)
    d=(t%9)/8; C.part(ell(x-6,y+13+d*4,1.6,2.2), VEN, emis=True, alpha=int(255*(1-d*.6)))
    C.px(x-7,y+11,'#ffffff' if hit else '#d8ffa0')
    # body: 5 overlapping plates
    for k in range(5):
        f=ell(34+k*7,70,9,8); C.part(f, SH, tex=tS, texamt=.06, bias=-.12)
        for yy in range(63,77):
            if f(34+k*7-7.5,yy) or True: pass
        C.line(30+k*7,64,38+k*7,64,SH[5]) if k<4 else None
    for k in range(4): C.line(40+k*7,63,40+k*7,77,'#c8140e'); C.line(40+k*7,65,40+k*7,74,'#ff5a2a')
    for k in range(6): x=31+k*6; C.part(poly([(x-2,63),(x+2,63),(x+1,57-(k%2)*2)]), SH2)
    # chip on the back
    C.part(poly([(42,61),(52,61),(52,66),(42,66)]), ramp('#3a2a08','#8a6a20','#d8b860',5))
    for x_ in (44,47,50): C.line(x_,62,x_,65,'#3a2a08')
    # head + eyes cluster
    head=ell(25,67,9,7.5); C.part(head, SH, tex=tS, texamt=.06, bias=-.1)
    for ex,ey in ((21,63),(24,62),(27,62),(22,65)):
        C.px(ex,ey,'#ffffff' if hit else '#ffe0a0'); C.px(ex,ey+1,'#ff2a1a'); C.px(ex+1,ey+1,'#c8140e')
    # pincers: arm, then serrated claws that snap open/closed
    op=abs(math.sin(a*2))*5
    for dy,sc in ((-7,1.3),(7,1.1)):
        C.part(tube([(24,68+dy*.3),(19,65+dy*.8),(15,64+dy)],2.6*sc,2.3*sc), SH, bias=-.1)
        hx,hy=13,63+dy
        C.part(ell(hx,hy,6.5*sc,4.6*sc), SH, tex=tS, texamt=.06, bias=-.12)                       # the 'hand'
        o=op*(1 if dy<0 else .7)
        up=poly([(hx-3,hy-2*sc),(hx-14*sc,hy-4*sc-o),(hx-16*sc,hy-2*sc-o),(hx-12*sc,hy-.5*sc-o*.5),(hx-4,hy)])
        lo=poly([(hx-3,hy+1*sc),(hx-13*sc,hy+3*sc+o*.5),(hx-14*sc,hy+1.5*sc+o*.5),(hx-4,hy+.5*sc)])
        C.part(up, SH, bias=-.08); C.part(lo, SH2)
        for k in range(3): C.px(hx-6*sc-k*2.5*sc, hy-1.5*sc-o*.6, '#d8d0d8'); C.px(hx-6*sc-k*2.5*sc, hy-2.5*sc-o*.6, '#ffffff')                       # teeth
        C.px(hx-2,hy-3*sc,SH[6]); C.px(hx-1,hy-3*sc,SH[5])
    # near legs (brighter, in front)
    for k in range(4):
        lx=32+k*8; st=math.sin(a*2+k*1.5)*2.4
        C.part(tube([(lx,74),(lx-4,79),(lx-6+st,87)],2,1.3), SH)
        C.px(lx-4,78,SH[5])
    C.outline('#020102')
    im=C.img(); sh=Image.new('RGBA',im.size,(0,0,0,0)); sh.paste(im,(8,0)); im=sh; glow(im,pts[-1][0]+2,pts[-1][1]+14,9,'#6aff2a',.4); glow(im,25,64,8,'#ff2a1a',.35); glow(im,50,70,22,'#ff2a1a',.12)
    if hit: im=flash(im,.85)
    return im
def make():
    idle=[frame(t) for t in range(9)]
    hit=[flash(frame(t),[.9,.6,.35,0,.5,.2,0][t]) for t in range(7)]
    return idle[0], idle, hit
if __name__=='__main__':
    s,i,h=make(); preview(s,'/tmp/d_stinger.png')
