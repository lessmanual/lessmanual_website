"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { ROICalculator } from "@/components/ui/ROICalculator";

export function Problem() {
  return (
    <section id="kalkulator" className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Problem" title="Gdzie tracisz pieniądze?" />
        </FadeUp>

        <FadeUp delay={0.1}>
          <QuoteBlock className="mb-10">
            <p>
              &ldquo;4 miesiące robimy outbound. Płacę 2-2.5 tysiące miesięcznie
              — zero spotkań. Agencja obiecywała leady, dostałem puste kontakty w CRM.
              Coś musi się zmienić.&rdquo;
            </p>
          </QuoteBlock>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            Znasz to uczucie? Dobry produkt, dobry zespół — ale:
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {[
            {
              num: "01",
              title: "Nie wiesz skąd przyjdzie klient za miesiąc.",
              text: "Pipeline to rollercoaster. Agencja bierze retainer bez gwarancji. Handlowiec za 12-22 tysięcy — po 3 miesiącach zero spotkań z decydentami.",
              cost: "Koszt: 12-22k PLN/mies",
            },
            {
              num: "02",
              title: "Klient ucieka, bo za wolno odpisujesz.",
              text: "Ofertę wysyłasz po 2 dniach. Klient podpisał u kogoś kto odpowiedział w 5 minut. Na zapytania odpisujesz wieczorem — albo wcale.",
              cost: "Koszt: utracone deale",
            },
            {
              num: "03",
              title: "Blog leży. Konkurencja zbiera Twój ruch.",
              text: "Copywriter kosztuje 5-8 tysięcy za 8 artykułów. Nie masz kiedy pisać sam. Google nagradza tych co publikują regularnie.",
              cost: "Koszt: 5-8k PLN/mies",
            },
            {
              num: "04",
              title: "Oferty piszesz ręcznie. Godzinami.",
              text: "Każda wycena to 1-2h Twojego czasu. A potem klient i tak nie odpowiada. System może generować spersonalizowane oferty w 5 minut.",
              cost: "Koszt: 10-20h Twojego czasu/mies",
            },
          ].map((item) => (
            <StaggerItem key={item.num}>
              <div className="relative bg-bg border border-border rounded-[6px] p-6 md:p-8 h-full overflow-hidden hover:border-warning/50 transition-colors duration-200 group">
                <span className="absolute top-4 right-5 font-mono text-7xl font-bold text-accent/10 leading-none select-none pointer-events-none group-hover:text-accent/15 transition-colors duration-200">
                  {item.num}
                </span>
                <div className="relative">
                  <h3 className="font-serif text-2xl mb-3 pr-14">{item.title}</h3>
                  <p className="text-text-secondary text-lg leading-relaxed mb-4">
                    {item.text}
                  </p>
                  <p className="font-mono text-base font-medium text-warning">
                    {item.cost}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ROI Calculator */}
        <FadeUp>
          <ROICalculator />
        </FadeUp>
      </div>
    </section>
  );
}
