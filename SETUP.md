# LessManual Website - Setup Guide

## 🚀 Quick Start

```bash
# 1. Install dependencies (already done)
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# 3. Run development server
npm run dev
```

Visit `http://localhost:3000/pl` (Polish) or `http://localhost:3000/en` (English)

---

## 🎨 Figma MCP Configuration

**Status:** ⚠️ Not configured yet

### What is Figma MCP?
Model Context Protocol server for extracting design tokens, components, and assets from Figma.

### Setup Steps:

1. **Install Figma MCP server** (via Claude Code):
   ```bash
   claude mcp add figma
   ```

2. **Get Figma credentials**:
   - Go to Figma → Settings → Account
   - Generate Personal Access Token
   - Copy your Figma File URL

3. **Configure MCP** (~/.config/claude/mcp.json):
   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-figma"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "your-figma-token",
           "FIGMA_FILE_KEY": "your-file-key"
         }
       }
     }
   }
   ```

4. **Verify MCP connection**:
   ```bash
   /mcp
   # Should show: figma (connected)
   ```

5. **Extract design tokens**:
   - I can now read Figma file and extract:
     - Colors → `src/lib/design-tokens.ts`
     - Typography → `tailwind.config.ts`
     - Components → React components
     - Assets → `public/images/`

### Figma File Structure Expected:
- **Colors page** - with color styles named: night, white, pear, tekhelet
- **Typography page** - with text styles
- **Components page** - Hero, Button, Card, etc.
- **Assets page** - Images, icons, logos

---

## 📋 TaskMaster Configuration

**Status:** ✅ Built-in to Claude Code (no configuration needed)

### What is TaskMaster?
Built-in task planning and orchestration system in Claude Code.

### How to use:

**Starting a new feature:**
```
You: "Build the Homepage according to PRD"

Claude Code:
1. Uses TaskMaster to break down tasks
2. Creates TodoWrite list
3. Identifies dependencies
4. Executes in order
5. Marks progress
```

**Available agents:**
- `task-orchestrator` - Plans and coordinates tasks
- `task-executor` - Executes individual tasks
- `task-checker` - Verifies completed tasks

**Integration with TodoWrite:**
- Tasks automatically tracked in todo list
- Real-time status updates
- Dependency management

**No manual configuration required** - TaskMaster is always available via the Task tool.

---

## 🐰 CodeRabbit Configuration

**Status:** ⚠️ Requires GitHub integration

### What is CodeRabbit?
AI-powered code review that runs automatically on every Pull Request.

### Setup Steps:

1. **Create GitHub repository**:
   ```bash
   # Initialize git (see Git Setup below first)
   gh repo create lessmanual-website --private --source=. --remote=origin
   ```

2. **Connect CodeRabbit**:
   - Go to https://coderabbit.ai
   - Sign in with GitHub
   - Click "Add Repository"
   - Select `lessmanual-website`
   - Grant permissions

3. **Configure CodeRabbit** (.coderabbit.yaml):
   ```yaml
   language: "pl"
   reviews:
     profile: "assertive"
     request_changes_workflow: true
     high_level_summary: true
     poem: false
     review_status: true
     collapse_walkthrough: false
   chat:
     auto_reply: true
   ```

4. **Test CodeRabbit**:
   ```bash
   git checkout -b test/coderabbit
   # Make a small change
   git add .
   git commit -m "test: verify CodeRabbit integration"
   git push origin test/coderabbit
   # Create PR on GitHub
   # CodeRabbit should comment within 1-2 minutes
   ```

### CodeRabbit checks:
- ✅ Performance issues (bundle size, lazy loading)
- ✅ Accessibility violations (WCAG, ARIA)
- ✅ Security vulnerabilities (XSS, injection)
- ✅ Code quality (complexity, duplication)
- ✅ Best practices (React, Next.js patterns)
- ✅ TypeScript type safety

---

## 🔧 Git Setup

**Initialize repository:**

```bash
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Initial commit
git commit -m "feat: initial Next.js 15.5 setup with i18n (PL/EN)

- Next.js 15.5 + React 19 + TypeScript
- next-intl for PL/EN localization
- Tailwind CSS with design tokens (night, white, pear, tekhelet)
- Framer Motion for animations
- Supabase client setup
- Project structure: App Router with [locale]
- Configuration: Tailwind, TypeScript, PostCSS
- Environment variables template

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# 4. Create GitHub repo (optional but recommended)
gh repo create lessmanual-website --private --source=. --remote=origin --push
```

**Branch strategy:**
- `main` → Production (lessmanual.ai)
- `develop` → Staging (optional)
- `feat/*` → Feature branches
- `fix/*` → Bug fixes

---

## 📦 Environment Variables

**Required before running:**

Edit `.env.local` with real values:

```bash
# Supabase (for contact form, leads database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# n8n (for lead automation)
N8N_WEBHOOK_URL=https://your-n8n.app/webhook/contact-form

# ClickUp (for lead management)
CLICKUP_API_TOKEN=your-token
CLICKUP_LIST_ID=your-list-id

# Slack (for notifications)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Cal.com (for demo booking)
NEXT_PUBLIC_CALCOM_USERNAME=bartlomiej-chudzik
```

**Optional (can add later):**
- Vercel Analytics (auto-configured on Vercel)
- Sentry (error tracking)
- Plausible (privacy-friendly analytics)

---

## 🧪 Verify Setup

**1. Development server:**
```bash
npm run dev
# Visit http://localhost:3000/pl
# Should see hero section with "Make Your Business LESSMANUAL"
```

**2. Language switching:**
- Visit `/pl` - should show Polish content
- Visit `/en` - should show English content
- Change URL manually to test routing

**3. Tailwind CSS:**
- Inspect element - should see custom colors (night, pear)
- Check dark mode background
- Verify responsive design (resize browser)

**4. TypeScript:**
```bash
npm run build
# Should compile without errors
```

**5. Lighthouse audit:**
```bash
npm run build
npm run start
# Open Chrome DevTools → Lighthouse
# Run audit → Performance should be 90+
```

---

## 🐛 Troubleshooting

### "Module not found: next-intl"
```bash
npm install next-intl
```

### "Cannot find module '@/lib/design-tokens'"
- Check `tsconfig.json` has `"@/*": ["./src/*"]` in paths
- Restart TypeScript server in VSCode: Cmd+Shift+P → "TypeScript: Restart TS Server"

### Figma MCP not working
- Verify `claude mcp` shows figma as connected
- Check Figma token is valid (try in Figma API)
- Ensure file key is correct (from Figma URL)

### CodeRabbit not reviewing
- Check GitHub integration is active (coderabbit.ai dashboard)
- Verify PR is open (not draft)
- Check CodeRabbit has repo permissions

### Hot reload not working
- Turbopack is enabled by default
- If issues, switch to webpack: `npm run dev` (remove --turbopack)

---

## 📚 Next Steps

1. ✅ **Setup complete** - all configuration done
2. 🎨 **Extract design from Figma** - use Figma MCP to get tokens
3. 📋 **Plan Homepage** - use TaskMaster to break down PRD
4. 🚀 **Start coding** - build Hero section first
5. 🧪 **Test & deploy** - Lighthouse audit → Vercel

---

## 🆘 Support

- **Claude Code docs**: https://docs.claude.com/claude-code
- **Next.js 15 docs**: https://nextjs.org/docs
- **next-intl docs**: https://next-intl-docs.vercel.app
- **Figma MCP**: https://github.com/modelcontextprotocol/servers
- **CodeRabbit**: https://coderabbit.ai/docs

---

**Last Updated:** 2025-10-20
**Maintained by:** Bartłomiej Chudzik (CTO)
