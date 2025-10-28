'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * SpecializationCard Component
 *
 * Displays a single specialization with image and text side-by-side.
 * Layout alternates between image-left/text-right and text-left/image-right.
 *
 * Features:
 * - Responsive two-column layout
 * - Image on left or right (alternating)
 * - Title, subtitle, outcome, description, applications, compliance
 * - Hover animations on image
 * - Mobile: stacked vertically (image on top)
 *
 * @param title - Product title
 * @param subtitle - Product subtitle
 * @param outcome - Value proposition headline (no quotes)
 * @param description - Product description
 * @param applications - Example use cases
 * @param compliance - Array of 4 compliance items
 * @param cta - Call-to-action button text
 * @param image - Path to product image
 * @param imagePosition - 'left' or 'right'
 */
interface SpecializationCardProps {
  title: string
  subtitle: string
  outcome: string
  description: string
  applications: string
  compliance: string[]
  cta: string
  image: string
  imagePosition: 'left' | 'right'
}

export function SpecializationCard({
  title,
  subtitle,
  outcome,
  description,
  applications,
  compliance,
  cta,
  image,
  imagePosition,
}: SpecializationCardProps): React.ReactElement {
  const isImageLeft = imagePosition === 'left'

  return (
    <div
      className={`flex flex-col ${
        isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-8 md:gap-12 items-center`}
    >
      {/* Image Column */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: isImageLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-pear/20 group">
          <Image
            src={image}
            alt={title}
            width={1024}
            height={1024}
            className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>

      {/* Text Column */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Subtitle */}
        <p className="text-sm text-pear font-semibold tracking-wide uppercase mb-2">
          {subtitle}
        </p>

        {/* Title */}
        <h3
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: '#fefefe' }}
        >
          {title}
        </h3>

        {/* Outcome (no quotes) */}
        <p
          className="text-lg md:text-xl leading-relaxed font-semibold mb-6"
          style={{ color: '#fefefe' }}
        >
          {outcome}
        </p>

        {/* Description */}
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: '#fefefe' }}
        >
          {description}
        </p>

        {/* Applications */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-pear mb-3">
            PRZYKŁADOWE ZASTOSOWANIA:
          </p>
          <ul className="space-y-2">
            {applications.split('•').map((app, index) => {
              const trimmedApp = app.trim()
              if (!trimmedApp) return null
              return (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm leading-relaxed"
                  style={{ color: '#fefefe' }}
                >
                  <span className="text-pear mt-0.5">•</span>
                  <span>{trimmedApp}</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Compliance */}
        <div className="mb-8 p-4 rounded-lg bg-pear/5 border border-pear/20">
          <p className="text-sm font-semibold text-pear mb-3">ZGODNOŚĆ:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {compliance.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-pear text-lg">✅</span>
                <span className="text-sm" style={{ color: '#fefefe' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          className="px-8 py-4 bg-pear text-night font-semibold rounded-lg shadow-lg hover:shadow-pear/50 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cta}
        </motion.button>
      </motion.div>
    </div>
  )
}
