/* Szkic S2 „Plan firmy”. Bez bibliotek: plan biura to CSS 3D budowany z danych poniżej,
   kamera to zmienne CSS (@property) z przejściem, więc ruch liczy przeglądarka.
   Telefon (do 860 px) nie dostaje 3D: plan jest listą pokoi z miniaturą rzutu. */
(function () {
  "use strict";

  var RM = window.matchMedia("(prefers-reduced-motion: reduce)");
  var DESK = window.matchMedia("(min-width: 861px)");
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Bzyk (rysunek z komponentu strony, jeden SVG na miejsce) ---------- */
  var BZYK = '<svg class="bzyk" viewBox="0 0 240 182" aria-hidden="true" focusable="false">' +
    '<rect x="46" y="34" width="10" height="56" rx="5" fill="#8B4513"/><rect x="184" y="34" width="10" height="56" rx="5" fill="#8B4513"/>' +
    '<rect x="46" y="80" width="148" height="12" rx="6" fill="#8B4513"/>' +
    '<ellipse class="bzyk-rotor" cx="51" cy="32" rx="42" ry="7" fill="#6E3510" opacity=".85"/><ellipse class="bzyk-rotor" cx="189" cy="32" rx="42" ry="7" fill="#6E3510" opacity=".85"/>' +
    '<circle cx="51" cy="32" r="7" fill="#E09A55"/><circle cx="189" cy="32" r="7" fill="#E09A55"/>' +
    '<rect x="92" y="150" width="12" height="24" rx="6" fill="#8B4513"/><rect x="136" y="150" width="12" height="24" rx="6" fill="#8B4513"/>' +
    '<ellipse cx="98" cy="176" rx="11" ry="6" fill="#3A1C08"/><ellipse cx="142" cy="176" rx="11" ry="6" fill="#3A1C08"/>' +
    '<rect x="62" y="66" width="116" height="92" rx="46" fill="url(#bzyk-g)"/>' +
    '<path d="M84 76 Q120 66 156 76" stroke="#F8D2AA" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/>' +
    '<rect x="76" y="86" width="88" height="52" rx="26" fill="#141414"/>' +
    '<g class="bzyk-eyes" fill="#3FD0C2"><rect x="94" y="98" width="16" height="24" rx="8"/><rect x="130" y="98" width="16" height="24" rx="8"/></g>' +
    '<path d="M112 128 Q120 133 128 128" stroke="#E09A55" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>';
  $$("[data-bzyk-slot]").forEach(function (slot) { slot.innerHTML = BZYK; });

  /* ---------- Odtwarzacze (puste ramki: start i pauza sterowane przez widza) ---------- */
  $$("[data-player]").forEach(function (p) {
    p.style.setProperty("--len", (p.getAttribute("data-len") || "30") + "s");
    var b = $("[data-play]", p);
    if (b) b.setAttribute("data-label", b.getAttribute("aria-label"));
  });
  function stopPlayer(p) {
    p.classList.remove("is-playing");
    var b = $("[data-play]", p);
    if (b) b.setAttribute("aria-label", b.getAttribute("data-label"));
  }
  function togglePlayer(p) {
    var playing = p.classList.contains("is-playing");
    $$(".frame.is-playing").forEach(stopPlayer);
    if (playing) return;
    p.classList.add("is-playing");
    var b = $("[data-play]", p);
    if (b) b.setAttribute("aria-label", "Zatrzymaj. " + b.getAttribute("data-label"));
  }
  document.addEventListener("animationend", function (e) {
    if (e.animationName !== "prog") return;
    var p = e.target.closest("[data-player]");
    if (!p) return;
    stopPlayer(p);
    e.target.style.animation = "none";
    void e.target.offsetWidth;
    e.target.style.animation = "";
  });

  /* ---------- Formularz (szkic: pytania 1, 2 i 6, potem propozycja drogi) ---------- */
  var form = $("[data-form]");
  var steps = $$("[data-step]", form);
  var sayEl = $("[data-form-say]", form);
  var progEl = $("[data-progress]", form);
  var barEl = $("[data-bar]", form);
  var backBtn = $("[data-back]", form);
  var nextBtn = $("[data-next]", form);
  var hintEl = $("[data-hint]", form);
  var painsWrap = $("[data-pains]", form);
  var painsList = $("[data-pains-list]", form);
  var pains = [];
  var current = 0;
  var PROG = ["Pytanie 1 z 10", "Pytanie 2 z 10", "Pytanie 6 z 10", "Termin rozmowy"];
  var BAR = [0.1, 0.2, 0.6, 1];
  var SAY = [
    "Pytam, żeby dopasować rozmowę do Twojej roli.",
    "Pytam, żeby dobrać skalę pierwszego systemu.",
    "Od tej odpowiedzi zależy, jaką rozmowę zaproponujemy na końcu."
  ];
  var PATHS = {
    A: { tag: "Droga A", title: "Rozmowa z Bartkiem, 45 minut", say: "Wybierz termin rozmowy z Bartkiem, potrwa 45 minut.", text: "Na rozmowie przejdziemy przez to, co boli najbardziej. Potem dostaniesz spisany zakres: etapy z ceną i efekt, który ma dawać system.", cal: "wybór terminu rozmowy, 45 min" },
    B: { tag: "Droga B · Mapa AI firmy", title: "Rozmowa o Mapie AI firmy, 30 minut", say: "Wybierz termin rozmowy o Mapie AI firmy, potrwa 30 minut.", text: "Mapa AI firmy to pełny obraz Twojej firmy i plan systemów na kwartał i rok. Cena: 6 900 zł netto, w całości odliczana od pierwszego wdrożenia.", cal: "wybór terminu rozmowy, 30 min" },
    C: { tag: "Droga C · szybki pilot", title: "Rozmowa o pilocie, 30 minut", say: "Wybierz termin rozmowy o pilocie, potrwa 30 minut.", text: "W szybkim pilocie przez dwa tygodnie budujemy jeden proces na próbce Twoich danych i uruchamiamy go na naszej infrastrukturze. Szczegóły i koszt omówimy na rozmowie.", cal: "wybór terminu rozmowy, 30 min" },
    BIG: { tag: "Pierwsza rozmowa", title: "Rozmowa z Bartkiem, 45 minut", say: "Wybierz termin pierwszej rozmowy z Bartkiem, potrwa 45 minut.", text: "Na pierwszej rozmowie poznamy Twoją firmę i ustalimy, jak poprowadzimy dalsze kroki.", cal: "wybór terminu rozmowy, 45 min" }
  };

  function say(text) {
    if (sayEl.textContent === text) return;
    sayEl.textContent = text;
    if (!RM.matches) { sayEl.style.animation = "none"; void sayEl.offsetWidth; sayEl.style.animation = "fadeUp .45s var(--ease)"; }
  }
  function stepAnswered(n) {
    var s = steps[n];
    return !!(s && $("input:checked", s));
  }
  function syncNav() {
    backBtn.hidden = current === 0;
    var answered = current < 3 && stepAnswered(current);
    nextBtn.hidden = !answered;
    hintEl.hidden = answered || current === 3;
  }
  function goStep(n, opts) {
    opts = opts || {};
    current = n;
    steps.forEach(function (s, i) { s.hidden = i !== n; });
    progEl.textContent = PROG[n];
    barEl.style.transform = "scaleX(" + BAR[n] + ")";
    if (n < 3 && !opts.keepSay) say(SAY[n]);
    if (n === 3) showEnd();
    syncNav();
    if (opts.focus) {
      var target = n === 3 ? steps[3] : $("input", steps[n]);
      if (target) target.focus({ preventScroll: true });
    }
  }
  function showEnd() {
    var etap = $("input[name=etap]:checked", form);
    var rola = $("input[name=rola]:checked", form);
    var ludzie = $("input[name=ludzie]:checked", form);
    var key = etap ? etap.value : "A";
    var big = (ludzie && ludzie.value === "Ponad 250") || (rola && rola.value === "Zbieram oferty dla zarządu");
    var p = PATHS[big ? "BIG" : key];
    $("[data-end-path]", form).textContent = p.tag;
    $("[data-end-title]", form).textContent = p.title;
    $("[data-end-text]", form).textContent = p.text;
    $("[data-cal-cap]", form).textContent = p.cal;
    say(p.say);
  }
  function scrollToForm() {
    var target = $("#rozmowa");
    target.scrollIntoView({ behavior: RM.matches ? "auto" : "smooth", block: "start" });
  }
  form.addEventListener("change", function (e) {
    var input = e.target;
    if (!input.matches("input[type=radio]")) return;
    syncNav();
    var n = current;
    if (n >= 3) return;
    window.setTimeout(function () { if (current === n) goStep(n + 1, { focus: true }); }, RM.matches ? 0 : 320);
  });
  nextBtn.addEventListener("click", function () { if (current < 3) goStep(current + 1, { focus: true }); });
  backBtn.addEventListener("click", function () { if (current > 0) goStep(current - 1, { focus: true }); });

  function renderPains() {
    painsList.innerHTML = "";
    pains.forEach(function (p) {
      var chip = document.createElement("span");
      chip.className = "pain-chip";
      chip.appendChild(document.createTextNode(p));
      var x = document.createElement("button");
      x.type = "button";
      x.setAttribute("aria-label", "Usuń: " + p);
      x.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      x.addEventListener("click", function () { pains = pains.filter(function (q) { return q !== p; }); renderPains(); });
      chip.appendChild(x);
      painsList.appendChild(chip);
    });
    painsWrap.hidden = pains.length === 0;
  }
  function addPain(p) {
    if (pains.indexOf(p) === -1) pains.push(p);
    renderPains();
    say("Zaznaczyłem w pytaniu 4: " + p + ".");
  }

  // Pierwsze pytanie w hero: odpowiedź przenosi do formularza na pytanie 2.
  var heroQ1 = $("[data-hero-q1]");
  heroQ1.addEventListener("submit", function (e) { e.preventDefault(); });
  heroQ1.addEventListener("change", function (e) {
    var v = e.target.value;
    var r = $('input[name=rola][value="' + v + '"]', form);
    if (r) r.checked = true;
    window.setTimeout(function () {
      goStep(1);
      scrollToForm();
      window.setTimeout(function () { var i = $("input", steps[1]); if (i) i.focus({ preventScroll: true }); }, RM.matches ? 0 : 700);
    }, RM.matches ? 0 : 260);
  });

  /* ---------- Delegacja: odtwarzacze, „To u Was?”, drogi ---------- */
  document.addEventListener("click", function (e) {
    var play = e.target.closest("[data-play]");
    if (play) { togglePlayer(play.closest("[data-player]")); return; }
    var pain = e.target.closest("[data-pain]");
    if (pain) { addPain(pain.getAttribute("data-pain")); scrollToForm(); return; }
    var path = e.target.closest("[data-path]");
    if (path) {
      var key = path.getAttribute("data-path");
      var radio = $('input[name=etap][value="' + key + '"]', form);
      if (radio) radio.checked = true;
      goStep(stepAnswered(0) && stepAnswered(1) ? 2 : (stepAnswered(0) ? 1 : 0), { keepSay: true });
      say("Zaznaczyłem odpowiedź w pytaniu 6. Zostały pytania o rolę i wielkość firmy.");
      scrollToForm();
    }
  });

  /* ---------- Zakładki (demo dokumentu i drzwi dróg): wzorzec tablist ---------- */
  function tablist(root, onSelect) {
    var tabs = $$('[role="tab"]', root);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      onSelect(tab);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t, false); });
      t.addEventListener("keydown", function (e) {
        var d = 0;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") d = 1;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") d = -1;
        if (!d) return;
        e.preventDefault();
        select(tabs[(i + d + tabs.length) % tabs.length], true);
      });
    });
    return select;
  }

  // Demo dokumentu: światło skanu przechodzi po kartce, pola zapalają się po kolei i trafiają do tabeli.
  var desk = $(".doc-desk");
  var scanTimers = [];
  function runScan(key) {
    scanTimers.forEach(clearTimeout);
    scanTimers = [];
    var sheet = $('[data-doc="' + key + '"]');
    $$(".out-table").forEach(function (t) { t.hidden = t.getAttribute("data-out") !== key; });
    var table = $('[data-out="' + key + '"]');
    var fields = $$("[data-f]", sheet).sort(function (a, b) { return a.getAttribute("data-f") - b.getAttribute("data-f"); });
    var rows = $$("tr[data-r]", table);
    $$("[data-f]").forEach(function (f) { f.classList.remove("hit"); });
    rows.forEach(function (r) { r.classList.remove("on", "settled"); });
    if (RM.matches) {
      table.classList.remove("pending");
      fields.forEach(function (f) { f.classList.add("hit"); });
      rows.forEach(function (r) { r.classList.add("on", "settled"); });
      return;
    }
    table.classList.add("pending");
    desk.classList.remove("scanning");
    void desk.offsetWidth;
    desk.classList.add("scanning");
    rows.forEach(function (r, i) {
      scanTimers.push(window.setTimeout(function () {
        var f = fields.filter(function (x) { return x.getAttribute("data-f") === r.getAttribute("data-r"); })[0];
        if (f) f.classList.add("hit");
        r.classList.add("on");
        scanTimers.push(window.setTimeout(function () { r.classList.add("settled"); }, 900));
      }, 520 + i * 230));
    });
  }
  var currentDoc = "fv";
  tablist($(".doc-picker"), function (tab) {
    currentDoc = tab.id.replace("tab-", "");
    runScan(currentDoc);
  });
  if ("IntersectionObserver" in window) {
    var demoSeen = false;
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting && !demoSeen) { demoSeen = true; runScan(currentDoc); obs.disconnect(); }
    }, { threshold: 0.35 }).observe(desk);
  } else { runScan(currentDoc); }

  tablist($(".doors"), function () {});

  /* ---------- Nawigacja: bieżąca sekcja ---------- */
  var navLinks = $$(".nav nav a");
  if ("IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id ? "true" : "false"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["pokoje", "dokument", "opinie", "drogi"].forEach(function (id) { var s = document.getElementById(id); if (s) navIO.observe(s); });
  }

  /* ---------- Rolka w hero: lekki obrót za kursorem (tylko desktop, bez ograniczenia ruchu) ---------- */
  var reel = $(".hero-reel .frame-reel");
  var hero = $(".hero");
  if (reel && window.matchMedia("(pointer: fine)").matches) {
    var raf = 0, px = 0, py = 0;
    hero.addEventListener("pointermove", function (e) {
      if (RM.matches || !DESK.matches) return;
      var r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        raf = 0;
        reel.style.setProperty("--try", (-9 + px * 10).toFixed(2) + "deg");
        reel.style.setProperty("--trx", (3 - py * 7).toFixed(2) + "deg");
      });
    });
  }

  /* =====================================================================
     PLAN FIRMY (CSS 3D)
     Układ w jednostkach świata: budynek 960 x 600. Widoczne ściany brył to góra,
     południe (+y) i zachód (-x): przy obrocie rotateZ od -25 do -50 stopni pozostałe
     są zawsze tyłem do kamery, więc ich nie budujemy.
     ===================================================================== */
  var W = 960, D = 600, HI = 110, LOW = 34;
  var ROOMS = [
    { id: "marketing", name: "Marketing", x: 0, y: 0, w: 320, d: 330, floor: "fl-wood", lz: 150,
      items: [
        { x: 150, y: 8, w: 150, d: 8, h: 92, m: "paper" },
        { x: 36, y: 150, w: 140, d: 54, h: 30, m: "oak" },
        { x: 52, y: 154, w: 44, d: 6, h: 28, z: 30, m: "screen" },
        { x: 112, y: 154, w: 44, d: 6, h: 28, z: 30, m: "screen" },
        { x: 90, y: 224, w: 28, d: 28, h: 18, m: "dark" },
        { x: 244, y: 82, w: 8, d: 8, h: 44, m: "dark" },
        { x: 226, y: 70, w: 44, d: 26, h: 38, z: 44, m: "soft" },
        { x: 204, y: 214, w: 8, d: 8, h: 44, m: "dark" },
        { x: 194, y: 204, w: 28, d: 18, h: 16, z: 44, m: "dark" }
      ],
      flats: [{ x: 150, y: 16, w: 150, d: 70, cls: "paper-sweep" }],
      sun: [{ x: 20, w: 100 }] },
    { id: "sprzedaz", name: "Sprzedaż", x: 320, y: 0, w: 330, d: 330, floor: "fl-carpet", lz: 150,
      items: [
        { x: 80, y: 6, w: 170, d: 6, h: 58, z: 22, m: "screen", cls: "big" },
        { x: 60, y: 130, w: 210, d: 76, h: 30, m: "oak" },
        { x: 72, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 122, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 172, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 222, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 78, y: 222, w: 26, d: 26, h: 18, m: "dark" },
        { x: 128, y: 222, w: 26, d: 26, h: 18, m: "dark" },
        { x: 178, y: 222, w: 26, d: 26, h: 18, m: "dark" },
        { x: 228, y: 222, w: 26, d: 26, h: 18, m: "dark" },
        { x: 286, y: 276, w: 26, d: 26, h: 24, m: "dark" },
        { x: 280, y: 270, w: 38, d: 38, h: 18, z: 24, m: "leaf" }
      ],
      sun: [{ x: 262, w: 60 }] },
    { id: "logistyka", name: "Logistyka", x: 650, y: 0, w: 310, d: 600, floor: "fl-concrete", lz: 170,
      items: [
        { x: 24, y: 40, w: 40, d: 300, h: 86, m: "rack" },
        { x: 100, y: 40, w: 40, d: 300, h: 86, m: "rack" },
        { x: 300, y: 150, w: 8, d: 170, h: 62, z: 24, m: "screen", cls: "big" },
        { x: 196, y: 210, w: 70, d: 44, h: 30, m: "oak" },
        { x: 208, y: 214, w: 46, d: 6, h: 26, z: 30, m: "screen" },
        { x: 190, y: 420, w: 56, d: 56, h: 8, m: "oak" },
        { x: 194, y: 424, w: 48, d: 48, h: 34, z: 8, m: "card" },
        { x: 190, y: 500, w: 56, d: 56, h: 8, m: "oak" },
        { x: 197, y: 507, w: 42, d: 42, h: 22, z: 8, m: "card" },
        { x: 40, y: 420, w: 56, d: 56, h: 8, m: "oak" },
        { x: 44, y: 424, w: 48, d: 48, h: 46, z: 8, m: "card" }
      ],
      sun: [{ x: 40, w: 100 }, { x: 180, w: 100 }] },
    { id: "recepcja", name: "Recepcja", x: 0, y: 330, w: 320, d: 270, floor: "fl-stone", lz: 140,
      items: [
        { x: 110, y: 24, w: 28, d: 28, h: 18, m: "dark" },
        { x: 50, y: 70, w: 150, d: 36, h: 32, m: "oak" },
        { x: 50, y: 106, w: 36, d: 70, h: 32, m: "oak" },
        { x: 50, y: 66, w: 150, d: 4, h: 4, z: 32, m: "copper" },
        { x: 150, y: 80, w: 18, d: 14, h: 8, z: 32, m: "dark" },
        { x: 170, y: 196, w: 110, d: 36, h: 16, m: "fabric" },
        { x: 170, y: 228, w: 110, d: 10, h: 34, m: "fabric" },
        { x: 266, y: 40, w: 26, d: 26, h: 24, m: "dark" },
        { x: 260, y: 34, w: 38, d: 38, h: 18, z: 24, m: "leaf" }
      ],
      flats: [{ x: 150, y: 120, w: 130, d: 70, cls: "rug" }] },
    { id: "operacje", name: "Operacje", x: 320, y: 330, w: 330, d: 270, floor: "fl-plank", lz: 140,
      items: [
        { x: 40, y: 60, w: 130, d: 50, h: 30, m: "oak" },
        { x: 56, y: 64, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 106, y: 64, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 40, y: 160, w: 130, d: 50, h: 30, m: "oak" },
        { x: 56, y: 164, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 106, y: 164, w: 40, d: 6, h: 24, z: 30, m: "screen" },
        { x: 210, y: 60, w: 56, d: 44, h: 36, m: "paper" },
        { x: 216, y: 66, w: 44, d: 26, h: 4, z: 36, m: "paper" },
        { x: 220, y: 160, w: 60, d: 40, h: 28, m: "dark" },
        { x: 226, y: 166, w: 22, d: 28, h: 10, z: 28, m: "paper" },
        { x: 252, y: 166, w: 22, d: 28, h: 16, z: 28, m: "paper" }
      ] }
  ];
  var ORDER = ["recepcja", "marketing", "sprzedaz", "operacje", "logistyka"];
  var byId = {};
  ROOMS.forEach(function (r) { byId[r.id] = r; });

  var stage = $("[data-stage]");
  var world = $("[data-world]");
  var panel = $("[data-panel]");
  var built = false;
  var activeId = null;
  var s0 = 0.8;

  function div(cls, parent, css) {
    var e = document.createElement("div");
    e.className = cls;
    if (css) for (var k in css) e.style[k] = css[k];
    parent.appendChild(e);
    return e;
  }
  function box(parent, b, opts) {
    opts = opts || {};
    var c = div("bx m-" + b.m + (b.cls ? " " + b.cls : ""), parent, {
      left: b.x + "px", top: b.y + "px", width: b.w + "px", height: b.d + "px",
      transform: b.z ? "translateZ(" + b.z + "px)" : ""
    });
    if (!opts.noTop) div("f ft", c, { transform: "translateZ(" + b.h + "px)" });
    var s = div("f fs", c, { height: b.h + "px", top: (b.d - b.h) + "px" });
    var w = div("f fw", c, { width: b.h + "px" });
    return { el: c, s: s, w: w };
  }
  function windowOn(face, left, top, width, height) {
    div("win", face, { left: left + "px", top: top + "px", width: width + "px", height: height + "px" });
  }

  function buildPlan() {
    if (built) return;
    built = true;
    var frag = document.createDocumentFragment();
    var root = div("grp", frag, { left: "0px", top: "0px", width: W + "px", height: D + "px" });

    // Grunt: miękki cień budynku na podłożu (światło z lewej góry).
    div("ground flat", root, {
      left: "-140px", top: "-100px", width: (W + 320) + "px", height: (D + 260) + "px",
      transform: "translateZ(-27px)",
      background: "radial-gradient(48% 46% at 56% 58%, rgba(80,45,15,.30), rgba(80,45,15,.12) 55%, rgba(80,45,15,0) 75%)"
    });
    box(root, { x: -10, y: -10, w: W + 20, d: D + 20, h: 26, z: -26, m: "plinth" }, { noTop: true });

    ROOMS.forEach(function (r) {
      var g = div("room", root, { left: r.x + "px", top: r.y + "px", width: r.w + "px", height: r.d + "px" });
      g.setAttribute("data-room", r.id);
      div("floor flat " + r.floor, g);
      var lampSize = Math.min(r.w, r.d) * 1.05;
      div("lamp flat", g, { left: (r.w - lampSize) / 2 + "px", top: (r.d - lampSize) / 2 + "px", width: lampSize + "px", height: lampSize + "px", transform: "translateZ(1px)" });
      (r.sun || []).forEach(function (s) {
        div("sunpatch flat", g, { left: s.x + "px", top: "0px", width: s.w + "px", height: "120px", transform: "translateZ(.6px) skewX(-24deg)", transformOrigin: "0 0" });
      });
      (r.flats || []).forEach(function (f) {
        var bg = f.cls === "rug"
          ? "radial-gradient(closest-side, rgba(255,230,200,.18), transparent), linear-gradient(135deg,#C98F57,#B0733A)"
          : "linear-gradient(180deg,#F6EEE2,#FBF6EE)";
        div("flat", g, { position: "absolute", left: f.x + "px", top: f.y + "px", width: f.w + "px", height: f.d + "px", transform: "translateZ(.8px)", background: bg, borderRadius: f.cls === "rug" ? "6px" : "0", boxShadow: f.cls === "rug" ? "inset 0 0 0 5px rgba(255,236,214,.25), 2px 3px 6px rgba(70,40,15,.18)" : "none" });
      });
      r.items.forEach(function (b) {
        if (!b.z) div("cshadow flat", g, { left: b.x + "px", top: b.y + "px", width: b.w + "px", height: b.d + "px", transform: "translateZ(.4px)" });
        box(g, b);
      });
      // Etykieta pokoju: billboard z kreską do podłogi.
      var l = div("lbl", g, { left: r.w / 2 + "px", top: r.d / 2 + "px" });
      l.style.setProperty("--lz", r.lz + "px");
      var li = div("lbl-in flat", l);
      li.setAttribute("data-room", r.id);
      var pill = div("lbl-pill", li);
      pill.innerHTML = "<i></i>" + r.name;
      div("lbl-stem", li);
    });

    // Ściany zewnętrzne z oknami (tył: północ i wschód, wysokie) i niskie ściany frontu.
    var north = box(root, { x: -10, y: -10, w: W + 20, d: 10, h: HI, m: "outer" });
    [[30, 100], [590, 70], [700, 100], [840, 100]].forEach(function (wv) { windowOn(north.s, wv[0], 14, wv[1], 52); });
    var east = box(root, { x: W, y: -10, w: 10, d: D + 20, h: HI, m: "outer" });
    windowOn(east.w, 44, 400, 52, 150);
    box(root, { x: -10, y: D, w: 120, d: 10, h: LOW, m: "wall" });
    box(root, { x: 210, y: D, w: W - 200, d: 10, h: LOW, m: "wall" });
    box(root, { x: -10, y: 0, w: 10, d: D, h: LOW, m: "wall" });
    // Ścianki działowe z przejściami.
    [
      { x: 316, y: 0, w: 8, d: 230 }, { x: 316, y: 290, w: 8, d: 40 },
      { x: 316, y: 334, w: 8, d: 86 }, { x: 316, y: 480, w: 8, d: 120 },
      { x: 0, y: 326, w: 120, d: 8 }, { x: 180, y: 326, w: 136, d: 8 }, { x: 324, y: 326, w: 116, d: 8 }, { x: 500, y: 326, w: 146, d: 8 },
      { x: 646, y: 0, w: 8, d: 250 }, { x: 646, y: 310, w: 8, d: 130 }, { x: 646, y: 500, w: 8, d: 100 }
    ].forEach(function (p) { p.h = LOW; p.m = "wall"; box(root, p); });

    // Bzyk nad planem (billboard) z jednym dymkiem w stanie spoczynku.
    var bz = div("plan-bzyk", root);
    var bzIn = div("plan-bzyk-in flat", bz);
    bzIn.innerHTML = BZYK;
    var sayBox = $("[data-stage-say]");
    if (sayBox) bzIn.appendChild(sayBox);

    world.appendChild(frag);
    bindPlan();
  }

  function setCam(v) {
    for (var k in v) world.style.setProperty("--" + k, v[k]);
  }
  // Kalibracja: przy skali 1 mierzymy rzut budynku i dobieramy skalę oraz przesunięcie,
  // żeby cały plan mieścił się w scenie niezależnie od proporcji ekranu.
  var base = { s: 0.8, tx: 0, ty: 0, w: 0, h: 0 };
  function measure() {
    var r = stage.getBoundingClientRect();
    if (built && (Math.abs(r.width - base.w) > 2 || Math.abs(r.height - base.h) > 2)) calibrate(r);
    s0 = base.s;
    return r;
  }
  function calibrate(r) {
    var prev = world.style.transition;
    world.style.transition = "none";
    setCam({ tx: "0px", ty: "0px", s: "1", rx: "56deg", rz: "-40deg", cx: "0px", cy: "0px" });
    var L = Infinity, T = Infinity, R = -Infinity, B = -Infinity;
    $$(".floor, .bx.m-outer .f, .bx.m-plinth .f", world).forEach(function (el) {
      var b = el.getBoundingClientRect();
      if (!b.width) return;
      L = Math.min(L, b.left); T = Math.min(T, b.top); R = Math.max(R, b.right); B = Math.max(B, b.bottom);
    });
    var uw = R - L, uh = B - T;
    var f = Math.min((r.width * 0.86) / uw, (r.height * 0.84) / uh, 1.05);
    var ucx = (L + R) / 2 - (r.left + r.width / 2), ucy = (T + B) / 2 - (r.top + r.height / 2);
    base = { s: f, tx: -ucx * f + r.width * 0.035, ty: -ucy * f + r.height * 0.03, w: r.width, h: r.height };
    void world.offsetWidth;
    world.style.transition = prev;
  }
  function idleCam() {
    measure();
    setCam({ tx: Math.round(base.tx) + "px", ty: Math.round(base.ty) + "px", s: s0.toFixed(3), rx: "56deg", rz: "-40deg", cx: "0px", cy: "0px", bx: "70px", by: "1010px" });
  }
  function roomCam(r) {
    var rect = measure();
    var k = Math.max(1.18, Math.min(1.5, 470 / Math.max(r.w, r.d * 0.8)));
    var cx = -(r.x + r.w / 2 - W / 2), cy = -(r.y + r.d / 2 - D / 2);
    setCam({
      tx: Math.round(-rect.width * 0.17) + "px", ty: Math.round(rect.height * 0.1) + "px",
      s: (s0 * k).toFixed(3), rx: "50deg", rz: "-31deg", cx: cx + "px", cy: cy + "px",
      bx: (r.x + r.w * 0.8) + "px", by: (r.y + r.d * 0.6) + "px"
    });
  }

  var legendBtns = $$(".room-btn");
  function syncLegend() {
    legendBtns.forEach(function (b) {
      var id = b.parentNode.getAttribute("data-room");
      if (DESK.matches) {
        b.removeAttribute("aria-expanded");
        b.setAttribute("aria-pressed", id === activeId ? "true" : "false");
      } else {
        b.removeAttribute("aria-pressed");
        b.setAttribute("aria-expanded", $(".room-detail", b.parentNode).hidden ? "false" : "true");
      }
    });
  }

  var lastOpener = null;
  function selectRoom(id, fromKeyboard) {
    var r = byId[id];
    if (!r) return;
    activeId = id;
    $$(".room", world).forEach(function (g) { g.classList.toggle("is-active", g.getAttribute("data-room") === id); });
    world.classList.add("is-zoomed");
    stage.classList.add("is-zoomed");
    roomCam(r);
    var item = $('.room-item[data-room="' + id + '"]');
    var detail = $(".room-detail", item).cloneNode(true);
    detail.removeAttribute("id");
    detail.hidden = false;
    $$(".frame", detail).forEach(stopPlayer);
    $("[data-panel-title]", panel).textContent = r.name;
    $("[data-panel-step]", panel).textContent = (ORDER.indexOf(id) + 1) + " z 5";
    $("[data-panel-body]", panel).replaceChildren(detail);
    $$(".frame.is-playing").forEach(stopPlayer);
    var wasOpen = !panel.hidden && panel.classList.contains("is-open");
    panel.hidden = false;
    if (!wasOpen) {
      void panel.offsetWidth;
      panel.classList.add("is-open");
    } else if (!RM.matches) {
      detail.style.animation = "fadeUp .5s var(--ease)";
    }
    syncLegend();
    if (fromKeyboard) $("[data-panel-close]", panel).focus({ preventScroll: true });
  }
  function closeRoom() {
    if (!activeId) return;
    var id = activeId;
    activeId = null;
    $$(".room", world).forEach(function (g) { g.classList.remove("is-active"); });
    world.classList.remove("is-zoomed");
    stage.classList.remove("is-zoomed");
    panel.classList.remove("is-open");
    $$(".frame.is-playing", panel).forEach(stopPlayer);
    window.setTimeout(function () { if (!activeId) panel.hidden = true; }, RM.matches ? 0 : 500);
    idleCam();
    syncLegend();
    if (lastOpener && document.activeElement && panel.contains(document.activeElement)) lastOpener.focus({ preventScroll: true });
    return id;
  }
  function stepRoom(d) {
    if (!activeId) return;
    var i = ORDER.indexOf(activeId);
    selectRoom(ORDER[(i + d + ORDER.length) % ORDER.length], false);
  }

  function bindPlan() {
    world.addEventListener("pointerover", function (e) {
      var g = e.target.closest(".room");
      $$(".room.is-hover", world).forEach(function (x) { if (x !== g) x.classList.remove("is-hover"); });
      if (g) g.classList.add("is-hover");
    });
    world.addEventListener("pointerleave", function () { $$(".room.is-hover", world).forEach(function (x) { x.classList.remove("is-hover"); }); });
    world.addEventListener("click", function (e) {
      var g = e.target.closest("[data-room]");
      if (!g) return;
      var id = g.getAttribute("data-room");
      if (id === activeId) return;
      lastOpener = $('.room-item[data-room="' + id + '"] .room-btn');
      selectRoom(id, false);
    });
    // Klik w puste tło sceny wraca do całego planu.
    stage.addEventListener("click", function (e) {
      if (!activeId) return;
      if (e.target.closest("[data-room]") || e.target.closest("[data-panel]")) return;
      closeRoom();
    });
  }

  $("[data-panel-close]", panel).addEventListener("click", closeRoom);
  $("[data-panel-prev]", panel).addEventListener("click", function () { stepRoom(-1); });
  $("[data-panel-next]", panel).addEventListener("click", function () { stepRoom(1); });
  document.addEventListener("keydown", function (e) {
    if (!activeId || !DESK.matches) return;
    if (e.key === "Escape") { closeRoom(); return; }
    var inForm = e.target.closest && e.target.closest("input, textarea, [role=tab]");
    if (inForm) return;
    if (e.key === "ArrowRight") { e.preventDefault(); stepRoom(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); stepRoom(-1); }
  });

  // Lista pokoi: desktop wybiera pokój na planie, telefon rozwija pokój w miejscu.
  legendBtns.forEach(function (b) {
    b.addEventListener("click", function (e) {
      var item = b.parentNode;
      var id = item.getAttribute("data-room");
      if (DESK.matches) {
        lastOpener = b;
        if (id === activeId) { closeRoom(); return; }
        var r = stage.getBoundingClientRect();
        if (r.top < -r.height * 0.3 || r.bottom > window.innerHeight + r.height * 0.3) {
          stage.scrollIntoView({ behavior: RM.matches ? "auto" : "smooth", block: "center" });
        }
        selectRoom(id, e.detail === 0);
        return;
      }
      var detail = $(".room-detail", item);
      var open = detail.hidden;
      $$(".room-item .room-detail").forEach(function (d) {
        if (d !== detail && !d.hidden) { d.hidden = true; $$(".frame", d).forEach(stopPlayer); }
      });
      detail.hidden = !open;
      if (!open) $$(".frame", detail).forEach(stopPlayer);
      syncLegend();
      if (open && !RM.matches) {
        window.setTimeout(function () {
          var t = item.getBoundingClientRect().top;
          if (t < 60 || t > window.innerHeight * 0.5) window.scrollBy({ top: t - 80, behavior: "smooth" });
        }, 60);
      }
    });
  });

  // Start planu: budowa po wejściu w pobliże ekranu, potem jeden ruch kamery „przylot”.
  function arriveCam() {
    measure();
    if (RM.matches) { idleCam(); return; }
    world.style.transition = "none";
    setCam({ tx: Math.round(base.tx) + "px", ty: Math.round(base.ty + 60) + "px", s: (s0 * 0.84).toFixed(3), rx: "36deg", rz: "-56deg", cx: "0px", cy: "0px", bx: "-260px", by: "-60px" });
    void world.offsetWidth;
    world.style.transition = "";
    world.classList.add("arrive");
    window.requestAnimationFrame(function () {
      idleCam();
      window.setTimeout(function () { world.classList.remove("arrive"); }, 1900);
    });
  }
  function initPlan() {
    if (!DESK.matches) { syncLegend(); return; }
    buildPlan();
    idleCam();
    syncLegend();
  }
  if (DESK.matches && "IntersectionObserver" in window) {
    var planIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting && DESK.matches) {
          if (!built) { buildPlan(); idleCam(); }
          if (en.intersectionRatio > 0) { arriveCam(); obs.disconnect(); }
        }
      });
    }, { rootMargin: "0px 0px -25% 0px" });
    planIO.observe(stage);
    // Budowa z wyprzedzeniem, w wolnej chwili, żeby przylot nie czekał na DOM.
    var idle = window.requestIdleCallback || function (fn) { return window.setTimeout(fn, 400); };
    idle(function () { if (!built && DESK.matches) { buildPlan(); idleCam(); } });
  } else {
    initPlan();
  }
  syncLegend();

  var resizeT = 0;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeT);
    resizeT = window.setTimeout(function () {
      if (!DESK.matches) { if (activeId) closeRoom(); syncLegend(); return; }
      if (!built) { buildPlan(); }
      if (activeId) roomCam(byId[activeId]); else idleCam();
      syncLegend();
    }, 150);
  });
  DESK.addEventListener && DESK.addEventListener("change", function () {
    if (!DESK.matches && activeId) closeRoom();
    $$(".room-item .room-detail").forEach(function (d) { d.hidden = true; });
    syncLegend();
  });

  goStep(0, { keepSay: true });
})();
