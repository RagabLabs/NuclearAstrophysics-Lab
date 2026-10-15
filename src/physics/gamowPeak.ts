import {C} from './constants';
import {charge,classical,PhysicsError,finite,positive} from './validation';
export function gamowPeak(T:number,z1:number,z2:number,mu:number,regime:'nonresonant'|'resonant'|'neutron'='nonresonant') {
  if(regime!=='nonresonant')throw new PhysicsError('MODEL','Gamow approximation requires a nonresonant charged-particle model.');
  charge(z1);charge(z2);classical(T,mu);
  const EG=2*mu*C.u_g*C.c*C.c*(Math.PI*C.alpha*z1*z2)**2/C.keV_erg;
  const kT=positive(C.kB_keV*T,'Numerically resolved kT'),E0=Math.cbrt(EG)*Math.cbrt(kT/2)**2;
  finite(E0,'Gamow peak');return {E0,EG,kT,tau:3*E0/kT,
    warnings:['Slowly varying S(E), unscreened nonresonant charged particles. Not a universal effective energy for a real reaction.']};
}
