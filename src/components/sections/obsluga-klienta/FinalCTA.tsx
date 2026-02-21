"use client";

import { Shield, Banknote, BarChart3, CalendarCheck } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/Button";
import { OBS_KLIENTA_CALENDLY_URL, OBS_KLIENTA_EMAIL } from "@/lib/obsluga-klienta-constants";

const trustElements = [
  { icon: Shield, text: "10+ firm B2B" },
  { icon: Banknote, text: "5.0 na Google" },
  { icon: BarChart3, text: "30 dni trial" },
  { icon: CalendarCheck, text: "Gwarancja ROI 200%" },
];

export function FinalCTA() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-10">
            <h2 className="font-serif text-text mb-6">
              Od kiedy chcesz, żeby Twoi klienci dostawali odpowiedź w 30 sekund?
            </h2>
            <p className="text-text-secondary text-xl leading-relaxed max-w-[680px] mx-auto">
              Umów się na bezpłatne demo. 15 minut. Pokażemy Ci jak system działa
              na przykładzie Twojej firmy.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="text-center mb-10">
            <Button href={OBS_KLIENTA_CALENDLY_URL} external>
              Chcę odpowiedzi w 30 sekund
            </Button>
            <p className="mt-5 text-text-muted text-sm max-w-[520px] mx-auto">
              Jeśli pasujemy — startujemy w 7-21 dni. Jeśli nie — wyjdziesz z darmową
              analizą Twojego procesu obsługi i konkretnymi wskazówkami jak go usprawnić.
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
                  <span className="text-text-secondary text-base">{el.text}</span>
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
              href={`mailto:${OBS_KLIENTA_EMAIL}`}
              className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {OBS_KLIENTA_EMAIL}
            </a>
          </div>
        </FadeUp>

        {/* P.S. */}
        <FadeUp delay={0.25}>
          <div className="mt-10 text-text-muted text-base leading-relaxed space-y-3">
            <p>
              <strong className="text-text-secondary">P.S.</strong> Jeśli obsługujesz 30+ zapytań dziennie
              i odpowiadasz na te same pytania po raz setny — ten system jest dla Ciebie.
            </p>
            <p>
              Pracownik obsługi: 8-9k miesięcznie i pracuje 8h dziennie. Nasz system: od 900 PLN
              miesięcznie i pracuje 24/7.
            </p>
            <p>
              50% zaliczki. Gwarancja ROI 200% w 90 dni. 30 dni trial. Nie działa — nie płacisz.
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
