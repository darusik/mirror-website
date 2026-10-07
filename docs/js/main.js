/* MIRROR 2027 — site behaviour and easter eggs.
 * Each easter egg can be switched off here. See notes/EASTER-EGGS.md (not published) for triggers. */
const EGGS = {
  honestReflection: true, // hover/tap the hero title: the reflection tells the truth
  reviewer2: true,        // Konami code or type "reviewer2"
  pHacking: true,         // click the p-value in the footer
  feynmanFlip: true,      // click "the easiest person to fool"
  consoleMessage: true,   // open DevTools
  artifactBadge: true,    // click "Results reproduced ✗" in the footer
  baseRate: true,         // click the nav logo 5 times quickly
  seedAurora: true,       // type "seed"
  tabTitle: true,         // switch to another tab
  errorBars: true,        // "± 0 days" on the countdown
  aoeTooltip: true,       // hover/click "AoE"
  nightAurora: true,      // visit at night (local time) or add ?night to the URL
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function toast(html, ms = 5000) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = html;
  $("#toasts").appendChild(t);
  setTimeout(() => { t.classList.add("leaving"); setTimeout(() => t.remove(), 300); }, ms);
}

/* ---------- Navigation ---------- */
(function nav() {
  const navEl = $("#nav");
  const onScroll = () => navEl.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $("#nav-toggle"), links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  }));

  // highlight the section in view
  const map = new Map($$("a", links).map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const a = map.get(e.target.id);
      if (a && e.isIntersecting) { map.forEach(x => x.classList.remove("active")); a.classList.add("active"); }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();

/* ---------- Reflections carousel ---------- */
(function carousel() {
  const data = window.REFLECTIONS || [];
  if (!data.length) return;
  const slide = $("#slide"), dots = $("#dots");
  let i = Math.floor(Math.random() * data.length), timer = null;

  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function render() {
    const d = data[i];
    slide.innerHTML = `
      <div class="slide-top"><span class="slide-dyk">Did you know? · ${i + 1}/${data.length}</span><span class="slide-tag">${esc(d.tag)}</span></div>
      <h3>${esc(d.question)}</h3>
      ${d.chips ? `<ul class="slide-chips">${d.chips.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
      <div class="slide-cols">
        <div><h4>What it found</h4><p>${esc(d.found)}</p></div>
        <div><h4>What changed</h4><p>${esc(d.changed)}</p></div>
      </div>
      <p class="slide-cite">${d.url ? `<a href="${d.url}" target="_blank" rel="noopener">${esc(d.cite)}</a>` : esc(d.cite)}</p>`;
    $$("button", dots).forEach((b, k) => b.setAttribute("aria-selected", k === i));
  }
  function go(n) {
    slide.classList.add("out");
    setTimeout(() => { i = (n + data.length) % data.length; render(); slide.classList.remove("out"); }, reduceMotion ? 0 : 300);
  }
  function start() { stop(); if (!reduceMotion) timer = setInterval(() => go(i + 1), 12000); }
  function stop() { clearInterval(timer); }

  data.forEach((_, k) => {
    const b = document.createElement("button");
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Note ${k + 1}`);
    b.addEventListener("click", () => { go(k); start(); });
    dots.appendChild(b);
  });
  $("#prev").addEventListener("click", () => { go(i - 1); start(); });
  $("#next").addEventListener("click", () => { go(i + 1); start(); });
  const c = $("#carousel");
  c.addEventListener("mouseenter", stop);
  c.addEventListener("mouseleave", start);
  c.addEventListener("focusin", stop);
  render();
  start();
})();

/* ---------- Dates & countdown ---------- */
(function dates() {
  const items = $$(".dates li");
  const now = Date.now();
  const next = items.find(li => new Date(li.dataset.deadline).getTime() > now);
  items.forEach(li => { if (new Date(li.dataset.deadline).getTime() <= now) li.classList.add("past"); });
  if (!next) return;
  next.classList.add("next");
  const days = Math.floor((new Date(next.dataset.deadline).getTime() - now) / 864e5);
  const label = $(".date-label", next).textContent.toLowerCase();
  const err = EGGS.errorBars
    ? ` <button type="button" class="errbar" title="n = 1 calendar. Reviewer 2 asked for error bars.">± 0</button>`
    : "";
  const cd = $("#countdown");
  cd.innerHTML = `<b>${days}${err}</b> ${days === 1 ? "day" : "days"} until the ${label}.`;
  cd.hidden = false;

  // Easter egg: the error bars, re-run over more calendars on click
  const eb = $(".errbar", cd);
  if (eb) eb.addEventListener("click", () => {
    toast(`Reviewer 2 asked for error bars, so we re-ran the countdown with <b>n = 2</b> calendars (Gregorian and Julian).<small>Result: ${days + 6.5} ± 6.5 days. The Julian calendar is now considered an outlier and has been excluded.</small>`, 7000);
  });
})();

/* ================= Easter eggs ================= */

/* 1. Honest reflection: the claim above the water, the caveat in it. */
if (EGGS.honestReflection) (function honestReflection() {
  const CLAIMS = [
    ["Robust to adversarial attacks", "…we tried PGD-10."],
    ["State of the art", "on the benchmark we released"],
    ["99.8% detection accuracy", "at a 1:1 benign-to-malicious ratio"],
    ["Privacy-preserving", "on average, across all samples"],
    ["Fully reproducible", "code available upon request"],
    ["Significant improvement", "best of 5 seeds"],
    ["Generalizes to unseen data", "collected the same week"],
    ["Novel", "to the reviewers"],
    ["Validated by an LLM judge", "the same LLM"],
    ["Realistic threat model", "the attacker knows everything except our defense"],
  ];
  const title = $("#mirror-title"), stage = $(".stage");
  const claim = $(".t-claim", title), caveat = $("#caveat");
  let k = Math.floor(Math.random() * CLAIMS.length), on = false;

  function show() {
    if (on) return;
    on = true;
    const [c, v] = CLAIMS[k];
    claim.textContent = c;
    caveat.textContent = v;
    title.classList.add("confess");
    stage.classList.add("confess");
  }
  function hide() {
    if (!on) return;
    on = false;
    title.classList.remove("confess");
    stage.classList.remove("confess");
    k = (k + 1) % CLAIMS.length;
  }
  title.style.cursor = "pointer";
  title.addEventListener("mouseenter", show);
  title.addEventListener("mouseleave", hide);
  title.addEventListener("focus", show);
  title.addEventListener("blur", hide);
  // touch: tap toggles
  title.addEventListener("click", () => { if (matchMedia("(hover: none)").matches) (on ? hide : show)(); });
})();

/* 2. Reviewer 2 mode */
const keyBuffer = [];
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const typed = { text: "" };
const keyHandlers = [];
document.addEventListener("keydown", e => {
  if (e.target.matches?.("input, textarea, [contenteditable]")) return;
  keyBuffer.push(e.key);
  if (keyBuffer.length > KONAMI.length) keyBuffer.shift();
  if (e.key.length === 1) typed.text = (typed.text + e.key.toLowerCase()).slice(-20);
  keyHandlers.forEach(h => h(e));
});

if (EGGS.reviewer2) (function reviewer2() {
  const NOTES = {
    top: "Figure 1 is too dark. Also, the mountains are not to scale.",
    about: "The motivation is clear. However, I am not convinced this is a problem.",
    reflections: "Missing related work: [redacted, but the reviewer wrote it in 2014].",
    topics: "Too many topics. Please focus. Also, please add mine.",
    cfp: "One page is too long. The authors should run additional experiments.",
    dates: "The deadline is not novel. Similar deadlines exist in prior work.",
    program: "Missing baseline: a workshop with zero keynotes.",
    organizers: "The authors should compare against more organizers.",
  };
  const REBUTTALS = [
    "We thank the reviewer and will address this in the camera-ready.",
    "This is discussed in Appendix F (page 47).",
    "We respectfully disagree, and have added a footnote.",
  ];
  let active = false, banner = null;

  function enter() {
    if (active) return;
    active = true;
    banner = document.createElement("div");
    banner.className = "r2-banner";
    banner.innerHTML = `<span>REVIEWER 2 · Overall: Weak reject · Confidence: 5 (absolutely certain)</span><button type="button">Withdraw (Esc)</button>`;
    $("button", banner).addEventListener("click", exit);
    document.body.appendChild(banner);

    Object.entries(NOTES).forEach(([id, text], n) => {
      const host = document.getElementById(id);
      if (!host) return;
      const note = document.createElement("aside");
      note.className = "r2-note";
      note.style.transform = `rotate(${(n % 2 ? 1 : -1) * (1.5 + (n % 3))}deg)`;
      note.style.animationDelay = `${n * 90}ms`;
      if (id === "top") note.style.top = "110px";
      note.innerHTML = `<b>REVIEWER 2</b><span>${text}</span><br><button type="button">Rebut</button>`;
      $("button", note).addEventListener("click", ev => {
        $("span", note).textContent = REBUTTALS[n % REBUTTALS.length];
        ev.target.textContent = "Score unchanged.";
        ev.target.disabled = true;
      });
      host.appendChild(note);
    });
    toast("Reviewer 2 has entered the chat.<small>Press Esc to withdraw your submission.</small>", 4000);
  }
  function exit() {
    if (!active) return;
    active = false;
    banner?.remove();
    $$(".r2-note").forEach(n => n.remove());
  }
  keyHandlers.push(e => {
    if (e.key === "Escape") return exit();
    const konami = keyBuffer.join(",").toLowerCase() === KONAMI.join(",").toLowerCase();
    if (konami || typed.text.endsWith("reviewer2")) { keyBuffer.length = 0; typed.text = ""; enter(); }
  });
})();

/* 3. p-hacking in the footer */
if (EGGS.pHacking) (function pHacking() {
  const btn = $("#pval");
  let running = false;
  btn.addEventListener("click", () => {
    if (running) return;
    if (btn.classList.contains("sig")) {
      btn.classList.remove("sig");
      btn.innerHTML = "<i>p</i> = 0.07";
      return;
    }
    running = true;
    let tries = 0;
    const tick = setInterval(() => {
      tries++;
      const p = Math.random();
      btn.innerHTML = `<i>p</i> = ${p.toFixed(3)}`;
      if (p < 0.05) {
        clearInterval(tick);
        running = false;
        btn.classList.add("sig");
        btn.innerHTML = `<i>p</i> = ${p.toFixed(3)} — significant!`;
        toast(`Found a significant result after <b>${tries}</b> ${tries === 1 ? "attempt" : "attempts"}.<small>Please don’t mention the other ${tries - 1}. (See: the garden of forking paths.)</small>`, 6000);
      }
    }, reduceMotion ? 0 : 70);
  });
})();

/* 4. Feynman flip */
if (EGGS.feynmanFlip) (function feynmanFlip() {
  const btn = $("#fool");
  btn.addEventListener("click", () => {
    if (document.body.classList.contains("mirrored")) return;
    document.body.classList.add("mirrored");
    setTimeout(() => {
      document.body.classList.remove("mirrored");
      toast("Fooled you. Briefly.<small>Now you know what the other side of the mirror looks like.</small>", 3500);
    }, 1800);
  });
})();

/* 5. Console message */
if (EGGS.consoleMessage) {
  console.log(
    "%cMIRROR%c\n\nInspecting the source? Good. That’s the spirit.\nNo hidden randomness here, except where we tell you.\n\nNow turn that scrutiny into a lightning talk: #cfp",
    "font: 300 42px Fraunces, Georgia, serif; letter-spacing: 6px; color: #5BF2B0;",
    "font: 14px Inter, sans-serif; color: #B3BEDF;"
  );
}

/* 6. Artifact badge that refuses to reproduce */
if (EGGS.artifactBadge) (function artifactBadge() {
  const b = $("#reproduced");
  const STEPS = [
    "Reproducing… ✗ requires CUDA 10.1",
    "Reproducing… ✗ dataset link returns 404",
    "Reproducing… ✗ seed not reported",
    "Reproducing… ✗ works on the author’s machine only",
    "Results reproduced ✓ (on the third author’s laptop)",
  ];
  let s = 0;
  b.addEventListener("click", () => {
    b.textContent = STEPS[s];
    b.classList.toggle("win", s === STEPS.length - 1);
    s = (s + 1) % STEPS.length;
    if (s === 0) setTimeout(() => { b.textContent = "Results reproduced ✗"; b.classList.remove("win"); }, 4000);
  });
})();

/* 7. Base rate fallacy: click the logo 5 times */
if (EGGS.baseRate) (function baseRate() {
  let clicks = [];
  $("#brand").addEventListener("click", () => {
    const now = Date.now();
    clicks = clicks.filter(t => now - t < 2500).concat(now);
    if (clicks.length >= 5) {
      clicks = [];
      const sens = 0.99, fpr = 0.01, prior = 0.001;
      const post = (sens * prior) / (sens * prior + fpr * (1 - prior));
      toast(`Our 99%-accurate detector just flagged you as <b>Reviewer 2</b>.<small>But only 1 in 1,000 visitors is Reviewer 2, so the chance you really are is about ${(post * 100).toFixed(0)}%. That’s the base rate fallacy (Arp et al., 2022).</small>`, 8000);
    }
  });
})();

/* 8. Re-run the aurora with a new seed */
if (EGGS.seedAurora) (function seedAurora() {
  keyHandlers.push(() => {
    if (!typed.text.endsWith("seed")) return;
    typed.text = "";
    const seed = Math.floor(Math.random() * 10000);
    const hue = (seed * 37) % 360;
    $("#aurora").style.filter = `blur(42px) saturate(1.4) hue-rotate(${hue}deg)`;
    const gain = (Math.random() * 6 + 0.5).toFixed(1);
    toast(`Re-ran with <code>seed=${seed}</code>. The aurora improved by ${gain}%.<small>n = 1. Results may vary with the seed. That’s rather the point.</small>`, 5000);
  });
})();

/* 9. Tab title when the visitor looks away */
if (EGGS.tabTitle) (function tabTitle() {
  const original = document.title;
  const AWAY = ["Come back: your results await replication", "(1) new review: Weak reject", "Did you forget to report the seed?"];
  let n = 0;
  document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? AWAY[n++ % AWAY.length] : original;
  });
})();

/* 10. AoE tooltip */
if (EGGS.aoeTooltip) (function aoe() {
  const el = $("#aoe");
  el.title = "Anywhere on Earth (UTC−12). Reykjavík is UTC+0, so the deadline there falls at noon the next day. This is not an invitation.";
  el.addEventListener("click", () => toast("AoE = Anywhere on Earth (UTC−12).<small>In Reykjavík, that’s noon the following day. This is not an invitation.</small>", 5000));
})();

/* 11. Night aurora */
if (EGGS.nightAurora) (function nightAurora() {
  const h = new Date().getHours();
  const forced = new URLSearchParams(location.search).has("night");
  if (!(forced || h >= 22 || h < 5)) return;
  document.body.classList.add("night");
  const note = $("#night-note");
  note.textContent = "It’s late where you are. In Reykjavík in May the sun barely sets, so this aurora is just for you. The reviews can wait.";
  note.hidden = false;
})();
