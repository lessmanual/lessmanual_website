# Plan Optymalizacji Wydajności - LessManual.ai

**Data utworzenia:** 2025-11-02
**Autor:** Performance Optimization Team
**Status:** Do implementacji

---

## 📊 Analiza Bieżącego Stanu

### Wyniki Lighthouse (Produkcja)

| Metryka | Mobile | Desktop | Target | Status |
|---------|--------|---------|--------|--------|
| **Performance Score** | **57/100** ❌ | **77/100** ⚠️ | 90+ | KRYTYCZNY |
| **FCP** | 1.1s | 0.3s ✅ | <1.8s | Desktop OK, Mobile do poprawy |
| **LCP** | **20.9s** ❌❌❌ | 4.3s ❌ | <2.5s | KATASTROFA na mobile! |
| **TBT** | 610ms ❌ | 30ms ✅ | <200ms | Mobile blokujący |
| **CLS** | 0 ✅ | 0 ✅ | <0.1 | Idealnie |
| **Speed Index** | 4.6s | 1.3s | <3.4s | Mobile wolny |

---

## 🔍 Root Cause Analysis

### Problem #1: LCP = 20.9s na Mobile (98% to Render Delay!)

**LCP Element:** `span.block.text-pear` (tekst "LESSMANUAL")

**Breakdown LCP na mobile:**
- TTFB: 450ms (2%)
- Load Delay: 0ms (0%)
- Load Time: 0ms (0%)
- **Render Delay: 20,450ms (98%)** ← GŁÓWNY PROBLEM!

**Root Cause:**
1. Tekst "LESSMANUAL" ma animację z Framer Motion:
   - `delay: 0.8s` + `duration: 1.2s` = 2 sekundy
   - Znajduje się w: `src/components/sections/HeroSection.tsx` (linia 184-200)

2. **JavaScript blokuje rendering przez 20 sekund:**
   - Script Evaluation: 1,980ms
   - Script Parsing & Compilation: 802ms
   - Total: ~2.8s tylko na JS processing

3. **Spline 3D library (1.9MB) opóźnia hydration:**
   - Plik: `.next/static/chunks/c6a54c64.e539f0a1f403dac8.js`
   - Lazy loaded, ALE blokuje React hydration
   - Tekst nie może być interaktywny dopóki React nie hydrate

**Dlaczego to tekst, a nie robot?**
- Robot jest w `<Suspense>` z fallback image
- Przeglądarka widzi najpierw static image (26KB)
- Tekst "LESSMANUAL" jest **największy wizualnie** (text-7xl)
- Ma jaskrawy kolor pear (#DDE000) + glow effect
- Jest częścią React component tree, więc czeka na hydration

---

### Problem #2: Nieużywany JavaScript (945 KiB)

**Źródło problemu:**
- Wszystkie 9 sekcji ładowane synchronicznie: `src/app/[locale]/page.tsx`
- Tylko Hero jest "above the fold"
- Pozostałe 8 sekcji ładują się niepotrzebnie na starcie

**Największe chunki:**
1. `c6a54c64.e539f0a1f403dac8.js` - 1.9MB (Spline library)
2. `0b60df10.7639ef983b429a6d.js` - 1.9MB (drugi Spline chunk)
3. `645-4573e16d6d264252.js` - 247KB (Framer Motion)
4. `781-1dcc4e40867d4b57.js` - 174KB (React Markdown - chatbot)

**Total payload:** 3,499 KiB (mobile) / 3,502 KiB (desktop)

---

### Problem #3: Long Tasks (11 na mobile, 2 na desktop)

**Main Thread Activity:**
- Script Evaluation: 1,980ms
- Script Parsing: 802ms
- Other: 797ms
- Style & Layout: 391ms
- Total: **4,100ms blokowania main thread**

**TBT (Total Blocking Time):**
- Mobile: 610ms ❌ (cel: <200ms)
- Desktop: 30ms ✅

---

### Problem #4: Nieskomponowane Animacje (2 elementy)

**Problematyczne animacje:**
1. Tekst "LESSMANUAL" - sliding animation (`x: -100 → 0`)
2. Prawdopodobnie inne elementy Hero z Framer Motion

**Dlaczego to problem:**
- Animacje nie używają GPU acceleration
- Mogą powodować layout shifts (choć CLS=0)
- Blokują main thread podczas wykonania

---

## 🎯 Plan Naprawczy (Priorytetowany)

### 🔥 CRITICAL #1: Eliminacja Render Delay dla LCP

**Cel:** LCP z 20.9s → <2.5s (-88% improvement)

#### Zmiana 1.1: Usuń animację z LCP elementu

**Plik:** `src/components/sections/HeroSection.tsx` (linia 184-200)

**PRZED:**
```tsx
<motion.span
  className="block text-pear"
  initial={{ opacity: 0, x: -100 }}
  animate={slidingText ? { opacity: 1, x: 0 } : {}}
  transition={{
    duration: 1.2,
    delay: 0.8,
    type: "spring",
    stiffness: 100,
    damping: 20
  }}
  style={{
    textShadow: '0 0 80px rgba(221, 224, 0, 0.5)',
  }}
>
  {t('mainHeadlineAccent')}
</motion.span>
```

**PO:**
```tsx
<span
  className="block text-pear animate-fade-in"
  style={{
    textShadow: '0 0 80px rgba(221, 224, 0, 0.5)',
  }}
>
  {t('mainHeadlineAccent')}
</span>
```

**Dodaj do globals.css:**
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  will-change: opacity, transform;
}
```

**Dlaczego to działa:**
- CSS animations są GPU-accelerated
- Nie blokują React hydration
- Brak dependency na JavaScript state
- Tekst renderuje się NATYCHMIAST, animacja to enhancement

**Expected Impact:**
- LCP Mobile: 20.9s → ~1.5s
- LCP Desktop: 4.3s → ~0.8s
- Performance Mobile: 57 → 75+
- Performance Desktop: 77 → 88+

---

#### Zmiana 1.2: Defer Spline Library Loading

**Plik:** `src/components/ui/InteractiveRobotSpline.tsx`

**PRZED:**
```tsx
const Spline = lazy(() => import('@splinetool/react-spline'))

export function InteractiveRobotSpline({ scene, className }: Props) {
  return (
    <Suspense fallback={<Image src="/images/robot-preview.webp" ... />}>
      <Spline scene={scene} />
    </Suspense>
  )
}
```

**PO:**
```tsx
'use client'
import { Suspense, lazy, useState, useEffect } from 'react'
import Image from 'next/image'

const Spline = lazy(() => import('@splinetool/react-spline'))

export function InteractiveRobotSpline({ scene, className }: Props) {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false)

  useEffect(() => {
    // Opóźnij Spline aż tekst się załaduje
    const timer = setTimeout(() => {
      setShouldLoadSpline(true)
    }, 1500) // 1.5s wystarczy na załadowanie tekstu

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      {!shouldLoadSpline ? (
        <Image
          src="/images/robot-preview.webp"
          alt="Interactive 3D Robot"
          fill
          priority // CRITICAL dla LCP!
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <Suspense
          fallback={
            <Image
              src="/images/robot-preview.webp"
              alt="Loading 3D Robot"
              fill
              className="object-contain animate-pulse"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          }
        >
          <Spline scene={scene} />
        </Suspense>
      )}
    </div>
  )
}
```

**Expected Impact:**
- Spline chunk (1.9MB) nie blokuje initial render
- Tekst renderuje się w <1s
- 3D robot ładuje się jako progressive enhancement

---

### 🔥 CRITICAL #2: Code Splitting Below-Fold Sections

**Cel:** Bundle size 251KB → <120KB (-52%)

**Plik:** `src/app/[locale]/page.tsx`

**PRZED:**
```tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { SpecializationsSection } from '@/components/sections/SpecializationsSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { ROICalculatorSection } from '@/components/sections/ROICalculatorSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { FAQSection } from '@/components/sections/FAQSection'
```

**PO:**
```tsx
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection' // Tylko Hero eager!

// Lazy load wszystko poniżej fold
const ProblemSolutionSection = dynamic(
  () => import('@/components/sections/ProblemSolutionSection').then(mod => ({
    default: mod.ProblemSolutionSection
  })),
  {
    loading: () => <div className="h-screen bg-night" />,
    ssr: true // SSR dla SEO
  }
)

const SpecializationsSection = dynamic(
  () => import('@/components/sections/SpecializationsSection').then(mod => ({
    default: mod.SpecializationsSection
  })),
  { ssr: true }
)

const HowItWorksSection = dynamic(
  () => import('@/components/sections/HowItWorksSection').then(mod => ({
    default: mod.HowItWorksSection
  })),
  { ssr: true }
)

const ROICalculatorSection = dynamic(
  () => import('@/components/sections/ROICalculatorSection').then(mod => ({
    default: mod.ROICalculatorSection
  })),
  { ssr: true }
)

const FinalCTASection = dynamic(
  () => import('@/components/sections/FinalCTASection').then(mod => ({
    default: mod.FinalCTASection
  })),
  { ssr: true }
)

const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then(mod => ({
    default: mod.AboutSection
  })),
  { ssr: true }
)

const ContactFormSection = dynamic(
  () => import('@/components/sections/ContactFormSection').then(mod => ({
    default: mod.ContactFormSection
  })),
  { ssr: true }
)

const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection').then(mod => ({
    default: mod.FAQSection
  })),
  { ssr: true }
)
```

**Expected Impact:**
- Initial JS: 251KB → ~110KB
- Unused JS: 945 KiB → ~250 KiB
- TBT Mobile: 610ms → <200ms
- Performance Mobile: +15 points

---

### 🔴 HIGH #3: Minify & Compress JavaScript

**Cel:** Zaoszczędzić 653 KiB (z Lighthouse)

**Plik:** `next.config.mjs`

**Dodaj:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing config...

  // Production optimizations
  swcMinify: true, // Użyj SWC (szybszy niż Terser)

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Compress responses
  compress: true,

  // Optimize chunks
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunks
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'all',
          },
          // Framer Motion separate chunk
          framerMotion: {
            name: 'framer-motion',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 20,
          },
          // Spline separate chunk
          spline: {
            name: 'spline',
            test: /[\\/]node_modules[\\/]@splinetool[\\/]/,
            priority: 30,
          },
          // Common code
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },
}

export default nextConfig
```

**Expected Impact:**
- JS bundle size: -653 KiB
- Gzip compression: dodatkowe ~40% savings
- Faster parsing na mobile

---

### 🟡 MEDIUM #4: Preconnect to External Domains

**Cel:** -120ms (z Lighthouse)

**Plik:** `src/app/[locale]/layout.tsx`

**Dodaj w `<head>`:**
```tsx
<head>
  {/* Preconnect to Spline CDN */}
  <link rel="preconnect" href="https://prod.spline.design" />
  <link rel="dns-prefetch" href="https://prod.spline.design" />

  {/* Preconnect to n8n forms */}
  <link rel="preconnect" href="https://n8n.lessmanual.cloud" />
  <link rel="dns-prefetch" href="https://n8n.lessmanual.cloud" />

  {/* Existing preloads... */}
  <link rel="preload" href="/images/logo.webp" as="image" type="image/webp" />
  <link rel="preload" href="/images/robot-preview.webp" as="image" type="image/webp" />
</head>
```

**Expected Impact:**
- DNS lookup: -50ms
- SSL handshake: -70ms
- Total: -120ms dla external resources

---

### 🟡 MEDIUM #5: Optimize Images

**Cel:** -63 KiB (43 KiB next-gen + 20 KiB resize)

#### 5.1 Convert Remaining PNGs to WebP

**Pliki do konwersji:**
```bash
# Znajdź wszystkie PNG/JPG poza już zoptymalizowanymi
find public/images -type f \( -name "*.png" -o -name "*.jpg" \) ! -name "*.webp"

# Konwertuj używając cwebp
npx @squoosh/cli --webp '{"quality":85}' public/images/**/*.{png,jpg}
```

#### 5.2 Dodaj Width/Height do wszystkich obrazów

**Problem:** "Elementy graficzne nie mają width/height"

**Znajdź wszystkie Image bez dimensions:**
```bash
grep -rn "<Image" src/ --include="*.tsx" | grep -v "width\|height"
```

**Fix template:**
```tsx
// PRZED:
<Image src="/images/foo.webp" alt="..." />

// PO:
<Image
  src="/images/foo.webp"
  alt="..."
  width={800}
  height={600}
  // LUB: fill + sizes
/>
```

---

### 🟡 MEDIUM #6: Lazy Load Off-Screen Images

**Cel:** -34 KiB (mobile) / -30 KiB (desktop)

**Wszystkie obrazy poniżej fold powinny mieć `loading="lazy"`:**

```tsx
// Hero images: priority
<Image src="..." priority />

// Below fold: lazy
<Image src="..." loading="lazy" />
```

**Automated fix:**
```bash
# Znajdź wszystkie Image poniżej Hero
grep -rn "<Image" src/components/sections/ --include="*.tsx" | grep -v "HeroSection"

# Dodaj loading="lazy" gdzie brakuje priority
```

---

### 🟢 LOW #7: Add Passive Event Listeners

**Problem:** "Nie używa pasywnych detektorów"

**Plik:** `src/app/[locale]/layout.tsx`

**Dodaj global listener:**
```tsx
'use client'
import { useEffect } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Make scroll listeners passive globally
    let supportsPassive = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true
        }
      })
      window.addEventListener('test', null as any, opts)
    } catch (e) {}

    if (supportsPassive) {
      // Passive scroll listeners for better performance
      document.addEventListener('scroll', () => {}, { passive: true })
      document.addEventListener('touchstart', () => {}, { passive: true })
    }
  }, [])

  return (...)
}
```

---

## 📊 Oczekiwane Wyniki (Po Wszystkich Zmianach)

| Metryka | Przed (Mobile) | Po (Mobile) | Improvement |
|---------|----------------|-------------|-------------|
| **Performance Score** | 57 | **90+** | +58% |
| **LCP** | 20.9s | **<2.5s** | **-88%** 🔥 |
| **TBT** | 610ms | **<200ms** | -67% |
| **FCP** | 1.1s | **<0.8s** | -27% |
| **Speed Index** | 4.6s | **<3.0s** | -35% |

| Metryka | Przed (Desktop) | Po (Desktop) | Improvement |
|---------|-----------------|--------------|-------------|
| **Performance Score** | 77 | **95+** | +23% |
| **LCP** | 4.3s | **<1.5s** | -65% |
| **TBT** | 30ms | **<20ms** | -33% |

| Bundle | Przed | Po | Savings |
|--------|-------|-----|---------|
| **Initial JS** | 251KB | **<120KB** | -52% |
| **Unused JS** | 945 KiB | **<250 KiB** | -74% |
| **Total Payload** | 3,499 KiB | **<2,000 KiB** | -43% |

---

## 🎯 Implementation Order (Priorytet)

### Sprint 1: Critical LCP Fixes (2-3h)
1. ✅ **CRITICAL #1.1** - Usuń animację z LCP (CSS zamiast Framer Motion)
2. ✅ **CRITICAL #1.2** - Defer Spline loading
3. ✅ **Test:** Lighthouse mobile - target LCP <3s

### Sprint 2: Bundle Optimization (3-4h)
4. ✅ **CRITICAL #2** - Code splitting sections
5. ✅ **HIGH #3** - Minify config + webpack optimization
6. ✅ **Test:** Lighthouse mobile - target Performance 75+

### Sprint 3: Final Polish (2-3h)
7. ✅ **MEDIUM #4** - Preconnect hints
8. ✅ **MEDIUM #5** - Image optimization
9. ✅ **MEDIUM #6** - Lazy load images
10. ✅ **LOW #7** - Passive listeners
11. ✅ **Final Test:** Lighthouse mobile/desktop - target 90+

**Total Estimated Time:** 8-10 godzin pracy

---

## ✅ Testing Checklist

### Po każdej zmianie:

```bash
# 1. Build production
npm run build

# 2. Start production server
npm run start

# 3. Test Lighthouse (Chrome DevTools)
# Mobile (iPhone 12):
# - Open http://localhost:3000/pl
# - DevTools → Lighthouse → Mobile → Generate report
# - Verify improvements in LCP, TBT

# Desktop:
# - Same URL
# - DevTools → Lighthouse → Desktop → Generate report
```

### Final Verification (Before Deploy):

```bash
# 1. Performance >= 90 (mobile & desktop)
# 2. LCP < 2.5s (mobile & desktop)
# 3. TBT < 200ms (mobile)
# 4. CLS = 0 (maintain current)
# 5. No console errors
# 6. All animations still work
# 7. Robot interactive na desktop
# 8. Static preview na mobile (1.5s)
# 9. All sections load correctly
# 10. Mobile navigation works
```

---

## 🚨 Potential Risks & Mitigations

### Risk #1: CSS Animation może wyglądać inaczej niż Framer Motion
**Mitigation:** Dostosuj timing curves w CSS aby match'ować spring animation
**Test:** Visual comparison przed/po

### Risk #2: Delayed Spline = flash of static image
**Mitigation:** Użyj identycznego composition dla static image
**Acceptable:** Users preferują fast content nad 3D enhancement

### Risk #3: Code splitting może zwiększyć CLS
**Mitigation:** Loading placeholders z exact heights
**Test:** Lighthouse CLS musi pozostać 0

### Risk #4: Over-optimization może złamać funkcjonalność
**Mitigation:** Test każdej zmiany oddzielnie, git commit po każdym kroku
**Rollback:** `git revert` jeśli coś pójdzie nie tak

---

## 📝 Commit Strategy

```bash
# Commit po każdej CRITICAL zmianie:
git add src/components/sections/HeroSection.tsx src/styles/globals.css
git commit -m "perf: replace Framer Motion with CSS animation for LCP text

- Remove sliding animation from span.block.text-pear
- Add CSS keyframe animation (GPU-accelerated)
- Expected: LCP 20.9s → <2.5s on mobile

Impact: Performance mobile +15-20 points
Risk: Low (CSS animations are faster than JS)
Test: Lighthouse mobile LCP < 3s"

# Podobnie dla każdej kolejnej zmiany
```

---

## 🎓 Lessons Learned

1. **LCP nie zawsze to obrazki** - W tym przypadku to tekst z animacją
2. **Render Delay (98%) = JS blokuje rendering** - Nawet lazy-loaded komponenty mogą blokować hydration
3. **Framer Motion jest kosztowne** - CSS animations dla critical paths
4. **Code splitting jest kluczowe** - Tylko Hero powinien być eager-loaded
5. **Mobile ≠ Desktop** - Mobile ma 3.6x gorszy Performance Score

---

**Status:** ✅ Gotowe do implementacji
**Estimated ROI:** +33 punkty Performance (57 → 90)
**Risk Level:** 🟡 Medium (wymaga testowania każdej zmiany)
**Next Step:** Rozpocząć od CRITICAL #1 (największy impact)
