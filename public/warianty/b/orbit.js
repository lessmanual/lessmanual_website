/* Wariant B: orbita. Jedno źródło przewijania: natywny scroll czytany przez ScrollTrigger.
   Pozycja na orbicie (liczba zmiennoprzecinkowa) jest wygładzana w gsap.ticker; z niej liczymy kąt każdej karty.
   Przy reduced motion, słabym urządzeniu albo braku biblioteki strona zostaje w układzie bez ruchu. */
(function () {
  "use strict";
  var doc = document.documentElement;
  var LM = window.LM;
  var videos = LM.VideoManager();
  var reel = document.querySelector(".card--reel");
  var captions = LM.Captions(reel);
  setInterval(captions.tick, 120);

  if (!doc.classList.contains("motion")) return;
  if (!window.gsap || !window.ScrollTrigger) { LM.toFlow(); return; }

  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  ST.config({ ignoreMobileResize: true });
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  var track = document.querySelector(".track");
  var stage = document.querySelector(".stage");
  var cards = Array.prototype.slice.call(stage.querySelectorAll(".card"));
  var copies = Array.prototype.slice.call(stage.querySelectorAll(".ch-copy"));
  var dialLinks = Array.prototype.slice.call(document.querySelectorAll(".dial a"));
  var floorDash = document.querySelector(".orbit-dash");
  var countI = document.querySelector(".oc-i");
  document.querySelector(".oc-n").textContent = String(cards.length);

  var weights = cards.map(function (c) { return c.classList.contains("card--quote") ? 0.7 : 1; });
  var stops = [0];
  for (var i = 1; i < cards.length; i++) stops.push(stops[i - 1] + weights[i]);
  var last = stops[stops.length - 1];
  var chapterOf = cards.map(function (c) { return parseInt(c.closest(".ch").dataset.ch, 10); });
  var firstCardOfChapter = {};
  chapterOf.forEach(function (ch, idx) { if (!(ch in firstCardOfChapter)) firstCardOfChapter[ch] = idx; });
  var medias = cards.map(function (c) { return c.querySelector("[data-video]"); });
  var fogs = cards.map(function (c) {
    var f = document.createElement("div");
    f.className = "card-fog";
    c.appendChild(f);
    return f;
  });
  var cache = cards.map(function () { return ""; });
  /* Ciemne karty (rolka, rozmowa) w białej mgle szarzeją, więc dostają jej mniej. */
  var darkCard = cards.map(function (c) { return c.classList.contains("card--final") || c.classList.contains("card--reel"); });

  var STEP = 30 * Math.PI / 180;
  var unitPx = 0, mobile = false, R = 900, cardW = 400, vh = 0, heroDY = 0, heroS = 0.8, bandShift = 0;
  var floor = document.querySelector(".orbit-floor");
  var target = 0, cur = 0, activeCard = -1, activeCh = -1;

  function measure() {
    vh = stage.clientHeight;
    mobile = window.innerWidth < 900;
    /* Pierścień zaczyna się pod najwyższym nagłówkiem rozdziału, więc tekst nigdy nie wchodzi na karty. */
    /* Przesunięcie robimy transformacją (bandShift), a wysokość karty zmiennej --card-h:
       karta stoi na left: 50% z translateX(-50%), więc ani jedno, ani drugie nie przesuwa układu (CLS). */
    var maxCopy = 0;
    copies.forEach(function (c, ci) { if (ci > 0) maxCopy = Math.max(maxCopy, c.offsetTop + c.offsetHeight); });
    var band = Math.round(maxCopy + (mobile ? 18 : 28));
    /* Krótsze nagłówki schodzą w dół, do pierścienia: każdy kończy się na tej samej linii nad kartami. */
    copies.forEach(function (c, ci) {
      if (ci > 0) c.style.setProperty("--dy", Math.round(maxCopy - (c.offsetTop + c.offsetHeight)) + "px");
    });
    var bottomBand = mobile ? 76 : 92;
    var availH = vh - band - bottomBand;
    var baseW = mobile ? Math.min(window.innerWidth - 72, availH * 0.62) : availH * 0.64;
    stage.style.setProperty("--card-h", Math.round(mobile ? Math.min(availH, baseW / 0.6) : Math.min(620, availH)) + "px");
    if (mobile) stage.style.setProperty("--card-w", Math.round(baseW) + "px");
    else stage.style.removeProperty("--card-w");
    bandShift = band + 4 - cards[1].offsetTop;
    unitPx = vh * (mobile ? 0.62 : 0.7);
    cardW = cards[1].offsetWidth;
    /* Promień tak dobrany, żeby środek sąsiedniej karty wypadał tuż za krawędzią karty z przodu. */
    R = (cardW * (mobile ? 0.84 : 1.12)) / Math.sin(STEP);
    /* Hero: karta rolki mieści się między nagłówkiem a przyciskiem (liczone z realnych wymiarów tekstu). */
    var stageTop = stage.getBoundingClientRect().top;
    var h1 = copies[0].querySelector(".h1").getBoundingClientRect();
    var ctaTop = copies[0].querySelector(".hero-cta").getBoundingClientRect().top;
    var gap = mobile ? 16 : 28;
    var top = h1.bottom - stageTop + gap, bottom = ctaTop - stageTop - gap;
    var cardH = cards[0].offsetHeight, cardTop = cards[0].offsetTop + bandShift;
    heroS = Math.min(0.94, Math.max(0.4, (bottom - top) / cardH));
    heroDY = (top + bottom) / 2 - (cardTop + cardH / 2);
    if (floor) {
      floor.style.width = Math.round(2 * R + cardW * 0.6) + "px";
      floor.style.height = Math.round(R * 0.26) + "px";
      floor.style.transform = "translate(-50%," + Math.round(cardTop + cardH + 14 - R * 0.26 - floor.offsetTop) + "px)";
    }
    track.style.setProperty("--track-h", Math.round(last * unitPx + vh + unitPx * 0.35) + "px");
  }

  function toCardSpace(s) {
    if (s <= 0) return 0;
    if (s >= last) return cards.length - 1;
    for (var k = 1; k < stops.length; k++) {
      if (s < stops[k]) return k - 1 + (s - stops[k - 1]) / (stops[k] - stops[k - 1]);
    }
    return cards.length - 1;
  }

  function render(p) {
    var h = Math.min(Math.max(p, 0), 1);
    var he = 1 - Math.pow(1 - h, 3);
    /* W hero pierścień jest mniejszy i niżej, żeby zmieścić nagłówek i przycisk; pierwsze przewinięcie go przybliża. */
    var ringS = heroS + (1 - heroS) * he;
    var ringY = heroDY * (1 - he);
    for (var idx = 0; idx < cards.length; idx++) {
      /* Orbita jest zamknięta: karta rozmowy stoi po lewej od rolki, a na końcu rolka wraca po prawej. */
      var dd = idx - p, n = cards.length;
      if (dd > n / 2) dd -= n;
      if (dd < -n / 2) dd += n;
      var th = dd * STEP;
      var ath = Math.abs(th);
      var x = Math.sin(th) * R;
      var z = (Math.cos(th) - 1) * R;
      var y = -z * 0.1;
      var ry = th * 180 / Math.PI;
      var op = ath < STEP * 2 ? 1 : Math.max(0, 1 - (ath - STEP * 2) / (STEP * 0.6));
      var fog = Math.min(ath / STEP, 2) * (darkCard[idx] ? 0.16 : 0.4);
      /* W hero dalsze karty są schowane: orbitę widać dopiero, gdy pierścień się przybliża. */
      if (p < 1 && ath > STEP * 1.2) op *= he;
      var tf = "translateX(-50%) translate3d(0," + (ringY + bandShift).toFixed(1) + "px,0) scale(" + ringS.toFixed(4) + ") translate3d(" +
        x.toFixed(1) + "px," + y.toFixed(1) + "px," + z.toFixed(1) + "px) rotateY(" + ry.toFixed(2) + "deg)";
      var key = tf + op.toFixed(2) + fog.toFixed(2);
      if (key !== cache[idx]) {
        cache[idx] = key;
        var st = cards[idx].style;
        st.transform = tf;
        st.opacity = op;
        st.zIndex = String(100 - Math.round(ath * 20));
        fogs[idx].style.opacity = fog;
      }
    }
    if (floorDash) floorDash.style.strokeDashoffset = String((-p * 1000 / 12).toFixed(1));
    var a = Math.min(cards.length - 1, Math.max(0, Math.round(p)));
    if (a !== activeCard) {
      if (activeCard > -1) videos.setActive(medias[activeCard], false);
      activeCard = a;
      videos.setActive(medias[a], true);
      if (countI) countI.textContent = String(a + 1);
      cards.forEach(function (c, ci) { c.toggleAttribute("data-front", ci === a); });
    }
    var ch = chapterOf[a];
    if (ch !== activeCh) {
      activeCh = ch;
      copies.forEach(function (c, ci) { c.classList.toggle("is-on", ci === ch); });
      dialLinks.forEach(function (l, li) {
        if (li === ch) l.setAttribute("aria-current", "step");
        else l.removeAttribute("aria-current");
      });
    }
    document.body.classList.toggle("past-hero", p > 0.6);
  }

  medias.forEach(function (m, idx) { if (m && idx > 0) videos.setActive(m, false); });
  measure();
  render(0);
  document.body.classList.add("orbit-ready");

  var trigger = ST.create({
    trigger: track,
    start: "top top",
    end: function () { return "+=" + Math.round(last * unitPx); },
    onUpdate: function (self) { target = toCardSpace(self.progress * last); },
    onRefresh: function (self) { target = toCardSpace(self.progress * last); },
    snap: {
      snapTo: stops.map(function (s) { return s / last; }),
      duration: { min: 0.3, max: 0.8 },
      delay: 0.1,
      ease: "power2.inOut",
    },
  });
  cur = target;

  gsap.ticker.add(function (time, delta) {
    var k = 1 - Math.exp(-(delta / 1000) * 8);
    var next = cur + (target - cur) * k;
    if (Math.abs(target - next) < 0.0005) next = target;
    if (next !== cur || time < 0.5) { cur = next; render(cur); }
  });

  function scrollToCard(idx, smooth) {
    idx = Math.max(0, Math.min(cards.length - 1, idx));
    window.scrollTo({ top: trigger.start + stops[idx] * unitPx, behavior: smooth ? "smooth" : "auto" });
  }
  window.__orbit = { go: function (idx) { scrollToCard(idx, false); }, n: cards.length };

  dialLinks.forEach(function (l, li) {
    l.addEventListener("click", function (ev) { ev.preventDefault(); scrollToCard(firstCardOfChapter[li], true); });
  });
  document.querySelector(".oc-prev").addEventListener("click", function () { scrollToCard(Math.round(cur) - 1, true); });
  document.querySelector(".oc-next").addEventListener("click", function () { scrollToCard(Math.round(cur) + 1, true); });
  document.querySelector(".topbar-logo").addEventListener("click", function (ev) { ev.preventDefault(); scrollToCard(0, true); });
  /* Strzałki w lewo i w prawo obracają orbitę o jedną kartę. */
  document.addEventListener("keydown", function (ev) {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    var tag = (ev.target && ev.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (ev.key === "ArrowRight") { ev.preventDefault(); scrollToCard(Math.round(cur) + 1, true); }
    if (ev.key === "ArrowLeft") { ev.preventDefault(); scrollToCard(Math.round(cur) - 1, true); }
  });
  stage.addEventListener("focusin", function (ev) {
    var card = ev.target.closest(".card");
    var idx = card ? cards.indexOf(card) : -1;
    if (idx < 0) {
      var copy = ev.target.closest(".ch-copy");
      if (copy) idx = firstCardOfChapter[parseInt(copy.dataset.copy, 10)];
    }
    if (idx > -1 && Math.abs(idx - cur) > 0.3) scrollToCard(idx, false);
  });

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () { measure(); ST.refresh(); cache = cards.map(function () { return ""; }); render(cur); }, 150);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); ST.refresh(); });
})();
