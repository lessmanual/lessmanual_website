# PLAN: Strony porównawcze (Competitor Alternatives)

> **Data:** 2026-02-25
> **Autor:** CMO
> **Wykonawca:** CTO
> **Repo:** lessmanual-website (Next.js 16, App Router)
> **Branch:** `feat/competitor-pages`

---

## KONTEKST

Strony porównawcze to typ contentu z **najwyższym citation rate (~33%) w AI search**. Buyer intent keywords — ktoś kto szuka "X vs Y" jest na etapie Consideration i jest gotowy kupić.

LessManual ma 4 produkty. Każdy ma innych konkurentów. Plan obejmuje **10 stron** w 3 formatach.

---

## ARCHITEKTURA STRON

### URL structure
```
/porownanie/lessmanual-vs-[konkurent]     → Format: You vs Competitor
/porownanie/[konkurent]-alternatywy       → Format: Alternatives (plural)
/porownanie                                → Hub page (lista wszystkich porównań)
```

### Routing
```
src/app/porownanie/page.tsx                              → Hub
src/app/porownanie/lessmanual-vs-instream-group/page.tsx  → vs page
src/app/porownanie/lessmanual-vs-hotlead/page.tsx         → vs page
src/app/porownanie/lessmanual-vs-g2m/page.tsx             → vs page
src/app/porownanie/lessmanual-vs-tidio/page.tsx           → vs page
src/app/porownanie/lessmanual-vs-inteliwise/page.tsx      → vs page
src/app/porownanie/agencja-lead-gen-alternatywy/page.tsx  → alternatives
src/app/porownanie/chatbot-obsluga-klienta-alternatywy/page.tsx → alternatives
src/app/porownanie/seo-content-ai-alternatywy/page.tsx    → alternatives
src/app/porownanie/generator-ofert-ai-alternatywy/page.tsx → alternatives
```

### Dodaj do sitemap
Wszystkie 10 URLi + hub.

---

## WSPÓLNY LAYOUT

Stwórz reusable layout dla stron porównawczych:

**Plik:** `src/app/porownanie/layout.tsx`

Zawiera:
- Header + Footer (jak inne strony)
- Breadcrumb: Strona główna > Porównanie > [tytuł]
- BreadcrumbList schema (z PLAN-AI-SEO zadanie 8)

**Plik:** `src/components/sections/comparison/` — folder na reusable komponenty:
- `ComparisonTable.tsx` — tabela porównawcza (reusable)
- `VerdictCard.tsx` — "Dla kogo X / Dla kogo Y" karty
- `SwitchCTA.tsx` — CTA do przejścia na LessManual

---

## DANE KONKURENCJI (source of truth)

Stwórz plik z danymi konkurencji:

**Plik:** `src/lib/competitors.ts`

```typescript
export type Competitor = {
  name: string;
  slug: string;
  url: string;
  description: string;
  category: "lead-gen" | "chatbot" | "seo" | "offer-gen";
  pricing: {
    model: string;
    range: string;
    details: string;
  };
  pros: string[];
  cons: string[];
  bestFor: string;
  notIdealFor: string;
  features: Record<string, string | boolean>;
};

export const COMPETITORS: Record<string, Competitor> = {
  "instream-group": {
    name: "InStream Group",
    slug: "instream-group",
    url: "https://instreamgroup.com",
    description: "Agencja lead gen B2B z Poznania. Cold email + LinkedIn. Retainer model. 1500+ klientów, 10+ lat na rynku.",
    category: "lead-gen",
    pricing: {
      model: "Retainer miesięczny",
      range: "3,000-15,000 PLN/mies (szacunkowo)",
      details: "Brak publicznego cennika. Wycena indywidualna. Subskrypcja lub projekt. Brak pay-per-meeting.",
    },
    pros: [
      "10+ lat doświadczenia, 1500+ klientów",
      "Zespół SDR-ów do dyspozycji",
      "Cold email + LinkedIn + konsulting sprzedażowy",
      "Rynki zagraniczne (EN, DE)",
    ],
    cons: [
      "Retainer — płacisz niezależnie od wyników",
      "Brak gwarancji spotkań",
      "Brak publicznego cennika",
      "3.2/5 na Google (160 opinii) — mieszane recenzje",
      "Spam emailowy nawet po odmowie współpracy",
    ],
    bestFor: "Duże firmy B2B szukające pełnego outsource'u sprzedaży z konsultingiem",
    notIdealFor: "Firmy szukające pay-per-result bez ryzyka retainera",
    features: {
      "Pay-per-meeting": false,
      "Gwarancja zwrotu": false,
      "Cold email": true,
      "LinkedIn outreach": true,
      "Konsulting sprzedażowy": true,
      "Rynki zagraniczne": true,
      "AI personalizacja": false,
      "Publiczny cennik": false,
    },
  },

  "hotlead": {
    name: "hotLead",
    slug: "hotlead",
    url: "https://hotlead.pl",
    description: "Call center + lead generation w modelu 3P (opłata operacyjna + CPL + prowizja od sprzedaży). Telemarketing B2B.",
    category: "lead-gen",
    pricing: {
      model: "Model 3P: opłata operacyjna + CPL + prowizja",
      range: "995 PLN/mies operacyjna + 195-265 PLN/lead + 1-5% prowizji",
      details: "Opłata operacyjna 995 PLN/mies. CPL 195-265 PLN za kwalifikowaną rozmowę z decydentem. Prowizja 1-5% od zamkniętych transakcji. Dodatkowe usługi: audyt rozmów 2,495 PLN, budowa oferty 1,995 PLN.",
    },
    pros: [
      "Transparentny cennik (publiczny)",
      "Model pay-per-lead — częściowo performance-based",
      "Telemarketing + cold calling (kanał którego AI nie pokrywa)",
      "ROI 3.7x (ich dane)",
      "Dodatkowe usługi: szkolenia, audyt rozmów",
    ],
    cons: [
      "Opłata operacyjna 995 PLN/mies NIEZALEŻNIE od wyników",
      "CPL to kwalifikowana rozmowa — NIE spotkanie",
      "Prowizja 1-5% od sprzedaży na szczycie",
      "Telemarketing — nie cold email/LinkedIn",
      "Lead ≠ spotkanie (trzeba samemu zamknąć)",
    ],
    bestFor: "Firmy szukające telemarketingu B2B z częściowym modelem performance",
    notIdealFor: "Firmy szukające gotowych spotkań w kalendarzu bez dodatkowej pracy",
    features: {
      "Pay-per-meeting": false,
      "Gwarancja zwrotu": false,
      "Cold email": false,
      "LinkedIn outreach": false,
      "Telemarketing": true,
      "Publiczny cennik": true,
      "AI personalizacja": false,
      "Prowizja od sprzedaży": true,
    },
  },

  "g2m": {
    name: "G2M Agency",
    slug: "g2m",
    url: "https://g2magency.pl",
    description: "Agencja appointment setting i SDR outsourcing. Cold email + LinkedIn. 3-15 spotkań/mies. Retainer + opcjonalny performance.",
    category: "lead-gen",
    pricing: {
      model: "Retainer + opcjonalny performance",
      range: "Brak publicznego cennika. Pilot 30 dni.",
      details: "Retainer miesięczny (kwota nieujawniona). Wszystkie narzędzia w cenie (HubSpot, Instantly, LinkedIn Sales Navigator, Clay). Opcjonalny komponent success-based za spotkania/SQL.",
    },
    pros: [
      "Appointment setting — dostarczają spotkania, nie leady",
      "3-15 spotkań miesięcznie",
      "Narzędzia w cenie (HubSpot, Instantly, Clay, LinkedIn SN)",
      "Pilot 30 dni — niski próg wejścia",
      "4.8/5 (12 opinii)",
      "Pierwsze odpowiedzi w 7-14 dni",
    ],
    cons: [
      "Retainer — płacisz stale, nie per spotkanie",
      "Brak publicznego cennika",
      "Brak gwarancji zwrotu",
      "Mała firma (12 opinii vs 160 InStream)",
      "Brak AI/automatyzacji — ludzki zespół SDR",
    ],
    bestFor: "Firmy B2B szukające outsource'u SDR z narzędziami w cenie i spotkaniami w kalendarzu",
    notIdealFor: "Firmy szukające pay-per-meeting bez retainera",
    features: {
      "Pay-per-meeting": false,
      "Gwarancja zwrotu": false,
      "Cold email": true,
      "LinkedIn outreach": true,
      "Appointment setting": true,
      "Narzędzia w cenie": true,
      "AI personalizacja": false,
      "Publiczny cennik": false,
    },
  },

  "tidio": {
    name: "Tidio",
    slug: "tidio",
    url: "https://tidio.com",
    description: "Platforma SaaS do live chatu i chatbotów AI (Lyro). Self-service, DIY. Globalna firma z polskimi korzeniami.",
    category: "chatbot",
    pricing: {
      model: "SaaS subskrypcja miesięczna",
      range: "$29-$749/mies",
      details: "Free: 50 Lyro AI conversations. Starter $29/mies: 100 conversations. Growth od $59/mies: 250+ conversations. Plus od $749/mies: custom limits, dedicated CSM. Wszystko DIY — sam konfigurujesz.",
    },
    pros: [
      "Darmowy plan — start za 0 zł",
      "Łatwy setup (15 min)",
      "Lyro AI agent — automatyczne odpowiedzi",
      "Live chat + ticketing + automatyzacja",
      "Integracje: Shopify, WordPress, WooCommerce",
      "Globalny produkt, stabilna firma",
    ],
    cons: [
      "DIY — sam konfigurujesz, sam trenujesz AI",
      "Generyczny — nie spersonalizowany pod Twoją firmę",
      "Limity conversations (50-250 w tańszych planach)",
      "Brak integracji z polskimi CRM/ERP",
      "Brak voice agenta",
      "Brak done-for-you wdrożenia",
      "Angielskojęzyczny support",
    ],
    bestFor: "E-commerce i małe firmy szukające taniego, szybkiego live chatu z basic AI",
    notIdealFor: "Firmy B2B potrzebujące spersonalizowanego chatbota wytrenowanego na własnej bazie wiedzy",
    features: {
      "Done-for-you wdrożenie": false,
      "Chatbot AI": true,
      "Voice agent": false,
      "Baza wiedzy firmy (RAG)": false,
      "Lead capture": true,
      "Live chat": true,
      "Integracja CRM": "Podstawowa",
      "Auto-sortowanie maili": false,
      "Polski support": false,
      "24/7 obsługa": true,
    },
  },

  "inteliwise": {
    name: "InteliWISE",
    slug: "inteliwise",
    url: "https://inteliwise.com/pl/",
    description: "Polska firma AI — chatbot, voicebot, live chat, contact center. Enterprise-focused. On-premise opcja.",
    category: "chatbot",
    pricing: {
      model: "SaaS miesięczny (per minuty/odpowiedzi/seat)",
      range: "359-4,999 PLN/mies (chatbot), 899-4,999 PLN/mies (voicebot)",
      details: "Chatbot: Self-service 359 PLN/mies (1500 odpowiedzi), Enterprise 1,299 PLN/mies (5000 odpowiedzi), Platform 3,599 PLN/mies. Voicebot: Self-service 899 PLN/mies (1000 min), Enterprise 1,999 PLN/mies (2500 min), Platform 4,999 PLN/mies. Live chat: 109-469 PLN/seat/mies. Contact center: 185-459 PLN/seat/mies.",
    },
    pros: [
      "Polska firma — polski NLP, polskojęzyczny support",
      "Chatbot + voicebot + live chat + contact center — pełny stack",
      "Enterprise i on-premise opcje",
      "14-dniowy free trial",
      "Integracje z polskimi systemami",
    ],
    cons: [
      "DIY — sam konfigurujesz scenariusze",
      "Drogi (Enterprise chatbot 1,299 PLN/mies za 5000 odpowiedzi)",
      "Limity odpowiedzi/minut — dodatkowe koszty",
      "Brak done-for-you wdrożenia z treningiem na Twoich danych",
      "Przestarzały UI (w porównaniu z Tidio)",
      "Brak gwarancji wyników",
    ],
    bestFor: "Enterprise i banki/ubezpieczalnie potrzebujące on-premise chatbota z polskim NLP",
    notIdealFor: "MŚP szukające szybkiego, done-for-you chatbota wytrenowanego na ich FAQ",
    features: {
      "Done-for-you wdrożenie": false,
      "Chatbot AI": true,
      "Voice agent": true,
      "Baza wiedzy firmy (RAG)": "Ograniczone",
      "Lead capture": true,
      "Live chat": true,
      "Integracja CRM": true,
      "On-premise": true,
      "Polski NLP": true,
      "24/7 obsługa": true,
    },
  },
};
```

---

## DANE LESSMANUAL (do porównań)

Dodaj do `src/lib/competitors.ts`:

```typescript
export const LESSMANUAL = {
  "ai-sdr": {
    name: "LessManual AI SDR",
    pricing: "Setup 2,500-5,000 PLN + 500-2,000 PLN/spotkanie. Zero stałych opłat.",
    guarantee: "0 spotkań w 45 dni = zwrot setup",
    features: {
      "Pay-per-meeting": true,
      "Gwarancja zwrotu": true,
      "Cold email": true,
      "LinkedIn outreach": "W planie Growth+",
      "AI personalizacja": true,
      "Publiczny cennik": true,
      "Wdrożenie 7 dni": true,
      "Appointment setting": true,
      "Narzędzia w cenie": true,
    },
  },
  "obsluga-klienta": {
    name: "LessManual Obsługa Klienta AI",
    pricing: "Setup jednorazowy + od 900 PLN/mies",
    guarantee: "Wdrożenie w 7 dni lub zwrot. Rezygnacja bez kar.",
    features: {
      "Done-for-you wdrożenie": true,
      "Chatbot AI": true,
      "Voice agent": "Upsell",
      "Baza wiedzy firmy (RAG)": true,
      "Lead capture": true,
      "Live chat": "Opcjonalnie",
      "Integracja CRM": true,
      "Auto-sortowanie maili": true,
      "Polski support": true,
      "24/7 obsługa": true,
    },
  },
  "seo-content": {
    name: "LessManual SEO Content",
    pricing: "Setup + od 1,000 PLN/mies (10-30 artykułów, od 83 PLN/artykuł)",
    guarantee: "+150-400% ruchu organicznego w 6 mies. Rezygnacja bez kar.",
  },
  "generator-ofert": {
    name: "LessManual Generator Ofert",
    pricing: "Setup jednorazowy od 4,000 PLN + utrzymanie",
    guarantee: "Oszczędność 96% czasu na ofertowaniu. Wdrożenie 7-14 dni. Rezygnacja bez kar.",
  },
};
```

---

## 10 STRON — SPECYFIKACJA

### STRONA 1: Hub `/porownanie`

**Meta title:** Porównanie — LessManual vs konkurencja | Cennik, funkcje, opinie
**Meta desc:** Uczciwe porównanie LessManual z InStream Group, hotLead, G2M, Tidio i InteliWISE. Cenniki, funkcje, dla kogo. Sprawdź zanim zdecydujesz.

**Treść:**
- H1: "Porównaj nas z konkurencją. Uczciwie."
- Lead: "Nie jesteśmy dla każdego. Sprawdź kto pasuje do Twojej firmy."
- Grid z kartami — każda karta = link do strony porównawczej
- Podział per kategoria: Lead Generation | Obsługa Klienta AI | SEO Content | Generator Ofert

---

### STRONA 2: `/porownanie/lessmanual-vs-instream-group`

**Kategoria:** AI SDR / Lead Gen
**Meta title:** LessManual vs InStream Group — porównanie lead generation B2B [2026]
**Meta desc:** LessManual AI SDR (pay-per-meeting) vs InStream Group (retainer). Cennik, model rozliczeń, gwarancje. Który lepszy dla Twojej firmy B2B?
**Target keywords:** "InStream Group alternatywa", "InStream Group opinie", "LessManual vs InStream Group"

**Sekcje:**
1. **TL;DR** — InStream = retainer + ludzki SDR. LessManual = pay-per-meeting + AI. InStream lepszy dla dużych firm z budżetem na full outsource. LessManual lepszy dla firm szukających zero ryzyka.
2. **Tabela porównawcza** — użyj features z `COMPETITORS["instream-group"]` vs `LESSMANUAL["ai-sdr"]`
3. **Cennik** — InStream: retainer 3-15k/mies (est.) vs LessManual: setup 2.5-5k + 500-2k/spotkanie
4. **Model rozliczeń** — Retainer vs Pay-per-meeting (wyjaśnij różnicę i konsekwencje)
5. **Dla kogo InStream** — Duże firmy, rynki zagraniczne, potrzeba konsultingu
6. **Dla kogo LessManual** — MŚP, zero ryzyka, szybki start, pay-per-result
7. **FAQ** (3-5 pytań, z FAQPage schema)
8. **CTA** — "Sprawdź ile spotkań możemy Ci dostarczyć" → cal.com

---

### STRONA 3: `/porownanie/lessmanual-vs-hotlead`

**Kategoria:** AI SDR / Lead Gen
**Meta title:** LessManual vs hotLead — pay-per-meeting vs pay-per-lead [2026]
**Meta desc:** LessManual (spotkania w kalendarzu) vs hotLead (leady telefoniczne). Model 3P, CPL 195-265 PLN, prowizja. Porównanie dla firm B2B.
**Target keywords:** "hotLead opinie", "hotLead cennik", "hotLead alternatywa"

**Sekcje:**
1. **TL;DR** — hotLead = telemarketing + CPL + prowizja. LessManual = cold email AI + pay-per-meeting. hotLead lepszy jeśli potrzebujesz telemarketingu. LessManual jeśli chcesz gotowe spotkania bez prowizji.
2. **Tabela** — features comparison
3. **Cennik** — hotLead: 995 PLN/mies + 195-265 PLN/lead + 1-5% prowizji vs LessManual: setup + 500-2k/spotkanie, zero prowizji
4. **Lead vs spotkanie** — wyjaśnij kluczową różnicę (lead = kwalifikowana rozmowa, spotkanie = potwierdzone spotkanie w kalendarzu)
5. **Model kosztów** — ROI comparison (hotLead 3.7x vs LessManual 300-1400%)
6. **Dla kogo hotLead / Dla kogo LessManual**
7. **FAQ** (z schema)
8. **CTA**

---

### STRONA 4: `/porownanie/lessmanual-vs-g2m`

**Kategoria:** AI SDR / Lead Gen
**Meta title:** LessManual vs G2M Agency — appointment setting B2B [2026]
**Meta desc:** Dwie firmy, podobna obietnica: spotkania z decydentami. G2M = ludzki SDR + retainer. LessManual = AI SDR + pay-per-meeting. Porównanie.
**Target keywords:** "G2M Agency opinie", "G2M alternatywa", "appointment setting Polska"

**Sekcje:**
1. **TL;DR** — Obaj dostarczają spotkania. G2M = ludzki SDR team, retainer. LessManual = AI, pay-per-meeting.
2. **Tabela** — features
3. **Cennik** — G2M: retainer (nieujawniony) + narzędzia w cenie vs LessManual: setup + PPA
4. **Człowiek vs AI** — kiedy ludzki SDR lepszy, kiedy AI
5. **Dla kogo G2M / Dla kogo LessManual**
6. **FAQ** (z schema)
7. **CTA**

---

### STRONA 5: `/porownanie/lessmanual-vs-tidio`

**Kategoria:** Obsługa Klienta AI
**Meta title:** LessManual vs Tidio — chatbot obsługa klienta [2026]
**Meta desc:** LessManual (done-for-you chatbot AI na Twoich danych) vs Tidio (DIY live chat + Lyro AI). Cennik, funkcje, wdrożenie. Porównanie.
**Target keywords:** "Tidio alternatywa", "Tidio opinie", "chatbot obsługa klienta Polska"

**Sekcje:**
1. **TL;DR** — Tidio = DIY SaaS, tani start, generyczny. LessManual = done-for-you, wytrenowany na Twojej bazie wiedzy, droższy ale gotowy.
2. **Tabela** — features z `COMPETITORS["tidio"]` vs `LESSMANUAL["obsluga-klienta"]`
3. **Cennik** — Tidio: $0-749/mies (DIY) vs LessManual: setup + 900 PLN/mies (done-for-you)
4. **DIY vs Done-for-you** — ile NAPRAWDĘ kosztuje samodzielna konfiguracja Tidio (czas + iteracje + testowanie)
5. **Dla kogo Tidio / Dla kogo LessManual**
6. **FAQ** (z schema)
7. **CTA**

---

### STRONA 6: `/porownanie/lessmanual-vs-inteliwise`

**Kategoria:** Obsługa Klienta AI
**Meta title:** LessManual vs InteliWISE — chatbot i voicebot dla firm [2026]
**Meta desc:** LessManual (done-for-you AI na Twoich danych) vs InteliWISE (enterprise chatbot + voicebot). Cennik od 359 PLN. Porównanie.
**Target keywords:** "InteliWISE alternatywa", "InteliWISE cennik", "chatbot dla firm Polska"

**Sekcje:**
1. **TL;DR** — InteliWISE = enterprise, polski NLP, on-premise opcja, DIY. LessManual = MŚP, done-for-you, RAG na Twoich danych, szybkie wdrożenie.
2. **Tabela** — features
3. **Cennik** — InteliWISE: 359-4,999 PLN/mies (chatbot) vs LessManual: setup + 900 PLN/mies
4. **Enterprise vs MŚP** — InteliWISE celuje w banki/ubezpieczenia, LessManual w firmy 5-50 osób
5. **Dla kogo InteliWISE / Dla kogo LessManual**
6. **FAQ** (z schema)
7. **CTA**

---

### STRONA 7: `/porownanie/agencja-lead-gen-alternatywy`

**Kategoria:** AI SDR (Alternatives plural)
**Meta title:** Najlepsze alternatywy dla agencji lead generation B2B w Polsce [2026]
**Meta desc:** 5 sposobów na pozyskiwanie klientów B2B: LessManual AI SDR, InStream Group, G2M, hotLead, in-house SDR. Cenniki, modele, porównanie.
**Target keywords:** "agencja lead generation Polska", "pozyskiwanie klientów B2B", "lead generation alternatywy"

**Sekcje:**
1. **Intro** — Dlaczego firmy szukają alternatyw (retainer bez wyników, brak transparentności)
2. **Kryteria wyboru** — Model rozliczeń, gwarancje, szybkość startu, kanały
3. **5 opcji** (LessManual pierwszy, potem InStream, G2M, hotLead, in-house SDR)
4. **Tabela porównawcza** — ceny, model, gwarancje, kanały, czas wdrożenia
5. **Rekomendacja per scenariusz**
6. **FAQ** (z schema)
7. **CTA**

---

### STRONA 8: `/porownanie/chatbot-obsluga-klienta-alternatywy`

**Kategoria:** Obsługa Klienta AI (Alternatives plural)
**Meta title:** Chatbot obsługa klienta — najlepsze rozwiązania AI dla firm [2026]
**Meta desc:** Porównanie: LessManual, Tidio, InteliWISE, Botpress, ręczna obsługa. Done-for-you vs DIY. Cenniki i funkcje.
**Target keywords:** "chatbot obsługa klienta", "chatbot dla firm", "AI obsługa klienta"

**Sekcje:**
1. **Intro** — Dlaczego automatyzacja obsługi klienta (koszty, czas odpowiedzi, skalowanie)
2. **Kryteria** — DIY vs done-for-you, język polski, integracje, cena
3. **5 opcji** (LessManual, Tidio, InteliWISE, Botpress self-hosted, ręczna obsługa)
4. **Tabela porównawcza**
5. **Rekomendacja**
6. **FAQ** (z schema)
7. **CTA**

---

### STRONA 9: `/porownanie/seo-content-ai-alternatywy`

**Kategoria:** SEO Content (Alternatives plural)
**Meta title:** AI SEO Content — alternatywy dla agencji copywritingu [2026]
**Meta desc:** Blog na autopilocie? LessManual (done-for-you, 83 PLN/art.) vs agencja SEO vs freelancer vs DIY narzędzia AI. Porównanie.
**Target keywords:** "SEO content AI", "automatyczny blog AI", "AI copywriting Polska"

**Sekcje:**
1. **Intro** — Problem: content kosztuje 500-2000 PLN/artykuł, firmy nie nadążają
2. **Kryteria** — Jakość, cena per artykuł, wolumen, SEO optimization, human review
3. **5 opcji** (LessManual SEO Content, agencja SEO np. Widoczni, freelancer, Jasper/Surfer AI DIY, ręcznie)
4. **Tabela porównawcza** — cena per artykuł, wolumen, jakość, SEO, czas
5. **Rekomendacja**
6. **FAQ** (z schema)
7. **CTA**

---

### STRONA 10: `/porownanie/generator-ofert-ai-alternatywy`

**Kategoria:** Generator Ofert (Alternatives plural)
**Meta title:** Generator ofert AI — automatyczna wycena dla firm B2B [2026]
**Meta desc:** Automatyczne ofertowanie: LessManual (chat wycenowy + PDF), PandaDoc, ręcznie w Excelu. Porównanie narzędzi do wyceny B2B.
**Target keywords:** "generator ofert", "automatyczna wycena B2B", "generator ofert AI"

**Sekcje:**
1. **Intro** — Problem: 2h per ofertę ręcznie, każda inna, brak standaryzacji
2. **Kryteria** — Automatyzacja, personalizacja, integracja z CRM, format wyjściowy
3. **4 opcje** (LessManual Generator Ofert, PandaDoc/Proposify, Excel/Google Docs ręcznie, freelancer)
4. **Tabela porównawcza**
5. **Rekomendacja**
6. **FAQ** (z schema)
7. **CTA**

---

## WSPÓLNE ELEMENTY KAŻDEJ STRONY

### Schema (JSON-LD)
Każda strona porównawcza powinna mieć:
1. `FAQPage` schema (z FAQ sekcji)
2. `WebPage` schema z `breadcrumb`
3. `Article` schema (datePublished, dateModified, author)

### Meta
```typescript
export const metadata: Metadata = {
  title: "[tytuł]",
  description: "[opis]",
  openGraph: { /* ... */ },
  alternates: { canonical: "https://lessmanual.ai/porownanie/[slug]" },
};
```

### CTA
Każda strona kończy się:
```
Nie wiesz które rozwiązanie pasuje do Twojej firmy?
[Porozmawiajmy — 15 minut, bez zobowiązań] → cal.com
```

### Tone
- **Uczciwy** — przyznaj gdzie konkurent jest lepszy
- **Konkretny** — ceny, liczby, fakty
- **Nie agresywny** — "dla kogo X jest lepszy" zamiast "X jest gorszy"
- **Po polsku** — zero jargonu AI (zgodnie z product-marketing-context)

---

## IMPLEMENTACJA — KOLEJNOŚĆ

1. Stwórz `src/lib/competitors.ts` z danymi
2. Stwórz layout + reusable components (ComparisonTable, VerdictCard, SwitchCTA)
3. Hub page (`/porownanie`)
4. 3 strony "vs" dla lead gen (InStream, hotLead, G2M) — bo AI SDR = primary product
5. 2 strony "vs" dla obsługi klienta (Tidio, InteliWISE)
6. 4 strony "alternatives" (lead gen, chatbot, SEO, oferty)
7. Dodaj wszystkie do sitemap
8. Dodaj linki z product pages do odpowiednich porównań

---

## CHECKLIST

- [ ] `src/lib/competitors.ts` — dane konkurencji
- [ ] Layout + components w `src/components/sections/comparison/`
- [ ] Hub: `/porownanie`
- [ ] 5 stron "vs": InStream, hotLead, G2M, Tidio, InteliWISE
- [ ] 4 strony "alternatives": lead gen, chatbot, SEO, oferty
- [ ] FAQPage schema na każdej stronie
- [ ] BreadcrumbList schema
- [ ] Sitemap updated (10 nowych URLi)
- [ ] Internal links z product pages
- [ ] `npm run build` OK
