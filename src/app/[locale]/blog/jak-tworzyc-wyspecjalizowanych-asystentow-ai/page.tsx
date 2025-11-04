import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Jak tworzyć wyspecjalizowanych asystentów AI? | LessManual Blog',
    description: 'Dowiedz się jak działają Projekty/Gemy w ChatGPT/Claude/Gemini i stwórz swojego pierwszego asystenta AI krok po kroku.',
    openGraph: {
      title: 'Jak tworzyć wyspecjalizowanych asystentów AI?',
      description: 'Praktyczny przewodnik po tworzeniu wyspecjalizowanych asystentów AI używając projektów w Claude, ChatGPT i Gemini.',
      images: [{
        url: '/images/blog/jak-tworzyc-asystentow-ai/Zrzut_ekranu_2025-11-4_o_17.41.46.png',
        width: 1200,
        height: 630,
        alt: 'Jak tworzyć wyspecjalizowanych asystentów AI',
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
            href={`/${locale}/blog`}
            className="inline-flex items-center text-pear hover:text-pear/80 transition-colors mb-8"
          >
            ← Powrót do bloga
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Jak tworzyć wyspecjalizowanych asystentów AI?
            </h1>
            <p className="text-xl text-white/70 mb-6">
              Czyli parę słów o tym jak działają Projekty/Gemy w ChatGPT/Claude/Gemini.
            </p>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <time dateTime="2025-11-04">4 listopada 2025</time>
              <span>•</span>
              <span>8 min czytania</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Problem & Solution */}
            <div className="bg-white/5 border border-pear/20 rounded-lg p-6 mb-8">
              <h3 className="text-pear font-bold mb-3">Problem:</h3>
              <p className="text-white/80">
                Zwykłe chaty z AI to jak rozmowa z kimś, kto ma amnezję - za każdym razem zaczynasz od zera. Musisz tłumaczyć kontekst, przypominać zasady, powtarzać te same instrukcje.
              </p>

              <h3 className="text-pear font-bold mt-6 mb-3">Rozwiązanie:</h3>
              <p className="text-white/80">
                Projekty/Gemy = długoterminowa pamięć + kontekst. Raz definiujesz rolę, załączasz pliki, ustawiasz zasady - i AI pamięta to przez wszystkie kolejne rozmowy.
              </p>
            </div>

            {/* Czym są Projekty */}
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Czym są Projekty/Gemy?</h2>
            <p className="text-white/80 mb-4">To tryb pracy z AI, gdzie:</p>
            <ul className="text-white/80 space-y-2 mb-8">
              <li>Załączasz pliki (PDF, Markdown, TXT) - AI ma stały dostęp do tej bazy wiedzy</li>
              <li>Definiujesz rolę (Custom Instructions) - AI wie kim jest i co ma robić</li>
              <li>Wszystkie rozmowy są w jednym miejscu - kontekst się nie gubi</li>
            </ul>

            {/* Przykład */}
            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <p className="text-white/90 font-semibold mb-3">Przykład:</p>
              <p className="text-white/70 mb-4">
                <strong className="text-white">Zwykły Chat:</strong> "Potrzebuję posta na LinkedIn o AI w e-commerce. Aha, zapomniałem - pisz w stylu edukacyjnym, dołącz liczby, daj przykład..." (każdym razem od początku)
              </p>
              <p className="text-white/70">
                <strong className="text-white">Projekt:</strong> "Napisz post o AI w e-commerce" (AI pamięta że jesteś content writerem do LinkedIn, zna twój styl, ma przykłady poprzednich postów)
              </p>
            </div>

            {/* Jak stworzyć - Krok 1 */}
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Jak stworzyć asystenta – krok po kroku</h2>

            <h3 className="text-2xl font-bold text-pear mt-8 mb-4">Krok 1: Zdefiniuj rolę asystenta</h3>
            <p className="text-white/80 mb-4">Wejdź w nowy chat i napisz:</p>
            <div className="bg-night/50 border border-white/10 rounded-lg p-4 mb-6">
              <code className="text-pear text-sm">
                'Chcę stworzyć swojego pierwszego asystenta, ma być to specjalista od [wstaw od czego] i pomagać mi na co dzień w [tu wstaw w czym ma pomagać]. Jego zadaniem będzie [zadanie 1], [zadanie 2] i [zadanie 3]. Załączam Ci pliki związane z tym projektem, mają służyć jako baza wiedzy dla mojego asystenta [wklej koniecznie te pliki]. Oczekuję, żeby odpowiadał w sposób [wstaw sposób]. Stwórz mi system prompt, który posłuży jako instrukcje w tym projekcie.'
              </code>
            </div>

            <div className="my-8 rounded-lg overflow-hidden border border-white/10">
              <Image
                src="/images/blog/jak-tworzyc-asystentow-ai/Zrzut_ekranu_2025-11-4_o_17.41.46.png"
                alt="Przykład promptu do stworzenia asystenta"
                width={800}
                height={600}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <p className="text-white/80 mb-4">Otwórz Claude.ai → Projects → Create Project</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <Image
                src="/images/blog/jak-tworzyc-asystentow-ai/Zrzut_ekranu_2025-11-4_o_17.39.33.png"
                alt="Tworzenie nowego projektu"
                width={400}
                height={300}
                className="rounded-lg border border-white/10"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <Image
                src="/images/blog/jak-tworzyc-asystentow-ai/Zrzut_ekranu_2025-11-4_o_17.39.12.png"
                alt="Panel projektów"
                width={400}
                height={300}
                className="rounded-lg border border-white/10"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            <p className="text-white/80 mb-4">W sekcji Custom Instructions wklej swój system prompt:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <Image
                src="/images/blog/jak-tworzyc-asystentow-ai/Zrzut_ekranu_2025-11-4_o_17.44.12.png"
                alt="Custom Instructions"
                width={400}
                height={300}
                className="rounded-lg border border-white/10"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <Image
                src="/images/blog/jak-tworzyc-asystentow-ai/Zrzut_ekranu_2025-11-4_o_17.44.22.png"
                alt="Wklejanie systemu prompt"
                width={400}
                height={300}
                className="rounded-lg border border-white/10"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            {/* Krok 2 */}
            <h3 className="text-2xl font-bold text-pear mt-8 mb-4">Krok 2: Załącz bazę wiedzy</h3>
            <p className="text-white/80 mb-4">Kliknij Add Content → Upload files</p>
            <p className="text-white/70 mb-4">
              <strong>Formaty:</strong> PDF, Markdown, TXT, DOCX, CSV (Claude: max 10 plików × 10MB)
            </p>
            <p className="text-white/80 mb-4">Przykłady co załączyć:</p>
            <ul className="text-white/70 space-y-2 mb-6">
              <li><strong>Content Writer:</strong> 3-5 najlepszych postów, brand guidelines, styleguide</li>
              <li><strong>Code Reviewer:</strong> architecture docs, coding standards, common issues</li>
              <li><strong>Client Support:</strong> FAQ, product docs, case studies, return policy</li>
            </ul>

            <div className="my-8 rounded-lg overflow-hidden border border-white/10">
              <Image
                src="/images/blog/jak-tworzyc-asystentow-ai/Zrzut_ekranu_2025-11-4_o_17.44.37.png"
                alt="Dodawanie plików do projektu"
                width={800}
                height={600}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {/* Krok 3 & 4 */}
            <h3 className="text-2xl font-bold text-pear mt-8 mb-4">Krok 3: Zapisz jako Project</h3>
            <p className="text-white/80 mb-6">
              Nazwij projekt (np. "LinkedIn Content Writer", "Code Reviewer", "Client Support Bot") i kliknij Create Project / Save
            </p>

            <h3 className="text-2xl font-bold text-pear mt-8 mb-4">Krok 4: Testuj i iteruj</h3>
            <p className="text-white/80 mb-4">Zadaj 3 pytania testowe:</p>
            <ul className="text-white/70 space-y-2 mb-6">
              <li>Proste (czy AI rozumie podstawową rolę)</li>
              <li>Średnie (czy korzysta z załączonych plików)</li>
              <li>Edge case (co się stanie gdy zapytasz o coś czego nie wie)</li>
            </ul>
            <p className="text-white/70 mb-8">
              Jeśli odpowiedzi nie są dobre - popraw Custom Instructions lub dodaj więcej przykładów do plików.
            </p>

            {/* Best Practices */}
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Na co zwrócić uwagę</h2>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-white font-semibold">Konkretna rola + ograniczenia</p>
                  <p className="text-white/70">nie pisz "jesteś pomocny", napisz "jesteś LinkedIn ghostwriterem specjalizującym się w AI dla e-commerce"</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-white font-semibold">Załącz 3-5 najlepszych przykładów</p>
                  <p className="text-white/70">nie 20 plików "może się przydać", ale 3 perfekcyjne case studies</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-white font-semibold">Update projektu regularnie</p>
                  <p className="text-white/70">dopisuj nowe przykłady, usuń nieaktualne pliki (raz w miesiącu)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-white font-semibold">Osobne projekty per zadanie</p>
                  <p className="text-white/70">nie jeden "work" projekt, ale "LinkedIn Posts", "Code Review", "Client Emails"</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-white font-semibold">Test na zadaniu real-world</p>
                  <p className="text-white/70">nie "czy działa", ale "czy napisze mi post o AI w retail który dostanie 50+ saveów"</p>
                </div>
              </div>
            </div>

            {/* Czego unikać */}
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Czego unikać</h2>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="text-white font-semibold">Zbyt ogólna rola</p>
                  <p className="text-white/70">"jesteś AI asystentem" to za mało (AI nie wie czego oczekujesz)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="text-white font-semibold">Za dużo plików (&gt;10)</p>
                  <p className="text-white/70">AI się gubi, wolniej pracuje, częściej halucynuje</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="text-white font-semibold">Wrażliwe dane w plikach</p>
                  <p className="text-white/70">nie wrzucaj haseł, tokenów API, danych klientów (RODO!)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="text-white font-semibold">Używanie 1 projektu do wszystkiego</p>
                  <p className="text-white/70">context bleeding = AI mąci się między zadaniami</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="text-white font-semibold">Zapomnieć o testowaniu</p>
                  <p className="text-white/70">"działa" nie znaczy "świetnie działa" - testuj z real-world scenarios</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-pear/10 to-tekhelet/10 border border-pear/30 rounded-lg p-8 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">Teraz Twoja kolej!</h2>
              <p className="text-white/80 mb-6">
                Stwórz swojego pierwszego asystenta i tag mnie <strong className="text-pear">@lessmanual</strong> z screenem jak Ci pomógł!
              </p>
              <p className="text-white/80 mb-4">Chcesz więcej treści o AI automation?</p>
              <Link
                href={`/${locale}`}
                className="inline-block bg-pear hover:bg-pear/90 text-night font-bold px-6 py-3 rounded-lg transition-colors"
              >
                → lessmanual.ai
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
