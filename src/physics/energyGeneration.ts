import {C} from './constants';
import {nonnegative,positive,finite,PhysicsError} from './validation';
export function energyGeneration(events:number,depositedMeV:number,rho:number,totalAvailableMeV?:number) {
  nonnegative(events,'Reaction rate');nonnegative(depositedMeV,'Locally deposited energy');positive(rho,'Mass density');
  if(totalAvailableMeV!==undefined){nonnegative(totalAvailableMeV,'Available energy');if(depositedMeV>totalAvailableMeV)throw new PhysicsError('ENERGY','Deposited energy exceeds declared available energy.');}
  const volume=finite(events*depositedMeV*C.MeV_erg,'Power density'),specific=finite(volume/rho,'Specific energy generation');
  return {ergCm3S:volume,ergGS:specific,wKg:specific*1e-4,lossMeV:totalAvailableMeV===undefined?null:totalAvailableMeV-depositedMeV,
    warnings:['Deposited energy is an explicit input, not Q calculated from masses. Exclude escaping neutrinos and any nonlocal photon energy.','Single-channel local heating only; no reaction network, transport, hydrostatic equilibrium, or stellar evolution.']};
}
