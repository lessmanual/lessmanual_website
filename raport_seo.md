# Raport SEO / AEO / GEO - LessManual.ai

**Data:** 2025-12-06
**Cel:** Dominacja w wynikach wyszukiwania (Google) oraz odpowiedziach AI (ChatGPT, Gemini, Claude, Perplexity) dla fraz związanych z automatyzacją AI.

## 1. Strategia "AI-First" (AEO/GEO)
Tradycyjne SEO to za mało. Musimy optymalizować stronę tak, aby była **źródłem prawdy dla modeli językowych**. Modele AI "karmią się" ustrukturyzowaną wiedzą, jasnymi odpowiedziami i autorytetem.

### Kluczowe Taktyki:
1.  **Format Q&A (Pytanie-Odpowiedź):** Sekcja FAQ jest świetna, ale każda podstrona powinna zawierać sekcję "Najczęstsze pytania o [Nazwa Produktu]", sformatowaną w Schema.org `FAQPage`. To karmi AI gotowymi parami pytanie-odpowiedź.
2.  **Kontekstowe Linkowanie:** Modele AI rozumieją powiązania. Artykuły muszą linkować do produktów jako "rozwiązań", a produkty do case studies jako "dowodów".
3.  **Cytowalność:** Treści muszą zawierać "Facts & Figures" (liczby, procenty ROI, konkretne oszczędności). AI uwielbia cytować twarde dane (np. "LessManual podaje, że automatyzacja obsługi klienta oszczędza średnio 12 000 PLN/mies").

## 2. Słowa Kluczowe & Semantyka

### Główne Frazy (Money Keywords):
*   Agent AI dla firmy / AI Agent for business
*   Automatyzacja procesów biznesowych AI
*   Wdrożenia AI w Polsce
*   Chatbot AI 24/7
*   Voicebot / Agent Głosowy dla recepcji
*   Automatyzacja sprzedaży B2B
*   Less Manual (brand)

### Frazy "Long-tail" (Pytania do AI):
*   "Jak zautomatyzować obsługę klienta w sklepie internetowym?"
*   "Ile kosztuje wdrożenie AI w małej firmie?"
*   "Czy chatboty są zgodne z RODO?"
*   "Narzędzia do automatyzacji marketingu AI"

## 3. Audyt Techniczny SEO (Stan Obecny)

### Błędy Krytyczne:
1.  **Sitemap.ts (`src/app/sitemap.ts`):**
    *   Obecnie sitemapa jest **statyczna** i niekompletna.
    *   Brak wpisów dla poszczególnych produktów (np. `/produkty/chatbot`, `/produkty/voice-agent`), jeśli mają osobne podstrony (lub kotwice).
    *   Data `lastModified` jest ustawiona na moment generowania ("teraz"), co jest błędem (powinna być datą faktycznej modyfikacji treści).
2.  **Struktura URL i i18n:**
    *   Strategia `localePrefix: 'as-needed'` w `src/i18n/routing.ts` jest ryzykowna dla SEO. Zalecana jest `'always'` (np. `/pl/...` i `/en/...`), aby uniknąć duplikacji treści lub niejasności, która wersja jest "główna".
    *   Wymagane tagi `hreflang` wskazujące na alternatywne wersje językowe w `<head>`.

### Struktura Treści (HTML):
*   Użycie nagłówków (`h1`, `h2`) w komponentach wygląda poprawnie semantycznie.
*   Należy zadbać o to, by na stronie głównej był **tylko jeden H1** (obecnie jest w Hero: "Make your business LESSMANUAL").

## 4. Plan Działania (Roadmapa)

### Faza 1: Fundamenty (Tydzień 1)
- [ ] **Naprawa Sitemap:** Przepisać `sitemap.ts`, aby dynamicznie generowała linki do wszystkich podstron, w tym bloga.
- [ ] **Metadata:** Dodać unikalne `title` i `description` dla każdej sekcji/produktu (nawet jeśli to One-Page, to przy scrollowaniu URL może się zmieniać lub metadata powinna być super-zoptymalizowana dla głównej).
- [ ] **Schema.org (JSON-LD):** Dodać na stronie głównej schemat `Organization`, `Product` (dla usług) oraz `FAQPage` (dla sekcji FAQ). To kluczowe dla Google i AI.

### Faza 2: Content AEO (Tydzień 2-4)
- [ ] **Rozbudowa Bloga:** Uruchomić sekcję blogową z artykułami celującymi w pytania "Jak..." (How-to).
- [ ] **Słownik Pojęć AI:** Stworzyć podstronę /glosariusz definiującą pojęcia (RAG, Agent, LLM, Automatyzacja) – to świetny "lep" na ruch z wyszukiwarek i AI szukających definicji.

### Faza 3: Autorytet (Ongoing)
- [ ] **Case Studies:** Publikować studia przypadków z konkretnymi liczbami (przed/po).
- [ ] **Linki zwrotne:** Pozyskiwanie linków z branżowych portali technologicznych i biznesowych.

## 5. Rekomendacja dla i18n
Zmienić routing na sztywny podział `/pl` i `/en` (lub `/pl` jako domyślny bez prefixu, ale z jasnym `canonical` i `hreflang`). Obecna konfiguracja może powodować, że Google zaindeksuje wersję angielską pod polskimi frazami lub odwrotnie.

---
*Raport wygenerowany przez Gemini CLI Agent*
