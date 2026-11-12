"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDzial } from "@/components/home-v4/DzialProvider";
import { HOME_V4 } from "@/content/home-v4";
import { parametryObiektu, zapaloneSlowa } from "@/lib/home/ruch";
import styles from "./PrzejscieObiekt.module.css";

// Warunek z szkicu s4.js (DM): obrót przy przewijaniu tylko na dużym ekranie z myszą i bez ograniczonego ruchu.
const OBROT =
  "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const OGRANICZONY_RUCH = "(prefers-reduced-motion: reduce)";
const PLASTRY = [-14, -12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12] as const;

const przytnij01 = (v: number) => Math.max(0, Math.min(1, v));

export function PrzejscieObiekt() {
  const { stan, zaliczPrzejscie } = useDzial();
  const slowa = HOME_V4.przejscie.zdanie.split(/ +/);
  // Serwer i brak JS: wszystkie słowa zapalone (tekst czytelny bez ruchu); efekt gasi je tylko tam, gdzie ruch działa.
  const [zapalone, setZapalone] = useState(slowa.length);
  const sekcjaRef = useRef<HTMLElement>(null);
  const obiektRef = useRef<HTMLDivElement>(null);
  const zdaniRef = useRef<HTMLParagraphElement>(null);
  const wysokoscPrzedPasem = useRef(0);
  const zaliczone = stan.przejscieZaliczone;

  // Po przejściu w pas sekcja skraca się z ok. 230 do 100 svh nad ekranem czytelnika: kompensujemy przewinięcie,
  // żeby treść nie skoczyła. Kotwiczenie przewijania wyłączamy na chwilę, bo przeglądarka korygowałaby drugi raz.
  useLayoutEffect(() => {
    const sekcja = sekcjaRef.current;
    if (!zaliczone || !sekcja || wysokoscPrzedPasem.current === 0) return;
    const roznica = wysokoscPrzedPasem.current - sekcja.offsetHeight;
    wysokoscPrzedPasem.current = 0;
    if (roznica > 0 && sekcja.getBoundingClientRect().bottom <= 0) {
      // „instant”: html ma scroll-behavior: smooth, a kompensacja ma być niewidoczna.
      window.scrollBy({ top: -roznica, behavior: "instant" });
    }
    requestAnimationFrame(() => {
      document.documentElement.style.overflowAnchor = "";
    });
  }, [zaliczone]);

  useEffect(() => {
    const sekcja = sekcjaRef.current;
    const obiekt = obiektRef.current;
    const zdanie = zdaniRef.current;
    if (!sekcja || !obiekt || !zdanie) return;
    const liczba = slowa.length;
    const obrot = window.matchMedia(OBROT);
    const ograniczony = window.matchMedia(OGRANICZONY_RUCH);

    const ustawObiekt = (p: number) => {
      const o = parametryObiektu(p);
      obiekt.style.setProperty("--rot", `${o.rot}deg`);
      obiekt.style.setProperty("--sweep", String(o.sweep));
      obiekt.style.setProperty("--obj-s", String(o.skala));
      obiekt.style.setProperty("--glow-o", String(o.poswiataKrycie));
      obiekt.style.setProperty("--glow-s", String(o.poswiataSkala));
    };

    let aktywny = false;
    let raf = 0;
    let cur = 0;
    let cel = 0;
    let tick = false;

    const celObrotu = () => {
      const r = sekcja.getBoundingClientRect();
      const zakres = r.height - window.innerHeight;
      return zakres > 0 ? przytnij01(-r.top / zakres) : 0;
    };
    const zastosuj = (p: number) => {
      ustawObiekt(p);
      setZapalone(zapaloneSlowa((p - 0.04) / 0.52, liczba));
    };
    const petla = () => {
      raf = 0;
      cur += (cel - cur) * 0.12;
      if (Math.abs(cel - cur) < 0.0008) cur = cel;
      zastosuj(cur);
      if (cur !== cel) raf = requestAnimationFrame(petla);
    };
    const poPrzewinieciu = () => {
      if (!aktywny || zaliczone || ograniczony.matches) return;
      if (obrot.matches) {
        cel = celObrotu();
        if (!raf) raf = requestAnimationFrame(petla);
      } else if (!tick) {
        tick = true;
        requestAnimationFrame(() => {
          tick = false;
          // Płasko (telefon): słowa zapalają się wraz z przejściem zdania przez ekran.
          const r = zdanie.getBoundingClientRect();
          const vh = window.innerHeight;
          setZapalone(
            zapaloneSlowa((vh * 0.88 - r.top) / (r.height + vh * 0.38), liczba),
          );
        });
      }
    };

    let obserwator: IntersectionObserver | null = null;
    const start = () => {
      obiekt.style.cssText = "";
      if (ograniczony.matches) {
        setZapalone(liczba);
        return;
      }
      if (zaliczone) {
        // Po pierwszym przejściu: zwykły pas, zdanie w całości i obiekt w pozycji końcowej.
        if (obrot.matches) ustawObiekt(1);
        setZapalone(liczba);
        return;
      }
      if (obrot.matches) {
        cur = cel = celObrotu();
        zastosuj(cur);
      } else {
        setZapalone(0);
        poPrzewinieciu();
      }
    };

    if (!zaliczone) {
      obserwator = new IntersectionObserver(
        ([wpis]) => {
          if (!wpis) return;
          aktywny = wpis.isIntersecting;
          if (aktywny) {
            poPrzewinieciu();
          } else if (sekcja.getBoundingClientRect().bottom < 0) {
            wysokoscPrzedPasem.current = sekcja.offsetHeight;
            // Kotwiczenie wyłączone PRZED zmianą układu, inaczej przeglądarka skoryguje przewinięcie drugi raz.
            document.documentElement.style.overflowAnchor = "none";
            zaliczPrzejscie();
          }
        },
        { rootMargin: "200px 0px" },
      );
      obserwator.observe(sekcja);
    }
    window.addEventListener("scroll", poPrzewinieciu, { passive: true });
    obrot.addEventListener("change", start);
    ograniczony.addEventListener("change", start);
    start();

    return () => {
      obserwator?.disconnect();
      window.removeEventListener("scroll", poPrzewinieciu);
      obrot.removeEventListener("change", start);
      ograniczony.removeEventListener("change", start);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [zaliczone, zaliczPrzejscie, slowa.length]);

  return (
    <section
      ref={sekcjaRef}
      className={styles.sys}
      data-qa="przejscie"
      data-tryb={zaliczone ? "pas" : "obrot"}
    >
      <div className={styles.sticky}>
        <div className={styles.swiatlo} aria-hidden="true" />
        <div className={`lm-container ${styles.siatka}`}>
          <p className={styles.zdanie} ref={zdaniRef}>
            {slowa.map((slowo, i) => (
              <span key={`${i}-${slowo}`}>
                <span
                  className={styles.slowo}
                  data-zapalone={i < zapalone ? "true" : "false"}
                  data-goracy={
                    i === zapalone - 1 && zapalone < slowa.length
                      ? "true"
                      : undefined
                  }
                >
                  {slowo}
                </span>
                {i < slowa.length - 1 ? " " : null}
              </span>
            ))}
          </p>
          <div className={styles.scena} aria-hidden="true">
            <div className={styles.obiekt} ref={obiektRef}>
              <div className={styles.poswiata} />
              <div className={styles.podloga} />
              <div className={styles.cien} />
              <div className={styles.odbicie} />
              <div className={styles.plyta}>
                {PLASTRY.map((z) => (
                  <i key={z} style={{ transform: `translateZ(${z}px)` }} />
                ))}
                <div className={styles.twarz}>
                  <span className={`${styles.znacznik} ${styles.t1}`} />
                  <span className={`${styles.znacznik} ${styles.t2}`} />
                  <span className={`${styles.znacznik} ${styles.t3}`} />
                  <span className={`${styles.znacznik} ${styles.t4}`} />
                  <span className={styles.rdzen} />
                  <span className={styles.blysk} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
