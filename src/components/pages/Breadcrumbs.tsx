import Link from "next/link";
import styles from "./pages.module.css";

export type Crumb = { label: string; href?: string };

// Widoczna ścieżka okruszkowa; ten sam podział trafia do JSON-LD BreadcrumbList na stronie.
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Ścieżka">
      <ol className={styles.crumbs}>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href} className="lm-link">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
