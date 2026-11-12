/* Wariant E: teczka. Przy pełnym ruchu scena jest przypięta, a przewijanie otwiera teczkę i wyjmuje z niej dokumenty
   (jedna oś czasu GSAP, jedno źródło scrolla). Bez ruchu ta sama treść stoi jako zwykły dokument. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduced = root.classList.contains("rm");
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (root.classList.contains("motion") && !(gsap && ST)) { root.classList.replace("motion", "still"); }
  var motion = root.classList.contains("motion");
  var mobile = function () { return innerWidth < 761; };

  /* ---------- Filmy ---------- */
  // Filmy ruszają dopiero chwilę po wczytaniu strony: plakat jest elementem LCP, mp4 nie może z nim konkurować
  var videoReady = false, pending = [];
  addEventListener("load", function () { setTimeout(function () { videoReady = true; pending.splice(0).forEach(function (v) { if (v.dataset.want === "1") playVideo(v); }); }, 1200); });
  function playVideo(v) {
    if (!videoReady) { v.dataset.want = "1"; if (pending.indexOf(v) < 0) pending.push(v); return; }
    if (!v.src && v.dataset.src) v.src = v.dataset.src;
    var p = v.play(); if (p && p.catch) p.catch(function () {});
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
  var heroVid = document.querySelector("#reel video");
  var docVids = Array.prototype.slice.call(document.querySelectorAll(".doc video"));
  if (!reduced && "IntersectionObserver" in window) {
    var observed = motion ? [heroVid] : videos;
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) playVideo(e.target); else { e.target.dataset.want = "0"; e.target.pause(); } });
    }, { threshold: 0.35 });
    observed.forEach(function (v) { vio.observe(v); });
  }

  /* ---------- Napisy przykładowe na rolce ---------- */
  var caps = document.querySelectorAll("#reel [data-cap]");
  function showCaps(t) {
    var on = [t > 1.5 && t < 6.5, t < 3.6, t >= 3.6 && t < 7.4];
    for (var i = 0; i < caps.length; i++) caps[i].classList.toggle("on", on[+caps[i].dataset.cap]);
  }
  if (reduced) { caps[0].classList.add("on"); caps[1].classList.add("on"); }
  else {
    setTimeout(function () { if (heroVid.paused) showCaps(2); }, 900);
    heroVid.addEventListener("timeupdate", function () { showCaps(heroVid.currentTime); });
  }

  /* ---------- Pasek i zakładki ---------- */
  var bar = document.getElementById("bar");
  var barCta = bar.querySelector(".bar-cta");
  var tabs = {};
  document.querySelectorAll(".tabs a").forEach(function (a) { tabs[a.getAttribute("href").slice(1)] = a; });
  function setTab(id) {
    Object.keys(tabs).forEach(function (k) {
      tabs[k].classList.toggle("on", k === id);
      if (k === id) tabs[k].setAttribute("aria-current", "true"); else tabs[k].removeAttribute("aria-current");
    });
  }
  var ctaBlockers = [document.querySelector(".paths"), document.getElementById("rozmowa")];
  var blockerSeen = new Map();
  var pastHero = false;
  function syncBar() {
    var blocked = Array.from(blockerSeen.values()).some(Boolean);
    var show = pastHero && !blocked;
    bar.classList.toggle("show-cta", show);
    bar.classList.toggle("solid", scrollY > 40);
    barCta.tabIndex = show ? 0 : -1;
  }
  if ("IntersectionObserver" in window) {
    var bio = new IntersectionObserver(function (es) { es.forEach(function (e) { blockerSeen.set(e.target, e.isIntersecting); }); syncBar(); }, { threshold: 0.1 });
    ctaBlockers.forEach(function (el) { bio.observe(el); });
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) setTab(e.target.id); });
    }, { rootMargin: "-49% 0px -49% 0px" });
    ["opinie", "oferta", "rozmowa"].concat(motion ? [] : ["start", "czym", "systemy"]).forEach(function (id) { sio.observe(document.getElementById(id)); });
  }
  addEventListener("scroll", function () { requestAnimationFrame(syncBar); }, { passive: true });

  if (!motion) {
    pastHero = true; // bez przypiętej sceny przycisk w pasku może być od razu, poza blokami z własnym przyciskiem
    var hio = new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; syncBar(); }, { threshold: 0.2 });
    hio.observe(document.querySelector(".hero-copy"));
    if (gsap && ST && !reduced) enterEffects();
    return;
  }

  /* =========== Scena teczki (pełny ruch) =========== */
  gsap.registerPlugin(ST);
  ST.config({ ignoreMobileResize: true });

  var stage = document.getElementById("start");
  var copy = stage.querySelector(".hero-copy");
  var hint = stage.querySelector(".scroll-hint");
  var inner = stage.querySelector(".desk-inner");
  var folder = stage.querySelector(".folder");
  var cover = stage.querySelector(".f-cover");
  var reel = document.getElementById("reel");
  var docs = gsap.utils.toArray(".docs .doc");
  var R = gsap.utils.random;

  var START = 1.2, STEP = 1.3, RISE = 0.55, HOLD = 0.5;
  // Po otwarciu teczka zjeżdża niżej i maleje: czytany dokument wisi nad nią, a ona zostaje widoczna pod spodem
  var FOLDER_SCALE = 0.86;
  function FOLDER_DROP() { return innerHeight * (mobile() ? 0.2 : 0.24); }
  var END = START + docs.length * STEP + 0.4;

  function vw(n) { return innerWidth * n / 100; }
  function vh(n) { return innerHeight * n / 100; }
  // Poza dokumentu „w teczce”: ten sam kąt co teczka, niżej i mniejszy
  function inFolder(doc) {
    var fw = folder.offsetWidth || 400;
    var dw = (doc || docs[0]).offsetWidth || 600, dh = (doc || docs[0]).offsetHeight || 800, fh = fw / 1.38;
    var fy = (mobile() ? 0.62 : 0.58) * innerHeight - innerHeight / 2 + FOLDER_DROP();
    return { y: fy - vh(2), rotationX: mobile() ? 60 : 62, rotationZ: -8, scale: Math.min(fw / dw, fh / dh * 1.25) * FOLDER_SCALE * 0.86 };
  }
  var pile = docs.map(function () { return { x: R(-4, 4), y: R(-3, 3), r: R(-14, 10) }; });

  // x, y i rotationY jawnie na zero: GSAP inaczej przejmuje przesunięcie z CSS (translate -50%) i dubluje centrowanie
  gsap.set(folder, { x: 0, y: 0, rotationY: 0, xPercent: -50, yPercent: -50, transformPerspective: 1600, rotationX: 56, rotationZ: -8 });
  gsap.set(cover, { z: 9, rotationY: 0 });
  if (!mobile()) gsap.set(reel, { xPercent: -108, yPercent: -54, x: 0, y: 0, rotation: -5 });
  gsap.set(docs, { x: 0, y: 0, xPercent: -50, yPercent: -50, transformPerspective: 1600, transformOrigin: "50% 60%", autoAlpha: 0 });
  docs.forEach(function (d, i) { gsap.set(d, { zIndex: 20 - i }); });

  var tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage, start: "top top", end: function () { return "+=" + Math.round(innerHeight * END * 0.72); },
      pin: true, pinSpacer: document.getElementById("stage-spacer"), scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: onStageUpdate,
      onLeave: function () { pastHero = true; syncBar(); },
      onEnterBack: function () { pastHero = false; syncBar(); }
    }
  });

  // Faza 0: hero schodzi, teczka staje na środku i się otwiera
  tl.to(copy, { y: function () { return -vh(8); }, autoAlpha: 0, duration: 0.55, ease: "power1.in" }, 0)
    .to(hint, { autoAlpha: 0, duration: 0.2 }, 0)
    .fromTo(inner, { x: function () { return mobile() ? 0 : vw(22); }, y: function () { return mobile() ? vh(26) : 0; } }, { x: 0, y: 0, duration: 1, ease: "power2.inOut" }, 0)
    .to(reel, mobile()
      ? { y: function () { return -vh(70); }, rotation: -10, autoAlpha: 0, duration: 0.8, ease: "power2.in" }
      : { x: function () { return -vw(19); }, y: function () { return vh(10); }, scale: 0.4, rotation: -11, duration: 1, ease: "power2.inOut" }, 0)
    .to(folder, { rotationX: function () { return mobile() ? 60 : 62; }, y: FOLDER_DROP, scale: FOLDER_SCALE, duration: 1, ease: "power2.inOut" }, 0)
    .to(cover, { rotationY: -172, duration: 0.9, ease: "power2.inOut" }, 0.35)
    .set(docs[0], { autoAlpha: 1 }, 0.95)
    .addLabel("start", 0);
  var fromPose = {
    y: function (i, el) { return inFolder(el).y; }, rotationX: function (i, el) { return inFolder(el).rotationX; },
    rotationZ: -8, scale: function (i, el) { return inFolder(el).scale; }
  };
  docs.forEach(function (d, i) { tl.set(d, fromPose, 0); if (i > 0) tl.set(d, { autoAlpha: 1 }, START + (i - 1) * STEP + 0.05); });

  // Dokumenty po kolei: wyjmij, przeczytaj, odłóż na stos
  docs.forEach(function (d, i) {
    var s = START + i * STEP;
    tl.fromTo(d, fromPose, { y: function () { return -vh(mobile() ? 1 : 4); }, rotationX: 0, rotationZ: 0, scale: 1, duration: RISE, ease: "power2.out", immediateRender: false }, s);
    if (i === 0) tl.addLabel("czym", s + RISE);
    if (i === 1) tl.addLabel("systemy", s + RISE);
    var out = s + RISE + HOLD;
    tl.set(d, { zIndex: 40 + i }, out);
    tl.to(d, mobile()
      ? { y: function () { return -vh(115); }, rotationZ: -6, duration: 0.6, ease: "power2.in" }
      : {
          x: function () { return -vw(30) + vw(pile[i].x); }, y: function () { return vh(14) + vh(pile[i].y); },
          rotationZ: pile[i].r, scale: 0.3, duration: 0.7, ease: "power2.inOut"
        }, out);
  });
  tl.to({}, { duration: 0.4 }, END - 0.4);

  // Który dokument jest teraz przed czytelnikiem: gra tylko jego film, zakładka pokazuje rozdział
  var current = -2;
  function onStageUpdate(self) {
    var t = self.progress * tl.duration();
    var idx = -1;
    for (var i = 0; i < docs.length; i++) {
      var s = START + i * STEP;
      if (t >= s + RISE * 0.6 && t < s + RISE + HOLD + 0.3) { idx = i; break; }
    }
    if (t > 1 && !heroVid.paused) heroVid.pause();
    if (idx !== current) {
      current = idx;
      docVids.forEach(function (v) {
        var mine = v.closest(".doc") === docs[idx];
        if (mine) playVideo(v); else { v.dataset.want = "0"; if (!v.paused) v.pause(); }
      });
    }
    setTab(t < START ? "start" : idx <= 0 && t < START + STEP ? "czym" : "systemy");
  }

  // Zakładki rozdziałów w scenie przewijają do etykiet osi czasu
  ["start", "czym", "systemy"].forEach(function (id) {
    tabs[id].addEventListener("click", function (e) {
      e.preventDefault();
      var st = tl.scrollTrigger;
      var y = st.start + (st.end - st.start) * (tl.labels[id] / tl.duration());
      scrollTo({ top: id === "start" ? 0 : y + 2, behavior: "smooth" });
    });
  });
  // Klawiatura: fokus na dokumencie w scenie przewija do chwili, gdy jest czytany
  docs.forEach(function (d, i) {
    d.setAttribute("tabindex", "-1");
    d.addEventListener("focusin", function () {
      var st = tl.scrollTrigger; if (!st) return;
      var at = START + i * STEP + RISE + 0.1;
      var y = st.start + (st.end - st.start) * (at / tl.duration());
      if (Math.abs(scrollY - y) > 40) scrollTo(0, y);
    });
  });

  enterEffects();

  /* ---------- Wejścia: notatki spadają na biurko, umowa wysuwa się z teczki ---------- */
  function enterEffects() {
    gsap.registerPlugin(ST);
    gsap.utils.toArray(".note-card").forEach(function (n) {
      var r = parseFloat(getComputedStyle(n).getPropertyValue("--r")) || 0;
      gsap.set(n, { transformPerspective: 900, transformOrigin: "50% 0%" });
      gsap.fromTo(n, { y: -70, rotationX: -55, rotation: r * 4, autoAlpha: 0 }, {
        y: 0, rotationX: 0, rotation: r, autoAlpha: 1, duration: 1.1, ease: "back.out(1.3)",
        scrollTrigger: { trigger: n, start: "top 88%", once: true }
      });
    });
    // Umowa wysuwa się, odchylona dolną krawędzią od czytelnika (dodatni kąt przy długiej kartce
    // rzutowałby jej dół przed kamerę i zasłaniał całą stronę, sprawdzone na 390 px)
    gsap.fromTo(".contract", { rotationX: mobile() ? -8 : -24, y: 140, transformPerspective: 1600, transformOrigin: "50% 0%" }, {
      rotationX: 0, y: 0, ease: "power2.out",
      scrollTrigger: { trigger: ".contract-wrap", start: "top bottom", end: "top 15%", scrub: 0.8 }
    });
    gsap.utils.toArray(".clause, .sign").forEach(function (c) {
      gsap.fromTo(c, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 85%", once: true } });
    });
  }
})();
