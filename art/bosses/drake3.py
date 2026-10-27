import os, sys, math; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from px2 import *; from fx3 import cracks
OR=ramp('#120403','#34100a','#7a2c16',7,shadow='#080202')
OR2=ramp('#120404','#2e0c06','#6a2410',5,shadow='#040101')
BEL=ramp('#2a0e06','#5a2410','#9a5a2a',5,shadow='#0a0302')
WM=ramp('#100304','#2a0808','#5a1a12',5,shadow='#060102')
HORN=ramp('#2a2420','#7a7060','#e0d8c8',5,shadow='#0a0806')
CARD=ramp('#1e2026','#3e424c','#8a909c',5,shadow='#08080a')
FIRE=ramp('#c8300a','#ff8a1e','#fff6c0',5,shadow='#5a0a04')
tS=Noise(21,1.4); tW=Noise(5,3)
def frame(t, hit=False):
    C=Canvas(); a=t/9*2*math.pi; fl=math.sin(a)*9; br=round(math.sin(a)*2)
    C.part(ell(48,92,28,3), [hexc('#07051a')], flat=True, ao=False); C.id[92][48]=998
    # wings with bones + membrane panels
    for sgn in (-1,1):
        sx,sy=48+sgn*9,44+br
        tips=[(sx+sgn*30,20-fl),(sx+sgn*33,36-fl*.6),(sx+sgn*27,50-fl*.3),(sx+sgn*16,56)]
        C.part(poly([(sx,sy)]+tips+[(sx+sgn*4,58)]), WM, tex=tW, texamt=.1, bias=-.15)
        for k,(tx,ty) in enumerate(tips[:3]):
            C.part(tube([(sx,sy),(sx+(tx-sx)*.5,sy+(ty-sy)*.4-3),(tx,ty)],1.6,.9), OR2)
        for k in range(3):                                   # scalloped trailing edge
            (x1,y1),(x2,y2)=tips[k],tips[k+1]; mx,my=(x1+x2)/2-sgn*2,(y1+y2)/2-1
            C.part(ell(mx,my,3,2.4), [None and 0] if False else WM[:2]) if False else None
    for hx,hy in ((14,40),(82,42),(20,50),(76,30)):
        for dx in range(2):
            C.px(hx+dx,hy,None) if False else None
    # tail with spade
    tp=[(60+u*24, 82-math.sin(u*math.pi)*12+math.sin(a+u*3)*1.6) for u in [j/8 for j in range(9)]]
    C.part(tube(tp,6,1.6), OR, tex=tS, texamt=.1, bias=-.05)
    for j in range(1,8,2): x,y=tp[j]; C.px(x,y-5+j*.4,OR[5])
    ex_,ey_=tp[-1]; C.part(poly([(ex_-2,ey_),(ex_+7,ey_-7),(ex_+5,ey_+1),(ex_+8,ey_+6)]), OR2)
    # body + belly plates
    body=ell(48,68+br,18,17); C.part(body, OR, tex=tS, texamt=.12, bias=-.12)
    bel=ell(48,72+br,10.5,12); C.part(bel, BEL)
    for k in range(5): C.line(40,62+br+k*4,56,62+br+k*4,BEL[0])
    cracks(C, minus(body,bel), ['#ffb030','#d84a0a'], seed=5, n=6, length=8)
    # back spikes
    for k in range(4): x=33+k*2; y=56+br-k*5; C.part(poly([(x,y),(x-5,y-2),(x+1,y-4)]), OR2)
    # feet with claws
    for sgn in (-1,1):
        C.part(ell(48+sgn*11,85,7,4), OR, tex=tS, texamt=.08)
        for k in range(3): C.px(48+sgn*11-3+k*3,88,'#fff6e6'); C.px(48+sgn*11-3+k*3,89,'#c8bca8')
    # the card it hugs (chip, stripe, orange dot)
    card=poly([(33,68+br),(61,64+br),(63,79+br),(35,83+br)]); C.part(card, CARD, bias=-.05)
    C.line(34,72+br,62,68+br,'#2a2c38'); C.line(34,73+br,62,69+br,'#2a2c38')
    C.part(poly([(38,75+br),(45,74+br),(46,78+br),(39,79+br)]), ramp('#6a4a10','#d8b040','#fff0b0',5))
    C.line(40,76+br,44,75.5+br,'#8a6a20'); C.line(41,78+br,45,77+br,'#8a6a20')
    C.part(ell(56,76+br,3.6,3.6), FIRE, emis=True)
    for k,x in enumerate((48,51,53)): C.px(x,79+br-k*.3,'#7a808e')
    # arms over the card
    for sgn in (-1,1):
        C.part(tube([(48+sgn*14,62+br),(48+sgn*15,70+br),(48+sgn*11,74+br)],3.4,2.6), OR, tex=tS)
        for k in range(3): C.px(48+sgn*(10-k*1.5),76+br,'#fff6e6')
    # head: snout, cheeks, horns, eyes, teeth
    head=union(ell(48,39+br,13,11), ell(48,48+br,10,7), poly([(36,36+br),(30,30+br),(38,32+br)]), poly([(60,36+br),(66,30+br),(58,32+br)]))
    C.part(head, OR, tex=tS, texamt=.12, bias=-.1)
    cracks(C, head, ['#ffb030','#c83a0a'], seed=11, n=3, length=6, y1=38+br)
    C.part(ell(48,50+br,8,4), BEL)
    for sgn in (-1,1):
        C.part(tube([(48+sgn*8,31+br),(48+sgn*15,25+br),(48+sgn*20,16+br),(48+sgn*19,8+br)],3.2,.8), HORN)
        for k in range(4): C.px(48+sgn*(11+k*2.6),28+br-k*4,HORN[0])
        ex=48+sgn*6; ey=40+br
        C.part(poly([(ex-4*sgn,ey-3),(ex+4*sgn,ey),(ex+3*sgn,ey+2),(ex-4*sgn,ey+.5)]), [hexc('#050102')], flat=True)
        if t!=6:
            C.part(poly([(ex-3*sgn,ey-1.8),(ex+3*sgn,ey+.3),(ex+2.5*sgn,ey+1.4),(ex-3*sgn,ey+.3)]), ramp('#c83a0a','#ffb030','#fff6c0',4), emis=True)
            C.px(ex,ey-1+.5,'#050102'); C.px(ex,ey+.5,'#050102')
        C.line(ex-5*sgn,ey-6,ex+4*sgn,ey-2,OR2[0]); C.line(ex-5*sgn,ey-7,ex+4*sgn,ey-3,OR[3])          # heavy brow ridge
        C.px(48+sgn*3,48+br,'#3a120a')                        # nostril
    C.part(ell(48,54+br,8,2.4), [hexc('#1a0202'),hexc('#ff6a1a')], emis=True)
    for x in (41,44,47,50,53,56): C.part(poly([(x-1.2,52+br),(x+1.2,52+br),(x,55.5+br)]), ramp('#8a8070','#e8e0d0','#ffffff',4))
    for x in (43,53): C.part(poly([(x-1.4,56+br),(x+1.4,56+br),(x,52+br)]), ramp('#8a8070','#e8e0d0','#ffffff',4))
    # flame flicker from the mouth on some frames
    if t in (3,4,5):
        k=t-3; C.part(poly([(53,52+br),(66+k*3,46+br-k),(72+k*3,51+br),(70+k*3,56+br),(64+k*2,58+br)]), FIRE, emis=True)
        C.part(ell(64+k*2,52+br,3,2.2), [hexc('#fff6c0'),hexc('#ffffff')], emis=True)
    C.outline('#020101')
    im=C.img(); glow(im,56,76+br,7,'#ff8a2e',.25); glow(im,48,72+br,16,'#ff6a1a',.2)
    for sgn in (-1,1): glow(im,48+sgn*6,40+br,6,'#ffb030',.45)
    if t in (3,4,5): glow(im,62,53,10,'#ffb347',.4)
    if hit: im=flash(im,.85)
    return im
def make():
    idle=[frame(t) for t in range(9)]
    hit=[flash(frame(t),[.9,.6,.35,0,.5,.2,0][t]) for t in range(7)]
    return idle[0], idle, hit
if __name__=='__main__':
    s,i,h=make(); preview(s,'/tmp/d_drake.png'); preview(i[4],'/tmp/d_drake4.png')
