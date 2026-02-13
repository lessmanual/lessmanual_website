'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Megaphone, Cloud, Briefcase } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Personas Section
 *
 * Shows 4 ideal client personas in a responsive grid.
 * Each card has an icon, title, and description.
 *
 * Design:
 * - 2x2 grid (1 col mobile, 2 col tablet, 4 col desktop)
 * - Glass-morphism cards with hover border effect
 * - Lucide icons for each persona type
 * - Stagger animation on scroll
 *
 * @returns {React.ReactElement} Personas section
 */

const personas = [
  {
    icon: Code2,
    title: 'Software Houses',
    description:
      'Szukacie klientów na development, team augmentation lub dedykowane projekty. AI SDR dociera do CTO i VP Engineering w firmach, które potrzebują dodatkowych rąk do kodu.',
  },
  {
    icon: Megaphone,
    title: 'Agencje Marketingowe / Digital',
    description:
      'Sprzedajecie SEO, performance, social media lub branding. AI SDR umawia spotkania z CMO i Marketing Managerami, którzy szukają nowej agencji.',
  },
  {
    icon: Cloud,
    title: 'Firmy SaaS',
    description:
      'Macie produkt, potrzebujecie demo. AI SDR buduje lejek do osób decyzyjnych w firmach, które pasują do Waszego ICP. Od pierwszego maila do zarezerwowanego demo.',
  },
  {
    icon: Briefcase,
    title: 'Firmy B2B Usługowe',
    description:
      'Konsulting, doradztwo, usługi IT, szkolenia. AI SDR generuje spotkania z osobami decyzyjnymi, które mają budżet i potrzebę - a nie tylko ciekawość.',
  },
]

export function AiSdrPersonasSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="personas"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="personas-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-tekhelet/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-pear/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Heading */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2
              id="personas-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Działa najlepiej{' '}
              <span className="text-pear">dla</span>
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {personas.map((persona, index) => {
              const Icon = persona.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-pear/50 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-pear/10 mb-5">
                    <Icon className="w-6 h-6 text-pear" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {persona.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 leading-relaxed">
                    {persona.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
