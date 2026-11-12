#!/usr/bin/env python3
"""QA strony przed oddaniem Bartkowi: zrzuty każdego stanu na 390 i 1440 px plus testy układu.

Po co: test „brak przewijania w bok” przepuścił w S4 olbrzymie pigułki w Recepcji na telefonie
(uwaga 15 Bartka, 12.11.2026). Ten skrypt przechodzi przez każdy dział, każdą kartę przykładu
(dziś zakładki, po przebudowie karuzela), każdy krok formularza i każdy ekran drogi, robi zrzut
i w każdym stanie sprawdza:

  poza-ekran      element wychodzi poza szerokość okna (także gdy strona ma overflow-x: hidden)
  poza-rodzica    element w zwykłym przepływie wystaje z rodzica
  przyciety       element częściowo ucięty przez kontener z overflow: hidden/clip
  margines-karty  element z tłem/ramką wchodzi w wewnętrzny margines karty (ramka filmu przy krawędzi)
  tekst-uciety    tekst nie mieści się w swoim pudełku (ellipsis, line-clamp, długie słowo)
  etykieta-lamie  pigułka, zakładka albo przycisk z krótkim tekstem łamie się na kilka linii
  pigulka-duza    pigułka z tekstem większym niż 28 px na telefonie
  nachodzenie     dwa teksty albo dwa przyciski nachodzą na siebie
  cel-dotyku      element klikalny mniejszy niż 44 x 44 px (tylko telefon)
  kontrast        kontrast tekstu poniżej WCAG AA (4,5:1, duży tekst 3:1); tła z gradientem pomijane
  scroll-bok      cała strona przewija się w bok
  konsola         błąd w konsoli przeglądarki

Wynik: zrzuty <out>/<vp>/<stan>.png, przy błędach także <stan>__bledy.png z czerwonymi ramkami,
wyniki.json oraz przeglad.html (zrzuty 390 i 1440 obok siebie z listą uwag do przeglądu oczami).
Kod wyjścia 1, gdy jest choć jeden błąd.

Strona v4 (Next, więc bramka używa --base; serwer dev na 3010 musi działać):
  python3 scripts/qa/qa_mobile.py --base http://127.0.0.1:3010 --page / \
      --out scripts/qa/wyniki --vp 390 1440 360
Formularz w kroku „wyniki” jest podstawiony (page.route na /api/formularz): zero zapisów do CRM.
"""
from __future__ import annotations

import argparse
import functools
import html
import http.server
import json
import re
import shutil
import socket
import sys
import tempfile
import threading
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable

from playwright.sync_api import Page, sync_playwright

VIEWPORTS = {
    "390": {"width": 390, "height": 844},
    "1440": {"width": 1440, "height": 900},
    # 360: tylko scroll-bok i poza-ekran (Review Focus 3), reszta testów jest dla 390 i 1440.
    "360": {"width": 360, "height": 780},
}
LICZONE_NA_360 = {"scroll-bok", "poza-ekran"}
ROOMS = ["telefony", "marketing", "sprzedaz", "zamowienia", "logistyka"]

# Selektory w jednym miejscu (strona v4: atrybuty data-qa z komponentów home-v4).
SEL = {
    "hero_key": '[data-qa="hero-klawisz"][data-dzial="{room}"]',
    "room_root": "#dzialy",
    "cards_root": '[data-qa="karuzela"]:not([hidden])',
    "carousel_next": '[data-qa="karuzela"]:not([hidden]) [data-karuzela-next]',
    "carousel_slide": '[aria-roledescription="slajd"], [aria-roledescription="slide"]',
    "tabs": '[data-qa="karuzela"]:not([hidden]) [data-qa="karta"]:not([inert]) [data-qa="zakladka-przykladu"]',
    "plan_btn": '[data-qa="pokoj"]',
    "step": '[data-qa="krok-formularza"]',
    "form_root": "#formularz",
    "sections": ["header", "main > section:first-of-type", '[data-qa="przejscie"]', "#dzialy", "#wspolpraca",
                 "#bezpieczenstwo", "#opinie", "#pytania", "#wezwanie", "#formularz", "footer"],
}

ZGODA_JS = ("window.localStorage.setItem('cookie-consent', JSON.stringify({wersja: '2026-11-11', "
            "czas: new Date().toISOString(), analityczne: false, kalendarz: false}));")
START = re.compile("Zaczynamy")
PIERWSZE_PYTANIE = "rola"
# Etykiety odpowiedzi z src/content/formularz.ts w kolejności pytań; baza nie uruchamia odsiewu ani dużej firmy.
ODP_BAZA = {
    "rola": "Właściciel albo prezes",
    "wielkosc": "10-30",
    "decyzja": "Decyduję ja",
    "bol": "Przepisywanie dokumentów i faktur",
    "programy": "Excel albo arkusze",
    "etap": "Wiem, który proces chcę usprawnić jako pierwszy",
    "powod": "Konkurencja już to robi",
    "budzet": "15-25 tys. zł netto",
    "termin": "W ciągu 3 miesięcy",
    "zrodlo": "ChatGPT",
}
# Scenariusze ekranów wyniku: zmiana odpowiedzi względem bazy i trasa, jaką zwraca serwer (ta sama, którą
# daje zdecyduj() w src/content/formularz.ts; „odsiew” rozstrzyga sama strona po ostatnim pytaniu).
WYNIKI = {
    "A": ({}, "A"),
    "B": ({"etap": "Nie wiem, od czego zacząć"}, "B"),
    "C": ({"etap": "Najpierw chcę zobaczyć, że to działa na moich danych"}, "C"),
    "duza-firma": ({"wielkosc": "Ponad 250"}, "duza_firma"),
    "nie-teraz": ({"wielkosc": "1-9", "budzet": "Do 5 tys. zł netto"}, "odsiew"),
    "proba-nieudana": ({"etap": "Próbowaliśmy, ale nie wyszło"}, "C"),
}

CSP = ("default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; "
       "font-src 'self' data:; connect-src 'self'; frame-src https://cal.com; media-src 'self' data: blob:; "
       "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'")

# Testy liczone w przeglądarce. Zakres: element `root` (sekcja albo body).
CHECKS_JS = r"""
([rootSel, mobile]) => {
  const root = document.querySelector(rootSel) || document.body;
  const vw = document.documentElement.clientWidth;
  const out = [];
  const px = (v) => parseFloat(v) || 0;
  const cs = (e) => getComputedStyle(e);
  const label = (e) => {
    const parts = [];
    let n = e;
    for (let i = 0; n && n.nodeType === 1 && i < 3; i++, n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.id) { s += "#" + n.id; parts.unshift(s); break; }
      const cls = [...n.classList].filter((c) => !c.startsWith("is-")).slice(0, 2);
      if (cls.length) s += "." + cls.join(".");
      parts.unshift(s);
    }
    return parts.join(" > ");
  };
  const text = (e) => (e.innerText || e.getAttribute("aria-label") || e.value || "").replace(/\s+/g, " ").trim().slice(0, 60);
  const hiddenUp = (e) => {
    for (let n = e; n && n !== document.documentElement; n = n.parentElement) {
      // aria-hidden i inert NIE oznaczają „niewidoczne”: dekoracje widać na ekranie, więc podlegają testom
      // układu (poza-ekran, scroll-bok, ucięcie). Pomijamy tylko to, czego naprawdę nie widać.
      if (n.hidden) return true;
      const up = n.parentElement;  // zamknięte <details>: poza summary nic nie widać, choć Chromium podaje prostokąty
      if (up && up.tagName === "DETAILS" && !up.open && n.tagName !== "SUMMARY") return true;
      const s = cs(n);
      if (s.display === "none" || s.visibility === "hidden" || px(s.opacity) < 0.05) return true;
    }
    return false;
  };
  const ariaHiddenUp = (e) => !!e.closest('[aria-hidden="true"]');
  const clipAncestor = (e) => {
    for (let n = e.parentElement; n && n !== document.body; n = n.parentElement) {
      const s = cs(n);
      if (/(hidden|clip|auto|scroll)/.test(s.overflowX + s.overflowY)) return n;
    }
    return null;
  };
  const xScroller = (e) => {
    for (let n = e.parentElement; n && n !== document.body; n = n.parentElement) {
      if (/(auto|scroll)/.test(cs(n).overflowX) && n.scrollWidth > n.clientWidth + 1) return true;
    }
    return false;
  };
  const marked = new Set();
  const add = (check, level, e, msg) => {
    out.push({ check, level, el: label(e), text: text(e), msg,
               rect: (({ x, y, width, height }) => ({ x: Math.round(x), y: Math.round(y + scrollY), w: Math.round(width), h: Math.round(height) }))(e.getBoundingClientRect()) });
    if (level === "blad") marked.add(e);
  };

  const all = [root, ...root.querySelectorAll("*")].filter((e) => !(e instanceof SVGElement && e.tagName !== "svg"));
  // Tekst tylko dla czytników ekranu (1 x 1 px, ucięty clip-path/clip) nie jest widoczny, więc nie podlega testom układu.
  // Wąski wyjątek: dokładnie wzorzec „visually hidden” (np. etykiety torów My/Ty w osi współpracy na 1440 px).
  const srOnly = (e, r) => r.width <= 1.5 && r.height <= 1.5 && /(hidden|clip)/.test(cs(e).overflowX + cs(e).overflowY)
    && (cs(e).clipPath !== "none" || cs(e).clip !== "auto");
  const vis = all.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !hiddenUp(e) && !srOnly(e, r); });

  // Element całkiem poza swoim kontenerem przycinającym (np. niewidoczny slajd karuzeli) traktujemy jak niewidoczny.
  const shown = vis.filter((e) => {
    const c = clipAncestor(e);
    if (!c) return true;
    const r = e.getBoundingClientRect(), k = c.getBoundingClientRect();
    return !(r.right <= k.left + 1 || r.left >= k.right - 1 || r.bottom <= k.top + 1 || r.top >= k.bottom - 1);
  });
  const shownSet = new Set(shown);

  const hasText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const boxy = (s) => (s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent") || s.backgroundImage !== "none"
    || px(s.borderLeftWidth) > 0 || px(s.borderTopWidth) > 0 || (s.boxShadow && s.boxShadow !== "none");
  const decor = (e, s) => (s.position === "absolute" || s.position === "fixed") && !hasText(e) && !e.matches("button, a, input, img, video, iframe");

  for (const e of shown) {
    const s = cs(e), r = e.getBoundingClientRect();
    if (e === root) continue;

    // 1. poza ekran
    if ((r.left < -1 || r.right > vw + 1) && !xScroller(e) && !decor(e, s) && s.position !== "fixed") {
      const c = clipAncestor(e);
      const k = c ? c.getBoundingClientRect() : null;
      if (!k || k.left < -1 || k.right > vw + 1 || (r.left >= k.left - 1 && r.right <= k.right + 1))
        add("poza-ekran", "blad", e, `wystaje poza okno: ${Math.round(r.left)}..${Math.round(r.right)} px przy szerokości ${vw}`);
    }

    // 2. poza rodzica (zwykły przepływ, rodzic bez przycinania)
    const p = e.parentElement;
    if (p && shownSet.has(p) && !decor(e, s) && !/(absolute|fixed)/.test(s.position) && !/contents/.test(cs(p).display)) {
      const ps = cs(p), q = p.getBoundingClientRect();
      const visibleOverflow = !/(hidden|clip|auto|scroll)/.test(ps.overflowX);
      const dl = q.left - r.left, dr = r.right - q.right;
      const tol = s.display === "inline" ? 4 : 1.5;  // podświetlenie <mark> z paddingiem wychodzi o 1-2 px celowo
      if (visibleOverflow && (dl > tol || dr > tol) && !xScroller(e))
        add("poza-rodzica", "blad", e, `wystaje z ${label(p)} o ${Math.round(Math.max(dl, dr))} px`);
    }

    // 3. przycięty przez kontener
    const c = clipAncestor(e);
    if (c && !decor(e, s) && (hasText(e) || e.matches("button, a, input, img, video, iframe, label")) && !/(auto|scroll)/.test(cs(c).overflowX + cs(c).overflowY)) {
      const k = c.getBoundingClientRect();
      const cut = Math.max(k.left - r.left, r.right - k.right, k.top - r.top, r.bottom - k.bottom);
      if (cut > 1.5) add("przyciety", "blad", e, `ucięty przez ${label(c)} o ${Math.round(cut)} px`);
    }

    // 4. margines karty: element z tłem/ramką albo media wchodzi w padding najbliższej karty
    if ((boxy(s) || e.matches("img, video, iframe")) && !decor(e, s) && !/(absolute|fixed)/.test(s.position)) {
      for (let n = e.parentElement; n && n !== root.parentElement; n = n.parentElement) {
        const ns = cs(n);
        if (!(boxy(ns) && px(ns.borderTopLeftRadius) > 0)) continue;
        const k = n.getBoundingClientRect();
        const pl = px(ns.paddingLeft), pr = px(ns.paddingRight);
        if (pl >= 8 && r.left - k.left < pl - 1.5 && r.left - k.left > -1) add("margines-karty", "ostrzezenie", e, `${Math.round(r.left - k.left)} px od lewej krawędzi ${label(n)}, margines karty ${Math.round(pl)} px`);
        else if (pr >= 8 && k.right - r.right < pr - 1.5 && k.right - r.right > -1) add("margines-karty", "ostrzezenie", e, `${Math.round(k.right - r.right)} px od prawej krawędzi ${label(n)}, margines karty ${Math.round(pr)} px`);
        break;
      }
    }

    // 5. tekst ucięty albo wylewający się z pudełka
    if (hasText(e)) {
      const clips = /(hidden|clip)/.test(s.overflowX + s.overflowY) || s.textOverflow === "ellipsis" || (s.webkitLineClamp && s.webkitLineClamp !== "none");
      if (e.scrollWidth > e.clientWidth + 1 && e.clientWidth > 0 && s.display !== "inline")
        add("tekst-uciety", "blad", e, clips ? `tekst ucięty w poziomie (${e.scrollWidth} > ${e.clientWidth} px)` : `tekst wychodzi poza element (${e.scrollWidth} > ${e.clientWidth} px)`);
      else if (clips && e.scrollHeight > e.clientHeight + 2 && e.clientHeight > 0)
        add("tekst-uciety", "blad", e, `tekst ucięty w pionie (${e.scrollHeight} > ${e.clientHeight} px)`);
    }

    // 6. pigułka / zakładka / krótki przycisk łamie się na kilka linii
    const short = (e.innerText || "").trim();
    const pill = px(s.borderTopLeftRadius) >= Math.min(r.height / 2 - 2, 20) && boxy(s);
    const tabLike = e.matches("button, [role=tab], a.btn, .btn");
    if ((pill || tabLike) && hasText(e) && short && short.length <= 40) {
      // linie liczone tylko z węzłów tekstu (ikony i diody w przycisku nie są linią)
      const tops = new Set();
      const tw = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) {
        if (!n.textContent.trim()) continue;
        const rg = document.createRange(); rg.selectNodeContents(n);
        [...rg.getClientRects()].filter((x) => x.width > 1).forEach((x) => tops.add(Math.round((x.top + x.height / 2) / 6)));
      }
      const lines = tops.size;
      if (lines > 1 && short.split(/\s+/).length > 1) add("etykieta-lamie", pill ? "blad" : "ostrzezenie", e, `krótki tekst „${short}” łamie się na ${lines} linie`);
      if (pill && mobile && px(s.fontSize) > 28) add("pigulka-duza", "blad", e, `pigułka z tekstem ${Math.round(px(s.fontSize))} px na telefonie`);
    }

    // 7. cel dotyku (telefon)
    if (mobile) {
      let t = null;
      if (e.matches("a[href], button, [role=tab], [role=button], summary, select, textarea, input:not([type=radio]):not([type=checkbox]):not([type=hidden])")) t = e;
      if (e.matches("label") && e.querySelector("input[type=radio], input[type=checkbox]")) t = e;
      const inline = e.matches("a") && e.parentElement && e.parentElement.matches("p, li, blockquote, figcaption") && (e.parentElement.innerText || "").trim().length > (e.innerText || "").trim().length + 3;
      if (t && !inline && (r.width < 44 - 0.5 || r.height < 44 - 0.5)) add("cel-dotyku", "blad", e, `${Math.round(r.width)} x ${Math.round(r.height)} px, minimum 44 x 44`);
    }

    // 8. kontrast
    // Czysto dekoracyjny aria-hidden (bez przycisku/linku) jest poza kontrastem; reszta testów go obejmuje.
    if (!ariaHiddenUp(e) && hasText(e) && s.color && !(s.webkitTextFillColor === "rgba(0, 0, 0, 0)" || s.color === "rgba(0, 0, 0, 0)")) {
      const parse = (v) => { const m = v.match(/[\d.]+/g); if (!m) return null; return { r: +m[0], g: +m[1], b: +m[2], a: m[3] === undefined ? 1 : +m[3] }; };
      let fg = parse(s.color), bg = null, unknown = false, op = 1;
      for (let n = e; n; n = n.parentElement) {
        const ns = cs(n);
        op *= px(ns.opacity) || 0;
        if (ns.backgroundImage !== "none" && !/url\(/.test(ns.backgroundImage) && bg === null) { unknown = true; break; }
        if (ns.backgroundImage !== "none" && /url\(/.test(ns.backgroundImage)) { unknown = true; break; }
        const b = parse(ns.backgroundColor);
        if (b && b.a > 0) {
          if (!bg) bg = b; else bg = { r: bg.r * bg.a + b.r * (1 - bg.a), g: bg.g * bg.a + b.g * (1 - bg.a), b: bg.b * bg.a + b.b * (1 - bg.a), a: bg.a + b.a * (1 - bg.a) };
          if (bg.a >= 0.99) break;
        }
      }
      if (!unknown && fg) {
        if (!bg || bg.a < 0.99) { const w = { r: 255, g: 255, b: 255 }; const a = bg ? bg.a : 0; bg = bg ? { r: bg.r * a + w.r * (1 - a), g: bg.g * a + w.g * (1 - a), b: bg.b * a + w.b * (1 - a), a: 1 } : { ...w, a: 1 }; }
        const fa = fg.a * Math.min(op, 1);
        const f = { r: fg.r * fa + bg.r * (1 - fa), g: fg.g * fa + bg.g * (1 - fa), b: fg.b * fa + bg.b * (1 - fa) };
        const L = (c) => { const ch = [c.r, c.g, c.b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]; };
        const l1 = L(f), l2 = L(bg), ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const big = px(s.fontSize) >= 24 || (px(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
        const need = big ? 3 : 4.5;
        if (ratio < need) add("kontrast", "blad", e, `kontrast ${ratio.toFixed(2)}:1, wymagane ${need}:1 (tekst ${Math.round(px(s.fontSize))} px)`);
      }
    }
  }

  // 9. nachodzenie: teksty (prostokąty linii tekstu) i elementy klikalne
  const items = [];
  for (const e of shown) {
    if (e.matches("button, a[href], input, select, textarea, [role=tab]")) items.push({ e, rs: [e.getBoundingClientRect()] });
    else if (hasText(e)) {
      const rs = [];
      // prostokąt tekstu przycięty do wysokości linii: duże cyfry z line-height < 1 nie nachodzą naprawdę
      const lh = px(cs(e).lineHeight) || px(cs(e).fontSize) * 1.2;
      for (const n of e.childNodes) if (n.nodeType === 3 && n.textContent.trim()) {
        const g = document.createRange(); g.selectNodeContents(n);
        for (const x of g.getClientRects()) {
          if (x.width <= 1 || x.height <= 1) continue;
          const h = Math.min(x.height, lh), cy = x.top + x.height / 2;
          rs.push({ left: x.left, right: x.right, top: cy - h / 2, bottom: cy + h / 2 });
        }
      }
      if (rs.length) items.push({ e, rs });
    }
  }
  const seen = new Set();
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    const a = items[i], b = items[j];
    if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
    let hit = 0;
    for (const x of a.rs) for (const y of b.rs) {
      const w = Math.min(x.right, y.right) - Math.max(x.left, y.left), h = Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top);
      if (w > 2 && h > 2) hit = Math.max(hit, Math.min(w, h));
    }
    if (hit > 2) {
      const key = label(a.e) + "|" + label(b.e);
      if (seen.has(key)) continue; seen.add(key);
      add("nachodzenie", "blad", a.e, `nachodzi na ${label(b.e)} („${text(b.e).slice(0, 30)}”) o ${Math.round(hit)} px`);
    }
  }

  // 10. przewijanie strony w bok
  if (document.documentElement.scrollWidth > vw + 1) out.push({ check: "scroll-bok", level: "blad", el: "html", text: "", msg: `strona ma ${document.documentElement.scrollWidth} px przy oknie ${vw}`, rect: null });

  window.__qaMarked = [...marked];
  return out;
}
"""

MARK_JS = """(on) => { (window.__qaMarked || []).forEach((e) => { e.style.outline = on ? '3px solid #e00000' : ''; e.style.outlineOffset = on ? '-2px' : ''; }); }"""


@dataclass
class Shot:
    vp: str
    name: str
    root: str
    file: str
    issues: list[dict] = field(default_factory=list)
    marked_file: str | None = None


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def serve(root: Path) -> str:
    """Serwer statyczny z nagłówkiem CSP jak w produkcji (script-src 'self')."""
    class H(http.server.SimpleHTTPRequestHandler):
        def end_headers(self) -> None:
            self.send_header("Content-Security-Policy", CSP)
            self.send_header("Cache-Control", "no-cache")
            super().end_headers()

        def log_message(self, *a: object) -> None:
            pass

    port = free_port()
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(H, directory=str(root)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return f"http://127.0.0.1:{port}"


class Runner:
    def __init__(self, page: Page, vp: str, out: Path, url: str) -> None:
        self.page, self.vp, self.out, self.url = page, vp, out, url
        self.mobile = int(vp) < 600
        self.shots: list[Shot] = []
        (out / vp).mkdir(parents=True, exist_ok=True)
        for old in (out / vp).glob("*.png"):  # zrzuty z poprzedniego przebiegu nie mogą udawać aktualnych
            old.unlink()

    def load(self) -> None:
        self.page.goto(self.url, wait_until="networkidle")
        self.page.evaluate("document.fonts.ready")
        self.page.wait_for_timeout(300)

    def capture(self, name: str, root: str, full_page: bool = False) -> Shot:
        p = self.page
        p.wait_for_timeout(450)
        issues = p.evaluate(CHECKS_JS, [root, self.mobile])
        if self.vp == "360":  # 360 px: tylko przewijanie w bok i wychodzenie poza ekran
            issues = [i for i in issues if i["check"] in LICZONE_NA_360]
        f = self.out / self.vp / f"{name}.png"
        loc = p.locator(root).first
        if full_page or root == "body":
            p.screenshot(path=str(f), full_page=True)
        else:
            loc.scroll_into_view_if_needed()
            loc.screenshot(path=str(f))
        shot = Shot(self.vp, name, root, str(f.relative_to(self.out)), issues)
        if any(i["level"] == "blad" for i in issues) and root != "body":
            p.evaluate(MARK_JS, True)
            mf = self.out / self.vp / f"{name}__bledy.png"
            loc.screenshot(path=str(mf))
            p.evaluate(MARK_JS, False)
            shot.marked_file = str(mf.relative_to(self.out))
        self.shots.append(shot)
        return shot

    # --- stany ---
    def overview(self) -> None:
        self.load()
        self.capture("00-cala-strona", "body", full_page=True)
        for i, sel in enumerate(SEL["sections"], 1):
            if self.page.locator(sel).count():
                self.capture(f"01-sekcja-{i:02d}-{sel.strip('#.').split('.')[0].replace(' ', '')}", sel)

    def cards(self, prefix: str) -> None:
        """Karty w dziale: karuzela (nowy układ) albo zakładki przykładu (S4)."""
        p = self.page
        nxt = p.locator(SEL["carousel_next"]).first
        if nxt.count() and nxt.is_visible():
            # Slajdy tylko aktywnej karuzeli: pozostałe działy mają ją ukrytą, ale też w HTML.
            n = max(p.locator(f'{SEL["cards_root"]} {SEL["carousel_slide"]}').count(), 1)
            for k in range(n):
                self.capture(f"{prefix}-karta-{k + 1}", SEL["cards_root"])
                if k < n - 1:
                    nxt.click()
            return
        tabs = p.locator(SEL["tabs"])
        for k in range(tabs.count()):
            tabs.nth(k).click()
            self.capture(f"{prefix}-karta-{k + 1}", SEL["cards_root"])

    def zakladki_przykladu(self, prefix: str) -> None:
        """Karta 2 działu: każda zakładka przykładu (3 stany) klikana i sprawdzana osobno."""
        p = self.page
        nxt = p.locator(SEL["carousel_next"]).first
        nxt.click()  # z karty 1 na kartę 2 (przykład)
        tabs = p.locator(SEL["tabs"])
        tabs.first.wait_for(state="visible", timeout=5000)  # karta 2 staje się aktywna po przewinięciu
        n = tabs.count()
        if n < 2:
            raise RuntimeError(f"{prefix}: karta 2 ma {n} zakładek przykładu, oczekiwano co najmniej 2")
        for k in range(n):
            tabs.nth(k).click()
            self.capture(f"{prefix}-zakladka-{k + 1}", SEL["cards_root"])

    def departments(self) -> None:
        for room in ROOMS:
            self.load()
            self.page.locator(SEL["hero_key"].format(room=room)).click()
            self.capture(f"10-dzial-{room}", SEL["room_root"])
            self.cards(f"11-dzial-{room}")
            self.load()
            self.page.locator(SEL["hero_key"].format(room=room)).click()
            self.zakladki_przykladu(f"12-dzial-{room}")

    def plan(self) -> None:
        """Rzut firmy w sekcji przejścia: każdy widoczny pokój (na telefonie mapka, na desktopie rzut 3D)."""
        self.load()
        btns = self.page.locator(SEL["plan_btn"]).locator("visible=true")
        for k in range(btns.count()):
            room = btns.nth(k).get_attribute("data-dzial")
            btns.nth(k).scroll_into_view_if_needed()
            btns.nth(k).click(force=True)  # pokoje leżą w bloku aria-hidden, nad nimi bywa warstwa dekoracji
            self.capture(f"20-plan-{room}", '[data-qa="przejscie"]')

    # --- formularz: wspólne kroki ---
    def krok(self, krok_id: str):
        return self.page.locator(f'{SEL["step"]}[data-krok="{krok_id}"]')

    def start_formularza(self) -> None:
        """Ładuje stronę, przewija do formularza i klika „Zaczynamy” (powtarza do hydratacji)."""
        self.load()
        self.page.locator(SEL["form_root"]).scroll_into_view_if_needed()
        for _ in range(10):
            self.page.get_by_role("button", name=START).click(timeout=2000)
            try:
                self.krok(PIERWSZE_PYTANIE).wait_for(state="visible", timeout=1500)
                return
            except Exception:
                continue
        raise RuntimeError("formularz nie przeszedł do pierwszego pytania")

    def odpowiedz(self, krok_id: str, etykieta: str, zrzut: str | None = None) -> None:
        k = self.krok(krok_id)
        k.wait_for(state="visible")
        if zrzut:
            self.capture(zrzut, SEL["form_root"])
        k.locator("label", has_text=re.compile(rf"^\s*{re.escape(etykieta)}\s*$")).first.click()
        k.get_by_role("button", name=re.compile("Dalej")).click()

    def przejdz_pytania(self, odp: dict[str, str], prefiks: str | None = None) -> None:
        for n, (krok_id, etykieta) in enumerate(odp.items(), 1):
            self.odpowiedz(krok_id, etykieta, f"{prefiks}-q{n:02d}-{krok_id}" if prefiks else None)

    def form(self) -> None:
        """Start, każde z 10 pytań, kontakt (ekrany drogi są w kroku „wyniki”)."""
        self.start_formularza_ekran()
        self.start_formularza()
        self.przejdz_pytania(ODP_BAZA, "31-formularz")
        self.krok("kontakt").wait_for(state="visible")
        self.capture("32-formularz-kontakt", SEL["form_root"])

    def start_formularza_ekran(self) -> None:
        self.load()
        self.page.locator(SEL["form_root"]).scroll_into_view_if_needed()
        self.capture("30-formularz-start", SEL["form_root"])

    def wyniki(self) -> None:
        """Ekrany A, B, C, duża firma, „Nie teraz” i nieudana próba. Serwer podstawiony: zero zapisów do CRM."""
        p = self.page
        trasa_serwera = {"v": "A"}

        def serwer(route) -> None:  # ta sama treść co gałąź sukcesu w src/app/api/formularz/route.ts
            body = {"ok": True, "route": trasa_serwera["v"], "rezerwacja": None}
            route.fulfill(status=200, content_type="application/json", body=json.dumps(body))

        p.route("**/api/formularz", serwer)
        p.route("https://cal.com/**", lambda r: r.fulfill(status=200, content_type="text/html", body=""))
        for nazwa, (zmiany, trasa) in WYNIKI.items():
            trasa_serwera["v"] = trasa
            self.start_formularza()
            self.przejdz_pytania({**ODP_BAZA, **zmiany})
            f = p.locator(SEL["form_root"])
            if trasa == "odsiew":
                self.krok("nie_teraz").wait_for(state="visible")
                f.locator("input[autocomplete=email]").fill("test@testowa-firma.example")
                f.locator("input[type=checkbox]").first.check()
                self.capture(f"40-wynik-{nazwa}-formularz", SEL["form_root"])
                f.get_by_role("button", name=re.compile("Wyślij mi przykłady")).click()
                self.krok("odsiew_gotowe").wait_for(state="visible")
                self.capture(f"40-wynik-{nazwa}", SEL["form_root"])
                continue
            self.krok("kontakt").wait_for(state="visible")
            f.locator("input[autocomplete=name]").fill("Test Testowy")
            f.locator("input[autocomplete=organization]").fill("Testowa Firma")
            f.locator("input[autocomplete=url]").fill("testowa-firma.example")
            f.locator("input[autocomplete=email]").fill("test@testowa-firma.example")
            f.locator("input[type=checkbox]").first.check()
            f.locator('button[type=submit]').click()
            self.krok("droga").wait_for(state="visible")
            self.capture(f"40-wynik-{nazwa}", SEL["form_root"])
        p.unroute("**/api/formularz")
        p.unroute("https://cal.com/**")

    def os(self) -> None:
        """Oś kroków współpracy: zrzut każdego kroku (przy reduced motion wszystkie od razu zapalone)."""
        self.load()
        n = self.page.locator('[data-qa="krok-osi"]').count()
        for k in range(n):
            sel = f'[data-qa="krok-osi"][data-nr="{k}"]'
            if self.page.locator(sel).count():
                self.capture(f"50-os-krok-{k}", sel)

    def opinie(self) -> None:
        """Rząd opinii: każda karta po kolei dosunięta do widoku, zrzut całej sekcji."""
        self.load()
        karty = self.page.locator('[data-qa="opinie-rzad"] > li')
        for k in range(karty.count()):
            karty.nth(k).scroll_into_view_if_needed()
            self.capture(f"51-opinia-{k + 1}", "#opinie")

    def menu(self) -> None:
        """Menu telefonu (tylko 390): otwarta lista pod przyciskiem."""
        if not self.mobile or int(self.vp) < 380:
            return
        self.load()
        przycisk = self.page.locator('[data-qa="menu"]')
        if not przycisk.is_visible():
            return
        przycisk.click()
        self.page.locator('[data-qa="menu-lista"]').wait_for(state="visible")
        self.capture("60-menu-otwarte", "header", full_page=True)

    # __NOWE_KROKI__


def write_overview(out: Path, shots: list[Shot]) -> None:
    by_name: dict[str, dict[str, Shot]] = {}
    for s in shots:
        by_name.setdefault(s.name, {})[s.vp] = s
    rows = []
    for name, vps in by_name.items():
        cells = []
        for vp in VIEWPORTS:
            s = vps.get(vp)
            if not s:
                cells.append("<td></td>")
                continue
            img = s.marked_file or s.file
            errs = [i for i in s.issues if i["level"] == "blad"]
            warns = [i for i in s.issues if i["level"] != "blad"]
            li = "".join(f"<li class='{i['level']}'><b>{i['check']}</b> {html.escape(i['el'])}: {html.escape(i['msg'])}"
                         f"{' („' + html.escape(i['text'][:40]) + '”)' if i['text'] else ''}</li>" for i in (errs + warns)[:25])
            more = f"<li>… i {len(errs + warns) - 25} więcej w wyniki.json</li>" if len(errs + warns) > 25 else ""
            cells.append(f"<td><a href='{img}'><img src='{img}' loading='lazy' class='w{vp}'></a>"
                         f"<p>{vp} px: <b>{len(errs)}</b> błędów, {len(warns)} ostrzeżeń</p><ul>{li}{more}</ul></td>")
        rows.append(f"<tr><th>{html.escape(name)}</th>{''.join(cells)}</tr>")
    doc = ("<!doctype html><meta charset='utf-8'><title>QA zrzuty</title><style>"
           "body{font:14px system-ui;margin:16px}td,th{vertical-align:top;border-top:1px solid #ccc;padding:8px}"
           "img.w390{width:300px}img.w1440{width:640px}img{border:1px solid #ddd}ul{padding-left:18px;max-width:640px}"
           "li.blad{color:#b00000}li.ostrzezenie{color:#8a5a00}</style>"
           "<h1>Przegląd zrzutów: 390 i 1440 px</h1><p>Czerwone ramki na zrzucie = elementy z błędem.</p>"
           f"<table>{''.join(rows)}</table>")
    (out / "przeglad.html").write_text(doc, encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--serve", type=Path, help="katalog public/ do podania lokalnie (z nagłówkiem CSP)")
    ap.add_argument("--base", help="adres bazowy, gdy serwer już działa")
    ap.add_argument("--page", default="/")
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--vp", nargs="*", default=["390", "1440", "360"])
    ap.add_argument("--only", nargs="*", default=["overview", "departments", "plan", "form", "os", "opinie", "menu", "wyniki"])
    ap.add_argument("--naglowki-plik", type=Path,
                    help="JSON z nagłówkami HTTP dla przeglądarki (np. dostęp do podglądu); zawartość nigdy nie trafia do wyjścia ani plików wyników")
    ap.add_argument("--z-ruchem", action="store_true", help="bez prefers-reduced-motion (domyślnie reduce, żeby zrzuty były stabilne)")
    a = ap.parse_args()
    if not (a.serve or a.base):
        ap.error("podaj --serve albo --base")
    base = serve(a.serve.expanduser()) if a.serve else a.base.rstrip("/")
    url = base + a.page
    # Zrzuty powstają poza repozytorium: serwer dev Next obserwuje projekt i każdy zapisany PNG wywołałby
    # odświeżenie strony w trakcie testu (fałszywe błędy konsoli). Gotowy komplet kopiujemy do --out na końcu.
    staging = Path(tempfile.mkdtemp(prefix="qa-mobile-"))
    t0 = time.time()
    shots: list[Shot] = []
    console: list[dict] = []
    naglowki = json.loads(a.naglowki_plik.expanduser().read_text(encoding="utf-8")) if a.naglowki_plik else None
    with sync_playwright() as pw:
        br = pw.chromium.launch()
        for vp in a.vp:
            ctx = br.new_context(viewport=VIEWPORTS[vp], device_scale_factor=2 if vp == "390" else 1,
                                 is_mobile=int(vp) < 600, has_touch=int(vp) < 600,
                                 reduced_motion="no-preference" if a.z_ruchem else "reduce", locale="pl-PL",
                                 extra_http_headers=naglowki)
            # Decyzja o cookies zapisana z góry: baner zgody nie zasłania sekcji w zrzutach (jak w testach cta/formularz).
            ctx.add_init_script(ZGODA_JS)
            page = ctx.new_page()
            page.on("console", lambda m, vp=vp: console.append({"vp": vp, "type": m.type, "text": m.text, "url": m.location.get("url", "")}) if m.type == "error" else None)
            page.on("pageerror", lambda e, vp=vp: console.append({"vp": vp, "type": "pageerror", "text": str(e)}))
            r = Runner(page, vp, staging, url)
            for step in a.only:
                getattr(r, step)()
            shots += r.shots
            ctx.close()
        br.close()

    write_overview(staging, shots)
    data = {"url": url, "czas_s": round(time.time() - t0, 1), "konsola": console,
            "stany": [s.__dict__ for s in shots]}
    (staging / "wyniki.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")

    shutil.rmtree(a.out, ignore_errors=True)
    shutil.copytree(staging, a.out)
    shutil.rmtree(staging, ignore_errors=True)

    # Podsumowanie: unikalne problemy (check + element + viewport), żeby ten sam błąd w 10 stanach liczył się raz.
    uniq: dict[tuple, dict] = {}
    for s in shots:
        for i in s.issues:
            k = (s.vp, i["check"], i["el"], i["msg"].split(" o ")[0] if i["check"] != "kontrast" else i["msg"])
            uniq.setdefault(k, {**i, "vp": s.vp, "stany": []})["stany"].append(s.name)
    errs = [u for u in uniq.values() if u["level"] == "blad"]
    warns = [u for u in uniq.values() if u["level"] != "blad"]
    print(f"Stany: {len(shots)} zrzutów ({', '.join(a.vp)} px) w {data['czas_s']} s. URL: {url}")
    print(f"Unikalne błędy: {len(errs)}, ostrzeżenia: {len(warns)}, błędy konsoli: {len(console)}")
    counts: dict[str, int] = {}
    for u in errs:
        counts[f"{u['vp']}:{u['check']}"] = counts.get(f"{u['vp']}:{u['check']}", 0) + 1
    print("Błędy wg testu: " + ", ".join(f"{k}={v}" for k, v in sorted(counts.items())))
    for u in sorted(errs, key=lambda u: (u["vp"], u["check"]))[:60]:
        print(f"  [{u['vp']}] {u['check']}: {u['el']}: {u['msg']}" + (f" („{u['text'][:35]}”)" if u["text"] else "")
              + f"  stany: {', '.join(u['stany'][:3])}{'…' if len(u['stany']) > 3 else ''}")
    for c in console[:10]:
        print(f"  [{c['vp']}] konsola {c['type']}: {c['text'][:160]} {c.get('url', '')}")
    print(f"Przegląd do oczu: {a.out / 'przeglad.html'}")
    return 1 if errs or console else 0


if __name__ == "__main__":
    sys.exit(main())
