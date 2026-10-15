import {C} from './constants';
import {classical, nonnegative, positive, PhysicsError, expChecked} from './validation';
import {integrate} from './integration';
export function mbDensity(E:number,T:number):number {
  nonnegative(E,'Relative energy');positive(T,'Temperature');const kT=positive(C.kB_keV*T,'Numerically resolved kT'),x=E/kT;
  if(E===0||!Number.isFinite(x))return 0;
  return expChecked(Math.log(2/Math.sqrt(Math.PI))+.5*Math.log(E)-1.5*Math.log(kT)-x).value;
}
export function thermalDistribution(T:number,mu:number,min:number,max:number) {
  classical(T,mu);nonnegative(min,'Minimum energy');positive(max-min,'Energy interval');
  const kT=positive(C.kB_keV*T,'Numerically resolved kT');
  // Substitution E/kT = u^2 removes the square-root endpoint.
  const ua=Math.min(12,Math.sqrt(min/kT)),ub=Math.min(12,Math.sqrt(max/kT));
  // Tail above u=12 is below 1e-60; cap prevents a huge empty interval hiding the thermal peak.
  const norm=ub===ua?{value:0,error:1e-60,converged:true}:integrate(u=>4/Math.sqrt(Math.PI)*u*u*Math.exp(-u*u),ua,ub);
  if(!norm.converged)throw new PhysicsError('INTEGRATION','Normalization integral did not converge.');
  return {kT,mode:kT/2,mean:1.5*kT,normalization:norm.value,error:norm.error,
    speedScale:Math.sqrt(2*C.kB*T/(mu*C.u_g)),
    warnings:['Classical, nondegenerate thermal equilibrium; distribution is for relative ENERGY. At fixed T it is independent of reduced mass.','Normalization refers to the selected finite interval.']};
}
