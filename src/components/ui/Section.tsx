import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: 'py-0',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-24',
      xl: 'py-24 md:py-32',
    },
    container: {
      true: 'container mx-auto px-4 sm:px-6 lg:px-8',
      false: '',
    },
    background: {
      transparent: 'bg-transparent',
      night: 'bg-night',
      'night-gradient':
        'bg-gradient-to-b from-night to-night/80',
      tekhelet:
        'bg-gradient-to-br from-tekhelet/10 to-tekhelet/5',
      pear: 'bg-gradient-to-br from-pear/5 to-transparent',
    },
  },
  defaultVariants: {
    spacing: 'lg',
    container: true,
    background: 'transparent',
  },
})

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Semantic HTML element to use
   */
  as?: 'section' | 'div' | 'article' | 'aside' | 'main'
}

/**
 * Section component for consistent spacing and layout
 *
 * Features:
 * - Consistent vertical spacing using design tokens
 * - Container management
 * - Background variants
 * - Semantic HTML support
 * - Responsive padding
 *
 * @example
 * ```tsx
 * <Section spacing="lg" container>
 *   <h2>Tytuł sekcji</h2>
 *   <p>Treść sekcji</p>
 * </Section>
 *
 * <Section
 *   as="article"
 *   spacing="xl"
 *   background="night-gradient"
 * >
 *   Treść artykułu
 * </Section>
 * ```
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { className, spacing, container, background, as: Component = 'section', children, ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(sectionVariants({ spacing, container, background, className }))}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Section.displayName = 'Section'

/**
 * Section Header - for section titles and descriptions
 */
export const SectionHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { centered?: boolean }
>(({ className, centered, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mb-12 md:mb-16 space-y-4',
      centered && 'text-center mx-auto max-w-3xl',
      className
    )}
    {...props}
  />
))

SectionHeader.displayName = 'SectionHeader'

/**
 * Section Title - semantic h2 with proper styling
 */
export const SectionTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
      className
    )}
    {...props}
  />
))

SectionTitle.displayName = 'SectionTitle'

/**
 * Section Subtitle - for section descriptions
 */
export const SectionSubtitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-lg md:text-xl text-white/70', className)}
    {...props}
  />
))

SectionSubtitle.displayName = 'SectionSubtitle'

/**
 * Section Content - main content area
 */
export const SectionContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-8', className)} {...props} />
))

SectionContent.displayName = 'SectionContent'
