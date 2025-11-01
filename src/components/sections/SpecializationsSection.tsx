'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SpecializationCard } from '@/components/ui/SpecializationCard'

/**
 * SpecializationsSection Component
 *
 * Displays LessManual's 6 AI specializations with alternating image-text layout.
 *
 * Structure:
 * - Section headline and subheadline
 * - 6 specializations in alternating layout:
 *   1. Customer Support (image left)
 *   2. Content Creation (image right)
 *   3. Sales Automation (image left)
 *   4. Knowledge Assistant (image right)
 *   5. Voice Agent (image left)
 *   6. Custom Solutions (image right)
 *
 * Features:
 * - Alternating image position (left/right)
 * - Responsive (stacks vertically on mobile)
 * - Animations on scroll
 * - Dividers between items
 * - Full content with applications and compliance
 *
 * Design:
 * - Pear accent color
 * - Night background
 * - White text (#fefefe)
 * - Large spacing between items
 *
 * @returns {React.ReactElement} Specializations section with alternating layout
 */
export function SpecializationsSection(): React.ReactElement {
  const t = useTranslations('specializations')

  // Compliance items (same for all specializations)
  const compliance = [
    t('compliance.aiAct'),
    t('compliance.rodo'),
    t('compliance.dataLocation'),
    t('compliance.encryption'),
  ]

  const specializations = [
    {
      title: t('customerSupport.title'),
      subtitle: t('customerSupport.subtitle'),
      outcome: t('customerSupport.outcome'),
      description: t('customerSupport.description'),
      applications: t('customerSupport.applications'),
      cta: t('customerSupport.cta'),
      image: '/images/specializations/chatbot.webp',
    },
    {
      title: t('contentCreation.title'),
      subtitle: t('contentCreation.subtitle'),
      outcome: t('contentCreation.outcome'),
      description: t('contentCreation.description'),
      applications: t('contentCreation.applications'),
      cta: t('contentCreation.cta'),
      image: '/images/specializations/content-agent.webp',
    },
    {
      title: t('salesAutomation.title'),
      subtitle: t('salesAutomation.subtitle'),
      outcome: t('salesAutomation.outcome'),
      description: t('salesAutomation.description'),
      applications: t('salesAutomation.applications'),
      cta: t('salesAutomation.cta'),
      image: '/images/specializations/sales-automation.webp',
    },
    {
      title: t('knowledgeAssistant.title'),
      subtitle: t('knowledgeAssistant.subtitle'),
      outcome: t('knowledgeAssistant.outcome'),
      description: t('knowledgeAssistant.description'),
      applications: t('knowledgeAssistant.applications'),
      cta: t('knowledgeAssistant.cta'),
      image: '/images/specializations/rag-chatbot.webp',
    },
    {
      title: t('voiceAgent.title'),
      subtitle: t('voiceAgent.subtitle'),
      outcome: t('voiceAgent.outcome'),
      description: t('voiceAgent.description'),
      applications: t('voiceAgent.applications'),
      cta: t('voiceAgent.cta'),
      image: '/images/specializations/voice-agent.webp',
    },
    {
      title: t('customSolutions.title'),
      subtitle: t('customSolutions.subtitle'),
      outcome: t('customSolutions.outcome'),
      description: t('customSolutions.description'),
      applications: t('customSolutions.applications'),
      cta: t('customSolutions.cta'),
      image: '/images/specializations/custom.webp',
    },
  ]

  return (
    <section
      id="specializations"
      className="relative py-20 md:py-32 bg-night overflow-hidden"
    >
      {/* Background gradient accent */}
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#fefefe' }}>
            {t('headline')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            {t('subheadline')}
          </p>
        </motion.div>

        {/* Specializations List */}
        <div className="space-y-24 md:space-y-32">
          {specializations.map((spec, index) => (
            <div key={spec.title}>
              <SpecializationCard
                title={spec.title}
                subtitle={spec.subtitle}
                outcome={spec.outcome}
                description={spec.description}
                applications={spec.applications}
                compliance={compliance}
                cta={spec.cta}
                image={spec.image}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
              />

              {/* Divider (except after last item) */}
              {index < specializations.length - 1 && (
                <motion.div
                  className="mt-24 md:mt-32 h-px bg-gradient-to-r from-transparent via-pear/30 to-transparent"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
