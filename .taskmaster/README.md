# TaskMaster Documentation - LessManual Website

**Project:** LessManual.ai Marketing Website
**Launch Target:** November 1, 2025 (12 days)
**Scope:** 3 pages (Homepage, /o-nas, /blog, /faq)
**Strategy:** Contact-first, dogfooding (ChatBot + Voice Agent)

---

## 📚 DOCUMENTATION OVERVIEW

This directory contains comprehensive task planning and execution documentation for the LessManual website development.

### Core Documents

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **TASK_BREAKDOWN.md** | Complete task list with 31 detailed tasks across 6 phases | Reference for task details, dependencies, subtasks |
| **TIMELINE.md** | Day-by-day schedule with milestones and launch checklist | Daily planning, progress tracking |
| **EXECUTION_STRATEGY.md** | Agent deployment, blocker handling, quality gates | Operational guidance during development |
| **CLAUDE.md** | TaskMaster integration instructions | Understanding workflow, agent usage |

---

## 🎯 QUICK START

### For Task Orchestrator Agent

**Step 1: Review PRD Requirements**
- Read the PRD v2.1 (user provided)
- Understand scope: 3 pages, 8 homepage sections, dogfooding features
- Note critical constraints: 12 days, Lighthouse ≥90, WCAG AAA

**Step 2: Review Task Structure**
- Read `TASK_BREAKDOWN.md` (all 31 tasks)
- Understand dependencies (see dependency graph)
- Identify parallelization opportunities

**Step 3: Check Current Day**
- Today is Day 1 (Oct 21, 2025)
- Read `TIMELINE.md` → "Day 1" section
- Planned tasks: 1.1 (design tokens), 1.2 (Supabase), 1.3 (i18n), 1.5 (animations)

**Step 4: Deploy Task Executors**
- Start with Task 1.1 (CRITICAL PATH)
- Deploy `ui-ux-designer` agent with context from `TASK_BREAKDOWN.md` → Task 1.1
- While Task 1.1 runs, prepare parallel tasks (1.2, 1.3, 1.5)

**Step 5: Track Progress**
- Use TodoWrite to mark tasks `in_progress` → `completed`
- Check quality gates (see `EXECUTION_STRATEGY.md`)
- Update daily standup (see `TIMELINE.md` template)

---

## 📋 TASK SUMMARY

### Phase 1: Foundation (Days 1-2)
**5 tasks** - Design tokens, Supabase, i18n, components, animations

**Critical Dependencies:**
- Task 1.1 (design tokens) → Task 1.4 (components)
- Task 1.2 (Supabase) → Task 2.4, 2.7 (forms)

**Exit Criteria:** Component library built, Supabase live, i18n routing works

---

### Phase 2: Homepage (Days 3-5)
**8 tasks** - Hero, Specjalizacje, Jak to działa, ROI Calculator, Nasi klienci, FAQ, Contact Form, Footer

**Critical Tasks:**
- Task 2.1 (Hero) - first impression
- Task 2.4 (ROI Calculator) - unique value prop
- Task 2.7 (Contact Form) - main conversion point

**Exit Criteria:** All 8 homepage sections live, forms working, Lighthouse ≥85

---

### Phase 3: Dogfooding (Days 6-7)
**3 tasks** - Chatbot, Voice Agent, n8n workflows

**Critical Path:**
- Task 3.3 (n8n) must complete before Task 3.2 (Voice Agent)
- Task 3.1 (Chatbot) can run parallel with Task 3.3

**Exit Criteria:** Chatbot qualifies users, Voice Agent triggers, n8n workflows execute

**Fallback:** Voice Agent can be deferred to post-launch if blocked

---

### Phase 4: Secondary Pages (Days 8-9)
**3 tasks** - /o-nas, /blog, /faq

**High Parallelization:** All pages independent, can build simultaneously

**Exit Criteria:** All 3 pages live, content compelling, SEO metadata added

---

### Phase 5: Optimization (Days 10-11)
**4 tasks** - Mobile, Lighthouse, Accessibility, SEO

**Critical Path:**
- Task 5.1 (Mobile) must complete before Task 5.2 (Lighthouse)
- Task 5.3 (Accessibility) and 5.4 (SEO) can run parallel

**Exit Criteria:** Lighthouse ≥90, WCAG AAA compliant, mobile tested on 3 devices

**Non-Negotiable:** Must achieve targets before launch

---

### Phase 6: Launch (Day 12)
**3 tasks** - Deployment, DNS, Smoke Tests

**Sequential:** Task 6.1 → Task 6.2 → Task 6.3 (no parallelization)

**Exit Criteria:** Production live at lessmanual.ai, smoke tests 100% pass, ready for announcement

---

## 🔄 DEPENDENCY GRAPH (Visual)

```
Phase 1 (Foundation)
├─ Task 1.1 (Design Tokens) ───────┐
│                                   ├──> Task 1.4 (Components) ──────┐
├─ Task 1.2 (Supabase) ────────────┤                                 │
├─ Task 1.3 (i18n) ────────────────┤                                 │
└─ Task 1.5 (Animations) ──────────┘                                 │
                                                                      │
Phase 2 (Homepage) ◄──────────────────────────────────────────────────┘
├─ Task 2.1 (Hero) ────────────────┐
├─ Task 2.2 (Specjalizacje) ───────┤
├─ Task 2.3 (Jak to działa) ───────┤
├─ Task 2.4 (ROI Calculator) ──────┼──> Requires Task 1.2 (Supabase)
├─ Task 2.5 (Nasi klienci) ────────┤
├─ Task 2.6 (FAQ) ─────────────────┤
├─ Task 2.7 (Contact Form) ────────┼──> Requires Task 1.2 (Supabase)
└─ Task 2.8 (Footer) ──────────────┘
                                    │
Phase 3 (Dogfooding) ◄──────────────┘
├─ Task 3.3 (n8n) ─────────────────┬──> Task 3.2 (Voice Agent)
└─ Task 3.1 (Chatbot) ─────────────┘
                                    │
Phase 4 (Secondary Pages) ◄─────────┘
├─ Task 4.1 (/o-nas) ──────────────┐
├─ Task 4.2 (/blog) ───────────────┤  (All parallel, no dependencies)
└─ Task 4.3 (/faq) ────────────────┘
                                    │
Phase 5 (Optimization) ◄────────────┘
├─ Task 5.1 (Mobile) ──────────────┬──> Task 5.2 (Lighthouse)
├─ Task 5.3 (Accessibility) ───────┤  (Parallel with 5.4)
└─ Task 5.4 (SEO) ─────────────────┘
                                    │
Phase 6 (Launch) ◄──────────────────┘
Task 6.1 (Deploy) → Task 6.2 (DNS) → Task 6.3 (Smoke Tests) → 🚀 LAUNCH
```

---

## ⚡ PARALLELIZATION SUMMARY

### High Parallel Days (Run Multiple Tasks Simultaneously)
- **Day 1 (PM):** Tasks 1.2, 1.3, 1.5 (after 1.1 done)
- **Day 3:** Tasks 2.1, 2.2, 2.8
- **Day 4:** Tasks 2.3, 2.5, 2.6
- **Day 8:** Tasks 4.1, 4.2
- **Day 11:** Tasks 5.3, 5.4

### Sequential Days (One Task at a Time)
- **Day 2:** Task 1.4 (complex component library)
- **Day 5:** Tasks 2.4, 2.7 (both critical, allocate 4h each)
- **Day 6-7:** Tasks 3.1, 3.2, 3.3 (dependencies)
- **Day 10:** Tasks 5.1 → 5.2 (mobile affects Lighthouse)
- **Day 12:** Tasks 6.1 → 6.2 → 6.3 (deployment sequence)

---

## 🚨 CRITICAL PATH TASKS (Cannot Slip)

1. **Task 1.1** (Day 1) - Design tokens → blocks all UI work
2. **Task 1.4** (Day 2) - Component library → blocks all sections
3. **Task 2.1** (Day 3) - Hero section → first impression, critical
4. **Task 2.4 + 2.7** (Day 5) - Forms → main conversion points
5. **Task 5.1 + 5.2** (Day 10) - Mobile + Lighthouse → launch requirement
6. **Task 6.1 → 6.3** (Day 12) - Deployment → literally launch

**If any critical task slips by >1 day, entire launch slips.**

---

## 🤖 AGENT DEPLOYMENT GUIDE

### Phase-Specific Agents

| Phase | Primary Agent | Use For |
|-------|--------------|---------|
| Phase 1 | `ui-ux-designer` | Design tokens, component library |
| Phase 1 | `supabase-schema-architect` | Database schema, RLS policies |
| Phase 2 | `ui-ux-designer` | Homepage sections, visual polish |
| Phase 2 | `nextjs-api-builder` | Forms, ROI Calculator, API routes |
| Phase 3 | `nextjs-api-builder` | Chatbot, Claude API integration |
| Phase 3 | `n8n-workflow-architect` | n8n workflows, Voice Agent |
| Phase 4 | `creative-copywriter` | /o-nas content, blog posts, FAQ |
| Phase 4 | `seo-aeo-geo-specialist` | SEO metadata, schema.org |
| Phase 5 | `performance-optimizer` | Lighthouse optimization, code splitting |
| Phase 5 | `checkpoint-tester` | Accessibility audit, smoke tests |

### Support Agents (Use When Needed)

- **`code-debugger`** - When errors occur, unexpected behavior
- **`security-audit-agent`** - After building forms, API routes
- **`code-refactor-architect`** - When code is messy, needs cleanup
- **`technical-documentation-writer`** - For MDX setup, complex logic

---

## ✅ QUALITY GATES (Every Task Must Pass)

### Functional Gate
- [ ] Works as specified in PRD
- [ ] Edge cases handled (empty states, errors)
- [ ] Both languages work (PL + EN)

### Visual Gate
- [ ] Matches Figma design (colors, spacing, layout)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Animations smooth (60fps)

### Performance Gate
- [ ] No console errors/warnings
- [ ] Images optimized (WebP, lazy loading)
- [ ] Bundle size reasonable

### Accessibility Gate
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Color contrast sufficient (WCAG AA minimum)

**Special Gates:**
- **Forms:** Data saves to Supabase correctly
- **Chatbot:** Full conversation flow works
- **Lighthouse:** Performance ≥90 on all pages
- **Launch:** Smoke test checklist 100% complete

---

## 📊 PROGRESS TRACKING

### TodoWrite Status
Currently 31 tasks in TodoWrite, all `pending` (just created)

**Next Action:** Mark Task 1.1 as `in_progress` when starting

**Rules:**
- Only ONE task `in_progress` at a time (unless parallel execution)
- Mark `completed` immediately after quality gates pass
- Don't batch completions (update in real-time)

### Daily Standup Template
See `TIMELINE.md` for full template

```
## Day X Update (Date)

✅ COMPLETED: [List tasks]
🚧 IN PROGRESS: [Current task + % done]
📋 TOMORROW: [Planned tasks]
🚫 BLOCKERS: [Issues + mitigation]
📊 PROGRESS: [X/31 tasks, on track/slipping]
```

---

## 🔥 BLOCKER HANDLING

### Common Blockers & Solutions

**Figma access denied:**
- Solution: Use placeholder tokens from CLAUDE.md
- Impact: Minimal (can update later)

**Supabase fails:**
- Solution: Use in-memory storage, migrate later
- Impact: Medium (blocks forms)

**Claude API rate limit:**
- Solution: Use smaller model (Haiku), add retry
- Impact: Low (chatbot slower)

**ElevenLabs issues:**
- Solution: DEFER Voice Agent to post-launch
- Impact: Low (nice-to-have)

**Lighthouse <90:**
- Solution: Prioritize fixes, accept ≥85 if needed
- Impact: Medium (SEO impact)

**DNS propagation delay:**
- Solution: Launch with Vercel URL, update later
- Impact: Low (DNS resolves within 24h)

### Escalation Criteria
Escalate to user if:
1. Critical task blocked >2 hours
2. External dependency missing (API keys, access)
3. Timeline slip >1 day on critical path
4. Scope creep detected (PRD unclear)

---

## 🎯 SUCCESS METRICS

### Phase Completion
- Phase 1: 5/5 tasks done → Foundation complete
- Phase 2: 8/8 tasks done → Homepage complete
- Phase 3: 3/3 tasks done → Dogfooding complete
- Phase 4: 3/3 tasks done → Secondary pages complete
- Phase 5: 4/4 tasks done → Optimization complete
- Phase 6: 3/3 tasks done → LAUNCH 🚀

### Quality Metrics
- Lighthouse Performance: ≥90 (all pages)
- Lighthouse Accessibility: 100 (all pages)
- WCAG Compliance: AAA
- Mobile Responsive: 3 devices tested, no issues
- Forms Working: 100% submission success rate

### Timeline Metrics
- On Track: All critical path tasks on schedule
- Slipping: 1 critical task delayed by 1 day
- Critical: 2+ critical tasks delayed or 1 task delayed >1 day

---

## 🚀 LAUNCH READINESS

### Launch Checklist (Day 12)
See `TIMELINE.md` for full checklist

**Technical (must pass):**
- [ ] Production deployment successful
- [ ] DNS resolves to lessmanual.ai
- [ ] SSL certificate active (HTTPS)
- [ ] All pages load without errors
- [ ] Forms submit and save data
- [ ] Chatbot works end-to-end
- [ ] Analytics tracking

**Performance (must pass):**
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility = 100
- [ ] Mobile tested on 3 devices
- [ ] No console errors

**Content (must pass):**
- [ ] All copy finalized (PL + EN)
- [ ] Images optimized (no placeholders)
- [ ] Legal pages exist (Privacy, Terms)
- [ ] SEO metadata complete

---

## 📖 RECOMMENDED READING ORDER

**For Task Orchestrator:**
1. This README (overview)
2. TIMELINE.md (understand daily flow)
3. TASK_BREAKDOWN.md (detailed task specs)
4. EXECUTION_STRATEGY.md (operational guidance)

**For Task Executors:**
1. TASK_BREAKDOWN.md → specific task section
2. EXECUTION_STRATEGY.md → quality gates
3. CLAUDE.md (main project instructions)

**For Stakeholders:**
1. This README (overview)
2. TIMELINE.md (daily milestones)
3. Daily standup updates (progress tracking)

---

## 🔗 RELATED DOCUMENTS

- **Main Project Instructions:** `/CLAUDE.md` (project root)
- **TaskMaster Instructions:** `.taskmaster/CLAUDE.md` (this directory)
- **PRD:** LessManual Website PRD v2.1 (provided by user)
- **Figma Design:** UI Kit (template only, replace purple colors)

---

## ❓ FAQ

**Q: Can we skip Voice Agent if blocked?**
A: Yes, it's not critical. Defer to post-launch (Week 2).

**Q: What if Lighthouse score is 88, not 90?**
A: If time constrained, accept ≥85. Optimize post-launch.

**Q: Can we parallelize more tasks?**
A: Yes, but respect dependencies (see dependency graph). Don't parallelize dependent tasks.

**Q: What if Day 12 DNS isn't ready?**
A: Launch with Vercel URL (lessmanual.vercel.app). DNS propagates within 24h.

**Q: How do we handle scope creep?**
A: Escalate immediately. Defer new features to Phase 2 (post-launch).

---

## 📞 CONTACT & SUPPORT

**Project Owner:** Bartłomiej Chudzik (CTO)
**Task Orchestrator:** Claude Code (AI Agent)
**Escalation:** Blocker >2h on critical path → notify user

---

**README Version:** 1.0
**Created:** 2025-10-21
**Last Updated:** 2025-10-21
**Timeline:** 12 days (Oct 21 → Nov 1, 2025)

---

**Ready to start? Begin with Task 1.1 (Extract Design Tokens) → See TASK_BREAKDOWN.md for details.**
