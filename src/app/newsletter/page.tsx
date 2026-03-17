import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/FadeUp";
import { TilesBackground } from "@/components/ui/TilesBackground";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { BarChart3, Wrench, TrendingUp, Zap, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Insider - Newsletter AI dla firm B2B | LessManual.ai",
  description:
    "Najważniejsze newsy ze świata AI w 5 minut. Co środę o 7:30. Biznes, narzędzia, trendy + audio MP3 do słuchania w aucie. Redagowane przez praktyka.",
  openGraph: {
    title: "AI Insider - Newsletter AI dla firm B2B",
    description:
      "AI robi research. Bartek daje kontekst. Co środę o 7:30 + audio MP3.",
    url: "https://lessmanual.ai/newsletter",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  alternates: {
    canonical: "https://lessmanual.ai/newsletter",
  },
};

const CATEGORIES = [
  {
    icon: BarChart3,
    title: "Biznes",
    desc: "Jak AI zmienia sprzedaż, marketing i operacje w firmach B2B. Bez teorii, tylko newsy które wpływają na Twój przychód.",
  },
  {
    icon: Wrench,
    title: "Narzędzia",
    desc: "Nowe narzędzia AI które oszczędzają czas. Przetestowane, opisane po polsku, z linkiem. Nie clickbait, nie reklama.",
  },
  {
    icon: TrendingUp,
    title: "Trendy",
    desc: "Co się zmienia w branży AI i co to znaczy dla Twojej firmy w Polsce. Kontekst, nie panika.",
  },
  {
    icon: Zap,
    title: "Tip tygodnia",
    desc: "1 konkretna rzecz do wdrożenia w mniej niż godzinę. Narzędzie, kroki, efekt. Weź i wdróż u siebie.",
  },
  {
    icon: Headphones,
    title: "Audio MP3",
    desc: "Każdy numer w wersji do słuchania, 5-7 minut, polski lektor. W aucie, na treningu, w kuchni. Podcast dla ludzi, którzy nie mają czasu na podcasty.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <TilesBackground />
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 45%, transparent 0%, rgba(240,237,238,0.5) 50%, rgba(240,237,238,0.95) 100%)",
            }}
          />
          <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-[800px] mx-auto px-6">
            <FadeUp>
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-accent" />
                <span className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-accent">
                  Jedyny w Polsce newsletter AI z audio
                </span>
              </div>
              <h1 className="font-serif text-center">
                AI w 5 minut - przeczytaj albo posłuchaj
              </h1>
              <p className="mt-5 text-xl md:text-2xl text-center text-text-secondary leading-relaxed max-w-[640px] mx-auto">
                AI robi research. Bartek daje kontekst. Ty dostajesz to co
                ważne dla Twojego biznesu, nie ściemę.
              </p>
              <p className="mt-4 text-base text-center text-text-light max-w-[540px] mx-auto leading-relaxed">
                Co środę o 7:30. Wersja tekstowa i MP3 do słuchania w aucie.
                Każdy numer redaguję osobiście.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mt-10">
                <NewsletterForm />
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="mt-4 text-center text-sm text-text-muted">
                Dołącz do właścicieli firm B2B, którzy wiedzą o AI więcej niż
                ich konkurencja.
              </p>
            </FadeUp>
          </div>
          </section>
        </div>

        {/* Co dostajesz */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[900px] mx-auto px-6">
            <FadeUp>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="w-8 h-[2px] bg-accent" />
                  <span className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-accent">
                    Co dostajesz
                  </span>
                </div>
                <h2 className="font-serif">
                  Co dostajesz w każdym numerze
                </h2>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CATEGORIES.slice(0, 4).map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <FadeUp key={cat.title} delay={0.05 * i}>
                    <div className="bg-bg border border-border rounded-[6px] p-6 h-full hover:border-accent/40 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.08)] transition-all duration-200">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <Icon size={20} strokeWidth={1.5} className="text-accent" />
                      </div>
                      <h3 className="font-sans font-semibold text-text text-lg mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>

            {/* Audio MP3 — wycentrowane na dole */}
            <FadeUp delay={0.25}>
              <div className="mt-5 flex justify-center">
                <div className="w-full sm:w-1/2 bg-bg border border-border rounded-[6px] p-6 hover:border-accent/40 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.08)] transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Headphones size={20} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <h3 className="font-sans font-semibold text-text text-lg mb-2">
                    + Audio MP3
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {CATEGORIES[4].desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Dlaczego ten newsletter */}
        <section className="py-20 md:py-28 bg-bg">
          <div className="max-w-[800px] mx-auto px-6">
            <FadeUp>
              <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="w-8 h-[2px] bg-accent" />
                  <span className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-accent">
                    Dlaczego
                  </span>
                </div>
                <h2 className="font-serif">
                  Dlaczego akurat ten newsletter
                </h2>
              </div>
            </FadeUp>

            <div className="space-y-6">
              {[
                {
                  title: "Nie GPT-newsletter",
                  text: "Co środę: mój komentarz praktyka który wdrożył 13+ systemów AI w polskich firmach B2B. AI zbiera dane, ja wybieram co ważne i dodaję swoje doświadczenia z wdrożeń.",
                },
                {
                  title: "30+ źródeł do 8-10 najważniejszych",
                  text: "Codziennie zbieram dane z OpenAI, Google, Microsoft, TechCrunch, Reddit, polskich mediów i kilkunastu newsletterów. AI filtruje. Ty dostajesz to co warto wiedzieć. Reszta idzie do kosza.",
                },
                {
                  title: "Jedyny w Polsce z audio",
                  text: "Nie masz czasu czytać? Każdy numer ma wersję MP3, 5-7 minut, polski lektor. Włącz w aucie albo na treningu. Nikt inny tego nie robi.",
                },
                {
                  title: "Filtr polskiego B2B, nie Silicon Valley",
                  text: "Nie interesuje Cię co robi startup w San Francisco. Interesuje Cię co z tego wynika dla Twojej firmy w Polsce. Każdy news oceniam pod kątem: czy to zmienia coś dla właściciela firmy B2B.",
                },
                {
                  title: "Cały pipeline działa na AI",
                  text: "Zbieranie danych, filtrowanie, kategoryzacja, redakcja, generowanie audio, cały pipeline działa na AI. Buduję systemy AI dla firm. Ten newsletter to dowód, że działają.",
                },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={0.05 * i}>
                  <div className="bg-white border border-border rounded-[6px] p-6 md:p-8 hover:border-accent/40 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.08)] transition-all duration-200">
                    <h3 className="font-sans font-semibold text-text text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Kto za tym stoi */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <FadeUp>
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-accent/20">
                  <Image
                    src="/bartek.jpg"
                    alt="Bartłomiej Chudzik - Founder LessManual.ai"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-sans font-semibold text-text text-lg">
                    Bartłomiej Chudzik
                  </h3>
                  <p className="font-mono text-sm text-accent mb-3">
                    Founder LessManual.ai
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    13+ wdrożeń AI w polskich firmach B2B. Buduję systemy
                    sprzedaży, obsługi klienta i content marketingu. Ten
                    newsletter to dowód, że moje systemy działają, cały
                    pipeline od zbierania danych po generowanie audio działa na
                    AI.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 bg-bg border-t border-border">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <FadeUp>
              <h2 className="font-serif mb-4">
                Wiedz więcej niż konkurencja
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-[560px] mx-auto">
                Co środę o 7:30. 5 minut czytania albo słuchania. Zero spamu.
                Wypisz się jednym klikiem.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <NewsletterForm />
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
