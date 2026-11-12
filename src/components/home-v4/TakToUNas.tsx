"use client";

import { HOME_V4, type DzialId } from "@/content/home-v4";
import { prefillDlaDzialu, zglosPrefill } from "@/lib/home/prefill";
import styles from "./Karuzela.module.css";

// „Tak, to u nas”: zgłasza prefill pytania o ból tego działu i przewija do formularza. Zaznaczenia tylko dokłada.
export function TakToUNas({ dzial }: { dzial: DzialId }) {
  return (
    <button
      type="button"
      className={`lm-btn lm-btn--secondary ${styles.takToUNas}`}
      data-qa="tak-to-u-nas"
      data-dzial={dzial}
      onClick={() => {
        zglosPrefill(prefillDlaDzialu(dzial));
        const cel = document.getElementById("formularz");
        if (!cel) return;
        const bezRuchu = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        // Formularz jest na końcu strony. Płynne przewijanie o kilka tysięcy pikseli zatrzymywało się w połowie
        // drogi (Chromium w testach, 9000 px), więc daleki skok jest natychmiastowy.
        const daleko =
          Math.abs(cel.getBoundingClientRect().top) > 2 * window.innerHeight;
        cel.scrollIntoView({
          block: "start",
          behavior: bezRuchu || daleko ? "instant" : "smooth",
        });
      }}
    >
      {HOME_V4.dzialy.takToUNas}
    </button>
  );
}
