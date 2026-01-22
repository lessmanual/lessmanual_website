'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * Google Reviews Section - LessManual
 *
 * Displays hardcoded Google reviews with carousel functionality.
 * Design matches Google reviews style with avatars, stars, and Google branding.
 *
 * @returns {React.ReactElement} Google Reviews section
 */

// Hardcoded reviews data
const REVIEWS = [
  {
    id: 1,
    author_name: 'Marcin Pietrasik',
    author_subtitle: 'Lokalny przewodnik · 129 opinii',
    profile_photo_url: '/images/reviews/marcin-pietrasik.png',
    rating: 5,
    text: 'Polecam LessManual – Agencję Automatyzacji AI! Zleciliśmy im automatyzację procesów na naszych mediach społecznościowych i efekt przerósł oczekiwania. Wszystko zostało świetnie pospinane: publikacje, powiadomienia, przekazywanie zadań i szybkie reakcje na wiadomości działają praktycznie „same", a cały przepływ jest logiczny i czytelny. Największy plus? To, co wcześniej zajmowało nam długie godziny, teraz trwa dosłownie chwilę – kilka klików i gotowe. Widać, że znają się na rzeczy, myślą procesowo i potrafią dobrać automatyzacje tak, żeby realnie odciążyć zespół. Jeśli ktoś chce usprawnić social media i odzyskać czas, to zdecydowanie warto! 🚀🤖✅',
  },
  {
    id: 2,
    author_name: 'Dawid Kar',
    author_subtitle: '1 opinia',
    profile_photo_url: null,
    rating: 5,
    text: 'Bartek wykazuje się dużą samodzielnością i dobrą orientacją w automatyzacjach oraz integracjach systemowych. Szybko reaguje na zgłaszane problemy i sprawnie wprowadza zmiany w działających workflow. Współpraca przebiega konkretnie i technicznie na dobrym poziomie.',
  },
  {
    id: 3,
    author_name: 'Maciej Osiecki',
    author_subtitle: '7 opinii',
    profile_photo_url: null,
    rating: 5,
    text: 'Polecam z całego serca, zleciłem stworzenie strony internetowej a dostałem dużo więcej nowe Logo nową wizję na marketing i dobre pozycjonowanie w Google. Naprawdę bez zastrzeżeń 5/5!',
  },
  {
    id: 4,
    author_name: 'Paweł Muchewicz',
    author_subtitle: '3 opinie · 1 zdjęcie',
    profile_photo_url: null,
    rating: 5,
    text: 'Pełen profesjonalizm i konkretne podejście do biznesu – współpraca z Bartkiem to czysta przyjemność. Dzięki wdrożeniom LessManual.ai zaoszczędziliśmy mnóstwo czasu, który wcześniej marnowaliśmy na powtarzalne zadania. Zdecydowanie polecam każdemu, kto chce usprawnić swoją firmę!',
  },
  {
    id: 5,
    author_name: 'CreativeDanceRumia',
    author_subtitle: '15 opinii · 2 zdjęcia',
    profile_photo_url: null,
    rating: 5,
    text: 'Bartek to ekspert, który nie tylko zna się na AI, ale przede wszystkim rozumie, jak to przełożyć na realne zyski w firmie. Proponowane przez LessManual.ai rozwiązania były „szyte na miarę" i przyniosły efekty szybciej, niż zakładaliśmy. 5 gwiazdek za terminowość i merytoryczne wsparcie.',
  },
]

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena ${rating} na 5 gwiazdek`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-white/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Google logo component
const GoogleLogo = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

// Review card component
const ReviewCard = ({
  review,
}: {
  review: (typeof REVIEWS)[0]
}) => {
  // Get first letter for avatar
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <article className="group relative bg-[#1a1a1a] rounded-2xl p-5 min-w-[320px] max-w-[380px] flex-shrink-0 border border-white/5 hover:border-white/10 transition-all duration-300">
      {/* Author info */}
      <div className="flex items-center gap-3 mb-3">
        {review.profile_photo_url ? (
          <Image
            src={review.profile_photo_url}
            alt={review.author_name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
            {getInitial(review.author_name)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm truncate">{review.author_name}</h3>
          <p className="text-white/40 text-xs">{review.author_subtitle}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-white/70 text-sm leading-relaxed line-clamp-5 mb-4">{review.text}</p>

      {/* Google attribution */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <GoogleLogo />
        <span className="text-white/40 text-xs">Google</span>
      </div>
    </article>
  )
}

export function GoogleReviewsSection(): React.ReactElement {
  const t = useTranslations('reviews')
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // 3 pozycje dla 5 kart: pozycja 0 (start), pozycja 1 (środek), pozycja 2 (koniec)
  const [position, setPosition] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalReviews = 6
  const avgRating = 5.0

  // Scroll positions in pixels (card width ~340px)
  const scrollPositions = [0, 340, 680]

  // Auto-scroll co 5 sekund, przechodzi: 0 → 1 → 2 → 0 → ...
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  // Scroll do aktualnej pozycji
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPositions[position],
        behavior: 'smooth'
      })
    }
  }, [position])

  const handlePrev = () => {
    setPosition((prev) => (prev - 1 + 3) % 3)
  }

  const handleNext = () => {
    setPosition((prev) => (prev + 1) % 3)
  }

  return (
    <section
      id="opinie"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="reviews-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pear/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 id="reviews-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('headline')}
            </h2>
            <p className="text-xl text-white/60 mb-8">{t('subheadline')}</p>

            {/* Overall rating badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-5 py-2.5 border border-white/10">
              <span className="text-2xl font-bold text-white">{avgRating.toFixed(1)}</span>
              <StarRating rating={5} />
              <span className="text-white/40 text-sm">
                {totalReviews} {t('totalReviews')}
              </span>
            </div>
          </motion.div>

          {/* Reviews carousel */}
          <motion.div variants={fadeInUp} className="relative">
            {/* Carousel container */}
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-6 px-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {REVIEWS.map((review) => (
                <div key={review.id} className="snap-start">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* Navigation controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label={t('prevReview')}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* 3 kropki = 3 pozycje */}
              <div className="flex gap-2">
                {[0, 1, 2].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`h-2 rounded-full transition-all ${
                      position === pos ? 'bg-pear w-6' : 'bg-white/20 w-2 hover:bg-white/40'
                    }`}
                    aria-label={`${t('goToReview')} ${pos + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label={t('nextReview')}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

                      </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
