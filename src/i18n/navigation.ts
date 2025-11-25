import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/**
 * next-intl Navigation Utilities
 *
 * These exports provide locale-aware navigation that automatically handles
 * the localePrefix: 'as-needed' configuration.
 *
 * - Link: Drop-in replacement for next/link that adds locale prefix automatically
 * - useRouter: Router with locale parameter support
 * - usePathname: Get pathname without locale prefix
 * - redirect: Server-side redirect with locale support
 * - getPathname: Get localized pathname
 *
 * Usage:
 * ```tsx
 * import { Link, useRouter } from '@/i18n/navigation'
 *
 * // Links automatically include locale prefix when needed
 * <Link href="/blog">Blog</Link>
 * // Renders: /blog (pl), /en/blog (en)
 *
 * // Language switching
 * const router = useRouter()
 * router.replace({pathname, params}, {locale: 'en'})
 * ```
 *
 * @see {@link https://next-intl.dev/docs/routing/navigation}
 */
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
