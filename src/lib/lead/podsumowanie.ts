import { PYTANIA, type Decyzja, type OdpowiedzKonfig, type PytanieKonfig, type Trasa } from "@/content/formularz";
import type { OdpowiedziZgloszenia, Zgloszenie } from "./typy";

const ETYKIETY_TRAS: Readonly<Record<Trasa, string>> = {
  A: "droga A",
  B: "droga B (Mapa AI firmy)",
  C: "droga C (pilot)",
  duza_firma: "duża firma, droga A",
  odsiew: "odsiew",
};

export function etykietaTrasy(trasa: Trasa): string {
  return ETYKIETY_TRAS[trasa];
}

function odpowiedzKonfig(pytanie: PytanieKonfig, id: string): OdpowiedzKonfig | undefined {
  return pytanie.odpowiedzi.find((odpowiedz) => odpowiedz.id === id);
}

/**
 * Tekst wpisany przez klienta wygrywa nad etykietą, gdy odpowiedź go potrzebuje („inna”)
 * albo gdy to nazwa programu (Subiekt zamiast „ERP”). W pozostałych przypadkach krótka etykieta.
 */
function krotkoOdpowiedzi(odpowiedz: OdpowiedzKonfig, wpis: string | undefined): string {
  if (wpis !== undefined && (odpowiedz.krotko === undefined || odpowiedz.pole?.wymagane === false)) {
    return wpis;
  }
  return odpowiedz.krotko ?? odpowiedz.etykieta;
}

export function polaczPoPolsku(czesci: readonly string[]): string {
  if (czesci.length <= 1) {
    return czesci.join("");
  }
  return `${czesci.slice(0, -1).join(", ")} i ${czesci[czesci.length - 1]}`;
}

function krotkoPytania(pytanieId: string, odpowiedzi: OdpowiedziZgloszenia): string {
  const pytanie = PYTANIA.find((kandydat) => kandydat.id === pytanieId);
  const wybrane = odpowiedzi[pytanieId];
  if (pytanie === undefined || wybrane === undefined) {
    return "";
  }
  const czesci = wybrane.ids.flatMap((id) => {
    const odpowiedz = odpowiedzKonfig(pytanie, id);
    return odpowiedz === undefined ? [] : [krotkoOdpowiedzi(odpowiedz, wybrane.teksty[id])];
  });
  return polaczPoPolsku(czesci);
}

function zWielkiejLitery(wpis: string): string {
  return wpis.length === 0 ? wpis : wpis.charAt(0).toUpperCase() + wpis.slice(1);
}

/** Jedno zdanie do `crm_interactions.summary` (wzór: FORMULARZ.md sekcja 3). */
export function zbudujPodsumowanie(zgloszenie: Zgloszenie, decyzja: Decyzja): string {
  const { odpowiedzi } = zgloszenie;
  if (zgloszenie.rodzaj === "odsiew") {
    const czesci = ["wielkosc", "budzet", "termin"].map((id) => krotkoPytania(id, odpowiedzi));
    return `${zWielkiejLitery(czesci.filter((c) => c.length > 0).join(", "))}, prośba o przykłady`;
  }
  const czesci = ["rola", "wielkosc", "bol", "programy", "powod", "budzet", "termin"]
    .map((id) => krotkoPytania(id, odpowiedzi))
    .filter((czesc) => czesc.length > 0);
  return `${zWielkiejLitery(czesci.join(", "))}, ${ETYKIETY_TRAS[decyzja.trasa]}`;
}

/** Odpowiedzi do czytania przez człowieka (mail) i do `metadata` (etykiety obok id). */
export function opiszOdpowiedzi(odpowiedzi: OdpowiedziZgloszenia): readonly { pytanie: string; odpowiedz: string }[] {
  return PYTANIA.map((pytanie) => {
    const wybrane = odpowiedzi[pytanie.id];
    const opis = (wybrane?.ids ?? [])
      .map((id) => {
        const etykieta = odpowiedzKonfig(pytanie, id)?.etykieta ?? id;
        const wpis = wybrane?.teksty[id];
        return wpis === undefined ? etykieta : `${etykieta} (${wpis})`;
      })
      .join("; ");
    return { pytanie: pytanie.tekst, odpowiedz: opis };
  });
}

export type IdentyfikatoryCrm = {
  companyId: string | null;
  contactId: string;
  dealId: string;
  interactionId: string;
};

export type TrescMaila = {
  temat: string;
  tekst: string;
};

/** Mail do Bartka: ma wystarczyć do decyzji bez otwierania CRM. Bez HTML, żeby nic nie wstrzyknąć. */
export function zbudujMail(
  zgloszenie: Zgloszenie,
  decyzja: Decyzja,
  podsumowanie: string,
  identyfikatory: IdentyfikatoryCrm | null,
): TrescMaila {
  const wiersze: string[] = [podsumowanie, ""];
  let temat: string;

  if (zgloszenie.rodzaj === "odsiew") {
    temat = "Formularz www: prośba o przykłady";
    wiersze.push("Ekran „Nie teraz”: wyślij przykłady (filmiki z systemami).", `E-mail: ${zgloszenie.email}`);
  } else {
    const firma = zgloszenie.kontakt.firma.replace(/[\r\n]+/g, " ");
    temat = `Formularz www: ${firma}, ${decyzja.trasa === "duza_firma" ? "duża firma" : `droga ${decyzja.trasa}`}`;
    wiersze.push(
      `Droga: ${etykietaTrasy(decyzja.trasa)}`,
      `Znaczniki: ${decyzja.znaczniki.length > 0 ? decyzja.znaczniki.join(", ") : "brak"}`,
      `Osoba decyzyjna: ${decyzja.decydent ? "tak" : "nie"}`,
      "",
      "Dane kontaktowe",
      `Imię i nazwisko: ${zgloszenie.kontakt.imie}`,
      `Firma: ${zgloszenie.kontakt.firma}`,
      `Strona: ${zgloszenie.kontakt.strona}`,
      `E-mail: ${zgloszenie.kontakt.email}`,
      `Telefon: ${zgloszenie.kontakt.telefon ?? "brak"}`,
    );
  }

  wiersze.push("", "Odpowiedzi");
  opiszOdpowiedzi(zgloszenie.odpowiedzi).forEach(({ pytanie, odpowiedz }, indeks) => {
    wiersze.push(`${indeks + 1}. ${pytanie} ${odpowiedz}`);
  });
  wiersze.push("", "CRM");
  if (identyfikatory === null) {
    // Zapis do CRM się nie udał: mail jest jedynym śladem zgłoszenia, więc mówi to wprost.
    wiersze.push("ZAPIS DO CRM NIE POWIÓDŁ SIĘ. Dopisz zgłoszenie ręcznie z tego maila.");
  } else {
    wiersze.push(
      `company_id: ${identyfikatory.companyId ?? "brak"}`,
      `contact_id: ${identyfikatory.contactId}`,
      `deal_id: ${identyfikatory.dealId}`,
      `interaction_id: ${identyfikatory.interactionId}`,
    );
  }
  wiersze.push("", `Wersja formularza: ${zgloszenie.wersja}`);
  return { temat: identyfikatory === null ? `[BRAK ZAPISU W CRM] ${temat}` : temat, tekst: wiersze.join("\n") };
}
