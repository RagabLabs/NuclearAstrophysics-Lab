import {gamowPeak} from './gamowPeak';
export function gamowWindow(T:number,z1:number,z2:number,mu:number) {
  const peak=gamowPeak(T,z1,z2,mu),width=4*Math.sqrt(peak.E0*peak.kT/3);
  return {...peak,width,low:Math.max(0,peak.E0-width/2),high:peak.E0+width/2,
    warnings:[...peak.warnings,'Width is the FULL 1/e width of the quadratic Gaussian approximation, not FWHM or a hard integration cutoff.',...(width/peak.E0>1?['Broad/asymmetric kernel: the Gaussian interval is only a rough guide.']:[])]};
}
