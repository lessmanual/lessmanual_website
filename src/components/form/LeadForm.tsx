"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import {
  KALENDARZ_ZGODA,
  KOMUNIKATY,
  KONTAKT,
  NIE_TERAZ,
  PO_WYSLANIU,
  PYTANIA,
  PYTANIE_DROGA,
  START,
  WERSJA_FORMULARZA,
  ZGODA_MARKETING,
  ekranWynikuDrogi,
  odpowiedzDlaDrogi,
  zdecyduj,
  type PytanieKonfig,
  type Trasa,
  type TrasaZKalendarzem,
} from "@/content/formularz";
import { LINKS } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import {
  ZDARZENIE_ZGODY_COOKIES,
  czytajZgodeCookies,
  zapiszZgodeCookies,
} from "@/lib/consent";
import { adresKalendarza, terminZKomunikatu } from "@/lib/lead/kalendarz";
import { jestPoprawnymEmailem, sprawdzKontakt, type SurowyKontakt } from "@/lib/lead/parsuj";
import type { PoleKontaktu, WybranaOdpowiedz } from "@/lib/lead/typy";
import {
  nasluchujPrefill,
  odbierzOczekujace,
  zastosujPrefill,
  type PrefillFormularza,
} from "@/lib/home/prefill";
import { Bzyk, type BzykMood } from "@/components/site/Bzyk";
import { ArrowRight } from "@/components/site/Icons";
import styles from "./LeadForm.module.css";

type Ekran =
  | { rodzaj: "start" }
  | { rodzaj: "pytanie"; indeks: number }
  | { rodzaj: "kontakt" }
  | { rodzaj: "nie_teraz" }
  | { rodzaj: "odsiew_gotowe" }
  | { rodzaj: "droga"; trasa: TrasaZKalendarzem };

type Odpowiedzi = Record<string, WybranaOdpowiedz>;
type BledyKontaktu = Partial<Record<PoleKontaktu, string>>;

const LICZBA_PYTAN = PYTANIA.length;
const PUSTY_KONTAKT: SurowyKontakt = { imie: "", firma: "", strona: "", email: "", telefon: "" };

function jestObiektem(wartosc: unknown): wartosc is Record<string, unknown> {
  return typeof wartosc === "object" && wartosc !== null && !Array.isArray(wartosc);
}

function jestTrasaZKalendarzem(wartosc: unknown): wartosc is TrasaZKalendarzem {
  return wartosc === "A" || wartosc === "B" || wartosc === "C" || wartosc === "duza_firma";
}

type WynikWyslania =
  | { ok: true; trasa: Trasa; rezerwacja: string | null }
  | { ok: false; komunikat: string };

/** Fire-and-forget: brak zapisu terminu nie może psuć rezerwacji, którą klient już zrobił w Cal.com. */
async function wyslijTermin(rezerwacja: string, termin: string): Promise<void> {
  try {
    await fetch("/api/formularz/termin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rezerwacja, termin }),
    });
  } catch {
    // Zgłoszenie jest już w CRM, a Bartek zobaczy rezerwację w Cal.com.
  }
}

async function wyslijZgloszenie(tresc: object): Promise<WynikWyslania> {
  try {
    const odpowiedz = await fetch("/api/formularz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tresc),
    });
    const json: unknown = await odpowiedz.json().catch(() => null);
    if (odpowiedz.ok && jestObiektem(json) && json.ok === true) {
      if (jestTrasaZKalendarzem(json.route) || json.route === "odsiew") {
        return { ok: true, trasa: json.route, rezerwacja: typeof json.rezerwacja === "string" ? json.rezerwacja : null };
      }
    }
    // Jedna kwestia błędu dla każdej przyczyny (TEKSTY v3, sekcja 13); szczegół jest w logu serwera.
    return { ok: false, komunikat: KOMUNIKATY.bladWysylki };
  } catch {
    return { ok: false, komunikat: KOMUNIKATY.bladWysylki };
  }
}

function dopiszTekst(wybrane: WybranaOdpowiedz | undefined, id: string, wartosc: string): WybranaOdpowiedz {
  return { ids: wybrane?.ids ?? [], teksty: { ...(wybrane?.teksty ?? {}), [id]: wartosc } };
}

type PoleTekstoweProps = {
  id: string;
  etykieta: string;
  wartosc: string;
  blad?: string;
  typ?: "text" | "email" | "tel" | "url";
  autoComplete?: string;
  onZmiana: (wartosc: string) => void;
};

function PoleTekstowe({ id, etykieta, wartosc, blad, typ = "text", autoComplete, onZmiana }: PoleTekstoweProps) {
  const opisId = `${id}-blad`;
  return (
    <div className={styles.pole}>
      <label htmlFor={id} className={styles.etykieta}>
        {etykieta}
      </label>
      <input
        id={id}
        type={typ}
        value={wartosc}
        autoComplete={autoComplete}
        aria-invalid={blad ? true : undefined}
        aria-describedby={blad ? opisId : undefined}
        className={styles.wejscie}
        onChange={(zdarzenie) => onZmiana(zdarzenie.target.value)}
      />
      {blad ? (
        <p id={opisId} className={styles.blad}>
          {blad}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm() {
  const reduce = useReducedMotion() === true;
  const identyfikator = useId();
  const [ekran, setEkran] = useState<Ekran>({ rodzaj: "start" });
  const [odpowiedzi, setOdpowiedzi] = useState<Odpowiedzi>({});
  const [bladPytania, setBladPytania] = useState<string | null>(null);
  const [kontakt, setKontakt] = useState<SurowyKontakt>(PUSTY_KONTAKT);
  const [bledyKontaktu, setBledyKontaktu] = useState<BledyKontaktu>({});
  const [zgoda, setZgoda] = useState(false);
  const [zgodaMarketing, setZgodaMarketing] = useState(false);
  const [bladZgody, setBladZgody] = useState<string | null>(null);
  const [pokazKalendarz, setPokazKalendarz] = useState(false);
  const [rezerwacja, setRezerwacja] = useState<string | null>(null);
  const ramkaRef = useRef<HTMLIFrameElement | null>(null);
  const terminWyslanyRef = useRef(false);
  const [emailOdsiewu, setEmailOdsiewu] = useState("");
  const [bladEmailaOdsiewu, setBladEmailaOdsiewu] = useState<string | null>(null);
  const [pulapka, setPulapka] = useState("");
  const [wysylanie, setWysylanie] = useState(false);
  const [bladSerwera, setBladSerwera] = useState<string | null>(null);
  const [nastroj, setNastroj] = useState<BzykMood>("neutral");
  const startRef = useRef(0);
  const naglowekRef = useRef<HTMLHeadingElement | null>(null);
  const pierwszyRenderRef = useRef(true);

  const kluczEkranu = ekran.rodzaj === "pytanie" ? `pytanie-${ekran.indeks}` : ekran.rodzaj;
  // Stały identyfikator kroku dla testów i pomiaru: id pytania albo nazwa ekranu (kontakt, droga, nie_teraz...).
  const idKroku = ekran.rodzaj === "pytanie" ? (PYTANIA[ekran.indeks]?.id ?? kluczEkranu) : ekran.rodzaj;

  // Po zmianie ekranu fokus trafia na nagłówek, żeby czytnik ekranu i klawiatura zaczęły od nowego kroku.
  useEffect(() => {
    if (pierwszyRenderRef.current) {
      pierwszyRenderRef.current = false;
      return;
    }
    naglowekRef.current?.focus();
  }, [kluczEkranu]);

  // Wstępne zaznaczenie pytania 6 z `?droga=A|B|C`, raz po zamontowaniu (bez useSearchParams, żeby
  // strona nie traciła statycznego renderu). Tylko raz: nasłuch hashchange nadpisywał własny wybór
  // użytkownika po kliknięciu dowolnej kotwicy (QA 11.11). Przyciski dróg to zwykłe <a>, które
  // przeładowują stronę, więc nowy parametr i tak trafia tutaj przy montowaniu.
  useEffect(() => {
    const idOdpowiedzi = odpowiedzDlaDrogi(new URLSearchParams(window.location.search).get("droga"));
    if (idOdpowiedzi === null) {
      return;
    }
    setOdpowiedzi((poprzednie) => ({ ...poprzednie, [PYTANIE_DROGA]: { ids: [idOdpowiedzi], teksty: {} } }));
  }, []);

  // Prefill z kart działów („Tak, to u nas”): najpierw to, co kliknięto przed montażem formularza, potem nasłuch.
  useEffect(() => {
    const zastosuj = (p: PrefillFormularza) => setOdpowiedzi((poprzednie) => zastosujPrefill(poprzednie, p));
    odbierzOczekujace().forEach(zastosuj);
    return nasluchujPrefill(zastosuj);
  }, []);

  // Ramka Cal.com ładuje się tylko za zgodą (audyt P1): zapisana zgoda na kategorię „kalendarz”
  // odsłania ją od razu, a zmiana zgody w banerze w trakcie wizyty działa bez przeładowania.
  const naEkranieDrogi = ekran.rodzaj === "droga";
  useEffect(() => {
    if (!naEkranieDrogi) {
      return;
    }
    const odczytaj = () => setPokazKalendarz(czytajZgodeCookies().kalendarz);
    odczytaj();
    window.addEventListener(ZDARZENIE_ZGODY_COOKIES, odczytaj);
    return () => window.removeEventListener(ZDARZENIE_ZGODY_COOKIES, odczytaj);
  }, [naEkranieDrogi]);

  // Po rezerwacji w ramce Cal.com przysyła `postMessage` z datą startu; przekazujemy ją do CRM.
  // Tylko wiadomości z okna tej ramki i z domeny Cal.com; jeden zapis na wizytę na ekranie.
  useEffect(() => {
    if (!naEkranieDrogi || !pokazKalendarz || rezerwacja === null) {
      return;
    }
    const naWiadomosc = (zdarzenie: MessageEvent) => {
      if (terminWyslanyRef.current || zdarzenie.source !== ramkaRef.current?.contentWindow) {
        return;
      }
      const termin = terminZKomunikatu(zdarzenie.origin, zdarzenie.data);
      if (termin === null) {
        return;
      }
      terminWyslanyRef.current = true;
      void wyslijTermin(rezerwacja, termin);
    };
    window.addEventListener("message", naWiadomosc);
    return () => window.removeEventListener("message", naWiadomosc);
  }, [naEkranieDrogi, pokazKalendarz, rezerwacja]);

  function pokazKalendarzPoKliknieciu() {
    // Kliknięcie to świadomy wybór: zapisujemy zgodę na „kalendarz”, zachowując wybór analityki.
    zapiszZgodeCookies({ analityczne: czytajZgodeCookies().analityczne, kalendarz: true });
    setPokazKalendarz(true);
  }

  // Walidacja przy zmianie tylko dla pola, które już ma błąd: błąd gaśnie po poprawie, a nowe
  // błędy nie pojawiają się w trakcie pisania (QA 11.11).
  function zmienPoleKontaktu(pole: PoleKontaktu, wartosc: string) {
    const nowy = { ...kontakt, [pole]: wartosc };
    setKontakt(nowy);
    if (bledyKontaktu[pole] !== undefined) {
      const aktualny = sprawdzKontakt(nowy)[pole];
      setBledyKontaktu((poprzednie) => {
        const reszta = { ...poprzednie };
        if (aktualny === undefined) {
          delete reszta[pole];
        } else {
          reszta[pole] = aktualny;
        }
        return reszta;
      });
    }
  }

  function zmienEmailOdsiewu(wartosc: string) {
    setEmailOdsiewu(wartosc);
    if (bladEmailaOdsiewu !== null && jestPoprawnymEmailem(wartosc.trim())) {
      setBladEmailaOdsiewu(null);
    }
  }

  function przejdzDo(nowy: Ekran) {
    setNastroj("neutral");
    setBladPytania(null);
    setBladSerwera(null);
    setEkran(nowy);
  }

  function zacznij() {
    startRef.current = Date.now();
    trackEvent("form_start");
    przejdzDo({ rodzaj: "pytanie", indeks: 0 });
  }

  function wybierz(pytanie: PytanieKonfig, idOdpowiedzi: string) {
    setBladPytania(null);
    setNastroj("happy");
    setOdpowiedzi((poprzednie) => {
      const biezace = poprzednie[pytanie.id];
      if (pytanie.typ === "single") {
        return { ...poprzednie, [pytanie.id]: { ids: [idOdpowiedzi], teksty: {} } };
      }
      const ids = biezace?.ids ?? [];
      const juzJest = ids.includes(idOdpowiedzi);
      const noweIds = juzJest ? ids.filter((id) => id !== idOdpowiedzi) : [...ids, idOdpowiedzi];
      const teksty = { ...(biezace?.teksty ?? {}) };
      if (juzJest) {
        delete teksty[idOdpowiedzi];
      }
      return { ...poprzednie, [pytanie.id]: { ids: noweIds, teksty } };
    });
  }

  function ustawTekst(pytanie: PytanieKonfig, idOdpowiedzi: string, wartosc: string) {
    setBladPytania(null);
    setOdpowiedzi((poprzednie) => ({
      ...poprzednie,
      [pytanie.id]: dopiszTekst(poprzednie[pytanie.id], idOdpowiedzi, wartosc),
    }));
  }

  function pokazBladPytania(komunikat: string) {
    setBladPytania(komunikat);
    setNastroj("surprised");
    naglowekRef.current?.focus();
  }

  function dalej(indeks: number, zdarzenie: FormEvent) {
    zdarzenie.preventDefault();
    const pytanie = PYTANIA[indeks];
    if (!pytanie) {
      return;
    }
    const wybrane = odpowiedzi[pytanie.id];
    if (!wybrane || wybrane.ids.length === 0) {
      pokazBladPytania(
        pytanie.typ === "single" ? KOMUNIKATY.brakOdpowiedziSingle : KOMUNIKATY.brakOdpowiedziMulti,
      );
      return;
    }
    const brakPola = pytanie.odpowiedzi.some(
      (odpowiedz) =>
        wybrane.ids.includes(odpowiedz.id) &&
        odpowiedz.pole?.wymagane === true &&
        (wybrane.teksty[odpowiedz.id] ?? "").trim().length === 0,
    );
    if (brakPola) {
      pokazBladPytania(KOMUNIKATY.brakPola);
      return;
    }
    if (indeks + 1 < LICZBA_PYTAN) {
      trackEvent("form_step", { step: indeks + 2 });
      przejdzDo({ rodzaj: "pytanie", indeks: indeks + 1 });
      return;
    }
    // Decyzja po ostatnim pytaniu: odsiew nie dostaje kalendarza, reszta przechodzi do danych.
    przejdzDo(zdecyduj(odpowiedzi).trasa === "odsiew" ? { rodzaj: "nie_teraz" } : { rodzaj: "kontakt" });
  }

  function wstecz() {
    if (ekran.rodzaj === "pytanie" && ekran.indeks > 0) {
      przejdzDo({ rodzaj: "pytanie", indeks: ekran.indeks - 1 });
    } else if (ekran.rodzaj === "kontakt" || ekran.rodzaj === "nie_teraz") {
      przejdzDo({ rodzaj: "pytanie", indeks: LICZBA_PYTAN - 1 });
    }
  }

  async function wyslijKontakt(zdarzenie: FormEvent) {
    zdarzenie.preventDefault();
    if (wysylanie) {
      return;
    }
    const bledy = sprawdzKontakt(kontakt);
    setBledyKontaktu(bledy);
    setBladZgody(zgoda ? null : KOMUNIKATY.brakZgodyKontakt);
    if (Object.keys(bledy).length > 0 || !zgoda) {
      setNastroj("surprised");
      naglowekRef.current?.focus();
      return;
    }
    setWysylanie(true);
    setBladSerwera(null);
    setNastroj("neutral");
    const wynik = await wyslijZgloszenie({
      rodzaj: "zgloszenie",
      wersja: WERSJA_FORMULARZA,
      wypelnianieMs: Date.now() - startRef.current,
      pole_kontrolne: pulapka,
      zgoda,
      zgodaMarketing,
      odpowiedzi,
      kontakt,
    });
    setWysylanie(false);
    if (wynik.ok && jestTrasaZKalendarzem(wynik.trasa)) {
      trackEvent("form_submit", { route: wynik.trasa });
      setRezerwacja(wynik.rezerwacja);
      terminWyslanyRef.current = false;
      przejdzDo({ rodzaj: "droga", trasa: wynik.trasa });
      return;
    }
    setNastroj("surprised");
    setBladSerwera(wynik.ok ? KOMUNIKATY.bladWysylki : wynik.komunikat);
  }

  async function wyslijOdsiew(zdarzenie: FormEvent) {
    zdarzenie.preventDefault();
    if (wysylanie) {
      return;
    }
    const email = emailOdsiewu.trim();
    const bladEmaila = jestPoprawnymEmailem(email) ? null : KOMUNIKATY.bladEmaila;
    setBladEmailaOdsiewu(bladEmaila);
    setBladZgody(zgoda ? null : KOMUNIKATY.brakZgodyOdsiew);
    if (bladEmaila !== null || !zgoda) {
      setNastroj("surprised");
      return;
    }
    setWysylanie(true);
    setBladSerwera(null);
    const wynik = await wyslijZgloszenie({
      rodzaj: "odsiew",
      wersja: WERSJA_FORMULARZA,
      wypelnianieMs: Date.now() - startRef.current,
      pole_kontrolne: pulapka,
      zgoda,
      zgodaMarketing,
      odpowiedzi,
      email,
    });
    setWysylanie(false);
    if (wynik.ok) {
      trackEvent("form_submit", { route: "odsiew" });
      przejdzDo({ rodzaj: "odsiew_gotowe" });
      return;
    }
    setNastroj("surprised");
    setBladSerwera(wynik.komunikat);
  }

  // --- kwestia Bzyka (jedyny region aria-live; zmienia się razem z ekranem) ---
  function kwestiaBzyka(): string {
    if (wysylanie) {
      return KOMUNIKATY.wysylanie;
    }
    if (bladSerwera) {
      return bladSerwera;
    }
    switch (ekran.rodzaj) {
      case "start":
        return START.bzyk;
      case "pytanie": {
        const pytanie = PYTANIA[ekran.indeks];
        return bladPytania ?? pytanie?.bzyk ?? "";
      }
      case "kontakt":
        return Object.keys(bledyKontaktu).length > 0 || bladZgody ? KONTAKT.bzykBlad : KONTAKT.bzyk;
      case "nie_teraz":
        return NIE_TERAZ.bzyk;
      case "odsiew_gotowe":
        return NIE_TERAZ.potwierdzenieBzyk;
      case "droga":
        return ekranWynikuDrogi(ekran.trasa, zdecyduj(odpowiedzi).znaczniki).bzyk;
    }
  }

  const postep = ekran.rodzaj === "pytanie" ? ekran.indeks + 1 : null;
  const kwestia = kwestiaBzyka();
  const jestBlad = bladPytania !== null || bladSerwera !== null;

  const przejscie = reduce
    ? { initial: false as const, animate: { opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, x: 14 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.22, ease: [0.2, 0, 0, 1] as const },
      };

  const przyciskWstecz = (
    <button type="button" className={`lm-btn lm-btn--secondary ${styles.wstecz}`} onClick={wstecz}>
      <span aria-hidden="true">←</span> Wstecz
    </button>
  );

  const pulapkaPole = (
    <div className={styles.pulapka} aria-hidden="true">
      <label>
        Nie wypełniaj tego pola
        <input
          type="text"
          name="pole_kontrolne"
          tabIndex={-1}
          autoComplete="off"
          value={pulapka}
          onChange={(zdarzenie) => setPulapka(zdarzenie.target.value)}
        />
      </label>
    </div>
  );

  function renderPytanie(indeks: number) {
    const pytanie = PYTANIA[indeks];
    if (!pytanie) {
      return null;
    }
    const wybrane = odpowiedzi[pytanie.id];
    const typWejscia = pytanie.typ === "single" ? "radio" : "checkbox";
    return (
      <form onSubmit={(zdarzenie) => dalej(indeks, zdarzenie)} noValidate>
        <fieldset className={styles.zestaw} data-blad={bladPytania !== null ? "tak" : undefined}>
          <legend className={styles.legenda}>
            <h2 ref={naglowekRef} tabIndex={-1} className={styles.naglowek}>
              {pytanie.tekst}
            </h2>
            {pytanie.typ === "multi" ? <span className={styles.podpowiedz}>Możesz zaznaczyć kilka.</span> : null}
          </legend>
          <div className={styles.opcje}>
            {pytanie.odpowiedzi.map((odpowiedz) => {
              const zaznaczona = wybrane?.ids.includes(odpowiedz.id) === true;
              const poleId = `${identyfikator}-${pytanie.id}-${odpowiedz.id}`;
              const zPolem = zaznaczona && odpowiedz.pole !== undefined;
              return (
                <div key={odpowiedz.id} className={zPolem ? `${styles.opcjaWrap} ${styles.opcjaZPolem}` : styles.opcjaWrap}>
                  <label className={styles.opcja}>
                    <input
                      type={typWejscia}
                      name={`${identyfikator}-${pytanie.id}`}
                      checked={zaznaczona}
                      onChange={() => wybierz(pytanie, odpowiedz.id)}
                      className={pytanie.typ === "single" ? styles.radio : styles.checkbox}
                    />
                    <span>{odpowiedz.etykieta}</span>
                  </label>
                  {zPolem && odpowiedz.pole ? (
                    <div className={styles.poleOpcji}>
                      <label htmlFor={poleId} className={styles.etykieta}>
                        {odpowiedz.pole.etykieta}
                        {odpowiedz.pole.wymagane ? "" : " (opcjonalnie)"}
                      </label>
                      <input
                        id={poleId}
                        type="text"
                        maxLength={200}
                        value={wybrane?.teksty[odpowiedz.id] ?? ""}
                        className={styles.wejscie}
                        onChange={(zdarzenie) => ustawTekst(pytanie, odpowiedz.id, zdarzenie.target.value)}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </fieldset>
        <div className={styles.akcje}>
          <button type="submit" className="lm-btn lm-btn--primary">
            Dalej <ArrowRight className="lm-btn__arrow" />
          </button>
          {indeks > 0 ? przyciskWstecz : null}
        </div>
      </form>
    );
  }

  function renderKontakt() {
    return (
      <form onSubmit={wyslijKontakt} noValidate>
        <h2 ref={naglowekRef} tabIndex={-1} className={styles.naglowek}>
          {KONTAKT.naglowek}
        </h2>
        <div className={styles.siatkaPol}>
          <PoleTekstowe
            id={`${identyfikator}-imie`}
            etykieta={KONTAKT.pola.imie}
            wartosc={kontakt.imie}
            blad={bledyKontaktu.imie}
            autoComplete="name"
            onZmiana={(wartosc) => zmienPoleKontaktu("imie", wartosc)}
          />
          <PoleTekstowe
            id={`${identyfikator}-firma`}
            etykieta={KONTAKT.pola.firma}
            wartosc={kontakt.firma}
            blad={bledyKontaktu.firma}
            autoComplete="organization"
            onZmiana={(wartosc) => zmienPoleKontaktu("firma", wartosc)}
          />
          <PoleTekstowe
            id={`${identyfikator}-strona`}
            etykieta={KONTAKT.pola.strona}
            wartosc={kontakt.strona}
            blad={bledyKontaktu.strona}
            autoComplete="url"
            onZmiana={(wartosc) => zmienPoleKontaktu("strona", wartosc)}
          />
          <PoleTekstowe
            id={`${identyfikator}-email`}
            etykieta={KONTAKT.pola.email}
            wartosc={kontakt.email}
            blad={bledyKontaktu.email}
            typ="email"
            autoComplete="email"
            onZmiana={(wartosc) => zmienPoleKontaktu("email", wartosc)}
          />
          <PoleTekstowe
            id={`${identyfikator}-telefon`}
            etykieta={KONTAKT.pola.telefon}
            wartosc={kontakt.telefon}
            blad={bledyKontaktu.telefon}
            typ="tel"
            autoComplete="tel"
            onZmiana={(wartosc) => zmienPoleKontaktu("telefon", wartosc)}
          />
        </div>
        {renderZgoda(KONTAKT.zgoda)}
        {renderMarketing()}
        {pulapkaPole}
        <div className={styles.akcje}>
          <button type="submit" className="lm-btn lm-btn--primary" aria-disabled={wysylanie}>
            {wysylanie ? "Zapisuję…" : KONTAKT.przycisk} <ArrowRight className="lm-btn__arrow" />
          </button>
          {przyciskWstecz}
        </div>
        {renderKlauzula(KONTAKT.klauzula)}
      </form>
    );
  }

  // Klauzula informacyjna stoi bezpośrednio pod przyciskiem wysyłki (treść-zgód.md, zasada 4).
  function renderKlauzula(poczatek: string) {
    return (
      <p className={styles.klauzula}>
        {poczatek}{" "}
        <a href={LINKS.privacy} className="lm-link" target="_blank" rel="noopener noreferrer">
          Polityce prywatności
        </a>
        .
      </p>
    );
  }

  // Zgoda marketingowa: osobne pole, niezaznaczone, nie blokuje wysłania.
  function renderMarketing() {
    return (
      <div className={styles.zgoda}>
        <label className={styles.zgodaEtykieta}>
          <input
            type="checkbox"
            checked={zgodaMarketing}
            className={styles.checkbox}
            onChange={(zdarzenie) => setZgodaMarketing(zdarzenie.target.checked)}
          />
          <span>{ZGODA_MARKETING}</span>
        </label>
      </div>
    );
  }

  function renderZgoda(tekstZgody: string) {
    const opisId = `${identyfikator}-zgoda-blad`;
    return (
      <div className={styles.zgoda}>
        <label className={styles.zgodaEtykieta}>
          <input
            type="checkbox"
            checked={zgoda}
            aria-invalid={bladZgody ? true : undefined}
            aria-describedby={bladZgody ? opisId : undefined}
            className={styles.checkbox}
            onChange={(zdarzenie) => {
              setZgoda(zdarzenie.target.checked);
              setBladZgody(null);
            }}
          />
          <span>{tekstZgody}</span>
        </label>
        {bladZgody ? (
          <p id={opisId} className={styles.blad}>
            {bladZgody}
          </p>
        ) : null}
      </div>
    );
  }

  function renderNieTeraz() {
    return (
      <form onSubmit={wyslijOdsiew} noValidate>
        <h2 ref={naglowekRef} tabIndex={-1} className={styles.naglowek}>
          {NIE_TERAZ.naglowek}
        </h2>
        <p className={styles.tekst}>{NIE_TERAZ.tekst}</p>
        <p className={styles.tekst}>{NIE_TERAZ.pomylka}</p>
        <PoleTekstowe
          id={`${identyfikator}-email-odsiew`}
          etykieta={NIE_TERAZ.poleEmail}
          wartosc={emailOdsiewu}
          blad={bladEmailaOdsiewu ?? undefined}
          typ="email"
          autoComplete="email"
          onZmiana={zmienEmailOdsiewu}
        />
        {renderZgoda(NIE_TERAZ.zgoda)}
        {renderMarketing()}
        {pulapkaPole}
        <div className={styles.akcje}>
          <button type="submit" className="lm-btn lm-btn--primary" aria-disabled={wysylanie}>
            {wysylanie ? "Zapisuję…" : NIE_TERAZ.przycisk} <ArrowRight className="lm-btn__arrow" />
          </button>
          {przyciskWstecz}
        </div>
        {renderKlauzula(NIE_TERAZ.klauzula)}
      </form>
    );
  }

  function renderDroga(trasa: TrasaZKalendarzem) {
    const znaczniki = zdecyduj(odpowiedzi).znaczniki;
    const droga = ekranWynikuDrogi(trasa, znaczniki);
    // Dane osoby w adresie tylko po kliknięciu albo przy zapisanej zgodzie (P1); link „nowa karta”
    // to też kliknięcie, więc zawsze ma prefill.
    const osoba = { imie: kontakt.imie.trim(), email: kontakt.email.trim().toLowerCase(), firma: kontakt.firma.trim() };
    const adresRamki = adresKalendarza(trasa, znaczniki, pokazKalendarz ? osoba : null);
    const adresLinku = adresKalendarza(trasa, znaczniki, osoba);
    return (
      <div>
        <h2 ref={naglowekRef} tabIndex={-1} className={styles.naglowek}>
          {droga.tytul}
        </h2>
        <p className={styles.tekst}>{droga.tekst}</p>
        <p className={styles.tekst}>{PO_WYSLANIU}</p>
        {pokazKalendarz ? (
          <iframe
            ref={ramkaRef}
            src={adresRamki}
            title={KOMUNIKATY.kalendarzTytul}
            loading="lazy"
            className={styles.kalendarz}
          />
        ) : (
          <div>
            <p className={styles.tekst}>{KALENDARZ_ZGODA.informacja}</p>
            <div className={styles.akcje}>
              <button type="button" className="lm-btn lm-btn--primary" onClick={pokazKalendarzPoKliknieciu}>
                {KALENDARZ_ZGODA.przycisk} <ArrowRight className="lm-btn__arrow" />
              </button>
            </div>
          </div>
        )}
        <p className={styles.tekst}>
          <a href={adresLinku} className={`lm-link ${styles.linkSamodzielny}`} target="_blank" rel="noopener noreferrer">
            {KOMUNIKATY.kalendarzLink}
          </a>
        </p>
        {pokazKalendarz ? null : <p className={styles.tekst}>{KALENDARZ_ZGODA.bezKalendarza}</p>}
      </div>
    );
  }

  function renderEkran() {
    switch (ekran.rodzaj) {
      case "start":
        return (
          <div>
            <button type="button" className="lm-btn lm-btn--primary" onClick={zacznij}>
              {START.przycisk} <ArrowRight className="lm-btn__arrow" />
            </button>
          </div>
        );
      case "pytanie":
        return renderPytanie(ekran.indeks);
      case "kontakt":
        return renderKontakt();
      case "nie_teraz":
        return renderNieTeraz();
      case "odsiew_gotowe":
        return (
          <h2 ref={naglowekRef} tabIndex={-1} className={styles.naglowek}>
            {NIE_TERAZ.naglowek}
          </h2>
        );
      case "droga":
        return renderDroga(ekran.trasa);
    }
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <section className={styles.karta} aria-label="Formularz kwalifikujący">
        {postep !== null ? (
          <div className={styles.postep}>
            <p className={styles.postepOpis}>
              Pytanie {postep} z {LICZBA_PYTAN}
            </p>
            <div
              className={styles.pasek}
              role="progressbar"
              aria-label="Postęp formularza"
              aria-valuemin={1}
              aria-valuemax={LICZBA_PYTAN}
              aria-valuenow={postep}
            >
              <div className={styles.pasekWypelnienie} style={{ transform: `scaleX(${postep / LICZBA_PYTAN})` }} />
            </div>
          </div>
        ) : null}

        <div className={styles.kwestia}>
          <m.div
            key={nastroj}
            className={styles.bzyk}
            initial={false}
            animate={reduce ? { y: 0 } : { y: nastroj === "neutral" ? 0 : [0, -5, 0] }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.2, 0, 0, 1] }}
          >
            <Bzyk mood={nastroj} width={56} />
          </m.div>
          <div className={`lm-bubble ${styles.dymek} ${jestBlad ? styles.dymekBlad : ""}`} aria-live="polite">
            <span className="lm-bubble__who">Bzyk</span>
            {kwestia}
          </div>
        </div>

        <m.div
          key={kluczEkranu}
          className={styles.ekran}
          data-qa="krok-formularza"
          data-krok={idKroku}
          {...przejscie}
        >
          {renderEkran()}
        </m.div>
      </section>
    </LazyMotion>
  );
}
