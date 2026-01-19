import { getTranslations } from 'next-intl/server'

/**
 * FAQ Layout - Adds FAQPage Schema for SEO
 *
 * This layout wraps the FAQ page and injects FAQPage JSON-LD schema
 * for better visibility in Google Search and AI search engines.
 */
export default async function FAQLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}): Promise<React.ReactElement> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })

  // All 30 FAQ questions
  const questionIds = [
    'q1', 'q2', 'q3', 'q4', 'q5',      // Top 5
    'q6', 'q7', 'q8', 'q9', 'q10',     // Business
    'q11', 'q12', 'q13', 'q14', 'q15', 'q16', // Marketing
    'q17', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23', // Sales
    'q24', 'q25', 'q26', 'q27', 'q28', // Tech
    'q29', 'q30',                       // Compliance
  ]

  // Build FAQ schema items
  const faqItems = questionIds.map((qId) => ({
    '@type': 'Question',
    name: t(`questions.${qId}.question`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`questions.${qId}.answer`),
    },
  }))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems,
  }

  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'pl' ? 'Strona główna' : 'Home',
        item: `https://www.lessmanual.ai/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: `https://www.lessmanual.ai/${locale}/faq`,
      },
    ],
  }

  return (
    <>
      {/* Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* FAQPage Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
