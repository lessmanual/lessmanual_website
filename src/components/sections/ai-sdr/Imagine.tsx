"use client";

import { Calendar, BarChart3, TrendingUp, Users } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AI_SDR_CALENDLY_URL } from "@/lib/ai-sdr-constants";

const imagineCards = [
  {
    icon: Calendar,
    title: "Handlowiec sprzedaje",
    desc: "Nie siedzi nad Excelem. Spotkania ustawia system — on zamyka deale.",
  },
  {
    icon: BarChart3,
    title: "Twarde dane co tydzień",
    desc: "Ile maili, ile odpowiedzi, ile spotkań, jaki open rate. Zero zgadywania.",
  },
  {
    icon: TrendingUp,
    title: "Przewidywalny pipeline",
    desc: "System pracuje w tle — codziennie, systematycznie, bez chorobowego.",
  },
  {
    icon: Users,
    title: "Spotkanie z zarządem",
    desc: "\u201eSystem umówił 12 spotkań. Zamknęliśmy 3 deale. Pipeline rośnie.\u201d",
  },
];

export function Imagine() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Wyobraź sobie" title="Jak wyglądają Twoje poniedziałkowe poranki?" />
          <p className="text-text-secondary text-center mb-12 leading-relaxed max-w-[680px] mx-auto">
            Poniedziałek rano. Otwierasz kalendarz — 3 potwierdzone spotkania z decydentami.
            Nie szukałeś ich. Nie pisałeś maili. System znalazł, napisał, umówił.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {imagineCards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="bg-white border border-border rounded-[6px] p-6 h-full hover:border-accent transition-colors duration-200">
                <div className="w-10 h-10 rounded-[6px] bg-accent/10 flex items-center justify-center mb-4">
                  <card.icon size={20} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6 md:p-8 text-center mb-10">
            <p className="font-serif text-xl text-text">
              Brzmi jak science fiction? Dla naszych klientów to wtorek.
            </p>
          </div>

          <div className="text-center">
            <Button href={AI_SDR_CALENDLY_URL} external>
              Chcę takie wyniki
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
