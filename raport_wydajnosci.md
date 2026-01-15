# Raport Wydajności - LessManual.ai

**Data:** 2025-12-06
**Analizowany projekt:** LessManual.ai (Next.js 15.5)

## 1. Podsumowanie Techniczne
Projekt jest zbudowany na solidnych, nowoczesnych fundamentach (Next.js 15.5, React 19, Server Components), co daje ogromny potencjał wydajnościowy. Zastosowano wiele "best practices", ale zidentyfikowano kilka obszarów krytycznych, które mogą obniżać wynik Lighthouse i odczucia użytkownika.

**Wstępna ocena wydajności:** 85-90/100 (Potencjał na 98-100)

## 2. Mocne Strony (Co jest zrobione dobrze)

1.  **Strategia Animacji (Hero Section):**
    *   Bardzo dobra decyzja o **nieużywaniu Framer Motion na start** w sekcji Hero (`mounted` state + CSS transitions). To kluczowe dla LCP (Largest Contentful Paint).
    *   Użycie pasywnego nasłuchu scrollowania (`passive: true`) do efektu paralaksy – świetne dla płynności przewijania.
    *   Warstwowe ładowanie (najpierw tekst, potem robot 3D).

2.  **Optymalizacja Obrazów:**
    *   Konsekwentne użycie komponentu `next/image` zamiast `<img>`.
    *   Format WebP dla ciężkich assetów (`robot-composition.webp`).
    *   Atrybut `priority` dla obrazka w Hero (kluczowe dla LCP).
    *   Odpowiednie `sizes` dla responsywności.

3.  **Architektura Aplikacji:**
    *   Domyślne użycie **Server Components** (minimalizacja JavaScriptu przesyłanego do klienta).
    *   `next.config.ts` zawiera `optimizePackageImports` (eksperymentalne), co przyspiesza tree-shaking.

4.  **Czcionki:**
    *   Użycie `next/font` (Inter/Sora) eliminuje Layout Shift (CLS) i zapytania sieciowe do Google Fonts.

## 3. Obszary do Poprawy (Wyzwania i Ryzyka)

### A. Iframe Formularza (Krytyczne)
Sekcja `ContactFormSection` używa `iframe` ładującego formularz z n8n (`https://n8n.lessmanual.cloud/form/...`).
*   **Problem:** Iframe to "czarna skrzynka" dla wydajności. Blokuje renderowanie, może powodować skoki (layout shifts), nie dzieli stylów CSS (trzeba ładować osobne zasoby wewnątrz iframe).
*   **Ryzyko:** Spadek wydajności na mobile, problemy ze scrollowaniem wewnątrz iframe'a.
*   **Rekomendacja:** Docelowo przepisać formularz na natywny React Component, który wysyła dane do API (`/api/contact`), a API dopiero uderza do n8n webhooka. To da 100% kontroli nad wyglądem i szybkością.

### B. Skrypty Zewnętrzne (Analityka)
W strukturze plików widzę `FacebookPixel.tsx` i `GoogleTagManager.tsx`.
*   **Problem:** Skrypty trackujące to najczęstszy zabójca "Time to Interactive".
*   **Rekomendacja:** Użyć strategii **Partytown** (przeniesienie skryptów do Web Workera) lub `next/script` ze strategią `strategy="worker"` (jeśli dostępne) lub `lazyOnload`.

### C. Bundle Size (Kalkulator ROI)
Komponent `ROICalculatorSection` jest duży ("Client Component") i zawiera dużo logiki oraz importów (`framer-motion`, `zod`, logika liczenia).
*   **Rekomendacja:** Upewnić się, że jest ładowany leniwie (Lazy Loading) lub że jego kod jest dzielony (Code Splitting), aby nie blokował ładowania strony głównej, jeśli jest nisko na stronie.

### D. Framer Motion w sekcjach poniżej Hero
Chociaż Hero jest zoptymalizowane, reszta strony (Kalkulator, Kontakt) używa `framer-motion`.
*   **Rekomendacja:** Używać `LazyMotion` z `domAnimation` (zamiast `domMax`), aby zmniejszyć rozmiar paczki JS biblioteki animacji o połowę.

## 4. Plan Naprawczy (Checklista)

- [ ] **Priorytet 1:** Zmienić formularz kontaktowy z `iframe` na natywny formularz React + API Route.
- [ ] **Priorytet 2:** Sprawdzić konfigurację `next/script` dla GTM/Pixel (użyć `strategy="afterInteractive"` lub opóźnić ładowanie).
- [ ] **Priorytet 3:** Wdrożyć `LazyMotion` dla Framer Motion w całej aplikacji.
- [ ] **Priorytet 4:** Dodać `generateStaticParams` dla stron statycznych (jeśli są jakieś dynamiczne routy, np. blog), aby wykorzystać SSG/ISR.

---
*Raport wygenerowany przez Gemini CLI Agent*
