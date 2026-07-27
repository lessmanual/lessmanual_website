import type { Metadata } from "next";

import { FooterV2 } from "@/components/v2/FooterV2";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { V2ShellStyles, v2FontClasses } from "@/components/v2/V2ShellStyles";
import { SafeDraftTool } from "@/features/safedraft/components/safedraft-tool";

export const metadata: Metadata = {
  title: "SafeDraft",
  description: "Lokalny public v0 do poprawiania draftów B2B na fake adapterze.",
  robots: {
    index: false,
    follow: false,
  },
};

const FAQ_ITEMS = [
  {
    question: "Czy SafeDraft wysyła wiadomość?",
    answer: "Nie. Dostajesz poprawiony draft i sam decydujesz, czy go wysłać.",
  },
  {
    question: "Czy zapisujemy treść draftu?",
    answer: "Nie w tym public v0. Backend buduje tylko metadata-only record bez raw draftu.",
  },
  {
    question: "Czy to zastępuje ręczny review?",
    answer: "Nie. Status jasno mówi, czy tekst jest gotowy, wymaga review albo został zatrzymany.",
  },
  {
    question: "Czy działa dla emaila i LinkedIn?",
    answer: "Tak, możesz wybrać kanał. Lokalnie działa wyłącznie fake adapter.",
  },
];

export default function SafeDraftPage() {
  return (
    <div className={`v2-scope ${v2FontClasses}`}>
      <V2ShellStyles />
      <HeaderV2 />
      <main>
        <section
          role="banner"
          aria-label="SafeDraft"
          className="border-b border-[#E5E5E5] bg-[#FAFAFA] px-5 pb-5 pt-14 sm:px-6 lg:px-10"
        >
          <div className="mx-auto flex max-w-[1120px] flex-col gap-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">
              Public v0 - local fake model
            </p>
            <div className="max-w-[780px]">
              <h1>SafeDraft</h1>
              <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-[#404040] sm:text-[19px]">
                Wklej roboczą wiadomość B2B, wybierz ton i kanał, a SafeDraft zwróci wersję do ręcznego sprawdzenia.
              </p>
            </div>
            <div className="grid gap-3 text-[13px] text-[#525252] sm:grid-cols-3">
              <span className="border border-[#E5E5E5] bg-white px-3 py-2">Bez wysyłki maila</span>
              <span className="border border-[#E5E5E5] bg-white px-3 py-2">Bez zapisu raw draftu</span>
              <span className="border border-[#E5E5E5] bg-white px-3 py-2">Fake adapter lokalnie</span>
            </div>
          </div>
        </section>

        <section aria-label="SafeDraft tool area" className="bg-[#FAFAFA] px-5 py-0 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1120px]">
            <SafeDraftTool />
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-6 lg:px-10" aria-labelledby="safedraft-faq">
          <div className="mx-auto max-w-[1120px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">FAQ</p>
            <h2 id="safedraft-faq" className="mt-3">
              Zasady public v0
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {FAQ_ITEMS.map((item) => (
                <article key={item.question} className="border-t border-[#E5E5E5] pt-5">
                  <h3 className="text-[20px]">{item.question}</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[#525252]">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
}
