'use client'

import Spline from '@splinetool/react-spline'

/**
 * Props for InteractiveRobotSpline component
 */
interface InteractiveRobotSplineProps {
  /**
   * Spline scene URL (.splinecode file)
   * @example "https://prod.spline.design/3ktnK8grjpkv8aQt/scene.splinecode"
   */
  scene: string
  /**
   * Optional Tailwind CSS classes for styling
   */
  className?: string
}

/**
 * Interactive Robot Spline Component
 *
 * Simple wrapper for Spline 3D viewer.
 * Used in Hero section with next/dynamic for client-side only loading.
 *
 * Performance Optimization:
 * - Component loaded via next/dynamic with ssr: false
 * - Spline only loads on client-side (not during SSR)
 * - Lazy loading handled by Next.js dynamic import
 *
 * License Compliance:
 * - Spline Free plan requires visible watermark
 * - To hide watermark: upgrade to Spline paid plan
 * - See: https://spline.design/pricing
 *
 * @example
 * ```tsx
 * // In parent component (e.g., HeroSection.tsx):
 * import dynamic from 'next/dynamic'
 *
 * const InteractiveRobotSpline = dynamic(
 *   () => import('@/components/ui/InteractiveRobotSpline'),
 *   {
 *     ssr: false,
 *     loading: () => <div>Loading...</div>
 *   }
 * )
 *
 * // Usage:
 * <InteractiveRobotSpline
 *   scene="https://prod.spline.design/3ktnK8grjpkv8aQt/scene.splinecode"
 *   className="w-full h-full"
 * />
 * ```
 *
 * @param {InteractiveRobotSplineProps} props - Component props
 * @returns {React.ReactElement} Spline 3D viewer
 *
 * @see {@link https://spline.design} - Spline 3D design tool
 * @see {@link https://www.npmjs.com/package/@splinetool/react-spline} - Spline React package
 */
export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps): React.ReactElement {
  return (
    <div className={className || 'w-full h-full'}>
      <Spline scene={scene} />
    </div>
  )
}
