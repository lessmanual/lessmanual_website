const PROBLEMS = [
  {
    area: "Sprzedaż",
    text: "Handlowcy uzupełniają CRM, składają podsumowania i poprawiają wyceny zamiast rozmawiać z klientami.",
  },
  {
    area: "Obsługa klienta",
    text: "Te same pytania wracają przez email, chat i telefon, a trudne sprawy giną między kanałami.",
  },
  {
    area: "Content i SEO",
    text: "Pomysły czekają w notatkach, publikacje są nieregularne, a tekst z AI wymaga pisania od nowa.",
  },
  {
    area: "Operacje",
    text: "Dane z maili i dokumentów są ręcznie przepisywane do systemów, choć reguły procesu są powtarzalne.",
  },
] as const;

export function ProblemV2() {
  return (
    <section className="border-y border-[#E5E5E5] bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-12 max-w-[760px]">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
            Gdzie znika czas
          </div>
          <h2>Firma rośnie. Ręczna praca rośnie razem z nią.</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[#525252]">
            Automatyzujemy jeden proces na raz, zaczynając tam, gdzie powtarzalna
            praca kosztuje najwięcej czasu albo tworzy największe ryzyko błędu.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-px border border-[#E5E5E5] bg-[#E5E5E5] md:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((problem) => (
            <article key={problem.area} className="bg-[#FAFAFA] p-7 md:p-8">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#8B4513]">
                {problem.area}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-[#525252]">
                {problem.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
