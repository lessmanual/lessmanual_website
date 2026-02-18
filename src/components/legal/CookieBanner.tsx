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
    setShowBanner(false);
  };

  const acceptAll = () => {
    const all: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(all);
  };

  const acceptNecessary = () => {
    const necessary: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    saveConsent(necessary);
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1240px] mx-auto px-6 py-5">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-serif text-lg text-text mb-1">
                Ta strona uzywa plikow cookies
              </h3>
              <p className="text-sm text-text-secondary">
                Uzywamy cookies aby zapewnic prawidlowe dzialanie strony.{" "}
                <Link
                  href="/legal/polityka-cookies"
                  className="text-accent hover:underline"
                >
                  Dowiedz sie wiecej
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowDetails(true)}
                className="px-5 py-2.5 text-sm border border-border rounded-[6px] text-text-secondary hover:border-accent hover:text-accent transition-colors"
              >
                Dostosuj
              </button>
              <button
                onClick={acceptNecessary}
                className="px-5 py-2.5 text-sm border border-border rounded-[6px] text-text-secondary hover:border-accent hover:text-accent transition-colors"
              >
                Tylko niezbedne
              </button>
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 text-sm bg-accent text-white rounded-[6px] hover:bg-accent-hover transition-colors"
              >
                Akceptuj wszystkie
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <h3 className="font-serif text-lg text-text mb-1">
                Ustawienia cookies
              </h3>
              <p className="text-sm text-text-secondary">
                Wybierz, ktore kategorie cookies chcesz zaakceptowac.{" "}
                <Link
                  href="/legal/polityka-cookies"
                  className="text-accent hover:underline"
                >
                  Polityka Cookies
                </Link>
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border border-border rounded-[6px] bg-bg">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-0.5 h-4 w-4 rounded accent-accent cursor-not-allowed"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text">
                    Niezbedne cookies (wymagane)
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Niezbedne do prawidlowego dzialania strony. Nie moga byc
                    wylaczone.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-border rounded-[6px] hover:border-accent transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      functional: e.target.checked,
                    })
                  }
                  className="mt-0.5 h-4 w-4 rounded accent-accent cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text">
                    Funkcjonalne cookies
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Zapamietanie preferencji uzytkownika (np. jezyk, strefa
                    czasowa).
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-border rounded-[6px] hover:border-accent transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      analytics: e.target.checked,
                    })
                  }
                  className="mt-0.5 h-4 w-4 rounded accent-accent cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text">
                    Analityczne cookies
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Analiza ruchu na stronie (np. Google Analytics).
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-border rounded-[6px] hover:border-accent transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      marketing: e.target.checked,
                    })
                  }
                  className="mt-0.5 h-4 w-4 rounded accent-accent cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text">
                    Marketingowe cookies
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Personalizacja reklam (np. LinkedIn Ads, Meta Ads).
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setShowDetails(false)}
                className="px-5 py-2.5 text-sm border border-border rounded-[6px] text-text-secondary hover:border-accent hover:text-accent transition-colors"
              >
                Wstecz
              </button>
              <button
                onClick={acceptNecessary}
                className="px-5 py-2.5 text-sm border border-border rounded-[6px] text-text-secondary hover:border-accent hover:text-accent transition-colors"
              >
                Tylko niezbedne
              </button>
              <button
                onClick={saveCustom}
                className="flex-1 px-5 py-2.5 text-sm bg-accent text-white rounded-[6px] hover:bg-accent-hover transition-colors"
              >
                Zapisz wybrane
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
