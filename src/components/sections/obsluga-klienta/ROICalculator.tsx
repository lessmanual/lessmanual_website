"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { OBS_KLIENTA_CALENDLY_URL } from "@/lib/obsluga-klienta-constants";

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
  const [queries, setQueries] = useState(30);
  const [responseTime, setResponseTime] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(45);

  const MONTHLY_SUBSCRIPTION = 1500;

  const results = useMemo(() => {
    const dailyMinutes = queries * responseTime;
    const monthlyHours = (dailyMinutes * 20) / 60;
    const manualCost = monthlyHours * hourlyRate;
    const systemCost = MONTHLY_SUBSCRIPTION;
    const savings = manualCost - systemCost;
    const roi = savings / MONTHLY_SUBSCRIPTION;

    return {
      manualCost,
      systemCost,
      savings,
      roi,
    };
  }, [queries, responseTime, hourlyRate]);

  const animManualCost = useAnimatedNumber(Math.round(results.manualCost));
  const animSystemCost = useAnimatedNumber(results.systemCost);
  const animSavings = useAnimatedNumber(Math.round(results.savings));
  const animROI = useAnimatedNumber(Math.round(results.roi * 10));

  const queriesPct = ((queries - 5) / (200 - 5)) * 100;
  const timePct = ((responseTime - 5) / (60 - 5)) * 100;
  const ratePct = ((hourlyRate - 30) / (300 - 30)) * 100;

  return (
    <section id="roi-calculator" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="ROI" title="Policz, ile oszczędzisz na obsłudze klienta" />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-white border border-border rounded-[6px] p-6 md:p-8">
            {/* Inputs */}
            <div className="space-y-8 mb-8">
              {/* Queries per day */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-medium text-text">Ile zapytań dostajecie dziennie</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {queries}
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={5}
                    max={200}
                    step={5}
                    value={queries}
                    onChange={(e) => setQueries(Number(e.target.value))}
                    className={SLIDER_CLASS}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${queriesPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">5</span>
                  <span className="text-xs text-text-muted">200</span>
                </div>
              </div>

              {/* Response time */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-medium text-text">Średni czas odpowiedzi (minuty)</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {responseTime} min
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={5}
                    max={60}
                    step={5}
                    value={responseTime}
                    onChange={(e) => setResponseTime(Number(e.target.value))}
                    className={SLIDER_CLASS}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${timePct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">5 min</span>
                  <span className="text-xs text-text-muted">60 min</span>
                </div>
              </div>

              {/* Hourly rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-medium text-text">Stawka godzinowa osoby odpowiadającej</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {formatPLN(hourlyRate)} PLN
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={30}
                    max={300}
                    step={10}
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
                  <span className="text-xs text-text-muted">30 PLN</span>
                  <span className="text-xs text-text-muted">300 PLN</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-6">
              {/* Results */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-warning/5 border border-warning/20 rounded-[6px] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-text-light mb-1">
                    Koszt ręcznej obsługi / mies
                  </div>
                  <div className="font-mono text-2xl md:text-3xl font-bold text-warning">
                    {formatPLN(animManualCost)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {queries} zapytań x {responseTime} min x 20 dni
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
                    System obsługuje automatycznie
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
                <div className="text-text-secondary text-base mt-2">
                  ROI: {(animROI / 10).toFixed(1)}x zwrot z abonamentu
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button href={OBS_KLIENTA_CALENDLY_URL} external>
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
              <h4 className="font-serif text-lg mb-3">E-commerce, 100 zapytań/dzień</h4>
              <div className="space-y-2 text-base text-text-secondary">
                <p><span className="text-text-muted">Ręcznie:</span> 100 x 10min x 20 dni = 333h x 45 PLN = 15,000 PLN</p>
                <p><span className="text-text-muted">Z systemem:</span> 1,500 PLN</p>
                <p><span className="text-text-muted">Oszczędność:</span> 13,500 PLN</p>
                <p className="font-mono font-semibold text-accent">ROI: 9x</p>
              </div>
            </div>
            <div className="bg-white border border-border rounded-[6px] p-6">
              <h4 className="font-serif text-lg mb-3">Firma B2B, 30 zapytań/dzień</h4>
              <div className="space-y-2 text-base text-text-secondary">
                <p><span className="text-text-muted">Ręcznie:</span> 30 x 15min x 20 dni = 150h x 60 PLN = 9,000 PLN</p>
                <p><span className="text-text-muted">Z systemem:</span> 1,500 PLN</p>
                <p><span className="text-text-muted">Oszczędność:</span> 7,500 PLN</p>
                <p className="font-mono font-semibold text-accent">ROI: 5x</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
