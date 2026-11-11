import fs from "fs";
import path from "path";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import styles from "@/components/pages/pages.module.css";
import { LegalMarkdown } from "@/components/legal/LegalMarkdown";

interface LegalPageContentProps {
  title: string;
  filename: string;
}

export function LegalPageContent({ title, filename }: LegalPageContentProps) {
  const filePath = path.join(process.cwd(), "content/legal", filename);
  // Nagłówek h1 strony pochodzi z propsa `title`; usuwamy pierwszy nagłówek z pliku, żeby nie było dwóch h1.
  const markdownContent = fs.readFileSync(filePath, "utf-8").replace(/^# .*\r?\n/, "");

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <article className={`lm-container ${styles.head}`}>
          <div className={styles.narrow}>
            <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: title }]} />
            <h1 className={styles.title}>{title}</h1>
            <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-ink prose-headings:tracking-tight prose-p:text-ink-2 prose-a:text-sea prose-a:underline prose-a:underline-offset-4 prose-strong:text-ink prose-li:text-ink-2 prose-blockquote:border-copper prose-blockquote:text-ink-2 prose-table:text-[15px] prose-th:bg-sunken prose-th:p-3 prose-th:text-left prose-th:text-ink prose-td:p-3 prose-td:border prose-td:border-line">
              <LegalMarkdown content={markdownContent} />
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
