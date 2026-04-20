# PRD: Newsletter AI z Audio — "AI Insider"

> **Data:** 2026-02-26
> **Autor:** CEO/CMO
> **Wykonawca:** CTO
> **Stack:** n8n + Claude API + ElevenLabs + Google Drive + MailerLite
> **Decyzja:** decyzje.md (2026-02-26)

---

## KONTEKST

Standardowe lead magnety (PDF, quiz, kalkulator) nie wyróżniają się. Bartek chce lead magnet który:
1. UDOWADNIA skille (meta: AI newsletter zrobiony przez AI)
2. Daje realną wartość (nie jednorazowy download)
3. Buduje relację (recurring touchpoint 2x/tyg)
4. Zbiera maile do bazy
5. Pozycjonuje Bartka jako THE AI guy w polskim B2B

**Decyzja:** Newsletter AI 1x/tyg (środa 7:30) z audio MP3 — nikt tego nie robi w Polsce.
**Filozofia:** AIHuman — AI robi research, Bartek daje kontekst i doświadczenia praktyka (13+ wdrożeń).
**Grupa docelowa:** Właściciele i CEO firm B2B (bez limitu wielkości).
**Stack wysyłki:** MailerLite (free tier 500 subów, node w n8n).

---

## PRODUKT

### Co dostaje subskrybent

**Email 1x/tyg (środa 7:30 CET):**
- 4 kategorie: Biznes, Narzędzia, Trendy, Praktyka
- Każda kategoria: 2-3 newsy × 2-3 zdania
- Link do MP3 (5-7 min, polski lektor AI)
- PS od Bartka (osobisty komentarz + insajdy z wdrożeń)
- Każdy numer redagowany osobiście przez Bartka (AI zbiera dane, Bartek daje kontekst)
- Co 3-4 wydanie: mini case study / co wdrożyliśmy

**Audio MP3:**
- 5-7 minut
- Polski lektor (ElevenLabs)
- Hosted na Google Drive (publiczny link)
- Format nazwy: `newsletter-ai-YYYY-MM-DD.mp3`
- "Podcast dla ludzi którzy nie mają czasu na podcasty"

### Format emaila

```
Temat: AI Insider #[NR] — [główny news tygodnia]

🎧 Posłuchaj (X min): [link do MP3]

---

BIZNES
• [news 1 — 2-3 zdania, link do źródła]
• [news 2 — 2-3 zdania, link do źródła]

NARZĘDZIA
• [news 3 — 2-3 zdania, link do źródła]
• [news 4 — 2-3 zdania, link do źródła]

TRENDY
• [news 5 — 2-3 zdania, link do źródła]

PRAKTYKA
• [tip tygodnia — 3-4 zdania, konkretne narzędzie/krok do wdrożenia]

---

PS. [osobisty komentarz Bartka — 2-3 zdania]

---
Bartłomiej Chudzik
LessManual.ai — Systemy AI dla firm B2B
[link do strony] | [link do LinkedIn]

Nie chcesz więcej? [unsubscribe link]
```

---

## ARCHITEKTURA n8n

### Overview

```
WORKFLOW 1: Data Collection (codziennie 6:00)
    → zbiera surowe dane ze wszystkich źródeł
    → zapisuje do Supabase: raw_newsletter_data

WORKFLOW 2: Newsletter Generator (wt + pt 7:00)
    → czyta surowe dane z ostatnich 3-4 dni
    → AI agenci filtrują i kategoryzują
    → Ghost redaguje
    → ElevenLabs generuje MP3
    → Upload MP3 do Google Drive
    → Email do Bartka (review)

WORKFLOW 3: Newsletter Sender (manual trigger po review Bartka)
    → MailerLite API → wysyłka do listy
```

### WORKFLOW 1: Data Collection

**Trigger:** Schedule — codziennie 6:00 CET

**Sub-workflows (równoległe):**

#### Sub-workflow 1A: RSS Collector

Nody: Schedule Trigger → RSS Read (loop) → Merge → Supabase Insert

**Feedy do skonfigurowania:**

```
# TIER 1 — Firmy AI (najważniejsze)
https://openai.com/news/rss.xml
https://blog.google/technology/ai/rss/
https://blogs.microsoft.com/ai/feed/
https://huggingface.co/blog/feed.xml
https://raw.githubusercontent.com/taobojlen/anthropic-rss-feed/main/anthropic_news_rss.xml

# TIER 2 — Media tech
https://techcrunch.com/category/artificial-intelligence/feed/
https://venturebeat.com/category/ai/feed/
https://www.technologyreview.com/topic/artificial-intelligence/feed/
https://www.theverge.com/rss/ai-artificial-intelligence/index.xml

# TIER 3 — Newslettery (beehiiv/substack)
https://bensbites.beehiiv.com/feed
https://importai.substack.com/feed
https://www.ai-supremacy.com/feed
https://news.futuretools.io/feed

# TIER 4 — Reddit (top/day)
https://www.reddit.com/r/MachineLearning/top/.rss?t=day
https://www.reddit.com/r/artificial/top/.rss?t=day
https://www.reddit.com/r/LocalLLaMA/top/.rss?t=day

# TIER 5 — Polskie
https://www.spidersweb.pl/feed
https://antyweb.pl/feed/

# TIER 6 — YouTube (channel RSS)
# Matt Wolfe: https://www.youtube.com/feeds/videos.xml?channel_id=UCQMFIaFmERudKMElnBai71A
# Fireship: https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA
# AI Explained: dodaj channel_id po sprawdzeniu
```

#### Sub-workflow 1B: Email Newsletter Parser

Nody: IMAP Trigger (dedicated inbox) → HTML Extract → Supabase Insert

**Setup:**
1. Stwórz dedykowane konto email (np. `newsletters@lessmanual.ai`)
2. Subskrybuj: The Neuron, TLDR AI, The Batch (Andrew Ng), inne bez RSS
3. n8n IMAP trigger parsuje przychodzące maile
4. HTML → text extraction → zapis do Supabase

#### Sub-workflow 1C: Scraper (non-RSS)

Nody: HTTP Request → HTML Extract → Supabase Insert

**Źródła:**
- FutureTools.io/news — HTTP GET + CSS selectors (Webflow)
- There's An AI For That — HTTP GET + parse (lub Apify)
- X/Twitter — Apify Twitter scraper (top AI accounts, masz już)

### Supabase Schema

```sql
-- Tabela surowych danych
CREATE TABLE raw_newsletter_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source TEXT NOT NULL,           -- 'rss', 'reddit', 'email', 'scraper', 'twitter', 'youtube'
    source_name TEXT NOT NULL,      -- 'openai_blog', 'r/MachineLearning', 'bens_bites', etc.
    title TEXT NOT NULL,
    url TEXT,
    content TEXT,                   -- summary/excerpt
    published_at TIMESTAMPTZ,
    collected_at TIMESTAMPTZ DEFAULT NOW(),
    used_in_newsletter BOOLEAN DEFAULT FALSE,
    score SMALLINT,                 -- 1-10, set by scoring agent
    category TEXT,                  -- 'biznes', 'narzedzia', 'trendy', 'praktyka'
    UNIQUE(url)                     -- deduplikacja po URL
);

-- Tabela wydań newslettera
CREATE TABLE newsletter_issues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    issue_number INTEGER NOT NULL,
    published_at TIMESTAMPTZ,
    subject TEXT,
    body_html TEXT,
    body_text TEXT,
    mp3_url TEXT,                   -- Google Drive link
    status TEXT DEFAULT 'draft',    -- 'draft', 'review', 'approved', 'sent'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela subskrybentów
CREATE TABLE newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    source TEXT,                    -- 'landing_page', 'ad', 'linkedin', 'organic'
    status TEXT DEFAULT 'active'    -- 'active', 'unsubscribed', 'bounced'
);
```

---

### WORKFLOW 2: Newsletter Generator

**Trigger:** Schedule — wtorek 7:00 CET (dzień przed wysyłką, czas na review Bartka)

**Flow:**

```
1. Supabase Query
   → SELECT * FROM raw_newsletter_data
   → WHERE collected_at > NOW() - INTERVAL '4 days'
   → AND used_in_newsletter = FALSE
   → ORDER BY published_at DESC
   → LIMIT 100

2. AI Agent: SCORING + DEDUPLIKACJA
   Model: Claude Haiku (tani)
   System prompt:
   """
   Jesteś kuratorem newslettera AI dla polskich firm B2B.
   Oceń każdy news 1-10 (relevance dla CEO firmy B2B w Polsce).
   Odrzuć: duplikaty, clickbait, czysto akademickie bez biznes impactu.
   Zostaw TOP 15-20 newsów.
   """

3. RÓWNOLEGŁE Sub-workflows (Call Workflow node × 4):

   3A. Biznes Agent
       System prompt (CMO):
       """
       Wybierz 2-3 najważniejsze newsy z kategorii BIZNES.
       Biznes = wpływ AI na sprzedaż, marketing, operacje, przychody firm.
       Dla każdego: tytuł + 2-3 zdania podsumowania po polsku.
       Perspektywa: jak to wpływa na CEO firmy B2B (5-50 osób) w Polsce.
       """

   3B. Narzędzia Agent
       System prompt (CTO):
       """
       Wybierz 2-3 najważniejsze newsy z kategorii NARZĘDZIA.
       Narzędzia = nowe AI toole, update'y platform, API changes, porównania.
       Dla każdego: tytuł + 2-3 zdania + link.
       Perspektywa: co jest praktycznie użyteczne dla firmy B2B.
       """

   3C. Trendy Agent
       System prompt (CEO):
       """
       Wybierz 1-2 najważniejsze newsy z kategorii TRENDY.
       Trendy = raporty, prognozy, strategiczne zmiany w branży AI.
       Dla każdego: tytuł + 2-3 zdania + dlaczego to ważne.
       Perspektywa: co to oznacza dla polskiego rynku B2B w najbliższych 6 miesiącach.
       """

   3D. Praktyka Agent
       System prompt:
       """
       Wybierz 1 tip tygodnia z kategorii PRAKTYKA.
       Praktyka = konkretna rzecz do wdrożenia w firmie B2B.
       Format: problem → narzędzie → 2-3 kroki → efekt.
       Musi być actionable w <1h. Podaj konkretne narzędzia (n8n, Claude, Zapier, etc.)
       """

4. Merge Results (4 kategorie → 1 JSON)

5. AI Agent: GHOST (redakcja finalna)
   Model: Claude Sonnet
   System prompt:
   """
   Jesteś Bartkiem Chudzikiem — founder LessManual.ai.
   Styl: bezpośredni, konkretny, zero corporate bullshitu.
   Krótkie zdania. Konkretne liczby. Casual-profesjonalny.

   Zadanie:
   1. Połącz wyniki 4 agentów w spójny newsletter
   2. Napisz temat emaila (max 60 znaków)
   3. Napisz PS od Bartka (osobisty komentarz, 2-3 zdania)
   4. Napisz skrypt do audio (5-7 min czytania, naturalny ton)
   5. Output: JSON z polami: subject, body_html, body_text, audio_script

   ZAKAZANE: "kluczowy", "istotny", "fundamentalny", "nie tylko X ale także Y"
   ZAKAZANE: emoji w treści (OK w temacie max 1)
   """

6. ElevenLabs API
   → Input: audio_script z kroku 5
   → Voice: polski lektor (np. Antoni lub custom clone)
   → Output: MP3

7. Google Drive Upload
   → Folder: "Newsletter AI"
   → Nazwa: newsletter-ai-YYYY-MM-DD.mp3
   → Set: public link

8. Supabase Insert (newsletter_issues)
   → status: 'review'

9. Email do Bartka (Gmail/MailerLite)
   → Subject: "[REVIEW] AI Insider #X — [temat]"
   → Body: pełna treść newslettera + link do MP3
   → CTA: "Odpowiedz OK żeby wysłać" lub link do approve endpoint
```

---

### WORKFLOW 3: Newsletter Sender

**Trigger:** Webhook (Bartek klika "approve" lub odpowiada na maila)

```
1. Supabase: UPDATE newsletter_issues SET status = 'approved'

2. Supabase: SELECT email FROM newsletter_subscribers WHERE status = 'active'

3. Loop: MailerLite API
   → Send email do każdego subskrybenta
   → Rate limit: 10/sec (MailerLite free tier)

4. Supabase: UPDATE newsletter_issues SET status = 'sent', published_at = NOW()

5. Supabase: UPDATE raw_newsletter_data SET used_in_newsletter = TRUE
   → WHERE id IN (użyte newsy)
```

---

## LANDING PAGE

**URL:** `lessmanual.ai/newsletter`

**Elementy:**
1. Headline: "AI w 5 minut — newsletter dla firm B2B"
2. Subheadline: "2x w tygodniu. Najważniejsze newsy AI + audio do słuchania w aucie."
3. Bullet points:
   - Biznes: jak AI zmienia sprzedaż i marketing B2B
   - Narzędzia: nowe toole które oszczędzają czas
   - Trendy: co się zmienia i co to znaczy dla Ciebie
   - Praktyka: 1 tip do wdrożenia w <1h
   - Audio: posłuchaj w aucie, na treningu, w kuchni
4. Form: Imię + Email → "Zapisz się za darmo" + RODO checkbox
5. Social proof: element autorytetu (Bartek + credentials) + "Dołącz do X firm B2B" (po uzbieraniu)
6. Preview: screenshot prawdziwego wydania (po zbudowaniu n8n workflows)

**CTO task:** Dodaj stronę `/newsletter` w Next.js + form zapisujący do Supabase `newsletter_subscribers`

### Brakujące elementy landing page (TODO)

**Social proof — element autorytetu:**
- [ ] Zdjęcie Bartka (okrągłe, ~80px) + "Bartek Chudzik — 13+ wdrożeń AI w polskich firmach B2B"
- [ ] Umieszczenie: pod formularzem w Hero lub osobna sekcja
- [ ] Gdy będą subskrybenci: "Dołącz do X właścicieli firm B2B"

**Preview newslettera:**
- [ ] Sekcja "Jak wygląda newsletter" — mockup/screenshot prawdziwego wydania
- [ ] Dodać PO zbudowaniu n8n workflows i wysłaniu pilotowych numerów
- [ ] Format: screenshoty emaila lub interaktywny preview

**Tekst prywatności pod formularzem:**
- [ ] Dodać: "Zero spamu. Wypisz się jednym klikiem."
- [ ] Dodać autocomplete="given-name" i autocomplete="email" na polach

### Thank You page

**URL:** `/newsletter/dziekujemy`

**Dostęp:** Redirect po udanym zapisie (zamiast inline success state w formularzu)

**Elementy:**
1. **Potwierdzenie** — "Jesteś na liście! Pierwszy numer wpadnie w środę o 7:30."
2. **Instrukcje** — "Sprawdź skrzynkę (również SPAM) — za chwilę dostaniesz welcome mail."
3. **Element autorytetu** — zdjęcie Bartka + krótkie "Cześć, tu Bartek. Dzięki za zaufanie."
4. **Next steps:**
   - "Obserwuj mnie na LinkedIn" (link)
   - "Sprawdź bloga" (link do /blog)
   - "Poleć newsletter znajomemu" (share buttons: LinkedIn, Email, kopiuj link)
5. **Conversion tracking** — Google Analytics event, MailerLite tracking
6. **Zabezpieczenie** — strona niedostępna bezpośrednio (redirect only)

### Welcome message (email)

**Trigger:** Natychmiast po zapisie (MailerLite automation lub n8n webhook)

**Treść welcome maila:**
```
Temat: Cześć [Imię] — dobrze, że jesteś 👋

Hej [Imię],

Tu Bartek z LessManual.ai.

Właśnie dołączyłeś do AI Insider — jedynego newslettera AI w Polsce
z wersją audio do słuchania.

CO DOSTAJESZ:
• Co środę o 7:30 — email z 8-10 najważniejszymi newsami AI
• Audio MP3 (5-7 min) — posłuchaj w aucie albo na treningu
• Tip tygodnia — 1 konkretna rzecz do wdrożenia w Twojej firmie

JAK TO DZIAŁA:
AI zbiera dane z 30+ źródeł. Ja wybieram co ważne i dodaję
kontekst z moich 13+ wdrożeń AI w firmach B2B.

Żadnego spamu. Żadnej ściemy. Tylko to, co realnie wpływa
na Twój biznes.

Najbliższy numer: w środę o 7:30.

Do zobaczenia,
Bartek

PS. Masz pytanie o AI w firmie? Odpowiedz na tego maila —
czytam wszystko osobiście.

---
Bartłomiej Chudzik
LessManual.ai — Systemy AI dla firm B2B
```

**Konfiguracja:**
- [ ] MailerLite: automation "Welcome email" → trigger: subscriber added
- [ ] Personalizacja: {name} w temacie i treści
- [ ] Reply-to: bartek@lessmanual.ai (lub kontakt@lessmanual.ai)
- [ ] Wysyłka: natychmiast po potwierdzeniu zapisu

---

## ŹRÓDŁA DANYCH — kompletna lista

### RSS (30+ feedów, 0 PLN)

**Firmy AI:**
- `https://openai.com/news/rss.xml`
- `https://blog.google/technology/ai/rss/`
- `https://blogs.microsoft.com/ai/feed/`
- `https://huggingface.co/blog/feed.xml`
- `https://raw.githubusercontent.com/taobojlen/anthropic-rss-feed/main/anthropic_news_rss.xml`

**Media:**
- `https://techcrunch.com/category/artificial-intelligence/feed/`
- `https://venturebeat.com/category/ai/feed/`
- `https://www.technologyreview.com/topic/artificial-intelligence/feed/`
- `https://www.theverge.com/rss/ai-artificial-intelligence/index.xml`

**Newslettery:**
- `https://bensbites.beehiiv.com/feed`
- `https://importai.substack.com/feed`
- `https://www.ai-supremacy.com/feed`
- `https://news.futuretools.io/feed`

**Reddit:**
- `https://www.reddit.com/r/MachineLearning/top/.rss?t=day`
- `https://www.reddit.com/r/artificial/top/.rss?t=day`
- `https://www.reddit.com/r/LocalLLaMA/top/.rss?t=day`

**Polskie:**
- `https://www.spidersweb.pl/feed`
- `https://antyweb.pl/feed/`

**YouTube:**
- Matt Wolfe: `https://www.youtube.com/feeds/videos.xml?channel_id=UCQMFIaFmERudKMElnBai71A`
- Fireship: `https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA`
- (dodaj więcej channel IDs po weryfikacji)

### Email-to-Webhook (IMAP)
- The Neuron
- TLDR AI
- The Batch (Andrew Ng)
- Inne newslettery z inbox Bartka

### HTTP Scraping
- FutureTools.io/news
- There's An AI For That (theresanaiforthat.com)

### API/Scraper (Apify, już skonfigurowane)
- X/Twitter (top AI accounts)
- YouTube transcripts (jeśli potrzebne)

---

## KOSZTY

| Komponent | Narzędzie | Koszt/mies |
|-----------|-----------|------------|
| Data collection | n8n (VPS) | 0 PLN |
| AI processing (4 agenci + Ghost) | Claude API (Haiku + Sonnet) | ~20-60 PLN ($5-15) |
| Audio generation | ElevenLabs Starter/Creator | ~20-90 PLN ($5-22) |
| Email sending | MailerLite free (1000 subów, 12k maili/mies) | 0 PLN |
| MP3 hosting | Google Drive | 0 PLN |
| Landing page | lessmanual.ai (już masz hosting) | 0 PLN |
| **RAZEM** | | **~40-150 PLN/mies** |

Przy 1000 PLN budżecie na ads → 850-960 PLN zostaje na cold traffic do landing page.

---

## TIMELINE

| Tydzień | Co zbudować | Kto |
|---------|-------------|-----|
| **W1** | Supabase schema + Workflow 1 (data collection) + RSS setup | CTO |
| **W1** | Landing page `/newsletter` + subscriber form | CTO |
| **W2** | Workflow 2 (AI agenci + Ghost + ElevenLabs + Drive) | CTO |
| **W2** | Workflow 3 (sender) + review flow | CTO |
| **W3** | Test: 2 pilotowe wydania (wysyłka do Bartka only) | CTO + Bartek review |
| **W3** | Poprawki po pilotach | CTO |
| **W4** | GO LIVE — pierwszy publiczny numer | CMO (promo) |

**MVP w 2 tygodnie. Pilot w 3. Live w 4.**

---

## METRYKI SUKCESU

| Metryka | Target (miesiąc 1) | Target (miesiąc 3) |
|---------|-------------------|-------------------|
| Subskrybenci | 100 | 500 |
| Open rate | >40% | >35% |
| Click rate (MP3) | >15% | >12% |
| Unsubscribe rate | <2% | <1.5% |
| Czas produkcji (per issue) | <30 min review | <15 min review |
| Koszt per subscriber | - | <2 PLN |

---

## WAŻNE ZASADY

1. **Bartek ZAWSZE reviewuje** przed wysyłką — nigdy auto-send
2. **MP3 jako link, nie attachment** — deliverability + tracking
3. **PS od Bartka = osobisty** — nie AI-generated, Bartek dopisuje sam
4. **Co 3-4 wydanie: bridge do sprzedaży** — mini case study, co wdrożyliśmy, ale naturalnie
5. **NDA** — nigdy nazwy klientów w newsletterze
6. **Anty-AI content rules** — tekst musi brzmieć jak człowiek, nie jak AI
7. **Unsubscribe** — obowiązkowy link, RODO compliant
8. **Reply-to = bartek@lessmanual.ai** — subskrybenci mogą odpowiadać na newsletter, odpowiedzi trafiają do Bartka. PS z personalnym CTA ("napisz mi") otwiera 1:1 rozmowy sprzedażowe

---

## PRZYSZŁE ROZSZERZENIA (nie teraz)

- [ ] Sponsorzy (dodatkowy revenue po 1000+ subów)
- [ ] Segmentacja (branża → personalized content)
- [ ] Web archive (lessmanual.ai/newsletter/archive)
- [ ] Referral program ("Poleć 3 osoby → dostaniesz X")
- [ ] Mini apka "AI Score" jako viral spike dla listy
- [ ] Automatyczny approve flow (Bartek klika link w mailu → wysyłka)
