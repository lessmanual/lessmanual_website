"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Tabele w dokumentach są szerokie (5-6 kolumn). Własny kontener z przewijaniem poziomym, żeby przy
// 320-390 px przewijała się tabela, a nie cała strona. Podpis nad tabelą (CSS: tylko poniżej 768 px)
// pokazuje się, gdy tabela jest szersza niż kontener.
function TabelaPrzewijana({ children }: { children: ReactNode }) {
  const kontener = useRef<HTMLDivElement>(null);
  const [przewija, setPrzewija] = useState(false);

  useEffect(() => {
    const el = kontener.current;
    if (!el) return;
    const sprawdz = () => setPrzewija(el.scrollWidth > el.clientWidth + 1);
    sprawdz();
    const obserwator = new ResizeObserver(sprawdz);
    obserwator.observe(el);
    if (el.firstElementChild) obserwator.observe(el.firstElementChild);
    return () => obserwator.disconnect();
  }, []);

  return (
    <div className="legal-tabela" data-przewija={przewija}>
      <p className="legal-tabela__hint">Tabelę przewiniesz w bok</p>
      <div className="legal-tabela__scroll" ref={kontener}>
        <table>{children}</table>
      </div>
    </div>
  );
}

const komponenty: Components = {
  table: ({ children }) => <TabelaPrzewijana>{children}</TabelaPrzewijana>,
};

export function LegalMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={komponenty}>
      {content}
    </ReactMarkdown>
  );
}
