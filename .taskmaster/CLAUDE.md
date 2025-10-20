# TaskMaster Instructions for LessManual Website

## Project Context

**Project:** LessManual.ai marketing website
**Tech:** Next.js 15.5 + TypeScript + Tailwind + Framer Motion + next-intl (PL/EN)
**Timeline:** 14 days from start to launch
**Quality bar:** Lighthouse 90+, WCAG AAA, pixel-perfect to Figma

## Task Planning Principles

### When to Use TaskMaster

**Use task-orchestrator agent when:**
- Starting new feature from PRD
- Breaking down complex work (3+ steps)
- Identifying dependencies between tasks
- Parallelizing independent work

**Example:**
```
User: "Build Homepage according to PRD"

TaskMaster:
1. Extract requirements from PRD
2. Break into sections: Hero, Problem/Solution, Products, Social Proof, CTA
3. Identify dependencies: Design tokens → Components → Sections
4. Create task list with TodoWrite
5. Execute in parallel where possible
```

### Task Breakdown Template

**For each page:**
1. Extract design from Figma (MCP)
2. Create component library (if needed)
3. Build sections (Hero, Features, etc.)
4. Add i18n (PL + EN translations)
5. Lighthouse audit
6. CodeRabbit review
7. Deploy to Vercel preview

**For each component:**
1. Read Figma design
2. Build base component (UI)
3. Add animations (Framer Motion)
4. Add interactivity (event handlers)
5. Test accessibility (keyboard nav, screen reader)
6. Test responsiveness (mobile, tablet, desktop)

## Dependencies & Order

**Must complete first:**
- Design tokens extraction (Figma MCP)
- i18n configuration (next-intl)
- Component library (Button, Card, Input)

**Then parallel:**
- Homepage sections (can be built simultaneously)
- Product pages (independent of each other)
- About page, Contact page (independent)

**Last:**
- Blog structure (Phase 2)
- Case studies (Phase 2)
- Advanced features (Phase 3)

## Task Status Management

**TodoWrite integration:**
- `pending` - Task defined, not started
- `in_progress` - Currently working on (ONE at a time)
- `completed` - Finished + Lighthouse ≥90 + CodeRabbit approved

**Mark completed ONLY when:**
- ✅ Code works as expected
- ✅ Tests pass (Lighthouse, TypeScript)
- ✅ Both languages work (PL + EN)
- ✅ No console errors
- ✅ Matches Figma design
- ✅ Responsive on 3 devices

## Agents to Use Per Task Type

**UI Components:**
- `ui-ux-designer` - Design polish & layout
- `checkpoint-tester` - Verify requirements

**API Routes:**
- `nextjs-api-builder` - Backend logic
- `security-audit-agent` - Vulnerability check
- `checkpoint-tester` - Integration test

**Content Pages:**
- `creative-copywriter` - Headlines & copy
- `seo-aeo-geo-specialist` - Meta tags & SEO
- `ui-ux-designer` - Layout & design

**Performance Issues:**
- `performance-optimizer` - Lighthouse optimization
- `code-refactor-architect` - Code cleanup

**Bug Fixes:**
- `code-debugger` - Root cause analysis
- `checkpoint-tester` - Verify fix

## PRD-to-Tasks Mapping

**MVP Phase 1 (Week 1-2):**

### Week 1:
- [ ] Extract design tokens from Figma
- [ ] Create component library (Button, Card, Input, Nav, Footer)
- [ ] Build Homepage:
  - [ ] Hero section
  - [ ] Problem/Solution section
  - [ ] Products overview
  - [ ] Social proof section
  - [ ] Final CTA
- [ ] Build Pricing page
- [ ] Lighthouse audit Homepage & Pricing

### Week 2:
- [ ] Build /produkty/chatbot page
- [ ] Build /produkty/voiceagent page
- [ ] Build Contact page (form + Supabase + n8n)
- [ ] Build About page
- [ ] SEO optimization (meta tags, sitemap, schema.org)
- [ ] Deploy to Vercel production
- [ ] DNS setup (lessmanual.ai → Vercel)

## Quality Gates

**Before marking task "done":**
1. Run Lighthouse audit locally
2. Check TypeScript compilation (`npm run build`)
3. Test on 3 devices (iPhone, Android, Desktop)
4. Verify both languages (switch /pl ↔ /en)
5. Check all links work
6. No console errors/warnings
7. CodeRabbit approval (if PR)

**If any gate fails:**
- Keep task as `in_progress`
- Create new task for fix
- Use appropriate agent (e.g., `performance-optimizer` if Lighthouse <90)

## Parallelization Strategy

**Can work in parallel:**
- Different pages (Homepage, Pricing, Contact)
- Independent components (Button, Card, Input)
- Content translation (PL → EN)

**Must be sequential:**
- Design tokens → Components → Pages
- Components → Sections → Pages
- Build → Lighthouse audit → Deploy

**Example parallel execution:**
```
Task 1: Build Homepage Hero (in_progress)
Task 2: Build Pricing page (in_progress)  ← PARALLEL
Task 3: Build Contact form (pending)      ← WAIT for Supabase setup
```

## Error Handling

**If task blocked:**
1. Mark as `pending` (not `in_progress`)
2. Create unblocking task
3. Work on parallel task instead
4. Return when unblocked

**If task fails quality check:**
1. Keep as `in_progress`
2. Use appropriate fix agent
3. Re-run quality checks
4. Only then mark `completed`

## Communication with User

**Daily standup format:**
```
✅ Completed today:
- Homepage Hero section (Lighthouse 94)
- Products overview cards with 3D animations

🚧 In progress:
- Contact form integration (Supabase + n8n)

📋 Next up:
- Pricing page (starting after contact form)

🚫 Blockers:
- Need Figma access for About page images
```

## Integration with Other Tools

**Figma MCP:**
- Use at start of each visual component
- Extract: colors, spacing, typography, assets
- Output: design-tokens.ts, Tailwind config, public/images/

**CodeRabbit:**
- Create PR after completing feature
- Address all "critical" and "high" issues
- "Medium" issues - fix if time permits
- "Low" issues - create task for later

**Vercel:**
- Auto-deploy on merge to main
- Test on preview URL before merge
- Monitor performance in Vercel Analytics

---

**TaskMaster Version:** 1.0
**Last Updated:** 2025-10-20
**Integrated with:** lessmanual-website-CLAUDE.md v1.2
