// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { HOME_V4, type KartaFilm } from "@/content/home-v4";
import { KartaSystem } from "./KartaSystem";

// Dziś wszystkie karty mają film: null, więc przycisku nie ma na stronie i Playwright go nie sprawdzi.
const karta: KartaFilm = {
  ...HOME_V4.dzialy.lista.telefony.karty[0],
  film: { src: "/film.mp4", poster: "/poster.jpg", napisy: null },
};

Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
// jsdom nie odtwarza mediów; play() zwraca tu spełnioną obietnicę jak w przeglądarce.
Reflect.set(HTMLMediaElement.prototype, "play", () => Promise.resolve());
let sprzatanie: (() => void) | null = null;
afterEach(() => sprzatanie?.());

function wyrenderuj(): HTMLElement {
  const kontener = document.createElement("div");
  document.body.append(kontener);
  const root = createRoot(kontener);
  act(() => root.render(createElement(KartaSystem, { karta, etykiety: HOME_V4.dzialy.etykiety })));
  sprzatanie = () => {
    act(() => root.unmount());
    kontener.remove();
  };
  return kontener;
}

describe("KartaSystem z filmem", () => {
  it("przycisk mówi, co zrobi, z tytułem karty", () => {
    const kontener = wyrenderuj();
    const przycisk = kontener.querySelector('[data-qa="odtworz"]');
    expect(przycisk?.getAttribute("aria-label")).toBe(`${HOME_V4.dzialy.dostepnosc.odtworzFilm}: ${karta.tytul}`);
  });

  it("po kliknięciu fokus jest na filmie, nie na body, bo przycisk znika", () => {
    const kontener = wyrenderuj();
    const przycisk = kontener.querySelector('[data-qa="odtworz"]');
    if (!(przycisk instanceof HTMLButtonElement)) throw new Error("brak przycisku odtwarzania");
    przycisk.focus();
    act(() => przycisk.click());
    expect(document.activeElement?.tagName).toBe("VIDEO");
    expect(kontener.querySelector('[data-qa="odtworz"]')).toBeNull();
    expect(kontener.querySelector("video")?.hasAttribute("controls")).toBe(true);
  });
});
