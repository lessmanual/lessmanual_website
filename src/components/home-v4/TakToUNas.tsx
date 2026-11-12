"use client";

import { HOME_V4, type DzialId } from "@/content/home-v4";
import { prefillDlaDzialu, zglosPrefill } from "@/lib/home/prefill";
import { przejdzDoFormularza } from "./przejdzDoFormularza";
import styles from "./Karuzela.module.css";

// „Tak, to u nas”: zgłasza prefill pytania o ból tego działu i przenosi do formularza. Zaznaczenia tylko dokłada.
export function TakToUNas({ dzial }: { dzial: DzialId }) {
  return (
    <button
      type="button"
      className={`lm-btn lm-btn--secondary ${styles.takToUNas}`}
      data-qa="tak-to-u-nas"
      data-dzial={dzial}
      onClick={() => {
        zglosPrefill(prefillDlaDzialu(dzial));
        przejdzDoFormularza();
      }}
    >
      {HOME_V4.dzialy.takToUNas}
    </button>
  );
}
