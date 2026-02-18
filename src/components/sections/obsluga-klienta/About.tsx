"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { OBS_KLIENTA_CALENDLY_URL } from "@/lib/obsluga-klienta-constants";

export function About() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <h2 className="font-serif text-center mb-12">Kto za tym stoi</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16">
          <FadeUp delay={0.1}>
            <div className="w-full max-w-[280px] mx-auto overflow-hidden rounded-[6px] border border-border">
              <Image
                src="/bartek.jpg"
                alt="Bartłomiej Chudzik - Founder LessManual.ai"
                width={280}
                height={373}
                className="w-full h-auto object-cover"
                priority={false}
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div>
              <h3 className="font-serif text-2xl mb-1">Bartłomiej Chudzik</h3>
              <p className="font-mono text-sm text-accent mb-6">Founder LessManual.ai</p>

              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Wiem jak to jest. 12 godzin dziennie. 300 maili. Te same pytania 30 razy.
                  Telefon, który dzwoni gdy jesteś na spotkaniu.
                </p>
                <p>
                  Przez 8 lat robiłem to w logistyce — międzynarodowe korporacje, miliony ton
                  na trasach, terminowość 99%. Aż zrozumiałem: większość tej roboty może robić system.
                </p>
                <p>
                  Dziś buduję systemy obsługi klienta dla firm, które mają dość ręcznej roboty.
                  E-commerce, kliniki, hotele — firmy z dużym wolumenem powtarzalnych zapytań.
                </p>
                <p className="text-text font-medium">
                  5.0 na Google. Gwarancja wyników. Nie działa — zwracam pieniądze.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 mb-8">
                {["10+ wdrożeń", "5.0 na Google", "Done-for-you"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <Button href={OBS_KLIENTA_CALENDLY_URL} external>
                Porozmawiajmy o Twoim systemie
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
