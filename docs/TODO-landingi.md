# TODO: NAPRAWA 4 LANDING PAGES

**Data utworzenia:** 2026-02-21
**Źródło:** Audyt B2B compliance vs `checklistab2b.md`
**Status:** W TRAKCIE (6/10 tasków z oryginalnej listy done)

---

## PODSUMOWANIE SCORES

| Landing Page | URL | Score | Najważniejszy brak |
|-------------|-----|-------|-------------------|
| SEO Content | /oferta/seo-content | 81/100 | Case studies z danymi |
| Generator Ofert | /oferta/generator-ofert | 85/100 | Screenshoty produktu |
| AI SDR | /oferta/ai-sdr | 87/100 | Logotypy klientów |
| Obsługa Klienta | /oferta/obsluga-klienta | 87/100 | Screenshoty systemu |

---

## QUICK WINS (niski effort, wysoki impact) — ZRÓB NAJPIERW

### QW-1: TOC Nawigacja "On This Page" (CTO)
- **Dotyczy:** WSZYSTKIE 4 strony
- **Co:** Sticky pill navigation pod hero: "Problem | Rozwiązanie | Wyniki | Cennik | FAQ"
- **Effort:** Niski (1 komponent, reuse na 4 stronach)
- **Impact:** -20-30% bounce rate
- **Status:** [ ] Do zrobienia
- **Plik audytu:** Każdy audit-*.md, punkt #3

### QW-2: Footer prawny (CTO)
- **Dotyczy:** WSZYSTKIE 4 strony
- **Co:** Privacy Policy, Terms of Service, NIP, RODO badge
- **Effort:** Niski (1 komponent Footer, globalny)
- **Impact:** Compliance + trust enterprise
- **Status:** [ ] Do zrobienia

### QW-3: Logotypy klientów (CMO + CTO)
- **Dotyczy:** WSZYSTKIE 4 strony
- **Co:** Sekcja `<ClientLogos />` — min 5-6 logotypów (grayscale, hover → kolor)
- **CMO:** Przygotuj listę klientów + assety (lub anonimowe branżowe: "SaaS B2B", "E-commerce", "Firma OZE")
- **CTO:** Komponent ClientLogos + integracja w Hero i SocialProof
- **Effort:** Niski (CTO) + Średni (CMO — potrzeba assetów)
- **Impact:** +30-40% trust
- **Status:** [ ] Do zrobienia

---

## ŚREDNI PRIORYTET (wymaga przygotowania materiałów)

### SP-1: Screenshoty/mockupy produktu (CMO + CTO)
- **Dotyczy:** WSZYSTKIE 4 strony
- **Co per strona:**
  - **AI SDR:** Panel z leadami, email personalizowany, kalendarz ze spotkaniami
  - **SEO Content:** Google Analytics wzrost ruchu, Search Console ranking, content calendar
  - **Generator Ofert:** Wygenerowany PDF z logo, interfejs konfiguratora, mobile view
  - **Obsługa Klienta:** Widget chatbota, dashboard email triage, Voice Agent UI
- **CMO:** Przygotuj mockupy/screenshoty (Figma lub prawdziwe screeny)
- **CTO:** Carousel/galeria komponent + lazy loading
- **Effort:** Średni
- **Impact:** +10-15% konwersji
- **Status:** [ ] Do zrobienia

### SP-2: Demo wideo (CMO)
- **Dotyczy:** WSZYSTKIE 4 strony
- **Co:** 60-90s nagranie ekranu per produkt
  - **AI SDR:** System → lead scoring → email → spotkanie w kalendarzu
  - **SEO Content:** Keyword research → AI generuje → human review → publikacja
  - **Generator Ofert:** Klient otwiera konfigurator → wybiera → PDF w 5 min
  - **Obsługa Klienta:** Chatbot w akcji → email triage → Voice Agent
- **Format:** Loom embed lub nagranie ekranu, thumbnail z play button
- **Effort:** Średni (wymaga nagrania 4 filmów)
- **Impact:** +15-25%
- **Status:** [ ] Do zrobienia

### SP-3: Więcej case studies (CMO)
- **Dotyczy:** WSZYSTKIE 4 strony (każda ma max 1 case study)
- **Co:** Min 2-3 case studies per strona z różnych branż
- **Format:** Problem → Rozwiązanie → Wynik (konkretne liczby)
- **Effort:** Średni (wymaga danych od klientów lub tworzenia wzorcowych)
- **Impact:** +15-25%
- **Status:** [ ] Do zrobienia

---

## NICE TO HAVE (dodatkowe ulepszenia)

### NH-1: Wizualizacja "Przed/Po" (CTO)
- **Dotyczy:** WSZYSTKIE 4 strony
- **Co:** Splitscreen: Przed (chaos, stare narzędzia) → Po (dashboard, automatyzacja)
- **Effort:** Niski
- **Impact:** +5-10%
- **Status:** [ ] Do zrobienia

### NH-2: Security/RODO badges (CTO)
- **Dotyczy:** WSZYSTKIE 4 strony
- **Co:** SSL, GDPR/RODO badge, "Dane w EU", ikony integracji
- **Effort:** Niski
- **Impact:** Trust enterprise
- **Status:** [ ] Do zrobienia

### NH-3: Industry Variants na stronie (CTO)
- **Dotyczy:** Obsługa Klienta, Generator Ofert
- **Co:** Dane `OBS_KLIENTA_INDUSTRY_VARIANTS` istnieją w constants ale nie są wyświetlane
- **Effort:** Niski
- **Impact:** +5-8%
- **Status:** [ ] Do zrobienia

---

## STRONA-SPECYFICZNE ZADANIA

### SEO Content (81/100) — najniższy score
- [ ] Precyzja gwarancji ROI: zdefiniować "200% ROI = min. 3,600 PLN wartości"
- [ ] Szczegółowe testimoniale: firma, stanowisko, konkretny wynik, data

### Generator Ofert (85/100)
- [ ] Founder credibility: lata doświadczenia, ile systemów, link LinkedIn
- [ ] Industry variants na stronie (OZE, meble, remonty)

### AI SDR (87/100)
- [ ] Gwarancja w P.S. (przypomnienie)
- [ ] Opcja rabatu rocznego ("Save 20%")

### Obsługa Klienta (87/100)
- [ ] Industry variants na stronie (E-commerce, Medycyna, HoReCa)

---

## POZOSTAŁE TASKI Z ORYGINALNEJ LISTY

| # | Task | Owner | Status | Blokowany przez |
|---|------|-------|--------|----------------|
| 7 | Zbuduj custom lead magnet form (React + n8n + MailerLite) | CTO | PENDING | — |
| 8 | Zbuduj stronę /audyt — AI Readiness Quiz | CTO | PENDING | #7 |
| 9 | Napisz treść audytu AI Readiness + raport PDF + nurture 7 emaili | CMO | PENDING | #7 |
| 10 | n8n workflow — lead nurture sequence (MailerLite) | CTO | PENDING | #7, #9 |

---

## KOLEJNOŚĆ WDRAŻANIA (REKOMENDACJA)

### Faza 1: Quick Wins (1-2 sesje CTO)
1. TOC nawigacja (1 komponent × 4 strony)
2. Footer prawny (1 globalny komponent)
3. Security/RODO badges

### Faza 2: Assety (CMO przygotowuje)
4. Logotypy klientów (lista + assety)
5. Screenshoty/mockupy (Figma lub real)
6. Demo wideo (4 nagrania)
7. Case studies (dane od klientów)

### Faza 3: Lead Magnet (CTO + CMO)
8. Lead magnet form (#7)
9. AI Readiness Quiz (#8)
10. Treść audytu + nurture emaile (#9)
11. n8n workflow lead nurture (#10)

### Faza 4: Extras
12. Wizualizacja Przed/Po
13. Industry variants
14. Strona-specyficzne poprawki

---

## SZCZEGÓŁOWE PLIKI AUDYTOWE

| Strona | Plik |
|--------|------|
| AI SDR | `docs/audit-ai-sdr.md` |
| SEO Content | `docs/audit-seo-content.md` |
| Generator Ofert | `docs/audit-generator-ofert.md` |
| Obsługa Klienta | `docs/audit-obsluga-klienta.md` |

Każdy plik zawiera: pełną listę SPEŁNIONYCH elementów + DO NAPRAWY z priorytetami + tabelę effort/impact.
