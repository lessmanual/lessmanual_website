"use client";

import { useEffect, useState } from "react";
import { Bzyk } from "@/components/site/Bzyk";
import { Close } from "@/components/site/Icons";
import { BZYK_LINES } from "@/content/site";
import styles from "./BzykGuide.module.css";

const STORAGE_KEY = "lm-bzyk-schowany";

type GuideState = "unknown" | "visible" | "hidden";

// Bzyk-przewodnik: leci prawym marginesem strony razem z przewijaniem.
// Lot to czysty CSS (offset-path + animation-timeline: scroll()); JS tylko do schowania
// jednym kliknięciem i zapamiętania wyboru („Schowaj Bzyka / Pokaż Bzyka”, TEKSTY v3 sekcja 13).
// Widoczny wyłącznie na szerokim ekranie (margines poza treścią), bez prefers-reduced-motion
// i w przeglądarkach z scroll-driven animations; w innych przypadkach Bzyk stoi przy sekcjach.
export function BzykGuide() {
  const [state, setState] = useState<GuideState>("unknown");

  useEffect(() => {
    let hidden = false;
    try {
      hidden = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      hidden = false;
    }
    setState(hidden ? "hidden" : "visible");
  }, []);

  function remember(next: Exclude<GuideState, "unknown">) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next === "hidden" ? "1" : "0");
    } catch {
      // Brak dostępu do localStorage (tryb prywatny): wybór działa tylko na tę wizytę.
    }
    setState(next);
  }

  if (state === "unknown") {
    return null;
  }

  if (state === "hidden") {
    return (
      <div className={styles.lane}>
        <button type="button" className={styles.show} onClick={() => remember("visible")}>
          {BZYK_LINES.show}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.lane}>
      <div className={styles.flyer}>
        <Bzyk width={56} mood="neutral" />
        <button
          type="button"
          className={styles.hide}
          aria-label={BZYK_LINES.hide}
          title={BZYK_LINES.hide}
          onClick={() => remember("hidden")}
        >
          <Close size={14} />
        </button>
      </div>
    </div>
  );
}
