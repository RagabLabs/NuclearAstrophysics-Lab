import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {reactions,sources,partialS,feRates,c12sets,n14sets} from '../src/data/catalog';
const checks:string[]=[];
const check=(condition:boolean,label:string)=>{if(!condition)throw new Error(label);checks.push(label);};
for(const [name,hash] of [['2hpg3he','867c226577b90d294cd2e81048232b3adc5f3b4cb9572bc3f3adcfcd35f43ee2'],['3he3he2p4he','e37e6de191af6cc768fcc22b0f0971b7e765b81a1ab4cc4b686a76ce04ed1053']]){
 const raw=readFileSync(`src/data/raw/${name}.dat`);check(createHash('sha256').update(raw.toString('utf8').replace(/\r\n/g,'\n')).digest('hex')===hash,`${name}: original source checksum`);
 const parsed=raw.toString().split(/\r?\n/).filter(l=>l.trim()&&!l.startsWith('#')).map(l=>l.trim().split(/\s+/).map(Number));
 const baked=JSON.parse(readFileSync(`src/data/${name}.json`,'utf8'));
 check(parsed.length===baked.length,`${name}: source and processed row count`);
 parsed.forEach(([T9,rate,low,high],i)=>{check([T9,rate,low,high].every(Number.isFinite)&&T9>0&&rate>0&&low<=rate&&high>=rate,`${name} row${i}: finite ordered bounds`);check(JSON.stringify({T9,rate,low,high})===JSON.stringify(baked[i]),`${name} row${i}: exact source conversion`);check(!i||T9>parsed[i-1][0],`${name} row${i}: increasing temperature`);});
}
check(new Set(reactions.map(r=>r.id)).size===reactions.length,'unique reaction identifiers');check(new Set(sources.map(r=>r.id)).size===sources.length,'unique dataset identifiers');
reactions.forEach(r=>r.datasets.forEach(id=>check(sources.some(s=>s.id===id),`${r.id}: source ${id} resolves`)));
sources.forEach(s=>check(!!s.url&&!!s.version&&!!s.status&&!!s.uncertainty&&!!s.reuse,`${s.id}: source metadata complete`));
check(c12sets.length===2&&n14sets.length===4,'REACLIB additive term count');check([...c12sets,...n14sets].every(a=>a.length===7&&a.every(Number.isFinite)),'REACLIB coefficient dimensions');
check(partialS.length===11&&partialS.every(p=>p.S>0&&p.error>0),'partial-channel S values and quoted errors');check(feRates.every(p=>p.rate>0),'KADoNiS positive published rates');
const rawSelected=readFileSync('src/data/raw/reaclib-selected.txt','utf8').trimEnd().split(/\r?\n/);
check(rawSelected.length===18,'Pinned selected REACLIB record line count');
const extracted:Record<string,number[][]>={c12:[],n14:[]};
for(let i=0;i<rawSelected.length;i+=3){const header=rawSelected[i].trim().split(/\s+/),key=header[1];const vals=(rawSelected[i+1]+rawSelected[i+2]).match(/[-+]?\d+\.\d+(?:[eE][-+]?\d+)/g)?.map(Number);if(!vals||vals.length!==7)throw new Error('REACLIB fixed-format parsing failed.');extracted[key].push(vals);}
check(JSON.stringify(extracted.c12)===JSON.stringify(c12sets)&&JSON.stringify(extracted.n14)===JSON.stringify(n14sets),'Application coefficients match hash-verified raw records');
console.log('Pinned REACLIB raw records agree with all six application coefficient sets.');

mkdirSync('reports',{recursive:true});writeFileSync('reports/data-validation.json',JSON.stringify({status:'passed',checks:checks.length,reactions:reactions.length,datasets:sources.length,checkLabels:checks},null,2)+'\n');console.log(`Data validation passed: ${checks.length} checks, ${reactions.length} reactions, ${sources.length} datasets.`);
