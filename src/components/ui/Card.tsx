import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  // Base styles - consistent across all variants
  'rounded-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-pear/30',
  {
    variants: {
      variant: {
        // Default: subtle border with tekhelet
        default:
          'bg-night/50 backdrop-blur-sm border border-tekhelet/20 hover:border-tekhelet/40',
        // Elevated: with shadow for prominence
        elevated:
          'bg-night/70 backdrop-blur-md border border-tekhelet/30 shadow-lg shadow-tekhelet/10 hover:shadow-xl hover:shadow-tekhelet/20',
        // Outline: strong border focus
        outline:
          'bg-transparent border-2 border-tekhelet hover:border-pear hover:bg-pear/5',
        // Glass: glassmorphism effect
        glass:
          'bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10',
        // Highlight: pear accent
        highlight:
          'bg-gradient-to-br from-pear/10 to-tekhelet/10 border border-pear/30 hover:border-pear/50',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Makes the entire card focusable (useful for clickable cards)
   */
  focusable?: boolean
}

/**
 * Card component with WCAG AAA accessibility
 *
 * Features:
 * - Multiple visual variants
 * - Tekhelet brand colors
 * - Hover and focus states
 * - Proper focus management
 * - Interactive states
 *
 * @example
 * ```tsx
 * <Card variant="elevated" padding="lg">
 *   <h3>Tytuł karty</h3>
 *   <p>Treść karty</p>
 * </Card>
 *
 * <Card variant="outline" interactive focusable onClick={handleClick}>
 *   Klikalna karta
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, interactive, focusable, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        tabIndex={focusable ? 0 : undefined}
        className={cn(cardVariants({ variant, padding, interactive, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/**
 * Card Header - for card titles and actions
 */
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))

CardHeader.displayName = 'CardHeader'

/**
 * Card Title - semantic h3 with proper styling
 */
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-bold leading-none tracking-tight', className)}
    {...props}
  />
))

CardTitle.displayName = 'CardTitle'

/**
 * Card Description - for subtitles and descriptions
 */
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-white/60', className)}
    {...props}
  />
))

CardDescription.displayName = 'CardDescription'

/**
 * Card Content - main content area with consistent padding
 */
export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
))

CardContent.displayName = 'CardContent'

/**
 * Card Footer - for actions and metadata
 */
export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6', className)}
    {...props}
  />
))

CardFooter.displayName = 'CardFooter'
