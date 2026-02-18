"use client";

import { Shield, Banknote, BarChart3, CalendarCheck } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/Button";
import { GEN_OFERT_CALENDLY_URL, GEN_OFERT_EMAIL } from "@/lib/generator-ofert-constants";

const trustElements = [
  { icon: Shield, text: "100% zwrot setup w 14 dni" },
  { icon: Banknote, text: "30 dni trial" },
  { icon: BarChart3, text: "ROI 200% w 90 dni" },
  { icon: CalendarCheck, text: "7-21 dni do działającego systemu" },
];

export function FinalCTA() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-10">
            <h2 className="font-serif text-text mb-6">
              Ile godzin tygodniowo tracisz na wyceny?
            </h2>
            <p className="text-text-secondary text-xl leading-relaxed max-w-[680px] mx-auto">
              15 minut. Pokażemy Ci, jak system wygląda na żywo, policzymy Twój ROI i ustalimy,
              czy to ma sens dla Twojego biznesu. Bez zobowiązań.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="text-center mb-10">
            <Button href={GEN_OFERT_CALENDLY_URL} external>
              Chcę system, który robi oferty za mnie
            </Button>
            <p className="mt-5 text-text-muted text-sm max-w-[520px] mx-auto">
              Jeśli pasujemy — startujemy w 7-21 dni. Jeśli nie — wyjdziesz z darmową
              analizą Twojego procesu wycen i konkretnymi wskazówkami jak go usprawnić.
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
                  <span className="text-text-secondary text-sm">{el.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeUp>

        {/* Alt contact */}
        <FadeUp delay={0.2}>
          <div className="text-center border-t border-border pt-8">
            <p className="text-text-muted text-sm mb-2">Wolisz napisać?</p>
            <a
              href={`mailto:${GEN_OFERT_EMAIL}`}
              className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {GEN_OFERT_EMAIL}
            </a>
          </div>
        </FadeUp>

        {/* P.S. */}
        <FadeUp delay={0.25}>
          <div className="mt-10 text-text-muted text-sm leading-relaxed">
            <p>
              <strong className="text-text-secondary">P.S.</strong> Sam konfiguruję każdy system.
              Max 3 wdrożenia jednocześnie. Miejsca jeszcze są — ale nie będą wiecznie.
            </p>
            <p className="mt-3 text-text-light">— Bartek</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-12 text-center font-mono text-sm text-accent uppercase tracking-widest">
            Less Manual. More Growth.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
