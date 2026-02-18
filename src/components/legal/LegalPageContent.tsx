import fs from "fs";
import path from "path";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { LegalMarkdown } from "@/components/legal/LegalMarkdown";

interface LegalPageContentProps {
  title: string;
  filename: string;
}

export function LegalPageContent({ title, filename }: LegalPageContentProps) {
  const filePath = path.join(process.cwd(), "content/legal", filename);
  const markdownContent = fs.readFileSync(filePath, "utf-8");

  return (
    <>
      <Header />
      <main className="pt-16 pb-16 md:pb-0">
        <article className="py-20 md:py-28">
          <div className="max-w-[760px] mx-auto px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors mb-8"
            >
              &larr; Strona glowna
            </Link>

            <h1 className="font-serif text-text mb-12">{title}</h1>

            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text prose-headings:font-normal prose-p:text-text-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-li:text-text-secondary prose-blockquote:border-accent prose-blockquote:text-text-secondary prose-table:text-sm prose-th:bg-bg prose-th:p-3 prose-th:text-left prose-th:text-text prose-td:p-3 prose-td:border prose-td:border-border">
              <LegalMarkdown content={markdownContent} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
