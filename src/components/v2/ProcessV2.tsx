const STEPS = [
  {
    num: "01",
    title: "Audyt procesu i KPI",
    duration: "diagnoza",
    desc: "Liczymy koszt obecnej pracy, ryzyko błędu i ustalamy mierzalne kryteria odbioru.",
  },
  {
    num: "02",
    title: "Źródła i baza wiedzy",
    duration: "dane",
    desc: "Zbieramy zatwierdzone materiały, porządkujemy dostęp i zapisujemy granice działania systemu.",
  },
  {
    num: "03",
    title: "Narzędzia i integracje",
    duration: "projekt",
    desc: "Dobieramy technologię do procesu i łączymy tylko systemy potrzebne w uzgodnionym zakresie.",
  },
  {
    num: "04",
    title: "Budowa systemu",
    duration: "wdrożenie",
    desc: "Budujemy działający przepływ z regułami, kontrolą wyniku i bezpiecznym przekazaniem wyjątków.",
  },
  {
    num: "05",
    title: "Testy na realnych danych",
    duration: "odbiór",
    desc: "Sprawdzamy typowe sprawy, błędy i wyjątki na przykładach z firmy, a wynik porównujemy z KPI.",
  },
  {
    num: "06",
    title: "Uruchomienie i dokumentacja",
    duration: "start",
    desc: "Włączamy system do codziennej pracy, opisujemy obsługę i przekazujemy plan miesięcznej opieki.",
  },
];

export function ProcessV2() {
  return (
    <section id="proces" className="px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-16 max-w-[720px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
            Proces
          </div>
          <h2>Od procesu do działającego systemu.</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[#525252]">
            Wdrożenie ma zamknięty zakres i wynik, który da się sprawdzić.
            Każdy etap kończy się konkretną decyzją albo materiałem do odbioru.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-px border border-[#E5E5E5] bg-[#E5E5E5] md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.num}
              className="bg-[#FAFAFA] p-8 md:p-10"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-[56px] font-medium leading-none tracking-tight text-[#B87333]">
                  {s.num}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                  {s.duration}
                </span>
              </div>
              <h3 className="text-[#0A0A0A]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#525252]">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
