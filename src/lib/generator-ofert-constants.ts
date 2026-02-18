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
    text: "Jeszcze więcej zapytań, jeszcze więcej chaosu, jeszcze mniej czasu. Ty robisz oferty zamiast prowadzić firmę. Klienci czekają, a część po prostu idzie do kogoś, kto odpowiedział szybciej.",
  },
  {
    time: "Za rok",
    text: "Konkurent z systemem przejmuje klientów, których Ty nie zdążyłeś obsłużyć. Nie dlatego, że jest lepszy. Dlatego, że jego klienci sami mogą wycenić usługę na stronie. A Twoi muszą czekać na Twojego handlowca.",
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
    title: "Klient sam wycenia na Twojej stronie",
    desc: "Klient wchodzi na chat lub formularz na Twojej stronie. Sam wybiera co potrzebuje — wymiary, materiały, zakres prac. Koniec z telefonami 'a jaki wymiar?'. W STARTER to link do chatu, w GROWTH — dedykowana aplikacja na Twojej domenie (np. wyceny.twojafirma.pl).",
  },
  {
    num: 2,
    title: "AI wycenia w sekundy",
    desc: "Baza Twoich produktów i usług (RAG). System zna Twoje ceny, marże, rabaty. Kalkuluje w sekundy to, co Tobie zajmuje godzinę. Od GROWTH — automatycznie generuje 3 warianty cenowe (Basic / Standard / Premium), żeby klient miał wybór.",
  },
  {
    num: 3,
    title: "Profesjonalny PDF trafia do klienta",
    desc: "Z Twoim logo, Twoimi kolorami, Twoim stylem. Nie generyczny szablon z 2005 roku. Wygląda, jakby robiła to agencja za 5 tysięcy. Klient dostaje ofertę na maila automatycznie.",
  },
  {
    num: 4,
    title: "System pilnuje follow-upu za Ciebie",
    desc: "Od GROWTH — automatyczny follow-up po 3 i 7 dniach. Od SCALE — tracking otwarć: wiesz KIEDY klient otworzył ofertę. Nie musisz pamiętać — system pilnuje za Ciebie.",
  },
];

export const GEN_OFERT_DELIVERABLES = [
  {
    title: "STARTER — Chat wycenowy",
    items: [
      "Chat n8n (link lub embed na stronie) — klient sam wprowadza dane",
      "Baza Twoich produktów i usług (RAG) — system zna Twoje ceny, materiały, warianty",
      "1 szablon PDF z logo Twojej firmy — Twój brand, Twoje kolory",
      "Automatyczna wysyłka wyceny mailem do klienta",
      "Historia wszystkich wycen w Google Sheets",
      "Unlimited wycen i użytkowników końcowych",
    ],
  },
  {
    title: "GROWTH — Dedykowana aplikacja",
    items: [
      "Wszystko ze STARTER +",
      "Dedykowana aplikacja Next.js na Twojej domenie (np. wyceny.twojafirma.pl)",
      "3 szablony PDF dobierane automatycznie z inputu klienta",
      "3 warianty cenowe auto (Basic / Standard / Premium)",
      "Follow-up automatyczny po 3 i 7 dniach",
      "1 integracja CRM (oferty lądują w Twoim systemie)",
      "Cotygodniowy raport z analizą wycen na maila",
    ],
  },
  {
    title: "SCALE — Konfigurator wszędzie",
    items: [
      "Wszystko z GROWTH +",
      "Unlimited szablonów PDF",
      "Tracking otwarć oferty (wiesz kiedy klient otworzył)",
      "Embed widget na Twoją stronę (konfigurator jako element strony)",
      "QR code do konfiguratora (showroom, targi, ulotki)",
      "Dodatkowe integracje (ERP, kalendarz, inne systemy)",
      "Dedykowany Account Manager",
    ],
  },
];

export const GEN_OFERT_TARGET_SEGMENTS = [
  {
    icon: "Sun" as const,
    title: "OZE / Fotowoltaika",
    desc: "Wycena instalacji wymaga analizy dachu, doboru paneli, kalkulacji ROI. Każda wycena to 2-3 godziny. Z naszym konfiguratorem klient sam wycenia na Twojej stronie — Ty dostajesz gotowe zapytanie z PDF.",
  },
  {
    icon: "Sofa" as const,
    title: "Producenci mebli na wymiar",
    desc: "Każda szafa, kuchnia, garderoba to indywidualny projekt. Klient sam wybiera materiały, wymiary, wykończenie — system kalkuluje automatycznie. Zero błędów w kalkulacji materiałów.",
  },
  {
    icon: "Hammer" as const,
    title: "Firmy remontowo-budowlane",
    desc: "Kosztorys to kombinacja materiałów, robocizny, podwykonawców. Zwykle robi go właściciel wieczorami. Z konfiguratorem — klient sam podaje zakres prac, system generuje kosztorys w 5 minut.",
  },
  {
    icon: "Wrench" as const,
    title: "Firmy usługowe B2B",
    desc: "Klimatyzacje, okna, ogrodzenia, wyposażenie biur. Jeśli klienci muszą czekać na Twoją ręczną wycenę — daj im konfigurator. Wyceniają sami, Ty dostajesz gotowe zapytanie.",
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
      label: "Self-service",
      saas: "Nie — handlowiec musi ręcznie tworzyć oferty",
      ours: "Tak — klient sam wycenia na Twojej stronie/w chacie",
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
      ours: "Automatyczny po 3 i 7 dniach (od GROWTH)",
    },
    {
      label: "Warianty cenowe",
      saas: "Ręcznie tworzysz każdy wariant",
      ours: "3 warianty auto (Basic/Standard/Premium) od GROWTH",
    },
    {
      label: "Dedykowana domena",
      saas: "Nie — generyczny URL narzędzia",
      ours: "Tak — wyceny.twojafirma.pl (od GROWTH)",
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
    desc: "Tworzymy szablony ofert w Twoim stylu — z Twoim logo, kolorami, formatem. Budujemy bazę produktów/usług (RAG). Konfigurujemy chat wycenowy lub dedykowaną aplikację. Ustawiamy integracje.",
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
    desc: "Uruchamiamy na produkcji. Szkolimy Ciebie i zespół — 1h szkolenia, video do odtworzenia. Konfigurujemy embed na stronie lub QR code na showroom.",
    yourTime: "1-2h",
  },
  {
    week: "Po wdrożeniu",
    title: "Optymalizacja i rozwój",
    desc: "Cotygodniowy raport z analizą wycen (od GROWTH). Dodajemy nowe produkty/usługi. Rozwijamy system — nowe szablony, integracje. Upsell: Voice Agent na tej samej bazie wiedzy.",
    yourTime: "5 min/tydzień",
  },
];

export const GEN_OFERT_SETUP_PLANS = [
  {
    name: "SCALE",
    subtitle: "Konfigurator wszędzie",
    setup: "14,000",
    mrr: "2,000",
    features: [
      "Wszystko z GROWTH +",
      "Unlimited szablonów PDF",
      "Tracking otwarć oferty",
      "Embed widget na stronę (konfigurator jako element)",
      "QR code (showroom, targi, ulotki)",
      "Dodatkowe integracje (ERP, kalendarz)",
      "Dedykowany Account Manager",
    ],
    delivery: "14-21 dni",
    desc: "Dla firm z showroomem, targami, wieloma kanałami. Konfigurator dostępny wszędzie.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "GROWTH",
    subtitle: "Dedykowana aplikacja + CRM",
    setup: "9,000",
    mrr: "1,500",
    features: [
      "Dedykowana app Next.js (wyceny.twojafirma.pl)",
      "3 szablony PDF (dobierane z inputu)",
      "3 warianty cenowe auto (Basic/Standard/Premium)",
      "Follow-up automatyczny po 3 i 7 dniach",
      "1 integracja CRM",
      "Cotygodniowy raport z analizą wycen",
      "Unlimited wycen",
    ],
    delivery: "10-14 dni",
    desc: "Dla firm, które chcą profesjonalny konfigurator na własnej domenie z auto follow-upem i CRM.",
    valueNote: "Wartość zawartości planu: ~25,000 PLN. Twoja inwestycja: 9,000 PLN.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "STARTER",
    subtitle: "Chat wycenowy + PDF",
    setup: "5,000",
    mrr: "800",
    features: [
      "Chat n8n (link lub embed na stronie)",
      "1 szablon PDF z Twoim logo",
      "Baza produktów/usług (RAG)",
      "Wysyłka wyceny mailem",
      "Historia wycen w Google Sheets",
      "Unlimited wycen",
    ],
    delivery: "7-10 dni",
    desc: "Dla firm, które chcą przetestować self-service wyceny. Solidny start — klient sam wycenia przez chat.",
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
        features: "Kalkulator ROI, baza paneli/falowników, chat wycenowy",
      },
      {
        name: "OZE Pro",
        setup: "10,000 PLN",
        mrr: "1,500 PLN/mies",
        features: "+ Dedykowana app, warianty cenowe, follow-up, CRM sync",
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
        features: "Kalkulacja materiałów, biblioteka dostawców, chat wycenowy",
      },
      {
        name: "Meble Pro",
        setup: "11,000 PLN",
        mrr: "1,500 PLN/mies",
        features: "+ Dedykowana app, warianty cenowe, follow-up, CRM sync",
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
        features: "Szablon kosztorysu, baza materiałów, chat wycenowy",
      },
      {
        name: "Remonty Pro",
        setup: "9,500 PLN",
        mrr: "1,500 PLN/mies",
        features: "+ Dedykowana app, warianty cenowe, follow-up, CRM sync",
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
        a: "80% logiki wycen jest identyczna w każdej branży: dane wejściowe, kalkulacja, szablon. Te 80% automatyzujemy. Pozostałe 20% customizujemy dokładnie pod Twoją specyfikę. Dlatego robimy to done-for-you — nie dajemy Ci narzędzia i 'radzi sobie'. Siedzimy nad Twoimi cennikami, aż system liczy dokładnie tak jak Ty.",
      },
      {
        q: "Czym się różni STARTER od GROWTH?",
        a: "STARTER to chat wycenowy (link, który wysyłasz klientowi lub osadzasz na stronie). GROWTH to profesjonalna aplikacja na Twojej domenie (np. wyceny.twojafirma.pl) z 3 wariantami cenowymi, follow-upem, CRM i cotygodniowym raportem. STARTER to szybki start, GROWTH to pełny system.",
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
        a: "Klienci wolą szybkie oferty. Profesjonalny PDF w 5 minut vs ręczna wycena w 2 godziny — klient nie widzi różnicy w jakości. Widzi, że dostał ofertę tego samego dnia zamiast za 3 dni. A jeśli chcesz dodać osobistą notatkę — system generuje bazę, Ty dodajesz ludzki touch w 1 minutę.",
      },
      {
        q: "Za drogo.",
        a: "Policz: 20 ofert miesięcznie x 2 godziny = 40 godzin. 40h x Twoja stawka godzinowa = ile? Najczęściej wychodzi 4,000-6,000 PLN miesięcznie straconego czasu. U nas setup zwraca się w niecałe 2 miesiące. A system pracuje na Ciebie latami. Pytanie nie brzmi 'czy mnie na to stać' — pytanie brzmi 'czy stać mnie na to, żeby tego NIE mieć'.",
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
        q: "Czy klient musi coś instalować żeby skorzystać z konfiguratora?",
        a: "Nie. Klient wchodzi na link lub na Twoją stronę i od razu może wycenić usługę. Bez rejestracji, bez logowania, bez instalacji. W STARTER to chat, w GROWTH to dedykowana aplikacja webowa. Działa na telefonie, tablecie i komputerze.",
      },
      {
        q: "A co z RODO i bezpieczeństwem danych?",
        a: "Dane przetwarzane na serwerach w EU. RODO wbudowane. Twoje dane nie trenują żadnego modelu AI. Pełna dokumentacja i umowa DPA przy podpisaniu. Możemy podpisać NDA, zanim pokażesz nam cenniki.",
      },
      {
        q: "Mogę później dodać Voice Agenta do tego systemu?",
        a: "Tak. Voice Agent podpina się pod tę samą bazę wiedzy (RAG). Klient dzwoni, agent wycenia przez telefon i wysyła PDF na maila. Dodatkowy setup od 3,500 PLN + 1,200 PLN/mies. Ta sama logika wycen, inny interfejs.",
      },
    ],
  },
];

export const GEN_OFERT_GUARANTEES = [
  {
    title: "100% zwrot setup, jeśli nie wdrożymy w 14 dni",
    desc: "Obiecujemy terminy i się ich trzymamy. Jeśli nie dostarczymy w ustalonym czasie — oddajemy cały setup. Bez 'ale', bez 'bo klient nie odpisał'. Nasz problem.",
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
