import Link from "next/link";
import { CALENDLY_URL, EMAIL } from "@/lib/constants";

const products = [
  { name: "AI SDR", href: "/oferta/ai-sdr" },
  { name: "SEO Content", href: "/oferta/seo-content" },
  { name: "Obsługa Klienta", href: "/oferta/obsluga-klienta" },
  { name: "Generator Ofert", href: "/oferta/generator-ofert" },
];

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-mono font-medium text-lg">
              <span className="text-text">Less</span>
              <span className="text-accent">Manual</span>
              <span className="text-text">.ai</span>
            </span>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Systemy AI które uwalniają Twoją firmę od pracy manualnej.
              Gwarancja wyników lub pełny zwrot kosztów.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-sans font-semibold text-text text-sm mb-4">
              Produkty
            </h4>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.name}>
                  <Link
                    href={p.href}
                    className="text-sm text-text-light hover:text-accent transition-colors duration-200"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans font-semibold text-text text-sm mb-4">
              Prawne
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/polityka-prywatnosci"
                  className="text-sm text-text-light hover:text-accent transition-colors duration-200"
                >
                  Polityka prywatnosci
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/polityka-cookies"
                  className="text-sm text-text-light hover:text-accent transition-colors duration-200"
                >
                  Polityka cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/regulamin"
                  className="text-sm text-text-light hover:text-accent transition-colors duration-200"
                >
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-text text-sm mb-4">
              Kontakt
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-mono text-text-light hover:text-accent transition-colors duration-200"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-accent transition-colors duration-200"
                >
                  Umów rozmowę
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} LessManual.ai. Wszystkie prawa
            zastrzeżone.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <Link href="#faq" className="text-text-muted hover:text-accent transition-colors duration-200">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
