# Gamow models and their boundaries

The familiar peak and window derive from a Maxwell factor multiplied by leading Coulomb penetration with slowly varying S(E). Rauscher2010, https://arxiv.org/abs/1003.2802, eq8,9 gives rounded practical coefficients0.12204MeV for E0 and0.23682MeV for Delta. The implementation derives these quantities from CODATA constants, so tiny differences from rounded prefactors are expected and are reported.

Peak energy answers a location question. Width answers a local-curvature/spread question and introduces an additional Gaussian approximation. They share a physical kernel but are not alternate units or a solved rearrangement of one output.

The Gaussian full1/e width is not FWHM. For the same Gaussian, FWHM=Delta*sqrt(ln2). No conversion is silently applied. E0±Delta/2 is not an integration cutoff, probability confidence interval or claim that all relevant reactions occur there. Low-energy contributions, resonances and reaction-channel width competition can move the effective energy support.

Automatic Gamow estimates are withheld for neutron reactions and mixed/resonant reaction selections. A charged-reaction user may explicitly enable a nonresonant illustrative approximation; its result is identified as that model, not the actual effective energy of the selected total evaluation. For broad/asymmetric kernels an additional approximation warning appears.

Charged-particle entrance and exit widths can have different energy dependence. A gamma-limited or exit-channel-limited cross section need not follow the textbook entrance-barrier kernel. The real integrand sigma(E)Eexp(-E/kT), if sufficiently resolved experimental data are available, is the relevant object to inspect. No total sigma(E) grid is bundled for the selected rate-only reactions.
