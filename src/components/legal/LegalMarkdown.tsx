"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Tabele w dokumentach są szerokie (5-6 kolumn). Własny kontener z przewijaniem poziomym, żeby przy
// 320-390 px przewijała się tabela, a nie cała strona.
const komponenty: Components = {
  table: ({ children }) => (
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <table>{children}</table>
    </div>
  ),
};

export function LegalMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={komponenty}>
      {content}
    </ReactMarkdown>
  );
}
