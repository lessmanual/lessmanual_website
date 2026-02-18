"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";

export function Agitation() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Agitacja" title="Co się stanie, jeśli nic nie zmienisz?" />
        </FadeUp>

        {/* C: Liczby zamiast ściany tekstu */}
        <FadeUp delay={0.1}>
          <p className="text-text-secondary leading-relaxed mb-8 text-center max-w-[700px] mx-auto">
            OK, znasz problem. Ale co jeśli go zignorujesz?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { number: "100k+", label: "PLN rocznie", desc: "na marketing który nie działa" },
              { number: "3-5", label: "utraconych dealów", desc: "bo ktoś odpowiedział szybciej" },
              { number: "0", label: "przewidywalności", desc: "skąd przyjdzie klient za miesiąc" },
            ].map((stat) => (
              <div key={stat.number} className="text-center p-5">
                <div className="font-mono text-3xl md:text-4xl font-bold text-warning mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-text mb-1">{stat.label}</div>
                <div className="text-xs text-text-muted">{stat.desc}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Konkurencja intro */}
        <FadeUp delay={0.15}>
          <h3 className="font-serif text-xl mb-3 text-center">Twoja konkurencja już automatyzuje.</h3>
          <p className="text-text-secondary leading-relaxed mb-10 text-center max-w-[700px] mx-auto">
            Firmy w Twojej branży wdrażają systemy które umawiają spotkania z decydentami,
            odpowiadają klientom w 30 sekund i generują oferty w 5 minut.
          </p>
        </FadeUp>

        {/* B: Callout box + A: Oni vs Ty grid */}
        <FadeUp delay={0.2}>
          <div className="bg-white border border-border rounded-[6px] p-6 md:p-8 mb-12">
            <h3 className="font-serif text-lg mb-6 text-center">
              Za 12 miesięcy różnica będzie nie do nadrobienia:
            </h3>

            {/* A: 2-kolumnowy grid Oni vs Ty */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
              <div className="text-center">
                <span className="text-sm font-semibold text-success">Konkurencja</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold text-warning">Ty dzisiaj</span>
              </div>
            </div>

            <StaggerContainer staggerDelay={0.1} className="space-y-3">
              {[
                { them: "Pełny pipeline każdego miesiąca", you: "Zgadujesz skąd przyjdzie klient" },
                { them: "Odpowiadają w sekundy", you: "Twoi klienci czekają godziny" },
                { them: "30 artykułów miesięcznie", you: "Blog stoi pusty od miesięcy" },
                { them: "Skalują przychody", you: "Skalujesz koszty" },
              ].map((row) => (
                <StaggerItem key={row.them}>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="border-l-3 border-l-success/40 bg-success/5 rounded-[6px] p-3 md:p-4">
                      <p className="text-sm text-text-secondary leading-relaxed">{row.them}</p>
                    </div>
                    <div className="border-l-3 border-l-warning/40 bg-warning/5 rounded-[6px] p-3 md:p-4">
                      <p className="text-sm text-text-secondary leading-relaxed">{row.you}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeUp>

        {/* D: Closing callout */}
        <FadeUp>
          <div className="text-center">
            <h3 className="font-serif text-xl md:text-2xl text-text mb-3">
              Ile jeszcze kwartałów chcesz tak pracować?
            </h3>
            <p className="text-text-secondary leading-relaxed max-w-[600px] mx-auto mb-6">
              Nie chodzi o to, że źle prowadzisz firmę. Chodzi o to, że płacisz za rzeczy
              które powinny działać lepiej, szybciej i taniej. Jest na to sposób.
            </p>
            <Button href={CALENDLY_URL} external>
              Pokaż mi jak oszczędzić 20-40h miesięcznie
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
