/**
 * Currency Utilities
 *
 * Handles currency conversion and formatting for ROI Calculator.
 * - PL locale: displays PLN (złoty)
 * - EN locale: displays EUR (euro) with automatic conversion
 *
 * Conversion rate: 1 EUR = 4.3 PLN (industry standard)
 */

export type Locale = 'pl' | 'en'

// PLN to EUR conversion rate
const PLN_TO_EUR_RATE = 4.3

/**
 * Convert PLN to EUR
 */
export function convertPLNtoEUR(amountPLN: number): number {
  return Math.round(amountPLN / PLN_TO_EUR_RATE)
}

/**
 * Convert EUR to PLN
 */
export function convertEURtoPLN(amountEUR: number): number {
  return Math.round(amountEUR * PLN_TO_EUR_RATE)
}

/**
 * Format currency based on locale
 *
 * @param amount - Amount in PLN (always stored as PLN internally)
 * @param locale - Current user locale ('pl' | 'en')
 * @param options - Additional formatting options
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(12000, 'pl') // "12 000 PLN"
 * formatCurrency(12000, 'en') // "€2,791"
 */
export function formatCurrency(
  amount: number,
  locale: Locale,
  options?: {
    showCurrency?: boolean // Default: true
    decimals?: boolean // Default: false
  }
): string {
  const showCurrency = options?.showCurrency ?? true
  const decimals = options?.decimals ?? false

  if (locale === 'en') {
    // Convert PLN to EUR for English locale
    const amountEUR = convertPLNtoEUR(amount)

    const formatted = amountEUR.toLocaleString('en-US', {
      minimumFractionDigits: decimals ? 2 : 0,
      maximumFractionDigits: decimals ? 2 : 0
    })

    return showCurrency ? `€${formatted}` : formatted
  }

  // Polish locale - display PLN
  const formatted = amount.toLocaleString('pl-PL', {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0
  })

  return showCurrency ? `${formatted} PLN` : formatted
}

/**
 * Format currency for Step 3 results (large numbers)
 *
 * Handles both monthly and yearly savings with proper spacing
 */
export function formatResultCurrency(amount: number, locale: Locale): string {
  return formatCurrency(amount, locale, { showCurrency: true, decimals: false })
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(locale: Locale): string {
  return locale === 'en' ? '€' : 'PLN'
}

/**
 * Get currency code
 */
export function getCurrencyCode(locale: Locale): 'PLN' | 'EUR' {
  return locale === 'en' ? 'EUR' : 'PLN'
}

/**
 * Format number without currency (for hours, counts, etc.)
 */
export function formatNumber(value: number, locale: Locale): string {
  if (locale === 'en') {
    return value.toLocaleString('en-US')
  }
  return value.toLocaleString('pl-PL')
}
