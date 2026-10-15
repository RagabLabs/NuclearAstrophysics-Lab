import {jsPDF} from 'jspdf';
import {reportFont} from './assets/reportFont';
import {VERSION,LIMITATION} from './physics/constants';
export interface ReportValue {label:string;value:number|string|null;unit:string;ar?:string}
export interface Snapshot {page:string;reaction:string;temperatureK:number;density:number;source:string[];model:string;equations:string[];inputs:ReportValue[];results:ReportValue[];diagnostics:string[];assumptions:string[];uncertainty:string[];warnings:string[];chartData:{series:string;x:number;y:number}[];}
export const raw=(x:number|string|null)=>x===null?'Unavailable':typeof x==='number'?x.toExponential(9):x;
export function reportLines(s:Snapshot):string[]{return [`Nuclear Astrophysics Lab v${VERSION}`,`Calculation: ${s.page}`,`Reaction: ${s.reaction}`,`Temperature: ${raw(s.temperatureK)} K`,`Density: ${raw(s.density)} g/cm3`,`Model: ${s.model}`,'',...s.source.map(x=>'Source: '+x),'','INPUTS',...s.inputs.map(r=>`${r.label}: ${raw(r.value)} ${r.unit}`),'','RESULTS',...s.results.map(r=>`${r.label}: ${raw(r.value)} ${r.unit}`),'','EQUATIONS',...s.equations,'','NUMERICAL DIAGNOSTICS',...s.diagnostics,'','UNCERTAINTY',...s.uncertainty,'','ASSUMPTIONS',...s.assumptions,'','WARNINGS',...s.warnings,'',LIMITATION];}
function download(blob:Blob,name:string){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}
function file(s:Snapshot,ext:string){return `NuclearAstrophysics-${s.page.replace(/[^a-z0-9]+/gi,'-')}-v${VERSION}.${ext}`;}
export function buildCSV(s:Snapshot){const rows:(string|number)[][]=[['section','quantity','value','unit'],['metadata','version',VERSION,''],['metadata','calculation',s.page,''],['metadata','reaction',s.reaction,''],['metadata','temperature',s.temperatureK,'K'],['metadata','density',s.density,'g/cm3'],['metadata','model',s.model,'']];
 for(const [section,values] of Object.entries({source:s.source,equations:s.equations,diagnostics:s.diagnostics,uncertainty:s.uncertainty,assumptions:s.assumptions,warnings:[...s.warnings,LIMITATION]}))for(const v of values)rows.push([section,'',v,'']);
 for(const [section,values] of [['input',s.inputs],['result',s.results]] as const)for(const v of values)rows.push([section,v.label,v.value??'Unavailable',v.unit]);
 rows.push(['chart','series','x','y']);for(const p of s.chartData)rows.push(['chart',p.series,p.x,p.y]);
 const quote=(v:string|number)=>'"'+String(v).replace(/"/g,'""')+'"';return '\uFEFF'+rows.map(r=>r.map(quote).join(',')).join('\r\n');
}
export function exportCSV(s:Snapshot){download(new Blob([buildCSV(s)],{type:'text/csv;charset=utf-8'}),file(s,'csv'));}
export function buildPDF(s:Snapshot){const pdf=new jsPDF({unit:'mm',format:'a4'});let y=24;pdf.addFileToVFS('DejaVuSans.ttf',reportFont);pdf.addFont('DejaVuSans.ttf','Report','normal');pdf.setFont('Report','normal');pdf.setFontSize(10);const clean=(t:string)=>t.replaceAll('γ','gamma').replaceAll('σ','sigma').replaceAll('μ','mu').replace(/[–—]/g,'-').replace(/[^\x20-\x7E]/g,' ');
 for(const line of reportLines(s)){const lines=pdf.splitTextToSize(clean(line),174);for(const l of lines){if(y>274||(/^(RESULTS|INPUTS|EQUATIONS|WARNINGS|ASSUMPTIONS|UNCERTAINTY|NUMERICAL DIAGNOSTICS)$/.test(l)&&y>255)){pdf.addPage();y=22;}if(/^(RESULTS|INPUTS|EQUATIONS|WARNINGS|ASSUMPTIONS|UNCERTAINTY|NUMERICAL DIAGNOSTICS)$/.test(l)){pdf.setTextColor(95,67,180);pdf.setFont('Report','normal');}else {pdf.setTextColor(38,45,63);pdf.setFont('Report','normal');}pdf.text(l,18,y);y+=5.2;}}
 const n=pdf.getNumberOfPages();for(let i=1;i<=n;i++){pdf.setPage(i);pdf.setFontSize(8);pdf.setTextColor(100);pdf.text(`Nuclear Astrophysics Lab | v${VERSION} | ${i}/${n}`,18,288);}return pdf;}
export function exportPDF(s:Snapshot){buildPDF(s).save(file(s,'pdf'));}
export async function exportPNG(s:Snapshot){const svg=document.querySelector<SVGElement>('[data-chart="true"]');if(!svg)throw new Error('Select a calculation with a chart before exporting PNG.');const copy=svg.cloneNode(true) as SVGElement;copy.setAttribute('xmlns','http://www.w3.org/2000/svg');copy.setAttribute('width','1440');copy.setAttribute('height','625');copy.style.color='#39415c';
 const src=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)],{type:'image/svg+xml'}));
 try{const img=new Image();await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=()=>reject(new Error('Chart rasterization failed.'));img.src=src;});
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable.');
 const lines:string[]=[];for(const l of reportLines(s)){let rest=l;while(rest.length>136){let i=rest.lastIndexOf(' ',136);if(i<40)i=136;lines.push(rest.slice(0,i));rest=rest.slice(i).trim();}lines.push(rest);}
 canvas.width=1500;canvas.height=710+lines.length*23;ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,30,30);ctx.fillStyle='#202941';ctx.font='16px sans-serif';lines.forEach((l,i)=>ctx.fillText(l,40,700+i*23));const b=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('PNG encoding failed.')),'image/png'));download(b,file(s,'png'));
 }finally{URL.revokeObjectURL(src);}}
