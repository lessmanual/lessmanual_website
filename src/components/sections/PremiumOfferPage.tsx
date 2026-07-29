import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  SearchCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { FooterV2 } from "@/components/v2/FooterV2";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { V2ShellStyles, v2FontClasses } from "@/components/v2/V2ShellStyles";
import { AI_GROWTH_MAP_URL, CALENDLY_URL } from "@/lib/constants";
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  serializeJsonLd,
} from "@/lib/schema";
import { PROOF_COMPACT } from "@/lib/social-proof";

export type PremiumOfferPageProps = {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  fit: string;
  promise: string;
  workflow: string[];
  qualityGate: string[];
  outcomes: string[];
  implementationItems: string[];
  monthlyCareItems: string[];
  scopeBoundary: string;
  acceptanceCriteria: string[];
  diagnosisTitle: string;
  diagnosisCtaLabel: string;
  notes: string[];
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PremiumOfferPage({
  path,
  eyebrow,
  title,
  intro,
  fit,
  promise,
  workflow,
  qualityGate,
  outcomes,
  implementationItems,
  monthlyCareItems,
  scopeBoundary,
  acceptanceCriteria,
  diagnosisTitle,
  diagnosisCtaLabel,
  notes,
}: PremiumOfferPageProps) {
  const canonicalUrl = `https://www.lessmanual.ai${path}`;
  const structuredData = [
    generateServiceSchema({
      name: title,
      description: intro,
      url: canonicalUrl,
    }),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "https://www.lessmanual.ai" },
      { name: "Oferta", url: "https://www.lessmanual.ai/oferta" },
      { name: title, url: canonicalUrl },
    ]),
  ];

  return (
    <div className={`v2-scope ${v2FontClasses}`}>
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
      <V2ShellStyles />
      <HeaderV2 />
      <main className="bg-bg text-text">
      <section className="px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="mx-auto max-w-[1160px]">
          <Link
            href="/oferta"
            className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            Oferta
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-accent" />
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  {eyebrow}
                </span>
              </div>

              <h1 className="font-serif text-4xl leading-tight md:text-6xl">
                {title}
              </h1>

              <p className="mt-6 max-w-[720px] text-lg leading-relaxed text-text-secondary md:text-xl">
                {intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-text px-6 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-[1px] hover:bg-accent"
                >
                  {diagnosisCtaLabel}
                  <ArrowRight size={16} />
                </a>
                <Link
                  href={AI_GROWTH_MAP_URL}
                  className="inline-flex items-center gap-2 rounded-[4px] border border-border bg-white px-6 py-3.5 text-sm font-medium text-text transition-all hover:-translate-y-[1px] hover:border-accent hover:text-accent"
                >
                  Sprawdź pierwszy proces do automatyzacji
                </Link>
              </div>
              <p className="mt-4 text-sm text-text-secondary">
                Jeśli diagnoza nie potwierdzi sensu tego rozwiązania, powiemy to wprost.
              </p>
            </div>

            <div className="rounded-[8px] border border-border bg-white p-6 shadow-[0_24px_60px_rgba(10,10,10,0.06)] md:p-8">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[6px] bg-accent/10 text-accent">
                <Workflow size={24} />
              </div>
              <h2 className="font-serif text-2xl">Model współpracy</h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Najpierw diagnoza procesu. Potem zakres wdrożenia, sposób
                utrzymania i wycena dopasowana do danych oraz integracji.
              </p>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="rounded-[6px] bg-bg p-4">
                  <span className="block text-xs uppercase tracking-[0.12em] text-text-muted">
                    Dla kogo
                  </span>
                  <span className="mt-1 block text-text-secondary">{fit}</span>
                </div>
                <div className="rounded-[6px] bg-bg p-4">
                  <span className="block text-xs uppercase tracking-[0.12em] text-text-muted">
                    Cel wdrożenia
                  </span>
                  <span className="mt-1 block text-text-secondary">{promise}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-8 lg:grid-cols-3">
          <div>
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[6px] bg-accent/10 text-accent">
              <SearchCheck size={22} />
            </div>
            <h2 className="font-serif text-2xl">Jak działa system</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Zaczynamy od źródeł, reguł i wyniku, który da się sprawdzić.
            </p>
          </div>
          <div className="lg:col-span-2">
            <BulletList items={workflow} />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-10 max-w-[760px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-accent" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Odpowiedzialność LessManual
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Wdrożenie i opieka to dwa osobne zakresy
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Wdrożenie kończy się działającym systemem. Opieka utrzymuje jego
              ciągłość i jakość po uruchomieniu.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <CooperationCard
              eyebrow="Jednorazowo"
              title="Co dostajesz we wdrożeniu"
              items={implementationItems}
            />
            <CooperationCard
              eyebrow="Co miesiąc"
              title="Co obejmuje miesięczna opieka"
              items={monthlyCareItems}
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[8px] border border-accent/40 bg-accent/5 p-6">
              <h3 className="font-serif text-2xl">Co rozliczamy osobno</h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {scopeBoundary}
              </p>
            </div>
            <div className="rounded-[8px] border border-border bg-white p-6">
              <h3 className="font-serif text-2xl">Warunki miesięcznej opieki</h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Dokładną częstotliwość monitoringu i raportowania, czas reakcji, limity narzędzi oraz zakres zmian zapisujemy w indywidualnej ofercie i umowie.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-10 max-w-[760px]">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[6px] bg-accent/10 text-accent">
              <ShieldCheck size={22} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Kontrola wyniku i kryteria odbioru
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Agent nie powinien dopowiadać brakujących faktów ani podejmować
              decyzji poza ustalonym zakresem. Wynik przechodzi kontrolę przed
              działaniem o większym ryzyku.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[8px] border border-border bg-white p-6 md:p-8">
              <h3 className="font-serif text-2xl">Jak kontrolujemy jakość</h3>
              <div className="mt-5">
                <BulletList items={qualityGate} />
              </div>
            </div>
            <div className="rounded-[8px] border border-border bg-white p-6 md:p-8">
              <h3 className="font-serif text-2xl">Kryteria odbioru</h3>
              <div className="mt-5">
                <BulletList items={acceptanceCriteria} />
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-[8px] border border-accent/40 bg-accent/5 p-5">
            <p className="text-sm leading-relaxed text-text-secondary">
              Próbkę testową, progi jakości, wolumen i definicję błędu krytycznego ustalamy przed startem.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-10 max-w-[720px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-accent" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Efekt biznesowy
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Po czym poznamy, że wdrożenie działa
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-[8px] border border-border bg-bg p-6">
                <p className="text-sm leading-relaxed text-text-secondary">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white px-6 py-8">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
            {PROOF_COMPACT}
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="font-serif text-3xl md:text-4xl">
            {diagnosisTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-base leading-relaxed text-text-secondary">
            Na krótkiej diagnozie sprawdzimy proces, dane, ryzyko i oczekiwany
            wynik. Jeśli to rozwiązanie nie ma sensu, powiemy to wprost.
          </p>
          <div className="mx-auto mt-8 grid max-w-[720px] gap-3 text-left md:grid-cols-2">
            {notes.map((note) => (
              <div key={note} className="rounded-[6px] border border-border bg-white p-4 text-sm text-text-secondary">
                {note}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[4px] bg-text px-6 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-[1px] hover:bg-accent"
            >
              {diagnosisCtaLabel}
              <ArrowRight size={16} />
            </a>
            <Link
              href={AI_GROWTH_MAP_URL}
              className="inline-flex items-center gap-2 rounded-[4px] border border-border bg-white px-6 py-3.5 text-sm font-medium text-text transition-all hover:-translate-y-[1px] hover:border-accent hover:text-accent"
            >
              Otwórz AI Growth Opportunity Map
            </Link>
          </div>
        </div>
      </section>
      </main>
      <FooterV2 />
    </div>
  );
}

function CooperationCard({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-[8px] border border-border bg-white p-6 md:p-8">
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
        {eyebrow}
      </span>
      <h3 className="mt-3 font-serif text-2xl">{title}</h3>
      <div className="mt-6">
        <BulletList items={items} />
      </div>
    </article>
  );
}
