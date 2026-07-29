import type { PremiumOfferPageProps } from "@/components/sections/PremiumOfferPage";

export type PremiumOfferKey =
  | "contentMachine"
  | "customerOperations"
  | "premiumColdEmail"
  | "generatorOfert"
  | "hotLeadCatcher"
  | "customWorkflow";

export const PREMIUM_OFFERS: Record<PremiumOfferKey, PremiumOfferPageProps> = {
  contentMachine: {
    path: "/oferta/content-machine",
    eyebrow: "Content i SEO",
    title: "Content Machine",
    intro:
      "System do planowania, przygotowania, publikacji i dystrybucji treści. Zamienia wiedzę firmy w regularny content zgodny z jej językiem.",
    fit:
      "Firmy z e-commerce, usług B2B albo produkcji, które potrzebują regularnych treści bez zatrudniania kolejnych osób.",
    promise:
      "Mniej ręcznej pracy, więcej publikacji i stała kontrola jakości zamiast generycznych tekstów z AI.",
    workflow: [
      "Zbieramy źródła: oferta, katalog, FAQ, rozmowy sprzedażowe, komentarze klientów i realne pytania z rynku.",
      "Budujemy klastry tematów pod SEO, wyszukiwarki AI i social media, a potem wybieramy kolejność publikacji.",
      "Tworzymy plan tekstu, wersję roboczą, redakcję, kontrolę faktów i materiał gotowy do publikacji.",
      "Co miesiąc sprawdzamy jakość, pokrycie tematów, sygnały z rynku i następne priorytety contentowe.",
    ],
    qualityGate: [
      "Każdy tekst powstaje na podstawie pakietu źródeł.",
      "Plan oddziela fakty od hipotez i oznacza miejsca, których nie wolno dopowiadać.",
      "Redakcja usuwa sztuczny język, przesadzone obietnice i fragmenty bez konkretu.",
      "Publikacja jest częścią procesu, więc materiał trafia do właściwego kanału po akceptacji.",
    ],
    outcomes: [
      "Publikacje wychodzą w ustalonym rytmie, bez zaczynania każdego tekstu od pustej kartki.",
      "Każdy materiał ma wskazane źródła i status kontroli faktów.",
      "Mierzymy czas od wyboru tematu do wersji gotowej do akceptacji.",
      "Zespół widzi, co jest w analizie, co w redakcji i co czeka na publikację.",
    ],
    implementationItems: [
      "Audyt obecnego procesu contentowego, kanałów i kryteriów dobrej publikacji.",
      "Uporządkowanie zatwierdzonych materiałów, języka marki i bazy wiedzy.",
      "Konfiguracja ścieżki od wyboru tematu przez redakcję do akceptacji.",
      "Połączenie uzgodnionych kanałów publikacji i statusów pracy.",
      "Testy pełnego cyklu na realnych materiałach firmy oraz dokumentacja obsługi.",
    ],
    monthlyCareItems: [
      "Monitoring przygotowania, akceptacji i publikacji materiałów.",
      "Naprawy błędów w istniejących ścieżkach i kanałach.",
      "Aktualizacje bazy wiedzy, źródeł i reguł języka marki.",
      "Dostosowanie istniejących połączeń do zmian w API wydawców.",
      "Kontrola faktów, wyjątków oraz raport z tematów i jakości.",
    ],
    scopeBoundary:
      "Nowy kanał, dodatkowa marka, nowy typ materiału, migracja narzędzia publikacji albo przebudowa procesu redakcyjnego dostają osobny zakres i wycenę.",
    acceptanceCriteria: [
      "Materiał korzysta wyłącznie z zatwierdzonych źródeł i oznacza braki do decyzji.",
      "Pełna ścieżka od tematu do akceptacji działa na uzgodnionym przykładzie.",
      "Publikacja trafia do właściwego kanału dopiero po wymaganej akceptacji.",
      "Zespół otrzymuje dokumentację statusów, wyjątków i codziennej obsługi.",
    ],
    diagnosisTitle: "Sprawdź, czy Content Machine pasuje do Twojego procesu",
    diagnosisCtaLabel: "Umów diagnozę Content Machine",
    notes: [
      "Dobre dla firm, gdzie jeden dobry temat może pracować w SEO, social i sprzedaży.",
      "Wycena zależy od liczby źródeł, kanałów, tempa publikacji i poziomu redakcji.",
      "Potencjał ruchu szacujemy po sprawdzeniu domeny, konkurencji i obecnych zasobów.",
      "Pierwszeństwo mają tematy z sensem biznesowym i potwierdzonym popytem.",
    ],
  },
  customerOperations: {
    path: "/oferta/obsluga-klienta",
    eyebrow: "Obsługa klienta",
    title: "Customer Operations AI",
    intro:
      "Agent AI do obsługi pytań i powtarzalnych spraw. Działa na źródłach firmy, zbiera kontekst i przekazuje ludziom tematy, które naprawdę wymagają decyzji.",
    fit:
      "Firmy, które rosną szybciej niż zespół obsługi, mają wiele kanałów kontaktu albo tracą czas na powtarzalne pytania.",
    promise:
      "Mniej gaszenia tematów, szybsza odpowiedź i uporządkowana obsługa bez automatyzacji na ślepo.",
    workflow: [
      "Mapujemy kanały kontaktu, typy spraw, bazę wiedzy, ryzyka i momenty, w których człowiek musi wejść do procesu.",
      "Budujemy źródła odpowiedzi: dokumenty, FAQ, regulaminy, historię spraw, dane z CRM i ograniczenia językowe.",
      "Projektujemy ścieżki odpowiedzi, zbierania braków, przekazania do człowieka i zapisu statusu w systemie.",
      "Po wdrożeniu monitorujemy jakość odpowiedzi, błędy, eskalacje i tematy do dopisania w bazie wiedzy.",
    ],
    qualityGate: [
      "Przy braku źródła system prosi o dane albo eskaluje sprawę.",
      "Odpowiedzi są sprawdzane pod ton firmy, zgodność z bazą wiedzy i ryzyko błędnej obietnicy.",
      "Każda automatyzacja ma granice odpowiedzialności, żeby AI nie podejmowało decyzji biznesowych za zespół.",
      "Raport pokazuje liczbę spraw oraz luki w procesie, źródłach i komunikacji.",
    ],
    outcomes: [
      "Mierzymy czas od pytania klienta do pierwszej poprawnej odpowiedzi.",
      "Zespół dostaje sprawy wymagające decyzji albo brakujących danych.",
      "Każda sprawa ma status, kontekst i wskazaną ścieżkę eskalacji.",
      "Raport pokazuje pytania, które najczęściej wracają do człowieka.",
    ],
    implementationItems: [
      "Audyt kanałów, typów spraw, czasu odpowiedzi i ryzyka błędnej odpowiedzi.",
      "Budowa zatwierdzonej bazy wiedzy z zasadami dostępu i aktualizacji.",
      "Projekt odpowiedzi, dopytywania o braki oraz eskalacji do człowieka.",
      "Połączenie uzgodnionych kanałów z CRM albo systemem obsługi.",
      "Testy typowych spraw i wyjątków na danych firmy oraz instrukcja dla zespołu.",
    ],
    monthlyCareItems: [
      "Monitoring odpowiedzi, eskalacji, błędów i uzgodnionych limitów.",
      "Naprawy w działających kanałach oraz istniejących integracjach.",
      "Aktualizacje FAQ, dokumentów i reguł odpowiedzi.",
      "Dostosowanie istniejących integracji do zmian w API kanałów.",
      "Przegląd wyjątków oraz raport z jakości i braków w wiedzy.",
    ],
    scopeBoundary:
      "Nowy kanał kontaktu, kolejny język, nowe źródło danych, integracja z innym systemem albo automatyzacja nowego typu spraw wymagają osobnego zakresu.",
    acceptanceCriteria: [
      "System odpowiada zgodnie z zatwierdzoną wiedzą albo bezpiecznie eskaluje brak.",
      "Każda przekazana sprawa zawiera kontekst i powód decyzji człowieka.",
      "Uzgodnione kanały zapisują status sprawy we właściwym systemie.",
      "Testy obejmują typowe pytania, brak danych, wyjątek i błąd integracji.",
    ],
    diagnosisTitle: "Sprawdź, czy Customer Operations AI odciąży obsługę",
    diagnosisCtaLabel: "Umów diagnozę obsługi klienta",
    notes: [
      "Dobre dla sklepów, usług B2B, edukacji, usług lokalnych i firm z dużą liczbą powtarzalnych pytań.",
      "Zakres zależy od kanałów, jakości bazy wiedzy, integracji i wymaganych eskalacji.",
      "Kryterium wdrożenia stanowi jakość obsłużonej sprawy.",
      "Najpierw sprawdzamy, gdzie automatyzacja naprawdę odciąży zespół.",
    ],
  },
  premiumColdEmail: {
    path: "/oferta/pipeline-machine",
    eyebrow: "Sprzedaż B2B",
    title: "Premium Cold Email+",
    intro:
      "Wybieramy firmy z realnym powodem do kontaktu. Sprawdzamy źródła, przygotowujemy wiadomości i prowadzimy kampanię na podstawie odpowiedzi.",
    fit:
      "Firmy B2B, w których wartość kontraktu uzasadnia dokładniejszą analizę, lepszy język i lepszą selekcję kont.",
    promise:
      "Kampania prowadzona jako system: strategia, dane, treść, wysyłka, odpowiedzi i stałe utrzymanie.",
    workflow: [
      "Wybieramy firmy i oceniamy, czy pasują do oferty, mają właściwy profil i sensowny powód do kontaktu.",
      "Dla najlepszych kont zbieramy źródła: stronę, ofertę, rolę decydenta, sygnały zmiany i możliwy moment zakupu.",
      "Na tej podstawie powstaje jeden jasny powód kontaktu i proste wezwanie do działania.",
      "Kampania ma kontrolę faktów, listę wykluczeń, monitoring odpowiedzi i plan zmian oparty na danych.",
    ],
    qualityGate: [
      "Każda obietnica ma źródło albo jasno opisany logiczny wniosek.",
      "Personalizacja dotyczy biznesu odbiorcy i konkretnego powodu kontaktu.",
      "Język jest prosty, konkretny i naturalny.",
      "Model współpracy obejmuje wdrożenie i stałą obsługę kampanii.",
    ],
    outcomes: [
      "Każda firma na liście ma zapisany powód kontaktu i źródło.",
      "Wiadomość przechodzi kontrolę faktów oraz języka przed wysyłką.",
      "Porównujemy odpowiedzi między segmentami i powodami kontaktu.",
      "Wnioski z odpowiedzi trafiają do kolejnych iteracji kampanii.",
    ],
    implementationItems: [
      "Audyt oferty, rynku, dotychczasowych kampanii i kryteriów właściwego kontaktu.",
      "Ustalenie profilu firm, osób decyzyjnych, wykluczeń i źródeł do weryfikacji.",
      "Pierwszy zweryfikowany zestaw firm i kontaktów gotowych do zatwierdzenia.",
      "Przygotowanie infrastruktury wysyłkowej, segmentów i bezpiecznych limitów.",
      "Budowa procesu researchu, redakcji, akceptacji oraz obsługi odpowiedzi.",
      "Test na ograniczonej próbie i uruchomienie po zatwierdzeniu wiadomości.",
    ],
    monthlyCareItems: [
      "Monitoring dostarczalności, odpowiedzi, błędów i wykluczeń.",
      "Naprawy działających sekwencji, skrzynek i połączeń.",
      "Odświeżanie i uzupełnianie zatwierdzonego zestawu firm w uzgodnionym wolumenie.",
      "Aktualizacja listy wykluczeń, źródeł i danych o kampanii.",
      "Dostosowanie istniejących integracji do zmian w API dostawców.",
      "Optymalizacja segmentów i wiadomości na podstawie odpowiedzi oraz raport.",
    ],
    scopeBoundary:
      "Dodatkowy wolumen, nowy rynek, język, oferta, kanał kontaktu, infrastruktura wysyłkowa albo migracja dostawcy wymagają nowej diagnozy i osobnej wyceny.",
    acceptanceCriteria: [
      "Każdy kontakt ma zweryfikowaną firmę, rolę, źródło i powód wiadomości.",
      "Sekwencja przechodzi kontrolę faktów, języka, wykluczeń i limitów wysyłki.",
      "Próba kampanii działa na zatwierdzonych skrzynkach bez błędów krytycznych.",
      "Odpowiedzi mają status, właściciela i ustaloną ścieżkę dalszej obsługi.",
    ],
    diagnosisTitle: "Sprawdź, czy Premium Cold Email+ pasuje do sprzedaży",
    diagnosisCtaLabel: "Umów diagnozę kampanii B2B",
    notes: [
      "Dobre dla ofert premium, gdzie masowa kampania psuje pozycjonowanie.",
      "Zakres zależy od jakości danych, liczby segmentów, poziomu analizy i liczby skrzynek.",
      "Prognozę kampanii przygotowujemy po sprawdzeniu rynku, listy, oferty i dotychczasowych danych.",
      "Najpierw kalibrujemy segmenty na mniejszej próbie, potem skalujemy zwycięskie kąty.",
    ],
  },
  generatorOfert: {
    path: "/oferta/generator-ofert",
    eyebrow: "Ofertowanie",
    title: "Generator Ofert",
    intro:
      "System zbiera dane od klienta, porządkuje zakres i przygotowuje wersję roboczą oferty w formie PDF albo maila. Dobry tam, gdzie wycena blokuje sprzedaż.",
    fit:
      "Firmy, w których handlowiec albo właściciel traci dużo czasu na powtarzalne oferty, konfiguracje i doprecyzowania.",
    promise:
      "Szybsze ofertowanie, mniej ręcznego przepisywania i bardziej spójny standard propozycji dla klienta.",
    workflow: [
      "Mapujemy typy zapytań, wymagane dane wejściowe, wyjątki, widełki decyzyjne i format finalnej oferty.",
      "Projektujemy formularz, chat albo proces mailowy, który zbiera brakujące informacje bez długiej wymiany wiadomości.",
      "System generuje strukturę oferty, zakres, założenia, elementy ryzyka i wersję do sprawdzenia przez człowieka.",
      "Po akceptacji oferta trafia do klienta, a status i follow-up zostają zapisane w procesie sprzedaży.",
    ],
    qualityGate: [
      "Zakres, ceny i terminy pochodzą wyłącznie z zatwierdzonych reguł oraz danych firmy.",
      "Wersja dla klienta ma być czytelna, elegancka i wolna od technicznego języka automatyzacji.",
      "Człowiek widzi założenia oraz braki, zanim dokument wyjdzie do klienta.",
      "System uczy się na typowych poprawkach, ale nie przejmuje decyzji cenowej bez zgody.",
    ],
    outcomes: [
      "Mierzymy czas od zebrania danych do draftu gotowego do kontroli.",
      "Ceny i warunki pochodzą z zatwierdzonych źródeł firmy.",
      "System pokazuje braki w zapytaniu przed przygotowaniem dokumentu.",
      "Status oferty i termin kolejnego kontaktu są zapisane w procesie sprzedaży.",
    ],
    implementationItems: [
      "Audyt typów ofert, danych wejściowych, cennika i reguł akceptacji.",
      "Uporządkowanie zatwierdzonych zakresów, warunków i szablonów dokumentów.",
      "Budowa formularza albo rozmowy, która zbiera wymagane dane i wykrywa braki.",
      "Połączenie generatora z uzgodnionym CRM, mailem lub miejscem zapisu.",
      "Testy ofert standardowych i wyjątków oraz dokumentacja dla handlowców.",
    ],
    monthlyCareItems: [
      "Monitoring generowania, błędów dokumentów i statusów ofert.",
      "Naprawy w istniejących szablonach oraz połączeniach.",
      "Aktualizacje zatwierdzonego cennika, zakresów i reguł ofertowania.",
      "Dostosowanie istniejących integracji do zmian w API.",
      "Kontrola wyjątków i raport z braków oraz czasu przygotowania.",
    ],
    scopeBoundary:
      "Nowa linia produktowa, dodatkowy kalkulator, inny format dokumentu, nowa integracja albo zmiana logiki cenowej poza uzgodnionymi regułami są wyceniane osobno.",
    acceptanceCriteria: [
      "System blokuje dokument, gdy brakuje danych wymaganych dla danego typu oferty.",
      "Cena, zakres i warunki pochodzą z zatwierdzonych źródeł firmy.",
      "Uzgodnione przykłady generują poprawny dokument gotowy do akceptacji.",
      "Handlowiec widzi założenia, wyjątki i status przed wysłaniem oferty.",
    ],
    diagnosisTitle: "Sprawdź, czy Generator Ofert skróci ofertowanie",
    diagnosisCtaLabel: "Umów diagnozę ofertowania",
    notes: [
      "Dobre jako dodatek do obsługi klienta, sprzedaży albo contentu produktowego.",
      "Zakres zależy od wariantów oferty, integracji, danych wejściowych i poziomu akceptacji.",
      "Strategia cenowa zostaje po stronie firmy. System automatyzuje przygotowanie i kontrolę.",
      "Najpierw wybieramy najczęstszy typ oferty, potem dokładamy kolejne przypadki.",
    ],
  },
  hotLeadCatcher: {
    path: "/oferta/hot-lead-catcher",
    eyebrow: "Sygnały zakupowe",
    title: "Hot Lead Catcher",
    intro:
      "Warstwa sygnałów zakupowych dla sprzedaży B2B. System monitoruje zdarzenia, ocenia ich znaczenie i przygotowuje kontekst do kontaktu.",
    fit:
      "Firmy, które mają jasno opisany idealny profil klienta i wiedzą, jakie zdarzenia zwiększają szansę zakupu.",
    promise:
      "Szybsze zauważanie okazji, lepszy moment kontaktu i mniej ręcznego przeglądania źródeł.",
    workflow: [
      "Ustalamy sygnały, które naprawdę mają znaczenie: zmiany w firmie, rekrutacje, ekspansja, nowe projekty albo publiczne wzmianki.",
      "System zbiera dane z uzgodnionych źródeł i odrzuca szum, który nie pasuje do profilu klienta albo scenariusza sprzedaży.",
      "Każdy mocny sygnał dostaje kontekst: co się stało, dlaczego to może mieć znaczenie i jaki kierunek kontaktu warto sprawdzić.",
      "Najlepsze sygnały mogą trafiać do Premium Cold Email+ jako powód kontaktu i materiał do personalizacji.",
    ],
    qualityGate: [
      "Sygnał ma związek z realnym problemem albo zmianą w firmie.",
      "Źródła są jawne w notatce, więc handlowiec zna pochodzenie kontekstu.",
      "Kwalifikacja konta zostaje po stronie sprzedaży.",
      "Każdy alert wskazuje konkretną akcję do sprawdzenia.",
    ],
    outcomes: [
      "Każdy alert wskazuje zdarzenie, źródło i możliwy związek z ofertą.",
      "Mierzymy, które typy sygnałów prowadzą do kontaktu zaakceptowanego przez sprzedaż.",
      "Zespół odrzuca szum i zapisuje powód odrzucenia do dalszej kalibracji.",
      "Raport pokazuje źródła, które dostarczają wartościowy kontekst.",
    ],
    implementationItems: [
      "Audyt profilu klienta, momentów zakupowych i kryteriów wartościowego alertu.",
      "Wybór zatwierdzonych źródeł wraz z częstotliwością sprawdzania.",
      "Budowa zbierania, deduplikacji, oceny i opisu sygnałów.",
      "Połączenie alertów z uzgodnionym kanałem oraz procesem sprzedaży.",
      "Kalibracja na realnej próbce sygnałów i dokumentacja oceny.",
    ],
    monthlyCareItems: [
      "Monitoring dostępności źródeł, błędów zbierania i opóźnień alertów.",
      "Naprawy istniejących kolektorów oraz kanałów powiadomień.",
      "Aktualizacje słownika sygnałów, źródeł i reguł oceny.",
      "Dostosowanie istniejących połączeń do zmian w API źródeł.",
      "Przegląd odrzuceń, kalibracja szumu i raport z wartości sygnałów.",
    ],
    scopeBoundary:
      "Nowe źródło płatne, kolejny rynek, inny profil klienta, automatyczny kontakt z firmą albo integracja z nowym systemem sprzedaży wymagają osobnej wyceny.",
    acceptanceCriteria: [
      "Każdy alert zawiera zdarzenie, aktywne źródło i wyjaśnienie związku z ofertą.",
      "Duplikaty oraz sygnały poza profilem są odrzucane według uzgodnionych reguł.",
      "Zatwierdzony alert trafia do właściwego kanału z wymaganym kontekstem.",
      "Próbka kalibracyjna ma zapisane decyzje sprzedaży i powody odrzucenia.",
    ],
    diagnosisTitle: "Sprawdź, czy Hot Lead Catcher znajdzie właściwe sygnały",
    diagnosisCtaLabel: "Umów diagnozę sygnałów zakupowych",
    notes: [
      "Dobre, gdy branża ma widoczne sygnały zakupu albo zmiany operacyjnej.",
      "Zakres zależy od źródeł, częstotliwości monitoringu, scoringu i integracji ze sprzedażą.",
      "Jakość sygnałów sprawdzamy na ograniczonej próbie przed skalowaniem.",
      "Najlepiej działa jako warstwa danych dla kampanii sprzedażowej.",
    ],
  },
  customWorkflow: {
    path: "/oferta/indywidualne-wdrozenia",
    eyebrow: "Indywidualny proces",
    title: "Indywidualne Wdrożenia",
    intro:
      "Dedykowany agent AI dla procesu, którego nie da się uczciwie zamknąć w gotowym pakiecie. Zaczynamy od diagnozy, a potem projektujemy system pod realny sposób pracy firmy.",
    fit:
      "Firmy z nietypowym procesem sprzedaży, obsługi, ofertowania, dokumentów albo danych, gdzie gotowy produkt byłby zbyt ciasny.",
    promise:
      "Projekt dopasowany do procesu, integracji i odpowiedzialności zespołu, bez publicznego cennika oderwanego od zakresu.",
    workflow: [
      "Rozpisujemy proces, role, źródła danych, decyzje, wyjątki i miejsca, w których dziś znika czas albo jakość.",
      "Projektujemy najmniejszy sensowny proces, który da się wdrożyć, utrzymać i mierzyć po realnym użyciu.",
      "Budujemy integracje, logikę agenta, kontrolę jakości, widoczność statusów i ścieżki eskalacji.",
      "Po starcie utrzymujemy system, poprawiamy go na danych i oddzielamy dobre automatyzacje od tych, które nie mają ROI.",
    ],
    qualityGate: [
      "Zakres wynika z procesu, kosztu błędów i realnej wartości biznesowej.",
      "Każda integracja ma właściciela, dane wejściowe, status błędu i plan bezpiecznej eskalacji.",
      "Agent nie podejmuje decyzji, których firma nie umie opisać regułą albo źródłem.",
      "Dokumentujemy działanie systemu, jego granice i miejsca wymagające decyzji człowieka.",
    ],
    outcomes: [
      "Przed pilotem ustalamy kryterium wyniku i sposób jego kontroli.",
      "Zespół widzi status procesu, błędy i miejsca wymagające decyzji.",
      "Wyjątki mają wskazanego właściciela oraz ścieżkę bezpiecznej eskalacji.",
      "Plan opieki określa, kto reaguje na błędy i jak utrzymujemy uzgodniony zakres.",
    ],
    implementationItems: [
      "Audyt procesu, ról, kosztu ręcznej pracy i konsekwencji błędu.",
      "Mapa danych, decyzji, wyjątków, uprawnień oraz kryteriów odbioru.",
      "Projekt najmniejszej wersji łączącej potrzebne narzędzia i źródła.",
      "Budowa logiki, integracji, kontroli wyniku oraz widoczności statusów.",
      "Pilot na realnych przypadkach, uruchomienie i dokumentacja operacyjna.",
    ],
    monthlyCareItems: [
      "Monitoring działania, błędów, limitów i ścieżek eskalacji.",
      "Naprawy w uzgodnionym procesie oraz istniejących integracjach.",
      "Aktualizacje zatwierdzonych źródeł, wiedzy i reguł.",
      "Dostosowanie istniejących połączeń do zmian w API.",
      "Analiza wyjątków, optymalizacja i uzgodniony raport operacyjny.",
    ],
    scopeBoundary:
      "Nowy dział, proces, źródło danych, kanał, dostawca albo istotna zmiana logiki biznesowej oznaczają rozszerzenie projektu z osobnym terminem i wyceną.",
    acceptanceCriteria: [
      "Uzgodniony proces przechodzi od wejścia do wyniku na realnym przypadku.",
      "Każdy wyjątek ma widoczny status, właściciela i bezpieczną ścieżkę obsługi.",
      "Błąd integracji nie prowadzi do utraty danych ani działania bez kontroli.",
      "Dokumentacja opisuje zakres, role, obsługę, ograniczenia i plan reakcji.",
    ],
    diagnosisTitle: "Sprawdź, czy indywidualne wdrożenie ma sens",
    diagnosisCtaLabel: "Umów diagnozę własnego procesu",
    notes: [
      "Dobre dla procesów, które mają wysoki koszt ręcznej pracy albo błędu.",
      "Zakres i cena zależą od integracji, danych, ryzyka i poziomu utrzymania.",
      "Pierwszy proces ma możliwie mały zakres i szybko potwierdza wartość.",
      "Najpierw diagnozujemy proces, potem decydujemy, czy indywidualne wdrożenie ma sens.",
    ],
  },
};
