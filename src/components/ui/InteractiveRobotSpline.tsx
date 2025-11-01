'use client'

import { Suspense, lazy } from 'react'
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
 * - React Suspense for loading states
 * - Responsive container with custom styling
 * - Loading spinner with pear color (#DDE000)
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
          <div
            className={`w-full h-full flex items-center justify-center bg-night/40 text-white ${className || ''}`}
          >
            <svg
              className="animate-spin h-12 w-12 text-pear"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
              ></path>
            </svg>
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
