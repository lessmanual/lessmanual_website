"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "cookie-consent";

type Category = {
  key: Exclude<keyof CookiePreferences, "necessary">;
  title: string;
  body: string;
};

const OPTIONAL_CATEGORIES: readonly Category[] = [
  {
    key: "functional",
    title: "Funkcjonalne cookies",
    body: "Zapamiętanie preferencji użytkownika (np. język, strefa czasowa).",
  },
  {
    key: "analytics",
    title: "Analityczne cookies",
    body: "Analiza ruchu na stronie (np. Google Analytics).",
  },
  {
    key: "marketing",
    title: "Marketingowe cookies",
    body: "Personalizacja reklam (np. LinkedIn Ads, Meta Ads).",
  },
];

// Baner zgody w stylu strony v3 (QA 11.11: wcześniej bez polskich znaków, 14 px i stary brązowy przycisk).
// Przycisk akceptacji jest czarny, a nie patynowy, żeby nie konkurował z głównym przyciskiem strony.
export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new Event("cookie-consent-updated"));
    setShowBanner(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, functional: true, analytics: true, marketing: true });
  };

  const acceptNecessary = () => {
    saveConsent({ necessary: true, functional: false, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Zgoda na pliki cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-line bg-surface shadow-[0_-8px_24px_#0a0a0a14]"
    >
      <div className="lm-container py-5">
        {!showDetails ? (
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="text-[17px] font-semibold text-ink">Ta strona używa plików cookies</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-2">
                Używamy cookies, żeby strona działała poprawnie. Analityka włącza się tylko po Twojej zgodzie.{" "}
                <Link href="/legal/polityka-cookies" className="lm-link">
                  Dowiedz się więcej
                </Link>
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-2 md:w-auto">
              <button type="button" onClick={() => setShowDetails(true)} className="lm-btn lm-btn--secondary lm-btn--sm">
                Dostosuj
              </button>
              <button type="button" onClick={acceptNecessary} className="lm-btn lm-btn--secondary lm-btn--sm">
                Tylko niezbędne
              </button>
              <button type="button" onClick={acceptAll} className="lm-btn lm-btn--solid lm-btn--sm">
                Akceptuj wszystkie
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <p className="text-[17px] font-semibold text-ink">Ustawienia cookies</p>
              <p className="mt-1 text-[15px] text-ink-2">
                Wybierz, które kategorie cookies chcesz zaakceptować.{" "}
                <Link href="/legal/polityka-cookies" className="lm-link">
                  Polityka cookies
                </Link>
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 rounded-[8px] border border-line bg-sunken p-4">
                <input type="checkbox" checked disabled className="mt-1 h-4 w-4 cursor-not-allowed" />
                <span className="flex-1">
                  <span className="block text-[16px] font-medium text-ink">Niezbędne cookies (wymagane)</span>
                  <span className="mt-0.5 block text-[15px] text-ink-2">
                    Potrzebne do prawidłowego działania strony. Nie można ich wyłączyć.
                  </span>
                </span>
              </label>

              {OPTIONAL_CATEGORIES.map((category) => (
                <label
                  key={category.key}
                  className="flex cursor-pointer items-start gap-3 rounded-[8px] border border-line p-4 hover:border-ink"
                >
                  <input
                    type="checkbox"
                    checked={preferences[category.key]}
                    onChange={(e) => setPreferences({ ...preferences, [category.key]: e.target.checked })}
                    className="mt-1 h-4 w-4 cursor-pointer"
                  />
                  <span className="flex-1">
                    <span className="block text-[16px] font-medium text-ink">{category.title}</span>
                    <span className="mt-0.5 block text-[15px] text-ink-2">{category.body}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => setShowDetails(false)} className="lm-btn lm-btn--secondary lm-btn--sm">
                Wstecz
              </button>
              <button type="button" onClick={acceptNecessary} className="lm-btn lm-btn--secondary lm-btn--sm">
                Tylko niezbędne
              </button>
              <button type="button" onClick={saveCustom} className="lm-btn lm-btn--solid lm-btn--sm">
                Zapisz wybrane
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
