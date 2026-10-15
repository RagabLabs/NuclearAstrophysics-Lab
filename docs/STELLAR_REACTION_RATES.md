# Stellar reaction rates

A pair coefficient k=<sigma v> has unitscm3/s. JINA and NACRE two-body records instead tabulate NA*k in cm3mol^-1s^-1. Dividing once by NA produces k. Multiplying densities by a molar coefficient without this conversion is wrong by the Avogadro factor. The app keeps the quantities separately named.

The volume event rate is n1*n2*k/(1+delta12). Fixed abundance heating and depletion times in the full analysis are derived only when the selected total-rate evaluation exists at the chosen temperature. An isolated resonance contribution cannot substitute silently for a total rate.

## REACLIB

The seven-coefficient representation is a sum over sets of exp(a0+a1/T9+a2*T9^(-1/3)+a3*T9^(1/3)+a4*T9+a5*T9^(5/3)+a6*lnT9). All sets of one selected rate are additive, not independent alternatives. Log-sum-exp prevents intermediate overflow and loss of small terms. The bundled C12 and N14 records come from the dated2025-03-30 JINA snapshot retained by pynucastro, with full-source SHA verification. This does not claim a current release.

N14's official original source indicatesT9<2. The app conservatively restricts both selected fits to0.01–1GK; for C12 this restriction is an application policy because a source validation interval was not recovered. It must not be read as experimentally certified coverage. Tabular NACRE-II and KADoNiS records instead use their actual tabulated ranges; log-log interpolation adds no extrapolated points.

## Neutron data

KADoNiS MACS(kT)=<sigma v>/v_T is a thermal average, not the monoenergetic sigma(E=kT). The bundled Fe56 row at kT30keV has MACS11.7±0.5mb and a separately published molar rate1.710e6cm3mol^-1s^-1. The app uses the published rates directly and does not recreate a cross-section curve or reinterpret kT as beam energy. Source neutron-speed conventions, rounding and stellar enhancement must be respected. This historical table lists SEF1.00 throughout its grid.

## Resonance record and screening

Imbriani2005 §3.3 reports CM Er259.4±0.3keV and total width0.96±0.05keV, with strength12.9±0.4stat±0.8sysmeV. The paper's opening footnote identifies proton energies as CM unless otherwise stated. The historical record is not relabeled as the newest recommendation. Later activation work in2019 provides a different measured strength; it is discussed in the source report and not mixed into this record.

The bundled narrow-resonance calculator is limited by policy toT9=.2–1 and shows Gamma/kT. At0.3GK this ratio is about0.037. It omits direct capture, interference and off-resonance tails. Longland2010 §2.3 explains why distant wings can matter even for a narrow resonance; neither the UI nor reports describe the isolated contribution as the full capture rate. Unknown strengths are rejected.

No screening enhancement, reverse rate, partition-function correction, equilibrium abundance, hydrodynamics or full nucleosynthesis network is added. These require additional physical inputs and models.
