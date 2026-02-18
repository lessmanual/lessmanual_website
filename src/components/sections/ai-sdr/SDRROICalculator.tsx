"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AI_SDR_CALENDLY_URL } from "@/lib/ai-sdr-constants";

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

export function SDRROICalculator() {
  const [dealValue, setDealValue] = useState(50000);
  const [pricePerMeeting, setPricePerMeeting] = useState(1000);
  const [meetings, setMeetings] = useState(5);
  const [closeRate, setCloseRate] = useState(20);

  const results = useMemo(() => {
    const monthlyCost = meetings * pricePerMeeting;
    const newClients = (meetings * closeRate) / 100;
    const revenue = newClients * dealValue;
    const roi = monthlyCost > 0 ? revenue / monthlyCost : 0;

    return {
      monthlyCost,
      newClients,
      revenue,
      roi,
    };
  }, [dealValue, pricePerMeeting, meetings, closeRate]);

  const animCost = useAnimatedNumber(results.monthlyCost);
  const animRevenue = useAnimatedNumber(Math.round(results.revenue));
  const animROI = useAnimatedNumber(Math.round(results.roi * 10));

  const dealPct = ((dealValue - 5000) / (500000 - 5000)) * 100;
  const pricePct = ((pricePerMeeting - 500) / (2000 - 500)) * 100;
  const meetingPct = ((meetings - 1) / (50 - 1)) * 100;
  const closePct = ((closeRate - 5) / (80 - 5)) * 100;

  return (
    <section id="roi-calculator" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="ROI" title="Policz swój zwrot z inwestycji" />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-white border border-border rounded-[6px] p-6 md:p-8">
            {/* Inputs */}
            <div className="space-y-8 mb-8">
              {/* Deal value */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Średnia wartość Twojego klienta</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {formatPLN(dealValue)} PLN
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={5000}
                    max={500000}
                    step={5000}
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                    className="w-full h-5 appearance-none cursor-pointer bg-transparent relative z-10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(184,115,51,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${dealPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">5k PLN</span>
                  <span className="text-xs text-text-muted">500k PLN</span>
                </div>
              </div>

              {/* Price per meeting */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">
                    Cena za spotkanie
                    <span className="text-text-muted font-normal ml-1">(ustalamy na konsultacji)</span>
                  </span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {formatPLN(pricePerMeeting)} PLN
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={500}
                    max={2000}
                    step={50}
                    value={pricePerMeeting}
                    onChange={(e) => setPricePerMeeting(Number(e.target.value))}
                    className="w-full h-5 appearance-none cursor-pointer bg-transparent relative z-10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(184,115,51,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${pricePct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">500 PLN</span>
                  <span className="text-xs text-text-muted">2 000 PLN</span>
                </div>
              </div>

              {/* Meetings */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Ile spotkań miesięcznie chcesz</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {meetings}
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={meetings}
                    onChange={(e) => setMeetings(Number(e.target.value))}
                    className="w-full h-5 appearance-none cursor-pointer bg-transparent relative z-10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(184,115,51,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${meetingPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">1</span>
                  <span className="text-xs text-text-muted">50</span>
                </div>
              </div>

              {/* Close rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">
                    Twój close rate ze spotkań
                    <span className="text-text-muted font-normal ml-1">(nie wiesz? weź 20%)</span>
                  </span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {closeRate}%
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={5}
                    max={80}
                    step={5}
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full h-5 appearance-none cursor-pointer bg-transparent relative z-10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(184,115,51,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${closePct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">5%</span>
                  <span className="text-xs text-text-muted">80%</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-6">
              {/* Results */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-warning/5 border border-warning/20 rounded-[6px] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-text-light mb-1">
                    Twój koszt / miesiąc
                  </div>
                  <div className="font-mono text-2xl md:text-3xl font-bold text-warning">
                    {formatPLN(animCost)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {meetings} x {formatPLN(pricePerMeeting)} PLN/spotkanie
                  </div>
                </div>
                <div className="bg-success/5 border border-success/20 rounded-[6px] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-text-light mb-1">
                    Twój przychód
                  </div>
                  <div className="font-mono text-2xl md:text-3xl font-bold text-success">
                    {formatPLN(animRevenue)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {results.newClients.toFixed(1)} nowych klientów
                  </div>
                </div>
              </div>

              {/* ROI highlight */}
              <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-5 text-center mb-6">
                <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
                  Twój ROI
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold text-accent">
                  {(animROI / 10).toFixed(1)}x
                </div>
                <div className="text-text-secondary text-sm mt-2">
                  zwrot z inwestycji
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button href={AI_SDR_CALENDLY_URL} external>
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
              <h4 className="font-serif text-base mb-3">Software house, avg deal 50k PLN</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><span className="text-text-muted">Setup:</span> 3,500 PLN</p>
                <p><span className="text-text-muted">Koszt:</span> 5 spotkań x 1,250 PLN = 6,250 PLN/mies</p>
                <p><span className="text-text-muted">Przychód:</span> 1 klient x 50,000 PLN = 50,000 PLN</p>
                <p className="font-mono font-semibold text-accent">ROI: 8x</p>
              </div>
            </div>
            <div className="bg-white border border-border rounded-[6px] p-6">
              <h4 className="font-serif text-base mb-3">Agencja marketingowa, avg deal 20k PLN</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><span className="text-text-muted">Setup:</span> 2,500 PLN</p>
                <p><span className="text-text-muted">Koszt:</span> 5 spotkań x 750 PLN = 3,750 PLN/mies</p>
                <p><span className="text-text-muted">Przychód:</span> 1 klient x 20,000 PLN = 20,000 PLN</p>
                <p className="font-mono font-semibold text-accent">ROI: 5.3x</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
