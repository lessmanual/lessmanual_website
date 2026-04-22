# PLAN: Analytics Tracking Setup

> **Data:** 2026-02-25
> **Autor audytu:** CMO
> **Wykonawca:** CTO
> **Repo:** lessmanual-website (Next.js 16, App Router)
> **Branch:** `feat/analytics`

---

## KONTEKST

Audit wykazał:
- **GA4 = NIE PODPIĘTE** — zero kodu analytics na stronie. Brak gtag, brak GTM, brak GA_MEASUREMENT_ID
- **Cookie Banner = jest, ale w próżni** — `CookieBanner.tsx` zbiera zgody (necessary/functional/analytics/marketing) ale nie uruchamia żadnego trackera
- **Event tracking = zero** — brak śledzenia kliknięć CTA, chat widget, ROI kalkulatorów
- **UTM handling = zero** — brak parsowania parametrów UTM z cold emaili/social
- **Search Console = nie podłączony** — brak `google-site-verification` meta tag

**Główne konwersje na stronie:**
- **CTA "Umów rozmowę"** → link do Cal.com (50+ przycisków na stronie)
- **CTA "Napisz do nas"** → mailto: link
- **ChatWidget** — chatbot w prawym dolnym rogu
- **ROI Calculator** → kalkulator na homepage i każdej product page
- **Blog** → odczyty artykułów

Bez analytics nie wiemy: ile osób odwiedza stronę, skąd przychodzą, które strony konwertują, czy cold email generuje ruch.

---

## ZADANIE 1: Zainstaluj GA4 na stronie (15 min)

### Krok 1: Bartek musi podać GA Measurement ID

Bartek mówi że ma GA4 property. Potrzebujemy `G-XXXXXXXXXX` ID.

**Gdzie je znaleźć:**
1. Otwórz https://analytics.google.com
2. Admin (koło zębate) → Property → Data Streams → Web
3. Skopiuj "Measurement ID" (format: `G-XXXXXXXXXX`)

Jeśli nie ma Data Stream — utwórz nowy:
- Property name: `LessManual.ai`
- Timezone: `Europe/Warsaw`
- Currency: `PLN`
- Data Stream → Web → URL: `https://lessmanual.ai`

### Krok 2: Dodaj env variable

**Plik:** `.env.local`

Dodaj linię:
```
NEXT_PUBLIC_GA_ID=G-GBQPV7FHNW
```

### Krok 3: Stwórz komponent GoogleAnalytics

**Plik:** `src/components/analytics/GoogleAnalytics.tsx` (NOWY)

```tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const saved = localStorage.getItem("cookie-consent");
      if (saved) {
        const prefs = JSON.parse(saved);
        setHasConsent(prefs.analytics === true);
      }
    };

    checkConsent();

    // Listen for consent changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cookie-consent") checkConsent();
    };
    window.addEventListener("storage", handleStorage);

    // Also listen for custom event from CookieBanner
    const handleConsent = () => checkConsent();
    window.addEventListener("cookie-consent-updated", handleConsent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cookie-consent-updated", handleConsent);
    };
  }, []);

  if (!GA_ID || !hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {  // G-GBQPV7FHNW
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
```

### Krok 4: Dodaj do layout.tsx

**Plik:** `src/app/layout.tsx`

Dodaj import i komponent:

```tsx
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
```

W `<body>`, dodaj `<GoogleAnalytics />` na samej górze:

```tsx
<body className={...}>
  <GoogleAnalytics />
  <script type="application/ld+json" ... />
  {children}
  <CookieBanner />
  <ScrollToTop />
  <ChatWidget />
</body>
```

---

## ZADANIE 2: Podłącz CookieBanner do GA4 (10 min)

**Plik:** `src/components/legal/CookieBanner.tsx`

Cookie Banner zapisuje consent do localStorage ale nie emituje eventu. GA4 komponent nasłuchuje, ale potrzebuje powiadomienia.

### Zmiana w CookieBanner.tsx

W funkcji `saveConsent`, po `localStorage.setItem(...)`, dodaj:

```typescript
const saveConsent = (prefs: CookiePreferences) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  // Powiadom GA4 komponent o zmianie zgody
  window.dispatchEvent(new Event("cookie-consent-updated"));
  setShowBanner(false);
};
```

To jedyna zmiana — reszta CookieBanner zostaje bez zmian.

---

## ZADANIE 3: Event tracking na kluczowych CTA (20 min)

Wszystkie CTA na stronie używają komponentu `Button` z `src/components/ui/Button.tsx`. Wystarczy dodać tracking do JEDNEGO komponentu.

### Stwórz helper do trackingu

**Plik:** `src/lib/analytics.ts` (NOWY)

```typescript
type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// Declare gtag on window
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
```

### Dodaj tracking do Button.tsx

**Plik:** `src/components/ui/Button.tsx`

Zmień Button na client component i dodaj onClick tracking:

```tsx
"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center justify-center px-9 py-4 bg-accent text-white font-sans font-semibold text-base rounded-lg hover:bg-accent-hover hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.3)] transition-all duration-200",
  secondary:
    "inline-flex items-center justify-center px-8 py-3.5 border-2 border-border text-text font-sans font-medium text-base rounded-lg hover:border-accent hover:text-accent transition-all duration-200",
  text: "inline-flex items-center gap-1.5 font-sans font-medium text-base text-text-secondary hover:text-accent transition-colors duration-200 group",
};

function getEventName(href: string): string | null {
  if (href.includes("cal.com")) return "cta_book_meeting";
  if (href.startsWith("mailto:")) return "cta_email";
  if (href.includes("#kalkulator") || href.includes("#roi-calculator")) return "cta_calculator";
  if (href.includes("#wyniki")) return "cta_see_results";
  return null;
}

function getEventParams(href: string, variant: ButtonVariant) {
  const page = typeof window !== "undefined" ? window.location.pathname : "";
  return {
    button_variant: variant,
    button_url: href,
    page_location: page,
  };
}

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const cls = `${variants[variant]} ${className}`;

  const handleClick = () => {
    const eventName = getEventName(href);
    if (eventName) {
      trackEvent(eventName, getEventParams(href, variant));
    }
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={handleClick}
      >
        {children}
        {variant === "text" && (
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={handleClick}>
      {children}
      {variant === "text" && (
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </Link>
  );
}
```

### Jakie eventy to generuje

| Event name | Trigger | Opis |
|-----------|---------|------|
| `cta_book_meeting` | Kliknięcie CTA z linkiem do cal.com | **Główna konwersja** — umówienie spotkania |
| `cta_email` | Kliknięcie mailto: link | Kontakt mailowy |
| `cta_calculator` | Kliknięcie "Oblicz oszczędności" / scroll do kalkulatora | Zaangażowanie z ROI kalkulatorem |
| `cta_see_results` | Kliknięcie "Zobacz wyniki" | Scroll do social proof |

**Każdy event zawiera:** `button_variant`, `button_url`, `page_location` — dzięki temu wiesz KTÓRY przycisk na KTÓREJ stronie został kliknięty.

---

## ZADANIE 4: ChatWidget tracking (5 min)

**Plik:** `src/components/chat/ChatWidget.tsx`

Na początku pliku dodaj import:

```tsx
import { trackEvent } from "@/lib/analytics";
```

Dodaj tracking w kluczowych momentach:

1. **Otwarcie chatu** — w funkcji/handler która otwiera widget:
```tsx
trackEvent("chat_opened", { page_location: window.location.pathname });
```

2. **Wysłanie wiadomości** — w funkcji wysyłania:
```tsx
trackEvent("chat_message_sent", { page_location: window.location.pathname });
```

**UWAGA:** Sprawdź aktualną strukturę ChatWidget.tsx i dodaj te 2 linie w odpowiednich miejscach. Nie zmieniam tu logiki — tylko dodaję tracking.

---

## ZADANIE 5: ROI Calculator tracking (5 min)

**Plik:** `src/components/ui/ROICalculator.tsx` (homepage) + per-product ROI calculators

Dodaj import i tracking na:

1. **Kliknięcie "Oblicz"** (jeśli jest taki przycisk):
```tsx
trackEvent("roi_calculated", {
  page_location: window.location.pathname,
  // opcjonalnie: wartość którą user wpisał
});
```

2. **CTA po obliczeniu** — jest już obsłużone przez Button.tsx (jeśli używa `<Button href={CALENDLY_URL}>`).

---

## ZADANIE 6: Oznacz konwersje w GA4 (5 min — Bartek w GA4 UI)

**To robi Bartek w panelu GA4, nie w kodzie.**

1. Otwórz GA4 → Admin → Events
2. Poczekaj aż pojawią się eventy (może to zająć 24-48h po deploy)
3. Przy evencie `cta_book_meeting` → kliknij toggle "Mark as conversion"
4. Opcjonalnie: oznacz też `chat_message_sent` i `cta_email` jako konwersje

---

## ~~ZADANIE 7: Google Search Console~~ — JUŻ ZROBIONE

Search Console jest już podpięty i połączony z GA4 (zweryfikowane 25.02.2026). **Pomiń to zadanie.**

---

## ZADANIE 8: UTM template dla kampanii (5 min — dokument, nie kod)

**Plik:** `docs/UTM-CONVENTIONS.md` (NOWY)

```markdown
# UTM Conventions — LessManual

## Format
Lowercase, underscores, bez spacji.

## Cold Email
?utm_source=instantly&utm_medium=cold_email&utm_campaign=[nazwa_kampanii]&utm_content=[wariant]

Przykład:
https://lessmanual.ai/oferta/ai-sdr?utm_source=instantly&utm_medium=cold_email&utm_campaign=wiperapp_itad&utm_content=v1

## LinkedIn Posts
?utm_source=linkedin&utm_medium=organic_social&utm_campaign=[temat]

## Newsletter
?utm_source=newsletter&utm_medium=email&utm_campaign=[numer_wydania]

## Direct/Outbound
?utm_source=direct&utm_medium=outbound&utm_campaign=[klient]

## Blog
Linki wewnętrzne z bloga NIE potrzebują UTM (GA4 śledzi ścieżkę automatycznie).
```

**WAŻNE:** Od teraz KAŻDY link w cold emailach, postach social media i newsletterze MUSI mieć UTM parametry. GA4 je automatycznie rozpoznaje — nie trzeba nic więcej kodować.

---

## ZADANIE 9: Blog page tracking (5 min)

GA4 automatycznie śledzi pageviews. Ale dodajmy scroll depth na blogach.

**Plik:** `src/app/blog/[slug]/page.tsx`

W GA4 Enhanced Measurement (domyślnie włączone) jest już:
- Page views ✅
- Scrolls (90% scroll) ✅
- Outbound clicks ✅

Nie trzeba nic dodawać w kodzie — GA4 Enhanced Measurement robi to automatycznie.

**Opcjonalnie:** jeśli chcesz śledzić czas czytania, dodaj custom event, ale to nice-to-have na później.

---

## CHECKLIST WALIDACJI

Po wdrożeniu sprawdź:

### Deploy + 24h czekania na dane

- [ ] `.env.local` ma `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- [ ] `npm run build` przechodzi bez błędów
- [ ] Deploy na Vercel/produkcję

### Weryfikacja w GA4 (po deploy)

- [ ] GA4 → Realtime → otwórz lessmanual.ai w nowym oknie incognito → kliknij "Akceptuj wszystkie" w cookie banner → powinien pojawić się user w Realtime
- [ ] GA4 → Realtime → kliknij CTA "Umów rozmowę" → event `cta_book_meeting` powinien się pojawić
- [ ] GA4 → DebugView (włącz preview mode w Chrome extension "GA Debugger") → sprawdź czy eventy lecą poprawnie
- [ ] Bez zgody cookies → GA4 NIE powinno się ładować (privacy compliance)
- [ ] Search Console → sprawdź czy domena jest zweryfikowana
- [ ] Otwórz stronę z `?utm_source=test&utm_medium=test` → w GA4 Realtime → Traffic Source powinno pokazywać "test"

### Co powinieneś widzieć po tygodniu

- [ ] GA4 → Acquisition → skąd przychodzi ruch (organic, direct, cold email via UTM)
- [ ] GA4 → Events → `cta_book_meeting` clicks per page
- [ ] GA4 → Pages → które strony mają najwięcej odwiedzin
- [ ] Search Console → na jakie frazy rankujesz, ile impressions, CTR

---

## PLIKI DO EDYCJI/UTWORZENIA (summary)

| Plik | Zmiana |
|------|--------|
| `.env.local` | Dodaj `NEXT_PUBLIC_GA_ID=G-GBQPV7FHNW` |
| `src/components/analytics/GoogleAnalytics.tsx` | **NOWY** — GA4 script z consent integration |
| `src/lib/analytics.ts` | **NOWY** — helper trackEvent + gtag types |
| `src/app/layout.tsx` | + `<GoogleAnalytics />` |
| `src/components/legal/CookieBanner.tsx` | + `dispatchEvent` w saveConsent |
| `src/components/ui/Button.tsx` | + `"use client"` + onClick tracking na CTA |
| `src/components/chat/ChatWidget.tsx` | + trackEvent na open/send |
| `docs/UTM-CONVENTIONS.md` | **NOWY** — konwencje UTM dla wszystkich kanałów |

---

## DANE OD BARTKA (gotowe)

- **GA4 Measurement ID:** `G-GBQPV7FHNW`
- **Search Console:** już podpięty i połączony z GA4 ✅

CTO ma wszystko co potrzeba — może zaczynać od razu.

---

## COTYGODNIOWY PRZEGLĄD (po wdrożeniu)

Co piątek/sobotę — 10 min:

1. Otwórz GA4 → Acquisition overview → skąd ruch
2. Sprawdź: ile `cta_book_meeting` clicks w tym tygodniu (i z których stron)
3. Sprawdź: top 5 stron po odwiedzinach
4. Sprawdź: Search Console → nowe frazy, pozycje
5. Jeśli cold email campaign active → sprawdź UTM source `instantly` → ile ruchu z maili

**Format raportu (do daily_log.md):**
```
## Analytics Weekly [DATA]
- Visitors: [X]
- Top pages: [lista]
- CTA clicks (book meeting): [X]
- Top traffic source: [source]
- New search queries: [lista]
```
