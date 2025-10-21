import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva(
  // Base styles
  'w-full rounded-lg border bg-night/50 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
  {
    variants: {
      variant: {
        default:
          'border-tekhelet/30 focus:border-pear focus:ring-pear/30 hover:border-tekhelet/50',
        error:
          'border-red-500 focus:border-red-500 focus:ring-red-500/30 hover:border-red-600',
        success:
          'border-green-500 focus:border-green-500 focus:ring-green-500/30 hover:border-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /**
   * Label for the textarea (required for accessibility)
   */
  label?: string
  /**
   * Error message to display
   */
  error?: string
  /**
   * Helper text to display below textarea
   */
  helperText?: string
  /**
   * Show character count
   */
  showCount?: boolean
  /**
   * Maximum character count (enforces maxLength)
   */
  maxCount?: number
}

/**
 * Textarea component with full WCAG AAA accessibility
 *
 * Features:
 * - Proper label association
 * - Error states with ARIA
 * - Helper text support
 * - Character counter
 * - Focus management
 * - Keyboard navigation
 * - Resizable
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Wiadomość"
 *   placeholder="Opisz swoje potrzeby..."
 *   rows={5}
 *   required
 * />
 *
 * <Textarea
 *   label="Komentarz"
 *   showCount
 *   maxCount={500}
 *   helperText="Maksymalnie 500 znaków"
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      label,
      error,
      helperText,
      showCount,
      maxCount,
      id,
      required,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${textareaId}-error` : undefined
    const helperId = helperText ? `${textareaId}-helper` : undefined

    // Character count
    const currentLength =
      typeof value === 'string' ? value.length : value?.toString().length || 0

    return (
      <div className="w-full">
        {/* Label and counter */}
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className="block text-sm font-medium text-white"
            >
              {label}
              {required && (
                <span className="ml-1 text-pear" aria-label="required">
                  *
                </span>
              )}
            </label>
          )}

          {showCount && maxCount && (
            <span
              className={cn(
                'text-sm',
                currentLength > maxCount ? 'text-red-500' : 'text-white/60'
              )}
              aria-live="polite"
              aria-atomic="true"
            >
              {currentLength}/{maxCount}
            </span>
          )}
        </div>

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            textareaVariants({ variant: error ? 'error' : variant }),
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(errorId, helperId)}
          maxLength={maxCount}
          required={required}
          value={value}
          onChange={onChange}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm text-red-500"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className="mt-2 text-sm text-white/60">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
