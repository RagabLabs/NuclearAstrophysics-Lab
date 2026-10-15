import {nonnegative,finite} from './validation';
export function volumetricRate(n1:number,n2:number,coefficient:number,identical=false) {
  nonnegative(n1,'Number density 1');nonnegative(n2,'Number density 2');nonnegative(coefficient,'Pair-rate coefficient');
  const factor=identical?0.5:1,rate=finite(factor*n1*(identical?n1:n2)*coefficient,'Volumetric rate');
  return {rate,symmetryFactor:factor,consumption1:finite((identical?2:1)*rate,'Consumption rate'),
    warnings:[identical?'Identical species: n2 is ignored; r=n1²<sigma v>/2. Each event consumes two particles.':'Distinct species: r=n1 n2<sigma v>.','Homogeneous dilute plasma, binary reactions, fixed conditions; inverse reactions omitted.']};
}
