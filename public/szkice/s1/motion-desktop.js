/* Szkic S1, tylko desktop bez reduced motion: obiekt „system” obraca się razem z przewijaniem.
   Scena jest przyklejona (position: sticky) na dwa ekrany; przewijanie zostaje natywne, nic go nie przejmuje. */
(function () {
  'use strict';
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!gsap || !ST) return;
  gsap.registerPlugin(ST);

  var obj = document.getElementById('obj');
  var turn = { rot: -24, sweep: -60 };
  var apply = function () {
    obj.style.setProperty('--rot', turn.rot.toFixed(2) + 'deg');
    obj.style.setProperty('--sweep', turn.sweep.toFixed(1));
  };
  var words = { p: 0 };
  // Pozycja z CSS w procentach, żeby GSAP nie zamienił jej na piksele przy skalowaniu.
  gsap.set('.obj', { xPercent: -50, yPercent: -50, x: 0, y: 0 });
  gsap.set('.hero-tagline', { yPercent: -50 });

  var tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.9 }
  });
  tl.to(turn, { rot: 28, sweep: 70, duration: 1, onUpdate: apply }, 0)
    .to('.obj', { scale: 1.12, duration: 1 }, 0)
    .to('.obj-glow', { opacity: 1.35, scale: 1.15, duration: 1 }, 0)
    .to('.hero-copy', { autoAlpha: 0, y: -70, duration: 0.3, ease: 'power2.in' }, 0.04)
    .to('.reel', { autoAlpha: 0, x: -50, y: 40, duration: 0.3, ease: 'power2.in' }, 0.06)
    .fromTo('.hero-tagline', { autoAlpha: 0, y: 40, yPercent: -50 }, { autoAlpha: 1, y: 0, yPercent: -50, duration: 0.16, ease: 'power2.out' }, 0.34)
    .to(words, { p: 1, duration: 0.5, onUpdate: function () { window.S1.setTagline(words.p); } }, 0.42);

  // Fokus z klawiatury na elemencie hero, gdy scena jest już przewinięta: wróć na górę, żeby był widoczny.
  document.querySelector('.hero-copy').addEventListener('focusin', function () {
    if (window.scrollY > 40) window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('load', function () { ST.refresh(); });
})();
