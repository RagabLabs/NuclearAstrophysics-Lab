# Scientific methods

## Conventions

All kinetic and resonance energies are center-of-mass energies; `kT` in the neutron table is a thermal energy, not a projectile beam energy. The measured N14 resonance is259.4keV CM, not the roughly278keV laboratory proton energy. The exact SI Boltzmann constant, eV definition and Avogadro constant, and CODATA2022 u/alpha are in `src/physics/constants.ts`.

Internal units are erg, gram, cm and second. Interfaces convert eV/keV/MeV, K/GK/T9, barn/cm2 and pair/molar coefficients. The mass default `A1*A2/(A1+A2)` is a visible mass-number approximation in u. It is not a new evaluated nuclear mass. Number densities from mass fractions similarly use `rho*X/(A*u)`. This may matter for precision work; no mass-model uncertainty is invented.

## 01 Relative energy distribution

For two independent nonrelativistic Maxwellian species at the same temperature, the relative velocity is Maxwellian with reduced mass mu. Changing variables from speed to E=mu*v^2/2 cancels mu:

`f(E)=2/sqrt(pi) * E^(1/2)/(kT)^(3/2) * exp(-E/kT)`.

Its units are inverse energy. The mode is kT/2 and the mean is3kT/2. The commonly encountered maximum at kT belongs to an E*exp(-E/kT) rate weighting, not to this probability density. Normalization is checked over the supplied interval after E/kT=u^2 substitution. The negligible tail above u=12 is capped below1e-60 to prevent very long empty intervals hiding the peak. Classical/nondegenerate equilibrium is assumed; this is not an equation-of-state calculation.

## 02 S extraction

`S(E)=sigma(E)*E*exp(2*pi*eta)` with `eta=alpha*Z1*Z2*sqrt(mu*c^2/(2E))`. Cross sections in barn and E in keV give keV*barn. Evaluation is logarithmic to avoid intermediate overflow. The definition factors out the leading charged-particle Coulomb dependence; it does not prove S is constant, remove laboratory electron screening or supply a neutron analogue. The optional uncertainty is sigma-only at fixed E, mass and charges.

## 03-04 Gamow location and width

`EG=2*mu*c^2*(pi*alpha*Z1*Z2)^2`; `E0=[EG*(kT)^2/4]^(1/3)`. A local quadratic expansion gives a Gaussian `exp[-4(E-E0)^2/Delta^2]` with full1/e width `Delta=4*sqrt(E0*kT/3)`. The displayed interval is E0±Delta/2, clipped at zero. See `GAMOW_MODELS.md`. These operations have different primary observables: peak location and curvature-derived width.

## 05 Maxwellian average

`<sigma v>=sqrt(8/(pi*mu))*(kT)^(-3/2)*integral sigma(E)*E*exp(-E/kT)dE`.

With x=E/kT and y=ln(x), the engine integrates `sigma(kT*exp(y))*exp(2*y-exp(y))` and multiplies by `sqrt(8*kT/(pi*mu))*1e-24` for sigma in barn. Source knots are breakpoints. Cross sections are interpolated log-log when positive and linearly across zero values. Tables cannot be extrapolated. The returned value is explicitly a covered-interval coefficient; no unprovided tail is filled in. Constant sigma and constant S are user-declared models, never labeled measured data.

## 06 Pair counting

The event rate is `r=n1*n2*k/(1+delta12)`, k=<sigma v>. For a+a the implementation uses n1 for both factors and ignores n2: `r=n1^2*k/2`. Particle consumption is2r. For unlike species it is r per reactant. These distinctions prevent a factor-two error.

## 07 Reaction depletion

For a+b with a constant b reservoir, `dn_a/dt=-n_b*k*n_a` gives `tau=1/(n_b*k)` and exponential depletion. For a+a, `dn/dt=-n^2*k`; `n(t)=n0/(1+t/tau0)`, `tau0=1/(n0*k)`. No exponential solution is imposed on identical-reactant depletion. With zero density or k, the finite timescale is unavailable rather than displayed as Infinity. This is distinct from radioactive half-life.

## 08 Isolated narrow resonance

`k_r=(2*pi/(mu*kT))^(3/2)*hbar^2*(omega*gamma)*exp(-Er/kT)`; the molar value is NA*k_r. Er is CM and strength is energy. The original measured strength12.9meV becomes0.0129eV, not12.9eV. The LUNA record keeps statistical and systematic strength errors separate. See `STELLAR_REACTION_RATES.md`. The numerical check Gamma/kT<=0.1 and Gamma/Er<=0.1 is necessary, not a certificate of constant partial widths. The bundled example is a source-identified isolated narrow resonance restricted by application policy toT9=.2–1.

## 09 Temperature sensitivity

A local three-point Lagrange polynomial in ln(T),ln(rate) is differentiated analytically at the sample. This supports nonuniform tabular grids and exactly reproduces power-law slopes. Both endpoints use flagged one-sided stencils. The selected display uses the nearest actual derivative-grid temperature and reports that temperature; it does not silently pretend the derivative was evaluated at the user's arbitrary T. REACLIB also has a separate analytic derivative utility for verification.

## 10 Heating

`qV=r*Edep`, `epsilon=qV/rho`. OneMeV=1.602176634e-6erg and1erg/g/s=1e-4W/kg. Edep is explicitly supplied; optional available energy permits loss accounting and guards Edep<=Eavailable. A blank deposition input produces no heating estimate. Escaping neutrinos and nonlocal photons are not automatically thermalized. No mass-derived Q calculation, stellar equilibrium or reaction network is performed.

Primary references: Rauscher, Phys Rev C81,045807(2010), https://arxiv.org/abs/1003.2802; Longland et al., Nucl Phys A841,1(2010), https://arxiv.org/abs/1004.4136; CODATA2022, https://physics.nist.gov/cuu/Constants/Table/allascii.txt. Numerical/model checks are in SCIENTIFIC_VALIDATION.md.
