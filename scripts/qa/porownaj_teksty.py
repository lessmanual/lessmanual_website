#!/usr/bin/env python3
"""Porównanie tekstów strony z plikiem tekstów v4 (docs/superpowers/specs/2026-11-12-strona-v4-teksty.md).

Po co: test jednostkowy w src/content/home-v4.test.ts pilnuje, że teksty z pliku tekstów są w module treści.
Ten skrypt zamyka drugą połowę: że te same teksty naprawdę trafiają do HTML-a strony (a nie tylko do
modułu, którego żaden komponent nie wyrenderował). Czyta stronę po SSR (JavaScript wyłączony), więc ukryte
działy i karty karuzeli są w HTML i się liczą.

Reguła wyciągania tekstów jest ta sama co `wyciagnijTeksty` w src/content/home-v4.test.ts: wszystko po
„Miejsce:” do pierwszego terminatora (Miejsce, Notatka:, Kolejność, #, ---), bez sekcji „## 12.” i dalej;
punkty „- ” i „Podpis: ” bez prefiksu. Normalizacja jak w teście: zdjęte cudzysłowy „ ” “, jedna spacja.

Wyłączone jawną listą WYLACZONE: teksty renderowane dopiero po interakcji (nie ma ich w HTML-u po SSR).

Użycie:
  python3 scripts/qa/porownaj_teksty.py --base http://127.0.0.1:3010 [--naglowki-plik naglowki.json]
Kod wyjścia 1, gdy brakuje choć jednego tekstu (albo skrypt nie wyciągnął żadnego).
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parents[2]
PLIK_TEKSTOW = REPO / "docs/superpowers/specs/2026-11-12-strona-v4-teksty.md"
TERMINATORY = ("Miejsce", "Notatka:", "Kolejność", "#", "---")
MINIMUM_TEKSTOW = 250  # strażnik jak w teście: pusty wynik przepuściłby każdy brak

# Teksty, których nie ma w HTML-u po SSR, bo komponent pokazuje je dopiero po interakcji.
# Klucz: fragment opisu „Miejsce:”; wartość: powód.
WYLACZONE = {
    "dymek Bzyka po wyborze": "dymek w hero po kliknięciu klawisza działu (stan klienta)",
    "dymek Bzyka po zmianie działu": "dymek w działach po zmianie zakładki (stan klienta)",
    "dymek Bzyka przy pierwszym wejściu do działów": "dymek pokazywany po pierwszym wejściu w widok działów",
    "pytanie 6 → nowa odpowiedź": "odpowiedź P6 jest w formularzu, który po SSR pokazuje tylko ekran startu",
    "ekran wyniku po tej odpowiedzi": "ekran wyniku renderuje się po wysłaniu formularza",
    "trzecia osoba (zamiennik)": "wariant opisu w 3. osobie nie jest użyty (na stronie jest wariant w 1. osobie)",
}


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"[„”“]", "", s)).strip()


def wyciagnij_teksty(deck: str) -> list[tuple[str, str]]:
    """Zwraca pary (opis miejsca, tekst) według reguły z wyciagnijTeksty w home-v4.test.ts."""
    linie = deck.split("\n")
    koniec = next((i for i, l in enumerate(linie) if l.startswith("## 12.")), len(linie))
    wynik: list[tuple[str, str]] = []
    zbiera = False
    miejsce = ""
    for linia in linie[:koniec]:
        if linia.startswith("Miejsce: "):
            zbiera, miejsce = True, linia[len("Miejsce: "):]
            continue
        if linia.startswith(TERMINATORY):
            zbiera = False
            continue
        if not zbiera or linia.strip() == "":
            continue
        if linia.startswith("- "):
            wynik.append((miejsce, linia[2:].strip()))
        elif linia.startswith("Podpis: "):
            wynik.append((miejsce, linia[8:].strip()))
        else:
            wynik.append((miejsce, linia.strip()))
    return wynik


def powod_wylaczenia(miejsce: str) -> str | None:
    for fragment, powod in WYLACZONE.items():
        if fragment in miejsce:
            return powod
    return None


# textContent nie wstawia odstępu między elementami blokowymi, a plik tekstów ma tam spację (np. oryginał
# rekomendacji i „Tłumaczenie:” w osobnych elementach). Dlatego drugi odczyt: węzły tekstowe złączone spacją.
POBIERZ_JS = r"""() => {
  const wezly = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) wezly.push(w.currentNode.textContent);
  const aria = [...document.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label") || "");
  return { tekst: document.body.textContent || "", wezly: wezly.join(" "), aria };
}"""

# Teksty, które na stronie są atrybutem aria-label (czytnik ekranu), a nie widocznym tekstem.
W_ARIA_LABEL = ("etykieta dostępności karty",)


class Strona:
    def __init__(self, tekst: str, wezly: str, aria: list[str]) -> None:
        self.tekst, self.wezly, self.aria = norm(tekst), norm(wezly), {norm(x) for x in aria}

    def zawiera(self, t: str) -> bool:
        return norm(t) in self.tekst or norm(t) in self.wezly

    def zawiera_podpis_z_gwiazdkami(self, t: str) -> bool:
        """Podpis „Imię · opinia w Google · ★★★★★”: na stronie to figcaption z imieniem, gwiazdkami jako ikony
        (aria-label „Ocena 5 z 5”) i źródłem, bez znaków „·” i ★. Sprawdzamy każdy segment osobno."""
        for segment in (s.strip() for s in t.split(" · ")):
            gwiazdki = re.fullmatch(r"★+", segment)
            if gwiazdki:
                if f"Ocena {len(segment)} z 5" not in self.aria:
                    return False
            elif not self.zawiera(segment):
                return False
        return True


def tekst_strony_po_ssr(base: str, naglowki: dict[str, str] | None) -> Strona:
    with sync_playwright() as pw:
        br = pw.chromium.launch()
        ctx = br.new_context(java_script_enabled=False, locale="pl-PL", extra_http_headers=naglowki)
        page = ctx.new_page()
        odpowiedz = page.goto(base.rstrip("/") + "/", wait_until="load")
        if odpowiedz is None or odpowiedz.status != 200:
            raise RuntimeError(f"strona zwróciła {odpowiedz.status if odpowiedz else 'brak odpowiedzi'}")
        dane = page.evaluate(POBIERZ_JS)
        br.close()
    return Strona(dane["tekst"], dane["wezly"], dane["aria"])


def jest_na_stronie(strona: Strona, miejsce: str, t: str) -> bool:
    if any(f in miejsce for f in W_ARIA_LABEL):
        return norm(t) in strona.aria
    if "★" in t:
        return strona.zawiera(t) or strona.zawiera_podpis_z_gwiazdkami(t)
    return strona.zawiera(t)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--base", required=True, help="adres bazowy działającego serwera, np. http://127.0.0.1:3010")
    ap.add_argument("--naglowki-plik", type=Path,
                    help="JSON z nagłówkami HTTP dla przeglądarki; zawartość nigdy nie trafia do wyjścia")
    a = ap.parse_args()
    naglowki = json.loads(a.naglowki_plik.expanduser().read_text(encoding="utf-8")) if a.naglowki_plik else None

    teksty = wyciagnij_teksty(PLIK_TEKSTOW.read_text(encoding="utf-8"))
    if len(teksty) <= MINIMUM_TEKSTOW:
        print(f"BŁĄD: z pliku tekstów wyciągnięto tylko {len(teksty)} tekstów (minimum {MINIMUM_TEKSTOW})")
        return 1
    strona = tekst_strony_po_ssr(a.base, naglowki)

    wylaczone = [(m, t, p) for m, t in teksty if (p := powod_wylaczenia(m)) is not None]
    sprawdzane = [(m, t) for m, t in teksty if powod_wylaczenia(m) is None]
    brakujace = [(m, t) for m, t in sprawdzane if not jest_na_stronie(strona, m, t)]

    print(f"Teksty w pliku: {len(teksty)}, sprawdzone w HTML-u strony: {len(sprawdzane)}, "
          f"wyłączone (tylko po interakcji): {len(wylaczone)}")
    for powod in sorted({p for _, _, p in wylaczone}):
        print(f"  wyłączone: {sum(1 for _, _, p in wylaczone if p == powod)} x {powod}")
    print(f"Brakujące na stronie: {len(brakujace)}")
    for m, t in brakujace:
        print(f"  [{m[:70]}] „{t[:90]}”")
    return 1 if brakujace else 0


if __name__ == "__main__":
    sys.exit(main())
