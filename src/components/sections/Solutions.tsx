"use client";

import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";

const SOLUTIONS = [
  {
    num: "01",
    title: "Spotkania z decydentami",
    popular: true,
    description:
      "System znajduje Twoich idealnych klientów, pisze spersonalizowane wiadomości i umawia spotkania w Twoim kalendarzu.",
    metrics: [
      { value: "76%", label: "open rate (standard: 20-30%)" },
      { value: "0 PLN", label: "stałych opłat — płacisz za spotkania" },
    ],
    href: "/oferta/ai-sdr",
  },
  {
    num: "02",
    title: "Blog który pisze się sam",
    description:
      "10-30 artykułów SEO miesięcznie. Keyword research, klastry tematyczne, internal linking. Ruch rośnie — Ty nie robisz nic.",
    metrics: [
      { value: "od 83 PLN", label: "za artykuł (vs 300-800 PLN)" },
      { value: "+150-400%", label: "ruchu organicznego w 6 mies." },
    ],
    href: "/oferta/seo-content",
  },
  {
    num: "03",
    title: "Odpowiedź w 30 sekund, 24/7",
    description:
      "Odpowiada klientom na stronie, WhatsApp i mailu. Wytrenowany na Twojej bazie wiedzy. Czego nie wie — przekazuje do Ciebie.",
    metrics: [
      { value: "60-80%", label: "zapytań obsłużonych automatycznie" },
      { value: "od 900 PLN", label: "/mies vs pracownik 8-9k" },
    ],
    href: "/oferta/obsluga-klienta",
  },
  {
    num: "04",
    title: "Wycena w 5 minut zamiast 2h",
    description:
      "Klient sam wycenia na Twojej stronie. System generuje profesjonalny PDF z Twoim logo, wysyła mailem i pilnuje follow-upu.",
    metrics: [
      { value: "96%", label: "mniej czasu na tworzenie ofert" },
      { value: "+25-40%", label: "win rate dzięki szybkości odpowiedzi" },
    ],
    href: "/oferta/generator-ofert",
  },
];

export function Solutions() {
  return (
    <section id="oferta" className="py-28 md:py-40 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Rozwiązania"
            title="Jeden system. Konkretny problem rozwiązany."
            subtitle="Każdy system działa pod klucz — my budujemy, Ty widzisz wyniki."
          />
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {SOLUTIONS.map((product) => (
            <StaggerItem key={product.num}>
              <div
                className={`relative bg-bg border rounded-[6px] p-6 md:p-8 h-full flex flex-col overflow-hidden transition-all duration-200 hover:border-accent hover:scale-[1.01] group ${
                  product.popular
                    ? "border-accent border-2"
                    : "border-border"
                }`}
              >
                {/* Popular badge */}
                {product.popular && (
                  <span className="absolute top-0 right-6 bg-accent text-white text-[0.65rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-b-[4px]">
                    Najpopularniejsze
                  </span>
                )}

                {/* Decorative number */}
                <span className="absolute top-4 right-5 font-mono text-7xl font-bold text-accent/10 leading-none select-none pointer-events-none group-hover:text-accent/15 transition-colors duration-200">
                  {product.num}
                </span>

                {/* Content */}
                <div className="relative flex-1">
                  <h3 className="font-serif text-2xl mb-3 pr-14">{product.title}</h3>
                  <p className="text-text-secondary text-lg leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Key metrics */}
                  <div className="space-y-2 mb-6">
                    {product.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-baseline gap-2">
                        <span className="font-mono text-base font-semibold text-accent shrink-0">
                          {metric.value}
                        </span>
                        <span className="text-base text-text-muted">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-auto space-y-3">
                  <Button href={CALENDLY_URL} variant={product.popular ? "primary" : "secondary"} external className="text-base w-full">
                    Chcę to wdrożyć
                  </Button>
                  <a
                    href={product.href}
                    className="block text-center text-sm text-text-light hover:text-accent transition-colors"
                  >
                    Dowiedz się więcej →
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp>
          <div className="text-center">
            <p className="text-text-secondary text-lg mb-4">
              <strong className="text-text">Nie wiesz od czego zacząć?</strong>{" "}
              80% naszych klientów zaczyna od Spotkań z decydentami — bo najszybciej
              przekłada się na przychód.
            </p>
            <Button href={CALENDLY_URL} external>
              Dobierzmy system do Twojej firmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
