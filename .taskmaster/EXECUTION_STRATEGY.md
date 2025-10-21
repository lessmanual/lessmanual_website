# LessManual Website - Execution Strategy

**For:** Task Orchestrator Agent + Development Team
**Purpose:** Maximize efficiency, minimize blockers, ensure Nov 1 launch
**Timeline:** 12 days (Oct 21 → Nov 1, 2025)

---

## 🎯 ORCHESTRATION PRINCIPLES

### 1. Critical Path First
**Rule:** Always work on critical path tasks before nice-to-haves

**Critical Path:**
```
Design Tokens → Components → Hero → Forms → Lighthouse → Launch
```

**Non-Critical (can slip):**
- Blog structure (Day 8-9)
- Voice Agent (Day 7)
- Testimonial slider (Day 4)

**Decision Framework:**
- Is this task blocking other tasks? → CRITICAL
- Is this task user-facing on launch day? → HIGH
- Is this task a nice-to-have feature? → MEDIUM/LOW

---

### 2. Parallel Execution Strategy

**High Parallelization Days:**
- Day 1 (after design tokens done)
- Day 3-4 (homepage sections)
- Day 8 (secondary pages)
- Day 11 (accessibility + SEO)

**Example Day 3 Parallel Execution:**
```
9:00 AM  → Start Task 2.1 (Hero) [Agent A]
11:00 AM → Start Task 2.2 (Specjalizacje) [Agent B] (parallel)
11:00 AM → Start Task 2.8 (Footer) [Agent C] (parallel)
```

**Coordination:**
- Deploy 3 task-executor agents simultaneously
- Each agent gets clear scope (one section)
- Check in every 2 hours for blockers
- Mark completed immediately (don't batch)

---

### 3. Quality Gates (Must Pass Before "Done")

**Every task must pass:**
1. **Functional:** Works as specified in PRD
2. **Visual:** Matches Figma design (colors, spacing, layout)
3. **Responsive:** Mobile + tablet + desktop tested
4. **i18n:** Both PL and EN translations work
5. **Performance:** No console errors, animations smooth
6. **Accessible:** Keyboard navigation works

**Special gates for specific tasks:**
- Forms (Task 2.4, 2.7): Data saves to Supabase correctly
- Chatbot (Task 3.1): Full conversation flow works end-to-end
- Lighthouse (Task 5.2): Performance ≥90 on all pages
- Launch (Task 6.3): Smoke test checklist 100% complete

**If any gate fails:**
- Keep task as `in_progress`
- Deploy appropriate agent (e.g., `performance-optimizer`)
- Don't move to next task until fixed
- Exception: Non-critical tasks can be deferred

---

## 🤖 AGENT DEPLOYMENT STRATEGY

### Phase 1 (Days 1-2): Foundation
**Deploy:** `ui-ux-designer`, `supabase-schema-architect`

**Task 1.1 (Design Tokens):**
- Agent: `ui-ux-designer`
- Context: Figma UI Kit URL, brand colors (night, pear, tekhelet)
- Success: `design-tokens.ts` created, Tailwind config updated

**Task 1.2 (Supabase):**
- Agent: `supabase-schema-architect`
- Context: Database schema (leads, roi_calculations, chat_conversations)
- Success: Tables created, test data inserts work

**Task 1.3 (i18n):**
- Agent: None (orchestrator handles directly)
- Action: Install next-intl, configure routing
- Success: /pl and /en routes work

**Task 1.4 (Component Library):**
- Agent: `ui-ux-designer`
- Context: Design tokens, Figma component patterns
- Success: 5 components built, responsive, accessible

**Task 1.5 (Framer Motion):**
- Agent: None (straightforward setup)
- Action: Install package, create `animations.ts`
- Success: Animation variants defined, 60fps tested

---

### Phase 2 (Days 3-5): Homepage
**Deploy:** `ui-ux-designer` (primary), `nextjs-api-builder` (forms)

**Day 3 (Parallel Execution):**
```
Agent A: Task 2.1 (Hero) - CRITICAL PATH
  - Context: 3D animation specs, product cards design
  - Duration: 4 hours
  - Success: Hero renders, animations smooth, chatbot bubble triggers

Agent B: Task 2.2 (Specjalizacje) - PARALLEL
  - Context: 3 card designs, expand/collapse interactions
  - Duration: 4 hours
  - Success: Cards expand, hover effects work

Agent C: Task 2.8 (Footer) - PARALLEL
  - Context: Navigation structure, social links
  - Duration: 2 hours
  - Success: Footer navigation complete
```

**Day 4 (Parallel Execution):**
```
Agent A: Task 2.3 (Jak to działa) - PRIORITY
  - Context: 4-step timeline, scroll animations
  - Duration: 4 hours
  - Success: Timeline animates on scroll

Agent B: Task 2.5 (Nasi klienci) - PARALLEL
  - Context: Client logos, testimonial slider design
  - Duration: 3 hours
  - Success: Slider works, auto-play enabled

Agent C: Task 2.6 (FAQ Preview) - PARALLEL
  - Context: 5 questions, accordion component
  - Duration: 2 hours
  - Success: Accordion expands, link to /faq works
```

**Day 5 (Sequential - Complex Tasks):**
```
Morning: Task 2.4 (ROI Calculator) - CRITICAL
  - Agent: `nextjs-api-builder`
  - Context: Calculation formula, Supabase integration
  - Duration: 4 hours
  - Success: Calculator works, data saves

Afternoon: Task 2.7 (Contact Form) - CRITICAL
  - Agent: `nextjs-api-builder` + `security-audit-agent`
  - Context: Form fields, Supabase schema, RODO compliance
  - Duration: 4 hours
  - Success: Form submits, data saves, no vulnerabilities
```

---

### Phase 3 (Days 6-7): Dogfooding
**Deploy:** `nextjs-api-builder`, `n8n-workflow-architect`, `security-audit-agent`

**Day 6 (Sequential - Dependencies):**
```
Morning: Task 3.3 (n8n Workflows) - CRITICAL
  - Agent: `n8n-workflow-architect`
  - Context: Contact form → Supabase → ClickUp → Slack → Email
  - Duration: 4 hours
  - Success: Workflow runs end-to-end, ClickUp task created

Afternoon: Task 3.1 (Chatbot - Part 1)
  - Agent: `nextjs-api-builder`
  - Context: Claude API, conversation UI, context management
  - Duration: 4 hours
  - Success: Chatbot UI built, Claude API connected
```

**Day 7 (Sequential - Finish Chatbot First):**
```
Morning: Task 3.1 (Chatbot - Part 2)
  - Agent: `nextjs-api-builder`
  - Context: Qualification flow, Supabase storage
  - Duration: 4 hours
  - Success: Full conversation works, saves to Supabase

Afternoon: Task 3.2 (Voice Agent)
  - Agent: `n8n-workflow-architect`
  - Context: ElevenLabs API, n8n workflow, phone trigger
  - Duration: 4 hours
  - Success: Voice call triggers, conversation flows
  - FALLBACK: If blocked, defer to post-launch
```

---

### Phase 4 (Days 8-9): Secondary Pages
**Deploy:** `creative-copywriter`, `seo-aeo-geo-specialist`, `ui-ux-designer`

**Day 8 (High Parallel):**
```
Agent A: Task 4.1 (/o-nas)
  - Agents: `creative-copywriter` + `ui-ux-designer`
  - Context: Founder story, mission, values, tech stack
  - Duration: 4 hours
  - Success: /o-nas page live, content compelling

Agent B: Task 4.2 (/blog)
  - Agents: `technical-documentation-writer` + `creative-copywriter`
  - Context: MDX configuration, blog structure, optional sample post
  - Duration: 4 hours
  - Success: /blog structure works, MDX renders
```

**Day 9 (Solo Task):**
```
Task 4.3 (/faq)
  - Agent: `creative-copywriter`
  - Context: ~20 questions, categories, search functionality
  - Duration: 4 hours
  - Success: /faq page live, search works
```

---

### Phase 5 (Days 10-11): Optimization
**Deploy:** `performance-optimizer`, `checkpoint-tester`, `seo-aeo-geo-specialist`

**Day 10 (Sequential - Mobile Affects Lighthouse):**
```
Morning: Task 5.1 (Mobile Optimization) - CRITICAL
  - Agent: `ui-ux-designer`
  - Context: Test on 3 devices, fix layout issues
  - Duration: 4 hours
  - Success: Mobile tested, no issues

Afternoon: Task 5.2 (Lighthouse Optimization) - CRITICAL
  - Agent: `performance-optimizer`
  - Context: Target Performance ≥90, all pages
  - Duration: 4 hours
  - Success: Lighthouse scores meet targets
  - CRITICAL: If fails, extend to Day 11 morning
```

**Day 11 (High Parallel):**
```
Morning: Task 5.3 (Accessibility Audit) - PARALLEL
  - Agent: `checkpoint-tester`
  - Context: WCAG AAA, keyboard nav, screen readers
  - Duration: 4 hours
  - Success: No critical accessibility issues

Morning: Task 5.4 (SEO Implementation) - PARALLEL
  - Agent: `seo-aeo-geo-specialist`
  - Context: Meta tags, sitemap, schema.org, hreflang
  - Duration: 4 hours
  - Success: SEO complete, Google Rich Results pass

Afternoon: Re-run Lighthouse (ALL PAGES)
  - Agent: `performance-optimizer`
  - Action: Fix any remaining issues
  - Success: All pages ≥90 Performance, 100 Accessibility
```

---

### Phase 6 (Day 12): Launch
**Deploy:** `checkpoint-tester` (final verification)

**Sequential Execution:**
```
9:00 AM - Task 6.1 (Production Deployment)
  - Agent: Orchestrator (direct)
  - Actions: Build, deploy to Vercel, configure env vars
  - Duration: 2 hours
  - Success: Production site live (Vercel URL)

11:00 AM - Task 6.2 (DNS Configuration)
  - Agent: Orchestrator (direct)
  - Actions: Point DNS to Vercel, wait for SSL
  - Duration: 1 hour
  - Success: lessmanual.ai resolves, HTTPS works

12:00 PM - Task 6.3 (Final Smoke Tests)
  - Agent: `checkpoint-tester`
  - Actions: Run full smoke test checklist
  - Duration: 2 hours
  - Success: All tests pass, ready for announcement

2:00 PM - 🚀 GO LIVE
  - Action: Public announcement (LinkedIn, Twitter)
  - Monitor: Vercel Analytics, error logs, user feedback
```

---

## 🚨 BLOCKER HANDLING PROTOCOL

### Immediate Escalation Triggers
**Escalate to user if:**
1. Critical task blocked >2 hours (can't self-resolve)
2. External dependency missing (Figma access, API keys)
3. Technical limitation discovered (framework bug)
4. Scope creep detected (PRD requirements unclear)
5. Timeline slip >1 day on critical path

**Escalation Format:**
```
🚨 BLOCKER ALERT

Task: X.X - Task Name
Status: Blocked for X hours
Issue: [Clear description]
Impact: [Timeline/feature impact]
Attempted Solutions:
  - [What was tried]
  - [Why it didn't work]
Options:
  1. [Option A: description, pros/cons]
  2. [Option B: description, pros/cons]
  3. [Option C: description, pros/cons]
Recommendation: [Option X because Y]
Decision Needed By: [Time/date]
```

---

### Common Blockers & Solutions

**Blocker: Figma access denied**
- **Impact:** Task 1.1 blocked (CRITICAL)
- **Solution:** Use placeholder design tokens from CLAUDE.md
- **Follow-up:** Update tokens when Figma access granted

**Blocker: Supabase table creation fails**
- **Impact:** Task 1.2 blocked (CRITICAL)
- **Solution:** Use in-memory storage (JSON), migrate later
- **Follow-up:** Migrate to Supabase when unblocked

**Blocker: Claude API rate limit**
- **Impact:** Task 3.1 (Chatbot) delayed
- **Solution:** Use smaller model (Claude 3 Haiku), add retry logic
- **Follow-up:** Upgrade API tier if persistent

**Blocker: ElevenLabs API issues**
- **Impact:** Task 3.2 (Voice Agent) blocked
- **Solution:** DEFER to post-launch (not critical)
- **Follow-up:** Add Voice Agent in Week 2

**Blocker: Lighthouse Performance <90**
- **Impact:** Task 5.2 fails quality gate
- **Solution:** Prioritize fixes (lazy loading, image optimization)
- **Follow-up:** Accept ≥85 if <90 not achievable in time

**Blocker: DNS propagation delay**
- **Impact:** Task 6.2 delayed
- **Solution:** Launch with Vercel URL, update announcement when DNS live
- **Follow-up:** DNS typically propagates within 24h

---

## 📊 PROGRESS TRACKING

### Daily Check-In (9 AM)
**Review:**
1. Yesterday's completed tasks (mark `completed`)
2. Today's planned tasks (mark first as `in_progress`)
3. Blockers (escalate if critical)
4. Timeline status (on track / slipping / critical)

**Update TodoWrite:**
- Mark completed tasks
- Add new tasks if discovered
- Remove tasks if scope cut

---

### Mid-Day Check-In (1 PM)
**Review:**
1. Morning task progress (% done)
2. Blockers encountered (mitigation plan)
3. Afternoon task prioritization (adjust if needed)

---

### End-of-Day Check-In (6 PM)
**Review:**
1. Tasks completed today (celebrate wins)
2. Tasks in-progress (will finish tomorrow)
3. Timeline adjustment (if needed)
4. Tomorrow's plan (confirm tasks)

**Document:**
- Daily standup format (see TIMELINE.md)
- Share with stakeholder (async update)

---

## ✅ TASK COMPLETION CHECKLIST

**Before marking task as `completed`:**

### Code Quality
- [ ] TypeScript compiles (no errors)
- [ ] No console errors/warnings
- [ ] No React warnings (keys, props, etc.)
- [ ] Formatted (Prettier, ESLint)

### Functionality
- [ ] Works as specified in PRD
- [ ] Edge cases handled (empty states, errors)
- [ ] Both languages work (PL + EN)
- [ ] Forms validate correctly (if applicable)

### Visual
- [ ] Matches Figma design (colors, spacing, layout)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Animations smooth (60fps)
- [ ] No layout shifts (CLS)

### Performance
- [ ] Images optimized (WebP, lazy loading)
- [ ] No memory leaks (check DevTools)
- [ ] Bundle size reasonable (<50KB for component)
- [ ] First load fast (<2s)

### Accessibility
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] ARIA labels present (buttons, inputs)
- [ ] Color contrast sufficient (WCAG AA minimum)
- [ ] Focus states visible

### Testing
- [ ] Tested in Chrome (primary)
- [ ] Tested in Safari (if Mac)
- [ ] Tested on mobile (real device)
- [ ] Tested both languages (/pl, /en)

---

## 🎯 SUCCESS METRICS (Daily)

**Track daily:**
- Tasks completed / Total tasks (X/31)
- Phase progress (e.g., Phase 2: 6/8 tasks)
- Lighthouse score (latest audit)
- Blockers count (active)
- Timeline status (on track / ⚠️ slipping / 🚨 critical)

**Weekly milestones:**
- Week 1 (Days 1-7): Homepage + Dogfooding complete
- Week 2 (Days 8-12): Secondary pages + Optimization + Launch

---

## 🚀 LAUNCH READINESS CRITERIA

**Before announcing launch:**

### Technical Readiness
- [ ] Production deployment successful
- [ ] DNS propagated (lessmanual.ai works)
- [ ] SSL certificate active (HTTPS works)
- [ ] All pages load without errors
- [ ] Forms submit and save data
- [ ] Chatbot conversation works end-to-end
- [ ] Analytics tracking (Vercel, GA4)

### Content Readiness
- [ ] All copy finalized (PL + EN)
- [ ] Images optimized (no placeholders)
- [ ] Legal pages exist (Privacy, Terms)
- [ ] SEO metadata complete (all pages)
- [ ] Social sharing works (OG images)

### Performance Readiness
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility = 100
- [ ] Mobile tested on 3 devices
- [ ] No critical bugs (P0/P1)
- [ ] Error monitoring configured

### Business Readiness
- [ ] Cal.com booking working
- [ ] n8n workflows tested
- [ ] ClickUp workspace configured
- [ ] Team notified (Slack alerts work)
- [ ] Announcement posts drafted

**If any criteria fails:**
- Fix if P0/P1 (critical, blocks launch)
- Defer if P2/P3 (nice-to-have, post-launch)
- Document known issues (for transparency)

---

## 🎉 POST-LAUNCH PLAN (Week 2+)

**Immediate (Day 13-14):**
- Monitor analytics (traffic, conversions)
- Fix critical bugs (P0 only)
- Respond to user feedback
- Thank early visitors (engagement)

**Week 2 (Day 15-21):**
- Add deferred features (Voice Agent if skipped)
- Write blog post #1 (content marketing)
- Optimize based on analytics (A/B test CTAs)
- Expand FAQ (based on questions received)

**Week 3+ (Continuous):**
- Weekly blog posts (SEO)
- Social media content (LinkedIn, Twitter)
- Customer testimonials (social proof)
- Feature improvements (based on feedback)

---

**Execution Strategy Version:** 1.0
**Created:** 2025-10-21
**For:** 12-day launch timeline (Oct 21 → Nov 1)
**Maintained by:** Task Orchestrator Agent

**Remember:** This is aggressive. Prioritize ruthlessly. Cut scope if needed. Launch > Perfection.
