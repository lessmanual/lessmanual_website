import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('hero')

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-5xl md:text-7xl font-bold">
          {t('headline')}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          {t('subheadline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-pear text-night px-8 py-4 rounded-lg font-semibold hover:bg-pear/90 transition-colors">
            {t('ctaPrimary')}
          </button>
          <button className="border-2 border-pear text-pear px-8 py-4 rounded-lg font-semibold hover:bg-pear/10 transition-colors">
            {t('ctaSecondary')}
          </button>
        </div>
      </div>
    </main>
  )
}
