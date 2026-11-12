"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useDzial } from "@/components/home-v4/DzialProvider";
import { HOME_V4, type DzialId } from "@/content/home-v4";
import {
  COKOL,
  GLEBOKOSC_PLANU,
  KAT_X,
  KAT_Z,
  kameraPokoju,
  kameraSpoczynku,
  PLAN,
  SCIANY,
  SZEROKOSC_PLANU,
  transformKamery,
  type Bryla as DaneBryly,
  type Okno,
} from "@/lib/home/rzut";
import styles from "./RzutFirmy.module.css";

const px = (v: number) => `${v}px`;
const rad = (st: number) => (st * Math.PI) / 180;
// Rozmiar sceny na 1440 przed pierwszym pomiarem: kamera z SSR zgadza się z kamerą po hydratacji.
const SCENA_STARTOWA = { szer: 1120, wys: 420 };
const CZAS_PRZYBLIZENIA_MS = 1800;

function Okna({ okna }: { okna: readonly Okno[] }) {
  return okna.map((o) => (
    <div key={`${o.x}-${o.y}`} className={styles.okno} style={{ left: px(o.x), top: px(o.y), width: px(o.w), height: px(o.h) }} />
  ));
}

// Bryła z szkicu (box w s4.js): góra, ściana południowa i zachodnia; tylko te widać pod kątem kamery.
function Bryla({ b, bezGory, oknaPoludnie, oknaZachod }: {
  b: DaneBryly;
  bezGory?: boolean;
  oknaPoludnie?: readonly Okno[];
  oknaZachod?: readonly Okno[];
}) {
  return (
    <div
      className={`${styles.bryla} ${styles[`m_${b.m}`]} ${b.duzy ? styles.duzy : ""}`}
      style={{ left: px(b.x), top: px(b.y), width: px(b.w), height: px(b.d), transform: b.z ? `translateZ(${b.z}px)` : undefined }}
    >
      {bezGory ? null : <div className={`${styles.f} ${styles.gora}`} style={{ transform: `translateZ(${b.h}px)` }} />}
      <div className={`${styles.f} ${styles.poludnie}`} style={{ height: px(b.h), top: px(b.d - b.h) }}>
        {oknaPoludnie ? <Okna okna={oknaPoludnie} /> : null}
      </div>
      <div className={`${styles.f} ${styles.zachod}`} style={{ width: px(b.h) }}>
        {oknaZachod ? <Okna okna={oknaZachod} /> : null}
      </div>
    </div>
  );
}

function bezRuchu(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Rzut firmy: na 1440 scena CSS 3D z s4 (pokoje klikalne), na 390 płaska mapka 120 px z tymi samymi pokojami.
// Dostępna droga do działów to zakładki pod rzutem, więc rzut jest ukryty przed czytnikami i poza kolejnością Tab.
export function RzutFirmy() {
  const { stan, wybierz } = useDzial();
  const scenaRef = useRef<HTMLDivElement>(null);
  const [scena, setScena] = useState(SCENA_STARTOWA);
  const [przyblizony, setPrzyblizony] = useState<DzialId | null>(null);

  useEffect(() => {
    const el = scenaRef.current;
    if (!el) return;
    const obserwator = new ResizeObserver(([wpis]) => {
      const { width, height } = wpis.contentRect;
      if (width > 0 && height > 0) setScena({ szer: Math.round(width), wys: Math.round(height) });
    });
    obserwator.observe(el);
    return () => obserwator.disconnect();
  }, []);

  useEffect(() => {
    if (!przyblizony) return;
    const czas = window.setTimeout(() => setPrzyblizony(null), CZAS_PRZYBLIZENIA_MS);
    return () => window.clearTimeout(czas);
  }, [przyblizony]);

  const wybierzPokoj = (id: DzialId) => {
    // Przybliżenie tylko przy pierwszym wyborze działu na stronie; kolejne zmiany to sama podmiana kart.
    if (!stan.byloPierwszeWybranie && !bezRuchu()) setPrzyblizony(id);
    wybierz(id, "rzut");
  };

  const pokojKamery = PLAN.find((p) => p.id === przyblizony);
  const kamera = pokojKamery ? kameraPokoju(scena.szer, scena.wys, pokojKamery) : kameraSpoczynku(scena.szer, scena.wys);
  const swiat: CSSProperties = {
    width: px(SZEROKOSC_PLANU),
    height: px(GLEBOKOSC_PLANU),
    margin: `${-GLEBOKOSC_PLANU / 2}px 0 0 ${-SZEROKOSC_PLANU / 2}px`,
    transform: transformKamery(kamera),
  };

  return (
    <div className={styles.rzut} data-qa="rzut" aria-hidden="true">
      <div className={styles.scena} ref={scenaRef} data-przyblizony={przyblizony ? "true" : undefined}>
        <div className={styles.swiat} style={swiat}>
          <div className={styles.grunt} />
          <Bryla b={COKOL} bezGory />
          {PLAN.map((p) => {
            const lampa = Math.min(p.w, p.d) * 1.05;
            return (
              <div
                key={p.id}
                className={styles.pokoj}
                data-qa="pokoj"
                data-dzial={p.id}
                data-aktywny={stan.aktywny === p.id ? "true" : undefined}
                style={{ left: px(p.x), top: px(p.y), width: px(p.w), height: px(p.d) }}
                onClick={() => wybierzPokoj(p.id)}
              >
                <div className={`${styles.podloga} ${styles[`podloga_${p.podloga}`]}`} />
                <div
                  className={styles.lampa}
                  style={{ left: px((p.w - lampa) / 2), top: px((p.d - lampa) / 2), width: px(lampa), height: px(lampa) }}
                />
                {(p.slonce ?? []).map((s) => (
                  <div key={s.x} className={styles.slonce} style={{ left: px(s.x), width: px(s.w) }} />
                ))}
                {(p.plaskie ?? []).map((f) => (
                  <div
                    key={`${f.x}-${f.y}`}
                    className={`${styles.plaskie} ${styles[f.rodzaj]}`}
                    style={{ left: px(f.x), top: px(f.y), width: px(f.w), height: px(f.d) }}
                  />
                ))}
                {p.meble.map((b) => (
                  <div key={`${b.x}-${b.y}-${b.z ?? 0}`} className={styles.mebel}>
                    {b.z ? null : (
                      <div className={styles.cien} style={{ left: px(b.x), top: px(b.y), width: px(b.w), height: px(b.d) }} />
                    )}
                    <Bryla b={b} />
                  </div>
                ))}
                {/* Odwrotność skali kamery: scena 420 px zmniejsza świat ok. 0,46×, a napis ma zostać 17 px. */}
                <div
                  className={styles.etykieta}
                  style={{
                    left: px(p.w / 2),
                    top: px(p.d / 2),
                    transform: `rotateZ(${-KAT_Z}deg) rotateX(${-KAT_X}deg) scale(${(1 / kamera.s).toFixed(3)})`,
                  }}
                >
                  <div className={styles.etykietaIn}>
                    <span className={styles.pigulka}>
                      <i />
                      {HOME_V4.dzialy.lista[p.id].zakladka}
                    </span>
                    {/* Trzon do podłogi: lz × sin(56°) jak calc() w s4.css, razy skala, bo etykieta jest powiększona. */}
                    <span className={styles.trzon} style={{ height: px(Math.round(p.lz * Math.sin(rad(KAT_X)) * kamera.s)) }} />
                  </div>
                </div>
              </div>
            );
          })}
          {SCIANY.map((s) => (
            <Bryla
              key={`${s.bryla.x}-${s.bryla.y}`}
              b={s.bryla}
              oknaPoludnie={s.oknaPoludnie}
              oknaZachod={s.oknaZachod}
            />
          ))}
        </div>
      </div>
      <div className={styles.mapka}>
        {PLAN.map((p) => (
          <button
            key={p.id}
            type="button"
            tabIndex={-1}
            className={styles.mapkaPokoj}
            data-qa="pokoj"
            data-dzial={p.id}
            data-aktywny={stan.aktywny === p.id ? "true" : undefined}
            style={{
              left: `${(p.x / SZEROKOSC_PLANU) * 100}%`,
              top: `${(p.y / GLEBOKOSC_PLANU) * 100}%`,
              width: `${(p.w / SZEROKOSC_PLANU) * 100}%`,
              height: `${(p.d / GLEBOKOSC_PLANU) * 100}%`,
            }}
            onClick={() => wybierz(p.id, "rzut")}
          />
        ))}
      </div>
    </div>
  );
}
