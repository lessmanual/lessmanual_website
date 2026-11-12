/* Szkic S1: interakcje działające na każdym urządzeniu. Ruch sterowany przewijaniem na desktopie jest w motion-desktop.js
   i ładuje się dopiero po wczytaniu strony, żeby nie obciążać telefonu ani LCP. */
(function () {
  'use strict';
  var doc = document.documentElement;
  // Klasy stanu ustawia ten skrypt (defer), nie osobny skrypt w <head>: blokujący skrypt kosztował ok. 300 ms LCP na telefonie.
  // Wszystko, co musi działać przed pierwszym malowaniem, jest w CSS przez media queries.
  doc.classList.remove('no-js');
  doc.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) doc.classList.add('rm');
  else if (window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) doc.classList.add('dm');
  var EASE = 'cubic-bezier(.22,1,.36,1)';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Zdarzenia pomiaru (lista z burzy 12.11). W szkicu tylko kolejka w pamięci, bez wysyłki i bez cookies.
  window.dataLayer = window.dataLayer || [];
  function track(name, params) { window.dataLayer.push(Object.assign({ event: name }, params || {})); }

  function scrollToEl(el) {
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- Pojawianie się sekcji poniżej pierwszego ekranu ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.rooms-head, .room-tabs, .demo .wrap:first-child, .demo-stage, .proof .h2, .proof-grid, .stats, .paths .h2, .path-grid, .form-side, .fcard, .faq-grid').forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('rv'); io.observe(el); }
    });
  }

  /* ---------- Zdanie, które zapala się słowo po słowie ---------- */
  var tagline = $('#tagline');
  var words = [];
  if (tagline) {
    var parts = tagline.textContent.trim().split(/\s+/);
    tagline.textContent = '';
    parts.forEach(function (w, i) {
      var s = document.createElement('span');
      s.className = 'w';
      s.textContent = w;
      tagline.appendChild(s);
      if (i < parts.length - 1) tagline.appendChild(document.createTextNode(' '));
      words.push(s);
    });
  }
  var lastLit = -1;
  function setTagline(p) {
    var lit = Math.round(Math.max(0, Math.min(1, p)) * words.length);
    if (lit === lastLit) return;
    lastLit = lit;
    words.forEach(function (w, i) {
      w.classList.toggle('lit', i < lit);
      w.classList.toggle('hot', i === lit - 1 && lit < words.length);
    });
  }
  window.S1 = { setTagline: setTagline, track: track };
  if (reduced) setTagline(1);
  else if (!doc.classList.contains('dm') && tagline) {
    // Telefon i tablet: zdanie stoi w zwykłym przepływie, postęp liczony z jego pozycji (scroll throttlowany przez rAF).
    var ticking = false;
    var update = function () {
      ticking = false;
      var r = tagline.getBoundingClientRect(), vh = window.innerHeight;
      setTagline((vh * 0.88 - r.top) / (r.height + vh * 0.38));
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Odtwarzacze (puste ramki: przycisk, pauza i pasek działają jak w docelowym filmie) ---------- */
  var players = $$('[data-player]');
  function stopOthers(except) {
    players.forEach(function (p) { if (p !== except && p.classList.contains('is-playing')) setPlaying(p, false); });
  }
  function setPlaying(p, on) {
    var btn = $('.play', p), state = $('.player-state', p);
    if (on) {
      stopOthers(p);
      if (!p.classList.contains('has-started')) {
        p.style.setProperty('--dur', (p.getAttribute('data-duration') || 30) + 's');
        p.classList.add('has-started');
        track('video_start', { film: btn.getAttribute('aria-label') });
      }
      p.classList.add('is-playing');
      p.classList.remove('is-paused');
      state.textContent = 'Podgląd odtwarzacza: film do wstawienia';
    } else {
      p.classList.remove('is-playing');
      p.classList.add('is-paused');
      state.textContent = 'Pauza';
    }
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  players.forEach(function (p) {
    var btn = $('.play', p);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setPlaying(p, !p.classList.contains('is-playing'));
    });
    $('.pbar span', p).addEventListener('animationend', function () {
      p.classList.remove('has-started', 'is-playing', 'is-paused');
      btn.setAttribute('aria-pressed', 'false');
      $('.player-state', p).textContent = '';
    });
  });

  /* ---------- Pokoje firmy: galeria filmów-kart ---------- */
  var track_ = $('#room-track');
  var rooms = $$('.room', track_);
  var tabs = $$('[data-room-tab]');
  var segs = $$('.seg i');
  var bubble = $('#rooms-bubble');
  var active = 2;
  function setActive(i, user) {
    if (i === active && !user) return;
    active = i;
    rooms.forEach(function (r, k) { r.classList.toggle('is-active', k === i); });
    tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
    segs.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    var say = rooms[i].getAttribute('data-say');
    if (bubble.textContent !== say) {
      if (reduced) bubble.textContent = say;
      else {
        bubble.classList.add('swap');
        setTimeout(function () { bubble.textContent = say; bubble.classList.remove('swap'); }, 220);
      }
    }
    if (user) track('room_open', { room: $('h3', rooms[i]).textContent.trim() });
  }
  function scrollToRoom(i) {
    i = Math.max(0, Math.min(rooms.length - 1, i));
    var r = rooms[i];
    track_.scrollTo({ left: r.offsetLeft - (track_.clientWidth - r.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
    setActive(i, true);
  }
  // Pozycja startowa: Sprzedaż na środku (karta z liczbą i datą jako pierwszy dowód).
  function centerInitial() {
    var r = rooms[active];
    track_.scrollLeft = r.offsetLeft - (track_.clientWidth - r.offsetWidth) / 2;
  }
  centerInitial();
  window.addEventListener('load', centerInitial);
  var scrollT;
  track_.addEventListener('scroll', function () {
    clearTimeout(scrollT);
    scrollT = setTimeout(function () {
      var mid = track_.scrollLeft + track_.clientWidth / 2, best = 0, bd = Infinity;
      rooms.forEach(function (r, k) { var d = Math.abs(r.offsetLeft + r.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = k; } });
      if (best !== active) setActive(best, true);
    }, 90);
  }, { passive: true });
  tabs.forEach(function (t, k) {
    t.addEventListener('click', function () { scrollToRoom(k); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        var n = (k + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        scrollToRoom(n); tabs[n].focus();
      }
    });
  });
  $$('[data-room-step]').forEach(function (b) {
    b.addEventListener('click', function () { scrollToRoom(active + Number(b.getAttribute('data-room-step'))); });
  });
  track_.addEventListener('keydown', function (e) {
    if (e.target !== track_) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollToRoom(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToRoom(active - 1); }
  });
  rooms.forEach(function (r, k) {
    $('.room-frame', r).addEventListener('click', function () { if (k !== active) scrollToRoom(k); });
    $('[data-pain-go]', r).addEventListener('click', function () { goForm({ pain: r.getAttribute('data-pain') }); });
  });

  /* ---------- Demo dokumentu: produkt w akcji ---------- */
  var DOCS = [
    {
      sheet: 'Arkusz zamówień',
      html: '<p class="doc-kind"><span>Wiadomość e-mail</span><span>12.11.2026, 07:42</span></p>' +
        '<h3 class="doc-title">Zamówienie na przyszły tydzień</h3>' +
        '<p class="doc-meta">Od: Kamila Wrona, <span class="f" data-k="0">Piekarnia Kłos</span></p>' +
        '<p>Dzień dobry, proszę o <span class="f" data-k="1">120 kg mąki typ 650</span> i <span class="f" data-k="2">40 kg cukru</span>, dostawa w <span class="f" data-k="3">środę 18.11</span> jak zwykle na <span class="f" data-k="4">ul. Polną 4 w Kłodzku</span>.</p>' +
        '<p>Pozdrawiam,<br>Kamila</p>',
      fields: [['Klient', 'Piekarnia Kłos'], ['Pozycja 1', 'Mąka typ 650, 120 kg'], ['Pozycja 2', 'Cukier, 40 kg'], ['Dostawa', '18.11.2026'], ['Adres', 'ul. Polna 4, Kłodzko']]
    },
    {
      sheet: 'Rejestr faktur kosztowych',
      html: '<p class="doc-kind"><span>Faktura VAT, plik PDF</span><span>Strona 1 z 1</span></p>' +
        '<h3 class="doc-title">Faktura <span class="f" data-k="0">FV/0417/11/2026</span></h3>' +
        '<p class="doc-meta">Sprzedawca: <span class="f" data-k="1">Blachy Orzeł sp. z o.o.</span><br>Data wystawienia: 12.11.2026</p>' +
        '<p>Blacha trapezowa T18, 240 m²<br>Razem netto: <span class="f" data-k="2">18 437,20 zł</span><br>VAT 23%: <span class="f" data-k="3">4 240,56 zł</span></p>' +
        '<p>Termin płatności: <span class="f" data-k="4">26.11.2026</span></p>',
      fields: [['Numer', 'FV/0417/11/2026'], ['Sprzedawca', 'Blachy Orzeł sp. z o.o.'], ['Kwota netto', '18 437,20 zł'], ['VAT', '4 240,56 zł'], ['Termin płatności', '26.11.2026']]
    },
    {
      sheet: 'Arkusz przyjęć handlowca',
      html: '<p class="doc-kind"><span>Dokument przyjęcia, skan</span><span>PZ 0412</span></p>' +
        '<h3 class="doc-title">Przyjęcie zewnętrzne PZ 0412</h3>' +
        '<p class="doc-meta">Dostawca: <span class="f" data-k="0">EkoZbiór Nowak</span><br>Data przyjęcia: <span class="f" data-k="1">10.11.2026</span></p>' +
        '<p>Kod odpadu: <span class="f" data-k="2">16 02 14</span><br>Masa netto: <span class="f" data-k="3">1 284 kg</span></p>' +
        '<p>Przyjął: magazyn, zmiana I<br>Handlowiec: <span class="f" data-k="4">M. Zieliński</span></p>',
      fields: [['Dostawca', 'EkoZbiór Nowak'], ['Data przyjęcia', '10.11.2026'], ['Kod odpadu', '16 02 14'], ['Masa netto', '1 284 kg'], ['Arkusz', 'M. Zieliński']]
    }
  ];
  var stage = $('#demo-stage'), paper = $('#paper'), body = $('#sheet-body'), status = $('#sheet-status');
  var docTabs = $$('[data-doc]');
  var current = 0, runId = 0, used = false;

  function renderDoc(i) {
    var d = DOCS[i];
    paper.innerHTML = d.html + '<p class="paper-sample">Przykład</p>';
    $('#sheet-title').textContent = d.sheet;
    body.innerHTML = d.fields.map(function (f) {
      return '<tr><td>' + f[0] + '</td><td class="val"><span class="sk"></span></td></tr>';
    }).join('');
    status.textContent = 'Czeka na odczyt';
    status.classList.remove('ok');
    if (!reduced) { paper.classList.remove('swap'); void paper.offsetWidth; paper.classList.add('swap'); }
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function runDemo() {
    var id = ++runId, d = DOCS[current];
    renderDoc(current);
    $$('.fly', stage).forEach(function (f) { f.remove(); });
    var cells = $$('td.val', body), marks = $$('.f', paper);
    status.textContent = 'Czytam dokument';
    var seq = wait(reduced ? 0 : 700);
    d.fields.forEach(function (f, k) {
      seq = seq.then(function () {
        if (id !== runId) return;
        var src = marks.filter(function (m) { return m.getAttribute('data-k') === String(k); })[0];
        var cell = cells[k];
        var land = function () {
          if (id !== runId) return;
          cell.textContent = f[1];
          cell.classList.add('land');
          if (src) { src.classList.remove('reading'); src.classList.add('done'); }
          status.textContent = 'Wpisano ' + (k + 1) + ' z ' + d.fields.length + ' pól';
        };
        if (reduced || !src || !stage.animate) { land(); return wait(reduced ? 120 : 0); }
        src.classList.add('reading');
        var sr = stage.getBoundingClientRect(), a = src.getBoundingClientRect(), b = cell.getBoundingClientRect();
        var fly = document.createElement('span');
        fly.className = 'fly';
        fly.textContent = src.textContent;
        fly.setAttribute('aria-hidden', 'true');
        stage.appendChild(fly);
        var sx = a.left - sr.left - 4, sy = a.top - sr.top - 2;
        var tx = b.left - sr.left + 10, ty = b.top - sr.top + (b.height - fly.offsetHeight) / 2;
        var lift = Math.min(sy, ty) - 70;
        var anim = fly.animate([
          { transform: 'translate(' + sx + 'px,' + sy + 'px) scale(1)', opacity: 0 },
          { transform: 'translate(' + sx + 'px,' + (sy - 8) + 'px) scale(1.04)', opacity: 1, offset: 0.12 },
          { transform: 'translate(' + ((sx + tx) / 2) + 'px,' + lift + 'px) scale(1.08)', opacity: 1, offset: 0.55 },
          { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1)', opacity: 1 }
        ], { duration: 1050, easing: EASE, fill: 'forwards' });
        return wait(380).then(function () {
          anim.finished.then(function () { land(); fly.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: EASE, fill: 'forwards' }).finished.then(function () { fly.remove(); }); });
        });
      });
    });
    seq.then(function () { return wait(reduced ? 0 : 1200); }).then(function () {
      if (id !== runId) return;
      status.textContent = 'Gotowe do arkusza, ' + d.fields.length + ' z ' + d.fields.length + ' pól';
      status.classList.add('ok');
    });
  }
  docTabs.forEach(function (t, k) {
    t.addEventListener('click', function () {
      current = k;
      docTabs.forEach(function (x, j) { x.setAttribute('aria-selected', j === k ? 'true' : 'false'); });
      track('demo_use', { dokument: t.textContent });
      runDemo();
    });
  });
  $('#demo-run').addEventListener('click', function () { track('demo_use', { dokument: docTabs[current].textContent, ponownie: true }); runDemo(); });
  renderDoc(0);
  if ('IntersectionObserver' in window) {
    var dio = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !used) { used = true; dio.disconnect(); runDemo(); }
    }, { threshold: 0.45 });
    dio.observe(stage);
  } else runDemo();

  /* ---------- Formularz z Bzykiem ---------- */
  var form = $('#lead-form'), fBubble = $('#f-bubble'), fProg = $('#f-prog'), fPain = $('#f-pain');
  var backBtn = $('#f-back'), hint = $('#f-hint');
  var ORDER = ['1', '2', '6', 'end'];
  var PROG = { '1': 0.1, '2': 0.2, '6': 0.6, end: 1 };
  var SAY = {
    '1': 'Pytam, żeby dopasować rozmowę do Twojej roli.',
    '2': 'Pytam, żeby dobrać skalę pierwszego systemu.',
    '6': 'Od tej odpowiedzi zależy, jaką rozmowę zaproponujemy na końcu.'
  };
  var PATHS = {
    A: { title: 'Droga A: rozmowa z Bartkiem, 45 minut', say: 'Wybierz termin rozmowy z Bartkiem, potrwa 45 minut.', text: 'Na rozmowie przejdziemy przez to, co boli najbardziej. Potem dostaniesz spisany zakres: etapy z ceną i efekt, który ma dawać system.' },
    B: { title: 'Droga B: rozmowa o Mapie AI firmy, 30 minut', say: 'Wybierz termin rozmowy o Mapie AI firmy, potrwa 30 minut.', text: 'Mapa AI firmy to pełny obraz Twojej firmy i plan systemów na kwartał i rok. Cena: 6 900 zł netto, w całości odliczana od pierwszego wdrożenia.' },
    C: { title: 'Droga C: rozmowa o pilocie, 30 minut', say: 'Wybierz termin rozmowy o pilocie, potrwa 30 minut.', text: 'W szybkim pilocie przez dwa tygodnie budujemy jeden proces na próbce Twoich danych i uruchamiamy go na naszej infrastrukturze. Szczegóły i koszt omówimy na rozmowie.' }
  };
  var fs = { step: '1', path: null, pain: null, started: false };

  function say(t) {
    if (fBubble.textContent === t) return;
    if (reduced) { fBubble.textContent = t; return; }
    fBubble.classList.add('swap');
    setTimeout(function () { fBubble.textContent = t; fBubble.classList.remove('swap'); }, 200);
  }
  function showContext() {
    var bits = [];
    if (fs.pain) bits.push('Zaznaczony ból: ' + fs.pain);
    if (fs.path) bits.push('Wybrana droga: ' + fs.path);
    fPain.hidden = !bits.length;
    fPain.textContent = bits.join(' · ');
  }
  function goStep(step, focus) {
    fs.step = step;
    $$('.fstep', form).forEach(function (s) { s.classList.toggle('is-on', s.getAttribute('data-step') === step); });
    fProg.style.transform = 'scaleX(' + PROG[step] + ')';
    backBtn.hidden = step === '1';
    hint.hidden = step === 'end';
    if (step === 'end') {
      var p = PATHS[fs.path || 'A'];
      $('#f-path-title').textContent = p.title;
      $('#f-path-text').textContent = p.text;
      say(p.say);
      track('form_submit', { droga: fs.path || 'A', szkic: true });
      if (focus) $('.fend', form).focus({ preventScroll: true });
    } else {
      say(SAY[step]);
      if (focus) { var first = $('.fstep.is-on input:checked', form) || $('.fstep.is-on input', form); if (first) first.focus({ preventScroll: true }); }
    }
  }
  form.addEventListener('change', function (e) {
    var t = e.target;
    if (t.type !== 'radio') return;
    if (!fs.started) { fs.started = true; track('form_start'); }
    track('form_step', { pytanie: fs.step, odpowiedz: t.value });
    if (t.name === 'etap') fs.path = t.value;
    var next = ORDER[ORDER.indexOf(fs.step) + 1];
    // Krótka pauza, żeby zaznaczenie było widać, zanim przejdzie dalej.
    setTimeout(function () { goStep(next, true); }, reduced ? 0 : 380);
  });
  backBtn.addEventListener('click', function () { goStep(ORDER[Math.max(0, ORDER.indexOf(fs.step) - 1)], true); });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  function goForm(opts) {
    opts = opts || {};
    if (opts.pain) fs.pain = opts.pain;
    if (opts.path) {
      fs.path = opts.path;
      var r = $('input[name="etap"][value="' + opts.path + '"]', form);
      if (r) r.checked = true;
      if (fs.step === 'end') goStep('end');
    }
    showContext();
    scrollToEl($('#rozmowa'));
  }
  // Pierwsze pytanie w hero: odpowiedź przenosi do formularza, który zaczyna od pytania 2.
  $$('[data-q1]').forEach(function (c) {
    c.addEventListener('click', function () {
      $$('[data-q1]').forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      var r = $('input[name="rola"][value="' + c.getAttribute('data-q1') + '"]', form);
      if (r) r.checked = true;
      if (!fs.started) { fs.started = true; track('form_start', { z: 'hero' }); }
      track('form_step', { pytanie: '1', odpowiedz: c.getAttribute('data-q1') });
      goStep('2');
      goForm({});
      setTimeout(function () { var f = $('.fstep.is-on input', form); if (f) f.focus({ preventScroll: true }); }, reduced ? 0 : 900);
    });
  });
  $$('[data-path]').forEach(function (b) { b.addEventListener('click', function () { goForm({ path: b.getAttribute('data-path') }); }); });
  $$('[data-go-form]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); goForm({}); }); });

  /* ---------- Ruch desktopowy: GSAP ładowany dopiero po wczytaniu ---------- */
  if (doc.classList.contains('dm')) {
    var load = function (src) {
      return new Promise(function (res, rej) {
        var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
      });
    };
    var start = function () {
      load('/warianty/_vendor/gsap-3.12.5/gsap.min.js')
        .then(function () { return load('/warianty/_vendor/gsap-3.12.5/ScrollTrigger.min.js'); })
        .then(function () { return load('motion-desktop.js'); })
        .catch(function () { doc.classList.remove('dm'); setTagline(1); });
    };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  }
})();
