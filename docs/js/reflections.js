// "Moments of reflection": papers that changed how the field does research.
// Each entry: tag (backward | forward | inward | elsewhere), question, found, changed, cite, url, optional chips.
// Keep claims conservative; double-check numbers against the papers before adding new ones.
window.REFLECTIONS = [
  {
    tag: "Looking backward",
    question: "Most defenses in a top ML venue were broken within months, by the same trick.",
    found: "Athalye, Carlini and Wagner showed that many adversarial-example defenses accepted at ICLR 2018 only looked robust because they obfuscated gradients. Adapted attacks circumvented 7 of the 9 white-box defenses they examined.",
    changed: "“Did you try an adaptive attack?” became a standard reviewer question. A defense evaluated only against off-the-shelf attacks is no longer taken at face value.",
    cite: "Athalye, Carlini, Wagner. Obfuscated Gradients Give a False Sense of Security. ICML 2018.",
    url: "https://proceedings.mlr.press/v80/athalye18a.html"
  },
  {
    tag: "Looking backward",
    question: "Ten pitfalls of ML for security, and how common they are in top-venue papers.",
    found: "Arp et al. identified ten subtle pitfalls that can invalidate ML-based security research. In a study of 30 papers from top-tier security venues, the pitfalls turned out to be widespread.",
    changed: "The ten pitfalls became a shared checklist for authors and reviewers, and gave the community words for problems it had mostly discussed informally.",
    chips: ["Sampling bias", "Label inaccuracy", "Data snooping", "Spurious correlations", "Biased parameter selection", "Inappropriate baseline", "Inappropriate performance measures", "Base rate fallacy", "Lab-only evaluation", "Inappropriate threat model"],
    cite: "Arp et al. Dos and Don’ts of Machine Learning in Computer Security. USENIX Security 2022.",
    url: "https://www.usenix.org/conference/usenixsecurity22/presentation/arp"
  },
  {
    tag: "Looking forward",
    question: "Membership inference used to be judged on the wrong metric.",
    found: "Carlini et al. argued that average-case metrics such as balanced accuracy or AUC hide what matters for privacy: whether an attack can confidently identify even a few members.",
    changed: "Reporting the true-positive rate at a low false-positive rate (for example 0.1%) became the expected way to evaluate membership inference attacks.",
    cite: "Carlini et al. Membership Inference Attacks From First Principles. IEEE S&P 2022.",
    url: "https://arxiv.org/abs/2112.03570"
  },
  {
    tag: "Looking backward",
    question: "Privacy defenses evaluated on the average sample can hide the ones that leak.",
    found: "Aerni, Zhang and Tramèr showed that empirical privacy defenses are often evaluated with weak attacks and on population averages, missing the most vulnerable samples. Under a stricter evaluation, several defenses protected far less than reported.",
    changed: "The work pushed privacy evaluations toward worst-case samples, strong adaptive attacks, and fair comparison with properly tuned differentially private baselines.",
    cite: "Aerni, Zhang, Tramèr. Evaluations of Machine Learning Privacy Defenses are Misleading. ACM CCS 2024.",
    url: "https://doi.org/10.1145/3658644.3690194"
  },
  {
    tag: "Looking forward",
    question: "One recipe can't break every defense, so each one needs its own attack.",
    found: "Tramèr et al. revisited 13 defenses that had claimed robustness with adaptive attacks. They circumvented all of them, and each one needed a differently designed attack.",
    changed: "Evaluation came to be seen as a craft rather than a checkbox. The paper doubles as a tutorial on how to design an adaptive attack.",
    cite: "Tramèr, Carlini, Brendel, Madry. On Adaptive Attacks to Adversarial Example Defenses. NeurIPS 2020.",
    url: "https://arxiv.org/abs/2002.08347"
  },
  {
    tag: "Looking forward",
    question: "Standardized attacks found lower robustness than reported for most published defenses.",
    found: "Croce and Hein re-evaluated more than 50 published models with AutoAttack, a parameter-free ensemble of attacks. Most turned out less robust than their papers reported.",
    changed: "AutoAttack became a common minimum bar, and RobustBench followed as a shared leaderboard for adversarial robustness.",
    cite: "Croce, Hein. Reliable Evaluation of Adversarial Robustness with an Ensemble of Diverse Parameter-free Attacks. ICML 2020.",
    url: "https://arxiv.org/abs/2003.01690"
  },
  {
    tag: "Looking backward",
    question: "Ignoring time in your train/test split can make a malware detector look much better than it is.",
    found: "Pendlebury et al. showed that Android malware classifiers suffer from spatial bias (unrealistic class ratios) and temporal bias (training on data from the future), which inflates reported performance.",
    changed: "Time-aware evaluation and realistic class ratios became expected in malware detection papers, and concept drift moved into the main evaluation.",
    cite: "Pendlebury et al. TESSERACT: Eliminating Experimental Bias in Malware Classification across Space and Time. USENIX Security 2019.",
    url: "https://www.usenix.org/conference/usenixsecurity19/presentation/pendlebury"
  },
  {
    tag: "Looking inward",
    question: "The test sets of widely used ML benchmarks contain label errors.",
    found: "Northcutt, Athalye and Mueller estimated an average of at least 3.3% label errors across the test sets of ten popular datasets, including ImageNet.",
    changed: "Benchmark quality became a research topic of its own. On corrected labels, the ranking of models can change.",
    cite: "Northcutt, Athalye, Mueller. Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks. NeurIPS 2021 Datasets and Benchmarks.",
    url: "https://arxiv.org/abs/2103.14749"
  },
  {
    tag: "Looking inward",
    question: "Changing only the random seed can change the conclusion.",
    found: "Henderson et al. showed that in deep reinforcement learning, different random seeds alone can produce learning curves whose differences look statistically significant.",
    changed: "Reporting several seeds, confidence intervals, and significance tests became expected. Reproducibility checklists at ML venues soon followed.",
    cite: "Henderson et al. Deep Reinforcement Learning that Matters. AAAI 2018.",
    url: "https://arxiv.org/abs/1709.06560"
  },
  {
    tag: "Elsewhere in science",
    question: "Data leakage has affected hundreds of ML-based papers across science.",
    found: "Kapoor and Narayanan surveyed reports of data leakage in ML-based science and found it affected at least 294 papers across 17 fields.",
    changed: "They proposed “model info sheets” so authors can argue that their train/test separation is clean. It is a reminder that security is not the only field fooling itself.",
    cite: "Kapoor, Narayanan. Leakage and the Reproducibility Crisis in Machine-Learning-Based Science. Patterns 2023.",
    url: "https://doi.org/10.1016/j.patter.2023.100804"
  },
  {
    tag: "Elsewhere in science",
    question: "Only about a third of 100 psychology findings replicated.",
    found: "The Open Science Collaboration repeated 100 published psychology studies. 97% of the originals reported significant results, but only 36% of the replications did.",
    changed: "Pre-registration, registered reports, and open data spread across psychology, and became a model for other fields, including ours.",
    cite: "Open Science Collaboration. Estimating the Reproducibility of Psychological Science. Science 2015.",
    url: "https://doi.org/10.1126/science.aac4716"
  },
  {
    tag: "Elsewhere in science",
    question: "A 2005 essay argued that most published research findings are false.",
    found: "Ioannidis modeled how small studies, small effects, flexible designs, and competitive fields combine to make false positives likely, and argued that these conditions are common.",
    changed: "It became one of the founding texts of meta-science and gave a name and a framework to worries many researchers already had.",
    cite: "Ioannidis. Why Most Published Research Findings Are False. PLoS Medicine 2005.",
    url: "https://doi.org/10.1371/journal.pmed.0020124"
  },
  {
    tag: "Looking inward",
    question: "Is security research a science? A 2017 paper asked seriously.",
    found: "Herley and van Oorschot examined how security research makes claims and found that many cannot be falsified, which makes progress hard to measure.",
    changed: "It sharpened the “science of security” debate and pushed the field to say more precisely what its claims are and how they could be tested.",
    cite: "Herley, van Oorschot. SoK: Science, Security and the Elusive Goal of Security as a Scientific Pursuit. IEEE S&P 2017.",
    url: "https://doi.org/10.1109/SP.2017.38"
  }
  // TODO (organizers): add Evertz et al., "Chasing Shadows: Pitfalls in LLM Security Research" (NDSS 2026)
  // with a one-line summary of its pitfalls written by its authors.
];
