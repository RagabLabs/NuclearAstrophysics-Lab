import {C} from './constants';
import {classical,positive,nonnegative,PhysicsError,expChecked} from './validation';
export interface Resonance {energyKeV:number; strengthEV:number; widthKeV?:number; strengthErrorEV?:number; energyErrorKeV?:number; certifiedNarrow?:boolean; validT9?:[number,number];}
export function resonantRate(T:number,mu:number,r:Resonance) {
  classical(T,mu);positive(r.energyKeV,'Resonance CM energy');
  if(r.strengthEV===undefined)throw new PhysicsError('MISSING','A measured / evaluated resonance strength is required.');
  positive(r.strengthEV,'Resonance strength');const kT=C.kB_keV*T;
  if(r.validT9&&(T/1e9<r.validT9[0]||T/1e9>r.validT9[1]))throw new PhysicsError('RANGE','Temperature outside the declared isolated-resonance validity interval.');
  if(r.widthKeV===undefined&&!r.certifiedNarrow)throw new PhysicsError('WIDTH','Width or an explicitly source-certified narrow regime is required.');
  if(r.widthKeV!==undefined){positive(r.widthKeV,'Total CM width');if(r.widthKeV/kT>0.1||r.widthKeV/r.energyKeV>0.1)throw new PhysicsError('BROAD','Width is not small relative to kT or Er; narrow-resonance approximation is disabled.');}
  const logRate=1.5*Math.log(2*Math.PI/(mu*C.u_g*C.kB*T))+2*Math.log(C.hbar)+Math.log(r.strengthEV*C.eV_erg)-r.energyKeV/kT;
  const result=expChecked(logRate),sensitivity=-1.5+r.energyKeV/kT;
  if(r.strengthErrorEV!==undefined)nonnegative(r.strengthErrorEV,'Strength uncertainty');
  if(r.energyErrorKeV!==undefined)nonnegative(r.energyErrorKeV,'Energy uncertainty');
  return {pairRate:result.value,molarRate:expChecked(logRate+Math.log(C.NA)).value,logRate,sensitivity,
    strengthContribution:r.strengthErrorEV===undefined?undefined:result.value*r.strengthErrorEV/r.strengthEV,
    energyRelativeContribution:r.energyErrorKeV===undefined?undefined:r.energyErrorKeV/kT,
    underflow:result.underflow,
    warnings:['Isolated on-resonance contribution only. Does not include direct capture, broad resonance tails, interference, or other resonances.','Gamma/kT <= 0.1 is a necessary numerical screening rule, not proof of energy-independent partial widths.',...(r.widthKeV===undefined?['Total width unavailable: source classification is used, not a numerical width test.']:[]),...(result.underflow?['Underflow: coefficient rounds to zero; logarithm retained.']:[])]};
}
