# LessManual Website - Comprehensive Task Breakdown
**Timeline:** 12 days to November 1, 2025
**Scope:** 3 pages (Homepage, /o-nas, /blog, /faq)
**Strategy:** Contact-first, dogfooding (chatbot + voice agent)

---

## 📊 EXECUTIVE SUMMARY

**Total Tasks:** 31
**Critical Path:** Foundation → Components → Homepage → Dogfooding → Optimization → Launch
**Parallelization Potential:** High (Days 3-9 have multiple independent tasks)
**Risk Areas:** Chatbot integration (Days 6-7), Lighthouse optimization (Days 10-11)

---

## 🎯 PHASE OVERVIEW

| Phase | Days | Tasks | Status | Dependencies |
|-------|------|-------|--------|-------------|
| Phase 1: Foundation | 1-2 | 5 | pending | None (start here) |
| Phase 2: Homepage | 3-5 | 8 | pending | Phase 1 complete |
| Phase 3: Dogfooding | 6-7 | 3 | pending | Supabase setup |
| Phase 4: Secondary Pages | 8-9 | 3 | pending | Component library |
| Phase 5: Optimization | 10-11 | 4 | pending | All pages built |
| Phase 6: Launch | 12 | 3 | pending | Phase 5 complete |

---

## 📋 DETAILED TASK BREAKDOWN

### PHASE 1: Foundation & Setup (Days 1-2)
**Goal:** Establish technical foundation for rapid development

#### Task 1.1: Extract Design Tokens from Figma
**Priority:** CRITICAL (blocks all UI work)
**Estimated Time:** 4 hours
**Dependencies:** None

**Subtasks:**
1. Connect to Figma UI Kit via MCP
2. Extract color palette:
   - Primary: `night` #0C0D0A (dark background)
   - Accent: `pear` #DDE000 (lime green CTA)
   - Highlight: `tekhelet` #5716A2 (purple accents)
   - **Replace all purple from template with LessManual colors**
3. Extract spacing scale (4, 8, 16, 24, 32, 48, 64, 96, 128)
4. Extract typography (font families, weights, sizes, line heights)
5. Export component patterns (button variants, card styles, form inputs)
6. Save to `src/lib/design-tokens.ts`
7. Update `tailwind.config.js` with custom colors and spacing

**Deliverables:**
- `src/lib/design-tokens.ts`
- `tailwind.config.js` (extended)
- `public/images/` (exported assets from Figma)

**Agent:** `ui-ux-designer` (for design token analysis)
**Verification:** Colors match brand, all spacing values in Tailwind config

---

#### Task 1.2: Setup Supabase Project
**Priority:** CRITICAL (blocks forms, ROI calculator, chatbot)
**Estimated Time:** 3 hours
**Dependencies:** None

**Subtasks:**
1. Create Supabase project (PostgreSQL database)
2. Create tables:
   - `leads` (name, email, phone, company, message, industry, created_at)
   - `roi_calculations` (inputs, results, user_id, created_at)
   - `chat_conversations` (user_id, messages, context, created_at)
3. Setup Row Level Security (RLS) policies
4. Generate API keys (anon, service role)
5. Add environment variables to `.env.local`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Install Supabase client: `npm install @supabase/supabase-js`
7. Create `src/lib/supabase.ts` (client initialization)

**Deliverables:**
- Supabase project live
- Database schema deployed
- Environment variables configured
- `src/lib/supabase.ts`

**Agent:** `supabase-schema-architect` (for database design)
**Verification:** Tables created, RLS policies active, can insert/query test data

---

#### Task 1.3: Configure i18n with next-intl
**Priority:** HIGH (blocks all content work)
**Estimated Time:** 2 hours
**Dependencies:** None

**Subtasks:**
1. Install next-intl: `npm install next-intl`
2. Create locale structure:
   - `src/app/[locale]/layout.tsx`
   - `src/app/[locale]/page.tsx`
   - `src/i18n/config.ts` (locales: pl, en)
   - `src/i18n/request.ts` (server-side detection)
3. Create translation files:
   - `src/messages/pl.json` (Polish - PRIMARY)
   - `src/messages/en.json` (English - SECONDARY)
4. Setup routing:
   - Default: `/` → redirect to `/pl`
   - Polish: `/pl/*`
   - English: `/en/*`
5. Create LanguageSwitcher component
6. Test locale switching

**Deliverables:**
- i18n routing configured
- Translation files structure
- LanguageSwitcher component
- Both locales working

**Agent:** None (straightforward config)
**Verification:** Can switch between `/pl` and `/en`, translations load correctly

---

#### Task 1.4: Create Core Component Library
**Priority:** CRITICAL (blocks all sections)
**Estimated Time:** 6 hours
**Dependencies:** Task 1.1 (design tokens)

**Subtasks:**
1. Create `src/components/ui/` directory
2. Build core components:
   - **Button** (variants: primary, secondary, outline, ghost, sizes: sm, md, lg)
   - **Card** (with hover effects, shadow variants)
   - **Input** (text, email, tel, textarea with validation states)
   - **Accordion** (for FAQ, expandable sections)
   - **Modal** (for chatbot, forms)
3. Use design tokens for all styling
4. Add TypeScript interfaces for props
5. Add accessibility (ARIA labels, keyboard nav)
6. Document usage in Storybook (optional, Phase 2)

**Deliverables:**
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Accordion.tsx`
- `src/components/ui/Modal.tsx`

**Agent:** `ui-ux-designer` (for design polish)
**Verification:** All components render, responsive, accessible, match Figma patterns

---

#### Task 1.5: Setup Framer Motion Animation Library
**Priority:** MEDIUM (needed for homepage animations)
**Estimated Time:** 2 hours
**Dependencies:** None

**Subtasks:**
1. Install Framer Motion: `npm install framer-motion`
2. Create `src/lib/animations.ts`
3. Define reusable animation variants:
   - `fadeInUp` (for text reveals)
   - `staggerChildren` (for lists)
   - `scaleOnHover` (for cards)
   - `slideInLeft` / `slideInRight` (for sections)
   - `rotate3D` (for product cards)
4. Create animation wrapper components:
   - `src/components/animations/FadeIn.tsx`
   - `src/components/animations/SlideIn.tsx`
   - `src/components/animations/ScaleHover.tsx`

**Deliverables:**
- `src/lib/animations.ts` (variants)
- Animation wrapper components
- Performance optimized (GPU-accelerated transforms)

**Agent:** None (standard setup)
**Verification:** Animations run at 60fps, no layout shifts

---

### PHASE 2: Homepage Sections (Days 3-5)
**Goal:** Build all 8 homepage sections pixel-perfect to PRD

#### Task 2.1: Build Hero Section
**Priority:** CRITICAL (first impression)
**Estimated Time:** 5 hours
**Dependencies:** Task 1.1, 1.4, 1.5 (tokens, components, animations)

**PRD Requirements:**
- Headline: "Make Your Business LESSMANUAL"
- Subheadline: "AI + Automatyzacja dla polskich firm"
- CTA button: "Umów demo (15 min)" → Cal.com
- 3D animated product cards (ChatBot, Voice Agent, Custom AI)
- Chatbot bubble trigger (bottom right)
- Background: subtle gradient or geometric pattern

**Subtasks:**
1. Create `src/components/sections/Hero.tsx`
2. Implement 3D card animation (Framer Motion + CSS transforms)
3. Add chatbot bubble (floating, animated, triggers modal on click)
4. Add CTA button (links to Cal.com booking)
5. Integrate translations (PL/EN)
6. Add responsive layout (mobile: stacked, desktop: side-by-side)
7. Optimize performance (lazy load images, GPU acceleration)

**Deliverables:**
- `src/components/sections/Hero.tsx`
- Animations smooth (60fps)
- Mobile responsive
- Both languages work

**Agent:** `ui-ux-designer` (for visual polish)
**Verification:** Matches PRD, Lighthouse Performance ≥90, animations smooth

---

#### Task 2.2: Build Specjalizacje Section
**Priority:** HIGH
**Estimated Time:** 4 hours
**Dependencies:** Task 1.4 (Card component)

**PRD Requirements:**
- 3 expandable cards:
  1. **Obsługa Klienta** (customer support automation)
  2. **Lead Generation** (qualification automation)
  3. **Content & Marketing** (content creation automation)
- Each card: icon, title, description, expand/collapse interaction
- Hover effects (scale, shadow)

**Subtasks:**
1. Create `src/components/sections/Specjalizacje.tsx`
2. Design card expand/collapse animation (Framer Motion)
3. Add icons (custom SVG or library)
4. Implement hover effects
5. Add translations (PL/EN)
6. Test keyboard navigation (Tab, Enter to expand)

**Deliverables:**
- `src/components/sections/Specjalizacje.tsx`
- Expandable cards working
- Smooth animations

**Agent:** `ui-ux-designer` (for interaction design)
**Verification:** Cards expand/collapse smoothly, accessible

---

#### Task 2.3: Build Jak to działa Section
**Priority:** HIGH
**Estimated Time:** 4 hours
**Dependencies:** Task 1.4, 1.5

**PRD Requirements:**
- 4-step timeline:
  1. **Konsultacja** (15-min demo call)
  2. **Analiza** (process mapping)
  3. **Wdrożenie** (AI setup in 2 weeks)
  4. **Rozwój** (continuous optimization)
- Visual progression (connected timeline)
- Scroll-triggered animations (reveal on scroll)

**Subtasks:**
1. Create `src/components/sections/JakToDziala.tsx`
2. Design timeline layout (vertical on mobile, horizontal on desktop)
3. Add scroll-triggered animations (Framer Motion `useInView`)
4. Add step icons/illustrations
5. Add translations (PL/EN)
6. Test on mobile (touch-friendly)

**Deliverables:**
- `src/components/sections/JakToDziala.tsx`
- Timeline animates on scroll
- Mobile responsive

**Agent:** `ui-ux-designer` (for timeline design)
**Verification:** Animations trigger on scroll, readable on all devices

---

#### Task 2.4: Build ROI Calculator Section
**Priority:** CRITICAL (unique value prop)
**Estimated Time:** 6 hours
**Dependencies:** Task 1.2 (Supabase), Task 1.4 (Input components)

**PRD Requirements:**
- Interactive calculator with inputs:
  - Number of support agents
  - Average hourly cost per agent
  - Hours saved per week
- Real-time calculation display
- Save results to Supabase (`roi_calculations` table)
- Conversion tracking (Google Analytics event)
- CTA: "See how we can help" → contact form

**Subtasks:**
1. Create `src/components/sections/ROICalculator.tsx`
2. Build calculation logic (savings formula)
3. Add real-time result updates (React state)
4. Integrate Supabase (save calculation on submit)
5. Add form validation (minimum values, realistic ranges)
6. Add translations (PL/EN)
7. Track conversion event (GA4)

**Deliverables:**
- `src/components/sections/ROICalculator.tsx`
- Calculator functional
- Results save to Supabase
- Analytics tracking works

**Agent:** `nextjs-api-builder` (for Supabase integration)
**Verification:** Calculations accurate, data saves correctly, no errors

---

#### Task 2.5: Build Nasi klienci Section
**Priority:** MEDIUM
**Estimated Time:** 3 hours
**Dependencies:** Task 1.4 (Card component)

**PRD Requirements:**
- Client logos grid (6-8 logos)
- Testimonial slider (2-3 testimonials)
- Framer Motion carousel animation
- Smooth transitions

**Subtasks:**
1. Create `src/components/sections/NasiKlienci.tsx`
2. Add client logos (placeholder or real)
3. Build testimonial slider (Framer Motion carousel)
4. Add auto-play (5s interval)
5. Add manual navigation (dots, arrows)
6. Add translations (PL/EN)

**Deliverables:**
- `src/components/sections/NasiKlienci.tsx`
- Testimonial slider working
- Auto-play enabled

**Agent:** `ui-ux-designer` (for carousel design)
**Verification:** Slider smooth, logos display correctly

---

#### Task 2.6: Build FAQ Section (Homepage)
**Priority:** MEDIUM
**Estimated Time:** 2 hours
**Dependencies:** Task 1.4 (Accordion component)

**PRD Requirements:**
- 5 questions on homepage (preview of /faq page)
- Accordion expand/collapse
- Smooth animations

**Subtasks:**
1. Create `src/components/sections/FAQPreview.tsx`
2. Use Accordion component from library
3. Add 5 most common questions (from PRD)
4. Add translations (PL/EN)
5. Link to full /faq page

**Deliverables:**
- `src/components/sections/FAQPreview.tsx`
- 5 questions display
- Link to /faq works

**Agent:** None (straightforward)
**Verification:** Accordion works, questions relevant

---

#### Task 2.7: Build Contact Form Section
**Priority:** CRITICAL (main conversion point)
**Estimated Time:** 5 hours
**Dependencies:** Task 1.2 (Supabase), Task 1.4 (Input components)

**PRD Requirements:**
- Form fields: name, email, phone (optional), company, message, industry (dropdown)
- Supabase integration (save to `leads` table)
- Voice Agent trigger logic (if phone provided)
- Success message + confirmation email (n8n)
- Error handling (validation, server errors)
- RODO compliance checkbox

**Subtasks:**
1. Create `src/components/sections/ContactForm.tsx`
2. Build form with validation (Zod schema)
3. Integrate Supabase (insert to `leads`)
4. Add Voice Agent trigger (if phone provided)
5. Add success/error states
6. Add RODO checkbox (required)
7. Add translations (PL/EN)
8. Test form submission flow

**Deliverables:**
- `src/components/sections/ContactForm.tsx`
- Form saves to Supabase
- Voice Agent triggers correctly
- RODO compliant

**Agent:** `nextjs-api-builder` (for form logic), `security-audit-agent` (for validation)
**Verification:** Form submits, data in Supabase, Voice Agent triggers, no XSS vulnerabilities

---

#### Task 2.8: Build Footer Component
**Priority:** LOW (but needed for nav)
**Estimated Time:** 2 hours
**Dependencies:** Task 1.4 (base components)

**PRD Requirements:**
- Navigation links (Produkty, O nas, Blog, FAQ, Kontakt)
- Social media icons (LinkedIn, Twitter/X)
- Legal links (Privacy Policy, Terms of Service)
- Responsive layout (4 columns desktop, stacked mobile)

**Subtasks:**
1. Create `src/components/Footer.tsx`
2. Add navigation links
3. Add social media icons
4. Add legal links (placeholder pages)
5. Add translations (PL/EN)
6. Test responsive layout

**Deliverables:**
- `src/components/Footer.tsx`
- All links work
- Responsive

**Agent:** None (straightforward)
**Verification:** Links work, mobile-friendly

---

### PHASE 3: Dogfooding Features (Days 6-7)
**Goal:** Implement ChatBot + Voice Agent (showcase own products)

#### Task 3.1: Build Custom Chatbot
**Priority:** CRITICAL (unique differentiator)
**Estimated Time:** 8 hours
**Dependencies:** Task 1.2 (Supabase), Task 1.4 (Modal component)

**PRD Requirements:**
- Custom React component (NOT 3rd-party widget)
- Claude API integration (Anthropic SDK)
- Conversation qualification flow:
  1. Greet user
  2. Ask about business type
  3. Ask about pain points
  4. Recommend product (ChatBot, Voice Agent, or Custom)
  5. Offer demo booking (Cal.com link)
- Context management (remember conversation)
- Save conversations to Supabase (`chat_conversations`)
- Floating bubble trigger (bottom right)
- Responsive modal (full-screen mobile, sidebar desktop)

**Subtasks:**
1. Create `src/components/Chatbot/` directory
2. Build chat UI components:
   - `ChatBubble.tsx` (trigger)
   - `ChatModal.tsx` (conversation window)
   - `MessageList.tsx` (message history)
   - `MessageInput.tsx` (user input)
3. Integrate Claude API:
   - Install `@anthropic-ai/sdk`
   - Create `/api/chat` route (Next.js API route)
   - Implement conversation logic (system prompt)
4. Add conversation context management (React Context API)
5. Save conversations to Supabase
6. Add translations (PL/EN) for system messages
7. Test qualification flow (full conversation)
8. Add error handling (API failures, rate limits)

**Deliverables:**
- `src/components/Chatbot/` (full component)
- `/api/chat` route
- Claude API integrated
- Conversations save to Supabase

**Agent:** `nextjs-api-builder` (for API route), `security-audit-agent` (for API key security)
**Verification:** Chatbot qualifies users, recommends correct product, saves conversations

---

#### Task 3.2: Integrate Voice Agent
**Priority:** HIGH
**Estimated Time:** 5 hours
**Dependencies:** Task 2.7 (Contact form), Task 3.3 (n8n)

**PRD Requirements:**
- ElevenLabs voice integration
- Trigger: Contact form submitted WITH phone number
- Flow:
  1. Form submit → n8n webhook
  2. n8n calls ElevenLabs API
  3. Voice Agent calls phone number (within 2 minutes)
  4. Conversation: intro, qualification, demo booking
- Track call status (initiated, completed, failed)

**Subtasks:**
1. Create ElevenLabs account (API key)
2. Design voice agent script (conversational flow)
3. Add n8n workflow node (ElevenLabs integration)
4. Test voice call flow (test phone number)
5. Add call status tracking (Supabase table: `voice_calls`)
6. Add error handling (API failures, invalid phone)
7. Test end-to-end flow

**Deliverables:**
- ElevenLabs integration
- n8n workflow node
- Voice Agent calls working

**Agent:** `n8n-workflow-architect` (for workflow design)
**Verification:** Voice Agent calls phone, conversation flows naturally, tracking works

---

#### Task 3.3: Setup n8n Workflows
**Priority:** CRITICAL (automation backbone)
**Estimated Time:** 4 hours
**Dependencies:** Task 1.2 (Supabase)

**PRD Requirements:**
- Workflow 1: Contact Form Handler
  - Trigger: Form submit
  - Actions:
    1. Save to Supabase (`leads` table)
    2. Create ClickUp task (Sales Pipeline)
    3. Send Slack notification (#leads channel)
    4. Send confirmation email (Gmail)
    5. If phone provided: Trigger Voice Agent (ElevenLabs)
- Workflow 2: ROI Calculator (optional)
  - Trigger: Calculation saved
  - Actions:
    1. Track in Google Analytics
    2. Send to ClickUp (Analytics list)

**Subtasks:**
1. Setup n8n instance (cloud or self-hosted)
2. Create Workflow 1 (contact form):
   - Webhook trigger
   - Supabase node (insert)
   - ClickUp node (create task)
   - Slack node (send message)
   - Gmail node (send email)
   - ElevenLabs node (conditional)
3. Test Workflow 1 end-to-end
4. Create Workflow 2 (ROI calculator)
5. Test Workflow 2
6. Add error handling (retry logic, alerts)

**Deliverables:**
- n8n workflows live
- All integrations working
- Error handling in place

**Agent:** `n8n-workflow-architect` (for workflow design)
**Verification:** Form submit triggers all actions, ClickUp tasks created, emails sent

---

### PHASE 4: Secondary Pages (Days 8-9)
**Goal:** Build /o-nas, /blog, /faq pages

#### Task 4.1: Build /o-nas Page
**Priority:** HIGH (brand credibility)
**Estimated Time:** 4 hours
**Dependencies:** Task 1.4 (components)

**PRD Requirements:**
- Founder story (personal narrative)
- Mission statement (why LessManual exists)
- Values (transparency, efficiency, innovation)
- Tech stack transparency (show tools used)
- Team photos (founder + future team)
- Call-to-action (book demo)

**Subtasks:**
1. Create `src/app/[locale]/o-nas/page.tsx`
2. Write founder story content (PL/EN)
3. Add mission/values sections
4. Add tech stack showcase (logos, descriptions)
5. Add team photos (professional headshots)
6. Add CTA (demo booking)
7. Add SEO metadata (title, description, OG image)
8. Test responsive layout

**Deliverables:**
- `/o-nas` page live
- Content compelling
- Both languages work

**Agent:** `creative-copywriter` (for founder story), `seo-aeo-geo-specialist` (for SEO)
**Verification:** Content engaging, SEO optimized, mobile-friendly

---

#### Task 4.2: Build /blog Structure
**Priority:** MEDIUM (content marketing setup)
**Estimated Time:** 5 hours
**Dependencies:** Task 1.4 (components)

**PRD Requirements:**
- Blog list page (`/blog`)
- Single post template (`/blog/[slug]`)
- MDX support (for rich content)
- Optional: 1 sample post ("Why Polish Businesses Need AI Automation")

**Subtasks:**
1. Install MDX: `npm install @next/mdx @mdx-js/loader`
2. Configure Next.js for MDX (next.config.js)
3. Create `src/app/[locale]/blog/page.tsx` (list page)
4. Create `src/app/[locale]/blog/[slug]/page.tsx` (single post)
5. Create `src/content/blog/` directory (MDX files)
6. Build BlogCard component (thumbnail, title, excerpt, date)
7. Add pagination (if >10 posts)
8. Write 1 sample post (optional)
9. Add SEO metadata (per post)
10. Test routing (`/blog` and `/blog/sample-post`)

**Deliverables:**
- `/blog` page live
- `/blog/[slug]` template working
- MDX rendering correctly
- Optional: 1 sample post

**Agent:** `technical-documentation-writer` (for MDX setup), `creative-copywriter` (for sample post)
**Verification:** Blog structure works, MDX renders, SEO configured

---

#### Task 4.3: Build /faq Page
**Priority:** MEDIUM (reduce support burden)
**Estimated Time:** 3 hours
**Dependencies:** Task 1.4 (Accordion component), Task 2.6 (FAQ content)

**PRD Requirements:**
- ~20 questions in categories:
  1. General (What is LessManual?, How does it work?)
  2. Products (ChatBot, Voice Agent, Custom AI)
  3. Pricing (Cost, ROI, Payment terms)
  4. Technical (Integrations, Security, RODO)
  5. Support (Onboarding, Training, Updates)
- Searchable (filter questions by keyword)
- Category filters (tabs or sidebar)
- Expandable accordion (same as homepage)

**Subtasks:**
1. Create `src/app/[locale]/faq/page.tsx`
2. Structure FAQ data (JSON or TypeScript)
3. Build search functionality (filter by keyword)
4. Build category filters (tabs)
5. Use Accordion component (from library)
6. Add translations (PL/EN)
7. Add SEO metadata (FAQ schema.org markup)
8. Test search and filters

**Deliverables:**
- `/faq` page live
- ~20 questions added
- Search and filters work

**Agent:** `creative-copywriter` (for FAQ content)
**Verification:** Questions comprehensive, search works, SEO schema added

---

### PHASE 5: Optimization (Days 10-11)
**Goal:** Achieve Lighthouse 90+, WCAG AAA, mobile perfection

#### Task 5.1: Mobile Optimization
**Priority:** CRITICAL (50%+ traffic mobile)
**Estimated Time:** 6 hours
**Dependencies:** All pages built

**Subtasks:**
1. Test on 3 real devices (iPhone, Android, iPad)
2. Fix layout issues:
   - Hero section (text readability)
   - 3D cards (performance on mobile)
   - Forms (touch-friendly, keyboard behavior)
   - Chatbot modal (full-screen on mobile)
3. Optimize touch interactions (tap targets ≥44px)
4. Test landscape orientation
5. Test different screen sizes (iPhone SE, iPhone 14 Pro Max, iPad)
6. Fix any visual bugs (overflow, z-index, spacing)

**Deliverables:**
- All pages mobile-optimized
- Touch interactions smooth
- No layout bugs

**Agent:** `ui-ux-designer` (for mobile design fixes)
**Verification:** Test on 3 devices, no issues found

---

#### Task 5.2: Lighthouse Optimization
**Priority:** CRITICAL (SEO + performance)
**Estimated Time:** 8 hours
**Dependencies:** All pages built

**Target Scores:**
- Performance: ≥90
- Accessibility: 100
- Best Practices: ≥95
- SEO: 100

**Subtasks:**
1. Run Lighthouse audit on all pages
2. Fix Performance issues:
   - Lazy load below-fold images
   - Optimize image formats (WebP, AVIF)
   - Code splitting (dynamic imports)
   - Reduce bundle size (<200KB first load)
   - Defer non-critical JS
3. Fix Accessibility issues:
   - Alt text for all images
   - ARIA labels for interactive elements
   - Keyboard navigation (Tab, Enter, Esc)
   - Color contrast (WCAG AAA)
4. Fix Best Practices issues:
   - HTTPS only
   - No console errors
   - Secure cookies
5. Fix SEO issues:
   - Meta descriptions
   - Canonical URLs
   - hreflang tags (PL/EN)
   - Structured data (schema.org)
6. Re-run Lighthouse, verify scores

**Deliverables:**
- Lighthouse Performance ≥90
- Lighthouse Accessibility = 100
- All issues resolved

**Agent:** `performance-optimizer` (for Lighthouse fixes)
**Verification:** Lighthouse scores meet targets on all pages

---

#### Task 5.3: Accessibility Audit
**Priority:** CRITICAL (WCAG AAA compliance)
**Estimated Time:** 4 hours
**Dependencies:** All pages built

**Subtasks:**
1. Test keyboard navigation (all pages)
   - Tab through all interactive elements
   - Enter/Space to activate
   - Esc to close modals
2. Test screen readers:
   - VoiceOver (Mac)
   - NVDA (Windows)
   - TalkBack (Android)
3. Test color contrast (WCAG AAA = 7:1)
   - Check all text/background combinations
   - Fix low-contrast issues
4. Test with accessibility tools:
   - axe DevTools (Chrome extension)
   - WAVE (web accessibility evaluation)
5. Fix all critical/serious issues
6. Document accessibility features (README)

**Deliverables:**
- WCAG AAA compliant
- Keyboard navigation works
- Screen reader friendly

**Agent:** `checkpoint-tester` (for accessibility testing)
**Verification:** No critical accessibility issues, screen readers work

---

#### Task 5.4: SEO Implementation
**Priority:** HIGH (organic traffic)
**Estimated Time:** 4 hours
**Dependencies:** All pages built

**Subtasks:**
1. Add meta tags to all pages:
   - Title (unique, <60 chars)
   - Description (unique, <160 chars)
   - OG image (1200x630px)
   - Twitter card
2. Generate sitemap.xml (Next.js built-in)
3. Create robots.txt (allow all crawlers)
4. Add structured data (schema.org):
   - Organization markup
   - WebSite markup
   - FAQPage markup (for /faq)
   - LocalBusiness markup (if applicable)
5. Add hreflang tags (PL/EN alternates)
6. Test with Google Rich Results Test
7. Submit to Google Search Console

**Deliverables:**
- Meta tags on all pages
- Sitemap.xml live
- Robots.txt configured
- Structured data added

**Agent:** `seo-aeo-geo-specialist` (for SEO optimization)
**Verification:** Google Rich Results Test passes, Search Console indexed

---

### PHASE 6: Launch (Day 12)
**Goal:** Deploy to production, final checks

#### Task 6.1: Production Deployment to Vercel
**Priority:** CRITICAL
**Estimated Time:** 2 hours
**Dependencies:** Phase 5 complete

**Subtasks:**
1. Review environment variables (production values)
2. Build production bundle: `npm run build`
3. Test production build locally: `npm run start`
4. Deploy to Vercel: `vercel --prod`
5. Configure environment variables in Vercel dashboard
6. Setup edge functions (if using)
7. Enable Vercel Analytics
8. Test production deployment (all pages load)

**Deliverables:**
- Production deployment live
- Environment variables set
- Vercel Analytics enabled

**Agent:** None (straightforward deployment)
**Verification:** Production site loads, no errors, environment variables work

---

#### Task 6.2: DNS Configuration
**Priority:** CRITICAL
**Estimated Time:** 1 hour
**Dependencies:** Task 6.1 (deployment)

**Subtasks:**
1. Purchase domain: `lessmanual.ai` (if not owned)
2. Point DNS to Vercel:
   - A record: `76.76.21.21`
   - CNAME record: `cname.vercel-dns.com`
3. Configure in Vercel dashboard (Domains tab)
4. Wait for SSL certificate (auto-generated by Vercel)
5. Setup www redirect: `www.lessmanual.ai` → `lessmanual.ai`
6. Test DNS propagation: `dig lessmanual.ai`
7. Test HTTPS: `https://lessmanual.ai`

**Deliverables:**
- Domain pointing to Vercel
- SSL certificate active
- www redirect working

**Agent:** None (DNS configuration)
**Verification:** `lessmanual.ai` loads, HTTPS works, www redirects

---

#### Task 6.3: Final Smoke Tests
**Priority:** CRITICAL (last check before announcement)
**Estimated Time:** 2 hours
**Dependencies:** Task 6.2 (DNS)

**Checklist:**
- [ ] All pages load (/, /o-nas, /blog, /faq)
- [ ] Both languages work (/pl, /en)
- [ ] Forms submit correctly (contact form)
- [ ] Supabase data saves (check admin panel)
- [ ] Chatbot works (full conversation flow)
- [ ] Voice Agent triggers (test with phone number)
- [ ] n8n workflows execute (ClickUp task, Slack, email)
- [ ] ROI Calculator calculates (saves to Supabase)
- [ ] Lighthouse scores ≥90 (run audit)
- [ ] Mobile responsive (test on 3 devices)
- [ ] Analytics tracking (Vercel Analytics, GA4)
- [ ] No console errors (check DevTools)
- [ ] All links work (internal + external)
- [ ] Legal pages exist (Privacy Policy, Terms)

**Deliverables:**
- Smoke test checklist complete
- All tests passing
- Ready for public announcement

**Agent:** `checkpoint-tester` (for final verification)
**Verification:** All checklist items ✅, no critical issues

---

## 🔄 DEPENDENCY GRAPH

```
Foundation (Days 1-2)
├── Task 1.1: Design Tokens ─────┬──> Task 1.4: Component Library
├── Task 1.2: Supabase ──────────┼──> Task 2.4: ROI Calculator
├── Task 1.3: i18n ──────────────┤   Task 2.7: Contact Form
├── Task 1.4: Components ────────┤   Task 3.1: Chatbot
└── Task 1.5: Animations ────────┤   Task 3.2: Voice Agent
                                  │   Task 3.3: n8n Workflows
                                  │
Homepage (Days 3-5)               │
├── Task 2.1: Hero ──────────────┤
├── Task 2.2: Specjalizacje ─────┤
├── Task 2.3: Jak to działa ─────┤
├── Task 2.4: ROI Calculator ────┤
├── Task 2.5: Nasi klienci ──────┤
├── Task 2.6: FAQ Preview ───────┤
├── Task 2.7: Contact Form ──────┼──> Task 3.2: Voice Agent
└── Task 2.8: Footer ────────────┤
                                  │
Dogfooding (Days 6-7)            │
├── Task 3.1: Chatbot ───────────┤
├── Task 3.2: Voice Agent ───────┤
└── Task 3.3: n8n Workflows ─────┤
                                  │
Secondary Pages (Days 8-9)       │
├── Task 4.1: /o-nas ────────────┤
├── Task 4.2: /blog ─────────────┤
└── Task 4.3: /faq ──────────────┤
                                  │
Optimization (Days 10-11) ◄──────┘
├── Task 5.1: Mobile Optimization
├── Task 5.2: Lighthouse Optimization
├── Task 5.3: Accessibility Audit
└── Task 5.4: SEO Implementation
                                  │
Launch (Day 12) ◄─────────────────┘
├── Task 6.1: Production Deployment
├── Task 6.2: DNS Configuration
└── Task 6.3: Final Smoke Tests
```

---

## ⚡ PARALLELIZATION OPPORTUNITIES

### Days 1-2 (Foundation)
**Sequential:** Task 1.1 → Task 1.4 (design tokens before components)
**Parallel:** Task 1.2, 1.3, 1.5 (independent of design tokens)

**Recommended order:**
1. Start Task 1.1 (design tokens) - CRITICAL PATH
2. While extracting tokens, start Task 1.2 (Supabase), 1.3 (i18n), 1.5 (animations) in parallel
3. After Task 1.1 done, start Task 1.4 (components)

---

### Days 3-5 (Homepage)
**High parallelization potential** - most sections independent

**Parallel groups:**
- Group A (Day 3): Task 2.1 (Hero), Task 2.2 (Specjalizacje), Task 2.8 (Footer)
- Group B (Day 4): Task 2.3 (Jak to działa), Task 2.5 (Nasi klienci), Task 2.6 (FAQ)
- Group C (Day 5): Task 2.4 (ROI Calculator), Task 2.7 (Contact Form) ← CRITICAL

**Note:** Task 2.4 and 2.7 are complex, allocate full day each

---

### Days 6-7 (Dogfooding)
**Mostly sequential** - Voice Agent depends on n8n

**Recommended order:**
1. Day 6 morning: Task 3.3 (n8n workflows) - CRITICAL
2. Day 6 afternoon: Task 3.1 (Chatbot) - PARALLEL with n8n testing
3. Day 7: Task 3.2 (Voice Agent) - after n8n confirmed working

---

### Days 8-9 (Secondary Pages)
**High parallelization** - all pages independent

**Parallel groups:**
- Day 8: Task 4.1 (/o-nas), Task 4.2 (/blog) in parallel
- Day 9: Task 4.3 (/faq)

---

### Days 10-11 (Optimization)
**Mostly sequential** - Lighthouse audit finds issues for other tasks

**Recommended order:**
1. Day 10 morning: Task 5.1 (Mobile) - CRITICAL PATH
2. Day 10 afternoon: Task 5.2 (Lighthouse) - may reveal issues
3. Day 11 morning: Task 5.3 (Accessibility), 5.4 (SEO) in parallel
4. Day 11 afternoon: Re-run Lighthouse, fix remaining issues

---

### Day 12 (Launch)
**Sequential** - DNS depends on deployment

**Order:**
1. Task 6.1 (Deployment) → Task 6.2 (DNS) → Task 6.3 (Smoke tests)

---

## 🚨 RISK AREAS & MITIGATION

### Risk 1: Chatbot Integration Complexity
**Tasks affected:** Task 3.1, Task 3.3
**Probability:** MEDIUM
**Impact:** HIGH (unique differentiator)

**Mitigation:**
- Allocate extra time (Day 6 + buffer on Day 7)
- Use `nextjs-api-builder` agent early
- Test Claude API integration separately first
- Have fallback: simple contact form if chatbot fails

---

### Risk 2: Lighthouse Performance <90
**Tasks affected:** Task 5.2
**Probability:** MEDIUM
**Impact:** HIGH (SEO impact)

**Mitigation:**
- Build performance-first from Day 1 (lazy loading, image optimization)
- Use `performance-optimizer` agent proactively
- Test Lighthouse on Day 5 (after Homepage done)
- Allocate full Day 10 for optimization

---

### Risk 3: Voice Agent Integration Issues
**Tasks affected:** Task 3.2
**Probability:** HIGH (external API dependencies)
**Impact:** MEDIUM (nice-to-have, not critical)

**Mitigation:**
- Test ElevenLabs API early (Day 1-2)
- Have clear fallback: email notification instead of voice call
- Allocate full Day 7 for Voice Agent
- Consider moving to Phase 2 if blocked

---

### Risk 4: Mobile Layout Issues
**Tasks affected:** Task 5.1
**Probability:** HIGH (complex animations + forms)
**Impact:** HIGH (50%+ traffic mobile)

**Mitigation:**
- Test mobile during development (don't wait until Day 10)
- Use mobile-first CSS (build mobile, then desktop)
- Test on real devices throughout (not just DevTools)
- Allocate full Day 10 for mobile fixes

---

### Risk 5: DNS Propagation Delay
**Tasks affected:** Task 6.2
**Probability:** LOW
**Impact:** MEDIUM (can delay launch)

**Mitigation:**
- Configure DNS on Day 11 (24h buffer)
- Use Vercel's DNS (faster propagation)
- Have staging URL ready for announcement if needed

---

## 📊 RESOURCE ALLOCATION

### Agent Usage Plan

| Phase | Primary Agent | Secondary Agent | Usage |
|-------|--------------|----------------|-------|
| Phase 1 | `ui-ux-designer` | `supabase-schema-architect` | Design tokens, database |
| Phase 2 | `ui-ux-designer` | `nextjs-api-builder` | UI sections, forms |
| Phase 3 | `nextjs-api-builder` | `n8n-workflow-architect` | APIs, automation |
| Phase 4 | `creative-copywriter` | `seo-aeo-geo-specialist` | Content, SEO |
| Phase 5 | `performance-optimizer` | `checkpoint-tester` | Optimization, testing |
| Phase 6 | `checkpoint-tester` | None | Final verification |

---

## ✅ SUCCESS CRITERIA (Per Phase)

### Phase 1 Complete When:
- [ ] Design tokens in `design-tokens.ts`
- [ ] Supabase tables created + data inserts work
- [ ] i18n routing works (/pl, /en)
- [ ] 5 core components built + responsive
- [ ] Framer Motion animations smooth (60fps)

### Phase 2 Complete When:
- [ ] All 8 homepage sections visible
- [ ] Hero animations smooth on desktop + mobile
- [ ] ROI Calculator calculates + saves to Supabase
- [ ] Contact form submits + n8n workflow triggers
- [ ] Lighthouse Performance ≥85 (target 90+ in Phase 5)
- [ ] Both languages work (PL/EN)

### Phase 3 Complete When:
- [ ] Chatbot qualifies users (full conversation flow)
- [ ] Chatbot saves conversations to Supabase
- [ ] Voice Agent calls phone (test successful)
- [ ] n8n workflows complete (ClickUp task, Slack, email)
- [ ] Error handling works (API failures graceful)

### Phase 4 Complete When:
- [ ] /o-nas page live + content compelling
- [ ] /blog structure working + MDX renders
- [ ] /faq page live + search/filters work
- [ ] SEO metadata on all pages
- [ ] Both languages work (PL/EN)

### Phase 5 Complete When:
- [ ] Lighthouse Performance ≥90 (all pages)
- [ ] Lighthouse Accessibility = 100
- [ ] Mobile tested on 3 devices (no issues)
- [ ] WCAG AAA compliant (keyboard nav, screen readers)
- [ ] SEO complete (meta tags, sitemap, schema.org)

### Phase 6 Complete When:
- [ ] Production deployment live
- [ ] DNS pointing to Vercel
- [ ] SSL certificate active (HTTPS)
- [ ] Smoke test checklist 100% complete
- [ ] Analytics tracking (Vercel + GA4)
- [ ] Ready for public announcement

---

## 📅 DAILY MILESTONES

| Day | Milestone | Tasks | Exit Criteria |
|-----|-----------|-------|--------------|
| 1 | Foundation Start | 1.1, 1.2, 1.3, 1.5 | Design tokens extracted, Supabase live |
| 2 | Foundation Complete | 1.4 | Component library built |
| 3 | Homepage Start | 2.1, 2.2, 2.8 | Hero section live |
| 4 | Homepage Mid | 2.3, 2.5, 2.6 | 6/8 sections done |
| 5 | Homepage Complete | 2.4, 2.7 | All 8 sections live, forms work |
| 6 | Dogfooding Start | 3.1, 3.3 | Chatbot UI built, n8n workflows live |
| 7 | Dogfooding Complete | 3.2 | Voice Agent calls working |
| 8 | Secondary Pages Start | 4.1, 4.2 | /o-nas and /blog live |
| 9 | Secondary Pages Complete | 4.3 | /faq live |
| 10 | Optimization Start | 5.1, 5.2 | Mobile optimized, Lighthouse ≥90 |
| 11 | Optimization Complete | 5.3, 5.4 | WCAG AAA, SEO done |
| 12 | Launch | 6.1, 6.2, 6.3 | Production live, DNS configured, smoke tests pass |

---

## 🎯 NEXT STEPS

**Immediate actions:**
1. Review this breakdown with stakeholder (confirm scope/priorities)
2. Setup development environment (if not already)
3. Start Phase 1, Task 1.1 (Figma design token extraction)
4. Mark Task 1.1 as `in_progress` in TodoWrite

**Questions to resolve before starting:**
1. Figma UI Kit URL? (need access via MCP)
2. Supabase project created? (or create during Task 1.2?)
3. Domain purchased? (`lessmanual.ai`)
4. Cal.com account setup? (for demo booking)
5. ElevenLabs account? (for Voice Agent)
6. ClickUp workspace configured? (for lead management)

---

**Document Version:** 1.0
**Created:** 2025-10-21
**Timeline:** 12 days (Oct 21 → Nov 1, 2025)
**Total Tasks:** 31 (6 phases)
**Estimated Total Hours:** ~80-90 hours (aggressive but achievable)
