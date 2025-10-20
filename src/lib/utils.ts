import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to Polish locale
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
 * Format currency (PLN)
 */
export function formatCurrency(amount: number, locale: string = 'pl-PL'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
  }).format(amount)
}
