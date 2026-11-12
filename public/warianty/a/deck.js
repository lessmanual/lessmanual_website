/* Wariant A: talia kart. Jedno źródło przewijania: natywny scroll czytany przez ScrollTrigger.
   Pozycja w talii (liczba zmiennoprzecinkowa) jest wygładzana w gsap.ticker i z niej liczymy transformacje kart.
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
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".index a"));
  var bar = document.querySelector(".deck-progress span");
  var heroCopy = copies[0];

  /* Opinie przechodzą szybciej niż pozostałe karty, bo jest ich pięć pod rząd. */
  var weights = cards.map(function (c) { return c.classList.contains("card--quote") ? 0.7 : 1; });
  var stops = [0];
  for (var i = 1; i < cards.length; i++) stops.push(stops[i - 1] + weights[i]);
  var last = stops[stops.length - 1];

  var chapterOf = cards.map(function (c) { return parseInt(c.closest(".ch").dataset.ch, 10); });
  var firstCardOfChapter = {};
  chapterOf.forEach(function (ch, idx) { if (!(ch in firstCardOfChapter)) firstCardOfChapter[ch] = idx; });
  var seeds = cards.map(function (_, idx) { return [0.8, -1, 0.5, -0.6, 1, -0.4][idx % 6]; });
  var medias = cards.map(function (c) { return c.querySelector("[data-video]"); });
  var dims = cards.map(function (c) {
    var d = document.createElement("div");
    d.className = "card-dim";
    c.appendChild(d);
    return d;
  });
  /* Rewers: karty czekające w talii leżą "grzbietem do góry", rewers znika, gdy karta jest rozdawana. */
  var backs = cards.map(function (c) {
    var b = document.createElement("div");
    b.className = "card-back";
    b.setAttribute("aria-hidden", "true");
    c.appendChild(b);
    return b;
  });
  var cache = cards.map(function () { return ""; });

  var unitPx = 0, mobile = false, stepY = 16, lift = 0, outY = 0, vh = 0, deckShift = 0;
  var target = 0, cur = 0, activeCh = -1, activeCard = -1;

  function measure() {
    vh = stage.clientHeight;
    mobile = window.innerWidth < 900;
    /* Telefon: talia zaczyna się pod najwyższym tekstem rozdziału (plus miejsce na wystające karty),
       żeby nagłówek i wstęp nigdy nie wchodziły pod krawędzie talii.
       Pozycję poprawiamy transformacją (deckShift), nie właściwością top: zmiana top po pierwszym
       malowaniu to przesunięcie układu, które Lighthouse liczy do CLS (pomiar 12.11: 0,70). */
    deckShift = 0;
    if (mobile) {
      var maxCopy = 0;
      copies.forEach(function (c, ci) { if (ci > 0) maxCopy = Math.max(maxCopy, c.offsetHeight); });
      var top = Math.round(76 + maxCopy + 16 + 3 * 10);
      deckShift = top - cards[1].offsetTop;
      stage.style.setProperty("--card-h", Math.max(420, vh - top - 40) + "px");
    } else {
      stage.style.removeProperty("--card-h");
    }
    unitPx = vh * (mobile ? 0.72 : 0.85);
    stepY = mobile ? 10 : 16;
    track.style.setProperty("--track-h", Math.round(last * unitPx + vh + unitPx * 0.35) + "px");
    outY = cards[1].offsetHeight + 24;
    lift = 0;
    if (mobile) {
      var r = heroCopy.getBoundingClientRect();
      var stageTop = stage.getBoundingClientRect().top;
      lift = Math.max(0, r.bottom - stageTop + 20 - cards[0].offsetTop - deckShift);
    }
  }

  function toCardSpace(s) {
    if (s <= 0) return 0;
    if (s >= last) return cards.length - 1;
    for (var k = 1; k < stops.length; k++) {
      if (s < stops[k]) return k - 1 + (s - stops[k - 1]) / (stops[k] - stops[k - 1]);
    }
    return cards.length - 1;
  }

  function easeOut(u) { return 1 - Math.pow(1 - u, 3); }
  function easeInOut(u) { return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; }
  function pile(idx, r) {
    var rr = Math.min(r, 3);
    return {
      x: rr * (mobile ? 4 : 10), y: rr * (mobile ? 8 : 12), z: -rr * 30,
      rz: seeds[idx] * (1.2 + rr * 1.3), s: (mobile ? 0.92 : 0.8) - rr * 0.03,
      dim: 0, op: r <= 3 ? 1 : Math.max(0, 4 - r),
    };
  }

  function render(p) {
    var heroLift = mobile ? (1 - Math.min(Math.max(p, 0), 1)) * lift : 0;
    for (var idx = 0; idx < cards.length; idx++) {
      var dd = idx - p, x = 0, y, z, rx, rz, s, dim, op, zi = 10 + idx, back = 0;
      if (dd >= 1) {
        /* Karty czekające leżą pod wierzchnią kartą, lekko obrócone: widać, że talia ma ciąg dalszy. */
        var pp = pile(idx, dd);
        x = pp.x; y = pp.y; z = pp.z; rx = 0; rz = pp.rz; s = pp.s; dim = pp.dim; op = pp.op; zi = 5; back = 1;
      } else if (dd > 0) {
        /* Rozdanie: karta wysuwa się spod talii w dół, potem przechylona wskakuje na wierzch. */
        var t = 1 - dd, a0 = pile(idx, 1), u;
        if (t < 0.5) {
          u = easeInOut(t / 0.5);
          x = a0.x * (1 - u); y = a0.y + (outY - a0.y) * u; z = a0.z + (40 - a0.z) * u;
          rx = 0; rz = a0.rz + (seeds[idx] * 5 - a0.rz) * u; s = a0.s + (1 - a0.s) * u;
          dim = a0.dim * (1 - u); op = 1; zi = 5; back = 1 - u;
        } else {
          u = easeOut((t - 0.5) / 0.5);
          x = 0; y = outY * (1 - u); z = 40 * (1 - u) + Math.sin(Math.PI * u) * (mobile ? 70 : 140);
          rx = Math.sin(Math.PI * u) * -16; rz = seeds[idx] * 5 * (1 - u); s = 1; dim = 0; op = 1;
        }
      } else {
        var k = -dd, kk = Math.min(k, 4);
        y = -kk * stepY;
        z = -k * 40;
        rx = 0;
        rz = seeds[idx] * Math.min(k, 1) * 1.4;
        s = 1 - kk * 0.045;
        dim = Math.min(k * 0.08, 0.26);
        op = k < 4 ? 1 : Math.max(0, 5 - k);
      }
      y += heroLift + deckShift;
      var tf = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px," + z.toFixed(1) + "px) rotateX(" + rx.toFixed(2) +
        "deg) rotateZ(" + rz.toFixed(2) + "deg) scale(" + s.toFixed(4) + ")";
      var key = tf + op.toFixed(2) + dim.toFixed(2) + back.toFixed(2);
      if (key !== cache[idx]) {
        cache[idx] = key;
        var st = cards[idx].style;
        st.transform = tf;
        st.opacity = op;
        st.zIndex = String(zi);
        dims[idx].style.opacity = dim;
        backs[idx].style.opacity = back;
      }
    }
    var a = Math.min(cards.length - 1, Math.max(0, Math.round(p)));
    if (a !== activeCard) {
      if (activeCard > -1) videos.setActive(medias[activeCard], false);
      activeCard = a;
      videos.setActive(medias[a], true);
    }
    var ch = chapterOf[a];
    if (ch !== activeCh) {
      activeCh = ch;
      copies.forEach(function (c, ci) { c.classList.toggle("is-on", ci === ch); });
      navLinks.forEach(function (l, li) {
        if (li === ch) l.setAttribute("aria-current", "step");
        else l.removeAttribute("aria-current");
      });
    }
    document.body.classList.toggle("past-hero", p > 0.6);
    if (bar) bar.style.transform = "scaleX(" + (p / (cards.length - 1)).toFixed(4) + ")";
  }

  /* Na starcie tylko karta rolki jest widoczna; reszta czeka poza ekranem. */
  medias.forEach(function (m, idx) { if (m && idx > 0) videos.setActive(m, false); });
  measure();
  render(0);
  document.body.classList.add("deck-ready");

  var trigger = ST.create({
    trigger: track,
    start: "top top",
    end: function () { return "+=" + Math.round(last * unitPx); },
    onUpdate: function (self) { target = toCardSpace(self.progress * last); },
    onRefresh: function (self) { target = toCardSpace(self.progress * last); },
    snap: {
      snapTo: stops.map(function (s) { return s / last; }),
      duration: { min: 0.25, max: 0.7 },
      delay: 0.12,
      ease: "power2.inOut",
    },
  });
  cur = target;

  gsap.ticker.add(function (time, delta) {
    var k = 1 - Math.exp(-(delta / 1000) * 9);
    var next = cur + (target - cur) * k;
    if (Math.abs(target - next) < 0.0005) next = target;
    if (next !== cur || time < 0.5) { cur = next; render(cur); }
  });

  function scrollToCard(idx, smooth) {
    var y = trigger.start + stops[idx] * unitPx;
    window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
  }
  /* Uchwyt do zrzutów i testów: przewiń do karty o numerze. */
  window.__deck = { go: function (idx) { scrollToCard(idx, false); }, n: cards.length };
  navLinks.forEach(function (l, li) {
    l.addEventListener("click", function (ev) {
      ev.preventDefault();
      scrollToCard(firstCardOfChapter[li], true);
    });
  });
  document.querySelector(".topbar-logo").addEventListener("click", function (ev) {
    ev.preventDefault();
    scrollToCard(0, true);
  });
  /* Klawiatura: fokus na elemencie karty albo tekstu rozdziału przewija talię do tej karty. */
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
