export const OBS_KLIENTA_CALENDLY_URL = "https://cal.com/bartłomiej-chudzik-2en6pt";
export const OBS_KLIENTA_EMAIL = "kontakt@lessmanual.ai";

export const OBS_KLIENTA_ROTATOR_WORDS = ["zatrudniania", "nadgodzin", "stresu"];

export const OBS_KLIENTA_PROOF_METRICS = [
  { value: "60-80%", label: "zapytań obsłużonych automatycznie", countTo: 80, suffix: "%" },
  { value: "<30s", label: "średni czas odpowiedzi (vs 4-24h bez systemu)", countTo: 30, suffix: "s" },
  { value: "500-1000%", label: "ROI w pierwszym roku", countTo: 1000, suffix: "%" },
];

export { PROOF_OFFER_META as OBS_KLIENTA_PROOF_META } from "./social-proof";

export const OBS_KLIENTA_COST_TABLE = [
  {
    task: "O 3 w nocy ktoś pisze na WhatsAppie",
    result: "Nikt nie odpowiada. Klient idzie do konkurencji.",
  },
  {
    task: '"Gdzie moja paczka?" x 30 razy dziennie',
    result: "70% zapytań to FAQ. 30h tygodniowo na kopiuj-wklej.",
  },
  {
    task: "Etat obsługi: 8,000-9,000 PLN/mies",
    result: "I tak nie pracuje 24/7. L4 w szczycie sezonu = problem.",
  },
  {
    task: "Mail się rozjeżdża, WhatsApp to chaos",
    result: "Tracisz klientów bo nie odpowiadasz wystarczająco szybko.",
  },
];

export const OBS_KLIENTA_AGITATION_TIMEFRAMES = [
  {
    time: "Za 3 miesiące",
    text: "Twoja konkurencja odpowiada w 30 sekund. Ty w 4 godziny. Klienci przyzwyczajają się do natychmiastowych odpowiedzi. Firmy bez systemu wypadają z gry po cichu.",
  },
  {
    time: "Za 6 miesięcy",
    text: "Kolejne miesiące z 8-9 tysiącami na etat obsługi, który wciąż odpowiada na 'ile kosztuje?' po raz trzydziesty. A Twój najlepszy pracownik odchodzi, bo ma dość.",
  },
  {
    time: "Za rok",
    text: "Konkurencja z systemem przejmuje Twoich klientów - nie dlatego, że jest lepsza. Dlatego, że odpowiada szybciej. 24/7. Na każdym kanale.",
  },
];

export const OBS_KLIENTA_AGITATION_COSTS = [
  "Stracone zapytania o 3 w nocy = klienci u konkurencji",
  "30 godzin tygodniowo Twojego zespołu na kopiuj-wklej",
  "8,000-9,000 PLN miesięcznie na etat, który nie pracuje 24/7",
];

export const OBS_KLIENTA_SOLUTION_STEPS = [
  {
    num: 1,
    title: "Chatbot RAG - odpowiada TYLKO z Twoich danych",
    desc: "Bot nie wymyśla. Odpowiada wyłącznie na podstawie Twojej bazy wiedzy (FAQ, regulamin, cennik, procedury). Nie wie? Eskaluje do człowieka z pełnym kontekstem rozmowy. Zero halucynacji.",
    tier: "Od STARTER",
  },
  {
    num: 2,
    title: "Multi-channel - jeden bot, wszystkie kanały",
    desc: "Strona internetowa, WhatsApp, email. Klient pisze gdzie chce, bot odpowiada w 30 sekund. Spójna obsługa, bez przełączania się między 5 narzędziami.",
    tier: "Od GROWTH",
  },
  {
    num: 3,
    title: "Voice Agent - recepcjonistka która nigdy nie idzie na L4",
    desc: "AI odbiera telefon 24/7. Polski głos, naturalny. Kwalifikuje rozmówcę, odpowiada na FAQ, umawia spotkania w kalendarzu, wysyła SMS z potwierdzeniem. Nagrania i transkrypcje każdej rozmowy.",
    tier: "SCALE",
  },
];

export const OBS_KLIENTA_DELIVERABLES = [
  {
    title: "STARTER - Chat (1 kanał)",
    items: [
      "Chatbot na stronę internetową",
      "RAG na FAQ Twojej firmy",
      "500 konwersacji/mies",
      "Eskalacja do człowieka",
      "Wdrożenie: 7-10 dni",
    ],
  },
  {
    title: "GROWTH - Multi-channel",
    items: [
      "Wszystko ze STARTER +",
      "WhatsApp Business integration",
      "Email triage (automatyczna kategoryzacja + odpowiedzi)",
      "2,000 konwersacji/mies",
      "Integracja CRM",
      "Raport CSAT miesięcznie",
      "Wdrożenie: 10-14 dni",
    ],
  },
  {
    title: "SCALE - Full Suite + Voice Agent",
    items: [
      "Wszystko z GROWTH +",
      "Voice Agent (AI recepcjonistka 24/7, polski głos)",
      "Unlimited konwersacje",
      "Wielojęzyczność",
      "Custom integracje",
      "24/7 monitoring",
      "Nagrania i transkrypcje rozmów",
      "Wdrożenie: 14-21 dni",
    ],
  },
];

export const OBS_KLIENTA_TARGET_SEGMENTS = [
  {
    icon: "ShoppingCart" as const,
    title: "E-commerce (1000+ zamówień/mies)",
    desc: "'Gdzie moja paczka?' x 200 dziennie? System odpowiada natychmiast, integruje się ze śledzeniem zamówień.",
  },
  {
    icon: "Stethoscope" as const,
    title: "Kliniki i gabinety medyczne",
    desc: "Umawianie wizyt, przypomnienia SMS, odpowiedzi o godziny, cennik, dostępność. RODO wbudowane.",
  },
  {
    icon: "Hotel" as const,
    title: "Hotele i HoReCa",
    desc: "Rezerwacje, wielojęzyczność, FAQ, system obsługuje gości w ich języku, 24/7. Integracja z PMS.",
  },
  {
    icon: "Briefcase" as const,
    title: "Firmy usługowe B2B",
    desc: "30+ zapytań dziennie o cennik, terminy, dostępność? System odpowiada natychmiast. Ty zamykasz deale.",
  },
];

export const OBS_KLIENTA_COMPARISON_TABLE = {
  headers: ["", "Pracownik obsługi", "Nasz system"],
  rows: [
    { label: "Koszt miesięczny", cols: ["8,000-9,000 PLN (1 etat)", "900-2,200 PLN"] },
    { label: "Dostępność", cols: ["8h/dzień, pon-pt", "24/7/365"] },
    { label: "Kanały", cols: ["1-2 max", "Web + WhatsApp + Email + Telefon"] },
    { label: "Czas odpowiedzi", cols: ["4-24h (mail)", "<30 sekund"] },
    { label: "Skalowanie", cols: ["Kolejny etat = kolejne 9k", "Bez limitu konwersacji (SCALE)"] },
    { label: "L4 w szczycie sezonu", cols: ["Tak", "Nie"] },
  ],
};

export const OBS_KLIENTA_PROCESS_STEPS = [
  {
    week: "Tydzień 1",
    title: "Analiza i zbieranie danych",
    desc: "Zbieramy Twoje FAQ, dokumenty, regulaminy, cennik, procedury. Mapujemy najczęstsze pytania klientów. Twój czas: max 2 godziny.",
    yourTime: "2 godziny",
  },
  {
    week: "Tydzień 1-2",
    title: "Konfiguracja i trening systemu",
    desc: "Budujemy bazę wiedzy. Konfigurujemy kanały (chat, WhatsApp, email, telefon, zależnie od pakietu). Testujemy wewnętrznie, 200+ scenariuszy.",
    yourTime: "0h, my robimy",
  },
  {
    week: "Tydzień 2-3",
    title: "Testy z Tobą",
    desc: "Testujesz z nami na żywo. Próbujemy go 'złamać', najtrudniejsze pytania z Twojej branży. Poprawiamy w czasie rzeczywistym.",
    yourTime: "1-2 godziny",
  },
  {
    week: "Po uruchomieniu",
    title: "Go live + monitoring",
    desc: "System zaczyna obsługiwać klientów. Śledzimy pytania, rozbudowujemy bazę wiedzy. Co miesiąc raport: zapytania, czas, CSAT.",
    yourTime: "5 min/tydzień",
  },
];

export const OBS_KLIENTA_SETUP_PLANS = [
  {
    name: "STARTER",
    subtitle: "Chat (1 kanał)",
    targetAudience: "Dla firm które chcą zacząć od jednego kanału i zobaczyć wyniki",
    setup: "5,000",
    mrr: "900",
    features: [
      "Chatbot na stronę internetową",
      "RAG na FAQ Twojej firmy",
      "500 konwersacji/mies",
      "Eskalacja do człowieka",
      "Wdrożenie: 7-10 dni",
    ],
    delivery: "7-10 dni",
    desc: "Dla firm, które chcą zacząć od jednego kanału i zobaczyć wyniki.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "GROWTH",
    subtitle: "Multi-channel ⭐ NAJPOPULARNIEJSZY",
    targetAudience: "Dla firm z zapytaniami na wielu kanałach. Jeden bot, spójna obsługa",
    setup: "10,000",
    mrr: "1,500",
    features: [
      "Wszystko ze STARTER +",
      "WhatsApp Business integration",
      "Email triage (automatyczna kategoryzacja + odpowiedzi)",
      "2,000 konwersacji/mies",
      "Integracja CRM",
      "Raport CSAT miesięcznie",
      "Wdrożenie: 10-14 dni",
    ],
    delivery: "10-14 dni",
    desc: "Dla firm z zapytaniami na wielu kanałach. Jeden bot, spójna obsługa.",
    valueNote: "Najczęściej wybierany. Pracownik obsługi kosztuje 8-9k/mies. System: 1,500 PLN.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "SCALE",
    subtitle: "Full Suite + Voice Agent",
    targetAudience: "Dla firm z dużym wolumenem i potrzebą obsługi telefonicznej",
    setup: "15,000",
    mrr: "2,200",
    features: [
      "Wszystko z GROWTH +",
      "Voice Agent (AI recepcjonistka 24/7, polski głos)",
      "Unlimited konwersacje",
      "Wielojęzyczność",
      "Custom integracje",
      "24/7 monitoring",
      "Nagrania i transkrypcje rozmów",
      "Wdrożenie: 14-21 dni",
    ],
    delivery: "14-21 dni",
    desc: "Dla firm z dużym wolumenem i potrzebą obsługi telefonicznej.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
];

export const OBS_KLIENTA_INDUSTRY_VARIANTS = {
  ecommerce: {
    title: "E-commerce",
    desc: "Fokus: status zamówienia, zwroty, tracking, rekomendacje produktowe. Bot odpowiada na 'gdzie moja paczka?' 500 razy dziennie, a Twój zespół zajmuje się tym co naprawdę ważne.",
    tiers: [
      {
        name: "E-com Basic",
        setup: "5,000 PLN",
        mrr: "1,000 PLN/mies",
        features: "Integracja ze śledzeniem zamówień, zwroty, FAQ",
      },
      {
        name: "E-com Pro",
        setup: "10,000 PLN",
        mrr: "1,800 PLN/mies",
        features: "+ Rekomendacje produktowe, WhatsApp, email triage",
      },
    ],
  },
  medycyna: {
    title: "Przychodnie i medycyna",
    desc: "Fokus: umawianie wizyt, przypomnienia, FAQ medyczne, Voice Agent jako recepcjonistka. Pacjent dzwoni o 22:00 - AI odbiera, umawia termin, wysyła SMS z potwierdzeniem.",
    tiers: [
      {
        name: "Med Basic",
        setup: "6,000 PLN",
        mrr: "1,200 PLN/mies",
        features: "Umawianie wizyt, FAQ, zgodność RODO",
      },
      {
        name: "Med Pro",
        setup: "12,000 PLN",
        mrr: "2,000 PLN/mies",
        features: "+ Przypomnienia SMS, Voice Agent, integracja z systemem medycznym",
      },
    ],
  },
  horeca: {
    title: "Hotele i HoReCa",
    desc: "Fokus: rezerwacje, informacje o obiekcie, wielojęzyczność dla gości zagranicznych, concierge bot. Gość pisze na WhatsAppie po angielsku - bot odpowiada po angielsku. Pisze po niemiecku - odpowiada po niemiecku.",
    tiers: [
      {
        name: "Hotel Basic",
        setup: "5,500 PLN",
        mrr: "1,000 PLN/mies",
        features: "Rezerwacje, wielojęzyczność, FAQ",
      },
      {
        name: "Hotel Pro",
        setup: "11,000 PLN",
        mrr: "1,800 PLN/mies",
        features: "+ Upselling, concierge bot, integracja z PMS",
      },
    ],
  },
};

export const OBS_KLIENTA_FAQ_ITEMS = [
  {
    category: "Wdrożenie i technologia",
    items: [
      {
        q: "Ile trwa wdrożenie?",
        a: "STARTER: 7-10 dni. GROWTH: 10-14 dni. SCALE: 14-21 dni. Potrzebujemy od Ciebie FAQ i materiały firmy - resztę robimy my.",
      },
      {
        q: "Co jeśli bot odpowie źle?",
        a: "Bot odpowiada TYLKO na podstawie Twoich danych (RAG). Nie wymyśla. Jeśli nie zna odpowiedzi, eskaluje do człowieka z pełnym kontekstem rozmowy. Zero halucynacji.",
      },
      {
        q: "Czy mogę zacząć od STARTER i potem rozszerzyć?",
        a: "Tak. Większość klientów zaczyna od chatbota na stronę, widzi wyniki, i dorzuca kolejne kanały. Przejście na wyższy tier to kwestia konfiguracji, nie budowania od zera.",
      },
      {
        q: "Jak wygląda Voice Agent?",
        a: "AI odbiera telefon 24/7 naturalnym polskim głosem. Kwalifikuje rozmówcę, odpowiada na FAQ, umawia spotkania w kalendarzu, wysyła SMS z potwierdzeniem. Każda rozmowa nagrana i transkrybowana.",
      },
    ],
  },
  {
    category: "Integracje, dane i rozliczenia",
    items: [
      {
        q: "Czy integrujecie się z moim CRM?",
        a: "Tak. Integrujemy z popularnymi CRM-ami (HubSpot, Pipedrive, Salesforce, custom). Od tieru GROWTH w standardzie.",
      },
      {
        q: "Co z RODO?",
        a: "Dane przetwarzane zgodnie z RODO. Serwery w UE. Podpisujemy umowę powierzenia danych.",
      },
      {
        q: "Ile to jest konwersacji - 500 czy 2,000?",
        a: "Jedna konwersacja = jeden wątek z klientem (bez względu na liczbę wiadomości w wątku). 500/mies w STARTER wystarczy dla większości małych firm. 2,000 w GROWTH dla firm z większym ruchem. SCALE = bez limitu.",
      },
      {
        q: "Czym się różnicie od Tidio czy Intercomu?",
        a: "RAG (odpowiedzi z Twoich danych, nie generyczne), Voice Agent (AI na telefon), pełne done-for-you (my budujemy, nie Ty), polski support. I nie zostawiamy Cię z systemem - rozwijamy go razem.",
      },
    ],
  },
];

export const OBS_KLIENTA_GUARANTEES = [
  {
    title: "Gwarancja wdrożenia",
    desc: "Nie wdrożymy w 14 dni = pełny zwrot setup. Bez pytań. Przelew w 7 dni.",
  },
  {
    title: "Gwarancja jakości",
    desc: "30 dni trial. Nie podoba Ci się jakość odpowiedzi bota po 7 dniach? Pełny zwrot. Bez pytań.",
  },
  {
    title: "Gwarancja ROI",
    desc: "ROI 200% w 90 dni albo następny miesiąc gratis. Liczone twardo na danych z dashboardu.",
  },
];
