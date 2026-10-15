export class PhysicsError extends Error {
  constructor(public code: string, message: string) { super(message); this.name = 'PhysicsError'; }
}
export function finite(x: number, name: string): number {
  if (!Number.isFinite(x)) throw new PhysicsError('NONFINITE', `${name} must be finite.`);
  return x;
}
export function positive(x: number, name: string): number {
  finite(x, name); if (x <= 0) throw new PhysicsError('NONPOSITIVE', `${name} must be greater than zero.`); return x;
}
export function nonnegative(x: number, name: string): number {
  finite(x, name); if (x < 0) throw new PhysicsError('NEGATIVE', `${name} cannot be negative.`); return x;
}
export function charge(z: number): number {
  positive(z, 'Charge'); if (!Number.isInteger(z)) throw new PhysicsError('CHARGE', 'Nuclear charges must be positive integers. Charged-particle model excludes neutrons.'); return z;
}
export function expChecked(log: number): {value: number; underflow: boolean} {
  finite(log, 'Logarithm of result');
  if (log > Math.log(Number.MAX_VALUE)) throw new PhysicsError('OVERFLOW', 'Result exceeds floating-point range. Change the inputs.');
  const value = Math.exp(log); return {value, underflow: value === 0};
}
export function classical(T: number, mu: number) {
  positive(T, 'Temperature'); positive(mu, 'Reduced mass');
  if (T / mu > 1.080954e11) throw new PhysicsError('RELATIVISTIC', 'kT exceeds 1% of reduced rest energy: this nonrelativistic model is disabled.');
}
