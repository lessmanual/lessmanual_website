// Formularz kwalifikujący: JEDYNY plik konfiguracyjny (pytania, odpowiedzi, kwestie Bzyka,
// ekrany dróg, reguły odsiewu i kierowania). Źródło tekstów:
// materialy/cso/strona-2026-11-10/FORMULARZ.md (szkic CSO z 10.11.2026).
// Podmiana pytań albo reguł = edycja tylko tego pliku: komponent, walidacja po stronie serwera,
// zapis do CRM i mail czytają wszystko stąd. Identyfikatory odpowiedzi (slug ASCII) są kluczami
// w CRM (metadata), więc po wdrożeniu nie zmieniamy ich bez migracji danych.
// Poza FORMULARZ.md i TEKSTY v3 (sekcja 13) zostają tylko komunikaty techniczne (błędy pól, ładowanie).

export const WERSJA_FORMULARZA = "2026-11-11-zatwierdzony";

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
  /** Tylko pytanie o etap wdrażania AI (pyt. 6): do której drogi prowadzi odpowiedź. */
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
      {
        id: "szukanie_informacji",
        etykieta: "Szukanie informacji w mailach, plikach i programach",
        krotko: "szukanie informacji",
      },
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
      { id: "inne", etykieta: "Inne", pole: { etykieta: "Jakie?", wymagane: true } },
    ],
  },
  {
    id: "etap",
    typ: "single",
    // Klient widzi same odpowiedzi; droga A/B/C jest tylko w logice i w CRM (FORMULARZ.md v3).
    tekst: "Na jakim etapie jest wdrażanie AI w Twojej firmie?",
    bzyk: "Od tej odpowiedzi zależy, jaką rozmowę zaproponujemy na końcu.",
    odpowiedzi: [
      { id: "wiem_co_boli", etykieta: "Wiem, który proces chcę usprawnić jako pierwszy", droga: "A" },
      { id: "lista_pomyslow", etykieta: "Mam listę pomysłów albo własny plan wdrożenia", droga: "A" },
      { id: "juz_wdrozylismy", etykieta: "Już coś wdrożyliśmy i chcemy iść dalej", droga: "A" },
      { id: "nie_wiem_od_czego", etykieta: "Nie wiem, od czego zacząć", droga: "B" },
      { id: "najpierw_zobaczyc", etykieta: "Najpierw chcę zobaczyć, że to działa na moich danych", droga: "C" },
    ],
  },
  {
    id: "powod",
    typ: "single",
    tekst: "Co sprawia, że szukasz rozwiązania właśnie teraz?",
    bzyk: "Od tego zaczniemy rozmowę.",
    odpowiedzi: [
      { id: "konkurencja", etykieta: "Konkurencja już to robi", krotko: "konkurencja już to robi" },
      { id: "nie_nadazamy", etykieta: "Rośnie liczba spraw, a zespół nie nadąża", krotko: "zespół nie nadąża" },
      { id: "odchodza", etykieta: "Ludzie odchodzą i zabierają wiedzę ze sobą", krotko: "ludzie odchodzą z wiedzą" },
      { id: "pilnuje_osobiscie", etykieta: "Za dużo spraw muszę pilnować osobiście", krotko: "za dużo spraw pilnuje osobiście" },
      { id: "zobaczylem_efekt", etykieta: "Widzę efekty AI w innej firmie", krotko: "widzi efekty AI w innej firmie" },
      { id: "sprawdzic_co_da_ai", etykieta: "Chcę sprawdzić, co AI da mojej firmie", krotko: "chce sprawdzić, co da AI" },
      { id: "inny", etykieta: "Inny powód", pole: { etykieta: "Jaki to powód?", wymagane: true } },
    ],
  },
  {
    id: "budzet",
    typ: "single",
    tekst: "Jaki budżet netto planujesz na pierwszy system?",
    bzyk: "Pytam, żeby zaproponować pierwszy krok w Twoim budżecie.",
    odpowiedzi: [
      { id: "do_5k", etykieta: "Do 5 tys. zł netto", krotko: "do 5 tys. zł" },
      { id: "5_15k", etykieta: "5-15 tys. zł netto", krotko: "5-15 tys. zł" },
      { id: "15_25k", etykieta: "15-25 tys. zł netto", krotko: "15-25 tys. zł" },
      { id: "25_50k", etykieta: "25-50 tys. zł netto", krotko: "25-50 tys. zł" },
      { id: "ponad_50k", etykieta: "Ponad 50 tys. zł netto", krotko: "ponad 50 tys. zł" },
      { id: "nie_wiem", etykieta: "Jeszcze nie wiem", krotko: "budżet nieznany" },
    ],
  },
  {
    id: "termin",
    typ: "single",
    tekst: "Kiedy chcesz zacząć prace nad pierwszym systemem?",
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
      { id: "social", etykieta: "Facebook, Instagram albo YouTube" },
      { id: "mail_bartek", etykieta: "Mail albo wiadomość od Bartka" },
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
  // Treści zgód i klauzul: materialy/cto/strona-2026-11-11/prawne/treść-zgód.md § 1-3.
  zgoda:
    "Zgadzam się na kontakt e-mailowy i telefoniczny od LessManual w sprawie mojego zgłoszenia, w tym na przesłanie zakresu i wyceny.",
  zgodaLink: "Polityka prywatności",
  klauzula:
    "Administratorem danych jest Bartłomiej Chudzik, LessManual, ul. Długa 33, 05-530 Cendrowice. Dane z formularza wykorzystamy, żeby odpowiedzieć na zgłoszenie, dobrać rodzaj rozmowy i ją umówić (art. 6 ust. 1 lit. b i f RODO). Rodzaj rozmowy dobierają automatycznie Twoje odpowiedzi, a każde zgłoszenie czyta człowiek. Przed rozmową zgłoszenie analizują też nasze narzędzia AI oparte na modelu Claude (Anthropic). Dane przekazujemy naszym dostawcom, w tym Vercel, Supabase, Resend, Google, Cal.com i Anthropic, także w USA. Masz prawo do dostępu, poprawienia i usunięcia danych, sprzeciwu oraz skargi do Prezesa UODO. Więcej w",
} as const;

/** Wersja treści zgód zapisywana w CRM przy każdej zgodzie (treść-zgód.md, początek). */
export const WERSJA_ZGOD = "2026-11-11";

/** Opcjonalna zgoda marketingowa: niezaznaczona, nie blokuje wysłania (treść-zgód.md, zasada 2). */
export const ZGODA_MARKETING =
  "Chcę dostawać e-mailem informacje o nowych systemach i przykładach wdrożeń LessManual. Mogę zrezygnować w każdej chwili.";

export type RodzajZgody = "kontakt_zgloszenie" | "przyklady_jednorazowo" | "marketing_email";

export type EkranDrogi = {
  bzyk: string;
  tytul: string;
  tekst: string;
};

export const KALENDARZ_BAZA = "https://cal.com/bart%C5%82omiej-chudzik-2en6pt";

/**
 * Jedyne miejsce ze slugami typów spotkań Cal.com (6 typów, wszystkie dają 200, stan 11.11).
 * Zgłoszenia ze znacznikiem `priorytet` („W tym miesiącu” i budżet od 15 tys. zł) dostają ukryty
 * typ priorytetowy na każdej drodze (FORMULARZ.md linia 167): termin od 1 dnia, okno 3 dni robocze.
 */
export const SLUGI_KALENDARZA = {
  rozmowa45: "45min",
  priorytet45: "45min-priorytet",
  mapaAi30: "mapa-ai-30min",
  mapaAi30Priorytet: "mapa-ai-30min-priorytet",
  pilot30: "pilot-30min",
  pilot30Priorytet: "pilot-30min-priorytet",
} as const;

/** Czysta reguła wyboru typu spotkania: droga plus znaczniki z `zdecyduj`. */
export function slugKalendarza(trasa: TrasaZKalendarzem, znaczniki: readonly Znacznik[]): string {
  switch (trasa) {
    case "A":
    case "duza_firma":
      return znaczniki.includes("priorytet") ? SLUGI_KALENDARZA.priorytet45 : SLUGI_KALENDARZA.rozmowa45;
    // FORMULARZ.md linia 167: „W tym miesiącu” + budżet od 15 tys. daje termin w 3 dni robocze na każdej drodze.
    case "B":
      return znaczniki.includes("priorytet") ? SLUGI_KALENDARZA.mapaAi30Priorytet : SLUGI_KALENDARZA.mapaAi30;
    case "C":
      return znaczniki.includes("priorytet") ? SLUGI_KALENDARZA.pilot30Priorytet : SLUGI_KALENDARZA.pilot30;
  }
}

export const DROGI: Readonly<Record<TrasaZKalendarzem, EkranDrogi>> = {
  A: {
    bzyk: "Wybierz termin rozmowy z Bartkiem, potrwa 45 minut.",
    tytul: "Rozmowa z Bartkiem, 45 minut",
    tekst:
      "Na rozmowie przejdziemy przez to, co boli najbardziej. Potem dostaniesz spisany zakres: etapy z ceną i efekt, który ma dawać system.",
  },
  B: {
    bzyk: "Wybierz termin rozmowy o Mapie AI firmy, potrwa 30 minut.",
    tytul: "Rozmowa o Mapie AI firmy, 30 minut",
    tekst:
      "Mapa AI firmy to pełny obraz Twojej firmy i plan systemów na kwartał i rok. Cena: 6 900 zł netto, w całości odliczana od pierwszego wdrożenia.",
  },
  C: {
    bzyk: "Wybierz termin rozmowy o pilocie, potrwa 30 minut.",
    tytul: "Rozmowa o pilocie, 30 minut",
    tekst:
      "W szybkim pilocie przez dwa tygodnie budujemy jeden proces na próbce Twoich danych i uruchamiamy go na naszej infrastrukturze. Szczegóły i koszt omówimy na rozmowie.",
  },
  duza_firma: {
    bzyk: "Wybierz termin pierwszej rozmowy z Bartkiem, potrwa 45 minut.",
    tytul: "Rozmowa z Bartkiem, 45 minut",
    // FORMULARZ.md: kalendarz „jak droga A”, więc ten sam tekst co przy drodze A.
    tekst:
      "Na rozmowie przejdziemy przez to, co boli najbardziej. Potem dostaniesz spisany zakres: etapy z ceną i efekt, który ma dawać system.",
  },
};

export const NIE_TERAZ = {
  bzyk: "Na dziś nie możemy Ci pomóc i wolimy to powiedzieć od razu.",
  naglowek: "Nie teraz",
  tekst:
    "Nasze projekty zwykle zaczynają się od kilkunastu tysięcy zł netto. Zostaw maila, a wyślemy Ci krótkie filmiki z przykładami systemów.",
  poleEmail: "E-mail",
  zgoda: "Proszę o jednorazowe wysłanie przykładów systemów LessManual na ten adres e-mail.",
  pomylka: "Uważasz, że to pomyłka? Napisz na kontakt@lessmanual.ai, a przeczytamy Twoje odpowiedzi.",
  klauzula:
    "Administratorem danych jest Bartłomiej Chudzik, LessManual, ul. Długa 33, 05-530 Cendrowice. Adres e-mail i Twoje odpowiedzi wykorzystamy, żeby raz wysłać przykłady (art. 6 ust. 1 lit. b RODO). Przechowujemy je najdłużej 12 miesięcy. Masz prawo do dostępu, poprawienia i usunięcia danych, sprzeciwu oraz skargi do Prezesa UODO. Więcej w",
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

/** Ekran przed załadowaniem ramki Cal.com (treść-zgód.md § 3). */
export const KALENDARZ_ZGODA = {
  informacja:
    "Kalendarz wyświetla firma Cal.com, Inc. z USA. Po kliknięciu przekażemy jej Twoje imię, e-mail i nazwę firmy, żeby nie trzeba było ich wpisywać drugi raz. Cal.com zapisze też własne cookies, w tym statystyki Google Analytics.",
  przycisk: "Pokaż kalendarz",
  bezKalendarza: "Wolisz bez kalendarza? Napisz na kontakt@lessmanual.ai i podaj dwa, trzy dogodne terminy.",
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
          { pytanie: "budzet", odpowiedzi: ["15_25k", "25_50k", "ponad_50k"] },
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
 * Kolejność: najpierw odsiew, potem duża firma, potem droga z odpowiedzi na pytanie 6 (etap wdrażania AI).
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
