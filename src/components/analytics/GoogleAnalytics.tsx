"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usunCookiesGa, zbudujSkryptGa } from "@/lib/analytics";
import { KLUCZ_ZGODY_COOKIES, ZDARZENIE_ZGODY_COOKIES, czytajZgodeCookies } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// GA4 ładuje się wyłącznie po zgodzie na kategorię „analityczne” (skrypt gtag.js nie pobiera się
// wcześniej). Cofnięcie zgody w trakcie wizyty: `consent update` na denied, usunięcie cookies `_ga*`
// i przeładowanie strony, żeby załadowany już skrypt przestał działać.
export function GoogleAnalytics() {
  const [zgoda, setZgoda] = useState(false);
  const byloZgody = useRef(false);

  useEffect(() => {
    const odswiez = () => {
      const analityczne = czytajZgodeCookies().analityczne;
      if (byloZgody.current && !analityczne) {
        // Delta QA 11.11: samo `consent update` na denied zostawiało jeszcze zdarzenie `scroll`
        // (Consent Mode wysyła wtedy pingi bez cookies). Flaga ga-disable wyłącza każde żądanie
        // do Google natychmiast, zanim strona się przeładuje.
        if (GA_ID) Reflect.set(window, `ga-disable-${GA_ID}`, true);
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", { analytics_storage: "denied" });
        }
        usunCookiesGa();
        window.location.reload();
        return;
      }
      if (!analityczne) usunCookiesGa();
      byloZgody.current = analityczne;
      setZgoda(analityczne);
    };

    odswiez();

    const naZmianePamieci = (zdarzenie: StorageEvent) => {
      if (zdarzenie.key === KLUCZ_ZGODY_COOKIES) odswiez();
    };
    window.addEventListener("storage", naZmianePamieci);
    window.addEventListener(ZDARZENIE_ZGODY_COOKIES, odswiez);

    return () => {
      window.removeEventListener("storage", naZmianePamieci);
      window.removeEventListener(ZDARZENIE_ZGODY_COOKIES, odswiez);
    };
  }, []);

  if (!GA_ID || !zgoda) return null;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {zbudujSkryptGa(GA_ID)}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
