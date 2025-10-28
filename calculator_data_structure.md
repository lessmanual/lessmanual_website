# Kalkulator ROI - Struktura Danych per Produkt

**Wersja:** 1.0
**Data:** 2025-10-28
**Przeznaczenie:** Dokumentacja dla generowania PDF raportów ROI w n8n

---

## 🎯 Ogólna Struktura Payloadu

Każdy payload wysyłany do n8n webhook zawiera:

```json
{
  // Dane kontaktowe
  "fullName": "Jan Kowalski",
  "email": "jan@example.com",
  "phone": "+48123456789",
  "companyName": "Nazwa Firmy" | null,

  // Identyfikator produktu
  "productId": "chatbot" | "voiceAgent" | "contentAgent" | "salesAutomation" | "ragChatbot" | "customSolutions",

  // Wyniki ROI (zawsze obecne)
  "savingsMonth": 12833,
  "savingsYear": 153996,

  // Dodatkowe wyniki (opcjonalne, zależne od produktu)
  "savedHoursMonth": 257 | null,
  "additionalRevenueMonth": 25000 | null,

  // Dane wejściowe kalkulatora (różne dla każdego produktu)
  "inputs": { /* zobacz poniżej */ },

  // Zgody RODO
  "rodoConsent": true,
  "newsletterConsent": false,

  // Metadata
  "sourceUrl": "http://localhost:3000/pl#kalkulator",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2025-10-27T18:30:00.000Z"
}
```

---

## 📦 Produkty i ich Dane

### 1. **ChatBot** (`productId: "chatbot"`)

#### Dane Wejściowe (`inputs`):
```json
{
  "dailyInquiries": 100,          // Ile zapytań klientów dziennie?
  "avgMinutesPerInquiry": 4,      // Ile minut zajmuje odpowiedź?
  "hourlyWage": 28,               // Jaka jest stawka godzinowa pracownika? (PLN/h)
  "automationRate": 90            // Jaki % zapytań można zautomatyzować? (0-100)
}
```

#### Dane Wyjściowe:
```json
{
  "savingsMonth": 12833,
  "savingsYear": 153996,
  "savedHoursMonth": 257,
  "automatedInquiries": 1980,     // Liczba zautomatyzowanych zapytań miesięcznie
  "additionalRevenueMonth": null  // ChatBot nie ma dodatkowego przychodu
}
```

#### Pola do PDF:
- ✅ Oszczędności miesięczne/roczne
- ✅ Zaoszczędzone godziny
- ✅ Zautomatyzowane zapytania miesięcznie
- ❌ Brak dodatkowego przychodu

---

### 2. **Voice Agent** (`productId: "voiceAgent"`)

#### Dane Wejściowe (`inputs`):
```json
{
  "dailyCalls": 50,               // Ile połączeń dziennie?
  "avgCallMinutes": 8,            // Średni czas rozmowy (minuty)
  "hourlyWage": 60,               // Stawka godzinowa pracownika (PLN/h)
  "additionalBookingsPercent": 15, // % połączeń po godzinach które umówią wizytę (0-100)
  "avgVisitValue": 500            // Średnia wartość wizyty (PLN)
}
```

#### Dane Wyjściowe:
```json
{
  "savingsMonth": 8820,
  "savingsYear": 105840,
  "savedHoursMonth": 147,
  "additionalBookingsMonth": 50,   // Dodatkowe wizyty umówione (24/7)
  "additionalRevenueMonth": 25000  // Potencjalny zysk z dodatkowych wizyt
}
```

#### Pola do PDF:
- ✅ Oszczędności miesięczne/roczne
- ✅ Zaoszczędzone godziny
- ✅ Dodatkowe wizyty umówione (24/7): **50/mies**
- ✅ Potencjalny zysk z wizyt: **+25 000 PLN/mies**

---

### 3. **Content Agent** (`productId: "contentAgent"`)

#### Dane Wejściowe (`inputs`):
```json
{
  "postsPerWeek": 14,             // Ile postów tygodniowo?
  "hoursPerPost": 2,              // Godziny na jeden post
  "hourlyWage": 100,              // Stawka godzinowa (PLN/h)
  "platformCount": 4              // Na ile platform publikujesz?
}
```

#### Dane Wyjściowe:
```json
{
  "savingsMonth": 4000,
  "savingsYear": 48000,
  "savedHoursMonth": 40,
  "automatedPostsMonth": 243,      // Liczba zautomatyzowanych postów miesięcznie
  "leverageRatio": 4,              // Leverage (liczba platform)
  "additionalRevenueMonth": null   // Content Agent nie ma dodatkowego przychodu
}
```

#### Pola do PDF:
- ✅ Oszczędności miesięczne/roczne
- ✅ Zaoszczędzone godziny
- ✅ Zautomatyzowane posty miesięcznie
- ❌ Brak dodatkowego przychodu

---

### 4. **Sales Automation** (`productId: "salesAutomation"`)

#### Dane Wejściowe (`inputs`):
```json
{
  "leadsPerMonth": 150,           // Ile leadów miesięcznie?
  "minutesPerLead": 30,           // Czas obsługi 1 leada (minuty)
  "automationRate": 70,           // % procesów do zautomatyzowania (0-100)
  "hourlyWage": 120,              // Stawka godzinowa (PLN/h)
  "avgDealValue": 8000,           // Średnia wartość dealu (PLN)
  "conversionImprovement": 5      // Wzrost konwersji dzięki automatyzacji (0-100%)
}
```

#### Dane Wyjściowe:
```json
{
  "savingsMonth": 7500,
  "savingsYear": 90000,
  "savedHoursMonth": 150,
  "additionalDealsMonth": 7,       // Dodatkowe deale dzięki lepszej konwersji
  "additionalRevenueMonth": 56000  // Potencjalny zysk z dodatkowych dealów
}
```

#### Pola do PDF:
- ✅ Oszczędności miesięczne/roczne
- ✅ Zaoszczędzone godziny
- ✅ Dodatkowe deale zamknięte: **7/mies**
- ✅ Potencjalny zysk z dealów: **+56 000 PLN/mies**

---

### 5. **RAG Chatbot** (`productId: "ragChatbot"`)

#### Dane Wejściowe (`inputs`):
```json
{
  "documentsCount": 1000,         // Ile dokumentów w bazie wiedzy?
  "dailyQueries": 100,            // Ile zapytań dziennie?
  "avgSearchMinutes": 12,         // Średni czas wyszukiwania (minuty)
  "hourlyWage": 100               // Stawka godzinowa (PLN/h)
}
```

#### Dane Wyjściowe:
```json
{
  "savingsMonth": 15000,
  "savingsYear": 180000,
  "savedHoursMonth": 375,
  "queriesAnsweredMonth": 2200,    // Liczba zapytań obsłużonych miesięcznie
  "additionalRevenueMonth": null   // RAG Chatbot nie ma dodatkowego przychodu
}
```

#### Pola do PDF:
- ✅ Oszczędności miesięczne/roczne
- ✅ Zaoszczędzone godziny
- ✅ Zapytań obsłużonych miesięcznie
- ❌ Brak dodatkowego przychodu

---

### 6. **Custom Solutions** (`productId: "customSolutions"`)

#### Dane Wejściowe (`inputs`):
```json
{
  "hoursPerMonth": 40,            // Ile godzin miesięcznie oszczędzasz?
  "teamSize": 2,                  // Wielkość zespołu
  "avgHourlyWage": 80,            // Średnia stawka godzinowa (PLN/h)
  "revenueImpact": true,          // Czy automatyzacja wpływa na przychody?
  "revenueIncreasePercent": 15,   // O ile % rosną przychody? (opcjonalne, 0-100)
  "currentMonthlyRevenue": 100000 // Obecne przychody miesięczne (opcjonalne, PLN)
}
```

#### Dane Wyjściowe:
```json
{
  "savingsMonth": 6400,
  "savingsYear": 76800,
  "savedHoursMonth": 80,
  "additionalRevenueMonth": 15000  // Wzrost przychodów (jeśli revenueImpact = true)
}
```

#### Pola do PDF:
- ✅ Oszczędności miesięczne/roczne
- ✅ Zaoszczędzone godziny
- ✅ Szacowany wzrost przychodów miesięcznych: **+15 000 PLN/mies** (jeśli > 0)

---

## 🧮 Mapowanie Produktów → Sekcje PDF

### Sekcja 1: Główne Oszczędności (ZAWSZE)
```
┌────────────────────────────┬────────────────────────────┐
│ Oszczędności miesięczne    │ Oszczędności roczne        │
│ savingsMonth PLN           │ savingsYear PLN            │
└────────────────────────────┴────────────────────────────┘
```

### Sekcja 2: Zaoszczędzone Godziny (ZAWSZE gdy `savedHoursMonth` > 0)
```
┌────────────────────────────┐
│ Zaoszczędzone godziny      │
│ savedHoursMonth h/mies     │
└────────────────────────────┘
```

### Sekcja 3: Dodatkowe Metryki (zależne od produktu)

#### Dla **ChatBot**:
```
┌────────────────────────────┐
│ Zapytań miesięcznie        │
│ totalInquiriesMonth        │
└────────────────────────────┘
```

#### Dla **Voice Agent**:
```
┌────────────────────────────┬────────────────────────────┐
│ Dodatkowe wizyty (24/7)    │ Potencjalny zysk           │
│ additionalBookingsMonth    │ +additionalRevenueMonth    │
└────────────────────────────┴────────────────────────────┘
```

#### Dla **Sales Automation**:
```
┌────────────────────────────┬────────────────────────────┐
│ Dodatkowe deale zamknięte  │ Potencjalny zysk           │
│ additionalDealsMonth       │ +additionalRevenueMonth    │
└────────────────────────────┴────────────────────────────┘
```

#### Dla **Custom Solutions**:
```
┌────────────────────────────┐
│ Wzrost przychodów          │
│ +additionalRevenueMonth    │
└────────────────────────────┘
```

---

## 🔄 Przykładowe Payloady z n8n

### Przykład 1: ChatBot (ecommerce preset)
```json
{
  "fullName": "Jan Kowalski",
  "email": "jan@example.com",
  "phone": "+48123456789",
  "companyName": "E-shop24",
  "productId": "chatbot",
  "savingsMonth": 12100,
  "savingsYear": 145200,
  "savedHoursMonth": 242,
  "additionalRevenueMonth": null,
  "inputs": {
    "dailyInquiries": 200,          // Duży e-commerce
    "avgMinutesPerInquiry": 5,
    "hourlyWage": 50,
    "automationRate": 70
  },
  "rodoConsent": true,
  "newsletterConsent": false,
  "sourceUrl": "http://localhost:3000/pl#kalkulator",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  "timestamp": "2025-10-28T09:00:00.000Z"
}
```

### Przykład 2: Voice Agent (clinic preset)
```json
{
  "fullName": "Anna Nowak",
  "email": "anna@klinika.pl",
  "phone": "+48987654321",
  "companyName": "Klinika Stomatologiczna",
  "productId": "voiceAgent",
  "savingsMonth": 5280,
  "savingsYear": 63360,
  "savedHoursMonth": 88,
  "additionalRevenueMonth": 16500,
  "inputs": {
    "dailyCalls": 50,
    "avgCallMinutes": 8,
    "hourlyWage": 60,
    "additionalBookingsPercent": 15,
    "avgVisitValue": 500
  },
  "rodoConsent": true,
  "newsletterConsent": true,
  "sourceUrl": "http://localhost:3000/pl#kalkulator",
  "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
  "timestamp": "2025-10-28T09:15:00.000Z"
}
```

---

## 📝 Logika Warunkowa dla PDF

W n8n workflow użyj następującej logiki:

```javascript
// Sprawdź produkt
const productId = $json.productId;

// Sekcja 1: ZAWSZE
pdf.addSection({
  title: "Twoje oszczędności",
  monthly: $json.savingsMonth,
  yearly: $json.savingsYear
});

// Sekcja 2: Jeśli są zaoszczędzone godziny
if ($json.savedHoursMonth > 0) {
  pdf.addSection({
    title: "Zaoszczędzone godziny",
    value: $json.savedHoursMonth
  });
}

// Sekcja 3: Dodatkowe metryki per produkt
if (productId === 'chatbot') {
  // ChatBot - zautomatyzowane zapytania
  if ('automatedInquiries' in $json) {
    pdf.addMetric("Zautomatyzowane zapytania", $json.automatedInquiries);
  }
}

if (productId === 'voiceAgent') {
  // Voice Agent - wizyty + przychód
  if ($json.additionalRevenueMonth > 0) {
    pdf.addBonusSection({
      title: "Dodatkowy potencjał przychodowy",
      bookings: $json.additionalBookingsMonth,  // ✅ To jest pole z RESULTS, nie inputs
      revenue: $json.additionalRevenueMonth
    });
  }
}

if (productId === 'salesAutomation') {
  // Sales Automation - deale + przychód
  if ($json.additionalRevenueMonth > 0) {
    pdf.addBonusSection({
      title: "Dodatkowy potencjał przychodowy",
      deals: $json.additionalDealsMonth,  // ✅ To jest pole z RESULTS, nie inputs
      revenue: $json.additionalRevenueMonth
    });
  }
}

if (productId === 'customSolutions') {
  // Custom Solutions - tylko przychód
  if ($json.additionalRevenueMonth > 0) {
    pdf.addMetric("Wzrost przychodów miesięcznych", $json.additionalRevenueMonth);
  }
}
```

---

## 🎨 Nazwy Polskie dla Produktów

Do wyświetlenia w PDF:

```javascript
const productNames = {
  'chatbot': 'ChatBot',
  'voiceAgent': 'Voice Agent',
  'contentAgent': 'Content Agent',
  'salesAutomation': 'Sales Automation',
  'ragChatbot': 'RAG ChatBot',
  'customSolutions': 'Custom Solutions / Dedykowane Rozwiązania'
};
```

---

## ✅ Checklist przed generowaniem PDF

- [ ] Sprawdź czy `productId` istnieje
- [ ] Sprawdź czy `savingsMonth` i `savingsYear` > 0
- [ ] Sprawdź czy `savedHoursMonth` istnieje (może być `null`)
- [ ] Sprawdź czy `additionalRevenueMonth` istnieje (tylko dla Voice, Sales, Custom)
- [ ] Dla Voice Agent: sprawdź `additionalBookingsMonth`
- [ ] Dla Sales Automation: sprawdź `additionalDealsMonth`
- [ ] Formatuj liczby z separatorem tysięcznym: `12833` → `12 833`
- [ ] Dodaj jednostki: PLN, h/mies, /mies

---

**Koniec dokumentacji**
**Pytania?** → Sprawdź kod w `/src/lib/roi-calculations.ts`
