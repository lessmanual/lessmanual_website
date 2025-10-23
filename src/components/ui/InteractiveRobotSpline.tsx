'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'
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
 * Lazy-loaded 3D Spline viewer with automatic watermark removal.
 * Used in Hero section for interactive robot animation.
 *
 * Features:
 * - Lazy loads Spline library (code splitting)
 * - React Suspense for loading states
 * - Automatic watermark removal (multiple attempts)
 * - Responsive container with custom styling
 * - Loading spinner with pear color (#DDE000)
 *
 * Performance:
 * - Lazy imports Spline library (reduces initial bundle)
 * - Only loads when component renders
 * - Suspense fallback prevents layout shift
 *
 * Watermark Removal:
 * - Tries multiple selectors to find Spline watermark
 * - Runs at intervals (100ms, 500ms, 1s, 2s, 3s)
 * - Handles dynamically added watermarks
 * - Cleans up timeouts on unmount
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
 * @returns {JSX.Element} Spline 3D viewer with loading state
 *
 * @see {@link https://spline.design} - Spline 3D design tool
 * @see {@link https://www.npmjs.com/package/@splinetool/react-spline} - Spline React package
 */
export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Remove watermark after component loads
    const removeWatermark = () => {
      if (containerRef.current) {
        // Try multiple selectors to find and remove watermark
        const selectors = [
          'a[href*="spline.design"]',
          '[data-spline-watermark]',
          '#spline-watermark',
          '.spline-watermark',
        ]

        selectors.forEach((selector) => {
          const elements = containerRef.current?.querySelectorAll(selector)
          elements?.forEach((el) => {
            ;(el as HTMLElement).style.display = 'none'
            el.remove()
          })
        })
      }
    }

    // Run multiple times to catch dynamically added watermarks
    const intervals = [100, 500, 1000, 2000, 3000]
    const timeouts = intervals.map((delay) =>
      setTimeout(removeWatermark, delay)
    )

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full spline-robot-wrapper"
    >
      <Suspense
        fallback={
          <div
            className={`w-full h-full flex items-center justify-center bg-night/40 text-white ${className}`}
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
        <div className={className}>
          <Spline scene={scene} />
        </div>
      </Suspense>
    </div>
  )
}
