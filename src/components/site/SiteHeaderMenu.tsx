"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./SiteHeader.module.css";

// Menu mobilne na <details>: bez JS dalej się otwiera. Po hydratacji zamyka się po kliknięciu
// pozycji (kotwica na tej samej stronie nie przeładowuje strony, więc menu zostawało otwarte),
// po Escape i po kliknięciu poza menu.
export function SiteHeaderMenu({ burger, children }: { burger: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => {
      if (ref.current) ref.current.open = false;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        ref.current?.querySelector("summary")?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <details
      ref={ref}
      className={styles.mobile}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a") && ref.current) {
          ref.current.open = false;
        }
      }}
    >
      {burger}
      {children}
    </details>
  );
}
