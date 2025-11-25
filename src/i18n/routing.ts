import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './config'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Only add locale prefix for non-default locale (pl = no prefix, en = /en prefix)
  localePrefix: 'as-needed',
})
