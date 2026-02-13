'use client'

import React, { useRef, useState, useEffect } from 'react'

/**
 * AI SDR Hero Section
 *
 * Full-screen hero with animated gradient mesh, floating geometric shapes,
 * parallax scroll, staggered text reveal, and count-up proof point numbers.
 *
 * Performance:
 * - CSS animations for mount (not Framer Motion) for best LCP
 * - Passive scroll listener for parallax
 * - requestAnimationFrame for count-up
 *
 * @returns {React.ReactElement} AI SDR hero section
 */

function useCountUp(target: number, duration: number = 2000, start: boolean = true): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number | null = null
    let animationId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [target, duration, start])

  return value
}

export function AiSdrHeroSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const countOpenRate = useCountUp(73, 2000, mounted)
  const countMeetings = useCountUp(12, 2000, mounted)
  const countDays = useCountUp(6, 2000, mounted)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
        setScrollY(progress)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxY = scrollY * 50
  const parallaxOpacity = Math.max(0, 1 - scrollY * 2)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-night overflow-hidden"
    >
      {/* CSS Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-20px); opacity: 0.7; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-15px); opacity: 0.6; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-25px); opacity: 0.8; }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-18px) rotate(10deg); opacity: 0.6; }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.35; }
          50% { transform: translateY(-22px) rotate(-8deg); opacity: 0.65; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up-1 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.2s forwards;
        }
        .animate-fade-in-up-2 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.4s forwards;
        }
        .animate-fade-in-up-3 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.6s forwards;
        }
        .animate-fade-in-up-4 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.8s forwards;
        }
        .animate-fade-in-up-5 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 1.0s forwards;
        }
        .animate-fade-in-up-6 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 1.2s forwards;
        }
      `}} />

      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(221, 224, 0, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'gradient-shift 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(87, 22, 162, 0.5) 0%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'gradient-shift 15s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(221, 224, 0, 0.25) 0%, transparent 70%)',
            filter: 'blur(140px)',
            animation: 'gradient-shift 18s ease-in-out infinite 4s',
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Hexagon */}
        <svg
          className="absolute top-[15%] left-[10%] w-8 h-8 text-pear/30"
          style={{ animation: 'float-1 6s ease-in-out infinite' }}
          viewBox="0 0 24 24" fill="currentColor"
        >
          <path d="M12 2l9 5v10l-9 5-9-5V7z" />
        </svg>

        {/* Circle */}
        <svg
          className="absolute top-[25%] right-[15%] w-6 h-6 text-pear/20"
          style={{ animation: 'float-2 8s ease-in-out infinite 1s' }}
          viewBox="0 0 24 24" fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>

        {/* Diamond */}
        <svg
          className="absolute top-[60%] left-[8%] w-5 h-5 text-white/15"
          style={{ animation: 'float-3 7s ease-in-out infinite 0.5s' }}
          viewBox="0 0 24 24" fill="currentColor"
        >
          <path d="M12 2l10 10-10 10L2 12z" />
        </svg>

        {/* Small Hexagon */}
        <svg
          className="absolute top-[70%] right-[20%] w-4 h-4 text-pear/25"
          style={{ animation: 'float-4 9s ease-in-out infinite 2s' }}
          viewBox="0 0 24 24" fill="currentColor"
        >
          <path d="M12 2l9 5v10l-9 5-9-5V7z" />
        </svg>

        {/* Small Circle */}
        <svg
          className="absolute top-[40%] left-[85%] w-3 h-3 text-white/20"
          style={{ animation: 'float-5 5s ease-in-out infinite 3s' }}
          viewBox="0 0 24 24" fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>

        {/* Diamond top right */}
        <svg
          className="absolute top-[10%] right-[35%] w-5 h-5 text-pear/15"
          style={{ animation: 'float-2 10s ease-in-out infinite 1.5s' }}
          viewBox="0 0 24 24" fill="currentColor"
        >
          <path d="M12 2l10 10-10 10L2 12z" />
        </svg>
      </div>

      {/* Main Content with Parallax */}
      <div
        className={`relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center transition-opacity duration-500 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translateY(${parallaxY}%)`,
          opacity: parallaxOpacity,
        }}
      >
        {/* H1: Main headline */}
        <h1 className="animate-fade-in-up-1">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Spotkania z osobami decyzyjnymi.
          </span>
          <span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pear leading-tight mt-2"
            style={{
              textShadow: '0 0 60px rgba(221, 224, 0, 0.4), 0 0 120px rgba(221, 224, 0, 0.2)',
            }}
          >
            Płacisz tylko za wynik.
          </span>
        </h1>

        {/* H2: Subheadline */}
        <h2 className="animate-fade-in-up-2 mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          System AI, który umawia kwalifikowane spotkania B2B w Twoim kalendarzu. Zero stałych opłat miesięcznych.
        </h2>

        {/* Proof Point Badge */}
        <div className="animate-fade-in-up-3 mt-8 md:mt-10 inline-flex items-center gap-3 md:gap-4 bg-white/5 border border-pear/30 rounded-full px-6 py-3">
          <span className="text-pear font-bold text-lg md:text-xl">{countOpenRate}%</span>
          <span className="text-white/50">wskaźnik otwarć</span>
          <span className="text-white/20">|</span>
          <span className="text-pear font-bold text-lg md:text-xl">{countMeetings}</span>
          <span className="text-white/50 hidden sm:inline">spotkań z 463 maili</span>
          <span className="text-white/50 sm:hidden">spotkań</span>
          <span className="text-white/20">|</span>
          <span className="text-white/50">Deal w</span>
          <span className="text-pear font-bold text-lg md:text-xl">{countDays}</span>
          <span className="text-white/50">dni</span>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up-4 mt-8 md:mt-10">
          <a
            href="https://cal.com/bartłomiej-chudzik-2en6pt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pear text-night font-bold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-pear/30 hover:bg-pear/90 hover:shadow-pear/50 hover:scale-105 transition-all duration-300"
          >
            Umów bezpłatną konsultację
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Sub-CTA Text */}
        <p className="animate-fade-in-up-5 mt-4 text-sm text-white/50">
          15 minut. Bez zobowiązań.
        </p>
      </div>
    </section>
  )
}
