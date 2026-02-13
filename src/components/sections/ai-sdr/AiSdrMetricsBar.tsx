'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * AI SDR Metrics Bar
 *
 * Social proof metrics bar with count-up animations triggered when in view.
 * Displays 4 key campaign metrics with pear-colored numbers.
 *
 * @returns {React.ReactElement} Metrics bar section
 */

function useCountUp(target: number, duration: number = 2000, start: boolean = false): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) {
      setValue(0)
      return
    }

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

interface Metric {
  value: number
  suffix: string
  prefix?: string
  label: string
  subtitle: string
}

const METRICS: Metric[] = [
  {
    value: 73,
    suffix: '%',
    label: 'Wskaźnik otwarć',
    subtitle: 'Średnia rynkowa: 20-30%',
  },
  {
    value: 63,
    suffix: '%',
    label: 'Wskaźnik odpowiedzi',
    subtitle: 'Ponad połowa = zainteresowani',
  },
  {
    value: 40000,
    suffix: ' PLN',
    prefix: '~',
    label: 'Wartość lejka',
    subtitle: 'Z kampanii ukończonej w 32%',
  },
  {
    value: 6,
    suffix: ' dni',
    label: 'Do pierwszego deala',
    subtitle: 'Od cold maila do umowy',
  },
]

export function AiSdrMetricsBar(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })

  const count1 = useCountUp(73, 2000, isInView)
  const count2 = useCountUp(63, 2000, isInView)
  const count3 = useCountUp(40000, 2500, isInView)
  const count4 = useCountUp(6, 1500, isInView)

  const counts = [count1, count2, count3, count4]

  return (
    <section
      ref={containerRef}
      className="relative bg-white/5 border-y border-white/10 py-8"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-pear">
                {metric.prefix || ''}{counts[index].toLocaleString('pl-PL')}{metric.suffix}
              </div>
              <div className="text-white font-semibold mt-2 text-sm md:text-base">
                {metric.label}
              </div>
              <div className="text-white/50 text-xs md:text-sm mt-1">
                {metric.subtitle}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
