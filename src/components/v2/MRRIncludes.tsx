"use client";

import React from "react";
import { Wrench, Shield, Sparkles, BarChart2, Cpu } from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────

export type Tier = "STARTER" | "GROWTH" | "SCALE";
export type Product = "hlc" | "pipeline" | "content" | "obsluga" | "generator";

type MRRCategory = {
  id: "narzedzia" | "monitoring" | "optymalizacja" | "raporty" | "modele";
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
};

export type MRRIncludesProps = {
  product: Product;
  tier: Tier;
  className?: string;
};

// ── SLA hours per tier ───────────────────────────────────────────────────────

const slaHours: Record<Tier, number> = {
  STARTER: 24,
  GROWTH: 8,
  SCALE: 4,
};

// ── Data: 5 produktow x 3 tiery x 5 kategorii = 75 one-linerow ──────────────

type TierData = Record<Tier, string>;
type CategoryData = {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  descriptions: TierData;
};

const DATA: Record<Product, Record<MRRCategory["id"], CategoryData>> = {
  // ── HLC (Hot Lead Catcher) ─────────────────────────────────────────────────
  hlc: {
    narzedzia: {
      label: "Narzędzia",
      icon: Wrench,
      descriptions: {
        STARTER: "Hosting, API agenta, bazy danych i monitoring systemu w cenie - zero kont do zakładania po Twojej stronie.",
        GROWTH: "Hosting, API agenta, bazy danych i monitoring systemu w cenie - zero kont do zakładania po Twojej stronie.",
        SCALE: "Hosting, API agenta, bazy danych i monitoring systemu w cenie - zero kont do zakładania po Twojej stronie.",
      },
    },
    monitoring: {
      label: "Monitoring",
      icon: Shield,
      descriptions: {
        STARTER: "Codzienny health check agenta - jeśli padnie lub zwróci false positives, naprawiamy zanim zauważysz (reakcja do 24h).",
        GROWTH: "Codzienny health check agenta - jeśli padnie lub zwróci false positives, naprawiamy zanim zauważysz (reakcja do 8h).",
        SCALE: "Ciągly health check agenta - jeśli padnie lub zwróci false positives, naprawiamy zanim zauważysz (reakcja do 4h).",
      },
    },
    optymalizacja: {
      label: "Optymalizacja",
      icon: Sparkles,
      descriptions: {
        STARTER: "Co kwartał przestrajamy ICP i scoring pod Twój feedback - żeby alerty były coraz trafniejsze.",
        GROWTH: "Co kwartał przestrajamy ICP i scoring pod Twój feedback - żeby alerty były coraz trafniejsze.",
        SCALE: "Co miesiąc dostosowujemy agenta do zmian w Twojej branży i nowych źródeł sygnałów.",
      },
    },
    raporty: {
      label: "Raporty",
      icon: BarChart2,
      descriptions: {
        STARTER: "Miesięczny raport: ile sygnałów złapał agent, jakość alertów i 3 rekomendacje co poprawić.",
        GROWTH: "Miesięczny raport: ile sygnałów złapał agent, jakość alertów i 3 rekomendacje co poprawić.",
        SCALE: "Tygodniowy health check + miesięczny raport strategiczny z 3 rekomendacjami co skalować.",
      },
    },
    modele: {
      label: "Modele AI",
      icon: Cpu,
      descriptions: {
        STARTER: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - Ty nic nie robisz.",
        GROWTH: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - Ty nic nie robisz.",
        SCALE: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - Ty nic nie robisz.",
      },
    },
  },

  // ── PIPELINE (Pipeline Machine) ────────────────────────────────────────────
  pipeline: {
    narzedzia: {
      label: "Narzędzia",
      icon: Wrench,
      descriptions: {
        STARTER: "Domeny, warmup mailboxów, subskrypcja Instantly i scraping tools w cenie - zero kont do zakładania po Twojej stronie.",
        GROWTH: "Domeny, warmup mailboxów, Instantly, LinkedIn outreach tools i scraping tools w cenie - zero kont do zakładania po Twojej stronie.",
        SCALE: "Domeny, warmup, Instantly, LinkedIn, narzędzia multi-persona i scraping w cenie - zero kont do zakładania po Twojej stronie.",
      },
    },
    monitoring: {
      label: "Monitoring",
      icon: Shield,
      descriptions: {
        STARTER: "Codzienny health check sekwencji - deliverability spada, domena traci reputację? Naprawiamy zanim obniżysz reply rate (reakcja do 24h).",
        GROWTH: "Codzienny health check sekwencji - deliverability spada, domena traci reputację? Naprawiamy zanim obniżysz reply rate (reakcja do 8h).",
        SCALE: "Ciągly health check sekwencji i kont - deliverability spada, domena traci reputację? Naprawiamy natychmiast (reakcja do 4h).",
      },
    },
    optymalizacja: {
      label: "Optymalizacja",
      icon: Sparkles,
      descriptions: {
        STARTER: "Co kwartał rekalibracja ICP i test nowej sekwencji - żeby open rate i reply rate rosły.",
        GROWTH: "Co kwartał rekalibracja ICP i A/B test nowej sekwencji email + LinkedIn - żeby open rate i reply rate rosły.",
        SCALE: "Co miesiąc nowy wariant sekwencji, nowe segmenty ICP i optymalizacja tone of voice pod wyniki z poprzedniego miesiąca.",
      },
    },
    raporty: {
      label: "Raporty",
      icon: BarChart2,
      descriptions: {
        STARTER: "Miesięczny Performance Report: open rate, reply rate, pipeline value i 3 rekomendacje co zmienić.",
        GROWTH: "Miesięczny Performance Report: open rate, reply rate, meeting rate, pipeline value i 3 rekomendacje co skalować.",
        SCALE: "Tygodniowy health check kampanii + miesięczny raport strategiczny z analizą per segment ICP.",
      },
    },
    modele: {
      label: "Modele AI",
      icon: Cpu,
      descriptions: {
        STARTER: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - Ty nic nie robisz.",
        GROWTH: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - Ty nic nie robisz.",
        SCALE: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - Ty nic nie robisz.",
      },
    },
  },

  // ── CONTENT (Content Machine / SEO) ───────────────────────────────────────
  content: {
    narzedzia: {
      label: "Narzędzia",
      icon: Wrench,
      descriptions: {
        STARTER: "Senuto, agenty do writingu, CMS integration i hosting artykułów w cenie - zero dodatkowych subskrypcji po Twojej stronie.",
        GROWTH: "Senuto, agenty do writingu, tracking pozycji, CMS integration i hosting artykułów w cenie - zero dodatkowych subskrypcji.",
        SCALE: "Senuto, agenty do writingu, tracking pozycji, competitor gap tools i dedykowany PM w cenie - zero dodatkowych subskrypcji.",
      },
    },
    monitoring: {
      label: "Monitoring",
      icon: Shield,
      descriptions: {
        STARTER: "Śledzimy indeksację i pozycje artykułów - jeśli Google przestanie indeksować lub pozycje zaczną spadać, reagujemy (reakcja do 24h).",
        GROWTH: "Śledzimy indeksację, pozycje i core web vitals - anomalia techniczna? Reagujemy zanim ruch zacznie spadać (reakcja do 8h).",
        SCALE: "Monitoring indeksacji, pozycji, konkurencji i core web vitals w czasie rzeczywistym - każda anomalia trafia do Ciebie natychmiast (reakcja do 4h).",
      },
    },
    optymalizacja: {
      label: "Optymalizacja",
      icon: Sparkles,
      descriptions: {
        STARTER: "Co kwartał przeglądamy keyword clusters i dostosowujemy brief artykułów do zmian w SERP-ie.",
        GROWTH: "Co kwartał aktualizujemy klastry, refreshujemy artykuły poniżej TOP 20 i optymalizujemy internal linking.",
        SCALE: "Co miesiąc aktualizacja klastrów, refresh słabszych artykułów i rozbudowa internal linkingu pod nowe frazy.",
      },
    },
    raporty: {
      label: "Raporty",
      icon: BarChart2,
      descriptions: {
        STARTER: "Miesięczny raport SEO: liczba artykułów, nowe pozycje w TOP 50, ruch organiczny i 3 rekomendacje na kolejny miesiąc.",
        GROWTH: "Miesięczny raport SEO: frazy w TOP 10, wzrost ruchu organicznego, estymowana wartość ruchu i 3 rekomendacje strategiczne.",
        SCALE: "Tygodniowy health check pozycji + miesięczny raport strategiczny z analizą luk wobec konkurencji i nowym planem klastrów.",
      },
    },
    modele: {
      label: "Modele AI",
      icon: Cpu,
      descriptions: {
        STARTER: "Gdy producent modelu wypuści nową wersję, migrujemy pipeline bez przestoju - artykuły piszą się dalej.",
        GROWTH: "Gdy producent modelu wypuści nową wersję, migrujemy pipeline bez przestoju - artykuły piszą się dalej.",
        SCALE: "Gdy producent modelu wypuści nową wersję, migrujemy pipeline bez przestoju - artykuły piszą się dalej.",
      },
    },
  },

  // ── OBSLUGA (Obsługa Klienta) ──────────────────────────────────────────────
  obsluga: {
    narzedzia: {
      label: "Narzędzia",
      icon: Wrench,
      descriptions: {
        STARTER: "Hosting chatbota, baza RAG, widget do embedowania i integracja kanału w cenie - zero dodatkowych subskrypcji po Twojej stronie.",
        GROWTH: "Hosting chatbota, baza RAG, integracje WhatsApp Business, email triage i CRM w cenie - zero dodatkowych subskrypcji.",
        SCALE: "Hosting chatbota, baza RAG, WhatsApp, email triage, Voice Agent i integracje CRM plus ERP w cenie - zero dodatkowych subskrypcji.",
      },
    },
    monitoring: {
      label: "Monitoring",
      icon: Shield,
      descriptions: {
        STARTER: "Codziennie sprawdzamy czy bot odpowiada poprawnie i nie robi false answers - anomalia? Naprawiamy zanim klient to zgłosi (reakcja do 24h).",
        GROWTH: "Codziennie sprawdzamy CSAT, false answers i coverage bazy RAG - anomalia? Naprawiamy zanim wpłynie na oceny (reakcja do 8h).",
        SCALE: "Ciągly monitoring CSAT, false answers i coverage RAG na wszystkich kanałach - anomalia? Naprawiamy natychmiast (reakcja do 4h).",
      },
    },
    optymalizacja: {
      label: "Optymalizacja",
      icon: Sparkles,
      descriptions: {
        STARTER: "Co kwartał rozbudowujemy bazę RAG o nowe FAQ i tematy z eskalacji - żeby auto-resolve rate rósł.",
        GROWTH: "Co kwartał rozbudowujemy bazę RAG, optymalizujemy flow eskalacji i aktualizujemy reguły CSAT scoringu.",
        SCALE: "Co miesiąc rozbudowujemy bazę RAG, dodajemy nowe scenariusze obsługi i optymalizujemy tone of voice per kanał.",
      },
    },
    raporty: {
      label: "Raporty",
      icon: BarChart2,
      descriptions: {
        STARTER: "Miesięczny raport: liczba konwersacji, auto-resolve rate, tematy eskalacji i 3 rekomendacje co dodać do bazy.",
        GROWTH: "Miesięczny raport CSAT: auto-resolve rate, czas odpowiedzi, tematy eskalacji i 3 rekomendacje co poprawić w bocie.",
        SCALE: "Tygodniowy health check botów + miesięczny raport CSAT z analizą per kanał i rekomendacjami do bazy RAG.",
      },
    },
    modele: {
      label: "Modele AI",
      icon: Cpu,
      descriptions: {
        STARTER: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - bot odpowiada dalej bez przerwy dla klientów.",
        GROWTH: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - bot odpowiada dalej bez przerwy dla klientów.",
        SCALE: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - bot odpowiada dalej bez przerwy dla klientów.",
      },
    },
  },

  // ── GENERATOR (Generator Ofert) ────────────────────────────────────────────
  generator: {
    narzedzia: {
      label: "Narzędzia",
      icon: Wrench,
      descriptions: {
        STARTER: "Hosting chatu wycenowego, baza RAG z cennikiem, generator PDF i integracja z Google Sheets w cenie - zero dodatkowych subskrypcji.",
        GROWTH: "Hosting aplikacji Next.js, baza RAG, generator PDF, auto follow-up i integracja CRM w cenie - zero dodatkowych subskrypcji.",
        SCALE: "Hosting aplikacji, baza RAG, generator PDF, tracking otwarć, widget embed, QR kody i integracje ERP w cenie - zero dodatkowych subskrypcji.",
      },
    },
    monitoring: {
      label: "Monitoring",
      icon: Shield,
      descriptions: {
        STARTER: "Codziennie sprawdzamy czy agent liczy prawidłowo i PDF generuje się bez błędów - anomalia? Naprawiamy zanim trafi do klienta (reakcja do 24h).",
        GROWTH: "Codziennie sprawdzamy poprawność kalkulacji, generowania PDF i działania follow-upów - anomalia? Naprawiamy zanim trafi do klienta (reakcja do 8h).",
        SCALE: "Ciągly monitoring kalkulacji, PDF, follow-upów i integracji CRM plus ERP - każda anomalia trafia do nas natychmiast (reakcja do 4h).",
      },
    },
    optymalizacja: {
      label: "Optymalizacja",
      icon: Sparkles,
      descriptions: {
        STARTER: "Co kwartał przeglądamy bazę RAG i aktualizujemy szablony PDF pod Twój feedback i zmiany w cenniku.",
        GROWTH: "Co kwartał optymalizujemy pytania kwalifikacyjne, warianty cenowe i timing follow-upów pod dane z konwersji.",
        SCALE: "Co miesiąc optymalizujemy flow kwalifikacji, warianty cenowe i treści follow-upów pod dane win rate z CRM.",
      },
    },
    raporty: {
      label: "Raporty",
      icon: BarChart2,
      descriptions: {
        STARTER: "Miesięczny raport: liczba wycen, najpopularniejsze warianty i 3 rekomendacje jak podnieść win rate.",
        GROWTH: "Cotygodniowy raport z analizą wycen: win rate, najpopularniejsze warianty, czas do decyzji i 3 rekomendacje co zoptymalizować.",
        SCALE: "Tygodniowy raport konwersji + miesięczny raport strategiczny z analizą win rate per segment klienta i per wariant cenowy.",
      },
    },
    modele: {
      label: "Modele AI",
      icon: Cpu,
      descriptions: {
        STARTER: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - konfiguratory wyceniają dalej bez przerwy.",
        GROWTH: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - konfiguratory wyceniają dalej bez przerwy.",
        SCALE: "Gdy producent modelu wypuści nową wersję, migrujemy bez przestoju - konfiguratory wyceniają dalej bez przerwy.",
      },
    },
  },
};

const CATEGORY_ORDER: MRRCategory["id"][] = [
  "narzedzia",
  "monitoring",
  "optymalizacja",
  "raporty",
  "modele",
];

// ── Component ─────────────────────────────────────────────────────────────────

export function MRRIncludes({ product, tier, className }: MRRIncludesProps) {
  const productData = DATA[product];

  const categories: MRRCategory[] = CATEGORY_ORDER.map((id) => ({
    id,
    label: productData[id].label,
    icon: productData[id].icon,
    description: productData[id].descriptions[tier],
  }));

  return (
    <section
      className={className}
      aria-label="Co zawiera abonament utrzymania"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-3">
        W CENIE UTRZYMANIA ZAWARTE
      </div>
      <h3 className="text-[18px] font-medium text-[#0A0A0A] mb-6">
        W cenie utrzymania zawarte:
      </h3>

      <ul className="flex flex-col gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <li key={cat.id} className="flex items-start gap-4">
              <div
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-md"
                style={{ background: "#F5EDE6", color: "#B87333" }}
                aria-hidden="true"
              >
                <Icon size={16} />
              </div>
              <div>
                <span className="block text-[14px] font-medium text-[#0A0A0A]">
                  {cat.label}
                </span>
                <span className="block text-[13px] leading-[1.6] text-[#525252] mt-0.5">
                  {cat.description}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] px-3 py-1.5"
        style={{ background: "#F5EDE6", color: "#8B4513", borderRadius: 4 }}
      >
        <Shield size={11} aria-hidden="true" />
        Reakcja do {slaHours[tier]}h
      </div>
    </section>
  );
}
