import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { REVIEWS } from "@/lib/constants";
import { DZIALY, HOME_V4, bzykPoWyborze, etykietaKarty, inicjal, type DzialId } from "./home-v4";
import { PRZYKLADY } from "./home-v4-przyklady";
import { EKRAN_PROBA_NIEUDANA, PYTANIA } from "./formularz";

const DECK = resolve(process.cwd(), "docs/superpowers/specs/2026-11-12-strona-v4-teksty.md");

// Sprawdza go osobny test, bo w kodzie nazwa działu jest podstawiana.
const DYMEK_Z_NAZWA = "Zaznaczone: Zamówienia i operacje. Kliknij „Pokaż”, a przeniosę Cię do kart tego działu.";

// Cudzysłowy zdejmujemy po obu stronach: dane trzymają tekst bez cudzysłowu zewnętrznego, bo dodaje go wygląd karty.
const norm = (s: string): string => s.replace(/[„”“]/g, "").replace(/\s+/g, " ").trim();

const TERMINATORY = ["Miejsce", "Notatka:", "Kolejność", "#", "---"];

function wyciagnijTeksty(deck: string): string[] {
  const linie = deck.split("\n");
  const koniec = linie.findIndex((l) => l.startsWith("## 12."));
  const wynik: string[] = [];
  let zbiera = false;
  for (const linia of linie.slice(0, koniec)) {
    if (linia.startsWith("Miejsce: ")) {
      zbiera = true;
      continue;
    }
    if (TERMINATORY.some((t) => linia.startsWith(t))) {
      zbiera = false;
      continue;
    }
    if (!zbiera || linia.trim() === "") continue;
    if (linia.startsWith("- ")) wynik.push(linia.slice(2).trim());
    else if (linia.startsWith("Podpis: ")) wynik.push(linia.slice(8).trim());
    else wynik.push(linia.trim());
  }
  return wynik;
}

function wszystkieNapisy(wartosc: unknown): string[] {
  if (typeof wartosc === "string") return [wartosc];
  if (Array.isArray(wartosc)) return wartosc.flatMap(wszystkieNapisy);
  if (wartosc !== null && typeof wartosc === "object") return Object.values(wartosc).flatMap(wszystkieNapisy);
  return [];
}

function korpus(): Set<string> {
  // Napisy formularza (odpowiedź P6 „Próbowaliśmy…”, ekran wyniku) żyją w formularz.ts, nie w home-v4.ts.
  const napisy = [
    ...wszystkieNapisy(HOME_V4),
    ...wszystkieNapisy(PRZYKLADY),
    ...wszystkieNapisy(PYTANIA),
    ...wszystkieNapisy(EKRAN_PROBA_NIEUDANA),
    etykietaKarty(1),
  ];
  for (const o of HOME_V4.opinie.karty) {
    if (o.zrodlo !== "linkedin") continue;
    const tl = `${HOME_V4.opinie.etykietaTlumaczenia} ${o.tlumaczenie}`;
    napisy.push(tl, `${o.oryginal} ${tl}`);
  }
  return new Set(napisy.map(norm));
}

describe("teksty v4 1:1", () => {
  it("każdy tekst z „Miejsce:” w sekcjach 1-11 jest w module treści, bo tekst zmieniamy tylko przez plik tekstów", () => {
    const pomijane = new Set([DYMEK_Z_NAZWA].map(norm));
    const k = korpus();
    const brakujace = wyciagnijTeksty(readFileSync(DECK, "utf8"))
      .filter((t) => !pomijane.has(norm(t)))
      .filter((t) => !k.has(norm(t)));
    expect(brakujace).toEqual([]);
  });

  it("strażnik naprawdę czyta teksty, bo pusty wynik przepuściłby każdy brak", () => {
    expect(wyciagnijTeksty(readFileSync(DECK, "utf8")).length).toBeGreaterThan(250);
  });

  it("najdłuższa nazwa działu daje dymek z tekstów", () => {
    expect(bzykPoWyborze("Zamówienia i operacje")).toBe(DYMEK_Z_NAZWA);
  });

  it("liczba w efekcie jest fragmentem efektu, bo karta ma jedną liczbę i musi się zgadzać z tekstem", () => {
    for (const id of DZIALY) {
      const k = HOME_V4.dzialy.lista[id].karty[0];
      if (k.wyroznienie.rodzaj === "liczba") expect(k.efekt).toContain(k.wyroznienie.tekst);
    }
  });

  it("jedyna kwota w treści to 6 900 zł netto", () => {
    const kwoty = wszystkieNapisy(HOME_V4).flatMap((s) => s.match(/\d[\d\s]*\s?zł/g) ?? []);
    expect(kwoty).toEqual(["6 900 zł"]);
  });

  it("opinie w rzędzie w kolejności z tekstów", () => {
    expect(HOME_V4.opinie.karty.map((o) => o.podpis.split(/[ ,·]/)[0])).toEqual([
      "Marcin",
      "Dawid",
      "Paweł",
      "Bartosz",
      "CreativeDanceRumia",
      "Maciej",
      "Arek",
    ]);
  });

  it("opinie Google i LinkedIn są 1:1 z constants.ts, bo to cudze słowa i nie wolno ich poprawiać", () => {
    for (const o of HOME_V4.opinie.karty) {
      const imie = o.podpis.split(" · ")[0].split(",")[0];
      const zrodlo = REVIEWS.find((r) => r.name === imie);
      if (zrodlo === undefined) continue;
      expect(norm(o.zrodlo === "linkedin" ? o.oryginal : o.tekst)).toBe(norm(zrodlo.text));
    }
  });

  it("karty każdego działu mają rodzaje film, przyklad, opinia, pomysly, bo karuzela renderuje je w tej kolejności", () => {
    for (const id of DZIALY) {
      const d = HOME_V4.dzialy.lista[id];
      expect(d.id).toBe(id);
      expect(d.karty.map((k) => k.rodzaj)).toEqual(["film", "przyklad", "opinia", "pomysly"]);
      expect(d.karty[0].film).toBeNull();
    }
    expect(DZIALY).toEqual(["telefony", "marketing", "sprzedaz", "zamowienia", "logistyka"]);
  });

  it("wyróżnienia kart 1 są z tekstów, bo to jedyna liczba na karcie", () => {
    const l = HOME_V4.dzialy.lista;
    expect(l.telefony.karty[0].wyroznienie).toEqual({
      rodzaj: "wiersz",
      tekst: "Odbiera, umawia, przekazuje sprawę zespołowi",
      ikona: "sluchawka",
    });
    expect([l.marketing, l.sprzedaz, l.zamowienia, l.logistyka].map((d) => d.karty[0].wyroznienie.tekst)).toEqual([
      "2 906",
      "97,8%",
      "7-36 sekund",
      "215",
    ]);
  });

  it("FAQ ma 7 pytań, a ostatnie to obietnica, bo karta Gwarancja linkuje do pytania 7", () => {
    expect(HOME_V4.faq.pytania).toHaveLength(7);
    expect(HOME_V4.faq.pytania[6].id).toBe("obietnica");
  });

  it("oś ma 6 kroków od 0 do 5 i trzy kafle A, B, C", () => {
    expect(HOME_V4.wspolpraca.kroki.map((k) => k.nr)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(HOME_V4.wspolpraca.kafle.map((k) => k.droga)).toEqual(["A", "B", "C"]);
  });

  it("pola cytatu w hero składają się na pełny podpis z deka", () => {
    const { autor, zrodlo, ocena, podpis } = HOME_V4.hero.cytat;
    expect(podpis).toBe(`${autor} · ${zrodlo} · ${"★".repeat(ocena)}`);
  });

  it("inicjał to pierwsza wielka litera podpisu", () => {
    expect(inicjal("dawid Kar · 1 opinia")).toBe("D");
  });
});

describe("przykłady działania na kartach 2", () => {
  it("każdy dział ma 3 zakładki przykładu w kolejności z tekstów", () => {
    const etykiety = (id: DzialId) => PRZYKLADY[id].map((z) => z.etykieta);
    expect(etykiety("telefony")).toEqual(["Umówienie wizyty", "Przełożenie wizyty", "Status zamówienia"]);
    expect(etykiety("marketing")).toEqual(["Pytanie klienta", "Nowy produkt", "Stary wpis do odświeżenia"]);
    expect(etykiety("sprzedaz")).toEqual(["Wiadomość z rynku", "Rejestr firm", "Ogłoszenie o pracę"]);
    expect(etykiety("zamowienia")).toEqual(["SMS", "Mail", "PDF"]);
    expect(etykiety("logistyka")).toEqual(["Dokument przyjęcia", "Faktura", "Zlecenie transportowe"]);
  });

  it("każdy przykład ma co najmniej 3 wiersze wyniku i zaznaczenia obecne w źródle, bo animacja zapala zaznaczenie razem z wierszem", () => {
    for (const id of DZIALY) {
      for (const z of PRZYKLADY[id]) {
        const { zrodlo, wynik } = z.dane;
        expect(wynik.wiersze.length, `${id}/${z.etykieta}`).toBeGreaterThanOrEqual(3);
        expect(wynik.podpis, `${id}/${z.etykieta}`).not.toBe("");
        expect(zrodlo.zaznaczenia.length, `${id}/${z.etykieta}`).toBeGreaterThan(0);
        // Zaznaczenie i odpowiada wierszowi i, więc zaznaczeń nie może być więcej niż wierszy.
        expect(zrodlo.zaznaczenia.length).toBeLessThanOrEqual(wynik.wiersze.length);
        for (const zaznaczenie of zrodlo.zaznaczenia) {
          expect(zrodlo.linie.some((l) => l.includes(zaznaczenie)), `${id}/${z.etykieta}: ${zaznaczenie}`).toBe(true);
        }
      }
    }
  });

  it("nowe zestawy Telefonów i Marketingu nie mają kwot", () => {
    expect(JSON.stringify([PRZYKLADY.telefony[0], PRZYKLADY.marketing[2]])).not.toMatch(/\d\s?(zł|PLN|EUR|€)/);
  });

  it("nowe zestawy mają wygląd i podpis wyniku ze specyfikacji", () => {
    expect(PRZYKLADY.telefony[0].dane.wyglad).toBe("rozmowa");
    expect(PRZYKLADY.telefony[0].dane.wynik.podpis).toBe("Zgłoszenie dla zespołu");
    expect(PRZYKLADY.marketing[2].dane.wyglad).toBe("dokument");
    expect(PRZYKLADY.marketing[2].dane.wynik.podpis).toBe("Plan do zatwierdzenia");
  });

  it("firmy w przykładach mają opisowe nazwy, nie marki, bo marka ze szkicu mogła należeć do prawdziwej firmy", () => {
    const tekst = JSON.stringify(PRZYKLADY);
    for (const marka of ["Logipak", "Termo-Bud", "Meblar", "Złomex", "Bruk-Pol", "Bistro Przykład", "delikatesy-przyklad", "sp. z o.o."]) {
      expect(tekst).not.toContain(marka);
    }
    // Wiadomości z rynku są jawnie przykładowe.
    for (const z of PRZYKLADY.sprzedaz) expect(z.dane.zrodlo.naglowek ?? "").toMatch(/^Przykładow/);
  });

  it("PDF w Zamówieniach to zamówienie blach, bo plakietka mówi o hurtowni blach", () => {
    expect(PRZYKLADY.zamowienia[2].dane.zrodlo.linie.join(" ")).toMatch(/[Bb]lach/);
  });

  it("żadne zaznaczenie nie jest puste, bo pusty napis zapętliłby podział tekstu na zaznaczenia", () => {
    for (const id of DZIALY) for (const z of PRZYKLADY[id]) for (const s of z.dane.zrodlo.zaznaczenia) expect(s.trim()).not.toBe("");
  });

  it("żaden przykład nie ma kwoty, bo jedyna kwota na stronie to cena Mapy AI firmy", () => {
    expect(JSON.stringify(PRZYKLADY)).not.toMatch(/\d\s?(zł|PLN|EUR|€)/);
  });
});
