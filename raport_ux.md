# Raport UX (User Experience) - LessManual.ai

**Data:** 2025-12-06
**Fokus:** Konwersja, Ścieżka użytkownika, Użyteczność

## 1. Analiza Ścieżki Użytkownika (User Journey)

Obecna struktura strony głównej prowadzi użytkownika w logicznym ciągu:
1.  **Hero:** "Co to jest?" + Obietnica wartości (Mniej manualnej pracy).
2.  **Problem/Solution:** "Dlaczego tego potrzebuję?" (Uświadomienie bólu).
3.  **Specjalizacje:** "Jak to robicie?" (Konkretne rozwiązania).
4.  **Kalkulator ROI:** "Ile na tym zarobię?" (Racjonalizacja zakupu).
5.  **Social Proof / FAQ:** "Czy to bezpieczne?" (Zbijanie obiekcji).
6.  **CTA / Kontakt:** "Biorę to!" (Akcja).

**Ocena Flow:** Bardzo dobre. Kalkulator ROI umieszczony przed ostatecznym kontaktem to świetny "lead magnet", który kwalifikuje klienta i daje mu wartość jeszcze przed rozmową.

## 2. Mocne Punkty UX

*   **Kalkulator ROI:** To "Killer Feature". Zamiast nudnego formularza "Wyślij zapytanie", użytkownik angażuje się w klikanie, suwanie suwakami i widzi konkretne liczby (Oszczędność: 12 000 PLN). To potężnie zwiększa motywację do zostawienia kontaktu ("Chcę ten raport!").
*   **Nawigacja:** Jasny podział na produkty.
*   **Język korzyści:** W `messages/pl.json` widać, że komunikacja jest nastawiona na wynik ("Oszczędzasz czas", "Zarabiasz pieniądze"), a nie tylko na technologię.

## 3. Punkty Krytyczne i Zagrożenia

### A. Iframe z n8n (Bariera Konwersji)
Ponownie wraca temat formularza.
*   **Ryzyko:** Jeśli iframe ładuje się wolno lub wygląda podejrzanie, użytkownik zrezygnuje na ostatniej prostej.
*   **UX:** Wypełnianie formularza w iframe na mobile często jest koszmarem (skaczący widok, problem z klawiaturą ekranową zasłaniającą pola).
*   **Rozwiązanie:** Formularz natywny. To absolutny priorytet dla UX.

### B. Zbyt wiele opcji w Hero?
Hero ma dwa przyciski: "Umów konsultację" i "Oblicz ROI".
*   **Ryzyko:** Paraliż decyzyjny.
*   **Sugestia:** To akurat jest OK, bo adresuje dwa typy klientów: "Gorący" (chce od razu gadać) i "Zimny/Analityczny" (chce policzyć). Ważne, aby wizualnie jeden był wyraźnie ważniejszy (Primary vs Secondary). W kodzie jest to zachowane.

### C. Skomplikowanie Kalkulatora
Kalkulator ma 4 kroki.
*   **Ryzyko:** Użytkownik może porzucić proces w połowie (drop-off).
*   **Sugestia:** Dodać wyraźny pasek postępu (jest w projekcie) oraz **możliwość zapisu/wysyłki wyniku nawet po 2 krokach** (np. "Chcesz wstępny wynik? Podaj maila"). Obecnie trzeba przejść wszystko. Warto monitorować analityką, na którym kroku ludzie odpadają.

## 4. Rekomendacje Sprzedażowe (CRO)

1.  **Sticky CTA na mobile:** Na telefonach, przycisk "Umów konsultację" powinien być zawsze widoczny na dole ekranu (sticky bar) podczas przewijania długich sekcji.
2.  **Dowód Społeczny (Social Proof):** Brakuje sekcji z logotypami klientów lub cytatami (Testimonials) zaraz pod Hero lub przy Kalkulatorze. Ludzie kupują oczami innych. Jeśli nie ma jeszcze klientów, warto dać logotypy technologii (OpenAI, Anthropic, n8n) jako "Partnerzy technologiczni" - to buduje autorytet.
3.  **Gwarancja Satysfakcji:** W FAQ jest mowa o gwarancji, ale warto wyciągnąć to wyżej, np. przy cenniku/ofercie. "Gwarancja zwrotu ROI lub zwrot pieniędzy" (jeśli taką oferujecie) to potężny lewar.

---
*Raport wygenerowany przez Gemini CLI Agent*
