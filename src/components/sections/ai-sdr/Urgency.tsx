"use client";

import { Clock } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AI_SDR_CALENDLY_URL } from "@/lib/ai-sdr-constants";
import { getNextMonthPL } from "@/lib/constants";

export function Urgency() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Czas"
            title="Dlaczego warto zacząć teraz, nie za miesiąc"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-10">
            <p>
              Przyjmuję max 3 projekty AI SDR jednocześnie. Każdy klient wymaga dedykowanej
              konfiguracji, testów i optymalizacji. Nie chcę robić tego masowo — chcę robić
              to dobrze.
            </p>
            <p>
              Warmup domen trwa 3 tygodnie. Im szybciej zaczniesz, tym szybciej masz spotkania
              w kalendarzu. Każdy tydzień zwłoki to tydzień bez spotkań, które mogłeś mieć.
            </p>
            <p>
              Twoja konkurencja nie czeka. Firmy B2B, które automatyzują prospecting, mają pełny
              pipeline. Te, które nie automatyzują — walczą o polecenia i liczą na szczęście.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="bg-warning/10 border border-warning/30 rounded-[6px] p-6 text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={18} className="text-warning" strokeWidth={2} />
              <span className="font-mono text-lg font-semibold text-warning uppercase tracking-wider">
                Ograniczona dostępność
              </span>
            </div>
            <p className="font-serif text-2xl text-text">
              Zostało 1 miejsce w {getNextMonthPL()}
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="text-center">
            <Button href={AI_SDR_CALENDLY_URL} external>
              Sprawdź, czy jest jeszcze miejsce
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
