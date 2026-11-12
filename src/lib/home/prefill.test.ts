import { beforeEach, describe, expect, it } from "vitest";
import { DZIALY } from "@/content/home-v4";
import { PYTANIA } from "@/content/formularz";
import {
  BOL_DLA_DZIALU,
  nasluchujPrefill,
  odbierzOczekujace,
  PYTANIE_BOL,
  prefillDlaDzialu,
  zglosPrefill,
  zastosujPrefill,
  type PrefillFormularza,
} from "./prefill";

beforeEach(() => {
  odbierzOczekujace();
});

describe("zastosujPrefill, pytanie o ból", () => {
  it("Sprzedaż zaznacza szukanie klientów i oferty", () => {
    expect(zastosujPrefill({}, prefillDlaDzialu("sprzedaz"))[PYTANIE_BOL]?.ids).toEqual(["szukanie_klientow", "oferty"]);
  });

  it("prefill dokłada się do wyborów użytkownika i niczego nie odznacza", () => {
    const o = { bol: { ids: ["raporty"], teksty: {} } };
    expect(zastosujPrefill(o, prefillDlaDzialu("telefony")).bol?.ids).toEqual(["raporty", "telefony"]);
  });

  it("dwa działy po kolei sumują się bez duplikatów", () => {
    const po1 = zastosujPrefill({}, prefillDlaDzialu("sprzedaz"));
    const po2 = zastosujPrefill(po1, prefillDlaDzialu("zamowienia"));
    const po3 = zastosujPrefill(po2, prefillDlaDzialu("sprzedaz"));
    expect(po3.bol?.ids).toEqual(["szukanie_klientow", "oferty", "zamowienia"]);
  });

  it("Marketing wpisuje „Marketing i treści” w Inne tylko gdy pole jest puste", () => {
    const puste = zastosujPrefill({}, prefillDlaDzialu("marketing"));
    expect(puste.bol).toEqual({ ids: ["inne"], teksty: { inne: "Marketing i treści" } });
    const wlasny = zastosujPrefill({ bol: { ids: ["inne"], teksty: { inne: "własny" } } }, prefillDlaDzialu("marketing"));
    expect(wlasny.bol?.teksty.inne).toBe("własny");
  });

  it("nie zmienia obiektu wejściowego", () => {
    const o = { bol: { ids: ["raporty"], teksty: {} } };
    zastosujPrefill(o, prefillDlaDzialu("telefony"));
    expect(o.bol.ids).toEqual(["raporty"]);
  });

  it("każdy dział ma odpowiedzi istniejące w pytaniu bol", () => {
    const dozwolone = PYTANIA.find((p) => p.id === PYTANIE_BOL)?.odpowiedzi.map((o) => o.id) ?? [];
    for (const dzial of DZIALY) {
      for (const id of BOL_DLA_DZIALU[dzial].ids) expect(dozwolone).toContain(id);
    }
  });
});

describe("zastosujPrefill, droga", () => {
  it("droga B zaznacza nie_wiem_od_czego w pytaniu etap i zastępuje poprzedni wybór (pytanie single)", () => {
    const o = { etap: { ids: ["wiem_co_boli"], teksty: {} } };
    const wynik = zastosujPrefill(o, { rodzaj: "droga", droga: "B" });
    expect(wynik.etap).toEqual({ ids: ["nie_wiem_od_czego"], teksty: {} });
  });
});

describe("kolejka prefillu", () => {
  it("prefill zgłoszony przed montażem formularza czeka w kolejce i jest odebrany raz", () => {
    const p = prefillDlaDzialu("logistyka");
    zglosPrefill(p);
    expect(odbierzOczekujace()).toEqual([p]);
    expect(odbierzOczekujace()).toEqual([]);
  });

  it("przy słuchaczu prefill idzie od razu do niego i nie trafia do kolejki", () => {
    const odebrane: PrefillFormularza[] = [];
    const przestan = nasluchujPrefill((p) => odebrane.push(p));
    const p = prefillDlaDzialu("telefony");
    zglosPrefill(p);
    przestan();
    expect(odebrane).toEqual([p]);
    expect(odbierzOczekujace()).toEqual([]);
  });
});
