"use client";

import { Star } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { REVIEWS } from "@/lib/constants";
import { OBS_KLIENTA_CALENDLY_URL } from "@/lib/obsluga-klienta-constants";

const billboardMetrics = [
  { value: "60-80%", label: "zapytań rozwiązanych automatycznie" },
  { value: "<30s", label: "czas odpowiedzi" },
  { value: "2-5 etatów", label: "oszczędność w obsłudze" },
  { value: "3x częściej", label: "kupują klienci z szybką odpowiedzią" },
];


export function SocialProof() {
  return (
    <section id="wyniki" className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Wyniki"
            title="Co widzimy u firm, które wdrażają takie systemy"
          />
        </FadeUp>

        {/* Billboard metrics */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {billboardMetrics.map((m) => (
            <StaggerItem key={m.label}>
              <div className="bg-bg border border-border rounded-[6px] p-6 text-center">
                <div className="font-mono text-3xl md:text-4xl font-bold text-accent mb-2">
                  {m.value}
                </div>
                <div className="text-xs text-text-light">{m.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Case Study */}
        <FadeUp delay={0.15}>
          <div className="bg-white border-l-[3px] border-l-accent border border-border rounded-r-[6px] rounded-l-none p-6 md:p-8 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-sans font-semibold uppercase tracking-wider bg-accent/10 text-accent rounded-full">
                Case Study
              </span>
              <span className="font-serif text-lg">Szkoła tańca — Voice Agent</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-4">
              <strong className="text-text">Problem:</strong> Właścicielka na
              zajęciach — nie może odebrać telefonu. Klienci dzwonią do
              konkurencji.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              <strong className="text-text">Rozwiązanie:</strong> Voice Agent —
              odbiera telefony 24/7, odpowiada na pytania, zapisuje na zajęcia.
            </p>
            <p className="font-serif text-2xl text-text">
              <strong className="text-text">Wynik:</strong>{" "}
              <span className="text-accent">24/7 odbiór telefonów.</span> Zero
              utraconych klientów przez nieodebrane połączenia.
            </p>
          </div>
        </FadeUp>

        {/* Bottom text */}
        <FadeUp delay={0.2}>
          <div className="bg-bg border border-border rounded-[6px] p-6 mb-12">
            <p className="text-sm text-text-secondary leading-relaxed text-center">
              System jest lepszy w miesiącu 3 niż w miesiącu 1 — bo uczymy go
              na bieżąco.
            </p>
          </div>
        </FadeUp>

        {/* Marquee Reviews */}
        <FadeUp delay={0.25}>
          <div className="text-center mb-8">
            <h3 className="font-serif text-xl mb-4">Co mówią nasi klienci</h3>
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
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        <FadeUp delay={0.3}>
          <div className="text-center">
            <p className="text-text-secondary mb-4">Chcesz takich wyników? Porozmawiajmy.</p>
            <Button href={OBS_KLIENTA_CALENDLY_URL} external>
              Chcę odpowiedzi w 30 sekund
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
