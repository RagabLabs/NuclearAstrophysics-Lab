import {C} from './constants';
import {coulombExponent} from './sFactor';
import {classical,positive,nonnegative,PhysicsError,expChecked,finite} from './validation';
import {integrate} from './integration';
export interface CrossSectionPoint {energyKeV:number;sigmaBarn:number;relativeError?:number}
export interface SigmaModel {name:string;logSigma:(E:number)=>number|null;range:[number,number];knots:number[];coverage:'finite-data'|'declared-model';}
export function tabulatedSigma(points:CrossSectionPoint[]):SigmaModel {
  if(points.length<2)throw new PhysicsError('DATA','At least two energy-dependent cross sections are required; MACS is not sigma(E).');
  for(let i=0;i<points.length;i++){positive(points[i].energyKeV,'Energy');nonnegative(points[i].sigmaBarn,'Cross section');if(i&&points[i].energyKeV<=points[i-1].energyKeV)throw new PhysicsError('GRID','Energy grid must be strictly increasing without duplicates.');}
  const range:[number,number]=[points[0].energyKeV,points.at(-1)!.energyKeV];
  return {name:'Piecewise log-log sigma(E); linear interpolation where a value is zero',range,knots:points.map(p=>p.energyKeV),coverage:'finite-data',logSigma:(E)=>{
    const ulps=8*Number.EPSILON*Math.max(Math.abs(E),range[1]);
    if(E<range[0]-ulps||E>range[1]+ulps)throw new PhysicsError('COVERAGE','Cross-section extrapolation disabled.');
    E=Math.max(range[0],Math.min(range[1],E)); // endpoint roundoff only; not extrapolation
    let i=points.findIndex(p=>p.energyKeV>=E);if(i===0)i=1;const a=points[i-1],b=points[i];
    if(a.sigmaBarn===0||b.sigmaBarn===0){const v=a.sigmaBarn+(b.sigmaBarn-a.sigmaBarn)*(E-a.energyKeV)/(b.energyKeV-a.energyKeV);return v===0?null:Math.log(v);}
    const w=Math.log(E/a.energyKeV)/Math.log(b.energyKeV/a.energyKeV);return Math.log(a.sigmaBarn)*(1-w)+Math.log(b.sigmaBarn)*w;
  }};
}
export function constantSigma(sigma:number,min:number,max:number):SigmaModel {
  nonnegative(sigma,'Constant cross section');return {name:'Declared constant cross-section benchmark (not measured nuclear data)',range:[min,max],knots:[],coverage:'declared-model',logSigma:()=>sigma===0?null:Math.log(sigma)};
}
export function constantS(S:number,z1:number,z2:number,mu:number,min:number,max:number):SigmaModel {
  positive(S,'Constant S-factor');coulombExponent(1,z1,z2,mu);
  return {name:'Declared constant-S model; not a complete experimental rate',range:[min,max],knots:[],coverage:'declared-model',logSigma:E=>Math.log(S)-Math.log(E)-coulombExponent(E,z1,z2,mu)};
}
export function thermalRate(T:number,mu:number,model:SigmaModel,min:number,max:number,rtol=1e-7) {
  classical(T,mu);positive(min,'Lower integration energy');positive(max-min,'Integration range');
  if(min<model.range[0]||max>model.range[1])throw new PhysicsError('COVERAGE','Integration range exceeds the declared data/model interval.');
  if(rtol<1e-12||rtol>1e-2)throw new PhysicsError('TOLERANCE','Choose a relative tolerance between 1e-12 and 1e-2.');
  const kT=positive(C.kB_keV*T,'Numerically resolved kT');
  const tail=(x:number)=>x>745?0:(1+x)*Math.exp(-x);
  // Integrate in log(E/kT). Jacobian adds a second power of x.
  const a=finite(Math.log(min/kT),'Normalized lower energy'),b=finite(Math.log(max/kT),'Normalized upper energy'),logs=(y:number)=>{const x=Math.exp(y),s=model.logSigma(kT*x);return s===null?null:s+2*y-x;};
  const grid=Array.from({length:257},(_,i)=>a+(b-a)*i/256);
  const ys=[...grid,...model.knots.filter(e=>e>min&&e<max).map(e=>Math.log(e/kT))];
  const vals=ys.map(logs).filter((v):v is number=>v!==null);
  if(!vals.length)return {pairRate:0,molarRate:0,relativeNumericalError:0,evaluations:ys.length,converged:true,refinementDifference:0,underflow:false,mbKernelCoverage:tail(min/kT)-tail(max/kT),warnings:['All provided cross sections are zero.','Finite energy integral only; coverage of unprovided energies is unknown.']};
  const scale=Math.max(...vals),f=(y:number)=>{const l=logs(y);return l===null?0:Math.exp(l-scale);};
  const breaks=ys.slice(1,-1),q=integrate(f,a,b,rtol,1e-13,breaks),q2=integrate(f,a,b,rtol/5,2e-14,breaks);
  if(!q.converged||!q2.converged||q2.value<=0)throw new PhysicsError('INTEGRATION','Integral is unresolved / nonconvergent. No physical rate is reported.');
  const difference=Math.abs(q2.value-q.value)/q2.value;
  if(difference>Math.max(10*rtol,1e-8))throw new PhysicsError('INTEGRATION','Refinement is unstable. Rate withheld.');
  const result=expChecked(Math.log(Math.sqrt(8*C.kB*T/(Math.PI*mu*C.u_g))*1e-24)+scale+Math.log(q2.value));
  const mol=expChecked(Math.log(C.NA)+Math.log(Math.sqrt(8*C.kB*T/(Math.PI*mu*C.u_g))*1e-24)+scale+Math.log(q2.value));
  return {pairRate:result.value,molarRate:mol.value,relativeNumericalError:q2.error/q2.value,evaluations:q.evaluations+q2.evaluations+ys.length,converged:true,refinementDifference:difference,underflow:result.underflow,
    mbKernelCoverage:tail(min/kT)-tail(max/kT),
    warnings:[model.coverage==='finite-data'?'COVERED-INTERVAL RATE ONLY. Unmeasured tails and unresolved structures are unknown; no total rate is inferred.':'Model integral over the stated energy interval. Model approximation is not included in quadrature error.',
    'The displayed MB-kernel coverage assumes constant sigma and is NOT the true reaction-rate coverage.',
    'Numerical convergence does not establish energy-grid adequacy. Unknown sub-grid resonances cannot be recovered.',...(result.underflow?['Underflow: pair-rate coefficient rounds to zero; molar rate is evaluated separately in log space.']:[])]};
}
export function parseCrossSectionCSV(text:string):CrossSectionPoint[] {
  const lines=text.trim().split(/\r?\n/).filter(l=>l.trim()&&!l.startsWith('#'));
  if(lines[0]?.toLowerCase().includes('energy'))lines.shift();
  const p=lines.map((line,i)=>{const c=line.split(/[,;\s]+/);if(c.length!==2)throw new PhysicsError('CSV',`Line ${i+1}: expected energy_keV,sigma_barn.`);return {energyKeV:Number(c[0]),sigmaBarn:Number(c[1])};});tabulatedSigma(p);return p;
}
