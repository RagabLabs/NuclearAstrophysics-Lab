import {positive,PhysicsError,finite} from './validation';
export interface RatePoint {T9:number;rate:number;low?:number;high?:number}
export function rateInterpolation(points:RatePoint[],T9:number) {
  positive(T9,'T9');if(points.length<2)throw new PhysicsError('DATA','At least two temperature-rate points are required.');
  for(let i=0;i<points.length;i++){positive(points[i].T9,'Tabulated T9');positive(points[i].rate,'Tabulated rate');if(i&&points[i].T9<=points[i-1].T9)throw new PhysicsError('GRID','Temperature grid must be strictly increasing.');}
  if(T9<points[0].T9||T9>points.at(-1)!.T9)throw new PhysicsError('RANGE','Temperature outside the dataset. Extrapolation disabled.');
  let i=points.findIndex(p=>p.T9>=T9);if(i===0)i=1;const p=points[i-1],q=points[i],w=Math.log(T9/p.T9)/Math.log(q.T9/p.T9);
  const interp=(a:number,b:number)=>Math.exp(Math.log(a)*(1-w)+Math.log(b)*w);
  return {rate:interp(p.rate,q.rate),low:p.low!==undefined&&q.low!==undefined?interp(p.low,q.low):undefined,high:p.high!==undefined&&q.high!==undefined?interp(p.high,q.high):undefined,
    warning:'Piecewise log-log interpolation; bounds are evaluation limits, not a statistical confidence interval.'};
}
/** Three-point quadratic derivative on nonuniform log(T) grids; one-sided at edges. */
export function temperatureSensitivity(points:RatePoint[]) {
  if(points.length<3)throw new PhysicsError('DATA','At least three positive rate points are required.');
  rateInterpolation(points,points[0].T9);
  return points.map((p,i)=>{
    const j=Math.min(Math.max(i-1,0),points.length-3),xs=points.slice(j,j+3).map(p=>Math.log(p.T9)),ys=points.slice(j,j+3).map(p=>Math.log(p.rate)),x=Math.log(p.T9);
    let slope=0;for(let k=0;k<3;k++){const a=(k+1)%3,b=(k+2)%3;slope+=ys[k]*(2*x-xs[a]-xs[b])/((xs[k]-xs[a])*(xs[k]-xs[b]));}
    return {T9:p.T9,rate:p.rate,sensitivity:finite(slope,'Logarithmic sensitivity'),boundary:i===0||i===points.length-1,
      warning:i===0||i===points.length-1?'One-sided endpoint derivative; less reliable.':'Local quadratic derivative in log(T), log(rate); not a fit uncertainty.'};
  });
}
