# Strona główna lessmanual.ai, wersja 4: projekt do budowy (12.11.2026)

Wewnętrzne. Marka LessManual. Odbiorca: CTO i builder. Akceptacja treści i decyzji: Bartek, 12.11.2026 („1. ok 2. ok 3. tak”, polecenie „dajcie gotowość CTO do budowania”).

## 1. Po co ta strona

Strona ma sprzedawać rozmowy z Bartkiem. Czytelnik to właściciel firmy od 10 do 100 osób, który wszystkiego pilnuje sam. Ma po kolei: poczuć, gdzie w jego firmie ucieka czas, zobaczyć systemy, które już zbudowaliśmy w jego dziale, zrozumieć, jak wygląda współpraca na lata i że ciężar techniczny jest po naszej stronie, a potem kliknąć „Umów rozmowę”.

Kierunek wizualny wybrał Bartek po szkicach S1-S4: baza S4 w motywie jasnym (rozmowa z Bzykiem w hero, przejście z obiektem systemu, rzut firmy), więcej patyny, telefon najpierw.

## 2. Cele, czego nie robimy, czego nie wolno

Cele:
- Każdy dział pokazuje 4 karty: zrobiony system (Problem, Rozwiązanie, Efekt i film), przykład działania, opinię z obszaru, pomysły „Możliwe u Ciebie”.
- Zmiana działu w miejscu, bez wracania na górę przez animację.
- Sekcja Współpraca jako serce strony: oś kroków z torami „My” i „Ty”, kolejne systemy pod jedną opieką, ceny z cennika, gwarancja, dane i kod.
- Telefon (390 px) projektujemy pierwszy, komputer (1440 px) drugi.

Czego nie robimy w tej rundzie:
- Podstron systemów (`/systemy/*`) nie przebudowujemy; zostają, jak są.
- Filmów nie produkujemy; robi je CMO osobno. Strona ma sloty na filmy i działa bez nich.
- Logo Google, Microsoft, Azure, AWS, odznak partnerskich i widżetów Google nie dodajemy.

Czego nie wolno (porażka nawet przy działającym kodzie):
- Liczba, data, plakietka albo opinia, której nie ma w tekstach v4.
- Kwota inna niż Mapa AI 6 900 zł netto.
- Nazwa klienta Arka albo leada, nazwa narzędzia wewnętrznego.
- Przewijanie strony w bok, ucięty tekst albo kontrast poniżej AA na 390 px.
- Gest palcem, który zmienia dział (palec zmienia tylko karty).
- Biblioteka z CDN (CSP produkcji: `script-src 'self'`, `font-src 'self'`).

## 3. Źródła, które są częścią projektu

- Teksty 1:1, z miejscem i limitem znaków: `docs/superpowers/specs/2026-11-12-strona-v4-teksty.md` (kopia z AI-OS `materialy/ceo/kontekst-2026-11-10/TEKSTY_STRONY_V4_2026-11-12.md`). Wiersze „Notatka:” nie trafiają na stronę. Tekst na stronie zmieniamy tylko w tym pliku i dopiero potem w kodzie.
- Decyzje 1-13 i odpowiedzi Bartka: AI-OS `materialy/ceo/kontekst-2026-11-10/BURZA_MOZGOW_2_STRONA_2026-11-12.md`, sekcje „Synteza CEO” i „Odpowiedzi Bartka”.
- Wygląd sekcji: AI-OS `materialy/ceo/kontekst-2026-11-10/burza2/CMO.md` (kolejność 2A, moduł działu 2B, wygląd C1-C5), `burza2/CSO.md` (Współpraca 2A, wygląd na 390 i 1440), `burza2/CTO.md` (Technologia 2A, wykonalność 2B, QA 2C).
- Szkic do przeniesienia: `public/szkice/s4/` (hero z klawiszami działów, przejście z obiektem, rzut firmy jako CSS 3D, demo dokumentu, formularz). Bez bibliotek, cały ruch na własnej pętli i zmiennych CSS.
- Formularz i ścieżki A/B/C: AI-OS `materialy/cso/strona-2026-11-10/FORMULARZ.md`.

## 4. Jak to budujemy (decyzja CTO)

Budujemy od razu w Next.js na gałęzi `strona-v3-2026-11`, jako nową stronę główną `/`. Bez rundy statycznego szkicu S5. Powód: kierunek i teksty są zamknięte, a formularz, zapis do CRM, kalendarz, zgoda na cookies, GA4, strony prawne, przekierowania i SEO już działają w komponentach Next. Szkic trzeba by i tak przepisać. Podgląd dla Bartka: alias gałęzi na Vercel, po zielonej bramce QA.

- Zostają i dostają poprawki: `SiteHeader` (nawigacja), `SiteFooter` (nowe kolumny), `FormSection` i `LeadForm` (nowa odpowiedź w P6), `Bzyk`, `trackEvent` z `src/lib/analytics.ts`, baner zgody.
- Wypadają ze strony głównej (kod zostaje do sprzątania po publikacji): `Paths`, `Pricing`, `ScopeCard`, `ProcessLine`, `Testimonials`, `Systems`, `ForWhom`, `Guarantee` z `Sections.tsx`, o ile ich treść przeszła do nowych sekcji.
- Treść strony w jednym typowanym module (np. `src/content/home-v4.ts`) z tekstów v4. Komponenty nie mają wpisanego tekstu.
- `/szkice` i `/warianty` usuwamy dopiero przed publikacją na produkcję.

## 5. Kolejność i zachowanie sekcji

Nawigacja: Działy · Współpraca · Opinie · Pytania · Blog · przycisk „Umów rozmowę”. Na 390 px logo, przycisk i „Menu” (44 px), które otwiera pięć pozycji. Blog prowadzi do istniejącego `/blog`.

1. **Hero.** Nadtytuł, H1, podtytuł, pytanie Bzyka, 5 klawiszy działów (390: 2×2 plus piąty na całą szerokość; 1440: jeden rząd), przycisk „Pokaż”. Wybór pojedynczy: pusty stan to obrys koła, wybrany to koło w jasnej patynie z ciemnym ptaszkiem i obwódka karty 2 px, `aria-pressed`. Pod klawiszami dymek Bzyka (tekst przed wyborem i po wyborze, z nazwą działu). Przycisk „Umów rozmowę z Bartkiem”, linia „Rozmowa jest bez opłat…”. Cytat Marcina w białej ramce opinii: ciemny tekst, bez kursywy, Instrument Serif 22 px na 390 i 26 px na 1440, cudzysłów w morskim. Pasek liczb bez zmian. Slot na rolkę Bartka 9:16 (390: miniatura 64 px; 1440: po prawej).
2. **Przejście z obiektem.** Zdanie zapalane słowo po słowie i obiekt systemu z S4. Obrót przy przewijaniu tylko przy pierwszym przejściu w tym widoku strony; potem zwykły pas. Na 390 płasko, bez przyklejania. Bez `localStorage`.
3. **Działy.** H2, lead, rzut firmy (1440: ok. 420 px wysokości, pokoje klikalne; 390: miniatura 120 px jako mapka), zakładki działów (`role="tablist"`, na 390 pasek przewijany w bok ze snapem, każda zakładka min. 44 px), pod nimi karuzela 4 kart.
   - Karuzela: natywny `scroll-snap-type: x mandatory`, strzałki 44 px przewijają o kartę, kropki postępu (aktywna w jasnej patynie), karty `role="group"` z etykietą „2 z 4”, niewidoczne z `inert`, bez autoprzewijania. Na 390 karta ma 88% szerokości, widać brzeg następnej; na 1440 karta ok. 920 px.
   - Zmiana działu (zakładka, pokój, klawisz w hero) podmienia karty w 150 ms bez przewijania strony i wraca na kartę 1. Klawisz w hero po pierwszym przejściu przewija od razu do zakładek. Przybliżenie pokoju na rzucie tylko przy pierwszym wyborze.
   - Karta 1: tytuł, plakietka, film nad tekstem (390) albo obok (1440), trzy wiersze Problem / Rozwiązanie / Efekt (etykiety w morskim, tekst 17 px w kolorze atramentu). Efekt może mieć jedną liczbę w miedzi (Instrument Serif 56 px na 390). Karta czyta się w całości bez filmu. Film: 16 px marginesu od krawędzi karty z obu stron, `preload="none"`, poster, start kliknięciem.
   - Karta 2: przykład z zakładkami (np. PZ / Faktura / Zlecenie), plakietka per zakładka i plakietka wspólna „…w przykładzie są wymyślone”. W Logistyce na 390 krótkie etykiety zakładek. Demo dokumentu przenosimy z S4.
   - Karta 3: opinia w wyglądzie swojego źródła: Google (inicjał, imię, 5 gwiazdek, „opinia w Google”, link „Zobacz w Google” do wizytówki, bez logo G), referencja (papier, podpis), LinkedIn (oryginał i tłumaczenie, link). Nigdy list ani LinkedIn w wyglądzie Google.
   - Karta 4: „Co możemy zbudować u Ciebie”, plakietka „Możliwe u Ciebie”, 5 pomysłów, linia pod listą, dymek Bzyka.
   - Na każdej karcie „Tak, to u nas”: zaznacza odpowiedzi działu w pytaniu 4 formularza (`bol`, mapowanie w tekstach v4, sekcja 4.0) i przewija do formularza.
   - Dymek Bzyka przy pierwszym wejściu w sekcję mówi o strzałkach; przy zmianie działu tekst działu.
4. **Współpraca.** H2, lead, oś kroków 0-5 z torami „My” (gruby, miedź) i „Ty” (cienki, ikona zegara, sam czas). 390: oś pionowa przy lewej krawędzi, każdy krok jako karta na pełną szerokość. 1440: oś pozioma, sześć kolumn, krok 0 jako wachlarz A/B/C zbiegający się do kroku 1, łuk z kroku 5 do kroku 2 z napisem. Kafle A/B/C prowadzą do formularza z zaznaczoną odpowiedzią w P6. Półka „System 1-3” zapala się patyną „pod opieką” od kroku 4, klamra „Jedna opłata za opiekę, do trzech systemów”. Pod osią dowód (dwa zdania), potem karty Ceny, Gwarancja (link do pytania 7 w FAQ), Dane i kod. Slot na film o współpracy. Węzły zapalają się przy wejściu w ekran; przy ograniczonym ruchu świecą od razu.
5. **Bezpieczeństwo i technologia.** H2 „Serwery i modele AI w Unii Europejskiej” (na „Twoje dane zostają w Unii Europejskiej” zmieniamy w treści dopiero po potwierdzeniu przez CTO wszystkich dostawców nowych systemów w UE), dwa akapity, zdanie o modelach w strefie danych UE, cztery wiersze z ikoną. 1440: dwie kolumny. Bez logo, nazwy dostawców tylko tekstem.
6. **Opinie.** Przed formularzem. H2, tabliczka „5,0 w Google · 6 opinii”, jeden rząd kart w kolejności z tekstów v4 (390: przewijany w bok ze snapem, wewnątrz własnego kontenera; 1440: trzy widoczne kolumny i strzałki).
7. **Formularz z Bartkiem i kalendarzem.** Zdjęcie, imię, rola, opis w pierwszej osobie, formularz 10 pytań bez zmian poza P6: nowa odpowiedź „Próbowaliśmy, ale nie wyszło” po „Już coś wdrożyliśmy i chcemy iść dalej”, prowadzi do ścieżki C, kalendarz 30 minut, znacznik w CRM `wczesniejsza_proba_nieudana`, osobny ekran wyniku z tekstów v4.
8. **FAQ.** Akordeon, 7 pytań z tekstów v4, kotwica do pytania 7, na końcu „Wróć do formularza”. Schemat FAQPage z tych samych pytań.
9. **Wezwanie końcowe** i pasek przyklejony na telefonie (pojawia się po hero, znika przy formularzu, uwzględnia `safe-area-inset-bottom`).
10. **Stopka** z kolumnami z tekstów v4 i zdaniem o znakach towarowych.

## 6. Wygląd

- Baza jasna `#F4EFE8`, atrament `#1A1410`, miedź na liczbach, odtwarzaczach i tabliczkach. Fonty Inter i Instrument Serif lokalnie (jak dziś).
- Patyna znaczy „wybrane” albo „działa i jest pod opieką”. Jasna `#3FD0C2` tylko jako wypełnienie z ciemnym znakiem (ptaszek, aktywna zakładka, aktywna kropka, systemy pod opieką, główny przycisk w pasku). Morska `#00756F` jako tekst (plakietki, etykiety Problem / Rozwiązanie / Efekt, linki, cudzysłów). Jasna patyna nigdy jako tekst na jasnym tle (kontrast 1,67:1).
- Tekst wyrównany do lewej, minimum 16 px na telefonie, bez wypunktowań z pogrubieniem, bez pigułek z długim tekstem, jedna liczba na kartę.
- Wysokości kart zarezerwowane (CLS 0). Ruch wyłączany przez `prefers-reduced-motion`.

## 7. Pomiar

Przez istniejące `trackEvent` (działa po zgodzie na cookies):

| Zdarzenie | Parametry | Kiedy |
|---|---|---|
| `room_open` | `dzial`, `z` (hero, zakladka, rzut) | zmiana działu |
| `karta_view` | `dzial`, `karta` (film, przyklad, opinia, pomysly), `nr`, `sposob` (strzalka, palec, klawiatura) | karta widoczna w 60% przez 1 s, raz na widok strony |
| `review_click` | `dzial` | klik w link do opinii |

Istniejące zdarzenia formularza i filmów zostają. Wymiary niestandardowe w GA4 ustawia Bartek przy publikacji.

## 8. Bramka jakości przed oddaniem Bartkowi

1. `npm run lint`, `npm test` (w tym `public-prose.test.ts`), `npm run build` zielone.
2. `materialy/cto/strona-2026-11-12-szkice/qa/qa_mobile.py` (AI-OS) przestawiony na nową stronę i przechodzący każdy stan na 390 i 1440: cała strona, każdy dział, każda karta, każda zakładka przykładu, każdy krok osi, karty Opinii, każdy krok formularza, każdy ekran wyniku, otwarte menu. Zero błędów w klasach `poza-ekran`, `scroll-bok`, `pigulka-duza`, `tekst-uciety`, `kontrast`.
3. Przegląd `przeglad.html` oczami przez CTO, potem fresh QA (`qa-reviewer`).
4. Lighthouse mobile: LCP ≤ 2,5 s, CLS ≤ 0,1.
5. Sprawdzenie na aliasie gałęzi (ten sam adres, który dostaje Bartek), z nagłówkiem obejścia ochrony Vercel z pliku tymczasowego.
6. Porównanie tekstu na stronie z tekstami v4 skryptem (każdy tekst z „Miejsce:” obecny 1:1).

## 9. Rozstrzygnięcia po sprawdzeniu projektu przez CTO (decyzje CTO, 12.11)

1. **Dział w formularzu.** „Tak, to u nas” zaznacza odpowiedzi w P4 `bol` jak `syncPains` w S4 (Marketing przez „Inne” z wpisanym tekstem). Pytań i `WERSJA_FORMULARZA` nie zmieniamy z tego powodu. Wersję podbija tylko nowa odpowiedź w P6 (`proba_nieudana`, droga C), razem z parsowaniem na serwerze, zapisem znacznika w CRM i mailem; testy formularza aktualizujemy.
2. **Dane przykładów (karta 2).** Dane z S4 są zatwierdzone jako „wymyślone” pod plakietką wspólną. Brakujące zestawy (Telefony: umówienie wizyty; Marketing: stary wpis do odświeżenia) builder dopisuje w tym samym formacie: wymyślone imiona i firmy, bez nazw prawdziwych klientów, bez kwot sugerujących cennik. Zakładka „Ogłoszenie o pracę” w Sprzedaży zostaje (potwierdzona w przeglądzie). Kolejność zakładek jak w tekstach v4. Fresh QA sprawdza te dane osobno.
3. **Sekcja 6.** Budujemy z H2 „Serwery i modele AI w Unii Europejskiej”. Zdanie o alarmach w akapicie 2 jest w kodzie, ale publikacja na produkcji czeka na podpięcie odbiorców alarmów (lista przed wejściem do `main`).
4. **Filmy.** Pola w `home-v4.ts`: `film: { src, poster, napisy } | null`. Pliki w `public/media/` (MP4 H.264, wersja 16:9 dla kart i 9:16 dla rolki, napisy wypalone w obrazie plus opcjonalny plik VTT). `null` daje poster CSS z tytułem karty, bez przycisku odtwarzania. CMO podmienia plik i pole, bez zmian w kodzie.
5. **Linki.** „Zobacz w Google” i „Wizytówka w Google” idą do `LINKS.googleProfile` z `site.ts` (profil, nie formularz opinii). „Zobacz na LinkedIn” do `linkedinRecommendations`, LinkedIn w stopce do `linkedinBartek`. `rel="noopener"` i nowe okno.
6. **Stan działu.** Bez wyboru aktywny jest dział 1 (Telefony). Wybór w hero, pokój rzutu albo kotwica `#dzial-<id>` (stopka, menu) ustawia zakładkę. Wszystkie 5 × 4 kart są w HTML po SSR (indeksowanie, CLS 0), nieaktywne działy ukryte atrybutem `hidden`.
7. **QA.** Builder kopiuje `qa_mobile.py` do repo jako `scripts/qa/qa_mobile.py` i dopasowuje stany i selektory. Komponenty mają atrybuty `data-qa` (dział, karta, strzałka, zakładka przykładu, krok osi, krok formularza). Właściciel skryptu: CTO, w tym repo.
8. **`/faq`, `site.ts` FAQ, `/systemy/*`.** Poza zakresem tej rundy. Strona główna ma własny schemat FAQPage z 7 pytań v4. Builder wypisuje każde zdanie z `/faq` i `/systemy/*`, które przeczy cenom, gwarancji albo czasom z tekstów v4; synchronizacja to osobne zadanie po akceptacji listy.

## 10. Zostawione builderowi

Podział na komponenty i pliki, nazwy klas, sposób przeniesienia rzutu i obiektu z S4 do React, testy jednostkowe stanu modułu działu (wybór działu, karta, „Tak, to u nas”), ikony z istniejącego `Icons.tsx` albo `lucide-react`.

## 11. Otwarte po stronie Bartka i CMO (nie blokują budowy, blokują publikację)

- Zgoda Bartosza na referencję na stronie publicznej (zgoda z 27.10 dotyczyła pakietu dla leada).

- Filmy działów, rolka do hero i film o współpracy (CMO). Do tego czasu poster z tytułem i bez przycisku odtwarzania.
- Zgoda autorów opinii na logo Google (opcjonalnie).
- Odczyt profilu Google w dniu publikacji (liczba opinii, daty).
- Zdanie o alarmach w sekcji Bezpieczeństwo idzie na produkcję dopiero po podpięciu odbiorców alarmów (CTO, karta K4).
- Przełączenie trzech obecnych systemów na modele w strefie UE (CTO, osobne zadanie).
