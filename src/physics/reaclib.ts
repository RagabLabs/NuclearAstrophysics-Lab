import {positive,expChecked,PhysicsError} from './validation';
export function reaclibRate(T9:number,sets:number[][],range:[number,number]) {
  positive(T9,'T9');if(T9<range[0]||T9>range[1])throw new PhysicsError('RANGE','Outside the declared REACLIB application interval.');
  if(!sets.length||sets.some(a=>a.length!==7||a.some(x=>!Number.isFinite(x))))throw new PhysicsError('DATA','REACLIB requires seven finite coefficients per additive term.');
  const t=Math.cbrt(T9),basis=[1,1/T9,1/t,t,T9,T9*t*t,Math.log(T9)];
  const logs=sets.map(a=>a.reduce((s,x,i)=>s+x*basis[i],0)),m=Math.max(...logs),l=m+Math.log(logs.reduce((s,x)=>s+Math.exp(x-m),0));
  const r=expChecked(l);
  const derivatives=sets.map(a=>-a[1]/T9-a[2]/(3*t)+a[3]*t/3+a[4]*T9+5*a[5]*T9*t*t/3+a[6]);
  return {molarRate:r.value,underflow:r.underflow,logMolarRate:l,sensitivity:logs.reduce((s,x,i)=>s+Math.exp(x-m)*derivatives[i],0)/logs.reduce((s,x)=>s+Math.exp(x-m),0)};
}
