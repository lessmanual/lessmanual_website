"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const saved = localStorage.getItem("cookie-consent");
      if (saved) {
        const prefs = JSON.parse(saved);
        setHasConsent(prefs.analytics === true);
      }
    };

    checkConsent();

    // Listen for consent changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cookie-consent") checkConsent();
    };
    window.addEventListener("storage", handleStorage);

    // Also listen for custom event from CookieBanner
    const handleConsent = () => checkConsent();
    window.addEventListener("cookie-consent-updated", handleConsent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cookie-consent-updated", handleConsent);
    };
  }, []);

  if (!GA_ID || !hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
