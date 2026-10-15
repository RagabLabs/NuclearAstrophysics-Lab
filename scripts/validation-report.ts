import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {C,VERSION} from '../src/physics/constants';
import {thermalDistribution} from '../src/physics/thermalDistribution';
import {sFactor} from '../src/physics/sFactor';
import {gamowPeak} from '../src/physics/gamowPeak';
import {gamowWindow} from '../src/physics/gamowWindow';
import {thermalRate,constantSigma} from '../src/physics/thermalRate';
import {volumetricRate} from '../src/physics/volumetricRate';
import {reactionTimescale} from '../src/physics/reactionTimescale';
import {resonantRate} from '../src/physics/resonantRate';
import {temperatureSensitivity} from '../src/physics/temperatureSensitivity';
import {energyGeneration} from '../src/physics/energyGeneration';
import {reactions,sources} from '../src/data/catalog';
import {calcText} from '../src/content';
import {calculate,defaults} from '../src/calculations';
import {buildPDF,buildCSV} from '../src/exports';
const refs=[
 {id:'thermal',observable:'Finite-range PDF normalization',input:'T=15 MK; mu=.5 u; E=0 to50kT',expected:1,actual:thermalDistribution(1.5e7,.5,0,50*C.kB_keV*1.5e7).normalization,unit:'1',tolerance:1e-8,reference:'Analytic gamma-distribution integral, integral f(E)dE=1; no engine-generated expected value.',limits:'Classical nondegenerate equilibrium; finite energy normalization.'},
 {id:'sfactor',observable:'S(E)',input:'E=100keV; sigma=1e-6barn; Z1=Z2=1; mu=1u',expected:.0022853535975897294,actual:sFactor(100,1e-6,1,1,1).S,unit:'keV barn',tolerance:1e-10,reference:'Rauscher 2010 eq4,5; independently evaluated Python numeric reference using CODATA2022.',limits:'Charged particles only. Point extraction; sigma-only error optional.'},
 {id:'peak',observable:'Gamow E0',input:'T9=.015; Z1=Z2=1; mu=.5u',expected:1000*.12204*(.5*.015**2)**(1/3),actual:gamowPeak(1.5e7,1,1,.5).E0,unit:'keV',tolerance:6e-5,reference:'Rauscher 2010 eq8, published rounded prefactor0.12204.',limits:'Nonresonant, unscreened, slowly varying S. Not general resonant effective energy.'},
 {id:'window',observable:'Full Gaussian1/e width',input:'T9=.015; Z1=Z2=1; mu=.5u',expected:1000*.23682*(.5*.015**5)**(1/6),actual:gamowWindow(1.5e7,1,1,.5).width,unit:'keV',tolerance:6e-5,reference:'Rauscher 2010 eq9, published rounded prefactor0.23682.',limits:'Full1/e width, not FWHM or hard energy bounds.'},
 {id:'rate',observable:'Covered-interval <sigma v>',input:'T=1e8K; mu=1u; sigma(E)=1barn; E=1e-8 to1e4keV',expected:1.4550809315995344e-16,actual:thermalRate(1e8,1,constantSigma(1,1e-8,1e4),1e-8,1e4).pairRate,unit:'cm3/s',tolerance:1e-8,reference:'Independent analytic sigma*sqrt(8kT/pi mu); endpoints negligibly truncate the full integral.',limits:'Declared benchmark, not measured nuclear data; finite data never implies full coverage.'},
 {id:'volume',observable:'Identical-reactant event rate',input:'n=2e10cm^-3; k=1e-20cm3/s',expected:2,actual:volumetricRate(2e10,999,1e-20,true).rate,unit:'reactions/cm3/s',tolerance:1e-12,reference:'Unordered-pair counting r=n^2 k/2, analytic arithmetic.',limits:'Each event consumes two reactants; homogeneous binary model.'},
 {id:'timescale',observable:'Fixed-reservoir depletion scale',input:'n_partner=1e20cm^-3; k=1e-22cm3/s',expected:100,actual:reactionTimescale(1e20,1e-22,'distinct').seconds!,unit:'s',tolerance:1e-12,reference:'Analytic solution dn_a/dt=-n_b k n_a; tau=1/(n_b k).',limits:'Fixed temperature and partner reservoir. Not radioactive half-life.'},
 {id:'resonance',observable:'Isolated narrow-resonance molar contribution',input:'T9=.3; mu=14/15u; Er=259.4keV; omegaGamma=.0129eV; Gamma=.96keV',expected:.5880794763602264,actual:resonantRate(3e8,14/15,{energyKeV:259.4,strengthEV:.0129,widthKeV:.96}).molarRate,unit:'cm3/mol/s',tolerance:2e-4,reference:'Longland2010 eq10 rounded1.5399e11,11.605; Imbriani2005 measured CM parameters.',limits:'On-resonance contribution only; finite-width tails/partial-width variation not included. Rounded-reference difference expected.'},
 {id:'sensitivity',observable:'Local logarithmic temperature slope',input:'rate=7*T9^2.5; nonuniform grid [.01,.017,.03,.1,.8,1]',expected:2.5,actual:temperatureSensitivity([.01,.017,.03,.1,.8,1].map(T9=>({T9,rate:7*T9**2.5})))[2].sensitivity,unit:'1',tolerance:1e-10,reference:'Exact analytic derivative dln(7T^2.5)/dlnT=2.5.',limits:'One-sided boundary derivatives flagged; no extrapolation.'},
 {id:'energy',observable:'Specific local energy generation',input:'r=1e10events/cm3/s; Edep=1MeV; rho=100g/cm3',expected:160.2176634,actual:energyGeneration(1e10,1,100).ergGS,unit:'erg/g/s',tolerance:1e-12,reference:'Exact eV-to-joule SI conversion; epsilon=r Edep/rho. 1erg/g/s=1e-4W/kg.',limits:'Energy deposited locally is explicit. Neutrino/nonlocal losses excluded.'},
].map((r,i)=>({...r,number:i+1,question:calcText[r.id].question,formula:calcText[r.id].formula,relativeDifference:Math.abs(r.actual-r.expected)/Math.abs(r.expected),absoluteDifference:r.actual-r.expected,status:Math.abs(r.actual-r.expected)/Math.abs(r.expected)<=r.tolerance?'PASS':'FAIL'}));
let vitest:any=null,e2e:any=null;try{vitest=JSON.parse(readFileSync('reports/vitest.json','utf8'));}catch{}try{e2e=JSON.parse(readFileSync('reports/playwright.json','utf8'));}catch{}
const report={version:VERSION,generatedUTC:new Date().toISOString(),reactions:reactions.length,datasets:sources.length,unitTests:vitest?{total:vitest.numTotalTests,passed:vitest.numPassedTests,failed:vitest.numFailedTests,pending:vitest.numPendingTests}:null,browserTests:e2e?.stats??null,referenceCases:refs};
mkdirSync('reports',{recursive:true});writeFileSync('reports/scientific-validation.json',JSON.stringify(report,null,2)+'\n');
let md='# Scientific validation - Nuclear Astrophysics Lab v'+VERSION+'\n\nGenerated from executed engine calls and independent analytic / published references. These are numerical model checks, not validation of a complete stellar plasma.\n\n';
md+='| # | Calculation / question | Inputs | Equation | Reference | Expected | Application | Difference | Relative difference | Test / status | Limits |\n|---|---|---|---|---|---|---|---|---|---|---|\n';
for(const r of refs)md+=`| ${r.number} | ${r.observable}: ${r.question} | ${r.input} | ${r.formula} | ${r.reference} | ${r.expected.toExponential(10)} ${r.unit} | ${r.actual.toExponential(10)} ${r.unit} | ${r.absoluteDifference.toExponential(5)} | ${(100*r.relativeDifference).toExponential(5)}% | tolerance=${r.tolerance}; ${r.status}; tests/physics.test.ts | ${r.limits} |\n`;
md+='\n## Executed checks\n\n```json\n'+JSON.stringify({...report,referenceCases:undefined},null,2)+'\n```\n\nThe 15 server-rendering checks do not simulate a browser. Browser checks marked skipped are not passed. Original coefficient transfer checks are not independent experimental validation.\n';
writeFileSync('docs/SCIENTIFIC_VALIDATION.md',md);
writeFileSync('reports/example-analysis.json',JSON.stringify(calculate('analysis',{...defaults,deposited:'1',available:'1.5'}).snapshot,null,2)+'\n');
writeFileSync('reports/example-analysis.csv',buildCSV(calculate('analysis',{...defaults,deposited:'1',available:'1.5'}).snapshot));
if(process.argv.includes('--pdf')){mkdirSync('output/pdf',{recursive:true});writeFileSync('output/pdf/example-analysis.pdf',Buffer.from(buildPDF(calculate('analysis',{...defaults,deposited:'1',available:'1.5'}).snapshot).output('arraybuffer')));}
console.log(`Reference checks: ${refs.filter(r=>r.status==='PASS').length}/${refs.length}; unit tests ${vitest?.numPassedTests??'not read'}/${vitest?.numTotalTests??'not read'}.`);
if(refs.some(r=>r.status!=='PASS'))process.exitCode=1;
