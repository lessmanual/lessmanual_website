// Szkic S3 „Rozmowa z Bzykiem”: odpowiedź w hero układa dalszą część strony i wypełnia formularz.
// Bez bibliotek: View Transitions (gdy przeglądarka ma) do płynnej przebudowy, IntersectionObserver do wejść.
(() => {
  "use strict";
  const d = document;
  const html = d.documentElement;
  html.classList.add("js");
  const $ = (s, el = d) => el.querySelector(s);
  const $$ = (s, el = d) => Array.from(el.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  const ORDER = ["recepcja", "marketing", "sprzedaz", "operacje", "logistyka"];
  const DEFAULT_ROOM = "logistyka";
  // Pokój → odpowiedzi w pytaniu 4 formularza (FORMULARZ.md). Marketingu nie ma na liście, więc trafia do „Inne”.
  const ROOMS = {
    recepcja: { name: "telefony i recepcja", pains: ["telefony"] },
    marketing: { name: "marketing", pains: ["inne"], other: "Marketing: blog i filmy" },
    sprzedaz: { name: "sprzedaż", pains: ["klienci"] },
    operacje: { name: "zamówienia i operacje", pains: ["zamowienia"] },
    logistyka: { name: "logistyka i dokumenty", pains: ["dokumenty", "programy"] },
  };
  const state = { picked: [], featured: DEFAULT_ROOM };

  /* ---------- pokoje: przebudowa części pod hero ---------- */
  const slotF = $("#slot-featured");
  const slotO = $("#slot-others");
  // Referencje trzymamy w mapie: replaceChildren odłącza poprzedni pokój od dokumentu, więc getElementById by go nie znalazł.
  const ROOM_EL = Object.fromEntries(ORDER.map((id) => [id, d.getElementById("pokoj-" + id)]));
  const roomEl = (id) => ROOM_EL[id];
  ORDER.forEach((id) => { roomEl(id).style.viewTransitionName = "room-" + id; });
  $("#przyklad").style.viewTransitionName = "demo-slot";
  $("#dowod").style.viewTransitionName = "proof-slot";

  function place(featured) {
    slotF.replaceChildren(roomEl(featured));
    ORDER.filter((id) => id !== featured).forEach((id) => slotO.appendChild(roomEl(id)));
    $$(".demo").forEach((el) => { el.hidden = el.dataset.room !== featured; });
    $$(".proof").forEach((el) => { el.hidden = el.dataset.room !== featured; });
    $$(".key").forEach((k) => k.classList.toggle("is-featured", state.picked.length > 0 && k.dataset.room === featured));
    $("#rooms-h-txt").textContent = state.picked.length
      ? "Twój wybór: " + ROOMS[featured].name + ". Pozostałe obszary są niżej."
      : "Pięć obszarów firmy, w których pracują nasze systemy";
    selectExample($('.demo[data-room="' + featured + '"]'), 0, false);
  }

  function setFeatured(featured) {
    const changed = featured !== state.featured;
    state.featured = featured;
    if (changed) $('.demo[data-room="' + featured + '"]').dataset.played = "";
    if (changed && d.startViewTransition && !reduced.matches) {
      d.startViewTransition(() => place(featured));
    } else {
      place(featured);
    }
    queueDemo();
  }

  /* ---------- hero: pięć klawiszy ---------- */
  const heroBzyk = $("#hero-bzyk");
  const askAfter = $("#ask-after");

  function swapText(el, render) {
    if (reduced.matches) { render(); return; }
    el.classList.add("swap");
    setTimeout(() => { render(); el.classList.remove("swap"); }, 180);
  }

  function happy(bz) {
    bz.classList.add("happy");
    clearTimeout(bz._t);
    bz._t = setTimeout(() => bz.classList.remove("happy"), 1600);
  }

  function renderHero() {
    $$(".key").forEach((k) => k.setAttribute("aria-pressed", String(state.picked.includes(k.dataset.room))));
    // Odpowiedź Bzyka stoi pod klawiszami w zarezerwowanym miejscu, żeby kliknięty klawisz nie przesuwał się pod palcem.
    const n = state.picked.length;
    const reply = $("#ask-reply");
    swapText(reply, () => {
      reply.textContent = n === 0 ? "" : n === 1
        ? "Zapisałem to w formularzu i ułożyłem niżej film, przykład i opinię z tego obszaru."
        : "Zapisałem " + n + " odpowiedzi w formularzu, niżej na górze jest ostatnia z nich.";
    });
    askAfter.classList.toggle("is-on", n > 0);
    $(".link-down", askAfter).tabIndex = n > 0 ? 0 : -1;
  }

  function pick(room, { toggle }) {
    const i = state.picked.indexOf(room);
    if (i >= 0 && toggle) {
      state.picked.splice(i, 1);
    } else if (i < 0) {
      state.picked.push(room);
    } else {
      state.picked.splice(i, 1);
      state.picked.push(room);
    }
    const last = state.picked[state.picked.length - 1] || DEFAULT_ROOM;
    syncPains();
    renderHero();
    setFeatured(last);
    if (state.picked.includes(room)) happy(heroBzyk);
    refreshForm();
  }

  $$(".key").forEach((k) => {
    k.addEventListener("click", () => pick(k.dataset.room, { toggle: true }));
    k.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = k.getBoundingClientRect();
      k.style.setProperty("--mx", e.clientX - r.left + "px");
      k.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // „Pokaż ten obszar” zmienia tylko układ; „Tak, to u nas” zapisuje odpowiedź i prowadzi do formularza.
  d.addEventListener("click", (e) => {
    const show = e.target.closest("[data-show]");
    if (show) {
      setFeatured(show.dataset.show);
      $("#pokoje").scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "start" });
      return;
    }
    const yes = e.target.closest("[data-yes]");
    if (yes) {
      const room = yes.dataset.yes;
      if (!state.picked.includes(room)) pick(room, { toggle: false });
      goToForm();
      return;
    }
    const path = e.target.closest("button[data-path]");
    if (path) {
      const map = { A: "A1", B: "B", C: "C" };
      const r = $('input[name="q6"][value="' + map[path.dataset.path] + '"]');
      r.checked = true;
      r.closest(".opt").classList.add("pre");
      refreshForm();
      goToForm();
    }
  });

  function goToForm() {
    $("#formularz").scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "start" });
    happy($("#form-bzyk"));
  }

  /* ---------- odtwarzacze (puste ramki: pokazują stan odtwarzania) ---------- */
  $$("[data-player]").forEach((b) => {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => {
      const on = !b.classList.contains("is-playing");
      b.classList.toggle("is-playing", on);
      b.setAttribute("aria-pressed", String(on));
    });
  });

  /* ---------- przykład: źródło → pola w tabeli ---------- */
  function lit(row, on) {
    row.classList.toggle("lit", on);
    const f = row.dataset.f;
    if (!f) return;
    const demo = row.closest(".demo");
    const src = $(".src:not([hidden])", demo);
    $$('mark[data-f="' + f + '"]', src).forEach((m) => m.classList.toggle("lit", on));
  }

  function selectExample(demo, ex, animate) {
    $$('[role="tab"]', demo).forEach((t) => {
      const on = Number(t.dataset.ex) === ex;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    $$(".src", demo).forEach((s) => { s.hidden = Number(s.dataset.ex) !== ex; });
    $$(".out-t", demo).forEach((t) => { t.hidden = Number(t.dataset.ex) !== ex; });
    const wrap = $(".src-wrap", demo);
    const out = $(".out", demo);
    const rows = Array.from($('.out-t[data-ex="' + ex + '"]', demo).rows);
    (demo._timers || []).forEach(clearTimeout);
    demo._timers = [];
    rows.forEach((r) => { r.classList.remove("lit"); r.style.transitionDelay = ""; });
    $$("mark.lit", demo).forEach((m) => m.classList.remove("lit"));
    if (!animate || reduced.matches) {
      out.classList.remove("prep");
      wrap.classList.remove("scanning");
      return;
    }
    out.classList.add("prep");
    wrap.classList.remove("scanning");
    void wrap.offsetWidth;
    wrap.classList.add("scanning");
    const t = (fn, ms) => demo._timers.push(setTimeout(fn, ms));
    t(() => {
      rows.forEach((r, i) => { r.style.transitionDelay = i * 120 + "ms"; });
      out.classList.remove("prep");
      rows.forEach((r, i) => {
        t(() => lit(r, true), i * 120 + 120);
        t(() => lit(r, false), i * 120 + 900);
      });
      t(() => rows.forEach((r) => { r.style.transitionDelay = ""; }), rows.length * 120 + 900);
    }, 650);
    t(() => wrap.classList.remove("scanning"), 1000);
  }

  $$(".demo").forEach((demo) => {
    const tabs = $$('[role="tab"]', demo);
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => selectExample(demo, i, true));
      tab.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const n = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
        tabs[n].focus();
        selectExample(demo, n, true);
      });
    });
    $$(".out-t tr", demo).forEach((r) => {
      r.addEventListener("pointerenter", () => lit(r, true));
      r.addEventListener("pointerleave", () => lit(r, false));
    });
  });

  // Pierwsze odtworzenie przykładu, gdy wjedzie w ekran (bez przejmowania przewijania).
  let demoInView = false;
  const demoIO = new IntersectionObserver((entries) => {
    demoInView = entries[0].isIntersecting;
    if (demoInView) queueDemo();
  }, { threshold: 0.35 });
  demoIO.observe($("#przyklad"));
  function queueDemo() {
    if (!demoInView) return;
    const demo = $('.demo[data-room="' + state.featured + '"]');
    if (demo.dataset.played) return;
    demo.dataset.played = "1";
    setTimeout(() => selectExample(demo, 0, true), 250);
  }

  /* ---------- formularz z Bzykiem ---------- */
  const form = $("#lead");
  const STEPS = ["start", "q1", "q2", "q4", "q6", "end"];
  const QNUM = { q1: 1, q2: 2, q4: 4, q6: 6 };
  const LINES = {
    q1: "Pytam, żeby dopasować rozmowę do Twojej roli.",
    q2: "Pytam, żeby dobrać skalę pierwszego systemu.",
    q4: "Te odpowiedzi pomogą nam przygotować się do rozmowy.",
    q4pre: "To pytanie wypełniłem z Twojego wyboru na górze strony, możesz dopisać inne odpowiedzi.",
    q6: "Od tej odpowiedzi zależy, jaką rozmowę zaproponujemy na końcu.",
  };
  const PATHS = {
    A: { t: "Proponuję drogę A: rozmowa z Bartkiem", p: "Na rozmowie przejdziemy przez to, co boli najbardziej. Potem dostaniesz spisany zakres: etapy z ceną i efekt, który ma dawać system.", cal: "Kalendarz: rozmowa z Bartkiem, 45 min", bz: "Wybierz termin rozmowy z Bartkiem, potrwa 45 minut." },
    B: { t: "Proponuję drogę B: rozmowa o Mapie AI firmy", p: "Mapa AI firmy to pełny obraz Twojej firmy i plan systemów na kwartał i rok. Cena: 6 900 zł netto, w całości odliczana od pierwszego wdrożenia.", cal: "Kalendarz: rozmowa o Mapie AI firmy, 30 min", bz: "Wybierz termin rozmowy o Mapie AI firmy, potrwa 30 minut." },
    C: { t: "Proponuję drogę C: rozmowa o pilocie", p: "W szybkim pilocie przez dwa tygodnie budujemy jeden proces na próbce Twoich danych i uruchamiamy go na naszej infrastrukturze. Szczegóły i koszt omówimy na rozmowie.", cal: "Kalendarz: rozmowa o pilocie, 30 min", bz: "Wybierz termin rozmowy o pilocie, potrwa 30 minut." },
  };
  const formBubble = $("#form-bubble");
  const otherWrap = $("#q4-other-wrap");
  const otherInput = $("#q4-other");
  let step = "start";

  const val = (name) => { const r = $('input[name="' + name + '"]:checked', form); return r ? r.value : ""; };
  const labelOf = (input) => input.closest(".opt").querySelector("span").textContent;
  const painInputs = () => $$('input[name="q4"]', form);

  // Odpowiedzi z pokoi trafiają do pytania 4. Zaznaczenia użytkownika (bez znacznika .pre) zostają nietknięte.
  function syncPains() {
    const want = new Set(state.picked.flatMap((r) => ROOMS[r].pains));
    painInputs().forEach((inp) => {
      const opt = inp.closest(".opt");
      if (want.has(inp.value)) {
        inp.checked = true;
        opt.classList.add("pre");
      } else if (opt.classList.contains("pre")) {
        inp.checked = false;
        opt.classList.remove("pre");
      }
    });
    if (state.picked.includes("marketing") && !otherInput.value) otherInput.value = ROOMS.marketing.other;
    if (!state.picked.includes("marketing") && otherInput.value === ROOMS.marketing.other) otherInput.value = "";
    otherWrap.hidden = !$('input[name="q4"][value="inne"]', form).checked;
  }

  function answeredCount() {
    let n = 0;
    if (val("q1")) n++;
    if (val("q2")) n++;
    if (painInputs().some((i) => i.checked)) n++;
    if (val("q6")) n++;
    return n;
  }

  function prefillState() {
    const pains = painInputs().filter((i) => i.checked && i.closest(".opt").classList.contains("pre"));
    const q6 = $('input[name="q6"]:checked', form);
    const q6pre = q6 && q6.closest(".opt").classList.contains("pre");
    return { pains, q6: q6pre ? q6 : null };
  }

  function startLine() {
    const p = prefillState();
    const k = (p.pains.length ? 1 : 0) + (p.q6 ? 1 : 0);
    if (!k) return "Cześć, jestem Bzyk. Mam 10 pytań o Twoją firmę, to zajmie około 2 minut.";
    return "Część formularza wypełniłem z Twoich wyborów na stronie, zostało " + (10 - k) + " pytań, około 2 minut.";
  }

  function renderPrefill() {
    const box = $("#prefill");
    const p = prefillState();
    const chips = [];
    if (p.pains.length) chips.push("Pytanie 4: " + p.pains.map(labelOf).join(", "));
    if (p.q6) chips.push("Pytanie 6: " + labelOf(p.q6));
    box.replaceChildren(...chips.map((c) => { const s = d.createElement("span"); s.textContent = c; return s; }));
    box.hidden = chips.length === 0;
  }

  function pathOf() {
    const r = $('input[name="q6"]:checked', form);
    return r ? r.dataset.path : "A";
  }

  function lineFor(s) {
    if (s === "start") return startLine();
    if (s === "q4") return prefillState().pains.length ? LINES.q4pre : LINES.q4;
    if (s === "end") {
      const big = val("q2") === "Ponad 250" || val("q1") === "Zbieram oferty dla zarządu";
      return big ? "Wybierz termin pierwszej rozmowy z Bartkiem, potrwa 45 minut." : PATHS[pathOf()].bz;
    }
    return LINES[s];
  }

  function renderEnd() {
    const big = val("q2") === "Ponad 250" || val("q1") === "Zbieram oferty dla zarządu";
    const P = PATHS[big ? "A" : pathOf()];
    $("#end-t").textContent = P.t;
    $("#end-p").textContent = P.p;
    $("#cal-t").textContent = P.cal;
    const items = [];
    if (val("q1")) items.push(val("q1"));
    if (val("q2")) items.push(val("q2") + " osób");
    painInputs().filter((i) => i.checked).forEach((i) => items.push(i.value === "inne" && otherInput.value ? otherInput.value : labelOf(i)));
    const q6 = $('input[name="q6"]:checked', form);
    if (q6) items.push(labelOf(q6));
    $("#answers").replaceChildren(...items.map((t) => { const li = d.createElement("li"); li.textContent = t; return li; }));
  }

  function show(s, { focus } = { focus: true }) {
    step = s;
    $$(".step", form).forEach((el) => { el.hidden = el.dataset.step !== s; });
    const n = QNUM[s];
    $("#step-n").textContent = s === "start" ? "10 pytań, około 2 minut" : s === "end" ? "Gotowe" : "Pytanie " + n + " z 10";
    $("#prog").style.setProperty("--p", s === "start" ? 0 : s === "end" ? 1 : n / 10);
    $("#back").hidden = s === "start";
    if (s === "end") renderEnd();
    if (s === "start") renderPrefill();
    swapText(formBubble, () => { formBubble.textContent = lineFor(s); });
    if (focus) {
      const target = $('.step:not([hidden]) .q-t, .step:not([hidden]) h3', form);
      if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
    }
  }

  function next() { show(STEPS[Math.min(STEPS.indexOf(step) + 1, STEPS.length - 1)]); }

  function refreshForm() {
    const n = answeredCount();
    const badge = $("#badge");
    if (n > 0) {
      const changed = badge.textContent !== String(n) || badge.hidden;
      badge.hidden = false;
      badge.textContent = String(n);
      badge.setAttribute("aria-label", "pytań wypełnionych w formularzu: " + n);
      if (changed && !reduced.matches) { badge.classList.remove("pop"); void badge.offsetWidth; badge.classList.add("pop"); }
    } else {
      badge.hidden = true;
    }
    if (step === "start") { renderPrefill(); swapText(formBubble, () => { formBubble.textContent = startLine(); }); }
    if (step === "q4") formBubble.textContent = lineFor("q4");
  }

  form.addEventListener("click", (e) => { if (e.target.closest("[data-next]")) next(); });
  form.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "q4") {
      t.closest(".opt").classList.remove("pre");
      otherWrap.hidden = !$('input[name="q4"][value="inne"]', form).checked;
    }
    if (t.name === "q6") t.closest(".opt").classList.remove("pre");
    refreshForm();
    if (t.type === "radio" && step === t.name) setTimeout(next, reduced.matches ? 0 : 380);
  });
  form.addEventListener("submit", (e) => e.preventDefault());
  $("#back").addEventListener("click", () => show(STEPS[Math.max(STEPS.indexOf(step) - 1, 0)]));
  $("#cal-btn").addEventListener("click", () => { $("#cal-note").hidden = false; });

  /* ---------- wejścia sekcji ---------- */
  const reveal = $$(".rooms-sec .h2, #slot-featured, .slot-demo, .slot-proof, .others-head, .slot-others, .own-obj, .own-txt, .proofs-sec .h2, .vids, .strip, .paths-head, .path, .form-grid, .faq-grid");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });
    reveal.forEach((el) => { el.classList.add("rv"); io.observe(el); });
  }

  place(DEFAULT_ROOM);
  show("start", { focus: false });
})();
