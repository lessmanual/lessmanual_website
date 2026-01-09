/**
 * Polish Pluralization Utility
 *
 * Handles Polish grammatical number (singular, paucal, plural)
 * for correct noun forms with numerals.
 *
 * Polish rules:
 * - 1 → singular (post)
 * - 2-4 → paucal (posty)
 * - 5-21 → plural (postów)
 * - 22-24 → paucal (posty)
 * - 25-31 → plural (postów)
 * - ...and so on cyclically
 *
 * @example
 * ```typescript
 * import { pluralize, POLISH_FORMS } from '@/lib/polish-plural'
 *
 * pluralize(1, POLISH_FORMS.post)  // "post"
 * pluralize(3, POLISH_FORMS.post)  // "posty"
 * pluralize(5, POLISH_FORMS.post)  // "postów"
 * pluralize(22, POLISH_FORMS.post) // "posty"
 * ```
 */

/**
 * Returns the correct Polish noun form based on the count.
 *
 * @param count - The number to pluralize for
 * @param forms - Array of [singular, paucal (2-4), plural (5+)]
 * @returns The correct noun form
 */
export function pluralize(
  count: number,
  forms: [string, string, string]
): string {
  const absCount = Math.abs(Math.floor(count))

  // Singular: exactly 1
  if (absCount === 1) return forms[0]

  const lastTwo = absCount % 100
  const lastOne = absCount % 10

  // Special case: 11-14 always use plural form
  if (lastTwo >= 11 && lastTwo <= 14) return forms[2]

  // Paucal: ends in 2, 3, 4 (but not 12, 13, 14)
  if (lastOne >= 2 && lastOne <= 4) return forms[1]

  // Everything else: plural
  return forms[2]
}

/**
 * Returns count with the correct Polish noun form.
 *
 * @param count - The number
 * @param forms - Array of [singular, paucal (2-4), plural (5+)]
 * @returns Formatted string like "3 posty"
 */
export function pluralizeWithCount(
  count: number,
  forms: [string, string, string]
): string {
  return `${count} ${pluralize(count, forms)}`
}

/**
 * Dictionary of Polish noun forms for common words.
 * Each entry: [singular, paucal (2-4), plural (5+)]
 */
export const POLISH_FORMS = {
  // Content-related
  post: ['post', 'posty', 'postów'] as [string, string, string],

  // Platform-related
  platforma: ['platforma', 'platformy', 'platform'] as [string, string, string],

  // Time-related
  godzina: ['godzina', 'godziny', 'godzin'] as [string, string, string],
  minuta: ['minuta', 'minuty', 'minut'] as [string, string, string],
  sekunda: ['sekunda', 'sekundy', 'sekund'] as [string, string, string],
  dzien: ['dzień', 'dni', 'dni'] as [string, string, string],
  tydzien: ['tydzień', 'tygodnie', 'tygodni'] as [string, string, string],
  miesiac: ['miesiąc', 'miesiące', 'miesięcy'] as [string, string, string],
  rok: ['rok', 'lata', 'lat'] as [string, string, string],

  // Business-related
  zapytanie: ['zapytanie', 'zapytania', 'zapytań'] as [string, string, string],
  polaczenie: ['połączenie', 'połączenia', 'połączeń'] as [string, string, string],
  lead: ['lead', 'leady', 'leadów'] as [string, string, string],
  dokument: ['dokument', 'dokumenty', 'dokumentów'] as [string, string, string],
  osoba: ['osoba', 'osoby', 'osób'] as [string, string, string],
  wizyta: ['wizyta', 'wizyty', 'wizyt'] as [string, string, string],
  deal: ['deal', 'deale', 'deali'] as [string, string, string],
} as const

export type PolishFormKey = keyof typeof POLISH_FORMS
