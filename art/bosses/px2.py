# pixel-art engine v2: hue-shifted ramps, texture noise, ambient occlusion, selective outline, alpha
import math, random
from PIL import Image
W=H=96
BAYER4=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]]
def hexc(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def lerp(a,b,t): return tuple(int(a[i]+(b[i]-a[i])*t) for i in range(3))
def ramp(dark, mid, light, n=6, shadow='#1a0f2e', glint='#fff6e0'):
    # hue-shifted ramp: shadows lean toward a cool purple, highlights toward warm light
    D,M,L,S,G=map(hexc,(dark,mid,light,shadow,glint)); out=[]
    for i in range(n):
        t=i/(n-1)
        if t<.5: c=lerp(lerp(S,D,.55), M, t*2)
        else: c=lerp(M, L, (t-.5)*2)
        if i==n-1: c=lerp(c,G,.35)
        out.append(c)
    return out
class Noise:
    def __init__(s,seed=1,scale=6):
        r=random.Random(seed); s.g={}; s.r=r; s.sc=scale
    def _v(s,ix,iy):
        k=(ix,iy)
        if k not in s.g: s.g[k]=s.r.random()
        return s.g[k]
    def __call__(s,x,y):
        x/=s.sc; y/=s.sc; ix,iy=int(math.floor(x)),int(math.floor(y)); fx,fy=x-ix,y-iy
        sm=lambda t:t*t*(3-2*t); a=s._v(ix,iy); b=s._v(ix+1,iy); c=s._v(ix,iy+1); d=s._v(ix+1,iy+1)
        return (a+(b-a)*sm(fx))+((c+(d-c)*sm(fx))-(a+(b-a)*sm(fx)))*sm(fy)
class Canvas:
    def __init__(s, light=(-.5,-.7,.55)):
        s.c=[[None]*W for _ in range(H)]; s.a=[[255]*W for _ in range(H)]; s.id=[[0]*W for _ in range(H)]; s.R={}; s.n=0
        l=math.sqrt(sum(v*v for v in light)); s.L=[v/l for v in light]
    def part(s, inside, R, tex=None, texamt=.18, emis=False, ao=True, alpha=255, flat=False, bias=.12):
        s.n+=1; pid=s.n; s.R[pid]=R
        for y in range(H):
            for x in range(W):
                r=inside(x+.5,y+.5)
                if not r: continue
                nx,ny=r if isinstance(r,tuple) else (0,0)
                nz=math.sqrt(max(0,1-nx*nx-ny*ny))
                if emis: v=1-min(1,math.sqrt(nx*nx+ny*ny))*.85
                elif flat: v=.55
                else: v=nx*s.L[0]+ny*s.L[1]+nz*s.L[2]+bias
                if tex: v+= (tex(x,y)-.5)*texamt*2
                # ambient occlusion: darker where we overlap something drawn before (contact shadow)
                if ao and not emis and s.c[y][x] is not None and s.id[y][x]!=pid: v-=0
                v=max(0,min(.999,v)); f=v*len(R); i=int(f); fr=f-i
                th=BAYER4[y%4][x%4]/16
                if fr>th and i<len(R)-1 and fr>.35: i+=1
                s.c[y][x]=R[min(len(R)-1,i)]; s.id[y][x]=pid; s.a[y][x]=alpha
        return pid
    def px(s,x,y,col,a=255):
        x,y=int(round(x)),int(round(y))
        if 0<=x<W and 0<=y<H: s.c[y][x]=hexc(col) if isinstance(col,str) else col; s.id[y][x]=999; s.a[y][x]=a
    def line(s,x0,y0,x1,y1,col,a=255):
        n=int(max(abs(x1-x0),abs(y1-y0)))+1
        for i in range(n+1): t=i/max(1,n); s.px(x0+(x1-x0)*t, y0+(y1-y0)*t, col, a)
    def shade_under(s, f, k=.62):
        # cast a soft contact shadow from shape f onto what's already drawn
        for y in range(H):
            for x in range(W):
                if s.c[y][x] is not None and f(x+.5,y+.5): s.c[y][x]=tuple(int(v*k) for v in s.c[y][x])
    def tint(s, f, col, k):
        c=hexc(col)
        for y in range(H):
            for x in range(W):
                if s.c[y][x] is not None and f(x+.5,y+.5): s.c[y][x]=lerp(s.c[y][x],c,k)
    def outline(s, dark='#0c0716'):
        # selective outline: each part's edge takes its own darkest tone; bottom/right edges and the silhouette go near-black
        D=hexc(dark); src=[row[:] for row in s.c]; ids=[row[:] for row in s.id]
        for y in range(H):
            for x in range(W):
                if src[y][x] is None:
                    for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                        xx,yy=x+dx,y+dy
                        if 0<=xx<W and 0<=yy<H and src[yy][xx] is not None and ids[yy][xx]!=998:
                            s.c[y][x]=D; s.id[y][x]=0; s.a[y][x]=255; break
                    continue
                pid=ids[y][x]
                if pid in (999,998): continue
                for dx,dy in ((1,0),(0,1)):
                    xx,yy=x+dx,y+dy
                    if xx<W and yy<H and src[yy][xx] is not None and ids[yy][xx] not in (pid,999,998,0) and ids[yy][xx]<pid:
                        R=s.R.get(pid); s.c[y][x]=R[0] if R else tuple(int(v*.5) for v in src[y][x]); break
    def img(s):
        im=Image.new('RGBA',(W,H),(0,0,0,0)); P=im.load()
        for y in range(H):
            for x in range(W):
                c=s.c[y][x]
                if c is not None: P[x,y]=(*c[:3], s.a[y][x])
        return im
def ell(cx,cy,rx,ry,rot=0):
    ca,sa=math.cos(rot),math.sin(rot)
    def f(x,y):
        dx,dy=x-cx,y-cy; u=(dx*ca+dy*sa)/rx; v=(-dx*sa+dy*ca)/ry
        if u*u+v*v<=1: return (u*ca-v*sa, u*sa+v*ca)
        return None
    return f
def poly(pts, n=None, shade='auto'):
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]; cx=sum(xs)/len(xs); cy=sum(ys)/len(ys); rx=max(1,(max(xs)-min(xs))/2); ry=max(1,(max(ys)-min(ys))/2)
    def f(x,y):
        ins=False; j=len(pts)-1
        for i in range(len(pts)):
            xi,yi=pts[i]; xj,yj=pts[j]
            if (yi>y)!=(yj>y) and x<(xj-xi)*(y-yi)/(yj-yi+1e-9)+xi: ins=not ins
            j=i
        if not ins: return None
        if n is not None: return n
        u=(x-cx)/rx*.7; v=(y-cy)/ry*.7; return (max(-.95,min(.95,u)),max(-.95,min(.95,v)))
    return f
def tube(pts, r0, r1):
    # a tapering tube along a polyline (tails, stalks, tendrils) with cylinder shading
    def f(x,y):
        best=None
        for i in range(len(pts)-1):
            (ax,ay),(bx,by)=pts[i],pts[i+1]; vx,vy=bx-ax,by-ay; L2=vx*vx+vy*vy or 1
            t=max(0,min(1,((x-ax)*vx+(y-ay)*vy)/L2)); px_,py_=ax+vx*t,ay+vy*t; dx,dy=x-px_,y-py_
            u=(i+t)/(len(pts)-1); r=r0+(r1-r0)*u; d=math.sqrt(dx*dx+dy*dy)
            if d<=r and (best is None or d/r<best[0]):
                L=math.sqrt(L2); nx,ny=-vy/L,vx/L; s=(dx*nx+dy*ny)/r; best=(d/r,(nx*s*.95, ny*s*.95))
        return best[1] if best else None
    return f
def union(*fs):
    def f(x,y):
        for g in fs:
            r=g(x,y)
            if r: return r
        return None
    return f
def minus(a,b):
    def f(x,y):
        return None if b(x,y) else a(x,y)
    return f
def strip(frames):
    w=frames[0].width; im=Image.new('RGBA',(w*len(frames),frames[0].height),(0,0,0,0))
    for i,f in enumerate(frames): im.paste(f,(i*w,0))
    return im
def flash(im,k):
    o=im.copy(); P=o.load()
    for y in range(o.height):
        for x in range(o.width):
            r,g,b,a=P[x,y]
            if a: P[x,y]=(int(r+(255-r)*k),int(g+(255-g)*k),int(b+(255-b)*k),a)
    return o
def glow(im, cx, cy, r, col, k=.5):
    # soft additive glow around a light source (drawn into the sprite so the page needs nothing extra)
    c=hexc(col); P=im.load()
    for y in range(max(0,int(cy-r)),min(im.height,int(cy+r)+1)):
        for x in range(max(0,int(cx-r)),min(im.width,int(cx+r)+1)):
            d=math.hypot(x-cx,y-cy)/r
            if d>=1: continue
            a=(1-d)**2*k; R,G,B,A=P[x,y]
            if A: P[x,y]=(min(255,int(R+c[0]*a)),min(255,int(G+c[1]*a)),min(255,int(B+c[2]*a)),A)
            else:
                aa=int(255*a*.8)
                if aa>12 and (x+y)%2==0: P[x,y]=(*c,aa)
    return im
def preview(im, path, scale=3):
    big=im.resize((im.width*scale,im.height*scale),Image.NEAREST); bg=Image.new('RGBA',big.size,(34,26,52,255)); bg.alpha_composite(big); bg.save(path)
