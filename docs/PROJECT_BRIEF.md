# PROJECT 10 — NUCLEAR ASTROPHYSICS LAB
## Complete Scientific Web Application for Stellar Nuclear Reaction Rates, Thermal Distributions & Astrophysical Reaction Analysis

### المهمة إلى ChatGPT Work

أريد منك تنفيذ المشروع العاشر ضمن منظومة علمية تستهدف إنشاء **100 تطبيق ويب مستقل في الفيزياء النووية، يحتوي كل تطبيق على نحو 10 حسابات علمية متخصصة وغير مكررة، بإجمالي مستهدف 1000 حساب مختلف**.

اسم التطبيق:

**Nuclear Astrophysics Lab**

الإصدار المستهدف:

**v1.0.0**

أنت مسؤول عن البحث العلمي، ومراجعة المراجع الأصلية، وجمع البيانات النووية الفلكية، وتطوير المحرك الحسابي، وتصميم الواجهة، وتنفيذ الاختبارات المستقلة، وتصحيح الأخطاء، والتوثيق، وتجهيز الملفات للنشر على GitHub.

لا أريد خطة عمل أو نموذجًا أوليًا أو مجرد صور.

أريد تطبيق ويب علميًا حقيقيًا يعمل مباشرة من المتصفح، مع جميع الملفات المصدرية والاختبارات والتقارير.

ابدأ التنفيذ فورًا دون أسئلة غير ضرورية.

**الأولوية القصوى لصحة المعادلات، والتحقق من الوحدات، وتوثيق البيانات، وإظهار حدود صلاحية النماذج.**

---

# 1. استقلال المشروع

المشروعات السابقة:

01 — NuclearDecay Lab: النشاط الإشعاعي والتحلل مع الزمن.

02 — Nuclear Structure Lab: البنية النووية والكتل وطاقة الربط.

03 — Nuclear Reaction Lab: حركيات التفاعلات النووية.

04 — Nuclear Radiation & Spectroscopy Lab: الإشعاعات وأطياف الانبعاث.

05 — Nuclear Detection & Measurement Lab: الكشف والقياس.

06 — Radiation Shielding & Attenuation Lab: توهين الفوتونات.

07 — Neutron Physics & Moderation Lab: فيزياء النيوترونات والإبطاء.

08 — Nuclear Fission & Fission Products Lab: مردود نواتج الانشطار.

09 — Nuclear Isotope Identification Lab: تحديد النظائر من أطياف جاما.

المشروع العاشر:

**Nuclear Astrophysics Lab**

التخصص الجديد:

- توزيعات الطاقة الحرارية للجسيمات.
- معدلات التفاعلات النووية الحرارية.
- عامل S الفيزيائي الفلكي.
- نافذة جامو.
- معدلات التفاعلات لكل وحدة حجم.
- أزمنة التفاعل المميزة.
- تحليل حساسية المعدلات لدرجة الحرارة.
- مقارنة بيانات المعدلات النووية الفلكية.
- معدلات التفاعلات الرنانة.
- تقديرات الطاقة الناتجة من التفاعلات النجمية.

لا تكرر حسابات عتبة التفاعل أو الزخم أو قيمة Q الموجودة في المشروعات السابقة.

---

# 2. النطاق العلمي

يركز الإصدار الأول على التفاعلات النووية الحرارية في البلازما النجمية، باستخدام بيانات ومقاطع عرضية موثقة.

يجب التمييز بين:

- Charged-Particle Reactions.
- Neutron-Induced Reactions.
- Nonresonant Reactions.
- Narrow Resonances.
- Thermonuclear Reaction Rates.
- Reaction Rate per Unit Volume.

لا تستخدم نموذجًا واحدًا لكل أنواع التفاعلات.

لا تدّعِ محاكاة تطور النجوم بالكامل.

---

# 3. الحسابات العشرة الأساسية

## Calculation 01 — Maxwell–Boltzmann Relative Energy Distribution

**السؤال العلمي:** ما توزيع طاقات الحركة النسبية بين جسيمين في وسط حراري غير منحط؟

المدخلات:

- Temperature.
- Reduced Mass.
- Energy Range.

المخرجات:

- Relative Energy Probability Density.
- Most Probable Relative Energy.
- Mean Relative Energy.
- Normalization Check.

استخدم التوزيع المناسب لطاقة الحركة النسبية.

لا تخلط بين توزيع السرعات وتوزيع الطاقات.

وضح افتراض الاتزان الحراري الكلاسيكي.

## Calculation 02 — Astrophysical S-Factor Extraction

**السؤال العلمي:** ما قيمة العامل الفيزيائي الفلكي S(E) من مقطع عرضي مقاس لتفاعل جسيمات مشحونة؟

المدخلات:

- Reaction Charges.
- Center-of-Mass Energy.
- Cross Section.
- Reduced Mass.

المخرجات:

- S(E).
- Units.
- Coulomb Parameter.
- Uncertainty when Available.

استخدم العلاقة القياسية المناسبة:

S(E) = σ(E) E exp(2πη)

وضح حدود هذا التعريف ونطاق صلاحيته.

لا تطبق نفس الصيغة على تفاعلات النيوترونات.

لا تعتبر S(E) ثابتًا مع الطاقة إلا إذا كان هذا تقريبًا مبررًا.

## Calculation 03 — Gamow Peak Energy

**السؤال العلمي:** عند أي طاقة تقريبية تبلغ مساهمة التفاعلات غير الرنانة بين جسيمات مشحونة أقصاها في وسط حراري؟

المدخلات:

- Charges.
- Reduced Mass.
- Temperature.

المخرجات:

- Gamow Peak Energy.
- Units.
- Relevant Parameters.
- Validity Conditions.

استخدم النموذج القياسي للأنظمة غير الرنانة.

لا تطبق النتيجة تلقائيًا على تفاعل تهيمن عليه رنّات قوية.

## Calculation 04 — Gamow Window Width

**السؤال العلمي:** ما العرض التقريبي لمجال الطاقات الذي يسهم بصورة أساسية في معدل التفاعل غير الرنان؟

المدخلات:

- Temperature.
- Charges.
- Reduced Mass.

المخرجات:

- Gamow Window Width.
- Approximate Energy Interval.
- Model Assumptions.

وضح تعريف العرض المستخدم، لأن اصطلاحات عرض نافذة جامو قد تختلف.

لا تستخدم عرض النافذة بوصفه حدًا صارمًا يمنع مساهمات الطاقات خارجها.

## Calculation 05 — Maxwellian-Averaged Reaction Rate

**السؤال العلمي:** ما متوسط حاصل ضرب المقطع العرضي في السرعة ضمن توزيع حراري مناسب؟

المدخلات:

- Temperature.
- Cross Section as Function of Energy.
- Reduced Mass.
- Integration Range.

المخرجات:

- Thermally Averaged <σv>.
- Integration Diagnostics.
- Numerical Uncertainty.
- Data Coverage Warnings.

استخدم التكامل الفيزيائي الصحيح.

لا تستخدم قيمة مقطع عرضي واحدة بدل الاعتماد على الطاقة إلا إذا كان ذلك نموذجًا معلنًا ومبررًا.

يجب أن يتحقق التطبيق من كفاية مجال الطاقة للتكامل.

## Calculation 06 — Thermonuclear Reaction Rate per Unit Volume

**السؤال العلمي:** ما عدد التفاعلات المتوقع لكل وحدة حجم وزمن في وسط حراري محدد وفق معدلات التفاعل المعطاة؟

المدخلات:

- Reactant Number Densities.
- Thermally Averaged Rate.
- Reactant Identity.

المخرجات:

- Reactions per Unit Volume per Unit Time.
- Units.
- Symmetry Factor.
- Assumptions.

استخدم عامل التماثل الصحيح عند تفاعل جسيمين متماثلين.

لا تخلط بين <σv> ومعدل التفاعل الحجمي.

## Calculation 07 — Characteristic Nuclear Reaction Timescale

**السؤال العلمي:** ما الزمن المميز لاستهلاك متفاعل ضمن نموذج مبسط عند ثبات الظروف؟

المدخلات:

- Reactant Density.
- Reaction Rate Coefficient.
- Reaction Type.

المخرجات:

- Characteristic Timescale.
- Units.
- Assumptions.
- Limitations.

وضح الفرق بين الزمن المميز والعمر النصفي للتحلل الإشعاعي.

لا تعِد تقديم حسابات المشروع الأول.

لا تفترض ثبات الكثافة ودرجة الحرارة في نجم حقيقي دون توضيح.

## Calculation 08 — Narrow-Resonance Thermonuclear Rate

**السؤال العلمي:** ما مساهمة رنين نووي ضيق في معدل التفاعل الحراري وفق التقريب القياسي؟

المدخلات:

- Resonance Energy.
- Resonance Strength.
- Reduced Mass.
- Temperature.

المخرجات:

- Resonant Rate Contribution.
- Temperature Dependence.
- Model Validity.
- Uncertainty.

لا تستخدم تقريب الرنين الضيق عندما لا تتحقق شروطه.

لا تختلق Resonance Strength.

استخدم بيانات تجريبية أو تقييمية موثقة.

## Calculation 09 — Reaction-Rate Temperature Sensitivity

**السؤال العلمي:** ما حساسية معدل التفاعل لتغير درجة الحرارة؟

المدخلات:

- Reaction Rate Dataset or Model.
- Temperature Range.

المخرجات:

- Rate vs Temperature.
- Logarithmic Temperature Sensitivity.
- Local Slope.
- Numerical Diagnostics.

يمكن حساب:

d ln(rate) / d ln(T)

باستخدام طريقة عددية مستقرة أو اشتقاق تحليلي مناسب.

لا تستخدم مشتقات عددية عند حدود البيانات دون تحذير.

## Calculation 10 — Stellar Nuclear Energy Generation Rate

**السؤال العلمي:** ما معدل الطاقة الناتجة لكل وحدة كتلة أو حجم من تفاعل نووي محدد وفق معدل التفاعل والطاقة المودعة محليًا؟

المدخلات:

- Reaction Rate.
- Deposited Energy per Reaction.
- Mass Density.
- Energy-Loss Assumptions.

المخرجات:

- Energy Generation per Unit Volume.
- Energy Generation per Unit Mass.
- Units.
- Energy Accounting.
- Assumptions.

لا تعِد حساب Q-value من الكتل بوصفه وظيفة جديدة.

استخدم الطاقة المتاحة والمودعة محليًا وفق تعريف واضح.

لا تفترض أن طاقة النيوترينوات كلها تتحول إلى تسخين محلي.

---

# 4. عدم تكرار الحسابات

أنشئ:

`docs/CALCULATION_UNIQUENESS.md`

وثّق لكل وظيفة:

- Scientific Question.
- Primary Observable.
- Inputs.
- Outputs.
- Physical Model.
- Relation to Other Functions.
- Difference from Projects 01–09.

راجع خصوصًا:

- Gamow Peak Energy.
- Gamow Window Width.
- Maxwellian-Averaged Rate.
- Narrow-Resonance Rate.

يجب أن يكون لكل وظيفة ناتج أساسي مختلف.

لا تعتبر إعادة ترتيب معادلة وظيفة مستقلة دون مبرر علمي.

---

# 5. المصادر العلمية

ابدأ بمراجعة:

**JINA REACLIB**

ابحث عن المستودع والوثائق الرسمية الحالية لقاعدة معدلات التفاعلات النووية الفلكية.

**KADoNiS — Karlsruhe Astrophysical Database of Nucleosynthesis in Stars**

https://www.kadonis.org/

**IAEA Nuclear Data Services**

https://www-nds.iaea.org/

**NNDC**

https://www.nndc.bnl.gov/

**NIST CODATA**

https://physics.nist.gov/constants

**NACRE / NACRE II**

تحقق من الأوراق والبيانات الأصلية المتاحة وشروط استخدامها.

استخدم المراجع العلمية الأصلية لكل نموذج.

لا تعتبر وجود اسم قاعدة بيانات دليلًا على توافر جميع التفاعلات فيها.

---

# 6. قاعدة بيانات التفاعلات

أنشئ بنية تحتوي على:

- Reaction Identifier.
- Reactants.
- Products.
- Reaction Type.
- Energy Range.
- Temperature Range.
- Cross-Section Data.
- Reaction-Rate Data.
- Resonance Parameters when Available.
- Uncertainty.
- Source.
- Source Version.
- Data Status.

لا تختلق بيانات التفاعلات.

إذا لم تتوفر بيانات لمعدل معين، وضح ذلك.

---

# 7. وحدات القياس

ادعم:

- K.
- GK / T9.
- eV.
- keV.
- MeV.
- barns.
- cm².
- cm³/s.
- cm³ mol⁻¹ s⁻¹.
- particles/cm³.
- reactions/cm³/s.
- erg/g/s.
- W/kg.

لا تخلط بين المعدل لكل زوج من الجسيمات والمعدل المولي المستخدم في بعض قواعد البيانات.

استخدم ثابت أفوجادرو وتحويلات الوحدات بصورة صحيحة.

---

# 8. المحرك العلمي

استخدم:

- React.
- TypeScript.
- Vite.
- Vitest.
- Playwright عند توفر البيئة.

بنية مقترحة:

`src/physics/constants.ts`

`src/physics/units.ts`

`src/physics/thermalDistribution.ts`

`src/physics/sFactor.ts`

`src/physics/gamowPeak.ts`

`src/physics/gamowWindow.ts`

`src/physics/thermalRate.ts`

`src/physics/volumetricRate.ts`

`src/physics/reactionTimescale.ts`

`src/physics/resonantRate.ts`

`src/physics/temperatureSensitivity.ts`

`src/physics/energyGeneration.ts`

`src/physics/integration.ts`

`src/physics/uncertainty.ts`

`src/physics/validation.ts`

افصل المحرك عن React.

---

# 9. التكامل العددي

أريد تنفيذ تكامل عددي موثوق.

استخدم طريقة مناسبة مثل Adaptive Quadrature.

اختبر:

- Convergence.
- Integration Tolerance.
- Energy Grid Coverage.
- Narrow Resonances.
- Rapidly Varying Cross Sections.
- Underflow and Overflow.

لا تعرض نتيجة إذا كان التكامل غير مستقر.

لا تعتبر نجاح الخوارزمية العددي دليلًا على صحة النموذج الفيزيائي.

---

# 10. عدم اليقين

افصل بين:

- Cross-Section Uncertainty.
- Resonance Parameter Uncertainty.
- Temperature Uncertainty.
- Density Uncertainty.
- Numerical Integration Error.
- Model Approximation.
- Correlated Nuclear Data Uncertainty.

لا تختلق عدم يقين.

لا تفترض استقلال جميع المدخلات دون مبرر.

---

# 11. الواجهة

أريد:

- Modern Scientific Dashboard.
- Dark Mode.
- Light Mode.
- English and Arabic.
- Responsive Layout.
- Interactive Charts.
- Reaction Selector.
- Temperature Selector.
- Scientific Notation.
- Clear Units.
- Mobile Support.

كل حساب يعرض:

- Description.
- Inputs.
- Formula.
- Results.
- Units.
- Assumptions.
- Data Source.
- Uncertainty.
- Warnings.
- Export Options.

---

# 12. الصفحات المطلوبة

أنشئ:

1. Home.
2. Complete Stellar Reaction Analysis.
3. Thermal Energy Distribution.
4. Astrophysical S-Factor.
5. Gamow Peak.
6. Gamow Window.
7. Maxwellian-Averaged Rate.
8. Volumetric Reaction Rate.
9. Reaction Timescale.
10. Narrow-Resonance Rate.
11. Temperature Sensitivity.
12. Energy Generation Rate.
13. Nuclear Astrophysics Data Explorer.
14. Scientific Documentation.
15. About.

---

# 13. Complete Stellar Reaction Analysis

المستخدم يختار:

- Reaction.
- Temperature.
- Density.
- Reactant Abundances.
- Data Source.
- Model.

ثم يعرض التطبيق النتائج المتاحة.

لا تعرض نتائج تحتاج إلى بيانات غير موجودة.

لا تستخدم قيمًا افتراضية خفية.

---

# 14. الرسوم العلمية

أنشئ:

- Maxwell–Boltzmann Energy Distribution.
- S-Factor vs Energy.
- Gamow Window Visualization.
- Reaction Rate vs Temperature.
- Resonant vs Nonresonant Contribution.
- Temperature Sensitivity.
- Energy Generation vs Temperature.
- Dataset Comparison.

يجب أن تعتمد الرسوم على بيانات حقيقية أو نماذج معلنة.

لا تستخدم بيانات عشوائية.

---

# 15. الاختبارات العلمية المستقلة

اختبر:

- Maxwell–Boltzmann Normalization.
- Mean Relative Energy.
- S-Factor Units.
- Gamow Peak Reference Case.
- Gamow Window Reference Case.
- Thermal Integration.
- Identical-Reactant Symmetry Factor.
- Reaction Timescale.
- Narrow-Resonance Approximation.
- Temperature Sensitivity.
- Energy Generation Units.

استخدم حالات تحليلية وبيانات مرجعية منشورة.

لا تستخدم المحرك نفسه لتوليد جميع النتائج المتوقعة.

---

# 16. الحالات الحدية

اختبر:

- Zero Temperature.
- Negative Temperature.
- Zero Density.
- Negative Density.
- Zero Cross Section.
- Missing Energy Data.
- Energy Outside Range.
- Very Narrow Resonance.
- Very High Temperature.
- Very Low Temperature.
- Identical Reactants.
- Invalid Units.
- Missing Resonance Strength.
- Numerical Underflow.
- Numerical Overflow.

لا تعرض NaN أو Infinity.

---

# 17. حدود الاستخدام

أضف تحذيرًا:

**This application provides educational and research-oriented nuclear astrophysics calculations under explicitly stated assumptions. It is not a complete stellar evolution or nucleosynthesis simulation.**

لا تدّعِ توقع تطور النجوم أو تركيبها النهائي من هذه الحسابات وحدها.

---

# 18. التقارير

أريد:

- PDF.
- CSV.
- PNG للرسوم.

كل تقرير يتضمن:

- Reaction.
- Temperature.
- Density.
- Nuclear Data Source.
- Model.
- Equations.
- Results.
- Units.
- Uncertainty.
- Numerical Diagnostics.
- Assumptions.
- Warnings.
- Application Version.

---

# 19. التوثيق

أنشئ:

`README.md`

`docs/SCIENTIFIC_METHODS.md`

`docs/STELLAR_REACTION_RATES.md`

`docs/GAMOW_MODELS.md`

`docs/NUCLEAR_DATA_SOURCES.md`

`docs/NUMERICAL_INTEGRATION.md`

`docs/SCIENTIFIC_VALIDATION.md`

`docs/UNCERTAINTY_POLICY.md`

`docs/CALCULATION_UNIQUENESS.md`

`docs/TEST_REPORT.md`

`docs/KNOWN_LIMITATIONS.md`

`CHANGELOG.md`

أريد توثيقًا حقيقيًا.

---

# 20. الاختبارات التقنية

نفّذ:

`npm ci`

`npm test`

`npm run typecheck`

`npm run build`

واختبارات Playwright عند توفر البيئة.

اختبر:

- اختيار التفاعل.
- تغيير درجة الحرارة.
- تغيير الكثافة.
- تغيير الوحدات.
- عرض الرسوم.
- تنزيل PDF.
- تنزيل CSV.
- تنزيل PNG.
- الواجهة العربية.
- الواجهة الإنجليزية.
- الوضع الليلي.
- الوضع النهاري.
- الهاتف والكمبيوتر.

لا تعلن نجاح اختبار لم تنفذه.

---

# 21. معيار القبول

لا أقبل المشروع إذا:

- كانت بيانات التفاعلات مختلقة.
- اختلطت وحدات المعدلات.
- استُخدم نموذج جامو خارج نطاقه.
- استُخدم تقريب الرنين الضيق بصورة غير مناسبة.
- كانت نتائج التكامل غير مستقرة.
- جرى تجاهل عامل التماثل للمتفاعلات المتماثلة.
- اختلطت الطاقة الكلية بالطاقة المودعة محليًا.
- اختُلق عدم يقين.
- فشلت الاختبارات العلمية.
- لم تتطابق التقارير مع الواجهة.

---

# 22. GitHub

اسم المستودع المقترح:

**NuclearAstrophysics-Lab**

مسار GitHub Pages:

`/NuclearAstrophysics-Lab/`

أضف:

- GitHub Actions CI.
- Scientific Tests.
- Data Validation.
- Type Checking.
- Production Build.
- GitHub Pages Deployment.

لا تفترض وجود المستودع.

لا تنشر دون موافقتي الصريحة.

---

# 23. ملفات التسليم

أريد:

1. ZIP كامل للمشروع.
2. Production Build.
3. قاعدة بيانات موثقة.
4. سكربتات معالجة البيانات.
5. اختبارات علمية مستقلة.
6. اختبارات متصفح.
7. تقرير تحقق علمي.
8. تقرير مصادر البيانات.
9. تقرير عدم اليقين.
10. تقرير عدم تكرار الحسابات.
11. README.
12. CHANGELOG.
13. تعليمات GitHub.

سلّمني ملفات فعلية قابلة للتنزيل.

---

# 24. التقرير النهائي

قدّم جدولًا لكل حساب يتضمن:

- اسم الحساب.
- السؤال العلمي.
- المدخلات.
- المعادلة.
- المصدر.
- القيمة المرجعية.
- نتيجة التطبيق.
- الاختلاف.
- الاختبارات.
- حالة النجاح أو الفشل.
- حدود الاستخدام.

وقدّم إحصاءات حقيقية عن:

- عدد التفاعلات المدعومة.
- عدد مجموعات البيانات.
- عدد الاختبارات.
- عدد الاختبارات الناجحة.
- عدد الاختبارات الفاشلة.
- الاختبارات غير المنفذة.
- المشكلات المتبقية.

ممنوع اختلاق الأرقام.

---

# 25. تعليمات التنفيذ النهائية

ابدأ التنفيذ فورًا.

راجع المراجع العلمية الأصلية.

اجمع بيانات موثوقة.

أنشئ المحرك الحسابي.

نفّذ الحسابات العشرة.

طوّر واجهة احترافية.

اختبر النتائج مقابل مراجع مستقلة.

اختبر التطبيق في المتصفح.

أصلح الأخطاء المكتشفة.

جهّز ZIP كاملًا.

لا تعلن نجاح اختبارات لم تنفذها.

لا تستخدم بيانات مختلقة.

لا تعدّل أي مشروع سابق.

لا تنشر على GitHub دون موافقتي.

**النتيجة المطلوبة: Nuclear Astrophysics Lab v1.0.0 — تطبيق ويب علمي مستقل يضم 10 حسابات متخصصة في الفيزياء النووية الفلكية ومعدلات التفاعلات الحرارية، مع مصادر موثقة واختبارات علمية مستقلة وملفات جاهزة للمراجعة قبل النشر.**