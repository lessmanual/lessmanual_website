// Wyłączniki twierdzeń niezweryfikowanych (decyzja CTO 27.11.2026): bez potwierdzenia nie idą na produkcję.
// Bartek włącza flagę (false -> true) dopiero po potwierdzeniu. Każda flaga ukrywa swój element razem z
// miejscem po nim, więc siatki i karuzele nie zostają z dziurą.
// Strażniki tekstów (home-v4.test.ts i scripts/qa/porownaj_teksty.py) czytają tu wartości flag oraz
// fragmenty z flagi-tresci.json: przy fladze false nie wymagają tekstów z pliku tekstów, które ta flaga ukrywa.
import fragmenty from "./flagi-tresci.json";

export type NazwaFlagiTresci = keyof typeof fragmenty;

export const FLAGI_TRESCI: Readonly<Record<NazwaFlagiTresci, boolean>> = {
  // Referencja Bartosza Łaskawca (Eighteen Studio): karta 3 w Telefonach i karta w rzędzie Opinie.
  POKAZ_REFERENCJE_BARTOSZA: true,
  // Zdanie o alarmach w akapicie Bezpieczeństwa i wiersz „Kopie zapasowe i alarmy”.
  POKAZ_ZDANIE_O_ALARMACH: false,
  // Zdanie o modelach AI w strefie danych UE (akapit i nagłówek sekcji Bezpieczeństwo).
  POKAZ_MODELE_AI_W_UE: false,
};

export type UkrywanieTekstow = { pomijajLinie: readonly string[]; usunZdania: readonly string[] };

// Fragmenty tekstów z pliku tekstów, których flaga (gdy false) nie pozwala pokazać.
export function ukrywaneTeksty(flagi: Readonly<Record<NazwaFlagiTresci, boolean>> = FLAGI_TRESCI): UkrywanieTekstow {
  const wylaczone = (Object.keys(fragmenty) as NazwaFlagiTresci[]).filter((nazwa) => !flagi[nazwa]);
  return {
    pomijajLinie: wylaczone.flatMap((nazwa) => fragmenty[nazwa].pomijajLinie),
    usunZdania: wylaczone.flatMap((nazwa) => fragmenty[nazwa].usunZdania),
  };
}
