# Sprzeczności /faq i /systemy z tekstami strony v4

Audyt tylko do odczytu (spec 9.8). Pliki `/faq`, `/systemy`, `FAQ` w `site.ts` i `systemy.ts` nie zostały zmienione. Źródło prawdy: `src/content/home-v4.ts` (wspolpraca, faq, droga wejścia) oraz `src/content/formularz.ts` (czas rozmowy). Stan z 12.11.2026.

Ceny, gwarancja i opieka są zgodne: kilkanaście tysięcy zł netto, Mapa AI firmy 6 900 zł netto odliczana w całości, płatność 35/35/30, poprawa na nasz koszt, nowy zakres to nowy etap, koszty narzędzi po stronie klienta. Poniżej tylko rozbieżności.

## Do poprawy (twarda sprzeczność)

### 1. Czas pierwszej rozmowy: 45 minut dla każdej drogi

- Ścieżka: `src/content/systemy.ts`, `SYSTEM_PAGE_LABELS.startNote` (renderowane na każdej podstronie `/systemy/[slug]`).
- Cytat: „Pierwszy krok to 45 minut rozmowy z Bartkiem. Przed nią 10 pytań, około 2 minut.”
- V4 (`formularz.ts`): „Rozmowa o Mapie AI firmy, 30 minut” i „Rozmowa o pilocie, 30 minut”; 45 minut dotyczy tylko drogi A („Rozmowa z Bartkiem, 45 minut”).
- Sprzeczność: strona systemu obiecuje jeden czas dla wszystkich, a v4 zależy on od wybranej drogi (45 albo 30 minut).
- Ta sama fraza: `src/content/site.ts`, `ctaNote` (linia ok. 84) i `yours` w kroku „Rozmowa i spisany zakres” („Rozmowa (45 minut)”, ok. 131). Te teksty nie są już na stronie głównej, ale zasilają inne strony, jeśli są używane.

### 2. „Dane i system są Twoje” kontra system na naszej infrastrukturze

- Ścieżka: `src/content/site.ts`, `FAQ.items[4]`, pokazywane na `/faq` (`src/app/faq/page.tsx`).
- Cytat: „Dane i system są Twoje. Dostajesz pełną dokumentację i wszystkie dostępy, a do tego eksport danych. System możesz przekazać własnemu informatykowi.”
- V4 (`faq`, id `koniec-wspolpracy`, i karta „Dane i kod”): „System działa na naszej infrastrukturze i to my się nim opiekujemy. Jeśli zakończysz opiekę, przekazujemy Ci całość: kod, dane, dostępy i dokumentację techniczną.”
- Sprzeczność: /faq mówi o własności systemu i oddaniu go od razu, v4 mówi o przekazaniu całości dopiero po zakończeniu opieki, a do tego czasu system stoi u nas. Brak w /faq warunku „jeśli zakończysz opiekę” i słowa „kod”.

## Do decyzji (różnica sformułowań, nie liczb)

### 3. Rozmowa dla Mapy: „2-3 krótsze, po około 30 minut”

- Ścieżka: `src/content/site.ts`, `PATHS` droga B, pole `how` (ok. 299).
- Cytat: „Dłuższa rozmowa z Tobą i 2-3 krótsze, po około 30 minut, z osobami, które znają procesy na co dzień.”
- V4: „Rozmowa o Mapie AI firmy, 30 minut” (formularz), a w tekście dróg tylko „w 5 dni roboczych od ostatniej rozmowy”.
- Różnica: v4 podaje jedną rozmowę 30 minut, stary tekst opisuje dłuższą rozmowę plus 2-3 krótsze. Termin 5 dni roboczych jest zgodny.

### 4. Pilot bez kosztu w /faq

- Ścieżka: `src/content/site.ts`, `FAQ.items[5]` i `[10]` (/faq): „Szybki pilot trwa dwa tygodnie.”, „Pilot sprawdza jeden system na próbce Twoich spraw.”
- V4 (`wspolpraca.ceny`): „Szybki pilot: koszt podajemy na rozmowie i odliczamy go od wdrożenia tego systemu.”
- Różnica: czas (dwa tygodnie) zgodny, ale /faq nie ma zdania o koszcie i odliczeniu pilota od wdrożenia, które v4 podaje wprost. Nie jest to sprzeczność, ale czytelnik /faq nie dowie się, że pilot kosztuje.

### 5. Inna lista i brzmienie pytań (7 w v4, 11 na /faq)

- Ścieżka: `src/content/site.ts`, `FAQ.items`, `/faq`.
- Przykład: v4 „Czy cena będzie rosła przy każdym kolejnym systemie?” i „Skąd mam wiedzieć, że to zadziała u mnie?” nie mają odpowiedników; /faq ma „Co z moimi danymi i RODO?” i „Czym różni się Mapa AI firmy od szybkiego pilota?”, których nie ma w v4.
- Różnica: dwie strony odpowiadają inaczej na to samo pytanie o koniec współpracy i obietnicę („Czego ta obietnica nie obejmuje?” i v4 „Czego nie obejmuje obietnica efektu?”). Zakres obietnicy jest zgodny merytorycznie (nowy zakres, brak danych i dostępów, koszty narzędzi), ale v4 dodaje „zmierzony tak, jak go zapisaliśmy”.

### 6. Formularz „prowadzi Bzyk” w /faq i na stronach systemów

- Ścieżka: `src/content/site.ts`, `FINAL_CTA.body` (ok. 430): „Formularz ma 10 pytań i zajmuje około 2 minut. Prowadzi przez niego Bzyk.”
- V4 (`cta`, `formularz.linia`): „10 pytań, około 2 minut. Potem wybierasz termin rozmowy z Bartkiem…”; pływający przewodnik Bzyk zniknął ze strony głównej w Zadaniu 16.
- Różnica: opis formularza zgodny co do liczby pytań i czasu, ale wzmianka o Bzyku nie ma pokrycia na stronie głównej.

## Bez sprzeczności (sprawdzone)

- Kilkanaście tysięcy zł netto, Mapa 6 900 zł netto, odliczenie od pierwszego wdrożenia: `systemy.ts` (`PRICE_FAQ`), `FAQ.items[0]`, v4 zgodne.
- Gwarancja i „poprawiamy na nasz koszt”: `FAQ.items[2]`, v4 zgodne.
- Spotkanie raz w tygodniu w budowie, raz na kwartał po odbiorze: `FAQ.items[7]`, v4 zgodne.
- Mapa w 5 dni roboczych, pilot dwa tygodnie: zgodne.
- Liczby klientów na podstronach systemów (62 tematy w tygodniu 19-26.10.2026, 2 906 kliknięć) zgodne z kartami v4.
