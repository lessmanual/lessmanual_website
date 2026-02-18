export const GEN_OFERT_CALENDLY_URL = "https://cal.com/bartlomiej-chudzik-2en6pt";
export const GEN_OFERT_EMAIL = "kontakt@lessmanual.ai";

export const GEN_OFERT_ROTATOR_WORDS = ["automatycznie", "bez Excela", "z Twoim logo"];

export const GEN_OFERT_PROOF_METRICS = [
  { value: "96%", label: "mniej czasu (2h → 5 min)", countTo: 96, suffix: "%" },
  { value: "+25-40%", label: "win rate (szybsza oferta wygrywa)", countTo: 40, suffix: "%" },
  { value: "7-21 dni", label: "do działającego systemu", countTo: 21, suffix: " dni" },
];

export const GEN_OFERT_PROOF_META = "10+ wdrożeń | 5.0 na Google | Zostały 2 miejsca w marcu";

export const GEN_OFERT_COST_TABLE = [
  {
    task: "20 ofert miesięcznie x 2 godziny",
    result: "40 godzin straconych na wyceny",
  },
  {
    task: "40 godzin",
    result: "cały tydzień pracy. Miesięcznie. Na same oferty.",
  },
  {
    task: "40h x Twoja stawka godzinowa",
    result: "tyle tracisz co miesiąc (z systemem to 1h 40 min)",
  },
  {
    task: "Każdy klient, który nie wrócił",
    result: "bo oferta przyszła za późno",
  },
];

export const GEN_OFERT_AGITATION_TIMEFRAMES = [
  {
    time: "Za pół roku",
    text: "Jeszcze więcej zapytań, jeszcze więcej chaosu, jeszcze mniej czasu. Twój handlowiec robi oferty zamiast sprzedawać. Ty robisz oferty zamiast prowadzić firmę.",
  },
  {
    time: "Za rok",
    text: "Konkurent z systemem przejmuje klientów, których Ty nie zdążyłeś obsłużyć. Nie dlatego, że jest lepszy. Dlatego, że jest szybszy.",
  },
  {
    time: "Każdy tydzień",
    text: "Każda oferta wysłana za późno to stracony deal. Nie jeden. Nie dwa. Każdy tydzień. A najgorsze? Wiesz o tym. Tylko nie masz czasu tego zmienić, bo cały czas robisz te oferty.",
  },
];

export const GEN_OFERT_AGITATION_COSTS = [
  "~10 godzin tygodniowo straconych na wyceny",
  "2-3 oferty wysłane za późno",
  "1-2 deale zamknięte przez konkurencję, która odpowiada szybciej",
];

export const GEN_OFERT_SOLUTION_STEPS = [
  {
    num: 1,
    title: "Konfigurator online (formularz lub chatbot)",
    desc: "Klient sam wybiera, co potrzebuje — wymiary, materiały, zakres prac. Na Twojej stronie lub w linku, który wysyłasz. Koniec z telefonami „a jaki wymiar?”, „a jaki materiał?”.",
  },
  {
    num: 2,
    title: "AI wycenia w sekundy",
    desc: "Baza Twoich produktów i usług. System zna Twoje ceny, marże, rabaty. Kalkuluje w sekundy to, co Tobie zajmuje godzinę. W planie SCALE — automatycznie generuje 3 warianty cenowe (Basic / Standard / Premium), żeby klient miał wybór.",
  },
  {
    num: 3,
    title: "Profesjonalny PDF trafia do klienta",
    desc: "Z Twoim logo, Twoimi kolorami, Twoim stylem. Nie generyczny szablon z 2005 roku. Wygląda, jakby robiła to agencja za 5 tysięcy.",
  },
  {
    num: 4,
    title: "Wiesz, co się dzieje po wysłaniu",
    desc: "Tracking otwarć: wiesz KIEDY klient otworzy ofertę. System automatycznie wysyła follow-up. Nie musisz pamiętać — system pilnuje za Ciebie we właściwym momencie.",
  },
];

export const GEN_OFERT_DELIVERABLES = [
  {
    title: "System pod klucz (wszystkie plany)",
    items: [
      "Konfigurator online (formularz lub chatbot) — klient sam wprowadza dane.",
      "Baza Twoich produktów i usług (RAG) — system zna Twoje ceny, materiały, warianty.",
      "Profesjonalny PDF z logo Twojej firmy — Twój brand, Twoje kolory.",
      "Historia wszystkich wycen — filtruj po kliencie, dacie, kwocie.",
      "5 szablonów branżowych ofert — gotowe formaty dla OZE, mebli, remontów i więcej.",
    ],
  },
  {
    title: "Od planu GROWTH",
    items: [
      "Tracking otwarć oferty — wiesz, kiedy klient otwiera Twoją ofertę.",
      "E-podpis Autenti — klient podpisuje ofertę online. Jeden klik i gotowe.",
      "Follow-up automatyczny — system wysyła przypomnienie, gdy klient otworzył ofertę.",
      "Integracja CRM — oferty automatycznie lądują w Twoim CRM.",
    ],
  },
  {
    title: "Od planu SCALE",
    items: [
      "3 warianty cenowe automatycznie (Basic / Standard / Premium) — wyższy średni ticket.",
      "Unlimited integracje + API — połączenie z dowolnym systemem.",
      "Dedykowany Account Manager — Twój opiekun, który zna Twój biznes.",
    ],
  },
];

export const GEN_OFERT_TARGET_SEGMENTS = [
  {
    icon: "Sun" as const,
    title: "OZE / Fotowoltaika",
    desc: "Wycena instalacji wymaga analizy dachu, doboru paneli, kalkulacji ROI. Każda wycena to 2-3 godziny. System robi to w minuty — z bazą paneli, falowników i aktualnych cen.",
  },
  {
    icon: "Sofa" as const,
    title: "Producenci mebli na wymiar",
    desc: "Każda szafa, kuchnia, garderoba to indywidualny projekt. Błędy w kalkulacji materiałów? System je eliminuje. Baza materiałów, automatyczna kalkulacja, zero pomyłek.",
  },
  {
    icon: "Hammer" as const,
    title: "Firmy remontowo-budowlane",
    desc: "Kosztorys to kombinacja materiałów, robocizny, podwykonawców. Zwykle robi go właściciel wieczorami. Z systemem — każdy w firmie generuje kosztorys w 5 minut.",
  },
  {
    icon: "Wrench" as const,
    title: "Firmy usługowe B2B",
    desc: "Klimatyzacje, okna, ogrodzenia, wyposażenie biur. Jeśli robisz wyceny ofertowe ręcznie i tracisz na to godziny — system jest dla Ciebie.",
  },
];

export const GEN_OFERT_COMPARISON_TABLE = {
  headers: ["", "Narzędzia SaaS", "LessManual"],
  rows: [
    {
      label: "Model",
      saas: "DIY — sam konfigurujesz, uczysz się, utrzymujesz",
      ours: "Done-for-you — my budujemy, Ty dostajesz gotowe",
    },
    {
      label: "Setup",
      saas: "0 PLN (ale tygodnie konfiguracji Twojego czasu)",
      ours: "5,000-14,000 PLN (ale 0 Twojego czasu na config)",
    },
    {
      label: "Baza wiedzy RAG",
      saas: "Nie — ręcznie wprowadzasz produkty",
      ours: "Tak — AI zna Twoje ceny, materiały, marże",
    },
    {
      label: "Kalkulacja",
      saas: "Podstawowa — kwoty wpisujesz sam",
      ours: "Automatyczna — na podstawie logiki Twojego biznesu",
    },
    {
      label: "Follow-up",
      saas: "Brak lub podstawowy",
      ours: "Automatyczny — na podstawie otwarcia oferty",
    },
    {
      label: "Warianty cenowe",
      saas: "Ręcznie tworzysz każdy wariant",
      ours: "3 warianty auto (Basic/Standard/Premium)",
    },
    {
      label: "Support",
      saas: "Tickety w języku angielskim",
      ours: "Dedykowany opiekun po polsku, zna Twój biznes",
    },
    {
      label: "Czas do działania",
      saas: "Tygodnie/miesiące (sam musisz wszystko zrobić)",
      ours: "7-21 dni (my robimy, Ty zatwierdzasz)",
    },
  ],
};

export const GEN_OFERT_PROCESS_STEPS = [
  {
    week: "Tydzień 1",
    title: "Zbieramy dane",
    desc: "Rozmawiamy o Twoich produktach, usługach, cenach. Zbieramy cenniki, katalogi, materiały. Projektujemy logikę wycen — co od czego zależy, jakie warianty, jakie marże.",
    yourTime: "2-3 godziny na rozmowy",
  },
  {
    week: "Tydzień 1-2",
    title: "Budujemy konfigurator",
    desc: "Tworzymy szablony ofert w Twoim stylu — z Twoim logo, kolorami, formatem. Budujemy bazę produktów/usług. Konfigurujemy konfigurator online. Ustawiamy integracje.",
    yourTime: "1h na review szablonów",
  },
  {
    week: "Tydzień 2-3",
    title: "Testujemy na prawdziwych wycenach",
    desc: "Testujemy system na realnych scenariuszach z Twojej firmy. Sprawdzamy poprawność kalkulacji. Poprawiamy detale — bo diabeł tkwi w szczegółach.",
    yourTime: "1-2h na testy",
  },
  {
    week: "Tydzień 3",
    title: "Live + szkolenie",
    desc: "Uruchamiamy na produkcji. Szkolimy Ciebie i zespół — 1h szkolenia, video do odtworzenia. Pierwsze oferty generujesz z nami, żeby mieć pewność.",
    yourTime: "1-2h",
  },
  {
    week: "Po wdrożeniu",
    title: "Optymalizacja i rozwój",
    desc: "Optymalizujemy na podstawie danych. Dodajemy nowe produkty/usługi, kiedy potrzebujesz. Rozwijamy system — nowe integracje, funkcje, szablony.",
    yourTime: "5 min/tydzień",
  },
];

export const GEN_OFERT_SETUP_PLANS = [
  {
    name: "SCALE",
    subtitle: "Pełna automatyzacja",
    setup: "14,000",
    mrr: "2,000",
    features: [
      "Unlimited szablonów PDF",
      "Unlimited użytkowników",
      "Konfigurator + baza RAG + historia wycen",
      "Tracking otwarć + e-podpis Autenti + follow-up auto",
      "3 warianty cenowe automatycznie (Basic / Standard / Premium)",
      "Unlimited integracje + API",
      "Dedykowany Account Manager",
    ],
    delivery: "14-21 dni",
    desc: "Dla firm z zespołem handlowym i agresywnymi celami.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "GROWTH",
    subtitle: "Email + tracking + e-podpis",
    setup: "9,000",
    mrr: "1,500",
    features: [
      "5 szablonów PDF, 5 użytkowników",
      "Konfigurator + baza RAG + historia wycen",
      "Tracking otwarć oferty",
      "E-podpis Autenti",
      "Follow-up automatyczny",
      "1 integracja CRM",
    ],
    delivery: "10-14 dni",
    desc: "Dla firm, które chcą zamykać deale szybciej dzięki trackingowi i follow-upom.",
    valueNote: "Wartość zawartości planu w przeliczeniu na usługi: ~25,000 PLN. Twoja inwestycja: 9,000 PLN.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "STARTER",
    subtitle: "Konfigurator + PDF",
    setup: "5,000",
    mrr: "800",
    features: [
      "2 szablony PDF, 2 użytkowników",
      "Konfigurator online + baza produktów/usług (RAG)",
      "Historia wycen",
    ],
    delivery: "7-10 dni",
    desc: "Dla firm, które chcą przetestować automatyzację wycen. Solidny start.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
];

export const GEN_OFERT_INDUSTRY_VARIANTS = {
  oze: {
    title: "OZE / Fotowoltaika",
    tiers: [
      {
        name: "OZE Starter",
        setup: "5,500 PLN",
        mrr: "800 PLN/mies",
        features: "Kalkulator ROI, baza paneli, PDF oferta",
      },
      {
        name: "OZE Pro",
        setup: "10,000 PLN",
        mrr: "1,500 PLN/mies",
        features: "+ Wizualizacja na dachu, mobilna app, tracking, follow-up",
      },
    ],
  },
  meble: {
    title: "Meble na wymiar",
    tiers: [
      {
        name: "Meble Basic",
        setup: "6,000 PLN",
        mrr: "900 PLN/mies",
        features: "Kalkulacja materiałów, biblioteka dostawców, PDF",
      },
      {
        name: "Meble Pro",
        setup: "11,000 PLN",
        mrr: "1,500 PLN/mies",
        features: "+ Wersjonowanie, integracja CAD, tracking, follow-up",
      },
    ],
  },
  remonty: {
    title: "Firmy remontowo-budowlane",
    tiers: [
      {
        name: "Remonty Basic",
        setup: "5,500 PLN",
        mrr: "800 PLN/mies",
        features: "Szablon kosztorysu, baza materiałów, PDF",
      },
      {
        name: "Remonty Pro",
        setup: "9,500 PLN",
        mrr: "1,500 PLN/mies",
        features: "+ Integracja z systemami kosztorysowymi, tracking",
      },
    ],
  },
};

export const GEN_OFERT_FAQ_ITEMS = [
  {
    category: "O produkcie i wdrożeniu",
    items: [
      {
        q: "Mój biznes jest za skomplikowany na automatyzację ofert.",
        a: "80% logiki wycen jest identyczna w każdej branży: dane wejściowe, kalkulacja, szablon. Te 80% automatyzujemy. Pozostałe 20% customizujemy dokładnie pod Twoją specyfikę. Dlatego robimy to done-for-you — nie dajemy Ci narzędzia i „radzi sobie”. Siedzimy nad Twoimi cennikami, aż system liczy dokładnie tak jak Ty.",
      },
      {
        q: "Mam już CRM / Excela / własny system.",
        a: "Super. Integrujemy się z tym, co masz. Ale odpowiedz sobie na jedno pytanie: czy Twój Excel generuje profesjonalny PDF, trackuje, kiedy klient go otwiera i automatycznie wysyła follow-up? Jeśli tak — nie potrzebujesz nas. Jeśli nie — porozmawiajmy. System nie zastępuje Twojego CRM. Uzupełnia go o to, czego nie potrafi.",
      },
      {
        q: "Ile trwa wdrożenie?",
        a: "STARTER: 7-10 dni roboczych. GROWTH: 10-14 dni. SCALE: 14-21 dni. Twoje zaangażowanie to 5-7 godzin w ciągu całego wdrożenia. Resztę robimy my. A jeśli nie wdrożymy w terminie — zwracamy 100% setup. Na piśmie.",
      },
      {
        q: "Czy to zadziała w mojej branży?",
        a: "Jeśli robisz wyceny ofertowe ręcznie — tak. Budujemy warianty branżowe dla OZE, mebli na wymiar, firm remontowo-budowlanych. Ale system działa wszędzie tam, gdzie wycena wymaga kalkulacji: klimatyzacje, okna, ogrodzenia, wyposażenie biur. Napisz — powiemy, czy możemy pomóc.",
      },
    ],
  },
  {
    category: "O płatnościach i ryzyku",
    items: [
      {
        q: "Moi klienci wolą oferty przygotowane ręcznie, indywidualnie.",
        a: "Klienci wolą szybkie oferty. Profesjonalny PDF w 5 minut vs ręczna wycena w 2 godziny — klient nie widzi różnicy w jakości. Widzi, że dostał ofertę tego samego dnia zamiast za 3 dni. A jeśli chcesz dodać osobistą notatkę — możesz. System generuje bazę, Ty dodajesz ludzki touch. 1 minuta zamiast 2 godzin.",
      },
      {
        q: "Za drogo.",
        a: "Policz: 20 ofert miesięcznie x 2 godziny = 40 godzin. 40h x Twoja stawka godzinowa = ile? Najczęściej wychodzi 4,000-6,000 PLN miesięcznie straconego czasu. U nas setup zwraca się w niecałe 2 miesiące. A system pracuje na Ciebie latami. Pytanie nie brzmi „czy mnie na to stać” — pytanie brzmi „czy stać mnie na to, żeby tego NIE mieć”.",
      },
      {
        q: "Ktoś mnie już raz oszukał z AI.",
        a: "Rozumiem. Dlatego: 50% zaliczki na start, reszta po wdrożeniu. Jeśli nie wdrożymy w 14 dni — 100% zwrot setup. 30 dni trial — nie działa, nie płacisz reszty. 5.0 na Google. Nie mamy czego się bać, bo wiemy, że to działa.",
      },
    ],
  },
  {
    category: "Kwestie techniczne",
    items: [
      {
        q: "A co z RODO i bezpieczeństwem danych?",
        a: "Dane przetwarzane na serwerach w EU. RODO wbudowane. Twoje dane nie trenują żadnego modelu AI. Pełna dokumentacja i umowa DPA przy podpisaniu. Możemy podpisać NDA, zanim pokażesz nam cenniki.",
      },
    ],
  },
];

export const GEN_OFERT_GUARANTEES = [
  {
    title: "100% zwrot setup, jeśli nie wdrożymy w 14 dni",
    desc: "Obiecujemy terminy i się ich trzymamy. Jeśli nie dostarczymy w ustalonym czasie — oddajemy cały setup. Bez „ale”, bez „bo klient nie odpisał”. Nasz problem.",
  },
  {
    title: "30 dni trial",
    desc: "Używasz systemu przez 30 dni. Jeśli nie widzisz wartości — nie płacisz reszty za setup. Bez negocjacji, bez przekonywania. Wystarczy jeden mail.",
  },
  {
    title: "ROI 200% w 90 dni",
    desc: "Jeśli system nie przyniesie Ci co najmniej dwukrotności tego, co płacisz — następny miesiąc gratis. Mierzymy razem. Liczymy razem. Dane są Twoje — widzisz wszystko.",
  },
];
