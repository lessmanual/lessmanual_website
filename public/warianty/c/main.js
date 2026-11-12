/* Wariant C: warstwa HTML. Filmy, napisy rolki, kolor kina, rozdziały, wejścia sekcji i leniwy start sceny 3D. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduced = root.classList.contains("rm");
  var mode3d = root.classList.contains("m3d");
  var LM = (window.LM = { anchors: [0], k: 0, ready: false });

  /* ---------- Filmy: preload="none", start i stop przez IntersectionObserver ---------- */
  function loadVideo(v) {
    if (!v.src && v.dataset.src) { v.src = v.dataset.src; }
  }
  // Filmy ruszają dopiero chwilę po wczytaniu strony: plakat jest elementem LCP, mp4 nie może z nim konkurować
  var videoReady = false, pending = [];
  addEventListener("load", function () { setTimeout(function () { videoReady = true; pending.splice(0).forEach(function (v) { if (v.dataset.want === "1") playVideo(v); }); }, 1200); });
  function playVideo(v) {
    if (!videoReady) { v.dataset.want = "1"; if (pending.indexOf(v) < 0) pending.push(v); return; }
    loadVideo(v);
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  var videos = Array.prototype.slice.call(document.querySelectorAll("video.vid"));
  videos.forEach(function (v) {
    v.addEventListener("playing", function () { v.classList.add("is-playing"); });
    var btn = v.parentNode.querySelector(".play");
    if (reduced && btn) {
      btn.hidden = false;
      btn.addEventListener("click", function () {
        if (v.paused) { playVideo(v); btn.classList.add("is-pause"); btn.setAttribute("aria-label", "Zatrzymaj film"); }
        else { v.pause(); btn.classList.remove("is-pause"); btn.setAttribute("aria-label", "Odtwórz film"); }
      });
    }
  });
  if (!reduced && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (!v.offsetParent && v.parentNode.offsetParent === null) return;
        if (e.isIntersecting) playVideo(v); else { v.dataset.want = "0"; if (!v.paused) v.pause(); }
      });
    }, { threshold: 0.35 });
    videos.forEach(function (v) { vio.observe(v); });
  }

  /* ---------- Napisy na rolce (przykładowe), zsynchronizowane z czasem filmu ---------- */
  var hero = document.getElementById("reel");
  var heroVid = hero.querySelector("video");
  var caps = hero.querySelectorAll("[data-cap]");
  function showCaps(t) {
    // 0-3,6 s: pierwsza linia; 3,6-7 s: druga; karta nad głową 1,5-6,5 s
    var on = [t > 1.5 && t < 6.5, t < 3.6, t >= 3.6 && t < 7.4];
    for (var i = 0; i < caps.length; i++) caps[i].classList.toggle("on", on[+caps[i].dataset.cap]);
  }
  if (reduced) { caps[0].classList.add("on"); caps[1].classList.add("on"); }
  else {
    setTimeout(function () { if (heroVid.paused) showCaps(2); }, 900);
    heroVid.addEventListener("timeupdate", function () { showCaps(heroVid.currentTime); });
  }

  /* ---------- Kolor kina: --k od 0 do 1, gdy sekcja systemów zajmuje ekran ---------- */
  var cinema = document.getElementById("systemy");
  var anchorsEls = Array.prototype.slice.call(document.querySelectorAll("[data-anchor]"));
  var geo = { top: 0, bottom: 0, vh: innerHeight };
  function measure() {
    var y = scrollY, vh = innerHeight;
    var max = Math.max(1, document.documentElement.scrollHeight - vh);
    var r = cinema.getBoundingClientRect();
    geo = { top: r.top + y, bottom: r.bottom + y, vh: vh };
    var narrow = innerWidth < 761;
    var a = anchorsEls.map(function (el) {
      var b = el.getBoundingClientRect();
      var s = b.top + y + b.height / 2 - vh / 2;
      // Telefon: karta stoi w górnej połowie, więc kotwica to chwila, gdy tekst wchodzi w dolną połowę
      if (narrow && el.classList.contains("sys")) s = el.querySelector(".sys-copy").getBoundingClientRect().top + y - 0.5 * vh;
      return Math.min(max, Math.max(0, s));
    });
    a[0] = 0; a[a.length - 1] = max;
    for (var i = 1; i < a.length; i++) if (a[i] <= a[i - 1]) a[i] = a[i - 1] + 1;
    LM.anchors = a; LM.max = max;
    tick();
  }
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function smooth(x) { return x * x * (3 - 2 * x); }
  var lastK = -1, ticking = false;
  function tick() {
    ticking = false;
    var y = scrollY, vh = geo.vh;
    var kin = clamp01((y + 0.95 * vh - geo.top) / (0.55 * vh));
    var kout = clamp01((geo.bottom - (y + 0.2 * vh)) / (0.55 * vh));
    var k = smooth(Math.min(kin, kout));
    LM.k = k;
    var barEl = document.getElementById("bar");
    if (barEl) barEl.classList.toggle("solid", y > 40);
    if (Math.abs(k - lastK) > 0.004) {
      lastK = k;
      root.style.setProperty("--k", k.toFixed(3));
      root.classList.toggle("k-dark", k > 0.5);
    }
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
  addEventListener("resize", measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  addEventListener("load", measure);
  measure();

  /* ---------- Pasek: przycisk pojawia się dopiero za hero (jeden główny przycisk na ekran) ---------- */
  var bar = document.getElementById("bar");
  var barCta = bar.querySelector(".bar-cta");
  var heroSec = document.getElementById("start");
  var finalSec = document.getElementById("rozmowa");
  var heroVisible = true, finalVisible = false;
  function syncBar() {
    var show = !heroVisible && !finalVisible;
    bar.classList.toggle("show-cta", show);
    barCta.tabIndex = show ? 0 : -1;
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; syncBar(); }, { rootMargin: "-30% 0px 0px 0px" }).observe(heroSec);
    var seen = new Map();
    var cio2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { seen.set(e.target, e.isIntersecting); });
      finalVisible = Array.from(seen.values()).some(Boolean); syncBar();
    }, { threshold: 0.15 });
    cio2.observe(finalSec); cio2.observe(document.querySelector(".paths"));

    /* Rozdziały: aktywny ten, który przecina środek ekranu */
    var links = {};
    document.querySelectorAll(".chapters a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].classList.toggle("on", id === e.target.id); });
        Object.keys(links).forEach(function (id) { if (id === e.target.id) links[id].setAttribute("aria-current", "true"); else links[id].removeAttribute("aria-current"); });
      });
    }, { rootMargin: "-49% 0px -49% 0px" });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) cio.observe(s); });
  }

  /* ---------- Ruch HTML (GSAP + ScrollTrigger); przy reduced motion wszystko stoi ---------- */
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!reduced && gsap && ST) {
    gsap.registerPlugin(ST);
    ST.config({ ignoreMobileResize: true });
    root.classList.add("js-motion");

    // Słowa w zdaniu o firmie przechodzą z wyciszenia do pełnego koloru po kolei
    var p = document.querySelector(".reveal-words");
    var html = p.innerHTML.split(/(\s+|&nbsp;)/);
    p.innerHTML = html.map(function (w) { return /^\s+$|^&nbsp;$/.test(w) || !w ? w : '<span class="w">' + w + "</span>"; }).join("");
    gsap.to(p.querySelectorAll(".w"), {
      opacity: 1, ease: "none", stagger: 0.12,
      scrollTrigger: { trigger: p, start: "top 78%", end: "bottom 42%", scrub: 0.6 }
    });

    // Wejścia bloków: krótki ruch w górę i pojawienie się, raz
    // Opinie wchodzą jak karty odchylone w głąb sceny i prostują się przed czytelnikiem
    gsap.set(".review", { transformPerspective: 900, transformOrigin: "50% 100%", rotationX: 18, y: 60, opacity: 0 });
    ST.batch(".review", {
      start: "top 92%", once: true,
      onEnter: function (els) { gsap.to(els, { rotationX: 0, y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.12, overwrite: true }); }
    });
    var rise = document.querySelectorAll(".about-grid > div, .promises article, .cinema-head, .sec-head, .steps li, .path, .bzyk-paths, .final > *");
    rise.forEach(function (el) { el.setAttribute("data-rise", ""); });
    ST.batch("[data-rise]", {
      start: "top 88%", once: true,
      onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08, overwrite: true }); }
    });

    // Opinie dryfują z różną głębią (desktop)
    gsap.matchMedia().add("(min-width: 1025px)", function () {
      document.querySelectorAll(".rcol").forEach(function (r) {
        var d = parseFloat(r.dataset.depth || "0.5");
        gsap.fromTo(r, { y: 90 * d }, { y: -90 * d, ease: "none", scrollTrigger: { trigger: ".review-field", start: "top bottom", end: "bottom top", scrub: 0.8 } });
      });
    });

    // Linia kroków rysuje się z przewijaniem
    gsap.fromTo(".steps", { "--steps": 0 }, { "--steps": 1, ease: "none", scrollTrigger: { trigger: ".steps", start: "top 75%", end: "bottom 60%", scrub: 0.6 } });

    ST.addEventListener("refresh", measure);
  }

  /* ---------- Rolka reaguje na kursor (desktop, pełny ruch) ---------- */
  if (!reduced && matchMedia("(pointer: fine)").matches) {
    var frame = hero.querySelector(".reel-frame");
    heroSec.addEventListener("pointermove", function (e) {
      var x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      frame.style.setProperty("--ry", (-6 + x * 10).toFixed(2) + "deg");
      frame.style.setProperty("--rx", (2 - y * 6).toFixed(2) + "deg");
    });
    heroSec.addEventListener("pointerleave", function () { frame.style.removeProperty("--ry"); frame.style.removeProperty("--rx"); });
  }

  /* ---------- Scena 3D: dopiero po pierwszym wyświetleniu i wczytaniu strony ---------- */
  function fallback() {
    root.classList.remove("m3d", "scene-on");
    root.classList.add("mstatic");
    measure();
  }
  LM.fallback = fallback;
  function startScene() {
    if (startScene.done) return; startScene.done = true;
    import("./scene.js").then(function (m) { return m.start(document.getElementById("scena"), LM); })
      .then(function () { root.classList.add("scene-on"); })
      .catch(function (err) { console.warn("Scena 3D wyłączona:", err); fallback(); });
  }
  if (mode3d) {
    var kick = function () {
      var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 300); };
      // 3D dopiero po wyświetleniu i chwili spokoju: three.js (ok. 180 KiB) nie konkuruje z plakatem rolki o LCP
      setTimeout(function () { idle(startScene, { timeout: 2500 }); }, 2200);
    };
    if (document.readyState === "complete") kick(); else addEventListener("load", kick);
    // Wcześniejszy start, gdy ktoś od razu zaczyna przewijać
    addEventListener("scroll", function once() { removeEventListener("scroll", once); setTimeout(startScene, 50); }, { passive: true });
  }
})();
