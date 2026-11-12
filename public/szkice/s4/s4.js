// Szkic S4: S3 (odpowiedź w hero układa stronę i wypełnia formularz) + przejście z obiektem „system” z S1 + rzut firmy z S2.
// Bez bibliotek: obrót obiektu liczy własna pętla z wygładzaniem (zamiast GSAP), plan to CSS 3D z kamerą w zmiennych CSS.
(() => {
  "use strict";
  const d = document;
  const html = d.documentElement;
  html.classList.add("js");
  const $ = (s, el = d) => el.querySelector(s);
  const $$ = (s, el = d) => Array.from(el.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const smooth = () => (reduced.matches ? "auto" : "smooth");

  // Zdarzenia pomiaru z burzy 12.11. W szkicu tylko kolejka w pamięci, bez wysyłki i bez cookies.
  window.dataLayer = window.dataLayer || [];
  const track = (event, params) => window.dataLayer.push(Object.assign({ event, szkic: "s4" }, params || {}));

  /* =====================================================================
     MOTYW: ?motyw=jasny|ciemny (ustawia motyw.js przed malowaniem) + przełącznik w rogu
     ===================================================================== */
  const THEME_COLOR = { jasny: "#F4EFE8", ciemny: "#0E0A07" };
  function syncTheme() {
    const m = html.getAttribute("data-motyw") === "ciemny" ? "ciemny" : "jasny";
    $$("[data-motyw-set]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.motywSet === m)));
    $("#motyw-name").textContent = m;
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[m]);
  }
  $$("[data-motyw-set]").forEach((b) => b.addEventListener("click", () => {
    const m = b.dataset.motywSet;
    if (html.getAttribute("data-motyw") === m) return;
    if (!reduced.matches) {
      html.classList.add("motyw-anim");
      clearTimeout(syncTheme._t);
      syncTheme._t = setTimeout(() => html.classList.remove("motyw-anim"), 520);
    }
    html.setAttribute("data-motyw", m);
    try { const u = new URL(location.href); u.searchParams.set("motyw", m); history.replaceState(null, "", u); } catch (e) { /* adres bez zmian */ }
    syncTheme();
  }));
  syncTheme();

  /* =====================================================================
     POKOJE: wybór z hero przebudowuje część „dopasowanie”, zaznacza pokój na planie i opinie w sekretariacie
     ===================================================================== */
  const ORDER = ["recepcja", "marketing", "sprzedaz", "operacje", "logistyka"];
  const DEFAULT_ROOM = "logistyka";
  // Pokój → odpowiedzi w pytaniu 4 formularza (FORMULARZ.md). Marketingu nie ma na liście, więc trafia do „Inne”.
  const ROOMS = {
    recepcja: { name: "telefony i recepcja", head: "Twój wybór: telefony i recepcja", pains: ["telefony"] },
    marketing: { name: "marketing", head: "Twój wybór: marketing", pains: ["inne"], other: "Marketing: blog i filmy" },
    sprzedaz: { name: "sprzedaż", head: "Twój wybór: sprzedaż", pains: ["klienci"] },
    operacje: { name: "zamówienia i operacje", head: "Twój wybór: zamówienia i operacje", pains: ["zamowienia"] },
    logistyka: { name: "logistyka i dokumenty", head: "Twój wybór: logistyka i dokumenty", pains: ["dokumenty", "programy"] },
  };
  const PLAN_NAME = { recepcja: "Recepcja", marketing: "Marketing", sprzedaz: "Sprzedaż", operacje: "Operacje", logistyka: "Logistyka" };
  const state = { picked: [], featured: DEFAULT_ROOM };

  const slotF = $("#slot-featured");
  const store = $("#room-store");
  // Referencje w mapie: replaceChildren odłącza poprzedni pokój, więc getElementById by go nie znalazł.
  const ROOM_EL = Object.fromEntries(ORDER.map((id) => [id, d.getElementById("pokoj-" + id)]));
  $("#przyklad").style.viewTransitionName = "demo-slot";
  $("#dowod").style.viewTransitionName = "proof-slot";
  slotF.style.viewTransitionName = "room-slot";

  function place(featured) {
    ORDER.filter((id) => id !== featured).forEach((id) => store.appendChild(ROOM_EL[id]));
    slotF.replaceChildren(ROOM_EL[featured]);
    $$(".demo").forEach((el) => { el.hidden = el.dataset.room !== featured; });
    $$(".proof").forEach((el) => { el.hidden = el.dataset.room !== featured; });
    $$(".key").forEach((k) => k.classList.toggle("is-featured", state.picked.length > 0 && k.dataset.room === featured));
    $("#rooms-h-txt").textContent = state.picked.length ? ROOMS[featured].head : "Jeden dział z bliska";
    $("#rooms-hint").hidden = state.picked.length > 0;
    selectExample($('.demo[data-room="' + featured + '"]'), 0, false);
  }

  function setFeatured(featured) {
    const changed = featured !== state.featured;
    state.featured = featured;
    if (changed) $('.demo[data-room="' + featured + '"]').dataset.played = "";
    if (changed && d.startViewTransition && !reduced.matches) d.startViewTransition(() => place(featured));
    else place(featured);
    queueDemo();
  }

  // Zaznaczenie wybranych obszarów poza częścią „dopasowanie”: plan, lista na telefonie, sekretariat.
  function markPicked() {
    const set = new Set(state.picked);
    $$(".room3").forEach((g) => g.classList.toggle("is-picked", set.has(g.dataset.room)));
    $$(".pl-item").forEach((li) => li.classList.toggle("is-picked", set.has(li.dataset.room)));
    $$(".slot[data-area]").forEach((s) => s.classList.toggle("is-match", set.has(s.dataset.area)));
    const sayBox = $("[data-stage-say] .bubble");
    if (sayBox) sayBox.textContent = set.size ? "Twój dział świeci na planie. Kliknij inny pokój." : "Kliknij pokój, a pokażę, co w nim pracuje.";
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
    if (!bz) return;
    bz.classList.add("happy");
    clearTimeout(bz._t);
    bz._t = setTimeout(() => bz.classList.remove("happy"), 1600);
  }
  function renderHero() {
    $$(".key").forEach((k) => k.setAttribute("aria-pressed", String(state.picked.includes(k.dataset.room))));
    // Odpowiedź Bzyka ma zarezerwowane miejsce pod klawiszami, żeby kliknięty klawisz nie przesuwał się pod palcem.
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

  let formStarted = false;
  function startForm(from) {
    if (formStarted) return;
    formStarted = true;
    track("form_start", { z: from });
  }

  function pick(room, { toggle, from }) {
    const i = state.picked.indexOf(room);
    if (i >= 0 && toggle) state.picked.splice(i, 1);
    else if (i < 0) state.picked.push(room);
    else { state.picked.splice(i, 1); state.picked.push(room); }
    const last = state.picked[state.picked.length - 1] || DEFAULT_ROOM;
    syncPains();
    renderHero();
    setFeatured(last);
    markPicked();
    if (state.picked.includes(room)) {
      happy(heroBzyk);
      startForm(from);
      track("form_step", { pytanie: 4, odpowiedz: room, z: from });
    }
    refreshForm();
  }

  $$(".key").forEach((k) => {
    k.addEventListener("click", () => pick(k.dataset.room, { toggle: true, from: "hero" }));
    k.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = k.getBoundingClientRect();
      k.style.setProperty("--mx", e.clientX - r.left + "px");
      k.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  /* ---------- odtwarzacze (puste ramki: stan odtwarzania, pauza, pasek) ---------- */
  function setPlaying(f, on) {
    f.classList.toggle("is-playing", on);
    f.setAttribute("aria-pressed", String(on));
  }
  $$("[data-player]").forEach((f) => f.setAttribute("aria-pressed", "false"));

  // Delegacja: działa też w klonach kart (panel planu, lista na telefonie).
  d.addEventListener("click", (e) => {
    const player = e.target.closest("[data-player]");
    if (player) {
      const on = !player.classList.contains("is-playing");
      $$("[data-player].is-playing").forEach((p) => { if (p !== player) setPlaying(p, false); });
      setPlaying(player, on);
      if (on) track("video_start", { film: player.getAttribute("aria-label") });
      return;
    }
    const show = e.target.closest("[data-show]");
    if (show) {
      setFeatured(show.dataset.show);
      $("#pokoje").scrollIntoView({ behavior: smooth(), block: "start" });
      return;
    }
    const yes = e.target.closest("[data-yes]");
    if (yes) {
      const room = yes.dataset.yes;
      if (!state.picked.includes(room)) pick(room, { toggle: false, from: yes.closest(".room-panel, .pl-detail") ? "plan" : "pokoj" });
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
    $("#formularz").scrollIntoView({ behavior: smooth(), block: "start" });
    happy($("#form-bzyk"));
  }

  /* =====================================================================
     PRZYKŁAD (demo): źródło → pola w tabeli (z S3)
     ===================================================================== */
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
    if (!animate || reduced.matches) { out.classList.remove("prep"); wrap.classList.remove("scanning"); return; }
    out.classList.add("prep");
    wrap.classList.remove("scanning");
    void wrap.offsetWidth;
    wrap.classList.add("scanning");
    const t = (fn, ms) => demo._timers.push(setTimeout(fn, ms));
    t(() => {
      rows.forEach((r, i) => { r.style.transitionDelay = i * 120 + "ms"; });
      out.classList.remove("prep");
      rows.forEach((r, i) => { t(() => lit(r, true), i * 120 + 120); t(() => lit(r, false), i * 120 + 900); });
      t(() => rows.forEach((r) => { r.style.transitionDelay = ""; }), rows.length * 120 + 900);
    }, 650);
    t(() => wrap.classList.remove("scanning"), 1000);
  }
  $$(".demo").forEach((demo) => {
    const tabs = $$('[role="tab"]', demo);
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => { selectExample(demo, i, true); track("demo_use", { obszar: demo.dataset.room, przyklad: tab.textContent }); });
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
  let demoInView = false;
  new IntersectionObserver((entries) => { demoInView = entries[0].isIntersecting; if (demoInView) queueDemo(); }, { threshold: 0.35 }).observe($("#przyklad"));
  function queueDemo() {
    if (!demoInView) return;
    const demo = $('.demo[data-room="' + state.featured + '"]');
    if (demo.dataset.played) return;
    demo.dataset.played = "1";
    setTimeout(() => selectExample(demo, 0, true), 250);
  }

  /* =====================================================================
     FORMULARZ Z BZYKIEM (z S3) + odpowiedź „Próbowaliśmy, ale nie wyszło” w pytaniu 6
     ===================================================================== */
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
    B: { t: "Proponuję drogę B: rozmowa o Mapie AI firmy", p: "Mapa AI firmy to pełny obraz Twojej firmy i plan systemów na kwartał i rok. Cena: 6 900 zł netto, w całości odliczana od pierwszego wdrożenia.", cal: "Kalendarz: rozmowa o Mapie AI firmy, 30 min", bz: "Wybierz termin rozmowy o Mapie AI firmy, potrwa 30 minut." },
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
      if (want.has(inp.value)) { inp.checked = true; opt.classList.add("pre"); }
      else if (opt.classList.contains("pre")) { inp.checked = false; opt.classList.remove("pre"); }
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
    return { pains, q6: q6 && q6.closest(".opt").classList.contains("pre") ? q6 : null };
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
    if (p.pains.length) chips.push("Pytanie 4: " + p.pains.map((i) => (i.value === "inne" && otherInput.value ? otherInput.value : labelOf(i))).join(", "));
    if (p.q6) chips.push("Pytanie 6: " + labelOf(p.q6));
    box.replaceChildren(...chips.map((c) => { const s = d.createElement("span"); s.textContent = c; return s; }));
    box.hidden = chips.length === 0;
  }
  const isBig = () => val("q2") === "Ponad 250" || val("q1") === "Zbieram oferty dla zarządu";
  function pathOf() { const r = $('input[name="q6"]:checked', form); return r ? r.dataset.path : "A"; }
  function lineFor(s) {
    if (s === "start") return startLine();
    if (s === "q4") return prefillState().pains.length ? LINES.q4pre : LINES.q4;
    if (s === "end") return isBig() ? "Wybierz termin pierwszej rozmowy z Bartkiem, potrwa 45 minut." : PATHS[pathOf()].bz;
    return LINES[s];
  }
  function renderEnd() {
    const droga = isBig() ? "A" : pathOf();
    const P = PATHS[droga];
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
    track("form_submit", { droga, duza_firma: isBig() });
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
    } else badge.hidden = true;
    if (step === "start") { renderPrefill(); swapText(formBubble, () => { formBubble.textContent = startLine(); }); }
    if (step === "q4") formBubble.textContent = lineFor("q4");
  }
  form.addEventListener("click", (e) => { if (e.target.closest("[data-next]")) { if (step === "start") startForm("formularz"); next(); } });
  form.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "q4") { t.closest(".opt").classList.remove("pre"); otherWrap.hidden = !$('input[name="q4"][value="inne"]', form).checked; }
    if (t.name === "q6") t.closest(".opt").classList.remove("pre");
    if (t.type === "radio" || t.type === "checkbox") track("form_step", { pytanie: QNUM[t.name] || t.name, odpowiedz: t.value });
    refreshForm();
    if (t.type === "radio" && step === t.name) setTimeout(next, reduced.matches ? 0 : 380);
  });
  form.addEventListener("submit", (e) => e.preventDefault());
  $("#back").addEventListener("click", () => show(STEPS[Math.max(STEPS.indexOf(step) - 1, 0)]));
  $("#cal-btn").addEventListener("click", () => { $("#cal-note").hidden = false; });
  $("#cookie-btn").addEventListener("click", () => {});

  /* =====================================================================
     PRZEJŚCIE (z S1): zdanie zapala się słowo po słowie; na desktopie obiekt obraca się z przewijaniem
     ===================================================================== */
  const sys = $("#system");
  const obj = $("#obj");
  const tagline = $("#tagline");
  const words = [];
  {
    // Dzielimy tylko po zwykłych spacjach: twarda spacja „w Twojej” zostaje w jednym słowie.
    const parts = tagline.textContent.trim().split(/ +/);
    tagline.textContent = "";
    parts.forEach((w, i) => {
      const s = d.createElement("span");
      s.className = "w";
      s.textContent = w;
      tagline.appendChild(s);
      if (i < parts.length - 1) tagline.appendChild(d.createTextNode(" "));
      words.push(s);
    });
  }
  let lastLit = -1;
  function setTagline(p) {
    const n = Math.round(Math.max(0, Math.min(1, p)) * words.length);
    if (n === lastLit) return;
    lastLit = n;
    words.forEach((w, i) => { w.classList.toggle("lit", i < n); w.classList.toggle("hot", i === n - 1 && n < words.length); });
  }
  const DM = matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const sysState = { target: 0, cur: 0, raf: 0, active: false };
  function applySys(p) {
    obj.style.setProperty("--rot", (-26 + 56 * p).toFixed(2) + "deg");
    obj.style.setProperty("--sweep", (-60 + 130 * p).toFixed(1));
    obj.style.setProperty("--obj-s", (0.94 + 0.16 * p).toFixed(3));
    obj.style.setProperty("--glow-o", (0.7 + 0.5 * p).toFixed(3));
    obj.style.setProperty("--glow-s", (0.9 + 0.25 * p).toFixed(3));
    setTagline((p - 0.04) / 0.52);
  }
  function sysTarget() {
    const r = sys.getBoundingClientRect();
    const span = r.height - innerHeight;
    return span > 0 ? clamp01(-r.top / span) : 0;
  }
  function sysLoop() {
    sysState.raf = 0;
    sysState.cur += (sysState.target - sysState.cur) * 0.12;
    if (Math.abs(sysState.target - sysState.cur) < 0.0008) sysState.cur = sysState.target;
    applySys(sysState.cur);
    if (sysState.cur !== sysState.target) sysState.raf = requestAnimationFrame(sysLoop);
  }
  function flowTagline() {
    const r = tagline.getBoundingClientRect(), vh = innerHeight;
    setTagline((vh * 0.88 - r.top) / (r.height + vh * 0.38));
  }
  function onSysScroll() {
    if (reduced.matches) return;
    if (DM.matches) {
      if (!sysState.active) return;
      sysState.target = sysTarget();
      if (!sysState.raf) sysState.raf = requestAnimationFrame(sysLoop);
    } else if (!onSysScroll._tick) {
      onSysScroll._tick = true;
      requestAnimationFrame(() => { onSysScroll._tick = false; flowTagline(); });
    }
  }
  function sysMode() {
    obj.style.cssText = "";
    lastLit = -1;
    if (reduced.matches) { setTagline(1); return; }
    if (DM.matches) { sysState.cur = sysState.target = sysTarget(); applySys(sysState.cur); }
    else flowTagline();
  }
  new IntersectionObserver((entries) => { sysState.active = entries[0].isIntersecting; if (sysState.active) onSysScroll(); }, { rootMargin: "200px 0px" }).observe(sys);
  addEventListener("scroll", onSysScroll, { passive: true });
  DM.addEventListener("change", sysMode);
  reduced.addEventListener("change", sysMode);
  sysMode();

  /* =====================================================================
     RZUT FIRMY (z S2): plan biura w CSS 3D, klik przybliża i otwiera panel; telefon: lista
     Układ w jednostkach świata: budynek 960 x 600. Budujemy tylko ściany zwrócone do kamery.
     ===================================================================== */
  const DESK = matchMedia("(min-width: 861px)");
  const W = 960, D = 600, HI = 110, LOW = 34;
  const PLAN = [
    { id: "marketing", x: 0, y: 0, w: 320, d: 330, floor: "fl-wood", lz: 150,
      items: [
        { x: 150, y: 8, w: 150, d: 8, h: 92, m: "paper" }, { x: 36, y: 150, w: 140, d: 54, h: 30, m: "oak" },
        { x: 52, y: 154, w: 44, d: 6, h: 28, z: 30, m: "screen" }, { x: 112, y: 154, w: 44, d: 6, h: 28, z: 30, m: "screen" },
        { x: 90, y: 224, w: 28, d: 28, h: 18, m: "dark" }, { x: 244, y: 82, w: 8, d: 8, h: 44, m: "dark" },
        { x: 226, y: 70, w: 44, d: 26, h: 38, z: 44, m: "soft" }, { x: 204, y: 214, w: 8, d: 8, h: 44, m: "dark" },
        { x: 194, y: 204, w: 28, d: 18, h: 16, z: 44, m: "dark" }
      ],
      flats: [{ x: 150, y: 16, w: 150, d: 70, cls: "paper-sweep" }], sun: [{ x: 20, w: 100 }] },
    { id: "sprzedaz", x: 320, y: 0, w: 330, d: 330, floor: "fl-carpet", lz: 150,
      items: [
        { x: 80, y: 6, w: 170, d: 6, h: 58, z: 22, m: "screen", cls: "big" }, { x: 60, y: 130, w: 210, d: 76, h: 30, m: "oak" },
        { x: 72, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" }, { x: 122, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 172, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" }, { x: 222, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 78, y: 222, w: 26, d: 26, h: 18, m: "dark" }, { x: 128, y: 222, w: 26, d: 26, h: 18, m: "dark" },
        { x: 178, y: 222, w: 26, d: 26, h: 18, m: "dark" }, { x: 228, y: 222, w: 26, d: 26, h: 18, m: "dark" },
        { x: 286, y: 276, w: 26, d: 26, h: 24, m: "dark" }, { x: 280, y: 270, w: 38, d: 38, h: 18, z: 24, m: "leaf" }
      ], sun: [{ x: 262, w: 60 }] },
    { id: "logistyka", x: 650, y: 0, w: 310, d: 600, floor: "fl-concrete", lz: 170,
      items: [
        { x: 24, y: 40, w: 40, d: 300, h: 86, m: "rack" }, { x: 100, y: 40, w: 40, d: 300, h: 86, m: "rack" },
        { x: 300, y: 150, w: 8, d: 170, h: 62, z: 24, m: "screen", cls: "big" }, { x: 196, y: 210, w: 70, d: 44, h: 30, m: "oak" },
        { x: 208, y: 214, w: 46, d: 6, h: 26, z: 30, m: "screen" }, { x: 190, y: 420, w: 56, d: 56, h: 8, m: "oak" },
        { x: 194, y: 424, w: 48, d: 48, h: 34, z: 8, m: "card" }, { x: 190, y: 500, w: 56, d: 56, h: 8, m: "oak" },
        { x: 197, y: 507, w: 42, d: 42, h: 22, z: 8, m: "card" }, { x: 40, y: 420, w: 56, d: 56, h: 8, m: "oak" },
        { x: 44, y: 424, w: 48, d: 48, h: 46, z: 8, m: "card" }
      ], sun: [{ x: 40, w: 100 }, { x: 180, w: 100 }] },
    { id: "recepcja", x: 0, y: 330, w: 320, d: 270, floor: "fl-stone", lz: 140,
      items: [
        { x: 110, y: 24, w: 28, d: 28, h: 18, m: "dark" }, { x: 50, y: 70, w: 150, d: 36, h: 32, m: "oak" },
        { x: 50, y: 106, w: 36, d: 70, h: 32, m: "oak" }, { x: 50, y: 66, w: 150, d: 4, h: 4, z: 32, m: "copper" },
        { x: 150, y: 80, w: 18, d: 14, h: 8, z: 32, m: "dark" }, { x: 170, y: 196, w: 110, d: 36, h: 16, m: "fabric" },
        { x: 170, y: 228, w: 110, d: 10, h: 34, m: "fabric" }, { x: 266, y: 40, w: 26, d: 26, h: 24, m: "dark" },
        { x: 260, y: 34, w: 38, d: 38, h: 18, z: 24, m: "leaf" }
      ], flats: [{ x: 150, y: 120, w: 130, d: 70, cls: "rug" }] },
    { id: "operacje", x: 320, y: 330, w: 330, d: 270, floor: "fl-plank", lz: 140,
      items: [
        { x: 40, y: 60, w: 130, d: 50, h: 30, m: "oak" }, { x: 56, y: 64, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 106, y: 64, w: 40, d: 6, h: 24, z: 30, m: "screen" }, { x: 40, y: 160, w: 130, d: 50, h: 30, m: "oak" },
        { x: 56, y: 164, w: 40, d: 6, h: 24, z: 30, m: "screen" }, { x: 106, y: 164, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 210, y: 60, w: 56, d: 44, h: 36, m: "paper" }, { x: 216, y: 66, w: 44, d: 26, h: 4, z: 36, m: "paper" },
        { x: 220, y: 160, w: 60, d: 40, h: 28, m: "dark" }, { x: 226, y: 166, w: 22, d: 28, h: 10, z: 28, m: "paper" },
        { x: 252, y: 166, w: 22, d: 28, h: 16, z: 28, m: "paper" }
      ] }
  ];
  const byId = Object.fromEntries(PLAN.map((r) => [r.id, r]));
  const stage = $("[data-stage]");
  const world = $("[data-world]");
  const panel = $("[data-panel]");
  let built = false;
  let activeId = null;
  let lastOpener = null;

  function div(cls, parent, css) {
    const e = d.createElement("div");
    e.className = cls;
    if (css) Object.assign(e.style, css);
    parent.appendChild(e);
    return e;
  }
  function box(parent, b, opts = {}) {
    const c = div("bx m-" + b.m + (b.cls ? " " + b.cls : ""), parent, { left: b.x + "px", top: b.y + "px", width: b.w + "px", height: b.d + "px", transform: b.z ? "translateZ(" + b.z + "px)" : "" });
    if (!opts.noTop) div("f ft", c, { transform: "translateZ(" + b.h + "px)" });
    const s = div("f fs", c, { height: b.h + "px", top: (b.d - b.h) + "px" });
    const w = div("f fw", c, { width: b.h + "px" });
    return { el: c, s, w };
  }
  const windowOn = (face, left, top, width, height) => div("win", face, { left: left + "px", top: top + "px", width: width + "px", height: height + "px" });

  function buildPlan() {
    if (built) return;
    built = true;
    const frag = d.createDocumentFragment();
    const root = div("grp", frag, { left: "0px", top: "0px", width: W + "px", height: D + "px" });
    div("ground flat", root, { position: "absolute", left: "-140px", top: "-100px", width: (W + 320) + "px", height: (D + 260) + "px", transform: "translateZ(-27px)", background: "var(--ground)" });
    box(root, { x: -10, y: -10, w: W + 20, d: D + 20, h: 26, z: -26, m: "plinth" }, { noTop: true });
    PLAN.forEach((r) => {
      const g = div("room3", root, { left: r.x + "px", top: r.y + "px", width: r.w + "px", height: r.d + "px" });
      g.dataset.room = r.id;
      div("floor flat " + r.floor, g);
      const lamp = Math.min(r.w, r.d) * 1.05;
      div("lamp flat", g, { left: (r.w - lamp) / 2 + "px", top: (r.d - lamp) / 2 + "px", width: lamp + "px", height: lamp + "px", transform: "translateZ(1px)" });
      (r.sun || []).forEach((s) => div("sunpatch flat", g, { left: s.x + "px", top: "0px", width: s.w + "px", height: "120px", transform: "translateZ(.6px) skewX(-24deg)", transformOrigin: "0 0" }));
      (r.flats || []).forEach((f) => {
        const rug = f.cls === "rug";
        div("flat", g, { position: "absolute", left: f.x + "px", top: f.y + "px", width: f.w + "px", height: f.d + "px", transform: "translateZ(.8px)",
          background: rug ? "radial-gradient(closest-side, rgba(255,230,200,.18), transparent), linear-gradient(135deg,#C98F57,#B0733A)" : "linear-gradient(180deg, var(--m-paper-t), var(--m-paper-s))",
          borderRadius: rug ? "6px" : "0", boxShadow: rug ? "inset 0 0 0 5px rgba(255,236,214,.25), 2px 3px 6px rgba(70,40,15,.18)" : "none" });
      });
      r.items.forEach((b) => {
        if (!b.z) div("cshadow flat", g, { left: b.x + "px", top: b.y + "px", width: b.w + "px", height: b.d + "px", transform: "translateZ(.4px)" });
        box(g, b);
      });
      // Etykieta pokoju: billboard z kreską do podłogi, zawsze zwrócony do kamery.
      const l = div("lbl", g, { left: r.w / 2 + "px", top: r.d / 2 + "px" });
      l.style.setProperty("--lz", r.lz + "px");
      const li = div("lbl-in flat", l);
      li.dataset.room = r.id;
      const pill = div("lbl-pill", li);
      pill.innerHTML = "<i></i>" + PLAN_NAME[r.id] + "<em>Twój wybór</em>";
      div("lbl-stem", li);
    });
    const north = box(root, { x: -10, y: -10, w: W + 20, d: 10, h: HI, m: "outer" });
    [[30, 100], [590, 70], [700, 100], [840, 100]].forEach((wv) => windowOn(north.s, wv[0], 14, wv[1], 52));
    const east = box(root, { x: W, y: -10, w: 10, d: D + 20, h: HI, m: "outer" });
    windowOn(east.w, 44, 400, 52, 150);
    box(root, { x: -10, y: D, w: 120, d: 10, h: LOW, m: "wall" });
    box(root, { x: 210, y: D, w: W - 200, d: 10, h: LOW, m: "wall" });
    box(root, { x: -10, y: 0, w: 10, d: D, h: LOW, m: "wall" });
    [
      { x: 316, y: 0, w: 8, d: 230 }, { x: 316, y: 290, w: 8, d: 40 }, { x: 316, y: 334, w: 8, d: 86 }, { x: 316, y: 480, w: 8, d: 120 },
      { x: 0, y: 326, w: 120, d: 8 }, { x: 180, y: 326, w: 136, d: 8 }, { x: 324, y: 326, w: 116, d: 8 }, { x: 500, y: 326, w: 146, d: 8 },
      { x: 646, y: 0, w: 8, d: 250 }, { x: 646, y: 310, w: 8, d: 130 }, { x: 646, y: 500, w: 8, d: 100 }
    ].forEach((p) => { p.h = LOW; p.m = "wall"; box(root, p); });
    // Bzyk nad planem (billboard) z jednym dymkiem w stanie spoczynku.
    const bz = div("plan-bzyk", root);
    const bzIn = div("plan-bzyk-in flat", bz);
    bzIn.innerHTML = '<svg class="bzyk" aria-hidden="true"><use href="#bzyk"/></svg>';
    const sayBox = $("[data-stage-say]");
    if (sayBox) bzIn.appendChild(sayBox);
    world.appendChild(frag);
    bindPlan();
    markPicked();
  }

  const setCam = (v) => { for (const k in v) world.style.setProperty("--cam-" + k, v[k]); };
  // Kalibracja: przy skali 1 mierzymy rzut budynku i dobieramy skalę oraz przesunięcie, żeby plan mieścił się w scenie.
  let base = { s: 0.8, tx: 0, ty: 0, w: 0, h: 0 };
  function measure() {
    const r = stage.getBoundingClientRect();
    if (built && (Math.abs(r.width - base.w) > 2 || Math.abs(r.height - base.h) > 2)) calibrate(r);
    return r;
  }
  function calibrate(r) {
    const prev = world.style.transition;
    world.style.transition = "none";
    setCam({ tx: "0px", ty: "0px", s: "1", rx: "56deg", rz: "-40deg", cx: "0px", cy: "0px" });
    let L = Infinity, T = Infinity, R = -Infinity, B = -Infinity;
    $$(".floor, .bx.m-outer .f, .bx.m-plinth .f", world).forEach((el) => {
      const b = el.getBoundingClientRect();
      if (!b.width) return;
      L = Math.min(L, b.left); T = Math.min(T, b.top); R = Math.max(R, b.right); B = Math.max(B, b.bottom);
    });
    const f = Math.min((r.width * 0.84) / (R - L), (r.height * 0.8) / (B - T), 1.05);
    const ucx = (L + R) / 2 - (r.left + r.width / 2), ucy = (T + B) / 2 - (r.top + r.height / 2);
    base = { s: f, tx: -ucx * f + r.width * 0.06, ty: -ucy * f + r.height * 0.05, w: r.width, h: r.height };
    void world.offsetWidth;
    world.style.transition = prev;
  }
  function idleCam() {
    measure();
    setCam({ tx: Math.round(base.tx) + "px", ty: Math.round(base.ty) + "px", s: base.s.toFixed(3), rx: "56deg", rz: "-40deg", cx: "0px", cy: "0px", bx: "70px", by: "1010px" });
  }
  function roomCam(r) {
    const rect = measure();
    const k = Math.max(1.18, Math.min(1.5, 470 / Math.max(r.w, r.d * 0.8)));
    setCam({ tx: Math.round(-rect.width * 0.17) + "px", ty: Math.round(rect.height * 0.1) + "px", s: (base.s * k).toFixed(3), rx: "50deg", rz: "-31deg",
      cx: -(r.x + r.w / 2 - W / 2) + "px", cy: -(r.y + r.d / 2 - D / 2) + "px", bx: (r.x + r.w * 0.8) + "px", by: (r.y + r.d * 0.6) + "px" });
  }

  // Klon karty pokoju (jedno źródło treści) do panelu planu i do listy na telefonie.
  function roomClone(id) {
    const c = ROOM_EL[id].cloneNode(true);
    c.removeAttribute("id");
    c.classList.add("in-panel");
    $$(".is-playing", c).forEach((p) => { p.classList.remove("is-playing"); p.setAttribute("aria-pressed", "false"); });
    return c;
  }

  const plBtns = $$(".pl-btn");
  function syncList() {
    plBtns.forEach((b) => {
      const li = b.parentNode;
      if (DESK.matches) { b.removeAttribute("aria-expanded"); b.setAttribute("aria-pressed", String(li.dataset.room === activeId)); }
      else { b.removeAttribute("aria-pressed"); b.setAttribute("aria-expanded", String(!$(".pl-detail", li).hidden)); }
    });
  }
  function selectRoom(id, fromKeyboard) {
    const r = byId[id];
    if (!r) return;
    activeId = id;
    $$(".room3", world).forEach((g) => g.classList.toggle("is-active", g.dataset.room === id));
    world.classList.add("is-zoomed");
    stage.classList.add("is-zoomed");
    roomCam(r);
    $$("[data-player].is-playing").forEach((p) => setPlaying(p, false));
    $("[data-panel-title]", panel).textContent = PLAN_NAME[id];
    $("[data-panel-step]", panel).textContent = (ORDER.indexOf(id) + 1) + " z 5";
    $("[data-panel-picked]", panel).hidden = !state.picked.includes(id);
    const body = $("[data-panel-body]", panel);
    body.replaceChildren(roomClone(id));
    const wasOpen = !panel.hidden && panel.classList.contains("is-open");
    panel.hidden = false;
    if (!wasOpen) { void panel.offsetWidth; panel.classList.add("is-open"); }
    else if (!reduced.matches) body.firstChild.style.animation = "fade-up .5s var(--ease)";
    syncList();
    track("room_open", { pokoj: id, z: "plan" });
    if (fromKeyboard) $("[data-panel-close]", panel).focus({ preventScroll: true });
  }
  function closeRoom() {
    if (!activeId) return;
    activeId = null;
    $$(".room3", world).forEach((g) => g.classList.remove("is-active"));
    world.classList.remove("is-zoomed");
    stage.classList.remove("is-zoomed");
    panel.classList.remove("is-open");
    $$("[data-player].is-playing", panel).forEach((p) => setPlaying(p, false));
    setTimeout(() => { if (!activeId) panel.hidden = true; }, reduced.matches ? 0 : 500);
    idleCam();
    syncList();
    if (lastOpener && d.activeElement && panel.contains(d.activeElement)) lastOpener.focus({ preventScroll: true });
  }
  function stepRoom(dir) {
    if (!activeId) return;
    const i = ORDER.indexOf(activeId);
    selectRoom(ORDER[(i + dir + ORDER.length) % ORDER.length], false);
  }
  function bindPlan() {
    world.addEventListener("pointerover", (e) => {
      const g = e.target.closest(".room3");
      $$(".room3.is-hover", world).forEach((x) => { if (x !== g) x.classList.remove("is-hover"); });
      if (g) g.classList.add("is-hover");
    });
    world.addEventListener("pointerleave", () => $$(".room3.is-hover", world).forEach((x) => x.classList.remove("is-hover")));
    world.addEventListener("click", (e) => {
      const g = e.target.closest("[data-room]");
      if (!g || g.dataset.room === activeId) return;
      lastOpener = $('.pl-item[data-room="' + g.dataset.room + '"] .pl-btn');
      selectRoom(g.dataset.room, false);
    });
    // Klik w puste tło sceny wraca do całego planu.
    stage.addEventListener("click", (e) => {
      if (!activeId || e.target.closest("[data-room]") || e.target.closest("[data-panel]")) return;
      closeRoom();
    });
  }
  $("[data-panel-close]", panel).addEventListener("click", closeRoom);
  $("[data-panel-prev]", panel).addEventListener("click", () => stepRoom(-1));
  $("[data-panel-next]", panel).addEventListener("click", () => stepRoom(1));
  d.addEventListener("keydown", (e) => {
    if (!activeId || !DESK.matches) return;
    if (e.key === "Escape") { closeRoom(); return; }
    if (e.target.closest && e.target.closest("input, textarea, [role=tab]")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); stepRoom(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); stepRoom(-1); }
  });
  // Lista pokoi: desktop wybiera pokój na planie, telefon rozwija pokój w miejscu.
  plBtns.forEach((b) => b.addEventListener("click", (e) => {
    const li = b.parentNode;
    const id = li.dataset.room;
    if (DESK.matches) {
      lastOpener = b;
      if (id === activeId) { closeRoom(); return; }
      const r = stage.getBoundingClientRect();
      if (r.top < -r.height * 0.3 || r.bottom > innerHeight + r.height * 0.3) stage.scrollIntoView({ behavior: smooth(), block: "center" });
      selectRoom(id, e.detail === 0);
      return;
    }
    const detail = $(".pl-detail", li);
    const open = detail.hidden;
    $$(".pl-detail").forEach((x) => { if (x !== detail && !x.hidden) { x.hidden = true; x.replaceChildren(); } });
    if (open) { detail.replaceChildren(roomClone(id)); track("room_open", { pokoj: id, z: "lista" }); }
    else detail.replaceChildren();
    detail.hidden = !open;
    syncList();
    if (open && !reduced.matches) setTimeout(() => {
      const t = li.getBoundingClientRect().top;
      if (t < 60 || t > innerHeight * 0.5) scrollBy({ top: t - 80, behavior: "smooth" });
    }, 60);
  }));
  // Start planu: budowa w wolnej chwili, przy wejściu jeden ruch kamery „przylot”.
  function arriveCam() {
    measure();
    if (reduced.matches) { idleCam(); return; }
    world.style.transition = "none";
    setCam({ tx: Math.round(base.tx) + "px", ty: Math.round(base.ty + 60) + "px", s: (base.s * 0.84).toFixed(3), rx: "36deg", rz: "-56deg", cx: "0px", cy: "0px", bx: "-260px", by: "-60px" });
    void world.offsetWidth;
    world.style.transition = "";
    world.classList.add("arrive");
    requestAnimationFrame(() => { idleCam(); setTimeout(() => world.classList.remove("arrive"), 1900); });
  }
  if (DESK.matches) {
    const planIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting || !DESK.matches) return;
        if (!built) { buildPlan(); idleCam(); }
        arriveCam();
        obs.disconnect();
      });
    }, { rootMargin: "0px 0px -25% 0px" });
    planIO.observe(stage);
    (window.requestIdleCallback || ((fn) => setTimeout(fn, 600)))(() => { if (!built && DESK.matches) { buildPlan(); idleCam(); } });
  }
  syncList();
  let resizeT = 0;
  addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      if (!DESK.matches) { if (activeId) closeRoom(); syncList(); return; }
      if (!built) buildPlan();
      if (activeId) roomCam(byId[activeId]); else idleCam();
      syncList();
    }, 150);
  });
  DESK.addEventListener("change", () => {
    if (!DESK.matches && activeId) closeRoom();
    $$(".pl-detail").forEach((x) => { x.hidden = true; x.replaceChildren(); });
    syncList();
  });

  /* =====================================================================
     WEJŚCIA SEKCJI
     ===================================================================== */
  const reveal = $$(".rooms-head, #slot-featured, .slot-demo, .slot-proof, .paths-head, .path, .own, .form-grid, .sec-head, .rack, .rack-h, .faq-grid");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });
  reveal.forEach((el) => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("rv"); io.observe(el); } });

  place(DEFAULT_ROOM);
  markPicked();
  show("start", { focus: false });
})();
