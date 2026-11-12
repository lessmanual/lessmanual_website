// Treści strony głównej v3. Jedno źródło tekstu dla sekcji, stopki i danych strukturalnych.
// Źródło tekstów: materialy/cso/strona-2026-11-10/TEKSTY_STRONY.md, wersja 3 CSO z 11.11.2026.
// Teksty z eksportu Claude Design NIE obowiązują.
// Liczby z datą stanu, aktualizacja raz w tygodniu (PLAN_BUDOWY_STRONY.md pkt 5).

export const SITE_URL = "https://www.lessmanual.ai";

/** Filmy dochodzą później. Dopóki są false, żadne miejsce na wideo się nie renderuje. */
export const MEDIA_FLAGS = {
  heroVideo: false,
  processVideo: false,
  systemVideos: false,
  /** Sekcja 8 (opinie z wideo i rekomendacją) wchodzi dopiero po pierwszym nagraniu (TEKSTY v3, sekcja 8). */
  testimonialsSection: false,
} as const;

export const LINKS = {
  form: "/#formularz",
  linkedinBartek: "https://www.linkedin.com/in/bartlomiej-chudzik-7aa740197",
  linkedinRecommendations:
    "https://www.linkedin.com/in/bartlomiej-chudzik-7aa740197/details/recommendations/",
  // Stały link wizytówki „LessManual - Agencja Automatyzacji AI” w Mapach Google (Bartek 11.11;
  // stary g.page/r/lessmanual/review kończył się na google.com).
  googleProfile: "https://www.google.com/maps?cid=10191824326439953363",
  privacy: "/legal/polityka-prywatnosci",
  email: "kontakt@lessmanual.ai",
} as const;

/** Adres formularza z zaznaczoną odpowiedzią w pytaniu 6 (TEKSTY v3, sekcja 5, notatka dla CTO). */
export function formHref(path: "A" | "B" | "C"): string {
  return `/?droga=${path}#formularz`;
}

export type GoogleRating = { rating: string; ratingValue: number; reviews: number; readOn: string };

// decyzja Bartka 11.11 i 12.11: 6 opinii (Search Console); widok Map bez logowania pokazuje 4.
const GOOGLE_RATING: GoogleRating | null = { rating: "5,0", ratingValue: 5, reviews: 6, readOn: "2026-11-12" };

export const PROOF = {
  // Pasek dowodów, decyzja Bartka 11.11: „24+ firm · 31 wdrożeń · 5,0 w Google”; liczba opinii 6 (Search Console, decyzja Bartka 12.11).
  // Jedno miejsce na liczby; hero, OG i dane strukturalne czytają stąd.
  companies: "24+",
  implementations: 31,
  bar: "24+ firm · 31 wdrożeń",
  oneClient:
    "U jednego klienta od grudnia 2025 uruchomiliśmy 9 systemów, 7 z nich pracuje (stan na 11.11.2026).",
  asOf: "2026-11-11",
  // Ocena z wizytówki „LessManual - Agencja Automatyzacji AI” (Mapy Google, odczyt Bartka 11.11).
  // Zatwierdzone przez Bartka 11.11; ustawienie null zdejmuje ocenę i AggregateRating.
  google: GOOGLE_RATING,
} as const;

export const META = {
  title: "Systemy AI szyte na miarę dla firm | LessManual",
  description:
    "Partner technologiczny dla firm 10-100 osób. Budujemy systemy AI etapami, odpowiadamy za efekt spisany przed startem i opiekujemy się nimi po wdrożeniu.",
  ogTitle: "Systemy AI, które ograniczają ręczną pracę w firmie",
  ogDescription:
    "Budujemy systemy etapami i każdy etap wyceniamy przed startem. Dane i system należą do Ciebie.",
  llmsSentence:
    "LessManual to partner technologiczny, który buduje systemy AI szyte na miarę polskich firm 10-100 osób prowadzonych przez właściciela, odpowiada za efekt spisany przed startem i opiekuje się systemami po wdrożeniu.",
} as const;

export const NAV = [
  { label: "Systemy", href: "/#systemy" },
  { label: "Jak współpracujemy", href: "/#wspolpraca" },
  { label: "Mapa AI firmy", href: "/#drogi" },
  { label: "Ceny", href: "/#ceny" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const BZYK_LINES = {
  hero: "Poprowadzę Cię przez formularz i wytłumaczę, o co pytamy.",
  paths: "Nie wiesz, którą drogę wybrać? Formularz wskaże ją po 10 pytaniach.",
  end: "Formularz zajmuje około 2 minut, potem wybierasz termin rozmowy.",
  hide: "Schowaj Bzyka",
  show: "Pokaż Bzyka",
} as const;

export const HERO = {
  // Wariant A (decyzja Bartka 10.11). Słowo „ręcznej” w kursywie Instrument Serif jak w projekcie v3.
  titleBefore: "Mniej",
  titleAccent: "ręcznej",
  titleAfter: "pracy, więcej kontroli nad firmą.",
  subtitle:
    "Systemy AI szyte na miarę firm od 10 do 100 osób. Efekt zapisujemy liczbą przed startem. Jeśli system go nie daje, poprawiamy na nasz koszt.",
  cta: "Umów rozmowę",
  ctaNote: "Pierwszy krok to 45 minut rozmowy z Bartkiem. Przed nią 10 pytań, około 2 minut.",
} as const;

/** Scena hero: prawdziwy system z karty 2 (215 dokumentów). Nazwy wierszy są przykładowe (notatka CSO). */
export const HERO_SCENE = {
  title: "Dokumenty przyjęcia",
  subtitle: "Arkusz zakładu, wpisuje system",
  counterFrom: 211,
  counterTo: 215,
  counterLabel: "dokumentów wpisanych",
  errors: "0 błędów przetwarzania",
  rows: ["Zamówienie Kowalski", "PZ 0412", "Przyjęcia, listopad", "WZ 1187"],
  docs: ["Zamówienie od Kowalskiego", "PZ 0412.pdf", "przyjęcia_listopad.xlsx", "zdjęcie WZ 1187.jpg"],
  caption:
    "Przykład z wdrożenia: bot wpisał do arkusza zakładu 215 dokumentów przyjęcia od kwietnia do października 2026, każdy bez błędu przetwarzania.",
} as const;

export const FOR_WHOM = {
  title: "Dla kogo budujemy systemy AI",
  yesTitle: "To dla Ciebie, jeśli:",
  yes: [
    "prowadzisz firmę, która ma od 10 do 100 osób, i decydujesz sam albo ze wspólnikiem;",
    "Twoi ludzie ręcznie przepisują zamówienia, dokumenty albo maile;",
    "pracujecie na kilku programach, które się ze sobą nie łączą;",
    "osobiście pilnujesz spraw, które powinny dziać się bez Ciebie;",
    "chcesz zacząć od prostego etapu, który realnie działa, i potem dokładać kolejne.",
  ],
  noTitle: "To nie dla Ciebie, jeśli:",
  no: [
    "zakup musi przejść przez dział zakupów i przetarg;",
    "budżet na start to 2-3 tys. zł albo szukasz najtańszego wykonawcy;",
    "chcesz kupić gotowe narzędzie i nie planujesz zmieniać sposobu pracy w firmie;",
    "potrzebujesz dyżuru technicznego przez całą dobę.",
  ],
} as const;

export const PROCESS = {
  title: "Jak wygląda współpraca, krok po kroku",
  intro:
    "Przy każdym kroku widzisz, za co odpowiadamy my, a co należy do Ciebie. Ty podejmujesz decyzje i dajesz dostęp do danych. Techniczną pracę wykonujemy my.",
  colStep: "Krok",
  colOurs: "Nasza odpowiedzialność",
  colYours: "Twoja rola",
  steps: [
    {
      title: "Rozmowa i spisany zakres",
      ours: "Pytamy o Twoje programy z nazwy i o to, co boli najbardziej. Potem spisujemy zakres z efektem systemu i ceną każdego etapu.",
      yours: "Rozmowa (45 minut) i kilka przykładowych dokumentów albo maili.",
    },
    {
      title: "Pierwszy etap, który realnie działa",
      ours: "Budujemy możliwie prosty etap i pokazujemy go w działaniu na Twoich sprawach.",
      yours: "Wskazujesz osobę do kontaktu i dajesz dostępy w ustalonym terminie. Raz w tygodniu krótkie spotkanie.",
    },
    {
      title: "Testy na nowych sprawach",
      ours: "System pracuje obok, a dotychczasowy sposób pracy działa bez zmian do odbioru. Twoje uwagi poprawiamy na bieżąco.",
      yours: "Twój zespół sprawdza wyniki na prawdziwych sprawach i zgłasza, co poprawić.",
    },
    {
      title: "Odbiór",
      ours: "Mierzymy efekt tak, jak zapisaliśmy go przed startem. Przekazujemy dokumentację z instrukcją dla zespołu.",
      yours: "Sprawdzasz system na swoich danych i potwierdzasz odbiór.",
    },
    {
      title: "Opieka i plan na kwartał",
      ours: "Przejmujemy system, pilnujemy go, aktualizujemy i serwisujemy. Co kwartał pokazujemy, co działa, i proponujemy następny etap z ceną.",
      yours: "Jedno spotkanie na kwartał i decyzja o kolejnym etapie.",
    },
  ],
} as const;

/** Sekcja 3a „Spisany zakres” (karta z kierunku D, decyzja Bartka 10.11 20:50). */
export const SCOPE_CARD = {
  title: "Co dostajesz na piśmie przed startem systemu",
  items: [
    "efekt systemu zapisany liczbą i sposób, w jaki go zmierzymy;",
    "etapy z ceną i terminem każdego etapu;",
    "podział zadań: co robimy my, a co jest po Twojej stronie;",
    "czego zakres nie obejmuje;",
    "płatność: 35% przy zamówieniu, 35% po działającej demonstracji, 30% po odbiorze.",
  ],
  note: "Zakres akceptujemy oboje przed startem. Zmiana po akceptacji to nowy etap z własną ceną, więc cena nie rośnie bez Twojej zgody.",
} as const;

export type SystemCard = {
  slug: string;
  title: string;
  problem: string;
  system: string;
  effect: string;
  company: string;
  /** Karty 4 i 5 czekają na liczby z produkcji (TEKSTY v3, sekcja 4). */
  visible: boolean;
  /** Podstrona systemu (TEKSTY v3, sekcja 12, oznaczone START). */
  pageHref?: string;
};

export const SYSTEMS = {
  title: "Przykłady systemów, które już pracują",
  intro:
    "Każda firma pracuje na innych programach, więc każdy system budujemy pod konkretną firmę. Poniżej przykłady z naszych wdrożeń.",
  // Kolejność na stronie według notatki CSO: karta 2, 1, 3, 6; karty 4 i 5 ukryte.
  cards: [
    {
      slug: "odczyt-dokumentow",
      title: "System, który przepisuje dokumenty z maila do arkusza",
      problem:
        "Ktoś w zakładzie codziennie przepisuje te same pola z dokumentów przyjęcia do arkusza.",
      system:
        "Pracownik wysyła dokument przyjęcia mailem na jeden adres. Bot odczytuje go i wpisuje dane do arkusza właściwego handlowca. Gdy w dokumencie czegoś brakuje, odsyła mail z informacją, co uzupełnić.",
      effect: "215 dokumentów wpisanych od kwietnia do października 2026, każdy bez błędu przetwarzania.",
      company: "Zakład recyklingu",
      visible: true,
      pageHref: "/systemy/odczyt-dokumentow",
    },
    {
      slug: "okazje-sprzedazowe-i-przetargi",
      title: "System, który codziennie szuka okazji sprzedażowych",
      problem:
        "Przetargi i informacje o zakupach w firmach są publiczne, ale rozproszone po wielu stronach. Handlowcy dowiadują się o nich za późno albo wcale.",
      system:
        "Bot codziennie przegląda ogłoszenia przetargowe i wiadomości o firmach z rynku klienta, także z Niemiec i Czech. Trafne sprawy wysyła mailem handlowcom.",
      effect:
        "W tygodniu od 19 do 26 października handlowcy dostali 62 tematy. W kolejnym tygodniu ocenili 11 z 13 sygnałów od firm jako trafne.",
      company: "Firma recyklingowa",
      visible: true,
      pageHref: "/systemy/okazje-sprzedazowe-i-przetargi",
    },
    {
      slug: "panel-firmy",
      title: "Panel: wszystkie boty w jednym miejscu",
      problem:
        "W firmie pracuje kilka botów, każdy wysyła wyniki gdzie indziej, a właściciel nie widzi, co z nich wynika.",
      system:
        "Jeden panel dla właściciela. Widać w nim, co zrobił każdy bot i które sprawy trafiły do handlowców. Przy każdym handlowcu widać sprawy, które czekają na jego ocenę.",
      effect:
        "W pierwszym tygodniu panel pokazał 38 spraw przekazanych handlowcom. Ocenili 24 z nich, a przy 8 trwa już przygotowanie oferty.",
      company: "Firma recyklingowa",
      visible: true,
      pageHref: "/systemy/panel-firmy",
    },
    {
      slug: "tresci-sklepu-pod-google",
      title: "System, który pisze treści sklepu pod Google",
      problem:
        "Ruch z Google spada, a na pisanie poradników i rankingów produktów brakuje czasu.",
      system:
        "Agent AI przygotowuje poradniki i rankingi produktów na danych sklepu. Właściciel zatwierdza plan, a publikacja idzie według harmonogramu.",
      effect:
        "Artykuły opublikowane w 2026 roku dały 2 906 kliknięć z Google. W listopadzie 6 przebudowanych poradników i 14 odświeżonych rankingów jest już online.",
      company: "Sklep z oświetleniem LED",
      visible: true,
      pageHref: "/systemy/tresci-sklepu-pod-google",
    },
    {
      slug: "zamowienia-sms",
      title: "System, który przyjmuje zamówienia z SMS",
      problem:
        "Klienci hurtowni wciąż zamawiają SMS-ami i mailami, a ktoś musi to przepisać do realizacji.",
      system:
        "Agent AI odpowiada klientowi na SMS, zbiera zamówienie i przekazuje je do realizacji.",
      effect: "",
      company: "Hurtownia napojów B2B",
      visible: false,
    },
    {
      slug: "zapytania-ofertowe",
      title: "System, który wyszukuje zapytania ofertowe",
      problem:
        "Zapytania ofertowe giną w kilku serwisach i nikt nie ma czasu ich codziennie przeglądać.",
      system:
        "Agent AI zbiera zapytania z kilku źródeł i odsiewa te, które nie pasują. Zespołowi zostawia tylko sprawy do decyzji.",
      effect:
        "W przebiegu przed odbiorem z 79 zapytań odrzucił 45 niepasujących. 32 zostawił zespołowi do sprawdzenia, a 2 wskazał do działania od razu.",
      company: "Agencja kreatywna",
      visible: false,
    },
  ] satisfies SystemCard[],
} as const;

export type EntryPath = {
  id: "A" | "B" | "C";
  label: string;
  title: string;
  forWhom: string;
  how: string;
  gets: string;
  cost: string;
  cta: string;
  primary: boolean;
};

export const PATHS = {
  title: "Od czego zacząć: trzy drogi do pierwszego systemu",
  intro:
    "Wybierz drogę, która pasuje do tego, gdzie dziś jesteś. Każda zaczyna się od krótkiego formularza i rozmowy z Bartkiem.",
  labels: { forWhom: "Dla kogo", how: "Jak wygląda", gets: "Co dostajesz", cost: "Koszt" },
  items: [
    {
      id: "A",
      label: "Droga A",
      title: "Wiem, co mnie najbardziej boli",
      forWhom: "Masz pomysł, listę spraw do zautomatyzowania albo własny plan.",
      how: "Rozmowa z Bartkiem, 45 minut, o Twoich programach i o tym, co zabiera najwięcej czasu.",
      gets: "Spisany zakres z efektem systemu i ceną każdego etapu.",
      cost: "Rozmowa bez opłat. Projekty zwykle zaczynają się od kilkunastu tysięcy zł netto.",
      cta: "Umów rozmowę",
      primary: true,
    },
    {
      id: "B",
      label: "Droga B",
      title: "Nie wiem, od czego zacząć: Mapa AI firmy",
      forWhom: "Czujesz, że AI może odciążyć firmę, ale nie wiesz, od którego procesu zacząć.",
      how: "Dłuższa rozmowa z Tobą i 2-3 krótsze, po około 30 minut, z osobami, które znają procesy na co dzień. Pracujemy na Twoich dokumentach i liczbach. Wynik dostajesz w ciągu 5 dni roboczych od ostatniej rozmowy.",
      gets: "Plan systemów na kwartał i na rok, ułożony w kolejności wdrażania. Przy każdym systemie jest efekt i cena każdego etapu.",
      cost: "6 900 zł netto, w całości odliczane od pierwszego wdrożenia.",
      cta: "Umów rozmowę o Mapie",
      primary: false,
    },
    {
      id: "C",
      label: "Droga C",
      title: "Najpierw chcę zobaczyć, że to działa: szybki pilot",
      forWhom: "Chcesz sprawdzić jeden system na swoich sprawach, zanim zdecydujesz o większym projekcie.",
      how: "Przez dwa tygodnie budujemy jeden proces na próbce Twoich spraw i uruchamiamy go na naszej infrastrukturze. Przed przekazaniem danych podpisujemy umowę powierzenia przetwarzania (RODO).",
      gets: "Działający system, który oglądasz na swoich sprawach.",
      cost: "Podajemy na rozmowie i w całości odliczamy od wdrożenia tego systemu.",
      cta: "Umów rozmowę o pilocie",
      primary: false,
    },
  ] satisfies EntryPath[],
} as const;

export const GUARANTEE = {
  title: "Odpowiadamy za efekt systemu, a dane zostają u Ciebie",
  items: [
    {
      title: "Efekt spisany przed startem",
      body: "Zanim zaczniemy, zapisujemy liczbą, jaki efekt ma dawać system i jak go zmierzymy. Jeżeli odebrany system tego efektu nie daje, poprawiamy go na nasz koszt, aż zacznie go dawać.",
    },
    {
      title: "Dane i system należą do Ciebie",
      body: "Przy zakończeniu współpracy dostajesz pełną dokumentację i wszystkie dostępy. Dostajesz też eksport danych. System możesz przekazać własnemu informatykowi albo innej firmie.",
    },
    {
      title: "Testy obok obecnej pracy",
      body: "Nowy system testujemy na nowych sprawach. Obecny sposób pracy działa bez zmian do dnia odbioru.",
    },
  ],
  limitsLink: { label: "Czego ta obietnica nie obejmuje", href: "#faq-4" },
} as const;

export const PRICING = {
  title: "Ile kosztuje system AI dla firmy",
  items: [
    {
      title: "Wdrożenie systemu",
      body: "Płacisz za etapy, a cenę każdego etapu znasz przed startem. Projekty zwykle zaczynają się od kilkunastu tysięcy zł netto. Płatność w trzech częściach: 35% przy zamówieniu, 35% po działającej demonstracji, 30% po odbiorze.",
    },
    {
      title: "Opieka co miesiąc",
      body: "Po odbiorze przejmujemy system, pilnujemy go, aktualizujemy i serwisujemy. Płacisz stałą miesięczną kwotę według pakietu, a kwotę podajemy w ofercie. Opłaty za narzędzia i modele AI, z których korzysta system, pokrywasz bezpośrednio; ich poziom znasz z oferty.",
    },
    {
      title: "Mapa AI firmy",
      body: "6 900 zł netto, w całości odliczane od pierwszego wdrożenia.",
    },
    {
      title: "Szybki pilot na Twoich danych",
      body: "Dwa tygodnie, jeden proces. Koszt podajemy na rozmowie i w całości odliczamy od wdrożenia tego systemu.",
    },
    {
      title: "Plan na kwartał",
      body: "Na starcie dostajesz plan na kwartał. Co kwartał sprawdzamy razem, co działa. Każdy kolejny etap ma cenę podaną przed startem.",
    },
    {
      title: "Limit miejsc",
      body: "Przyjmujemy maksymalnie 4 nowe firmy miesięcznie. Więcej firm naraz nie poprowadzimy tak, jak opisujemy wyżej.",
    },
  ],
} as const;

/** Sekcja 8: ukryta flagą MEDIA_FLAGS.testimonialsSection do pierwszego nagrania. */
export const TESTIMONIALS = {
  title: "Co mówią właściciele firm, z którymi pracujemy",
  // Cytat z obecnej strony (język oryginału LinkedIn). Przed włączeniem sekcji: porównać 1:1 z profilem.
  arekQuote:
    "Focus. Precision. Excellent time management, and AI agents' knowledge are what make Bartek an exceptional architect and engineer.",
  arekName: "Arkadiusz Skuza",
  arekRole: "rekomendacja na LinkedIn",
} as const;

export const FAQ = {
  title: "Pytania o systemy AI, które słyszymy najczęściej",
  items: [
    {
      q: "Ile kosztuje system AI dla mojej firmy?",
      a: "Projekty zwykle zaczynają się od kilkunastu tysięcy zł netto, a dokładną cenę każdego etapu dostajesz przed startem. Jeśli nie wiesz, od czego zacząć, Mapa AI firmy kosztuje 6 900 zł netto i odliczamy ją w całości od pierwszego wdrożenia.",
    },
    {
      q: "Moja firma jest specyficzna. Macie gotowe rozwiązanie?",
      a: "Nie sprzedajemy gotowców, bo każda firma pracuje na innych programach. Na pierwszej rozmowie pytamy o Twoje programy i procesy z nazwy, a system budujemy pod nie.",
    },
    {
      q: "Co, jeśli system nie zadziała?",
      a: "Efekt zapisujemy liczbą przed startem. Jeżeli odebrany system go nie daje, poprawiamy go na nasz koszt, aż zacznie działać tak, jak zapisaliśmy.",
    },
    {
      q: "Czego ta obietnica nie obejmuje?",
      a: "Nowych wymagań dodanych po akceptacji zakresu, bo to nowy etap z własną ceną. Opóźnień z powodu brakujących danych, dostępów albo decyzji po Twojej stronie. Opłat za narzędzia i modele AI, z których korzysta system: pokrywasz je Ty, a ich poziom znasz z oferty.",
    },
    {
      q: "Co, jeśli zechcę zakończyć współpracę?",
      a: "Dane i system są Twoje. Dostajesz pełną dokumentację i wszystkie dostępy, a do tego eksport danych. System możesz przekazać własnemu informatykowi.",
    },
    {
      q: "Ile trwa uruchomienie pierwszego systemu?",
      a: "Szybki pilot trwa dwa tygodnie. Mapę AI firmy oddajemy w ciągu 5 dni roboczych od ostatniej rozmowy. Termin wdrożenia zapisujemy w zakresie, osobno dla tego, co zależy od nas, i tego, co zależy od Ciebie.",
    },
    {
      q: "Czy wdrożenie zakłóci bieżącą pracę?",
      a: "Nie. Nowy system testujemy na nowych sprawach, a obecny sposób pracy działa bez zmian do odbioru.",
    },
    {
      q: "Ile mojego czasu to zajmie?",
      a: "Na start rozmowa i kilka przykładowych dokumentów. W trakcie wdrożenia krótkie spotkanie raz w tygodniu, a Twoje zadania są na jednej liście. Po odbiorze jedno spotkanie na kwartał.",
    },
    {
      q: "Czy AI nie popełni kosztownego błędu?",
      a: "Tam, gdzie błąd kosztuje pieniądze, na przykład kary albo reklamacje, system przygotowuje decyzję, a zatwierdza ją człowiek. Takie miejsca ustalamy w zakresie przed startem.",
    },
    {
      q: "Co z moimi danymi i RODO?",
      a: "Przed przekazaniem danych podpisujemy umowę powierzenia przetwarzania. Do pilota wystarczy ograniczona próbka spraw.",
    },
    {
      q: "Czym różni się Mapa AI firmy od szybkiego pilota?",
      a: "Mapa pokazuje całą firmę i daje plan systemów na kwartał i rok. Pilot sprawdza jeden system na próbce Twoich spraw. Jeśli nie wiesz, od czego zacząć, wybierz Mapę. Jeśli wiesz, ale chcesz najpierw zobaczyć efekt, wybierz pilota.",
    },
  ],
} as const;

export const FINAL_CTA = {
  title: "Umów rozmowę o systemie dla Twojej firmy",
  body: "Formularz ma 10 pytań i zajmuje około 2 minut. Prowadzi przez niego Bzyk. Na końcu wybierasz termin rozmowy z Bartkiem.",
  note: "Przyjmujemy maksymalnie 4 nowe firmy miesięcznie.",
} as const;

export const ABOUT = {
  title: "Kim jesteśmy",
  paragraphs: [
    "LessManual to partner technologiczny dla firm prowadzonych przez właściciela. Budujemy systemy AI, które ograniczają ręczną pracę, i opiekujemy się nimi po wdrożeniu.",
    "Firmę prowadzi Bartłomiej Chudzik. Od 2017 do 2025 roku pracował w transporcie i logistyce: zaczynał jako dyspozytor, potem był specjalistą do spraw transportu w dużych firmach produkcyjnych. Dlatego zaczynamy od procesu i liczb, a technologię dobieramy do nich.",
    "Część systemów budujemy dla dużych firm razem z partnerem wdrożeniowym. Nazw tych firm nie podajemy, bo obowiązuje nas poufność.",
  ],
} as const;

export const FOOTER = {
  about:
    "LessManual to partner technologiczny dla firm prowadzonych przez właściciela. Budujemy systemy AI, które ograniczają ręczną pracę, i opiekujemy się nimi po wdrożeniu.",
  note: "Przyjmujemy maksymalnie 4 nowe firmy miesięcznie.",
} as const;

/** Polska odmiana: 1 opinia, 2-4 opinie (bez 12-14), 5+ opinii. */
export function opinieLabel(liczba: number): string {
  if (liczba === 1) return "1 opinia";
  const reszta10 = liczba % 10;
  const reszta100 = liczba % 100;
  if (reszta10 >= 2 && reszta10 <= 4 && (reszta100 < 12 || reszta100 > 14)) return `${liczba} opinie`;
  return `${liczba} opinii`;
}
