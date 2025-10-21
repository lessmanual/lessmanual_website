# LessManual Website - 12-Day Launch Timeline

**Launch Date:** November 1, 2025
**Start Date:** October 21, 2025
**Working Days:** 12

---

## 📊 TIMELINE OVERVIEW

```
OCT 21-22 (Days 1-2)  │ FOUNDATION        │ ██████░░░░░░░░░░░░░░ │ 5 tasks
OCT 23-25 (Days 3-5)  │ HOMEPAGE          │ ░░░░░░██████████░░░░ │ 8 tasks
OCT 26-27 (Days 6-7)  │ DOGFOODING        │ ░░░░░░░░░░░░░░██████ │ 3 tasks
OCT 28-29 (Days 8-9)  │ SECONDARY PAGES   │ ░░░░░░░░░░░░░░░░░░██ │ 3 tasks
OCT 30-31 (Days 10-11)│ OPTIMIZATION      │ ░░░░░░░░░░░░░░░░░░░░ │ 4 tasks
NOV 01 (Day 12)       │ LAUNCH            │ ░░░░░░░░░░░░░░░░░░░░ │ 3 tasks
```

**Total Tasks:** 31
**Critical Path:** Foundation → Components → Homepage → Optimization → Launch

---

## 📅 DAY-BY-DAY BREAKDOWN

### Day 1 (Oct 21) - Foundation Start
**Goal:** Extract design system, setup infrastructure

**Morning (4 hours):**
- ✅ Task 1.1: Extract Figma design tokens (CRITICAL PATH)
  - Connect to Figma UI Kit via MCP
  - Extract colors (night, pear, tekhelet)
  - Export spacing, typography
  - Create `design-tokens.ts`

**Afternoon (4 hours):**
- ✅ Task 1.2: Setup Supabase (PARALLEL)
  - Create PostgreSQL database
  - Create tables: leads, roi_calculations, chat_conversations
  - Setup RLS policies
  - Configure `.env.local`

- ✅ Task 1.3: Configure i18n (PARALLEL)
  - Install next-intl
  - Setup routing (/pl, /en)
  - Create translation files

**Exit Criteria:**
- Design tokens extracted
- Supabase live + test data inserted
- i18n routing works

---

### Day 2 (Oct 22) - Foundation Complete
**Goal:** Build component library

**Full Day (8 hours):**
- ✅ Task 1.4: Create component library
  - Button (4 variants, 3 sizes)
  - Card (hover effects)
  - Input (validation states)
  - Accordion (FAQ)
  - Modal (chatbot)

- ✅ Task 1.5: Setup Framer Motion (PARALLEL)
  - Install framer-motion
  - Create `animations.ts`
  - Build animation wrappers

**Exit Criteria:**
- 5 core components built
- All components responsive
- Animations smooth (60fps)

---

### Day 3 (Oct 23) - Homepage Start
**Goal:** Build Hero + 2 sections

**Morning (4 hours):**
- ✅ Task 2.1: Build Hero section (CRITICAL)
  - 3D animated product cards
  - Headline + CTA
  - Chatbot bubble trigger

**Afternoon (4 hours):**
- ✅ Task 2.2: Build Specjalizacje section (PARALLEL)
  - 3 expandable cards
  - Hover animations

- ✅ Task 2.8: Build Footer (PARALLEL)
  - Navigation links
  - Social icons
  - Legal links

**Exit Criteria:**
- Hero section live + animations smooth
- 3/8 homepage sections done
- Footer navigation works

---

### Day 4 (Oct 24) - Homepage Mid
**Goal:** Build 3 more sections

**Morning (4 hours):**
- ✅ Task 2.3: Build Jak to działa section
  - 4-step timeline
  - Scroll-triggered animations

**Afternoon (4 hours):**
- ✅ Task 2.5: Build Nasi klienci section (PARALLEL)
  - Client logos
  - Testimonial slider

- ✅ Task 2.6: Build FAQ section (PARALLEL)
  - 5 questions accordion
  - Link to /faq page

**Exit Criteria:**
- 6/8 homepage sections done
- Testimonial slider working
- Timeline animates on scroll

---

### Day 5 (Oct 25) - Homepage Complete
**Goal:** Build forms (contact + ROI calculator)

**Morning (4 hours):**
- ✅ Task 2.4: Build ROI Calculator (CRITICAL)
  - Interactive calculator
  - Real-time results
  - Supabase integration

**Afternoon (4 hours):**
- ✅ Task 2.7: Build Contact Form (CRITICAL)
  - Form validation
  - Supabase integration
  - RODO compliance
  - Voice Agent trigger logic

**Exit Criteria:**
- 8/8 homepage sections done
- Forms submit + save to Supabase
- Homepage 100% complete
- Initial Lighthouse audit (target ≥85)

---

### Day 6 (Oct 26) - Dogfooding Start
**Goal:** Build Chatbot + n8n workflows

**Morning (4 hours):**
- ✅ Task 3.3: Setup n8n workflows (CRITICAL)
  - Contact form → Supabase → ClickUp → Slack → Email
  - Test end-to-end flow

**Afternoon (4 hours):**
- ✅ Task 3.1: Build Chatbot (part 1)
  - Chat UI components
  - Claude API integration
  - Conversation context

**Exit Criteria:**
- n8n workflows live + tested
- Chatbot UI built
- Claude API connected

---

### Day 7 (Oct 27) - Dogfooding Complete
**Goal:** Finish Chatbot + integrate Voice Agent

**Morning (4 hours):**
- ✅ Task 3.1: Build Chatbot (part 2)
  - Qualification flow logic
  - Supabase conversation storage
  - Error handling

**Afternoon (4 hours):**
- ✅ Task 3.2: Integrate Voice Agent
  - ElevenLabs setup
  - n8n workflow (form → voice call)
  - Test phone call flow

**Exit Criteria:**
- Chatbot qualifies users
- Voice Agent calls phone
- Full dogfooding flow working

---

### Day 8 (Oct 28) - Secondary Pages Start
**Goal:** Build /o-nas + /blog structure

**Morning (4 hours):**
- ✅ Task 4.1: Build /o-nas page
  - Founder story
  - Mission/values
  - Tech stack showcase
  - Team photos

**Afternoon (4 hours):**
- ✅ Task 4.2: Build /blog structure (PARALLEL)
  - MDX configuration
  - Blog list page
  - Single post template
  - Optional: 1 sample post

**Exit Criteria:**
- /o-nas page live + compelling content
- /blog structure working
- MDX renders correctly

---

### Day 9 (Oct 29) - Secondary Pages Complete
**Goal:** Build /faq page

**Morning (4 hours):**
- ✅ Task 4.3: Build /faq page
  - ~20 questions in categories
  - Search functionality
  - Category filters
  - Accordion component

**Afternoon (4 hours):**
- Content polish (all pages)
- Translation review (PL/EN)
- Internal linking (cross-page navigation)

**Exit Criteria:**
- /faq page live + searchable
- All 3 pages complete
- Both languages work (PL/EN)

---

### Day 10 (Oct 30) - Optimization Start
**Goal:** Mobile + Lighthouse optimization

**Morning (4 hours):**
- ✅ Task 5.1: Mobile Optimization (CRITICAL)
  - Test on 3 real devices
  - Fix layout issues
  - Optimize touch interactions
  - Test landscape orientation

**Afternoon (4 hours):**
- ✅ Task 5.2: Lighthouse Optimization (CRITICAL)
  - Run audit on all pages
  - Fix performance issues (lazy loading, image optimization, code splitting)
  - Target: Performance ≥90

**Exit Criteria:**
- Mobile tested + no layout issues
- Lighthouse Performance ≥90 (all pages)
- First load JS <200KB

---

### Day 11 (Oct 31) - Optimization Complete
**Goal:** Accessibility + SEO + final polish

**Morning (4 hours):**
- ✅ Task 5.3: Accessibility Audit (CRITICAL)
  - Keyboard navigation test
  - Screen reader test (VoiceOver, NVDA)
  - Color contrast check (WCAG AAA)
  - Fix all critical issues

**Afternoon (4 hours):**
- ✅ Task 5.4: SEO Implementation (PARALLEL)
  - Meta tags (all pages)
  - Sitemap.xml
  - Robots.txt
  - Structured data (schema.org)
  - hreflang tags (PL/EN)

**Evening (2 hours):**
- Re-run Lighthouse (all pages)
- Fix any remaining issues
- CodeRabbit review (if time)

**Exit Criteria:**
- Lighthouse Performance ≥90
- Lighthouse Accessibility = 100
- WCAG AAA compliant
- SEO complete (meta tags, sitemap, schema)

---

### Day 12 (Nov 1) - LAUNCH DAY
**Goal:** Deploy to production + go live

**Morning (2 hours):**
- ✅ Task 6.1: Production Deployment
  - Review environment variables
  - Build production bundle
  - Deploy to Vercel
  - Enable Vercel Analytics

**Mid-Morning (1 hour):**
- ✅ Task 6.2: DNS Configuration
  - Point lessmanual.ai to Vercel
  - Wait for SSL certificate
  - Setup www redirect

**Afternoon (2 hours):**
- ✅ Task 6.3: Final Smoke Tests
  - All pages load
  - Forms submit
  - Chatbot works
  - Voice Agent triggers
  - n8n workflows execute
  - Analytics tracking
  - Mobile test (3 devices)

**Evening:**
- 🚀 **GO LIVE**
- Public announcement (LinkedIn, Twitter)
- Monitor analytics (Vercel, GA4)
- Monitor errors (Sentry, if configured)

**Exit Criteria:**
- Production site live at lessmanual.ai
- DNS propagated (HTTPS working)
- Smoke tests 100% passed
- Ready for public traffic

---

## 🎯 CRITICAL PATH TASKS (CANNOT BE DELAYED)

1. **Task 1.1** (Day 1) - Design tokens → blocks all UI work
2. **Task 1.4** (Day 2) - Component library → blocks all sections
3. **Task 2.1** (Day 3) - Hero section → critical for first impression
4. **Task 2.4 + 2.7** (Day 5) - Forms → critical for conversions
5. **Task 5.1 + 5.2** (Day 10) - Mobile + Lighthouse → critical for launch
6. **Task 6.1** (Day 12) - Deployment → literally launch

**If any critical task slips, entire timeline slips.**

---

## ⚡ PARALLELIZATION OPPORTUNITIES

### Days 1-2 (High Parallel)
```
Day 1: Task 1.1 (solo) → THEN → Task 1.2 + 1.3 + 1.5 (parallel)
Day 2: Task 1.4 (solo)
```

### Days 3-5 (High Parallel)
```
Day 3: Task 2.1 (priority) + Task 2.2 + 2.8 (parallel)
Day 4: Task 2.3 (priority) + Task 2.5 + 2.6 (parallel)
Day 5: Task 2.4 + 2.7 (both critical, allocate 4h each)
```

### Days 6-7 (Sequential)
```
Day 6: Task 3.3 (AM) → Task 3.1 (PM)
Day 7: Task 3.1 (AM) → Task 3.2 (PM)
```

### Days 8-9 (High Parallel)
```
Day 8: Task 4.1 + 4.2 (parallel, independent pages)
Day 9: Task 4.3 (solo)
```

### Days 10-11 (Low Parallel)
```
Day 10: Task 5.1 (AM) → Task 5.2 (PM) (sequential, mobile affects Lighthouse)
Day 11: Task 5.3 + 5.4 (parallel, independent)
```

### Day 12 (Sequential)
```
Task 6.1 → Task 6.2 → Task 6.3 (must be in order)
```

---

## 🚨 CONTINGENCY PLANS

### If Day 5 Slips (Forms not done)
**Impact:** CRITICAL (main conversion point)
**Contingency:**
- Simplify contact form (remove Voice Agent trigger)
- Move ROI Calculator to Phase 2 (post-launch)
- Focus on basic contact form working

### If Day 7 Slips (Chatbot/Voice Agent)
**Impact:** MEDIUM (nice-to-have, not critical)
**Contingency:**
- Launch with basic contact form only
- Add Chatbot in Phase 2 (week 2 post-launch)
- Voice Agent → Phase 3 (optional)

### If Day 10 Slips (Lighthouse <90)
**Impact:** HIGH (SEO impact)
**Contingency:**
- Launch with score ≥85 (still good)
- Continue optimization post-launch
- Focus on mobile first (50%+ traffic)

### If Day 12 DNS Issues
**Impact:** LOW (can use Vercel staging URL)
**Contingency:**
- Announce with Vercel URL (lessmanual.vercel.app)
- DNS propagates within 24h
- Update announcement with final URL

---

## 📈 DAILY STANDUP FORMAT

**Template for daily updates:**

```
## Day X Update (Date)

✅ COMPLETED TODAY:
- Task X.X: Description (time spent)
- Task X.X: Description (time spent)

🚧 IN PROGRESS:
- Task X.X: Description (% done, blockers if any)

📋 TOMORROW'S PLAN:
- Task X.X: Description (estimated time)
- Task X.X: Description (estimated time)

🚫 BLOCKERS:
- (None / Issue description + mitigation)

📊 PROGRESS:
- Overall: X/31 tasks done (X%)
- Phase X: X/X tasks done
- On track: ✅ / ⚠️ Slipping / 🚨 Critical
```

---

## ✅ LAUNCH CHECKLIST (Day 12)

### Pre-Launch (Morning)
- [ ] Production build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Environment variables configured (Vercel dashboard)
- [ ] Deployed to Vercel (vercel --prod)

### DNS & SSL (Mid-Morning)
- [ ] DNS pointing to Vercel (A record, CNAME)
- [ ] SSL certificate active (HTTPS works)
- [ ] www redirect configured
- [ ] DNS propagation complete (`dig lessmanual.ai`)

### Functional Tests (Afternoon)
- [ ] Homepage loads (/ → /pl)
- [ ] Language switcher works (/pl ↔ /en)
- [ ] All pages accessible (/, /o-nas, /blog, /faq)
- [ ] Contact form submits
- [ ] Supabase data saves (check admin panel)
- [ ] ROI Calculator calculates + saves
- [ ] Chatbot opens + qualifies users
- [ ] Voice Agent triggers (test with phone)
- [ ] n8n workflows execute (ClickUp, Slack, Email)

### Performance Tests
- [ ] Lighthouse Performance ≥90 (all pages)
- [ ] Lighthouse Accessibility = 100
- [ ] Mobile responsive (test on 3 devices)
- [ ] First Load JS <200KB
- [ ] LCP <1.5s (Vercel Analytics)

### Analytics & Monitoring
- [ ] Vercel Analytics tracking
- [ ] Google Analytics 4 tracking (if configured)
- [ ] Conversion events fire (demo booking, form submit)
- [ ] Error monitoring (Sentry, if configured)

### SEO & Legal
- [ ] Meta tags on all pages (title, description, OG image)
- [ ] Sitemap.xml accessible (/sitemap.xml)
- [ ] Robots.txt configured (/robots.txt)
- [ ] Structured data (schema.org) present
- [ ] Privacy Policy page exists (placeholder OK)
- [ ] Terms of Service page exists (placeholder OK)

### Final Checks
- [ ] All internal links work
- [ ] All external links work (Cal.com, social media)
- [ ] Forms validate correctly (error messages)
- [ ] RODO compliance checkbox works
- [ ] Success messages display
- [ ] No broken images
- [ ] Favicon loads

---

## 🎉 LAUNCH ANNOUNCEMENT (Day 12 Evening)

**LinkedIn Post Template:**
```
🚀 We're LIVE! Introducing LessManual.ai

Make your business LESSMANUAL with AI automation built for Polish businesses.

✅ Custom ChatBots (24/7 customer support)
✅ Voice AI Agents (qualified leads while you sleep)
✅ Process Automation (save 20+ hours/week)

→ See it in action: lessmanual.ai
→ Book 15-min demo: [Cal.com link]

Built in 12 days with Next.js 15, Claude AI, and Framer Motion.
Lighthouse Performance: 90+
WCAG AAA compliant.
PL + EN support.

#AI #Automation #PolishTech #Startup
```

**Twitter/X Post Template:**
```
🚀 LessManual.ai is LIVE!

AI automation for Polish businesses:
- ChatBots that qualify leads
- Voice Agents that call prospects
- Custom AI workflows

Built in 12 days. Lighthouse 90+. Open source soon.

→ lessmanual.ai

#BuildInPublic #AI #Automation
```

---

**Timeline Version:** 1.0
**Created:** 2025-10-21
**Launch Target:** 2025-11-01
**Total Working Days:** 12
**Total Tasks:** 31
**Buffer Days:** 0 (tight schedule, no room for error)

**Note:** This is an aggressive timeline. Expect to work 8-10 hours/day. Prioritize ruthlessly. Cut scope if needed (e.g., Voice Agent → Phase 2).
