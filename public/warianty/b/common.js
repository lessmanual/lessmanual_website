/* Wspólne dla wariantów A i B: filmy (start i stop przez IntersectionObserver), napisy na rolce,
   przełączenie w układ bez ruchu, gdy biblioteka z CDN się nie wczyta. */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduced = doc.classList.contains("rm");

  function toFlow() {
    doc.classList.remove("motion");
    doc.classList.add("flow");
  }

  /* ---------- filmy ---------- */
  function VideoManager() {
    var items = [];
    var pageReady = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var it = en.target.__lm;
        if (!it) return;
        it.visible = en.isIntersecting;
        sync(it);
      });
    }, { threshold: 0.2 });

    function sync(it) {
      var want = reduced ? it.user : it.visible && it.active && pageReady;
      if (want && it.video.paused) {
        var pr = it.video.play();
        if (pr && pr.catch) pr.catch(function () {});
      } else if (!want && !it.video.paused) {
        it.video.pause();
      }
    }

    document.querySelectorAll("[data-video]").forEach(function (el) {
      var video = el.querySelector("video");
      var it = { el: el, video: video, visible: false, active: true, user: false };
      el.__lm = it;
      video.addEventListener("playing", function () { el.classList.add("is-playing"); });
      var btn = el.querySelector(".media-play");
      if (btn) {
        btn.addEventListener("click", function () {
          it.user = !it.user;
          btn.querySelector("span").textContent = it.user ? "Zatrzymaj film" : "Odtwórz film";
          btn.setAttribute("aria-label", (it.user ? "Zatrzymaj film" : "Odtwórz film"));
          sync(it);
        });
      }
      items.push(it);
      io.observe(el);
    });

    /* Plakat hero jest elementem LCP: filmy ruszają dopiero po zdarzeniu load. */
    function ready() {
      setTimeout(function () {
        pageReady = true;
        items.forEach(sync);
      }, 350);
    }
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });

    return {
      setActive: function (el, on) {
        var it = el && el.__lm;
        if (!it || it.active === on) return;
        it.active = on;
        sync(it);
      },
      setAllActive: function (on) { items.forEach(function (it) { it.active = on; sync(it); }); },
      isPlaying: function (el) { return el && el.__lm && !el.__lm.video.paused; },
    };
  }

  /* ---------- napisy na rolce (przykład) ---------- */
  function Captions(card) {
    if (!card || reduced) return { tick: function () {} };
    var caps = Array.prototype.slice.call(card.querySelectorAll(".cap"));
    var chip = card.querySelector(".reel-chip");
    var video = card.querySelector("video");
    var times = caps.map(function (c) { return parseFloat(c.dataset.t); });
    var LOOP = 9;
    var hot = ["ręcznej", "liczbą"];
    caps.forEach(function (c) {
      Array.prototype.forEach.call(c.children, function (s, i) {
        s.style.transitionDelay = i * 110 + "ms";
        if (hot.indexOf(s.textContent) > -1) s.classList.add("hot");
      });
    });
    var current = -1;
    var t0 = performance.now();
    function tick() {
      var t = video && !video.paused && video.readyState > 2 ? video.currentTime : ((performance.now() - t0) / 1000) % LOOP;
      var idx = 0;
      for (var i = 0; i < times.length; i++) if (t >= times[i]) idx = i;
      if (idx !== current) {
        if (current > -1) {
          caps[current].classList.remove("is-on");
          Array.prototype.forEach.call(caps[current].children, function (s) { s.classList.remove("in"); });
        }
        current = idx;
        var c = caps[idx];
        c.classList.add("is-on");
        requestAnimationFrame(function () {
          Array.prototype.forEach.call(c.children, function (s) { s.classList.add("in"); });
        });
      }
      if (chip) chip.classList.toggle("is-on", t > 3.4 && t < 8.6);
    }
    return { tick: tick };
  }

  window.LM = { toFlow: toFlow, VideoManager: VideoManager, Captions: Captions, reduced: reduced };
})();
