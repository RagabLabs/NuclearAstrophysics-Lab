import {it,expect,describe} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from '../src/App';
import {C} from '../src/physics/constants';
import {reaclibRate} from '../src/physics/reaclib';
import {c12sets,n14sets,reactions,sources,rateForDataset,partialS,feRates} from '../src/data/catalog';
import {calculate,defaults} from '../src/calculations';
import {reportLines,buildPDF,buildCSV} from '../src/exports';
import {pages} from '../src/content';
// Hash canonical LF content: Git normalizes the upstream CRLF tables on checkout.
// This checks the complete table bytes apart from line-ending representation.
describe('Data provenance and coefficient transfer checks',()=>{
 it.each([['2hpg3he','867c226577b90d294cd2e81048232b3adc5f3b4cb9572bc3f3adcfcd35f43ee2'],['3he3he2p4he','e37e6de191af6cc768fcc22b0f0971b7e765b81a1ab4cc4b686a76ce04ed1053']])('raw %s table matches retrieved SHA256',(file,hash)=>expect(createHash('sha256').update(readFileSync(`src/data/raw/${file}.dat`,'utf8').replace(/\r\n/g,'\n')).digest('hex')).toBe(hash));
 it('NACRE-II published dpg reference T9=.015 is .0106',()=>expect(rateForDataset('nacre-dpg',.015).rate).toBeCloseTo(.0106,14));
 it('NACRE-II published he33 reference T9=.015 is2.15e-10',()=>expect(rateForDataset('nacre-he33',.015).rate).toBeCloseTo(2.15e-10,20));
 it('Fe56 published molar rate kT=30keV is1.71e6',()=>expect(rateForDataset('kadonis-fe56',30/(C.kB_keV*1e9)).rate).toBeCloseTo(1.71e6,6));
 it('REACLIB C12 transcription-check .1GK',()=>expect(reaclibRate(.1,c12sets,[.01,1]).molarRate).toBeCloseTo(2.6295206539959592e-5,13));
 it('REACLIB N14 all4 sets are summed at1GK',()=>expect(reaclibRate(1,n14sets,[.01,1]).molarRate).toBeCloseTo(113.18559829483274,10));
 it('analytic REACLIB derivative matches small central log step',()=>{const h=1e-4,T=.1,r=reaclibRate(T,n14sets,[.01,1]);const derivative=(reaclibRate(T*Math.exp(h),n14sets,[.01,1]).logMolarRate-reaclibRate(T*Math.exp(-h),n14sets,[.01,1]).logMolarRate)/(2*h);expect(Math.abs(r.sensitivity-derivative)).toBeLessThan(1e-6);});
 it('all dataset associations resolve to sources',()=>reactions.forEach(r=>r.datasets.forEach(id=>expect(sources.find(s=>s.id===id)).toBeDefined())));
 it('partial S data are strictly energy ordered',()=>partialS.slice(1).forEach((p,i)=>expect(p.energyKeV).toBeGreaterThan(partialS[i].energyKeV)));
 it('no neutron MACS grid masquerades as sigma(E)',()=>expect(reactions.find(r=>r.id==='fe56n')!.energyRange).toBeNull());
 it('rate extrapolation disabled',()=>expect(()=>rateForDataset('nacre-dpg',100)).toThrow());
});
describe('Report and application consistency (server rendering, not browser QA)',()=>{
 it('same numeric results drive the display model and report snapshot',()=>{const r=calculate('analysis',defaults);expect(r.snapshot.results).toBe(r.metrics);expect(reportLines(r.snapshot).join('\n')).toContain(r.metrics[0].value!.toString().slice(0,3));const csv=buildCSV(r.snapshot);r.metrics.filter(m=>typeof m.value==='number').forEach(m=>expect(csv).toContain('\"'+m.value+'\",\"'+m.unit+'\"'));});
 it('missing deposited energy does not create heating',()=>expect(calculate('analysis',defaults).metrics.find(m=>m.label==='Local specific heating')!.value).toBeTypeOf('string'));
 it('invalid input does not return numeric snapshot',()=>expect(()=>calculate('thermal',{...defaults,temperature:'0'})).toThrow());
 it('neutron Gamow calculation is withheld',()=>expect(()=>calculate('peak',{...defaults,reaction:'fe56n',z1:'0',z2:'26'})).toThrow());
 it('resonance data missing for other reactions',()=>expect(()=>calculate('resonance',defaults)).toThrow());
 it('user-modified resonance is labeled',()=>expect(calculate('resonance',{...defaults,reaction:'n14p',temperature:'.3',mu:String(14/15),resStrength:'.02'}).snapshot.warnings.join()).toContain('user-supplied'));
 it('mass fraction validation rejects impossible mixtures',()=>expect(()=>calculate('analysis',{...defaults,x1:'.9',x2:'.9'})).toThrow());
 it('identical reactants use one abundance',()=>{const r=calculate('analysis',{...defaults,reaction:'he33',dataset:'nacre-he33',mu:'1.5',x1:'.5',x2:'.9',z1:'2',z2:'2'});expect(r.snapshot.warnings.join()).toContain('n1²');});
 it('PDF is a real multipage PDF and has current inputs',()=>{const r=calculate('analysis',defaults),pdf=buildPDF(r.snapshot),s=pdf.output();expect(s.startsWith('%PDF-')).toBe(true);expect(pdf.getNumberOfPages()).toBeGreaterThan(1);expect(s).toContain('/FontFile2');expect(s).toContain('DejaVuSans');});
 it.each(pages.map(p=>[p.id]))('SSR smoke page %s (does not validate browser interaction)',page=>{const html=renderToString(React.createElement(App,{startPage:page}));expect(html).toContain('Nuclear');expect(html).not.toContain('NaN');expect(html).not.toContain('Infinity');});
});
describe('Range selection and nonresonant comparison scenarios',()=>{
 it('respects a requested sensitivity temperature interval',()=>{const r=calculate('sensitivity',{...defaults,sensitivityMin:'.01',sensitivityMax:'.02'});expect(r.snapshot.chartData.every(p=>p.x>=.01&&p.x<=.02)).toBe(true);});
 it('rejects a sensitivity interval with fewer than three points',()=>expect(()=>calculate('sensitivity',{...defaults,sensitivityMin:'.0149',sensitivityMax:'.0151'})).toThrow());
 it('explicit nonresonant comparison is labeled and integrated over visible limits',()=>{const r=calculate('resonance',{...defaults,reaction:'n14p',temperature:'.3',mu:String(14/15),z1:'1',z2:'7',compareNonres:true,emax:'3000'});expect(r.series).toHaveLength(3);expect(r.snapshot.inputs.some(i=>i.label==='Comparison upper energy'&&i.value===3000)).toBe(true);expect(r.snapshot.warnings.join()).toContain('constant-S hypothesis');});
});
