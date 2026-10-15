# Nuclear Astrophysics Lab v1.0.0

Project 10 of a proposed 100-project nuclear-physics suite. An independent React / TypeScript scientific application with ten calculations, fifteen navigable views, English and Arabic controls, light/dark themes, interactive SVG charts and reproducible report exports. No earlier project was accessed or modified. Nothing has been published to GitHub or hosting.

## Open the application

**Fastest:** open `standalone.html` in a modern browser. The delivered file bundles the application, styles, data and PDF exporter, and needs no network assets or server. This environment did not contain Chromium, so browser interaction and file-download behavior remain unverified here; the browser suite is included and explicitly skipped, not counted as passed.

**Development / reproducible build:** Node 22.12+ or Node24 and npm are needed.

```bash
npm ci
npm run dev
```

Vite serves `/NuclearAstrophysics-Lab/`. Use the URL printed by Vite. To check and build:

```bash
npm test
npm run typecheck
npm run validate:data
npm run build
node scripts/make-standalone.mjs
npm run preview
```

`dist/` is the production site. HTTP serving is required for the normal Vite build; `standalone.html` is the supplied file-opening alternative. The UI has no backend, telemetry, account requirement, API key, or runtime data downloads. Language and theme are stored locally; calculation inputs stay in memory.

## الاستخدام السريع

افتح `standalone.html` مباشرة. اختر التفاعل ودرجة الحرارة ومصدر المعدل، ثم عدّل المدخلات الظاهرة. البيانات والقيم التوضيحية محددة بوضوح. لا يُحسب التسخين حتى تدخل الطاقة المودعة محليًا، ولا تُعرض نتيجة تحتاج إلى بيانات مفقودة. يمكن تغيير اللغة والمظهر وتصدير تقرير علمي بالإنجليزية إلى PDF أو CSV أو PNG. اختبارات التفاعل داخل المتصفح لم تُنفذ هنا لغياب Chromium؛ حالتها موضحة في التقارير.

## Ten scientific questions

| # | Calculation | Primary observable |
|---|---|---|
| 01 | Maxwell-Boltzmann relative energy | Probability density, mode, mean and finite-range normalization |
| 02 | S-factor extraction | Pointwise S(E) and Coulomb parameter |
| 03 | Gamow peak | Approximate nonresonant peak energy |
| 04 | Gamow window | Full Gaussian 1/e width and guide interval |
| 05 | Maxwellian average | Finite-interval pair coefficient from energy-dependent sigma(E) |
| 06 | Volumetric rate | Event count per volume/time, including identical-particle symmetry |
| 07 | Reaction timescale | Reservoir or initial quadratic-depletion scale |
| 08 | Narrow resonance | Isolated on-resonance rate contribution |
| 09 | Temperature sensitivity | Local logarithmic slope on a nonuniform log-temperature grid |
| 10 | Local energy generation | Deposited power per volume/mass, with explicit loss accounting |

The full analysis combines only available results. A tabulated total rate never creates a missing cross-section grid, resonance strength, S-factor or deposited energy.

## Data and numerical policy

Five curated reactions and eight **data/model records**, not eight independent experimental evaluations: two NACRE-II rate tables, two JINA REACLIB fits, one published Imbriani total-rate representation, one LUNA partial-channel S-factor table, one LUNA isolated resonance, and one historical KADoNiS MACS/rate table. Read `docs/NUCLEAR_DATA_SOURCES.md` and `public/data/nuclear-astrophysics-v1.json` for provenance and coverage. No monoenergetic total cross-section grid is bundled; the integration calculator accepts user CSV or explicitly declared mathematical models.

The reduced-mass defaults use `A1*A2/(A1+A2)` in u, and abundance conversion uses `A*u`. These are visible approximations. Enter an appropriate reduced mass for a precision calculation. Author-evaluated tabulated/fit rates retain their original evaluations and do not change when this auxiliary mass input changes.

The engine uses CGS internally and distinguishes `<sigma v>` in cm3/s from `NA<sigma v>` in cm3 mol^-1 s^-1. Adaptive embedded Gauss7-Kronrod15 integration is scaled in log energy, with explicit breakpoints and tighter refinement. No extrapolation of tabulated data is allowed. Finite-range convergence is not proof of missing-tail or energy-grid adequacy.

## Browser tests

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Fourteen scenarios are declared for both desktop and mobile (28 checks): reaction, temperature, density, energy/temperature units, charts, PDF/CSV/PNG downloads, Arabic/English, dark/light modes, invalid-input handling and all15 views. If Chromium is missing, they are skipped with an explicit reason. CI installs the browser and then runs them. On infrastructure with a managed preview policy, use its supported browser/preview workflow rather than bypassing it.

## Exports

PDF is generated as a file; no print-dialog workaround. CSV contains context, inputs, results, equations, units, uncertainty, numerical diagnostics, assumptions, warnings and sampled chart data. PNG rasterizes the current primary plot with the same report context below it. PDF uses English/ASCII mathematical notation with embedded DejaVu Sans for portable font metrics, even when the controls are Arabic. Full floating-point report values can have more digits than the rounded dashboard. Extra digits are numerical precision, not a nuclear-data accuracy claim.

## Project structure

- `src/physics/`: framework-independent calculation modules, units, integration and covariance utilities.
- `src/data/`: source-attributed scientific records, original small tables and pinned selected REACLIB records.
- `src/components/Chart.tsx`: interactive SVG charts, keyboard inspection and log-y control.
- `src/calculations.ts`: shared result/snapshot construction used by UI and exports.
- `tests/`: scientific, data, consistency, rendering and Playwright checks.
- `scripts/`: checksum-guarded ingestion, data validation, JSON export, reference-report generation, standalone packaging and PDF report generation.
- `docs/`, `reports/`, `output/pdf/`: real methods, numerical comparisons, machine-readable results and reports.
- `.github/workflows/`: CI and **manual-only** GitHub Pages deployment.

## Data processing

```bash
python scripts/fetch-data.py
python scripts/fetch-data.py --verify-jina
npm run export:data
npm run validate:data
npm run report:validation
```

The full JINA source is a pinned 18.7MB mirror download only during explicit ingestion; only six selected additive coefficient records are retained. Changed source checksums halt ingestion and require scientific review. Builds are offline with respect to nuclear data.

## GitHub Pages

Suggested repository: `NuclearAstrophysics-Lab`. The default base is `/NuclearAstrophysics-Lab/`. To deploy under another name, set `VITE_BASE_PATH` consistently. Hash routing avoids GitHub Pages404 errors for the15 views. Follow `docs/GITHUB_DEPLOYMENT.md`. Deployment is never automatic on push; explicitly dispatch the Pages workflow only after approving public publication.

## License and limitations

Application code: MIT, see `LICENSE`. Scientific tables are separately attributed and are not relicensed as MIT; see `THIRD_PARTY_NOTICES.md`. No database-wide redistribution permission is asserted.

This application provides educational and research-oriented nuclear astrophysics calculations under explicitly stated assumptions. It is not a complete stellar evolution or nucleosynthesis simulation.

## Regenerate the standalone verification PDF

Optional Python report dependencies are pinned in requirements-report.txt. After generating the JSON evidence with npm run report:validation, run python scripts/make-pdf-report.py. Poppler pdftoppm can render the PDFs for independent layout inspection. This Python tooling is not required to run the web application.
