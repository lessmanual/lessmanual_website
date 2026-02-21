"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GEN_OFERT_COST_TABLE } from "@/lib/generator-ofert-constants";

export function Problem() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Problem"
            title={`'Każda oferta to 2 godziny mojego życia. A połowa i tak nie wróci.'`}
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="text-text-secondary leading-relaxed mb-10 space-y-4 text-lg">
            <p>
              Kończysz rozmowę z klientem. Zapisujesz wymiary na kartce. Otwierasz Excela,
              szukasz cenników, przeliczasz materiały, formatujesz. Dwie godziny później masz PDF. Wysyłasz.
            </p>
            <p>
              I cisza.
            </p>
            <p>
              Klient &ldquo;się zastanawia&rdquo;. Albo już zamówił u konkurencji, która
              wysłała ofertę dwie godziny po rozmowie. Ty wysłałeś po trzech dniach.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {[
              { num: "01", title: "Ręczne wyceny 2h", desc: "Każda oferta to 2 godziny pracy. Ręczne przeliczanie materiałów, cen, marż. Co miesiąc to 40 godzin." },
              { num: "02", title: "Chaos w cennikach", desc: "Cenniki w Excelu, w mailu, w głowie. Każdy handlowiec liczy inaczej. Błędy kosztują Cię pieniądze." },
              { num: "03", title: "Późne oferty", desc: "Klient dostał 3 oferty. Wybrał tego, kto odpowiedział najszybciej. Ty wysłałeś po 3 dniach." },
              { num: "04", title: "Wieczorne kosztorysy", desc: "Właściciel siedzi wieczorami nad wycenami, bo tylko on zna ceny. Wiedza zamknięta w głowie jednej osoby." },
            ].map((item) => (
              <div key={item.num} className="relative bg-bg border border-border rounded-[6px] p-6 md:p-8 overflow-hidden hover:border-warning/50 transition-colors duration-200 group">
                <span className="absolute top-4 right-5 font-mono text-7xl font-bold text-accent/10 leading-none select-none pointer-events-none group-hover:text-accent/15 transition-colors duration-200">
                  {item.num}
                </span>
                <p className="text-text font-medium mb-2 pr-14">{item.title}</p>
                <p className="text-base text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h3 className="font-serif text-xl mb-6 text-center">Policz sam:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {GEN_OFERT_COST_TABLE.map((row) => (
              <div key={row.task} className="bg-bg border border-border rounded-[6px] p-5">
                <div className="text-base font-medium text-text mb-3">{row.task}</div>
                <div className="flex items-baseline gap-2 text-base">
                  <span className="font-mono text-warning font-semibold">{row.result}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center">
            <p className="text-text font-medium">
              A na spotkaniu z zespołem znowu tłumaczysz, dlaczego oferty wychodzą za wolno.
              Chaos w wycenach to chaos w firmie &mdash; i to widać.
            </p>
          </div>
          <p className="mt-6 text-text-secondary text-center leading-relaxed">
            To nie jest problem z Twoimi umiejętnościami. To problem z procesem. I można go rozwiązać.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
