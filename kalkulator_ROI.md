# Kalkulator ROI - Ustalenia Implementacji

## ✅ DECYZJA FINALNA: Single-Page Calculator na Homepage

**Lokalizacja:** Homepage sekcja #kalkulator (między "Jak to działa" a "O nas")

**Dlaczego NIE osobne podstrony:**
- ❌ Podstrony = więcej kliknięć = wyższy bounce rate
- ❌ User nie wie którego produktu potrzebuje = opuszcza stronę
- ❌ Split traffic na 6 URLs = trudniejsze analytics
- ✅ Single page = zero friction (1 klik z email CTA do kalkulatora)
- ✅ Pre-selection możliwa (smart links per branża)
- ✅ Lepsze SEO (all content na homepage)

---

## 📐 Struktura Kalkulatora (4 kroki)

### Krok 1: Wybór Produktu
**Status:** ✅ DONE

**Układ:** Bento Grid (2x3 na desktop, 1 kolumna mobile)

**6 produktów:**
1. 💬 **ChatBot 24/7** - Śr. oszczędność: 12,000 PLN/mies
2. 📞 **Agent Głosowy** - Śr. oszczędność: 10,000 PLN/mies
3. ✍️ **Tworzenie Treści AI** - Śr. oszczędność: 5,000 PLN/mies
4. 📊 **Automatyzacja Sprzedaży** - Śr. oszczędność: 8,000 PLN/mies
5. 🧠 **Asystent Wiedzy** - Śr. oszczędność: 12,000 PLN/mies
6. ⚙️ **Dedykowane Rozwiązania** - Śr. oszczędność: 18,000 PLN/mies

**Features:**
- Hover effects (lift + pear glow)
- Tags dla branż (E-commerce, SaaS, Klinika, etc.)
- "❓ Nie wiesz? Pomóż mi wybrać" button (quiz - TODO)

---

### Krok 2: Pytania (4-6 per produkt)
**Status:** ✅ DONE (wszystkie 6 produktów)

**Komponenty:**
- `RangeSlider` - slider z animowaną wartością, pear styling
- `NumberInput` - input dla kwot PLN/EUR z jednostką

**Preset Scenarios:** 3 buttony per produkt (quick fill)

#### ChatBot 24/7 ✅ DONE
1. Ile zapytań klientów dziennie? (slider 50-500)
2. Ile minut zajmuje odpowiedź? (slider 2-15)
3. Stawka godzinowa pracownika? (input PLN/h)
4. % zapytań do automatyzacji? (slider 50-90%)

**Presets:**
- E-commerce (200 zapytań, 5 min, 50 PLN/h, 70%)
- SaaS/Tech Support (150, 8 min, 80 PLN/h, 60%)
- Usługi lokalne (80, 4 min, 40 PLN/h, 75%)

#### Agent Głosowy ✅ DONE
1. Ile połączeń dziennie? (slider 20-200)
2. Minuty per call? (slider 3-20)
3. Stawka godzinowa recepcji? (input PLN/h)
4. % dodatkowych wizyt 24/7? (slider 5-30%)
5. Wartość średniej wizyty? (input PLN)

**Presets:**
- Klinika (50, 8 min, 60 PLN/h, 15%, 500 PLN)
- Restauracja (30, 10 min, 70 PLN/h, 20%, 2000 PLN)
- Salon (40, 6 min, 50 PLN/h, 12%, 300 PLN)

#### Tworzenie Treści AI ✅ DONE
1. Ile postów tygodniowo? (slider 3-20)
2. Godziny per post? (slider 1-4h)
3. Stawka content creator? (input PLN/h)
4. Ile platform? (checkboxes: LinkedIn, FB, IG, TikTok, YT)

**Presets:**
- Agencja (14, 2h, 100 PLN/h, 4 platformy)
- E-commerce (10, 1.5h, 70 PLN/h, 3 platformy)
- Marka osobista (5, 3h, 150 PLN/h, 2 platformy)

#### Automatyzacja Sprzedaży ✅ DONE
1. Ile leadów miesięcznie? (slider 50-500)
2. Czas per lead? (slider 15-60 min)
3. % leadów do automatyzacji? (slider 50-80%)
4. Stawka handlowca? (input PLN/h)
5. Wartość średniego deala? (input PLN)

**Presets:**
- B2B SaaS (150, 30 min, 70%, 120 PLN/h, 8000 PLN)
- E-commerce (300, 20 min, 75%, 80 PLN/h, 3000 PLN)
- Konsulting (100, 45 min, 65%, 150 PLN/h, 12000 PLN)

#### Asystent Wiedzy ✅ DONE
1. Ile dokumentów w bazie? (slider 50-5000)
2. Ile zapytań dziennie? (slider 20-200)
3. Minuty wyszukiwania ręcznego? (slider 5-30)
4. Stawka pracownika? (input PLN/h)

**Presets:**
- Biuro rachunkowe (1000, 100, 12 min, 100 PLN/h)
- Kancelaria prawna (2000, 60, 15 min, 200 PLN/h)
- Dział HR (500, 80, 8 min, 80 PLN/h)

#### Dedykowane Rozwiązania ✅ DONE
1. Godziny miesięcznie na proces? (slider 10-200h)
2. Ile osób zaangażowanych? (slider 1-10)
3. Średnia stawka zespołu? (input PLN/h)
4. Czy generuje przychody? (toggle Yes/No)
   - Jeśli TAK: % wzrostu przychodu? (slider 10-50%)
   - Jeśli TAK: Obecne przychody miesięczne? (input PLN)

**Presets:**
- Raportowanie e-commerce (40h, 2 osoby, 80 PLN/h, TAK: +15%, 100k PLN)
- Onboarding SaaS (60h, 3 osoby, 100 PLN/h, TAK: +20%, 80k PLN)
- Data entry logistics (120h, 2 osoby, 50 PLN/h, NIE)

---

### Krok 3: Wyniki ROI
**Status:** ✅ DONE (core metrics, product-specific data)

**Core Metrics (wszystkie produkty):**
1. 💰 Oszczędności miesięczne (BIG NUMBER #1)
2. 📅 Oszczędności roczne
3. 📈 ROI % (po 12 miesiącach)
4. ⏱️ Break-even (ile miesięcy)

**Dodatkowe metryki per produkt:**
- ChatBot: Zaoszczędzone godziny, zapytań automatycznie
- Voice Agent: Dodatkowe wizyty umówione (ilość + PLN)
- Content Agent: Postów miesięcznie, zasięg platform (leverage ratio)
- Sales Automation: Dodatkowe deale, pipeline value increase
- RAG Chatbot: Queries answered instantly, productivity increase
- Custom: Process time reduction, dodatkowy przychód

**Visualizations (Recharts):**
- Bar chart: Before/After comparison
- Line chart: Cumulative savings (Year 1-3)
- Pie chart: Savings breakdown

**Button:** "📄 Pobierz szczegółowy raport PDF"

---

### Krok 4: Lead Capture
**Status:** 🔄 TODO

**Form fields:**
- Email (required)
- Imię (optional)
- Telefon (optional)
- ☑️ Zgoda RODO (required checkbox)

**Submit button:** "📩 Wyślij raport + umów konsultację"

**Po submit:**
1. Instant: PDF download (browser)
2. Email (2 min): PDF + link Cal.com
3. n8n webhook → Notion database
   - Fields: Name, Email, Phone, Product, ROI Calculated, Status, Source, Timestamp

**Email template:**
```
Subject: Twój raport ROI - [Produkt] | LessManual.ai

Cześć [Imię],

📊 Twoje wyniki:
- Oszczędności miesięczne: [X] PLN
- ROI: [X]%
- Break-even: [X] miesięcy

📄 Raport PDF: [załącznik]

🚀 Zarezerwuj konsultację: [Cal.com link]

Bartłomiej Chudzik
Founder, LessManual.ai
```

---

## 🎨 Design System

**Colors:**
- Background: `#0C0D0A` (night)
- Accent: `#DDE000` (pear)
- Success metrics: `#22C55E` (green)

**Typography:** Inter font

**Animations:**
- Progress bar transitions
- Step fade-in/out (Framer Motion)
- Number counter animations
- Chart reveal animations (Recharts)

---

## 🔗 Hash Navigation (TODO)

**URL states:**
```
lessmanual.ai/pl#kalkulator                     (Step 1 - product select)
lessmanual.ai/pl#kalkulator-chatbot             (Step 2 - questions)
lessmanual.ai/pl#kalkulator-chatbot-wyniki      (Step 3 - results)
lessmanual.ai/pl#kalkulator-chatbot-lead        (Step 4 - lead capture)
```

**Pre-selection z email CTA:**
```
lessmanual.ai/pl#kalkulator-chatbot?preset=ecommerce
→ Auto-scroll + Auto-select ChatBot + Auto-fill preset
```

---

## 📊 Average Savings (Finalne kwoty)

**Polska (PL):**
- ChatBot: 12,000 PLN/mies
- Agent Głosowy: 10,000 PLN/mies
- Tworzenie Treści: 5,000 PLN/mies
- Automatyzacja Sprzedaży: 8,000 PLN/mies
- Asystent Wiedzy: 12,000 PLN/mies
- Dedykowane Rozwiązania: 18,000 PLN/mies

**Europa (EN):**
- ChatBot: €2,800/month
- Voice Agent: €2,400/month
- Content Agent: €1,200/month
- Sales Automation: €2,000/month
- RAG Chatbot: €2,800/month
- Custom Solutions: €4,200/month

---

## 📁 Pliki

**Komponenty:**
- `/src/components/sections/ROICalculatorSection.tsx` - Main component (4 steps)
- `/src/components/ui/RangeSlider.tsx` - Slider component
- `/src/components/ui/NumberInput.tsx` - Number input component

**Utils:**
- `/src/lib/roi-calculations.ts` - ROI calculation functions (6 products + presets)

**Translations:**
- `/src/messages/pl.json` - Polish (roiCalculator section)
- `/src/messages/en.json` - English (roiCalculator section)

**Integration:**
- `/src/app/[locale]/page.tsx` - Homepage (kalkulator między HowItWorks a About)

---

## ✅ Zrobione
- [x] ROI calculation utilities (6 produktów)
- [x] Translations (PL + EN)
- [x] Step 1: Product selector (6 kafelków)
- [x] RangeSlider component
- [x] NumberInput component
- [x] Step 2: ChatBot form (4 pytania + 3 presets)
- [x] Step 2: Voice Agent form (5 pytań + 3 presets)
- [x] Step 2: Content Agent form (4 pytania + 3 presets)
- [x] Step 2: Sales Automation form (6 pytań + 3 presets)
- [x] Step 2: RAG Chatbot form (4 pytania + 3 presets)
- [x] Step 2: Custom Solutions form (4-6 pytań + 3 presets, with conditional revenue fields)

## 🔄 W trakcie
- [ ] (Ready for next step)

## 📋 TODO
- [ ] Step 3: Results display (animated numbers + Recharts)
- [ ] Step 4: Lead capture form + RODO
- [ ] "Pomóż mi wybrać" quiz (3 pytania → recommendation)
- [ ] Hash navigation (#kalkulator-chatbot)
- [ ] URL preset auto-fill (?preset=ecommerce)
- [ ] n8n webhook → Notion integration
- [ ] PDF generation
- [ ] Email template (n8n)
- [ ] Mobile testing
