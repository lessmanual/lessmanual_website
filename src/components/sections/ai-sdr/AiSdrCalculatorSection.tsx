'use client'

import React, { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Mini ROI Calculator
 *
 * Simple 3-input calculator: client value, meetings/month, close rate.
 * Dynamically calculates monthly cost, revenue, and ROI based on ACV tiers.
 *
 * @returns {React.ReactElement} Calculator section
 */

function getMeetingPrice(acv: number): number {
  if (acv < 20000) return 750
  if (acv < 50000) return 1000
  if (acv < 150000) return 1500
  return 2000
}

function formatPLN(value: number): string {
  return value.toLocaleString('pl-PL') + ' PLN'
}

export function AiSdrCalculatorSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const [clientValue, setClientValue] = useState(50000)
  const [meetingsPerMonth, setMeetingsPerMonth] = useState(5)
  const [closeRate, setCloseRate] = useState(20)

  const results = useMemo(() => {
    const pricePerMeeting = getMeetingPrice(clientValue)
    const monthlyCost = meetingsPerMonth * pricePerMeeting
    const monthlyClients = meetingsPerMonth * (closeRate / 100)
    const monthlyRevenue = monthlyClients * clientValue
    const roi = monthlyCost > 0 ? monthlyRevenue / monthlyCost : 0

    return {
      pricePerMeeting,
      monthlyCost,
      monthlyClients,
      monthlyRevenue,
      roi,
    }
  }, [clientValue, meetingsPerMonth, closeRate])

  const clientValuePercentage = ((clientValue - 5000) / (500000 - 5000)) * 100
  const meetingsPercentage = ((meetingsPerMonth - 1) / (20 - 1)) * 100
  const closeRatePercentage = ((closeRate - 5) / (50 - 5)) * 100

  return (
    <section
      id="kalkulator-roi"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="calculator-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-pear/5 to-night" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2
              id="calculator-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Policz swój ROI
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Sprawdź, ile możesz zarobić dzięki AI SDR. Trzy parametry — realne liczby.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 border border-pear/20 rounded-2xl p-6 md:p-8 space-y-8"
            >
              {/* Slider 1: Client Value */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Średnia wartość klienta (ACV)
                </label>
                <div className="text-3xl font-bold text-pear mb-4">
                  {formatPLN(clientValue)}
                </div>
                <input
                  type="range"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={clientValue}
                  onChange={(e) => setClientValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pear focus:ring-offset-2 focus:ring-offset-night"
                  style={{
                    background: `linear-gradient(to right, #DDE000 0%, #DDE000 ${clientValuePercentage}%, rgba(255,255,255,0.1) ${clientValuePercentage}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/50 mt-2">
                  <span>5,000</span>
                  <span>500,000</span>
                </div>
              </div>

              {/* Slider 2: Meetings Per Month */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Spotkań miesięcznie
                </label>
                <div className="text-3xl font-bold text-pear mb-4">
                  {meetingsPerMonth}
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={meetingsPerMonth}
                  onChange={(e) => setMeetingsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pear focus:ring-offset-2 focus:ring-offset-night"
                  style={{
                    background: `linear-gradient(to right, #DDE000 0%, #DDE000 ${meetingsPercentage}%, rgba(255,255,255,0.1) ${meetingsPercentage}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/50 mt-2">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Slider 3: Close Rate */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Współczynnik zamknięcia (%)
                </label>
                <div className="text-3xl font-bold text-pear mb-4">
                  {closeRate}%
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pear focus:ring-offset-2 focus:ring-offset-night"
                  style={{
                    background: `linear-gradient(to right, #DDE000 0%, #DDE000 ${closeRatePercentage}%, rgba(255,255,255,0.1) ${closeRatePercentage}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/50 mt-2">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4"
            >
              {/* Price per meeting info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-sm text-white/50 mb-1">Cena za spotkanie (wg ACV)</div>
                <div className="text-2xl font-bold text-white">{formatPLN(results.pricePerMeeting)}</div>
              </div>

              {/* Monthly Cost */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-sm text-white/50 mb-1">Twój koszt miesięcznie</div>
                <div className="text-2xl font-bold text-white">{formatPLN(results.monthlyCost)}</div>
                <div className="text-xs text-white/40 mt-1">
                  {meetingsPerMonth} spotkań x {formatPLN(results.pricePerMeeting)}
                </div>
              </div>

              {/* Monthly Revenue */}
              <div className="bg-pear/10 border-2 border-pear/30 rounded-xl p-5">
                <div className="text-sm text-white/50 mb-1">Twój przychód miesięcznie</div>
                <div className="text-3xl font-bold text-pear">{formatPLN(Math.round(results.monthlyRevenue))}</div>
                <div className="text-xs text-white/40 mt-1">
                  {results.monthlyClients.toFixed(1)} nowych klientów x {formatPLN(clientValue)}
                </div>
              </div>

              {/* ROI */}
              <div className="bg-gradient-to-br from-pear/10 to-pear/20 border-2 border-pear rounded-xl p-5">
                <div className="text-sm text-white/50 mb-1">ROI</div>
                <div className="text-4xl font-bold text-pear">
                  {results.roi.toFixed(0)}x
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Na każdą złotówkę wydaną na spotkania zarabiasz {results.roi.toFixed(0)} PLN
                </div>
              </div>
            </motion.div>
          </div>

          {/* Example */}
          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white/60">
              <span className="text-white/80 font-semibold">Przykład:</span>{' '}
              5 spotkań/mies x 50k PLN ACV x 20% wsp. zamknięcia = 1 nowy klient = 50,000 PLN przychodu.
              Koszt: 5 x 1,000 PLN = 5,000 PLN. <span className="text-pear font-bold">ROI: 10x.</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
