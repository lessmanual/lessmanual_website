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
}

/**
 * Interactive Robot Spline Component
 *
 * Deferred-loading 3D Spline viewer for interactive robot animation.
 * Used in Hero section. Watermark visible (Free plan compliance).
 *
 * Features:
 * - Deferred loading (1.5s delay) to prioritize LCP text rendering
 * - Lazy loads Spline library (code splitting)
 * - React Suspense with static preview image fallback
 * - Responsive container with custom styling
 * - Static robot preview (26KB WebP) shown first for fast render
 * - Spline watermark visible (license compliance)
 *
 * Performance Optimization (CRITICAL #1.2):
 * - Delays Spline chunk (1.9MB) loading by 1.5s
 * - Prevents Spline from blocking React hydration of LCP text
 * - Shows static preview instantly, 3D loads as progressive enhancement
 * - Reduces TBT (Total Blocking Time) on mobile
 * - Expected impact: LCP text renders in <1s instead of 20s
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
 * @returns {React.ReactElement} Spline 3D viewer with deferred loading
 *
 * @see {@link https://spline.design} - Spline 3D design tool
 * @see {@link https://www.npmjs.com/package/@splinetool/react-spline} - Spline React package
 */
export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps): React.ReactElement {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Smart loading: Load Spline when browser is idle AND component is visible
    // This prevents blocking LCP while maintaining good UX (no visible delay)

    const loadSplineWhenReady = () => {
      // Use requestIdleCallback to load during browser idle time
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setShouldLoadSpline(true)
        }, { timeout: 2000 }) // Fallback after 2s if never idle
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => setShouldLoadSpline(true), 100)
      }
    }

    // Check if component is in viewport before loading
    if (containerRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadSplineWhenReady()
            observer.disconnect()
          }
        },
        { threshold: 0.1 } // Load when 10% visible
      )
      observer.observe(containerRef.current)
      return () => observer.disconnect()
    } else {
      // Fallback if no IntersectionObserver
      loadSplineWhenReady()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full spline-robot-wrapper"
      role="img"
      aria-label="Interactive 3D robot animation"
    >
      {!shouldLoadSpline ? (
        // Show static preview until Spline is ready to load
        <div className={`relative w-full h-full ${className || ''}`}>
          <Image
            src="/images/robot-preview.webp"
            alt="Interactive 3D Robot"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className={`relative w-full h-full ${className || ''}`}>
              <Image
                src="/images/robot-preview.webp"
                alt="Loading 3D Robot"
                fill
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
      )}
    </div>
  )
}
