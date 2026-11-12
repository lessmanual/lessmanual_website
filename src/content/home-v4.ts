// Jedyne źródło tekstów strony głównej v4. Teksty 1:1 z docs/superpowers/specs/2026-11-12-strona-v4-teksty.md
// (sekcje 1-11). Komponenty nie mają wpisanego tekstu; zmiana tekstu: najpierw ten plik, potem kod.
// Pilnuje tego home-v4.test.ts (porównuje moduł z plikiem tekstów).
import { PRZYKLADY, type DzialId, type ZakladkaPrzykladu } from "./home-v4-przyklady";

export type { DzialId } from "./home-v4-przyklady";

export const DZIALY: readonly DzialId[] = ["telefony", "marketing", "sprzedaz", "zamowienia", "logistyka"];

export type NrKarty = 0 | 1 | 2 | 3;

export type Film = { src: string; poster: string; napisy: string | null };

export type Wyroznienie =
  | { rodzaj: "liczba"; tekst: string } // podciąg `efekt`, miedź
  | { rodzaj: "wiersz"; tekst: string; ikona: "sluchawka" }; // Telefony: bez liczby (decyzja Bartka 12.11)

export type Opinia =
  | { zrodlo: "google"; tekst: string; podpis: string }
  | { zrodlo: "referencja"; tekst: string; podpis: string }
  | { zrodlo: "linkedin"; oryginal: string; tlumaczenie: string; podpis: string };

export type KartaFilm = {
  rodzaj: "film";
  tytul: string;
  plakietka: string;
  problem: string;
  rozwiazanie: string;
  efekt: string;
  wyroznienie: Wyroznienie;
  film: Film | null;
};

export type KartaPrzyklad = {
  rodzaj: "przyklad";
  tytul: string;
  opis: string;
  zakladki: readonly [ZakladkaPrzykladu, ZakladkaPrzykladu, ZakladkaPrzykladu];
  plakietkaWspolna: string;
  // Zdanie z liczbą pod przykładem (Sprzedaż, Logistyka); null, gdy dział go nie ma.
  drugiDowod: string | null;
};

export type KartaOpinia = { rodzaj: "opinia"; opinia: Opinia };

// Nagłówek, plakietka, linia i dymek karty 4 są wspólne i leżą w HOME_V4.dzialy.
export type KartaPomysly = { rodzaj: "pomysly"; pomysly: readonly string[] };

export type Karta = KartaFilm | KartaPrzyklad | KartaOpinia | KartaPomysly;

export type Dzial = {
  id: DzialId;
  nazwa: string;
  zakladka: string;
  bzyk: string;
  karty: readonly [KartaFilm, KartaPrzyklad, KartaOpinia, KartaPomysly];
};

export type KrokOsi = { nr: 0 | 1 | 2 | 3 | 4 | 5; naglowek: string; my: string; ty: string };

export function bzykPoWyborze(nazwaDzialu: string): string {
  return `Zaznaczone: ${nazwaDzialu}. Kliknij „Pokaż”, a przeniosę Cię do kart tego działu.`;
}

// Etykieta dostępności karuzeli; kod podstawia numer karty.
export function etykietaKarty(nr: number): string {
  return `${nr} z 4`;
}

export function inicjal(podpis: string): string {
  return podpis.trim().charAt(0).toLocaleUpperCase("pl-PL");
}

const NAZWY = {
  telefony: "Telefony i recepcja",
  marketing: "Marketing",
  sprzedaz: "Sprzedaż",
  zamowienia: "Zamówienia i operacje",
  logistyka: "Logistyka i dokumenty",
} as const;

const NAV = {
  pozycje: [
    { label: "Działy", href: "/#dzialy" },
    { label: "Współpraca", href: "/#wspolpraca" },
    { label: "Opinie", href: "/#opinie" },
    { label: "Pytania", href: "/#pytania" },
    { label: "Blog", href: "/blog" },
  ],
  przycisk: "Umów rozmowę",
} as const satisfies { pozycje: readonly { label: string; href: string }[]; przycisk: string };

const HERO = {
  nadtytul: "Dla właścicieli firm, którzy wszystkiego pilnują sami",
  h1: "Mniej ręcznej pracy, więcej kontroli nad firmą.",
  podtytul:
    "Budujemy systemy AI szyte na miarę Twojej firmy, jeden po drugim, i sami ich pilnujemy, więc nie spada to na Ciebie. Efekt zapisujemy liczbą.",
  pytanieBzyka: "Gdzie u Ciebie ucieka najwięcej czasu?",
  klawisze: [NAZWY.telefony, NAZWY.marketing, NAZWY.sprzedaz, NAZWY.zamowienia, NAZWY.logistyka],
  przyciskPokaz: "Pokaż",
  bzykPrzedWyborem: "Zaznacz dział, a niżej pokażę systemy, które w nim zbudowaliśmy.",
  przyciskGlowny: "Umów rozmowę z Bartkiem",
  liniaPodPrzyciskiem: "Rozmowa bez opłat. Po niej dostajesz na piśmie pierwszy krok z ceną.",
  cytat: {
    tekst: "To, co wcześniej zajmowało nam długie godziny, teraz trwa dosłownie chwilę.",
    // `podpis` to pełna linia z deka (pilnuje jej home-v4.test.ts); komponent renderuje z pól niżej.
    podpis: "Marcin Pietrasik · opinia w Google · ★★★★★",
    autor: "Marcin Pietrasik",
    zrodlo: "opinia w Google",
    ocena: 5,
    etykietaOceny: "Ocena 5 z 5",
  },
  paskLiczb: "24+ firm · 31 wdrożeń · 5,0 w Google (6 opinii)",
  // Miejsce na rolkę Bartka; null = bez miniatury.
  rolka: null,
} as const;

const PRZEJSCIE = {
  zdanie:
    "Dziś ktoś przepisuje zamówienia i dokumenty, a Ty pilnujesz, czy nic nie umknęło. Tę pracę przejmują nasze systemy.",
} as const;

const DZIALY_WSPOLNE = {
  h2: "Systemy, które już zbudowaliśmy, dział po dziale",
  lead: "Każdy z tych systemów zbudowaliśmy pod programy i sposób pracy jednej firmy. Niżej są przykłady z wdrożeń i pomysły na podobne systemy u Ciebie.",
  bzykWejscie: "Każdy dział ma cztery karty. Przesuń je w bok albo kliknij strzałkę.",
  etykiety: ["Problem", "Rozwiązanie", "Efekt"],
  takToUNas: "Tak, to u nas",
  naglowekPomyslow: "Co możemy zbudować u Ciebie",
  plakietkaPomyslow: "Możliwe u Ciebie",
  bzykPomyslow: "Jeśli coś tu pasuje do Twojej firmy, kliknij „Tak, to u nas”. Zaznaczę to w formularzu.",
  liniaPomyslow: "System budujemy pod programy, na których pracujesz. Na rozmowie sprawdzamy, od którego zacząć.",
  // Etykiety tylko dla czytników ekranu (przyciski bez tekstu na ekranie); nie ma ich w deku, bo nie są widoczne.
  dostepnosc: {
    poprzedniaKarta: "Poprzednia karta",
    nastepnaKarta: "Następna karta",
    // Przycisk filmu na karcie 1; kod dopisuje „: <tytuł karty>”.
    odtworzFilm: "Odtwórz film",
  },
} as const;

const TELEFONY = {
  id: "telefony",
  nazwa: NAZWY.telefony,
  zakladka: "Telefony",
  bzyk: "Telefony i recepcja. Zacznij od filmu albo przesuń do przykładu rozmowy.",
  karty: [
    {
      rodzaj: "film",
      tytul: "Agent głosowy w recepcji",
      plakietka: "Zbudowany dla poradni medycznej, oddany we wrześniu 2026",
      problem:
        "Telefon dzwoni, gdy wszyscy są zajęci albo jest po godzinach. Klient, który się nie dodzwonił, często wybiera numer kolejnej firmy.",
      rozwiazanie:
        "Agent głosowy odbiera telefon i umawia wizytę od razu w Twoim programie. Sprawy, których nie załatwi, przekazuje mailem do zespołu.",
      efekt: "Telefon jest odebrany także po godzinach, a zespół dostaje zapisaną sprawę do załatwienia.",
      wyroznienie: { rodzaj: "wiersz", tekst: "Odbiera, umawia, przekazuje sprawę zespołowi", ikona: "sluchawka" },
      film: null,
    },
    {
      rodzaj: "przyklad",
      tytul: "Rozmowa zamienia się w zgłoszenie",
      opis: "Wybierz rozmowę i zobacz, co agent zapisał dla zespołu.",
      zakladki: PRZYKLADY.telefony,
      plakietkaWspolna: "Rozmowy w przykładzie są wymyślone",
      drugiDowod: null,
    },
    {
      rodzaj: "opinia",
      opinia: {
        zrodlo: "referencja",
        tekst:
          "Asystentka odbiera telefon, odpowiada na pytania pacjentów i umawia wizyty od razu w Medfile, a prośby o odwołanie lub przełożenie wizyty przekazuje mailem do recepcji. (…) Zawsze jasno mówił, co da się zrobić w obecnym systemie, a co wymaga dodatkowej integracji, i to bardzo ułatwiało nam decyzje.",
        podpis: "Bartosz Łaskawiec, CEO Eighteen Studio · referencja",
      },
    },
    {
      rodzaj: "pomysly",
      pomysly: [
        "oddzwonienie do klienta, który rozłączył się przed odebraniem",
        "zamówienie przyjęte przez telefon prosto do programu sprzedaży",
        "przypomnienie o wizycie dzień wcześniej, SMS-em albo telefonem",
        "rozmowa po angielsku albo niemiecku z klientem z zagranicy",
        "podsumowanie dnia z listą rozmów i spraw do załatwienia",
      ],
    },
  ],
} as const satisfies Dzial;

const MARKETING = {
  id: "marketing",
  nazwa: NAZWY.marketing,
  zakladka: "Marketing",
  bzyk: "Marketing. Przesuń w bok, żeby zobaczyć plan wpisów do zatwierdzenia.",
  karty: [
    {
      rodzaj: "film",
      tytul: "Treści sklepu pod Google",
      plakietka: "Działa w sklepie z oświetleniem LED od grudnia 2025",
      problem:
        "Poradniki i rankingi produktów ściągają klientów z Google, ale nikt w firmie nie ma czasu ich pisać i aktualizować.",
      rozwiazanie:
        "Agent AI pisze poradniki i rankingi na danych Twojego sklepu. Ty zatwierdzasz plan, a wpisy wychodzą według harmonogramu.",
      efekt: "2 906 kliknięć z Google z artykułów opublikowanych w 2026 roku (raport z 21.09.2026).",
      wyroznienie: { rodzaj: "liczba", tekst: "2 906" },
      film: null,
    },
    {
      rodzaj: "przyklad",
      tytul: "Plan wpisów do zatwierdzenia",
      opis: "Wybierz źródło tematu i zobacz plan, który dostajesz do akceptacji.",
      zakladki: PRZYKLADY.marketing,
      plakietkaWspolna: "Tematy w przykładzie są wymyślone",
      drugiDowod: null,
    },
    {
      rodzaj: "opinia",
      opinia: {
        zrodlo: "google",
        tekst:
          "Zleciliśmy im automatyzację procesów na naszych mediach społecznościowych i efekt przerósł oczekiwania. Wszystko zostało świetnie pospinane: publikacje, powiadomienia, przekazywanie zadań i szybkie reakcje na wiadomości działają praktycznie „same\".",
        podpis: "Marcin Pietrasik · Lokalny przewodnik · 129 opinii · opinia w Google",
      },
    },
    {
      rodzaj: "pomysly",
      pomysly: [
        "filmy do mediów społecznościowych z jednego nagrania właściciela",
        "opisy produktów pisane na danych z katalogu albo hurtowni",
        "newsletter z nowościami do zatwierdzenia jednym kliknięciem",
        "odpowiedzi na opinie w Google w tonie Twojej firmy",
        "raport co miesiąc o tym, które wpisy dały ruch i zapytania",
      ],
    },
  ],
} as const satisfies Dzial;

const SPRZEDAZ = {
  id: "sprzedaz",
  nazwa: NAZWY.sprzedaz,
  zakladka: "Sprzedaż",
  bzyk: "Sprzedaż. Przesuń w bok, żeby zobaczyć kartę firmy, którą dostaje handlowiec.",
  karty: [
    {
      rodzaj: "film",
      tytul: "Firmy z sygnałem zakupu",
      plakietka: "Działa codziennie od 12.10.2026",
      problem:
        "O inwestycji albo przetargu handlowcy dowiadują się za późno, bo informacja jest tylko na czyjejś stronie internetowej.",
      rozwiazanie:
        "Bot codziennie sprawdza rejestry i wiadomości o firmach z Twojego rynku. Handlowiec dostaje kartę firmy z oceną od 1 do 10 i powodem kontaktu.",
      efekt: "131 ze 134 sprawdzonych firm było trafnych, czyli 97,8%. Bot zebrał 403 leady (pomiar z 20.10.2026).",
      wyroznienie: { rodzaj: "liczba", tekst: "97,8%" },
      film: null,
    },
    {
      rodzaj: "przyklad",
      tytul: "Sygnał zakupu zamienia się w kartę firmy",
      opis: "Wybierz sygnał i zobacz ocenę firmy oraz następny krok.",
      zakladki: PRZYKLADY.sprzedaz,
      plakietkaWspolna: "Firmy w przykładzie są wymyślone",
      drugiDowod:
        "Podobny bot szuka przetargów i sygnałów zakupu dla zakładu recyklingu. W tygodniu 19-26.10.2026 znalazł 62 tematy.",
    },
    {
      rodzaj: "opinia",
      opinia: {
        zrodlo: "linkedin",
        oryginal:
          "Focus. Precision. Excellent time management, and AI agents' knowledge are what make Bartek an exceptional architect and engineer.",
        tlumaczenie:
          "Skupienie. Precyzja. Doskonałe zarządzanie czasem i wiedza o agentach AI sprawiają, że Bartek jest wyjątkowym architektem i inżynierem.",
        podpis: "Arek Skuza, CEO and boards advisor on AI Powered Growth · rekomendacja na LinkedIn",
      },
    },
    {
      rodzaj: "pomysly",
      pomysly: [
        "szkic oferty z zapytania klienta, liczony z Twojego cennika",
        "przypomnienie o kliencie, który od miesiąca nie zamawiał",
        "notatka ze spotkania wpisana do CRM bez przepisywania",
        "ocena zapytań ze strony z oznaczeniem pilnych",
        "odpowiedź na zapytanie z formularza w kilka minut, także w weekend",
      ],
    },
  ],
} as const satisfies Dzial;

const ZAMOWIENIA = {
  id: "zamowienia",
  nazwa: NAZWY.zamowienia,
  zakladka: "Zamówienia",
  bzyk: "Zamówienia i operacje. Przesuń w bok, żeby zobaczyć zamówienie złożone z SMS-a.",
  karty: [
    {
      rodzaj: "film",
      tytul: "Zamówienia z SMS-a i maila",
      plakietka: "Uruchomiony 15.10.2026",
      problem:
        "Klienci wciąż zamawiają SMS-em i mailem, a ktoś w biurze przepisuje każde zamówienie do programu. Gdy się pomyli, wyjaśniasz to Ty.",
      rozwiazanie:
        "Bot czyta zamówienie z SMS-a albo maila i składa je z produktów z Twojej kartoteki. Gdy czegoś brakuje, dopytuje klienta.",
      efekt: "W naszych testach bot odpowiadał na SMS w 7-36 sekund (15.10.2026).",
      wyroznienie: { rodzaj: "liczba", tekst: "7-36 sekund" },
      film: null,
    },
    {
      rodzaj: "przyklad",
      tytul: "Wiadomość klienta staje się zamówieniem",
      opis: "Wybierz wiadomość i zobacz zamówienie, które system z niej złożył.",
      zakladki: PRZYKLADY.zamowienia,
      plakietkaWspolna: "Klienci i produkty w przykładzie są wymyśleni",
      drugiDowod: null,
    },
    {
      rodzaj: "opinia",
      opinia: {
        zrodlo: "google",
        tekst:
          "Dzięki wdrożeniom LessManual.ai zaoszczędziliśmy mnóstwo czasu, który wcześniej marnowaliśmy na powtarzalne zadania.",
        podpis: "Paweł Muchewicz · 3 opinie · ★★★★★ · opinia w Google",
      },
    },
    {
      rodzaj: "pomysly",
      pomysly: [
        "potwierdzenie zamówienia do klienta z terminem dostawy",
        "sprawdzenie stanu magazynu przed przyjęciem zamówienia",
        "poranne zestawienie tego, co dziś idzie do wysyłki i czego brakuje",
        "odpowiedzi na powtarzalne maile o terminy i faktury",
        "połączenie programów, które dziś się nie łączą, np. sklepu z fakturami",
      ],
    },
  ],
} as const satisfies Dzial;

const LOGISTYKA = {
  id: "logistyka",
  nazwa: NAZWY.logistyka,
  zakladka: "Logistyka",
  bzyk: "Logistyka i dokumenty. Przesuń w bok i wybierz dokument w przykładzie.",
  karty: [
    {
      rodzaj: "film",
      tytul: "Dokumenty z maila do arkusza",
      plakietka: "Działa w zakładzie recyklingu od kwietnia 2026",
      problem:
        "Ktoś codziennie przepisuje te same pola z dokumentów do arkusza. Gdy ta osoba ma urlop, dokumenty czekają.",
      rozwiazanie:
        "Pracownik wysyła dokument mailem na jeden adres. Bot wpisuje dane do arkusza właściwego handlowca. Gdy czegoś brakuje, odpisuje, co uzupełnić.",
      efekt: "215 dokumentów przyjęcia od kwietnia do października 2026, każdy przetworzony bez błędu.",
      wyroznienie: { rodzaj: "liczba", tekst: "215" },
      film: null,
    },
    {
      rodzaj: "przyklad",
      tytul: "Dokument z maila trafia do arkusza",
      opis: "Wybierz dokument i zobacz pola, które system z niego odczytał.",
      zakladki: PRZYKLADY.logistyka,
      plakietkaWspolna: "Firmy i dane w przykładzie są wymyślone",
      drugiDowod: "U klienta pod NDA system uporządkował 9 674 z 9 674 plików dokumentacji technicznej (lipiec 2026).",
    },
    {
      rodzaj: "opinia",
      opinia: {
        zrodlo: "google",
        tekst: "Szybko reaguje na zgłaszane problemy i sprawnie wprowadza zmiany w działających workflow.",
        podpis: "Dawid Kar · 1 opinia · ★★★★★ · opinia w Google",
      },
    },
    {
      rodzaj: "pomysly",
      pomysly: [
        "faktury kosztowe z maila prosto do programu księgowego",
        "zlecenia transportowe z maila do planu tras",
        "porównanie dokumentu dostawy z zamówieniem i lista różnic",
        "przypomnienia o kończących się umowach i przeglądach pojazdów",
        "wycena trasy dla oferty z giełdy transportowej",
      ],
    },
  ],
} as const satisfies Dzial;

const DZIALY_SEKCJA = {
  ...DZIALY_WSPOLNE,
  lista: { telefony: TELEFONY, marketing: MARKETING, sprzedaz: SPRZEDAZ, zamowienia: ZAMOWIENIA, logistyka: LOGISTYKA },
} as const;

const KROKI_OSI = [
  { nr: 0, naglowek: "Skąd zaczynasz", my: "Po formularzu proponujemy Ci jedno z trzech wejść.", ty: "10 pytań, około 2 minut" },
  {
    nr: 1,
    naglowek: "Rozmowa i zakres na piśmie",
    my: "Czytamy Twoje odpowiedzi przed rozmową. Potem spisujemy efekt liczbą, etapy, cenę każdego etapu i podział zadań.",
    ty: "Rozmowa i kilka przykładowych dokumentów",
  },
  {
    nr: 2,
    naglowek: "Pierwszy system",
    my: "Budujemy możliwie prosty pierwszy etap i pokazujemy go w działaniu na Twoich sprawach.",
    ty: "Dostępy i spotkanie raz w tygodniu",
  },
  {
    nr: 3,
    naglowek: "Testy i odbiór",
    my: "System pracuje na nowych sprawach, a stary sposób działa do odbioru. Efekt mierzymy tak, jak go zapisaliśmy.",
    ty: "Sprawdzasz wyniki i potwierdzasz odbiór",
  },
  {
    nr: 4,
    naglowek: "Opieka co miesiąc",
    my: "Pilnujemy systemu, usuwamy usterki, aktualizujemy go i co miesiąc wysyłamy raport.",
    ty: "Zgłaszasz zmianę, resztą zajmujemy się my",
  },
  {
    nr: 5,
    naglowek: "Kolejny system",
    my: "Co kwartał pokazujemy, co działa, i proponujemy następny system z ceną. Wchodzi pod tę samą opiekę.",
    ty: "Spotkanie raz na kwartał i decyzja",
  },
] as const satisfies readonly [KrokOsi, KrokOsi, KrokOsi, KrokOsi, KrokOsi, KrokOsi];

const WSPOLPRACA = {
  h2: "Budujemy kolejne systemy w Twojej firmie i opiekujemy się każdym",
  lead: "Na start wybierasz jeden proces. Budujemy system, a po odbiorze go przejmujemy i pilnujemy, żeby działał. Co kwartał siadamy razem i wybieramy następny. Ty decydujesz, technika i pilnowanie są po naszej stronie.",
  etykietyTorow: ["My", "Ty"],
  kroki: KROKI_OSI,
  // Kafle prowadzą do formularza z zaznaczoną odpowiedzią pytania 6; słowo „droga” nie pada na stronie.
  kafle: [
    { droga: "A", tekst: "Wiem, co mnie najbardziej boli. Rozmowa z Bartkiem, 45 minut." },
    {
      droga: "B",
      tekst:
        "Nie wiem, od czego zacząć. Mapa AI firmy, czyli plan systemów na kwartał i rok w 5 dni roboczych od ostatniej rozmowy.",
    },
    {
      droga: "C",
      tekst:
        "Najpierw chcę zobaczyć, że to działa. Szybki pilot, czyli dwa tygodnie budowy jednego procesu na próbce Twoich danych.",
    },
  ],
  strzalkaPowrotu: "Następny system, znowu krok 2",
  polka: {
    kafelki: ["System 1", "System 2", "System 3"],
    podpisKafelka: "pod opieką",
    klamra: "Jedna opłata za opiekę, do trzech systemów",
  },
  dowod: {
    zdanie1:
      "Pierwszy system u jednego z klientów ruszył w grudniu 2025. Dziś pracuje tam 7 naszych systemów, a 2 kolejne budujemy (stan na 11.11.2026).",
    zdanie2: "Dla 8 firm zbudowaliśmy co najmniej dwa systemy.",
  },
  ceny: {
    naglowek: "Ile to kosztuje",
    // Pełne wiersze; etykietę przed dwukropkiem wycina podzielEtykiete (Task 5).
    wiersze: [
      "Rozmowa z Bartkiem: bez opłat.",
      "Mapa AI firmy: 6 900 zł netto, w całości odliczana od pierwszego wdrożenia.",
      "Szybki pilot: koszt podajemy na rozmowie i odliczamy go od wdrożenia tego systemu.",
      "Wdrożenie: projekty zwykle od kilkunastu tysięcy zł netto. Cenę każdego etapu znasz przed startem. Płacisz 35% przy zamówieniu, 35% po działającej demonstracji i 30% po odbiorze.",
      "Opieka: stała kwota miesięczna z oferty, jedna dla maksymalnie trzech systemów. Koszty narzędzi i modeli AI pokrywasz osobno, a ich poziom znasz z oferty.",
    ],
    drobnyDruk: "Przyjmujemy maksymalnie 4 nowe firmy miesięcznie.",
  },
  gwarancja: {
    naglowek: "Efekt zapisany przed startem",
    tekst:
      "Zanim zaczniemy, zapisujemy liczbą, jaki efekt ma dawać system i jak go zmierzymy. Jeżeli odebrany system tego efektu nie daje, poprawiamy go na nasz koszt, aż zacznie go dawać.",
    link: "Czego ta obietnica nie obejmuje",
  },
  daneKod: {
    naglowek: "Dane i kod",
    tekst:
      "System działa na naszej infrastrukturze i to my się nim opiekujemy. Jeśli zakończysz opiekę, przekazujemy Ci całość: kod, dane, dostępy i dokumentację techniczną.",
  },
  // Miniatura filmu Bartka przy H2; null = bez miniatury.
  film: null,
} as const;

const BEZPIECZENSTWO = {
  h2: "Serwery i modele AI w Unii Europejskiej",
  akapit1:
    "Systemy stawiamy w centrach danych w Unii Europejskiej, zwykle we Frankfurcie, w chmurze Amazon Web Services albo Microsoft Azure. Jeśli pracujesz na Microsoft 365, system łączy się z Outlookiem i SharePointem i widzi tylko to, czego potrzebuje.",
  // Decyzja Bartka 12.11: warunek startu każdego nowego systemu z danymi klientów.
  modeleUE:
    "Modele AI w nowych systemach z danymi klientów działają w strefie danych Unii Europejskiej. Jeśli system korzysta z usługi spoza UE, na przykład telefonii, wskazujemy ją w umowie przed startem.",
  akapit2:
    "Gdy system przetwarza dane osobowe, przed startem podpisujemy umowę powierzenia danych. Hasła trzymamy w sejfie haseł. Bazy danych mają kopie zapasowe. Gdy system przestaje działać, dostajemy alarm i zaczynamy naprawę.",
  wiersze: ["Centra danych w UE", "Umowa powierzenia danych", "Hasła w sejfie haseł", "Kopie zapasowe i alarmy"],
} as const;

// Kolejność kart w rzędzie z tekstów: Paweł i CreativeDanceRumia nie stoją obok siebie.
const OPINIE_KARTY = [
  {
    zrodlo: "google",
    tekst:
      "Polecam LessManual – Agencję Automatyzacji AI! Zleciliśmy im automatyzację procesów na naszych mediach społecznościowych i efekt przerósł oczekiwania. Wszystko zostało świetnie pospinane: publikacje, powiadomienia, przekazywanie zadań i szybkie reakcje na wiadomości działają praktycznie „same\". Największy plus? To, co wcześniej zajmowało nam długie godziny, teraz trwa dosłownie chwilę.",
    podpis: "Marcin Pietrasik · Lokalny przewodnik · 129 opinii · ★★★★★",
  },
  {
    zrodlo: "google",
    tekst:
      "Bartek wykazuje się dużą samodzielnością i dobrą orientacją w automatyzacjach oraz integracjach systemowych. Szybko reaguje na zgłaszane problemy i sprawnie wprowadza zmiany w działających workflow. Współpraca przebiega konkretnie i technicznie na dobrym poziomie.",
    podpis: "Dawid Kar · 1 opinia · ★★★★★",
  },
  {
    zrodlo: "google",
    tekst:
      "Pełen profesjonalizm i konkretne podejście do biznesu – współpraca z Bartkiem to czysta przyjemność. Dzięki wdrożeniom LessManual.ai zaoszczędziliśmy mnóstwo czasu, który wcześniej marnowaliśmy na powtarzalne zadania. Zdecydowanie polecam każdemu, kto chce usprawnić swoją firmę!",
    podpis: "Paweł Muchewicz · 3 opinie · ★★★★★",
  },
  {
    zrodlo: "referencja",
    tekst:
      "W Eighteen Studio zleciliśmy LessManual budowę asystentki głosowej dla poradni Pain Clinic. Asystentka odbiera telefon, odpowiada na pytania pacjentów i umawia wizyty od razu w Medfile, a prośby o odwołanie lub przełożenie wizyty przekazuje mailem do recepcji. Bartek koordynował całość, od konfiguracji po poprawki po testach poradni. Zawsze jasno mówił, co da się zrobić w obecnym systemie, a co wymaga dodatkowej integracji, i to bardzo ułatwiało nam decyzje.",
    podpis: "Bartosz Łaskawiec, CEO Eighteen Studio · referencja",
  },
  {
    zrodlo: "google",
    tekst:
      "Bartek to ekspert, który nie tylko zna się na AI, ale przede wszystkim rozumie, jak to przełożyć na realne zyski w firmie. Proponowane przez LessManual.ai rozwiązania były „szyte na miarę\" i przyniosły efekty szybciej, niż zakładaliśmy. 5 gwiazdek za terminowość i merytoryczne wsparcie.",
    podpis: "CreativeDanceRumia · 15 opinii · ★★★★★",
  },
  {
    zrodlo: "google",
    tekst:
      "Polecam z całego serca, zleciłem stworzenie strony internetowej a dostałem dużo więcej nowe Logo nową wizję na marketing i dobre pozycjonowanie w Google. Naprawdę bez zastrzeżeń 5/5!",
    podpis: "Maciej Osiecki · 7 opinii · ★★★★★",
  },
  {
    zrodlo: "linkedin",
    oryginal:
      "Focus. Precision. Excellent time management, and AI agents' knowledge are what make Bartek an exceptional architect and engineer.",
    tlumaczenie:
      "Skupienie. Precyzja. Doskonałe zarządzanie czasem i wiedza o agentach AI sprawiają, że Bartek jest wyjątkowym architektem i inżynierem.",
    podpis: "Arek Skuza, CEO and boards advisor on AI Powered Growth · rekomendacja na LinkedIn",
  },
] as const satisfies readonly Opinia[];

const OPINIE = {
  h2: "Co mówią firmy, dla których budujemy systemy",
  tabliczka: "5,0 w Google · 6 opinii",
  linkGoogle: "Zobacz w Google",
  linkLinkedin: "Zobacz na LinkedIn",
  etykietaTlumaczenia: "Tłumaczenie:",
  karty: OPINIE_KARTY,
} as const;

const FORMULARZ = {
  h2: "Umów rozmowę o systemie dla Twojej firmy",
  linia:
    "10 pytań, około 2 minut. Potem wybierasz termin rozmowy z Bartkiem, a po niej dostajesz na piśmie pierwszy krok z ceną.",
  imie: "Bartłomiej Chudzik",
  rola: "Założyciel LessManual",
  opis: "Jestem Bartek, założyciel LessManual. Od 2017 do 2025 roku organizowałem transport w firmach logistycznych i produkcyjnych, od dyspozytora po specjalistę. Dlatego zaczynam od Twojego procesu i liczb. Pierwszą rozmowę prowadzę sam i sam spisuję po niej zakres.",
  // Zamiennik opisu, nie renderowany.
  opisTrzeciaOsoba:
    "Od 2017 do 2025 roku pracował w transporcie i logistyce, od dyspozytora po specjalistę. Każdą pierwszą rozmowę prowadzi sam i sam spisuje po niej zakres.",
} as const;

const FAQ = {
  h2: "Pytania, które słyszymy przed pierwszą rozmową",
  pytania: [
    {
      id: "cena",
      q: "Czy cena będzie rosła przy każdym kolejnym systemie?",
      a: "Każdy system wyceniamy przed startem według tego samego cennika, a cenę każdego etapu dostajesz na piśmie. Zmiana po akceptacji to nowy etap z własną ceną, który zatwierdzasz osobno. Jedna opłata za opiekę obejmuje do trzech systemów.",
    },
    {
      id: "dziala-u-mnie",
      q: "Skąd mam wiedzieć, że to zadziała u mnie?",
      a: "Efekt zapisujemy liczbą przed startem. Jeśli odebrany system go nie daje, poprawiamy go na nasz koszt. Jeśli chcesz najpierw zobaczyć wynik, zacznij od szybkiego pilota. Przez dwa tygodnie budujemy wtedy jeden proces na próbce Twoich danych.",
    },
    {
      id: "inna-firma",
      q: "Moja firma pracuje inaczej niż wszystkie. Macie gotowe rozwiązanie?",
      a: "Gotowych rozwiązań nie sprzedajemy. Na pierwszej rozmowie pytamy, na jakich programach pracujesz i jak dziś sprawa przechodzi przez firmę. System budujemy pod to. Każdy system z kart działów powstał dla jednej firmy.",
    },
    {
      id: "szkody",
      q: "Czy system nie narobi szkód w bieżącej pracy?",
      a: "Testujemy go na nowych sprawach, a dotychczasowy sposób pracy działa do odbioru. Tam, gdzie błąd kosztuje pieniądze, na przykład kary, system przygotowuje decyzję, a zatwierdza ją człowiek. Takie miejsca ustalamy przed startem.",
    },
    {
      id: "koniec-wspolpracy",
      q: "Co, jeśli zechcę zakończyć współpracę?",
      a: "System działa na naszej infrastrukturze i to my się nim opiekujemy. Jeśli zakończysz opiekę, przekazujemy Ci całość: kod, dane, dostępy i dokumentację techniczną. Możesz go oddać własnemu informatykowi albo innej firmie.",
    },
    {
      id: "czas",
      q: "Ile mojego czasu to zajmie?",
      a: "Na start rozmowa i kilka przykładowych dokumentów. W trakcie budowy spotkanie raz w tygodniu, a Twoje zadania są na jednej liście. Po odbiorze jedno spotkanie na kwartał, a sprawy techniczne prowadzimy my.",
    },
    {
      id: "obietnica",
      q: "Czego nie obejmuje obietnica efektu?",
      a: "Obietnica dotyczy efektu zapisanego przed startem i mierzonego tak, jak go zapisaliśmy. Zmiana zakresu po akceptacji to nowa wycena. Nie obejmuje skutków braku danych, dostępów albo decyzji po Twojej stronie w uzgodnionym terminie ani kosztów narzędzi i chmury.",
    },
  ],
  powrot: "Wróć do formularza",
} as const;

const CTA = {
  pasek: "Umów rozmowę z Bartkiem",
  h2: "Czego w firmie musisz dziś pilnować sam?",
  tekst: "Od tego zaczniemy rozmowę z Bartkiem. Po niej dostajesz na piśmie propozycję pierwszego kroku z ceną.",
  przycisk: "Przejdź do formularza",
  drobnyDruk: "Przyjmujemy maksymalnie 4 nowe firmy miesięcznie.",
} as const;

const STOPKA = {
  zdanie: "LessManual buduje systemy AI szyte na miarę firm od 10 do 100 osób i opiekuje się nimi po wdrożeniu.",
  naglowki: { dzialy: "Działy", wspolpraca: "Współpraca", kontakt: "Kontakt" },
  // Dział w polu `dzial` buduje link `/#dzial-<id>`, który działa też spoza strony głównej.
  dzialy: [
    { label: NAZWY.telefony, dzial: "telefony" },
    { label: NAZWY.marketing, dzial: "marketing" },
    { label: NAZWY.sprzedaz, dzial: "sprzedaz" },
    { label: NAZWY.zamowienia, dzial: "zamowienia" },
    { label: NAZWY.logistyka, dzial: "logistyka" },
  ] as const satisfies readonly { label: string; dzial: DzialId }[],
  // Etykieta i cel w jednym obiekcie, żeby liczba linków nie rozjechała się z liczbą etykiet.
  wspolpraca: [
    { label: "Mapa AI firmy", href: "/#wejscie-mapa" },
    { label: "Szybki pilot", href: "/#wejscie-pilot" },
    { label: "Pytania", href: "/#pytania" },
    { label: "Kim jesteśmy", href: "/o-nas" },
    { label: "Blog", href: "/blog" },
  ],
  // Adresy kontaktu żyją w LINKS (site.ts importuje ten plik, więc tu tylko klucz); SiteFooter je rozwiązuje.
  kontakt: [
    { label: "Umów rozmowę", cel: "formularz" },
    { label: "kontakt@lessmanual.ai", cel: "email" },
    { label: "LinkedIn", cel: "linkedin" },
    { label: "Wizytówka w Google", cel: "google" },
  ] as const satisfies readonly { label: string; cel: "formularz" | "email" | "linkedin" | "google" }[],
  dane: "© 2026 LessManual.ai · LessManual Bartłomiej Chudzik, ul. Długa 33, 05-530 Cendrowice, NIP 1231589909",
  prawne: ["Polityka prywatności", "Polityka cookies", "Regulamin", "Ustawienia cookies"],
  znakiTowarowe: "Microsoft, Azure i AWS są znakami towarowymi ich właścicieli.",
} as const;

export const HOME_V4 = {
  nav: NAV,
  hero: HERO,
  przejscie: PRZEJSCIE,
  dzialy: DZIALY_SEKCJA,
  wspolpraca: WSPOLPRACA,
  bezpieczenstwo: BEZPIECZENSTWO,
  opinie: OPINIE,
  formularz: FORMULARZ,
  faq: FAQ,
  cta: CTA,
  stopka: STOPKA,
} as const;
