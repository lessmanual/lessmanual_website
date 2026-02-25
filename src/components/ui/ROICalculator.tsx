"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface CostArea {
  id: string;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
  ourCost: number;
  ourLabel: string;
}

const COST_AREAS: CostArea[] = [
  {
    id: "sdr",
    label: "Szukanie klientów",
    description: "SDR, agencja outbound, reklamy",
    min: 0,
    max: 25000,
    step: 500,
    defaultValue: 8000,
    unit: "PLN/mies",
    ourCost: 2250,
    ourLabel: "~2,250 PLN/mies*",
  },
  {
    id: "support",
    label: "Obsługa zapytań",
    description: "Pracownik, Twój czas, call center",
    min: 0,
    max: 15000,
    step: 500,
    defaultValue: 6000,
    unit: "PLN/mies",
    ourCost: 900,
    ourLabel: "od 900 PLN/mies",
  },
  {
    id: "content",
    label: "Content marketing",
    description: "Copywriter, agencja SEO, freelancer",
    min: 0,
    max: 15000,
    step: 500,
    defaultValue: 5000,
    unit: "PLN/mies",
    ourCost: 1000,
    ourLabel: "od 1,000 PLN/mies",
  },
  {
    id: "offers",
    label: "Generowanie ofert",
    description: "Ręczne pisanie ofert i wycen",
    min: 0,
    max: 10000,
    step: 500,
    defaultValue: 3000,
    unit: "PLN/mies",
    ourCost: 800,
    ourLabel: "od 800 PLN/mies",
  },
];

function formatPLN(value: number): string {
  return value.toLocaleString("pl-PL");
}

export function ROICalculator() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(COST_AREAS.map((a) => [a.id, a.defaultValue]))
  );
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(COST_AREAS.map((a) => [a.id, true]))
  );

  const results = useMemo(() => {
    const currentTotal = COST_AREAS.reduce(
      (sum, a) => sum + (enabled[a.id] ? values[a.id] : 0),
      0
    );
    const ourTotal = COST_AREAS.reduce(
      (sum, a) => sum + (enabled[a.id] ? a.ourCost : 0),
      0
    );
    const monthlySavings = Math.max(0, currentTotal - ourTotal);
    const yearlySavings = monthlySavings * 12;
    return { currentTotal, ourTotal, monthlySavings, yearlySavings };
  }, [values, enabled]);

  const handleChange = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const toggleArea = (id: string) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
    trackEvent("roi_calculated", { page_location: window.location.pathname });
  };

  // Animated number hook
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
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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

  const animCurrentTotal = useAnimatedNumber(results.currentTotal);
  const animOurTotal = useAnimatedNumber(results.ourTotal);
  const animYearlySavings = useAnimatedNumber(results.yearlySavings);
  const animMonthlySavings = useAnimatedNumber(results.monthlySavings);

  return (
    <div className="bg-white border border-border rounded-[6px] p-6 md:p-8">
      <h3 className="font-serif text-lg mb-2">Policz ile Cię to kosztuje:</h3>
      <p className="text-text-secondary text-sm mb-8">
        Zaznacz obszary które Cię dotyczą i przesuń suwaki.
      </p>

      {/* Sliders */}
      <div className="space-y-6 mb-8">
        {COST_AREAS.map((area) => {
          const isOn = enabled[area.id];
          const pct = ((values[area.id] - area.min) / (area.max - area.min)) * 100;
          return (
            <div key={area.id} className={isOn ? "" : "opacity-40"}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleArea(area.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors duration-150 ${
                      isOn
                        ? "bg-accent border-accent"
                        : "bg-transparent border-border hover:border-text-light"
                    }`}
                    aria-label={`${isOn ? "Wyłącz" : "Włącz"} ${area.label}`}
                  >
                    {isOn && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <div>
                    <span className="text-sm font-medium text-text">{area.label}</span>
                    <span className="text-xs text-text-light ml-2 hidden sm:inline">
                      ({area.description})
                    </span>
                  </div>
                </div>
                <span className="font-mono text-sm font-semibold text-text tabular-nums">
                  {isOn ? `${formatPLN(values[area.id])} ${area.unit}` : "---"}
                </span>
              </div>
              <div className="relative h-5 flex items-center">
                <input
                  type="range"
                  min={area.min}
                  max={area.max}
                  step={area.step}
                  value={values[area.id]}
                  onChange={(e) => handleChange(area.id, Number(e.target.value))}
                  disabled={!isOn}
                  className="w-full h-5 appearance-none cursor-pointer bg-transparent relative z-10 disabled:cursor-default [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(184,115,51,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                {isOn && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${pct}%` }}
                  />
                )}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-text-muted">0</span>
                <span className="text-xs text-text-muted">{formatPLN(area.max)}</span>
              </div>
              {isOn && (
                <div className="mt-1 text-xs text-success font-mono">
                  LessManual: {area.ourLabel}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-border pt-6">
        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-warning/5 border border-warning/20 rounded-[6px] p-4 text-center">
            <div className="text-xs uppercase tracking-wider text-text-light mb-1">
              Teraz płacisz
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-warning line-through decoration-2">
              {formatPLN(animCurrentTotal)}
            </div>
            <div className="text-xs text-text-muted mt-1">PLN / miesiąc</div>
          </div>
          <div className="bg-success/5 border border-success/20 rounded-[6px] p-4 text-center">
            <div className="text-xs uppercase tracking-wider text-text-light mb-1">
              Z LessManual
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-success">
              {formatPLN(animOurTotal)}
            </div>
            <div className="text-xs text-text-muted mt-1">PLN / miesiąc</div>
          </div>
        </div>

        {/* Savings highlight */}
        <div className="bg-text rounded-[6px] p-5 text-center">
          <div className="text-xs uppercase tracking-wider text-white/50 mb-2">
            Twoja oszczędność rocznie
          </div>
          <div className="font-mono text-3xl md:text-4xl font-bold text-accent">
            {formatPLN(animYearlySavings)} PLN
          </div>
          <div className="text-white/60 text-sm mt-2">
            {formatPLN(animMonthlySavings)} PLN miesięcznie zostaje w firmie
          </div>
        </div>

        {/* Footnote */}
        <p className="text-xs text-text-muted mt-4 leading-relaxed">
          * AI SDR działa w modelu pay-per-appointment (od 750 PLN/spotkanie). Estymacja
          zakłada ~3 spotkania/mies. Ceny netto. Każdy produkt wymaga jednorazowego
          wdrożenia (setup).
        </p>

        {/* CTA */}
        <div className="text-center mt-6">
          <Button href={CALENDLY_URL} external>
            Odzyskaj te pieniądze
          </Button>
        </div>
      </div>
    </div>
  );
}
