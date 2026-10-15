import {mkdirSync,writeFileSync} from 'node:fs';
import {sources,reactions,partialS,fe56,feRates,n14sets,c12sets,mirror,measuredResonance,sampledRates} from '../src/data/catalog';
import {C} from '../src/physics/constants';
const data={schemaVersion:'1.0.0',accessedUTC:'2026-10-15',units:{energy:'keV (center of mass unless explicitly kT)',crossSection:'barn',S:'keV barn',temperature:'GK (T9)',pairRate:'cm3/s',molarRate:'cm3 mol^-1 s^-1',numberDensity:'particles/cm3'},reactions:reactions.map(r=>({...r,crossSectionData:null,reactionRateData:r.datasets.filter(id=>!['im05-s','im05-res'].includes(id)),uncertainty:'See per-dataset record. Defaults for mu and abundance conversion use mass-number approximations.'})),sources,mirror,datasets:[
{id:'nacre-dpg',type:'evaluated-molar-rate-table',data:sampledRates('nacre-dpg')},
{id:'nacre-he33',type:'evaluated-molar-rate-table',data:sampledRates('nacre-he33')},
{id:'jina-c12',type:'reaclib-additive-fit',coefficients:c12sets,applicationT9Range:[.01,1],sourceValidity:'Not certified in retrieved metadata; application restriction is not a validation claim.'},
{id:'jina-n14',type:'reaclib-additive-fit',coefficients:n14sets,applicationT9Range:[.01,1],sourceValidity:'T9<2'},
{id:'im05-total',type:'published-analytic-fit',equation:'Imbriani2005 Eq15',parameters:[3.12,-15.193,.486,.782,-1.5,17.97,-3.32,2.11,-2.998,8.42,.0682,-4.891],applicationT9Range:[.01,1],sourceValidity:'T9<2'},
{id:'im05-s',type:'measured-partial-channel-S-factor',channel:'Capture to Ex=6.79MeV in15O only',energyRangeKeV:[118.9,248.6],data:partialS,totalCrossSections:null},
{id:'im05-res',type:'measured-isolated-resonance',data:measuredResonance,strengthSystematicErrorEV:.0008,widthErrorKeV:.05,uncertainty:'strengthErrorEV in the object is statistical only; no combined covariance assumed.'},
{id:'kadonis-fe56',type:'published-MACS-and-molar-rate',data:{...fe56,ratePoints:feRates},macsUnit:'mb',publishedRatesUnit:'1e5 cm3 mol^-1 s^-1',MACS30ErrorMb:.5,stellarEnhancementFactors:Array(11).fill(1),crossSections:null}
]};
mkdirSync('public/data',{recursive:true});writeFileSync('public/data/nuclear-astrophysics-v1.json',JSON.stringify(data,null,2)+'\n');
console.log(`Exported ${data.reactions.length} reactions and ${data.datasets.length} sourced datasets.`);
