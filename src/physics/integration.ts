import {finite, positive, PhysicsError} from './validation';
const X = [0.9914553711208126,0.9491079123427585,0.8648644233597691,0.7415311855993945,0.5860872354676911,0.4058451513773972,0.2077849550078985,0];
const W = [0.02293532201052922,0.06309209262997855,0.1047900103222502,0.1406532597155259,0.1690047266392679,0.1903505780647854,0.2044329400752989,0.2094821410847278];
const G = [0.1294849661688697,0.2797053914892767,0.3818300505051189,0.4179591836734694];
export interface Integral {value:number; error:number; evaluations:number; intervals:number; converged:boolean}
/** Embedded Gauss(7)-Kronrod(15), global error budget, mandatory initial panels.
 * No generic quadrature can discover a feature narrower than every sampling gap.
 * Supply known breakpoints; never infer physical data completeness from convergence. */
export function integrate(f:(x:number)=>number,a:number,b:number,rtol=1e-8,atol=1e-12,breakpoints:number[]=[],maxIntervals=12000):Integral {
  finite(a,'Lower limit'); finite(b,'Upper limit'); positive(rtol,'Relative tolerance'); positive(atol,'Absolute tolerance');
  if(b<=a) throw new PhysicsError('RANGE','Integration upper limit must exceed lower limit.');
  let evaluations=0;
  function panel(l:number,r:number) {
    const h=(r-l)/2,m=(l+r)/2,fc=finite(f(m),'Integrand'); evaluations++;
    let k=W[7]*fc,g=G[3]*fc,abs=W[7]*Math.abs(fc);
    for(let i=0;i<7;i++){const v1=finite(f(m-h*X[i]),'Integrand'),v2=finite(f(m+h*X[i]),'Integrand');evaluations+=2;
      k+=W[i]*(v1+v2);abs+=W[i]*(Math.abs(v1)+Math.abs(v2));if(i%2===1)g+=G[(i-1)/2]*(v1+v2);}
    return {l,r,v:k*h,e:Math.max(Math.abs(k-g)*h,50*Number.EPSILON*abs*h)};
  }
  const knots=[a,...Array.from({length:31},(_,i)=>a+(b-a)*(i+1)/32),...breakpoints.filter(x=>x>a&&x<b),b].sort((x,y)=>x-y).filter((x,i,arr)=>i===0||x!==arr[i-1]);
  const panels=knots.slice(1).map((r,i)=>panel(knots[i],r));
  let value=panels.reduce((s,p)=>s+p.v,0),error=panels.reduce((s,p)=>s+p.e,0);
  while(error>Math.max(atol,rtol*Math.abs(value))&&panels.length<maxIntervals){
    let idx=0;for(let i=1;i<panels.length;i++)if(panels[i].e>panels[idx].e)idx=i;
    const p=panels[idx],m=(p.l+p.r)/2;if(m===p.l||m===p.r)break;
    const q=panel(p.l,m),r=panel(m,p.r); value+=q.v+r.v-p.v;error=Math.max(0,error+q.e+r.e-p.e);panels.splice(idx,1,q,r);
  }
  finite(value,'Integral');finite(error,'Integration error');
  return {value,error,evaluations,intervals:panels.length,converged:error<=Math.max(atol,rtol*Math.abs(value))};
}
