import {nonnegative,expChecked} from './validation';
export function reactionTimescale(partnerDensity:number,coefficient:number,type:'distinct'|'identical') {
  nonnegative(partnerDensity,'Partner / initial density');nonnegative(coefficient,'Pair-rate coefficient');
  if(partnerDensity===0||coefficient===0)return {seconds:null,kind:'no reaction',warnings:['No finite reaction timescale: density or coefficient is zero.']};
  const seconds=expChecked(-Math.log(partnerDensity)-Math.log(coefficient));
  return {seconds:seconds.value,kind:type==='identical'?'initial depletion scale':'exponential depletion scale',
    warnings:[type==='identical'?'For a+a: dn/dt=-n²<sigma v>; n(t)=n0/(1+t/tau0). tau0=1/(n0<sigma v>).':'For a+b with b a constant reservoir: dn_a/dt=-n_a n_b<sigma v>; n_a(t)=n_a0 exp(-t/tau).','This is a reaction depletion scale, not a radioactive decay half-life. Density and temperature are fixed.']};
}
