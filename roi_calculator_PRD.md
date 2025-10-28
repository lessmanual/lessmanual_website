# ROI Calculator - Product Requirements Document (PRD)
**Project:** LessManual.ai ROI Calculator
**Version:** 1.1
**Last Updated:** 2025-10-27
**Status:** Phase 1 Complete, Phase 2 In Progress

---

## PHASE 1: COMPLETED ✅

### ✅ Core Calculations Fixed
- [x] Double division bug fixed (automationRate 0-100 format)
- [x] All 6 products calculating correctly
- [x] ROI%, payback period, total cost removed (CEO decision)
- [x] Bonus metrics separated with disclaimer (Voice Agent + Sales Automation)
- [x] Monthly savings as BIG NUMBER (5xl, pear color)

### ✅ UI/UX Improvements
- [x] 2-column grid for main metrics (removed ROI% card)
- [x] Text centered in all Step 3 cards
- [x] Custom Solutions bonus section fixed (was showing empty green box)
- [x] Product-specific metrics displayed correctly
- [x] Mobile-first responsive design
- [x] Framer Motion animations

### ✅ Preset Scenarios
- [x] ChatBot: ecommerce, saas, services
- [x] Voice Agent: medical, dealer, salon
- [x] Content Agent: agency, ecommerce, personal
- [x] Sales Automation: b2b, saas, consulting
- [x] RAG Chatbot: accounting, legal, hr
- [x] Custom Solutions: manufacturing, logistics, finance

---

## PHASE 2: TODO 🚧

### HIGH PRIORITY (Must Have for MVP)

#### 1. **Step 4: Lead Capture Form**
**Priority:** CRITICAL
**Est. Time:** 2-3 hours
**Dependencies:** None

**Requirements:**
- Form with 4 fields:
  - Imię i nazwisko (text, required)
  - Email firmowy (email, required, validation)
  - Telefon (tel, required, Polish format +48)
  - Nazwa firmy (text, optional)
- RODO checkbox (required):
  ```
  ☐ Zgadzam się na przetwarzanie danych osobowych zgodnie z RODO
     [Link do polityki prywatności]
  ```
- Newsletter checkbox (optional):
  ```
  ☐ Chcę otrzymywać newsletter z case studies i tips automatyzacji
  ```
- Submit button: "📩 Wyślij raport na email"
- Validation:
  - Email format check
  - Phone format: +48 XXX XXX XXX
  - Required fields marked with *
  - Show validation errors below fields
- Success state:
  - Show confirmation message
  - "Sprawdź swoją skrzynkę! Raport wysłany na [email]"
  - Option to calculate for another product
- Error state:
  - "Coś poszło nie tak. Spróbuj ponownie lub napisz na hello@lessmanual.ai"

**Technical Specs:**
- Component: `src/components/sections/ROICalculatorSection.tsx` (Step 4)
- Form state: React useState
- Validation library: Zod (already in project)
- Save to Supabase: `calculator_leads` table
- Trigger n8n webhook after successful save

**Supabase Schema:**
```sql
CREATE TABLE calculator_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),

  -- Contact info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,

  -- Calculator data
  product_id TEXT NOT NULL, -- 'chatbot', 'voiceAgent', etc.
  savings_month INTEGER NOT NULL,
  savings_year INTEGER NOT NULL,
  saved_hours_month INTEGER,
  additional_revenue_month INTEGER DEFAULT 0,

  -- Consent
  rodo_consent BOOLEAN NOT NULL DEFAULT false,
  newsletter_consent BOOLEAN DEFAULT false,

  -- Metadata
  inputs JSONB, -- Store all calculator inputs for reference
  source_url TEXT,
  user_agent TEXT
);

-- Index for email lookups
CREATE INDEX idx_calculator_leads_email ON calculator_leads(email);
CREATE INDEX idx_calculator_leads_created_at ON calculator_leads(created_at DESC);
```

**Acceptance Criteria:**
- [ ] Form validates all required fields
- [ ] Email format validation works
- [ ] Phone number accepts Polish format
- [ ] RODO consent required to submit
- [ ] Data saves to Supabase successfully
- [ ] Success message shows after submission
- [ ] Error handling for network failures
- [ ] Form is responsive on mobile
- [ ] Tab navigation works properly
- [ ] Accessibility (ARIA labels, keyboard nav)

---

#### 2. **n8n Webhook Integration**
**Priority:** HIGH
**Est. Time:** 2-3 hours
**Dependencies:** Step 4 form, Supabase table

**Requirements:**

**Workflow Trigger:**
- Supabase Database Webhook
- Table: `calculator_leads`
- Event: INSERT
- Payload includes: all lead data + calculator results

**n8n Workflow Steps:**

**Step 1: Validate Data**
```javascript
// n8n Code Node
const lead = $input.first().json;

// Validate required fields
if (!lead.email || !lead.full_name || !lead.product_id) {
  throw new Error('Missing required fields');
}

return {
  json: {
    lead: lead,
    timestamp: new Date().toISOString()
  }
};
```

**Step 2: Generate PDF Report**
```javascript
// n8n HTTP Request Node → PDF Generation Service
// Options:
// A) Use Puppeteer to render HTML → PDF
// B) Use pdf-lib to generate from template
// C) Use external service (DocRaptor, PDFShift)

// Recommended: Puppeteer in n8n Docker
POST /generate-pdf
{
  "template": "roi-report",
  "data": {
    "productName": "ChatBot 24/7",
    "savingsMonth": 12000,
    "savingsYear": 144000,
    "savedHours": 88,
    "companyName": "Example Sp. z o.o.",
    "date": "2025-10-27"
  }
}

Response: PDF buffer (base64)
```

**PDF Template Design:**
```
┌────────────────────────────────────┐
│ [LessManual Logo]                  │
│                                     │
│ Raport ROI                          │
│ ChatBot 24/7                        │
│                                     │
│ Przygotowany dla:                   │
│ Example Sp. z o.o.                  │
│ 2025-10-27                          │
├────────────────────────────────────┤
│                                     │
│ 💰 Twoje Oszczędności               │
│                                     │
│ Miesięcznie:    12,000 PLN          │
│ Rocznie:       144,000 PLN          │
│ Zaoszczędzone:  88 h/mies           │
│                                     │
├────────────────────────────────────┤
│                                     │
│ 📊 Szczegóły Wdrożenia              │
│ [Chart: Before vs After]            │
│ [Chart: 3-year savings]             │
│                                     │
├────────────────────────────────────┤
│                                     │
│ 🚀 Następne Kroki                   │
│                                     │
│ 1. Umów 15-min demo                 │
│    [QR Code → Cal.com]              │
│                                     │
│ 2. Porozmawiaj z CTO                │
│    bartlomiej@lessmanual.ai         │
│    +48 XXX XXX XXX                  │
│                                     │
│ 3. Zobacz case study                │
│    lessmanual.ai/case-studies       │
│                                     │
└────────────────────────────────────┘
```

**Step 3: Send Email (Resend)**
```javascript
// n8n Resend Node
{
  from: "roi@lessmanual.ai",
  to: lead.email,
  subject: `Twój raport ROI - ${productName} | LessManual.ai`,
  html: `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Cześć ${firstName}! 👋</h1>

      <p>Dziękujemy za skorzystanie z kalkulatora ROI.</p>

      <div style="background: #F7DF1E; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin: 0;">Twoje wyniki:</h2>
        <ul style="font-size: 18px;">
          <li>Miesięczne oszczędności: <strong>${savingsMonth.toLocaleString('pl-PL')} PLN</strong></li>
          <li>Roczne oszczędności: <strong>${savingsYear.toLocaleString('pl-PL')} PLN</strong></li>
          <li>Zaoszczędzone godziny: <strong>${savedHours} h/mies</strong></li>
        </ul>
      </div>

      <p>📎 Szczegółowy raport znajdziesz w załączniku (PDF).</p>

      <h3>Chcesz wdrożyć automatyzację?</h3>
      <p>
        <a href="https://cal.com/lessmanual/demo"
           style="background: #0C0D0A; color: #F7DF1E; padding: 12px 24px;
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          👉 Umów 15-min demo
        </a>
      </p>

      <p>Pozdrawiam,<br>
      <strong>Bartłomiej Chudzik</strong><br>
      Founder & CTO | LessManual.ai</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

      <p style="font-size: 12px; color: #666;">
        LessManual Sp. z o.o.<br>
        ul. Przykładowa 123, 00-001 Warszawa<br>
        <a href="https://lessmanual.ai/privacy">Polityka prywatności</a> |
        <a href="mailto:hello@lessmanual.ai">Kontakt</a>
      </p>
    </div>
  `,
  attachments: [
    {
      filename: `ROI-${productName}-${date}.pdf`,
      content: pdfBuffer // from Step 2
    }
  ]
}
```

**Step 4: Create Task in ClickUp/Notion**
```javascript
// n8n ClickUp Node
POST /task
{
  list_id: process.env.CLICKUP_LEADS_LIST_ID,
  name: `${lead.company_name || lead.full_name} - ${productName}`,
  description: `
    **New ROI Calculator Lead**

    📧 Email: ${lead.email}
    📞 Phone: ${lead.phone}
    🏢 Company: ${lead.company_name || 'N/A'}

    **Calculator Results:**
    - Product: ${productName}
    - Monthly Savings: ${savingsMonth} PLN
    - Yearly Savings: ${savingsYear} PLN
    - Saved Hours: ${savedHours} h/mies
    ${additionalRevenue ? `- Additional Revenue: ${additionalRevenue} PLN/mies` : ''}

    **Next Steps:**
    - [ ] Call within 24h
    - [ ] Send case study
    - [ ] Book demo

    Source: ROI Calculator (${new Date().toLocaleString('pl-PL')})
  `,
  status: "New Lead",
  priority: 3,
  tags: ["roi-calculator", productName.toLowerCase()],
  custom_fields: {
    "email": lead.email,
    "phone": lead.phone,
    "estimated_value": savingsYear,
    "product_interest": productName
  }
}
```

**Step 5: Send Slack Notification**
```javascript
// n8n Slack Node
POST /chat.postMessage
{
  channel: "#leads",
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🎉 New ROI Calculator Lead!"
      }
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name:*\n${lead.full_name}` },
        { type: "mrkdwn", text: `*Company:*\n${lead.company_name || 'N/A'}` },
        { type: "mrkdwn", text: `*Email:*\n${lead.email}` },
        { type: "mrkdwn", text: `*Phone:*\n${lead.phone}` },
        { type: "mrkdwn", text: `*Product:*\n${productName}` },
        { type: "mrkdwn", text: `*Monthly Savings:*\n${savingsMonth.toLocaleString('pl-PL')} PLN` }
      ]
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "View in ClickUp" },
          url: clickUpTaskUrl
        },
        {
          type: "button",
          text: { type: "plain_text", text: "Send Email" },
          url: `mailto:${lead.email}`
        }
      ]
    }
  ]
}
```

**Environment Variables (.env.local):**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx # for webhook auth

# n8n
N8N_WEBHOOK_URL=https://n8n.lessmanual.ai/webhook/roi-calculator
N8N_WEBHOOK_SECRET=xxx # for authentication

# Resend
RESEND_API_KEY=re_xxx

# ClickUp
CLICKUP_API_TOKEN=pk_xxx
CLICKUP_LEADS_LIST_ID=xxx

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx
```

**Acceptance Criteria:**
- [ ] Webhook triggers on new Supabase lead
- [ ] PDF generates correctly with all data
- [ ] Email sends with PDF attachment
- [ ] ClickUp task created with correct fields
- [ ] Slack notification sent to #leads
- [ ] Error handling for each step
- [ ] Retry logic for failed steps (3 attempts)
- [ ] Logging for debugging
- [ ] Test workflow with dummy data

---

#### 3. **"Pomóż mi wybrać" Quiz Modal**
**Priority:** MEDIUM
**Est. Time:** 2-3 hours
**Dependencies:** None

**Requirements:**

**Quiz Questions (3 total):**

**Q1: Jaka jest Twoja branża?**
```
○ E-commerce / Sklep online
○ Usługi medyczne / Klinika / Gabinet
○ Dealerstwo / Salon samochodowy
○ B2B / SaaS / Konsulting
○ Agencja marketingowa
○ Księgowość / Prawo / HR
○ Produkcja / Logistyka
○ Inna branża
```

**Q2: Jaki jest Twój główny problem?**
```
○ Za dużo powtarzalnych zapytań od klientów (email/chat)
○ Tracę klientów bo nie odbieram po godzinach
○ Zespół spędza godziny na social media
○ Ręczne zarządzanie pipeline sprzedaży
○ Trudno znaleźć informacje w dokumentach
○ Chcę zautomatyzować unikalny proces
```

**Q3: Jak duża jest Twoja firma?**
```
○ Solo / 1-2 osoby
○ Mały biznes (3-10 osób)
○ Średnia firma (11-50 osób)
○ Duża firma (50+ osób)
```

**Recommendation Logic:**
```typescript
interface QuizAnswers {
  industry: string
  problem: string
  companySize: string
}

function recommendProduct(answers: QuizAnswers): ProductId {
  // Rule-based recommendation

  // Problem-first logic
  if (answers.problem === 'powtarzalne_zapytania') {
    return 'chatbot' // ChatBot 24/7
  }

  if (answers.problem === 'nie_odbieram_po_godzinach') {
    return 'voiceAgent' // Voice Agent
  }

  if (answers.problem === 'social_media') {
    return 'contentAgent' // Content Agent
  }

  if (answers.problem === 'pipeline_sprzedazy') {
    return 'salesAutomation' // Sales Automation
  }

  if (answers.problem === 'dokumenty') {
    return 'ragChatbot' // RAG Chatbot
  }

  if (answers.problem === 'unikalny_proces') {
    return 'customSolutions' // Custom Solutions
  }

  // Fallback: Industry-based
  if (answers.industry === 'ecommerce') return 'chatbot'
  if (answers.industry === 'medyczne') return 'voiceAgent'
  if (answers.industry === 'dealerstwo') return 'voiceAgent'
  if (answers.industry === 'b2b') return 'salesAutomation'
  if (answers.industry === 'agencja') return 'contentAgent'
  if (answers.industry === 'ksiegowosc') return 'ragChatbot'
  if (answers.industry === 'produkcja') return 'customSolutions'

  // Default fallback
  return 'chatbot'
}
```

**Modal Component:**
```tsx
// src/components/modals/ProductQuizModal.tsx

interface ProductQuizModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (productId: ProductId) => void
}

export function ProductQuizModal({ isOpen, onClose, onComplete }: ProductQuizModalProps) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({
    industry: '',
    problem: '',
    companySize: ''
  })

  const handleComplete = () => {
    const recommendedProduct = recommendProduct(answers)
    onComplete(recommendedProduct)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-night border-2 border-white/10 rounded-xl p-8 max-w-2xl w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Progress indicator */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i <= step ? 'bg-pear' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Quiz content */}
            {step === 1 && <Question1 ... />}
            {step === 2 && <Question2 ... />}
            {step === 3 && <Question3 ... />}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)}>
                  ← Wstecz
                </button>
              )}

              {step < 3 ? (
                <button onClick={() => setStep(step + 1)}>
                  Dalej →
                </button>
              ) : (
                <button onClick={handleComplete}>
                  Zobacz rekomendację 🎯
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Acceptance Criteria:**
- [ ] Modal opens when "Pomóż mi wybrać" clicked
- [ ] 3 questions display one at a time
- [ ] Progress indicator shows current step
- [ ] Back button works (except on step 1)
- [ ] Forward button validates selection
- [ ] Recommendation logic works correctly
- [ ] Auto-selects product after quiz completion
- [ ] Auto-navigates to Step 2 (questions)
- [ ] Modal closes with ESC key
- [ ] Modal closes when clicking outside
- [ ] Responsive on mobile
- [ ] Accessible (keyboard navigation, ARIA)

---

### MEDIUM PRIORITY (Nice to Have)

#### 4. **Recharts Visualizations**
**Priority:** MEDIUM
**Est. Time:** 3-4 hours
**Dependencies:** None

**Requirements:**

**Chart 1: Before vs After (Bar Chart)**
```typescript
const beforeAfterData = [
  {
    name: 'Przed automatyzacją',
    godziny: totalHoursMonth,
    koszt: totalHoursMonth * hourlyWage
  },
  {
    name: 'Po automatyzacji',
    godziny: totalHoursMonth - savedHoursMonth,
    koszt: (totalHoursMonth - savedHoursMonth) * hourlyWage
  }
]

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={beforeAfterData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#fff1" />
    <XAxis dataKey="name" stroke="#fff9" />
    <YAxis stroke="#fff9" />
    <Tooltip
      contentStyle={{
        background: '#0C0D0A',
        border: '1px solid #fff2',
        borderRadius: '8px'
      }}
    />
    <Bar dataKey="godziny" fill="#F7DF1E" name="Godziny pracy" />
    <Bar dataKey="koszt" fill="#22C55E" name="Koszt (PLN)" />
  </BarChart>
</ResponsiveContainer>
```

**Chart 2: Cumulative Savings (Line Chart)**
```typescript
const cumulativeSavingsData = Array.from({ length: 36 }, (_, month) => ({
  month: month + 1,
  year: Math.floor(month / 12) + 1,
  savings: savingsMonth * (month + 1),
  label: `M${month + 1}`
}))

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={cumulativeSavingsData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#fff1" />
    <XAxis
      dataKey="label"
      stroke="#fff9"
      interval={2} // Show every 3rd month
    />
    <YAxis
      stroke="#fff9"
      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
    />
    <Tooltip
      contentStyle={{
        background: '#0C0D0A',
        border: '1px solid #fff2',
        borderRadius: '8px'
      }}
      formatter={(value: number) => [`${value.toLocaleString('pl-PL')} PLN`, 'Oszczędności']}
    />
    <Line
      type="monotone"
      dataKey="savings"
      stroke="#F7DF1E"
      strokeWidth={3}
      dot={{ fill: '#F7DF1E', r: 4 }}
      activeDot={{ r: 6 }}
    />
    {/* Year markers */}
    <ReferenceLine x={12} stroke="#fff5" strokeDasharray="3 3" label="Rok 1" />
    <ReferenceLine x={24} stroke="#fff5" strokeDasharray="3 3" label="Rok 2" />
  </LineChart>
</ResponsiveContainer>
```

**Installation:**
```bash
npm install recharts
```

**Placement:**
- Below bonus section in Step 3
- Above navigation buttons
- Full width on mobile, 2-column grid on desktop

**Acceptance Criteria:**
- [ ] Both charts render correctly
- [ ] Data updates based on calculator inputs
- [ ] Charts are responsive
- [ ] Tooltips show formatted numbers (Polish locale)
- [ ] Colors match brand (pear, green)
- [ ] Charts animate on mount
- [ ] Loading state while calculating
- [ ] No console errors

---

#### 5. **Hash-based Navigation**
**Priority:** LOW
**Est. Time:** 1 hour
**Dependencies:** None

**Requirements:**

**URL Format:**
```
https://lessmanual.ai/#kalkulator-chatbot
https://lessmanual.ai/#kalkulator-voice-agent
https://lessmanual.ai/#kalkulator-sales-automation
```

**Implementation:**
```typescript
// Read hash on mount
useEffect(() => {
  const hash = window.location.hash.replace('#kalkulator-', '')
  const productMap: Record<string, ProductId> = {
    'chatbot': 'chatbot',
    'voice-agent': 'voiceAgent',
    'content-agent': 'contentAgent',
    'sales-automation': 'salesAutomation',
    'rag-chatbot': 'ragChatbot',
    'custom-solutions': 'customSolutions'
  }

  if (hash && productMap[hash]) {
    setSelectedProduct(productMap[hash])
    setCurrentStep(2) // Skip product selection
  }
}, [])

// Update hash when product selected
useEffect(() => {
  if (selectedProduct && currentStep >= 2) {
    const slugMap: Record<ProductId, string> = {
      chatbot: 'chatbot',
      voiceAgent: 'voice-agent',
      contentAgent: 'content-agent',
      salesAutomation: 'sales-automation',
      ragChatbot: 'rag-chatbot',
      customSolutions: 'custom-solutions'
    }

    window.history.replaceState(null, '', `#kalkulator-${slugMap[selectedProduct]}`)
  }
}, [selectedProduct, currentStep])
```

**Acceptance Criteria:**
- [ ] URL hash updates when product selected
- [ ] Direct links work (skip product selection)
- [ ] Back button navigates properly
- [ ] Hash clears when returning to Step 1
- [ ] Works with browser history

---

#### 6. **URL Preset Auto-fill**
**Priority:** LOW
**Est. Time:** 1 hour
**Dependencies:** None

**Requirements:**

**URL Format:**
```
https://lessmanual.ai/?preset=ecommerce
https://lessmanual.ai/?preset=medical
https://lessmanual.ai/?preset=b2b
```

**Preset Mapping:**
```typescript
const urlPresetMap: Record<string, { product: ProductId, preset: string }> = {
  'ecommerce': { product: 'chatbot', preset: 'ecommerce' },
  'saas': { product: 'chatbot', preset: 'saas' },
  'medical': { product: 'voiceAgent', preset: 'medical' },
  'dealer': { product: 'voiceAgent', preset: 'dealer' },
  'agency': { product: 'contentAgent', preset: 'agency' },
  'b2b': { product: 'salesAutomation', preset: 'b2b' }
}
```

**Implementation:**
```typescript
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  const presetKey = params.get('preset')

  if (presetKey && urlPresetMap[presetKey]) {
    const { product, preset } = urlPresetMap[presetKey]
    setSelectedProduct(product)

    // Auto-fill inputs based on preset
    if (product === 'chatbot') {
      handleChatbotPreset(preset as keyof typeof CHATBOT_PRESETS)
    }
    // ... other products

    setCurrentStep(2)
  }
}, [])
```

**Use Cases:**
- Marketing campaigns: "Sprawdź ROI dla e-commerce → lessmanual.ai/?preset=ecommerce"
- Email links: "Zobacz ile zaoszczędzisz w Twojej klinice → ?preset=medical"
- Social media: "Agencje: oblicz ROI automatyzacji social media → ?preset=agency"

**Acceptance Criteria:**
- [ ] URL params auto-select product
- [ ] Inputs auto-fill with preset values
- [ ] Navigates to Step 2 automatically
- [ ] Invalid presets ignored gracefully
- [ ] Works with hash navigation (#kalkulator-chatbot?preset=ecommerce)

---

### LOW PRIORITY (Future Enhancements)

#### 7. **GTM Analytics Setup**
**Priority:** LOW
**Est. Time:** 30 min
**Dependencies:** None

**Events to Track:**
```typescript
// Product selected
dataLayer.push({
  event: 'roi_product_selected',
  product_name: 'chatbot',
  product_category: 'automation'
})

// Step completed
dataLayer.push({
  event: 'roi_step_completed',
  step_number: 2,
  product_name: 'chatbot'
})

// Results viewed
dataLayer.push({
  event: 'roi_results_viewed',
  product_name: 'chatbot',
  savings_month: 12000,
  savings_year: 144000
})

// Lead captured
dataLayer.push({
  event: 'roi_lead_captured',
  product_name: 'chatbot',
  lead_email: 'jan@example.com',
  savings_month: 12000,
  value: 144000 // For GA4 conversion value
})
```

**Setup Steps:**
1. Create GTM container
2. Add GTM snippet to `<head>` in layout.tsx
3. Create dataLayer push function
4. Create GA4 configuration tag
5. Create event tags for each tracked event
6. Test with GTM Preview mode

---

## TECHNICAL NOTES

### Architecture Decisions

**State Management:**
- React useState (no global state needed)
- Form state: React Hook Form or native useState + Zod validation

**Validation:**
- Zod schemas for type-safe validation
- Real-time validation on blur
- Error messages in Polish

**Error Handling:**
- Try-catch blocks for async operations
- Toast notifications for user feedback (react-hot-toast)
- Sentry for production error tracking (optional)

**Performance:**
- Lazy load Step 4 form (dynamic import)
- Debounce input changes (300ms)
- Optimize Recharts rendering (useMemo for data)

**Security:**
- CORS configuration for n8n webhook
- Rate limiting on Supabase (RLS policies)
- Input sanitization (Zod validation)
- CAPTCHA for spam prevention (optional, hCaptcha)

### Testing Strategy

**Unit Tests:**
- ROI calculation functions
- Recommendation logic (quiz)
- Form validation (Zod schemas)

**Integration Tests:**
- Form submission → Supabase save
- Supabase webhook → n8n trigger
- Email delivery (Resend)

**E2E Tests (Playwright):**
- Complete calculator flow (Step 1 → 4)
- Quiz modal flow
- Preset scenarios
- Direct links (hash navigation)

**Manual Testing Checklist:**
- [ ] All 6 products calculate correctly
- [ ] All presets load correct values
- [ ] Form validates all fields
- [ ] Email delivers with PDF
- [ ] ClickUp task created
- [ ] Slack notification sent
- [ ] Mobile responsive
- [ ] Keyboard navigation
- [ ] Screen reader friendly

---

## DEPLOYMENT

### Environment Setup

**Development:**
```bash
npm run dev
# http://localhost:3000
```

**Staging:**
```bash
git push origin staging
# Auto-deploy via Vercel
# https://lessmanual-staging.vercel.app
```

**Production:**
```bash
git push origin main
# Auto-deploy via Vercel
# https://lessmanual.ai
```

### Monitoring

**Analytics:**
- Google Analytics 4 (via GTM)
- Vercel Analytics (built-in)
- Custom events in PostHog (optional)

**Error Tracking:**
- Sentry (optional)
- Supabase logs
- n8n execution logs

**Performance:**
- Vercel Speed Insights
- Lighthouse CI (GitHub Actions)

---

## SUCCESS METRICS

### Phase 2 Goals

**Conversion Rate:**
- Target: 15-20% visitors → lead capture
- Metric: (Step 4 submissions / Step 1 starts) * 100

**Email Deliverability:**
- Target: >95% delivery rate
- Metric: Resend dashboard

**Response Time:**
- Target: <1h first response to new leads
- Metric: ClickUp automation

**Lead Quality:**
- Target: >30% leads → qualified meetings
- Metric: ClickUp pipeline conversion

**Calculator Accuracy:**
- Target: <5% calculation error reports
- Metric: Support tickets

---

## ROLLBACK PLAN

If critical issues arise after deployment:

1. **Immediate:** Revert to previous Vercel deployment (1-click rollback)
2. **Database:** Restore Supabase backup (point-in-time recovery)
3. **n8n:** Disable webhook trigger (pause workflow)
4. **Communication:** Email all pending leads manually

---

## TIMELINE

**Week 1 (Nov 1-3):**
- [ ] Step 4 form implementation (Day 1-2)
- [ ] Supabase table + RLS policies (Day 2)
- [ ] n8n webhook setup (Day 3)

**Week 2 (Nov 4-8):**
- [ ] PDF generation template (Day 4-5)
- [ ] Email automation (Resend) (Day 5)
- [ ] ClickUp + Slack integration (Day 6)
- [ ] Quiz modal implementation (Day 7-8)

**Week 3 (Nov 11-15):**
- [ ] Recharts visualizations (Day 11-12)
- [ ] Hash navigation + URL presets (Day 13)
- [ ] GTM setup (Day 14)
- [ ] Testing + bug fixes (Day 15)

**Week 4 (Nov 18-22):**
- [ ] Production deployment
- [ ] Monitoring setup
- [ ] Documentation
- [ ] Team training

---

## OPEN QUESTIONS

1. **Resend Account:** Do we have Resend API key? If not, need to create account.
2. **n8n Instance:** Is n8n already deployed? URL? Authentication method?
3. **ClickUp Setup:** Which list/space for leads? Custom fields configured?
4. **PDF Service:** Self-hosted Puppeteer or external service (PDFShift, DocRaptor)?
5. **CAPTCHA:** Do we want spam protection? (hCaptcha recommended, free tier)
6. **Email Frequency:** Any limits on emails/day? (Resend free = 100/day)
7. **CRM Workflow:** What happens after lead capture? Who follows up?

---

**END OF PRD**
