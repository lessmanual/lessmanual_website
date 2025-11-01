# Polityka Cookies LessManual

**Data ostatniej aktualizacji: 30.10.2025**
**Wersja: 1.0**

---

## 1. WPROWADZENIE

### 1.1 Czym są Cookies

**Pliki cookies** (ciasteczka) to małe pliki tekstowe zapisywane na Pani/Pana urządzeniu (komputer, tablet, smartfon) przez przeglądarkę internetową podczas przeglądania strony **LessManual** oraz powiązanych domen.

Cookies umożliwiają:
- Rozpoznanie urządzenia przy kolejnych wizytach
- Zapamiętanie preferencji użytkownika (język, dark mode, zalogowanie)
- Zbieranie danych analitycznych (ruch na stronie, źródła wejścia)
- Personalizację treści i reklam

### 1.2 Podstawa Prawna

Używanie cookies podlega przepisom:
- **Dyrektywy ePrivacy** (2002/58/WE zmieniona 2009/136/WE)
- **Polskiego Prawa telekomunikacyjnego** (art. 173 Ustawy z dnia 16 lipca 2004 r.)
- **RODO** (UE 2016/679) - w zakresie przetwarzania danych osobowych z cookies

**Zasada ogólna:** Przed zapisaniem cookies (poza niezbędnymi) wymagana jest **dobrowolna, świadoma i wyraźna zgoda** użytkownika. Zgoda musi być równie łatwa do wycofania, jak do udzielenia.

### 1.3 Administrator

Administratorem cookies i danych osobowych przetwarzanych za ich pomocą jest:

**Bartłomiej Chudzik / LessManual**
Adres: ul. Długa 33, 05-530 Cendrowice, Polska
Email: kontakt@LessManual
Szczegółowe informacje: [Polityka Prywatności](./polityka_prywatnosci.md)

---

## 2. KATEGORIE COOKIES

Cookies używane na stronie LessManual dzielimy na **4 kategorie** według celu i podstawy prawnej:

### 2.1 COOKIES NIEZBĘDNE (Strictly Necessary Cookies)

**Cel:** Umożliwienie podstawowego funkcjonowania strony internetowej. Bez tych cookies strona nie może działać poprawnie.

**Podstawa prawna:** Prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO) + wyjątek z art. 173 ust. 3 Prawa telekomunikacyjnego (nie wymagają zgody).

**Charakterystyka:**
- **NIE wymagają zgody** użytkownika
- Zapisywane automatycznie przy pierwszej wizycie
- Nie można ich wyłączyć przez Cookie Banner (można wyłączyć tylko w ustawieniach przeglądarki, co spowoduje problemy z działaniem strony)

**Lista cookies niezbędnych:**

| Nazwa cookie | Ważność | Cel | Dostawca |
|--------------|---------|-----|----------|
| **sb-[project]-auth-token** | 7 dni (sesja) | Zarządzanie sesją użytkownika (logowanie do dashboard klienta przez Supabase) | Supabase / LessManual |
| **XSRF-TOKEN** | 2 godziny | Ochrona przed atakami CSRF (Cross-Site Request Forgery) na formularze | Vercel / LessManual |
| **CookieConsent** | 12 miesięcy | Zapamiętanie wyborów użytkownika w Cookie Banner (uniknięcie powtarzania się bannera) | LessManual |

**Bezpieczeństwo:**
- Cookies niezbędne **NIE zawierają danych osobowych** (poza tokenem sesji zaszyfrowanym)
- Przesyłane wyłącznie przez HTTPS (szyfrowanie TLS 1.3)
- Flaga `HttpOnly` (niedostępne dla JavaScript, ochrona przed XSS)
- Flaga `SameSite=Lax` lub `Strict` (ochrona przed CSRF)

---

### 2.2 COOKIES FUNKCJONALNE (Functional Cookies)

**Cel:** Zapamiętanie preferencji użytkownika w celu poprawy doświadczenia przeglądania (user experience).

**Podstawa prawna:** **Zgoda** użytkownika (art. 6 ust. 1 lit. a RODO + art. 173 Prawa telekomunikacyjnego).

**Charakterystyka:**
- **WYMAGAJĄ zgody** użytkownika przed zapisaniem
- Można je wyłączyć w Cookie Banner lub w ustawieniach cookies
- Nie są konieczne do działania strony, ale znacząco poprawiają UX

**Lista cookies funkcjonalnych:**

| Nazwa cookie | Ważność | Cel | Dostawca |
|--------------|---------|-----|----------|
| **theme** | 12 miesięcy | Zapamiętanie preferencji Dark Mode / Light Mode | LessManual |
| **language** | 12 miesięcy | Zapamiętanie wybranego języka (PL/EN) | LessManual |
| **chat_minimized** | 7 dni | Stan ChatBota (zminimalizowany/rozwinięty) na stronie | LessManual |
| **demo_viewed** | 30 dni | Informacja, że użytkownik obejrzał demo produktu (uniknięcie powtarzania pop-upu z zaproszeniem) | LessManual |

**Dane osobowe:** Cookies funkcjonalne **NIE identyfikują osoby bezpośrednio** (nie zawierają imienia, emaila), ale mogą być uznane za dane osobowe w połączeniu z innymi danymi (np. IP + preferencje = profil użytkownika).

**Wycofanie zgody:** W każdej chwili możesz wyłączyć cookies funkcjonalne w [Ustawieniach cookies](#jak-zarzadzac-cookies) (link w stopce strony) lub w przeglądarce. Skutek: utrata preferencji (powrót do domyślnych ustawień przy każdej wizycie).

---

### 2.3 COOKIES ANALITYCZNE (Analytical/Performance Cookies)

**Cel:** Zbieranie danych o zachowaniu użytkowników na stronie w celu analizy ruchu, optymalizacji UX i poprawy wydajności.

**Podstawa prawna:** **Zgoda** użytkownika (art. 6 ust. 1 lit. a RODO)

**Narzędzie:** Google Analytics + Google Tag Manager (przekazywanie danych do USA, wymaga zgody użytkownika)

**Charakterystyka:**
- **WYMAGA zgody** użytkownika przed rozpoczęciem śledzenia
- Zbierają dane zagregowane (liczba wizyt, najpopularniejsze podstrony, czas na stronie, źródła ruchu)
- **NIE identyfikują bezpośrednio osoby** (Google Analytics: anonimizacja IP włączona)

**Cookies Google Analytics:**

| Nazwa cookie | Ważność | Cel | Dostawca |
|--------------|---------|-----|----------|
| **_ga** | 25 miesięcy | Identyfikator unikalnego użytkownika (anonymous ID) | Google LLC (USA) |
| **_ga_[container-id]** | 25 miesięcy | Przechowywanie stanu sesji (liczba wizyt, timestamp pierwszej/ostatniej wizyty) | Google LLC (USA) |
| **_gid** | 24 godziny | Rozróżnienie użytkowników (krótkoterminowe) | Google LLC (USA) |
| **_gat** | 1 minuta | Ograniczenie szybkości zapytań (throttle requests do GA serwera) | Google LLC (USA) |

**Google Tag Manager:**
- Zarządza tagami analitycznymi i marketingowymi bez cookies (sam GTM nie zapisuje cookies, ale zarządza skryptami które mogą to robić)

**Przekazywanie danych poza EOG:** Tak (USA - Google LLC). Zabezpieczenia: Standardowe Klauzule Umowne (SCC), anonimizacja IP (`anonymizeIp: true`), opt-out dostępny ([Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout)).

**Wycofanie zgody:** [Ustawienia cookies](#jak-zarzadzac-cookies) na stronie lub [Google Analytics Opt-out Add-on](https://tools.google.com/dlpage/gaoptout).

---

### 2.4 COOKIES MARKETINGOWE (Marketing/Advertising Cookies)

**Cel:** Śledzenie aktywności użytkownika w celu wyświetlania spersonalizowanych reklam (retargeting), mierzenia skuteczności kampanii, targetowania odbiorców.

**Podstawa prawna:** **Zgoda** użytkownika (art. 6 ust. 1 lit. a RODO + art. 173 Prawa telekomunikacyjnego). Wymóg najwyższy stopień świadomości użytkownika (profiling, third-party tracking).

**Charakterystyka:**
- **WYMAGAJĄ wyraźnej zgody** użytkownika
- Mogą być ustawiane przez podmioty trzecie (np. Facebook Pixel, LinkedIn Insight Tag, Google Ads)
- Umożliwiają śledzenie między stronami (cross-site tracking)
- **Największe ryzyko prywatności** - możliwość tworzenia szczegółowego profilu użytkownika

**Lista cookies marketingowych (jeśli zostaną wdrożone):**

| Nazwa cookie | Ważność | Cel | Dostawca |
|--------------|---------|-----|----------|
| **_fbp** | 90 dni | Facebook Pixel - śledzenie konwersji z reklam na Facebooku/Instagramie | Meta Platforms Inc. (USA) |
| **fr** | 90 dni | Facebook retargeting (wyświetlanie spersonalizowanych reklam użytkownikom, którzy odwiedzili stronę) | Meta Platforms Inc. (USA) |
| **li_sugr** | 90 dni | LinkedIn Insight Tag - śledzenie konwersji z LinkedIn Ads | LinkedIn Corporation (USA) |
| **bcookie** | 24 miesiące | LinkedIn identyfikator przeglądarki (browser ID) | LinkedIn Corporation (USA) |
| **_gcl_au** | 90 dni | Google Ads - przechowywanie i śledzenie konwersji z Google Ads | Google LLC (USA) |
| **IDE** | 13 miesięcy | Google DoubleClick - retargeting, frequency capping (ograniczenie liczby wyświetleń reklamy tej samej osobie) | Google LLC (USA) |

**Przekazywanie danych poza EOG:** Tak (USA - Meta, Google, LinkedIn). Zabezpieczenia: Standardowe Klauzule Umowne (SCC), mechanizmy opt-out dostawców.

**Status wdrożenia:** [Do określenia - obecnie NIE używamy cookies marketingowych]. Marketing prowadzony organicznie (LinkedIn organic posts, cold email). Jeśli w przyszłości uruchomimy płatne kampanie (Facebook Ads, Google Ads, LinkedIn Ads), dodamy odpowiednie cookies z **obowiązkiem uzyskania zgody** przed pierwszym wyświetleniem.

**Wycofanie zgody:** [Ustawienia cookies](#jak-zarzadzac-cookies) + opt-out u dostawców:
- Facebook: [Ustawienia reklam](https://www.facebook.com/ads/preferences/)
- Google: [Ustawienia reklam](https://adssettings.google.com/)
- LinkedIn: [Ustawienia reklam](https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out)

---

## 3. ZGODA NA COOKIES - COOKIE BANNER

### 3.1 Mechanizm Zgody

Przy **pierwszej wizycie** na stronie LessManual wyświetlany jest **Cookie Banner** (komunikat o cookies) zgodny z wytycznymi UODO i EDPB:

**Wygląd bannera (przykład):**
```
╔══════════════════════════════════════════════════════════╗
║  🍪 Ta strona używa cookies                              ║
║                                                          ║
║  Używamy cookies niezbędnych do działania strony oraz   ║
║  opcjonalnych cookies (funkcjonalne, analityczne,       ║
║  marketingowe) w celu poprawy UX i analizy ruchu.       ║
║                                                          ║
║  Możesz zaakceptować wszystkie lub dostosować           ║
║  ustawienia. Więcej w Polityce Cookies.                 ║
║                                                          ║
║  [Akceptuję wszystkie]  [Ustawienia cookies]  [Odrzuć] ║
║                                    [Polityka Cookies]    ║
╚══════════════════════════════════════════════════════════╝
```

**Przyciski:**
- **"Akceptuję wszystkie"** - zielony, akceptacja wszystkich kategorii cookies (niezbędne + funkcjonalne + analityczne + marketingowe)
- **"Ustawienia cookies"** - niebieski, otwiera szczegółowe ustawienia (wybór kategorii)
- **"Odrzuć"** lub **"Tylko niezbędne"** - szary, zgoda tylko na cookies niezbędne (funkcjonalne/analityczne/marketingowe OFF)
- **"Polityka Cookies"** - link do tego dokumentu

**WAŻNE:** Zgodnie z UODO/EDPB:
- ❌ **Pre-checked checkboxy są ZABRONIONE** (użytkownik musi aktywnie zaznaczyć zgodę)
- ❌ **Cookie Wall jest ZABRONIONY** (nie możemy blokować dostępu do strony za brak zgody - poza cookies niezbędnymi)
- ✅ **"Odrzuć" musi być równie widoczny** jak "Akceptuję" (nie ukrywamy opcji odmowy)
- ✅ **Kontynuacja przeglądania ≠ zgoda** (scroll, click na stronę NIE oznacza automatycznej zgody - wymóg aktywnej akcji)

### 3.2 Szczegółowe Ustawienia Cookies

Po kliknięciu **"Ustawienia cookies"** użytkownik widzi panel z 4 przełącznikami (toggles):

```
╔══════════════════════════════════════════════════════════╗
║  Ustawienia Cookies                                      ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  ☑ NIEZBĘDNE (wymagane - nie można wyłączyć)            ║
║     Umożliwiają podstawowe funkcjonowanie strony         ║
║     (sesja, zabezpieczenia). Szczegóły ↓                 ║
║                                                          ║
║  ☐ FUNKCJONALNE (opcjonalne)                            ║
║     Zapamiętanie preferencji (dark mode, język).         ║
║     Szczegóły ↓                                          ║
║                                                          ║
║  ☐ ANALITYCZNE (opcjonalne)                             ║
║     Analiza ruchu (Google Analytics + Google Tag Manager).   ║
║     Szczegóły ↓                                          ║
║                                                          ║
║  ☐ MARKETINGOWE (opcjonalne)                            ║
║     Spersonalizowane reklamy, retargeting.               ║
║     Szczegóły ↓                                          ║
║                                                          ║
║  [Zapisz ustawienia]  [Akceptuję wszystkie]  [Anuluj]   ║
╚══════════════════════════════════════════════════════════╝
```

**"Szczegóły ↓"** - rozwijana lista konkretnych cookies (tabela z nazwą, ważnością, celem, dostawcą - jak w sekcji 2).

**Zapisanie ustawień:** Wybór użytkownika przechowywany w cookie **CookieConsent** (12 miesięcy) - przy kolejnych wizytach banner się nie pojawia (chyba że użytkownik usunie cookies lub zmieni przeglądarkę/urządzenie).

---

## 4. JAK ZARZĄDZAĆ COOKIES

### 4.1 Zmiana Ustawień na Stronie

**W każdej chwili** możesz zmienić swoje preferencje dotyczące cookies:

**Krok 1:** Kliknij link **"Ustawienia cookies"** w stopce strony (footer) na każdej podstronie LessManual.

**Krok 2:** Wybierz kategorie cookies (zaznacz/odznacz checkboxy).

**Krok 3:** Kliknij **"Zapisz ustawienia"**.

**Skutek:** Cookies z wyłączonych kategorii zostaną usunięte z Twojego urządzenia (JavaScript wykona `document.cookie = "name=; expires=Thu, 01 Jan 1970"`). Nowe cookies z tych kategorii nie będą zapisywane.

**Link bezpośredni:** [LessManual/ustawienia-cookies] (do wdrożenia po uruchomieniu strony).

---

### 4.2 Zarządzanie Cookies w Przeglądarce

Możesz również zarządzać cookies bezpośrednio w przeglądarce:

#### **Google Chrome (Windows, macOS, Linux):**
1. Otwórz Chrome → Ustawienia (Settings) → Prywatność i bezpieczeństwo (Privacy and security) → Pliki cookie i inne dane witryn (Cookies and other site data)
2. Wybierz:
   - **"Blokuj pliki cookie innych firm"** (Block third-party cookies) - wyłącza cookies marketingowe
   - **"Blokuj wszystkie pliki cookie"** (Block all cookies) - wyłącza wszystkie cookies (strona może nie działać poprawnie)
   - **"Wyczyść dane podczas zamykania przeglądarki"** (Clear cookies when you close your browser)
3. Aby usunąć istniejące cookies: **Zobacz wszystkie dane witryn** (See all site data) → Wyszukaj "LessManual" → Usuń.

**Link:** [chrome://settings/cookies](chrome://settings/cookies)

---

#### **Mozilla Firefox (Windows, macOS, Linux):**
1. Otwórz Firefox → Ustawienia (Options) → Prywatność i bezpieczeństwo (Privacy & Security) → Ciasteczka i dane stron (Cookies and Site Data)
2. Wybierz:
   - **"Ścisła"** (Strict) - blokuje cookies śledzące z third-party
   - **"Niestandardowa"** (Custom) - pozwala wybrać kategorie do blokowania
3. Aby usunąć cookies: **Zarządzaj danymi** (Manage Data) → Wyszukaj "LessManual" → Usuń.

**Link:** [about:preferences#privacy](about:preferences#privacy)

---

#### **Safari (macOS, iOS):**
1. **macOS:** Safari → Preferencje (Preferences) → Prywatność (Privacy) → Zarządzaj danymi stron (Manage Website Data) → Usuń "LessManual"
2. **iOS:** Ustawienia (Settings) → Safari → Zaawansowane (Advanced) → Dane stron (Website Data) → Usuń wszystkie dane

**Blokowanie:** Zaznacz **"Blokuj wszystkie ciasteczka"** (Block all cookies) - uwaga, strony mogą przestać działać.

---

#### **Microsoft Edge (Windows, macOS):**
1. Otwórz Edge → Ustawienia (Settings) → Pliki cookie i uprawnienia witryny (Cookies and site permissions) → Pliki cookie i dane witryny (Cookies and site data)
2. Wybierz: **"Blokuj pliki cookie innych firm"** (Block third-party cookies)
3. Aby usunąć: **Zobacz wszystkie pliki cookie i dane witryny** (See all cookies and site data) → Wyszukaj "LessManual" → Usuń.

**Link:** [edge://settings/content/cookies](edge://settings/content/cookies)

---

#### **Opera (Windows, macOS, Linux):**
1. Otwórz Opera → Ustawienia (Settings) → Zaawansowane (Advanced) → Prywatność i bezpieczeństwo (Privacy & security) → Pliki cookie i inne dane witryn (Cookies and other site data)
2. Konfiguracja identyczna jak Chrome (Opera oparta na Chromium).

---

### 4.3 Przeglądanie Prywatne (Incognito/Private Mode)

Wszystkie przeglądarki oferują **tryb prywatny** (Incognito w Chrome, Private Browsing w Safari/Firefox):
- **Cookies tymczasowe:** Zapisywane tylko na czas sesji, usuwane po zamknięciu okna
- **Brak historii:** Odwiedzone strony nie są zapisywane w historii
- **Uwaga:** NIE zapewnia anonimowości wobec strony (IP, user agent nadal widoczne), nie blokuje cookies niezbędnych

**Uruchomienie:**
- Chrome/Edge: `Ctrl+Shift+N` (Windows) / `Cmd+Shift+N` (macOS)
- Firefox: `Ctrl+Shift+P` (Windows) / `Cmd+Shift+P` (macOS)
- Safari: `Cmd+Shift+N` (macOS)

---

### 4.4 Wtyczki Blokujące Cookies

Możesz zainstalować rozszerzenia przeglądarki blokujące cookies i trackers:

| Wtyczka | Opis | Link |
|---------|------|------|
| **uBlock Origin** | Blokada reklam, trackerów, cookies third-party (open-source, privacy-focused) | [Chrome](https://chrome.google.com/webstore) / [Firefox](https://addons.mozilla.org) |
| **Privacy Badger** | Inteligentna blokada trackerów (uczenie się na podstawie zachowania stron) | [EFF Privacy Badger](https://privacybadger.org/) |
| **Ghostery** | Wizualizacja trackerów, blokada cookies, anti-tracking | [Ghostery](https://www.ghostery.com/) |
| **Cookie AutoDelete** | Automatyczne usuwanie cookies po zamknięciu karty/przeglądarki | [Firefox](https://addons.mozilla.org) / [Chrome](https://chrome.google.com/webstore) |

**Uwaga:** Blokowanie wszystkich cookies może powodować problemy z działaniem strony (brak logowania, utrata preferencji).

---

### 4.5 Opt-Out z Cookies Third-Party (Dostawcy Zewnętrzni)

Jeśli używamy cookies marketingowych, możesz zrezygnować (opt-out) bezpośrednio u dostawców:

| Dostawca | Opt-Out Link | Co robi |
|----------|--------------|---------|
| **Google Ads** | [https://adssettings.google.com/](https://adssettings.google.com/) | Wyłącza personalizację reklam Google na podstawie Twojej aktywności |
| **Facebook Ads** | [https://www.facebook.com/ads/preferences/](https://www.facebook.com/ads/preferences/) | Wyłącza retargeting Facebook/Instagram |
| **LinkedIn Ads** | [https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out](https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out) | Wyłącza retargeting LinkedIn |
| **Google Analytics** | [https://tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout) | Instaluje wtyczkę blokującą śledzenie GA (wszystkie strony używające GA) |
| **Network Advertising Initiative (NAI)** | [https://optout.networkadvertising.org/](https://optout.networkadvertising.org/) | Opt-out z cookies reklamowych wielu dostawców jednocześnie |

---

## 5. CZAS PRZECHOWYWANIA COOKIES

Cookies różnią się **czasem życia** (lifetime) - od kilku minut do kilku lat:

### 5.1 Cookies Sesyjne (Session Cookies)

**Czas życia:** Do zamknięcia przeglądarki (usuwane automatycznie po zakończeniu sesji).

**Przykłady:**
- Token sesji (logowanie do dashboard klienta) - jeśli użytkownik nie zaznaczy "Zapamiętaj mnie"
- Tymczasowe dane formularzy (aby nie utracić danych przy przypadkowym odświeżeniu strony)

**Uwaga:** Niektóre przeglądarki (np. Chrome z włączoną funkcją "Continue where you left off") mogą przywrócić cookies sesyjne po ponownym uruchomieniu.

---

### 5.2 Cookies Trwałe (Persistent Cookies)

**Czas życia:** Określony czas (od 1 dnia do 25 miesięcy, w zależności od celu).

**Przykłady i czasy przechowywania:**

| Cookie | Kategoria | Czas życia | Uzasadnienie |
|--------|-----------|------------|--------------|
| **CookieConsent** | Niezbędne | 12 miesięcy | Zapamiętanie zgody użytkownika (uniknięcie spam bannera) |
| **sb-auth-token** | Niezbędne | 7 dni | Token uwierzytelniania (wymóg ponownego logowania po tygodniu dla bezpieczeństwa) |
| **theme** | Funkcjonalne | 12 miesięcy | Preferencja dark/light mode (rozsądny czas dla długoterminowego UX) |
| **language** | Funkcjonalne | 12 miesięcy | Wybór języka (PL/EN) |
| **_ga** | Analityczne | 25 miesięcy | Google Analytics - maksymalny czas zgodny z wytycznymi RODO (2 lata + 1 miesiąc na możliwe opóźnienia) |
| **_fbp** | Marketingowe | 90 dni | Facebook Pixel - standard branżowy dla retargeting (90 dni = 1 kwartał) |

**Zasada minimalizacji:** Administrator stosuje **najkrótszy możliwy czas przechowywania** adekwatny do celu (zgodnie z zasadą minimalizacji danych RODO art. 5 ust. 1 lit. c).

**Po wygaśnięciu:** Cookie jest automatycznie usuwany przez przeglądarkę. Administrator nie ma dostępu do wygasłych cookies.

---

## 6. COOKIES THIRD-PARTY (Podmiotów Trzecich)

### 6.1 Czym są Cookies Third-Party

**First-party cookies** - ustawiane przez domenę, którą aktualnie odwiedzasz (np. LessManual).
**Third-party cookies** - ustawiane przez zewnętrzne domeny (np. google.com, facebook.com) osadzone na stronie (iframes, embedded scripts, tracking pixels).

**Ryzyko:** Third-party cookies umożliwiają **cross-site tracking** (śledzenie aktywności użytkownika na wielu stronach) - największe zagrożenie dla prywatności.

### 6.2 Jakie Third-Party Cookies Używamy

| Dostawca | Cookies | Cel | Status |
|----------|---------|-----|--------|
| **Google Analytics + GTM** | _ga, _gid, _gat | Analityka ruchu i zachowań użytkowników | [Do wdrożenia] |
| **Facebook Pixel** | _fbp, fr | Retargeting Facebook/Instagram | [NIE używamy - możliwe w przyszłości] |
| **LinkedIn Insight Tag** | li_sugr, bcookie | Retargeting LinkedIn | [NIE używamy - możliwe w przyszłości] |
| **Google Ads** | _gcl_au, IDE | Remarketing Google | [NIE używamy - możliwe w przyszłości] |

**Aktualny stan:** Używamy Google Analytics + Google Tag Manager do analizy ruchu (wymaga zgody użytkownika zgodnie z RODO).

### 6.3 Ochrona przed Third-Party Tracking

**Działania Administratora:**
- ✅ Hosting w UE gdzie możliwe (Supabase w UE, Vercel w EU regions)
- ✅ Wymuszamy zgodę przed cookies third-party (cookie banner)
- ✅ Anonimizacja IP w Google Analytics (GA4 z `anonymizeIp: true`)
- ✅ Umowy powierzenia z wszystkimi third-party zgodne z RODO (art. 28)

**Działania użytkownika:**
- Wyłącz third-party cookies w przeglądarce (patrz [sekcja 4.2](#42-zarzadzanie-cookies-w-przegladarce))
- Używaj rozszerzeń blokujących trackery (uBlock Origin, Privacy Badger)
- Opt-out u dostawców (Google, Facebook - patrz [sekcja 4.5](#45-opt-out-z-cookies-third-party-dostawcy-zewnetrzni))

---

## 7. BEZPIECZEŃSTWO COOKIES

### 7.1 Środki Ochrony

Administrator stosuje następujące zabezpieczenia cookies:

**A. Szyfrowanie:**
- ✅ **HTTPS obligatoryjne** - wszystkie cookies przesyłane przez szyfrowane połączenie TLS 1.3
- ✅ **Flaga Secure** - cookies ustawiane tylko przez HTTPS (nie HTTP), ochrona przed man-in-the-middle

**B. Ochrona przed XSS (Cross-Site Scripting):**
- ✅ **Flaga HttpOnly** - cookies niezbędne (token sesji, CSRF) niedostępne dla JavaScript (`document.cookie`), ochrona przed wykradzeniem przez malicious scripts

**C. Ochrona przed CSRF (Cross-Site Request Forgery):**
- ✅ **Flaga SameSite=Lax/Strict** - cookies nie są wysyłane w requestach cross-origin (ochrona przed atakami CSRF)
- ✅ **XSRF-TOKEN** - dodatkowy token w formularzu (double submit cookie pattern)

**D. Kontrola dostępu:**
- ✅ **Path i Domain ograniczenia** - cookies dostępne tylko dla ścieżek/domen, które je utworzyły (np. cookie z LessManual nie jest dostępny dla subdomen third-party)

**E. Rotacja i wygasanie:**
- ✅ **Automatyczne wygasanie** - cookies mają ustawiony czas życia (nie są przechowywane wiecznie)
- ✅ **Czyszczenie po wylogowaniu** - sesja użytkownika usuwana z serwera i klienta po logout

---

### 7.2 Zagrożenia i Mitygacja

**Zagrożenie: Cookie Theft (wykradzenie cookies):**
- **Ryzyko:** Atakujący uzyskuje dostęp do cookies sesyjnych (np. przez XSS, packet sniffing na niezabezpieczonym WiFi) → może podszyć się pod użytkownika.
- **Mitygacja:** HttpOnly + Secure + HTTPS + krótki czas życia sesji (7 dni max) + MFA dla kont administracyjnych.

**Zagrożenie: Session Fixation (narzucenie sesji):**
- **Ryzyko:** Atakujący narzuca ofierze znany ID sesji, a następnie używa go po zalogowaniu ofiary.
- **Mitygacja:** Regeneracja ID sesji po każdym logowaniu (Supabase robi to automatycznie).

**Zagrożenie: Cross-Site Tracking (śledzenie między stronami):**
- **Ryzyko:** Third-party cookies umożliwiają profilowanie użytkownika na wielu stronach (naruszenie prywatności).
- **Mitygacja:** Minimalizacja third-party cookies, zgoda wymagana, opt-out dostępny.

---

## 8. PRAWA UŻYTKOWNIKA

Zgodnie z RODO, przysługują Pani/Panu następujące prawa w zakresie danych przetwarzanych za pomocą cookies:

### 8.1 Prawo Dostępu (art. 15 RODO)

Ma Pani/Pan prawo uzyskać informację, jakie cookies są ustawione na Pani/Pana urządzeniu oraz jakie dane osobowe są przetwarzane za ich pomocą.

**Jak sprawdzić cookies na urządzeniu:**
- Chrome: `chrome://settings/cookies` → "Zobacz wszystkie dane witryn" → Wyszukaj "LessManual"
- Firefox: `about:preferences#privacy` → "Zarządzaj danymi" → Wyszukaj "LessManual"
- Safari (macOS): Preferencje → Prywatność → Zarządzaj danymi stron

**Jak uzyskać informacje od Administratora:**
Email na kontakt@LessManual z tytułem "RODO - Dostęp do danych z cookies" → otrzymasz listę cookies ustawionych przez LessManual wraz z celem przetwarzania.

---

### 8.2 Prawo do Usunięcia (art. 17 RODO)

Ma Pani/Pan prawo żądać usunięcia danych przetwarzanych za pomocą cookies.

**Jak usunąć cookies:**
- **Natychmiast:** Usuń cookies w przeglądarce (patrz [sekcja 4.2](#42-zarzadzanie-cookies-w-przegladarce)) lub kliknij "Ustawienia cookies" na stronie → Wyłącz wszystkie kategorie
- **Przez Administratora:** Email na kontakt@LessManual z tytułem "RODO - Usunięcie cookies" → usuniemy dane po stronie serwera (jeśli przechowujemy, np. w bazie danych dla zalogowanych użytkowników)

**Uwaga:** Usunięcie cookies niezbędnych spowoduje problemy z działaniem strony (brak sesji, utrata zabezpieczeń CSRF).

---

### 8.3 Prawo do Sprzeciwu (art. 21 RODO)

Ma Pani/Pan prawo w dowolnym momencie wnieść sprzeciw wobec przetwarzania danych za pomocą cookies opartych na **prawnie uzasadnionym interesie** (np. analityka, jeśli nie wymaga zgody).

**Jak wnieść sprzeciw:**
- Wyłącz cookies analityczne w "Ustawieniach cookies" na stronie
- Email na kontakt@LessManual z tytułem "RODO - Sprzeciw wobec cookies"

**Skutek:** Zaprzestaniemy przetwarzania danych za pomocą cookies analitycznych (Google Analytics/Google Analytics) dla Pani/Pana urządzenia.

---

### 8.4 Prawo do Wycofania Zgody (art. 7 ust. 3 RODO)

Jeśli przetwarzanie opiera się na zgodzie (cookies funkcjonalne, analityczne, marketingowe), ma Pani/Pan prawo **w dowolnym momencie wycofać zgodę**.

**Jak wycofać zgodę:**
- Kliknij "Ustawienia cookies" w stopce strony → Odznacz kategorie → Zapisz
- Usuń cookies w przeglądarce (wycofanie implied consent)

**Skutek:** Cookies z wyłączonych kategorii zostaną usunięte, nowe nie będą zapisywane.

**Brak wpływu na przeszłość:** Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania przed jej wycofaniem (dane zebrane wcześniej pozostają legalnie przetworzone).

---

### 8.5 Prawo do Skargi (art. 77 RODO)

Jeśli uważa Pani/Pan, że przetwarzanie danych za pomocą cookies narusza RODO, ma Pani/Pan prawo wnieść skargę do:

**Prezes Urzędu Ochrony Danych Osobowych (UODO)**
Adres: ul. Stawki 2, 00-193 Warszawa, Polska
Telefon: +48 22 531 03 00
Email: kancelaria@uodo.gov.pl
Formularz: [https://uodo.gov.pl/pl/p/skargi-i-wnioski](https://uodo.gov.pl/pl/p/skargi-i-wnioski)

**Przed skargą do UODO:** Zachęcamy do bezpośredniego kontaktu z Administratorem (kontakt@LessManual) - rozpatrzymy sprawę w ciągu 14 dni roboczych.

---

## 9. ZMIANY POLITYKI COOKIES

### 9.1 Aktualizacje

Administrator zastrzega sobie prawo do zmiany niniejszej Polityki Cookies w przypadku:
- Wprowadzenia nowych technologii śledzących (nowe cookies)
- Zmiany dostawców third-party (np. migracja z Google Analytics na Google Analytics)
- Zmiany przepisów prawa (ePrivacy Regulation, AI Act)
- Wydania wytycznych przez UODO/EDPB

### 9.2 Informowanie o Zmianach

O **istotnych zmianach** (nowe kategorie cookies, nowi dostawcy third-party) użytkownicy zostaną poinformowani:
- **Ponowne wyświetlenie Cookie Bannera** - wymóg ponownej zgody
- **Email do zarejestrowanych użytkowników** (jeśli mamy bazę klientów)
- **Komunikat na stronie głównej** - przez 30 dni od aktualizacji

**Drobne zmiany** (aktualizacja czasu życia cookie, dodanie informacji technicznych) - bez ponownej zgody, z aktualizacją daty w dokumencie.

### 9.3 Archiwizacja Wersji

**Aktualna wersja:** 1.0 (30.10.2025)
**Poprzednie wersje:** Brak (dokument nowy)

Wszystkie poprzednie wersje Polityki Cookies są archiwizowane i dostępne na żądanie (email na kontakt@LessManual).

---

## 10. POSTANOWIENIA KOŃCOWE

### 10.1 Prawo Właściwe

Niniejsza Polityka Cookies podlega przepisom prawa polskiego:
- Ustawa Prawo telekomunikacyjne z dnia 16 lipca 2004 r. (art. 173 - zgoda na cookies)
- Rozporządzenie RODO (UE 2016/679) - w zakresie danych osobowych z cookies
- Dyrektywa ePrivacy (2002/58/WE zmieniona 2009/136/WE)

**Wytyczne stosowane:** UODO, EDPB (European Data Protection Board), ICO (UK - dla dobrych praktyk consent).

### 10.2 Definicje

- **Cookies (ciasteczka)** - małe pliki tekstowe zapisywane na urządzeniu użytkownika przez przeglądarkę
- **First-party cookies** - ustawiane przez domenę, którą aktualnie odwiedzasz (LessManual)
- **Third-party cookies** - ustawiane przez zewnętrzne domeny osadzone na stronie
- **Sesyjne cookies** - usuwane po zamknięciu przeglądarki
- **Trwałe cookies** - przechowywane przez określony czas (dni/miesiące/lata)
- **HttpOnly** - flaga zabezpieczająca cookie przed dostępem z JavaScript
- **Secure** - flaga wymuszająca przesyłanie cookie tylko przez HTTPS
- **SameSite** - flaga kontrolująca wysyłanie cookies w requestach cross-origin (ochrona CSRF)

### 10.3 Zgodność z Regulacjami

Niniejsza Polityka Cookies jest zgodna z:
- ✅ **RODO** (art. 6, 7, 13, 21 - podstawa prawna, zgoda, informowanie, sprzeciw)
- ✅ **Prawo telekomunikacyjne** (art. 173 - zgoda na cookies)
- ✅ **Dyrektywa ePrivacy** (art. 5 ust. 3 - consent requirement)
- ✅ **Wytyczne UODO** (komunikaty z lat 2020-2025 dot. cookie bannerów)
- ✅ **Guidelines EDPB 5/2020** (consent under GDPR)
- ✅ **WCAG 2.1 AA** (dostępność cookie bannera dla osób z niepełnosprawnościami)

---

## 11. KONTAKT

Jeśli ma Pani/Pan pytania dotyczące niniejszej Polityki Cookies, przetwarzania danych za pomocą cookies lub chce Pani/Pan skorzystać z przysługujących praw:

**Bartłomiej Chudzik / LessManual**
Email: **kontakt@LessManual**
Adres: ul. Długa 33, 05-530 Cendrowice, Polska

**Formularz kontaktowy:** [LessManual/kontakt] (link do uzupełnienia po uruchomieniu strony)

**Czas odpowiedzi:** Do 30 dni od otrzymania zapytania (zgodnie z RODO art. 12 ust. 3).

---

**Pełna Polityka Prywatności:** [Polityka Prywatności](./polityka_prywatnosci.md) (wszystkie aspekty przetwarzania danych, nie tylko cookies)

**Regulamin świadczenia usług:** [Regulamin](./regulamin.md) (warunki korzystania z usług LessManual)

---

**KONIEC POLITYKI COOKIES**

*Dokument wygenerowany: 30.10.2025*
*Status: Do uzupełnienia: email kontaktowy, adres, telefon, decyzja Google Analytics vs Google Analytics*
*Wymagane przed publikacją: Wdrożenie Cookie Banner (CookieYes / OneTrust / custom solution), testowanie zgody*

---

**Dziękujemy za szanowanie Twojej prywatności. Make Your Business LESSMANUAL.**
