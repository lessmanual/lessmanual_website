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
        // gtag trzyma w kolejce zdarzenia zebrane jeszcze przy zgodzie (np. scroll) i wysyła je
        // przy opuszczaniu strony (sendBeacon/fetch), także przy naszym przeładowaniu. Do końca
        // tej strony blokujemy więc wysyłkę do domen Google Analytics.
        zablokujWysylkeGa();
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

const DOMENY_GA = /(^|\.)(google-analytics\.com|googletagmanager\.com|analytics\.google\.com)$/;

function doGa(adres: string | URL): boolean {
  try {
    return DOMENY_GA.test(new URL(String(adres), window.location.href).hostname);
  } catch {
    return false;
  }
}

// Po cofnięciu zgody: żadne żądanie do Google do przeładowania strony (delta QA 11.11).
function zablokujWysylkeGa(): void {
  const beacon = navigator.sendBeacon.bind(navigator);
  navigator.sendBeacon = (adres, dane) => (doGa(adres) ? true : beacon(adres, dane));
  const pobierz = window.fetch.bind(window);
  window.fetch = (wejscie, opcje) => {
    const adres = wejscie instanceof Request ? wejscie.url : wejscie;
    return doGa(adres) ? Promise.resolve(new Response(null, { status: 204 })) : pobierz(wejscie, opcje);
  };
}
