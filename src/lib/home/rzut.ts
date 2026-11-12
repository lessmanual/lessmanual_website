// Rzut firmy z szkicu public/szkice/s4/s4.js (PLAN, calibrate, idleCam, roomCam) jako czyste dane i matematyka kamery.
// Szkic mierzył rzut w DOM (getBoundingClientRect); tu liczymy go z geometrii, więc bez pomiaru i bez I/O.
import type { DzialId } from "@/content/home-v4";

export const SZEROKOSC_PLANU = 960;
export const GLEBOKOSC_PLANU = 600;
export const SCIANA_WYSOKA = 110;
export const SCIANA_NISKA = 34;

export type Material =
  | "outer"
  | "wall"
  | "plinth"
  | "oak"
  | "dark"
  | "copper"
  | "paper"
  | "card"
  | "fabric"
  | "soft"
  | "rack"
  | "screen"
  | "leaf";

export type Bryla = { x: number; y: number; w: number; d: number; h: number; z?: number; m: Material; duzy?: true };
export type Plaskie = { x: number; y: number; w: number; d: number; rodzaj: "dywan" | "papier" };
export type Pokoj = {
  id: DzialId;
  x: number;
  y: number;
  w: number;
  d: number;
  podloga: "drewno" | "wykladzina" | "beton" | "kamien" | "deski";
  /** Wysokość etykiety nad podłogą (px w świecie planu). */
  lz: number;
  meble: readonly Bryla[];
  plaskie?: readonly Plaskie[];
  slonce?: readonly { x: number; w: number }[];
};

// Pokoje szkicu (recepcja → telefony, operacje → zamowienia); współrzędne 1:1 z s4.js.
export const PLAN: readonly Pokoj[] = [
  { id: "marketing", x: 0, y: 0, w: 320, d: 330, podloga: "drewno", lz: 150,
    meble: [
      { x: 150, y: 8, w: 150, d: 8, h: 92, m: "paper" }, { x: 36, y: 150, w: 140, d: 54, h: 30, m: "oak" },
      { x: 52, y: 154, w: 44, d: 6, h: 28, z: 30, m: "screen" }, { x: 112, y: 154, w: 44, d: 6, h: 28, z: 30, m: "screen" },
      { x: 90, y: 224, w: 28, d: 28, h: 18, m: "dark" }, { x: 244, y: 82, w: 8, d: 8, h: 44, m: "dark" },
      { x: 226, y: 70, w: 44, d: 26, h: 38, z: 44, m: "soft" }, { x: 204, y: 214, w: 8, d: 8, h: 44, m: "dark" },
      { x: 194, y: 204, w: 28, d: 18, h: 16, z: 44, m: "dark" },
    ],
    plaskie: [{ x: 150, y: 16, w: 150, d: 70, rodzaj: "papier" }], slonce: [{ x: 20, w: 100 }] },
  { id: "sprzedaz", x: 320, y: 0, w: 330, d: 330, podloga: "wykladzina", lz: 150,
    meble: [
      { x: 80, y: 6, w: 170, d: 6, h: 58, z: 22, m: "screen", duzy: true }, { x: 60, y: 130, w: 210, d: 76, h: 30, m: "oak" },
      { x: 72, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" }, { x: 122, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" },
      { x: 172, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" }, { x: 222, y: 134, w: 40, d: 6, h: 24, z: 30, m: "screen" },
      { x: 78, y: 222, w: 26, d: 26, h: 18, m: "dark" }, { x: 128, y: 222, w: 26, d: 26, h: 18, m: "dark" },
      { x: 178, y: 222, w: 26, d: 26, h: 18, m: "dark" }, { x: 228, y: 222, w: 26, d: 26, h: 18, m: "dark" },
      { x: 286, y: 276, w: 26, d: 26, h: 24, m: "dark" }, { x: 280, y: 270, w: 38, d: 38, h: 18, z: 24, m: "leaf" },
    ], slonce: [{ x: 262, w: 60 }] },
  { id: "logistyka", x: 650, y: 0, w: 310, d: 600, podloga: "beton", lz: 170,
    meble: [
      { x: 24, y: 40, w: 40, d: 300, h: 86, m: "rack" }, { x: 100, y: 40, w: 40, d: 300, h: 86, m: "rack" },
      { x: 300, y: 150, w: 8, d: 170, h: 62, z: 24, m: "screen", duzy: true }, { x: 196, y: 210, w: 70, d: 44, h: 30, m: "oak" },
      { x: 208, y: 214, w: 46, d: 6, h: 26, z: 30, m: "screen" }, { x: 190, y: 420, w: 56, d: 56, h: 8, m: "oak" },
      { x: 194, y: 424, w: 48, d: 48, h: 34, z: 8, m: "card" }, { x: 190, y: 500, w: 56, d: 56, h: 8, m: "oak" },
      { x: 197, y: 507, w: 42, d: 42, h: 22, z: 8, m: "card" }, { x: 40, y: 420, w: 56, d: 56, h: 8, m: "oak" },
      { x: 44, y: 424, w: 48, d: 48, h: 46, z: 8, m: "card" },
    ], slonce: [{ x: 40, w: 100 }, { x: 180, w: 100 }] },
  { id: "telefony", x: 0, y: 330, w: 320, d: 270, podloga: "kamien", lz: 140,
    meble: [
      { x: 110, y: 24, w: 28, d: 28, h: 18, m: "dark" }, { x: 50, y: 70, w: 150, d: 36, h: 32, m: "oak" },
      { x: 50, y: 106, w: 36, d: 70, h: 32, m: "oak" }, { x: 50, y: 66, w: 150, d: 4, h: 4, z: 32, m: "copper" },
      { x: 150, y: 80, w: 18, d: 14, h: 8, z: 32, m: "dark" }, { x: 170, y: 196, w: 110, d: 36, h: 16, m: "fabric" },
      { x: 170, y: 228, w: 110, d: 10, h: 34, m: "fabric" }, { x: 266, y: 40, w: 26, d: 26, h: 24, m: "dark" },
      { x: 260, y: 34, w: 38, d: 38, h: 18, z: 24, m: "leaf" },
    ],
    plaskie: [{ x: 150, y: 120, w: 130, d: 70, rodzaj: "dywan" }] },
  { id: "zamowienia", x: 320, y: 330, w: 330, d: 270, podloga: "deski", lz: 140,
    meble: [
      { x: 40, y: 60, w: 130, d: 50, h: 30, m: "oak" }, { x: 56, y: 64, w: 40, d: 6, h: 24, z: 30, m: "screen" },
      { x: 106, y: 64, w: 40, d: 6, h: 24, z: 30, m: "screen" }, { x: 40, y: 160, w: 130, d: 50, h: 30, m: "oak" },
      { x: 56, y: 164, w: 40, d: 6, h: 24, z: 30, m: "screen" }, { x: 106, y: 164, w: 40, d: 6, h: 24, z: 30, m: "screen" },
      { x: 210, y: 60, w: 56, d: 44, h: 36, m: "paper" }, { x: 216, y: 66, w: 44, d: 26, h: 4, z: 36, m: "paper" },
      { x: 220, y: 160, w: 60, d: 40, h: 28, m: "dark" }, { x: 226, y: 166, w: 22, d: 28, h: 10, z: 28, m: "paper" },
      { x: 252, y: 166, w: 22, d: 28, h: 16, z: 28, m: "paper" },
    ] },
];

// Ściany i cokół budynku (s4.js buildPlan): zewnętrzne wysokie na północy i wschodzie, reszta niska z przejściami.
export const COKOL: Bryla = { x: -10, y: -10, w: SZEROKOSC_PLANU + 20, d: GLEBOKOSC_PLANU + 20, h: 26, z: -26, m: "plinth" };

export type Okno = { x: number; y: number; w: number; h: number };
export type Sciana = { bryla: Bryla; oknaPoludnie?: readonly Okno[]; oknaZachod?: readonly Okno[] };

const niska = (x: number, y: number, w: number, d: number): Sciana => ({ bryla: { x, y, w, d, h: SCIANA_NISKA, m: "wall" } });

export const SCIANY: readonly Sciana[] = [
  {
    bryla: { x: -10, y: -10, w: SZEROKOSC_PLANU + 20, d: 10, h: SCIANA_WYSOKA, m: "outer" },
    oknaPoludnie: [30, 590, 700, 840].map((x, i) => ({ x, y: 14, w: i === 1 ? 70 : 100, h: 52 })),
  },
  {
    bryla: { x: SZEROKOSC_PLANU, y: -10, w: 10, d: GLEBOKOSC_PLANU + 20, h: SCIANA_WYSOKA, m: "outer" },
    oknaZachod: [{ x: 44, y: 400, w: 52, h: 150 }],
  },
  niska(-10, GLEBOKOSC_PLANU, 120, 10),
  niska(210, GLEBOKOSC_PLANU, SZEROKOSC_PLANU - 200, 10),
  niska(-10, 0, 10, GLEBOKOSC_PLANU),
  niska(316, 0, 8, 230), niska(316, 290, 8, 40), niska(316, 334, 8, 86), niska(316, 480, 8, 120),
  niska(0, 326, 120, 8), niska(180, 326, 136, 8), niska(324, 326, 116, 8), niska(500, 326, 146, 8),
  niska(646, 0, 8, 250), niska(646, 310, 8, 130), niska(646, 500, 8, 100),
];

// Kamera: ten sam porządek przekształceń co .world w s4.css (przesunięcie, skala, obrót X, obrót Z, środek).
export const KAT_X = 56;
export const KAT_Z = -40;

export type Kamera = { tx: number; ty: number; s: number; cx: number; cy: number };

const rad = (st: number) => (st * Math.PI) / 180;

/** Rzut punktu planu (względem środka planu, z w górę) na ekran przy skali 1, bez perspektywy. */
export function rzutPunktu(x: number, y: number, z: number): { X: number; Y: number } {
  const [cz, sz, cx, sx] = [Math.cos(rad(KAT_Z)), Math.sin(rad(KAT_Z)), Math.cos(rad(KAT_X)), Math.sin(rad(KAT_X))];
  return { X: x * cz - y * sz, Y: (x * sz + y * cz) * cx - z * sx };
}

function obrysBudynku() {
  const xs = [-SZEROKOSC_PLANU / 2 - 10, SZEROKOSC_PLANU / 2 + 10];
  const ys = [-GLEBOKOSC_PLANU / 2 - 10, GLEBOKOSC_PLANU / 2 + 10];
  const punkty = xs.flatMap((x) => ys.flatMap((y) => [-26, SCIANA_WYSOKA].map((z) => rzutPunktu(x, y, z))));
  const X = punkty.map((p) => p.X);
  const Y = punkty.map((p) => p.Y);
  return { L: Math.min(...X), R: Math.max(...X), T: Math.min(...Y), B: Math.max(...Y) };
}

/** calibrate + idleCam z s4.js: budynek mieści się w 84% szerokości i 80% wysokości sceny, lekko w prawo i w dół. */
export function kameraSpoczynku(szer: number, wys: number): Kamera {
  const { L, R, T, B } = obrysBudynku();
  const s = Math.min((szer * 0.84) / (R - L), (wys * 0.8) / (B - T), 1.05);
  return {
    tx: Math.round(-((L + R) / 2) * s + szer * 0.06),
    ty: Math.round(-((T + B) / 2) * s + wys * 0.05),
    s: Number(s.toFixed(3)),
    cx: 0,
    cy: 0,
  };
}

/** roomCam z s4.js bez zmiany kątów (etykiety pokoi zostają zwrócone do patrzącego w czasie przybliżenia). */
export function kameraPokoju(szer: number, wys: number, pokoj: Pokoj): Kamera {
  const baza = kameraSpoczynku(szer, wys);
  const k = Math.max(1.18, Math.min(1.5, 470 / Math.max(pokoj.w, pokoj.d * 0.8)));
  return {
    tx: Math.round(-szer * 0.04),
    ty: Math.round(wys * 0.1),
    s: Number((baza.s * k).toFixed(3)),
    cx: -(pokoj.x + pokoj.w / 2 - SZEROKOSC_PLANU / 2),
    cy: -(pokoj.y + pokoj.d / 2 - GLEBOKOSC_PLANU / 2),
  };
}

export function transformKamery(k: Kamera): string {
  return `translate(${k.tx}px, ${k.ty}px) scale(${k.s}) rotateX(${KAT_X}deg) rotateZ(${KAT_Z}deg) translate(${k.cx}px, ${k.cy}px)`;
}

/** Środek pokoju na ekranie względem środka sceny (bez perspektywy), do sprawdzenia, że przybliżenie trafia w pokój. */
export function srodekPokojuNaEkranie(k: Kamera, pokoj: Pokoj): { X: number; Y: number } {
  const p = rzutPunktu(pokoj.x + pokoj.w / 2 - SZEROKOSC_PLANU / 2 + k.cx, pokoj.y + pokoj.d / 2 - GLEBOKOSC_PLANU / 2 + k.cy, 0);
  return { X: k.tx + p.X * k.s, Y: k.ty + p.Y * k.s };
}
