// Zakładki przykładów na kartach 2 działów. Etykiety i plakietki są z pliku tekstów v4 (sekcja 4).
// Dane (źródło i wynik) przeniesione z public/szkice/s4/index.html (.demo .src i .out-t); dwa zestawy dopisane
// w tym samym formacie (Telefony „Umówienie wizyty”, Marketing „Stary wpis do odświeżenia”). Firmy mają opisowe,
// wymyślone nazwy („Skup złomu spod Radomia”), nie marki: nazwy ze szkicu (np. Logipak, Termo-Bud) mogły należeć do
// prawdziwych firm (przegląd 12.11). Wycinki z rynku są podpisane jako przykładowe. Kwot nie ma (jedyna kwota na stronie
// to cena Mapy AI firmy), stąd faktura i rejestr firm bez liczb w zł.

export type DzialId = "telefony" | "marketing" | "sprzedaz" | "zamowienia" | "logistyka";

export type PrzykladDane = {
  wyglad: "dokument" | "sms" | "mail" | "rozmowa" | "wycinek";
  // Linie „Etykieta: treść” renderują się z etykietą (mówca w rozmowie, pole w dokumencie).
  // Zaznaczenie i zapala się razem z wierszem wyniku i, więc kolejność zaznaczeń idzie za kolejnością wierszy.
  zrodlo: { naglowek: string | null; linie: readonly string[]; zaznaczenia: readonly string[] };
  wynik: { podpis: string; wiersze: readonly (readonly [string, string])[] };
};

export type ZakladkaPrzykladu = {
  etykieta: string;
  // Krótsza etykieta na 390 px; null = ta sama co etykieta.
  etykietaKrotka: string | null;
  plakietka: string;
  dane: PrzykladDane;
};

type TrzyZakladki = readonly [ZakladkaPrzykladu, ZakladkaPrzykladu, ZakladkaPrzykladu];

function zakladka(etykieta: string, etykietaKrotka: string | null, plakietka: string, dane: PrzykladDane): ZakladkaPrzykladu {
  return { etykieta, etykietaKrotka, plakietka, dane };
}

const PLAKIETKA_WIZYTY = "Zbudowany dla poradni medycznej, oddany 21.09.2026";
const PLAKIETKA_SKLEPY = "Działa w dwóch sklepach, w pierwszym od grudnia 2025";
const PLAKIETKA_NDA = "Działa codziennie u klienta pod NDA od 12.10.2026";
const PLAKIETKA_NAPOJE = "Uruchomiony u dystrybutora napojów 15.10.2026";
const PLAKIETKA_MECHANIZM = "Ten sam mechanizm, przykład możliwości";

const ZGLOSZENIE = "Zgłoszenie dla zespołu";
const PLAN = "Plan do zatwierdzenia";
const KARTA_FIRMY = "Karta firmy dla handlowca";
const IMPORT = "Zamówienie gotowe do importu";

const TELEFONY: TrzyZakladki = [
  zakladka("Umówienie wizyty", null, PLAKIETKA_WIZYTY, {
    wyglad: "rozmowa",
    zrodlo: {
      naglowek: "Rozmowa po godzinach, 18:42",
      linie: [
        "Agent: Dzień dobry, w czym mogę pomóc?",
        "Klient: Mówi Anna Kowalczyk. Chcę umówić pierwszą wizytę u dermatologa.",
        "Agent: Mam wolny wtorek o 9:30. Zapisać?",
        "Klient: Tak, poproszę.",
      ],
      zaznaczenia: ["Anna Kowalczyk", "pierwszą wizytę u dermatologa", "wtorek o 9:30"],
    },
    wynik: {
      podpis: ZGLOSZENIE,
      wiersze: [
        ["Dzwoni", "Anna Kowalczyk"],
        ["Sprawa", "Pierwsza wizyta, dermatolog"],
        ["Termin", "Wtorek, 9:30, wpisany do kalendarza"],
        ["Zrobione", "Potwierdzenie wysłane SMS-em"],
      ],
    },
  }),
  zakladka("Przełożenie wizyty", null, PLAKIETKA_WIZYTY, {
    wyglad: "rozmowa",
    zrodlo: {
      naglowek: null,
      linie: [
        "Agent: Dzień dobry, w czym mogę pomóc?",
        "Klient: Chcę przełożyć wizytę z czwartku. Mówi Jan Wiśniewski.",
        "Agent: Mam wolny poniedziałek o 10:00. Pasuje?",
      ],
      zaznaczenia: ["Jan Wiśniewski", "przełożyć wizytę", "poniedziałek o 10:00"],
    },
    wynik: {
      podpis: ZGLOSZENIE,
      wiersze: [
        ["Dzwoni", "Jan Wiśniewski"],
        ["Sprawa", "Przełożenie wizyty"],
        ["Nowy termin", "Poniedziałek, 10:00"],
        ["Do kogo", "Recepcja, mail z prośbą o zmianę"],
      ],
    },
  }),
  zakladka("Status zamówienia", null, "W budowie dla sklepu internetowego", {
    wyglad: "rozmowa",
    zrodlo: {
      naglowek: null,
      linie: [
        "Klient: Mówi Ewa Lis. Kiedy przyjdzie zamówienie 5120?",
        "Agent: Wyjechało dziś rano, kurier będzie jutro do 14:00. Wysłać numer przesyłki SMS?",
        "Klient: Tak, poproszę.",
      ],
      zaznaczenia: ["Ewa Lis", "zamówienie 5120", "jutro do 14:00"],
    },
    wynik: {
      podpis: ZGLOSZENIE,
      wiersze: [
        ["Dzwoni", "Ewa Lis"],
        ["Sprawa", "Status zamówienia 5120"],
        ["Odpowiedź", "Dostawa jutro do 14:00"],
        ["Zrobione", "Numer przesyłki wysłany SMS"],
      ],
    },
  }),
];

const MARKETING: TrzyZakladki = [
  zakladka("Pytanie klienta", "Pytanie", PLAKIETKA_SKLEPY, {
    wyglad: "mail",
    zrodlo: {
      naglowek: null,
      linie: ["Od: klient sklepu", "Czy lampy biurowe można podłączyć do czujnika ruchu? Ile to oszczędza w miesiącu?"],
      zaznaczenia: ["lampy biurowe można podłączyć do czujnika ruchu", "Ile to oszczędza"],
    },
    wynik: {
      podpis: PLAN,
      wiersze: [
        ["Wpis na bloga", "Czujnik ruchu w biurze: jak podłączyć"],
        ["Film, 30 s", "Ile oszczędza czujnik w miesiącu"],
        ["Publikacja", "Czwartek, po zatwierdzeniu"],
      ],
    },
  }),
  zakladka("Nowy produkt", "Produkt", PLAKIETKA_SKLEPY, {
    wyglad: "dokument",
    zrodlo: {
      naglowek: "Nowy produkt w sklepie",
      linie: ["Nazwa: Panel LED 60×60, 36 W", "Kategoria: Oświetlenie biurowe", "Cecha: Barwa neutralna 4000 K"],
      zaznaczenia: ["Panel LED 60×60, 36 W", "Oświetlenie biurowe", "Barwa neutralna 4000 K"],
    },
    wynik: {
      podpis: PLAN,
      wiersze: [
        ["Opis produktu", "Panel LED 60×60, 36 W"],
        ["Ranking", "Dopisany do „Oświetlenie biurowe”"],
        ["Film, 30 s", "Barwa 4000 K w biurze"],
      ],
    },
  }),
  zakladka("Stary wpis do odświeżenia", "Odświeżenie", PLAKIETKA_SKLEPY, {
    wyglad: "dokument",
    zrodlo: {
      naglowek: "Wpis na blogu sklepu",
      linie: [
        "Tytuł: Jak dobrać żarówki LED do salonu",
        "Ostatnia zmiana: marzec 2024",
        "W tekście: modele, których nie ma już w ofercie",
        "Z Google: coraz mniej wejść od pół roku",
      ],
      zaznaczenia: ["Jak dobrać żarówki LED do salonu", "modele, których nie ma już w ofercie", "coraz mniej wejść"],
    },
    wynik: {
      podpis: PLAN,
      wiersze: [
        ["Wpis do odświeżenia", "Jak dobrać żarówki LED do salonu"],
        ["Zmiana", "Modele z aktualnego katalogu sklepu"],
        ["Powód", "Temat nadal szukany, wpis traci wejścia"],
        ["Publikacja", "Po zatwierdzeniu, z nową datą"],
      ],
    },
  }),
];

const SPRZEDAZ: TrzyZakladki = [
  zakladka("Wiadomość z rynku", null, PLAKIETKA_NDA, {
    wyglad: "wycinek",
    zrodlo: {
      naglowek: "Przykładowa wiadomość z portalu regionalnego",
      linie: [
        "Stolarnia spod Ostrowa buduje nową halę produkcyjną, start w marcu 2027",
        "Firma zatrudni 40 osób i planuje zakup nowej linii jeszcze w tym roku.",
      ],
      zaznaczenia: ["Stolarnia spod Ostrowa", "buduje nową halę produkcyjną", "zakup nowej linii"],
    },
    wynik: {
      podpis: KARTA_FIRMY,
      wiersze: [
        ["Firma", "Stolarnia spod Ostrowa"],
        ["Sygnał", "Nowa hala produkcyjna"],
        ["Ocena", "9/10"],
        ["Następny krok", "Telefon do właściciela w tym tygodniu"],
      ],
    },
  }),
  zakladka("Rejestr firm", null, PLAKIETKA_NDA, {
    wyglad: "wycinek",
    zrodlo: {
      naglowek: "Przykładowy wpis w rejestrze firm",
      linie: ["Firma instalacyjna z Lublina", "Podwyższenie kapitału zakładowego, nowy wspólnik."],
      zaznaczenia: ["Firma instalacyjna z Lublina", "Podwyższenie kapitału zakładowego", "nowy wspólnik"],
    },
    wynik: {
      podpis: KARTA_FIRMY,
      wiersze: [
        ["Firma", "Firma instalacyjna z Lublina"],
        ["Sygnał", "Wyższy kapitał, nowy wspólnik"],
        ["Ocena", "7/10"],
        ["Następny krok", "Mail z krótką ofertą"],
      ],
    },
  }),
  zakladka("Ogłoszenie o pracę", null, PLAKIETKA_NDA, {
    wyglad: "wycinek",
    zrodlo: {
      naglowek: "Przykładowe ogłoszenie o pracę",
      linie: ["Magazyn pod Łodzią szuka 12 magazynierów", "Praca od grudnia na nowej zmianie nocnej w drugim magazynie."],
      zaznaczenia: ["Magazyn pod Łodzią", "nowej zmianie nocnej", "drugim magazynie"],
    },
    wynik: {
      podpis: KARTA_FIRMY,
      wiersze: [
        ["Firma", "Magazyn pod Łodzią"],
        ["Sygnał", "Nowa zmiana, drugi magazyn"],
        ["Ocena", "6/10"],
        ["Następny krok", "Obserwować, wrócić w grudniu"],
      ],
    },
  }),
];

const ZAMOWIENIA: TrzyZakladki = [
  zakladka("SMS", null, PLAKIETKA_NAPOJE, {
    wyglad: "sms",
    zrodlo: {
      naglowek: "SMS od +48 600 *** 214",
      linie: [
        "Dzień dobry, na czwartek proszę 12 kartonów soku jabłkowego 1 l i 5 zgrzewek wody gazowanej 0,5. Sklep przy Długiej, Marek",
      ],
      zaznaczenia: ["Sklep przy Długiej", "12 kartonów soku jabłkowego 1 l", "5 zgrzewek wody gazowanej 0,5", "czwartek"],
    },
    wynik: {
      podpis: IMPORT,
      wiersze: [
        ["Klient", "Sklep przy Długiej"],
        ["Pozycja 1", "Sok jabłkowy 1 l, 12 kart."],
        ["Pozycja 2", "Woda gazowana 0,5 l, 5 zgrz."],
        ["Dostawa", "czwartek"],
      ],
    },
  }),
  zakladka("Mail", null, PLAKIETKA_NAPOJE, {
    wyglad: "mail",
    zrodlo: {
      naglowek: null,
      linie: [
        "Od: Delikatesy na Osiedlu",
        "Temat: Zamówienie tygodniowe",
        "Proszę o 40 szt. kawy ziarnistej 1 kg i 24 szt. herbaty czarnej. Dostawa do piątku, faktura na firmę jak zawsze.",
      ],
      zaznaczenia: ["Delikatesy na Osiedlu", "40 szt. kawy ziarnistej 1 kg", "24 szt. herbaty czarnej", "do piątku"],
    },
    wynik: {
      podpis: IMPORT,
      wiersze: [
        ["Klient", "Delikatesy na Osiedlu"],
        ["Pozycja 1", "Kawa ziarnista 1 kg, 40 szt."],
        ["Pozycja 2", "Herbata czarna, 24 szt."],
        ["Dostawa", "do piątku"],
        ["Faktura", "dane z kartoteki klienta"],
      ],
    },
  }),
  zakladka("PDF", null, "Zbudowany dla hurtowni blach, przekazany 04.09.2026", {
    wyglad: "dokument",
    zrodlo: {
      naglowek: "Zamówienie od klienta (PDF)",
      linie: [
        "Numer: 2026/311",
        "Zamawiający: Warsztat ślusarski spod Kielc",
        "Blacha ocynkowana 1,0 mm, 1250×2500: 20 ark.",
        "Blacha nierdzewna 2,0 mm, 1000×2000: 6 ark.",
        "Cięcie na wymiar: 400×600 mm",
        "Dostawa: 20.11.2026",
      ],
      zaznaczenia: ["2026/311", "Warsztat ślusarski spod Kielc", "Blacha ocynkowana 1,0 mm", "20.11.2026"],
    },
    wynik: {
      podpis: IMPORT,
      wiersze: [
        ["Numer", "2026/311"],
        ["Klient", "Warsztat ślusarski spod Kielc"],
        ["Pozycje", "2 rodzaje blachy, 26 arkuszy, cięcie 400×600 mm"],
        ["Dostawa", "20.11.2026"],
      ],
    },
  }),
];

const LOGISTYKA: TrzyZakladki = [
  zakladka("Dokument przyjęcia", "PZ", "Działa u klienta od kwietnia 2026", {
    wyglad: "dokument",
    zrodlo: {
      naglowek: "Dokument przyjęcia PZ",
      linie: [
        "Nr: PZ/0412/10/26",
        "Data: 14.10.2026",
        "Dostawca: Skup złomu spod Radomia",
        "Kabel miedziany kat. 2: 1 284 kg",
        "Aluminium, profile: 362 kg",
        "Przyjął: A. Nowak",
      ],
      zaznaczenia: ["PZ/0412/10/26", "14.10.2026", "Skup złomu spod Radomia", "Kabel miedziany kat. 2", "A. Nowak"],
    },
    wynik: {
      podpis: "Wiersz w arkuszu handlowca",
      wiersze: [
        ["Numer", "PZ/0412/10/26"],
        ["Data przyjęcia", "14.10.2026"],
        ["Dostawca", "Skup złomu spod Radomia"],
        ["Materiał", "2 pozycje, 1 646 kg"],
        ["Handlowiec", "A. Nowak"],
      ],
    },
  }),
  zakladka("Faktura", "Faktura", PLAKIETKA_MECHANIZM, {
    wyglad: "dokument",
    zrodlo: {
      naglowek: "Faktura VAT",
      linie: [
        "Nr: FV/2026/10/118",
        "Sprzedawca: Hurtownia budowlana spod Płocka",
        "Pozycje: cement, klej, siatka",
        "Termin płatności: 23.10.2026",
      ],
      zaznaczenia: ["FV/2026/10/118", "Hurtownia budowlana spod Płocka", "cement, klej, siatka", "23.10.2026"],
    },
    wynik: {
      podpis: "Wiersz w rejestrze kosztów",
      wiersze: [
        ["Numer", "FV/2026/10/118"],
        ["Sprzedawca", "Hurtownia budowlana spod Płocka"],
        ["Pozycje", "3, materiały budowlane"],
        ["Termin płatności", "23.10.2026"],
      ],
    },
  }),
  zakladka("Zlecenie transportowe", "Zlecenie", PLAKIETKA_MECHANIZM, {
    wyglad: "dokument",
    zrodlo: {
      naglowek: "Zlecenie transportowe",
      linie: [
        "Nr: ZT/77/10/26",
        "Trasa: Poznań → Ostrava (CZ)",
        "Załadunek: 21.10.2026, 7:00",
        "Ładunek: 18,4 t, 33 palety",
        "Nr rejestracyjny: nie wpisano",
      ],
      zaznaczenia: ["ZT/77/10/26", "Poznań → Ostrava", "21.10.2026, 7:00", "18,4 t, 33 palety"],
    },
    wynik: {
      podpis: "Wiersz w planie transportów",
      wiersze: [
        ["Numer", "ZT/77/10/26"],
        ["Trasa", "Poznań → Ostrava"],
        ["Załadunek", "21.10.2026, 7:00"],
        ["Ładunek", "18,4 t, 33 palety"],
        ["Nr rejestracyjny", "Brak w dokumencie. System nie zgaduje, tylko wysyła mail z prośbą o uzupełnienie."],
      ],
    },
  }),
];

export const PRZYKLADY: Readonly<Record<DzialId, TrzyZakladki>> = {
  telefony: TELEFONY,
  marketing: MARKETING,
  sprzedaz: SPRZEDAZ,
  zamowienia: ZAMOWIENIA,
  logistyka: LOGISTYKA,
};
