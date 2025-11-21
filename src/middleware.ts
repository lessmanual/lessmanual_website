import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Only add locale prefix for non-default locale (pl = no prefix, en = /en prefix)
  localePrefix: 'as-needed',
})

export const config = {
  // Match all pathnames except for api routes, Next.js internals, and static files
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ],
}
