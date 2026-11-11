import { LINKS } from "@/content/site";
import { ArrowRight } from "@/components/site/Icons";
import styles from "./pages.module.css";

// Jedno wezwanie do działania dla podstron: przycisk do formularza na stronie głównej.
export function FormCta({ note = "Formularz zajmuje około 2 minut." }: { note?: string }) {
  return (
    <div className={styles.ctaRow}>
      <a href={LINKS.form} className="lm-btn lm-btn--primary">
        Umów rozmowę
        <ArrowRight className="lm-btn__arrow" />
      </a>
      <p className={styles.ctaNote}>{note}</p>
    </div>
  );
}
