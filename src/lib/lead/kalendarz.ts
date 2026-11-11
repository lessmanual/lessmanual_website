import { DROGI, KALENDARZ_BAZA, type TrasaZKalendarzem } from "@/content/formularz";

/** Adres osadzenia Cal.com z wypełnionym imieniem, mailem i krótką notatką (parametry prefill). */
export function adresKalendarza(
  trasa: TrasaZKalendarzem,
  osoba: { imie: string; email: string; firma: string },
): string {
  const opisTrasy = trasa === "duza_firma" ? "duża firma, droga A" : `droga ${trasa}`;
  const notatka = `${opisTrasy}, ${osoba.firma}`.slice(0, 200);
  const parametry = [
    "embed=true",
    `name=${encodeURIComponent(osoba.imie)}`,
    `email=${encodeURIComponent(osoba.email)}`,
    `notes=${encodeURIComponent(notatka)}`,
  ];
  return `${KALENDARZ_BAZA}/${DROGI[trasa].kalendarz}?${parametry.join("&")}`;
}
