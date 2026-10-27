import math, random
def cracks(C, inside, cols, seed=1, n=6, length=10, x0=0, y0=0, x1=96, y1=96):
    # glowing veins through a shape, like the golem's lava seams
    r=random.Random(seed); pts=[(x,y) for y in range(y0,y1) for x in range(x0,x1) if inside(x+.5,y+.5)]
    if not pts: return
    for _ in range(n):
        x,y=r.choice(pts); ang=r.uniform(0,2*math.pi)
        for i in range(length):
            if not inside(x+.5,y+.5): break
            C.px(x,y,cols[1] if i%3 else cols[0])
            if i%4==0 and r.random()<.5:                  # small fork
                bx,by=x+math.cos(ang+1.3)*2,y+math.sin(ang+1.3)*2
                if inside(bx+.5,by+.5): C.px(bx,by,cols[0])
            ang+=r.uniform(-.7,.7); x+=math.cos(ang); y+=math.sin(ang)
