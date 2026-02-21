"use client";

import { Calendar, BarChart3, TrendingUp, Users } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SEO_CALENDLY_URL } from "@/lib/seo-content-constants";

const imagineCards = [
  {
    icon: Calendar,
    title: "Artykuły publikują się same",
    desc: "Blog rośnie. Bez Twojego udziału. System pisze, optymalizuje, publikuje.",
  },
  {
    icon: BarChart3,
    title: "Ruch organiczny rośnie",
    desc: "Pozycje w Google, impresje, kliknięcia. Każdy miesiąc lepiej niż poprzedni.",
  },
  {
    icon: TrendingUp,
    title: "Leady z Google i ChatGPT",
    desc: "Ludzie szukają w Google — znajdują Twój artykuł. Pytają ChatGPT — cytuje Twoją firmę. Dwa kanały, jeden system.",
  },
  {
    icon: Users,
    title: "Spotkanie z zarządem",
    desc: "\u201eBlog wygenerował 200 leadów. Koszt per lead: 12 PLN. Google Ads: 45 PLN.\u201d",
  },
];

export function Imagine() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Wyobraź sobie" title="Jak wygląda Twój marketing za 6 miesięcy?" />
          <p className="text-lg text-text-secondary text-center mb-12 leading-relaxed max-w-[680px] mx-auto">
            Otwierasz Google Analytics. Ruch organiczny +300%. Blog ma 120 artykułów.
            Leady przychodzą z Google — bez reklam, bez cold maili. System zrobił to za Ciebie.
          </p>
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
              Brzmi jak science fiction? To standard po 6 miesiącach.
            </p>
          </div>

          <div className="text-center">
            <Button href={SEO_CALENDLY_URL} external>
              Chcę takie wyniki
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
