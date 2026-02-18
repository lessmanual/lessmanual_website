"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { PRODUCTS, CALENDLY_URL } from "@/lib/constants";

const PRODUCT_NUMBERS = ["01", "02", "03", "04"];

export function OfertaGrid() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-bg">
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
              Wybierz rozwiązanie AI dla swojej firmy
            </h1>
            <p className="text-xl text-text-secondary max-w-[680px] mx-auto leading-relaxed">
              Każdy system działa pod klucz — my budujemy, Ty widzisz wyniki.
              Gwarancja wyników lub pełny zwrot kosztów.
            </p>
          </FadeUp>
          </div>
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
              const isPopular = product.badge === "NAJPOPULARNIEJSZE";

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
                        Najpopularniejsze
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
                    <div className="mt-auto space-y-3">
                      <Link
                        href={product.landingHref}
                        className={`block text-center px-8 py-3.5 font-sans font-medium text-base rounded-lg transition-all duration-200 ${
                          isPopular
                            ? "bg-accent text-white hover:bg-accent-hover hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.3)]"
                            : "border-2 border-border text-text hover:border-accent hover:text-accent"
                        }`}
                      >
                        Dowiedz się więcej
                      </Link>
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-xs text-text-light hover:text-accent transition-colors"
                      >
                        lub umów rozmowę →
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeUp>
            <div className="text-center">
              <p className="text-text-secondary mb-4">
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
    </>
  );
}
