"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { SEO_CALENDLY_URL } from "@/lib/seo-content-constants";

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
              <p className="font-mono text-base text-accent mb-6">Founder LessManual.ai</p>

              <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
                <p>
                  Widziałem, jak firmy płacą copywriterom 5-8k PLN miesięcznie za 10 artykułów,
                  które nie rankują. Albo kupują narzędzia SaaS i odkrywają, że ktoś musi te
                  artykuły napisać, zoptymalizować i opublikować. Ten &ldquo;ktoś&rdquo; to zawsze
                  właściciel — który ma milion ważniejszych rzeczy do zrobienia.
                </p>
                <p>
                  Postawiłem system, który robi keyword research, pisze artykuły SEO, optymalizuje
                  i publikuje. Done-for-you. Bez ręcznej roboty. Teraz ten sam system stawiam
                  dla firm, które chcą ruch z Google bez poświęcania na to czasu.
                </p>
                <p className="text-text font-medium">
                  Nie sprzedaję artykułów. Sprzedaję ruch organiczny, który pracuje latami.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 mb-8">
                {["10-30 artykułów/mies", "5.0 na Google", "Done-for-you"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <Button href={SEO_CALENDLY_URL} external>
                Porozmawiajmy o Twojej firmie
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
