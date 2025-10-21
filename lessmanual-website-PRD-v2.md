# LessManual.ai - Website PRD v2.0 (FINAL)

**Version:** 2.1 (Lean MVP + Figma Clarification)
**Date:** 2025-10-21
**Owner:** CTO (Bartłomiej Chudzik)
**Launch Target:** November 1, 2025 (12 days)
**Status:** 🟢 APPROVED - Ready for Development

---

## ⚠️ DESIGN SOURCE CLARIFICATION

**Figma UI Kit = Template/Inspiration (NOT Final Design)**

The extracted Figma file (AI Startup Website UI Kit - `https://figma.com/design/GXkT1CuWpTwUTjTBQtXA4J`) is a **design template** that provides:

✅ **What we USE from UI Kit:**
- Layout structure (Hero, Bento Grid, Features, Pricing sections arrangement)
- Component patterns (Navigation, Cards, CTAs, Footer structure)
- Spacing & proportions (section padding, component sizes, gaps)
- Animation concepts (parallax, fade-ins, hover effects, 3D card effects)

❌ **What we REPLACE with LessManual brand:**
- **Colors:** Purple theme (`#9855ff`, `#8c45ff`) → LessManual colors (night `#0C0D0A`, pear `#DDE000`, tekhelet `#5716A2`)
- **Content:** Generic "Boost your rankings with AI" → LessManual messaging ("Make Your Business LESSMANUAL")
- **Typography:** Adapt Inter font sizing to match LessManual hierarchy
- **Imagery:** Template mockups → LessManual product screenshots (when available)

**Implementation approach:**
1. Extract UI Kit structure via Figma MCP (layout, spacing, component patterns)
2. Rebuild components with LessManual brand colors (night/pear/tekhelet)
3. Replace all content with PRD-specified messaging
4. Use LessManual design tokens from this PRD (colors, typography, spacing)
5. Adapt animations but ensure 60fps performance

**CRITICAL:** Do NOT use purple colors from UI Kit. All purple elements must be replaced with:
- Backgrounds: night (#0C0D0A)
- CTAs/accents: pear (#DDE000)
- Decorative borders/icons: tekhelet (#5716A2)

---

## 🎯 EXECUTIVE SUMMARY

**Mission:** Launch high-converting, lean marketing website that positions LessManual as automation partner for Polish SMEs.

**Core Strategy:**
- **Contact-first:** NO pricing page (qualify leads, control pricing conversation)
- **Dogfooding:** Chatbot + Voice Agent ON site (demo our products)
- **Specialization-focused:** Show WHAT we do (not who we serve)
- **Lean MVP:** 1 homepage + 2 podstrony → Ship fast, iterate

**Timeline:** 12 days (Nov 1 launch)

**Budget:** ~24 PLN/mies (Google Workspace) + ~450 PLN/mies (Claude API + Voice Agent)

---

## 🏗️ SITE ARCHITECTURE (LEAN)

### Pages (3 total):

```
lessmanual.ai/
│
├── / (Homepage)           ⭐⭐⭐ PRIORITY 1
│   ├── Hero
│   ├── Specjalizacje (3: Obsługa Klienta, Lead Gen, Content)
│   ├── Jak to działa
│   ├── ROI Kalkulator (interactive)
│   ├── Nasi klienci (logos + testimonial)
│   ├── FAQ (5 top questions)
│   ├── Formularz kontaktowy
│   └── Footer
│
├── /o-nas                 ⭐⭐ PRIORITY 2
│   └── Founder story + Mission + Values
│
├── /blog                  ⭐ PRIORITY 3
│   └── Structure + (optional: 1 post)
│
└── /faq                   ⭐ PRIORITY 3
    └── ~20 questions (categories)
```

**NO MORE:**
- ❌ `/produkty/*` pages (specjalizacje on homepage enough)
- ❌ `/pricing` page (contact-first strategy)
- ❌ `/case-studies` page (za wcześnie, tylko section on homepage)

---

## 📄 HOMEPAGE DETAILED SPEC

### SECTION 1: HERO

**Content:**
```
Headline (h1): Make Your Business LESSMANUAL.

Subheadline (h2): AI + Automatyzacja dla polskich firm.
                  Wdrożenie w 7 dni. ROI w miesiąc.

Visual: 3D animated product cards
        (ChatBot, VoiceAgent, Content Agent)

CTA: [Empty - chatbot handles conversion]
Note: Chatbot bubble (bottom right) is primary CTA
      Phone number (top right) triggers Voice Agent
```

**Figma Design Notes:**
- Dark background (Night #0C0D0A)
- Yellow accent (Pear #DDE000) on headline "LESSMANUAL"
- Purple dot (Tekhelet #5716A2) after headline
- 3D cards: Glass morphism, hover tilt effect

**Animations:**
- Text: Fade in + slide up (0.6s delay)
- Cards: Parallax on scroll
- Chatbot bubble: Pulse animation (subtle)

---

### SECTION 2: SPECJALIZACJE (3 Cards)

**Layout:** 3 cards side-by-side (desktop), stacked (mobile)

**Card 1: 🤖 OBSŁUGA KLIENTA 24/7**

*Collapsed state (default):*
```
🤖 OBSŁUGA KLIENTA 24/7

ChatBot + VoiceAgent obsługują klientów 24/7.
70% zapytań automatycznie, 30s czas odpowiedzi.

[Dowiedz się więcej ↓]
```

*Expanded state (after click):*
```
🤖 OBSŁUGA KLIENTA 24/7                    [✕ Zwiń]

JAK TO DZIAŁA?
• ChatBot na stronie/WhatsApp/Messenger
• VoiceAgent odbiera telefony
• AI odpowiada na FAQ, sprawdza status, umawia
• Eskalacja do człowieka gdy potrzeba

DLA KOGO?
✅ E-commerce (200+ zapytań dziennie)
✅ Gabinety (umawianie wizyt)
✅ Usługi (informacje 24/7)

ROI:
2 etaty BOK = 12k/mies → Bot = 800/mies
Oszczędność: 11.2k/mies | Zwrot: 22 dni

[Umów demo →]
```

---

**Card 2: 📈 GENEROWANIE LEADÓW**

*Collapsed state (default):*
```
📈 GENEROWANIE LEADÓW

Scraping + automatyczna obsługa leadów.
Odpowiedź w 30 sekund, nie tracisz nocnych leadów.

[Dowiedz się więcej ↓]
```

*Expanded state (after click):*
```
📈 GENEROWANIE LEADÓW                      [✕ Zwiń]

JAK TO DZIAŁA?
• Scraping: FB, IG, Google Maps, LinkedIn
• Auto-enrichment (email, telefon, firma)
• VoiceAgent dzwoni w 30s (lub email sequence)
• Kwalifikacja BANT → CRM → Handlowiec

DLA KOGO?
✅ Dealerzy (65% leadów nocą marnowane)
✅ B2B (lead response time = konwersja)
✅ Usługi premium (każdy lead = duża wartość)

ROI:
50 leadów/mies × 5k margin = 250k potential
65% marnowane = 162k lost → System = 2.5k/mies
Zwrot: instant (pierwszy uratowany lead)

[Umów demo →]
```

---

**Card 3: ✍️ AUTOMATYZACJA CONTENTU**

*Collapsed state (default):*
```
✍️ AUTOMATYZACJA CONTENTU

AI pisze i publikuje content na LinkedIn, Blog, Social Media.
5 postów/tydzień bez Twojego czasu.

[Dowiedz się więcej ↓]
```

*Expanded state (after click):*
```
✍️ AUTOMATYZACJA CONTENTU                  [✕ Zwiń]

JAK TO DZIAŁA?
• AI generuje tematy (trendy + twoja branża)
• Pisze posty (LinkedIn, Blog, X, FB, IG)
• Tworzy grafiki (DALL-E, brand colors)
• Publikuje automatycznie (lub draft do review)

DLA KOGO?
✅ Agencje (content dla wielu klientów)
✅ Firmy usługowe (thought leadership)
✅ Personal brands (eksperci, konsultanci)

ROI:
40h/mies content creation = 6k/mies
System = 600/mies | Oszczędność: 5.4k/mies

CASE STUDY: Rolbest Content Agent (live)

[Umów demo →]
```

---

**Technical Implementation:**

```tsx
// components/SpecializationCard.tsx
<motion.div
  initial={false}
  animate={{ height: expanded ? 'auto' : '200px' }}
  className="card bg-night border-tekhelet"
>
  {/* Collapsed content (always visible) */}
  <h3 className="text-pear">🤖 Obsługa Klienta 24/7</h3>
  <p className="text-white">
    ChatBot + VoiceAgent obsługują klientów 24/7...
  </p>

  <button
    onClick={() => setExpanded(!expanded)}
    className="text-pear hover:underline"
  >
    Dowiedz się więcej {expanded ? '↑' : '↓'}
  </button>

  {/* Expanded content */}
  <AnimatePresence>
    {expanded && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mt-4">
          <h4 className="text-white font-bold">JAK TO DZIAŁA?</h4>
          <ul className="text-white list-disc ml-6">
            <li>ChatBot na stronie/WhatsApp/Messenger</li>
            {/* ... */}
          </ul>

          <h4 className="text-white font-bold mt-4">DLA KOGO?</h4>
          <ul className="text-white">
            <li>✅ E-commerce (200+ zapytań dziennie)</li>
            {/* ... */}
          </ul>

          <div className="mt-4 p-4 bg-pear/10 rounded">
            <h4 className="text-pear font-bold">ROI:</h4>
            <p className="text-white">
              2 etaty BOK = 12k/mies → Bot = 800/mies<br/>
              Oszczędność: 11.2k/mies | Zwrot: 22 dni
            </p>
          </div>

          <button className="mt-4 bg-pear text-night px-6 py-3 rounded font-bold">
            Umów demo →
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
```

---

### SECTION 3: JAK TO DZIAŁA

**Goal:** Show client journey (discovery → delivery → results)

**Content (4 steps):**

```
Headline: Od rozmowy do automatyzacji w 7 dni

Timeline (horizontal, animated):

┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Dzień 1 │ →  │ Dzień 2 │ →  │Dzień 3-6│ →  │ Dzień 7 │
│  DEMO   │    │  START  │    │  BUILD  │    │  LAUNCH │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
   15 min         Kickoff        MVP Dev       Go Live

Details per step (expand on hover/click):

Dzień 1: DEMO (15 min)
• Poznajemy Twój problem
• Pokazujemy jak to działa u innych
• Liczymy ROI na żywo
→ Decyzja: GO lub dostosowanie scope

Dzień 2: START
• Kickoff call (tech requirements)
• 50% zaliczka (bez płatności = no work)
• Setup credentials (API keys, accesses)

Dzień 3-6: BUILD
• MVP development (z naszej biblioteki 5k workflows)
• Dostosowanie do Twojej branży
• Daily updates (co 2 dni status)

Dzień 7: LAUNCH
• UAT (testujesz z nami)
• 2h szkolenie
• Go-live + dokumentacja
→ 50% druga połowa kasy
```

**Visual:** Animated progress bar showing current step

---

### SECTION 4: ROI KALKULATOR (Interactive)

**Goal:** Engage visitor, collect lead data, show value

**Layout:**

```
┌─────────────────────────────────────────────────┐
│  "Ile kosztuje Cię brak automatyzacji?"        │
│                                                 │
│  Wybierz specjalizację:                         │
│  [Obsługa Klienta] [Lead Gen] [Content]        │
│                                                 │
│  Ile godzin/mies na manualne zadania?          │
│  [Slider: 0 ────●──── 200h]   (40h)           │
│                                                 │
│  Średnia stawka godzinowa pracownika:          │
│  [Input: 150] PLN/h                            │
│                                                 │
│  [Oblicz oszczędności →]                        │
└─────────────────────────────────────────────────┘

After click "Oblicz":

┌─────────────────────────────────────────────────┐
│  📊 TWOJE WYNIKI                                │
│                                                 │
│  Tracisz miesięcznie: 6,000 PLN                │
│  Po automatyzacji: 800 PLN/mies                │
│  Oszczędność: 5,200 PLN/mies                   │
│                                                 │
│  [Chart: Bar chart showing before/after]        │
│                                                 │
│  Zwrot z inwestycji: 0.9 miesiąca              │
│  Roczna oszczędność: 62,400 PLN                │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ Chcesz ofertę dopasowaną do tych liczb?  │ │
│  │                                           │ │
│  │ [Email input]                             │ │
│  │ [Wyślij mi ofertę →]                      │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Backend (Supabase):**

```sql
CREATE TABLE roi_calculations (
  id UUID PRIMARY KEY,
  email TEXT,
  specialization TEXT, -- 'obsługa_klienta' | 'lead_gen' | 'content'
  hours_per_month INTEGER,
  hourly_rate INTEGER,
  potential_savings INTEGER, -- calculated
  created_at TIMESTAMP,
  hot_lead_score INTEGER -- 1-10 based on savings
);

-- Hot lead scoring logic:
-- savings >= 5000 PLN/mies → score 9-10 (HIGH PRIORITY)
-- savings 3000-5000 → score 7-8 (MEDIUM)
-- savings < 3000 → score 5-6 (LOW)
```

**Email Automation (n8n workflow):**

```
Trigger: New entry in roi_calculations table (Supabase webhook)
↓
Check hot_lead_score:
  If >= 8 → Send "Hot Lead" email (offer + Cal.com link + "Dzwonimy dziś")
  If 6-7 → Send "Warm Lead" email (case study + Cal.com link)
  If < 6 → Send "Nurture" email (blog post + "Zapisz się na newsletter")
↓
Update CRM (ClickUp/Supabase):
  Tag: "ROI Calculator - [score]"
  Assign: CSO (for follow-up)
```

---

### SECTION 5: NASI KLIENCI (Social Proof)

**Content:**

```
Headline: "Zaufali nam:"

Logos (2-3 klientów):
┌─────────────┬─────────────┬─────────────┐
│ [Maszynownia│  [Rolbest]  │[Dance Studio│
│   Logo]     │   Logo]     │   Logo]     │
└─────────────┴─────────────┴─────────────┘

Testimonial (slider - rotate every 5s):
┌───────────────────────────────────────────────┐
│ "Bot odpowiada lepiej niż junior BOK.         │
│  I nigdy nie ma złego dnia."                  │
│                                               │
│ — Jan Kowalski, CEO Maszynownia              │
│ (Content Automation | 40h/mies oszczędności) │
└───────────────────────────────────────────────┘

Numbers (animated counter):
┌──────┬──────┬──────┬──────┐
│  40h │ 7dni │ 200% │99.9% │
│saved │deliv │ ROI  │uptime│
│ /mies│      │      │      │
└──────┴──────┴──────┴──────┘
```

**Note:** If logos not available (NDA), use generic:
- "Agencja marketingowa w Warszawie"
- "Gabinet dentystyczny w Krakowie"
- "Sklep e-commerce (moda)"

---

### SECTION 6: FAQ (5 Top Questions)

**Layout:** Accordion (expand on click)

```
► 1. Ile to kosztuje?
   "Typowo 3.5k-8k setup + 500-2k/mies w zależności
   od złożoności. Kontakt → pokazujemy dokładną wycenę."

► 2. Jak długo trwa wdrożenie?
   "7 dni od podpisu do go-live. Standard. Nie miesiące."

► 3. Czy to zadziała w mojej branży?
   "Jeśli masz powtarzalne procesy (FAQ, leady, content)
   - tak. 90% przypadków to nasze specjalizacje."

► 4. Co jeśli nie zadziała?
   "30 dni zwrotu. Bez pytań. Nie działasz - oddajemy kasę."

► 5. Czy potrzebuję IT?
   "Nie. My wszystko robimy: setup, integracje, szkolenie."

[Zobacz więcej pytań (20+) →] → Link to /faq page
```

---

### SECTION 7: FORMULARZ KONTAKTOWY

**Goal:** Capture lead, trigger Voice Agent call

**Layout:**

```
Headline: "Gotowy na automatyzację?"

Form fields:
┌─────────────────────────────────────┐
│ Imię i nazwisko *                   │
│ [Input]                             │
│                                     │
│ Email *                             │
│ [Input]                             │
│                                     │
│ Telefon                             │
│ [Input]                             │
│                                     │
│ Firma                               │
│ [Input]                             │
│                                     │
│ Branża                              │
│ [Dropdown: E-commerce, Gabinet,     │
│  Agencja, Usługi B2B, Inne]         │
│                                     │
│ Wiadomość (opcjonalnie)             │
│ [Textarea]                          │
│                                     │
│ [Wyślij →]                          │
└─────────────────────────────────────┘

Fine print:
"Odpowiadamy w 2h (dni robocze 9-18)"
```

**After submit (success message):**

```
✅ Dziękujemy!

Sprawdź email - wysłaliśmy Ci link do umówienia rozmowy.

Jeśli podałeś telefon, nasz Voice Agent może zadzwonić
w ciągu 5 minut (9-18, Pon-Pią).
```

**Backend Flow:**

```
Form submit (Supabase)
↓
Store in contacts table:
{
  name, email, phone, company, industry, message,
  source: 'website_form',
  created_at, status: 'new'
}
↓
Email automation (n8n):
  Send welcome email:
  - "Cześć {name}!"
  - "Umów się na demo: [Cal.com link]"
  - "Lub odpowiedz na tego maila z pytaniami"
↓
Voice Agent webhook (if phone provided + business hours):
  Trigger: POST /api/voice-agent/call
  Payload: { phone, name, industry }
  Voice Agent: Dzwoni w ciągu 5 min, BANT qualification
↓
CRM update (ClickUp/Supabase):
  Stage: "Demo Pipeline"
  Assign: CSO (Bartek)
  Slack notification: "🔥 New lead: {name} ({industry})"
```

---

### SECTION 8: FOOTER

**Layout (4 columns):**

```
┌──────────────────────────────────────────────────────┐
│ LESSMANUAL          FIRMA           POMOC      SOCIAL│
│                                                      │
│ Make Your Business  O nas           FAQ       LinkedIn│
│ LESSMANUAL.         Blog            Kontakt   (icon)│
│                     Privacy Policy              │
│                                                      │
│ NIP: 1231589909     © 2025 LessManual             │
│ kontakt@lessmanual.ai  All rights reserved.       │
│ +48 508 193 843                                    │
└──────────────────────────────────────────────────────┘
```

---

## 🤖 CHATBOT SPECIFICATION

### Goal
- Qualify leads (budget, industry, urgency)
- Demo product (visitor sees bot working)
- Collect contact info (email/phone)
- Route to Voice Agent (hot leads) or Email (warm leads)

### Placement
- **Desktop:** Bottom right bubble (fixed position)
- **Mobile:** Bottom center (full width when open)

### Trigger
- **Auto-open:** After 10s on page (first visit only)
- **Manual:** Click bubble anytime

### Conversation Flow

```
Bot: Cześć! 👋 Jestem AI asystentem LessManual.
     Pomogę Ci znaleźć odpowiednią automatyzację.

     W czym mogę pomóc?

Options (buttons):
[Chcę automatyzację] [Mam pytanie] [Chcę demo]

─────────────────────────────────────────────────

→ User clicks "Chcę automatyzację"

Bot: Super! Którą specjalizację Cię interesuje?

Options:
[🤖 Obsługa klienta] [📈 Generowanie leadów] [✍️ Content]

─────────────────────────────────────────────────

→ User clicks "🤖 Obsługa klienta"

Bot: Jasne! Obsługa klienta 24/7.

     Ile zapytań od klientów dostajecie dziennie?

Options:
[<50] [50-200] [200+] [Nie wiem]

─────────────────────────────────────────────────

→ User clicks "200+"

Bot: 200+ to sporo! 💪
     Typowo oszczędzamy 40h/mies w takich przypadkach.

     Jaki budżet masz na automatyzację?

Options:
[3-5k] [5-10k] [10k+] [Chcę dowiedzieć się więcej]

─────────────────────────────────────────────────

→ User clicks "5-10k"

Bot: Świetnie, pasuje idealnie! 🎯

     Chcesz porozmawiać z naszym ekspertem?

Options:
[Tak, umów rozmowę] [Nie, wyślij info na email]

─────────────────────────────────────────────────

→ User clicks "Tak, umów rozmowę"

Bot: Super! Wypełnij krótki formularz kontaktowy poniżej,
     a nasz Voice Agent może zadzwonić w ciągu 5 minut
     (albo wyślemy link do umówienia demo).

[Scroll to formularz kontaktowy section]

─────────────────────────────────────────────────

ALTERNATIVE BRANCH:

→ User clicks "Mam pytanie"

Bot: Jasne! O co chcesz zapytać?

[Free text input]

→ User types: "Ile to kosztuje?"

Bot: Cena zależy od złożoności, ale typowo:
     • Setup: 3.5k-8k PLN (jednorazowo)
     • Abonament: 500-2k PLN/mies

     Dokładną wycenę pokazujemy na demo (15 min).

     Chcesz umówić demo?

Options:
[Tak, umawiam] [Nie, dziękuję]
```

### Data Collection

**Store every conversation in Supabase:**

```sql
CREATE TABLE chatbot_conversations (
  id UUID PRIMARY KEY,
  session_id UUID,
  messages JSONB[], -- array of {role, content, timestamp}
  specialization TEXT, -- which clicked
  queries_per_day TEXT, -- <50, 50-200, 200+
  budget TEXT, -- 3-5k, 5-10k, 10k+
  outcome TEXT, -- 'demo_requested', 'email_sent', 'abandoned'
  email TEXT, -- if provided
  phone TEXT, -- if provided
  created_at TIMESTAMP,
  hot_lead_score INTEGER -- 1-10 based on budget + queries
);
```

**Use for:**
1. Lead qualification (hot leads = budget 5k+ + queries 200+)
2. Analytics (which questions most common? Optimize flow)
3. Training data (improve bot responses over time)

### Tech Stack

**Option A: Custom (React + Claude API) - RECOMMENDED**

```tsx
// components/Chatbot.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])

  const sendMessage = async (userMessage) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    // Call Claude API (via backend route)
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: userMessage }]
      })
    })

    const { reply } = await response.json()

    // Add bot reply
    setMessages(prev => [...prev, { role: 'assistant', content: reply }])

    // Store in Supabase
    await fetch('/api/chatbot/store', {
      method: 'POST',
      body: JSON.stringify({ session_id, messages })
    })
  }

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 bg-pear text-night p-4 rounded-full shadow-lg"
      >
        <ChatIcon />
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-96 h-[600px] bg-night border border-pear rounded-lg shadow-xl"
          >
            {/* Messages */}
            <div className="overflow-y-auto h-[500px] p-4">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={msg.role === 'user' ? 'bg-pear text-night' : 'bg-white/10 text-white'}>
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Wpisz wiadomość..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(e.target.value)
                  e.target.value = ''
                }
              }}
              className="w-full p-4 bg-white/5 text-white border-t border-pear"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

**Backend API Route:**

```typescript
// app/api/chatbot/route.ts
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const SYSTEM_PROMPT = `
You are an AI assistant for LessManual - automation agency for Polish SMEs.

Your goal: Qualify leads by asking about:
1. Specialization interest (Obsługa klienta, Lead gen, Content)
2. Problem scale (how many queries/leads/hours per day/month)
3. Budget (3-5k, 5-10k, 10k+)
4. Urgency (need now, exploring, future)

Be friendly, concise (2-3 sentences max), use Polish language.
Offer demo booking when budget >= 5k and problem is clear.

Always respond in JSON format:
{
  "message": "Your response text",
  "options": ["Button 1", "Button 2", ...] // optional buttons
}
`

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: messages
  })

  const reply = JSON.parse(response.content[0].text)

  return Response.json(reply)
}
```

**Cost:** ~100-150 PLN/mies (Claude API, assuming 1000 conversations/month @ 300 tokens each)

---

## 📱 VOICE AGENT SPECIFICATION

### Goal
- Call leads who submit contact form with phone number
- BANT qualification (Budget, Authority, Need, Timeline)
- Book demo if qualified
- Update CRM with conversation notes

### Trigger
- **After form submission** (if phone provided + business hours 9-18)
- **Manual:** CSO can trigger call from CRM

### Conversation Script

```
Voice Agent:
"Cześć! Tu asystent LessManual.
Dostałem Twoje zgłoszenie ze strony - masz 2 minuty na rozmowę?"

→ If YES:

"Super! Widzę że interesujesz się automatyzacją [specjalizacja].
Powiedz, jaki największy problem chcesz rozwiązać?"

→ Listen, extract pain point

"Rozumiem. Ile godzin miesięcznie zabiera Ci to teraz?"

→ Listen, extract hours

"Okej. Jaki budżet masz na rozwiązanie tego problemu?"

→ Listen, extract budget

If budget >= 5k:
"Świetnie, pasuje! Mogę umówić Cię z naszym ekspertem na demo.
Kiedy masz 15 minut? Jutro rano czy popołudnie?"

→ Listen, book demo (Cal.com API)

"Zapisane! Dostaniesz potwierdzenie na email. Do usłyszenia!"

If budget < 5k:
"Rozumiem. Wyślę Ci na email case study i cennik.
Jak będziesz gotowy, umów się przez link w emailu. Ok?"

→ If NO (no time):

"Jasne, rozumiem! Wyślę Ci email z informacjami.
Możesz umówić demo przez link. Miłego dnia!"
```

### Tech Stack

**ElevenLabs Conversational AI + n8n**

```javascript
// n8n workflow: Voice Agent Call

Trigger: Webhook (POST /voice-agent/call)
Input: { phone, name, industry, specialization }

↓

Node 1: ElevenLabs Create Call
POST https://api.elevenlabs.io/v1/convai/conversation
Body: {
  agent_id: "your-agent-id",
  phone_number: "{{phone}}",
  variables: {
    name: "{{name}}",
    specialization: "{{specialization}}"
  }
}

↓

Node 2: Wait for Call End (webhook callback)

↓

Node 3: Parse Transcript
Extract: pain_point, hours, budget, outcome (demo_booked | email_sent | not_interested)

↓

Node 4: Update CRM (Supabase)
UPDATE contacts
SET
  pain_point = {{pain}},
  hours_per_month = {{hours}},
  budget = {{budget}},
  status = {{outcome}},
  last_contact = NOW()
WHERE phone = {{phone}}

↓

Node 5: If demo_booked → Cal.com API
POST /bookings
Create demo appointment

↓

Node 6: Slack Notification
"🔥 Voice Agent call completed:
{name} - {outcome}
Budget: {budget} | Pain: {pain}"
```

**Cost:** ~300 PLN/mies (ElevenLabs Pro plan, ~100 calls/month @ 3 min each)

---

## 📄 PAGE 2: O NAS (/o-nas)

**Goal:** Build trust, show founder story, explain mission

**Sections:**

### 1. Hero
```
Headline: Od TSL Supply Chain do AI Automation

Photo: Bartek (casual, professional)
```

### 2. Founder Story (3 paragraphs)
```
Paragraph 1: Background
"8 lat w TSL jako process optimizer. Case: Oszczędność 100k PLN/rok
dla klienta przez automatyzację magazynu."

Paragraph 2: Insight
"Zauważyłem wzorzec: 80% pracy ludzi to copy-paste, odpowiadanie
na te same pytania, manualne raporty. Można to zautomatyzować."

Paragraph 3: Mission
"Założyłem LessManual w październiku 2025. Misja: Uczynić AI
dostępnym dla każdej polskiej firmy. Nie tylko korporacje."
```

### 3. Mission & Values
```
"Make Your Business LESSMANUAL"

Values:
✅ Value First - Klient oszczędza 3x więcej niż płaci
✅ Speed - 7 dni do MVP, zawsze
✅ No BS - Realne rozwiązania, nie kursy, nie scamy
✅ Bootstrap Mindset - Działamy jakby runway był 30 dni
```

### 4. Why Us (Table)
```
┌─────────────────┬─────────┬──────────┬──────────┐
│                 │LessManual│ Agencje │   DIY    │
├─────────────────┼─────────┼──────────┼──────────┤
│ Delivery time   │  7 dni  │ 3 mies   │    ?     │
│ Price (standard)│  5k     │  50k     │    0     │
│ Support         │  ✅     │  ❌      │   ❌     │
│ Polish market   │  ✅     │  🤷      │   ❌     │
│ Productized     │  ✅     │  ❌      │   N/A    │
└─────────────────┴─────────┴──────────┴──────────┘
```

### 5. Tech Stack (Transparency)
```
"Czym budujemy?"

• n8n - workflow orchestration
• Claude API - AI brain
• Supabase - database
• ElevenLabs - voice
• Voiceflow - chatbots (when applicable)

Dlaczego? Speed + reliability + cost-effectiveness
```

### 6. Contact CTA
```
"Gotowy rozmawiać?"

[Umów demo] [Zadzwoń: +48 508 193 843]
```

---

## 📄 PAGE 3: BLOG (/blog)

**Goal:** SEO engine, thought leadership

**Phase:** Post-launch (Week 3+) - Not required for Nov 1 MVP

**Structure:**

```
/blog
├── Blog listing page (grid of posts)
│   └── Each post: [Thumbnail, Title, Excerpt, Date, Author]
│
└── Individual post pages
    └── /blog/[slug]
        ├── Hero image
        ├── Title + Author + Date
        ├── Content (markdown)
        ├── CTA: "Chcesz taką automatyzację?" [Umów demo]
        └── Related posts (3 suggestions)
```

**Initial Content (optional for MVP, recommended for Week 3):**

1. **"KSeF Deadline 2026 - Co musisz wiedzieć"**
   - SEO: "ksef deadline", "ksef automatyzacja"
   - Target: Biura rachunkowe, freelancers

2. **"7-Day Automation - Jak wdrażamy systemy w tydzień"**
   - SEO: "szybkie wdrożenie automatyzacji"
   - Target: Firmy szukające automation

3. **"Case Study: Maszynownia oszczędza 40h/mies"** (if approved by client)
   - SEO: "automatyzacja content marketing"
   - Target: Agencje

**CMS:** Not needed for MVP - hardcode in MDX files

---

## 📄 PAGE 4: FAQ (/faq)

**Goal:** Answer all questions (reduce support load)

**Structure:**

```
Headline: Najczęściej zadawane pytania

Categories (tabs or sections):
[Cennik] [Wdrożenie] [Technologia] [Wsparcie]

Per category - accordion (expand on click):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CENNIK (5-7 pytań)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

► Ile to kosztuje?
► Czy są ukryte koszty?
► Czy mogę płacić ratalnie?
► Co zawiera abonament miesięczny?
► Czy mogę anulować w każdej chwili?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WDROŻENIE (5-7 pytań)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

► Jak długo trwa wdrożenie?
► Co jeśli potrzebuję szybciej niż 7 dni?
► Jakie dane potrzebujecie ode mnie?
► Czy muszę mieć IT w firmie?
► Co jeśli mam specjalne wymagania?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNOLOGIA (5-7 pytań)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

► Jakie technologie używacie?
► Czy to działa z moim CRM/systemem?
► Czy dane są bezpieczne (RODO)?
► Co jeśli system padnie?
► Czy mogę dostać kod źródłowy?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WSPARCIE (5-7 pytań)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

► Jaki jest czas odpowiedzi?
► Czy dostaję szkolenie?
► Co jeśli coś przestanie działać?
► Czy robicie modyfikacje później?
► Jak wygląda gwarancja?
```

**Total:** ~20-25 pytań (comprehensive)

---

## 🎨 DESIGN SYSTEM (from Figma)

### Colors (WCAG AAA)

```css
:root {
  --night: #0C0D0A;      /* Background (dark mode) */
  --white: #FEFEFE;      /* Text (dark mode) */
  --pear: #DDE000;       /* CTA, accents, logo */
  --tekhelet: #5716A2;   /* Decorative (icons, borders, logo dot) */
}

/* Approved combinations only: */
.bg-night + .text-white   /* 19.32:1 - body text */
.bg-night + .text-pear    /* 13.68:1 - headings, CTA */
.bg-pear + .text-night    /* 13.68:1 - buttons */

/* NEVER use: */
.text-tekhelet on any bg  /* Accessibility fail - decorative only */
```

### Typography

```css
/* Font: System sans-serif (SF Pro / Inter / Segoe UI) */

h1: 3xl-6xl, bold, text-white or text-pear
h2: 2xl-4xl, bold, text-white
h3: xl-2xl, semibold, text-white
body: base-lg, regular, text-white
small: sm-base, regular, text-white/80
```

### Components

**Buttons:**
```tsx
// Primary CTA
<button className="bg-pear text-night px-6 py-3 rounded font-bold hover:bg-pear/90">
  Umów demo →
</button>

// Secondary (ghost)
<button className="bg-transparent text-pear border-2 border-pear px-6 py-3 rounded font-bold hover:bg-pear/10">
  Dowiedz się więcej
</button>
```

**Cards:**
```tsx
<div className="bg-night border border-tekhelet rounded-lg p-6 hover:scale-105 transition">
  {/* Card content */}
</div>
```

**Inputs:**
```tsx
<input
  type="text"
  className="bg-night border border-white/20 text-white px-4 py-3 rounded focus:border-pear focus:outline-none"
/>
```

---

## 🚀 TECHNICAL STACK

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Next.js Font Optimization

### Backend
- **Database:** Supabase (PostgreSQL)
- **API Routes:** Next.js API Routes (app/api/*)
- **Authentication:** Not needed for MVP (future: Supabase Auth)

### Integrations
- **AI:** Claude API (Anthropic)
- **Voice:** ElevenLabs Conversational AI
- **Automation:** n8n (workflows)
- **Email:** Gmail (kontakt@lessmanual.ai) + n8n automation
- **Demo Booking:** Cal.com (embed)
- **CRM:** Supabase (custom tables) + ClickUp (optional)

### Deployment
- **Hosting:** Vercel (free tier → Pro when needed)
- **Domain:** lessmanual.ai (already owned)
- **CDN:** Vercel Edge Network
- **SSL:** Auto (Vercel default)

### Analytics
- **Primary:** Vercel Analytics (built-in, privacy-friendly)
- **Optional:** Plausible Analytics (GDPR compliant, no cookies)

---

## 📅 DEVELOPMENT TIMELINE

### Week 1 (Days 1-7) - MVP BUILD

**Days 1-2: Setup & Foundation**
- [ ] Create Next.js project (Tailwind + Framer Motion + TypeScript)
- [ ] Extract design tokens from Figma (colors, spacing, typography)
- [ ] Create component library (Button, Card, Input, Nav, Footer)
- [ ] Setup Supabase (database tables: contacts, roi_calculations, chatbot_conversations)

**Days 3-5: Homepage Sections**
- [ ] Hero section (headline, visual, responsive)
- [ ] Specjalizacje section (3 cards + expand/collapse)
- [ ] Jak to działa section (timeline)
- [ ] ROI Kalkulator (interactive + backend)
- [ ] Nasi klienci section (logos + testimonial)
- [ ] FAQ section (5 questions accordion)
- [ ] Formularz kontaktowy (form + Supabase integration)
- [ ] Footer

**Days 6-7: Chatbot + Voice Agent**
- [ ] Custom chatbot (React + Claude API)
- [ ] Chatbot backend (API routes + Supabase storage)
- [ ] Voice Agent integration (ElevenLabs + n8n webhook)
- [ ] Email automation (n8n workflows)

### Week 2 (Days 8-12) - POLISH & LAUNCH

**Days 8-9: Podstrony**
- [ ] /o-nas page (founder story, mission, values)
- [ ] /blog structure (empty or 1 post)
- [ ] /faq page (~20 questions)

**Days 10-11: Optimization**
- [ ] Mobile responsive (all breakpoints)
- [ ] Lighthouse audit (target 90+)
- [ ] Accessibility check (WCAG AAA)
- [ ] SEO (meta tags, sitemap, schema.org)
- [ ] Performance optimization (images, lazy load)

**Day 12: LAUNCH**
- [ ] DNS configuration (lessmanual.ai → Vercel)
- [ ] Production deployment
- [ ] Smoke tests (all links, forms, chatbot, voice agent)
- [ ] Analytics connected (Vercel)
- [ ] 🚀 GO LIVE (Nov 1, 2025)

---

## ✅ DEFINITION OF DONE (Launch Checklist)

### Functionality
- [ ] Homepage (8 sections) live and working
- [ ] Contact form working (sends to Supabase + email)
- [ ] ROI Calculator working (frontend + backend tracking)
- [ ] Chatbot working (conversations stored in Supabase)
- [ ] Voice Agent webhook configured (triggers on form submit)
- [ ] Email automation working (welcome emails sent)
- [ ] /o-nas page complete
- [ ] /faq page with 20+ questions
- [ ] /blog structure (empty ok, 1 post nice-to-have)

### Performance
- [ ] Lighthouse Performance ≥90
- [ ] LCP (Largest Contentful Paint) <1.5s
- [ ] No console errors
- [ ] All images optimized (WebP, lazy load)

### Accessibility
- [ ] WCAG AAA compliance verified
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader tested (NVDA or VoiceOver)
- [ ] Color contrast ≥13.68:1 (Pear/Night)
- [ ] Alt text on all images

### SEO
- [ ] Meta tags on all pages (title, description, OG)
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Schema.org markup (Organization, WebSite)
- [ ] Semantic HTML (h1-h6 hierarchy)

### Mobile
- [ ] Responsive on 3 breakpoints (640px, 768px, 1024px)
- [ ] Touch-friendly buttons (min 44px tap target)
- [ ] Readable text (min 16px base font)
- [ ] Fast load on 3G (<3s)

### Legal
- [ ] Privacy Policy page live
- [ ] Cookie consent (if GA4 used - optional for MVP)
- [ ] RODO-compliant forms (consent checkboxes)
- [ ] Contact data stored in EU (Supabase EU region)

### Analytics
- [ ] Vercel Analytics connected
- [ ] Key events tracked:
  - [ ] Demo booking attempts
  - [ ] Contact form submissions
  - [ ] ROI calculator usage
  - [ ] Chatbot conversations started
  - [ ] Specjalizacje card expansions

### Deployment
- [ ] Domain lessmanual.ai → Vercel
- [ ] SSL certificate active (HTTPS)
- [ ] Production deployment successful
- [ ] All API routes working (test in prod)
- [ ] Environment variables set (API keys secure)

---

## 📊 SUCCESS METRICS

### Launch Week (Week 1 post-launch)
- [ ] 100+ unique visitors
- [ ] 5+ contact form submissions
- [ ] 3+ chatbot conversations completed
- [ ] 2+ Voice Agent calls completed
- [ ] 0 critical bugs reported
- [ ] Lighthouse score maintained (≥90)

### Month 1 (Nov 1-30)
- [ ] 1,000+ unique visitors
- [ ] 20+ qualified leads (form + chatbot + voice)
- [ ] 10+ demo bookings (Cal.com)
- [ ] 2+ deals closed from website traffic
- [ ] ROI calculator used 50+ times

### Quarter 1 (Nov-Jan)
- [ ] 5,000+ unique visitors/month
- [ ] 50+ qualified leads/month
- [ ] 10+ deals closed from inbound
- [ ] Blog: 10 posts published, 1000+ views/month
- [ ] Organic search: Top 10 for "automatyzacja dla firm"

---

## 💰 BUDGET

### One-Time (Setup)
- **Development:** 0 PLN (internal - Bartek)
- **Design:** 0 PLN (Figma existing + MCP)
- **Domain:** Already owned (~60 PLN/year)

### Monthly Recurring
- **Hosting:** Vercel Free Tier → 0 PLN (upgrade to Pro @ 100 PLN/mies if >10k visitors)
- **Database:** Supabase Free Tier → 0 PLN (upgrade to Pro @ 100 PLN/mies if needed)
- **Email:** Google Workspace → 24 PLN/mies (kontakt@lessmanual.ai)
- **Claude API:** ~100-150 PLN/mies (chatbot, 1000 conversations @ 300 tokens each)
- **ElevenLabs:** ~300 PLN/mies (voice agent, 100 calls @ 3 min each)
- **Analytics:** Vercel Analytics Free → 0 PLN

**Total Monthly:** ~450-500 PLN

**Upgrade Triggers:**
- Vercel Pro (100 PLN/mies): If >10k visitors/month
- Supabase Pro (100 PLN/mies): If >50k DB rows or need priority support

---

## 🚨 RISKS & MITIGATION

### Risk 1: Nov 1 Deadline Tight (12 days)
**Mitigation:**
- Cut scope ruthlessly (no blog posts, /blog structure only)
- Reuse components from Figma (design tokens ready)
- Custom chatbot may take 3-4 days (consider Voiceflow backup if needed)
- Parallel work: Frontend (Days 1-5) + Backend (Days 6-7)

### Risk 2: Voice Agent Complexity
**Mitigation:**
- Use existing ElevenLabs setup from Dance Studio POC
- Start with simple script (BANT questions only)
- Manual fallback: If webhook fails, CSO calls manually
- Test thoroughly in staging (not just prod)

### Risk 3: Chatbot Quality (Custom vs Voiceflow)
**Mitigation:**
- If custom takes >4 days → pivot to Voiceflow (2 days max)
- MVP chatbot doesn't need perfection (can iterate post-launch)
- Focus on qualification flow (budget, industry, urgency)

### Risk 4: Mobile Performance
**Mitigation:**
- Mobile-first design (test on real devices daily)
- Optimize images aggressively (WebP, lazy load, blur placeholders)
- Lighthouse audit on mobile (not just desktop)

---

## 📞 STAKEHOLDER COMMUNICATION

### CEO (Bartek) - Daily Standup
**Format:** End of day update (5 min)
**Content:**
- What shipped today?
- Blockers?
- Tomorrow priorities?
- On track for Nov 1?

### Partners (if they ask) - Weekly
**Format:** Email + demo link
**Content:**
- "Week 1 update: Homepage 80% done, launching Nov 1"
- Screenshot preview
- "Let me know if you want to test chatbot"

---

## 🔄 POST-LAUNCH ITERATIONS (Week 3+)

### Week 3 (Nov 3-7)
- [ ] First 3 blog posts (KSeF, 7-day automation, case study)
- [ ] A/B test hero headline (3 variants)
- [ ] Chatbot optimization (based on conversations data)
- [ ] Add more FAQ questions (based on support inquiries)

### Week 4 (Nov 10-14)
- [ ] Advanced animations (3D product showcases, parallax)
- [ ] Client testimonial videos (if available)
- [ ] WhatsApp chat widget (alternative to chatbot)
- [ ] Lead magnet download (e-book: "10 Processes to Automate First")

### Month 2 (Dec)
- [ ] CMS integration (Sanity.io for blog)
- [ ] Multi-language (EN version for Arek USA partnerships)
- [ ] Product pages (/produkty/chatbot, /produkty/voiceagent) if needed
- [ ] Case studies page (when have 5+ delivered projects)

---

## 📚 REFERENCE DOCUMENTS

- **Brand Identity:** `/brand_identity.md`
- **Company Data:** `/lessmanual/company_data.md`
- **Strategy:** `/lessmanual/decisions/strategy.md`
- **Architecture Decision:** `/lessmanual/decisions/website_architecture_2025-10-20.md`
- **Website CLAUDE.md:** `/lessmanual-website-CLAUDE.md`
- **Offers (content source):**
  - `/oferty/Radek_Content_Agent_Oferta.md`
  - `/oferty/Radek_Scraping_Agent_Oferta.md`

---

## ✅ FINAL APPROVAL

**Approved by:** CEO + CTO (Bartłomiej Chudzik)
**Date:** 2025-10-20
**Status:** 🟢 READY FOR DEVELOPMENT
**Next Review:** 2025-11-01 (Post-Launch)

---

## 🎬 IMMEDIATE NEXT STEPS

**RIGHT NOW (Today):**
1. ✅ Review this PRD v2 (final approval)
2. 🟡 Create new project:
```bash
cd /Users/bartlomiejchudzik/
npx create-next-app@latest lessmanual-website \
  --typescript --tailwind --app --src-dir
cd lessmanual-website
npm install framer-motion
```
3. 🟡 Copy CLAUDE.md to project
4. 🟡 Connect Figma MCP (extract design tokens)

**TOMORROW (Day 1):**
- Setup Supabase (3 tables: contacts, roi_calculations, chatbot_conversations)
- Create component library (Button, Card, Input)
- Start Hero section

**THIS WEEK (Days 2-7):**
- Complete all homepage sections
- Build chatbot (custom React + Claude API)
- Setup Voice Agent webhook
- Lighthouse audit

**NEXT WEEK (Days 8-12):**
- /o-nas, /faq pages
- Mobile optimization
- SEO setup
- **LAUNCH NOV 1** 🚀

---

**🚀 Ready to ship. Let's make it LESSMANUAL.**
