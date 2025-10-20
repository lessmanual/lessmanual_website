# LessManual.ai - Website PRD (Product Requirements Document)

**Version:** 1.0
**Date:** 2025-10-20
**Owner:** CTO (Bartłomiej Chudzik)
**Status:** 🟢 Ready for Development

---

## 📋 EXECUTIVE SUMMARY

**Project:** Marketing website for LessManual.ai - AI automation agency for Polish SMEs

**Objective:** Create high-converting, accessible, dark-mode-first website that positions LessManual as the go-to automation partner for Polish businesses.

**Timeline:** 14 days from kickoff to launch

**Budget:** Development only (no external costs - Vercel free tier, existing domains)

---

## 🎯 BUSINESS CONTEXT

### Company Profile
- **Legal Name:** LessManual Bartłomiej Chudzik
- **Brand:** LessManual.ai
- **NIP:** 1231589909
- **Founder:** Bartłomiej Chudzik (28 lat, developer + automation specialist)
- **Founded:** 09.10.2025
- **Location:** Cendrowice, Poland (mazowieckie)

### Business Model
- **Revenue Model:** 80% productized solutions / 20% custom projects
- **Pricing Strategy:** 3.5k-8.5k setup + 500-2.5k PLN/mies recurring
- **Delivery:** 7-day MVP standard
- **Value Promise:** Client saves minimum 3x what they pay (200% ROI in 12 months)

### Current State (Oct 2025)
- **MRR:** 4k PLN (1 paying client: Maszynownia)
- **Pipeline:** 237k PLN weighted value
- **Active Projects:** 5 (Otoraport, Raply, Volta Venture, Biovico, Radek)
- **Phase:** Bootstrap (0-10 clients) - **Portfolio > Marża**

---

## 🎨 BRAND IDENTITY

### Visual Identity

**Color Palette (WCAG AAA Compliant):**
```css
:root {
  --night: #0C0D0A;      /* Primary background (dark mode) */
  --white: #FEFEFE;      /* Primary text (dark mode) */
  --pear: #DDE000;       /* CTA, accents, logo */
  --tekhelet: #5716A2;   /* Decorative only (icons, borders, logo dot) */
}
```

**Approved Combinations:**
- ✅ Night background + White text (19.32:1 contrast)
- ✅ Night background + Pear elements (13.68:1 contrast)
- ✅ Pear background + Night text (13.68:1 for buttons)
- ❌ Tekhelet text on any background (accessibility fail - decorative only)

**Dark Mode First:**
- Primary: Dark mode (Night bg)
- Secondary: Light mode (White bg)
- Toggle: User preference + system detection

### Typography
- **Primary Font:** Sans-serif system font (SF Pro / Inter / Segoe UI)
- **Headings:** Bold, large (3xl-6xl)
- **Body:** Regular, readable (base-lg)
- **Code/Numbers:** Monospace for metrics

### Tone of Voice
- **Bezpośredni:** "Zaoszczędź 40h/mies" not "Zoptymalizuj workflow"
- **Konkretny:** Numbers > buzzwords ("5k setup" not "przystępne ceny")
- **Profesjonalny ale ciepły:** Expertise + accessibility (yellow warmth + dark premium)
- **No BS:** Real solutions, no scams, no courses

### Tagline
**"Make Your Business LESSMANUAL"**

Alternative messaging:
- "Automatyzacja która się zwraca w miesiąc"
- "AI dla polskich firm - bez ściemy"
- "7 dni od demo do automatyzacji"

---

## 🎯 TARGET AUDIENCE

### Primary Personas

#### Persona 1: Michał (E-commerce Owner)
**Demographics:**
- Age: 30-45
- Role: Owner / CEO
- Company: Online store (fashion, electronics, etc)
- Revenue: 1-5M PLN/year
- Team: 3-10 people

**Pain Points:**
- 200+ customer queries/day (BOK overwhelmed)
- Manual order processing (copy-paste hell)
- Competitors respond faster (losing sales)
- Can't scale without hiring (no budget for 2 more FTEs)

**Goals:**
- Reduce BOK workload by 50%
- Respond to customers 24/7
- Increase conversion rate
- Focus on growth, not operations

**Tech Savviness:** Medium (uses Shoper/BaseLinker, not a developer)

**Budget:** 5-10k PLN/year for automation

**Product Fit:** Customer Support Bot (5k + 800/mies)

---

#### Persona 2: Marcin (Car Dealer Manager)
**Demographics:**
- Age: 35-50
- Role: Sales Manager / Owner
- Company: Car dealership (BMW, VW, etc)
- Team: 8-15 handlowcy

**Pain Points:**
- 65% leads wasted (nights, weekends, response time >4h)
- Spend 30k/mies on ads but lose leads
- Handlowcy busy with walk-ins, can't call leads
- Competitors respond in 15 minutes (we respond next day)

**Goals:**
- Capture every lead 24/7
- Qualify leads before handlowiec call
- Increase test drive bookings
- Maximize ROI on ad spend

**Tech Savviness:** Low (uses CRM, that's it)

**Budget:** 2-5k/month for lead response solution

**Product Fit:** VoiceAgent Lead Response (5k + 2.5k/mies)

---

#### Persona 3: Piotr (Deweloper Nieruchomości)
**Demographics:**
- Age: 40-55
- Role: Owner / Board Member
- Company: Deweloper (2-5 osiedla, 300-500 mieszkań)

**Pain Points:**
- Legal mandate: Daily price reporting from Sep 2025
- Fear of 100k PLN penalties (non-compliance)
- Manual reporting = 2h/day wasted
- Existing solutions expensive (10k+) or complicated

**Goals:**
- Compliance without headache
- Automate daily reporting
- Avoid penalties
- Minimal time investment

**Tech Savviness:** Low (has assistant who does Excel)

**Budget:** 3-10k for compliance solution (fear-driven)

**Product Fit:** OtoRaport.pl (5k + 500/mies)

---

### Secondary Personas

**Accounting Firm Owner (Anna):**
- Pain: KSeF deadline April 2026 (mandatory e-invoicing)
- Product Fit: KSeF Compliance Suite

**Medical Clinic Owner (Ewa):**
- Pain: Reception overwhelmed with calls
- Product Fit: Voice Reception Agent

**Marketing Agency Owner (Tomasz):**
- Pain: Manual client reporting (10h/week)
- Product Fit: Reporting Automation

---

## 🏗️ WEBSITE ARCHITECTURE

### Site Map

```
lessmanual.ai/
│
├── / (Homepage)                    # Hero + Value Prop + Social Proof + CTA
├── /produkty (Products)            # 5 core products overview
│   ├── /chatbot                   # Customer Support Bot
│   ├── /voiceagent                # Voice Agent (dealers, clinics)
│   ├── /content-agent             # Content Automation
│   ├── /scraping-agent            # Lead Generation
│   └── /otoraport                 # Deweloper Compliance
│
├── /case-studies (Portfolio)       # Success stories with numbers
│   ├── /maszynownia               # Content automation case
│   ├── /dance-studio              # Voice agent POC
│   └── /rolbest                   # Content agent live example
│
├── /pricing (Cennik)               # Transparent 3-tier pricing
├── /about (O nas)                  # Founder story, team, mission
├── /blog                           # SEO content + thought leadership
│   ├── /ksef-deadline-2026        # Urgency content
│   ├── /7-day-automation          # Methodology
│   └── /roi-calculator            # Interactive tools
│
├── /contact (Kontakt)              # Multi-channel contact form
└── /demo                           # Demo booking (Cal.com embed)
```

### Page Hierarchy & Priority

**Phase 1 (MVP - Week 1-2):**
1. Homepage ⭐⭐⭐ (CRITICAL)
2. /produkty/chatbot ⭐⭐⭐
3. /produkty/voiceagent ⭐⭐⭐
4. /pricing ⭐⭐
5. /contact ⭐⭐

**Phase 2 (Post-Launch - Week 3-4):**
6. /case-studies/* ⭐⭐
7. /about ⭐
8. /produkty/content-agent ⭐
9. /produkty/scraping-agent ⭐
10. /produkty/otoraport ⭐

**Phase 3 (Growth - Month 2+):**
11. /blog (SEO engine)
12. Interactive ROI calculators
13. Client portal (future)

---

## 📄 PAGE-BY-PAGE REQUIREMENTS

### 🏠 HOMEPAGE (/)

**Goal:** Convert visitor to demo booking in <2 minutes

**Layout Sections:**

#### 1. HERO SECTION (Above Fold)
**Content:**
```
Headline (h1): Make Your Business LESSMANUAL.
Subheadline (h2): AI + Automatyzacja dla polskich firm.
              Wdrożenie w 7 dni. ROI w miesiąc.

CTA Primary: Umów demo (15 min) →
CTA Secondary: Zobacz case studies ↓

Visual: 3D animated cards showing products (ChatBot, VoiceAgent, Content)
```

**Figma Design:** Hero with dark background, yellow CTA, 3D card grid

**Animations:**
- Hero text: Fade in + slide up (0.6s delay)
- 3D cards: Parallax on scroll, hover tilt effect
- CTA button: Pulse animation (subtle)

**Key Metrics:**
- Above fold content: 100% visible on 1440px screen
- CTA button: Contrast 13.68:1 (WCAG AAA)
- Load time: <1.5s FCP

---

#### 2. PROBLEM-SOLUTION SECTION
**Content:**
```
Headline: "200+ zapytań dziennie? 65% leadów marnowane? 2h dziennie na raporty?"

3 columns (pain points):
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ E-commerce      │ │ Dealerzy        │ │ Deweloperzy     │
│ BOK overwhelmed │ │ Leady nocą gone │ │ Raporty deadline│
│ 24/7 needed     │ │ Need instant    │ │ 100k penalties  │
└─────────────────┘ └─────────────────┘ └─────────────────┘

Solution: "Automatyzujemy to w 7 dni. Zwraca się w miesiąc."
```

**Visual:** Icons for each industry + animated pain→solution transition

---

#### 3. PRODUCTS OVERVIEW
**Content:**
```
3-4 featured products (cards):

┌──────────────────────────────────────┐
│ 🤖 Customer Support Bot              │
│ "Obsługa klienta 24/7 bez etatów"   │
│ • Odpowiedzi w 30s                   │
│ • 70% zapytań zautomatyzowane        │
│ • WhatsApp + Messenger + Email       │
│ Od 5k + 800/mies                     │
│ [Zobacz więcej →]                    │
└──────────────────────────────────────┘

(Repeat for VoiceAgent, Content Agent, OtoRaport)
```

**Interaction:** Hover card = expand with more details + mini ROI calc

---

#### 4. SOCIAL PROOF SECTION
**Content:**
```
Headline: "Zaufali nam:"

Logos (3-5 clients - if available):
[Maszynownia] [Rolbest] [Dance Studio] [...]

Testimonials (slider):
"Bot odpowiada lepiej niż junior BOK. I nigdy nie ma złego dnia."
— Jan Kowalski, CEO MaszynowniaAgency

Numbers (animated counter):
┌─────────┬─────────┬─────────┬─────────┐
│   40h   │  7 dni  │  200%   │  99.9%  │
│ saved/m │ delivery│   ROI   │ uptime  │
└─────────┴─────────┴─────────┴─────────┘
```

**Animations:**
- Logos: Fade in on scroll
- Numbers: Count up animation (0 → final number)
- Testimonials: Auto-rotate every 5s

---

#### 5. HOW IT WORKS SECTION
**Content:**
```
Headline: "Od rozmowy do automatyzacji w 7 dni"

Timeline (horizontal):
Dzień 1-2 → Dzień 3-5 → Dzień 6-7 → Ready!
Demo      → Build    → Test    → Launch
15 min    → MVP      → UAT     → Go Live

Details per step (accordion expand on click)
```

**Visual:** Animated timeline progress bar

---

#### 6. PRICING TEASER
**Content:**
```
Headline: "Transparentne ceny. Bez niespodzianek."

3 tiers preview (compact):
┌─────────┬─────────┬─────────┐
│ Starter │Standard │Enterprise│
│  3.5k   │   5k    │  12k+   │
│ +500/m  │ +800/m  │ +2k/m   │
└─────────┴─────────┴─────────┘

CTA: "Zobacz pełny cennik →"
```

---

#### 7. FINAL CTA SECTION
**Content:**
```
Headline: "Gotowy na automatyzację?"

CTA: "Umów demo (15 min) - pokażemy jak to działa u Ciebie"

Form (inline):
[Imię] [Email] [Firma] [Branża dropdown] [Umów demo →]

Alternative: "Lub zadzwoń: +48 508 193 843"
```

**Design:** Yellow CTA button (Pear #DDE000), Night background, White text

---

### 📦 PRODUCT PAGES (/produkty/*)

**Template Structure (reusable for all products):**

#### Section 1: Hero
```
Product Name (h1)
Tagline (h2)
Primary CTA: Umów demo
Secondary CTA: Zobacz case study
```

#### Section 2: Problem (Pain Points)
```
3 specific pains for this product's target audience
Visual: Before/After comparison
```

#### Section 3: Solution (How it works)
```
Step-by-step breakdown (3-5 steps)
Visual: Flowchart or animated diagram
```

#### Section 4: Features
```
Feature list (bullet points)
Visual: Screenshots or demo video
```

#### Section 5: ROI Calculation
```
Interactive calculator:
Input: Your current costs (e.g., BOK hours, wage)
Output: Monthly savings, payback period, 12-month ROI

Visual: Chart showing savings over time
```

#### Section 6: Tech Stack (Optional - dla tech-savvy)
```
"Co jest pod maską?"
n8n + Claude API + Supabase + [specific integrations]
```

#### Section 7: Pricing
```
3 tiers (Starter, Professional, Enterprise)
Table with features comparison
CTA: "Wybierz pakiet" or "Umów demo"
```

#### Section 8: FAQ
```
5-7 common questions specific to this product
Accordion (expand on click)
```

#### Section 9: CTA
```
"Gotowy na wdrożenie?"
Form or demo booking link
```

---

### 💰 PRICING PAGE (/pricing)

**Goal:** Transparently show pricing without sticker shock, drive demo bookings

**Layout:**

#### Section 1: Pricing Philosophy
```
Headline: "Płacisz za wartość, nie za godziny"

Explanation:
"Nasze rozwiązania zwracają się w miesiąc. Cena = 1/3 wartości."

Guarantee: "30 dni zwrotu - nie działa, oddajemy kasę"
```

#### Section 2: Pricing Matrix (Interactive)
```
Product Selector (dropdown):
[Wybierz produkt: ChatBot | VoiceAgent | Content Agent | ...]

3-tier table (appears on product select):
┌─────────────────────────────────────────────────────┐
│              Starter │ Professional│ Enterprise      │
├─────────────────────────────────────────────────────┤
│ Setup         3.5k   │     5k      │     12k+        │
│ Monthly       500    │     800     │     2000        │
│ Implementation 5 days│     7 days  │     14 days     │
│ Support       Email  │  Email+Call │  Priority 4h    │
│ ...                  │             │                 │
├─────────────────────────────────────────────────────┤
│ [Wybierz]            │  [Umów demo]│  [Kontakt]      │
└─────────────────────────────────────────────────────┘

ROI preview (below table):
"Typowy klient oszczędza: 6k PLN/mies
Zwrot inwestycji: 0.8 miesiąca"
```

#### Section 3: What's Included
```
All plans include:
✅ 7-day delivery (or less)
✅ 30-day money back guarantee
✅ Training (1-2h)
✅ Documentation
✅ Email support

Professional+ adds:
✅ Phone support
✅ Priority queue
✅ Quarterly review

Enterprise adds:
✅ White-label option
✅ SLA 99.9%
✅ Dedicated success manager
```

#### Section 4: Payment Terms
```
"Jak płacimy?"
• 50% przy starcie (zaliczka)
• 50% po odbiorze i testach
• Abonament: z góry do 5. dnia miesiąca

"Akceptujemy:"
[Przelew] [Stripe] [Faktura]
```

#### Section 5: Custom Projects
```
"Potrzebujesz czegoś innego?"

For projects >20k PLN:
• Custom quote (3-tier pricing always)
• Ask about budget first (LESSON FROM SAMA SAMA SPACE)
• Pilot discount available (-30% for first-in-niche)

CTA: "Zapytaj o wycenę →"
```

---

### 📚 CASE STUDIES PAGE (/case-studies)

**Goal:** Build trust through real results (even if early-stage)

**Layout:**

#### Section 1: Overview
```
Headline: "Liczby nie kłamią"

Grid of case studies (cards):
┌───────────────────────────────────┐
│ Maszynownia (Content Automation)  │
│ • 40h/mies saved                  │
│ • 5 postów/tydzień automatycznie  │
│ • ROI 900% w 12 miesięcy          │
│ [Czytaj więcej →]                 │
└───────────────────────────────────┘

(Repeat for other cases)
```

#### Section 2: Individual Case Study Page
```
/case-studies/maszynownia

Template:
1. Client Profile (industry, size, team)
2. Challenge (problem before LessManual)
3. Solution (what we implemented)
4. Results (numbers after 30/60/90 days)
5. Testimonial (quote + photo if available)
6. Tech Used (optional: what tools/workflows)
7. CTA: "Chcesz podobnych wyników?" [Umów demo]
```

**Visual:** Before/After metrics chart (animated)

**Note:** Start with 2-3 real cases:
- Maszynownia (Content Automation - DONE)
- Dance Studio (VoiceAgent POC - in testing)
- Rolbest (Content Agent - live showcase)

Add more as they come (target: 1 new case study/week)

---

### ℹ️ ABOUT PAGE (/about)

**Goal:** Humanize brand, build trust, explain "why us"

**Layout:**

#### Section 1: Founder Story
```
Headline: "Od TSL Supply Chain do AI Automation"

Storytelling (3 paragraphs):
• 8 lat w TSL (processów optimization)
• Case: Oszczędność 100k PLN/rok dla klienta
• "Zauważyłem: 80% pracy ludzi to copy-paste"
• → Założyłem LessManual (Oct 2025)

Photo: Bartek (casual, approachable)
```

#### Section 2: Mission & Values
```
"Make Your Business LESSMANUAL"

Values:
✅ Value First - Client saves 3x what they pay
✅ Speed - 7 days to MVP, always
✅ No BS - Real solutions, no courses, no scams
✅ Bootstrap Mindset - Act like runway is 30 days
```

#### Section 3: Why Us vs Competition
```
Table comparison:
┌─────────────────────┬──────────┬─────────┬─────────┐
│                     │   LM     │ Agencje │  DIY    │
├─────────────────────┼──────────┼─────────┼─────────┤
│ Delivery time       │  7 dni   │ 3 mies  │  ?      │
│ Price (standard)    │  5k      │  50k    │  0      │
│ Support             │  ✅      │  ❌     │  ❌     │
│ Polish integrations │  ✅      │  🤷     │  ❌     │
│ Productized         │  ✅      │  ❌     │  N/A    │
└─────────────────────┴──────────┴─────────┴─────────┘
```

#### Section 4: Team (Future)
```
"Na razie solo, ale rosnę"

Current: Bartłomiej Chudzik (Founder & CTO)
Future: (Hiring when MRR >20k)
```

#### Section 5: Tech Stack (Transparency)
```
"Czym budujemy?"

Primary tools:
• n8n (workflow orchestration)
• Claude API (AI brain)
• Supabase (database)
• ElevenLabs (voice)
• Voiceflow (chatbots)

Why these? Speed + reliability + cost-effectiveness
```

---

### 📞 CONTACT PAGE (/contact)

**Goal:** Make it ridiculously easy to reach us (multi-channel)

**Layout:**

#### Section 1: Contact Form
```
Headline: "Masz pytanie? Odpowiadamy w 2h"

Form fields:
• Imię i nazwisko *
• Email *
• Telefon
• Firma
• Jak możemy pomóc? (textarea) *

[Wyślij wiadomość →]

Note: "Odpowiadamy w 2h w dni robocze (9-18)"
```

**Backend:** Form → Supabase → Email notification + Slack webhook

#### Section 2: Alternative Channels
```
"Wolisz gadać?"

📞 Telefon: +48 508 193 843 (9-18, Pon-Pią)
📧 Email: kontakt@lessmanual.ai
💬 WhatsApp: [link]
📅 Umów demo: [Cal.com embed/link]
```

#### Section 3: Office (Optional)
```
"Gdzie jesteśmy?"

LessManual Bartłomiej Chudzik
ul. Długa 33
05-530 Cendrowice
woj. mazowieckie

NIP: 1231589909
REGON: 542947850

Note: "Remote-first - spotykamy się online lub w Warszawie"
```

---

### 📝 BLOG PAGE (/blog)

**Goal:** SEO engine + thought leadership

**Phase:** Post-launch (not MVP)

**Initial Content Strategy:**
- 2 posts/week
- Focus: KSeF deadline, automation ROI, case studies
- Keywords: "automatyzacja dla firm", "ksef automation", "ai dla biznesu"

**Content Pillars (40/40/20 rule):**
- 40% Educational (how-to guides, explainers)
- 40% Case studies & results
- 20% Founder insights & industry trends

**Example Posts (first 10):**
1. "KSeF Deadline 2026 - Co musisz wiedzieć?"
2. "7-Day Automation: Jak wdrażamy systemy w tydzień"
3. "Case Study: Jak Maszynownia oszczędza 40h/mies"
4. "ROI Calculator: Ile kosztuje Cię brak automatyzacji?"
5. "E-commerce Bot: 5 przypadków użycia"
6. "Voice Agent vs Chatbot - Który wybrać?"
7. "Partnership Strategy: 50/50 Revenue Share Model"
8. "Bootstrap Phase: Portfolio > Marża"
9. "n8n vs Make vs Zapier - Porównanie"
10. "RODO Compliance w Automatyzacji"

---

## 🎨 DESIGN SYSTEM

### Components Library (from Figma)

**Buttons:**
```tsx
<Button variant="primary">   // Pear bg + Night text
<Button variant="secondary"> // Night bg + Pear border + Pear text
<Button variant="ghost">     // Transparent + White text
```

**Cards:**
```tsx
<Card variant="product">     // 3D hover effect, glass morphism
<Card variant="testimonial"> // Quote style, minimal
<Card variant="case-study">  // Metric-focused, chart included
```

**Inputs:**
```tsx
<Input />            // Night border, White text, Pear focus
<Textarea />
<Select />
```

**Navigation:**
```tsx
<NavBar sticky dark>  // Dark mode, sticky on scroll
<Footer columns={4}>  // 4-column footer
```

**Animations (Framer Motion):**
- Fade in + Slide up: Hero sections
- Parallax: Background elements on scroll
- 3D tilt: Product cards on hover
- Count up: Number animations
- Progress bar: Timeline sections

---

## 🚀 TECHNICAL SPECIFICATIONS

### Performance Targets

**Lighthouse Scores (mandatory):**
- Performance: ≥90
- Accessibility: 100 (WCAG AAA)
- Best Practices: ≥95
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): <1.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**Bundle Size:**
- First load JS: <200KB
- Images: WebP format, lazy loading
- Fonts: Preloaded, subset

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Mobile Chrome: Android 10+

### Responsive Breakpoints
```css
/* Mobile first */
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Ultra-wide
```

### Accessibility
- **WCAG AAA Compliance** (not AA)
- Semantic HTML5 structure
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader friendly
- Focus indicators (Pear outline on Night bg)
- No animations if `prefers-reduced-motion: reduce`

### SEO
**On-Page:**
- Semantic HTML (h1-h6 hierarchy)
- Meta tags (title, description, OG)
- Structured data (JSON-LD): Organization, WebSite, Service
- Sitemap.xml (auto-generated by Next.js)
- Robots.txt (allow all)

**Schema.org Markup:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LessManual",
  "url": "https://lessmanual.ai",
  "logo": "https://lessmanual.ai/logo.png",
  "description": "AI + Automatyzacja dla polskich firm",
  "founder": {
    "@type": "Person",
    "name": "Bartłomiej Chudzik"
  }
}
```

**Target Keywords (Polish):**
- Primary: "automatyzacja dla firm", "ai dla biznesu", "chatbot dla e-commerce"
- Secondary: "ksef automation", "voice agent", "lead response system"
- Long-tail: "jak zautomatyzować obsługę klienta", "automatyzacja raportowania"

---

## 📊 ANALYTICS & TRACKING

### Analytics Tools
1. **Vercel Analytics** (built-in, privacy-friendly)
2. **Plausible Analytics** (GDPR compliant, no cookies) - Optional
3. **Google Analytics 4** - Only with consent

### Events to Track
**Conversion Events:**
- Demo booking (primary goal)
- Contact form submission
- Phone number click
- Pricing tier selection
- Product page visit

**Engagement Events:**
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page (>30s, >60s, >120s)
- Video play (if demos added)
- Case study read
- ROI calculator use

**Traffic Sources:**
- Organic (SEO)
- Direct (bookmarks, word-of-mouth)
- Referral (partnerships, LinkedIn)
- Social (LinkedIn, Facebook)
- Email (newsletters, follow-ups)

### A/B Testing (Phase 2)
Test variations of:
- Hero headline (3 variants)
- CTA button text ("Umów demo" vs "Zobacz demo" vs "Zacznij teraz")
- Pricing display (monthly-first vs yearly-first)
- Testimonial placement

---

## 🔒 SECURITY & COMPLIANCE

### RODO (GDPR) Compliance
- **Privacy Policy:** Required page (standard template)
- **Cookie Consent:** Banner for GA4 (if used)
- **Data Storage:** EU region only (Supabase EU)
- **Contact Form:** Data encrypted, stored max 90 days, deleted on request
- **Email Marketing:** Double opt-in (Lemlist integration)

### Security Headers
```javascript
// next.config.js
headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' }
]
```

### SSL/TLS
- Enforced HTTPS (Vercel default)
- Certificate auto-renewal
- HSTS header

---

## 🛠️ CONTENT MANAGEMENT

### Content Strategy

**Phase 1 (Launch):**
- Static pages (Homepage, Products, Pricing, Contact, About)
- Content hardcoded in components (no CMS yet)
- Quick edits via code (Edit tool in Claude Code)

**Phase 2 (Growth):**
- Blog with CMS (Sanity.io or Contentful)
- Case studies editable
- Dynamic pricing updates

### Content Sources
- **Oferty:** `/oferty/Radek_Content_Agent_Oferta.md`, `/oferty/Radek_Scraping_Agent_Oferta.md`
- **Brand Guidelines:** `/brand_identity.md`
- **Company Info:** `/lessmanual/company_data.md`
- **Strategy:** `/lessmanual/decisions/strategy.md`

### Content Tone Examples

**Good (✅):**
> "Zaoszczędź 40h miesięcznie. Bot odpowiada w 30 sekund, 24/7. Zwrot w miesiąc."

**Bad (❌):**
> "Zrewolucjonizuj swój workflow dzięki naszej innowacyjnej platformie AI."

**Good (✅):**
> "5,000 PLN setup + 800 PLN/mies. Wdrożenie w 7 dni. 30 dni zwrotu."

**Bad (❌):**
> "Konkurencyjne ceny dostosowane do Twoich potrzeb. Skontaktuj się po wycenę."

---

## 📅 DEVELOPMENT ROADMAP

### Phase 1: MVP (Week 1-2) - PRIORITY

**Week 1 (Days 1-5):**
- [ ] Setup Next.js 14 project (Tailwind + Framer Motion + TypeScript)
- [ ] Extract design tokens from Figma via MCP
- [ ] Create component library (Button, Card, Input, etc)
- [ ] Build Homepage (Hero, Problem/Solution, Products, Social Proof, CTA)
- [ ] Build Pricing page
- [ ] Lighthouse audit (target 90+)

**Week 2 (Days 6-10):**
- [ ] Build /produkty/chatbot page
- [ ] Build /produkty/voiceagent page
- [ ] Build Contact page (form + Supabase backend)
- [ ] Build About page
- [ ] SEO optimization (meta tags, sitemap, schema.org)
- [ ] Deploy to Vercel production
- [ ] DNS setup (lessmanual.ai → Vercel)

**Launch Checklist:**
- [ ] Lighthouse Performance ≥90 ✅
- [ ] All links working ✅
- [ ] Contact form tested (sends to email + Supabase) ✅
- [ ] Mobile responsive (all breakpoints) ✅
- [ ] Dark/Light mode toggle working ✅
- [ ] Analytics connected (Vercel) ✅
- [ ] RODO-compliant (privacy policy, consent) ✅

---

### Phase 2: Growth Features (Week 3-4)

- [ ] Remaining product pages (/content-agent, /scraping-agent, /otoraport)
- [ ] Case studies section (3 initial cases)
- [ ] Blog structure + first 5 posts
- [ ] Interactive ROI calculators per product
- [ ] Demo videos embedded (if available)
- [ ] WhatsApp chat widget
- [ ] A/B testing setup (Vercel Edge Config)

---

### Phase 3: Optimization (Month 2+)

- [ ] CMS integration for blog (Sanity.io)
- [ ] Advanced animations (3D product showcases)
- [ ] Client testimonial video carousel
- [ ] Multi-language support (EN version for Arek USA partnerships)
- [ ] Chatbot on website (dogfooding own product)
- [ ] Lead magnet downloads (e-books, templates)

---

## 💰 BUDGET & RESOURCES

### Development Costs
- **Developer:** Internal (Bartłomiej) - No cost
- **Design:** Figma existing + MCP extraction - No cost
- **Copywriting:** Internal (AI-OS CMO + Bartek review) - No cost

### Recurring Costs (Monthly)
- **Domain:** lessmanual.ai - Already owned, ~60 PLN/year
- **Hosting:** Vercel Free Tier - 0 PLN (sufficient for MVP)
- **Analytics:** Vercel Analytics Free - 0 PLN
- **Backend:** Supabase Free Tier - 0 PLN (contact form DB)
- **Email:** Gmail (kontakt@lessmanual.ai via Google Workspace) - 24 PLN/mies

**Total Monthly:** ~24 PLN

**Upgrade Triggers:**
- Vercel Pro (100 PLN/mies): If >10k visitors/month
- Supabase Pro (25 USD/mies): If >50k DB rows or need better support

---

## 📈 SUCCESS METRICS

### Launch Week Goals (Week 1 post-launch)
- [ ] 100+ unique visitors
- [ ] 5+ demo bookings
- [ ] 3+ contact form submissions
- [ ] 0 critical bugs reported
- [ ] Lighthouse score maintained (≥90)

### Month 1 Goals
- [ ] 1,000+ unique visitors
- [ ] 20+ demo bookings
- [ ] 10+ qualified leads (CSO follow-up)
- [ ] 2+ deals closed from website traffic
- [ ] Blog: 5 posts published, 500+ views

### Quarter 1 Goals (3 months)
- [ ] 5,000+ unique visitors/month
- [ ] 50+ demo bookings/month
- [ ] 20+ deals closed from inbound (website + content)
- [ ] Organic search: Top 10 for "automatyzacja dla firm"
- [ ] 10+ case studies published

---

## 🔄 MAINTENANCE & UPDATES

### Weekly
- [ ] Monitor analytics (Vercel dashboard)
- [ ] Check contact form submissions
- [ ] Respond to inquiries within 2h (CSO)
- [ ] Update case studies (1 new/week if available)

### Monthly
- [ ] Lighthouse audit (maintain 90+)
- [ ] Broken link check
- [ ] Security updates (npm audit, dependencies)
- [ ] Content refresh (pricing changes, new products)
- [ ] A/B test analysis + iterations

### Quarterly
- [ ] Full UX review (heatmaps, session recordings)
- [ ] Conversion funnel optimization
- [ ] SEO audit (keywords, rankings, backlinks)
- [ ] Competitor analysis (update messaging if needed)

---

## 🎯 CALL TO ACTION STRATEGY

### Primary CTA (Homepage, Product Pages)
**Text:** "Umów demo (15 min)"
**Action:** Opens Cal.com modal (embedded) or link to /demo
**Color:** Pear (#DDE000) button, Night text
**Placement:** Hero section (above fold), end of each section, sticky bottom bar (mobile)

### Secondary CTA
**Text:** "Zobacz case studies" / "Sprawdź cennik" / "Zadzwoń: +48 508 193 843"
**Action:** Scrolls to section or links to page
**Color:** Night bg, Pear border, Pear text (ghost button)

### Microcopy CTAs (Throughout)
- "Chcesz podobnych wyników?" (Case study pages)
- "Ile to kosztuje Ciebie?" (ROI calculator)
- "Gotowy na automatyzację?" (Pricing page)
- "Masz pytanie? Odpowiadamy w 2h" (Contact page)

---

## 🚨 RISK MITIGATION

### Risk 1: Slow Performance (Bad UX)
**Mitigation:**
- Use Next.js Image component (automatic optimization)
- Lazy load below-fold content
- Minimize bundle size (tree-shaking, dynamic imports)
- Monitor with Vercel Analytics + Lighthouse CI

### Risk 2: Low Conversion Rate
**Mitigation:**
- Clear value proposition (above fold)
- Multiple CTAs (not just one at bottom)
- Social proof (testimonials, numbers, logos)
- Low-friction demo booking (Cal.com 1-click)
- A/B testing (test headlines, CTAs, layouts)

### Risk 3: Poor SEO (No Organic Traffic)
**Mitigation:**
- Semantic HTML + proper meta tags
- Blog content (2 posts/week)
- Fast loading (Lighthouse 90+)
- Internal linking (blog ↔ products ↔ case studies)
- Backlink strategy (partnerships, guest posts)

### Risk 4: Mobile Experience Issues
**Mitigation:**
- Mobile-first design (test on real devices)
- Touch-friendly buttons (min 44px tap target)
- Readable text (min 16px base font)
- Fast mobile load (optimize images, lazy load)

### Risk 5: Accessibility Complaints
**Mitigation:**
- WCAG AAA compliance from day 1
- Keyboard navigation tested
- Screen reader tested (NVDA, VoiceOver)
- Color contrast verified (automated + manual)
- Alt text on all images

---

## 📞 STAKEHOLDER COMMUNICATION

### CEO (Bartłomiej) - Weekly Updates
**Format:** Brief email + metrics dashboard
**Content:**
- Visitors, demo bookings, leads generated
- Lighthouse score, uptime
- Bugs/issues resolved
- Next week priorities

### Partners (Arek, Paweł, Radek) - Monthly
**Format:** Email + demo link
**Content:**
- New features/pages added
- Case studies featuring their projects
- Lead gen performance (if they refer via website)

---

## 🎓 LEARNING & ITERATION

### Hypothesis Testing
**Test 1: Hero Headline**
- Variant A: "Make Your Business LESSMANUAL"
- Variant B: "Automatyzacja która się zwraca w miesiąc"
- Variant C: "AI dla polskich firm. Bez ściemy."
- Metric: Demo booking rate
- Duration: 2 weeks
- Winner: Implement permanently

**Test 2: CTA Button Text**
- Variant A: "Umów demo (15 min)"
- Variant B: "Zobacz jak to działa"
- Variant C: "Zacznij automatyzację"
- Metric: Click-through rate
- Duration: 1 week

**Test 3: Pricing Display**
- Variant A: Monthly-first (800/mies + 5k setup)
- Variant B: Total-first (5k + 800/mies)
- Variant C: Annual savings (72k saved - 15k cost = 57k profit)
- Metric: Demo bookings from pricing page
- Duration: 2 weeks

---

## ✅ DEFINITION OF DONE

**Website is "DONE" when:**

✅ **Functionality:**
- [ ] All MVP pages live (Homepage, Products, Pricing, Contact, About)
- [ ] Contact form working (sends to email + Supabase)
- [ ] Demo booking working (Cal.com embed)
- [ ] Dark/Light mode toggle functional
- [ ] Mobile responsive (tested on 3+ devices)

✅ **Performance:**
- [ ] Lighthouse Performance ≥90
- [ ] LCP <1.5s
- [ ] No console errors
- [ ] All images optimized (WebP)

✅ **Accessibility:**
- [ ] WCAG AAA compliance verified
- [ ] Keyboard navigation works
- [ ] Screen reader tested (no errors)
- [ ] Color contrast 13.68:1+ (Pear/Night)

✅ **SEO:**
- [ ] Meta tags on all pages
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Schema.org markup added
- [ ] First 5 blog posts published

✅ **Legal:**
- [ ] Privacy Policy page live
- [ ] Cookie consent banner (if GA4 used)
- [ ] RODO-compliant contact form

✅ **Analytics:**
- [ ] Vercel Analytics connected
- [ ] Key events tracked (demo bookings, form submissions)
- [ ] Dashboard accessible to CEO

✅ **Launch:**
- [ ] Domain pointed to Vercel (lessmanual.ai)
- [ ] SSL certificate active
- [ ] Production deployment successful
- [ ] Smoke tests passed (all links working)

---

## 📚 APPENDIX

### Reference Documents
- Brand Identity: `/brand_identity.md`
- Company Data: `/lessmanual/company_data.md`
- Strategy: `/lessmanual/decisions/strategy.md`
- Tech Stack: `/lessmanual/decisions/tech_stack.md`
- Website Architecture: `/lessmanual/decisions/website_architecture_2025-10-20.md`
- CLAUDE.md (Website Prompt): `/lessmanual-website-CLAUDE.md`

### Competitor Websites (For Reference)
- LeftClick.ai (USA, $100k/month) - Enterprise positioning
- Make.com - SaaS automation
- n8n.io - Open-source automation

### Design Inspiration
- Dark mode: GitHub, Vercel, Linear
- Minimalist: Apple, Stripe, Figma
- B2B SaaS: HubSpot, Intercom, Calendly

### Content Templates
- Email: `/oferty/Radek_Scraping_Agent_Oferta.md`
- Case Study: `/n8n workflows/sales_collateral/case_studies/`
- One-Pagers: `/n8n workflows/sales_collateral/one_pagers/`

---

## 🎬 NEXT IMMEDIATE STEPS

**Right now (today):**
1. ✅ Review this PRD (CEO/CTO alignment)
2. 🟡 Create separate project: `npx create-next-app@latest lessmanual-website`
3. 🟡 Copy CLAUDE.md to new project
4. 🟡 Connect Figma MCP
5. 🟡 Extract design tokens from Figma

**Tomorrow:**
1. Build component library (Button, Card, Input, Nav, Footer)
2. Create Homepage layout (wireframe → components)
3. Implement Hero section with animations

**This week:**
1. Complete MVP pages (Homepage, Pricing, Contact, ChatBot, VoiceAgent)
2. Lighthouse audit + optimization
3. Deploy to Vercel
4. DNS configuration

**Launch target:** October 31, 2025 (11 days from now)

---

**Document Version:** 1.0
**Last Updated:** 2025-10-20
**Status:** 🟢 Approved - Ready for Development
**Owner:** CTO (Bartłomiej Chudzik)
**Review Date:** 2025-11-01 (Post-Launch Review)

---

**🚀 Ready to build? Let's make the web LESSMANUAL.**
