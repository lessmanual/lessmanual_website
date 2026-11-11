// Formularz kwalifikujący: JEDYNY plik konfiguracyjny (pytania, odpowiedzi, kwestie Bzyka,
// ekrany dróg, reguły odsiewu i kierowania). Źródło tekstów:
// materialy/cso/strona-2026-11-10/FORMULARZ.md (szkic CSO z 10.11.2026).
// Podmiana pytań albo reguł = edycja tylko tego pliku: komponent, walidacja po stronie serwera,
// zapis do CRM i mail czytają wszystko stąd. Identyfikatory odpowiedzi (slug ASCII) są kluczami
// w CRM (metadata), więc po wdrożeniu nie zmieniamy ich bez migracji danych.
// Poza FORMULARZ.md i TEKSTY v3 (sekcja 13) zostają tylko komunikaty techniczne (błędy pól, ładowanie).

export const WERSJA_FORMULARZA = "2026-11-11-v3";

export type Trasa = "A" | "B" | "C" | "duza_firma" | "odsiew";
export type TrasaZKalendarzem = Exclude<Trasa, "odsiew">;
export type Znacznik = "budzet_ponizej_S" | "priorytet";

export type PolePodrzedne = {
  etykieta: string;
  wymagane: boolean;
};

export type OdpowiedzKonfig = {
  id: string;
  etykieta: string;
  /** Wersja do jednozdaniowego summary w CRM; brak = etykieta. */
  krotko?: string;
  pole?: PolePodrzedne;
  /** Tylko pytanie „Gdzie dziś jesteś?”: do której drogi prowadzi odpowiedź. */
  droga?: Extract<Trasa, "A" | "B" | "C">;
};

export type PytanieKonfig = {
  id: string;
  typ: "single" | "multi";
  tekst: string;
  bzyk: string;
  odpowiedzi: readonly OdpowiedzKonfig[];
};

export const START = {
  bzyk: "Cześć, jestem Bzyk. Mam 10 pytań o Twoją firmę, to zajmie około 2 minut.",
  przycisk: "Zaczynamy",
} as const;

export const PYTANIA: readonly PytanieKonfig[] = [
  {
    id: "rola",
    typ: "single",
    tekst: "Jaka jest Twoja rola w firmie?",
    bzyk: "Pytam, żeby dopasować rozmowę do Twojej roli.",
    odpowiedzi: [
      { id: "wlasciciel", etykieta: "Właściciel albo prezes", krotko: "właściciel" },
      { id: "wspolnik", etykieta: "Wspólnik albo członek zarządu", krotko: "wspólnik" },
      { id: "dyrektor", etykieta: "Dyrektor albo kierownik działu", krotko: "dyrektor lub kierownik" },
      { id: "zbieram_oferty", etykieta: "Zbieram oferty dla zarządu", krotko: "zbiera oferty dla zarządu" },
      { id: "inna", etykieta: "Inna", pole: { etykieta: "Jaka to rola?", wymagane: true } },
    ],
  },
  {
    id: "wielkosc",
    typ: "single",
    tekst: "Ile osób pracuje w Twojej firmie?",
    bzyk: "Pytam, żeby dobrać skalę pierwszego systemu.",
    odpowiedzi: [
      { id: "os_1_9", etykieta: "1-9", krotko: "1-9 osób" },
      { id: "os_10_30", etykieta: "10-30", krotko: "10-30 osób" },
      { id: "os_31_100", etykieta: "31-100", krotko: "31-100 osób" },
      { id: "os_101_250", etykieta: "101-250", krotko: "101-250 osób" },
      { id: "os_250_plus", etykieta: "Ponad 250", krotko: "ponad 250 osób" },
    ],
  },
  {
    id: "decyzja",
    typ: "single",
    tekst: "Kto podejmie decyzję o wdrożeniu?",
    bzyk: "Pytam, bo od tego zależy, ile potrwa start.",
    odpowiedzi: [
      { id: "ja_sam", etykieta: "Decyduję ja", krotko: "decyduje sam" },
      { id: "ze_wspolnikiem", etykieta: "Decyduję razem ze wspólnikiem", krotko: "decyduje ze wspólnikiem" },
      { id: "zarzad_oferty", etykieta: "Zarząd po zebraniu ofert", krotko: "decyduje zarząd po zebraniu ofert" },
      { id: "zakupy_przetarg", etykieta: "Dział zakupów albo przetarg", krotko: "decyduje dział zakupów lub przetarg" },
      { id: "nie_wiem", etykieta: "Jeszcze nie wiem", krotko: "decydent nieznany" },
    ],
  },
  {
    id: "bol",
    typ: "multi",
    tekst: "Co dziś zabiera Wam najwięcej ręcznej pracy?",
    bzyk: "Te odpowiedzi pomogą nam przygotować się do rozmowy.",
    odpowiedzi: [
      { id: "dokumenty", etykieta: "Przepisywanie dokumentów i faktur", krotko: "dokumenty" },
      { id: "maile", etykieta: "Maile i korespondencja", krotko: "maile" },
      { id: "zamowienia", etykieta: "Zamówienia i zapytania od klientów", krotko: "zamówienia" },
      { id: "oferty", etykieta: "Przygotowanie ofert i wycen", krotko: "oferty i wyceny" },
      { id: "raporty", etykieta: "Raporty i zestawienia dla mnie", krotko: "raporty" },
      { id: "szukanie_klientow", etykieta: "Szukanie klientów, zleceń i przetargów", krotko: "szukanie klientów i zleceń" },
      { id: "telefony", etykieta: "Odbieranie telefonów", krotko: "telefony" },
      { id: "programy_nie_lacza", etykieta: "Programy, które się nie łączą", krotko: "programy się nie łączą" },
      { id: "inne", etykieta: "Inne", pole: { etykieta: "Co jeszcze?", wymagane: true } },
    ],
  },
  {
    id: "programy",
    typ: "multi",
    tekst: "Na jakich programach pracujecie?",
    bzyk: "Jeśli znasz nazwę programu, wpisz ją.",
    odpowiedzi: [
      { id: "google", etykieta: "Poczta i dokumenty Google", krotko: "Google" },
      { id: "microsoft", etykieta: "Outlook i Microsoft 365", krotko: "Microsoft 365" },
      { id: "excel", etykieta: "Excel albo arkusze", krotko: "Excel" },
      {
        id: "erp",
        etykieta: "Program księgowy albo ERP",
        krotko: "ERP",
        pole: { etykieta: "Nazwa, np. Subiekt, enova365, Optima", wymagane: false },
      },
      { id: "crm", etykieta: "CRM", krotko: "CRM", pole: { etykieta: "Nazwa CRM", wymagane: false } },
      {
        id: "branzowy",
        etykieta: "Program branżowy",
        krotko: "program branżowy",
        pole: { etykieta: "Nazwa programu", wymagane: false },
      },
      { id: "nie_wiem", etykieta: "Nie wiem", krotko: "programy nieznane" },
    ],
  },
  {
    id: "etap",
    typ: "single",
    tekst: "Gdzie dziś jesteś?",
    bzyk: "Od tej odpowiedzi zależy, jaką rozmowę zaproponujemy na końcu.",
    odpowiedzi: [
      { id: "wiem_co_boli", etykieta: "Wiem, co mnie najbardziej boli", droga: "A" },
      { id: "lista_pomyslow", etykieta: "Mam listę pomysłów albo własny plan", droga: "A" },
      { id: "nie_wiem_od_czego", etykieta: "Nie wiem, od czego zacząć", droga: "B" },
      { id: "najpierw_zobaczyc", etykieta: "Najpierw chcę zobaczyć, że to działa na moich danych", droga: "C" },
    ],
  },
  {
    id: "powod",
    typ: "single",
    tekst: "Dlaczego teraz?",
    bzyk: "Od tego zaczniemy rozmowę.",
    odpowiedzi: [
      { id: "konkurencja", etykieta: "Konkurencja już to robi", krotko: "konkurencja już to robi" },
      { id: "nie_nadazamy", etykieta: "Rośnie liczba spraw, a zespół nie nadąża", krotko: "zespół nie nadąża" },
      { id: "odchodza", etykieta: "Ludzie odchodzą i zabierają wiedzę ze sobą", krotko: "ludzie odchodzą z wiedzą" },
      { id: "pilnuje_osobiscie", etykieta: "Za dużo spraw muszę pilnować osobiście", krotko: "za dużo spraw pilnuje osobiście" },
      { id: "zobaczylem_efekt", etykieta: "Zobaczyłem efekt w innej firmie", krotko: "widział efekt w innej firmie" },
      { id: "sprawdzic_co_da_ai", etykieta: "Chcę sprawdzić, co AI da mojej firmie", krotko: "chce sprawdzić, co da AI" },
      { id: "inny", etykieta: "Inny powód", pole: { etykieta: "Jaki to powód?", wymagane: true } },
    ],
  },
  {
    id: "budzet",
    typ: "single",
    tekst: "Ile planujesz przeznaczyć na pierwszy system?",
    bzyk: "Pytam, żeby zaproponować pierwszy krok w Twoim budżecie.",
    odpowiedzi: [
      { id: "do_5k", etykieta: "Do 5 tys. zł netto", krotko: "do 5 tys. zł" },
      { id: "5_15k", etykieta: "5-15 tys. zł netto", krotko: "5-15 tys. zł" },
      { id: "15_30k", etykieta: "15-30 tys. zł netto", krotko: "15-30 tys. zł" },
      { id: "30_60k", etykieta: "30-60 tys. zł netto", krotko: "30-60 tys. zł" },
      { id: "ponad_60k", etykieta: "Ponad 60 tys. zł netto", krotko: "ponad 60 tys. zł" },
      { id: "nie_wiem", etykieta: "Jeszcze nie wiem", krotko: "budżet nieznany" },
    ],
  },
  {
    id: "termin",
    typ: "single",
    tekst: "Kiedy chcesz zacząć?",
    bzyk: "Przyjmujemy maksymalnie 4 nowe firmy miesięcznie, dlatego pytam o termin.",
    odpowiedzi: [
      { id: "w_tym_miesiacu", etykieta: "W tym miesiącu", krotko: "start w tym miesiącu" },
      { id: "3_miesiace", etykieta: "W ciągu 3 miesięcy", krotko: "start w 3 mies." },
      { id: "pol_roku", etykieta: "W ciągu pół roku", krotko: "start w pół roku" },
      { id: "rozgladam_sie", etykieta: "Na razie się rozglądam", krotko: "na razie się rozgląda" },
    ],
  },
  {
    id: "zrodlo",
    typ: "single",
    tekst: "Skąd o nas wiesz?",
    bzyk: "To ostatnie pytanie.",
    odpowiedzi: [
      { id: "chatgpt", etykieta: "ChatGPT" },
      { id: "gemini", etykieta: "Gemini" },
      { id: "claude", etykieta: "Claude" },
      { id: "perplexity", etykieta: "Perplexity" },
      { id: "google", etykieta: "Google" },
      { id: "polecenie", etykieta: "Polecenie", pole: { etykieta: "Od kogo?", wymagane: false } },
      { id: "linkedin", etykieta: "LinkedIn" },
      { id: "inne", etykieta: "Inne", pole: { etykieta: "Skąd?", wymagane: true } },
    ],
  },
];

/** Pytanie, z którego bierzemy źródło do `source` w CRM (`formularz_www:<id odpowiedzi>`). */
export const PYTANIE_ZRODLO = "zrodlo";
/** Pytanie wyznaczające drogę (odpowiedzi mają pole `droga`). */
export const PYTANIE_DROGA = "etap";

export type DrogaWejscia = Extract<Trasa, "A" | "B" | "C">;

/**
 * Wstępne zaznaczenie w pytaniu 6 (TEKSTY v3 sekcja 5): przyciski strony prowadzą na `/?droga=X#formularz`.
 * Id odpowiedzi trzymamy tu, bo to jedyne miejsce, które zna treść pytań.
 */
export const ODPOWIEDZ_DLA_DROGI: Readonly<Record<DrogaWejscia, string>> = {
  A: "wiem_co_boli",
  B: "nie_wiem_od_czego",
  C: "najpierw_zobaczyc",
};

/** Id odpowiedzi pytania 6 dla wartości parametru `droga`; nieznana wartość = null (brak zaznaczenia). */
export function odpowiedzDlaDrogi(wartosc: string | null): string | null {
  if (wartosc === "A" || wartosc === "B" || wartosc === "C") {
    return ODPOWIEDZ_DLA_DROGI[wartosc];
  }
  return null;
}

export const KONTAKT = {
  bzyk: "Podaj dane kontaktowe, potem wybierzesz termin rozmowy.",
  bzykBlad: "Popraw zaznaczone pola.",
  naglowek: "Dane kontaktowe",
  przycisk: "Wybierz termin",
  pola: {
    imie: "Imię i nazwisko",
    firma: "Nazwa firmy",
    strona: "Adres strony firmy",
    email: "E-mail służbowy",
    telefon: "Telefon (opcjonalnie)",
  },
  zgoda: "Zgadzam się na kontakt w sprawie zgłoszenia.",
  zgodaLink: "Polityka prywatności",
} as const;

export type EkranDrogi = {
  bzyk: string;
  tytul: string;
  tekst: string;
  /**
   * Docelowy typ spotkania w Cal.com. Dziś istnieje tylko `30min` (sprawdzone 11.11.2026:
   * /30min zwraca 200, /45min 404), więc `kalendarz` jest `30min` dla każdej drogi. Gdy Bartek
   * założy typ 45 minut, wystarczy zmienić `kalendarz` w drogach A i duza_firma.
   */
  kalendarz: string;
  docelowyTyp: string;
};

export const KALENDARZ_BAZA = "https://cal.com/bart%C5%82omiej-chudzik-2en6pt";

export const DROGI: Readonly<Record<TrasaZKalendarzem, EkranDrogi>> = {
  A: {
    bzyk: "Wybierz termin rozmowy z Bartkiem, potrwa 45 minut.",
    tytul: "Rozmowa z Bartkiem, 45 minut",
    tekst:
      "Na rozmowie przejdziemy przez to, co boli najbardziej. Potem dostaniesz spisany zakres: etapy z ceną i efekt, który ma dawać system.",
    kalendarz: "30min",
    docelowyTyp: "45min",
  },
  B: {
    bzyk: "Wybierz termin rozmowy o Mapie AI firmy, potrwa 30 minut.",
    tytul: "Rozmowa o Mapie AI firmy, 30 minut",
    tekst:
      "Mapa AI firmy to pełny obraz Twojej firmy i plan systemów na kwartał i rok. Cena: 6 900 zł netto, w całości odliczana od pierwszego wdrożenia.",
    kalendarz: "30min",
    docelowyTyp: "30min",
  },
  C: {
    bzyk: "Wybierz termin rozmowy o pilocie, potrwa 30 minut.",
    tytul: "Rozmowa o pilocie, 30 minut",
    tekst:
      "W szybkim pilocie przez dwa tygodnie budujemy jeden proces na próbce Twoich danych i uruchamiamy go na naszej infrastrukturze. Szczegóły i koszt omówimy na rozmowie.",
    kalendarz: "30min",
    docelowyTyp: "30min",
  },
  duza_firma: {
    bzyk: "Wybierz termin pierwszej rozmowy z Bartkiem, potrwa 45 minut.",
    tytul: "Rozmowa z Bartkiem, 45 minut",
    // FORMULARZ.md: kalendarz „jak droga A”, więc ten sam tekst co przy drodze A.
    tekst:
      "Na rozmowie przejdziemy przez to, co boli najbardziej. Potem dostaniesz spisany zakres: etapy z ceną i efekt, który ma dawać system.",
    kalendarz: "30min",
    docelowyTyp: "45min",
  },
};

export const NIE_TERAZ = {
  bzyk: "Na dziś nie możemy Ci pomóc i wolimy to powiedzieć od razu.",
  naglowek: "Nie teraz",
  tekst:
    "Nasze projekty zwykle zaczynają się od kilkunastu tysięcy zł netto. Zostaw maila, a wyślemy Ci krótkie filmiki z przykładami systemów.",
  poleEmail: "E-mail",
  zgoda: "Zgadzam się na wysłanie przykładów na ten adres.",
  przycisk: "Wyślij mi przykłady",
  potwierdzenieBzyk: "Dzięki. Przykłady wyślemy na podany adres.",
} as const;

/** Kwestia Bzyka po wysłaniu formularza (TEKSTY v3, sekcja 13). */
export const PO_WYSLANIU = "Bartek dostał Twoje odpowiedzi i przeczyta je przed rozmową.";

export const KOMUNIKATY = {
  brakOdpowiedziSingle: "Wybierz jedną odpowiedź.",
  brakOdpowiedziMulti: "Zaznacz przynajmniej jedną odpowiedź.",
  brakPola: "Dopisz, co masz na myśli.",
  wysylanie: "Wysyłam…",
  // TEKSTY v3, sekcja 13: jedna kwestia błędu dla każdej przyczyny (serwer, sieć, limit).
  bladWysylki: "Nie udało się wysłać odpowiedzi. Spróbuj jeszcze raz albo napisz na kontakt@lessmanual.ai.",
  brakZgodyKontakt: "Zaznacz zgodę, żeby przejść dalej.",
  brakZgodyOdsiew: "Zaznacz zgodę, żeby wysłać przykłady.",
  bladEmaila: "Wpisz pełny adres, np. jan@firma.pl.",
  kalendarzLink: "Otwórz kalendarz w nowej karcie",
  kalendarzTytul: "Kalendarz rezerwacji rozmowy z Bartkiem",
} as const;

// ---------------------------------------------------------------------------
// Reguły jako dane
// ---------------------------------------------------------------------------

/** Odpowiedź na pytanie `pytanie` jest jedną z `odpowiedzi`. */
export type Warunek = {
  pytanie: string;
  odpowiedzi: readonly string[];
};

/** Reguła spełniona, gdy spełnione są wszystkie warunki (AND). Zbiór reguł działa jako OR. */
export type Regula = {
  warunki: readonly Warunek[];
  /** Tylko dla znaczników: reguła działa wyłącznie na tych drogach. Brak = każda droga. */
  drogi?: readonly TrasaZKalendarzem[];
};

/** Odsiew twardy (FORMULARZ.md sekcja 2): każda z reguł osobno odsiewa. */
export const REGULY_ODSIEWU: readonly Regula[] = [
  { warunki: [{ pytanie: "wielkosc", odpowiedzi: ["os_1_9"] }, { pytanie: "budzet", odpowiedzi: ["do_5k"] }] },
  { warunki: [{ pytanie: "budzet", odpowiedzi: ["do_5k"] }, { pytanie: "termin", odpowiedzi: ["rozgladam_sie"] }] },
];

/** Duża firma: kalendarz otwarty, decyzja Bartka po 1. rozmowie. Wystarczy jedna reguła. */
export const REGULY_DUZEJ_FIRMY: readonly Regula[] = [
  { warunki: [{ pytanie: "wielkosc", odpowiedzi: ["os_250_plus"] }] },
  { warunki: [{ pytanie: "decyzja", odpowiedzi: ["zakupy_przetarg", "zarzad_oferty"] }] },
  { warunki: [{ pytanie: "rola", odpowiedzi: ["zbieram_oferty"] }] },
];

/** Znaczniki dla Bartka (korekta po budżecie i kolejność w kalendarzu). */
export const REGULY_ZNACZNIKOW: readonly { znacznik: Znacznik; reguly: readonly Regula[] }[] = [
  {
    znacznik: "budzet_ponizej_S",
    reguly: [{ drogi: ["A"], warunki: [{ pytanie: "budzet", odpowiedzi: ["5_15k"] }] }],
  },
  {
    znacznik: "priorytet",
    reguly: [
      {
        warunki: [
          { pytanie: "termin", odpowiedzi: ["w_tym_miesiacu"] },
          { pytanie: "budzet", odpowiedzi: ["15_30k", "30_60k", "ponad_60k"] },
        ],
      },
    ],
  },
];

/** Osoba decyzyjna: rola ORAZ sposób decyzji (FORMULARZ.md sekcja 3). */
export const REGULA_DECYDENTA: Regula = {
  warunki: [
    { pytanie: "rola", odpowiedzi: ["wlasciciel", "wspolnik"] },
    { pytanie: "decyzja", odpowiedzi: ["ja_sam", "ze_wspolnikiem"] },
  ],
};

// ---------------------------------------------------------------------------
// Czysta funkcja decyzji
// ---------------------------------------------------------------------------

export type OdpowiedziWybrane = Readonly<Record<string, { readonly ids: readonly string[] }>>;

export type Decyzja = {
  trasa: Trasa;
  znaczniki: readonly Znacznik[];
  decydent: boolean;
};

function spelniaRegule(odpowiedzi: OdpowiedziWybrane, regula: Regula): boolean {
  return regula.warunki.every((warunek) => {
    const wybrane = odpowiedzi[warunek.pytanie]?.ids ?? [];
    return wybrane.some((id) => warunek.odpowiedzi.includes(id));
  });
}

function trasaZPytaniaDroga(odpowiedzi: OdpowiedziWybrane): Extract<Trasa, "A" | "B" | "C"> {
  const wybrane = odpowiedzi[PYTANIE_DROGA]?.ids ?? [];
  const pytanie = PYTANIA.find((p) => p.id === PYTANIE_DROGA);
  const odpowiedz = pytanie?.odpowiedzi.find((o) => wybrane.includes(o.id));
  // Bez odpowiedzi (nie powinno się zdarzyć po walidacji) wybieramy najszerszą drogę A.
  return odpowiedz?.droga ?? "A";
}

/**
 * Kolejność: najpierw odsiew, potem duża firma, potem droga z odpowiedzi „Gdzie dziś jesteś?”.
 * Odsiew idzie pierwszy, bo kalendarz Bartka ma chronić czas przed firmami spoza persony.
 */
export function zdecyduj(odpowiedzi: OdpowiedziWybrane): Decyzja {
  const decydent = spelniaRegule(odpowiedzi, REGULA_DECYDENTA);

  if (REGULY_ODSIEWU.some((regula) => spelniaRegule(odpowiedzi, regula))) {
    return { trasa: "odsiew", znaczniki: [], decydent };
  }

  const trasa: Trasa = REGULY_DUZEJ_FIRMY.some((regula) => spelniaRegule(odpowiedzi, regula))
    ? "duza_firma"
    : trasaZPytaniaDroga(odpowiedzi);

  const znaczniki = REGULY_ZNACZNIKOW.filter(({ reguly }) =>
    reguly.some((regula) => {
      const drogaPasuje = regula.drogi === undefined || regula.drogi.includes(trasa);
      return drogaPasuje && spelniaRegule(odpowiedzi, regula);
    }),
  ).map(({ znacznik }) => znacznik);

  return { trasa, znaczniki, decydent };
}

export function znajdzPytanie(id: string): PytanieKonfig | undefined {
  return PYTANIA.find((pytanie) => pytanie.id === id);
}
