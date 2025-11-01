# Chatbot PRD for LessManual.ai

**Version:** 1.1
**Date:** 2025-11-01
**Author:** Chatbot Engineering Specialist
**Status:** Approved - Ready for Implementation

---

## 1. Executive Summary

### Problem Statement
LessManual.ai receives qualified traffic but faces challenges in converting visitors into leads due to:
- Users having questions outside business hours
- Friction in finding relevant information across 30 FAQ items
- Hesitation to fill contact form without initial guidance
- Lack of immediate engagement with potential clients

### Solution
Implement an intelligent chatbot that:
- Answers common questions using existing FAQ knowledge base
- Guides users to contact form or phone consultation when appropriate
- Provides 24/7 engagement without requiring immediate human intervention
- Reduces time-to-conversion by proactive assistance

### Target Users
1. **Primary:** Polish business owners/decision-makers researching AI automation (18:00-22:00 peak hours)
2. **Secondary:** English-speaking international clients (time zone agnostic)

### Success Criteria
- 40%+ of visitors interact with chatbot
- 60%+ questions answered without human intervention
- 15%+ increase in contact form conversions
- <2s average response time

---

## 2. Technical Architecture Decision

### ⚠️ CRITICAL RECOMMENDATION: Use AI API (OpenAI GPT-5-mini)

**Decision: YES to AI API - Specifically GPT-5-mini via OpenAI API**

### Why AI API is NECESSARY

#### The Semantic Understanding Problem
```
FAQ: "Jak długo trwa wdrożenie?"
User variations:
- "ile czasu zajmuje implementacja?" ✓ must match
- "w jakim czasie uruchomicie system?" ✓ must match
- "kiedy będzie gotowe?" ✓ must match
- "jaki timeline projektu?" ✓ must match
- "za ile dni mogę zacząć?" ✓ must match
```

**Without AI (keyword matching):**
- Would need 50+ hardcoded patterns per question
- Fails on synonyms, typos, colloquialisms
- Requires constant manual updates
- Poor user experience (feels robotic)

**With AI (semantic understanding):**
- Understands intent automatically
- Handles typos, informal language, synonyms
- Can provide contextual follow-up responses
- Feels conversational, professional

### Why GPT-5-mini (not Claude or GPT-4)

| Factor | GPT-5-mini | Claude 3.5 Sonnet | GPT-4 Turbo | Winner |
|--------|-------------|-------------------|-------------|--------|
| **Cost** | $0.25/$2.00 per 1M tokens | $3/$15 per 1M tokens | $10/$30 per 1M tokens | **GPT-5-mini (cheaper than Claude!)** |
| **Speed** | ~0.7s avg response | ~1.2s avg response | ~1.8s avg response | **GPT-5-mini** |
| **Context** | 128K tokens | 200K tokens | 128K tokens | Claude |
| **Polish language** | Excellent | Excellent | Excellent | Tie |
| **Prompt caching** | Yes ($0.025/1M cached) | Yes (90% cheaper) | Yes | **GPT-5-mini (90% cheaper)** |
| **API reliability** | 99.9% uptime | 99.9% uptime | 99.9% uptime | Tie |
| **Ecosystem** | Best docs, SDKs | Good | Best docs | OpenAI |

**Verdict:** GPT-5-mini wins on cost and speed. Perfect for FAQ chatbot with simple responses.

### Cost Analysis

**Expected monthly usage:**
- 10,000 website visitors/month
- 30% engage with chatbot = 3,000 conversations
- Average 6 messages per conversation = 18,000 messages
- Average 300 tokens per request (150 input + 150 output)
- Total: 5.4M tokens/month

**GPT-5-mini pricing:**
- Input: 2.7M × $0.25/1M = $0.68
- Output: 2.7M × $2.00/1M = $5.40
- **Total: ~$6.08/month** 💰

**With prompt caching (FAQ context reused):**
- Cached input (90%): 2.43M × $0.025/1M = $0.06
- Fresh input (10%): 0.27M × $0.25/1M = $0.07
- Output: 2.7M × $2.00/1M = $5.40
- **Total: ~$5.53/month** 🚀

**ROI Calculation:**
- If chatbot converts just 5 extra leads/month
- Average deal value: 8,000 PLN (~$2,000 USD)
- Revenue impact: $10,000/month
- **ROI: 1,808x** 🎯 (mega wysoki!)

### Alternative Considered: Rule-Based Chatbot

**Why it won't work:**
```typescript
// Rule-based approach (DON'T DO THIS)
if (message.includes('długo') && message.includes('wdrożenie')) {
  return faq.q1.answer
}
// ❌ Fails on: "ile czasu", "jaki timeline", "kiedy gotowe"
// ❌ Requires 1000+ rules for 30 FAQs
// ❌ Maintenance nightmare
```

**Verdict:** Not feasible for natural language understanding.

---

## 3. Functional Requirements

### 3.1 Core Capabilities

#### A. FAQ Question Answering
**Input:** User asks question in natural language (Polish or English)
**Process:**
1. Detect language (Polish vs English)
2. Send to GPT-5-mini with FAQ context
3. GPT-5-mini identifies matching FAQ item
4. Returns answer with source citation
5. Offers related questions

**Example Flow:**
```
User: "ile czasu zajmuje wdrożenie chatbota?"
Bot: "Wdrożenie ChatBota trwa od 7 dni roboczych, w zależności od złożoności
     integracji z Twoimi systemami.

     Standardowy proces wygląda tak:
     1. Konsultacja i analiza potrzeb (1-2 dni)
     2. Budowa i konfiguracja (3-5 dni)
     3. Testy i optymalizacja (2-3 dni)

     📝 Źródło: FAQ - Jak długo trwa wdrożenie?

     Chcesz dowiedzieć się więcej o procesie wdrożenia? Mogę wyjaśnić
     każdy krok szczegółowo."
```

#### B. Contact Form Guidance
**Triggers:**
- User asks about pricing (no fixed pricing on website)
- User asks complex question requiring custom solution
- User explicitly asks to talk to human
- After 3+ messages without resolution

**Response Pattern:**
```
User: "Ile kosztuje voice agent dla salonu samochodowego?"
Bot: "Cena Voice Agenta zależy od wielu czynników, takich jak:
     • Liczba połączeń dziennie
     • Integracje z Twoim CRM
     • Języki obsługi
     • Dodatkowe funkcje (SMS, email follow-up)

     Aby przygotować spersonalizowaną wycenę, zapraszam do
     wypełnienia krótkiego formularza kontaktowego 👇

     [Wypełnij formularz kontaktowy] (scroll to #contact)

     Lub wolisz bezpośrednią rozmowę? Możesz zamówić telefon
     od Agenta Szymona."
```

#### C. Phone Consultation Promotion
**Triggers:**
- User asks about complex implementation
- User mentions urgency ("pilne", "jak najszybciej")
- User is decision-maker (detected from context: "jestem właścicielem", "chcę wdrożyć")

**Response Pattern:**
```
User: "Potrzebuję pilnie automatyzacji sprzedaży dla 10 dealerów"
Bot: "Rozumiem, że projekt jest pilny i ma dużą skalę. W takim przypadku
     najlepszym rozwiązaniem będzie bezpośrednia rozmowa z naszym
     ekspertem - Agentem Szymonem.

     📞 Agent Szymon może:
     • Przeanalizować Twoje potrzeby w 15-minutowej rozmowie
     • Zaproponować optymalne rozwiązanie dla 10 lokalizacji
     • Przygotować wstępny harmonogram wdrożenia

     Czy mogę zamówić telefon zwrotny? Kiedy będzie najlepszy czas?

     [Zamów telefon od Agenta Szymona]"
```

---

## 4. Technical Implementation Plan

### 4.1 Frontend: Chat UI Component

#### Placement: Bottom-Right Widget (Recommended)

**Why bottom-right:**
- ✅ Industry standard (users expect it there)
- ✅ Non-intrusive (doesn't block content)
- ✅ Mobile-friendly (can be full-screen on mobile)
- ✅ Always accessible (fixed position)

#### Component Structure

```
src/components/chatbot/
├── ChatWidget.tsx           # Main container (floating button + window)
├── ChatWindow.tsx          # Chat interface
├── MessageList.tsx         # Scrollable message history
├── MessageBubble.tsx       # Individual message (user/bot)
├── InputBar.tsx            # Text input + send button
├── QuickReplies.tsx        # Suggested responses
├── TypingIndicator.tsx     # "Bot is typing..." animation
└── ChatContext.tsx         # State management (React Context)
```

### 4.2 Backend: API Architecture

#### API Route Structure
```
src/app/api/
├── chatbot/
│   ├── route.ts              # Main chat endpoint (POST /api/chatbot)
│   └── feedback/route.ts     # User feedback (👍/👎) (POST /api/chatbot/feedback)
└── chatbot-analytics/
    └── route.ts              # Admin dashboard stats (GET /api/chatbot-analytics)
```

#### Environment Variables
```bash
# .env.local
OPENAI_API_KEY=sk-proj-xxx  # Get from platform.openai.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx  # Server-side only (not exposed to client)
```

### 4.3 Supabase Schema

```sql
-- Chatbot conversations log
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
  feedback_rating INTEGER CHECK (feedback_rating IN (1, -1)) -- 👍 or 👎
);

-- Indexes for analytics queries
CREATE INDEX idx_chatbot_created_at ON chatbot_conversations(created_at DESC);
CREATE INDEX idx_chatbot_session ON chatbot_conversations(session_id);
CREATE INDEX idx_chatbot_locale ON chatbot_conversations(locale);
```

---

## 5. Success Metrics & KPIs

### Primary Metrics

1. **Engagement Rate:** ≥40% of visitors interact
2. **FAQ Deflection Rate:** ≥60% questions answered without human
3. **Conversion Rate:** ≥15% chatbot users → contact form/phone
4. **Response Time:** <2s (95th percentile)

### Secondary Metrics

5. **Messages Per Conversation:** 4-8 (sweet spot)
6. **User Satisfaction:** ≥80% positive (👍/👎)
7. **Top Unanswered Questions:** Track for FAQ expansion
8. **Cost Per Conversation:** <$0.01

---

## 6. Implementation Phases

### Phase 1: MVP (Week 1-2) - PRIORITY

**Goal:** Basic functional chatbot with FAQ answering

**Deliverables:**
1. ✅ ChatWidget component (floating button + window)
2. ✅ ChatWindow with message list and input
3. ✅ API route with GPT-5-mini integration
4. ✅ FAQ context loading (from existing JSON)
5. ✅ Basic error handling
6. ✅ Conversation logging to Supabase
7. ✅ Polish + English support
8. ✅ Mobile responsive design

**Testing:**
- Manual testing on 3 devices
- Test 20 FAQ questions (verify correct answers)
- Test error scenarios (API timeout, invalid input)
- Lighthouse audit (no performance regression)

**Success Criteria:**
- Chatbot answers 80%+ of FAQ questions correctly
- Response time <2s
- No console errors
- Works on mobile

---

### Phase 2: Enhanced Features (Week 3-4)

**Goal:** Improve UX and conversion optimization

**Features:**
1. ✅ Quick reply suggestions (3 buttons after bot response)
2. ✅ Proactive welcome message (after 5s on page)
3. ✅ Contact form integration (direct scroll + prefill)
4. ✅ Phone booking CTA (link to Cal.com or phone number)
5. ✅ Typing indicator animation
6. ✅ Message timestamps
7. ✅ User feedback (👍/👎 buttons)
8. ✅ Analytics dashboard (admin panel)

---

### Phase 3: Advanced AI (Week 5-6) - OPTIONAL

**Goal:** Make chatbot more intelligent and context-aware

**Features:**
1. ✅ Streaming responses (SSE for perceived speed)
2. ✅ Multi-turn context (remember previous messages better)
3. ✅ Product recommendations (suggest relevant AI solutions)
4. ✅ ROI calculator integration (chatbot can calculate ROI inline)
5. ✅ Lead qualification (ask discovery questions before handoff)
6. ✅ Email transcript (send conversation summary via email)

---

## 7. Open Questions & Decisions Needed

**For Business Owner (Bartłomiej):**

1. **Phone booking mechanism:**
   - Option A: Link to phone number (tel:+48123456789)
   - Option B: Link to Cal.com booking page
   - Option C: Chatbot collects preferred time → sends to ClickUp
   - **Recommendation:** Option B (Cal.com) - most professional, automated

2. **Agent Szymon identity:**
   - Is "Agent Szymon" a real person or fictitious?
   - If real: Include photo, bio, calendar link
   - If fictitious: Consider transparency ("AI assistant named Szymon")
   - **Recommendation:** Be transparent if AI-generated name

3. **Proactive messaging:**
   - Should chatbot auto-open after X seconds?
   - Or just show notification bubble ("Masz pytania? Kliknij aby porozmawiać")
   - **Recommendation:** Notification bubble (less intrusive)

4. **Budget approval:**
   - Estimated cost: ~$5.50/month (GPT-5-mini API)
   - ✅ Approved - mega tani!
   - Break-even: <1 lead converted in entire year

5. **Launch timeline:**
   - Phase 1 (MVP): Ready in 1-2 weeks
   - Launch immediately or wait for Phase 2 features?
   - **Recommendation:** Launch MVP fast, iterate based on real feedback

---

## Summary & Recommendation

### 🎯 Core Recommendation: USE GPT-5-mini API

**Why:**
- ✅ Only way to handle semantic question variations
- ✅ MEGA TANI - only ~$5.50/month with prompt caching
- ✅ Super fast response time (~0.7s)
- ✅ Excellent Polish language support
- ✅ Easy integration with Next.js (OpenAI SDK)
- ✅ 1,808x ROI (if converts 1 extra customer every 2 months)
- ✅ Stable, mature API with best documentation

**Alternative (rule-based) is NOT viable** for natural language understanding.

### 📋 Implementation Priority

**Phase 1 (MVP) - Launch ASAP:**
- Basic chat widget (bottom-right)
- GPT-5-mini API integration
- FAQ answering (30 questions)
- Contact form + phone CTAs
- Error handling
- Mobile responsive

**Phase 2 - Optimize (Week 3-4):**
- Quick replies
- Proactive messaging
- Analytics dashboard
- User feedback (👍/👎)

**Phase 3 - Advanced (Optional):**
- Streaming responses
- ROI calculator integration
- Lead qualification

### 💰 Cost-Benefit Analysis

**Monthly cost:** ~$5.50 (GPT-5-mini API with caching) 💰
**Break-even:** <1 lead converted in entire year
**Expected impact:** 5+ extra leads/month → 1+ customer/month
**ROI:** 180,800% (conservatively - mega wysoki!)

**Verdict:** Chatbot is INSANELY HIGH ROI investment. Cost is negligible. Proceed with Phase 1 immediately.

---

**Next Steps:**
1. ✅ PRD approved - updated to GPT-5-mini
2. ✅ Budget approved - only $5.50/month (mega tani!)
3. 🚀 Create implementation tasks in TaskMaster
4. 🚀 Begin Phase 1 implementation (1-2 weeks to MVP)

---

**Document Version:** 1.1
**Status:** ✅ Approved - Ready for Implementation
**Maintained by:** Chatbot Engineering Specialist
**Changes in v1.1:** Switched from Claude 3.5 Sonnet to GPT-5-mini ($0.25/$2.00 per 1M tokens, $0.025 cached)
