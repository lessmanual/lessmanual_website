"use client";

import { Phone } from "lucide-react";
import { useRef, useState } from "react";
import { Play } from "@/components/site/Icons";
import { HOME_V4, type Film, type KartaFilm } from "@/content/home-v4";
import styles from "./Karty.module.css";

// Film karty: preload="none", start dopiero kliknięciem. Bez filmu (null) poster CSS z tytułem i bez przycisku.
function FilmKarty({ film, tytul }: { film: Film | null; tytul: string }) {
  const wideoRef = useRef<HTMLVideoElement>(null);
  const [gra, setGra] = useState(false);

  if (film === null) {
    return (
      <div className={styles.film} data-qa="film">
        <div className={styles.poster} data-qa="poster" aria-hidden="true">
          <span>{tytul}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.film} data-qa="film">
      <video
        ref={wideoRef}
        className={styles.wideo}
        src={film.src}
        poster={film.poster}
        preload="none"
        playsInline
        controls={gra}
        aria-label={tytul}
      >
        {film.napisy ? <track kind="captions" src={film.napisy} srcLang="pl" default /> : null}
      </video>
      {gra ? null : (
        <button
          type="button"
          className={styles.odtworz}
          data-qa="odtworz"
          aria-label={`${HOME_V4.dzialy.dostepnosc.odtworzFilm}: ${tytul}`}
          onClick={() => {
            setGra(true);
            const wideo = wideoRef.current;
            // Przycisk znika po kliknięciu, więc fokus przechodzi na film (z kontrolkami), a nie na body.
            wideo?.focus();
            void wideo?.play();
          }}
        >
          <Play size={28} />
        </button>
      )}
    </div>
  );
}

// Karta 1: tytuł, plakietka, film (390 nad tekstem, 1440 obok) i trzy wiersze Problem / Rozwiązanie / Efekt.
// Jedna liczba na kartę: wyróżnienie „liczba” to fragment efektu w miedzi; „wiersz” to słuchawka i krótki opis.
export function KartaSystem({ karta, etykiety }: { karta: KartaFilm; etykiety: readonly string[] }) {
  const [problem, rozwiazanie, efekt] = etykiety;
  const { wyroznienie } = karta;
  return (
    <article className={styles.system}>
      <header className={styles.glowa}>
        <h3 className={styles.tytul}>{karta.tytul}</h3>
        <p className={styles.plakietka}>{karta.plakietka}</p>
      </header>
      <FilmKarty film={karta.film} tytul={karta.tytul} />
      <dl className={styles.wiersze}>
        <div className={styles.wiersz}>
          <dt>{problem}</dt>
          <dd>{karta.problem}</dd>
        </div>
        <div className={styles.wiersz}>
          <dt>{rozwiazanie}</dt>
          <dd>{karta.rozwiazanie}</dd>
        </div>
        <div className={styles.wiersz}>
          <dt>{efekt}</dt>
          <dd>
            {wyroznienie.rodzaj === "liczba" ? (
              // Liczba jest też w zdaniu niżej, więc czytnik ekranu czyta ją raz.
              <span className={styles.liczba} data-qa="liczba" aria-hidden="true">
                {wyroznienie.tekst}
              </span>
            ) : (
              <span className={styles.wyrozWiersz}>
                <Phone className={styles.sluchawka} size={22} aria-hidden="true" />
                {wyroznienie.tekst}
              </span>
            )}
            <span className={styles.efekt}>{karta.efekt}</span>
          </dd>
        </div>
      </dl>
    </article>
  );
}
