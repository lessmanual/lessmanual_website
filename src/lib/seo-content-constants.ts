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
    title: "Brak czasu na content",
    desc: "Ostatni wpis na blogu? Nie pamiętasz. Bo prowadzenie firmy to nie siedzenie i pisanie artykułów. Masz ważniejsze rzeczy na głowie - sprzedaż, klientów, produkt. Tymczasem konkurencja publikuje co tydzień i zbiera leady, które powinny trafiać do Ciebie.",
  },
  {
    num: "02",
    title: "Copywriter = drogi i wolny",
    desc: "Dobry copywriter kosztuje 5-8 tys. PLN miesięcznie za 8-10 artykułów. Plus management - briefy, poprawki, deadline'y. A jak odejdzie, zaczynasz od zera. Freelancerzy? Jeden pisze dobrze, następny tragicznie. Loteria.",
  },
  {
    num: "03",
    title: "Zero strategii SEO",
    desc: "Nawet jak coś napiszesz, to Google tego nie widzi. Bo artykuł bez keyword research, bez internal linking, bez klastrów tematycznych to tekst w próżni. Jak ulotka wrzucona do wiatru.",
  },
  {
    num: "04",
    title: "Blog leży, konkurencja rośnie",
    desc: "Efekt? Blog leży odłogiem. Konkurencja rośnie w Google. A Ty dalej polegasz na rekomendacjach i jednym kanale pozyskiwania klientów.",
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
    title: "Keyword Research",
    desc: "Analizujemy Twoją branżę, konkurencję i frazy, które realnie przynoszą ruch. Nie losowe tematy - precyzyjna strategia oparta na danych. Budujesz klastry tematyczne, które Google traktuje poważnie.",
  },
  {
    num: 2,
    title: "AI Content Agent pisze",
    desc: "Nasz agent generuje artykuły dopasowane do Twojej niszy. Nie generyczny bełkot z ChatGPT - treści napisane pod SEO, z nagłówkami, meta opisami, internal linkami. Jak redakcja, ale bez redakcji.",
  },
  {
    num: 3,
    title: "Human-in-the-Loop (opcjonalnie)",
    desc: "Chcesz zatwierdzać przed publikacją? Dostajesz draft do review. Nie chcesz? Lecimy full auto. Ty decydujesz ile kontroli potrzebujesz.",
  },
  {
    num: 4,
    title: "Publikacja na Twoim blogu",
    desc: "Artykuły lądują bezpośrednio na Twojej stronie. Zoptymalizowane, zlinkowane, gotowe do indeksacji. Ty nie robisz nic.",
  },
];

export const SEO_DELIVERABLES_TABLE = {
  headers: ["Element", "STARTER", "GROWTH", "SCALE"],
  rows: [
    { label: "Keyword research", starter: true, growth: true, scale: true },
    { label: "Artykuły SEO/mies", starter: "10", growth: "20", scale: "30" },
    { label: "Klastry tematyczne", starter: "1", growth: "3", scale: "Unlimited" },
    { label: "Podstawowe SEO (on-page)", starter: true, growth: true, scale: true },
    { label: "Publikacja na blogu", starter: true, growth: true, scale: true },
    { label: "Tracking pozycji w Google", starter: false, growth: true, scale: true },
    { label: "Monthly SEO report", starter: false, growth: true, scale: true },
    { label: "Content calendar na 6 miesięcy", starter: false, growth: "2,000 PLN w cenie", scale: "2,000 PLN w cenie" },
    { label: "Monthly SEO audit", starter: false, growth: "1,500 PLN/mies w cenie", scale: "1,500 PLN/mies w cenie" },
    { label: "Competitor gap analysis", starter: false, growth: false, scale: "3,000 PLN w cenie" },
    { label: "Dedykowany Project Manager", starter: false, growth: false, scale: true },
  ],
};

export const SEO_BONUS_VALUES = [
  { tier: "STARTER", desc: "keyword research report", value: "2,000 PLN" },
  { tier: "GROWTH", desc: "keyword research report + content calendar na 6 miesięcy + monthly SEO audit", value: "5,500 PLN" },
  { tier: "SCALE", desc: "wszystko powyżej + competitor content gap analysis", value: "8,500 PLN" },
];

export const SEO_TARGET_SEGMENTS = [
  {
    icon: "Briefcase" as const,
    title: "Firmy B2B usługowe",
    desc: "Konsulting, agencje, software house'y, długi cykl sprzedaży? Blog buduje autorytet i przyciąga leady, które szukają rozwiązań w Google. 20 artykułów/mies = dominacja niszy.",
  },
  {
    icon: "ShoppingCart" as const,
    title: "E-commerce",
    desc: "Opisy kategorii, poradniki zakupowe, porównania produktów. Ruch organiczny zamiast Google Ads. Każdy artykuł to inwestycja, która pracuje latami.",
  },
  {
    icon: "Code2" as const,
    title: "SaaS / Tech",
    desc: "Dokumentacja, tutoriale, porównania z konkurencją, \"jak zrobić X\", frazy, które Twoi klienci wpisują w Google, zanim kupią.",
  },
  {
    icon: "MapPin" as const,
    title: "Lokalne firmy usługowe",
    desc: "Kliniki, kancelarie, biura rachunkowe, SEO lokalne + blog tematyczny. \"Najlepszy [usługa] w [miasto]\" + artykuły eksperckie = telefon, który dzwoni.",
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
    { label: "Audyt SEO", copywriter: "Nie", agency: "Dodatkowa opłata", saas: "DIY", lessmanual: "Od GROWTH" },
    { label: "Kalendarz treści", copywriter: "Nie", agency: "Czasem", saas: "Nie", lessmanual: "Od GROWTH" },
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
    desc: "Audyt SEO Twojej strony i branży. Analiza słów kluczowych, jakich fraz szukają Twoi klienci. Analiza konkurencji, na co rankują, czego im brakuje, gdzie są luki. Strategia klastrów tematycznych. Akceptujesz kierunek. Idziemy dalej.",
    yourTime: "1-2 godziny",
  },
  {
    week: "Tydzień 2",
    title: "Setup + pierwsze artykuły",
    desc: "Konfiguracja systemu pod Twoją branżę, ton i styl. Pierwsze 3-5 artykułów testowych do akceptacji. Twój feedback, korekta tonu, głębokości, stylu. Integracja z Twoim blogiem (WordPress, Webflow, custom, od GROWTH).",
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
    targetAudience: "Na start - testujesz AI w firmie",
    setupPrice: "3,000",
    monthlyPrice: "1,000",
    perArticle: "~100 PLN/artykuł",
    features: [
      "10 artykułów SEO miesięcznie",
      "1 klaster tematyczny",
      "Keyword research",
      "Podstawowe SEO (on-page)",
      "Publikacja na Twoim blogu",
      "Bonus: Keyword research report (wartość 2,000 PLN)",
    ],
    desc: "Dla firm które startują z content marketingiem i chcą sprawdzić efekt.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "GROWTH",
    subtitle: "Poważne SEO",
    targetAudience: "Na poważnie - skalujesz sprzedaż/obsługę",
    setupPrice: "5,000",
    monthlyPrice: "1,800",
    perArticle: "~90 PLN/artykuł",
    features: [
      "20 artykułów SEO miesięcznie",
      "3 klastry tematyczne",
      "Internal linking automatyczny",
      "Tracking pozycji w Google",
      "Monthly SEO report",
      "Bonus: Keyword research report (wartość 2,000 PLN)",
      "Bonus: Content calendar na 6 miesięcy (wartość 2,000 PLN)",
      "Bonus: Monthly SEO audit (wartość 1,500 PLN/mies)",
    ],
    desc: "Dla firm które poważnie myślą o pozycji w Google. Najczęściej wybierany.",
    valueNote: "Najczęściej wybierany. 20 artykułów za 90 PLN/szt. Copywriter bierze 300-800 PLN.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "SCALE",
    subtitle: "Pełna dominacja",
    targetAudience: "Full stack - automatyzacja całego procesu",
    setupPrice: "7,000",
    monthlyPrice: "2,500",
    perArticle: "~83 PLN/artykuł",
    features: [
      "30 artykułów SEO miesięcznie",
      "Unlimited klastry tematyczne",
      "Content calendar",
      "Dedykowany Project Manager",
      "Competitor gap analysis",
      "Bonus: Keyword research report (wartość 2,000 PLN)",
      "Bonus: Content calendar na 6 miesięcy (wartość 2,000 PLN)",
      "Bonus: Monthly SEO audit (wartość 1,500 PLN/mies)",
      "Bonus: Competitor content gap analysis (wartość 3,000 PLN)",
    ],
    desc: "Dla firm które chcą dominować w wynikach wyszukiwania. Pełna redakcja AI pod klucz.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
];

export const SEO_FAQ_ITEMS = [
  {
    category: "O produkcie i jakości",
    items: [
      {
        q: "Czy te artykuły nie brzmią jak AI?",
        a: "Nie. Nasz agent jest wytrenowany na Twojej branży i stylu komunikacji. Plus opcjonalny human-in-the-loop review. Efekt: treść, która brzmi jak ekspert, nie jak robot.",
      },
      {
        q: "Jak szybko zobaczę efekty w Google?",
        a: "Content publikujemy od tygodnia 1. Pierwsze efekty SEO (wzrost pozycji, ruch) - po 60-90 dniach. To standardowy czas indeksacji. Po 6 miesiącach - ruch rośnie 3-5x.",
      },
      {
        q: "Czy mogę zatwierdzać artykuły przed publikacją?",
        a: "Tak. Human-in-the-loop review to opcja w każdym pakiecie. Dostajesz draft, zatwierdzasz lub prosisz o poprawki. Albo lecisz full auto - Ty decydujesz.",
      },
      {
        q: "Na jakiej platformie to działa? WordPress, Webflow, Shopify?",
        a: "Na każdej. Publikujemy bezpośrednio na Twój blog niezależnie od CMS.",
      },
      {
        q: "Co z unikalnością treści? Google nie karze za AI content?",
        a: "Google karze za niskiej jakości content, nie za AI. Nasze artykuły są unikalne, zoptymalizowane pod SEO i pisane pod konkretne frazy. Dokładnie to, co Google chce widzieć.",
      },
    ],
  },
  {
    category: "Praktyczne pytania",
    items: [
      {
        q: "Mam już jakieś artykuły na blogu. Co z nimi?",
        a: "Auditujemy istniejący content. To co działa - wzmacniamy internal linkami. To co nie działa - optymalizujemy lub zastępujemy. Nic się nie marnuje.",
      },
      {
        q: "Czym się różnicie od SurferSEO, Jasper i innych narzędzi?",
        a: "Tam musisz sam pisać, sam optymalizować, sam publikować. My robimy wszystko za Ciebie. Narzędzia SaaS to DIY. My jesteśmy done-for-you.",
      },
      {
        q: "Mogę zrezygnować w dowolnym momencie?",
        a: "Tak. Abonament miesięczny, bez umowy na czas określony. Ale szczerze - po 3 miesiącach nikt nie rezygnuje, bo wyniki mówią same za siebie.",
      },
    ],
  },
];

export const SEO_GUARANTEES = [
  {
    title: "Gwarancja ilości",
    desc: "Gwarantujemy dostarczenie umówionej liczby artykułów. Nie dostarczymy? Zwrot proporcjonalny. Bez dyskusji.",
  },
  {
    title: "Gwarancja ROI",
    desc: "ROI 200% w 90 dni lub następny miesiąc gratis. Mierzymy ruch, pozycje, leady. Dane nie kłamią.",
  },
];
