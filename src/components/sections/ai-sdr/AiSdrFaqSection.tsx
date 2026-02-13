'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * AI SDR FAQ Section
 *
 * Accordion FAQ with 10 questions.
 * Answers shortened per feedback — concise, no jargon.
 *
 * @returns {React.ReactElement} FAQ section
 */

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Ile trwa uruchomienie?',
    answer: '3 tygodnie. Tydzień 1: research + budowa list. Tydzień 2: rozgrzewanie domen. Tydzień 3: copywriting + start kampanii.',
  },
  {
    question: 'Kiedy pierwsze spotkania?',
    answer: 'Tydzień 3–4 po starcie. Odpowiedzi przychodzią w ciągu 1–3 dni od wysłania maili. W naszej ostatniej kampanii pierwszy deal został zamknięty w 6 dni.',
  },
  {
    question: 'Co jeśli lead nie pasuje?',
    answer: 'Nie płacisz. Kwalifikowane spotkanie = osoba decyzyjna, firma z Twojego ICP, zainteresowanie, min. 15 minut rozmowy. Nie spełnia kryteriów = nie płacisz.',
  },
  {
    question: 'Co jeśli no-show?',
    answer: 'Umawiamy ponownie. No-show to ok. 15–25% branżowo. Wysyłamy follow-up i proponujemy nowy termin. No-show nie liczy się jako spotkanie — nie płacisz.',
  },
  {
    question: 'Mogę zobaczyć treści maili?',
    answer: 'Tak. Cała sekwencja do akceptacji przed startem. Możesz zmieniać, poprawiać, dodawać. Nic nie wychodzi bez Twojej zgody.',
  },
  {
    question: 'A co z RODO?',
    answer: 'B2B outreach na firmowe adresy, uzasadniony interes prawny (Art. 6.1.f RODO). Każdy mail ma opcję rezygnacji. Standardowa praktyka B2B w całej Europie.',
  },
  {
    question: 'Ile spotkań mogę oczekiwać?',
    answer: 'STARTER: 3–10/mies. GROWTH: 5–15/mies. SCALE: 10–25/mies. Zależy od branży i ICP. W naszej kampanii: 12 szans sprzedażowych z 463 maili (kampania ukończona w 32%).',
  },
  {
    question: 'Czy maile nie trafią do spamu?',
    answer: 'Nie. Dedykowane domeny (nie Twoja główna), rozgrzewanie 14 dni, AI personalizacja, limity wysyłek. Nasz wskaźnik otwarć 73% potwierdza — maile trafiają do inbox.',
  },
  {
    question: 'Jaka różnica vs agencja lead gen?',
    answer: '0 PLN miesięcznego retainera. Agencje pobierają 5–15k PLN/mies stale. U nas: jednorazowe uruchomienie + płatność za spotkania. Bez umowy na 6–12 miesięcy.',
  },
  {
    question: 'Co po 3 miesiącach?',
    answer: 'Miesiąc do miesiąca. Brak umowy na czas określony. System przynosi spotkania — kontynuujesz. Nie przynosi — kończysz. Nasz interes jest zbieżny z Twoim.',
  },
]

export function AiSdrFaqSection(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // FAQPage structured data for SEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="faq-heading"
    >
      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(to_right,#DDE000_1px,transparent_1px),linear-gradient(to_bottom,#DDE000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pytania które dostaję najczęściej
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isActive = activeIndex === index

            return (
              <motion.article
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div
                  className={`
                    relative overflow-hidden rounded-xl border transition-all duration-300
                    ${isActive
                      ? 'border-pear bg-night/50 shadow-lg shadow-pear/10'
                      : 'border-white/10 bg-night/30 hover:border-pear/50'
                    }
                  `}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-white pr-4 group-hover:text-pear transition-colors">
                      {item.question}
                    </h3>
                    <div
                      className={`
                        flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                        transition-all duration-300
                        ${isActive
                          ? 'bg-pear text-night rotate-180'
                          : 'bg-white/10 text-white group-hover:bg-pear/20'
                        }
                      `}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2">
                          <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
