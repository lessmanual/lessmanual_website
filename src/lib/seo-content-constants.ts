export const SEO_CALENDLY_URL = "https://cal.com/bartłomiej-chudzik-2en6pt";
export const SEO_EMAIL = "kontakt@lessmanual.ai";

export const SEO_ROTATOR_WORDS = ["czasu", "zespołu", "stresu"];

export const SEO_PROOF_METRICS = [
  { value: "od 83", label: "PLN za artykuł (copywriter: 300-800)", countTo: 83, prefix: "od ", suffix: " PLN" },
  { value: "10-30", label: "artykułów miesięcznie, done-for-you", countTo: 30, suffix: "" },
  { value: "+150-400%", label: "wzrost ruchu organicznego w 6 mies", countTo: 400, suffix: "%" },
];

export const SEO_PROOF_META = "5-14 dni do startu | 30 dni trial | Max 3 projekty miesięcznie";

export const SEO_PROBLEM_BULLETS = [
  {
    num: "01",
    title: "Copywriter za 500 PLN/artykuł",
    desc: "Potrzebujesz 20 wpisów miesięcznie. To 10,000 PLN. Za sam content. Bez strategii, bez SEO, bez publikacji.",
  },
  {
    num: "02",
    title: "Pisać samemu",
    desc: "Jeden porządny artykuł SEO = 4-6 godzin. Razy 20 = 100 godzin miesięcznie. Masz tyle wolnego czasu?",
  },
  {
    num: "03",
    title: "Narzędzia SaaS (Surfer, Jasper, ChatGPT)",
    desc: "Narzędzia są. Ale kto zrobi keyword research? Kto ustawi klastry tematyczne? Kto opublikuje? Kto sprawdzi pozycje? Ty. Sam. Między wszystkim innym.",
  },
  {
    num: "04",
    title: "Zero artykułów = zero ruchu",
    desc: "Płacisz za każde kliknięcie. Wyłączasz reklamy — ruch spada do zera. A konkurencja? Publikuje regularnie i zbiera ruch za darmo.",
  },
];

export const SEO_AGITATION_TIMEFRAMES = [
  {
    time: "Za 3 miesiące",
    text: "Twój konkurent, który publikuje 20 artykułów miesięcznie, będzie miał 60 nowych stron w Google. Ty nadal zero.",
  },
  {
    time: "Za 6 miesięcy",
    text: "Jego artykuły zaczną rankować. Zbiera ruch, leady, zapytania. Ty dalej płacisz za każde kliknięcie.",
  },
  {
    time: "Za rok",
    text: "Pierwsza strona Google w Twojej niszy = on. Ty? Strona 5. Albo w ogóle niewidoczny.",
  },
];

export const SEO_AGITATION_STATS = [
  "Firmy z blogiem generują 67% więcej leadów miesięcznie (Demand Metric)",
  "53% ruchu na stronach B2B to ruch organiczny (BrightEdge)",
  "Koszt leada z SEO jest 61% niższy niż z reklam (HubSpot)",
  "3.5x więcej ruchu przy 16+ wpisach miesięcznie vs 0-4 wpisy (HubSpot)",
];

export const SEO_SOLUTION_STEPS = [
  {
    num: 1,
    title: "Keyword research + strategia",
    desc: "Analizujemy Twoją branżę. Znajdujemy frazy, na które szukają Twoi klienci. Budujemy klastry tematyczne — żeby Google widział Cię jako eksperta, nie autora losowych wpisów. Sprawdzamy konkurencję: na co rankują, czego im brakuje. Tam wchodzimy.",
  },
  {
    num: 2,
    title: "Produkcja contentu (AI + Human)",
    desc: "System generuje 10-30 artykułów miesięcznie. Każdy zoptymalizowany pod SEO: meta tagi, nagłówki H1-H3, linkowanie wewnętrzne, odpowiednia długość. Human-in-the-loop — akceptujesz lub korygujesz. Nie chcesz? Full auto.",
  },
  {
    num: 3,
    title: "Publikacja + monitoring (Google i AI)",
    desc: "Artykuły lądują bezpośrednio na Twoim blogu. Monitorujemy pozycje w Google. Optymalizujemy to, co nie rankuje. Skalujemy to, co przynosi wyniki. Bonus: artykuły pisane w formacie, który cytują ChatGPT, Gemini i Perplexity — structured data, Q&A, konkretne dane. Jedna inwestycja, dwa kanały widoczności.",
  },
];

export const SEO_DELIVERABLES_TABLE = {
  headers: ["Element", "STARTER", "GROWTH", "SCALE"],
  rows: [
    { label: "Keyword research + strategia", starter: true, growth: true, scale: true },
    { label: "Artykuły SEO/mies", starter: "10", growth: "20", scale: "30 (full auto)" },
    { label: "Klastry tematyczne", starter: "1", growth: "3", scale: "Unlimited" },
    { label: "Optymalizacja on-page (meta, H1-H3, linki)", starter: true, growth: true, scale: true },
    { label: "Human-in-the-loop review", starter: true, growth: true, scale: true },
    { label: "Publikacja na blogu", starter: false, growth: true, scale: true },
    { label: "Tracking pozycji w Google", starter: false, growth: true, scale: true },
    { label: "Monthly SEO report", starter: false, growth: true, scale: true },
    { label: "Content calendar 6 mies", starter: false, growth: "2,000 PLN w cenie", scale: true },
    { label: "Monthly SEO audit", starter: false, growth: "1,500 PLN/mies w cenie", scale: true },
    { label: "Competitor gap analysis", starter: false, growth: false, scale: "3,000 PLN w cenie" },
    { label: "AI-ready format (ChatGPT, Gemini, Perplexity)", starter: true, growth: true, scale: true },
    { label: "Dedykowany PM", starter: false, growth: false, scale: true },
  ],
};

export const SEO_BONUS_VALUES = [
  { tier: "STARTER", desc: "keyword research report", value: "2,000 PLN" },
  { tier: "GROWTH", desc: "keyword research + content calendar + monthly SEO audit", value: "5,500 PLN" },
  { tier: "SCALE", desc: "wszystko powyżej + competitor gap analysis", value: "8,500 PLN" },
];

export const SEO_TARGET_SEGMENTS = [
  {
    icon: "Briefcase" as const,
    title: "Firmy B2B usługowe",
    desc: "Konsulting, agencje, software house'y — długi cykl sprzedaży? Blog buduje autorytet i przyciąga leady, które szukają rozwiązań w Google. 20 artykułów/mies = dominacja niszy.",
  },
  {
    icon: "ShoppingCart" as const,
    title: "E-commerce",
    desc: "Opisy kategorii, poradniki zakupowe, porównania produktów. Ruch organiczny zamiast Google Ads. Każdy artykuł to inwestycja, która pracuje latami.",
  },
  {
    icon: "Code2" as const,
    title: "SaaS / Tech",
    desc: "Dokumentacja, tutoriale, porównania z konkurencją, \"jak zrobić X\" — frazy, które Twoi klienci wpisują w Google, zanim kupią.",
  },
  {
    icon: "MapPin" as const,
    title: "Lokalne firmy usługowe",
    desc: "Kliniki, kancelarie, biura rachunkowe — SEO lokalne + blog tematyczny. \"Najlepszy [usługa] w [miasto]\" + artykuły eksperckie = telefon, który dzwoni.",
  },
];

export const SEO_ROI_TABLE = {
  headers: ["", "Copywriter in-house", "Agencja contentowa", "SaaS (Surfer, Jasper)", "LessManual GROWTH"],
  rows: [
    { label: "Artykułów/mies", copywriter: "8-10", agency: "4-12", saas: "DIY", lessmanual: "20" },
    { label: "Koszt/mies", copywriter: "5,000-8,000 PLN", agency: "1,600-5,500 PLN", saas: "300-900 PLN", lessmanual: "1,800 PLN" },
    { label: "Koszt per artykuł", copywriter: "300-800 PLN", agency: "400-500 PLN", saas: "Twój czas", lessmanual: "90 PLN" },
    { label: "Done-for-you?", copywriter: "Tak", agency: "Tak", saas: "Nie", lessmanual: "Tak" },
    { label: "SEO optimization?", copywriter: "Czasem", agency: "Tak", saas: "Tak (DIY)", lessmanual: "Tak" },
    { label: "Klastry tematyczne?", copywriter: "Nie", agency: "Czasem", saas: "Nie", lessmanual: "Tak" },
    { label: "Tracking pozycji?", copywriter: "Nie", agency: "Dodatkowa opłata", saas: "Tak (DIY)", lessmanual: "W cenie" },
    { label: "Skalowanie do 30/mies?", copywriter: "Kolejny etat", agency: "Drogie", saas: "Więcej Twojego czasu", lessmanual: "Upgrade do SCALE" },
  ],
};

export const SEO_COMPARISON_TABLE = {
  headers: ["", "Copywriter", "Agencja contentowa", "SaaS (Surfer/Jasper)", "LessManual"],
  rows: [
    { label: "Model", copywriter: "Freelancer", agency: "Retainer", saas: "DIY + licencja", lessmanual: "Done-for-you" },
    { label: "Koszt/mies", copywriter: "5,000-8,000 PLN", agency: "1,600-5,500 PLN", saas: "300-900 PLN", lessmanual: "1,000-2,500 PLN" },
    { label: "Artykułów", copywriter: "8-10", agency: "4-12", saas: "Ile napiszesz", lessmanual: "10-30" },
    { label: "Keyword research", copywriter: "Nie", agency: "Czasem", saas: "DIY", lessmanual: "W cenie" },
    { label: "Klastry tematyczne", copywriter: "Nie", agency: "Czasem", saas: "Nie", lessmanual: "Tak" },
    { label: "Publikacja", copywriter: "Nie", agency: "Czasem", saas: "Nie", lessmanual: "Od GROWTH" },
    { label: "Tracking pozycji", copywriter: "Nie", agency: "Dodatkowa opłata", saas: "DIY", lessmanual: "Od GROWTH" },
    { label: "SEO audit", copywriter: "Nie", agency: "Dodatkowa opłata", saas: "DIY", lessmanual: "Od GROWTH" },
    { label: "Content calendar", copywriter: "Nie", agency: "Czasem", saas: "Nie", lessmanual: "Od GROWTH" },
    { label: "Skalowalność", copywriter: "Kolejny freelancer", agency: "Drogie", saas: "Twój czas", lessmanual: "Upgrade" },
    { label: "Twój czas", copywriter: "Briefowanie, feedback", agency: "Briefowanie", saas: "4-6h/artykuł", lessmanual: "1-2h na start" },
    { label: "Gwarancja ROI", copywriter: "Nie", agency: "Nie", saas: "Nie", lessmanual: "200% w 90 dni" },
    { label: "Widoczność w AI (ChatGPT, Gemini)", copywriter: "Nie", agency: "Nie", saas: "Nie", lessmanual: "W cenie" },
  ],
};

export const SEO_PROCESS_STEPS = [
  {
    week: "Tydzień 1",
    title: "Keyword research + strategia",
    desc: "Audyt SEO Twojej strony i branży. Analiza słów kluczowych — jakich fraz szukają Twoi klienci. Analiza konkurencji — na co rankują, czego im brakuje, gdzie są luki. Strategia klastrów tematycznych. Akceptujesz kierunek — idziemy dalej.",
    yourTime: "1-2 godziny",
  },
  {
    week: "Tydzień 2",
    title: "Setup + pierwsze artykuły",
    desc: "Konfiguracja systemu pod Twoją branżę, ton i styl. Pierwsze 3-5 artykułów testowych do akceptacji. Twój feedback — korekta tonu, głębokości, stylu. Integracja z Twoim blogiem (WordPress, Webflow, custom — od GROWTH).",
    yourTime: "30 minut na akceptację",
  },
  {
    week: "Tydzień 3-4",
    title: "Pełna produkcja",
    desc: "System wchodzi na pełne obroty. 10-30 artykułów miesięcznie (zależnie od pakietu). Monitorujemy pierwsze indeksacje i pozycje.",
    yourTime: "0 minut",
  },
  {
    week: "Miesiąc 2+",
    title: "Optymalizacja + skalowanie",
    desc: "Analizujemy, co rankuje, co nie. Optymalizujemy artykuły, które są blisko TOP 10. Skalujemy to, co przynosi wyniki. Raport miesięczny z metrykami (od GROWTH).",
    yourTime: "5 minut na przegląd raportu",
  },
];

export const SEO_DELIVERY_TIMES = [
  { plan: "STARTER", time: "5-7 dni" },
  { plan: "GROWTH", time: "7-10 dni" },
  { plan: "SCALE", time: "10-14 dni" },
];

export const SEO_SETUP_PLANS = [
  {
    name: "STARTER",
    subtitle: "Pierwszy krok",
    setupPrice: "3,000",
    monthlyPrice: "1,000",
    perArticle: "~100 PLN/artykuł",
    features: [
      "10 artykułów SEO miesięcznie",
      "1 klaster tematyczny",
      "Keyword research + strategia (wartość 2,000 PLN — w cenie)",
      "Optymalizacja on-page: meta tagi, H1-H3, linkowanie wewnętrzne",
      "Human-in-the-loop review",
    ],
    desc: "Zaczynam blogować. Chcę przetestować, czy to działa.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "GROWTH",
    subtitle: "Poważne SEO",
    setupPrice: "5,000",
    monthlyPrice: "1,800",
    perArticle: "~90 PLN/artykuł",
    features: [
      "Wszystko z STARTER, plus:",
      "20 artykułów miesięcznie",
      "3 klastry tematyczne",
      "Publikacja bezpośrednio na Twoim blogu",
      "Tracking pozycji w Google",
      "Monthly SEO report",
      "Content calendar na 6 miesięcy (wartość 2,000 PLN — w cenie)",
      "Monthly SEO audit (wartość 1,500 PLN/mies — w cenie)",
    ],
    desc: "Poważnie biorę się za SEO. Chcę regularny ruch z Google.",
    valueNote: "Najczęściej wybierany. 20 artykułów za 90 PLN/szt. Copywriter bierze 300-800 PLN.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "SCALE",
    subtitle: "Pełna dominacja",
    setupPrice: "7,000",
    monthlyPrice: "2,500",
    perArticle: "~83 PLN/artykuł",
    features: [
      "Wszystko z GROWTH, plus:",
      "30 artykułów miesięcznie na full auto",
      "Unlimited klastry tematyczne — pokrywasz całą niszę",
      "Competitor content gap analysis (wartość 3,000 PLN — w cenie)",
      "Dedykowany PM — jedna osoba do kontaktu",
      "Content calendar + strategia na 6 miesięcy",
      "AI-ready format — widoczność w ChatGPT, Gemini, Perplexity",
    ],
    desc: "Chcę zdominować wyniki wyszukiwania w mojej niszy.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
];

export const SEO_FAQ_ITEMS = [
  {
    category: "O produkcie i jakości",
    items: [
      {
        q: "Ale przecież AI pisze słabo. Google to wyłapie.",
        a: "Dwa fakty. Pierwszy: Google oficjalnie potwierdził, że content tworzony z pomocą AI jest OK, o ile jest wartościowy dla użytkownika (Helpful Content Update). Nie karze za AI. Karze za spam — niskiej jakości masówkę. Drugi: nasz system to nie \"wrzuć prompt i publikuj\". To AI + human review. Keyword research, klastry tematyczne, optymalizacja on-page, kontrola jakości. Jakość powyżej 80% copywriterów. Za 1/5 ceny.",
      },
      {
        q: "Czy artykuły będą pasować do mojej branży?",
        a: "Każdy artykuł pisany pod Twoją branżę, Twoich klientów i Twoje słowa kluczowe. Na starcie robimy brief branżowy — ton, styl, terminologia. Pierwsze 3-5 artykułów testowych do Twojej akceptacji. Nie pasuje? Korygujemy. Pasuje? Idziemy dalej.",
      },
      {
        q: "Mogę sprawdzić artykuły przed publikacją?",
        a: "Tak. Human-in-the-loop to opcja w każdym pakiecie. Chcesz czytać i akceptować? Dostajesz artykuły do review. Nie chcesz się tym zajmować? Full auto. Twoja decyzja. Możesz zmienić zdanie w dowolnym momencie.",
      },
      {
        q: "A co z ChatGPT i Gemini? Ludzie pytają AI zamiast Google.",
        a: "Dokładnie. I wiesz skąd AI bierze odpowiedzi? Z artykułów, które wysoko rankują w Google. Artykuł na pozycji 1-5 w Google = artykuł cytowany przez ChatGPT, Gemini i Perplexity. Dlatego nasze artykuły piszemy w formacie, który AI uwielbia: structured data, format Q&A, konkretne liczby, jasna struktura. Jedna inwestycja — widoczność w Google I w AI jednocześnie. Nikt inny tego nie oferuje w pakiecie.",
      },
      {
        q: "Mam już bloga. Macie co z nim robić?",
        a: "Nie zaczynamy od zera, jeśli nie musimy. Robimy audyt istniejącego contentu. Uzupełniamy luki — frazy, na które nie masz artykułów. Optymalizujemy stare wpisy pod aktualne standardy SEO. Istniejący blog z historią to przewaga — Google już zna Twoją domenę. Budujemy na tym, co masz.",
      },
    ],
  },
  {
    category: "O płatnościach i wynikach",
    items: [
      {
        q: "SEO nie działa od razu. Muszę czekać pół roku na wyniki?",
        a: "Będę szczery: tak, SEO to maraton. Ale nie zaczynamy od najtrudniejszych fraz. Strategia: niskokonkurencyjne frazy long-tail na start. Efekty: pierwsze indeksacje i impresje w 4-8 tygodni. Widoczne pozycje na łatwiejsze frazy w 2-3 miesiące. Pełne efekty: 6 miesięcy. Im wcześniej zaczniesz, tym wcześniej zbierasz.",
      },
      {
        q: "Za drogo. Nie stać mnie.",
        a: "Policzmy. Copywriter: 5-8k PLN miesięcznie za 8-10 artykułów. Agencja contentowa: 1.6-5.5k PLN za 4-12 artykułów. LessManual: 1-2.5k PLN za 10-30 artykułów. Nasz pakiet GROWTH daje 20 artykułów za 1,800 PLN. To 90 PLN per artykuł. Copywriter bierze 300-800 PLN za jeden. Gdzie tu \"za drogo\"?",
      },
      {
        q: "Muszę to przemyśleć.",
        a: "Rozumiem. Ale przemyśl też to: każdy dzień bez nowego artykułu to pozycje w Google, które zbiera Twoja konkurencja. Artykuł opublikowany dzisiaj zacznie rankować za 2-3 miesiące. Artykuł opublikowany za 3 miesiące — za pół roku. Artykuł nieopublikowany — nigdy. Im dłużej czekasz, tym więcej Cię to kosztuje.",
      },
    ],
  },
  {
    category: "Kwestie techniczne",
    items: [
      {
        q: "Ile czasu ja muszę na to poświęcić?",
        a: "Na początku: 1-2 godziny na brief i akceptację kierunku. Potem: zero. Chyba że chcesz sprawdzać artykuły — wtedy tyle, ile chcesz. System jest zaprojektowany tak, żebyś nie musiał się w to angażować. Blog rośnie niezależnie od Twojego kalendarza.",
      },
      {
        q: "Z jakimi platformami się integrujecie?",
        a: "WordPress, Webflow, Ghost, Shopify, custom CMS — od pakietu GROWTH. STARTER: dostarczamy artykuły w formacie gotowym do wklejenia. GROWTH/SCALE: publikujemy bezpośrednio na Twoim blogu.",
      },
    ],
  },
];

export const SEO_GUARANTEES = [
  {
    title: "Gwarantowana ilość artykułów",
    desc: "Umówiliśmy się na 20 artykułów? Dostarczamy 20 artykułów. Nie dostarczymy umówionej liczby? Zwrot proporcjonalny. Bez tłumaczeń, bez dyskusji.",
  },
  {
    title: "ROI 200% w 90 dni lub miesiąc gratis",
    desc: "Jeśli w ciągu 90 dni nie zobaczysz wymiernych rezultatów — wzrost ruchu organicznego, nowe pozycje w Google, więcej impresji — następny miesiąc dostajesz za darmo.",
  },
  {
    title: "Wsparcie w cenie abonamentu",
    desc: "Nie zostawiamy Cię z systemem i \"radź sobie\". Opiekujemy się, optymalizujemy, odpowiadamy na pytania — przez cały okres współpracy. Bez dodatkowych opłat. Bez \"to nie wchodzi w pakiet\".",
  },
];
