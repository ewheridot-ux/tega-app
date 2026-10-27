import os, sys, math; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from px2 import *
ROBE=ramp('#060409','#140e1c','#32263e',7,shadow='#030206')
ROBE2=ramp('#050307','#100b16','#281e32',6,shadow='#030206')
BEARD=ramp('#2a2a28','#5e5e58','#9a9a8a',5,shadow='#141414')
GOLD=ramp('#1e160a','#4a3a1c','#8a7448',6,shadow='#0e0a06')
WOOD=ramp('#140c08','#2e2018','#5a4434',5,shadow='#060302')
SKIN=ramp('#4a4a40','#8a8a78','#d0d0b8',4,shadow='#1a1a14')
ROPE=ramp('#1e1810','#3a3020','#6a5a40',4,shadow='#0a0806')
tR=Noise(7,2.2); tW=Noise(11,1.6)
def frame(t, hit=False):
    C=Canvas(); a=t/9*2*math.pi; br=round(math.sin(a)*2)
    C.part(ell(48,92,28,3), [hexc('#07051a')], flat=True, ao=False); C.id[92][48]=998
    # gnarled staff
    sx=73
    C.part(tube([(sx,90),(sx+1,70),(sx-1,52),(sx+1,34),(sx,24)],2.4,2.0), WOOD, tex=tW, texamt=.25)
    for y in (44,47,62): C.part(ell(sx,y,3,1.4), ROPE)
    C.part(tube([(sx,26),(sx+4,22),(sx+7,20)],1.6,1.2), WOOD)
    # robe body with tattered hem
    hem=[(20,91)]+[(20+i*3+math.sin(a+i*.8)*1.2,91-(6 if i%2 else 0)-(3 if i%3==0 else 0)+math.sin(a*2+i)*1.2) for i in range(1,19)]+[(76,91)]
    robe=union(poly(hem[::-1]+[(66,50+br),(60,38+br),(36,38+br),(30,50+br)]), ell(48,52+br,17,13))
    C.part(robe, ROBE, tex=tR, texamt=.14, bias=-.12)
    # folds: dark creases + light ridges
    for fx,lean in ((36,-.12),(43,-.04),(53,.05),(60,.12)):
        for y in range(58,89):
            x=fx+lean*(y-58)
            if robe(x+.5,y+.5): C.px(x,y,ROBE[1]); C.px(x+1,y,ROBE[4] if y%3 else ROBE[3])
    for k,(rx,ry) in enumerate([(30,84),(38,80),(58,82),(66,85),(48,86)]):
        g='#5aff8a' if (t+k)%3 else '#c8ffd8'
        for dx,dy in [(0,0),(0,1),(0,2),(1,1),(-1,1)] if k%2 else [(0,0),(1,1),(0,2),(-1,1)]: C.px(rx+dx,ry+dy+br*0,g)
    # patch + belt with trinkets
    C.part(poly([(52,72),(58,71),(59,77),(53,78)]), ramp('#3a2a20','#6a5038','#a07c58',4))
    for x,y in [(53,72),(55,72),(57,72),(58,74),(58,76),(53,77)]: C.px(x,y,'#d8c090')
    belt=poly([(34,60+br),(62,60+br),(62,63+br),(34,63+br)]); C.part(belt, ROPE, tex=tW, texamt=.2)
    for k,(x,col) in enumerate([(40,'#c0c8d8'),(44,'#ffd36b'),(57,'#c0c8d8')]):
        C.line(x,63+br,x,67+br+(k%2),'#a07a3c'); C.part(ell(x,68+br+(k%2),2,2), SKIN); C.px(x-1,68+br+(k%2),'#0a0a08'); C.px(x+1,68+br+(k%2),'#0a0a08')
    # sleeves + bony hands (left hangs, right grips staff)
    C.part(ell(33,63+br,6,10,.35), ROBE2, tex=tR); C.part(ell(32,72+br,3,2.4), SKIN)
    for x in (30,32,34): C.line(x,74+br,x-1,79+br,SKIN[1]); C.px(x-1,80+br,'#e8e8d0')
    C.part(ell(66,57+br,7,9,-.6), ROBE2, tex=tR); C.part(ell(sx-1,54+br,3.2,3), SKIN)
    for y in (52,54,56): C.px(sx+1,y+br,SKIN[0])
    # hood
    hood=union(ell(48,34+br,15,16), poly([(33,40+br),(63,40+br),(60,20+br),(48,8+br),(36,20+br)]))
    C.part(hood, ROBE, tex=tR, texamt=.12, bias=-.1)
    C.part(ell(48,37+br,10,11), [hexc('#05030c'),hexc('#0c0818')], flat=True)
    # long beard flowing out of the hood
    beard=poly([(41,40+br),(55,40+br),(57,50+br),(53,62+br),(50,70+br),(46,62+br),(39,50+br)])
    C.part(beard, BEARD, tex=Noise(3,1.2), texamt=.28)
    for k in range(5): C.line(43+k*2.4,44+br,45+k*1.2,60+br+k%2*3,BEARD[1])
    # eyes in the dark
    for dx in (-6,3):
        C.px(48+dx,33+br,'#1a8a3a'); C.px(50+dx,33+br,'#1a8a3a')            # slanted brow glow
        C.px(48+dx,35+br,'#ffffff' if hit else '#e8ffe8'); C.px(49+dx,35+br,'#8affa8'); C.px(50+dx,35+br,'#3acf6a' if dx<0 else '#8affa8')
        C.px(48+dx,36+br,'#3acf6a'); C.px(49+dx,36+br,'#1a8a3a')
        if dx<0: C.px(50+dx,34+br,'#3acf6a')
        else: C.px(47+dx,34+br,'#3acf6a')
    # crown: spiked band with gems
    cy=15+br
    crown=poly([(36,cy+7),(60,cy+7),(61,cy-4),(57,cy+3),(54,cy-8),(51,cy+2),(48,cy-12),(45,cy+2),(42,cy-8),(39,cy+3),(35,cy-4)])
    C.part(crown, GOLD); C.line(37,cy+6,59,cy+6,GOLD[1])
    for x,col in ((43,'#c8141e'),(48,'#5aff8a'),(53,'#c8141e')): C.px(x,cy-2,col); C.px(x,cy+4,col); C.px(x+1,cy+4,'#ffffff')
    # lantern: frame, glass, flame
    lx,ly=sx+7+round(math.sin(a)*2),24+round(abs(math.cos(a))*1)
    C.line(sx+7,20,lx,ly-6,'#2a2a2a')
    C.part(poly([(lx-5,ly-5),(lx+5,ly-5),(lx+4,ly+6),(lx-4,ly+6)]), GOLD)
    C.part(poly([(lx-3,ly-3),(lx+3,ly-3),(lx+2.5,ly+4),(lx-2.5,ly+4)]), ramp('#0a5a2a','#2ad86a','#e8ffe8',5), emis=True)
    C.line(lx,ly-3,lx,ly+4,GOLD[1]); C.line(lx-5,ly-6,lx+5,ly-6,GOLD[2]); C.line(lx-4,ly+7,lx+4,ly+7,GOLD[1])
    fl=[0,1,0,-1,1,0,-1,0,1][t]; C.px(lx+fl*.5,ly,'#ffffff'); C.px(lx,ly+1,'#c8ffd8')
    # moths circling the light
    for k in range(3):
        an=a*1.3+k*2.1; mx=lx+math.cos(an)*11; my=ly+math.sin(an)*7
        C.px(mx,my,'#c8ffd8',220); C.px(mx-math.sin(an)*1.5,my+math.cos(an)*1.5,'#5aff8a',150); C.px(mx-math.sin(an)*3,my+math.cos(an)*3,'#2ad86a',80)
    C.outline('#020104')
    im=C.img(); glow(im,lx,ly,22,'#3aff7a',.45); glow(im,48,36+br,11+2*math.sin(a),'#3aff7a',.3+.15*math.sin(a)); glow(im,48,86,24,'#2ad86a',.15)
    if hit: im=flash(im,.85)
    return im
STEEL2=ramp('#3a4056','#7a84a0','#d6dcec',4)
def make():
    idle=[frame(t) for t in range(9)]
    hit=[flash(frame(t),[.9,.6,.35,0,.5,.2,0][t]) for t in range(7)]
    return idle[0], idle, hit
if __name__=='__main__':
    s,i,h=make(); preview(s,'/tmp/d_hermit.png')
