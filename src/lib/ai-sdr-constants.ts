export const AI_SDR_CALENDLY_URL = "https://cal.com/bartłomiej-chudzik-2en6pt";
export const AI_SDR_EMAIL = "kontakt@lessmanual.ai";

export const AI_SDR_ROTATOR_WORDS = ["brak", "zero", "nie ma"];

export const AI_SDR_PROOF_METRICS = [
  { value: "77%", label: "open rate (3x standard)", countTo: 77, suffix: "%" },
  { value: "6 dni", label: "od maila do umowy", countTo: 6, suffix: " dni" },
  { value: "0 PLN", label: "stałych kosztów", countTo: 0, suffix: " PLN" },
];

export const AI_SDR_PROOF_META = "12 spotkań z 476 maili | 0 spotkań w 45 dni = zwrot setup | Max 3 projekty miesięcznie";

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
    ourCost: "500-2000 PLN/spotkanie",
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
    title: "Definiujemy Twojego idealnego klienta",
    desc: "Branża, wielkość firmy, stanowisko, lokalizacja. Wspólnie ustalamy, kto jest Twoim klientem. Żadnych \"każdy może być klientem\". Celujemy w ludzi, którzy naprawdę potrzebują tego, co robisz.",
  },
  {
    num: 2,
    title: "Budujemy bazę i weryfikujemy",
    desc: "Scraping + AI scoring każdego kontaktu. Każdy lead oceniany na skali 1-10. Tylko 7/10 i wyżej trafia do kampanii. Reszta odpada. Jakość, nie ilość.",
  },
  {
    num: 3,
    title: "Personalizujemy komunikację",
    desc: "AI czyta profil osoby i firmę. Każdy mail jest inny. Zero szablonów \"Szanowny Panie Dyrektorze\". Zero spamu. Dlatego nasz open rate to 77% zamiast standardowych 20-30%.",
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
  { label: "Open rate", ours: "77%", benchmark: "20-30%" },
  { label: "Positive reply rate", ours: "60%", benchmark: "5-15%" },
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
    title: "Software Houses",
    desc: "Szukacie klientów na development, ale handlowcy kosztują i nie skalują się? System AI generuje spotkania z CTO i decydentami w firmach, które potrzebują tego, co robicie.",
  },
  {
    icon: "Megaphone" as const,
    title: "Agencje Marketingowe / Digital",
    desc: "Pipeline oparty o polecenia i przetargi? Czas dodać aktywny kanał pozyskiwania klientów, który działa w tle. Bez zatrudniania handlowca. Bez retainera w agencji lead gen.",
  },
  {
    icon: "Cloud" as const,
    title: "Firmy SaaS",
    desc: "Długi cykl sprzedaży + konieczność docierania do decydentów? System AI kwalifikuje i umawia — Twój team domyka.",
  },
  {
    icon: "Handshake" as const,
    title: "Firmy B2B Usługowe",
    desc: "Konsulting, usługi IT, outsourcing? Jeśli Twój deal jest wart 20k+ PLN, matematyka gra. Zamkniesz 1 deal z 5 spotkań — płacisz za spotkania, zarabiasz na kontrakcie.",
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
    name: "STARTER",
    subtitle: "Email",
    price: "2,500",
    features: [
      "2 domeny wysyłkowe",
      "Warmup 14-21 dni",
      "Scraping + AI scoring leadów",
      "1 sekwencja mailowa (3 maile)",
      "Cotygodniowe raporty",
    ],
    desc: "Dla firm, które chcą przetestować system.",
    popular: false,
    ctaVariant: "secondary" as const,
  },
  {
    name: "GROWTH",
    subtitle: "Email + LinkedIn",
    price: "3,500",
    features: [
      "3 domeny wysyłkowe",
      "Warmup 14-21 dni",
      "Scraping + AI scoring leadów",
      "LinkedIn outreach",
      "2 sekwencje mailowe",
      "Rozbudowana definicja profilu klienta",
      "Cotygodniowe raporty",
    ],
    desc: "Dla firm, które chcą pełną moc systemu.",
    valueNote: "Najczęściej wybierany. Zero stałych opłat — płacisz tylko za spotkania.",
    popular: true,
    ctaVariant: "primary" as const,
  },
  {
    name: "SCALE",
    subtitle: "Multi-channel",
    price: "5,000",
    features: [
      "4+ domeny wysyłkowe",
      "Multi-persona targeting",
      "Multi-kanał (email + LinkedIn + opcjonalnie inne)",
      "Dedykowana strategia outreach",
      "Priorytetowa obsługa",
      "Cotygodniowe raporty + monthly review",
    ],
    desc: "Dla firm z dużym rynkiem i agresywnymi celami.",
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
  headers: ["", "Twój handlowiec", "Agencja Lead Gen", "AI SDR (LessManual)"],
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
    week: "Tydzień 1",
    title: "Kick-off",
    desc: "30 minut na rozmowie. Definiujemy, kto jest Twoim idealnym klientem, ustalamy kryteria spotkań, dostajesz dostęp do dashboardu.",
    yourTime: "30 minut + materiały (oferta/pitch)",
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
        a: "Zależy od branży, profilu klienta i skali kampanii. Realistycznie: 3-10 spotkań na STARTER, 5-15 na GROWTH, 10+ na SCALE. Nie obiecujemy konkretnej liczby — obiecujemy, że płacisz TYLKO za te, które się odbędą.",
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
        a: "Dlatego warmup trwa 14-21 dni. Używamy dedykowanych domen (nie Twojej głównej), limitów wysyłki (25-30 maili/skrzynkę/dzień) i monitorujemy deliverability w czasie rzeczywistym. Nasze 77% open rate mówi samo za siebie.",
      },
      {
        q: "Jaka jest różnica między wami a agencją lead gen?",
        a: "Agencja bierze 3-15k PLN/mies retainer niezależnie od wyników. My bierzemy 0 PLN stałych. Płacisz za spotkania, które się odbędą. Ryzyko jest po naszej stronie, nie Twojej.",
      },
    ],
  },
];

