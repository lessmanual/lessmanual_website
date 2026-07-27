import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { CookieBanner } from "@/components/legal/CookieBanner";
import ChatWidget from "@/components/chat/ChatWidget";
import { ORGANIZATION_SCHEMA, serializeJsonLd } from "@/lib/schema";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lessmanual.ai"),
  title: {
    default: "LessManual.ai",
    template: "%s | LessManual",
  },
  description:
    "LessManual projektuje, wdraża i utrzymuje agentów AI dla firm B2B.",
  openGraph: {
    title: "LessManual.ai",
    description:
      "Projektujemy, wdrażamy i utrzymujemy agentów AI dla firm B2B.",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LessManual.ai",
    description:
      "Projektujemy, wdrażamy i utrzymujemy agentów AI dla firm B2B.",
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
    <html lang="pl">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(ORGANIZATION_SCHEMA),
          }}
        />
        {children}
        <CookieBanner />
        <ScrollToTop />
        <ChatWidget />
      </body>
    </html>
  );
}
