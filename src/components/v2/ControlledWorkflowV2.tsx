const STAGES = [
  {
    number: "01",
    title: "Źródła",
    text: "Agent korzysta z bazy wiedzy, cennika, CRM i innych zatwierdzonych źródeł firmy.",
  },
  {
    number: "02",
    title: "Reguły",
    text: "Proces określa, co system może zrobić sam, kiedy ma dopytać i czego nie wolno mu zgadywać.",
  },
  {
    number: "03",
    title: "Kontrola",
    text: "Wynik przechodzi sprawdzenie faktów, danych i ustalonych kryteriów jakości.",
  },
  {
    number: "04",
    title: "Człowiek",
    text: "Wyjątki, decyzje i działania o większym ryzyku trafiają do właściwej osoby.",
  },
] as const;

export function ControlledWorkflowV2() {
  return (
    <section className="border-y border-[#E5E5E5] bg-[#FAFAFA] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-12 max-w-[760px]">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
            Jak agent dochodzi do wyniku
          </div>
          <h2>Agent AI nie powinien zgadywać. Powinien działać według reguł firmy.</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[#525252]">
            Nie oddajemy Ci kolejnego okna do wpisywania promptów. Budujemy
            kontrolowany proces, który łączy dane, reguły i odpowiedzialność.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-px border border-[#E5E5E5] bg-[#E5E5E5] md:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage) => (
            <article key={stage.number} className="bg-white p-7 md:p-8">
              <span className="font-mono text-[12px] text-[#B87333]">{stage.number}</span>
              <h3 className="mt-5 text-[#0A0A0A]">{stage.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#525252]">
                {stage.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
