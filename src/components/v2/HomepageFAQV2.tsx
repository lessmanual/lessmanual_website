import { HOME_FAQ_ITEMS } from "@/lib/homepage-faq";

export function HomepageFAQV2() {
  const questions = HOME_FAQ_ITEMS.flatMap((category) => category.items);

  return (
    <section id="faq" className="bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <header className="max-w-[520px]">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
            Pytania przed wdrożeniem
          </div>
          <h2>Co warto wiedzieć, zanim wybierzesz pierwszy proces.</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[#525252]">
            Technologia jest dopiero drugim krokiem. Najpierw trzeba ustalić
            źródła, granice działania i wynik, który da się sprawdzić.
          </p>
        </header>

        <div className="border-t border-[#E5E5E5]">
          {questions.map((item, index) => (
            <details
              key={item.q}
              className="group border-b border-[#E5E5E5] py-1"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-medium text-[#0A0A0A] marker:content-none">
                {item.q}
                <span
                  aria-hidden="true"
                  className="font-mono text-[18px] text-[#B87333] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[760px] pb-6 pr-10 text-[15px] leading-[1.65] text-[#525252]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
