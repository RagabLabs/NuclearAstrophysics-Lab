/** CODATA 2022 / SI 2019, https://physics.nist.gov/cuu/Constants/Table/allascii.txt */
export const C = Object.freeze({
  kB: 1.380649e-16, // erg K^-1, exact
  eV_erg: 1.602176634e-12, // exact
  keV_erg: 1.602176634e-9,
  MeV_erg: 1.602176634e-6,
  u_g: 1.66053906892e-24,
  NA: 6.02214076e23, // mol^-1, exact
  alpha: 7.2973525643e-3,
  c: 2.99792458e10, // cm/s, exact
  hbar: 1.0545718176461565e-27, // erg s, h/(2 pi), h exact
  kB_keV: 1.380649e-16 / 1.602176634e-9,
});
export const VERSION = '1.0.0';
export const LIMITATION = 'This application provides educational and research-oriented nuclear astrophysics calculations under explicitly stated assumptions. It is not a complete stellar evolution or nucleosynthesis simulation.';
