const POLISH_MONTHS = [
  "styczniu", "lutym", "marcu", "kwietniu", "maju", "czerwcu",
  "lipcu", "sierpniu", "wrześniu", "październiku", "listopadzie", "grudniu",
] as const;

export function getCurrentMonthPL() {
  return POLISH_MONTHS[new Date().getMonth()];
}

export function getNextMonthPL() {
  return POLISH_MONTHS[(new Date().getMonth() + 1) % 12];
}

export const CALENDLY_URL =
  "https://cal.com/bart%C5%82omiej-chudzik-2en6pt/30min";
export const EMAIL = "kontakt@lessmanual.ai";
export const GOOGLE_REVIEWS_URL = "https://g.page/r/lessmanual/review";
export const AI_GROWTH_MAP_URL = "/ai-growth-opportunity-map";

export const HERO_ROTATOR_WORDS = ["klienci", "wyniki", "zyski"];

export const PROOF_METRICS = [
  { value: "quality gate", label: "research, copy, QA i utrzymanie" },
  { value: "setup + MRR", label: "wdrożenie i miesięczna obsługa" },
  { value: "diagnoza", label: "zakres i wycena po sprawdzeniu procesu" },
];

export { PROOF_WITH_CAPACITY as PROOF_META } from "./social-proof";

export const NAVIGATION = [
  { name: "Oferta", href: "/oferta" },
  { name: "Blog", href: "/blog" },
  { name: "Wyniki", href: "#wyniki" },
  { name: "Jak działamy", href: "#proces" },
  { name: "FAQ", href: "#faq" },
];

export const PRODUCTS = [
  {
    title: "Content Machine",
    badge: "PRIMARY",
    description:
      "System wybiera tematy na podstawie pytań klientów, przygotowuje teksty, publikuje je i rozdziela na kolejne formaty. Jakość sprawdza człowiek.",
    metrics: [
      "wdrożenie i stała opieka",
      "regularny content bez budowania własnego działu",
    ],
    bonus:
      "AI Growth Map pokazuje, gdzie content może najszybciej przełożyć się na popyt.",
    landingHref: "/oferta/content-machine",
  },
  {
    title: "Obsługa Klienta AI",
    badge: "PRIMARY",
    description:
      "System odpowiada na powtarzalne pytania na podstawie wiedzy firmy. Zespół dostaje tylko sprawy wymagające decyzji, razem z pełnym kontekstem.",
    metrics: [
      "wdrożenie i stała opieka",
      "kanały i integracje dobierane po diagnozie",
    ],
    bonus:
      "AI Growth Map pokazuje, które kanały i typy spraw warto automatyzować jako pierwsze.",
    landingHref: "/oferta/obsluga-klienta",
  },
  {
    title: "Premium Cold Email+",
    badge: "PRIMARY",
    description:
      "Kampania sprzedażowa B2B oparta na sprawdzonych danych o firmie i konkretnym powodzie kontaktu. Każdą wiadomość sprawdzamy przed wysyłką.",
    metrics: [
      "uruchomienie i stała obsługa",
      "dla firm, w których wartość kontraktu uzasadnia dokładne przygotowanie",
    ],
    bonus:
      "AI Growth Map wybiera, czy outbound ma prowadzić content, obsługę, ofertowanie czy lead gen.",
    landingHref: "/oferta/pipeline-machine",
  },
  {
    title: "Generator Ofert",
    description:
      "System przygotowuje draft oferty na podstawie zatwierdzonego cennika, danych klienta i reguł firmy. Handlowiec sprawdza wynik przed wysyłką.",
    metrics: [
      "ceny wyłącznie z danych firmy",
      "akceptacja handlowca przed wysyłką",
    ],
    bonus:
      "Dobieramy po diagnozie, jeśli ofertowanie blokuje sprzedaż mocniej niż pozyskiwanie leadów.",
    landingHref: "/oferta/generator-ofert",
  },
  {
    title: "Hot Lead Catcher",
    description:
      "Agent monitoruje uzgodnione źródła i wskazuje sygnały, które mogą oznaczać moment zakupowy. Każdy alert zawiera źródło i kontekst do weryfikacji.",
    metrics: [
      "sygnał, źródło i szkic kontaktu",
      "dane do sprawdzenia przed kontaktem z firmą",
    ],
    bonus:
      "Nie sprzedajemy go jako tani skrót do leadów. Używamy, gdy sygnały mają sens w danej branży.",
    landingHref: "/oferta/hot-lead-catcher",
  },
  {
    title: "Indywidualne Wdrożenia",
    badge: "DLA NON-STANDARD",
    description:
      "Agent AI dopasowany do niestandardowego procesu, gdy gotowa ścieżka nie pasuje. Zakres i wycena powstają po diagnozie.",
    metrics: [
      "zakres po diagnozie procesu",
      "wycena przed rozpoczęciem prac",
    ],
    bonus:
      "Dane, integracje, reguły i sposób utrzymania opisujemy przed rozpoczęciem budowy.",
    landingHref: "/oferta/indywidualne-wdrozenia",
  },
];

export const COST_TABLE = [
  {
    task: "Regularny content i dystrybucja",
    currentCost: "copywriter, SEO, social i ręczny publishing",
    ourCost: "Content Machine po diagnozie",
  },
  {
    task: "Obsługa zapytań i eskalacji",
    currentCost: "kolejna osoba albo właściciel gaszący tematy",
    ourCost: "Customer Operations AI po diagnozie",
  },
  {
    task: "Pozyskiwanie klientów outbound",
    currentCost: "lista, research, copy, wysyłka, follow-up i QA osobno",
    ourCost: "Premium Cold Email+ setup + MRR",
  },
  {
    task: "Generowanie ofert (ręcznie)",
    currentCost: "10-20h Twojego czasu",
    ourCost: "5 minut per oferta",
  },
];

export const SOCIAL_PROOF_METRICS = [
  { label: "Open rate", value: "76%", countTo: 76, suffix: "%", benchmark: "20-30%" },
  { label: "Positive reply rate", value: "61%", countTo: 61, suffix: "%", decimals: 0, benchmark: "5-15%" },
  { label: "Od kontaktu do dealu", value: "6 dni", countTo: 6, suffix: " dni", benchmark: "30-90 dni" },
];

export const SPOTLIGHT_CASES = [
  {
    company: "Recykling Karat",
    type: "Lead Generation",
    investment: "7,500 PLN",
    result: "~20 kwalifikowanych leadów dziennie",
    detail:
      "440 leadów miesięcznie, 100% zgodnych z profilem idealnego klienta. System działa na automacie. Klient nie dotyka klawiatury.",
    value: "300,000+ PLN/rok",
  },
  {
    company: "SMD-LED",
    type: "SEO Content",
    investment: "5,000 PLN + 500 PLN/mies",
    result: "3 artykuły tygodniowo",
    detail:
      "Wszystkie na 1. lub 2. stronie Google w ciągu tygodnia. Wartość ruchu organicznego po 6 miesiącach: 10-50k PLN/mies.",
    value: "10-50k PLN/mies",
  },
];

export const MORE_CASES = [
  {
    company: "Szkoła tańca",
    type: "24/7 odbiór telefonów",
    result: "Voice Agent, inteligentna recepcjonistka AI. Odbiera telefony poza godzinami pracy.",
  },
  {
    company: "Firma z branży stolarki budowlanej",
    type: "Automatyzacja raportów",
    result: "4-8h → 0 pracy tygodniowo. Cotygodniowy raport generowany automatycznie.",
  },
  {
    company: "Firma z branży OZE",
    type: "Agent wycen PDF",
    result: "3h → 0. Klient podaje dane w chatbocie, dostaje spersonalizowaną wycenę PDF na maila.",
  },
];

export const REVIEWS = [
  {
    name: "Marcin Pietrasik",
    meta: "Lokalny przewodnik · 129 opinii",
    before: "Godziny na ręczne publikacje",
    after: "Automatyzacja social media",
    text: `Polecam LessManual – Agencję Automatyzacji AI! Zleciliśmy im automatyzację procesów na naszych mediach społecznościowych i efekt przerósł oczekiwania. Wszystko zostało świetnie pospinane: publikacje, powiadomienia, przekazywanie zadań i szybkie reakcje na wiadomości działają praktycznie „same". Największy plus? To, co wcześniej zajmowało nam długie godziny, teraz trwa dosłownie chwilę.`,
  },
  {
    name: "Dawid Kar",
    meta: "1 opinia",
    before: "Problemy z workflow",
    after: "Sprawne integracje systemowe",
    text: "Bartek wykazuje się dużą samodzielnością i dobrą orientacją w automatyzacjach oraz integracjach systemowych. Szybko reaguje na zgłaszane problemy i sprawnie wprowadza zmiany w działających workflow. Współpraca przebiega konkretnie i technicznie na dobrym poziomie.",
  },
  {
    name: "Maciej Osiecki",
    meta: "7 opinii",
    before: "Brak widoczności online",
    after: "Nowa strona + logo + SEO",
    text: "Polecam z całego serca, zleciłem stworzenie strony internetowej a dostałem dużo więcej nowe Logo nową wizję na marketing i dobre pozycjonowanie w Google. Naprawdę bez zastrzeżeń 5/5!",
  },
  {
    name: "Paweł Muchewicz",
    meta: "3 opinie",
    before: "Powtarzalne zadania zjadały czas",
    after: "Czas odzyskany dzięki AI",
    text: "Pełen profesjonalizm i konkretne podejście do biznesu – współpraca z Bartkiem to czysta przyjemność. Dzięki wdrożeniom LessManual.ai zaoszczędziliśmy mnóstwo czasu, który wcześniej marnowaliśmy na powtarzalne zadania. Zdecydowanie polecam każdemu, kto chce usprawnić swoją firmę!",
  },
  {
    name: "CreativeDanceRumia",
    meta: "15 opinii",
    before: "Ręczne procesy, wolne efekty",
    after: "Rozwiązania szyte na miarę",
    text: `Bartek to ekspert, który nie tylko zna się na AI, ale przede wszystkim rozumie, jak to przełożyć na realne zyski w firmie. Proponowane przez LessManual.ai rozwiązania były „szyte na miarę" i przyniosły efekty szybciej, niż zakładaliśmy. 5 gwiazdek za terminowość i merytoryczne wsparcie.`,
  },
  {
    name: "Arek Skuza",
    meta: "CEO and boards advisor on AI Powered Growth",
    before: "Standard agency processes",
    after: "Focus. Precision. AI agents' knowledge.",
    text: `Focus. Precision. Excellent time management, and AI agents' knowledge are what make Bartek an exceptional architect and engineer.`,
  },
];

export const FAQ_ITEMS = [
  {
    category: "Produkt i wdrożenie",
    items: [
      {
        q: "Czy to zadziała w mojej branży?",
        a: "Nie zakładamy tego bez diagnozy. Sprawdzamy proces, liczbę powtórzeń, dostępne dane, integracje i koszt obecnego sposobu pracy. Jeśli automatyzacja nie ma sensu, mówimy to wprost.",
      },
      {
        q: "Jak szybko zobaczę wyniki?",
        a: "Najpierw robimy diagnozę i wybieramy jeden proces. Termin zależy od integracji, jakości danych, liczby wyjątków oraz zakresu testów. Konkretny harmonogram dostajesz przed rozpoczęciem prac.",
      },
      {
        q: "Czy potrzebuję wiedzy technicznej?",
        a: "Nie. Potrzebujemy od Ciebie wiedzy o procesie, wyjątkach i oczekiwanym wyniku. LessManual odpowiada za projekt, wdrożenie, testy oraz utrzymanie systemu.",
      },
    ],
  },
  {
    category: "Ceny i warunki",
    items: [
      {
        q: "Ile to kosztuje?",
        a: "Pracujemy w modelu wdrożenie + miesięczna obsługa. Nie pokazujemy publicznego cennika jako głównego kryterium, bo zakres zależy od procesu, wolumenu, danych, integracji i poziomu utrzymania. Konkretne kwoty podajemy po diagnozie.",
      },
      {
        q: "Czy muszę mieć duży budżet żeby zacząć?",
        a: "Potrzebujesz problemu, którego koszt da się zmierzyć. Jeśli temat jest zbyt mały, powiemy to wprost. Jeśli ma sens, zaczynamy od jednego procesu i dopiero po wyniku rozważamy kolejny.",
      },
      {
        q: "Co jeśli nie zadziała?",
        a: "Przed startem zapisujemy zakres, kryteria wyniku, odpowiedzialności i sposób odbioru. Warunki rozliczenia oraz ewentualnej gwarancji wynikają z konkretnej oferty i umowy.",
      },
    ],
  },
  {
    category: "Bezpieczeństwo i zaufanie",
    items: [
      {
        q: "Czy AI nie pomyli się i nie zrazi moich klientów?",
        a: "Ryzyko błędu ograniczamy przez zatwierdzone źródła, reguły, testy i przekazywanie wyjątków do człowieka. W procesach o większym ryzyku człowiek zatwierdza wynik przed działaniem.",
      },
      {
        q: "A co z RODO i bezpieczeństwem danych?",
        a: "Przed wdrożeniem ustalamy, jakie dane są potrzebne, kto ma do nich dostęp, gdzie są przetwarzane i jak długo są przechowywane. Architekturę oraz umowy dobieramy do rodzaju danych i wymagań firmy.",
      },
      {
        q: "Ktoś mnie już oszukał z AI. Czemu mam Ci zaufać?",
        a: "Zaczynamy od konkretnego procesu, kryterium wyniku i jasnego zakresu odpowiedzialności. Możesz sprawdzić publiczne opinie o LessManual, a przed decyzją zobaczysz sposób kontroli systemu i zasady odbioru.",
      },
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Rozmowa",
    duration: "15 min",
    points: [
      "Sprawdzamy gdzie tracisz czas i pieniądze",
      "Wybieramy co automatyzować w pierwszej kolejności",
      "Dostajesz konkretną propozycję z ceną i terminem",
    ],
    yourTime: "15 minut",
  },
  {
    step: 2,
    title: "Budowa",
    duration: "7-14 dni",
    points: [
      "Budujemy system na Twoich danych i procesach",
      "Pokazujemy wersję testową, zatwierdzasz lub dajesz feedback",
    ],
    yourTime: "1-2 godziny",
  },
  {
    step: 3,
    title: "Uruchomienie",
    duration: "Od razu",
    points: [
      "System idzie na produkcję",
      "Pierwsze wyniki w ciągu dni",
      "Monitorujemy i optymalizujemy",
    ],
    yourTime: "0h",
  },
];

export const GUARANTEE_POINTS = [
  "50% zaliczki, reszta po wdrożeniu, nie płacisz za coś czego nie ma",
  "Nie wdrożymy na czas, zwrot setup",
  "Zakres, miary sukcesu i utrzymanie ustalone przed startem",
  "Wyniki poniżej ustaleń, zwrot kosztów",
  "Chcesz zrezygnować? Jeden mail, bez kar, bez okresu wypowiedzenia",
];

export const COST_TABLE_SUMMARY = "Najpierw liczymy koszt ręcznej pracy i ryzyko rekrutacji. Dopiero potem wybieramy workflow, zakres i model obsługi.";

export const VALUE_STACK_SAVINGS = [
  {
    area: "Sprzedaż",
    before: "masowy outbound, słaby research i ręczne follow-upy",
    after: "Premium Cold Email+ z research-backed personalizacją",
  },
  {
    area: "Obsługa klienta",
    before: "kolejna osoba albo właściciel gaszący powtarzalne sprawy",
    after: "Customer Operations AI z eskalacją do człowieka",
  },
  {
    area: "Content",
    before: "teksty bez researchu, publikacja ad hoc, brak dystrybucji",
    after: "Content Machine jako pipeline od researchu do publikacji",
  },
  {
    area: "Oferty",
    before: "10-20h Twojego czasu/mies",
    after: "5 minut per oferta",
  },
];
