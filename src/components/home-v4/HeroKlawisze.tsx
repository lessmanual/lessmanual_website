"use client";

import { Bzyk } from "@/components/site/Bzyk";
import { ArrowRight, Check } from "@/components/site/Icons";
import { useDzial } from "@/components/home-v4/DzialProvider";
import { bzykPoWyborze, DZIALY, HOME_V4 } from "@/content/home-v4";
import { przewinOdRazuPoKlawiszu } from "@/lib/home/dzial-stan";
import styles from "./HeroV4.module.css";

function przewinDoZakladek() {
  const cel = document.getElementById("dzialy-zakladki");
  if (!cel) return;
  const bezRuchu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  cel.scrollIntoView({ block: "start", behavior: bezRuchu ? "auto" : "smooth" });
}

// Pytanie Bzyka, pięć klawiszy działów, dymek i „Pokaż”. Wybór pojedynczy: ponowny klik nie odznacza.
export function HeroKlawisze() {
  const { stan, wybierz } = useDzial();
  const { hero } = HOME_V4;
  const wybrany = stan.wybranyWHero;
  const indeksWybranego = wybrany === null ? -1 : DZIALY.indexOf(wybrany);
  const nazwaWybranego = indeksWybranego >= 0 ? hero.klawisze[indeksWybranego] : undefined;

  return (
    <div className={styles.pytanie}>
      <p className={styles.pytanieTekst} id="hero-pytanie">
        {hero.pytanieBzyka}
      </p>
      <div className={styles.klawisze} role="group" aria-labelledby="hero-pytanie">
        {DZIALY.map((id, i) => (
          <button
            key={id}
            type="button"
            className={styles.klawisz}
            data-qa="hero-klawisz"
            data-dzial={id}
            aria-pressed={wybrany === id}
            onClick={() => {
              wybierz(id, "hero");
              if (przewinOdRazuPoKlawiszu(stan)) przewinDoZakladek();
            }}
          >
            <span className={styles.kolo} aria-hidden="true">
              <Check className={styles.ptaszek} size={16} />
            </span>
            <span className={styles.etykieta}>{hero.klawisze[i]}</span>
          </button>
        ))}
      </div>
      <div className={styles.dymekRzad}>
        <Bzyk width={36} mood={nazwaWybranego ? "happy" : "neutral"} />
        <p className={styles.dymek} data-qa="hero-dymek" aria-live="polite">
          {nazwaWybranego ? bzykPoWyborze(nazwaWybranego) : hero.bzykPrzedWyborem}
        </p>
        <button type="button" className={styles.pokaz} data-qa="hero-pokaz" onClick={przewinDoZakladek}>
          {hero.przyciskPokaz}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
