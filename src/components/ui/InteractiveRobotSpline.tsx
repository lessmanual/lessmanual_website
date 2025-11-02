'use client'

import { Suspense, lazy } from 'react'
import Image from 'next/image'
const Spline = lazy(() => import('@splinetool/react-spline'))

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
 * Lazy-loaded 3D Spline viewer for interactive robot animation.
 * Used in Hero section. Watermark visible (Free plan compliance).
 *
 * Features:
 * - Lazy loads Spline library (code splitting)
 * - React Suspense with static preview image fallback
 * - Responsive container with custom styling
 * - Static robot preview (26KB WebP) for fast LCP
 * - Spline watermark visible (license compliance)
 *
 * Performance:
 * - Lazy imports Spline library (reduces initial bundle)
 * - Only loads when component renders
 * - Suspense fallback prevents layout shift
 *
 * License Compliance:
 * - Spline Free plan requires visible watermark
 * - To hide watermark: upgrade to Spline paid plan
 * - See: https://spline.design/pricing
 *
 * @example
 * ```tsx
 * <InteractiveRobotSpline
 *   scene="https://prod.spline.design/3ktnK8grjpkv8aQt/scene.splinecode"
 *   className="w-full h-full"
 * />
 * ```
 *
 * @param {InteractiveRobotSplineProps} props - Component props
 * @returns {React.ReactElement} Spline 3D viewer with loading state
 *
 * @see {@link https://spline.design} - Spline 3D design tool
 * @see {@link https://www.npmjs.com/package/@splinetool/react-spline} - Spline React package
 */
export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps): React.ReactElement {
  return (
    <div
      className="relative w-full h-full spline-robot-wrapper"
      role="img"
      aria-label="Interactive 3D robot animation"
    >
      <Suspense
        fallback={
          <div className={`relative w-full h-full ${className || ''}`}>
            <Image
              src="/images/robot-preview.webp"
              alt="Loading 3D Robot"
              fill
              priority
              className="object-contain animate-pulse"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        }
      >
        <div className={className || 'w-full h-full'}>
          <Spline scene={scene} />
        </div>
      </Suspense>
    </div>
  )
}
