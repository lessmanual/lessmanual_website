"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AI_SDR_COST_TABLE } from "@/lib/ai-sdr-constants";

export function Problem() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Problem"
            title="Szukasz klientów B2B? Znasz to."
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {[
              { num: "01", title: "Ręczny prospecting", desc: "20-40 godzin miesięcznie. To pół etatu na coś, co nie jest sprzedażą." },
              { num: "02", title: "Kupione leady", desc: "Excel z numerami. Zero odpowiedzi. Kontakt na liście to nie spotkanie." },
              { num: "03", title: "Zatrudnienie handlowca", desc: "12-22k PLN/mies. Plus 3-6 miesięcy onboardingu. 40% odchodzi w ciągu roku." },
              { num: "04", title: "Życie z poleceń", desc: "Działa. Dopóki się nie skończy. A kiedy pipeline jest pusty — zaczynasz od zera." },
            ].map((item) => (
              <div key={item.num} className="relative bg-bg border border-border rounded-[6px] p-6 md:p-8 overflow-hidden hover:border-warning/50 transition-colors duration-200 group">
                <span className="absolute top-4 right-5 font-mono text-7xl font-bold text-accent/10 leading-none select-none pointer-events-none group-hover:text-accent/15 transition-colors duration-200">
                  {item.num}
                </span>
                <p className="text-xl text-text font-medium mb-2 pr-14">{item.title}</p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h3 className="font-serif text-2xl mb-6 text-center">Policz, ile Cię to kosztuje:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {AI_SDR_COST_TABLE.map((row) => (
              <div key={row.task} className="bg-bg border border-border rounded-[6px] p-5">
                <div className="text-lg font-medium text-text mb-3">{row.task}</div>
                <div className="flex items-baseline gap-2 text-lg mb-1">
                  <span className="font-mono text-warning font-semibold">{row.currentCost}</span>
                </div>
                <div className="flex items-baseline gap-2 text-lg">
                  <span className="font-mono text-success font-semibold">{row.ourCost}</span>
                  <span className="text-base text-text-muted">z naszym systemem</span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center">
            <p className="text-text font-medium">
              Rocznie to 100-300 tysięcy PLN na szukanie klientów. Ile z tego faktycznie
              przynosi spotkania z decydentami?
            </p>
          </div>
          <p className="mt-6 text-text-secondary text-center leading-relaxed">
            Potrzebujesz spotkań, nie leadów. Spotkań z ludźmi, którzy decydują,
            w firmach, które pasują do Twojego profilu klienta.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
