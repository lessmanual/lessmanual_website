'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeInUp } from '@/lib/animations'

export function PSSection(): React.ReactElement {
  const t = useTranslations('ps')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })

  return (
    <section
      ref={containerRef}
      className="relative bg-night py-12 lg:py-16"
    >
      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            {/* PS marker */}
            <span className="text-pear font-bold text-lg shrink-0">P.S.</span>

            {/* Message */}
            <div className="space-y-3">
              <p className="text-white/80 leading-relaxed">
                {t('message')}
              </p>
              <p className="text-white/60 text-sm italic">
                — {t('signature')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
