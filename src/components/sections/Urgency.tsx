"use client";

import { Users, TrendingUp, Timer } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { Button } from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";

const urgencyPoints = [
  {
    icon: Users,
    title: "Max 3 projekty miesięcznie",
    desc: "Prowadzę każdy projekt osobiście. Jak kalendarz jest pełny — czekasz na kolejny miesiąc.",
  },
  {
    icon: TrendingUp,
    title: "Konkurencja nie czeka",
    desc: "Twoja konkurencja już automatyzuje sprzedaż, obsługę i content. Każdy miesiąc bez systemu to przewaga którą im oddajesz za darmo.",
  },
  {
    icon: Timer,
    title: "Okno cenowe się zamyka",
    desc: "18 miesięcy temu te systemy kosztowały 10x więcej. Dziś koszty na historycznym minimum — ale im więcej firm wdroży AI, tym trudniej będzie się wyróżnić.",
  },
];

export function Urgency() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Pilność" title="Dlaczego teraz?" />
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {urgencyPoints.map((point) => (
            <StaggerItem key={point.title}>
              <div className="bg-white border border-border rounded-[6px] p-6 md:p-8 h-full hover:border-accent transition-colors duration-200">
                <point.icon size={24} className="text-accent mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-lg mb-2">{point.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{point.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <QuoteBlock className="mb-10">
            <p>
              Setup trwa 7-21 dni. Pierwsze efekty — w dniach. Im szybciej zaczniemy,
              tym szybciej zobaczysz wyniki.
            </p>
          </QuoteBlock>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-10">
            <p className="text-text font-medium">
              Pytanie nie brzmi &ldquo;czy automatyzować&rdquo; — tylko kiedy zaczniesz
              i ile Cię będzie kosztował każdy miesiąc zwłoki.
            </p>
          </div>

          <div className="text-center">
            <Button href={CALENDLY_URL} external>
              Zarezerwuj jedno z 3 miejsc
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
