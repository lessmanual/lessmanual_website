import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes intelligently.
 *
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 * This prevents Tailwind class conflicts by merging classes properly.
 *
 * @param {...ClassValue[]} inputs - Class names, objects, or arrays to merge
 * @returns {string} Merged and deduplicated class string
 *
 * @example
 * ```tsx
 * // Conflicting classes - last wins
 * cn('px-4 py-2', 'px-6') // → 'py-2 px-6'
 *
 * // Conditional classes
 * cn('btn', isActive && 'btn-active', error && 'btn-error')
 *
 * // In components
 * <div className={cn('base-class', className, variant === 'primary' && 'primary-class')} />
 * ```
 *
 * @see {@link https://github.com/dcastil/tailwind-merge} - tailwind-merge docs
 * @see {@link https://github.com/lukeed/clsx} - clsx docs
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format date to localized string.
 *
 * Uses Intl.DateTimeFormat for proper i18n support.
 * Defaults to Polish locale (pl-PL).
 *
 * @param {Date | string} date - Date object or ISO string
 * @param {string} [locale='pl-PL'] - BCP 47 language tag
 * @returns {string} Formatted date (e.g., "21 października 2025")
 *
 * @example
 * ```tsx
 * formatDate(new Date('2025-10-21'))              // → '21 października 2025'
 * formatDate('2025-10-21', 'en-US')               // → 'October 21, 2025'
 * formatDate(new Date(), 'en-GB')                 // → '21 October 2025'
 * ```
 */
export function formatDate(date: Date | string, locale: string = 'pl-PL'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

/**
 * Format number as currency with localized symbols.
 *
 * Uses Intl.NumberFormat for proper currency formatting.
 * Defaults to PLN (Polish złoty) with no decimal places.
 *
 * @param {number} amount - Amount to format
 * @param {string} [locale='pl-PL'] - BCP 47 language tag
 * @returns {string} Formatted currency (e.g., "1 299 zł")
 *
 * @example
 * ```tsx
 * formatCurrency(1299)                  // → '1 299 zł'
 * formatCurrency(1299.50)               // → '1 300 zł' (rounded)
 * formatCurrency(1299.50, 'en-US')      // → 'PLN 1,300'
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat} - Intl.NumberFormat docs
 */
export function formatCurrency(amount: number, locale: string = 'pl-PL'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
  }).format(amount)
}
