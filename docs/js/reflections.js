// "Moments of reflection": papers that changed how the field does research.
// Each entry: tags (one or two of "Looking backward" | "Looking forward" | "Looking inward"),
// optional scope (e.g. "ML research"; cards without one are about AI security), optional keynote / organizers flags,
// question, found, changed, optional chips, and refs [{ cite, url }].
// Citation style: initials + surname; list all authors up to four, otherwise "First et al.".
// Keep claims conservative; double-check numbers against the papers before adding new ones.
window.REFLECTIONS = [
  {
    tags: ["Looking backward"],
    question: "One trick broke most defenses at a top ML venue.",
    found: "Athalye, Carlini and Wagner showed that many adversarial-example defenses accepted at ICLR 2018 only looked robust because they obfuscated gradients. Adapted attacks circumvented 7 of the 9 white-box defenses they examined.",
    changed: "“Did you try an adaptive attack?” became a standard reviewer question. Defenses tested only against existing, unmodified attacks are no longer considered convincing.",
    refs: [{ cite: "A. Athalye, N. Carlini, and D. Wagner. Obfuscated Gradients Give a False Sense of Security. ICML 2018.", url: "https://proceedings.mlr.press/v80/athalye18a.html" }]
  },
  {
    tags: ["Looking backward"],
    organizers: true,
    question: "Ten pitfalls in ML for security in top-venue papers.",
    found: "Arp et al. identified ten subtle pitfalls that can invalidate ML-based security research. In a study of 30 papers from top-tier security venues, the pitfalls turned out to be widespread.",
    changed: "The ten pitfalls became a shared checklist for authors and reviewers, and gave the community words for problems it had mostly discussed informally.",
    chips: ["Sampling bias", "Label inaccuracy", "Data snooping", "Spurious correlations", "Biased parameter selection", "Inappropriate baseline", "Inappropriate performance measures", "Base rate fallacy", "Lab-only evaluation", "Inappropriate threat model"],
    refs: [{ cite: "D. Arp et al. Dos and Don’ts of Machine Learning in Computer Security. USENIX Security 2022.", url: "https://www.usenix.org/conference/usenixsecurity22/presentation/arp" }]
  },
  {
    tags: ["Looking backward"],
    organizers: true,
    question: "How reliable is LLM security research?",
    found: "Across 72 papers from top security and software engineering venues (2023–2024), Evertz et al. found methodological pitfalls in every single one, from data leakage to ambiguous model versions. Fewer than one in six of these pitfalls were acknowledged by the original authors.",
    changed: "LLM security research got its own checklist of pitfalls that can undermine reported results and reproducibility. It also raised an uncomfortable question: how much of what we believe about LLM security depends on experimental choices we rarely scrutinize?",
    chips: ["Data poisoning", "Label inaccuracy", "Data leakage", "Model collapse", "Spurious correlations", "Context truncation", "Prompt sensitivity", "Surrogate fallacy", "Model ambiguity"],
    refs: [{ cite: "J. Evertz et al. Chasing Shadows: Pitfalls in LLM Security Research. NDSS 2026.", url: "https://www.ndss-symposium.org/ndss-paper/chasing-shadows-pitfalls-in-llm-security-research/" }]
  },
  {
    tags: ["Looking backward"],
    keynote: true,
    question: "Adversarial ML is older than deep learning.",
    found: "Wild Patterns traced attacks on machine learning back more than a decade before adversarial examples became famous in deep learning, to early work on evading spam and malware detectors. Wild Patterns Reloaded did the same for training-data poisoning, systematizing more than 100 papers from 15 years of research.",
    changed: "Both reviews gave the community a shared history and vocabulary, and pointed out the limitations and open questions that keep resurfacing. Looking back at a whole field like this is meta-science in practice: a field that forgets its past tends to rediscover it.",
    refs: [
      { cite: "B. Biggio and F. Roli. Wild Patterns: Ten Years After the Rise of Adversarial Machine Learning. Pattern Recognition 2018.", url: "https://www.sciencedirect.com/science/article/abs/pii/S0031320318302565" },
      { cite: "A. E. Cinà et al. Wild Patterns Reloaded: A Survey of Machine Learning Security against Training Data Poisoning. ACM Computing Surveys 2023.", url: "https://dl.acm.org/doi/full/10.1145/3585385" }
    ]
  },
  {
    tags: ["Looking backward", "Looking forward"],
    keynote: true,
    question: "A failed attack doesn’t mean the model is robust.",
    found: "Pintor et al. identified common ways in which gradient-based attacks fail to optimize properly, including failures that affected many popular attack implementations and past evaluations. They proposed indicators that automatically flag these failures during a robustness evaluation.",
    changed: "Evaluators no longer have to trust a robustness number blindly: they can check whether the attack actually worked, and fix it when it didn’t.",
    refs: [{ cite: "M. Pintor et al. Indicators of Attack Failure: Debugging and Improving Optimization of Adversarial Examples. NeurIPS 2022.", url: "https://papers.nips.cc/paper_files/paper/2022/hash/91ffdc5e2f12436d99914418e38d0a09-Abstract-Conference.html" }]
  },
  {
    tags: ["Looking inward"],
    question: "Membership inference has been evaluated with the wrong metric.",
    found: "Carlini et al. argued that average-case metrics such as balanced accuracy or AUC hide what matters for privacy: whether an attack can confidently identify even a few members.",
    changed: "Reporting the true-positive rate at a low false-positive rate (for example 0.1%) became the expected way to evaluate membership inference attacks.",
    refs: [{ cite: "N. Carlini et al. Membership Inference Attacks From First Principles. IEEE S&P 2022.", url: "https://ieeexplore.ieee.org/document/9833649" }]
  },
  {
    tags: ["Looking backward"],
    question: "Privacy defenses can look safer than they are.",
    found: "Aerni, Zhang and Tramèr showed that empirical privacy defenses are often evaluated with weak attacks and on population averages, missing the most vulnerable samples. Under a stricter evaluation, several defenses protected far less than reported.",
    changed: "The work pushed privacy evaluations toward worst-case samples, strong adaptive attacks, and fair comparison with properly tuned differentially private baselines.",
    refs: [{ cite: "M. Aerni, J. Zhang, and F. Tramèr. Evaluations of Machine Learning Privacy Defenses are Misleading. ACM CCS 2024.", url: "https://dl.acm.org/doi/abs/10.1145/3658644.3690194" }]
  },
  {
    tags: ["Looking forward"],
    question: "Thirteen defenses, thirteen different adaptive attacks.",
    found: "Tramèr et al. revisited 13 defenses that had claimed robustness with adaptive attacks. They circumvented all of them, and each one needed a differently designed attack.",
    changed: "There is no single attack that settles a robustness evaluation: each defense needs an attack designed for it. The paper also works as a step-by-step guide to designing one.",
    refs: [{ cite: "F. Tramèr, N. Carlini, W. Brendel, and A. Madry. On Adaptive Attacks to Adversarial Example Defenses. NeurIPS 2020.", url: "https://proceedings.neurips.cc/paper/2020/hash/11f38f8ecd71867b42433548d1078e38-Abstract.html" }]
  },
  {
    tags: ["Looking forward"],
    question: "Most defenses were less robust than reported.",
    found: "Croce and Hein re-evaluated more than 50 published models with AutoAttack, a parameter-free ensemble of attacks. Most turned out less robust than their papers reported.",
    changed: "AutoAttack became a common minimum bar, and RobustBench followed as a shared leaderboard for adversarial robustness.",
    refs: [{ cite: "F. Croce and M. Hein. Reliable Evaluation of Adversarial Robustness with an Ensemble of Diverse Parameter-free Attacks. ICML 2020.", url: "https://proceedings.mlr.press/v119/croce20b.html" }]
  },
  {
    tags: ["Looking backward"],
    question: "Ignoring time makes malware detectors look better.",
    found: "Pendlebury et al. showed that Android malware classifiers suffer from spatial bias (unrealistic class ratios) and temporal bias (training on data from the future), which inflates reported performance.",
    changed: "Time-aware evaluation and realistic class ratios became expected in malware detection papers, and concept drift moved into the main evaluation.",
    refs: [{ cite: "F. Pendlebury et al. TESSERACT: Eliminating Experimental Bias in Malware Classification across Space and Time. USENIX Security 2019.", url: "https://www.usenix.org/conference/usenixsecurity19/presentation/pendlebury" }]
  },
  {
    tags: ["Looking inward"],
    scope: "ML research",
    question: "Popular benchmark test sets contain label errors.",
    found: "Northcutt, Athalye and Mueller estimated an average of at least 3.3% label errors across the test sets of ten popular datasets, including ImageNet.",
    changed: "Benchmark quality became a research topic of its own. On corrected labels, the ranking of models can change.",
    refs: [{ cite: "C. Northcutt, A. Athalye, and J. Mueller. Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks. NeurIPS 2021 Datasets and Benchmarks.", url: "https://datasets-benchmarks-proceedings.neurips.cc/paper/2021/hash/f2217062e9a397a1dca429e7d70bc6ca-Abstract-round1.html" }]
  },
  {
    tags: ["Looking inward"],
    scope: "ML research",
    question: "Changing only the random seed can change the conclusion.",
    found: "Henderson et al. showed that in deep reinforcement learning, different random seeds alone can produce learning curves whose differences look statistically significant.",
    changed: "Reporting several seeds, confidence intervals, and significance tests became expected. Reproducibility checklists at ML venues soon followed.",
    refs: [{ cite: "P. Henderson et al. Deep Reinforcement Learning that Matters. AAAI 2018.", url: "https://ojs.aaai.org/index.php/AAAI/article/view/11694" }]
  },
  {
    tags: ["Looking backward"],
    scope: "ML research",
    question: "Data leakage affected hundreds of ML-based papers.",
    found: "Kapoor and Narayanan surveyed reports of data leakage in ML-based science and found it affected at least 294 papers across 17 fields.",
    changed: "They proposed “model info sheets” so authors can argue that their train/test separation is clean. It is a reminder that security is not the only field fooling itself.",
    refs: [{ cite: "S. Kapoor and A. Narayanan. Leakage and the Reproducibility Crisis in Machine-Learning-Based Science. Patterns 2023.", url: "https://www.sciencedirect.com/science/article/pii/S2666389923001599" }]
  },
  {
    tags: ["Looking backward"],
    scope: "Origins of meta-science",
    question: "Why most published research findings are false.",
    found: "Ioannidis modeled how small studies, small effects, flexible designs, and competitive fields combine to make false positives likely, and argued that these conditions are common.",
    changed: "It became one of the founding texts of meta-science and gave a name and a framework to worries many researchers already had.",
    refs: [{ cite: "J. P. A. Ioannidis. Why Most Published Research Findings Are False. PLoS Medicine 2005.", url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124" }]
  },
  {
    tags: ["Looking inward"],
    scope: "Science of security",
    question: "Is security research a science?",
    found: "Herley and van Oorschot examined how security research makes claims and found that many cannot be falsified, which makes progress hard to measure.",
    changed: "It sharpened the “science of security” debate and pushed the field to say more precisely what its claims are and how they could be tested.",
    refs: [{ cite: "C. Herley and P. C. van Oorschot. SoK: Science, Security and the Elusive Goal of Security as a Scientific Pursuit. IEEE S&P 2017.", url: "https://www.computer.org/csdl/proceedings-article/sp/2017/07958573/12OmNwE9OP0" }]
  }
];
