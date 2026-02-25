export const OBS_KLIENTA_CALENDLY_URL = "https://cal.com/bartłomiej-chudzik-2en6pt";
export const OBS_KLIENTA_EMAIL = "kontakt@lessmanual.ai";

export const OBS_KLIENTA_ROTATOR_WORDS = ["zatrudniania", "nadgodzin", "stresu"];

export const OBS_KLIENTA_PROOF_METRICS = [
  { value: "60-80%", label: "zapytań rozwiązanych automatycznie", countTo: 80, suffix: "%" },
  { value: "<30s", label: "czas odpowiedzi (vs 4-24h dziś)", countTo: 30, suffix: "s" },
  { value: "500-1000%", label: "ROI w pierwszym roku", countTo: 1000, suffix: "%" },
];

export const OBS_KLIENTA_PROOF_META = "13 wdrożeń | 5.0 na Google | Max 3 projekty miesięcznie";

export const OBS_KLIENTA_COST_TABLE = [
  {
    task: "30 zapytań dziennie x 5 minut",
    result: "2.5 godziny dziennie na powtarzalne pytania",
  },
  {
    task: "2.5h x 20 dni roboczych",
    result: "50 godzin miesięcznie straconych na FAQ",
  },
  {
    task: "50h x 45 PLN/h (Twoja stawka)",
    result: "2,250 PLN wyrzucone na powtarzalną robotę",
  },
  {
    task: "Każdy nieodebrany telefon",
    result: "to klient, który zadzwonił do konkurencji",
  },
];

export const OBS_KLIENTA_AGITATION_TIMEFRAMES = [
  {
    time: "Za 3 miesiące",
    text: "Twoja konkurencja odpowiada w 30 sekund. Ty w 4 godziny. Klienci przyzwyczajają się do natychmiastowych odpowiedzi. Firmy bez systemu wypadają z gry po cichu.",
  },
  {
    time: "Za 6 miesięcy",
    text: "Kolejne 120,000 PLN w utraconych szansach. Kolejne 300 godzin straconych na powtarzalne pytania. A Twój najlepszy pracownik odchodzi, bo ma dość odpowiadania na 'ile kosztuje?' 30 razy dziennie.",
  },
  {
    time: "Za rok",
    text: "240,000 PLN utraconych szans. 600 godzin straconych. Konkurencja z systemem przejmuje Twoich klientów — nie dlatego, że jest lepsza. Dlatego, że odpowiada szybciej.",
  },
];

export const OBS_KLIENTA_AGITATION_COSTS = [
  "10 straconych zapytań tygodniowo x 500 PLN = 5,000 PLN/tydzień",
  "20,000 PLN miesięcznie w utraconych szansach",
  "240,000 PLN rocznie które mogły być Twoje",
];

export const OBS_KLIENTA_SOLUTION_STEPS = [
  {
    num: 1,
    title: "Chatbot na stronę",
    desc: "Widget na Twojej stronie. Klient wchodzi, pyta — dostaje odpowiedź w sekundy. Konkretna odpowiedź z Twojego FAQ, cennika, regulaminu. Nie 'przepraszam, czekaj na konsultanta'.",
    tier: "Od STARTER",
  },
  {
    num: 2,
    title: "WhatsApp Bot",
    desc: "Twoi klienci i tak piszą na WhatsApp. Teraz dostaną odpowiedź natychmiast — automatycznie, z tych samych danych co chatbot na stronie.",
    tier: "Od GROWTH",
  },
  {
    num: 3,
    title: "Auto-sortowanie maili",
    desc: "System czyta maile, kategoryzuje, odpowiada na te powtarzalne. Te wymagające Twojej uwagi — przekazuje Ci posegregowane, z kontekstem. Koniec z przebijaniem się przez 200 maili rano.",
    tier: "Od GROWTH",
  },
  {
    num: 4,
    title: "Voice Agent — AI recepcjonistka",
    desc: "Odbiera telefony 24/7. Naturalny polski głos. Kwalifikuje rozmówcę, odpowiada na pytania, umawia spotkania w kalendarzu, wysyła SMS z potwierdzeniem.",
    tier: "SCALE",
  },
];

export const OBS_KLIENTA_DELIVERABLES = [
  {
    title: "STARTER — Chat",
    items: [
      "Widget chatbot na stronę (LUB WhatsApp — 1 kanał do wyboru)",
      "System wytrenowany na FAQ Twojej firmy (RAG)",
      "500 konwersacji miesięcznie",
      "Eskalacja do człowieka z pełnym kontekstem",
      "Wdrożenie: 7-10 dni",
    ],
  },
  {
    title: "GROWTH — Multi-channel",
    items: [
      "Wszystko ze STARTER +",
      "Chat na stronie + WhatsApp + Email",
      "Auto-sortowanie maili (auto-kategoryzacja i odpowiedzi)",
      "2,000 konwersacji miesięcznie",
      "Integracja z CRM",
      "Miesięczny raport CSAT",
      "Wdrożenie: 10-14 dni",
    ],
  },
  {
    title: "SCALE — Full Suite + Voice",
    items: [
      "Wszystko z GROWTH +",
      "Voice Agent — AI recepcjonistka 24/7",
      "Unlimited konwersacje",
      "Wielojęzyczność",
      "Custom integracje",
      "Monitoring 24/7",
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
    desc: "Rezerwacje, wielojęzyczność, FAQ — system obsługuje gości w ich języku, 24/7. Integracja z PMS.",
  },
  {
    icon: "Briefcase" as const,
    title: "Firmy usługowe B2B",
    desc: "30+ zapytań dziennie o cennik, terminy, dostępność? System odpowiada natychmiast. Ty zamykasz deale.",
  },
];

export const OBS_KLIENTA_COMPARISON_TABLE = {
  headers: ["", "Tidio", "InteliWISE", "KODA.AI", "Custom boty PL", "LessManual"],
  rows: [
    { label: "Model", cols: ["SaaS (DIY)", "SaaS (DIY)", "SaaS (DIY)", "Jednorazowy", "Done-for-you"] },
    { label: "Setup", cols: ["0 PLN", "?", "?", "3,500-35,000 PLN", "5,000-18,000 PLN"] },
    { label: "MRR", cols: ["97-2,996 PLN", "1,299+ PLN", "800-2,500 PLN", "—", "900-2,500 PLN"] },
    { label: "Wdrożenie", cols: ["Ty sam", "Ty sam", "Ty sam", "Zależy", "My robimy"] },
    { label: "RAG (Twoje dane)", cols: ["Ograniczone", "Ograniczone", "Tak", "Zależy", "Full"] },
    { label: "Voice Agent", cols: ["Nie", "Nie", "Nie", "50,000-350,000 PLN", "W SCALE"] },
    { label: "WhatsApp", cols: ["Częściowo", "Ograniczone", "Ograniczone", "Zależy", "Od GROWTH"] },
    { label: "Auto-sortowanie maili", cols: ["Nie", "Nie", "Nie", "Zależy", "Od GROWTH"] },
    { label: "Kto konfiguruje", cols: ["Ty", "Ty", "Ty", "Developer", "My"] },
    { label: "Gwarancja ROI", cols: ["Nie", "Nie", "Nie", "Nie", "200% w 90 dni"] },
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
    desc: "Budujemy bazę wiedzy. Konfigurujemy kanały — chat, WhatsApp, email, telefon (zależnie od pakietu). Testujemy wewnętrznie — 200+ scenariuszy.",
    yourTime: "0h — my robimy",
  },
  {
    week: "Tydzień 2-3",
    title: "Testy z Tobą",
    desc: "Testujesz z nami na żywo. Próbujemy go 'złamać' — najtrudniejsze pytania z Twojej branży. Poprawiamy w czasie rzeczywistym.",
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
    targetAudience: "Na start — testujesz AI w firmie",
    setup: "5,000",
    mrr: "900",
    features: [
      "Chatbot na stronę LUB WhatsApp (1 kanał do wyboru)",
      "System wytrenowany na FAQ (RAG)",
      "500 konwersacji/mies",
      "Eskalacja do człowieka z kontekstem",
      "Wdrożenie: 7-10 dni",
    ],
    delivery: "7-10 dni",
    desc: "Dla firm, które chcą zacząć od jednego kanału. Solidny start z AI obsługą.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "GROWTH",
    subtitle: "Multi-channel",
    targetAudience: "Na poważnie — skalujesz sprzedaż/obsługę",
    setup: "10,000",
    mrr: "1,500",
    features: [
      "Chat + WhatsApp + Email",
      "Auto-sortowanie maili (auto-kategoryzacja)",
      "2,000 konwersacji/mies",
      "Integracja z CRM",
      "Raport CSAT miesięcznie",
      "Wdrożenie: 10-14 dni",
    ],
    delivery: "10-14 dni",
    desc: "Dla firm obsługujących klientów na wielu kanałach. Jeden system na wszystko.",
    valueNote: "Najczęściej wybierany. Pracownik obsługi kosztuje 8-9k/mies. System: 1,500 PLN.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "SCALE",
    subtitle: "Full Suite + Voice Agent",
    targetAudience: "Full stack — automatyzacja całego procesu",
    setup: "15,000",
    mrr: "2,200",
    features: [
      "Wszystko z GROWTH +",
      "Voice Agent — AI recepcjonistka 24/7",
      "Unlimited konwersacje",
      "Wielojęzyczność",
      "Custom integracje",
      "Monitoring 24/7",
      "Wdrożenie: 14-21 dni",
    ],
    delivery: "14-21 dni",
    desc: "Pełna automatyzacja obsługi na wszystkich kanałach, włącznie z telefonem.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
];

export const OBS_KLIENTA_INDUSTRY_VARIANTS = {
  ecommerce: {
    title: "E-commerce",
    tiers: [
      {
        name: "E-com Basic",
        setup: "5,000 PLN",
        mrr: "1,000 PLN/mies",
        features: "Integracja z koszykiem, śledzenie zamówień, FAQ",
      },
      {
        name: "E-com Pro",
        setup: "10,000 PLN",
        mrr: "1,800 PLN/mies",
        features: "+ Rekomendacje produktów, abandoned cart recovery",
      },
    ],
  },
  medycyna: {
    title: "Kliniki / Medycyna",
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
        features: "+ Przypomnienia SMS, integracja z systemem medycznym",
      },
    ],
  },
  horeca: {
    title: "Hotele / HoReCa",
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
        features: "+ Upselling, integracja z PMS",
      },
    ],
  },
};

export const OBS_KLIENTA_FAQ_ITEMS = [
  {
    category: "O produkcie i technologii",
    items: [
      {
        q: "Czy AI nie będzie wymyślać odpowiedzi? Słyszałem, że chatboty halucynują.",
        a: "System odpowiada WYŁĄCZNIE na podstawie Twoich danych — FAQ, regulaminu, cennika. Nie szuka w internecie. Nie zgaduje. Jeśli nie zna odpowiedzi — mówi wprost i przekazuje rozmowę do człowieka.",
      },
      {
        q: "Nie zrazi mi klientów? Bot to bot.",
        a: "System nie udaje człowieka. Ale odpowiada szybko, konkretnie i bez błędów. A jeśli klient chce rozmawiać z człowiekiem? Jedno kliknięcie — Twój zespół przejmuje rozmowę z pełnym kontekstem.",
      },
      {
        q: "Czy Voice Agent w SCALE brzmi naturalnie?",
        a: "Naturalny polski głos. Klienci nie odróżniają od prawdziwej recepcjonistki. Umów się na demo — pokażemy Ci na żywo.",
      },
      {
        q: "Ile zapytań obsłuży?",
        a: "STARTER: 500 konwersacji/mies. GROWTH: 2,000 konwersacji/mies. SCALE: unlimited. Dla 90% firm GROWTH wystarcza na start.",
      },
      {
        q: "Czy integruje się z moim CRM / systemem zamówień?",
        a: "Od GROWTH — tak. Obsługujemy integracje z najpopularniejszymi CRM-ami (Salesforce, HubSpot, Pipedrive, Firmao). SCALE obejmuje custom integracje.",
      },
    ],
  },
  {
    category: "O płatnościach i ryzyku",
    items: [
      {
        q: "A co z RODO? Dane klientów są bezpieczne?",
        a: "Dane przetwarzane w EU. RODO wbudowane od pierwszego dnia. Dane Twoich klientów nie trenują żadnego modelu AI. Podpiszemy umowę powierzenia danych (DPA).",
      },
      {
        q: "Nie mam czasu na wdrożenie.",
        a: "Nie musisz mieć. Ty odpowiadasz na nasze pytania — max 2 godziny Twojego czasu w całym procesie. My robimy resztę.",
      },
      {
        q: "Co jeśli coś się zepsuje?",
        a: "Support w godzinach roboczych (STARTER/GROWTH) lub monitoring 24/7 (SCALE). SLA na naprawę. System jest monitorowany — wiemy o problemie zanim Ty go zauważysz.",
      },
    ],
  },
  {
    category: "Kwestie techniczne",
    items: [
      {
        q: "Muszę coś instalować? Zmieniać stronę?",
        a: "Nie. Chatbot to widget — jedna linijka kodu na Twojej stronie. WhatsApp i email integrujemy po naszej stronie. Voice Agent działa na naszym numerze lub przekierowaniu z Twojego.",
      },
      {
        q: "A jeśli zmienię stronę / CRM / system?",
        a: "Migrujemy system razem z Tobą. To nasza robota — nie zostawimy Cię z niedziałającym chatbotem po zmianie platformy.",
      },
    ],
  },
];

export const OBS_KLIENTA_GUARANTEES = [
  {
    title: "100% zwrot setup, jeśli nie wdrożymy w 14 dni",
    desc: "Obiecujemy terminy i się ich trzymamy. Jeśli nie dostarczymy — oddajemy cały setup. Bez haczyków.",
  },
  {
    title: "30 dni trial",
    desc: "Używasz systemu przez 30 dni. Jeśli nie widzisz wartości — nie płacisz reszty. Bez negocjacji. Jeden mail.",
  },
  {
    title: "ROI 200% w 90 dni",
    desc: "Jeśli system nie przyniesie Ci co najmniej dwukrotności tego, co płacisz — następny miesiąc gratis.",
  },
  {
    title: "Rezygnacja bez kar",
    desc: "Jeden mail — koniec współpracy. Zero okresu wypowiedzenia, zero kar. Zostajemy, bo dowozimy wyniki, nie dlatego że trzyma Cię umowa.",
  },
];
