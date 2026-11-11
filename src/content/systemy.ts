// Treści podstron systemów (/systemy/<slug>). Cztery podstrony START z TEKSTY v3, sekcje 12.1-12.4:
// materialy/cso/strona-2026-11-10/TEKSTY_STRONY.md (wersja 3 CSO z 11.11.2026), teksty 1:1.
// Lista i kolejność podstron wynikają z SYSTEMS.cards (karty widoczne z pageHref), więc strona
// główna, indeks /systemy i podstrony nie rozjeżdżają się ze sobą.

import { SITE_URL, SYSTEMS, type SystemCard } from "./site";

type FaqItem = { q: string; a: string };

type SystemPageCopy = {
  slug: string;
  /** Tytuł w Google, do 60 znaków (bez szablonu „| LessManual” z layoutu). */
  metaTitle: string;
  /** Opis w Google, do 155 znaków. */
  metaDescription: string;
  h1: string;
  lead: string;
  problem: string;
  howItWorks: readonly string[];
  /** Akapit pod listą „Jak działa”; nie każda podstrona go ma. */
  afterList?: string;
  effect: string;
  faq: readonly FaqItem[];
};

const PRICE_FAQ: FaqItem = {
  q: "Ile kosztuje taki system?",
  a: "Projekty zwykle zaczynają się od kilkunastu tysięcy zł netto. Cenę każdego etapu dostajesz przed startem.",
};

const PAGE_COPY: readonly SystemPageCopy[] = [
  {
    slug: "odczyt-dokumentow",
    metaTitle: "System AI do odczytu dokumentów i faktur | LessManual",
    metaDescription:
      "Bot odczytuje dokumenty z maila i wpisuje dane do arkusza albo programu firmy. Przykład: 215 dokumentów w pół roku, każdy bez błędu przetwarzania.",
    h1: "System, który przepisuje dokumenty z maila do arkusza",
    lead: "Bot odbiera dokumenty wysłane mailem, odczytuje z nich dane i wpisuje je tam, gdzie pracuje Twój zespół. U jednego z klientów wpisał 215 dokumentów przyjęcia od kwietnia do października 2026, każdy bez błędu przetwarzania.",
    problem:
      "W wielu firmach ktoś codziennie przepisuje te same pola z zamówień, faktur albo dokumentów przyjęcia. To praca, która nie wymaga decyzji, a zajmuje czas i daje literówki. Gdy ta osoba jest na urlopie, dokumenty czekają.",
    howItWorks: [
      "pracownik wysyła dokument mailem na jeden adres, tak jak dziś przekazuje go osobie, która go przepisuje;",
      "bot odczytuje dokument i wpisuje dane do właściwego arkusza;",
      "gdy brakuje danych, bot niczego nie zgaduje: odsyła mail z informacją, co uzupełnić;",
      "dokument wysłany drugi raz nie trafia do arkusza ponownie.",
    ],
    afterList:
      "W przykładzie dane trafiają do arkuszy handlowców i do wspólnego rejestru zakładu. Jeśli Twój program księgowy albo ERP przyjmuje dane z zewnątrz, system można połączyć bezpośrednio z nim; sprawdzamy to na pierwszej rozmowie.",
    effect:
      "215 dokumentów przyjęcia wpisanych od kwietnia do października 2026, każdy bez błędu przetwarzania (zakład recyklingu).",
    faq: [
      {
        q: "Jakie dokumenty odczyta system?",
        a: "Te, które dziś ktoś przepisuje ręcznie, na przykład zamówienia, faktury albo dokumenty przyjęcia. Przed startem sprawdzamy kilka Twoich dokumentów i ustalamy, które pola system ma odczytywać.",
      },
      {
        q: "Czy zespół musi zmienić sposób pracy?",
        a: "W niewielkim stopniu. Dokumenty wysyła się mailem na jeden adres, a dane pojawiają się w arkuszu albo programie, z którego już korzystacie.",
      },
      {
        q: "Co, jeśli dokument jest niepełny albo nieczytelny?",
        a: "System go nie wpisuje. Odsyła mail z informacją, czego brakuje, i czeka na poprawiony dokument.",
      },
      PRICE_FAQ,
    ],
  },
  {
    slug: "okazje-sprzedazowe-i-przetargi",
    metaTitle: "System AI do wyszukiwania przetargów i klientów | LessManual",
    metaDescription:
      "Bot codziennie przegląda przetargi i wiadomości o firmach i wysyła handlowcom trafne sprawy. Przykład: 62 tematy w tydzień, 11 z 13 sygnałów trafnych.",
    h1: "System, który codziennie szuka okazji sprzedażowych dla handlowców",
    lead: "Bot codziennie przegląda ogłoszenia przetargowe i wiadomości o firmach z Twojego rynku, a trafne sprawy wysyła mailem handlowcom. U jednego z klientów handlowcy dostali 62 tematy w tydzień i ocenili 11 z 13 sygnałów od firm jako trafne.",
    problem:
      "Informacja o zakupie, przetargu albo zmianie w firmie klienta jest publiczna, ale rozproszona po wielu stronach. Handlowcy nie mają czasu ich codziennie przeglądać, więc o okazji dowiadują się za późno albo wcale.",
    howItWorks: [
      "razem ustalamy, jakie sprawy są dla Ciebie okazją i w jakich krajach sprzedajesz;",
      "bot codziennie przegląda wskazane źródła, także zagraniczne;",
      "trafne sprawy trafiają mailem do handlowca odpowiedzialnego za dany rynek;",
      "handlowiec ocenia każdą sprawę, a odrzucone z powodem pomagają zawęzić wyszukiwanie.",
    ],
    afterList:
      "W przykładzie handlowcy odrzucili przetargi spoza branży firmy, więc ten typ ogłoszeń wyłączyliśmy z wyszukiwania.",
    effect:
      "W tygodniu od 19 do 26 października 2026 handlowcy dostali 62 tematy. W kolejnym tygodniu ocenili 11 z 13 sygnałów od firm jako trafne (firma recyklingowa).",
    faq: [
      {
        q: "Skąd system bierze informacje?",
        a: "Z publicznych źródeł, które wybieramy razem: serwisów z ogłoszeniami przetargowymi, rejestrów i wiadomości branżowych z krajów, w których sprzedajesz.",
      },
      {
        q: "Czy działa poza Polską?",
        a: "Tak. W przykładzie bot szuka też okazji w Niemczech i w Czechach.",
      },
      {
        q: "Co, jeśli bot przysyła nietrafione sprawy?",
        a: "Handlowiec odrzuca sprawę i podaje powód. Na tej podstawie zawężamy wyszukiwanie w ramach opieki.",
      },
      PRICE_FAQ,
    ],
  },
  {
    slug: "panel-firmy",
    metaTitle: "Panel firmy: wszystkie boty i systemy AI w jednym miejscu",
    metaDescription:
      "Jeden panel dla właściciela: co zrobił każdy bot, które sprawy trafiły do handlowców i co czeka. Przykład: 38 spraw w pierwszym tygodniu, 8 ofert w toku.",
    h1: "Panel firmy: system, który pokazuje pracę wszystkich botów",
    lead: "Panel pokazuje właścicielowi w jednym miejscu, co zrobił każdy bot i co stało się dalej ze sprawą. W pierwszym tygodniu u jednego z klientów pokazał 38 spraw przekazanych handlowcom, a przy 8 z nich trwała już praca nad ofertą.",
    problem:
      "Gdy w firmie pracuje kilka botów, każdy wysyła wyniki w inne miejsce. Właściciel nie wie, co faktycznie działa, ile spraw trafiło do handlowców i co się z nimi stało.",
    howItWorks: [
      "panel zbiera wyniki ze wszystkich botów połączonych z nim;",
      "przy każdej sprawie widać handlowca i jego ocenę: oferta, kontakt albo odrzucenie z powodem;",
      "sprawy, które czekają na ocenę, są widoczne przy konkretnej osobie;",
      "właściciel widzi stan bez pytania zespołu.",
    ],
    effect:
      "W pierwszym tygodniu panel pokazał 38 spraw przekazanych handlowcom. Handlowcy ocenili 24 z nich: przy 8 trwa przygotowanie oferty, 10 odrzucili z podanym powodem (firma recyklingowa).",
    faq: [
      {
        q: "Kiedy warto zbudować panel?",
        a: "Gdy w firmie działa więcej niż jeden bot albo system i chcesz widzieć ich wyniki w jednym miejscu. U naszego klienta panel powstał jako kolejny etap po pierwszych botach.",
      },
      {
        q: "Czy panel pokazuje tylko liczby?",
        a: "Pokazuje konkretne sprawy z oceną handlowca, więc widać, co z nich wynikło.",
      },
      { q: "Ile kosztuje taki system?", a: PRICE_FAQ.a },
    ],
  },
  {
    slug: "tresci-sklepu-pod-google",
    metaTitle: "System AI do treści sklepu internetowego pod Google",
    metaDescription:
      "Agent AI przygotowuje poradniki i rankingi produktów na danych sklepu, a właściciel zatwierdza plan. Przykład: 2 906 kliknięć z Google z artykułów z 2026.",
    h1: "System, który pisze poradniki i rankingi produktów sklepu",
    lead: "Agent AI przygotowuje poradniki i rankingi produktów na danych Twojego sklepu, a Ty zatwierdzasz plan publikacji. W sklepie z oświetleniem LED artykuły opublikowane w 2026 roku dały 2 906 kliknięć z Google.",
    problem:
      "Poradniki i rankingi produktów przyciągają klientów z Google, ale ich pisanie i aktualizacja zajmują dużo czasu. Stare wpisy tracą ruch, bo Google coraz częściej sam odpowiada na pytania.",
    howItWorks: [
      "agent sprawdza dane produktów w sklepie, zanim zacznie pisać;",
      "przygotowuje plan wpisów, a właściciel go zatwierdza;",
      "poradniki i rankingi publikujemy według harmonogramu, pod dotychczasowymi adresami, jeśli wpis już istnieje;",
      "co miesiąc pokazujemy, co weszło na stronę.",
    ],
    effect:
      "Artykuły opublikowane w 2026 roku dały 2 906 kliknięć z Google (raport z 21.09.2026). W listopadzie 6 przebudowanych poradników i 14 odświeżonych rankingów jest już online; wcześniej sprawdziliśmy dane 140 produktów.",
    faq: [
      {
        q: "Czy treści publikują się bez mojej wiedzy?",
        a: "Nie. Plan wpisów zatwierdzasz Ty, a publikacja idzie według uzgodnionego harmonogramu.",
      },
      {
        q: "Skąd agent bierze informacje o produktach?",
        a: "Z danych Twojego sklepu i z kryteriów, które nam przekażesz. Przed publikacją sprawdzamy dane produktów.",
      },
      { q: "Ile kosztuje taki system?", a: PRICE_FAQ.a },
    ],
  },
];

export type SystemPage = SystemPageCopy & {
  card: SystemCard;
  path: string;
  url: string;
};

function pageForCard(card: SystemCard): SystemPage | null {
  if (!card.visible || !card.pageHref) return null;
  const copy = PAGE_COPY.find((item) => `/systemy/${item.slug}` === card.pageHref);
  if (!copy) return null;
  return { ...copy, card, path: card.pageHref, url: `${SITE_URL}${card.pageHref}` };
}

/** Kolejność jak w SYSTEMS.cards. */
export const SYSTEM_PAGES: readonly SystemPage[] = SYSTEMS.cards.flatMap((card) => {
  const page = pageForCard(card);
  return page ? [page] : [];
});

export function getSystemPage(slug: string): SystemPage | undefined {
  return SYSTEM_PAGES.find((page) => page.slug === slug);
}

/** Karty widoczne w kolejności z SYSTEMS.cards (indeks /systemy pokazuje tylko je). */
export const VISIBLE_CARDS: readonly SystemCard[] = SYSTEMS.cards.filter((card) => card.visible);

export const SYSTEMS_INDEX = {
  h1: "Systemy AI dla firm, które już pracują u klientów",
  metaTitle: "Systemy AI dla firm: przykłady z wdrożeń | LessManual",
  metaDescription:
    "Systemy AI, które pracują w polskich firmach: przetargi, dokumenty, treści sklepu i panel właściciela. Zobacz przykłady z liczbami.",
  intro: SYSTEMS.intro,
  path: "/systemy",
  url: `${SITE_URL}/systemy`,
} as const;

export const SYSTEM_PAGE_LABELS = {
  problem: "Problem",
  howItWorks: "Jak działa",
  effect: "Efekt",
  faqTitle: "Pytania o ten system",
  startTitle: "Jak zaczynamy",
  otherTitle: "Inne systemy",
} as const;
