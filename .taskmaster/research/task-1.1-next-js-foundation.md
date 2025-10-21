# Task 1.1 Research: Next.js 15.5 Modern Patterns Foundation

**Date:** 2025-10-21  
**Status:** ✅ Completed  
**Dependencies:** None

---

## Executive Summary

Established Next.js 15.5 foundation with modern 2025 patterns including Partial Prerendering (PPR), Turbopack, React 19 features, next-intl i18n, Framer Motion 3D animations, and WCAG AAA accessibility compliance.

## Key Dependencies Verified

✅ **Next.js 15.5.0** - Latest stable with App Router  
✅ **React 19.0.0** - Includes useFormState, useOptimistic, useActionState  
✅ **next-intl 3.23.0** - i18n with PL/EN routing  
✅ **framer-motion 11.11.17** - 3D animations  
✅ **@supabase/supabase-js 2.45.4** - Backend integration  
✅ **Tailwind CSS 3.4.1** - Utility-first styling  
✅ **TypeScript 5** - Type safety

---

## Next.js 15.5 Configuration Optimizations

### Partial Prerendering (PPR)
```typescript
experimental: {
  ppr: true, // Instant page loads with streaming
}
```

**Benefits:**
- Instant page loads by serving static shell immediately
- Dynamic content streams in progressively
- Better Core Web Vitals (LCP, FID, CLS)

### Turbopack
```bash
npm run dev --turbopack  # Already configured
```

**Performance gains:**
- 700× faster updates than Webpack
- Incremental compilation
- Better HMR (Hot Module Replacement)

### Package Import Optimization
```typescript
optimizePackageImports: ['framer-motion', 'next-intl']
```

**Reduces bundle size** by tree-shaking unused exports.

### Image Optimization
```typescript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

**Best practices:**
- Use `next/image` component (automatic)
- WebP for modern browsers (~30% smaller)
- AVIF for cutting-edge browsers (~50% smaller)
- Responsive sizes for all breakpoints

### Production Optimizations
```typescript
compiler: {
  removeConsole: {
    exclude: ['error', 'warn'], // Keep errors in prod
  },
},
poweredByHeader: false, // Remove X-Powered-By header
compress: true, // Enable gzip compression
productionBrowserSourceMaps: false, // Smaller builds
```

---

## React 19 Features

### Server Components (Default)
```typescript
// Server Component by default (no 'use client')
export default async function Page() {
  const data = await getData() // Direct DB access
  return <div>{data}</div>
}
```

**Benefits:**
- Zero JavaScript sent to client
- Direct database/API access
- Better SEO (fully rendered HTML)

### Client Components (When Needed)
```typescript
'use client' // Add only when using:
// - useState, useEffect, useContext
// - Event handlers (onClick, onChange)
// - Browser APIs (window, localStorage)
// - Framer Motion animations
```

### useFormState (React 19)
```typescript
const [state, formAction] = useFormState(action, initialState)
// Progressive enhancement for forms
```

### useOptimistic (React 19)
```typescript
const [optimisticState, addOptimistic] = useOptimistic(state)
// Instant UI updates before server response
```

---

## I18n with next-intl

### Configuration
```typescript
// src/i18n/config.ts
export const locales = ['pl', 'en'] as const
export const defaultLocale = 'pl'
```

### Routing Structure
```
/pl - Polish (default)
/en - English
```

### Translation Files
```
src/messages/pl.json - Polish translations
src/messages/en.json - English translations
```

### Usage Pattern
```typescript
import { useTranslations } from 'next-intl'

const t = useTranslations('hero')
<h1>{t('headline')}</h1>
```

---

## Framer Motion 3D Animations

### GPU Acceleration Best Practices

**✅ Use transform properties:**
```typescript
// GOOD - GPU accelerated
transform: 'translateX(100px) scale(1.1) rotate(10deg)'
```

**❌ Avoid layout-affecting properties:**
```typescript
// BAD - Causes reflow
left: '100px'
width: '200px'
```

### Advanced 3D Variants Created

#### product3D
```typescript
{
  hidden: { opacity: 0, scale: 0.8, rotateY: -30, z: -50 },
  visible: { opacity: 1, scale: 1, rotateY: 0, z: 0 }
}
```
- Custom easing: `[0.6, 0.01, 0.05, 0.95]`
- Transform perspective: 1000px
- Duration: 0.8s for smooth 3D effect

#### stagger3DCards
```typescript
{
  staggerChildren: 0.15,
  delayChildren: 0.3
}
```
- Cascading animation for multiple cards
- 150ms between each card

#### expandableCard
```typescript
{
  transition: { ease: [0.04, 0.62, 0.23, 0.98] }
}
```
- Smooth height transitions
- Custom cubic bezier easing

#### timelineItem
```typescript
{
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1 }
}
```
- Slide-in effect for timeline steps

### prefers-reduced-motion Support
```typescript
export const getAnimationConfig = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return {
    transition: prefersReducedMotion ? { duration: 0 } : undefined
  }
}
```

**Accessibility compliance** - respects user OS settings.

---

## WCAG AAA Accessibility Requirements

### Color Contrast (7:1 Ratio)
```typescript
// Design tokens already compliant:
night: '#0C0D0A'   // Background
pear: '#DDE000'    // Accent (high contrast on night)
tekhelet: '#5716A2' // Decorative (compliant with white text)
```

### Semantic HTML Patterns
```html
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
```
**Not:**
```html
<div class="header">, <div class="nav">
```

### ARIA Best Practices
```typescript
// Expandable cards
aria-expanded={isExpanded}
aria-controls="panel-id"
```

```typescript
// FAQ accordion
aria-expanded={isOpen}
role="button"
tabIndex={0}
```

### Keyboard Navigation
- All interactive elements focusable with Tab
- Enter/Space triggers actions
- Escape closes modals/dropdowns
- Arrow keys for lists/carousels

---

## Lighthouse 90+ Optimization Strategies

### Code Splitting
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <Skeleton />,
  ssr: false, // Client-side only if needed
})
```

**Use for:**
- Below-the-fold sections
- Modals/dialogs
- Heavy charts/visualizations

### Critical CSS Inlining
Next.js automatic - styles inlined in `<head>` for above-the-fold content.

### Bundle Analysis
```bash
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** <1.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

**How to achieve:**
- Use `next/image` with width/height
- Preload critical fonts
- Avoid layout shifts (reserve space for dynamic content)

---

## Performance Monitoring

### Development
```bash
npm run dev --turbopack
```
- Chrome DevTools Performance tab
- React DevTools Profiler

### Production
```bash
npm run build
npm run start
```
- Lighthouse CI (automated)
- Vercel Analytics (real user metrics)

---

## Next Steps (Subtask 1.2)

Now that foundation is established, proceed to:
- **Task 1.2:** Set up comprehensive i18n with next-intl
  - Create translation files for all sections
  - Test locale switching
  - Verify SSR rendering

**Dependencies satisfied:** ✅  
**Ready to proceed:** ✅

---

**Research completed by:** Claude Code  
**Task Master:** Subtask 1.1 of Task #1
