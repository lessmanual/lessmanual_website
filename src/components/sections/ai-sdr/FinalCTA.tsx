"use client";

import { Shield, Banknote, BarChart3, CalendarCheck } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/Button";
import { AI_SDR_CALENDLY_URL, AI_SDR_EMAIL } from "@/lib/ai-sdr-constants";

const trustElements = [
  { icon: Shield, text: "0 spotkań w 45 dni = zwrot setup" },
  { icon: Banknote, text: "Zero stałych opłat" },
  { icon: BarChart3, text: "Pierwszy w Polsce: AI SDR + Pay-Per-Meeting" },
  { icon: CalendarCheck, text: "Dane z aktywnych kampanii." },
];

export function FinalCTA() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-10">
            <h2 className="font-serif text-text mb-6">
              Ile spotkań chcesz w tym miesiącu?
            </h2>
            <p className="text-text-secondary text-2xl leading-relaxed max-w-[680px] mx-auto">
              15 minut. Zdefiniujemy Twojego idealnego klienta, pokażemy, ile spotkań realistycznie
              możesz mieć i policzymy ROI. Od kiedy chcesz mieć spotkania w kalendarzu?
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="text-center mb-10">
            <Button href={AI_SDR_CALENDLY_URL} external>
              Chcę spotkania w kalendarzu
            </Button>
            <p className="mt-5 text-text-muted text-lg max-w-[520px] mx-auto">
              Jeśli pasujemy — startujemy w 3 tygodnie. Jeśli nie — wyjdziesz z darmową
              analizą Twojego rynku i konkretnymi wskazówkami jak poprawić prospecting.
            </p>
          </div>
        </FadeUp>

        {/* Trust elements */}
        <FadeUp delay={0.15}>
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 gap-4 mb-10">
            {trustElements.map((el) => (
              <StaggerItem key={el.text}>
                <div className="flex items-center gap-3 bg-bg border border-border rounded-[6px] p-4">
                  <el.icon size={18} className="text-accent shrink-0" strokeWidth={1.5} />
                  <span className="text-text-secondary text-lg">{el.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeUp>

        {/* Alt contact */}
        <FadeUp delay={0.2}>
          <div className="text-center border-t border-border pt-8">
            <p className="text-text-muted text-lg mb-2">Wolisz napisać?</p>
            <a
              href={`mailto:${AI_SDR_EMAIL}`}
              className="font-mono text-lg text-text-secondary hover:text-accent transition-colors"
            >
              {AI_SDR_EMAIL}
            </a>
          </div>
        </FadeUp>

        {/* P.S. */}
        <FadeUp delay={0.25}>
          <div className="mt-10 text-text-muted text-lg leading-relaxed">
            <p>
              <strong className="text-text-secondary">P.S.</strong> Sam prowadzę każdą kampanię.
              Max 3 projekty jednocześnie. Miejsca jeszcze są — ale nie będą wiecznie.
            </p>
            <p className="mt-3 text-text-light">— Bartek</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-12 text-center font-mono text-lg text-accent uppercase tracking-widest">
            Less Manual. More Growth.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
