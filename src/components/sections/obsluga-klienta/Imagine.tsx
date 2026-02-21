"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function Imagine() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Wyobraź sobie"
            title="Wyobraź sobie poniedziałek rano bez 200 maili"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="text-text-secondary leading-relaxed space-y-4 mb-10">
            <p>
              Budzisz się. Otwierasz dashboard. System obsłużył 47 zapytań w nocy.
              Klienci dostali odpowiedzi. Spotkania umówione. Maile skategoryzowane.
            </p>
            <p>
              Ty? Pijesz kawę. Przeglądasz 3 sprawy które wymagają Twojej uwagi
              — resztę system ogarniał.
            </p>
            <p>
              Zamiast 2.5h dziennie na powtarzalne pytania — masz 2.5h na rozwój
              firmy.
            </p>
            <p>
              A Twoi klienci? Odpowiedź w 30 sekund. O każdej porze. Na każdym
              kanale.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6 md:p-8 text-center mb-10">
            <p className="font-serif text-2xl text-text">
              Brzmi jak science fiction? Dla firm z naszym systemem to czwartek.
            </p>
          </div>

          <div className="text-center">
            <Button href="#roi-calculator" variant="text">
              Policz ile tracisz bez systemu
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
