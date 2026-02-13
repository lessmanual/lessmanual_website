'use client'

import React, { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Mini ROI Calculator
 *
 * Updated for fair pricing model: user sets their own meeting price
 * via a slider (500–2,000 PLN) instead of automatic ACV-based tiers.
 *
 * @returns {React.ReactElement} Calculator section
 */

function formatPLN(value: number): string {
  return value.toLocaleString('pl-PL') + ' PLN'
}

export function AiSdrCalculatorSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const [pricePerMeeting, setPricePerMeeting] = useState(1000)
  const [meetingsPerMonth, setMeetingsPerMonth] = useState(5)
  const [clientValue, setClientValue] = useState(50000)
  const [closeRate, setCloseRate] = useState(20)

  const results = useMemo(() => {
    const monthlyCost = meetingsPerMonth * pricePerMeeting
    const monthlyClients = meetingsPerMonth * (closeRate / 100)
    const monthlyRevenue = monthlyClients * clientValue
    const roi = monthlyCost > 0 ? monthlyRevenue / monthlyCost : 0

    return {
      monthlyCost,
      monthlyClients,
      monthlyRevenue,
      roi,
    }
  }, [pricePerMeeting, meetingsPerMonth, clientValue, closeRate])

  const pricePercentage = ((pricePerMeeting - 500) / (2000 - 500)) * 100
  const meetingsPercentage = ((meetingsPerMonth - 1) / (20 - 1)) * 100
  const clientValuePercentage = ((clientValue - 5000) / (500000 - 5000)) * 100
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
              Policz sw&#243;j ROI
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Ustaw parametry swojego biznesu i zobacz ile mo&#380;esz zarobi&#263;.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 border border-pear/20 rounded-2xl p-6 md:p-8 space-y-8"
            >
              {/* Slider 1: Price per meeting */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Cena za spotkanie
                </label>
                <div className="text-3xl font-bold text-pear mb-4">
                  {formatPLN(pricePerMeeting)}
                </div>
                <input
                  type="range"
                  min={500}
                  max={2000}
                  step={100}
                  value={pricePerMeeting}
                  onChange={(e) => setPricePerMeeting(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pear focus:ring-offset-2 focus:ring-offset-night"
                  style={{
                    background: `linear-gradient(to right, #DDE000 0%, #DDE000 ${pricePercentage}%, rgba(255,255,255,0.1) ${pricePercentage}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-white/50 mt-2">
                  <span>500 PLN</span>
                  <span>2 000 PLN</span>
                </div>
              </div>

              {/* Slider 2: Meetings Per Month */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Spotka&#324; miesi&#281;cznie
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

              {/* Slider 3: Client Value */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Warto&#347;&#263; jednego klienta
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
                  <span>5 000</span>
                  <span>500 000</span>
                </div>
              </div>

              {/* Slider 4: Close Rate */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Wsp&#243;&#322;czynnik zamkni&#281;cia (%)
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
              {/* Monthly Cost */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-sm text-white/50 mb-1">Tw&#243;j koszt miesi&#281;cznie</div>
                <div className="text-2xl font-bold text-white">{formatPLN(results.monthlyCost)}</div>
                <div className="text-xs text-white/40 mt-1">
                  {meetingsPerMonth} spotka&#324; x {formatPLN(pricePerMeeting)}
                </div>
              </div>

              {/* Monthly Revenue */}
              <div className="bg-pear/10 border-2 border-pear/30 rounded-xl p-5">
                <div className="text-sm text-white/50 mb-1">Tw&#243;j przych&#243;d miesi&#281;cznie</div>
                <div className="text-3xl font-bold text-pear">{formatPLN(Math.round(results.monthlyRevenue))}</div>
                <div className="text-xs text-white/40 mt-1">
                  {results.monthlyClients.toFixed(1)} nowych klient&#243;w x {formatPLN(clientValue)}
                </div>
              </div>

              {/* ROI */}
              <div className="bg-gradient-to-br from-pear/10 to-pear/20 border-2 border-pear rounded-xl p-5">
                <div className="text-sm text-white/50 mb-1">ROI</div>
                <div className="text-4xl font-bold text-pear">
                  {results.roi.toFixed(0)}x
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Na ka&#380;d&#261; z&#322;ot&#243;wk&#281; wydaną na spotkania zarabiasz {results.roi.toFixed(0)} PLN
                </div>
              </div>

              {/* CTA in calculator */}
              <a
                href="https://cal.com/bart%C5%82omiej-chudzik-2en6pt"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-pear text-night font-bold text-base px-8 py-4 rounded-xl hover:bg-pear/90 transition-all duration-300"
              >
                Sprawd&#378; ile spotka&#324; mo&#380;esz dosta&#263; &rarr;
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
