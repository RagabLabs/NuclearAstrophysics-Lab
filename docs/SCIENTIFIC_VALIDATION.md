# Scientific validation - Nuclear Astrophysics Lab v1.0.0

Generated from executed engine calls and independent analytic / published references. These are numerical model checks, not validation of a complete stellar plasma.

| # | Calculation / question | Inputs | Equation | Reference | Expected | Application | Difference | Relative difference | Test / status | Limits |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Finite-range PDF normalization: How is relative kinetic energy distributed in a classical thermal plasma? | T=15 MK; mu=.5 u; E=0 to50kT | f(E) = 2/sqrt(pi) * sqrt(E)/(kT)^(3/2) * exp(-E/kT) | Analytic gamma-distribution integral, integral f(E)dE=1; no engine-generated expected value. | 1.0000000000e+0 1 | 1.0000000000e+0 1 | 0.00000e+0 | 0.00000e+0% | tolerance=1e-8; PASS; tests/physics.test.ts | Classical nondegenerate equilibrium; finite energy normalization. |
| 2 | S(E): What S(E) corresponds to an energy-dependent charged-particle cross section? | E=100keV; sigma=1e-6barn; Z1=Z2=1; mu=1u | S(E) = sigma(E) E exp(2 pi eta); 2 pi eta = 2 pi alpha Z1 Z2 sqrt(mu c^2 / (2 E)) | Rauscher 2010 eq4,5; independently evaluated Python numeric reference using CODATA2022. | 2.2853535976e-3 keV barn | 2.2853535976e-3 keV barn | 2.60209e-18 | 1.13859e-13% | tolerance=1e-10; PASS; tests/physics.test.ts | Charged particles only. Point extraction; sigma-only error optional. |
| 3 | Gamow E0: Where does the nonresonant Coulomb-Maxwell kernel reach its maximum? | T9=.015; Z1=Z2=1; mu=.5u | EG = 2 mu c^2 (pi alpha Z1 Z2)^2; E0 = [EG (kT)^2 / 4]^(1/3) | Rauscher 2010 eq8, published rounded prefactor0.12204. | 5.8914162249e+0 keV | 5.8915053029e+0 keV | 8.90781e-5 | 1.51200e-3% | tolerance=0.00006; PASS; tests/physics.test.ts | Nonresonant, unscreened, slowly varying S. Not general resonant effective energy. |
| 4 | Full Gaussian1/e width: What is the approximate full 1/e width around the Gamow peak? | T9=.015; Z1=Z2=1; mu=.5u | Delta = 4 sqrt(E0 kT / 3); interval = [max(0,E0-Delta/2), E0+Delta/2] | Rauscher 2010 eq9, published rounded prefactor0.23682. | 6.3726895208e+0 keV | 6.3730096257e+0 keV | 3.20105e-4 | 5.02307e-3% | tolerance=0.00006; PASS; tests/physics.test.ts | Full1/e width, not FWHM or hard energy bounds. |
| 5 | Covered-interval <sigma v>: What is the cross-section-weighted thermal mean of relative speed? | T=1e8K; mu=1u; sigma(E)=1barn; E=1e-8 to1e4keV | <sigma v> = sqrt(8/(pi mu)) (kT)^(-3/2) integral sigma(E) E exp(-E/kT) dE | Independent analytic sigma*sqrt(8kT/pi mu); endpoints negligibly truncate the full integral. | 1.4550809316e-16 cm3/s | 1.4550809316e-16 cm3/s | -4.93038e-31 | 3.38839e-13% | tolerance=1e-8; PASS; tests/physics.test.ts | Declared benchmark, not measured nuclear data; finite data never implies full coverage. |
| 6 | Identical-reactant event rate: How many two-body reactions occur per volume and time? | n=2e10cm^-3; k=1e-20cm3/s | r = n1 n2 <sigma v> / (1 + delta12) | Unordered-pair counting r=n^2 k/2, analytic arithmetic. | 2.0000000000e+0 reactions/cm3/s | 2.0000000000e+0 reactions/cm3/s | 0.00000e+0 | 0.00000e+0% | tolerance=1e-12; PASS; tests/physics.test.ts | Each event consumes two reactants; homogeneous binary model. |
| 7 | Fixed-reservoir depletion scale: What is the local depletion scale under fixed conditions? | n_partner=1e20cm^-3; k=1e-22cm3/s | tau = 1 / (n_partner <sigma v>); a+a: n(t)=n0/(1+t/tau0) | Analytic solution dn_a/dt=-n_b k n_a; tau=1/(n_b k). | 1.0000000000e+2 s | 1.0000000000e+2 s | 2.27374e-13 | 2.27374e-13% | tolerance=1e-12; PASS; tests/physics.test.ts | Fixed temperature and partner reservoir. Not radioactive half-life. |
| 8 | Isolated narrow-resonance molar contribution: What is the isolated on-resonance thermal contribution? | T9=.3; mu=14/15u; Er=259.4keV; omegaGamma=.0129eV; Gamma=.96keV | <sigma v>r = (2 pi/(mu kT))^(3/2) hbar^2 (omega gamma) exp(-Er/kT) | Longland2010 eq10 rounded1.5399e11,11.605; Imbriani2005 measured CM parameters. | 5.8807947636e-1 cm3/mol/s | 5.8817872109e-1 cm3/mol/s | 9.92447e-5 | 1.68761e-2% | tolerance=0.0002; PASS; tests/physics.test.ts | On-resonance contribution only; finite-width tails/partial-width variation not included. Rounded-reference difference expected. |
| 9 | Local logarithmic temperature slope: How strongly does the reaction rate respond to temperature? | rate=7*T9^2.5; nonuniform grid [.01,.017,.03,.1,.8,1] | nu(T) = d ln(rate) / d ln(T) | Exact analytic derivative dln(7T^2.5)/dlnT=2.5. | 2.5000000000e+0 1 | 2.5000000000e+0 1 | -3.55271e-15 | 1.42109e-13% | tolerance=1e-10; PASS; tests/physics.test.ts | One-sided boundary derivatives flagged; no extrapolation. |
| 10 | Specific local energy generation: How much energy is deposited locally by the specified events? | r=1e10events/cm3/s; Edep=1MeV; rho=100g/cm3 | qV = r Edep; epsilon = qV/rho; 1 erg/g/s = 1e-4 W/kg | Exact eV-to-joule SI conversion; epsilon=r Edep/rho. 1erg/g/s=1e-4W/kg. | 1.6021766340e+2 erg/g/s | 1.6021766340e+2 erg/g/s | 0.00000e+0 | 0.00000e+0% | tolerance=1e-12; PASS; tests/physics.test.ts | Energy deposited locally is explicit. Neutrino/nonlocal losses excluded. |

## Executed checks

```json
{
  "version": "1.0.0",
  "generatedUTC": "2026-10-15T09:37:57.451Z",
  "reactions": 5,
  "datasets": 8,
  "unitTests": {
    "total": 128,
    "passed": 128,
    "failed": 0,
    "pending": 0
  },
  "browserTests": {
    "startTime": "2026-10-15T09:25:43.211Z",
    "duration": 102.21699999999987,
    "expected": 0,
    "skipped": 28,
    "unexpected": 0,
    "flaky": 0
  }
}
```

The 15 server-rendering checks do not simulate a browser. Browser checks marked skipped are not passed. Original coefficient transfer checks are not independent experimental validation.
