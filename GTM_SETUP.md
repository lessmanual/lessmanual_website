# 📊 Instrukcja konfiguracji Google Tag Manager dla LessManual.ai

## Krok 1: Utwórz konto Google Tag Manager

1. Idź do https://tagmanager.google.com/
2. Zaloguj się kontem Google (@lessmanual.ai)
3. Kliknij **"Utwórz konto"**
4. Wypełnij:
   - Nazwa konta: `LessManual`
   - Kraj: `Polska`
   - Nazwa kontenera: `lessmanual.ai`
   - Platforma docelowa: `Sieć` (Web)
5. Zaakceptuj warunki i kliknij **"Utwórz"**

## Krok 2: Skopiuj GTM ID

Po utworzeniu kontenera zobaczysz kod instalacji. Skopiuj **ID kontenera** (format: `GTM-XXXXXXX`).

## Krok 3: Dodaj GTM ID do zmiennych środowiskowych

Edytuj plik `.env.local` i zastąp `GTM-XXXXXXX` swoim prawdziwym ID:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # <-- Wstaw tutaj swoje ID
```

Zapisz plik i zrestartuj serwer dev (Ctrl+C, potem `npm run dev`).

## Krok 4: Skonfiguruj GTM - Dodaj GA4

1. W Google Tag Manager, kliknij **"Tagi"** → **"Nowy"**
2. Nazwa tagu: `GA4 - Configuration`
3. Konfiguracja tagu:
   - Typ: **Google Analytics: Google Analytics 4 Event**
   - Measurement ID: Twoje GA4 ID (znajdziesz w Google Analytics 4)
4. Wyzwalacz: **All Pages**
5. Zapisz

## Krok 5: Skonfiguruj eventy Custom

Teraz dodaj tagi dla 6 eventów z kalkulatora ROI:

### Event 1: `product_selected`
**Kiedy:** Użytkownik wybiera produkt w kroku 1 lub kończy quiz

1. **Tagi** → **Nowy**
2. Nazwa: `GA4 - Product Selected`
3. Typ: **Google Analytics: GA4 Event**
4. Measurement ID: (wybierz z listy lub wklej)
5. Event Name: `product_selected`
6. Event Parameters:
   ```
   product_id       → {{DLV - product_id}}
   product_name     → {{DLV - product_name}}
   calculator_step  → {{DLV - calculator_step}}
   ```
7. Wyzwalacz: **Custom Event** → Nazwa zdarzenia: `product_selected`
8. Zapisz

### Event 2: `step_completed`
**Kiedy:** Użytkownik kliknie "Oblicz ROI" (Krok 2 → Krok 3)

1. **Tagi** → **Nowy**
2. Nazwa: `GA4 - Step Completed`
3. Typ: **Google Analytics: GA4 Event**
4. Event Name: `step_completed`
5. Event Parameters:
   ```
   product_id       → {{DLV - product_id}}
   calculator_step  → {{DLV - calculator_step}}
   ```
6. Wyzwalacz: **Custom Event** → Nazwa zdarzenia: `step_completed`
7. Zapisz

### Event 3: `results_viewed`
**Kiedy:** Użytkownik widzi wyniki w kroku 3

1. **Tagi** → **Nowy**
2. Nazwa: `GA4 - Results Viewed`
3. Typ: **Google Analytics: GA4 Event**
4. Event Name: `results_viewed`
5. Event Parameters:
   ```
   product_id       → {{DLV - product_id}}
   calculator_step  → {{DLV - calculator_step}}
   monthly_savings  → {{DLV - monthly_savings}}
   yearly_savings   → {{DLV - yearly_savings}}
   roi_percent      → {{DLV - roi_percent}}
   currency         → {{DLV - currency}}
   ```
6. Wyzwalacz: **Custom Event** → Nazwa zdarzenia: `results_viewed`
7. Zapisz

### Event 4: `lead_captured`
**Kiedy:** Użytkownik wysyła formularz kontaktowy (Step 4)

1. **Tagi** → **Nowy**
2. Nazwa: `GA4 - Lead Captured`
3. Typ: **Google Analytics: GA4 Event**
4. Event Name: `lead_captured`
5. Event Parameters:
   ```
   product_id    → {{DLV - product_id}}
   has_email     → {{DLV - has_email}}
   has_phone     → {{DLV - has_phone}}
   has_company   → {{DLV - has_company}}
   lead_source   → {{DLV - lead_source}}
   ```
6. Wyzwalacz: **Custom Event** → Nazwa zdarzenia: `lead_captured`
7. Zapisz

### Event 5: `preset_used`
**Kiedy:** Użytkownik kliknie preset (Sklep e-commerce, SaaS, itp.)

1. **Tagi** → **Nowy**
2. Nazwa: `GA4 - Preset Used`
3. Typ: **Google Analytics: GA4 Event**
4. Event Name: `preset_used`
5. Event Parameters:
   ```
   product_id       → {{DLV - product_id}}
   preset_name      → {{DLV - preset_name}}
   calculator_step  → {{DLV - calculator_step}}
   ```
6. Wyzwalacz: **Custom Event** → Nazwa zdarzenia: `preset_used`
7. Zapisz

### Event 6: `quiz_completed`
**Kiedy:** Użytkownik kończy quiz "Pomóż mi wybrać"

1. **Tagi** → **Nowy**
2. Nazwa: `GA4 - Quiz Completed`
3. Typ: **Google Analytics: GA4 Event**
4. Event Name: `quiz_completed`
5. Event Parameters:
   ```
   recommended_product → {{DLV - recommended_product}}
   industry            → {{DLV - industry}}
   problem             → {{DLV - problem}}
   company_size        → {{DLV - company_size}}
   ```
6. Wyzwalacz: **Custom Event** → Nazwa zdarzenia: `quiz_completed`
7. Zapisz

## Krok 6: Utwórz zmienne Data Layer

Aby event parameters działały, musisz stworzyć **zmienne Data Layer**:

1. **Zmienne** → **Nowe** (sekcja Zmienne zdefiniowane przez użytkownika)
2. Typ: **Zmienna warstwy danych**
3. Utwórz następujące zmienne (każdą osobno):

| Nazwa zmiennej | Data Layer Variable Name |
|---------------|-------------------------|
| `DLV - product_id` | `product_id` |
| `DLV - product_name` | `product_name` |
| `DLV - calculator_step` | `calculator_step` |
| `DLV - monthly_savings` | `monthly_savings` |
| `DLV - yearly_savings` | `yearly_savings` |
| `DLV - roi_percent` | `roi_percent` |
| `DLV - currency` | `currency` |
| `DLV - has_email` | `has_email` |
| `DLV - has_phone` | `has_phone` |
| `DLV - has_company` | `has_company` |
| `DLV - lead_source` | `lead_source` |
| `DLV - preset_name` | `preset_name` |
| `DLV - recommended_product` | `recommended_product` |
| `DLV - industry` | `industry` |
| `DLV - problem` | `problem` |
| `DLV - company_size` | `company_size` |

Każda zmienna:
- Typ: **Zmienna warstwy danych**
- Nazwa zmiennej warstwy danych: (jak w tabeli powyżej)

## Krok 7: Utwórz wyzwalacze Custom Event

Dla każdego eventu potrzebujesz wyzwalacza:

1. **Wyzwalacze** → **Nowy**
2. Typ: **Zdarzenie niestandardowe**
3. Nazwa zdarzenia: (dokładnie jak nazwa eventu)
4. To zdarzenie wyzwala na: **Wszystkie zdarzenia niestandardowe**

Utwórz 6 wyzwalaczy:
- `product_selected`
- `step_completed`
- `results_viewed`
- `lead_captured`
- `preset_used`
- `quiz_completed`

## Krok 8: Opublikuj kontener

1. Kliknij **"Prześlij"** (Submit) w prawym górnym rogu
2. Nazwa wersji: `v1.0 - Initial ROI Calculator Tracking`
3. Opis: `Tracking dla kalkulatora ROI: 6 eventów + GA4`
4. Kliknij **"Opublikuj"**

## Krok 9: Testowanie

### Testowanie w środowisku dev (localhost):

W trybie development eventy nie są wysyłane do GTM, ale widać je w konsoli przeglądarki:

```bash
npm run dev
```

Otwórz konsolę DevTools (F12) i wykonaj akcje w kalkulatorze. Zobaczysz:

```
📊 Analytics Event: product_selected {product_id: 'chatbot', product_name: 'ChatBot 24/7', calculator_step: 1}
```

### Testowanie na produkcji:

1. **Deploy na Vercel** (GTM działa tylko w production)
2. Otwórz Google Tag Manager → **Podgląd** (Preview)
3. Wklej URL produkcyjny: `https://lessmanual.ai`
4. Wykonaj akcje w kalkulatorze
5. Sprawdź w GTM Preview, czy eventy są widoczne

### Weryfikacja w GA4:

1. Otwórz Google Analytics 4
2. **Raporty** → **Czas rzeczywisty** → **Wydarzenia**
3. Wykonaj akcje na stronie
4. Po 5-10 sekundach zobaczysz eventy na żywo

## Krok 10: Dodaj do Vercel (produkcja)

Gdy deploywujesz na Vercel, dodaj zmienną środowiskową:

1. Vercel Dashboard → **Projekt** → **Settings** → **Environment Variables**
2. Dodaj:
   ```
   NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX
   ```
3. Redeploy projektu

## 📈 Co śledzisz?

| Event | Znaczenie | Użycie w Google Analytics |
|-------|-----------|--------------------------|
| `product_selected` | Który produkt interesuje użytkownika | Najpopularniejsze produkty |
| `step_completed` | Ile osób kliknie "Oblicz ROI" | Conversion rate Krok 2 → Krok 3 |
| `results_viewed` | Średnie oszczędności użytkowników | Segmentacja leadów po wartości |
| `lead_captured` | Ile leadów z kalkulatora | Główna konwersja (lead) |
| `preset_used` | Które presety są popularne | Optymalizacja presetów |
| `quiz_completed` | Skuteczność quizu | Jak dobrze quiz rekomenduje |

## 🎯 Przykładowe raporty w GA4

### Raport 1: Funnel konwersji kalkulatora
```
Step 1: product_selected       1000 użytkowników (100%)
Step 2: step_completed           800 użytkowników (80%)
Step 3: results_viewed           750 użytkowników (75%)
Step 4: lead_captured            150 użytkowników (15% final conversion)
```

### Raport 2: Najpopularniejsze produkty
```
chatbot           45% wyborów
voiceAgent        25% wyborów
salesAutomation   15% wyborów
contentAgent      10% wyborów
ragChatbot         3% wyborów
custom             2% wyborów
```

### Raport 3: Średnie oszczędności leadów
```
Miesięczne oszczędności: 12,500 PLN średnio
Roczne oszczędności:    150,000 PLN średnio
ROI:                    350% średnio
```

## 🔧 Troubleshooting

### Problem: Eventy nie pojawiają się w GTM Preview
**Rozwiązanie:**
- Sprawdź czy `NEXT_PUBLIC_GTM_ID` jest w `.env.local`
- Zrestartuj serwer dev
- Wyczyść cache przeglądarki

### Problem: Eventy są w GTM ale nie w GA4
**Rozwiązanie:**
- Sprawdź czy GA4 tag ma poprawne Measurement ID
- Sprawdź czy wszystkie tagi mają wyzwalacz
- Sprawdź w GA4 DebugView (włącz w ustawieniach)

### Problem: W development widać logi ale na produkcji nic
**Rozwiązanie:**
- Upewnij się że `NEXT_PUBLIC_GTM_ID` jest w Vercel Environment Variables
- Redeploy projektu
- Sprawdź w źródle HTML czy skrypt GTM się załadował

## 📚 Więcej informacji

- [Dokumentacja GTM](https://support.google.com/tagmanager)
- [GA4 Custom Events](https://support.google.com/analytics/answer/12229021)
- [Data Layer Variables](https://support.google.com/tagmanager/answer/6164391)

---

**Autor:** Bartłomiej Chudzik
**Data:** 2025-10-28
**Wersja:** 1.0
