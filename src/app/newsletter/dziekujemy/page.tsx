import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/FadeUp";
import { TilesBackground } from "@/components/ui/TilesBackground";
import { CopyLinkButton } from "@/components/newsletter/CopyLinkButton";
import { CheckCircle, Linkedin, Mail, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Jesteś na liście! — AI Insider | LessManual.ai",
  description: "Dziękujemy za zapis do newslettera AI Insider. Pierwszy numer wpadnie w środę o 7:30.",
  robots: { index: false, follow: false },
};

const LINKEDIN_URL = "https://www.linkedin.com/in/bartlomiej-chudzik-7aa740197";

export default function ThankYouPage() {
  const shareText = encodeURIComponent(
    "Zapisałem się do AI Insider — jedynego newslettera AI w Polsce z wersją audio. Polecam: lessmanual.ai/newsletter"
  );
  const shareUrl = encodeURIComponent("https://lessmanual.ai/newsletter");

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
            <div className="max-w-[700px] mx-auto px-6 text-center">
              <FadeUp>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border border-green-200 mb-6">
                  <CheckCircle size={32} strokeWidth={1.5} className="text-green-600" />
                </div>
                <h1 className="font-serif mb-4">Jesteś na liście!</h1>
                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-[540px] mx-auto">
                  Pierwszy numer AI Insider wpadnie do Twojej skrzynki w
                  środę o 7:30.
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="mt-8 bg-white border border-border rounded-[6px] p-6 md:p-8 text-left">
                  <h3 className="font-sans font-semibold text-text mb-3">
                    Co teraz?
                  </h3>
                  <ol className="space-y-3 text-text-secondary leading-relaxed">
                    <li className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center">
                        1
                      </span>
                      <span>
                        <strong className="text-text">Sprawdź skrzynkę</strong>{" "}
                        (również SPAM) — za chwilę dostaniesz welcome mail z
                        potwierdzeniem.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center">
                        2
                      </span>
                      <span>
                        <strong className="text-text">
                          Dodaj kontakt@lessmanual.ai do kontaktów
                        </strong>{" "}
                        — żeby newsletter nie wpadał do spamu.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center">
                        3
                      </span>
                      <span>
                        <strong className="text-text">W środę o 7:30</strong> —
                        pierwszy numer w Twojej skrzynce.
                      </span>
                    </li>
                  </ol>
                </div>
              </FadeUp>
            </div>
          </section>
        </div>

        {/* Kto za tym stoi */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[700px] mx-auto px-6">
            <FadeUp>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-accent/20">
                  <Image
                    src="/bartek.jpg"
                    alt="Bartłomiej Chudzik"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-text-secondary leading-relaxed">
                    <strong className="text-text">Cześć, tu Bartek.</strong>{" "}
                    Dzięki za zaufanie. Jeżeli masz jakiekolwiek pytanie,
                    śmiało odpowiedz na dowolnego maila.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Next steps */}
        <section className="py-16 md:py-20 bg-bg">
          <div className="max-w-[700px] mx-auto px-6">
            <FadeUp>
              <h2 className="font-serif text-center mb-10">
                Podczas gdy czekasz na środę
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FadeUp delay={0.05}>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white border border-border rounded-[6px] p-5 hover:border-accent/40 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.08)] transition-all duration-200"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center">
                    <Linkedin size={20} strokeWidth={1.5} className="text-[#0A66C2]" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-text text-sm">
                      Obserwuj na LinkedIn
                    </p>
                    <p className="text-xs text-text-muted">
                      Codzienne posty o AI w biznesie
                    </p>
                  </div>
                </a>
              </FadeUp>

              <FadeUp delay={0.1}>
                <Link
                  href="/blog"
                  className="flex items-center gap-4 bg-white border border-border rounded-[6px] p-5 hover:border-accent/40 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.08)] transition-all duration-200"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BookOpen size={20} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-text text-sm">
                      Sprawdź bloga
                    </p>
                    <p className="text-xs text-text-muted">
                      Artykuły o AI dla firm B2B
                    </p>
                  </div>
                </Link>
              </FadeUp>
            </div>

            {/* Share */}
            <FadeUp delay={0.15}>
              <div className="mt-10 text-center">
                <p className="text-sm text-text-light mb-4">
                  Znasz kogoś, komu to pomoże? Poleć dalej:
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-text-secondary hover:border-accent/40 hover:text-accent transition-all duration-200"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent("Newsletter AI Insider — polecam")}&body=${shareText}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-text-secondary hover:border-accent/40 hover:text-accent transition-all duration-200"
                  >
                    <Mail size={16} />
                    Email
                  </a>
                  <CopyLinkButton />
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
