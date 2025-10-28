# PROJEKT: Kalkulator ROI dla LessManual.ai

## CONTEXT

Budujesz **single-page ROI calculator** dla lessmanual.ai (firma automatyzacji biznesowej).

**Tech Stack:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Recharts (wizualizacje)
- Supabase (database dla lead capture)
- n8n webhook (lead → Notion CRM)

**Brand Identity:**
- Colors: `#0C0D0A` (dark), `#F7DF1E` (yellow), `#22C55E` (green)
- Font: Inter
- Design: Bento Grid, mobile-first (80% traffic = mobile)

---

## USER FLOW (4 Steps)

### **Step 1: Product Selection**

User wybiera 1 z 6 produktów:

```
┌────────────────────────────────────────────────┐
│ Co chcesz zautomatyzować?                      │
│ Wybierz produkt najbliższy Twoim potrzebom    │
│                                                 │
│ 💬 ChatBot 24/7                                │
│ Obsługa klienta                                │
│ Śr. oszczędność: 12,000 PLN/mies              │
│ [E-commerce] [SaaS] [Usługi]                   │
│                                                 │
│ 📞 Voice Agent                                 │
│ Recepcja + booking                             │
│ Śr. oszczędność: 10,000 PLN/mies              │
│ [Klinika] [Dealer] [Salon]                    │
│                                                 │
│ (+ 4 more products...)                         │
│                                                 │
│ ❓ [Nie wiesz? Pomóż mi wybrać]                │
└────────────────────────────────────────────────┘
```

**Products array:**
```typescript
const products = [
  {
    id: 'chatbot',
    name: 'ChatBot 24/7',
    description: 'Obsługa klienta',
    icon: '💬',
    avgSavings: 12000,
    industries: ['E-commerce', 'SaaS', 'Usługi']
  },
  {
    id: 'voice-agent',
    name: 'Voice Agent',
    description: 'Recepcja + booking',
    icon: '📞',
    avgSavings: 10000,
    industries: ['Klinika', 'Dealer', 'Salon']
  },
  {
    id: 'content-agent',
    name: 'Content Agent',
    description: 'Social Media',
    icon: '✍️',
    avgSavings: 5000,
    industries: ['Agencja', 'E-commerce', 'Personal brand']
  },
  {
    id: 'sales-automation',
    name: 'Sales Automation',
    description: 'Pipeline + CRM',
    icon: '📊',
    avgSavings: 8000,
    industries: ['B2B', 'SaaS', 'Konsulting']
  },
  {
    id: 'rag-chatbot',
    name: 'RAG Chatbot',
    description: 'Baza wiedzy',
    icon: '🧠',
    avgSavings: 12000,
    industries: ['Księgowość', 'Prawo', 'HR']
  },
  {
    id: 'custom',
    name: 'Custom Solutions',
    description: 'Twój proces',
    icon: '⚙️',
    avgSavings: 18000,
    industries: ['Produkcja', 'Logistyka', 'Finanse']
  }
];
```

---

### **Step 2: Input Questions (product-specific)**

**Wymagania:**
- 4-6 pytań per produkt
- Sliders + number inputs
- 3 preset scenarios (quick-fill buttons)
- Real-time validation
- Mobile-friendly (large touch targets)

---

#### **ChatBot 24/7 Questions:**

```typescript
const chatbotQuestions = [
  {
    id: 'dailyInquiries',
    label: 'Ile zapytań klientów dziennie?',
    type: 'slider',
    min: 50,
    max: 500,
    default: 120,
    step: 10,
    unit: 'zapytań/dzień'
  },
  {
    id: 'avgMinutesPerInquiry',
    label: 'Ile minut zajmuje odpowiedź?',
    type: 'slider',
    min: 2,
    max: 15,
    default: 5,
    step: 1,
    unit: 'minut'
  },
  {
    id: 'hourlyWage',
    label: 'Stawka godzinowa pracownika?',
    type: 'number',
    default: 50,
    min: 20,
    max: 200,
    unit: 'PLN/h'
  },
  {
    id: 'automationRate',
    label: 'Jaki % można zautomatyzować?',
    type: 'slider',
    min: 50,
    max: 90,
    default: 70,
    step: 5,
    unit: '%'
  }
];

const chatbotPresets = [
  {
    name: 'E-commerce (duży sklep)',
    icon: '🛒',
    values: { dailyInquiries: 200, avgMinutesPerInquiry: 5, hourlyWage: 50, automationRate: 70 }
  },
  {
    name: 'SaaS/Tech Support',
    icon: '💻',
    values: { dailyInquiries: 150, avgMinutesPerInquiry: 8, hourlyWage: 80, automationRate: 60 }
  },
  {
    name: 'Usługi lokalne',
    icon: '🏪',
    values: { dailyInquiries: 80, avgMinutesPerInquiry: 4, hourlyWage: 40, automationRate: 75 }
  }
];
```

**Calculation function:**
```typescript
function calculateChatbotROI(inputs: ChatbotInputs) {
  const workingDaysMonth = 22;
  const totalInquiriesMonth = inputs.dailyInquiries * workingDaysMonth;
  const totalMinutesMonth = totalInquiriesMonth * inputs.avgMinutesPerInquiry;
  const totalHoursMonth = totalMinutesMonth / 60;

  const savedHoursMonth = totalHoursMonth * (inputs.automationRate / 100);
  const savingsMonth = Math.round(savedHoursMonth * inputs.hourlyWage);
  const savingsYear = savingsMonth * 12;

  const automatedInquiries = Math.round(totalInquiriesMonth * (inputs.automationRate / 100));

  return {
    savingsMonth,
    savingsYear,
    savedHoursMonth: Math.round(savedHoursMonth),
    automatedInquiries,
    // NO ROI%, NO payback period
  };
}
```

---

#### **Voice Agent Questions:**

```typescript
const voiceAgentQuestions = [
  {
    id: 'dailyCalls',
    label: 'Ile połączeń przychodzących dziennie?',
    type: 'slider',
    min: 20,
    max: 200,
    default: 40,
    step: 5,
    unit: 'połączeń/dzień'
  },
  {
    id: 'avgCallMinutes',
    label: 'Ile minut trwa średnie połączenie?',
    type: 'slider',
    min: 3,
    max: 20,
    default: 8,
    step: 1,
    unit: 'minut'
  },
  {
    id: 'hourlyWage',
    label: 'Stawka godzinowa recepcjonistki?',
    type: 'number',
    default: 60,
    min: 30,
    max: 150,
    unit: 'PLN/h'
  },
  {
    id: 'additionalBookingsPercent',
    label: 'Ile dodatkowych wizyt dzięki 24/7?',
    type: 'slider',
    min: 5,
    max: 30,
    default: 15,
    step: 5,
    unit: '%',
    tooltip: 'Szacujemy że 30% połączeń przychodzi po godzinach pracy'
  },
  {
    id: 'avgVisitValue',
    label: 'Wartość średniej wizyty/transakcji?',
    type: 'number',
    default: 500,
    min: 100,
    max: 5000,
    unit: 'PLN'
  }
];

const voiceAgentPresets = [
  {
    name: 'Klinika stomatologiczna',
    icon: '🦷',
    values: { dailyCalls: 50, avgCallMinutes: 8, hourlyWage: 60, additionalBookingsPercent: 15, avgVisitValue: 500 }
  },
  {
    name: 'Dealer samochodowy',
    icon: '🚗',
    values: { dailyCalls: 30, avgCallMinutes: 10, hourlyWage: 70, additionalBookingsPercent: 20, avgVisitValue: 2000 }
  },
  {
    name: 'Salon kosmetyczny',
    icon: '💅',
    values: { dailyCalls: 40, avgCallMinutes: 6, hourlyWage: 50, additionalBookingsPercent: 12, avgVisitValue: 300 }
  }
];
```

**Calculation function:**
```typescript
function calculateVoiceAgentROI(inputs: VoiceAgentInputs) {
  const workingDaysMonth = 22;
  const totalCallsMonth = inputs.dailyCalls * workingDaysMonth;
  const savedHoursMonth = Math.round((totalCallsMonth * inputs.avgCallMinutes) / 60);
  const savingsMonth = Math.round(savedHoursMonth * inputs.hourlyWage);

  // BONUS: Dodatkowe wizyty (revenue opportunity)
  const missedCallsBefore = inputs.dailyCalls * 0.30; // 30% missed after hours
  const additionalBookingsMonth = Math.round(
    missedCallsBefore * workingDaysMonth * (inputs.additionalBookingsPercent / 100)
  );
  const additionalRevenueMonth = Math.round(additionalBookingsMonth * inputs.avgVisitValue);

  const totalSavingsMonth = savingsMonth; // TYLKO oszczędności w głównej liczbie
  const savingsYear = totalSavingsMonth * 12;

  return {
    savingsMonth: totalSavingsMonth,
    savingsYear,
    savedHoursMonth,
    // BONUS METRICS (pokazujemy oddzielnie):
    additionalBookingsMonth,
    additionalRevenueMonth,
  };
}
```

---

#### **Content Agent Questions:**

```typescript
const contentAgentQuestions = [
  {
    id: 'postsPerWeek',
    label: 'Ile postów tygodniowo publikujesz?',
    type: 'slider',
    min: 3,
    max: 20,
    default: 7,
    step: 1,
    unit: 'postów/tydzień'
  },
  {
    id: 'hoursPerPost',
    label: 'Ile godzin zajmuje 1 post?',
    type: 'slider',
    min: 1,
    max: 4,
    default: 2,
    step: 0.5,
    unit: 'godzin'
  },
  {
    id: 'hourlyWage',
    label: 'Stawka content creatora?',
    type: 'number',
    default: 80,
    min: 40,
    max: 200,
    unit: 'PLN/h'
  },
  {
    id: 'platformCount',
    label: 'Ile platform obsługujesz?',
    type: 'checkboxes',
    options: ['LinkedIn', 'Facebook', 'Instagram', 'TikTok', 'YouTube'],
    default: ['LinkedIn', 'Facebook', 'Instagram', 'TikTok']
  }
];

const contentAgentPresets = [
  {
    name: 'Agencja marketingowa',
    icon: '🎨',
    values: { postsPerWeek: 14, hoursPerPost: 2, hourlyWage: 100, platformCount: 4 }
  },
  {
    name: 'E-commerce (own brand)',
    icon: '🛍️',
    values: { postsPerWeek: 10, hoursPerPost: 1.5, hourlyWage: 70, platformCount: 3 }
  },
  {
    name: 'Personal brand',
    icon: '👤',
    values: { postsPerWeek: 5, hoursPerPost: 3, hourlyWage: 150, platformCount: 2 }
  }
];
```

**Calculation:**
```typescript
function calculateContentAgentROI(inputs: ContentAgentInputs) {
  const postsPerMonth = inputs.postsPerWeek * 4.33;
  const totalHoursMonth = Math.round(postsPerMonth * inputs.hoursPerPost);
  const savingsMonth = Math.round(totalHoursMonth * inputs.hourlyWage);
  const savingsYear = savingsMonth * 12;

  const manualPostsMonth = Math.round(postsPerMonth);
  const automatedPostsMonth = Math.round(postsPerMonth * inputs.platformCount);

  return {
    savingsMonth,
    savingsYear,
    savedHoursMonth: totalHoursMonth,
    // BONUS:
    manualPostsMonth,
    automatedPostsMonth,
    leverageRatio: inputs.platformCount
  };
}
```

---

#### **Sales Automation Questions:**

```typescript
const salesAutomationQuestions = [
  {
    id: 'leadsPerMonth',
    label: 'Ile leadów miesięcznie generujesz?',
    type: 'slider',
    min: 50,
    max: 500,
    default: 150,
    step: 10,
    unit: 'leadów/mies'
  },
  {
    id: 'minutesPerLead',
    label: 'Ile czasu zajmuje obsługa 1 leada?',
    type: 'slider',
    min: 15,
    max: 60,
    default: 30,
    step: 5,
    unit: 'minut',
    tooltip: 'Follow-up emails, CRM update, research'
  },
  {
    id: 'automationRate',
    label: 'Jaki % można zautomatyzować?',
    type: 'slider',
    min: 50,
    max: 80,
    default: 70,
    step: 5,
    unit: '%'
  },
  {
    id: 'hourlyWage',
    label: 'Stawka handlowca?',
    type: 'number',
    default: 100,
    min: 50,
    max: 250,
    unit: 'PLN/h'
  },
  {
    id: 'avgDealValue',
    label: 'Wartość średniego deala?',
    type: 'number',
    default: 5000,
    min: 500,
    max: 50000,
    unit: 'PLN'
  },
  {
    id: 'conversionImprovement',
    label: 'Wzrost conversion dzięki lepszemu follow-up?',
    type: 'slider',
    min: 3,
    max: 10,
    default: 5,
    step: 1,
    unit: '%',
    tooltip: 'Nasi klienci widzą średnio +5% conversion'
  }
];

const salesAutomationPresets = [
  {
    name: 'B2B SaaS',
    icon: '💼',
    values: { leadsPerMonth: 150, minutesPerLead: 30, automationRate: 70, hourlyWage: 120, avgDealValue: 8000, conversionImprovement: 5 }
  },
  {
    name: 'E-commerce (high-ticket)',
    icon: '🛒',
    values: { leadsPerMonth: 300, minutesPerLead: 20, automationRate: 75, hourlyWage: 80, avgDealValue: 3000, conversionImprovement: 4 }
  },
  {
    name: 'Usługi B2B',
    icon: '🤝',
    values: { leadsPerMonth: 100, minutesPerLead: 45, automationRate: 65, hourlyWage: 150, avgDealValue: 12000, conversionImprovement: 3 }
  }
];
```

**Calculation:**
```typescript
function calculateSalesAutomationROI(inputs: SalesAutomationInputs) {
  const totalMinutesMonth = inputs.leadsPerMonth * inputs.minutesPerLead;
  const savedHoursMonth = Math.round((totalMinutesMonth * (inputs.automationRate / 100)) / 60);
  const savingsMonth = Math.round(savedHoursMonth * inputs.hourlyWage);

  // BONUS: Dodatkowe deale (revenue opportunity)
  const additionalDealsMonth = inputs.leadsPerMonth * (inputs.conversionImprovement / 100);
  const additionalRevenueMonth = Math.round(additionalDealsMonth * inputs.avgDealValue);

  const totalSavingsMonth = savingsMonth; // TYLKO oszczędności w głównej liczbie
  const savingsYear = totalSavingsMonth * 12;

  return {
    savingsMonth: totalSavingsMonth,
    savingsYear,
    savedHoursMonth,
    // BONUS:
    additionalDealsMonth: Math.round(additionalDealsMonth),
    additionalRevenueMonth,
  };
}
```

---

#### **RAG Chatbot Questions:**

```typescript
const ragChatbotQuestions = [
  {
    id: 'documentsCount',
    label: 'Ile dokumentów w bazie wiedzy?',
    type: 'slider',
    min: 50,
    max: 5000,
    default: 500,
    step: 50,
    unit: 'dokumentów'
  },
  {
    id: 'dailyQueries',
    label: 'Ile zapytań o dokumenty dziennie?',
    type: 'slider',
    min: 20,
    max: 200,
    default: 40,
    step: 5,
    unit: 'zapytań/dzień'
  },
  {
    id: 'avgSearchMinutes',
    label: 'Ile minut zajmuje wyszukanie odpowiedzi?',
    type: 'slider',
    min: 5,
    max: 30,
    default: 10,
    step: 1,
    unit: 'minut'
  },
  {
    id: 'hourlyWage',
    label: 'Stawka specjalisty?',
    type: 'number',
    default: 100,
    min: 50,
    max: 250,
    unit: 'PLN/h',
    tooltip: 'Księgowy/prawnik/HR specialist'
  }
];

const ragChatbotPresets = [
  {
    name: 'Biuro rachunkowe',
    icon: '📊',
    values: { documentsCount: 1000, dailyQueries: 100, avgSearchMinutes: 12, hourlyWage: 100 }
  },
  {
    name: 'Kancelaria prawna',
    icon: '⚖️',
    values: { documentsCount: 2000, dailyQueries: 60, avgSearchMinutes: 15, hourlyWage: 200 }
  },
  {
    name: 'Dział HR',
    icon: '👥',
    values: { documentsCount: 500, dailyQueries: 80, avgSearchMinutes: 8, hourlyWage: 80 }
  }
];
```

**Calculation:**
```typescript
function calculateRAGChatbotROI(inputs: RAGChatbotInputs) {
  const workingDaysMonth = 22;
  const totalQueriesMonth = inputs.dailyQueries * workingDaysMonth;
  const savedHoursMonth = Math.round((totalQueriesMonth * inputs.avgSearchMinutes) / 60);
  const savingsMonth = Math.round(savedHoursMonth * inputs.hourlyWage);
  const savingsYear = savingsMonth * 12;

  return {
    savingsMonth,
    savingsYear,
    savedHoursMonth,
    queriesAnsweredMonth: totalQueriesMonth
  };
}
```

---

#### **Custom Solutions Questions:**

```typescript
const customSolutionsQuestions = [
  {
    id: 'hoursPerMonth',
    label: 'Ile godzin miesięcznie zajmuje proces?',
    type: 'slider',
    min: 10,
    max: 200,
    default: 60,
    step: 5,
    unit: 'godzin/mies'
  },
  {
    id: 'teamSize',
    label: 'Ile osób zaangażowanych w proces?',
    type: 'slider',
    min: 1,
    max: 10,
    default: 3,
    step: 1,
    unit: 'osób'
  },
  {
    id: 'avgHourlyWage',
    label: 'Średnia stawka zespołu?',
    type: 'number',
    default: 80,
    min: 40,
    max: 200,
    unit: 'PLN/h'
  },
  {
    id: 'revenueImpact',
    label: 'Czy proces wpływa na przychody?',
    type: 'toggle',
    default: false
  },
  {
    id: 'revenueIncreasePercent',
    label: 'O ile % może wzrosnąć przychód?',
    type: 'slider',
    min: 10,
    max: 50,
    default: 20,
    step: 5,
    unit: '%',
    dependsOn: 'revenueImpact',
    showIf: true
  },
  {
    id: 'currentMonthlyRevenue',
    label: 'Obecne przychody miesięczne z procesu?',
    type: 'number',
    default: 50000,
    min: 5000,
    max: 500000,
    unit: 'PLN',
    dependsOn: 'revenueImpact',
    showIf: true
  }
];

const customSolutionsPresets = [
  {
    name: 'Raportowanie (e-commerce)',
    icon: '📈',
    values: { hoursPerMonth: 40, teamSize: 2, avgHourlyWage: 80, revenueImpact: true, revenueIncreasePercent: 15, currentMonthlyRevenue: 100000 }
  },
  {
    name: 'Onboarding klienta (SaaS)',
    icon: '🚀',
    values: { hoursPerMonth: 60, teamSize: 3, avgHourlyWage: 100, revenueImpact: true, revenueIncreasePercent: 20, currentMonthlyRevenue: 80000 }
  },
  {
    name: 'Data entry (logistics)',
    icon: '📋',
    values: { hoursPerMonth: 120, teamSize: 2, avgHourlyWage: 50, revenueImpact: false }
  }
];
```

**Calculation:**
```typescript
function calculateCustomSolutionsROI(inputs: CustomSolutionsInputs) {
  const totalHoursMonth = inputs.hoursPerMonth * inputs.teamSize;
  const savingsMonth = Math.round(totalHoursMonth * inputs.avgHourlyWage);

  // BONUS: Dodatkowy przychód (jeśli applicable)
  const additionalRevenueMonth = inputs.revenueImpact
    ? Math.round(inputs.currentMonthlyRevenue * (inputs.revenueIncreasePercent / 100))
    : 0;

  const totalSavingsMonth = savingsMonth; // TYLKO oszczędności w głównej liczbie
  const savingsYear = totalSavingsMonth * 12;

  return {
    savingsMonth: totalSavingsMonth,
    savingsYear,
    savedHoursMonth: totalHoursMonth,
    // BONUS (jeśli applicable):
    additionalRevenueMonth,
  };
}
```

---

### **Step 3: Results Display**

**Layout (Bento Grid):**

```tsx
<section className="results">
  <h2>🎉 Twoje oszczędności</h2>
  <p className="subtitle">
    Potencjalny ROI automatyzacji dla Twojej firmy
  </p>

  {/* MAIN METRIC - BIG NUMBER */}
  <div className="metric-hero">
    <span className="label">Oszczędności miesięczne</span>
    <span className="value" style={{ color: '#F7DF1E' }}>
      {savingsMonth.toLocaleString('pl-PL')} PLN
    </span>
  </div>

  {/* CORE METRICS GRID */}
  <div className="metrics-grid">
    <div className="metric-card">
      <span className="label">Oszczędności roczne</span>
      <span className="value">{savingsYear.toLocaleString('pl-PL')} PLN</span>
    </div>

    <div className="metric-card">
      <span className="label">Zaoszczędzone godziny</span>
      <span className="value">{savedHoursMonth} h/mies</span>
    </div>

    {/* PRODUCT-SPECIFIC METRIC */}
    {productId === 'chatbot' && (
      <div className="metric-card">
        <span className="label">Zapytań automatycznie</span>
        <span className="value">{automatedInquiries}/mies</span>
      </div>
    )}

    {productId === 'voice-agent' && (
      <div className="metric-card">
        <span className="label">Połączeń obsłużonych</span>
        <span className="value">{totalCallsMonth}/mies</span>
      </div>
    )}

    {productId === 'content-agent' && (
      <div className="metric-card">
        <span className="label">Postów wygenerowanych</span>
        <span className="value">{automatedPostsMonth}/mies</span>
      </div>
    )}

    {productId === 'rag-chatbot' && (
      <div className="metric-card">
        <span className="label">Zapytań obsłużonych</span>
        <span className="value">{queriesAnsweredMonth}/mies</span>
      </div>
    )}
  </div>

  {/* BONUS METRICS (tylko dla Voice Agent i Sales Automation) */}
  {(productId === 'voice-agent' || productId === 'sales-automation') && (
    <div className="bonus-section">
      <h3>💰 Dodatkowy potencjał przychodowy</h3>
      <p className="disclaimer">
        Poniższe dane to szacunkowy potencjał na podstawie doświadczeń naszych klientów
      </p>

      <div className="bonus-grid">
        {productId === 'voice-agent' && (
          <>
            <div className="bonus-card">
              <span className="label">Dodatkowe wizyty umówione</span>
              <span className="value">{additionalBookingsMonth}/mies</span>
            </div>
            <div className="bonus-card">
              <span className="label">Potencjalny zysk z wizyt</span>
              <span className="value" style={{ color: '#22C55E' }}>
                +{additionalRevenueMonth.toLocaleString('pl-PL')} PLN/mies
              </span>
            </div>
          </>
        )}

        {productId === 'sales-automation' && (
          <>
            <div className="bonus-card">
              <span className="label">Dodatkowe deale zamknięte</span>
              <span className="value">{additionalDealsMonth}/mies</span>
            </div>
            <div className="bonus-card">
              <span className="label">Potencjalny zysk z dealów</span>
              <span className="value" style={{ color: '#22C55E' }}>
                +{additionalRevenueMonth.toLocaleString('pl-PL')} PLN/mies
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )}

  {/* CHARTS */}
  <div className="charts-section">
    {/* Bar Chart: Before vs After */}
    <div className="chart-container">
      <h4>Porównanie: Przed vs Po automatyzacji</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={beforeAfterData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#F7DF1E" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Line Chart: Cumulative savings Year 1-3 */}
    <div className="chart-container">
      <h4>Skumulowane oszczędności (3 lata)</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cumulativeSavingsData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="savings" stroke="#22C55E" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* CTA */}
  <div className="cta-section">
    <button className="btn-primary" onClick={handleLeadCapture}>
      📄 Wyślij szczegółowy raport na email
    </button>
    <button className="btn-secondary" onClick={handleChangeProduct}>
      ← Zmień produkt
    </button>
  </div>
</section>
```

**Chart Data Functions:**

```typescript
// Before vs After comparison
function getBeforeAfterData(results: ROIResults) {
  return [
    {
      name: 'Przed automatyzacją',
      value: results.savedHoursMonth * results.hourlyWage
    },
    {
      name: 'Po automatyzacji',
      value: 0 // automated, no cost
    },
    {
      name: 'Oszczędność',
      value: results.savingsMonth
    }
  ];
}

// Cumulative savings over 3 years
function getCumulativeSavingsData(savingsMonth: number) {
  const data = [];
  let cumulative = 0;

  for (let month = 1; month <= 36; month++) {
    cumulative += savingsMonth;
    data.push({
      month: `M${month}`,
      savings: cumulative
    });
  }

  return data;
}
```

---

### **Step 4: Lead Capture**

```tsx
<section className="lead-capture">
  <h2>📄 Pobierz szczegółowy raport PDF</h2>
  <p>Wyślemy na email pełny breakdown oszczędności + porównanie przed/po</p>

  <form onSubmit={handleSubmit}>
    <input
      type="email"
      placeholder="Email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="text"
      placeholder="Imię (opcjonalnie)"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
      type="tel"
      placeholder="Telefon (opcjonalnie)"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />

    <label className="checkbox">
      <input type="checkbox" required checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} />
      <span>
        Zgadzam się na przetwarzanie danych osobowych zgodnie z <a href="/polityka-prywatnosci">polityką prywatności</a> (RODO)
      </span>
    </label>

    <button type="submit" className="btn-primary">
      📩 Wyślij raport + umów konsultację
    </button>
  </form>

  <p className="disclaimer">
    🔒 Twoje dane są bezpieczne. Nie spamujemy.
  </p>
</section>
```

**Submit Handler:**

```typescript
async function handleSubmit(e: FormEvent) {
  e.preventDefault();

  // 1. Zapisz do Supabase
  const { data, error } = await supabase
    .from('calculator_leads')
    .insert({
      email,
      name: name || null,
      phone: phone || null,
      product_id: productId,
      savings_month: results.savingsMonth,
      savings_year: results.savingsYear,
      input_data: JSON.stringify(inputValues),
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error('Supabase error:', error);
    alert('Błąd zapisu. Spróbuj ponownie.');
    return;
  }

  // 2. Webhook do n8n → Notion
  await fetch('https://your-n8n-instance.com/webhook/calculator-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      name: name || '',
      phone: phone || '',
      product: products.find(p => p.id === productId)?.name,
      savings_month: results.savingsMonth,
      savings_year: results.savingsYear,
      source: 'ROI Calculator'
    })
  });

  // 3. Generate PDF
  const pdfBlob = await generatePDFReport(results, inputValues);

  // 4. Download PDF (browser)
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LessManual_ROI_Report_${productId}.pdf`;
  a.click();

  // 5. Email z n8n (backend sends)
  // n8n workflow: webhook → Generate PDF → Send email with attachment + Cal.com link

  // 6. Thank you message
  setStep('thank-you');
}
```

---

## **SUPABASE SCHEMA**

```sql
CREATE TABLE calculator_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  product_id TEXT NOT NULL, -- 'chatbot', 'voice-agent', etc.
  savings_month INTEGER NOT NULL,
  savings_year INTEGER NOT NULL,
  input_data JSONB, -- wszystkie inputy usera
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_calculator_leads_email ON calculator_leads(email);
CREATE INDEX idx_calculator_leads_product ON calculator_leads(product_id);
CREATE INDEX idx_calculator_leads_created ON calculator_leads(created_at DESC);
```

---

## **N8N WEBHOOK INTEGRATION**

**Endpoint:** `POST /webhook/calculator-lead`

**Payload:**
```json
{
  "email": "jan@example.com",
  "name": "Jan Kowalski",
  "phone": "+48123456789",
  "product": "ChatBot 24/7",
  "savings_month": 14667,
  "savings_year": 176000,
  "source": "ROI Calculator"
}
```

**n8n Workflow:**
1. Webhook receive
2. Append to Notion database "LessManual Leads PL" (lub "International" jeśli .com)
3. Generate PDF report (using template)
4. Send email:
   - Subject: "Twój raport ROI - ChatBot 24/7 | LessManual.ai"
   - Attachment: PDF
   - Body: Podziękowanie + link Cal.com booking
5. Slack notification do Bartka (hot lead!)

---

## **PDF GENERATION**

**Using jsPDF + jsPDF-AutoTable:**

```typescript
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function generatePDFReport(results: ROIResults, inputs: any) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(24);
  doc.text('Raport ROI - LessManual.ai', 20, 20);

  doc.setFontSize(14);
  doc.text(`Produkt: ${products.find(p => p.id === productId)?.name}`, 20, 35);
  doc.text(`Data: ${new Date().toLocaleDateString('pl-PL')}`, 20, 45);

  // Main metrics
  doc.setFontSize(18);
  doc.text('Twoje oszczędności:', 20, 60);

  doc.setFontSize(14);
  doc.text(`Miesięcznie: ${results.savingsMonth.toLocaleString('pl-PL')} PLN`, 20, 75);
  doc.text(`Rocznie: ${results.savingsYear.toLocaleString('pl-PL')} PLN`, 20, 85);
  doc.text(`Zaoszczędzone godziny: ${results.savedHoursMonth} h/mies`, 20, 95);

  // Input summary table
  doc.autoTable({
    startY: 110,
    head: [['Parametr', 'Wartość']],
    body: Object.entries(inputs).map(([key, value]) => [
      formatLabel(key),
      formatValue(value)
    ])
  });

  // Chart (base64 image from Recharts canvas)
  // doc.addImage(chartImageBase64, 'PNG', 20, 180, 170, 100);

  // Footer
  doc.setFontSize(10);
  doc.text('Chcesz wdrożyć automatyzację?', 20, 280);
  doc.text('Zarezerwuj konsultację: https://cal.com/lessmanual', 20, 287);

  return doc.output('blob');
}
```

---

## **MOBILE RESPONSIVENESS**

**Key breakpoints:**

```css
/* Mobile-first */
.calculator-container {
  padding: 1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .calculator-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .metrics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Touch targets (mobile):**
- Slider handles: min 44px × 44px
- Buttons: min 48px height
- Input fields: min 56px height

---

## **PRIORITY FEATURES**

**Week 1 (MVP):**
- ✅ Step 1-4 flow (1 produkt: ChatBot)
- ✅ Input sliders + validation
- ✅ Results display (core metrics only)
- ✅ Lead capture → Supabase
- ✅ n8n webhook → Notion
- ✅ Mobile responsive

**Week 2 (Full):**
- ✅ Remaining 5 produktów
- ✅ 3 preset scenarios per produkt
- ✅ Bonus metrics (Voice Agent / Sales Automation)
- ✅ Recharts visualizations
- ✅ PDF generation
- ✅ Email automation

**Week 3 (Polish):**
- ✅ Animations (counter, transitions)
- ✅ A/B testing setup (GTM events)
- ✅ SEO optimization
- ✅ Performance optimization (<3s load)

---

## **IMPORTANT CONSTRAINTS**

**❌ DO NOT INCLUDE:**
- "Zwrot inwestycji" (X miesięcy payback) - removed per CEO decision
- "ROI %" (+1105%) - removed per CEO decision
- Total cost Year 1 - pricing transparency issue
- Any explicit pricing information

**✅ FOCUS ON:**
- Monthly savings (BIG NUMBER)
- Yearly savings
- Hours saved (tangible)
- Product-specific metrics (queries, posts, calls, etc.)
- BONUS metrics (revenue opportunity) - tylko Voice Agent i Sales Automation, z disclaimerem

**✅ VALUE MESSAGING:**
- "Oszczędności" not "koszt"
- "Potencjał" not "gwarancja" (dla bonus metrics)
- "Nasi klienci widzą" (social proof) not "otrzymasz"

---

## **FINAL DELIVERABLES**

1. **Homepage Section:** `/#kalkulator` (embedded single-page calculator)
2. **Supabase Table:** `calculator_leads` (with RLS policies)
3. **n8n Webhook:** Lead → Notion integration
4. **PDF Template:** Branded report generator
5. **Analytics:** GTM events (step completion, lead capture)
6. **Documentation:** README with setup instructions

---

**START IMPLEMENTATION. PRIORITIZE MOBILE-FIRST. USE TYPESCRIPT. FOLLOW BRAND GUIDELINES.**
