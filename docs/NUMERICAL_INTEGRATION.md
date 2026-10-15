# Numerical integration

`src/physics/integration.ts` implements embedded Gauss7-Kronrod15 quadrature. It starts with32 panels plus declared breakpoints, sums absolute embedded error estimates, repeatedly subdivides the worst panel and stops when error<=max(atol,rtol*abs(integral)). Exhausting the budget returns converged=false. Nonfinite integrands throw.

Thermal integration uses log-energy coordinates and subtracts a sampled maximum log integrand before exponentiation. An independent tighter pass at rtol/5 is required; excessive refinement disagreement or nonconvergence withholds the rate. Pair and molar values are separately evaluated in log space so an underflowed pair coefficient cannot incorrectly erase a representable molar coefficient. Runtime tolerances are restricted to1e-12–1e-2 to prevent meaningless precision requests.

A cross-section grid supplies all interpolation knots as breakpoints. Positive data use log-log interpolation; zero endpoints use a linear bridge. Only up to eight floating-point ulps at endpoints are clamped to the endpoint; this fixes log-coordinate roundoff without allowing physical extrapolation. Integration bounds must lie within the declared grid/model domain.

## Coverage is a separate issue

No black-box adaptive integrator can guarantee discovery of an unknown feature narrower than every sampling gap. The narrow Lorentzian benchmark therefore supplies its known center and width-scale breakpoints. Cross sections sampled on a coarse grid may conceal narrow resonances, regardless of reported quadrature convergence.

Finite data report a **covered-interval coefficient**, never an inferred total coefficient. The separate constant-sigma Maxwell-kernel coverage is analytically `(1+a)exp(-a)-(1+b)exp(-b)` for a=Emin/kT,b=Emax/kT. It is explicitly not actual reaction-rate coverage. There is no invented estimate of unmeasured tails. A user-declared constant-S or constant-sigma model is evaluated only over its stated interval, with an unquantified model approximation.

## Executed references

The unit suite checks a polynomial antiderivative, a rapidly varying Gaussian, a width1e-7 Lorentzian with known breakpoints, constant sigma with an exact finite-interval antiderivative, a1/v model with constant sigma*v, constant-S refinement, duplicate/missing grids, extrapolation refusal, nonfinite integrands and exhausted budgets. MB normalization removes the square-root endpoint by E/kT=u^2 and caps only a bounded negligible tail. Very low-temperature regression cases ensure a long empty interval cannot hide the thermal peak.

Numerical error is an estimate of quadrature error under the supplied function. It excludes nuclear data, grid resolution, interpolation, tails and model error. The report does not present it as a complete uncertainty.
