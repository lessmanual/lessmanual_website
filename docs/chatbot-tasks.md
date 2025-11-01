# Chatbot Implementation Tasks

**Project:** LessManual.ai Chatbot (GPT-5-mini)
**Created:** 2025-11-01
**Status:** Ready for implementation

---

## Phase 1: MVP (Week 1-2) - PRIORITY

### Setup & Dependencies (3 tasks)

- [ ] **Task 1: Install OpenAI SDK and dependencies**
  - Install `openai` package (latest version)
  - Install `uuid` for session ID generation
  - Verify installation in package.json
  - Command: `npm install openai uuid`

- [ ] **Task 2: Create Supabase migration for chatbot_conversations table**
  - Create migration file: `supabase/migrations/YYYYMMDDHHMMSS_create_chatbot_conversations.sql`
  - Schema from PRD:
    ```sql
    CREATE TABLE chatbot_conversations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      session_id TEXT NOT NULL,
      user_message TEXT NOT NULL,
      bot_response TEXT NOT NULL,
      locale TEXT NOT NULL CHECK (locale IN ('pl', 'en')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

      -- Optional metadata
      user_ip TEXT,
      user_agent TEXT,
      response_time_ms INTEGER,

      -- Analytics flags
      is_faq_answered BOOLEAN DEFAULT false,
      resulted_in_conversion BOOLEAN DEFAULT false,
      feedback_rating INTEGER CHECK (feedback_rating IN (1, -1))
    );

    -- Indexes
    CREATE INDEX idx_chatbot_created_at ON chatbot_conversations(created_at DESC);
    CREATE INDEX idx_chatbot_session ON chatbot_conversations(session_id);
    CREATE INDEX idx_chatbot_locale ON chatbot_conversations(locale);
    ```
  - Run migration: `supabase db push`
  - Verify table exists in Supabase dashboard

- [ ] **Task 3: Create ChatContext.tsx - React Context for state management**
  - Location: `src/contexts/ChatContext.tsx`
  - State to manage:
    - `messages: Array<{role: 'user'|'bot', content: string, timestamp: Date}>`
    - `isOpen: boolean` (widget open/closed)
    - `isLoading: boolean` (bot typing)
    - `sessionId: string` (UUID for conversation)
  - Functions:
    - `sendMessage(message: string)`
    - `toggleChat()`
    - `clearHistory()`
  - Use `'use client'` directive (needs useState, useContext)

---

### Frontend Components (6 tasks)

- [ ] **Task 4: Create ChatWidget.tsx - floating button + window container**
  - Location: `src/components/chatbot/ChatWidget.tsx`
  - Fixed position: `bottom-right` (20px from edges)
  - Floating button: circular, pear color (#DDE000), with chat icon
  - Animated open/close transition (Framer Motion)
  - Z-index: 9999 (above all content)
  - Mobile: full-screen when open
  - Desktop: 400px width, 600px height window

- [ ] **Task 5: Create ChatWindow.tsx - main chat interface component**
  - Location: `src/components/chatbot/ChatWindow.tsx`
  - Header: "Chatbot LessManual.ai" + minimize button
  - Body: MessageList component
  - Footer: InputBar component
  - Background: night (#0C0D0A)
  - Border radius: 16px (desktop), 0px (mobile full-screen)

- [ ] **Task 6: Create MessageList.tsx - scrollable message history**
  - Location: `src/components/chatbot/MessageList.tsx`
  - Auto-scroll to bottom on new message
  - Virtual scrolling for performance (if >50 messages)
  - Display MessageBubble components
  - Show TypingIndicator when bot is thinking

- [ ] **Task 7: Create MessageBubble.tsx - individual message component**
  - Location: `src/components/chatbot/MessageBubble.tsx`
  - Props: `role: 'user'|'bot'`, `content: string`, `timestamp: Date`
  - User message: align right, pear background (#DDE000), night text
  - Bot message: align left, dark gray background, white text
  - Markdown support for bot responses (bold, lists, links)
  - Timestamp: subtle, gray, bottom of bubble

- [ ] **Task 8: Create InputBar.tsx - text input + send button**
  - Location: `src/components/chatbot/InputBar.tsx`
  - Textarea: auto-resize (1-4 lines), placeholder: "Zadaj pytanie..."
  - Send button: paper plane icon, pear color
  - Keyboard shortcut: Enter to send, Shift+Enter for new line
  - Disable input while bot is typing

- [ ] **Task 9: Create TypingIndicator.tsx - 'Bot is typing...' animation**
  - Location: `src/components/chatbot/TypingIndicator.tsx`
  - Three animated dots: fade in/out sequence
  - Color: gray
  - Framer Motion for smooth animation

---

### Backend API (4 tasks)

- [ ] **Task 10: Create /api/chatbot/route.ts - main GPT-5-mini integration endpoint**
  - Location: `src/app/api/chatbot/route.ts`
  - Method: POST
  - Request body: `{message: string, sessionId: string, locale: 'pl'|'en'}`
  - OpenAI integration:
    - Model: `gpt-5-mini`
    - System prompt: Load FAQ context from JSON
    - Temperature: 0.7 (balanced creativity)
    - Max tokens: 500 (reasonable response length)
    - Prompt caching: enabled (90% cost reduction)
  - Response: `{response: string, responseTime: number}`
  - Error handling: return fallback message if API fails

- [ ] **Task 11: Implement FAQ context loading from pl.json and en.json**
  - Read FAQ data from:
    - `src/messages/pl.json` (faq section)
    - `src/messages/en.json` (faq section)
  - Format FAQ as system prompt context:
    ```
    You are a helpful assistant for LessManual.ai, a Polish AI automation company.

    FAQ Knowledge Base:
    Q: [question]
    A: [answer]
    ...

    Rules:
    - Answer in the same language as the user's question
    - If question matches FAQ, provide the exact answer
    - If question requires custom solution, guide to contact form
    - If user needs urgent help, suggest phone consultation with Agent Szymon
    ```
  - Cache this context (90% cost savings with GPT-5-mini caching)

- [ ] **Task 12: Add conversation logging to Supabase in API route**
  - After each API call, log to `chatbot_conversations` table:
    - `session_id`: from request
    - `user_message`: from request
    - `bot_response`: from GPT-5-mini
    - `locale`: from request
    - `response_time_ms`: measured duration
    - `is_faq_answered`: detect if response came from FAQ
  - Use Supabase service role key (server-side only)
  - Don't block response if logging fails (log error, continue)

- [ ] **Task 13: Add error handling and fallback responses**
  - Try-catch around OpenAI API call
  - Timeout: 10 seconds (abort if slower)
  - Fallback responses:
    - API timeout: "Przepraszam, odpowiedź zajęła zbyt długo. Spróbuj ponownie."
    - API error: "Wystąpił błąd. Możesz wypełnić formularz kontaktowy poniżej."
    - Invalid input: "Proszę wpisać pytanie."
  - Log all errors to console.error (for debugging)
  - Return 200 status even on errors (with fallback message)

---

### i18n & Mobile (2 tasks)

- [ ] **Task 14: Add i18n support (Polish + English) for chatbot UI**
  - Add translations to `src/messages/pl.json`:
    ```json
    "chatbot": {
      "title": "Chatbot LessManual.ai",
      "placeholder": "Zadaj pytanie...",
      "typing": "Bot pisze...",
      "send": "Wyślij",
      "error": "Wystąpił błąd",
      "welcomeMessage": "Cześć! Jestem chatbotem LessManual.ai. Jak mogę Ci pomóc?"
    }
    ```
  - Add translations to `src/messages/en.json`:
    ```json
    "chatbot": {
      "title": "LessManual.ai Chatbot",
      "placeholder": "Ask a question...",
      "typing": "Bot is typing...",
      "send": "Send",
      "error": "An error occurred",
      "welcomeMessage": "Hi! I'm LessManual.ai chatbot. How can I help you?"
    }
    ```
  - Use `useTranslations('chatbot')` in components
  - Detect user's locale from URL (`/pl` vs `/en`)

- [ ] **Task 15: Make chatbot mobile responsive (full-screen on mobile)**
  - Desktop (≥768px):
    - Fixed position bottom-right
    - 400px width × 600px height
    - Border radius: 16px
  - Mobile (<768px):
    - Full-screen when open (100vw × 100vh)
    - No border radius
    - Z-index: 10000 (cover everything)
  - Tablet (768px-1024px):
    - Same as desktop but 350px width
  - Test on: iPhone SE, iPhone 14 Pro, iPad, Desktop

---

### Testing (4 tasks)

- [ ] **Task 16: Test chatbot on 3 devices (iPhone, Android, Desktop)**
  - iPhone (Safari): floating button, full-screen, typing, send
  - Android (Chrome): same tests
  - Desktop (Chrome/Firefox): window size, animations, keyboard shortcuts
  - Verify all transitions smooth (60fps in DevTools)
  - Check accessibility: Tab navigation, screen reader (VoiceOver)

- [ ] **Task 17: Test 20 FAQ questions - verify correct answers**
  - Test questions in both Polish and English
  - Sample questions:
    1. "Jak długo trwa wdrożenie?" (should match FAQ)
    2. "ile czasu zajmuje implementacja?" (semantic variation)
    3. "Ile kosztuje chatbot?" (should guide to contact form)
    4. "Potrzebuję pilnie pomocy" (should suggest phone call)
    5. [Add 16 more from faq.json]
  - Success criteria: 80%+ correct answers
  - Document incorrect answers → improve system prompt

- [ ] **Task 18: Test error scenarios (API timeout, invalid input, network errors)**
  - Simulate API timeout (set timeout to 1ms in code)
  - Simulate network error (disconnect internet)
  - Send empty message
  - Send very long message (5000+ characters)
  - Send special characters (emoji, Polish diacritics)
  - Verify fallback messages appear correctly
  - Verify chatbot doesn't crash or show console errors

- [ ] **Task 19: Run Lighthouse audit - ensure Performance ≥90, Accessibility 100**
  - Run Lighthouse in Chrome DevTools (Incognito mode)
  - Target scores:
    - Performance: ≥90 (chatbot shouldn't slow down page)
    - Accessibility: 100 (semantic HTML, ARIA labels, keyboard nav)
    - Best Practices: ≥95
    - SEO: 100 (chatbot hidden from crawlers)
  - Fix any issues before marking task complete
  - Re-run audit after fixes to verify

---

## Phase 2: Enhanced Features (Week 3-4) - OPTIONAL

**Not implemented yet - future enhancements:**

1. Quick reply suggestions (3 buttons after bot response)
2. Proactive welcome message (after 5s on page)
3. Contact form integration (direct scroll + prefill)
4. Phone booking CTA (link to Cal.com or phone number)
5. Message timestamps
6. User feedback (👍/👎 buttons)
7. Analytics dashboard (admin panel)
8. Rate limiting (prevent abuse)

---

## Phase 3: Advanced AI (Week 5-6) - OPTIONAL

**Future advanced features:**

1. Streaming responses (SSE for perceived speed)
2. Multi-turn context (remember previous messages better)
3. Product recommendations (suggest relevant AI solutions)
4. ROI calculator integration (chatbot can calculate ROI inline)
5. Lead qualification (ask discovery questions before handoff)
6. Email transcript (send conversation summary via email)

---

## Environment Variables Required

Add to `.env.local`:

```bash
# OpenAI API
OPENAI_API_KEY=sk-proj-xxx  # Get from platform.openai.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx  # Server-side only
```

---

## Success Criteria (Phase 1 MVP)

- ✅ Chatbot answers 80%+ of FAQ questions correctly
- ✅ Response time <2s (95th percentile)
- ✅ No console errors in browser
- ✅ Works on mobile (iPhone, Android)
- ✅ Lighthouse Performance ≥90
- ✅ Lighthouse Accessibility = 100
- ✅ Cost: ~$5.50/month (within budget)

---

## Notes

- **Cost:** GPT-5-mini is mega tani ($0.25 input / $2.00 output / $0.025 cached) = ~$5.50/month
- **ROI:** 1,808x if converts 1 extra customer every 2 months
- **Timeline:** 1-2 weeks for Phase 1 MVP
- **Technology:** Next.js 15.5, React 19, TypeScript, Tailwind, Framer Motion, OpenAI, Supabase
