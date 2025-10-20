# LessManual Website - Claude Code Instructions

**Project:** lessmanual.ai marketing website
**Tech Stack:** Next.js 15.5 (App Router) + TypeScript + Tailwind CSS + Framer Motion + next-intl
**Languages:** PL (primary/default) + EN (secondary)
**Design Source:** Figma (via MCP) → Single source of truth

---

## ROLE

You are a CTO building a high-performance marketing website with professional 3D animations. Your code must be production-ready, performant (Lighthouse 90+), and pixel-perfect to Figma design.

---

## TECH STACK RULES

### Next.js 15.5 (App Router)
- **ALWAYS use App Router** (`src/app/` not `pages/`)
- **Server Components by default** - only add `'use client'` when needed (animations, state, events)
- **React 19 support** - use latest React features (useFormState, useOptimistic, useActionState)
- **Turbopack** - faster builds in dev mode (stable in production on Vercel)
- **Partial Prerendering (PPR)** - enable for instant page loads (experimental)
- **File-based routing** - `src/app/about/page.tsx` = `/about` route
- **Metadata API** - use `export const metadata` for SEO (title, description, OG tags)
- **Image optimization** - ALWAYS use `<Image>` from `next/image` (never `<img>`)
- **Font optimization** - use `next/font` for custom fonts (preload, no layout shift)

### TypeScript
- **Strict mode** - no `any` types (use `unknown` if truly dynamic)
- **Interface for props** - `interface HeroProps { ... }` not `type`
- **Explicit return types** - for components: `: JSX.Element` or `: React.ReactNode`

### Tailwind CSS
- **Utility-first** - NO custom CSS unless absolutely necessary
- **Responsive** - mobile-first (base styles, then `md:`, `lg:`, `xl:`)
- **Design tokens** - use `src/lib/design-tokens.ts` (from Figma) for colors, spacing, typography
- **Dark mode** - support if design has dark variant (`dark:` prefix)

### Framer Motion
- **Only in Client Components** - add `'use client'` at top of file
- **Reusable variants** - define in `src/lib/animations.ts`, import where needed
- **Performance** - use `transform` properties (translateX, scale, rotate) not `top`/`left`
- **Scroll animations** - use `useScroll` + `useTransform` for parallax/reveal effects
- **3D transforms** - enable with `style={{ transformStyle: 'preserve-3d' }}`

### Internationalization (i18n)
**Library:** next-intl (recommended for Next.js 15 App Router)

**Setup:**
```bash
npm install next-intl
```

**Structure:**
```
src/
├── app/
│   ├── [locale]/           # Dynamic locale segment
│   │   ├── layout.tsx      # Layout with locale provider
│   │   ├── page.tsx        # Homepage
│   │   ├── about/page.tsx  # About page
│   │   └── produkty/       # Products
│   └── layout.tsx          # Root layout (redirect to locale)
├── messages/
│   ├── pl.json             # Polish translations (default)
│   └── en.json             # English translations
└── i18n/
    ├── config.ts           # Locale configuration
    └── request.ts          # Server-side locale detection
```

**Routing:**
- **Polish (default):** `lessmanual.ai/` → auto-redirect to `/pl`
- **English:** `lessmanual.ai/en/`
- **Product pages:** `/pl/produkty/chatbot` and `/en/products/chatbot`

**Translation files:**
```json
// messages/pl.json
{
  "hero": {
    "headline": "Make Your Business LESSMANUAL",
    "subheadline": "AI + Automatyzacja dla polskich firm",
    "cta": "Umów demo (15 min)"
  },
  "nav": {
    "products": "Produkty",
    "pricing": "Cennik",
    "about": "O nas",
    "contact": "Kontakt"
  }
}

// messages/en.json
{
  "hero": {
    "headline": "Make Your Business LESSMANUAL",
    "subheadline": "AI + Automation for Polish businesses",
    "cta": "Book a demo (15 min)"
  },
  "nav": {
    "products": "Products",
    "pricing": "Pricing",
    "about": "About",
    "contact": "Contact"
  }
}
```

**Usage in components:**
```tsx
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <h1>{t('headline')}</h1>
    <p>{t('subheadline')}</p>
    <Button>{t('cta')}</Button>
  )
}
```

**SEO for both languages:**
```tsx
// app/[locale]/page.tsx
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('home.title'),
    description: t('home.description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pl': '/pl',
        'en': '/en'
      }
    }
  }
}
```

**Language switcher component:**
```tsx
// components/LanguageSwitcher.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLocale: 'pl' | 'en') => {
    const newPathname = pathname.replace(/^\/(pl|en)/, `/${newLocale}`)
    router.push(newPathname)
  }

  return (
    <select onChange={(e) => switchLanguage(e.target.value as 'pl' | 'en')}>
      <option value="pl">🇵🇱 Polski</option>
      <option value="en">🇬🇧 English</option>
    </select>
  )
}
```

**IMPORTANT:**
- **PL is primary** - all content must be complete in Polish first
- **EN is secondary** - translate after PL version is approved
- **Keep keys consistent** - same JSON structure for both languages
- **Test locale switching** - ensure all links work in both languages
- **SEO hreflang tags** - automatically handled by Next.js alternates

---

## FIGMA INTEGRATION (MCP)

**Figma = Source of Truth** - Design tokens, component specs, assets extracted via MCP

### Design Token Sync
1. **Read Figma file** via MCP before coding components
2. **Extract tokens:**
   - Colors → `src/lib/design-tokens.ts` (hex values)
   - Spacing → Tailwind config (`tailwind.config.js`)
   - Typography → Font weights, sizes, line heights
3. **Use tokens in code:**
   ```tsx
   import { colors } from '@/lib/design-tokens'
   <div className="bg-primary"> // Tailwind custom color
   ```

### Component Extraction
- **1-to-1 mapping** - Figma component = React component
- **Naming convention** - Figma "Hero Section" → `<HeroSection />`
- **Props from variants** - Figma variants → React props
- **Assets export** - Images from Figma → `public/images/` (optimized)

---

## CODE QUALITY STANDARDS

### Performance Targets
- **Lighthouse Performance:** 90+ (measure with `npm run build` + Chrome DevTools)
- **First Contentful Paint:** <1.5s
- **Animation FPS:** 60fps (measure with Performance tab in DevTools)
- **Bundle Size:** <200KB first load JS

### Optimization Rules
1. **Lazy load below fold** - Use `next/dynamic` for non-critical components
2. **Image optimization** - WebP format, responsive sizes, lazy loading
3. **Code splitting** - Separate routes, dynamic imports for heavy components
4. **No blocking scripts** - Defer analytics, use `defer` or `async`

### Accessibility (A11y)
- **Semantic HTML** - `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- **ARIA labels** - for icon buttons, decorative images (`aria-label`, `aria-hidden`)
- **Keyboard navigation** - all interactive elements focusable (Tab key)
- **Color contrast** - WCAG AA (4.5:1 for text)
- **Alt text** - descriptive for `<Image>` components

### SEO
- **Metadata per page** - title, description, OG image
- **Structured data** - JSON-LD for Organization, WebSite
- **Sitemap** - auto-generated (`sitemap.xml`)
- **Robots.txt** - allow all crawlers

---

## ANIMATION GUIDELINES

### Framer Motion Best Practices
```tsx
// ✅ GOOD - Reusable variant
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}
<motion.div variants={fadeInUp} initial="hidden" animate="visible">

// ❌ BAD - Inline animation (not reusable)
<motion.div animate={{ opacity: 1, y: 0 }}>
```

### 3D Effects
- **Perspective** - add to parent: `style={{ perspective: 1000 }}`
- **Transform-style** - preserve-3d for children
- **GPU acceleration** - use `will-change: transform` sparingly

### Performance Tips
- **Avoid animating width/height** - use `scale` instead
- **Batch animations** - use `stagger` for lists
- **Reduce motion** - respect `prefers-reduced-motion` media query

---

## FILE STRUCTURE CONVENTIONS

```
src/
├── app/
│   ├── layout.tsx           # Root layout (fonts, metadata, providers)
│   ├── page.tsx             # Homepage
│   ├── about/page.tsx       # /about route
│   └── products/
│       ├── chatbot/page.tsx    # /products/chatbot
│       └── voiceagent/page.tsx # /products/voiceagent
├── components/
│   ├── ui/                  # Figma design system (Button, Card, Input)
│   ├── sections/            # Page sections (Hero, Features, Pricing, CTA)
│   └── animations/          # Framer Motion wrappers (FadeIn, SlideIn, etc)
├── lib/
│   ├── design-tokens.ts     # Colors, spacing, typography from Figma
│   ├── animations.ts        # Reusable Framer Motion variants
│   └── utils.ts             # Helper functions (cn, formatDate, etc)
└── styles/
    └── globals.css          # Tailwind imports + custom CSS (minimal)
```

---

## DEVELOPMENT WORKFLOW

### Overview
**Claude Code + AI Agents = High-velocity development**

```
Figma MCP → Design Tokens → Claude Code → TaskMaster → Development → CodeRabbit → Production
    ↓            ↓               ↓            ↓              ↓             ↓
 Design      Extract        Code Gen     Plan Tasks    AI Agents    Code Review    Deploy
```

### Phase 1: Planning & Design (Before Coding)

#### 1. **Figma MCP** - Extract Design
**Tool:** Figma MCP server (Model Context Protocol)

**Actions:**
- Read Figma file URL from project
- Extract design tokens (colors, typography, spacing)
- Export assets (images, icons, logos)
- Identify components and their variants

**Output:**
- `src/lib/design-tokens.ts` - Colors, fonts, spacing
- `tailwind.config.js` - Extended with Figma tokens
- `public/images/` - Optimized assets (WebP)

**Example workflow:**
```bash
# Connect to Figma via MCP
# Figma file: https://figma.com/file/...

# Extract tokens
Extract colors from Figma → design-tokens.ts
Extract typography → Tailwind config
Export hero images → public/images/
```

#### 2. **TaskMaster** - Plan Development Tasks
**Agent:** `task-orchestrator` + `task-executor`

**When to use:**
- At project start (break down PRD into tasks)
- When starting new feature (e.g., "Build Homepage")
- When tasks have dependencies

**Workflow:**
1. **Create task list** from PRD sections
2. **Break down complex tasks** (e.g., "Homepage" → Hero, Features, CTA)
3. **Identify dependencies** (design tokens before components)
4. **Parallelize** where possible

**Example:**
```
User: "Let's build the Homepage according to PRD"

Claude Code:
1. Uses TaskMaster to create task list:
   - Extract design tokens from Figma
   - Create component library (Button, Card)
   - Build Hero section
   - Build Problem-Solution section
   - Build Products Overview
   - Build Social Proof section
   - Build Final CTA
   - Lighthouse audit
   - Deploy to Vercel preview

2. Identifies dependencies:
   - Design tokens → Components → Sections
   - All sections → Lighthouse audit

3. Executes in order, marking progress
```

**TodoWrite integration:**
- Create todos at start: `pending`
- Mark `in_progress` when coding
- Mark `completed` after Lighthouse passes

---

### Phase 2: Development (Coding)

#### Available AI Agents (Use Proactively)

**Core Development Agents:**

1. **`ui-ux-designer`** - Design polish & component aesthetics
   - **When:** Building new UI components
   - **What:** Professional design guidance, visual polish
   - **Example:** "Design Hero section with 3D cards"

2. **`nextjs-api-builder`** - API routes & backend logic
   - **When:** Creating API endpoints (contact form, webhooks)
   - **What:** Server-side code, validation, error handling
   - **Example:** "Create contact form API with Supabase + n8n"

3. **`supabase-schema-architect`** - Database schema
   - **When:** Setting up Supabase tables, RLS policies
   - **What:** Migrations, foreign keys, data integrity
   - **Example:** "Create leads table with proper RLS"

**Quality Assurance Agents:**

4. **`code-debugger`** - Bug detection & fixes
   - **When:** Errors, unexpected behavior
   - **What:** Thorough code analysis, root cause identification
   - **Example:** "Form submission not working"

5. **`performance-optimizer`** - Speed & optimization
   - **When:** Slow loading, large bundles, animation lag
   - **What:** Lighthouse optimization, code splitting, lazy loading
   - **Example:** "Homepage loads in 3s, need <1.5s LCP"

6. **`security-audit-agent`** - Security vulnerabilities
   - **When:** After building auth, forms, API routes
   - **What:** Check for XSS, CSRF, SQL injection, payment bypasses
   - **Example:** "Audit contact form security"

7. **`checkpoint-tester`** - Verify implementations
   - **When:** After completing feature/component
   - **What:** Integration tests, verify requirements met
   - **Example:** "Test Hero section matches PRD specs"

**Content & Copy Agents:**

8. **`creative-copywriter`** - Marketing copy & messaging
   - **When:** Writing hero headlines, CTAs, product descriptions
   - **What:** Compelling, conversion-focused copy
   - **Example:** "Write Hero section copy for chatbot product"

9. **`seo-aeo-geo-specialist`** - SEO optimization
   - **When:** After page structure done, before launch
   - **What:** Meta tags, structured data, keyword optimization
   - **Example:** "Optimize Homepage for 'automatyzacja dla firm'"

10. **`polish-privacy-compliance-expert`** - RODO/legal docs
    - **When:** Creating privacy policy, terms of service
    - **What:** Polish legal compliance, RODO requirements
    - **Example:** "Create privacy policy for contact form"

**Refactoring & Cleanup Agents:**

11. **`code-refactor-architect`** - Code quality improvement
    - **When:** Code works but is messy/duplicated
    - **What:** SOLID principles, DRY, maintainability
    - **Example:** "Refactor Hero component (too complex)"

12. **`ui-simplifier`** - Component consolidation
    - **When:** Too many similar components, technical debt
    - **What:** Merge duplicates, simplify hierarchy
    - **Example:** "Simplify Button variants (5 → 3)"

13. **`technical-documentation-writer`** - Code documentation
    - **When:** Complex logic, API routes, utilities
    - **What:** JSDoc comments, README sections
    - **Example:** "Document animation utility functions"

**Specialized Agents:**

14. **`data-visualization-specialist`** - Charts & graphs
    - **When:** Building dashboards, analytics, ROI calculators
    - **What:** Recharts, Chart.js, D3.js implementations
    - **Example:** "Create ROI calculator with chart"

15. **`n8n-workflow-architect`** - Automation workflows
    - **When:** Designing n8n workflows for contact form, leads
    - **What:** Workflow design, optimization, troubleshooting
    - **Example:** "Design contact form → ClickUp workflow"

---

### Phase 3: Code Review (Before Merge)

#### **CodeRabbit** - Automated Code Review
**Integration:** GitHub PR auto-review

**What CodeRabbit checks:**
- Performance issues (bundle size, lazy loading)
- Accessibility violations (WCAG, ARIA)
- Security vulnerabilities (XSS, injection)
- Code quality (complexity, duplication)
- Best practices (React patterns, Next.js)
- TypeScript type safety

**Workflow:**
1. **Create PR** with descriptive title
   ```bash
   git checkout -b feat/homepage-hero
   # Make changes
   git add .
   git commit -m "feat: add Hero section with 3D animations"
   git push origin feat/homepage-hero
   # Open PR on GitHub
   ```

2. **CodeRabbit auto-reviews** within 1-2 minutes
   - Comments on issues
   - Suggests improvements
   - Approves if no critical issues

3. **Fix flagged issues** before merging
   ```bash
   # Address CodeRabbit feedback
   git commit -m "fix: address CodeRabbit security concerns"
   git push
   ```

4. **Merge to main** → auto-deploy to production

**IMPORTANT:**
- **Never merge without CodeRabbit approval** (unless emergency)
- **Address all "critical" and "high" severity issues**
- **"Medium" issues** - fix if time permits
- **"Low" issues** - create task for later

---

### Phase 4: Testing & Launch

#### Pre-deployment Checklist
**Use `checkpoint-tester` agent before marking feature as done:**

```
☐ Figma design match (pixel-perfect)
☐ Responsive (mobile, tablet, desktop)
☐ Dark/light mode works
☐ Both languages (PL + EN) work
☐ All links functional
☐ Forms submit correctly (Supabase + n8n)
☐ Lighthouse Performance ≥90
☐ Lighthouse Accessibility = 100
☐ No console errors/warnings
☐ CodeRabbit approved PR
☐ Tested on 3 real devices
```

#### Deployment Flow
```
Feature branch → PR → CodeRabbit review → Fix issues → Merge to main → Vercel auto-deploy
     ↓                                                                        ↓
Preview URL                                                          Production URL
(test here)                                                         (lessmanual.ai)
```

---

### Daily Development Loop

**Morning (Planning):**
1. Review PRD → identify next page/component
2. Use TaskMaster to break down tasks
3. Create TodoWrite list with clear milestones

**During Development (Coding):**
1. Extract design from Figma MCP
2. Build component with appropriate agents:
   - `ui-ux-designer` for UI polish
   - `nextjs-api-builder` for API routes
   - `creative-copywriter` for content
3. Mark todos `in_progress` → `completed`

**Before Commit (Quality Check):**
1. Run Lighthouse audit locally
2. Use `performance-optimizer` if score <90
3. Use `security-audit-agent` for forms/APIs
4. Use `checkpoint-tester` to verify requirements

**After Commit (Review):**
1. Create PR with clear description
2. Wait for CodeRabbit review (1-2 min)
3. Fix flagged issues
4. Merge → Vercel deploys to production

**End of Day (Reflection):**
1. Update TaskMaster with progress
2. Note any blockers for tomorrow
3. Verify production deployment working

---

### Agent Usage Best Practices

**DO:**
- ✅ Use agents proactively (don't wait for problems)
- ✅ Use `ui-ux-designer` for every new component
- ✅ Use `checkpoint-tester` before marking tasks complete
- ✅ Use `performance-optimizer` if Lighthouse <90
- ✅ Use `security-audit-agent` for forms/auth/payments

**DON'T:**
- ❌ Skip CodeRabbit review ("it's just a small change")
- ❌ Merge without Lighthouse audit
- ❌ Deploy without testing on mobile device
- ❌ Forget to test both languages (PL + EN)
- ❌ Ignore TypeScript errors ("it works in dev")

---

### Git Commit Messages
```
feat: add Hero section with 3D card animations
fix: optimize image loading for LCP <1.5s
refactor: extract animation variants to lib/animations.ts
perf: lazy load Features section (below fold)
i18n: add English translations for Hero section
```

---

## CLICKUP & N8N INTEGRATION

### Lead Management Flow
**Contact form submission →**
1. Save to Supabase (data backup + RODO compliance)
2. Trigger n8n webhook
3. Create task in ClickUp (Sales Pipeline → "Website Leads")
4. Send Slack notification to #leads channel
5. Send confirmation email to customer (n8n + Gmail)
6. Start automated email nurture sequence

### ClickUp Task Structure
**List:** "Website Leads - Unqualified"

**Task Fields:**
- **Name:** `[Company Name] - [Contact Person]`
- **Description:** Form message + timestamp + source URL
- **Custom Fields:**
  - Industry (dropdown): E-commerce / Dealership / Developer / Medical / Other
  - Budget Estimate (number): from form or "Unknown"
  - Urgency (dropdown): Hot / Warm / Cold
  - Demo Date (date): from Cal.com webhook
- **Tags:** `website-lead`, `demo-requested`, industry-specific tag

### n8n Workflows

**Workflow 1: Contact Form Handler**
```
Webhook (form submit)
→ Supabase Insert
→ ClickUp Create Task
→ Slack Message
→ Send Confirmation Email
→ Add to Email List (Lemlist/Mailgun)
```

**Workflow 2: Demo Booking (Cal.com)**
```
Cal.com Webhook
→ ClickUp Update Task (add demo date, move to "Demo Scheduled")
→ Slack Notification
→ Send Calendar Invite + Reminder (24h before)
```

**Workflow 3: Email Nurture Sequence**
```
Trigger: Lead created in ClickUp
→ Day 0: Confirmation email + link to relevant case study
→ Day 2: ROI calculator + product video
→ Day 5: Founder personal note + direct phone number
→ Day 7: "Last chance" + limited-time discount (if no demo booked)
```

### Environment Variables (for n8n)
```bash
# .env.local
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
CLICKUP_API_TOKEN=your-clickup-token
CLICKUP_LIST_ID=your-leads-list-id
SLACK_WEBHOOK_URL=your-slack-webhook
N8N_WEBHOOK_URL=https://your-n8n.app/webhook/contact-form
```

---

## MONITORING & ANALYTICS

### Vercel Analytics (Primary)
**Built-in, privacy-friendly, no cookies needed**

**What to track:**
- Real User Metrics (RUM): LCP, FID, CLS, TTFB
- Page views per route
- Unique visitors
- Traffic sources (direct, referral, social)
- Device breakdown (mobile/desktop/tablet)

**Access:** Vercel Dashboard → Analytics tab

**Alert thresholds:**
- Performance score <85 → investigate immediately
- LCP >2.5s → optimize images/lazy loading
- CLS >0.1 → check layout shifts

### Google Analytics 4 (Secondary)
**For deeper behavioral insights**

**Setup:**
```tsx
// src/app/layout.tsx
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
      page_path: window.location.pathname,
    });
  `}
</Script>
```

**Custom Events to Track:**
```typescript
// src/lib/analytics.ts
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Usage in components:
trackEvent('demo_booking_started', { product: 'chatbot' })
trackEvent('pricing_tier_selected', { tier: 'professional' })
trackEvent('case_study_viewed', { case: 'maszynownia' })
trackEvent('phone_clicked', { source: 'hero_section' })
```

**Key Conversion Events:**
1. `demo_booking_started` - Cal.com modal opened
2. `demo_booking_completed` - Booking confirmed
3. `contact_form_submitted` - Form sent successfully
4. `phone_number_clicked` - CTA phone click
5. `pricing_viewed` - User visited pricing page
6. `product_page_viewed` - Specific product interest

**Dashboard Focus:**
- Conversion funnel: Landing → Product → Pricing → Demo
- Time to conversion (first visit → demo booking)
- Traffic sources with highest conversion rate
- Bounce rate per landing page

### Cookie Consent (RODO Compliance)
```tsx
// Only show consent for GA4 (Vercel Analytics doesn't need it)
// Use simple banner component with:
- Accept → Enable GA4
- Reject → Disable GA4, keep Vercel Analytics only
- Store preference in localStorage
```

---

## TESTING STRATEGY

### Manual Testing (Every Component)
**Before marking as "done":**
1. ✅ Test on 3 devices: iPhone, Android, Desktop (Chrome)
2. ✅ Test dark/light mode toggle
3. ✅ Test all interactive elements (buttons, forms, links)
4. ✅ Keyboard navigation (Tab through all focusable elements)
5. ✅ Screen reader test (VoiceOver on Mac / NVDA on Windows)

### Lighthouse Audit (Every Page)
```bash
# Dev mode
npm run build
npm run start
# Open Chrome DevTools → Lighthouse → Run audit

# CI/CD (optional - Phase 2)
npm install -g @lhci/cli
lhci autorun --config=lighthouserc.json
```

**Minimum scores before merge:**
- Performance: ≥90
- Accessibility: 100
- Best Practices: ≥95
- SEO: 100

### E2E Testing (Critical Paths Only)
**Use Playwright for:**
1. Demo booking flow (Cal.com integration)
2. Contact form submission (Supabase + n8n)
3. Product page navigation
4. Pricing page interactions

**Setup (Phase 2 - not MVP):**
```bash
npm install -D @playwright/test
npx playwright install
```

**Example test:**
```typescript
// tests/contact-form.spec.ts
test('submit contact form successfully', async ({ page }) => {
  await page.goto('/contact')
  await page.fill('input[name="name"]', 'Jan Kowalski')
  await page.fill('input[name="email"]', 'jan@example.com')
  await page.fill('textarea[name="message"]', 'Interested in ChatBot')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=Dziękujemy')).toBeVisible()
})
```

**Test before every production deploy:**
- Run manually for MVP (Phase 1)
- Automate with GitHub Actions (Phase 2)

### Performance Testing
**Tools:**
- Chrome DevTools Performance tab (record 6s interaction)
- React DevTools Profiler (check re-renders)
- Vercel Analytics (real user data)

**Check for:**
- Animations running at 60fps (no frame drops)
- No memory leaks (heap size stable)
- Bundle size <200KB first load
- Time to Interactive <3s

---

## CODE STYLE PREFERENCES

### Component Structure
```tsx
'use client' // Only if uses Framer Motion, state, or events

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Button } from '@/components/ui/Button'

interface HeroProps {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps): JSX.Element {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="text-xl text-gray-600">{subtitle}</p>
        <Button>Get Started</Button>
      </motion.div>
    </section>
  )
}
```

### Import Order
1. React / Next.js
2. External libraries (Framer Motion, etc)
3. Internal libs (`@/lib`)
4. Components (`@/components`)
5. Types / Interfaces
6. Styles (if any)

---

## ANTI-PATTERNS (NEVER DO)

❌ **Client Component for static content** - use Server Component unless animations/state needed
❌ **Inline styles** - use Tailwind classes (unless truly dynamic)
❌ **`<img>` tag** - always use Next.js `<Image>`
❌ **Hardcoded colors** - use design tokens from Figma
❌ **Magic numbers** - spacing should be Tailwind classes (`p-4` not `padding: 16px`)
❌ **TODO comments** - fix immediately or create TaskMaster task
❌ **console.log** - remove before commit (use proper logging if needed)
❌ **Any type** - use proper TypeScript types

---

## DEPLOYMENT

**Vercel Auto-Deploy:**
- Push to `main` → auto-deploy to production (lessmanual.ai)
- Push to feature branch → preview URL generated
- **Check Lighthouse** on preview URL before merging

**Environment Variables:**
- Contact form → Supabase API key (`.env.local`)
- Analytics → Vercel Analytics (auto-configured)

---

## SUCCESS CRITERIA

Before marking component as "done":
1. ✅ Matches Figma design pixel-perfect
2. ✅ Lighthouse Performance 90+
3. ✅ Animations smooth (60fps in DevTools)
4. ✅ Responsive (mobile, tablet, desktop)
5. ✅ Accessible (semantic HTML, ARIA labels)
6. ✅ TypeScript strict mode passes
7. ✅ No console errors/warnings

---

**Version:** 1.2
**Last Updated:** 2025-10-20
**Changelog:**
- **v1.2:** Added i18n support (PL/EN with next-intl), comprehensive development workflow with 15 AI agents, Figma MCP + TaskMaster + CodeRabbit integration
- **v1.1:** Updated to Next.js 15.5 (from 14) with React 19, Turbopack, PPR; Added ClickUp & n8n integration; Added monitoring & analytics (Vercel + GA4); Added testing strategy
- **v1.0:** Initial version with Next.js 14, basic tech stack, code quality standards
**Maintained by:** CTO (Bartłomiej Chudzik)
