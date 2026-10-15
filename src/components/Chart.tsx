import {useId,useState} from 'react';
export interface Series {name:string;points:{x:number;y:number}[];color:string}
export function fmt(n:number|null|undefined,d=4){if(n===null||n===undefined)return '—';if(!Number.isFinite(n))return 'Unavailable';if(n===0)return '0';return Math.abs(n)<.001||Math.abs(n)>=1e4?n.toExponential(d-1):Number(n.toPrecision(d)).toString();}
export function Chart({title,series,xLabel,yLabel,logX=false,logY=false,band,lang='en'}:{title:string;series:Series[];xLabel:string;yLabel:string;logX?:boolean;logY?:boolean;band?:[number,number];lang?:string}) {
 const id=useId().replace(/:/g,''),[hover,setHover]=useState<{x:number;y:number;name:string}|null>(null),[ly,setLy]=useState(logY);
 const usable=series.map(s=>({...s,points:s.points.filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&(!logX||p.x>0)&&(!ly||p.y>0))}));
 const all=usable.flatMap(s=>s.points),tx=(x:number)=>logX?Math.log10(x):x,ty=(y:number)=>ly?Math.log10(y):y;
 if(!all.length)return <section className="chart-card"><h3>{title}</h3><p>{lang==='ar'?'لا توجد نقاط صالحة للرسم في المجال الحالي.':'No valid chart data in the current interval.'}</p></section>;
 const xmin=Math.min(...all.map(p=>tx(p.x))),xmax=Math.max(...all.map(p=>tx(p.x))),ymin=ly?Math.min(...all.map(p=>ty(p.y))):Math.min(0,...all.map(p=>p.y)),ymax=Math.max(...all.map(p=>ty(p.y)));
 const X=(x:number)=>86+(tx(x)-xmin)/(xmax-xmin||1)*620,Y=(y:number)=>272-(ty(y)-ymin)/(ymax-ymin||1)*218;
 function inspect(clientX:number,rect:DOMRect){const px=(clientX-rect.left)/rect.width*760;let nearest=all[0],distance=Number.MAX_VALUE;for(const p of all){if(Math.abs(X(p.x)-px)<distance){nearest=p;distance=Math.abs(X(p.x)-px);}}const owner=usable.find(s=>s.points.includes(nearest))!;setHover({...nearest,name:owner.name});}
 return <section className="chart-card"><div className="card-heading"><div><span className="eyebrow">{lang==='ar'?'رسم تفاعلي':'INTERACTIVE PLOT'}</span><h3>{title}</h3></div><button className={ly?'chip active':'chip'} onClick={()=>setLy(!ly)} aria-pressed={ly}>{lang==='ar'?'لوغاريتمي Y':'Log Y'}</button></div>
 <div className="chart-scroll"><svg data-chart="true" viewBox="0 0 760 330" role="img" aria-label={title} tabIndex={0} onMouseMove={e=>inspect(e.clientX,e.currentTarget.getBoundingClientRect())} onMouseLeave={()=>setHover(null)} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const s=usable[0];let i=hover?s.points.findIndex(p=>p.x===hover.x):0;i=Math.max(0,Math.min(s.points.length-1,i+(e.key==='ArrowRight'?1:-1)));setHover({...s.points[i],name:s.name});}}}>
 <title>{title}</title><desc>{xLabel} versus {yLabel}. Use left and right arrow keys to inspect the first series.</desc>
 <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={series[0].color} stopOpacity=".24"/><stop offset="100%" stopColor={series[0].color} stopOpacity="0"/></linearGradient><clipPath id={'clip'+id}><rect x="86" y="48" width="620" height="224"/></clipPath></defs>
 {Array.from({length:5},(_,i)=>{const yy=272-i*218/4,v=ymin+(ymax-ymin)*i/4;return <g key={i}><line x1="86" x2="706" y1={yy} y2={yy} stroke="currentColor" opacity=".10"/><text x="76" y={yy+4} textAnchor="end" fill="currentColor" fontSize="11">{fmt(ly?10**v:v,3)}</text></g>})}
 {Array.from({length:6},(_,i)=>{const v=xmin+(xmax-xmin)*i/5;return <text key={i} x={86+i*124} y="294" textAnchor="middle" fill="currentColor" fontSize="11">{fmt(logX?10**v:v,3)}</text>})}
 <text x="396" y="322" textAnchor="middle" fill="currentColor" fontSize="12">{xLabel}{logX?' · log scale':''}</text><text x="86" y="27" fill="currentColor" fontSize="12">{yLabel}{ly?' · log scale':''}</text>
 <g clipPath={`url(#clip${id})`}>
 {band&&<rect x={Math.max(86,X(band[0]))} y="48" width={Math.max(0,Math.min(706,X(band[1]))-Math.max(86,X(band[0])))} height="224" fill="#f8b86a" opacity=".13"/>}
 {usable.map((s,i)=>{if(!s.points.length)return null;const path=s.points.map((p,j)=>`${j?'L':'M'}${X(p.x)},${Y(p.y)}`).join(' ');return <g key={s.name}>{i===0&&!ly&&<path d={`${path} L${X(s.points.at(-1)!.x)},272 L${X(s.points[0].x)},272Z`} fill={`url(#${id})`}/>}<path d={path} fill="none" stroke={s.color} strokeWidth="2.4" strokeLinejoin="round"/>{s.points.length<65&&s.points.map((p,j)=><circle key={j} cx={X(p.x)} cy={Y(p.y)} r="2.5" fill={s.color}/>)}</g>})}
 {hover&&<><line x1={X(hover.x)} x2={X(hover.x)} y1="48" y2="272" stroke="#a99aff" strokeDasharray="4 5"/><circle cx={X(hover.x)} cy={Y(hover.y)} r="5" fill="#a99aff"/></>}
 </g></svg></div>
 <div className="legend">{series.map(s=><span key={s.name}><i style={{background:s.color}}/>{s.name}</span>)}</div><div className="readout" aria-live="polite">{hover?`${hover.name} · ${xLabel}: ${fmt(hover.x,6)} · ${yLabel}: ${fmt(hover.y,6)}`:lang==='ar'?'مرر المؤشر أو استخدم الأسهم لقراءة القيم.':'Move over the curve or use arrow keys to inspect values.'}</div>
 </section>;
}
