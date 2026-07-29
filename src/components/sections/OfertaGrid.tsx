"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { AI_GROWTH_MAP_URL, PRODUCTS } from "@/lib/constants";
import { PROOF_COMPACT } from "@/lib/social-proof";

const PRODUCT_NUMBERS = ["01", "02", "03", "04", "05", "06"];

export function OfertaGrid() {
  return (
    <>
      {/* Hero */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20 bg-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeUp>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Strona główna
            </Link>
          </FadeUp>
          <div className="text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-accent">
                Oferta
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-5">
              Wdrożenia AI dla firm, które chcą rosnąć bez dokładania ręcznej pracy.
            </h1>
            <p className="text-xl text-text-secondary max-w-[680px] mx-auto leading-relaxed">
              Najpierw sprawdzamy, gdzie znika czas i pieniądze. Potem dostajesz
              konkretny zakres, termin i sposób utrzymania.
            </p>
          </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-bg py-14 md:py-18">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[6px] border border-border bg-white p-6 md:p-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Jednorazowe wdrożenie
              </span>
              <h2 className="mt-3 font-serif text-2xl">
                Budujemy i uruchamiamy system
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Audytujemy proces i KPI, porządkujemy źródła, dobieramy
                integracje, budujemy, testujemy na realnych danych i
                przekazujemy dokumentację.
              </p>
            </div>
            <div className="rounded-[6px] border border-border bg-white p-6 md:p-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Miesięczna opieka
              </span>
              <h2 className="mt-3 font-serif text-2xl">
                Utrzymujemy ciągłość i jakość
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Po wdrożeniu bierzemy odpowiedzialność za działanie i rozwój rozwiązania.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Utrzymujemy hosting oraz uzgodnione narzędzia, monitorujemy jakość, naprawiamy błędy, aktualizujemy bazę wiedzy i ulepszamy istniejący workflow. Koszty mieszczą się w miesięcznej opiece do limitów zapisanych w ofercie. Nowy moduł, kanał lub integracja dostaje osobny zakres i wycenę.
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-text-secondary">
            Nowe funkcje, kanały, integracje, migracje do innego dostawcy i
            większe przebudowy dostają osobny zakres oraz wycenę przed startem.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Dokładną częstotliwość monitoringu i raportowania, czas reakcji, limity narzędzi oraz zakres zmian zapisujemy w indywidualnej ofercie i umowie.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {PRODUCTS.map((product, idx) => {
              const num = PRODUCT_NUMBERS[idx];
              const isPopular = product.badge === "PRIMARY";

              return (
                <StaggerItem key={num}>
                  <div
                    className={`relative bg-bg border rounded-[6px] p-6 md:p-8 h-full flex flex-col overflow-hidden transition-all duration-200 hover:border-accent hover:scale-[1.01] group ${
                      isPopular ? "border-accent border-2" : "border-border"
                    }`}
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <span className="absolute top-0 right-6 bg-accent text-white text-[0.65rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-b-[4px]">
                        Primary
                      </span>
                    )}

                    {/* Decorative number */}
                    <span className="absolute top-4 right-5 font-mono text-7xl font-bold text-accent/10 leading-none select-none pointer-events-none group-hover:text-accent/15 transition-colors duration-200">
                      {num}
                    </span>

                    {/* Content */}
                    <div className="relative flex-1">
                      <h3 className="font-serif text-xl mb-3 pr-14">
                        {product.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-5">
                        {product.description}
                      </p>

                      {/* Key metrics */}
                      <div className="space-y-2 mb-6">
                        {product.metrics.slice(0, 2).map((metric) => (
                          <div
                            key={metric}
                            className="flex items-baseline gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1" />
                            <span className="text-xs text-text-muted">
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-auto">
                      <Link
                        href={product.landingHref}
                        className={`block text-center px-8 py-3.5 font-sans font-medium text-base rounded-lg transition-all duration-200 ${
                          isPopular
                            ? "bg-accent text-white hover:bg-accent-hover hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.3)]"
                            : "border-2 border-border text-text hover:border-accent hover:text-accent"
                        }`}
                      >
                        Zobacz zakres
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <div className="mb-10 border-y border-border py-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
              {PROOF_COMPACT}
            </p>
          </div>

          <FadeUp>
            <div className="text-center">
              <p className="text-text-secondary mb-4">
                <strong className="text-text">Nie wiesz od czego zacząć?</strong>{" "}
                Zaczniemy od AI Growth Opportunity Map i wybierzemy pierwszy system,
                który ma największą szansę szybko dowieźć wynik.
              </p>
              <Button href={AI_GROWTH_MAP_URL}>
                Sprawdź pierwszy proces do automatyzacji
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
