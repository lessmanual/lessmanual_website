# PLAN: AI SEO — optymalizacja pod AI search

> **Data:** 2026-02-25
> **Autor audytu:** CMO
> **Wykonawca:** CTO
> **Repo:** lessmanual-website (Next.js 16, App Router)
> **Branch:** `feat/ai-seo`

---

## KONTEKST

Audit AI SEO wykazał:
- **AI visibility = ZERO** — LessManual nie pojawia się w żadnych AI answers (ChatGPT, Perplexity, Google AI Overviews)
- **Schema markup = minimalny** — basic `Service` i `ProfessionalService`, brak FAQPage, BlogPosting, Offer
- **llms.txt = nieaktualne** — 3 błędy cenowe/metryczne
- **robots.txt = brak w public/** — istnieje tylko runtime (Next.js generated), brak explicit AI bot rules
- **Content extractability = słaba** — brak definition blocks, brak author attribution, brak dat

Celem jest zwiększenie citation rate w AI search o 30-40% (benchmark Princeton GEO study).

---

## ZADANIE 1: Napraw llms.txt (5 min)

**Plik:** `public/llms.txt`

**3 zmiany:**
1. Linia 16: `od 750 PLN za spotkanie` → `od 500 PLN za spotkanie`
2. Linia 9: `76% open rate` → `77% open rate`
3. Linia 46: `10+ firm B2B obsluzonych` → `11 firm B2B obsluzonych, 13 wdrozen`

---

## ZADANIE 2: Dodaj robots.txt z explicit AI bot rules (5 min)

**Plik:** `public/robots.txt`

**Treść:**
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

# AI Search Bots — explicitly allowed
User-Agent: GPTBot
Allow: /

User-Agent: ChatGPT-User
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: ClaudeBot
Allow: /

User-Agent: anthropic-ai
Allow: /

User-Agent: Google-Extended
Allow: /

User-Agent: Bingbot
Allow: /

# Block training-only crawlers
User-Agent: CCBot
Disallow: /

User-Agent: Google-Safety
Disallow: /

Sitemap: https://lessmanual.ai/sitemap.xml
```

**UWAGA:** Next.js App Router może generować robots.txt z `app/robots.ts`. Sprawdź czy istnieje `src/app/robots.ts` — jeśli tak, edytuj TEN plik zamiast tworzyć `public/robots.txt`. Jeśli nie istnieje — stwórz `public/robots.txt`.

---

## ZADANIE 3: FAQPage schema na wszystkich 5 stronach (30 min)

Każda strona ma już sekcję FAQ z danymi w constants. Trzeba dodać `FAQPage` JSON-LD schema obok istniejącego `Service` schema.

### Architektura

Stwórz helper function w `src/lib/schema.ts`:

```typescript
type FAQItem = { q: string; a: string };
type FAQCategory = { category: string; items: FAQItem[] };

export function generateFAQSchema(faqItems: FAQCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };
}
```

### Gdzie dodać

Każda page.tsx ma już `<script type="application/ld+json">`. Dodaj DRUGI script tag z FAQPage schema.

| Strona | Plik page.tsx | FAQ data import |
|--------|--------------|-----------------|
| Homepage | `src/app/page.tsx` | `FAQ_ITEMS` z `src/lib/constants.ts` |
| AI SDR | `src/app/oferta/ai-sdr/page.tsx` | `AI_SDR_FAQ_ITEMS` z `src/lib/ai-sdr-constants.ts` |
| Generator Ofert | `src/app/oferta/generator-ofert/page.tsx` | `GEN_OFERT_FAQ_ITEMS` z `src/lib/generator-ofert-constants.ts` |
| Obsługa Klienta | `src/app/oferta/obsluga-klienta/page.tsx` | `OBS_KLIENTA_FAQ_ITEMS` z `src/lib/obsluga-klienta-constants.ts` |
| SEO Content | `src/app/oferta/seo-content/page.tsx` | `SEO_FAQ_ITEMS` z `src/lib/seo-content-constants.ts` |

### Wzorzec per page.tsx

```tsx
import { generateFAQSchema } from "@/lib/schema";
import { AI_SDR_FAQ_ITEMS } from "@/lib/ai-sdr-constants";

const jsonLd = { /* existing Service schema */ };
const faqSchema = generateFAQSchema(AI_SDR_FAQ_ITEMS);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* rest of page */}
    </>
  );
}
```

---

## ZADANIE 4: BlogPosting schema na blog posts (20 min)

**Plik:** `src/app/blog/[slug]/page.tsx`

Blog posts pobierają dane z Supabase (`BlogPost` type w `src/lib/supabase.ts`). Dodaj `BlogPosting` JSON-LD generowany dynamicznie z danych posta.

### Schema do dodania

```typescript
function generateBlogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title_pl,
    description: post.meta_description_pl || post.description_pl,
    image: post.featured_image || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    wordCount: post.word_count || undefined,
    author: {
      "@type": "Person",
      name: "Bartłomiej Chudzik",
      url: "https://lessmanual.ai",
      jobTitle: "Founder & CTO",
    },
    publisher: {
      "@type": "Organization",
      name: "LessManual.ai",
      url: "https://lessmanual.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lessmanual.ai/blog/${post.slug}`,
    },
    keywords: [
      post.primary_keyword,
      ...(post.secondary_keywords || []),
    ].filter(Boolean),
  };
}
```

Dodaj tę funkcję do `src/lib/schema.ts` i użyj w `src/app/blog/[slug]/page.tsx`:

```tsx
import { generateBlogPostSchema } from "@/lib/schema";

// W komponencie, po pobraniu posta:
const blogSchema = generateBlogPostSchema(post);

return (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
    {/* rest of blog post */}
  </>
);
```

---

## ZADANIE 5: Offer schema z pricing na product pages (20 min)

Dodaj `Offer` do istniejącego `Service` JSON-LD na każdej product page.

### Rozszerz istniejące jsonLd

| Strona | Offer data |
|--------|-----------|
| AI SDR | `priceCurrency: "PLN"`, `price: "500"`, `priceSpecification: "od 500 PLN za spotkanie"` |
| SEO Content | `price: "1000"`, `priceSpecification: "od 1,000 PLN/mies"` |
| Obsługa Klienta | `price: "900"`, `priceSpecification: "od 900 PLN/mies"` |
| Generator Ofert | `price: "4000"`, `priceSpecification: "setup od 4,000 PLN"` |

### Wzorzec — rozszerz istniejący `jsonLd` object

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI SDR - Pay-Per-Meeting",
  description: "System AI umawiający kwalifikowane spotkania B2B...",
  provider: {
    "@type": "Organization",
    name: "LessManual.ai",
    url: "https://lessmanual.ai",
  },
  areaServed: "PL",
  serviceType: "AI Sales Development",
  // DODAJ TO:
  offers: {
    "@type": "Offer",
    priceCurrency: "PLN",
    price: "500",
    description: "od 500 PLN za spotkanie. Model pay-per-meeting — płacisz tylko za spotkania które się odbędą.",
    availability: "https://schema.org/InStock",
  },
  // DODAJ TO:
  review: {
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Organization",
      name: "Google Reviews",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
    bestRating: "5",
  },
};
```

Zrób to samo dla pozostałych 3 product pages z odpowiednimi cenami.

---

## ZADANIE 6: Definition blocks — self-contained opisy (15 min)

AI systemy extractują fragmenty, nie całe strony. Każda product page potrzebuje 2-3 zdaniowego "definition block" na samej górze — widocznego w HTML, optymalnego do AI extraction (40-60 słów).

### Implementacja

Dodaj nowy komponent `src/components/ui/DefinitionBlock.tsx`:

```tsx
export function DefinitionBlock({ text }: { text: string }) {
  return (
    <div className="sr-only" aria-hidden="false">
      <p>{text}</p>
    </div>
  );
}
```

**UWAGA:** Użyj `sr-only` (screen-reader only) — tekst jest w HTML/DOM dla AI crawlerów ale nie zmienia visual designu. Alternatywnie: dodaj jako meta description w `<head>` — ale to już jest (metadata.description). Lepsze rozwiązanie: dodaj jako widoczny tekst pod hero headline, stylowany jako subheadline/lead paragraph.

### Definicje per strona

Dodaj na każdej product page jako widoczny lead paragraph pod hero:

| Strona | Definition block (40-60 słów) |
|--------|------------------------------|
| **Homepage** | `LessManual.ai to polska agencja automatyzacji AI dla firm B2B. Budujemy done-for-you systemy: AI SDR (umawianie spotkań), SEO Content (blog na autopilocie), Obsługa Klienta AI (chatbot 24/7) i Generator Ofert (wycena w 5 minut). 11 firm obsłużonych, 13 wdrożeń, 5.0 na Google. Gwarancja wyników lub zwrot kosztów.` |
| **AI SDR** | `AI SDR od LessManual to system pay-per-meeting do umawiania spotkań B2B. AI znajduje idealnych klientów, pisze spersonalizowane cold maile i umawia potwierdzone spotkania z decydentami. 77% open rate, deal w 6 dni. Płacisz od 500 PLN za spotkanie — zero stałych opłat. Gwarancja: 0 spotkań w 45 dni = zwrot setup.` |
| **SEO Content** | `SEO Content od LessManual to done-for-you system produkcji artykułów SEO. AI generuje 10-30 artykułów miesięcznie z keyword research, klastry tematyczne i internal linking. Twoja akceptacja przed publikacją. Od 83 PLN za artykuł. Wzrost ruchu organicznego +150-400% w 6 miesięcy.` |
| **Obsługa Klienta** | `Obsługa Klienta AI od LessManual to chatbot i voiceagent wytrenowany na bazie wiedzy Twojej firmy. Odpowiada na 60-80% zapytań automatycznie w 30 sekund, 24/7. Integracja z CRM, auto-sortowanie maili, lead capture. Od 900 PLN/mies. Wdrożenie w 7 dni.` |
| **Generator Ofert** | `Generator Ofert AI od LessManual to system automatycznego tworzenia wycen i ofert. Klient sam wycenia na stronie lub w chacie wycenowym — system generuje profesjonalny PDF i wysyła mailem. Oszczędność 96% czasu na ofertowaniu. Wdrożenie w 7-14 dni.` |

### Gdzie w kodzie

Każda product page ma komponent `Hero`. Dodaj definition block jako pierwszy element `<main>`, PRZED Hero, albo jako prop do Hero który renderuje lead paragraph pod headline.

Sprawdź aktualny Hero per product:
- `src/components/sections/ai-sdr/Hero.tsx`
- `src/components/sections/seo-content/Hero.tsx`
- `src/components/sections/obsluga-klienta/Hero.tsx`
- `src/components/sections/generator-ofert/Hero.tsx`
- `src/components/sections/Hero.tsx` (homepage)

Dodaj widoczny lead paragraph (`text-lg text-text-secondary`) pod headline, nad CTA. NIE `sr-only` — Google penalizuje hidden text. Zrób to widoczne i ładne.

---

## ZADANIE 7: Author attribution + "Last updated" (10 min)

### Blog posts

W `src/app/blog/[slug]/page.tsx` — dodaj pod tytułem:
```
Bartłomiej Chudzik · Founder & CTO, LessManual.ai
Opublikowano: [data] · Zaktualizowano: [data]
```

Te dane już są w `BlogPost` type (`author`, `published_at`, `updated_at`). Wystarczy je wyrenderować.

### Product pages

Na dole każdej product page (przed Footer) dodaj:
```
Ostatnia aktualizacja: luty 2026
```

Może być jako part of Footer lub osobny mały element. Ważne żeby było w DOM.

---

## CHECKLIST WALIDACJI

Po wdrożeniu sprawdź:

- [ ] `https://lessmanual.ai/robots.txt` — zwraca nowy robots.txt z AI bot rules
- [ ] `https://lessmanual.ai/llms.txt` — ma 500 PLN, 77%, 11 firm
- [ ] Google Rich Results Test (`https://search.google.com/test/rich-results`) — wklej URL każdej strony:
  - [ ] Homepage — `ProfessionalService` + `FAQPage`
  - [ ] /oferta/ai-sdr — `Service` + `Offer` + `FAQPage` + `AggregateRating`
  - [ ] /oferta/seo-content — `Service` + `Offer` + `FAQPage`
  - [ ] /oferta/obsluga-klienta — `Service` + `Offer` + `FAQPage`
  - [ ] /oferta/generator-ofert — `Service` + `Offer` + `FAQPage`
  - [ ] /blog/[any-post] — `BlogPosting` z author i dates
- [ ] Definition blocks widoczne na każdej stronie (nie hidden)
- [ ] "Ostatnia aktualizacja" widoczne na product pages
- [ ] Author attribution na blog posts
- [ ] `npm run build` przechodzi bez błędów

---

## PLIKI DO EDYCJI (summary)

| Plik | Zmiana |
|------|--------|
| `public/llms.txt` | 3 poprawki cenowe |
| `public/robots.txt` LUB `src/app/robots.ts` | Nowy plik z AI bot rules |
| `src/lib/schema.ts` | **NOWY** — helper functions (generateFAQSchema, generateBlogPostSchema) |
| `src/app/page.tsx` | + FAQPage schema, + definition block |
| `src/app/oferta/ai-sdr/page.tsx` | + FAQPage schema, + Offer w Service, + AggregateRating |
| `src/app/oferta/seo-content/page.tsx` | + FAQPage schema, + Offer w Service |
| `src/app/oferta/obsluga-klienta/page.tsx` | + FAQPage schema, + Offer w Service |
| `src/app/oferta/generator-ofert/page.tsx` | + FAQPage schema, + Offer w Service |
| `src/app/blog/[slug]/page.tsx` | + BlogPosting schema, + author attribution, + dates |
| `src/components/sections/Hero.tsx` | + definition block (lead paragraph) |
| `src/components/sections/ai-sdr/Hero.tsx` | + definition block |
| `src/components/sections/seo-content/Hero.tsx` | + definition block |
| `src/components/sections/obsluga-klienta/Hero.tsx` | + definition block |
| `src/components/sections/generator-ofert/Hero.tsx` | + definition block |
| Product pages (before Footer) | + "Ostatnia aktualizacja: luty 2026" |
