import dpg from './2hpg3he.json';
import he33 from './3he3he2p4he.json';
import {C} from '../physics/constants';
import {RatePoint,rateInterpolation} from '../physics/temperatureSensitivity';
import {reaclibRate} from '../physics/reaclib';
import {PhysicsError} from '../physics/validation';
export interface Source {id:string;name:string;version:string;url:string;status:string;uncertainty:string;reuse:string}
export const sources:Source[]=[
 {id:'nacre-dpg',name:'NACRE II · 2H(p,gamma)3He',version:'Xu et al. 2013; official table, accessed 2026-10-15',url:'https://www.astro.ulb.ac.be/nacreii/data/2hpg3he.dat',status:'Evaluated total rate, 60 tabulated temperatures',uncertainty:'Published low/high evaluation bounds; no covariance. Not assigned a confidence level here.',reuse:'Small factual data extract; original database attribution retained. No separate open data license asserted.'},
 {id:'nacre-he33',name:'NACRE II · 3He(3He,2p)4He',version:'Xu et al. 2013; official table, accessed 2026-10-15',url:'https://www.astro.ulb.ac.be/nacreii/data/3he3he2p4he.dat',status:'Evaluated total rate, 58 tabulated temperatures',uncertainty:'Published low/high evaluation bounds; no covariance.',reuse:'Small factual data extract; original database attribution retained. No separate open data license asserted.'},
 {id:'jina-c12',name:'JINA REACLIB · ls09',version:'2025-03-30 snapshot via pynucastro; pinned 0c22729e39bc14b0510a03f53faf92526b0a2bd6',url:'https://reaclib.jinaweb.org/c12%28p%2Cg%29n13/ls09/',status:'Two additive fit sets; app interval T9=0.01–1 is a policy, source validity not certified',uncertainty:'Fit covariance and nuclear-data uncertainty unavailable.',reuse:'JINA and original study attribution; pynucastro BSD-3-Clause notice in THIRD_PARTY_NOTICES.md.'},
 {id:'jina-n14',name:'JINA REACLIB · im05',version:'2025-03-30 snapshot via pynucastro; pinned 0c22729e39bc14b0510a03f53faf92526b0a2bd6',url:'https://reaclib.jinaweb.org/n14%28p%2Cg%29o15/im05/',status:'Four additive fit sets; original fit T9<2; app T9=0.01–1',uncertainty:'Fit covariance and nuclear-data uncertainty unavailable.',reuse:'JINA and original study attribution; pynucastro BSD-3-Clause notice retained.'},
 {id:'im05-total',name:'Imbriani et al. · total rate Eq. 15',version:'arXiv:nucl-ex/0509005v1 (2005)',url:'https://arxiv.org/abs/nucl-ex/0509005',status:'Published analytical total-rate fit; T9<2; app T9=0.01–1',uncertainty:'Paper states fit precision 0.5% (representation error, not total nuclear uncertainty). No combined uncertainty assigned.',reuse:'Published numerical parameters with attribution.'},
 {id:'im05-s',name:'LUNA · 6.79 MeV capture transition',version:'Imbriani et al. 2005, Table 2; 11 points below resonance',url:'https://arxiv.org/abs/nucl-ex/0509005',status:'Measured PARTIAL-channel S factors; Ecm=118.9–248.6 keV. Not total capture.',uncertainty:'Table error bars retained as quoted; normalization/systematic covariance unavailable.',reuse:'Small numerical extract with source and channel attribution.'},
 {id:'im05-res',name:'LUNA · 259.4 keV resonance',version:'Imbriani et al. 2005 §3.3, CM energy and width',url:'https://arxiv.org/abs/nucl-ex/0509005',status:'Measured isolated resonance; app T9=0.2–1; this interval is a conservative policy, not a published guarantee',uncertainty:'Er ±0.3 keV, Gamma ±0.05 keV; strength ±0.4 stat ±0.8 systematic meV, kept separate.',reuse:'Published measured parameters with attribution.'},
 {id:'kadonis-fe56',name:'KADoNiS · 56Fe(n,gamma)57Fe',version:'Historical v0.0, last review 1999; CFM91/92; accessed 2026-10-15',url:'https://exp-astro.de/kadonis/selementquery.php?isotope=Fe56',status:'11 published MACS and molar-rate values; kT=5–100 keV; SEF=1.00 in this table',uncertainty:'MACS30=11.7±0.5 mb. No per-temperature covariance or rate confidence interval assigned.',reuse:'Small factual extract with original attribution; no separate open data license asserted.'},
];
export const mirror={url:'https://raw.githubusercontent.com/pynucastro/pynucastro/0c22729e39bc14b0510a03f53faf92526b0a2bd6/pynucastro/data/reaclib_default2_20250330',sha256:'24e1f37c502cf8521109b7dd91cb73d2d4acf38f94ffd1fe1fb1e4beec3ba862',bytes:18667277};
export const n14sets=[
 [6.73578,-4.891,0,0,0,0,0.0682], [7.65444,-2.998,0,0,0,0,-1.5],
 [20.1169,0,-15.193,-4.63975,9.73458,-9.55051,0.333333],
 [17.01,0,-15.193,-0.161954,-7.52123,-0.987565,-0.666667],
];
export const c12sets=[[17.1482,0,-13.692,-0.230881,4.44362,-3.15898,-0.666667],[17.5428,-3.77849,-5.10735,-2.24111,0.148883,0,-1.5]];
export const partialS=[
 [118.9,1.2,.1],[124.4,1.36,.12],[157,1.36,.05],[173.1,1.26,.04],[182.2,1.30,.03],[198.1,1.34,.03],[209.5,1.55,.03],[219.2,1.94,.05],[229.1,2.30,.02],[239.1,3.62,.05],[248.6,11.98,.08],
].map(([energyKeV,S,error])=>({energyKeV,S,error}));
export const fe56={kT:[5,10,15,20,25,30,40,50,60,80,100],macsMb:[11.8,9.73,10.8,11.5,11.7,11.7,11.3,10.6,9.97,8.63,7.42],rates:[7.04,8.21,11.16,13.72,15.61,17.10,19.07,20,20.60,20.59,19.80]};
export const feRates:RatePoint[]=fe56.kT.map((k,i)=>({T9:k/(C.kB_keV*1e9),rate:fe56.rates[i]*1e5}));
export const measuredResonance={energyKeV:259.4,energyErrorKeV:.3,strengthEV:.0129,strengthErrorEV:.0004,widthKeV:.96,validT9:[.2,1] as [number,number]};
export interface Reaction {id:string;label:string;reactants:[string,string];products:string[];charges:[number,number];massNumbers:[number,number];mu:number;kind:'charged'|'neutron';regime:'nonresonant'|'mixed'|'neutron';datasets:string[];defaultDataset:string;range:[number,number];energyRange:[number,number]|null;crossSectionStatus:string;resonanceStatus:string;}
export const reactions:Reaction[]=[
 {id:'dpg',label:'2H(p,γ)3He',reactants:['p','2H'],products:['3He','gamma'],charges:[1,1],massNumbers:[1,2],mu:2/3,kind:'charged',regime:'nonresonant',datasets:['nacre-dpg'],defaultDataset:'nacre-dpg',range:[.001,10],energyRange:null,crossSectionStatus:'No monoenergetic cross-section grid bundled.',resonanceStatus:'No resonance parameters bundled.'},
 {id:'he33',label:'3He(3He,2p)4He',reactants:['3He','3He'],products:['4He','p','p'],charges:[2,2],massNumbers:[3,3],mu:1.5,kind:'charged',regime:'nonresonant',datasets:['nacre-he33'],defaultDataset:'nacre-he33',range:[.003,10],energyRange:null,crossSectionStatus:'No monoenergetic cross-section grid bundled.',resonanceStatus:'No narrow resonance parameters bundled.'},
 {id:'c12p',label:'12C(p,γ)13N',reactants:['p','12C'],products:['13N','gamma'],charges:[1,6],massNumbers:[1,12],mu:12/13,kind:'charged',regime:'mixed',datasets:['jina-c12'],defaultDataset:'jina-c12',range:[.01,1],energyRange:null,crossSectionStatus:'No monoenergetic cross-section grid bundled.',resonanceStatus:'Fit terms are not measured resonance records.'},
 {id:'n14p',label:'14N(p,γ)15O',reactants:['p','14N'],products:['15O','gamma'],charges:[1,7],massNumbers:[1,14],mu:14/15,kind:'charged',regime:'mixed',datasets:['jina-n14','im05-total','im05-s','im05-res'],defaultDataset:'jina-n14',range:[.01,1],energyRange:[118.9,248.6],crossSectionStatus:'Only 11 partial-channel S factors, not total sigma(E).',resonanceStatus:'Measured CM259.4keV, Gamma0.96keV, omega gamma12.9meV.'},
 {id:'fe56n',label:'56Fe(n,γ)57Fe',reactants:['n','56Fe'],products:['57Fe','gamma'],charges:[0,26],massNumbers:[1,56],mu:56/57,kind:'neutron',regime:'neutron',datasets:['kadonis-fe56'],defaultDataset:'kadonis-fe56',range:[feRates[0].T9,feRates.at(-1)!.T9],energyRange:null,crossSectionStatus:'MACS(kT), not sigma(E). Never passed to cross-section quadrature.',resonanceStatus:'No individual resonance strength bundled.'},
];
export const sourceById=(id:string)=>sources.find(s=>s.id===id)!;
export function datasetRange(id:string):[number,number] {
 if(id==='nacre-dpg')return [dpg[0].T9,dpg.at(-1)!.T9];if(id==='nacre-he33')return [he33[0].T9,he33.at(-1)!.T9];if(id==='kadonis-fe56')return [feRates[0].T9,feRates.at(-1)!.T9];if(id==='im05-res')return [.2,1];return [.01,1];
}
export function rateForDataset(id:string,T9:number) {
 if(id==='nacre-dpg'||id==='nacre-he33'||id==='kadonis-fe56')return rateInterpolation(id==='nacre-dpg'?dpg:id==='nacre-he33'?he33:feRates,T9);
 if(id==='jina-c12'||id==='jina-n14')return {rate:reaclibRate(T9,id==='jina-c12'?c12sets:n14sets,datasetRange(id)).molarRate};
 if(id==='im05-total'){
  if(T9<.01||T9>1)throw new PhysicsError('RANGE','Published T9<2; application interval 0.01–1.');
  const t=T9,r=3.12e7*t**(-2/3)*Math.exp(-15.193*t**(-1/3)-(t/.486)**2)*(.782-1.5*t+17.97*t*t-3.32*t*t*t)+2.11e3*t**(-1.5)*Math.exp(-2.998/t)+8.42e2*t**.0682*Math.exp(-4.891/t);return {rate:r};
 }
 throw new PhysicsError('MISSING','This dataset is not a total thermonuclear rate.');
}
export function sampledRates(id:string):RatePoint[]{
 if(id==='nacre-dpg')return dpg;if(id==='nacre-he33')return he33;if(id==='kadonis-fe56')return feRates;
 const [a,b]=datasetRange(id);return Array.from({length:61},(_,i)=>{const T9=a*(b/a)**(i/60);return {T9,rate:rateForDataset(id,T9).rate};});
}
