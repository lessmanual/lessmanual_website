import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { ORGANIZATION_SCHEMA, serializeJsonLd } from "@/lib/schema";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { BzykDefs } from "@/components/site/Bzyk";
import { META, SITE_URL } from "@/content/site";
import { SKRYPT_ZGODY_PRZED_MALOWANIEM } from "@/lib/consent";

// next/font hostuje pliki z tej samej domeny (bez blokującego Google Fonts).
// Instrument Serif tylko kursywą: używamy go wyłącznie do wyróżnionego słowa w nagłówku.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["italic"],
  display: "swap",
  // Jedno wyróżnione słowo w H1: bez preloadu, żeby nie konkurowało z Inter o pasmo przed LCP.
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
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
