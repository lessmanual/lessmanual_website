export const AI_SDR_CALENDLY_URL = "https://cal.com/bartłomiej-chudzik-2en6pt";
export const AI_SDR_EMAIL = "kontakt@lessmanual.ai";

export const AI_SDR_ROTATOR_WORDS = ["brak", "zero", "nie ma"];

export const AI_SDR_PROOF_METRICS = [
  { value: "76%", label: "open rate (3x standard)", countTo: 76, suffix: "%" },
  { value: "61%", label: "positive reply rate", countTo: 61, suffix: "%" },
  { value: "0 PLN", label: "stałych opłat miesięcznych", countTo: 0, suffix: " PLN" },
];

export const AI_SDR_PROOF_META = "76% open rate | 61% positive reply | Deal w 6 dni | 3 warstwy gwarancji | Max 3 projekty miesięcznie";

export const AI_SDR_COST_TABLE = [
  {
    task: "In-house handlowiec (pensja + ZUS + narzędzia)",
    currentCost: "12,000-22,000 PLN",
    ourCost: "0 PLN stałych",
  },
  {
    task: "Agencja lead gen (retainer)",
    currentCost: "3,000-15,000 PLN",
    ourCost: "0 PLN stałych",
  },
  {
    task: "Ręczny prospecting (Twój czas)",
    currentCost: "20-40h = 5,000-10,000 PLN",
    ourCost: "0h Twojego czasu",
  },
  {
    task: "Reklamy (Google/Meta Ads)",
    currentCost: "3,000-10,000 PLN",
    ourCost: "Pipeline Machine: 500-2,000 PLN/spotkanie",
  },
];

export const AI_SDR_AGITATION_TIMEFRAMES = [
  {
    time: "Za 3 miesiące",
    text: "Pipeline dalej pusty. Znowu siedzisz nad Excelem z kontaktami. Znowu piszesz maile, których nikt nie otwiera. Znowu czekasz na polecenie, którego może nie być.",
  },
  {
    time: "Za 6 miesięcy",
    text: "Twoja konkurencja już automatyzuje prospecting. Ma spotkania w kalendarzu podczas gdy Ty ręcznie filtrujesz bazy danych. Ich handlowcy sprzedają. Twoi szukają komu sprzedawać.",
  },
  {
    time: "Za rok",
    text: "Utracone przychody, które mogłeś mieć. Klienci, którzy kupili u konkurencji. Pipeline oparty na nadziei zamiast na systemie.",
  },
];

export const AI_SDR_AGITATION_COSTS = [
  "5-15 spotkań, których nie miałeś",
  "50,000-150,000 PLN w pipeline, których nie zbudowałeś",
  "Klienci, którzy podpisali u kogoś, kto do nich dotarł pierwszy",
];

export const AI_SDR_SOLUTION_STEPS = [
  {
    num: 1,
    title: "ICP Deep Dive Workshop (60 min)",
    desc: "Wspólna sesja: definiujemy Twojego idealnego klienta - branża, wielkość, stanowisko, buying signals. Dostajesz ICP Document (PDF) który zatrzymujesz na zawsze. Wartość: 2,500 PLN - w cenie setupu.",
  },
  {
    num: 2,
    title: "Budujemy bazę i weryfikujemy",
    desc: "Scraping + AI scoring każdego kontaktu. Każdy lead oceniany na skali 1-10. Tylko 7/10 i wyżej trafia do kampanii. Reszta odpada. Jakość, nie ilość.",
  },
  {
    num: 3,
    title: "Personalizujemy komunikację",
    desc: "AI czyta profil osoby i firmę. Każdy mail jest inny. Zero szablonów \"Szanowny Panie Dyrektorze\". Zero spamu. Dlatego nasz open rate to 76% zamiast standardowych 20-30%.",
  },
  {
    num: 4,
    title: "Prowadzimy kampanię",
    desc: "Wysyłamy, odpowiadamy, follow-upujemy. Obsługujemy całą korespondencję. Kwalifikujemy zainteresowanych. Odrzucamy tych, którzy nie pasują.",
  },
  {
    num: 5,
    title: "Spotkanie ląduje w Twoim kalendarzu",
    desc: "Potwierdzone. Z właściwą osobą. Z właściwej firmy. Ty otwierasz kalendarz i sprzedajesz.",
  },
];

export const AI_SDR_SOCIAL_PROOF_METRICS = [
  { label: "Open rate", ours: "76%", benchmark: "20-30%" },
  { label: "Positive reply rate", ours: "61%", benchmark: "5-15%" },
  { label: "Sent-to-Meeting", ours: "2.5% (12/476)", benchmark: "0.5-1%" },
  { label: "Czas do pierwszego deala", ours: "6 dni", benchmark: "30-90 dni" },
  { label: "Meeting-to-Close rate", ours: "50%", benchmark: "20-30%" },
  { label: "Pipeline value", ours: "~40,000 PLN ($9,900)", benchmark: "—" },
];

export const AI_SDR_DELIVERABLES = [
  {
    title: "System pod klucz (Done-for-you)",
    items: [
      "My budujemy, konfigurujemy i uruchamiamy. Twój czas: 1 godzina na setup + 5 minut tygodniowo.",
      "Dedykowane domeny wysyłkowe — Twoja główna domena zostaje nietknięta.",
      "AI scoring leadów — tylko kontakty 7/10+ trafiają do kampanii. Jakość, nie ilość.",
      "Każdy mail zatwierdzasz przed wysłaniem — pełna kontrola nad komunikacją.",
    ],
  },
  {
    title: "Pełna obsługa kampanii",
    items: [
      "Obsługujemy CAŁĄ korespondencję z leadami — Ty nie piszesz ani jednego maila.",
      "Follow-upy, kwalifikacja, umawianie terminów — wszystko po naszej stronie.",
      "Bieżąca optymalizacja — system jest lepszy z każdym tygodniem.",
    ],
  },
  {
    title: "Raporty i transparentność",
    items: [
      "Cotygodniowe raporty z metrykami — wiesz, co działa i ile spotkań przynosi.",
      "Dedykowany support — piszesz, odpowiadamy w godziny, nie w dni.",
      "Zero niespodzianek — wiesz dokładnie za co płacisz.",
    ],
  },
];

export const AI_SDR_TARGET_SEGMENTS = [
  {
    icon: "Code2" as const,
    title: "Pipeline Machine for Tech",
    subtitle: "SaaS / Software Houses",
    desc: "CEO/CTO szukają klientów na development ale handlowcy kosztują i nie skalują się? System targetuje decydentów w firmach które potrzebują tego co robicie. Lead sources: LinkedIn Sales Nav, Clutch, G2, Crunchbase.",
  },
  {
    icon: "Users" as const,
    title: "Pipeline Machine for Recruitment",
    subtitle: "Agencje rekrutacyjne",
    desc: "Kandydatów masz - klientów brakuje? System dociera do firm które aktywnie rekrutują i potrzebują wsparcia agencji. Multi-country kampanie: PL, UK, DACH, Nordics.",
  },
  {
    icon: "Factory" as const,
    title: "Pipeline Machine for Industry",
    subtitle: "Produkcja / Przemysł",
    desc: "Dyrektorzy handlowi firm produkcyjnych 20-500 osób. Lead sources: Biznesradar, KRS, LinkedIn, katalogi branżowe. Email angle: efektywność operacyjna, compliance EU.",
  },
];

export const AI_SDR_PER_MEETING_PRICING_FACTORS = [
  {
    factor: "Wartość Twojego klienta",
    desc: "Spotkanie warte 50k PLN wymaga więcej pracy w targetowaniu i personalizacji niż spotkanie warte 5k PLN.",
  },
  {
    factor: "Wielkość rynku",
    desc: "Niszowy rynek z 200 firmami wymaga innego podejścia niż rynek z 10 000 firm.",
  },
  {
    factor: "Kanały",
    desc: "Sam email to jedno. Email + LinkedIn + dane o intencjach = więcej punktów styku, więcej konfiguracji.",
  },
];

export const AI_SDR_SETUP_PLANS = [
  {
    name: "COLD START",
    subtitle: "Email",
    targetAudience: "Pierwsza kampania outbound",
    price: "3,000",
    features: [
      "2 domeny wysyłkowe",
      "Warmup 14-21 dni",
      "Scraping + AI scoring leadów",
      "1 sekwencja mailowa",
      "Cotygodniowe raporty",
    ],
    bonuses: [
      "ICP Deep Dive Workshop (2,500 PLN)",
      "Monthly Performance Report (1,000 PLN/mies)",
    ],
    bonusValue: "3,500 PLN",
    desc: "Testujesz system. Zero ryzyka - 0 spotkań w 45 dni = zwrot setup.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "FULL PIPELINE",
    subtitle: "Email + LinkedIn",
    targetAudience: "Gotowy produkt, chcesz skalować",
    price: "4,500",
    features: [
      "3 domeny wysyłkowe",
      "Warmup 14-21 dni",
      "Scraping + AI scoring leadów",
      "LinkedIn outreach",
      "2 sekwencje mailowe",
      "Rozbudowana definicja ICP",
      "Cotygodniowe raporty",
    ],
    bonuses: [
      "ICP Deep Dive Workshop (2,500 PLN)",
      "Monthly Performance Report (1,000 PLN/mies)",
      "Swipe File - 3 sekwencje z 76% open rate (1,500 PLN)",
      "Auto-Reply AI (3,000 PLN)",
    ],
    bonusValue: "8,000 PLN",
    desc: "Pełna moc systemu. Email + LinkedIn + AI odpowiedzi.",
    valueNote: "Najczęściej wybierany. Zero stałych opłat - płacisz tylko za spotkania.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "DOMINACJA",
    subtitle: "Multi-channel",
    targetAudience: "Multi-persona, multi-rynek",
    price: "7,000",
    features: [
      "4+ domeny wysyłkowe",
      "Multi-persona targeting",
      "Multi-kanał (email + LinkedIn + inne)",
      "Dedykowana strategia outreach",
      "Priorytetowa obsługa",
      "Cotygodniowe raporty + monthly review",
    ],
    bonuses: [
      "ICP Deep Dive Workshop (2,500 PLN)",
      "Monthly Performance Report (1,000 PLN/mies)",
      "Swipe File - 3 sekwencje z 76% open rate (1,500 PLN)",
      "Auto-Reply AI (3,000 PLN)",
      "Quarterly Strategy Call (2,000 PLN)",
    ],
    bonusValue: "10,000 PLN",
    desc: "Dominacja rynku. Wielu decydentów, wiele kanałów, priorytet.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
];

export const AI_SDR_MEETING_DEFINITION = [
  "Spotkanie potwierdzone w Twoim kalendarzu",
  "Osoba pasuje do uzgodnionego profilu klienta (decydent, właściwa firma)",
  "Osoba pojawiła się na spotkaniu",
  "Osoba wie, że to spotkanie sprzedażowe",
];

export const AI_SDR_COMPARISON_TABLE = {
  headers: ["", "Twój handlowiec", "Agencja Lead Gen", "Pipeline Machine (LessManual)"],
  rows: [
    {
      label: "Koszt miesięczny",
      sdr: "12,000-22,000 PLN (pensja + ZUS + narzędzia)",
      agency: "3,000-15,000 PLN retainer",
      aiSdr: "0 PLN stałych. Płacisz per spotkanie",
    },
    {
      label: "Czas do wyników",
      sdr: "3-6 miesięcy (rekrutacja + onboarding)",
      agency: "1-2 miesiące",
      aiSdr: "3 tygodnie (setup + warmup)",
    },
    {
      label: "Model płatności",
      sdr: "Płacisz z góry. Wyniki? Zobaczymy",
      agency: "Retainer niezależnie od wyników",
      aiSdr: "Pay-per-meeting. Brak spotkań = brak opłat",
    },
    {
      label: "Ryzyko",
      sdr: "Całkowite. Pensja leci niezależnie od wyników",
      agency: "Średnie. Retainer + nadzieja",
      aiSdr: "Zero. 0 spotkań w 45 dni = zwrot setup",
    },
    {
      label: "Skalowanie",
      sdr: "Kolejny handlowiec = kolejne 12k+/mies",
      agency: "Więcej = większy retainer",
      aiSdr: "Zwiększasz budżet = więcej spotkań",
    },
    {
      label: "Dostępność",
      sdr: "Pn-Pt, 8-16 (jak chce mu się)",
      agency: "Godziny biurowe",
      aiSdr: "24/7. System nie bierze L4",
    },
    {
      label: "Rotacja",
      sdr: "40% odchodzi rocznie",
      agency: "Zmiana opiekuna",
      aiSdr: "Brak tego problemu",
    },
    {
      label: "Zarządzanie",
      sdr: "Musisz nadzorować, szkolić, motywować",
      agency: "Musisz pilnować",
      aiSdr: "My zarządzamy. Ty masz spotkania",
    },
  ],
};

export const AI_SDR_PROCESS_STEPS = [
  {
    week: "Dzień 1",
    title: "ICP Deep Dive Workshop",
    desc: "60 min sesja. Definiujemy Twojego idealnego klienta - branża, wielkość, stanowisko, buying signals. Dostajesz ICP Document (PDF) który zatrzymujesz na zawsze. Ustalamy kryteria spotkań.",
    yourTime: "60 minut",
  },
  {
    week: "Tydzień 1-3",
    title: "Setup",
    desc: "Kupujemy i rozgrzewamy domeny wysyłkowe. Scrapujemy i oceniamy leady. Piszemy sekwencje mailowe. Ty zatwierdzasz treści, zanim wyślemy cokolwiek.",
    yourTime: "5 minut na zatwierdzenie maili",
  },
  {
    week: "Tydzień 3",
    title: "Start kampanii",
    desc: "Pierwsze maile wychodzą. System działa. Ty nie musisz robić nic.",
    yourTime: "0 minut",
  },
  {
    week: "Tydzień 3-4",
    title: "Pierwsze odpowiedzi i spotkania",
    desc: "AI kwalifikuje odpowiedzi, proponuje terminy, ustawia spotkania. Dostajesz powiadomienie z potwierdzonym terminem.",
    yourTime: "Otwierasz kalendarz",
  },
  {
    week: "Tydzień 4+",
    title: "Stabilna praca",
    desc: "Co tydzień dostajesz raport z metrykami. Optymalizujemy kampanie na bieżąco. System pracuje, Ty sprzedajesz na spotkaniach.",
    yourTime: "5 minut na przegląd raportu",
  },
];

export const AI_SDR_FAQ_ITEMS = [
  {
    category: "O produkcie i procesie",
    items: [
      {
        q: "Ile trwa setup?",
        a: "3 tygodnie. Warmup domen zajmuje 14-21 dni — to niezbędne, żeby maile nie trafiały do spamu. W tym czasie scrapujemy leady, oceniamy je AI scoringiem i przygotowujemy sekwencje mailowe. Ty zatwierdzasz treści.",
      },
      {
        q: "Kiedy mogę spodziewać się pierwszych spotkań?",
        a: "Tydzień 3-4 po starcie. Z naszych danych: 12 spotkań z 476 maili, kampania ukończona w 41%. System ruszamy po warmupie — spotkania pojawiają się szybko.",
      },
      {
        q: "Ile spotkań mogę oczekiwać miesięcznie?",
        a: "Zależy od branży, profilu klienta i skali kampanii. Realistycznie: 3-10 spotkań na COLD START, 5-15 na FULL PIPELINE, 10+ na DOMINACJA. Nie obiecujemy konkretnej liczby - obiecujemy, że płacisz TYLKO za te, które się odbędą.",
      },
    ],
  },
  {
    category: "O płatnościach i ryzyku",
    items: [
      {
        q: "Co jeśli spotkanie jest słabe albo lead nie pasuje do uzgodnionych kryteriów?",
        a: "Nie płacisz. Spotkanie musi spełniać WSZYSTKIE uzgodnione kryteria: właściwe stanowisko, właściwa firma, osoba się pojawiła, wie, że to spotkanie sprzedażowe. Weryfikujemy to razem.",
      },
      {
        q: "Co jeśli ktoś się nie pojawi (no-show)?",
        a: "Umawiamy ponownie. Jeśli 2x nie przyjdzie — spotkanie jest bezpłatne i zastępujemy je innym. Nie płacisz za no-showy.",
      },
      {
        q: "Mogę zobaczyć treści maili przed startem?",
        a: "Tak. Zatwierdzasz każdą sekwencję, zanim wyjdzie pierwszy mail. Nic nie wychodzi bez Twojej zgody. To Twoja marka, więc masz pełną kontrolę nad komunikacją.",
      },
      {
        q: "Co po 3 miesiącach?",
        a: "Kontynuujemy miesiąc do miesiąca. Zero commitmentu. Możesz zakończyć kiedy chcesz. Ale klienci zostają, bo system działa i przynosi spotkania.",
      },
      {
        q: "Dlaczego 100% z góry za setup?",
        a: "Bo Dzień 1 zaczynamy od ICP Workshop (wartość 2,500 PLN) - dostajesz deliverable natychmiast. Jeśli nie jesteś zadowolony z przygotowanej kampanii PRZED jej uruchomieniem - pełny zwrot. Masz 3 warstwy gwarancji. A po starcie płacisz TYLKO za spotkania które się odbędą.",
      },
      {
        q: "Jakie bonusy dostaję w cenie?",
        a: "Zależy od planu. COLD START: ICP Workshop (2,500 PLN) + Monthly Report (1,000 PLN/mies). FULL PIPELINE: dodatkowo Swipe File z 76% open rate (1,500 PLN) + Auto-Reply AI (3,000 PLN). DOMINACJA: wszystko plus Quarterly Strategy Call (2,000 PLN). Łączna wartość bonusów: 3,500-10,000 PLN - w cenie setupu.",
      },
    ],
  },
  {
    category: "Kwestie techniczne",
    items: [
      {
        q: "A co z RODO?",
        a: "Kontaktujemy firmy (B2B) na adresy służbowe z publicznie dostępnych źródeł. Uzasadniony interes biznesowy (art. 6 ust. 1 lit. f RODO). Żadnych prywatnych skrzynek. Żadnych list zakupionych. Każdy kontakt może się wypisać jednym kliknięciem.",
      },
      {
        q: "Czy maile nie trafią do spamu?",
        a: "Dlatego warmup trwa 14-21 dni. Używamy dedykowanych domen (nie Twojej głównej), limitów wysyłki (25-30 maili/skrzynkę/dzień) i monitorujemy deliverability w czasie rzeczywistym. Nasze 76% open rate mówi samo za siebie.",
      },
      {
        q: "Jaka jest różnica między wami a agencją lead gen?",
        a: "Agencja bierze 3-15k PLN/mies retainer niezależnie od wyników. My bierzemy 0 PLN stałych. Płacisz za spotkania, które się odbędą. Ryzyko jest po naszej stronie, nie Twojej.",
      },
    ],
  },
];

export const AI_SDR_BONUSES = [
  {
    name: "ICP Deep Dive Workshop",
    value: "2,500 PLN",
    desc: "60 min sesja z Bartkiem. Deliverable: ICP Document (PDF) - zatrzymujesz na zawsze. Competitor mapping, buying signals, decision makers.",
    tiers: ["COLD START", "FULL PIPELINE", "DOMINACJA"],
  },
  {
    name: "Monthly Performance Report",
    value: "1,000 PLN/mies",
    desc: "Open rates, reply rates, meetings, pipeline. 3 konkretne rekomendacje na następny miesiąc. AI-generated insights.",
    tiers: ["COLD START", "FULL PIPELINE", "DOMINACJA"],
  },
  {
    name: "Swipe File - 3 sprawdzone sekwencje",
    value: "1,500 PLN",
    desc: "Anonimizowane szablony z 76% open rate i 61% positive reply rate. Subject lines, follow-up sequences, A/B test framework. Zatrzymujesz nawet po zakończeniu współpracy.",
    tiers: ["FULL PIPELINE", "DOMINACJA"],
  },
  {
    name: "Auto-Reply AI",
    value: "3,000 PLN",
    desc: "AI draftuje odpowiedzi na positive replies. Human-approved. Response time: minuty zamiast godzin.",
    tiers: ["FULL PIPELINE", "DOMINACJA"],
  },
  {
    name: "Quarterly Strategy Call",
    value: "2,000 PLN",
    desc: "Przegląd kampanii, nowe segmenty, optymalizacja. Strategiczny przegląd co kwartał.",
    tiers: ["DOMINACJA"],
  },
];

export const AI_SDR_GUARANTEE_LAYERS = [
  {
    layer: 1,
    heading: "0 spotkań w 45 dni = pełny zwrot setup",
    body: "Uruchamiamy kampanię. Jeśli w ciągu 45 dni od startu nie umówimy ANI JEDNEGO spotkania spełniającego Twoje kryteria - zwracamy opłatę za setup. Bez pytań. Przelew w 7 dni.",
  },
  {
    layer: 2,
    heading: "Drożej niż handlowiec? 30 dni gratis",
    body: "Jeśli po 90 dniach koszt spotkania z nami wyjdzie wyższy niż koszt spotkania z in-house handlowcem (1,000-1,830 PLN wg rynku) - następne 30 dni kampanii GRATIS.",
  },
  {
    layer: 3,
    heading: "Niezadowolony przed startem? Pełny zwrot",
    body: "Płacisz 100% z góry. Nie jesteś zadowolony z przygotowanej kampanii przed jej uruchomieniem? Pełny zwrot. Bez pytań.",
  },
];

