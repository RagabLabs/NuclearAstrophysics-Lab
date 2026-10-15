# Nuclear data sources and provenance

Research/access date:2026-10-15. Application version1.0.0. The database is a dated, deliberately small selection, not a mirror of every reviewed service. Raw numerical values are never replaced with random data or interpolated synthetic measurements. Model-generated curves are labeled as such.

## Source review

| Service / study | Primary location | What was actually obtained | What is not claimed |
|---|---|---|---|
| JINA REACLIB | https://reaclib.jinaweb.org/ ; format https://reaclib.jinaweb.org/help.php?intCurrentNum=0&topic=reaclib_format | Official documentation/indexed records reviewed; direct detailed pages returned403. Selected records were retrieved from the hash-verified official pynucastro snapshot below. | Latest release, complete database coverage, recovered covariance, or experimental certification across the app interval. |
| pynucastro developer repository | https://pynucastro.github.io/pynucastro/sources.html | Developers identify their parameterizations as obtained from JINA; pinned raw data bytes and selected coefficients verified. | Rebranding evaluated JINA fits as new experiments. |
| NACRE II | https://www.astro.ulb.ac.be/nacreii/ ; Xu et al., Nucl Phys A918,61–169(2013), https://doi.org/10.1016/j.nuclphysa.2013.09.007 ; author preprint https://arxiv.org/abs/1310.7099 | Official numerical rate tables for d(p,gamma)3He and3He(3He,2p)4He, including published adopted/low/high rates. | Experimental sigma(E) grids, newly updated2026 evaluations, or a statistical confidence level assigned to every bound. |
| KADoNiS | https://www.kadonis.org/ ; accessible university page https://exp-astro.de/kadonis/selementquery.php?isotope=Fe56 | Historical Fe56 recommendation, MACS and rate table, version0.0, last review1999, underlying CFM91/CFM92 references/year1992. | Latestv1.0 recommendation or MACS as monoenergetic sigma(E). |
| IAEA NDS | https://www-nds.iaea.org/ | Reviewed the official gateway, ENDF and EXFOR roles. | That an IAEA evaluation was downloaded or bundled for these reactions. |
| NNDC | https://www.nndc.bnl.gov/endf/ | Reviewed official ENDF service information. | A complete ENDF evaluation, processed cross-section grid or resonance file was retrieved. |
| NIST CODATA | https://physics.nist.gov/cuu/Constants/Table/allascii.txt | 2022 constants and exact SI unit conversions. | All physical constants have zero uncertainty; only defined SI constants are exact. |
| Imbriani et al.2005 | https://arxiv.org/abs/nucl-ex/0509005 | Eq15 total-rate fit,11 partial-channel Table2 S points below the259keV resonance, self-consistent measured narrow-resonance parameters. | Partial S values as total cross sections or combination with a later experiment's uncertain-frame width. |
| Gyurky et al.2019 | https://arxiv.org/abs/1907.07446 | Reviewed CM/lab distinction and independent13.4±0.8meV strength. | This newer strength is substituted into the bundled2005 resonance record. |

Original NACRE(Angulo1999) is documented as predecessor; NACRE-II34 light-reaction evaluations were reviewed from the authors' publication and official site. Neither publication nor site was found to provide a general CC0 redistribution declaration. Code licensing is separate from numerical data use.

## Eight bundled records

| ID | Reaction / observable | Data / temperature or energy coverage | Uncertainty / status |
|---|---|---|---|
| nacre-dpg | 2H(p,gamma)3He total molar rate | 60 original temperature rows, T9=.001–10 | Adopted/low/high evaluation bounds. |
| nacre-he33 | 3He(3He,2p)4He total molar rate | 58 original temperature rows, T9=.003–10 | Adopted/low/high evaluation bounds. |
| jina-c12 | 12C(p,gamma)13N total-rate fit, ls09 | Two additive7-coefficient records; appT9=.01–1 | Source interval not certified; covariance unavailable. |
| jina-n14 | 14N(p,gamma)15O total-rate fit, im05 | Four additive records; sourceT9<2, appT9=.01–1 | Covariance unavailable. |
| im05-total | Same N14 total rate, original Eq15 representation | Published12-parameter fit; sourceT9<2, appT9=.01–1 |0.5% representation precision quoted by source; not a complete rate uncertainty. |
| im05-s | N14 capture to Ex6.79MeV only |11 measured S/error points, Ecm118.9–248.6keV | As-tabulated errors. No total-channel cross-section array inferred. |
| im05-res | N14 isolated resonance | Er259.4±0.3keV, Gamma0.96±0.05keV, omegaGamma12.9±0.4stat±0.8sysmeV | All CM for energy and width; app policyT9=.2–1; measured historical parameters. |
| kadonis-fe56 | 56Fe(n,gamma)57Fe MACS and total molar rate |11 rows, kT5–100keV; historicalv0.0; SEF1.00 | MACS30=11.7±0.5mb; no invented full covariance. |

These are **five reactions and eight data/model records**, not eight independent evaluations. N14 fits, partial S and resonance parameters overlap in their experimental input. There are129 tabulated total-rate rows(60+58+11),11 partial-channel S points and six REACLIB coefficient sets. There is one measured isolated resonance record. The structured JSON distinguishes absent monoenergetic cross sections with null.

## Pinned transfer provenance

- NACRE-II dpg numerical URL: https://www.astro.ulb.ac.be/nacreii/data/2hpg3he.dat .2373bytes. SHA256 `1277206c9c14817482239e5b7f053943c4674e7c2f1a7dfab0f20a9c012fea18`.
- NACRE-II he33: https://www.astro.ulb.ac.be/nacreii/data/3he3he2p4he.dat .2335bytes. SHA256 `ae753487ff5dfba39fc8dfa0341442493f0cd4145904c7bd25def7a773b8afb1`.
- JINA snapshot: https://raw.githubusercontent.com/pynucastro/pynucastro/0c22729e39bc14b0510a03f53faf92526b0a2bd6/pynucastro/data/reaclib_default2_20250330 .18,667,277bytes. SHA256 `24e1f37c502cf8521109b7dd91cb73d2d4acf38f94ffd1fe1fb1e4beec3ba862`.
- The script verifies the entire JINA source before retaining six selected3-line records in `src/data/raw/reaclib-selected.txt`; it does not retain a second full database copy. Application arrays are checked against those records.
- `scripts/fetch-data.py` refuses changed hashes rather than silently accepting new versions. `scripts/validate-data.ts` independently compares every processed NACRE row against raw bytes and checks metadata, ordering, bounds and coefficient transcription.
- `public/data/nuclear-astrophysics-v1.json` is the downloadable structured database; it contains source IDs/versions/statuses, reactions/products, charges, mass policy, ranges, rates, partial S, resonance parameters, missing-data fields and uncertainty notes.

## Reuse and notices

Application source is MIT. The pinned pynucastro BSD-3-Clause notice is retained verbatim in THIRD_PARTY_NOTICES.md. This does not automatically relicense its third-party JINA input. Small source-attributed factual numerical extracts are supplied for reproducibility. No database-wide license or public-domain claim is invented. If redistributing at scale, review the relevant database terms directly. No paper PDF or complete external website was bundled as application-owned content.
