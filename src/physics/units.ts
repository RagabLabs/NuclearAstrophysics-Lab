import {C} from './constants';
import {finite, PhysicsError} from './validation';
export type TemperatureUnit = 'K' | 'GK' | 'T9';
export type EnergyUnit = 'eV' | 'keV' | 'MeV';
export type CrossSectionUnit = 'barn' | 'cm2';
export type RateUnit = 'cm3/s' | 'cm3/mol/s';
function factor(unit: string, values: Record<string,number>) {
  if (!(unit in values)) throw new PhysicsError('UNIT', `Unsupported unit: ${unit}`); return values[unit];
}
export const toKelvin = (x: number, u: TemperatureUnit) => finite(finite(x,'Temperature') * factor(u,{K:1,GK:1e9,T9:1e9}),'Temperature in K');
export const toKeV = (x: number, u: EnergyUnit) => finite(finite(x,'Energy') * factor(u,{eV:1e-3,keV:1,MeV:1e3}),'Energy in keV');
export const fromKeV = (x: number, u: EnergyUnit) => finite(finite(x,'Energy') / factor(u,{eV:1e-3,keV:1,MeV:1e3}),'Converted energy');
export const toBarn = (x: number,u: CrossSectionUnit) => finite(finite(x,'Cross section') * factor(u,{barn:1,cm2:1e24}),'Cross section in barn');
export const toPairRate = (x: number,u: RateUnit) => finite(x,'Rate') * factor(u,{'cm3/s':1,'cm3/mol/s':1/C.NA});
export const toMolarRate = (x: number) => finite(x*C.NA,'Molar rate');
export const ergPerGramToWattPerKg = (x: number) => finite(x*1e-4,'W/kg');
