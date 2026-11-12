import { Bzyk } from "@/components/site/Bzyk";
import { HOME_V4, type KartaPomysly as DaneKarty } from "@/content/home-v4";
import styles from "./Karty.module.css";

// Karta 4: co możemy zbudować u czytelnika. Nagłówek, plakietka i linia są wspólne dla działów (HOME_V4.dzialy),
// pięć pomysłów jest per dział. Lista bez pogrubień, dymek Bzyka na dole.
export function KartaPomysly({ karta }: { karta: DaneKarty }) {
  const { naglowekPomyslow, plakietkaPomyslow, liniaPomyslow, bzykPomyslow } = HOME_V4.dzialy;
  return (
    <article className={styles.pomysly}>
      <h3 className={styles.tytul}>{naglowekPomyslow}</h3>
      <p className={styles.plakietka}>{plakietkaPomyslow}</p>
      <ul className={styles.listaPomyslow}>
        {karta.pomysly.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className={styles.liniaPomyslow}>{liniaPomyslow}</p>
      <div className={styles.dymekPomyslow}>
        <Bzyk width={36} mood="happy" />
        <p>{bzykPomyslow}</p>
      </div>
    </article>
  );
}
