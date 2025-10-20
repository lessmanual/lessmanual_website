# LessManual.ai - Marketing Website

> **Make Your Business LESSMANUAL**
> AI + Automation for Polish businesses. 7-day implementation. ROI in a month.

## 🚀 Tech Stack

- **Next.js 15.5** - App Router with React 19
- **TypeScript** - Strict mode, type-safe
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Framer Motion** - Professional 3D animations
- **next-intl** - i18n support (PL/EN)
- **Supabase** - Contact form backend
- **Vercel** - Hosting & analytics

## 📂 Project Structure

```
src/
├── app/[locale]/          # App Router with locale support
│   ├── layout.tsx         # Root layout with i18n provider
│   ├── page.tsx           # Homepage
│   ├── produkty/          # Products pages (PL)
│   └── products/          # Products pages (EN)
├── components/
│   ├── ui/                # Reusable UI components (Button, Card, Input)
│   ├── sections/          # Page sections (Hero, Features, Pricing)
│   └── animations/        # Framer Motion wrappers
├── lib/
│   ├── design-tokens.ts   # Figma design tokens
│   ├── animations.ts      # Framer Motion variants
│   └── utils.ts           # Utility functions (cn, formatDate, etc.)
├── messages/
│   ├── pl.json            # Polish translations
│   └── en.json            # English translations
├── i18n/
│   ├── config.ts          # Locale configuration
│   └── request.ts         # Server-side locale detection
└── styles/
    └── globals.css        # Tailwind imports + custom styles
```

## 🎨 Design System

**Colors (WCAG AAA compliant):**
- `night` - #0C0D0A (Primary background)
- `white` - #FEFEFE (Primary text)
- `pear` - #DDE000 (CTA, accents)
- `tekhelet` - #5716A2 (Decorative only)

**Typography:**
- Font: Inter (variable font)
- Scales: xs → 7xl

**Components:**
- Extracted from Figma via MCP
- 1-to-1 mapping: Figma component = React component
- Variants → Props

## 🌍 Internationalization

**Supported languages:**
- 🇵🇱 **Polish (primary/default)** - `/pl`
- 🇬🇧 **English (secondary)** - `/en`

**Routing:**
- Auto-redirect: `/` → `/pl`
- Products: `/pl/produkty/chatbot` & `/en/products/chatbot`
- SEO: Automatic hreflang tags

**Adding translations:**
1. Edit `src/messages/pl.json` (primary)
2. Copy to `src/messages/en.json` (translate)
3. Use in components: `const t = useTranslations('namespace')`

## 🛠️ Development

**Prerequisites:**
- Node.js 20+
- npm or yarn
- Git
- Figma access (for design tokens)

**Setup:**
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

Visit:
- Polish: http://localhost:3000/pl
- English: http://localhost:3000/en

**Scripts:**
```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
```

## 🧪 Quality Assurance

**Before every commit:**
1. ✅ Lighthouse audit (Performance ≥90, Accessibility = 100)
2. ✅ TypeScript check (`npm run build`)
3. ✅ Test on 3 devices (iPhone, Android, Desktop)
4. ✅ Check both languages (PL + EN)
5. ✅ Verify all links work

**Automated checks:**
- **CodeRabbit** - AI code review on every PR
- **Vercel Analytics** - Real-time performance monitoring
- **TypeScript** - Compile-time type checking

## 🤖 AI Agents & Workflow

**Development workflow:**
1. **Figma MCP** → Extract design tokens & components
2. **TaskMaster** → Plan & break down tasks
3. **Claude Code** → Generate code with specialized agents
4. **CodeRabbit** → Review code quality
5. **Vercel** → Deploy to production

**Available agents (15 total):**
- `ui-ux-designer` - Component design & polish
- `nextjs-api-builder` - API routes & backend
- `performance-optimizer` - Lighthouse optimization
- `security-audit-agent` - Vulnerability checks
- `creative-copywriter` - Marketing copy
- `seo-aeo-geo-specialist` - SEO optimization
- ... and 9 more (see CLAUDE.md)

**Usage:**
```
User: "Build the Homepage Hero section"

Claude Code:
1. Reads PRD requirements
2. Extracts design from Figma MCP
3. Uses ui-ux-designer agent for layout
4. Uses creative-copywriter for headlines
5. Builds component with animations
6. Runs checkpoint-tester to verify
7. Creates PR for CodeRabbit review
```

## 📋 Project Documentation

- **[CLAUDE.md](./CLAUDE.md)** - AI development instructions & workflow
- **[lessmanual-website-PRD.md](./lessmanual-website-PRD.md)** - Product Requirements Document
- **[SETUP.md](./SETUP.md)** - Configuration guide (Figma MCP, TaskMaster, CodeRabbit)

## 🚀 Deployment

**Vercel (Production):**
```bash
# Push to main branch → auto-deploy
git push origin main
# Production URL: https://lessmanual.ai
```

**Preview deployments:**
```bash
# Push to feature branch → preview URL
git push origin feat/homepage-hero
# Preview: https://lessmanual-git-feat-homepage-hero.vercel.app
```

**Environment variables:**
- Set in Vercel dashboard → Settings → Environment Variables
- Use `.env.example` as reference

## 🔗 Integrations

- **Supabase** - Contact form data storage
- **n8n** - Lead automation workflows
- **ClickUp** - CRM & task management
- **Slack** - Notifications
- **Cal.com** - Demo booking
- **Google Analytics** - Behavioral insights
- **Vercel Analytics** - Performance tracking

## 📈 Performance Targets

- **Lighthouse Performance:** ≥90
- **Lighthouse Accessibility:** 100 (WCAG AAA)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Bundle size (first load):** <200KB

## 📞 Contact

**Owner:** Bartłomiej Chudzik (CTO)
**Email:** kontakt@lessmanual.ai
**Phone:** +48 508 193 843
**NIP:** 1231589909
**REGON:** 542947850

---

**Version:** 0.1.0
**Status:** 🟡 Development
**Last Updated:** 2025-10-20

🤖 Built with [Claude Code](https://claude.com/claude-code)
