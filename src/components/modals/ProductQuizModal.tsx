'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { trackQuizCompleted } from '@/lib/analytics'

/**
 * Product Quiz Modal - "Pomóż mi wybrać"
 *
 * 3-step quiz that helps users select the right automation product:
 * 1. Industry selection (8 options)
 * 2. Main problem identification (6 options)
 * 3. Company size (4 options)
 *
 * Recommendation logic:
 * - Problem-first approach (most specific)
 * - Industry fallback (if problem doesn't match)
 * - Default to ChatBot if no match
 *
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback when modal closes
 * @param onComplete - Callback with recommended productId
 */

type ProductId = 'chatbot' | 'voiceAgent' | 'contentAgent' | 'salesAutomation' | 'ragChatbot' | 'custom'

interface QuizAnswers {
  industry: string
  problem: string
  companySize: string
}

interface ProductQuizModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (productId: ProductId) => void
}

export function ProductQuizModal({ isOpen, onClose, onComplete }: ProductQuizModalProps) {
  const t = useTranslations('productQuiz')
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({
    industry: '',
    problem: '',
    companySize: ''
  })

  // Reset quiz when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setAnswers({
        industry: '',
        problem: '',
        companySize: ''
      })
    }
  }, [isOpen])

  // ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleAnswer = (field: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    const recommendedProduct = recommendProduct(answers)

    // Track quiz completion
    trackQuizCompleted(
      recommendedProduct,
      answers.industry,
      answers.problem,
      answers.companySize
    )

    onComplete(recommendedProduct)
    onClose()
  }

  // Current step answer
  const getCurrentAnswer = () => {
    if (step === 1) return answers.industry
    if (step === 2) return answers.problem
    return answers.companySize
  }

  const isStepValid = () => {
    return getCurrentAnswer() !== ''
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="bg-night border-2 border-white/10 rounded-xl p-8 max-w-2xl w-full pointer-events-auto shadow-2xl"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Progress indicator */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      i <= step ? 'bg-pear' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Quiz content */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">
                      {t('question1.title')}
                    </h3>
                    <div className="space-y-3">
                      {INDUSTRY_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer('industry', option.value)}
                          className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all duration-200 ${
                            answers.industry === option.value
                              ? 'bg-pear/10 border-pear text-white'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{option.icon}</span>
                            <div>
                              <div className="font-semibold">{t(`question1.options.${option.value}.label`)}</div>
                              <div className="text-sm text-white/60">{t(`question1.options.${option.value}.description`)}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">
                      {t('question2.title')}
                    </h3>
                    <div className="space-y-3">
                      {PROBLEM_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer('problem', option.value)}
                          className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all duration-200 ${
                            answers.problem === option.value
                              ? 'bg-pear/10 border-pear text-white'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{option.icon}</span>
                            <div>
                              <div className="font-semibold">{t(`question2.options.${option.value}.label`)}</div>
                              <div className="text-sm text-white/60">{t(`question2.options.${option.value}.description`)}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">
                      {t('question3.title')}
                    </h3>
                    <div className="space-y-3">
                      {COMPANY_SIZE_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer('companySize', option.value)}
                          className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all duration-200 ${
                            answers.companySize === option.value
                              ? 'bg-pear/10 border-pear text-white'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{option.icon}</span>
                            <div>
                              <div className="font-semibold">{t(`question3.options.${option.value}.label`)}</div>
                              <div className="text-sm text-white/60">{t(`question3.options.${option.value}.description`)}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('navigation.back')}
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                      isStepValid()
                        ? 'bg-pear hover:bg-pear/90 text-night shadow-lg shadow-pear/30 hover:shadow-pear/50'
                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    {t('navigation.next')}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={!isStepValid()}
                    className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                      isStepValid()
                        ? 'bg-pear hover:bg-pear/90 text-night shadow-lg shadow-pear/30 hover:shadow-pear/50'
                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    {t('navigation.finish')} 🎯
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Quiz options data
const INDUSTRY_OPTIONS = [
  { value: 'ecommerce', icon: '🛒' },
  { value: 'medical', icon: '🏥' },
  { value: 'dealer', icon: '🚗' },
  { value: 'b2b', icon: '💼' },
  { value: 'agency', icon: '📱' },
  { value: 'accounting', icon: '📊' },
  { value: 'manufacturing', icon: '🏭' },
  { value: 'other', icon: '🔧' }
]

const PROBLEM_OPTIONS = [
  { value: 'repetitive_inquiries', icon: '💬' },
  { value: 'after_hours', icon: '🌙' },
  { value: 'social_media', icon: '📱' },
  { value: 'sales_pipeline', icon: '📈' },
  { value: 'documents', icon: '📄' },
  { value: 'custom_process', icon: '⚙️' }
]

const COMPANY_SIZE_OPTIONS = [
  { value: 'solo', icon: '👤' },
  { value: 'small', icon: '👥' },
  { value: 'medium', icon: '🏢' },
  { value: 'large', icon: '🏙️' }
]

/**
 * Recommendation logic
 *
 * Priority:
 * 1. Problem-first (most specific)
 * 2. Industry fallback
 * 3. Default to ChatBot
 */
function recommendProduct(answers: QuizAnswers): ProductId {
  // Problem-first logic (highest priority)
  if (answers.problem === 'repetitive_inquiries') {
    return 'chatbot'
  }

  if (answers.problem === 'after_hours') {
    return 'voiceAgent'
  }

  if (answers.problem === 'social_media') {
    return 'contentAgent'
  }

  if (answers.problem === 'sales_pipeline') {
    return 'salesAutomation'
  }

  if (answers.problem === 'documents') {
    return 'ragChatbot'
  }

  if (answers.problem === 'custom_process') {
    return 'custom'
  }

  // Industry fallback (secondary)
  if (answers.industry === 'ecommerce') return 'chatbot'
  if (answers.industry === 'medical') return 'voiceAgent'
  if (answers.industry === 'dealer') return 'voiceAgent'
  if (answers.industry === 'b2b') return 'salesAutomation'
  if (answers.industry === 'agency') return 'contentAgent'
  if (answers.industry === 'accounting') return 'ragChatbot'
  if (answers.industry === 'manufacturing') return 'custom'

  // Default fallback
  return 'chatbot'
}
