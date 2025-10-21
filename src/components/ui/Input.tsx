import { forwardRef, InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  // Base styles
  'w-full rounded-lg border bg-night/50 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
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
      inputSize: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Label for the input (required for accessibility)
   */
  label?: string
  /**
   * Error message to display
   */
  error?: string
  /**
   * Helper text to display below input
   */
  helperText?: string
  /**
   * Icon to display before input text
   */
  leftIcon?: React.ReactNode
  /**
   * Icon to display after input text
   */
  rightIcon?: React.ReactNode
}

/**
 * Input component with full WCAG AAA accessibility
 *
 * Features:
 * - Proper label association
 * - Error states with ARIA
 * - Helper text support
 * - Icon support
 * - Focus management
 * - Keyboard navigation
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="jan@example.com"
 *   required
 * />
 *
 * <Input
 *   label="Hasło"
 *   type="password"
 *   error="Hasło musi mieć min. 8 znaków"
 *   variant="error"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      required,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-white"
          >
            {label}
            {required && (
              <span className="ml-1 text-pear" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper (for icons) */}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: error ? 'error' : variant, inputSize }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(errorId, helperId)}
            required={required}
            {...props}
          />

          {rightIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
              {rightIcon}
            </div>
          )}
        </div>

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

Input.displayName = 'Input'
