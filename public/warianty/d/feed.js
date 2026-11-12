/* Wariant D: pionowy feed.
   Jedno źródło przewijania: natywny scroll dokumentu ze scroll-snap. ScrollTrigger tylko czyta postęp
   (bez własnego snapu i bez wygładzania), więc kółko, gładzik, klawiatura i kciuk zachowują się jak w przeglądarce.
   Desktop: media kroków przenosimy do telefonu (pas przesuwany 1:1 z postępem), rozdział i karty kroku
   liczą położenie z odległości od bieżącej pozycji feedu. Telefon: IntersectionObserver na kartach. */
(() => {
  "use strict";
  const d = document;
  const root = d.documentElement;
  const mqWide = matchMedia("(min-width: 1024px)");
  const mqReduce = matchMedia("(prefers-reduced-motion: reduce)");

  const steps = Array.from(d.querySelectorAll(".step"));
  const N = steps.length;
  const medias = steps.map((s) => s.querySelector(":scope > .media"));
  const cardsOf = steps.map((s) => s.querySelector(":scope > .cards"));
  steps.forEach((s, i) => { s.dataset.i = String(i); });

  const chapters = Array.from(d.querySelectorAll(".chapter")).map((el) => {
    const own = steps.map((s, i) => (el.contains(s) ? i : -1)).filter((i) => i >= 0);
    return { el, head: el.querySelector(":scope > .ch-head"), a: own[0], b: own[own.length - 1], nav: Number(el.dataset.nav) };
  });
  const groups = [];
  chapters.forEach((c) => {
    const g = groups[c.nav] || { a: Infinity, b: -Infinity };
    groups[c.nav] = { a: Math.min(g.a, c.a), b: Math.max(g.b, c.b) };
  });
  const groupOfStep = (i) => groups.findIndex((g) => i >= g.a && i <= g.b);

  const bar = d.getElementById("bar");
  const navLinks = Array.from(d.querySelectorAll(".chapters a[data-nav]"));
  const segs = Array.from(d.querySelectorAll(".segments i"));
  const track = d.getElementById("track");
  const strip = d.getElementById("strip");
  const deviceBody = d.getElementById("deviceBody");
  const deviceToggle = d.getElementById("deviceToggle");
  const counterNow = d.getElementById("counterNow");
  d.getElementById("counterAll").textContent = String(N);

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------------- Wideo ---------------- */
  const userPaused = new WeakSet();
  const videoOf = (m) => (m ? m.querySelector("video") : null);
  const btnsFor = (v) => {
    const m = v.closest(".media");
    const list = m ? Array.from(m.querySelectorAll(".vid-btn")) : [];
    if (mode === "stage" && medias[active] === m) list.push(deviceToggle);
    return list;
  };
  const paint = (btn, playing) => {
    if (!btn) return;
    btn.removeAttribute("aria-pressed");
    btn.dataset.state = playing ? "playing" : "paused";
    const label = btn.querySelector(".vid-btn-label");
    if (label) label.textContent = playing ? "Zatrzymaj film" : "Odtwórz film";
  };
  const autoplayAllowed = () => !mqReduce.matches;

  // Wideo rusza dopiero po zdarzeniu load: 290 KB filmu nie konkuruje z plakatem hero o łącze (LCP).
  let loaded = d.readyState === "complete";
  const waiting = new Set();
  window.addEventListener("load", () => {
    loaded = true;
    setTimeout(() => waiting.forEach((m) => { waiting.delete(m); if (activeHas(m)) wantPlay(m); }), 300);
  });
  const activeHas = (m) => (mode === "stage" ? medias[active] === m : activeCard && activeCard.contains(m));
  function wantPlay(m) {
    const v = videoOf(m);
    if (!v) return;
    if (!loaded) { waiting.add(m); return; }
    if (!autoplayAllowed() || userPaused.has(v)) { btnsFor(v).forEach((b) => paint(b, false)); return; }
    const pr = v.play();
    if (pr && pr.catch) pr.catch(() => btnsFor(v).forEach((b) => paint(b, false)));
  }
  function stop(m) {
    const v = videoOf(m);
    if (v && !v.paused) v.pause();
  }
  function toggle(v) {
    if (!v) return;
    if (v.paused) { userPaused.delete(v); const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); }
    else { userPaused.add(v); v.pause(); }
  }
  d.querySelectorAll(".media video").forEach((v) => {
    const m = v.closest(".media");
    v.addEventListener("playing", () => { m.classList.add("is-playing"); btnsFor(v).forEach((b) => paint(b, true)); });
    v.addEventListener("pause", () => btnsFor(v).forEach((b) => paint(b, false)));
    paint(m.querySelector(".vid-btn"), autoplayAllowed());
  });
  d.querySelectorAll(".media .vid-btn").forEach((b) => b.addEventListener("click", () => toggle(videoOf(b.closest(".media")))));
  deviceToggle.addEventListener("click", () => toggle(videoOf(medias[active])));

  /* ---------------- Napisy w rolce (przykładowe) ---------------- */
  const heroMedia = d.querySelector(".media--hero");
  const heroVideo = videoOf(heroMedia);
  const cap = heroMedia.querySelector(".reel-cap");
  const pop = heroMedia.querySelector(".reel-pop");
  const lines = JSON.parse(cap.dataset.captions);
  let capLine = -1;
  let capRaf = 0;
  function renderLine(k) {
    capLine = k;
    cap.textContent = "";
    lines[k][0].split(" ").forEach((w, j) => {
      const s = d.createElement("span");
      s.className = "w";
      s.textContent = w;
      cap.appendChild(s);
      if (j < lines[k][0].split(" ").length - 1) cap.appendChild(d.createTextNode(" "));
    });
  }
  function captionsTick() {
    const t = heroVideo.currentTime % 9;
    const k = Math.max(0, lines.findIndex((l) => t >= l[1] && t < l[2]));
    if (k !== capLine) renderLine(k);
    const words = cap.querySelectorAll(".w");
    const f = (t - lines[k][1]) / (lines[k][2] - lines[k][1]);
    const n = Math.min(words.length, Math.floor(f * (words.length + 0.6)) + 1);
    words.forEach((w, j) => { w.classList.toggle("on", j < n); w.classList.toggle("now", j === n - 1); });
    pop.classList.toggle("show", t > 0.5 && t < 4.3);
    if (!heroVideo.paused) capRaf = requestAnimationFrame(captionsTick);
  }
  function staticCaption() {
    renderLine(0);
    cap.querySelectorAll(".w").forEach((w) => w.classList.add("on"));
    pop.classList.add("show");
  }
  heroVideo.addEventListener("playing", () => { cancelAnimationFrame(capRaf); capRaf = requestAnimationFrame(captionsTick); });
  heroVideo.addEventListener("pause", () => cancelAnimationFrame(capRaf));
  staticCaption();

  /* ---------------- Ekrany, które coś pokazują po wejściu ---------------- */
  const timers = new Map();
  function clearTimers(m) { (timers.get(m) || []).forEach(clearTimeout); timers.set(m, []); }
  function later(m, ms, fn) { const id = setTimeout(fn, ms); (timers.get(m) || timers.set(m, []).get(m)).push(id); }

  function enterScreen(m) {
    if (!m) return;
    clearTimers(m);
    const instant = mqReduce.matches;
    if (m.classList.contains("media--sheet")) {
      const sheet = m.querySelector(".sheet");
      const rows = Array.from(m.querySelectorAll(".sheet-table li"));
      const mails = Array.from(m.querySelectorAll(".sheet-inbox li"));
      const count = m.querySelector(".sheet-count");
      const from = Number(count.dataset.from);
      const to = Number(count.dataset.to);
      if (instant) { sheet.classList.remove("is-armed"); count.textContent = String(to); return; }
      sheet.classList.add("is-armed");
      rows.forEach((r) => r.classList.remove("is-in"));
      mails.forEach((r) => r.classList.remove("is-sent"));
      count.textContent = String(from);
      rows.forEach((r, k) => later(m, 450 + k * 520, () => {
        if (mails[k]) mails[k].classList.add("is-sent");
        r.classList.add("is-in");
        count.textContent = String(Math.min(to, from + k + 1));
      }));
    } else if (m.classList.contains("media--doc")) {
      const items = Array.from(m.querySelectorAll(".doc-list li"));
      if (instant) { items.forEach((li) => li.classList.add("is-checked")); return; }
      items.forEach((li) => li.classList.remove("is-checked"));
      items.forEach((li, k) => later(m, 350 + k * 260, () => li.classList.add("is-checked")));
    } else if (m.classList.contains("media--form")) {
      const fill = m.querySelector(".form-bar i");
      fill.style.transform = "scaleX(0)";
      later(m, instant ? 0 : 300, () => { fill.style.transform = "scaleX(.1)"; });
    }
  }
  // Stan końcowy na start: treść widoczna nawet zanim ktoś przewinie (i bez JS ruchu).
  medias.forEach((m) => {
    if (!m) return;
    m.querySelectorAll(".doc-list li").forEach((li) => li.classList.add("is-checked"));
  });

  /* ---------------- „Problem i system”, „Jak wygląda” ---------------- */
  d.querySelectorAll(".more").forEach((b) => {
    b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", String(open));
      const box = b.closest(".sheet-card, .card");
      box.classList.toggle("is-open", open);
    });
  });

  /* ---------------- Karuzele na telefonie ---------------- */
  d.querySelectorAll("[data-rail]").forEach((rail) => {
    const items = Array.from(rail.children);
    const dots = d.createElement("div");
    dots.className = "dots";
    dots.setAttribute("role", "group");
    dots.setAttribute("aria-label", "Przewiń karty");
    const buttons = items.map((it, k) => {
      const b = d.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Karta ${k + 1} z ${items.length}`);
      b.addEventListener("click", () => {
        rail.scrollTo({ left: it.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft), behavior: mqReduce.matches ? "auto" : "smooth" });
      });
      dots.appendChild(b);
      return b;
    });
    rail.after(dots);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) buttons.forEach((b, k) => b.setAttribute("aria-current", String(items[k] === e.target)));
      });
    }, { root: rail, threshold: 0.6 });
    items.forEach((it) => io.observe(it));
    buttons[0].setAttribute("aria-current", "true");
  });

  /* ---------------- Nawigacja: postęp ---------------- */
  function paintProgress(i) {
    const g = groupOfStep(i);
    const fills = groups.map((gr, k) => (k < g ? 1 : k > g ? 0 : (i - gr.a + 1) / (gr.b - gr.a + 1)));
    navLinks.forEach((a, k) => {
      a.style.setProperty("--f", fills[k].toFixed(3));
      if (k === g) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    segs.forEach((s, k) => s.style.setProperty("--f", fills[k].toFixed(3)));
    const id = steps[i].id;
    d.querySelectorAll("[data-goto]").forEach((a) => a.classList.toggle("is-current", a.dataset.goto === id));
  }

  /* =====================================================================
     TRYB FEED (telefon, tablet, desktop bez sceny)
     ===================================================================== */
  let mode = null;
  let feedIO = null;
  let activeCard = null;
  const snapCards = Array.from(d.querySelectorAll(".snap"));
  const ratios = new Map();

  function cardStepIndex(card) {
    if (card.classList.contains("step")) return Number(card.dataset.i);
    const ch = chapters.find((c) => c.el === card || c.head === card);
    if (!ch) return 0;
    return card === ch.head && ch.el.classList.contains("ch--stack") ? ch.a : ch.a;
  }
  function onCard(card) {
    if (card === activeCard) return;
    const prev = activeCard;
    activeCard = card;
    bar.dataset.theme = card.dataset.theme || "light";
    bar.classList.toggle("cta-off", card.dataset.cta === "own" || (card.closest("[data-cta='own']") !== null));
    const i = cardStepIndex(card);
    paintProgress(i);
    if (prev) prev.querySelectorAll(".media").forEach((m) => { stop(m); clearTimers(m); });
    card.querySelectorAll(":scope .media").forEach((m) => {
      if (card.classList.contains("ch--stack")) return;
      wantPlay(m);
      enterScreen(m);
    });
  }
  function startFeed() {
    mode = "feed";
    ratios.clear();
    feedIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
      let best = null;
      let bestR = 0;
      ratios.forEach((r, el) => { if (r > bestR) { best = el; bestR = r; } });
      if (best && bestR > 0.5) onCard(best);
    }, { threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] });
    snapCards.forEach((c) => feedIO.observe(c));
  }
  function stopFeed() {
    if (feedIO) feedIO.disconnect();
    feedIO = null;
    if (activeCard) activeCard.querySelectorAll(".media").forEach(stop);
    activeCard = null;
  }

  /* =====================================================================
     TRYB SCENA (desktop z ruchem)
     ===================================================================== */
  let st = null;
  let active = -1;
  let lastP = 0;
  let dir = 1;
  const placeholders = [];
  const markers = [];
  const shown = new Map();

  function setShown(el, on) {
    if (shown.get(el) === on) return;
    shown.set(el, on);
    el.style.visibility = on ? "visible" : "hidden";
    if (!on) { el.style.opacity = "0"; }
  }
  function placeHead(el, dd) {
    const a = Math.abs(dd);
    if (a >= 1) { setShown(el, false); return; }
    setShown(el, true);
    // Wyjście i wejście nie zachodzą na siebie: w połowie drogi oba nagłówki są przezroczyste.
    el.style.opacity = clamp(1 - a * 2.4, 0, 1).toFixed(3);
    el.style.transform = `translate3d(0, ${(-dd * 90).toFixed(2)}px, 0)`;
  }
  function placeCards(el, dd) {
    const a = Math.abs(dd);
    if (a >= 1) { setShown(el, false); return; }
    setShown(el, true);
    el.style.opacity = "1";
    Array.from(el.children).forEach((c, k) => {
      const y = -dd * (110 + k * 46);
      const rx = clamp(dd * -16, -16, 16);
      const s = 1 - a * 0.05;
      c.style.opacity = clamp(1 - a * (2.4 + k * 0.3), 0, 1).toFixed(3);
      c.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotateX(${rx.toFixed(2)}deg) scale(${s.toFixed(4)})`;
    });
  }
  function render(p) {
    if (Math.abs(p - lastP) > 0.0004) dir = p > lastP ? 1 : -1;
    lastP = p;
    strip.style.transform = `translate3d(0, ${(-p * 100).toFixed(4)}%, 0)`;
    const frac = p - Math.floor(p);
    const bend = Math.sin(frac * Math.PI);
    deviceBody.style.transform = `rotateX(${(dir * bend * 7).toFixed(2)}deg) rotateY(${(dir * bend * -3).toFixed(2)}deg) scale(${(1 - bend * 0.035).toFixed(4)})`;
    chapters.forEach((c) => placeHead(c.head, p < c.a ? p - c.a : p > c.b ? p - c.b : 0));
    cardsOf.forEach((el, i) => placeCards(el, p - i));
    const a = clamp(Math.round(p), 0, N - 1);
    if (a !== active) onActive(a);
  }
  function onActive(a) {
    const prev = active;
    active = a;
    counterNow.textContent = String(a + 1);
    paintProgress(a);
    medias.forEach((m, i) => { m.inert = i !== a; });
    cardsOf.forEach((c, i) => { c.inert = i !== a; });
    chapters.forEach((c) => { c.head.inert = !(a >= c.a && a <= c.b); });
    if (prev >= 0) { stop(medias[prev]); clearTimers(medias[prev]); }
    const v = videoOf(medias[a]);
    deviceToggle.hidden = !v;
    if (v) paint(deviceToggle, !v.paused || (autoplayAllowed() && !userPaused.has(v)));
    wantPlay(medias[a]);
    enterScreen(medias[a]);
  }
  function startStage() {
    mode = "stage";
    root.classList.add("stage-on");
    track.style.setProperty("--n", String(N));
    medias.forEach((m, i) => {
      const ph = d.createComment("media");
      m.parentNode.insertBefore(ph, m);
      placeholders[i] = ph;
      m.style.setProperty("--i", String(i));
      strip.appendChild(m);
    });
    for (let i = 0; i < N; i += 1) {
      const mk = d.createElement("div");
      mk.className = "snap-mk";
      mk.style.top = `${i * 100}vh`;
      track.appendChild(mk);
      markers.push(mk);
    }
    bar.dataset.theme = "light";
    bar.classList.remove("cta-off");
    active = -1;
    st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => render(self.progress * (N - 1)),
      onRefresh: (self) => render(self.progress * (N - 1)),
    });
    render(st.progress * (N - 1));
  }
  function stopStage() {
    if (st) st.kill();
    st = null;
    markers.forEach((m) => m.remove());
    markers.length = 0;
    medias.forEach((m, i) => {
      stop(m);
      m.inert = false;
      placeholders[i].parentNode.insertBefore(m, placeholders[i]);
      placeholders[i].remove();
      m.style.removeProperty("--i");
    });
    shown.clear();
    [...chapters.map((c) => c.head), ...cardsOf].forEach((el) => {
      el.inert = false;
      el.removeAttribute("style");
      Array.from(el.children).forEach((c) => c.removeAttribute("style"));
    });
    strip.removeAttribute("style");
    deviceBody.removeAttribute("style");
    root.classList.remove("stage-on");
    active = -1;
  }

  /* Kółko i gładzik w trybie sceny.
     Chrome przy scroll-snap: mandatory cofa pojedynczy ząbek kółka (100 px) do tego samego punktu,
     więc mysz bez tej obsługi „nie przewija”. Jeden gest = jeden krok; bezwładność gładzika
     nie przeskakuje dalej, bo blokada trwa, dopóki zdarzenia gestu wygasają. */
  let lockUntil = 0;
  let lastWheelAt = 0;
  let lastAbs = 0;
  let acc = 0;
  function goStep(i) {
    const k = clamp(i, 0, N - 1);
    window.scrollTo({ top: track.offsetTop + k * window.innerHeight, behavior: "smooth" });
  }
  function onWheel(e) {
    if (mode !== "stage" || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
    const atEnd = window.scrollY >= track.offsetTop + (N - 1) * window.innerHeight - 2;
    if (atEnd && e.deltaY > 0) return; // za ostatnim krokiem zwykłe przewijanie do stopki
    e.preventDefault();
    const now = performance.now();
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    const abs = Math.abs(dy);
    const gap = now - lastWheelAt;
    lastWheelAt = now;
    const newGesture = gap > 180 || (abs > lastAbs * 1.8 && abs > 14);
    lastAbs = abs;
    if (now < lockUntil) {
      if (newGesture && now > lockUntil - 260) lockUntil = 0; else { lockUntil = Math.max(lockUntil, now + 140); return; }
    }
    if (gap > 180) acc = 0;
    acc += dy;
    if (Math.abs(acc) < 18) return;
    const from = st ? Math.round(st.progress * (N - 1)) : active;
    goStep(from + Math.sign(acc));
    acc = 0;
    lockUntil = now + 720;
  }
  window.addEventListener("wheel", onWheel, { passive: false });

  /* Kotwice w trybie sceny: rozdział albo krok = numer znacznika. */
  d.addEventListener("click", (e) => {
    if (mode !== "stage") return;
    const a = e.target.closest("a[href^='#']");
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    let i = steps.findIndex((s) => s.id === id);
    if (i < 0) { const ch = chapters.find((c) => c.el.id === id); if (ch) i = ch.a; }
    if (i < 0) return;
    e.preventDefault();
    window.scrollTo({ top: track.offsetTop + i * window.innerHeight, behavior: "smooth" });
    const target = cardsOf[i].querySelector("a, button") || null;
    if (target && e.detail === 0) setTimeout(() => target.focus({ preventScroll: true }), 700);
  });

  /* ---------------- Przełączanie trybu ---------------- */
  let gsapFailed = false;
  function pick() {
    const wantsStage = mqWide.matches && !mqReduce.matches && !gsapFailed;
    if (wantsStage && !(window.gsap && window.ScrollTrigger)) {
      // Scena potrzebuje GSAP; do czasu wczytania (albo błędu CDN) strona jest ukryta klasą stage-wait.
      root.classList.add("stage-wait");
      const fallback = setTimeout(() => { gsapFailed = true; pick(); }, 4000);
      window.__loadGsap().then(() => { clearTimeout(fallback); pick(); }, () => { clearTimeout(fallback); gsapFailed = true; pick(); });
      return;
    }
    root.classList.remove("stage-wait");
    const want = wantsStage ? "stage" : "feed";
    if (want === mode) return;
    if (mode === "stage") stopStage();
    if (mode === "feed") stopFeed();
    if (want === "stage") {
      window.gsap.registerPlugin(window.ScrollTrigger);
      startStage();
    } else {
      startFeed();
    }
    if (mqReduce.matches) staticCaption();
  }
  mqWide.addEventListener("change", pick);
  mqReduce.addEventListener("change", pick);
  pick();
  d.fonts && d.fonts.ready.then(() => { if (window.ScrollTrigger && mode === "stage") window.ScrollTrigger.refresh(); });
})();
