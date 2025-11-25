'use client'

import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

interface BackButtonProps {
  /** Custom label override */
  label?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Back Button Component
 *
 * Navigates user back to previous page in browser history.
 * Uses router.back() for proper history navigation.
 *
 * @example
 * ```tsx
 * <BackButton />
 * <BackButton label="Powrót do bloga" />
 * ```
 */
export function BackButton({ label, className = '' }: BackButtonProps): React.ReactElement {
  const router = useRouter()
  const t = useTranslations('common')

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to homepage if no history
      router.push('/')
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-sm text-white/60 hover:text-pear transition-colors duration-200 ${className}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {label || t('back', { default: 'Wróć' })}
    </button>
  )
}
