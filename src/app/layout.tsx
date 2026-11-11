import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { ORGANIZATION_SCHEMA, serializeJsonLd } from "@/lib/schema";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { BzykDefs } from "@/components/site/Bzyk";
import { META, SITE_URL } from "@/content/site";
import { SKRYPT_ZGODY_PRZED_MALOWANIEM } from "@/lib/consent";

// Fonty z własnej domeny, przycięte do znaków strony (łacina podstawowa, Latin-1, polskie litery,
// polskie cudzysłowy i myślniki; pliki z Google Fonts z parametrem text=, licencja SIL OFL).
// Inter 400-600 ma 44 kB zamiast 133 kB (latin + latin-ext z next/font/google), Instrument Serif
// 16 kB zamiast 24 kB. Mniej bajtów przed pierwszym malowaniem = zapas LCP na telefonie (delta QA
// 11.11). Znak spoza zestawu (np. w treści bloga) przeglądarka pokaże fontem zastępczym.
// Wariant B (decyzja CEO 11.11, RAPORT_BUDOWY.md, „Paczka 4”): fonty marki od pierwszej wizyty,
// czyli preload + swap, bez inlineCss (`optional` dawał lepsze LCP, ale nowy odwiedzający widział
// Arial i Times). Inter jest w pierwszym ekranie każdej strony i jest jednym plikiem zmiennej
// grubości 400-600, więc nie da się preloadować samych użytych grubości. Instrument Serif jest
// tylko w H1 strony głównej, ale preload per strona nie działa: Turbopack (Next 16.2) wpisuje font
// do manifestu wszystkich tras także po deklaracji w app/page.tsx (sprawdzone 11.11, manifest
// next-font). Dlatego oba fonty mają preload tutaj; serif to 16 kB.
const instrumentSerif = localFont({
  src: "./fonts/instrument-serif-italic-pl.woff2",
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  preload: true,
});

const inter = localFont({
  src: "./fonts/inter-pl-400-600.woff2",
  variable: "--font-inter",
  weight: "400 600",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: META.title,
    template: "%s | LessManual",
  },
  description: META.description,
  openGraph: {
    title: META.ogTitle,
    description: META.ogDescription,
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: META.ogTitle,
    description: META.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Przed malowaniem: chowa baner cookies u osób z ważną zgodą (bez czekania na JS). */}
        <script dangerouslySetInnerHTML={{ __html: SKRYPT_ZGODY_PRZED_MALOWANIEM }} />
      </head>
      <body className={`${instrumentSerif.variable} ${inter.variable}`}>
        <BzykDefs />
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(ORGANIZATION_SCHEMA),
          }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
