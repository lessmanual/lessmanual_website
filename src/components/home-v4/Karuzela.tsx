"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type JSX, type MouseEvent, type ReactNode } from "react";
import { useDzial } from "@/components/home-v4/DzialProvider";
import { TakToUNas } from "@/components/home-v4/TakToUNas";
import { etykietaKarty, HOME_V4, type DzialId, type NrKarty } from "@/content/home-v4";
import { trackEvent } from "@/lib/analytics";
import {
  CZAS_WIDOCZNOSCI_MS,
  NAZWA_KARTY,
  PROG_WIDOCZNOSCI,
  utworzRejestrWidokow,
  type SposobKarty,
} from "@/lib/home/pomiar";
import { kartaZPrzewiniecia } from "@/lib/home/ruch";
import styles from "./Karuzela.module.css";

export type { SposobKarty };

// Jeden rejestr na widok strony: karta_view leci raz dla pary dział + karta.
const rejestrWidokow = utworzRejestrWidokow();

const RODZAJE = ["film", "przyklad", "opinia", "pomysly"] as const;
const NUMERY: readonly NrKarty[] = [0, 1, 2, 3];

function przytnij(nr: number): NrKarty {
  return NUMERY.find((n) => n === Math.max(0, Math.min(3, nr))) ?? 0;
}

function bezRuchu(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wymiaryKarty(tor: HTMLElement): { szerokosc: number; odstep: number } {
  const pierwsza = tor.firstElementChild;
  const szerokosc = pierwsza instanceof HTMLElement ? pierwsza.offsetWidth : tor.clientWidth;
  const odstep = Number.parseFloat(getComputedStyle(tor).columnGap) || 0;
  return { szerokosc, odstep };
}

// Karuzela jednego działu: natywny scroll-snap, strzałki o jedną kartę, kropki, `inert` na kartach poza widokiem.
// Bez autoprzewijania. Palec przesuwa tylko karty; dział zmieniają zakładki, rzut i hero.
export function Karuzela(props: {
  dzial: DzialId;
  children: readonly [ReactNode, ReactNode, ReactNode, ReactNode];
  onKartaWidoczna?: (nr: NrKarty, sposob: SposobKarty) => void;
}): JSX.Element {
  const { dzial, children, onKartaWidoczna } = props;
  const { stan, ustawKarte } = useDzial();
  const aktywny = stan.aktywny === dzial;
  const torRef = useRef<HTMLDivElement>(null);
  const sposobRef = useRef<SposobKarty>("wejscie");
  const klatkaRef = useRef(0);
  // Ostatnia zgłoszona karta: zamknięcia ze starego renderu (scroll + rAF) nie zgłaszają tej samej karty drugi raz.
  const zgloszonaRef = useRef<NrKarty>(0);
  // Karta, do której jedzie płynne przewijanie strzałką: drugi szybki klik liczy się od niej, nie od karty sprzed ruchu.
  const celRef = useRef<NrKarty>(0);
  const [nr, setNr] = useState<NrKarty>(0);
  const [bylAktywny, setBylAktywny] = useState(aktywny);

  // Powrót do działu zaczyna od karty 1 (stan poprawiany w renderze, bez efektu z setState).
  if (bylAktywny !== aktywny) {
    setBylAktywny(aktywny);
    if (aktywny) setNr(0);
  }

  // Po odsłonięciu panelu tor wraca na początek bez animacji; strona się nie przesuwa.
  useLayoutEffect(() => {
    if (!aktywny) return;
    const tor = torRef.current;
    if (tor) tor.scrollTo({ left: 0, behavior: "instant" });
    zgloszonaRef.current = 0;
    celRef.current = 0;
    // Karta 1 po wejściu w dział (zakładka, rzut, hero) jest „wejściem”, dopóki czytelnik nie poruszy karuzelą.
    sposobRef.current = "wejscie";
  }, [aktywny]);

  // karta_view: dopiero po prawdziwej widoczności (>= 60% karty przez 1 s bez przerwy), raz na widok strony.
  // Panel ukryty (`hidden`) ani karta poza ekranem nie liczą się, więc nic nie leci przy montażu.
  useEffect(() => {
    const karta = torRef.current?.children[nr];
    if (!aktywny || !karta) return;
    let czasomierz: ReturnType<typeof setTimeout> | null = null;
    const wyczysc = () => {
      if (czasomierz !== null) clearTimeout(czasomierz);
      czasomierz = null;
    };
    const obserwator = new IntersectionObserver(
      (wpisy) => {
        // Paczka może mieć kilka wpisów (przewijanie); liczy się najnowszy, bo stary stan bywa „niewidoczny”.
        const wpis = wpisy[wpisy.length - 1];
        wyczysc();
        if (!wpis?.isIntersecting) return;
        // Karta wyższa niż ekran nie osiągnie 60% swojej wysokości, więc wystarcza 60% wysokości okna.
        const wystarczy =
          wpis.intersectionRatio >= PROG_WIDOCZNOSCI ||
          wpis.intersectionRect.height >= PROG_WIDOCZNOSCI * window.innerHeight;
        if (!wystarczy) return;
        czasomierz = setTimeout(() => {
          czasomierz = null;
          if (!rejestrWidokow.pierwszyRaz(dzial, nr)) return;
          trackEvent("karta_view", { dzial, karta: NAZWA_KARTY[nr], nr: nr + 1, sposob: sposobRef.current });
        }, CZAS_WIDOCZNOSCI_MS);
      },
      // Gęste progi, żeby przekroczenie 60% (karty albo okna) zawsze wywołało sprawdzenie.
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    obserwator.observe(karta);
    return () => {
      wyczysc();
      obserwator.disconnect();
    };
  }, [aktywny, dzial, nr]);

  const poPrzewinieciu = () => {
    cancelAnimationFrame(klatkaRef.current);
    klatkaRef.current = requestAnimationFrame(() => {
      const tor = torRef.current;
      if (!tor) return;
      const { szerokosc, odstep } = wymiaryKarty(tor);
      const nowy = kartaZPrzewiniecia(tor.scrollLeft, szerokosc, odstep);
      // Palec ustala cel sam; przy strzałce cel ustawił klik, a karty pośrednie go nie zmieniają.
      if (sposobRef.current === "palec") celRef.current = nowy;
      if (nowy === zgloszonaRef.current) return;
      zgloszonaRef.current = nowy;
      setNr(nowy);
      if (aktywny) ustawKarte(nowy);
      onKartaWidoczna?.(nowy, sposobRef.current);
    });
  };

  const przewinO = (krok: -1 | 1) => (zdarzenie: MouseEvent<HTMLButtonElement>) => {
    const tor = torRef.current;
    const cel = przytnij(celRef.current + krok);
    // Na krańcu strzałka jest aria-disabled, a nie disabled: zostaje w fokusie, klik po prostu nic nie robi.
    if (!tor || cel === celRef.current) return;
    celRef.current = cel;
    // detail === 0: przycisk uruchomiony z klawiatury (Enter, spacja), nie myszą ani palcem.
    sposobRef.current = zdarzenie.detail === 0 ? "klawiatura" : "strzalka";
    const { szerokosc, odstep } = wymiaryKarty(tor);
    tor.scrollTo({ left: cel * (szerokosc + odstep), behavior: bezRuchu() ? "instant" : "smooth" });
  };

  const palec = () => {
    sposobRef.current = "palec";
  };

  const { dostepnosc } = HOME_V4.dzialy;
  return (
    <div
      className={styles.karuzela}
      data-qa="karuzela"
      data-dzial={dzial}
      id={`panel-${dzial}`}
      role="tabpanel"
      aria-labelledby={`zakladka-${dzial}`}
      hidden={!aktywny}
    >
      <div
        className={styles.tor}
        data-qa="tor"
        ref={torRef}
        onScroll={poPrzewinieciu}
        onPointerDown={palec}
        onWheel={palec}
      >
        {children.map((dziecko, i) => (
          <div
            key={RODZAJE[i]}
            className={styles.karta}
            role="group"
            aria-roledescription="slajd"
            aria-label={etykietaKarty(i + 1)}
            data-qa="karta"
            data-karta={RODZAJE[i]}
            inert={i !== nr}
          >
            {dziecko}
          </div>
        ))}
      </div>
      <div className={styles.nawigacja}>
        <button
          type="button"
          className={styles.strzalka}
          data-qa="strzalka-poprzednia"
          aria-label={dostepnosc.poprzedniaKarta}
          aria-disabled={nr === 0}
          onClick={przewinO(-1)}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <div className={styles.kropki} aria-hidden="true">
          {NUMERY.map((n) => (
            <span key={n} className={styles.kropka} data-qa="kropka" data-aktywna={n === nr ? "true" : "false"} />
          ))}
        </div>
        <button
          type="button"
          className={styles.strzalka}
          data-qa="strzalka-nastepna"
          data-karuzela-next=""
          aria-label={dostepnosc.nastepnaKarta}
          aria-disabled={nr === 3}
          onClick={przewinO(1)}
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>
      <TakToUNas dzial={dzial} />
    </div>
  );
}
