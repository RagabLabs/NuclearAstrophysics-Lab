import {C} from './constants';
import {charge,positive,nonnegative,expChecked} from './validation';
export function coulombExponent(E:number,z1:number,z2:number,mu:number) {
  positive(E,'Center-of-mass energy');charge(z1);charge(z2);positive(mu,'Reduced mass');
  return 2*Math.PI*C.alpha*z1*z2*Math.sqrt(mu*C.u_g*C.c*C.c/(2*E*C.keV_erg));
}
export function sFactor(E:number,sigmaBarn:number,z1:number,z2:number,mu:number,relativeSigmaUncertainty?:number) {
  const twoPiEta=coulombExponent(E,z1,z2,mu);nonnegative(sigmaBarn,'Cross section');
  const out=sigmaBarn===0?{value:0,underflow:false}:expChecked(Math.log(sigmaBarn)+Math.log(E)+twoPiEta);
  if(relativeSigmaUncertainty!==undefined)nonnegative(relativeSigmaUncertainty,'Cross-section relative uncertainty');
  return {S:out.value,twoPiEta,eta:twoPiEta/(2*Math.PI),uncertainty:relativeSigmaUncertainty===undefined?undefined:out.value*relativeSigmaUncertainty,
    warnings:['Charged particles only. S(E) extraction does not make S constant or remove electron screening automatically.','Uncertainty shown, if supplied, includes cross-section uncertainty only; E and mu are held fixed.']};
}
