"use client";

import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GUARANTEE_POINTS, CALENDLY_URL } from "@/lib/constants";

export function Guarantee() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Gwarancja" title="Ryzyko jest po mojej stronie. Nie Twojej." />
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-text-secondary leading-relaxed mb-6 text-center">
            Płacisz komuś zaliczkę, czekasz tydzień, dostajesz coś co nie działa,
            a potem cisza. Znam te historie. Nie chcę być tym gościem.
          </p>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-10">
            <p className="text-text font-medium">
              Dlatego jedna zasada: Gwarancja wyników lub pełny zwrot kosztów.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <Card className="p-6 md:p-8 mb-10">
            <h3 className="font-serif text-lg mb-6">Jak to wygląda w praktyce:</h3>
            <StaggerContainer staggerDelay={0.1} className="space-y-3">
              {GUARANTEE_POINTS.map((point) => (
                <StaggerItem key={point}>
                  <div className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                    <Check size={16} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{point}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Card>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-text-secondary leading-relaxed mb-8 text-center">
            <strong className="text-text">Nie musisz kupować wszystkiego na raz.</strong>{" "}
            Zaczynasz od jednego systemu pilotażowego. Widzisz wyniki — decydujesz o kolejnych.
          </p>

          <h3 className="font-serif text-lg mb-6 text-center">Dlaczego mogę to obiecać?</h3>
          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { num: "1", title: "Wybieram klientów", desc: "Nie biorę projektów gdzie nie widzę realnych wyników. Firma B2B z dobrym produktem/usługą — to mój klient." },
              { num: "2", title: "Sprawdzony mechanizm", desc: "Te same systemy działają u firm z IT, logistyki, OZE, e-commerce. 5.0 na Google." },
              { num: "3", title: "Prowadzę osobiście", desc: "Nie deleguję do juniorów. Każdy system buduję sam — max 3 projekty miesięcznie." },
            ].map((item) => (
              <StaggerItem key={item.num}>
                <div className="bg-bg border border-border rounded-[6px] p-6 md:p-8 h-full text-center hover:border-accent transition-colors duration-200">
                  <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-mono text-base font-semibold mb-4 mx-auto">
                    {item.num}
                  </div>
                  <h4 className="font-serif text-xl mb-3">{item.title}</h4>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center">
            <Button href={CALENDLY_URL} external>
              Sprawdź czy Twoja firma kwalifikuje się do gwarancji
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
