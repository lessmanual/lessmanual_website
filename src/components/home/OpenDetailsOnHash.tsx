"use client";

import { useEffect } from "react";

// Link „Czego ta obietnica nie obejmuje” prowadzi do #faq-4. Przeglądarka przewija do zwiniętego
// <details>, więc po wejściu na kotwicę rozwijamy pytanie, żeby odpowiedź była od razu widoczna.
export function OpenDetailsOnHash() {
  useEffect(() => {
    function open() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id === "") {
        return;
      }
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
      }
    }
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
