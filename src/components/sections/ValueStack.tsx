"use client";

import { Check, X, Wrench, HeadphonesIcon, ShieldCheck } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { VALUE_STACK_SAVINGS, CALENDLY_URL } from "@/lib/constants";

const valuePoints = [
  {
    icon: Wrench,
    title: "System pod klucz",
    desc: "My budujemy, konfigurujemy i wdrażamy. Twój czas: 1-2h. Wdrożenie w 7-21 dni.",
  },
  {
    icon: HeadphonesIcon,
    title: "Stały support i rozwój",
    desc: "Cotygodniowe raporty, optymalizacja, nowe funkcje. Odpowiadamy w godziny, nie w dni.",
  },
  {
    icon: ShieldCheck,
    title: "Gwarancja wyników",
    desc: "50% zaliczki, reszta po wdrożeniu. Nie dowieziemy? Zwracamy pieniądze. Bez dyskusji.",
  },
];

export function ValueStack() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Wartość" title="Nie kupujesz narzędzia. Kupujesz system który działa i partnera który go rozwija." />
          <p className="text-center text-text-secondary text-lg mb-12">
            Ile razy kupiłeś narzędzie, które po miesiącu leżało nieużywane? U nas tak nie będzie.
          </p>
        </FadeUp>

        {/* A: 3 value points jako karty w 1 rzędzie */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {valuePoints.map((block) => (
            <StaggerItem key={block.title}>
              <div className="bg-white border border-border rounded-[6px] p-6 h-full hover:border-accent transition-colors duration-200 text-center">
                <div className="w-10 h-10 rounded-[6px] bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                  <block.icon size={20} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl mb-2">{block.title}</h3>
                <p className="text-lg text-text-secondary leading-relaxed">{block.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* B: Savings full-width card */}
        <FadeUp delay={0.15}>
          <div className="bg-white border border-border rounded-[6px] p-6 md:p-8 mb-8">
            <h3 className="font-serif text-2xl mb-6 text-center">Tańsze niż pracownik. Szybsze niż agencja.</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {VALUE_STACK_SAVINGS.map((s) => (
                <div key={s.area} className="bg-bg rounded-[6px] p-4">
                  <div className="font-sans font-semibold text-base text-text mb-2">{s.area}</div>
                  <div className="flex items-start gap-2 text-base mb-1">
                    <X size={14} className="text-warning mt-0.5 shrink-0" strokeWidth={2} />
                    <span className="text-text-secondary">{s.before}</span>
                  </div>
                  <div className="flex items-start gap-2 text-base">
                    <Check size={14} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                    <span className="text-text-secondary">{s.after}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Big savings highlight */}
            <div className="bg-text rounded-[6px] p-5 text-center">
              <div className="text-sm uppercase tracking-wider text-white/50 mb-1">
                Zostaje w Twojej firmie rocznie
              </div>
              <div className="font-mono text-2xl md:text-3xl font-bold text-accent">
                100-400 tysięcy PLN
              </div>
            </div>
          </div>
        </FadeUp>

        {/* C: Rabaty jako pill badges */}
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              "Rabat 15% przy 2+ produktach",
              "Płatność roczna: 2 mies. gratis",
              "Polecenie klienta: 1 mies. gratis",
            ].map((perk) => (
              <span
                key={perk}
                className="inline-flex items-center px-4 py-2 rounded-full text-base bg-white border border-border text-text-secondary"
              >
                {perk}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <div className="text-center">
            <p className="text-text text-lg mb-6 font-medium">
              Jeden partner. Wszystkie systemy. Pełna odpowiedzialność za wyniki.
            </p>
            <Button href={CALENDLY_URL} external>
              Odzyskaj 20-40h miesięcznie
            </Button>
            <p className="mt-5 text-text-light text-base">
              Brzmi dobrze, ale jak to wygląda w praktyce?
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
