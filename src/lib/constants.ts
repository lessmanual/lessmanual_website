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

export const CALENDLY_URL = "https://cal.com/bartłomiej-chudzik-2en6pt";
export const EMAIL = "kontakt@lessmanual.ai";
export const GOOGLE_REVIEWS_URL = "https://g.page/r/lessmanual/review";

export const HERO_ROTATOR_WORDS = ["klienci", "wyniki", "zyski"];

export const PROOF_METRICS = [
  { value: "20-40h", label: "tyle oszczędzają nasi klienci", countFrom: 0, countTo: 40, suffix: "h", prefix: "" },
  { value: "7-21 dni", label: "do działającego systemu" },
  { value: "Gwarancja wyników", label: "lub pełny zwrot kosztów" },
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
    title: "Hot Lead Catcher",
    badge: "NAJCZĘŚCIEJ WYBIERANY",
    description:
      "Agent AI który wychwytuje gorące leady zanim konkurencja je zauważy. Monitoruje 4 źródła sygnałów zakupowych (newsy, oferty pracy, opinie, social media) i alertuje gdy ktoś z Twojego ICP właśnie rozważa zakup.",
    metrics: [
      "Setup 3 000 PLN + od 800 PLN/mies",
      "4 źródła sygnałów (newsy, oferty pracy, opinie, social media)",
      "Alert Telegram + gotowy draft maila w Instantly",
    ],
    bonus:
      "Bonus: CRM integration + scoring agent w cenie setupu GROWTH (wartość 2 000 PLN)",
    landingHref: "/oferta/hot-lead-catcher",
  },
  {
    title: "Spotkania z decydentami",
    description:
      "System który umawia spotkania z Twoimi idealnymi klientami. Płacisz tylko za wynik - zero stałych opłat. 3 warstwy gwarancji. Bonusy o wartości do 10,000 PLN w cenie.",
    metrics: [
      "76% open rate, 61% positive reply rate",
      "Pay-per-meeting od 500 PLN. Zero stałych opłat",
      "3 warstwy gwarancji. 0 spotkań w 45 dni = zwrot setup",
    ],
    bonus:
      "Bonus: Warsztat ICP (2,500 PLN), Sprawdzone Szablony z 76% open rate (1,500 PLN), Auto-Reply AI (3,000 PLN) - w cenie setupu",
    landingHref: "/oferta/pipeline-machine",
  },
  {
    title: "Blog który pisze się sam",
    description:
      "10-30 artykułów SEO miesięcznie. Keyword research, klastry tematyczne, linkowanie wewnętrzne. Ty nie robisz nic. Ruch rośnie.",
    metrics: [
      "Od 83 PLN za artykuł (vs 300-800 PLN copywriter)",
      "+150-400% ruchu organicznego w 6 miesięcy",
    ],
    bonus:
      "Bonus: ruch z Google to klienci którzy sami Cię szukają, zero kosztów per lead",
    landingHref: "/oferta/seo-content",
  },
  {
    title: "Odpowiedź w 30 sekund, 24/7",
    description:
      "System który odpowiada klientom na stronie, WhatsApp i mailu. Wytrenowany na Twojej bazie wiedzy. Jak czegoś nie wie, przekazuje do Ciebie z pełnym kontekstem.",
    metrics: [
      "60-80% zapytań obsłużonych automatycznie",
      "System od 900 PLN/mies vs pracownik 8-9k PLN/mies",
    ],
    bonus:
      "Bonus: klient dostaje odpowiedź o 2 w nocy, w weekend, w święta, nigdy nie czeka",
    landingHref: "/oferta/obsluga-klienta",
  },
  {
    title: "Wycena w 5 minut zamiast 2 godzin",
    description:
      "Klient sam wycenia na Twojej stronie lub w chacie. System generuje profesjonalny PDF z Twoim logo i wysyła mailem. Z auto follow-upem i cotygodniowym raportem.",
    metrics: [
      "2h → 5 min (oszczędność 96% czasu)",
      "+25-40% win rate dzięki szybkości odpowiedzi",
    ],
    bonus:
      "Bonus: klient wycenia sam o 23:00, w weekend, w święta. Ty rano masz gotowe zapytanie",
    landingHref: "/oferta/generator-ofert",
  },
];

export const COST_TABLE = [
  {
    task: "Szukanie klientów (handlowiec / agencja / ads)",
    currentCost: "5,000-22,000 PLN",
    ourCost: "od 500 PLN/spotkanie",
  },
  {
    task: "Obsługa zapytań (pracownik / Ty sam)",
    currentCost: "8,000-9,000 PLN",
    ourCost: "od 900 PLN/mies",
  },
  {
    task: "Content marketing (copywriter / agencja)",
    currentCost: "5,000-8,000 PLN",
    ourCost: "od 1,000 PLN/mies",
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
        a: "80% problemów które rozwiązujemy jest identycznych niezależnie od branży: odpowiadanie na zapytania, tworzenie ofert, szukanie klientów, publikacja contentu. Pracujemy z firmami z IT, logistyki, OZE, e-commerce, HoReCa i usług B2B. Jeśli masz powtarzalne procesy które zjadają czas Twojego zespołu, zadziała.",
      },
      {
        q: "Jak szybko zobaczę wyniki?",
        a: "Wdrożenie trwa 7-21 dni. System obsługi klienta zaczyna odpowiadać od dnia 1. Pipeline Machine - pierwsze spotkania w 3-4 tygodniu. SEO Content - ruch zaczyna rosnąć w 60 dni.",
      },
      {
        q: "Czy potrzebuję wiedzy technicznej?",
        a: "Zero. Jeśli potrafisz otworzyć maila, dasz radę. Wdrażam, konfiguruję i utrzymuję. Twój czas przy setup: 1-2 godziny. Reszta to moja praca.",
      },
    ],
  },
  {
    category: "Ceny i warunki",
    items: [
      {
        q: "Ile to kosztuje?",
        a: "Zależy od produktu. Inwestycja zaczyna się od 900 PLN/mies - mniej niż 1 dzień pracy pracownika. Pipeline Machine działa w modelu pay-per-meeting - zero stałych opłat, płacisz tylko za spotkania które się odbędą. Szczegóły na stronach poszczególnych produktów.",
      },
      {
        q: "Czy muszę mieć duży budżet żeby zacząć?",
        a: "Nie. Zaczynasz od jednego systemu który rozwiązuje Twój największy problem. Widzisz wyniki, dodajesz kolejne. 50% zaliczki na start, reszta po wdrożeniu. Przy 2+ produktach rabat 15%.",
      },
      {
        q: "Co jeśli nie zadziała?",
        a: "Gwarancja wyników lub pełny zwrot kosztów. Wyniki definiujemy razem przed startem, konkretne liczby, konkretny termin. Nie dowieziemy? Zwracamy pieniądze. 50% zaliczki, reszta po wdrożeniu. Ryzyko jest po mojej stronie.",
      },
    ],
  },
  {
    category: "Bezpieczeństwo i zaufanie",
    items: [
      {
        q: "Czy AI nie pomyli się i nie zrazi moich klientów?",
        a: "System odpowiada tylko na podstawie Twojej bazy wiedzy, nie wymyśla. Jeśli nie zna odpowiedzi, przekazuje do Twojego zespołu z pełnym kontekstem rozmowy. Masz pełną kontrolę nad tym co system mówi.",
      },
      {
        q: "A co z RODO i bezpieczeństwem danych?",
        a: "Dane przetwarzane na serwerach w EU. System zgodny z RODO i AI Act. Dane Twoich klientów nie trenują AI, zostają w Twoim systemie.",
      },
      {
        q: "Ktoś mnie już oszukał z AI. Czemu mam Ci zaufać?",
        a: "Dlatego: 50% zaliczki, reszta po wdrożeniu. Gwarancja wyników lub pełny zwrot. 5.0 na Google. Na rozmowie pokażę dokładnie co dostajesz i jaki wynik jest realny. 15 minut, sam ocenisz.",
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
  "Pipeline Machine: 0 spotkań w 45 dni - zwrot setup",
  "Wyniki poniżej ustaleń, zwrot kosztów",
  "Chcesz zrezygnować? Jeden mail, bez kar, bez okresu wypowiedzenia",
];

export const COST_TABLE_SUMMARY = "Suma: 18,000-39,000 PLN miesięcznie na ręczne czynności. Z nami: od 2,400 PLN. Reszta zostaje w Twojej kieszeni.";

export const VALUE_STACK_SAVINGS = [
  {
    area: "Sprzedaż",
    before: "Handlowiec + agencja + ads = 100-300k PLN/rok",
    after: "Pipeline Machine od 500 PLN/spotkanie, zero stałych opłat",
  },
  {
    area: "Obsługa klienta",
    before: "pracownik = 96-108k PLN/rok",
    after: "system od 10,800 PLN/rok (oszczędność 85-90%)",
  },
  {
    area: "Content",
    before: "copywriter = 60-96k PLN/rok",
    after: "system od 12,000 PLN/rok (3x więcej artykułów)",
  },
  {
    area: "Oferty",
    before: "10-20h Twojego czasu/mies",
    after: "5 minut per oferta",
  },
];
