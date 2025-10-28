'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

/**
 * HowItWorksSection Component
 *
 * Displays 4-step process timeline with scattered zig-zag layout.
 * Features organic "paper stack" aesthetic with rotated cards and curved arrows.
 *
 * Layout:
 * - Desktop: Zig-zag (left-right-left-right) with rotations
 * - Mobile: Vertical stack with zero rotation
 * - Dotted timeline line in background
 * - Callout box between steps 2-3
 *
 * Steps:
 * 1. Bezpłatna Konsultacja (20 min, zero zobowiązań)
 * 2. Propozycja i Umowa (48h od konsultacji)
 * 3. Wdrożenie Systemu (od 7 dni)
 * 4. Wsparcie 24/7 (długoterminowa współpraca)
 *
 * Design:
 * - Scattered style: rotacje -2° do +2°, różne cienie
 * - Zig-zag structure: timeline clarity
 * - Zakrzywione strzałki SVG (pear color)
 * - Dotted timeline line (background, subtle)
 * - Hover: lift up, scale 1.03, stronger shadow
 *
 * @returns {JSX.Element} Process timeline section
 */
export function HowItWorksSection(): React.ReactElement {
  const t = useTranslations('howItWorks')
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index)
  }

  const steps = [
    {
      id: 'step1',
      position: 'left',
      rotation: -2,
      shadow: 'medium',
    },
    {
      id: 'step2',
      position: 'right',
      rotation: 1.5,
      shadow: 'light',
    },
    {
      id: 'step3',
      position: 'left',
      rotation: -1,
      shadow: 'strong',
    },
    {
      id: 'step4',
      position: 'right',
      rotation: 0.5,
      shadow: 'medium',
    },
  ]

  const shadowClasses = {
    light: 'shadow-lg shadow-black/35',
    medium: 'shadow-xl shadow-black/45',
    strong: 'shadow-2xl shadow-black/60',
  }

  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-32 bg-night overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-pear/5 to-night pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('headline')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            {t('subheadline')}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Dotted Timeline Line (background) */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full opacity-30 hidden md:block"
            style={{
              background: `repeating-linear-gradient(
                to bottom,
                #DDE000 0px,
                #DDE000 10px,
                transparent 10px,
                transparent 20px
              )`,
            }}
          />

          {/* Steps */}
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => {
              const stepData = t.raw(step.id) as {
                title: string
                subtitle: string
                icon: string
                items: string[]
                timeline: string
              }

              return (
                <div key={step.id}>
                  {/* Step Card */}
                  <motion.div
                    className={`
                      relative w-full md:w-[480px] p-8 md:p-10
                      bg-night border-2 border-pear/20 rounded-xl
                      ${shadowClasses[step.shadow as keyof typeof shadowClasses]}
                      transition-all duration-300 hover:border-pear hover:shadow-2xl hover:shadow-pear/30
                      ${step.position === 'left' ? 'md:mr-auto' : 'md:ml-auto'}
                      ${expandedStep === index ? 'border-pear' : ''}
                      cursor-pointer
                    `}
                    style={{
                      transform: `rotate(${step.rotation}deg)`,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.03,
                      rotate: 0,
                      translateY: -8,
                    }}
                    onClick={() => toggleStep(index)}
                  >
                    {/* Title & Subtitle with Icon */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                          <span className="text-4xl">{stepData.icon}</span>
                          {stepData.title}
                        </h3>
                        <p className="text-sm text-pear font-semibold">
                          {stepData.subtitle}
                        </p>
                      </div>
                      {/* Expand/Collapse Icon */}
                      <motion.div
                        className="text-pear text-2xl mt-2 flex-shrink-0"
                        animate={{ rotate: expandedStep === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.div>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedStep === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {/* Items List */}
                          <ul className="space-y-3 mt-6 mb-6">
                            {stepData.items.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm md:text-base text-white/90"
                              >
                                <span className="text-pear mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Timeline */}
                          <div className="pt-4 border-t border-pear/20">
                            <p className="text-xs uppercase tracking-wide text-pear/70 mb-1">
                              Termin
                            </p>
                            <p className="text-sm font-semibold text-white">
                              {stepData.timeline}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Curved Arrow (between steps, not after last) */}
                  {index < steps.length - 1 && (
                    <div className="relative h-12 md:h-16 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 md:w-16 md:h-16"
                        viewBox="0 0 100 110"
                        fill="none"
                        style={{ overflow: 'visible' }}
                      >
                        <defs>
                          <marker
                            id={`arrowhead-${index}`}
                            markerWidth="10"
                            markerHeight="10"
                            refX="5"
                            refY="5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 5, 0 10"
                              fill="#DDE000"
                            />
                          </marker>
                        </defs>
                        <motion.path
                          d={
                            step.position === 'left'
                              ? 'M 30 5 Q 60 20, 70 90' // Left to right (adjusted endpoint)
                              : 'M 70 5 Q 40 20, 30 90' // Right to left (adjusted endpoint)
                          }
                          stroke="#DDE000"
                          strokeWidth="2"
                          strokeDasharray="6 6"
                          markerEnd={`url(#arrowhead-${index})`}
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                        />
                      </svg>
                    </div>
                  )}

                  {/* Callout Box (after step 2) */}
                  {index === 1 && (
                    <motion.div
                      className="relative w-full max-w-3xl mx-auto my-12 md:my-16 p-6 md:p-8
                        bg-tekhelet rounded-xl border-2 border-tekhelet/50
                        shadow-2xl shadow-tekhelet/30 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Title with Icon */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <span className="text-3xl md:text-4xl">{t('callout.icon')}</span>
                        {t('callout.title')}
                      </h3>

                      {/* Description */}
                      <p className="text-base md:text-lg text-white/90 mb-3 leading-relaxed">
                        {t('callout.description')}
                      </p>

                      {/* Highlight */}
                      <p className="text-base md:text-lg font-semibold text-pear">
                        {t('callout.highlight')}
                      </p>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
