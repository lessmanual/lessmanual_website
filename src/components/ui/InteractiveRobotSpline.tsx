'use client'

import { Suspense, lazy, useState, useEffect, useRef } from 'react'
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
  /**
   * Enable interactive 3D Spline loading (default: true for desktop)
   * Set to false for mobile to show only static image (performance optimization)
   */
  enableInteractive?: boolean
}

/**
 * Interactive Robot Spline Component
 *
 * Time-delayed 3D Spline viewer for interactive robot animation.
 * Used in Hero section. Watermark visible (Free plan compliance).
 *
 * Features:
 * - Conditional rendering: Desktop (3D) vs Mobile (static only)
 * - Time-delayed loading (3s) to prioritize LCP text rendering
 * - Lazy loads Spline library (code splitting)
 * - React Suspense with static preview image fallback
 * - Static robot preview (26KB WebP) shown first for fast render
 * - Spline watermark visible (license compliance)
 *
 * Performance Optimization (CRITICAL Task 1.1):
 * - Mobile: ZERO Spline load (only static 26KB image)
 * - Desktop: Delays Spline chunk (1.77MB) loading by 3 seconds
 * - Prevents Spline from blocking LCP (headline renders <1s)
 * - Shows static preview instantly, 3D loads as progressive enhancement
 * - Expected impact: LCP improves from 4170ms to <1500ms (mobile), <2000ms (desktop)
 *
 * License Compliance:
 * - Spline Free plan requires visible watermark
 * - To hide watermark: upgrade to Spline paid plan
 * - See: https://spline.design/pricing
 *
 * @example
 * ```tsx
 * // Mobile: static only
 * <InteractiveRobotSpline
 *   scene="https://prod.spline.design/3ktnK8grjpkv8aQt/scene.splinecode"
 *   className="w-full h-full"
 *   enableInteractive={false}
 * />
 *
 * // Desktop: 3s delay, then interactive 3D
 * <InteractiveRobotSpline
 *   scene="https://prod.spline.design/3ktnK8grjpkv8aQt/scene.splinecode"
 *   className="w-full h-full"
 *   enableInteractive={true}
 * />
 * ```
 *
 * @param {InteractiveRobotSplineProps} props - Component props
 * @returns {React.ReactElement} Spline 3D viewer with conditional/time-delayed loading
 *
 * @see {@link https://spline.design} - Spline 3D design tool
 * @see {@link https://www.npmjs.com/package/@splinetool/react-spline} - Spline React package
 */
export function InteractiveRobotSpline({
  scene,
  className,
  enableInteractive = true, // Default true for backward compatibility
}: InteractiveRobotSplineProps): React.ReactElement {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false)

  useEffect(() => {
    // Mobile: Don't load Spline at all (performance optimization)
    if (!enableInteractive) return

    // Desktop: Wait 3 seconds AFTER initial load
    // This gives time for LCP (headline) to render without blocking
    const delayTimer = setTimeout(() => {
      setShouldLoadSpline(true)
    }, 3000) // 3 seconds delay for desktop

    return () => clearTimeout(delayTimer)
  }, [enableInteractive])

  // Mobile: Show only static image (no 3D)
  if (!enableInteractive) {
    return (
      <div className={`relative w-full h-full ${className || ''}`}>
        <Image
          src="/images/robot-preview.webp"
          alt="3D Robot"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    )
  }

  // Desktop: Static → 3D after 3 seconds
  return (
    <div
      className="relative w-full h-full spline-robot-wrapper"
      role="img"
      aria-label="Interactive 3D robot animation"
    >
      {!shouldLoadSpline ? (
        // Show static preview for first 3 seconds (doesn't block LCP)
        <div className={`relative w-full h-full ${className || ''}`}>
          <Image
            src="/images/robot-preview.webp"
            alt="3D Robot (loading...)"
            fill
            priority
            className="object-contain"
            sizes="50vw"
          />
        </div>
      ) : (
        // After 3s: Load interactive 3D Spline
        <Suspense
          fallback={
            <div className={`relative w-full h-full ${className || ''}`}>
              <Image
                src="/images/robot-preview.webp"
                alt="Loading 3D Robot"
                fill
                className="object-contain animate-pulse"
                sizes="50vw"
              />
            </div>
          }
        >
          <div className={className || 'w-full h-full'}>
            <Spline scene={scene} />
          </div>
        </Suspense>
      )}
    </div>
  )
}
