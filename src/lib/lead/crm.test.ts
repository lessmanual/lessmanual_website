import { describe, expect, it } from "vitest";
import { zdecyduj } from "@/content/formularz";
import {
  zbudujFirme,
  zbudujInterakcje,
  zbudujKontakt,
  zbudujSzanse,
  zrodloZgloszenia,
} from "./crm";
import { adresKalendarza } from "./kalendarz";
import { zajmijMiejsce, type StanLimitu } from "./limit";
import { KONTAKT_PRZYKLADOWY, odpowiedz, odpowiedziPodstawowe } from "./przyklady";
import { parsujZgloszenie } from "./parsuj";
import { zbudujMail, zbudujPodsumowanie } from "./podsumowanie";
import type { Zgloszenie, ZgloszeniePelne } from "./typy";

function zgloszenie(zmiany: Parameters<typeof odpowiedziPodstawowe>[0] = {}): ZgloszeniePelne {
  const wynik = parsujZgloszenie({
    rodzaj: "zgloszenie",
    wersja: "2026-11-11-v1",
    zgoda: true,
    odpowiedzi: odpowiedziPodstawowe(zmiany),
    kontakt: { ...KONTAKT_PRZYKLADOWY },
  });
  if (!wynik.ok || wynik.wartosc.rodzaj !== "zgloszenie") {
    throw new Error("Przykładowe zgłoszenie powinno być poprawne");
  }
  return wynik.wartosc;
}

describe("summary", () => {
  it("składa jedno zdanie jak wzór z FORMULARZ.md: rola, wielkość, ból, programy, powód, budżet, termin, droga", () => {
    const z = zgloszenie();
    expect(zbudujPodsumowanie(z, zdecyduj(z.odpowiedzi))).toBe(
      "Właściciel, 31-100 osób, dokumenty i zamówienia, Subiekt, konkurencja już to robi, 15-30 tys. zł, start w 3 mies., droga A",
    );
  });

  it("dla dużej firmy nazywa drogę wprost, żeby Bartek widział, skąd 45 minut", () => {
    const z = zgloszenie({ wielkosc: odpowiedz("os_250_plus") });
    expect(zbudujPodsumowanie(z, zdecyduj(z.odpowiedzi))).toMatch(/duża firma, droga A$/);
  });
});

describe("rekordy CRM", () => {
  const z = zgloszenie();
  const decyzja = zdecyduj(z.odpowiedzi);

  it("firma dostaje przedział wielkości i źródło z pytania „Skąd o nas wiesz?”", () => {
    expect(zbudujFirme(z)).toMatchObject({
      tenant_id: "lessmanual",
      name: "Kowalski Logistyka",
      size: "31-100",
      source: "formularz_www:chatgpt",
    });
  });

  it("kontakt ma e-mail małymi literami i flagę decydenta z reguły z pliku konfiguracji", () => {
    expect(zbudujKontakt(z, decyzja, "firma-1")).toMatchObject({
      company_id: "firma-1",
      email: "jan@kowalski-logistyka.pl",
      role: "Właściciel albo prezes",
      is_decision_maker: true,
      source: "formularz_www",
      confidence: 1,
      is_primary: true,
    });
  });

  it("szansa ma stage formularz, produkt z drogi i metadata bez IP z surowymi odpowiedziami", () => {
    const szansa = zbudujSzanse(z, decyzja, "firma-1", "kontakt-1", "Mozilla/5.0");
    expect(szansa).toMatchObject({
      title: "Kowalski Logistyka: droga A",
      stage: "formularz",
      product: "droga_A",
      source: "formularz_www:chatgpt",
    });
    expect(szansa.metadata.odpowiedzi.budzet?.ids).toEqual(["15_30k"]);
    expect(szansa.metadata.odpowiedzi.programy?.teksty).toEqual({ erp: "Subiekt" });
    expect(JSON.stringify(szansa.metadata)).not.toMatch(/\bip\b/i);
  });

  it("duża firma dostaje tytuł, produkt i notatkę zgodne z decyzją Bartka z 10.11", () => {
    const duza = zgloszenie({ wielkosc: odpowiedz("os_250_plus") });
    const szansa = zbudujSzanse(duza, zdecyduj(duza.odpowiedzi), null, "k", "ua");
    expect(szansa.title).toBe("Kowalski Logistyka: duża firma, droga A");
    expect(szansa.product).toBe("droga_A");
    expect(szansa.notes).toBe("duża firma, decyzja po 1. rozmowie");
  });

  it("droga B i C mapują się na produkty mapa_ai i pilot", () => {
    const b = zgloszenie({ etap: odpowiedz("nie_wiem_od_czego") });
    const c = zgloszenie({ etap: odpowiedz("najpierw_zobaczyc") });
    expect(zbudujSzanse(b, zdecyduj(b.odpowiedzi), null, "k", "ua").product).toBe("mapa_ai");
    expect(zbudujSzanse(c, zdecyduj(c.odpowiedzi), null, "k", "ua").product).toBe("pilot");
  });

  it("interakcja jest przychodząca, z kanału strona, z podsumowaniem i znacznikiem czasu", () => {
    const interakcja = zbudujInterakcje(
      z,
      decyzja,
      { companyId: "f", contactId: "k", dealId: "d" },
      "podsumowanie",
      "2026-11-11T10:00:00.000Z",
      "ua",
    );
    expect(interakcja).toMatchObject({
      type: "formularz",
      channel: "strona",
      direction: "inbound",
      link_status: "linked",
      title: "Formularz www",
      summary: "podsumowanie",
      occurred_at: "2026-11-11T10:00:00.000Z",
    });
  });

  it("zgłoszenie „Nie teraz” zapisuje adres e-mail jako nazwę kontaktu i etap formularz_odsiew", () => {
    const odsiew: Zgloszenie = {
      rodzaj: "odsiew",
      wersja: "2026-11-11-v1",
      email: "ola@firma.pl",
      odpowiedzi: odpowiedziPodstawowe({ wielkosc: odpowiedz("os_1_9"), budzet: odpowiedz("do_5k") }),
    };
    const d = zdecyduj(odsiew.odpowiedzi);
    expect(d.trasa).toBe("odsiew");
    expect(zbudujKontakt(odsiew, d, null).full_name).toBe("ola@firma.pl");
    const szansa = zbudujSzanse(odsiew, d, null, "k", "ua");
    expect(szansa.stage).toBe("formularz_odsiew");
    expect(szansa.title).toBe("ola@firma.pl: odsiew, prośba o przykłady");
    expect(zrodloZgloszenia(odsiew.odpowiedzi)).toBe("formularz_www:chatgpt");
  });
});

describe("mail do Bartka", () => {
  it("temat zawiera firmę i drogę, a treść identyfikatory rekordów CRM", () => {
    const z = zgloszenie();
    const d = zdecyduj(z.odpowiedzi);
    const mail = zbudujMail(z, d, "podsumowanie", {
      companyId: "f1",
      contactId: "k1",
      dealId: "d1",
      interactionId: "i1",
    });
    expect(mail.temat).toBe("Formularz www: Kowalski Logistyka, droga A");
    expect(mail.tekst).toContain("deal_id: d1");
    expect(mail.tekst).toContain("Subiekt");
  });

  it("mail „Nie teraz” ma stały temat z prośbą o przykłady", () => {
    const odsiew: Zgloszenie = {
      rodzaj: "odsiew",
      wersja: "v",
      email: "ola@firma.pl",
      odpowiedzi: odpowiedziPodstawowe(),
    };
    const mail = zbudujMail(odsiew, { trasa: "odsiew", znaczniki: [], decydent: false }, "s", {
      companyId: null,
      contactId: "k",
      dealId: "d",
      interactionId: "i",
    });
    expect(mail.temat).toBe("Formularz www: prośba o przykłady");
  });
});

describe("kalendarz", () => {
  it("koduje parametry prefill, bo imię i firma mogą zawierać spacje i znaki specjalne", () => {
    const adres = adresKalendarza("A", { imie: "Zażółć Gęślą", email: "a+b@firma.pl", firma: "R&D Sp. z o.o." });
    expect(adres).toContain("https://cal.com/bart%C5%82omiej-chudzik-2en6pt/30min?embed=true");
    expect(adres).toContain("name=Za%C5%BC%C3%B3%C5%82%C4%87%20G%C4%99%C5%9Bl%C4%85");
    expect(adres).toContain("email=a%2Bb%40firma.pl");
    expect(adres).toContain("R%26D");
  });
});

describe("limit zgłoszeń", () => {
  it("blokuje szóste zgłoszenie z jednego IP w oknie, a po oknie znów przepuszcza", () => {
    const stan: StanLimitu = new Map();
    const start = 1_000_000;
    const wyniki = Array.from({ length: 6 }, (_, i) => zajmijMiejsce(stan, "1.2.3.4", start + i));
    expect(wyniki).toEqual([true, true, true, true, true, false]);
    expect(zajmijMiejsce(stan, "5.6.7.8", start)).toBe(true);
    expect(zajmijMiejsce(stan, "1.2.3.4", start + 10 * 60 * 1000 + 10)).toBe(true);
  });
});
