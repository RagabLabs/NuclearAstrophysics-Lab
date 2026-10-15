#!/usr/bin/env python3
"""Generate an auditable scientific PDF and a sample scientific plot from executed JSON.
Requires reportlab and matplotlib; does not use or claim a browser screenshot.
"""
import csv,datetime,html,json,pathlib,textwrap
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle,getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak,KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
ROOT=pathlib.Path(__file__).resolve().parents[1]
r=json.loads((ROOT/'reports/scientific-validation.json').read_text())
data=json.loads((ROOT/'public/data/nuclear-astrophysics-v1.json').read_text())
v=json.loads((ROOT/'reports/vitest.json').read_text())
e=json.loads((ROOT/'reports/playwright.json').read_text())
d=json.loads((ROOT/'reports/data-validation.json').read_text())
out=ROOT/'output/pdf';out.mkdir(parents=True,exist_ok=True)
font='/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('DejaVu',font+'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuBold',font+'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuMono',font+'DejaVuSansMono.ttf'))
ink=colors.HexColor('#22283c');purple=colors.HexColor('#7459c7');muted=colors.HexColor('#626a82');line=colors.HexColor('#e2dfee')
styles={
 'body':ParagraphStyle('Body',fontName='DejaVu',fontSize=8.5,leading=13,textColor=ink,spaceAfter=8),
 'small':ParagraphStyle('Small',fontName='DejaVu',fontSize=7.5,leading=11,textColor=muted,spaceAfter=5),
 'key':ParagraphStyle('Key',fontName='DejaVuBold',fontSize=7.5,leading=11,textColor=purple),
 'value':ParagraphStyle('Value',fontName='DejaVu',fontSize=7.8,leading=11.5,textColor=ink),
 'title':ParagraphStyle('Title',fontName='DejaVuBold',fontSize=29,leading=35,textColor=ink,spaceAfter=18),
 'h1':ParagraphStyle('H1',fontName='DejaVuBold',fontSize=19,leading=25,textColor=ink,spaceAfter=13),
 'h2':ParagraphStyle('H2',fontName='DejaVuBold',fontSize=11,leading=16,textColor=purple,spaceBefore=8,spaceAfter=9),
 'over':ParagraphStyle('Over',fontName='DejaVuBold',fontSize=8,leading=12,textColor=purple,spaceAfter=14),
}
def P(s,style='body'):return Paragraph(html.escape(str(s)).replace('\n','<br/>'),styles[style])
def footer(c,doc):
 c.saveState();w,h=A4;c.setStrokeColor(line);c.line(43,40,w-43,40);c.setFont('DejaVu',7);c.setFillColor(muted);c.drawString(43,27,'NUCLEAR ASTROPHYSICS LAB | v1.0.0 | Scientific verification');c.drawRightString(w-43,27,f'{doc.page}');c.restoreState()
def block(rows):
 tb=Table([[P(k,'key'),P(val,'value')] for k,val in rows],colWidths=[94,415],hAlign='LEFT')
 tb.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6),('LINEBELOW',(0,0),(-1,-1),.35,line),('BACKGROUND',(0,0),(0,-1),colors.HexColor('#f5f2fc'))]));return tb
story=[Spacer(1,18),P('PROJECT 10 / SCIENTIFIC WEB APPLICATION','over'),P('Nuclear\nAstrophysics Lab','title'),P('Verification & data provenance','h1'),P('Version1.0.0 | '+r['generatedUTC'][:10]+' | Independent review package','small'),Spacer(1,15)]
story+=[P('Ten calculations. Explicit assumptions. Traceable data.','h2'),P('The source, production build, offline HTML, numerical datasets, tests and documentation are included. The application has not been published. This report separates successful executed numerical checks from browser checks that could not be executed in this environment.')]
story.append(block([
 ('Implementation','10 scientific calculators;15 navigable views; English/Arabic controls; dark/light themes; PDF/CSV/PNG exporters.'),
 ('Curated database',f"{r['reactions']} reactions; {r['datasets']} data/model records. Shared experimental input is identified; these are not eight independent evaluations."),
 ('Executed tests',f"{v['numPassedTests']}/{v['numTotalTests']} passed; {v['numFailedTests']} failed. This includes89 physics/unit/numerical checks and39 data/report/render/scenario checks."),
 ('Reference cases',f"{sum(x['status']=='PASS' for x in r['referenceCases'])}/10 pass independent analytic or rounded published reference criteria."),
 ('Data validation',f"{d['checks']} checks passed, including every original NACRE row and all six pinned REACLIB coefficient sets."),
 ('Browser status',f"{e['stats']['skipped']} desktop/mobile checks skipped;0 browser checks passed. Chromium was absent. Server rendering does not replace browser interaction or visual QA."),
 ('Build checks','npm ci, npm test, npm run typecheck, npm run validate:data and npm run build completed. Normal production and self-contained HTML builds generated.'),
 ('Main review limit','No monoenergetic total experimental sigma(E) grid is bundled. Thermal integration uses explicit mathematical models or user-provided CSV; missing tails and covariance are not invented.'),
]))
story +=[Spacer(1,17),P('This application provides educational and research-oriented nuclear astrophysics calculations under explicitly stated assumptions. It is not a complete stellar evolution or nucleosynthesis simulation.','small')]
for i,x in enumerate(r['referenceCases']):
 if i%2==0:story +=[PageBreak(),P('Calculation reference checks' if i==0 else 'Calculation reference checks / continued','h1'),P('Expected values are independent analytic limits or the stated published rounded formula. Relative differences are numerical comparisons, not experimental uncertainty.','small')]
 group=[P(f"{x['number']:02d}  {x['observable']}",'h2'),block([
 ('Question',x['question']),('Inputs',x['input']),('Equation',x['formula']),('Reference / source',x['reference']),
 ('Reference value',f"{x['expected']:.11e} {x['unit']}"),('Application value',f"{x['actual']:.11e} {x['unit']}"),
 ('Difference',f"Signed: {x['absoluteDifference']:.5e} {x['unit']}; relative absolute: {100*x['relativeDifference']:.5e}%"),
 ('Tests / result',f"{x['status']} | relative tolerance {x['tolerance']:.2e} | tests/physics.test.ts; executed reference generator scripts/validation-report.ts"),('Limits',x['limits'])]),Spacer(1,13)]
 story.append(KeepTogether(group))
story +=[PageBreak(),P('Nuclear data & source versions','h1'),P('The database JSON contains source IDs, reaction identity/products, types, ranges, values, uncertainty and missing-data status. Only small factual extracts and verified selected fit coefficients are bundled. Nuclear databases are not relabeled MIT or CC0.')]
for s in data['sources']:
 story.append(KeepTogether([P(s['name'],'h2'),P(s['version'],'small'),P(s['status']),P('Uncertainty: '+s['uncertainty'],'small'),P(s['url'],'small'),Spacer(1,7)]))
story +=[PageBreak(),P('Uncertainty & numerical interpretation','h1')]
for key,txt in [
 ('Nuclear data','NACRE low/high evaluation bounds are preserved without assigning a new confidence level. JINA fit covariance is unavailable. LUNA quoted partial-channel errors and resonance strength components remain separately identified.'),
 ('Thermal / density inputs','Temperature sensitivity is calculated, but no missing temperature or density uncertainty is fabricated. Mass-number defaults are explicit approximations. No full propagated uncertainty is available without input errors and covariance.'),
 ('Resonance record','Er=259.4+-0.3keV and Gamma=0.96+-0.05keV are CM. Strength=12.9+-0.4stat+-0.8sysmeV. Statistical and systematic rate effects are separate; width is primarily a model-validity diagnostic. User-modified parameters do not inherit measurement errors.'),
 ('Numerical integration','Embedded Gauss7-Kronrod15 quadrature in log energy, source breakpoints and a tighter second pass are required. Nonconvergence withholds the result. Numerical error excludes missing tails, unresolved structures, interpolation and model error.'),
 ('Energy accounting','Energy deposited locally is a required explicit input. Escaping neutrinos and nonlocal photon energy are excluded. If available energy is supplied, Edep cannot exceed it. The app never calculates a new mass-derived Q value.'),
 ('Correlation','A separate covariance utility requires an explicit symmetric positive-semidefinite matrix. No universal independent-input assumption is made.'),
 ('Report consistency','A shared immutable calculation snapshot supplies dashboard results and exports. Reports retain more digits than rounded dashboard cards. Sample PDF/CSV are generated from the same snapshot. The included sample PNG is a standard scientific plot generated by Python, not a browser screenshot or a claim that the browser PNG download was tested.'),
]:story +=[P(key,'h2'),P(txt)]
story +=[PageBreak(),P('Remaining verification & publication','h1'),block([
 ('Not executed','28 Playwright cases:14 scenarios on desktop/mobile, covering selector, temperature, density, units, charts, downloads, languages, themes, invalid inputs and15-page navigation. Chromium is not installed here.'),
 ('How to execute','npm ci; npx playwright install chromium; npm run build; npm run test:e2e. The CI workflow installs Chromium with dependencies and runs the same tests.'),
 ('No public release','No GitHub repository creation, source push, Pages enablement or deployment was performed. The included Pages workflow is manual-only and must be dispatched only after explicit approval.'),
 ('Offline review','Open standalone.html. Standard dist/index.html should be served over HTTP under /NuclearAstrophysics-Lab/. Browser behavior remains subject to the unexecuted checks above.'),
 ('Scope exclusions','No full reaction network, reverse rates, transport, equation of state, stellar equilibrium, composition prediction or stellar evolution.'),
 ('Complete documentation','README.md plus docs/SCIENTIFIC_METHODS.md, STELLAR_REACTION_RATES.md, GAMOW_MODELS.md, NUCLEAR_DATA_SOURCES.md, NUMERICAL_INTEGRATION.md, SCIENTIFIC_VALIDATION.md, UNCERTAINTY_POLICY.md, CALCULATION_UNIQUENESS.md, TEST_REPORT.md and KNOWN_LIMITATIONS.md.'),
])]
SimpleDocTemplate(str(out/'NuclearAstrophysics-Scientific-Verification.pdf'),pagesize=A4,rightMargin=43,leftMargin=43,topMargin=43,bottomMargin=57,title='Nuclear Astrophysics Lab - Scientific Verification',author='Nuclear Astrophysics Lab').build(story,onFirstPage=footer,onLaterPages=footer)
with (ROOT/'reports/scientific-validation.csv').open('w',newline='') as f:
 fields=['number','id','observable','question','input','formula','reference','expected','actual','unit','absoluteDifference','relativeDifference','tolerance','status','limits'];w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(r['referenceCases'])
# A traceable sample chart, with the full report context printed below.
s=json.loads((ROOT/'reports/example-analysis.json').read_text())
lines=[f"Nuclear Astrophysics Lab v1.0.0 | {s['reaction']} | {s['page']}",f"Temperature={s['temperatureK']:.9e}K | rho={s['density']}g/cm3",'MODEL: '+s['model']]
for key in ['source','inputs','results','equations','diagnostics','uncertainty','assumptions','warnings']:
 lines.append(key.upper())
 for val in s[key]:
  if isinstance(val,dict):val=f"{val['label']}: {val['value']} {val['unit']}"
  lines.extend(textwrap.wrap(str(val),128,break_long_words=True) or [''])
width=14;height=(700+len(lines)*19)/150
fig=plt.figure(figsize=(width,height),facecolor='white');ax=fig.add_axes([.09,1-620/(height*150),.84,500/(height*150)])
for i,name in enumerate(dict.fromkeys(p['series'] for p in s['chartData'])):
 pts=[p for p in s['chartData'] if p['series']==name];ax.loglog([p['x'] for p in pts],[p['y'] for p in pts],label=name,color=['#7459c7','#2c9b88','#cb8b37'][i%3],linewidth=1.7)
ax.axvline(s['temperatureK']/1e9,color='#888',linewidth=1,linestyle='--',label='Selected temperature')
ax.set_title('Evaluated thermonuclear reaction rate: '+s['reaction'],loc='left',pad=18,fontsize=15);ax.set_xlabel('Temperature T9 (GK)');ax.set_ylabel('NA <sigma v> (cm3 mol^-1 s^-1)');ax.grid(alpha=.17,which='major');ax.legend(fontsize=9,loc='upper left');ax.spines[['top','right']].set_visible(False)
fig.text(.065,1-680/(height*150),'\n'.join(lines),fontfamily='DejaVu Sans Mono',fontsize=7.4,linespacing=1.35,va='top',color='#30364b')
fig.savefig(ROOT/'reports/example-analysis.png',dpi=150,facecolor='white');plt.close(fig)
print('Scientific PDF, validation CSV and source-traceable sample plot generated.')
