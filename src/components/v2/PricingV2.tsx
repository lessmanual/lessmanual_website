import Link from "next/link";
import { AI_GROWTH_MAP_URL } from "@/lib/constants";

const ROWS = [
  {
    name: "Content Machine",
    slug: "content i SEO",
    setup: "wdrożenie",
    monthly: "miesięczna obsługa",
    note: "dla firm, które chcą stały content bez zatrudniania zespołu",
  },
  {
    name: "Customer Operations AI",
    slug: "obsługa zapytań i spraw",
    setup: "wdrożenie",
    monthly: "miesięczna obsługa",
    note: "dla firm z rosnącym wolumenem pytań, maili i spraw",
  },
  {
    name: "Premium Cold Email+",
    slug: "sprzedaż B2B",
    setup: "wdrożenie",
    monthly: "miesięczna obsługa",
    note: "dla kampanii, gdzie jakość listy i personalizacji ma wygrać z wolumenem",
  },
  {
    name: "Indywidualne wdrożenie",
    slug: "niestandardowy proces",
    setup: "po diagnozie",
    monthly: "utrzymanie",
    note: "gdy trzeba połączyć dane, narzędzia i decyzje w jeden proces",
  },
];

const IMPLEMENTATION_ITEMS = [
  "Audyt procesu, kosztu obecnej pracy i KPI",
  "Zatwierdzone źródła, baza wiedzy i reguły",
  "Dobór narzędzi oraz istniejących integracji",
  "Budowa, testy na realnych danych i uruchomienie",
  "Dokumentacja oraz kryteria odbioru",
];

const MONTHLY_CARE_ITEMS = [
  "Monitoring i naprawy w istniejącym zakresie",
  "Aktualizacje wiedzy i zatwierdzonych źródeł",
  "Zmiany w API dla istniejących integracji",
  "Kontrola jakości i wyjątków",
  "Optymalizacja i raport z działania",
];

export function PricingV2() {
  return (
    <section id="pricing" className="bg-white border-y border-[#E5E5E5] px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-16 max-w-[720px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
            Model współpracy
          </div>
          <h2>Zakres i wycena po diagnozie procesu.</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[#525252]">
            Jednorazowe wdrożenie kupuje działający i przetestowany system.
            Miesięczna opieka kupuje ciągłość działania w ustalonym zakresie.
            Konkretne warunki i cenę podajemy po diagnozie.
          </p>
        </header>

        <div className="mb-10 grid gap-px border border-[#E5E5E5] bg-[#E5E5E5] lg:grid-cols-2">
          <CooperationColumn
            eyebrow="Jednorazowe wdrożenie"
            title="Działający system z zamkniętym zakresem"
            items={IMPLEMENTATION_ITEMS}
          />
          <CooperationColumn
            eyebrow="Miesięczna opieka"
            title="Ciągłość i jakość istniejącego systemu"
            items={MONTHLY_CARE_ITEMS}
          />
        </div>

        <div className="border border-[#E5E5E5] bg-[#FAFAFA]">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-[2fr_1.2fr_1fr_1.2fr] gap-6 px-6 py-4 border-b border-[#E5E5E5] font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
            <div>System</div>
            <div>Start</div>
            <div>Dalej</div>
            <div>Kiedy pasuje</div>
          </div>

          <div>
            {ROWS.map((r) => (
              <div
                key={r.name}
                className="grid grid-cols-1 md:grid-cols-[2fr_1.2fr_1fr_1.2fr] gap-2 md:gap-6 px-6 py-5 md:py-6 border-b border-[#E5E5E5] last:border-b-0 transition-colors duration-200 hover:bg-white"
              >
                <div>
                  <div className="text-[15px] font-medium text-[#0A0A0A]">{r.name}</div>
                  <div className="text-[13px] text-[#737373]">{r.slug}</div>
                </div>
                <div className="font-mono text-[14px] text-[#0A0A0A]">{r.setup}</div>
                <div className="font-mono text-[14px] text-[#0A0A0A]">{r.monthly}</div>
                <div className="text-[13px] text-[#525252]">{r.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-l-2 border-[#B87333] bg-[#F5EDE6] px-5 py-4">
          <p className="text-[14px] leading-relaxed text-[#525252]">
            Po wdrożeniu bierzemy odpowiedzialność za działanie i rozwój rozwiązania. Utrzymujemy hosting oraz uzgodnione narzędzia, monitorujemy jakość, naprawiamy błędy, aktualizujemy bazę wiedzy i ulepszamy istniejący workflow. Koszty mieszczą się w miesięcznej opiece do limitów zapisanych w ofercie. Nowy moduł, kanał lub integracja dostaje osobny zakres i wycenę.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-[#525252]">
            <strong className="text-[#0A0A0A]">Granica zakresu:</strong>{" "}
            Nowe funkcje, kanały, integracje, migracje i większe przebudowy wyceniamy osobno.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-[#525252]">
            Dokładną częstotliwość monitoringu i raportowania, czas reakcji, limity narzędzi oraz zakres zmian zapisujemy w indywidualnej ofercie i umowie.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-[#525252]">
            Próbkę testową, progi jakości, wolumen i definicję błędu krytycznego ustalamy przed startem.
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-[14px] text-[#525252]">
            Jasny zakres · cena po diagnozie · utrzymanie systemu w zakresie
          </p>
          <Link
            href={AI_GROWTH_MAP_URL}
            className="inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
            style={{ borderRadius: 4 }}
          >
            Sprawdź pierwszy proces do automatyzacji
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CooperationColumn({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="bg-[#FAFAFA] p-8 md:p-10">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">
        {eyebrow}
      </div>
      <h3 className="mt-3 text-[#0A0A0A]">{title}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-[#525252]">
            <span className="text-[#B87333]" aria-hidden="true">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
