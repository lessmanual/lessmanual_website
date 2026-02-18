"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SEO_CALENDLY_URL } from "@/lib/seo-content-constants";

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

export function ROICalculator() {
  const [articles, setArticles] = useState(20);
  const [copywriterCost, setCopywriterCost] = useState(400);

  const results = useMemo(() => {
    const copywriterMonthly = articles * copywriterCost;
    const lessmanualMonthly = articles <= 10 ? 1000 : articles <= 20 ? 1800 : 2500;
    const savings = copywriterMonthly - lessmanualMonthly;
    const roiYear = savings * 12;

    return {
      copywriterMonthly,
      lessmanualMonthly,
      savings,
      roiYear,
    };
  }, [articles, copywriterCost]);

  const animCopywriter = useAnimatedNumber(results.copywriterMonthly);
  const animLessmanual = useAnimatedNumber(results.lessmanualMonthly);
  const animSavings = useAnimatedNumber(results.savings);
  const animRoiYear = useAnimatedNumber(results.roiYear);

  const articlesPct = ((articles - 5) / (50 - 5)) * 100;
  const costPct = ((copywriterCost - 100) / (1000 - 100)) * 100;

  return (
    <section id="roi-calculator" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="ROI" title="Policz swoją oszczędność" />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-white border border-border rounded-[6px] p-6 md:p-8">
            {/* Inputs */}
            <div className="space-y-8 mb-8">
              {/* Articles per month */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Ile artykułów potrzebujesz miesięcznie</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {articles}
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={articles}
                    onChange={(e) => setArticles(Number(e.target.value))}
                    className="w-full h-5 appearance-none cursor-pointer bg-transparent relative z-10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(184,115,51,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${articlesPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">5</span>
                  <span className="text-xs text-text-muted">50</span>
                </div>
              </div>

              {/* Copywriter cost per article */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">Ile kosztuje Cię copywriter per artykuł</span>
                  <span className="font-mono text-sm font-semibold text-text tabular-nums">
                    {formatPLN(copywriterCost)} PLN
                  </span>
                </div>
                <div className="relative h-5 flex items-center">
                  <input
                    type="range"
                    min={100}
                    max={1000}
                    step={50}
                    value={copywriterCost}
                    onChange={(e) => setCopywriterCost(Number(e.target.value))}
                    className="w-full h-5 appearance-none cursor-pointer bg-transparent relative z-10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(184,115,51,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-border pointer-events-none" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-accent/40 pointer-events-none transition-all duration-75"
                    style={{ width: `${costPct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-text-muted">100 PLN</span>
                  <span className="text-xs text-text-muted">1 000 PLN</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-6">
              {/* Results */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-warning/5 border border-warning/20 rounded-[6px] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-text-light mb-1">
                    Koszt copywritera / mies
                  </div>
                  <div className="font-mono text-2xl md:text-3xl font-bold text-warning">
                    {formatPLN(animCopywriter)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {articles} x {formatPLN(copywriterCost)} PLN
                  </div>
                </div>
                <div className="bg-success/5 border border-success/20 rounded-[6px] p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-text-light mb-1">
                    Koszt LessManual / mies
                  </div>
                  <div className="font-mono text-2xl md:text-3xl font-bold text-success">
                    {formatPLN(animLessmanual)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {articles <= 10 ? "STARTER" : articles <= 20 ? "GROWTH" : "SCALE"}
                  </div>
                </div>
              </div>

              {/* Savings highlight */}
              <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-5 text-center mb-4">
                <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
                  Oszczędność miesięcznie
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold text-accent">
                  {formatPLN(animSavings)} PLN
                </div>
              </div>

              <div className="bg-bg border border-border rounded-[6px] p-4 text-center mb-6">
                <div className="text-xs uppercase tracking-wider text-text-light mb-1">
                  Oszczędność rocznie
                </div>
                <div className="font-mono text-2xl font-bold text-text">
                  {formatPLN(animRoiYear)} PLN
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button href={SEO_CALENDLY_URL} external>
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
              <h4 className="font-serif text-base mb-3">Firma B2B usługowa, 20 artykułów/mies</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><span className="text-text-muted">Copywriter:</span> 20 x 400 PLN = 8,000 PLN/mies</p>
                <p><span className="text-text-muted">LessManual GROWTH:</span> 1,800 PLN/mies</p>
                <p><span className="text-text-muted">Oszczędność:</span> 6,200 PLN/mies</p>
                <p className="font-mono font-semibold text-accent">74,400 PLN/rok zaoszczędzone</p>
              </div>
            </div>
            <div className="bg-white border border-border rounded-[6px] p-6">
              <h4 className="font-serif text-base mb-3">E-commerce, 30 artykułów/mies</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><span className="text-text-muted">Copywriter:</span> 30 x 500 PLN = 15,000 PLN/mies</p>
                <p><span className="text-text-muted">LessManual SCALE:</span> 2,500 PLN/mies</p>
                <p><span className="text-text-muted">Oszczędność:</span> 12,500 PLN/mies</p>
                <p className="font-mono font-semibold text-accent">150,000 PLN/rok zaoszczędzone</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
