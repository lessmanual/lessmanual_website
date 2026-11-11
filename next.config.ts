import type { NextConfig } from "next";
import path from "path";
import { buildSecurityHeaders } from "./src/lib/security-headers";

const SECURITY_HEADERS = buildSecurityHeaders(
  process.env.NODE_ENV === "development",
  process.env.NEXT_PUBLIC_SUPABASE_URL,
);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // CSS (ok. 20 kB) w <head> zamiast osobnych plików blokujących render: mniej zapytań przed
  // pierwszym malowaniem na telefonie (zapas LCP, delta QA 11.11).
  experimental: {
    inlineCss: true,
  },
  // Okładki bloga z Supabase Storage (PNG ok. 7 MB) idą przez optymalizację obrazów Next.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mpshzmbgsupznnyhpyyl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    // Stara oferta (/oferta/*) zastąpiona stroną systemów (11.11.2026). Kolejność ma znaczenie:
    // konkretne adresy przed catch-allem /oferta/:path*.
    return [
      { source: "/oferta", destination: "/systemy", statusCode: 301 },
      {
        source: "/oferta/hot-lead-catcher",
        destination: "/systemy/okazje-sprzedazowe-i-przetargi",
        statusCode: 301,
      },
      {
        source: "/oferta/content-machine",
        destination: "/systemy/tresci-sklepu-pod-google",
        statusCode: 301,
      },
      {
        source: "/oferta/content-machine/:path*",
        destination: "/systemy/tresci-sklepu-pod-google",
        statusCode: 301,
      },
      {
        source: "/oferta/seo-content",
        destination: "/systemy/tresci-sklepu-pod-google",
        statusCode: 301,
      },
      {
        source: "/oferta/seo-content/:path*",
        destination: "/systemy/tresci-sklepu-pod-google",
        statusCode: 301,
      },
      { source: "/oferta/pipeline-machine", destination: "/systemy", statusCode: 301 },
      { source: "/oferta/ai-sdr", destination: "/systemy", statusCode: 301 },
      { source: "/oferta/obsluga-klienta", destination: "/systemy", statusCode: 301 },
      { source: "/oferta/generator-ofert", destination: "/systemy", statusCode: 301 },
      { source: "/oferta/indywidualne-wdrozenia", destination: "/", statusCode: 301 },
      { source: "/oferta/:path*", destination: "/systemy", statusCode: 301 },
      // Slugi z poprzedniej wersji podstron systemów (wersja 2 tekstów) przeniesione na slugi v3.
      {
        source: "/systemy/wyszukiwanie-przetargow",
        destination: "/systemy/okazje-sprzedazowe-i-przetargi",
        statusCode: 301,
      },
      {
        source: "/systemy/tresci-sklepu",
        destination: "/systemy/tresci-sklepu-pod-google",
        statusCode: 301,
      },
      { source: "/systemy/zapytania-ofertowe", destination: "/systemy", statusCode: 301 },
      { source: "/demo-hero", destination: "/", statusCode: 301 },
      { source: "/demo-hero-final", destination: "/", statusCode: 301 },
      { source: "/demo-layouts", destination: "/", statusCode: 301 },
      // Narzędzia wycofane przed publikacją v3 (audyt zgodności P11): SafeDraft i lead magnet
      // przetwarzały dane bez opisu w polityce prywatności.
      { source: "/safedraft", destination: "/", statusCode: 301 },
      { source: "/safedraft/:path*", destination: "/", statusCode: 301 },
      { source: "/ai-growth-opportunity-map", destination: "/", statusCode: 301 },
      { source: "/ai-growth-opportunity-map/:path*", destination: "/", statusCode: 301 },
    ];
  },
  // Pliki dla agentów AI (api-catalog, openapi, agent-skills, mcp, oauth) opisywały usunięte
  // /api/generate-email i /api/offers, więc zniknęły razem z nagłówkiem Link. Dla czatbotów zostaje llms.txt.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
