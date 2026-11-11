"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ATRYBUT_ZGODY,
  BRAK_ZGODY,
  ZDARZENIE_USTAWIEN_COOKIES,
  ZDARZENIE_ZGODY_COOKIES,
  czytajZapisZgodyCookies,
  czytajZgodeCookies,
  zapiszZgodeCookies,
  type WyborCookies,
} from "@/lib/consent";

type Kategoria = {
  klucz: keyof WyborCookies;
  tytul: string;
  opis: string;
};

// Tylko kategorie, które naprawdę istnieją na stronie (treść-zgód.md, § 4).
const KATEGORIE_OPCJONALNE: readonly Kategoria[] = [
  {
    klucz: "analityczne",
    tytul: "Analityczne",
    opis: "Statystyki odwiedzin w Google Analytics 4. Pomagają nam poprawiać stronę.",
  },
  {
    klucz: "kalendarz",
    tytul: "Treści zewnętrzne: kalendarz",
    opis: "Kalendarz rezerwacji Cal.com w ramce na stronie. Cal.com zapisuje własne cookies.",
  },
];

// Baner zgody. „Odrzuć opcjonalne” i „Akceptuj wszystkie” mają ten sam styl (raport EDPB z 17.01.2023:
// wyróżnienie akceptacji to wprowadzający w błąd projekt). Zapis i wygasanie zgody: `@/lib/consent`.
// Baner jest w HTML z serwera od pierwszej klatki (wcześniej pojawiał się po hydratacji i jego tekst
// był elementem LCP zależnym od całego JS). Osobom z ważną zgodą chowa go atrybut ustawiany w <head>
// przed malowaniem (SKRYPT_ZGODY_PRZED_MALOWANIEM), a po hydratacji stan React to potwierdza.
export function CookieBanner() {
  const [widoczny, setWidoczny] = useState(true);
  const [druga, setDruga] = useState(false);
  const [maZapis, setMaZapis] = useState(false);
  const [wybor, setWybor] = useState<WyborCookies>(BRAK_ZGODY);
  const kontener = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zapis = czytajZapisZgodyCookies();
    setMaZapis(zapis !== null);
    setWidoczny(zapis === null);

    const otworzUstawienia = () => {
      // Atrybut z <head> chowa baner w CSS; przy otwarciu ustawień musi zniknąć.
      document.documentElement.removeAttribute(ATRYBUT_ZGODY);
      setWybor(czytajZgodeCookies());
      setMaZapis(czytajZapisZgodyCookies() !== null);
      setDruga(true);
      setWidoczny(true);
    };
    // Zgoda zapisana poza banerem (np. „Pokaż kalendarz”) zamyka baner.
    const naZmianieZgody = () => {
      const aktualny = czytajZapisZgodyCookies();
      setMaZapis(aktualny !== null);
      if (aktualny !== null) setWidoczny(false);
    };

    window.addEventListener(ZDARZENIE_USTAWIEN_COOKIES, otworzUstawienia);
    window.addEventListener(ZDARZENIE_ZGODY_COOKIES, naZmianieZgody);
    return () => {
      window.removeEventListener(ZDARZENIE_USTAWIEN_COOKIES, otworzUstawienia);
      window.removeEventListener(ZDARZENIE_ZGODY_COOKIES, naZmianieZgody);
    };
  }, []);

  // Po otwarciu z linku w stopce przenosimy fokus na baner, żeby czytnik ekranu i klawiatura go zauważyły.
  useEffect(() => {
    if (widoczny && maZapis) kontener.current?.focus();
  }, [widoczny, maZapis]);

  const zapisz = useCallback((nowy: WyborCookies) => {
    zapiszZgodeCookies(nowy);
    setWidoczny(false);
    setDruga(false);
  }, []);

  const wstecz = () => {
    if (maZapis) {
      setWidoczny(false);
      setDruga(false);
    } else {
      setDruga(false);
    }
  };

  if (!widoczny) return null;

  return (
    <div
      ref={kontener}
      tabIndex={-1}
      role="region"
      aria-label="Zgoda na pliki cookies"
      className="lm-cookie-banner fixed bottom-0 left-0 right-0 z-[60] max-h-[100dvh] overflow-y-auto border-t border-line bg-surface shadow-[0_-8px_24px_#0a0a0a14] focus:outline-none"
    >
      <div className="lm-container py-5">
        {!druga ? (
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="text-[17px] font-semibold text-ink">Ta strona używa plików cookies</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-2">
                Niezbędne cookies zapamiętują Twój wybór. Statystyki Google Analytics i kalendarz Cal.com włączamy
                tylko po Twojej zgodzie. Zgodę zmienisz w każdej chwili w „Ustawieniach cookies” w stopce.{" "}
                <Link href="/legal/polityka-cookies" className="lm-link">
                  Polityka cookies
                </Link>
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-2 md:w-auto">
              <button type="button" onClick={() => zapisz(BRAK_ZGODY)} className="lm-btn lm-btn--secondary lm-btn--sm">
                Odrzuć opcjonalne
              </button>
              <button
                type="button"
                onClick={() => zapisz({ analityczne: true, kalendarz: true })}
                className="lm-btn lm-btn--secondary lm-btn--sm"
              >
                Akceptuj wszystkie
              </button>
              <button
                type="button"
                onClick={() => {
                  setWybor(czytajZgodeCookies());
                  setDruga(true);
                }}
                className="lm-btn lm-btn--secondary lm-btn--sm"
              >
                Ustawienia
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
                  <span className="block text-[16px] font-medium text-ink">Niezbędne (zawsze włączone)</span>
                  <span className="mt-0.5 block text-[15px] text-ink-2">
                    Zapamiętują Twój wybór cookies i ustawienia strony. Nie da się ich wyłączyć.
                  </span>
                </span>
              </label>

              {KATEGORIE_OPCJONALNE.map((kategoria) => (
                <label
                  key={kategoria.klucz}
                  className="flex cursor-pointer items-start gap-3 rounded-[8px] border border-line p-4 hover:border-ink"
                >
                  <input
                    type="checkbox"
                    checked={wybor[kategoria.klucz]}
                    onChange={(e) => setWybor({ ...wybor, [kategoria.klucz]: e.target.checked })}
                    className="mt-1 h-4 w-4 cursor-pointer"
                  />
                  <span className="flex-1">
                    <span className="block text-[16px] font-medium text-ink">{kategoria.tytul}</span>
                    <span className="mt-0.5 block text-[15px] text-ink-2">{kategoria.opis}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={wstecz} className="lm-btn lm-btn--secondary lm-btn--sm">
                Wstecz
              </button>
              <button type="button" onClick={() => zapisz(BRAK_ZGODY)} className="lm-btn lm-btn--secondary lm-btn--sm">
                Odrzuć opcjonalne
              </button>
              <button type="button" onClick={() => zapisz(wybor)} className="lm-btn lm-btn--secondary lm-btn--sm">
                Zapisz wybrane
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
