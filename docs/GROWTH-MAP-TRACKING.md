# Growth Map tracking

## Cel

Pomiar ma pokazać, gdzie użytkownik odpada między wejściem na stronę a otwarciem przygotowanej wiadomości. Nie służy do przechowywania danych z formularza.

## Zdarzenia

| Zdarzenie | Moment | Parametry |
|---|---|---|
| `page_view` | Wejście na `/ai-growth-opportunity-map` | Automatyczne parametry GA4 |
| `growth_map_form_started` | Pierwsza interakcja z formularzem | `form_name`, `delivery_mode` |
| `growth_map_validation_failed` | Nieudana walidacja kroku | `form_name`, `delivery_mode`, `step_number`, `error_count` |
| `growth_map_step_completed` | Poprawne przejście z kroku 1 do 2 | `form_name`, `delivery_mode`, `step_number` |
| `growth_map_submission_prepared` | Utworzenie lokalnego `mailto` | `form_name`, `delivery_mode` |
| `growth_map_email_draft_link_clicked` | Kliknięcie linku do przygotowanej wiadomości | `form_name`, `delivery_mode` |
| `growth_map_submission_accepted` | Przyszły tryb CloudCSO przyjmie zgłoszenie | `form_name`, `delivery_mode` |
| `growth_map_submission_failed` | Przyszły tryb CloudCSO odrzuci zgłoszenie lub request nie dojdzie | `form_name`, `delivery_mode` |

`growth_map_email_draft_link_clicked` nie oznacza otwarcia programu pocztowego ani wysłania wiadomości. Przeglądarka potrafi potwierdzić wyłącznie kliknięcie linku.

## Prywatność

Do GA4 nie trafiają:

- imię, e-mail, firma, strona i branża,
- opis systemów, blokady, notatki i liczby z procesu,
- adres `mailto`, temat ani treść wiadomości,
- pełny URL, query string, referrer ani ręcznie kopiowane UTM jako parametry własne zdarzenia.

Zdarzenia są wysyłane wyłącznie wtedy, gdy po zgodzie analitycznej istnieje `window.gtag`. GA4 automatycznie zbiera `page_location` i `page_referrer`; `page_location` może zawierać query string. GA4 odczytuje z niego UTM i przypisuje je do wymiarów źródła ruchu. Z tego powodu parametry UTM muszą używać wyłącznie anonimowych slugów zgodnie z `docs/UTM-CONVENTIONS.md`.

## Plan testu produkcyjnego po deployu

Test produkcyjny ma użyć danych syntetycznych, przechwycić i zablokować requesty kolektora GA oraz zablokować domyślną akcję linku `mailto`. Musi potwierdzić:

- działanie desktop i mobile,
- dokładną kolejność oraz allowlistę parametrów zdarzeń,
- brak danych formularza w payloadach analitycznych,
- zero requestów do `/api/lead-magnet/growth-map`,
- poprawny odbiorca i struktura tematu `mailto`, bez logowania body.
