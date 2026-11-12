# QA strony przed oddaniem

Właściciel: CTO. Dwa skrypty uruchamiane na działającym serwerze (dev na 3010 albo podgląd z Vercela).
Zero zapisów do CRM: w kroku `wyniki` żądanie `/api/formularz` jest podstawione przez `page.route`.

## Serwer

```bash
(npm run dev -- --webpack --hostname 127.0.0.1 --port 3010 > /tmp/next-dev-3010.log 2>&1 &)
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3010/   # czekaj na 200
```

## Zrzuty i testy układu

```bash
python3 scripts/qa/qa_mobile.py --base http://127.0.0.1:3010 --page / --out scripts/qa/wyniki --vp 390 1440 360
```

- Kroki (`--only`, domyślnie wszystkie): `overview`, `departments`, `plan`, `form`, `os`, `opinie`, `menu` (tylko 390), `wyniki`.
- Wynik: `scripts/qa/wyniki/<vp>/*.png`, `wyniki.json`, `przeglad.html` (zrzuty obok siebie, czerwone ramki przy błędach). Katalog jest w `.gitignore`.
- Kod wyjścia 1 przy choć jednym błędzie układu albo błędzie konsoli.
- 360 px: liczą się tylko `scroll-bok` i `poza-ekran`; pozostałe testy są dla 390 i 1440.
- `--naglowki-plik <json>`: nagłówki HTTP dla przeglądarki (np. dostęp do podglądu). Zawartość nigdy nie trafia do wyjścia, `wyniki.json` ani `przeglad.html`.
- Zrzuty powstają w katalogu tymczasowym i dopiero na końcu trafiają do `--out`. Powód: serwer dev Next obserwuje projekt, a PNG zapisany w repo w trakcie testu odświeża stronę i daje fałszywe błędy konsoli.
- Domyślnie `prefers-reduced-motion: reduce` (stabilne zrzuty); `--z-ruchem` włącza ruch.

## Porównanie tekstów

```bash
python3 scripts/qa/porownaj_teksty.py --base http://127.0.0.1:3010
```

Każdy tekst z pliku `docs/superpowers/specs/2026-11-12-strona-v4-teksty.md` (reguła jak `wyciagnijTeksty` w `src/content/home-v4.test.ts`) musi być w HTML-u strony po SSR. Teksty renderowane dopiero po interakcji są na jawnej liście `WYLACZONE` w skrypcie, z powodem. Kod wyjścia 1 przy braku choć jednego tekstu.
