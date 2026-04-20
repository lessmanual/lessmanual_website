export const GEN_OFERT_CALENDLY_URL = "https://cal.com/bartłomiej-chudzik-2en6pt";
export const GEN_OFERT_EMAIL = "kontakt@lessmanual.ai";

export const GEN_OFERT_ROTATOR_WORDS = ["automatycznie", "bez Excela", "z Twoim logo"];

export const GEN_OFERT_PROOF_METRICS = [
  { value: "96%", label: "oszczędności czasu (2h → 5 min)", countTo: 96, suffix: "%" },
  { value: "+25-40%", label: "win rate dzięki szybkości odpowiedzi", countTo: 40, suffix: "%" },
  { value: "~300%", label: "ROI w pierwszym kwartale", countTo: 300, suffix: "%" },
];

export { PROOF_OFFER_META as GEN_OFERT_PROOF_META } from "./social-proof";

export const GEN_OFERT_COST_TABLE = [
  {
    task: "20 ofert miesięcznie x 2 godziny",
    result: "40 godzin straconych na wyceny - cały tydzień pracy",
  },
  {
    task: "Klient wysyła zapytanie do 3 firm",
    result: "kto odpowie pierwszy, ten wygrywa - Ty odpowiadasz 'jutro'",
  },
  {
    task: "Nie wiesz ile ofert wysłałeś",
    result: "nie wiesz które otworzył klient, nie wiesz dlaczego 70% nie wraca",
  },
  {
    task: "Handlowiec 'zapomniał' zadzwonić",
    result: "pipeline to czarna dziura - zero kontroli nad procesem",
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
    title: "Klient wchodzi na Twój konfigurator",
    desc: "Link na stronie, QR code w showroomie, lub embed widget. Klient wybiera parametry - metraż, materiały, zakres. Bez rejestracji, bez formularzy 'zostaw numer to oddzwonimy'.",
  },
  {
    num: 2,
    title: "AI generuje ofertę na żywo",
    desc: "System zna Twój cennik, materiały, marże. Na podstawie inputu klienta dobiera szablon, liczy warianty cenowe (Basic/Standard/Premium), generuje profesjonalny PDF z Twoim logo.",
  },
  {
    num: 3,
    title: "Oferta ląduje u klienta i u Ciebie",
    desc: "Klient dostaje PDF na maila w ciągu minuty. Ty dostajesz powiadomienie + pełny kontekst w CRM. Zero ręcznych czynności.",
  },
  {
    num: 4,
    title: "Follow-up idzie automatycznie",
    desc: "Po 3 dniach system wysyła follow-up. Po 7 dniach kolejny. Handlowiec dostaje alert gdy klient otworzy ofertę. Nie tracisz leadów bo ktoś 'zapomniał'.",
  },
];

export const GEN_OFERT_DELIVERABLES = [
  {
    title: "STARTER - Chat wycenowy",
    items: [
      "Chat wycenowy (link lub embed na stronie), klient sam wprowadza dane",
      "Baza Twoich produktów i usług (RAG), system zna Twoje ceny, materiały, warianty",
      "1 szablon PDF z logo Twojej firmy, Twój brand, Twoje kolory",
      "Automatyczna wysyłka wyceny mailem do klienta",
      "Historia wszystkich wycen w Google Sheets",
      "Unlimited wycen i użytkowników końcowych",
    ],
  },
  {
    title: "GROWTH - Dedykowana aplikacja",
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
    title: "SCALE - Konfigurator wszędzie",
    items: [
      "Wszystko z GROWTH +",
      "Unlimited szablonów PDF",
      "Tracking otwarć oferty (wiesz kiedy klient otworzył)",
      "Embed widget na Twoją stronę (konfigurator jako element strony)",
      "QR code do konfiguratora (showroom, targi, ulotki)",
      "Dodatkowe integracje (ERP, kalendarz, inne systemy)",
      "Dedykowany opiekun klienta",
    ],
  },
];

export const GEN_OFERT_TARGET_SEGMENTS = [
  {
    icon: "Sun" as const,
    title: "OZE / Fotowoltaika",
    desc: "Wycena instalacji wymaga analizy dachu, doboru paneli, kalkulacji ROI. Każda wycena to 2-3 godziny. Z naszym konfiguratorem klient sam wycenia na Twojej stronie, a Ty dostajesz gotowe zapytanie z PDF.",
  },
  {
    icon: "Sofa" as const,
    title: "Producenci mebli na wymiar",
    desc: "Każda szafa, kuchnia, garderoba to indywidualny projekt. Klient sam wybiera materiały, wymiary, wykończenie, a system kalkuluje automatycznie. Zero błędów w kalkulacji materiałów.",
  },
  {
    icon: "Hammer" as const,
    title: "Firmy remontowo-budowlane",
    desc: "Kosztorys to kombinacja materiałów, robocizny, podwykonawców. Zwykle robi go właściciel wieczorami. Z konfiguratorem klient sam podaje zakres prac, system generuje kosztorys w 5 minut.",
  },
  {
    icon: "Wrench" as const,
    title: "Firmy usługowe B2B",
    desc: "Klimatyzacje, okna, ogrodzenia, wyposażenie biur. Jeśli klienci muszą czekać na Twoją ręczną wycenę, daj im konfigurator. Wyceniają sami, Ty dostajesz gotowe zapytanie.",
  },
];

export const GEN_OFERT_COMPARISON_TABLE = {
  headers: ["", "Narzędzia SaaS", "LessManual"],
  rows: [
    {
      label: "Model",
      saas: "DIY, sam konfigurujesz, uczysz się, utrzymujesz",
      ours: "Done-for-you, my budujemy, Ty dostajesz gotowe",
    },
    {
      label: "Setup",
      saas: "0 PLN (ale tygodnie konfiguracji Twojego czasu)",
      ours: "5,000-14,000 PLN (ale 0 Twojego czasu na config)",
    },
    {
      label: "Self-service",
      saas: "Nie, handlowiec musi ręcznie tworzyć oferty",
      ours: "Tak, klient sam wycenia na Twojej stronie/w chacie",
    },
    {
      label: "Baza wiedzy RAG",
      saas: "Nie, ręcznie wprowadzasz produkty",
      ours: "Tak, AI zna Twoje ceny, materiały, marże",
    },
    {
      label: "Kalkulacja",
      saas: "Podstawowa, kwoty wpisujesz sam",
      ours: "Automatyczna, na podstawie logiki Twojego biznesu",
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
      saas: "Nie, generyczny URL narzędzia",
      ours: "Tak, wyceny.twojafirma.pl (od GROWTH)",
    },
    {
      label: "Support",
      saas: "Tickety w języku angielskim",
      ours: "Dedykowany opiekun po polsku, zna Twój biznes",
    },
    {
      label: "Czas do działania",
      saas: "Tygodnie/miesiące (sam musisz wszystko zrobić)",
      ours: "7-14 dni (my robimy, Ty zatwierdzasz)",
    },
  ],
};

export const GEN_OFERT_PROCESS_STEPS = [
  {
    week: "Onboarding (30 minut)",
    title: "Przesyłasz cennik, szablony, FAQ",
    desc: "Przesyłasz cennik, szablony ofert, FAQ. Definiujesz zmienne (co klient może wybrać). Określasz warianty cenowe i marże. To wszystko co od Ciebie potrzebujemy na start.",
    yourTime: "30 minut",
  },
  {
    week: "Tydzień 1",
    title: "Konfiguracja i budowa",
    desc: "Budujemy konfigurator pod Twój cennik. Generujemy szablony PDF z Twoim brandingiem. Konfigurujemy bazę wiedzy RAG. Ustawiamy integracje (CRM, maile, follow-up).",
    yourTime: "0 minut",
  },
  {
    week: "Tydzień 1-2",
    title: "Testy na Twoich danych",
    desc: "Testujemy system na 3-5 scenariuszach z Twoich prawdziwych wycen. Sprawdzamy poprawność kalkulacji. Wprowadzamy poprawki. Dostajesz link testowy do sprawdzenia.",
    yourTime: "30 minut na testy",
  },
  {
    week: "Tydzień 2 (max 14 dni)",
    title: "Go live",
    desc: "Embed na stronie lub link do konfiguratora. Integracja z CRM aktywna. Follow-upy ustawione. Dostajesz instrukcję i nagranie wideo jak obsługiwać system.",
    yourTime: "0 minut",
  },
];

export const GEN_OFERT_SETUP_PLANS = [
  {
    name: "STARTER",
    subtitle: "Chat wycenowy + PDF",
    targetAudience: "Na start, testujesz AI w firmie",
    setup: "5,000",
    mrr: "800",
    features: [
      "Chat wycenowy (link lub embed na stronie)",
      "1 szablon PDF z Twoim logo",
      "Baza produktów/usług (RAG)",
      "Wysyłka wyceny mailem",
      "Historia wycen w Google Sheets",
      "Unlimited wycen",
    ],
    delivery: "7-10 dni",
    desc: "Dla firm, które chcą przetestować self-service wyceny. Solidny start, klient sam wycenia przez chat.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "GROWTH",
    subtitle: "Dedykowana aplikacja + CRM",
    targetAudience: "Na poważnie, skalujesz sprzedaż/obsługę",
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
    valueNote: "Najczęściej wybierany. Setup zwraca się w niecałe 2 miesiące.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "SCALE",
    subtitle: "Konfigurator wszędzie",
    targetAudience: "Full stack, automatyzacja całego procesu",
    setup: "14,000",
    mrr: "1,800",
    features: [
      "Wszystko z GROWTH +",
      "Unlimited szablonów PDF",
      "Tracking otwarć oferty",
      "Embed widget na stronę (konfigurator jako element)",
      "QR code (showroom, targi, ulotki)",
      "Dodatkowe integracje (ERP, kalendarz)",
      "Dedykowany opiekun klienta",
    ],
    delivery: "14-21 dni",
    desc: "Dla firm z showroomem, targami, wieloma kanałami. Konfigurator dostępny wszędzie.",
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
    category: "Wdrożenie i działanie",
    items: [
      {
        q: "Ile trwa wdrożenie?",
        a: "7-14 dni od onboardingu. Onboarding to 30 minut - przesyłasz cennik, szablony, FAQ. Resztę ogarniamy my.",
      },
      {
        q: "Czy muszę mieć stronę internetową?",
        a: "Nie. STARTER działa jako link (możesz wysyłać go klientom mailem, na WhatsAppie, gdziekolwiek). Od GROWTH masz dedykowaną subdomenę.",
      },
      {
        q: "Ile kosztuje utrzymanie?",
        a: "Abonament miesięczny (800-1,800 PLN/mies w zależności od pakietu). W cenie wsparcie techniczne, aktualizacje, hosting. Zero ukrytych kosztów.",
      },
      {
        q: "Czy system się integruje z moim CRM?",
        a: "Od pakietu GROWTH - tak. Wspieramy większość popularnych CRM (Pipedrive, HubSpot, Firmao). Niestandardowe integracje w pakiecie SCALE.",
      },
    ],
  },
  {
    category: "Cennik i techniczne",
    items: [
      {
        q: "A co jeśli mój cennik jest skomplikowany?",
        a: "Im bardziej skomplikowany cennik, tym więcej zyskujesz na automatyzacji. System obsługuje cenniki z dziesiątkami zmiennych - metraż, materiały, wykończenia, opcje dodatkowe. Konfigurujemy pod Twoją specyfikę.",
      },
      {
        q: "Czy klient musi się rejestrować?",
        a: "Nie. Klient podaje email na końcu (żeby dostać ofertę PDF) - to wszystko. Bez rejestracji, bez kont, bez barier.",
      },
      {
        q: "Co z danymi moich klientów?",
        a: "Dane na serwerach w EU (GCP europe-west). RODO compliant. Twoje dane to Twoje dane - pełny eksport w dowolnym momencie.",
      },
      {
        q: "Mogę zmienić pakiet?",
        a: "Tak. Upgrade w dowolnym momencie (dopłata proporcjonalna). Downgrade z końcem okresu rozliczeniowego.",
      },
    ],
  },
];

export const GEN_OFERT_GUARANTEES = [
  {
    title: "Gwarancja wdrożenia: 100% zwrot setup jeśli nie wdrożymy w 14 dni",
    desc: "Nie wdrożymy w 14 dni = 100% zwrot setup. Bez pytań. Przelew w 7 dni.",
  },
  {
    title: "30 dni trial",
    desc: "Przez 30 dni testujesz system na żywo z prawdziwymi klientami. Nie działa? Rezygnujesz bez konsekwencji.",
  },
  {
    title: "Gwarancja ROI: 200% w 90 dni lub następny miesiąc gratis",
    desc: "ROI 200% w 90 dni lub następny miesiąc gratis. Liczone twardo na danych z systemu.",
  },
];
