"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { GEN_OFERT_CALENDLY_URL } from "@/lib/generator-ofert-constants";

function formatPLN(value: number): string {
  return value.toLocaleString("pl-PL");
}

function useAnimatedNumber(target: number, duration = 400) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number>(0);
  const startRef = useRef(target);
  const startTimeRef = useRef(0);

  useEffect(() => {
    startRef.current = display;
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startRef.current + (target - startRef.current) * eased);
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return display;
}

const SLIDER_CLASS =
  "w-full h-5 appearance-none cursor-pointer bg-transparent relative z-10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(184,115,51,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent";

export function ROICalculator() {
  const [quotes, setQuotes] = useState(20);
  const [hoursPerQuote, setHoursPerQuote] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(200);

  const MONTHLY_SUBSCRIPTION = 1500;

  const results = useMemo(() => {
    const manualCost = quotes * hoursPerQuote * hourlyRate;
    const systemMinutes = quotes * 5;
    const systemHours = systemMinutes / 60;
    const systemCost = systemHours * hourlyRate + MONTHLY_SUBSCRIPTION;
    const savings = manualCost - systemCost;
    const roi = MONTHLY_SUBSCRIPTION > 0 ? savings / MONTHLY_SUBSCRIPTION : 0;

    return {
      manualCost,
      systemCost,
      savings,
      roi,
    };
  }, [quotes, hoursPerQuote, hourlyRate]);

  const animManualCost = useAnimatedNumber(results.manualCost);
  const animSystemCost = useAnimatedNumber(Math.round(results.systemCost));
  const animSavings = useAnimatedNumber(Math.round(results.savings));
  const animROI = useAnimatedNumber(Math.round(results.roi * 10));

  const quotesPct = ((quotes - 1) / (100 - 1)) * 100;
  const hoursPct = ((hoursPerQuote - 0.5) / (4 - 0.5)) * 100;
  const ratePct = ((hourlyRate - 50) / (500 - 50)) * 100;

  return (
    <section id="roi-calculator" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="ROI" title="Policz, ile oszczędzisz na wycenach" />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-white border border-border rounded-[6px] p-6 md:p-8">
            {/* Inputs */}
            <div className="space-y-8 mb-8">
              {/* Quotes per month */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Ile ofert robisz miesięcznie</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {quotes}
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={quotes}
                    onChange={(e) => setQuotes(Number(e.target.value))}
                    className={SLIDER_CLASS}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${quotesPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">1</span>
                  <span className="text-xs text-text-muted">100</span>
                </div>
              </div>

              {/* Hours per quote */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Ile godzin trwa jedna oferta</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {hoursPerQuote}h
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={0.5}
                    max={4}
                    step={0.5}
                    value={hoursPerQuote}
                    onChange={(e) => setHoursPerQuote(Number(e.target.value))}
                    className={SLIDER_CLASS}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${hoursPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">0.5h</span>
                  <span className="text-xs text-text-muted">4h</span>
                </div>
              </div>

              {/* Hourly rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Twoja stawka godzinowa</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {formatPLN(hourlyRate)} PLN
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={50}
                    max={500}
                    step={50}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className={SLIDER_CLASS}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${ratePct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">50 PLN</span>
                  <span className="text-xs text-text-muted">500 PLN</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-6">
              {/* Results */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-warning/5 border border-warning/20 rounded-[6px] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-text-light mb-1">
                    Koszt ręcznych wycen / mies
                  </div>
                  <div className="font-mono text-2xl md:text-3xl font-bold text-warning">
                    {formatPLN(animManualCost)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {quotes} ofert x {hoursPerQuote}h x {formatPLN(hourlyRate)} PLN
                  </div>
                </div>
                <div className="bg-success/5 border border-success/20 rounded-[6px] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-text-light mb-1">
                    Koszt z systemem / mies
                  </div>
                  <div className="font-mono text-2xl md:text-3xl font-bold text-success">
                    {formatPLN(animSystemCost)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    5 min/ofertę + {formatPLN(MONTHLY_SUBSCRIPTION)} PLN abonament
                  </div>
                </div>
              </div>

              {/* Savings highlight */}
              <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-5 text-center mb-6">
                <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
                  Oszczędność miesięcznie
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold text-accent">
                  {formatPLN(animSavings)} PLN
                </div>
                <div className="text-text-secondary text-sm mt-2">
                  ROI: {(animROI / 10).toFixed(1)}x zwrot z abonamentu
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button href={GEN_OFERT_CALENDLY_URL} external>
                  Policzmy Twój ROI na żywo
                </Button>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Static examples */}
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <div className="bg-white border border-border rounded-[6px] p-6">
              <h4 className="font-serif text-base mb-3">Firma OZE, 30 ofert/mies</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><span className="text-text-muted">Ręcznie:</span> 30 x 2h x 200 PLN = 12,000 PLN/mies</p>
                <p><span className="text-text-muted">Z systemem:</span> 30 x 5 min + 1,500 PLN = 2,000 PLN/mies</p>
                <p><span className="text-text-muted">Oszczędność:</span> 10,000 PLN/mies</p>
                <p className="font-mono font-semibold text-accent">ROI: 6.7x</p>
              </div>
            </div>
            <div className="bg-white border border-border rounded-[6px] p-6">
              <h4 className="font-serif text-base mb-3">Meble na wymiar, 15 ofert/mies</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><span className="text-text-muted">Ręcznie:</span> 15 x 3h x 150 PLN = 6,750 PLN/mies</p>
                <p><span className="text-text-muted">Z systemem:</span> 15 x 5 min + 800 PLN = 988 PLN/mies</p>
                <p><span className="text-text-muted">Oszczędność:</span> 5,762 PLN/mies</p>
                <p className="font-mono font-semibold text-accent">ROI: 7.2x</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
