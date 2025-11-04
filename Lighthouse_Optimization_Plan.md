# Lighthouse Optimization Plan

**Goal:** Improve Lighthouse performance score to 90+ points

**Current Issues:**
- Heavy 3D Spline scene in HeroSection (slow LCP)
- GPU-intensive background effects
- Third-party scripts blocking main thread
- Missing environment variables for production build

---

## Task Breakdown with AI Agents & Skills

### Phase 1: HeroSection Optimization (Critical Path - LCP Improvement)

#### **Task 1.1: Create Static 3D Robot Placeholder**
**Priority:** HIGH (biggest LCP impact)

**Description:**
Replace heavy Spline 3D scene with optimized static image (WebP/AVIF) as placeholder. Lazy-load interactive 3D scene on user interaction or in background after page load.

**Assigned Agents:**
- `performance-optimizer` - Analyze bundle size impact, lazy loading strategy
- `ui-ux-designer` - Design placeholder that matches 3D robot aesthetic

**Required Skills:**
- `brainstorming` - Design approach for placeholder + lazy loading UX before coding
- `verification-before-completion` - Verify LCP improvement with Lighthouse before marking done

**Files to Modify:**
- `src/components/sections/HeroSection.tsx`
- Create: `public/images/robot-placeholder.webp` (optimized static image)

**Success Criteria:**
- LCP improves by 2-3 seconds
- 3D scene loads after initial paint
- No visual "jump" when 3D loads
- Lighthouse score increases

---

#### **Task 1.2: Optimize Background Effects**
**Priority:** MEDIUM

**Description:**
Replace multiple `radial-gradient` and `blur` effects with single optimized background image to reduce GPU rendering load.

**Assigned Agents:**
- `performance-optimizer` - Analyze rendering performance before/after
- `ui-ux-designer` - Create optimized background image maintaining visual design

**Required Skills:**
- `verification-before-completion` - Verify GPU performance improvement (Chrome DevTools Performance tab)

**Files to Modify:**
- `src/components/sections/HeroSection.tsx` (lines with radial-gradient styles)
- Create: `public/images/hero-background.webp`

**Success Criteria:**
- GPU usage reduced in Performance tab
- No visible difference in visual design
- Frame rate improves (target: consistent 60fps)

---

#### **Task 1.3: Convert Images to next/image**
**Priority:** MEDIUM

**Description:**
Replace all `<img>` tags with Next.js `<Image>` component for automatic optimization, responsive sizing, and priority loading.

**Assigned Agents:**
- `performance-optimizer` - Identify all images needing conversion

**Required Skills:**
- `verification-before-completion` - Verify images load faster with Lighthouse

**Files to Modify:**
- `src/components/sections/HeroSection.tsx`
- Any other components with `<img>` tags (run search)

**Success Criteria:**
- All images use `<Image>` component
- Images served in modern formats (WebP/AVIF)
- Responsive `srcSet` generated automatically
- Priority loading for above-fold images

---

### Phase 2: Third-Party Script Optimization

#### **Task 2.1: Defer Chat Widget Loading**
**Priority:** HIGH

**Description:**
Load ChatWidget with dynamic import after main content is interactive. Add delay or load on first user interaction.

**Assigned Agents:**
- `performance-optimizer` - Implement optimal loading strategy

**Required Skills:**
- `verification-before-completion` - Verify script no longer blocks main thread (Lighthouse "Opportunities" section)

**Files to Modify:**
- `src/app/[locale]/layout.tsx` (ChatWidget import)
- `src/components/chatbot/ChatWidget.tsx`

**Implementation Approach:**
```typescript
// Lazy load with delay
const ChatWidget = dynamic(() => import('@/components/chatbot/ChatWidget'), {
  ssr: false,
  loading: () => null,
})

// Load after 3 seconds or on scroll
useEffect(() => {
  const timer = setTimeout(() => setShowChat(true), 3000)
  return () => clearTimeout(timer)
}, [])
```

**Success Criteria:**
- Chat widget loads after main content interactive
- No blocking of initial paint
- TTI (Time to Interactive) improves

---

#### **Task 2.2: Optimize Google Tag Manager Loading**
**Priority:** MEDIUM

**Description:**
Ensure GTM uses `afterInteractive` strategy and doesn't block initial render.

**Assigned Agents:**
- `performance-optimizer` - Verify script loading strategy

**Required Skills:**
- `verification-before-completion` - Verify GTM loads after interactive (Lighthouse)

**Files to Check:**
- `src/components/GoogleTagManager.tsx`
- `src/app/[locale]/layout.tsx`

**Success Criteria:**
- GTM script loads with `afterInteractive`
- No blocking of main thread
- Analytics still tracks correctly

---

### Phase 3: Environment & Build Configuration

#### **Task 3.1: Setup .env.local & Fix Build Issues**
**Priority:** HIGH (blocks production testing)

**Description:**
Create `.env.local` for local development with Supabase credentials. Ensure `.gitignore` includes it. Document required env vars.

**Assigned Agents:**
- `security-audit-agent` - Verify no secrets committed to repo
- `technical-documentation-writer` - Document env vars in README

**Required Skills:**
- `verification-before-completion` - Verify production build succeeds

**Files to Create/Modify:**
- `.env.local` (gitignored)
- `.env.example` (template for team)
- `README.md` (env setup instructions)

**Required Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GA_ID=
```

**Success Criteria:**
- `npm run build` succeeds without errors
- No Supabase credential errors
- `.env.local` in `.gitignore`
- Team has clear setup instructions

---

### Phase 4: Testing & Verification

#### **Task 4.1: Run Production Build & Lighthouse Audit**
**Priority:** HIGH (validates all changes)

**Description:**
After each major optimization, run production build and Lighthouse audit to measure improvements.

**Assigned Agents:**
- `checkpoint-tester` - Run systematic tests
- `performance-optimizer` - Analyze results and suggest further optimizations

**Required Skills:**
- `verification-before-completion` - Must verify ALL metrics before proceeding

**Testing Protocol:**
```bash
# 1. Build production
npm run build
npm run start

# 2. Run Lighthouse (Chrome DevTools)
# - Desktop mode
# - Mobile mode
# - Compare scores before/after each task

# 3. Check specific metrics:
# - Performance: 90+
# - LCP: <2.5s
# - FID: <100ms
# - CLS: <0.1
# - TTI: <3.5s
```

**Success Criteria:**
- Lighthouse Performance ≥90 (desktop)
- Lighthouse Performance ≥85 (mobile)
- All Core Web Vitals in "Good" range
- No regressions in Accessibility, Best Practices, SEO

---

#### **Task 4.2: Final Verification & Documentation**
**Priority:** HIGH

**Description:**
Final comprehensive test of all changes. Document final scores and any remaining optimizations for future.

**Assigned Agents:**
- `checkpoint-tester` - Comprehensive testing
- `performance-optimizer` - Final analysis
- `technical-documentation-writer` - Document results

**Required Skills:**
- `verification-before-completion` - Final validation before deploy

**Deliverables:**
1. **Lighthouse Report** (before/after comparison)
2. **Performance Metrics Table** (LCP, FID, CLS, TTI)
3. **Optimization Summary Document** (what was changed, impact)
4. **Future Recommendations** (if score <90, what to do next)

**Success Criteria:**
- ✅ Lighthouse Performance ≥90
- ✅ All tasks completed and verified
- ✅ No breaking changes
- ✅ Documentation complete
- ✅ Ready for production deploy

---

## Task Execution Order

**Critical Path (do first):**
1. Task 3.1 (fix build) → Blocks testing
2. Task 1.1 (3D placeholder) → Biggest LCP impact
3. Task 2.1 (defer chat) → High TTI impact
4. Task 4.1 (test) → Validate improvements

**Parallel (can do simultaneously):**
- Task 1.2 (background) + Task 1.3 (next/image)
- Task 2.2 (GTM) can be done anytime

**Final:**
- Task 4.2 (final verification) → Only after all tasks complete

---

## Agent Reference Guide

**Available AI Agents:**
- `performance-optimizer` - Bundle size, lazy loading, Lighthouse optimization
- `ui-ux-designer` - Visual design, placeholders, UX for loading states
- `checkpoint-tester` - Integration testing, Lighthouse audits, verification
- `security-audit-agent` - Env vars, secrets, security vulnerabilities
- `technical-documentation-writer` - README, setup guides, code documentation
- `code-refactor-architect` - Code quality, maintainability (if refactor needed)

**Available Skills:**
- `brainstorming` - Use BEFORE starting implementation (design approach)
- `verification-before-completion` - Use AFTER completing task (verify it works)
- `test-driven-development` - If writing new features with tests
- `systematic-debugging` - If encountering bugs during optimization

---

## Notes for Execution

1. **Use TodoWrite** for each task to track progress
2. **Run Lighthouse after EACH task** to measure impact
3. **Never skip verification** - always use `verification-before-completion` skill
4. **Commit after each completed task** with descriptive message
5. **Document any issues** encountered and solutions applied
