# Uncertainty policy

Unknown does not mean zero. A successful calculation is not a precision claim. These categories are kept separate:

| Category | Treatment |
|---|---|
| Measured cross section | Optional user relative sigma error; converted to S error with E,mu fixed. No invented E/cross-section covariance. |
| LUNA partial S data | Quoted Table2 errors retained; no correlation inferred. These are partial-channel data only. |
| LUNA resonance strength | Statistical0.4meV and systematic0.8meV effects on rate reported separately. |
| Resonance energy | Quoted0.3keV contribution |dlnk/dEr|*dEr=dEr/kT reported separately. |
| Resonance width | Quoted0.05keV retained as source metadata; width is a validity diagnostic, not an independent multiplicative error in the narrow formula. |
| Temperature | Sensitivity dln(rate)/dlnT is provided; no missing temperature error is invented. |
| Density/abundance | Dependence is explicit; no density or abundance uncertainty has been supplied. |
| Tabular rate evaluations | Published low/high bounds retained, not silently relabeled1sigma or probability intervals. |
| JINA fits | No fit covariance or total nuclear-data uncertainty recovered. |
| Quadrature | Relative embedded estimate and tighter-pass difference reported independently. |
| Model approximation | Screening, degeneracy, mass-number default, finite tails and narrow/nonresonant approximations described but unquantified. |
| Correlated nuclear data | No independent-input assumption; optional generic engine utility requires an explicit symmetric positive-semidefinite covariance matrix. |

The covariance utility computes sqrt(g^T C g), validates dimensions, symmetry and positive-semidefiniteness with an LDL decomposition, and tests fully correlated, anticorrelated and invalid examples. It is available in the engine; the dashboard does not invent a covariance matrix for a source.

For independent supplied uncertainties one could construct a diagonal covariance matrix, but that is an explicit user modeling choice. The default scientific reports do not combine the quoted nuclear, thermal and density uncertainties. Modified resonance parameters are labeled user-supplied and do not inherit the original measurement's uncertainties.

NACRE-II evaluation bounds and the Imbriani parameterization's0.5% representation precision describe different uncertainty concepts. Neither is combined with numerical integration error or promoted to universal nuclear-data accuracy.
