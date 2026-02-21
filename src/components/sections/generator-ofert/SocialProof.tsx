"use client";

import { Star } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { GEN_OFERT_CALENDLY_URL } from "@/lib/generator-ofert-constants";
import { REVIEWS } from "@/lib/constants";

const billboardMetrics = [
  { value: "96%", label: "mniej czasu na wyceny", benchmark: "2h → 5 min" },
  { value: "+25-40%", label: "wyższy win rate", benchmark: "szybsza oferta wygrywa" },
  { value: "3h → 0", label: "czas generowania oferty", benchmark: "pełna automatyzacja (OZE)" },
];

export function SocialProof() {
  return (
    <section id="wyniki" className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Wyniki"
            title="Co widzimy u firm, z którymi pracujemy. Nie obietnice — wzorce."
          />
        </FadeUp>

        {/* Billboard metrics */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {billboardMetrics.map((m) => (
            <StaggerItem key={m.label}>
              <div className="bg-bg border border-border rounded-[6px] p-6 text-center">
                <div className="text-sm uppercase tracking-wider text-text-muted mb-2">
                  {m.label}
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold text-accent mb-2">
                  {m.value}
                </div>
                <div className="text-sm text-text-light">{m.benchmark}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* OZE Case Study */}
        <FadeUp delay={0.15}>
          <div className="bg-white border-l-[3px] border-l-accent border border-border rounded-r-[6px] rounded-l-none p-6 md:p-8 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-sans font-semibold uppercase tracking-wider bg-accent/10 text-accent rounded-full">
                Case Study
              </span>
              <span className="font-serif text-xl">Branża OZE</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-4 text-base">
              <strong className="text-text">Problem:</strong> Generowanie jednej wyceny instalacji
              zajmowało 3 godziny. Handlowiec obsługuje 3-4 klientów dziennie. Reszta czeka.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4 text-base">
              <strong className="text-text">Co zrobiliśmy:</strong> Agent wycen PDF &mdash; klient
              podaje dane, system generuje profesjonalną ofertę automatycznie.
            </p>
            <p className="font-serif text-2xl text-text">
              <strong className="text-text">Wynik:</strong>{" "}
              <span className="text-accent">3h &rarr; 0</span> czasu na generowanie oferty.
              Pełna automatyzacja.
            </p>
          </div>
        </FadeUp>

        {/* Industry pattern cards */}
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <div className="bg-bg border border-border rounded-[6px] p-6">
              <h4 className="font-serif text-lg mb-3">Producenci mebli</h4>
              <p className="text-base text-text-secondary leading-relaxed">
                Każda wycena szafy to osobne obliczenia materiałów. Częste błędy w kalkulacji.
                System eliminuje te błędy &mdash; baza materiałów, automatyczna kalkulacja, zero pomyłek.
              </p>
            </div>
            <div className="bg-bg border border-border rounded-[6px] p-6">
              <h4 className="font-serif text-lg mb-3">Firmy remontowe</h4>
              <p className="text-base text-text-secondary leading-relaxed">
                Kosztorys robi właściciel. Wieczorami. Bo tylko on zna ceny podwykonawców.
                Z systemem &mdash; każdy w firmie może wygenerować kosztorys w 5 minut.
              </p>
            </div>
            <div className="bg-bg border border-border rounded-[6px] p-6">
              <h4 className="font-serif text-lg mb-3">Firmy instalacyjne</h4>
              <p className="text-base text-text-secondary leading-relaxed">
                Oferty wychodzą na drugi dzień. Klienci kupują u szybszej konkurencji.
                Z systemem &mdash; oferta wychodzi w 5 minut od rozmowy.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Metrics */}
        <FadeUp delay={0.22}>
          <div className="bg-bg border border-border rounded-[6px] p-6 mb-12">
            <p className="text-sm uppercase tracking-wider text-text-light font-semibold mb-4">Metryki branżowe</p>
            <div className="space-y-2 text-base text-text-secondary">
              <p>Czas tworzenia oferty w branżach technicznych: <strong className="text-text font-mono">1.5-3 godziny</strong> (średnia)</p>
              <p>Win rate przy odpowiedzi w &lt; 2h: <strong className="text-text font-mono">25-40% wyższy</strong> niż przy odpowiedzi w &gt; 24h</p>
              <p>Firmy z automatycznym follow-upem zamykają <strong className="text-text font-mono">35% więcej dealów</strong></p>
            </div>
          </div>
        </FadeUp>

        {/* Google Reviews */}
        <FadeUp delay={0.25}>
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl mb-4">Co mówią nasi klienci</h3>
            <StarRating rating={5.0} count={6} className="justify-center" />
          </div>
        </FadeUp>

        <div className="relative overflow-hidden mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="shrink-0 w-[280px] md:w-[340px] bg-bg border border-border rounded-[6px] p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-sans font-semibold text-sm text-text-secondary border border-border">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-sans font-medium text-sm text-text">
                      {review.name}
                    </div>
                    <div className="text-xs text-text-light">{review.meta}</div>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={13}
                      className="fill-amber-400 text-amber-400"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="text-text-secondary text-base leading-relaxed line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        <FadeUp delay={0.3}>
          <div className="text-center">
            <p className="text-text-secondary mb-4 text-base">Chcesz takich wyników? Porozmawiajmy.</p>
            <Button href={GEN_OFERT_CALENDLY_URL} external>
              Chcę takie wyniki
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
