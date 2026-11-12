// Wstępne zaznaczenie formularza z kart działów („Tak, to u nas”) i dróg. Czyste funkcje + mała kolejka zdarzeń,
// bo formularz bywa zamontowany później niż przycisk (albo wcale na tej podstronie).
import {
  ODPOWIEDZ_DLA_DROGI,
  PYTANIE_DROGA,
  type DrogaWejscia,
} from "@/content/formularz";
import type { DzialId } from "@/content/home-v4";
import type { WybranaOdpowiedz } from "@/lib/lead/typy";

export type PrefillFormularza =
  | { rodzaj: "bol"; ids: readonly string[]; inne: string | null }
  | { rodzaj: "droga"; droga: DrogaWejscia };

export const PYTANIE_BOL = "bol";

/** Marketing nie ma własnej odpowiedzi w pytaniu 4, więc trafia do „Inne” z gotowym wpisem (tylko do pustego pola). */
export const BOL_DLA_DZIALU: Readonly<
  Record<DzialId, { ids: readonly string[]; inne: string | null }>
> = {
  telefony: { ids: ["telefony"], inne: null },
  marketing: { ids: ["inne"], inne: "Marketing i treści" },
  sprzedaz: { ids: ["szukanie_klientow", "oferty"], inne: null },
  zamowienia: { ids: ["zamowienia"], inne: null },
  logistyka: { ids: ["dokumenty"], inne: null },
};

export function prefillDlaDzialu(dzial: DzialId): PrefillFormularza {
  const { ids, inne } = BOL_DLA_DZIALU[dzial];
  return { rodzaj: "bol", ids, inne };
}

/** Dokłada zaznaczenia, niczego nie odznacza; pytanie `etap` (single) zastępuje poprzedni wybór. */
export function zastosujPrefill(
  odp: Readonly<Record<string, WybranaOdpowiedz>>,
  p: PrefillFormularza,
): Record<string, WybranaOdpowiedz> {
  if (p.rodzaj === "droga") {
    return {
      ...odp,
      [PYTANIE_DROGA]: { ids: [ODPOWIEDZ_DLA_DROGI[p.droga]], teksty: {} },
    };
  }
  const biezace = odp[PYTANIE_BOL] ?? { ids: [], teksty: {} };
  const ids = [
    ...biezace.ids,
    ...p.ids.filter((id) => !biezace.ids.includes(id)),
  ];
  const teksty: Record<string, string> = { ...biezace.teksty };
  if (
    p.inne !== null &&
    ids.includes("inne") &&
    (teksty.inne ?? "").trim() === ""
  ) {
    teksty.inne = p.inne;
  }
  return { ...odp, [PYTANIE_BOL]: { ids, teksty } };
}

const sluchacze = new Set<(p: PrefillFormularza) => void>();
let oczekujace: PrefillFormularza[] = [];

/** Przy słuchaczu prefill idzie prosto do niego; bez słuchacza czeka w kolejce na montaż formularza. */
export function zglosPrefill(p: PrefillFormularza): void {
  if (sluchacze.size === 0) {
    oczekujace = [...oczekujace, p];
    return;
  }
  sluchacze.forEach((fn) => fn(p));
}

export function nasluchujPrefill(
  fn: (p: PrefillFormularza) => void,
): () => void {
  sluchacze.add(fn);
  return () => {
    sluchacze.delete(fn);
  };
}

export function odbierzOczekujace(): readonly PrefillFormularza[] {
  const kolejka = oczekujace;
  oczekujace = [];
  return kolejka;
}
