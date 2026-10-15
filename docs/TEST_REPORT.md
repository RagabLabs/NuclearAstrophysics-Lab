# Executed test report - v1.0.0

This report records actual commands and distinguishes unexecuted browser checks. Final scientific/unit/report suite: **128/128 passed**, 0 failed.

| Command | Status | Evidence |
|---|---|---|
| `npm ci` | PASS | {'note': 'Performed with the included package-lock.json.'} |
| `npm test` | PASS | {'passed': 128, 'failed': 0} |
| `npm run typecheck` | PASS | {} |
| `npm run validate:data` | PASS | {'checks': 382} |
| `npm run build` | PASS | {'note': 'Vite7.1.7; main chunk approximately694kB before gzip; size warning only.'} |
| `npm run build:standalone` | PASS | {'bytes': 1173346} |
| `npm run test:e2e` | SKIPPED | {'declared': 28, 'passed': 0, 'failed': 0, 'skipped': 28, 'reason': 'No installed Chromium executable. No preview server was started.'} |
| `npm run report:validation` | PASS | {'referenceCases': 10, 'passed': 10} |
| `python scripts/fetch-data.py --verify-jina` | PASS | {'note': 'Both NACRE raw tables and complete pinned JINA snapshot SHA256 verified.'} |

## Suite composition

-89 tests in tests/physics.test.ts: distributions, units, S-factor, Gamow approximations, adaptive integration, symmetry, timescales, resonance checks, logarithmic differentiation, energy accounting, covariance and extreme scales.
-39 tests in tests/data-and-reports.test.ts: source hashes/transcription, published rate entries, consistency, PDF bytes, fifteen server-rendering views and explicit analysis scenarios.
-382 additional data-validator assertions passed. These are not added to the Vitest test count.
-10 reference comparisons passed, generated in reports/scientific-validation.json and docs/SCIENTIFIC_VALIDATION.md.
-28 declared Playwright checks skipped (14 scenarios x desktop/mobile). Zero browser checks are counted as passed.

## Issues found and corrected

The initial scientific run found one endpoint-roundoff failure in tabulated thermal integration. An endpoint drift of a few ulps after log-energy conversion was mistaken for physical extrapolation. Endpoint clamping is now restricted to eight ulps and the complete suite passed after the fix. A subsequent extreme-scale review fixed the normalization integrator missing the thermal peak across an excessively wide empty interval; the bounded tail cap and low-temperature regressions passed. These initial failures do not remain in the final result.

The tsx command-line runner could not create an IPC pipe in this environment; scripts now use the equivalent node --import tsx loader, which ran successfully. No approval bypass or preview workaround was used.

## Report visual verification

All10 scientific-verification PDF pages and both example-analysis PDF pages were rendered and inspected. The example exporter now embeds DejaVu Sans to preserve font metrics across systems and keeps section headings with following content. PDF text extraction recovered every numeric sample result. The PNG sample was generated with matplotlib from the exact JSON snapshot; it is not a browser screenshot.

## Unexecuted verification

No Chromium binary or control-browser skill was available. Responsive styles, mouse/keyboard interactions, browser theme/language controls, download APIs and SVG rasterization have not been verified in a real browser. Server rendering and Node PDF generation do not replace these checks. CI installs Chromium and runs the prepared suite; no future CI result is claimed.

## Remaining issues

Browser verification is pending. Main bundle size triggers a Vite advisory (build succeeds). Data/mass/model/covariance limitations remain explicitly documented in KNOWN_LIMITATIONS.md. No failed final scientific test, type error, or production-build failure remains.
