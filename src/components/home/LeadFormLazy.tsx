"use client";

import dynamic from "next/dynamic";
import { Bzyk } from "@/components/site/Bzyk";
import { START } from "@/content/formularz";
import styles from "./LeadFormLazy.module.css";

// Formularz (z biblioteką Motion) ładujemy osobnym kawałkiem JS po hydratacji strony,
// żeby nie konkurował z pierwszym ekranem o pasmo i procesor (budżet LCP mobile 2,5 s).
// Formularz jest na końcu strony i nie niesie treści dla Google, więc SSR nie jest potrzebny.
// Zastępczy ekran startowy ma ten sam wygląd co pierwszy ekran formularza (bez skoku układu).
const LeadForm = dynamic(() => import("@/components/form/LeadForm").then((m) => m.LeadForm), {
  ssr: false,
  loading: () => (
    <section className={styles.placeholder} aria-label="Formularz kwalifikujący" aria-busy="true">
      <div className={styles.row}>
        <Bzyk width={56} mood="neutral" />
        <p className="lm-bubble">
          <span className="lm-bubble__who">Bzyk</span>
          {START.bzyk}
        </p>
      </div>
    </section>
  ),
});

export function LeadFormLazy() {
  return <LeadForm />;
}
