"use client";

import { Calendar, BarChart3, TrendingUp, Users } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { GEN_OFERT_CALENDLY_URL } from "@/lib/generator-ofert-constants";

const imagineCards = [
  {
    icon: Calendar,
    title: "Piątek, 16:00",
    desc: "Klient wchodzi na Twoją stronę, wypełnia konfigurator. System generuje profesjonalny PDF i wysyła na maila. Ty nawet nie wiesz, że to się stało — do rana masz gotowe zapytanie.",
  },
  {
    icon: BarChart3,
    title: "Ty sprzedajesz, nie kalkulujesz",
    desc: "Klienci sami wyceniają na Twojej stronie. Ty skupiasz się na tych, którzy są gotowi kupić. Zero czasu na ręczne oferty.",
  },
  {
    icon: TrendingUp,
    title: "Cotygodniowy raport",
    desc: "'W tym miesiącu klienci wygenerowali 30 wycen. Najczęściej wybierają wariant Standard. Win rate wzrósł o 35%.'",
  },
  {
    icon: Users,
    title: "21:00 — jesteś z rodziną",
    desc: "Klient właśnie wycenił instalację OZE na Twojej stronie. Dostał PDF. System wysłał follow-up. Rano masz odpowiedź: 'Podpisujemy'.",
  },
];

export function Imagine() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Wyobraź sobie" title="Jak wygląda Twój tydzień z systemem?" />
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {imagineCards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="bg-white border border-border rounded-[6px] p-6 h-full hover:border-accent transition-colors duration-200">
                <div className="w-10 h-10 rounded-[6px] bg-accent/10 flex items-center justify-center mb-4">
                  <card.icon size={20} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl mb-2">{card.title}</h3>
                <p className="text-base text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6 md:p-8 text-center mb-10">
            <p className="font-serif text-2xl text-text">
              Brzmi jak science fiction? Dla firm z naszym systemem to czwartek.
            </p>
          </div>

          <div className="text-center">
            <Button href={GEN_OFERT_CALENDLY_URL} external>
              Chcę takie wyniki
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
