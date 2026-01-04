import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Jak wybrać procesy do automatyzacji? Framework 80/20 | LessManual Blog',
    description: '73% projektów automatyzacji kończy się porażką. Poznaj Framework 80/20, który pomoże Ci wybrać właściwe procesy i zobaczyć ROI już w pierwszym miesiącu.',
    openGraph: {
      title: 'Jak wybrać procesy do automatyzacji? Framework 80/20',
      description: 'Prosty framework, który oszczędził mi 120 godzin miesięcznie. Dowiedz się, jak wybrać właściwe procesy do automatyzacji.',
      images: [{
        url: '/images/blog/framework-80-20-automatyzacja.webp',
        width: 1376,
        height: 768,
        alt: 'Framework 80/20 dla automatyzacji procesów',
      }],
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<React.ReactElement> {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-night">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center text-pear hover:text-pear/80 transition-colors mb-8"
          >
            ← Powrót do bloga
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Jak wybrać procesy do automatyzacji? Framework 80/20
            </h1>
            <p className="text-xl text-white/70 mb-6">
              Prosty framework, który oszczędził mi 120 godzin miesięcznie.
            </p>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <time dateTime="2026-01-04">4 stycznia 2026</time>
              <span>•</span>
              <span>12 min czytania</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="my-8 rounded-lg overflow-hidden border border-white/10">
            <Image
              src="/images/blog/framework-80-20-automatyzacja.webp"
              alt="Framework 80/20 dla automatyzacji procesów"
              width={1376}
              height={768}
              className="w-full h-auto"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Hook */}
            <div className="bg-gradient-to-r from-pear/10 to-tekhelet/10 border border-pear/30 rounded-lg p-6 mb-8">
              <p className="text-white/90 text-xl font-medium mb-4">
                <strong className="text-pear">73% projektów automatyzacji kończy się porażką.</strong>
              </p>
              <p className="text-white/80 mb-4">
                Nie dlatego, że technologia nie działa. Dlatego, że firmy automatyzują <strong>ZŁAMIAŁ PROCESY</strong>.
              </p>
              <p className="text-white/80 mb-4">
                Polscy przedsiębiorcy z sektora MŚP spędzają <strong>45% swojego czasu</strong> na powtarzalnych, manualnych zadaniach. To 18 godzin tygodniowo. 72 godziny miesięcznie. <strong>864 godziny rocznie</strong>.
              </p>
              <p className="text-white/90 font-medium">
                Co by było, gdybyś mógł odzyskać choćby połowę tego czasu?
              </p>
            </div>

            {/* Problem */}
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Problem: Dlaczego większość automatyzacji kończy się fiaskiem</h2>

            <p className="text-white/80 mb-4">Widziałem to setki razy.</p>

            <p className="text-white/80 mb-4">
              Przedsiębiorca słyszy o "automatyzacji AI" i myśli: <em className="text-white/90">"To jest to! Zautomatyzuję wszystko i będę miał więcej czasu!"</em>
            </p>

            <p className="text-white/80 mb-4">
              Kupuje narzędzie. Zatrudnia agencję. Wydaje 20, 50, 100 tysięcy złotych.
            </p>

            <p className="text-white/80 mb-6">
              6 miesięcy później? <strong className="text-white">Boty nie działają. Zespół wrócił do Excela. Pieniądze w błoto.</strong>
            </p>

            <h3 className="text-2xl font-bold text-pear mt-8 mb-4">Dlaczego tak się dzieje?</h3>

            <p className="text-white/80 mb-4">Bo automatyzują procesy, które:</p>
            <ul className="text-white/80 space-y-2 mb-6">
              <li><strong>Są już zepsute</strong> — automatyzacja złych procesów = szybsze robienie złych rzeczy</li>
              <li><strong>Wymagają ludzkiego osądu</strong> — AI nie podejmie decyzji za Ciebie</li>
              <li><strong>Zdarzają się raz na kwartał</strong> — ROI nigdy się nie zwróci</li>
            </ul>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <p className="text-white/90">
                Według <strong className="text-pear">Gartnera</strong>, 70% inicjatyw automatyzacyjnych w dużych firmach kończy się porażką właśnie z tego powodu.
              </p>
            </div>

            {/* Solution */}
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Rozwiązanie: Framework 80/20 dla automatyzacji</h2>

            <p className="text-white/80 mb-4">
              Zasada Pareto mówi: <strong className="text-white">20% działań generuje 80% rezultatów.</strong>
            </p>

            <p className="text-white/80 mb-4">
              W automatyzacji to oznacza: <strong className="text-pear">20% Twoich procesów pochłania 80% Twojego czasu.</strong>
            </p>

            <p className="text-white/80 mb-6">
              Znajdź te 20%. Zautomatyzuj je. Resztę zostaw.
            </p>

            <p className="text-white/80 mb-8">
              Brzmi prosto? Jest proste. Ale wymaga systematycznego podejścia. Oto 5-krokowy framework, który stosuję u klientów:
            </p>

            {/* Step 1 */}
            <div className="bg-pear/10 border-l-4 border-pear rounded-r-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-pear mb-4">KROK 1: Zrób audyt procesów (30 minut)</h3>

              <p className="text-white/80 mb-4">
                Weź kartkę i zapisz <strong className="text-white">WSZYSTKIE</strong> powtarzalne czynności, które wykonujesz (lub Twój zespół) w ciągu tygodnia.
              </p>

              <p className="text-white/80 mb-3">Przykłady:</p>
              <ul className="text-white/70 space-y-1 mb-4">
                <li>→ Wysyłanie potwierdzeń zamówień</li>
                <li>→ Kopiowanie danych z maili do CRM</li>
                <li>→ Odpowiadanie na te same pytania klientów</li>
                <li>→ Generowanie raportów</li>
                <li>→ Przypominanie o płatnościach</li>
              </ul>

              <p className="text-white/80 mb-4">
                Nie oceniaj. Nie filtruj. Po prostu spisz wszystko.
              </p>

              <p className="text-pear font-medium">
                Pro tip: Poproś zespół, żeby przez 3 dni zapisywali każdą czynność, którą robią więcej niż raz. Będziesz zaskoczony.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-pear/10 border-l-4 border-pear rounded-r-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-pear mb-4">KROK 2: Oceń każdy proces w 4 wymiarach</h3>

              <p className="text-white/80 mb-4">
                Dla każdego procesu z listy odpowiedz na 4 pytania (skala 1-5):
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-night/50 rounded-lg p-4">
                  <p className="text-white font-semibold">1. Częstotliwość (F - Frequency)</p>
                  <p className="text-white/70">Ile razy w miesiącu to robisz?</p>
                  <p className="text-white/60 text-sm">1 = raz na kwartał, 5 = codziennie wiele razy</p>
                </div>

                <div className="bg-night/50 rounded-lg p-4">
                  <p className="text-white font-semibold">2. Czasochłonność (T - Time)</p>
                  <p className="text-white/70">Ile minut zajmuje jedna iteracja?</p>
                  <p className="text-white/60 text-sm">1 = 2 minuty, 5 = 30+ minut</p>
                </div>

                <div className="bg-night/50 rounded-lg p-4">
                  <p className="text-white font-semibold">3. Przewidywalność (P - Predictability)</p>
                  <p className="text-white/70">Czy proces ma jasne zasady "jeśli X, to Y"?</p>
                  <p className="text-white/60 text-sm">1 = wymaga intuicji/doświadczenia, 5 = czyste if/then</p>
                </div>

                <div className="bg-night/50 rounded-lg p-4">
                  <p className="text-white font-semibold">4. Podatność na błędy (E - Error-prone)</p>
                  <p className="text-white/70">Jak często zdarzają się pomyłki?</p>
                  <p className="text-white/60 text-sm">1 = nigdy, 5 = ciągle się mylę</p>
                </div>
              </div>

              <div className="bg-night border border-pear/30 rounded-lg p-4">
                <p className="text-pear font-mono font-bold text-center">
                  AS = (F × 0.3) + (T × 0.25) + (P × 0.25) + (E × 0.2)
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-pear/10 border-l-4 border-pear rounded-r-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-pear mb-4">KROK 3: Wyciągnij TOP 5 procesów</h3>

              <p className="text-white/80 mb-4">
                Posortuj procesy od najwyższego Automation Score.
              </p>

              <p className="text-white/80 mb-6">
                Górne 20% (zwykle 3-5 procesów) to Twoje <strong className="text-white">"złote nuggetsy"</strong> — procesy, które zajmują najwięcej czasu, są powtarzalne i przewidywalne, oraz generują najwięcej błędów.
              </p>

              <p className="text-white/90 font-medium mb-3">Przykład z mojej praktyki (firma e-commerce):</p>
              <ol className="text-white/70 space-y-2">
                <li>1. Odpowiadanie na pytania o status zamówienia <span className="text-pear">(AS: 4.7)</span></li>
                <li>2. Aktualizacja stanów magazynowych w 3 systemach <span className="text-pear">(AS: 4.5)</span></li>
                <li>3. Wysyłanie follow-upów po zakupie <span className="text-pear">(AS: 4.3)</span></li>
                <li>4. Generowanie etykiet kurierskich <span className="text-pear">(AS: 4.1)</span></li>
                <li>5. Raportowanie sprzedaży do księgowości <span className="text-pear">(AS: 3.9)</span></li>
              </ol>
            </div>

            {/* Step 4 */}
            <div className="bg-pear/10 border-l-4 border-pear rounded-r-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-pear mb-4">KROK 4: Zweryfikuj z "Testem Stażysty"</h3>

              <p className="text-white/80 mb-4">
                Zanim zautomatyzujesz, zadaj sobie pytanie:
              </p>

              <p className="text-white bg-night/50 rounded-lg p-4 mb-6 italic">
                "Czy mógłbym nauczyć inteligentnego stażystę wykonywać ten proces w 15 minut?"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 font-semibold mb-2">Jeśli TAK ✓</p>
                  <p className="text-white/70">Świetny kandydat do automatyzacji</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 font-semibold mb-2">Jeśli NIE ✗</p>
                  <p className="text-white/70">Zostaw go ludziom (wymaga osądu/kontekstu)</p>
                </div>
              </div>

              <p className="text-white/80 mb-2">Przykłady procesów, które NIE przeszły testu:</p>
              <ul className="text-white/70 space-y-1">
                <li>→ Negocjacje z kluczowymi klientami (relacja)</li>
                <li>→ Decyzje o zwrotach niestandardowych (osąd)</li>
                <li>→ Tworzenie strategii marketingowej (kreatywność)</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-pear/10 border-l-4 border-pear rounded-r-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-pear mb-4">KROK 5: Zacznij od jednego procesu</h3>

              <p className="text-white/80 mb-4">
                To najważniejsza zasada, którą <strong className="text-white">90% firm ignoruje.</strong>
              </p>

              <p className="text-white font-bold text-xl mb-4">
                NIE automatyzuj 5 rzeczy na raz.
              </p>

              <p className="text-white/80 mb-4">
                Wybierz JEDEN proces z najwyższym Automation Score. Zautomatyzuj go. Przetestuj przez 2 tygodnie. Zmierz oszczędności. Dopiero wtedy przejdź do następnego.
              </p>

              <p className="text-white/80 mb-2">Dlaczego?</p>
              <ul className="text-white/70 space-y-1">
                <li>→ Szybciej zobaczysz ROI (motywacja dla zespołu)</li>
                <li>→ Łatwiej wykryjesz problemy</li>
                <li>→ Unikniesz "paraliżu automatyzacyjnego"</li>
              </ul>
            </div>

            {/* What to automate */}
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Co możesz zautomatyzować już dziś?</h2>

            <p className="text-white/80 mb-6">
              Na podstawie 50+ wdrożeń, oto procesy z najwyższym ROI w polskich firmach:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="text-pear font-bold mb-3">Obsługa klienta</h4>
                <ul className="text-white/70 space-y-2">
                  <li>✅ Odpowiedzi na FAQ (chatbot AI)</li>
                  <li>✅ Aktualizacje statusu zamówień</li>
                  <li>✅ Przypomnienia o porzuconych koszykach</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="text-pear font-bold mb-3">Sprzedaż</h4>
                <ul className="text-white/70 space-y-2">
                  <li>✅ Kwalifikacja leadów (scoring AI)</li>
                  <li>✅ Follow-upy po ofercie</li>
                  <li>✅ Raportowanie wyników</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="text-pear font-bold mb-3">Finanse</h4>
                <ul className="text-white/70 space-y-2">
                  <li>✅ Fakturowanie cykliczne</li>
                  <li>✅ Przypomnienia o płatnościach</li>
                  <li>✅ Eksport danych do księgowości</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="text-pear font-bold mb-3">HR</h4>
                <ul className="text-white/70 space-y-2">
                  <li>✅ Wstępna selekcja CV</li>
                  <li>✅ Onboarding (wysyłanie dokumentów)</li>
                  <li>✅ Przypomnienia o urlopach</li>
                </ul>
              </div>
            </div>

            {/* Results */}
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Ile możesz zaoszczędzić?</h2>

            <p className="text-white/80 mb-6">
              Firmy, które stosują Framework 80/20, oszczędzają średnio:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-pear/20 to-pear/5 border border-pear/30 rounded-lg p-6 text-center">
                <p className="text-4xl font-bold text-pear mb-2">15-20h</p>
                <p className="text-white/70">tygodniowo na administracji</p>
              </div>
              <div className="bg-gradient-to-br from-pear/20 to-pear/5 border border-pear/30 rounded-lg p-6 text-center">
                <p className="text-4xl font-bold text-pear mb-2">40-60%</p>
                <p className="text-white/70">mniej błędów w danych</p>
              </div>
              <div className="bg-gradient-to-br from-pear/20 to-pear/5 border border-pear/30 rounded-lg p-6 text-center">
                <p className="text-4xl font-bold text-pear mb-2">3-6 mies.</p>
                <p className="text-white/70">do zwrotu ROI</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <p className="text-white/90 mb-4">
                <strong className="text-pear">Case study:</strong> Jeden z moich klientów (sklep e-commerce, 3 osoby w zespole) odzyskał <strong className="text-white">120 godzin miesięcznie</strong> automatyzując tylko 4 procesy:
              </p>
              <ul className="text-white/70 space-y-2">
                <li>1. Obsługę standardowych pytań klientów → Chatbot AI <span className="text-pear">(50h/mies.)</span></li>
                <li>2. Aktualizację stanów magazynowych → Integracja Baselinker <span className="text-pear">(30h/mies.)</span></li>
                <li>3. Wysyłkę follow-upów po zakupie → Automatyczny email sequence <span className="text-pear">(25h/mies.)</span></li>
                <li>4. Raportowanie do księgowości → Eksport CSV do systemu <span className="text-pear">(15h/mies.)</span></li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-pear/10 to-tekhelet/10 border border-pear/30 rounded-lg p-8 mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Co dalej? Masz 3 opcje:</h2>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <span className="text-pear font-bold text-xl">1.</span>
                  <div>
                    <p className="text-white font-semibold">Zrób to sam</p>
                    <p className="text-white/70">Użyj Framework 80/20 z tego artykułu. Przeprowadź audyt procesów w swoim zespole. Wybierz TOP 5 i zacznij od jednego.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-pear font-bold text-xl">2.</span>
                  <div>
                    <p className="text-white font-semibold">Umów bezpłatną konsultację</p>
                    <p className="text-white/70">30 minut video call. Wspólnie przejdziemy przez Twoje procesy. Pokażę, co zautomatyzować w pierwszej kolejności.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-pear font-bold text-xl">3.</span>
                  <div>
                    <p className="text-white font-semibold">Zostaw jak jest</p>
                    <p className="text-white/70">Dalej tracisz 15+ godzin tygodniowo na manualne zadania. Twoja konkurencja (25% polskich firm już używa AI) jedzie do przodu.</p>
                  </div>
                </div>
              </div>

              <p className="text-white/80 mb-6">Wybór należy do Ciebie.</p>

              <Link
                href="/#contact"
                className="inline-block bg-pear hover:bg-pear/90 text-night font-bold px-8 py-4 rounded-lg transition-colors text-lg"
              >
                → Umów bezpłatną konsultację
              </Link>
            </div>

            {/* Sources */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Źródła:</h3>
              <ul className="text-white/60 space-y-2 text-sm">
                <li>
                  <a href="https://asana.com/resources/pareto-principle-80-20-rule" target="_blank" rel="noopener noreferrer" className="hover:text-pear transition-colors">
                    Asana - The Pareto Principle (80/20 Rule)
                  </a>
                </li>
                <li>
                  <a href="https://www.blueprintsys.com/blog/rpa/select-right-processes-for-rpa" target="_blank" rel="noopener noreferrer" className="hover:text-pear transition-colors">
                    Blueprint - How to Select the Right Processes for RPA
                  </a>
                </li>
                <li>
                  <a href="https://focusonbusiness.eu/pl/wiadomosci/polskie-firmy-szukaja-oszczednosci-stan-branzy-automatyzacji-procesow-biznesowych-w-2024-roku/34249" target="_blank" rel="noopener noreferrer" className="hover:text-pear transition-colors">
                    Focus on Business - Automatyzacja w Polsce 2024
                  </a>
                </li>
                <li>
                  <a href="https://www.gartner.com/en/articles/10-automation-mistakes-to-avoid" target="_blank" rel="noopener noreferrer" className="hover:text-pear transition-colors">
                    Gartner - 10 Automation Mistakes to Avoid
                  </a>
                </li>
                <li>
                  <a href="https://www.solvexia.com/blog/10-why-process-automation-projects-fail" target="_blank" rel="noopener noreferrer" className="hover:text-pear transition-colors">
                    SolveXia - Top 10 Reasons Why Process Automation Projects Fail
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
