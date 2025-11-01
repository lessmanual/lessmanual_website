# Klauzula RODO (do formularzy kontaktowych)

## Wersja Podstawowa (checkbox w formularzach)

Administratorem Twoich danych osobowych jest Bartłomiej Chudzik prowadzący działalność gospodarczą pod nazwą LessManual z siedzibą w ul. Długa 33, 05-530 Cendrowice, Polska. Twoje dane będą przetwarzane w celu kontaktu oraz realizacji usług. Przysługuje Ci prawo dostępu, sprostowania, usunięcia oraz innych praw opisanych w [Polityce Prywatności](/legal/polityka-prywatnosci). Masz prawo wniesienia skargi do PUODO.

---

## Wersja Rozszerzona (z checkboxem zgody marketingowej)

### Checkbox 1 (required):
☐ Oświadczam, że zapoznałem/am się z [Polityką Prywatności](/legal/polityka-prywatnosci) i wyrażam zgodę na przetwarzanie moich danych osobowych przez Bartłomiej Chudzik / LessManual w celu kontaktu oraz świadczenia usług automatyzacji AI. **(wymagane)**

### Checkbox 2 (optional):
☐ Wyrażam zgodę na otrzymywanie informacji handlowych oraz marketingowych drogą elektroniczną (email, SMS) od LessManual zgodnie z ustawą o świadczeniu usług drogą elektroniczną. Zgoda może być cofnięta w dowolnym momencie. (opcjonalne)

---

## Do wklejenia w HTML (formularz kontaktowy)

```html
<form>
  <input type="text" name="name" placeholder="Imię i nazwisko" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="text" name="company" placeholder="Firma">
  <textarea name="message" placeholder="Wiadomość" required></textarea>

  <!-- Checkbox RODO (required) -->
  <label>
    <input type="checkbox" name="rodo_consent" required>
    Oświadczam, że zapoznałem/am się z
    <a href="/legal/polityka-prywatnosci" target="_blank">Polityką Prywatności</a>
    i wyrażam zgodę na przetwarzanie moich danych osobowych w celu kontaktu. *
  </label>

  <!-- Checkbox Marketing (optional) -->
  <label>
    <input type="checkbox" name="marketing_consent">
    Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną
    od LessManual (opcjonalne)
  </label>

  <button type="submit">Wyślij</button>
</form>
```

---

## Dla Zapisu w Bazie (Supabase)

Zapisz w tabeli `contacts` lub `leads`:
- `rodo_consent_given` (boolean, required, default: false)
- `rodo_consent_date` (timestamp)
- `rodo_consent_ip` (inet) - dla weryfikacji
- `marketing_consent_given` (boolean, default: false)
- `marketing_consent_date` (timestamp, nullable)

**Ważne:** Bez zaznaczonego `rodo_consent` = formularz nie może być wysłany (frontend validation).
