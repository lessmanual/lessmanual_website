"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/lib/constants";

type Visual = "pipeline" | "seo" | "chatbot" | "offers" | "intent" | "custom";

// Lazy-load Player (no SSR - Remotion uses browser APIs)
const Player = dynamic(() => import("@remotion/player").then((m) => m.Player), { ssr: false });

// Lazy-load 5 Remotion scenes
const HotLeadCatcherScene = dynamic(
  () => import("./remotion/HotLeadCatcherScene").then((m) => m.HotLeadCatcherScene),
  { ssr: false }
);
const PipelineMachineScene = dynamic(
  () => import("./remotion/PipelineMachineScene").then((m) => m.PipelineMachineScene),
  { ssr: false }
);
const ContentMachineScene = dynamic(
  () => import("./remotion/ContentMachineScene").then((m) => m.ContentMachineScene),
  { ssr: false }
);
const ObslugaKlientaScene = dynamic(
  () => import("./remotion/ObslugaKlientaScene").then((m) => m.ObslugaKlientaScene),
  { ssr: false }
);
const GeneratorOfertScene = dynamic(
  () => import("./remotion/GeneratorOfertScene").then((m) => m.GeneratorOfertScene),
  { ssr: false }
);

type SceneComponent = React.ComponentType;

// Mapping slug -> scene component
const SCENE_MAP: Record<string, SceneComponent> = {
  "Hot Lead Catcher": HotLeadCatcherScene as SceneComponent,
  "Spotkania z decydentami": PipelineMachineScene as SceneComponent,
  "Blog który pisze się sam": ContentMachineScene as SceneComponent,
  "Odpowiedź w 30 sekund, 24/7": ObslugaKlientaScene as SceneComponent,
  "Wycena w 5 minut zamiast 2 godzin": GeneratorOfertScene as SceneComponent,
};

const MAP: Array<{
  slug: string;
  metric: string;
  metricLabel: string;
  short: string;
  visual: Visual;
}> = [
  {
    slug: "Hot Lead Catcher",
    metric: "4 źródła",
    metricLabel: "sygnałów zakupowych · alert w 24h",
    short: "Agent AI, który czeka na moment zakupowy. Monitoruje newsy, oferty pracy, opinie, social media. Alert Telegram + gotowy draft maila.",
    visual: "intent",
  },
  {
    slug: "Spotkania z decydentami",
    metric: "76%",
    metricLabel: "open rate · 61% positive reply",
    short: "Agent, który umawia spotkania z Twoim ICP. Pay-per-meeting, zero stałych opłat.",
    visual: "pipeline",
  },
  {
    slug: "Blog który pisze się sam",
    metric: "+150-400%",
    metricLabel: "ruchu organicznego w 6 mies.",
    short: "10-30 artykułów SEO miesięcznie + social media (LinkedIn, X, IG). Keyword research, klastry, GEO pod AI.",
    visual: "seo",
  },
  {
    slug: "Odpowiedź w 30 sekund, 24/7",
    metric: "60-80%",
    metricLabel: "zapytań obsłużonych automatycznie",
    short: "Agent odpowiada klientom na stronie, WhatsApp i mailu. Na Twojej bazie wiedzy.",
    visual: "chatbot",
  },
  {
    slug: "Wycena w 5 minut zamiast 2 godzin",
    metric: "2h → 5 min",
    metricLabel: "oszczędność 96% czasu",
    short: "Klient sam wycenia na stronie. System generuje brandowane PDF i wysyła mailem.",
    visual: "offers",
  },
  {
    slug: "Indywidualne Wdrożenia",
    metric: "od 15k PLN",
    metricLabel: "wycena projektowa po Discovery",
    short: "Agent AI pod Twoj unikalny workflow - gdy zadne z 5 gotowych rozwiazan nie pasuje. Discovery bezplatne.",
    visual: "custom",
  },
];

// Stagger container variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function ProductsV2() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id="systems"
      className="px-6 md:px-10 py-32 md:py-48"
      variants={containerVariants}
      initial={reducedMotion ? "visible" : "hidden"}
      animate={inView || reducedMotion ? "visible" : "hidden"}
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="max-w-[720px] mb-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
            6 systemów
          </div>
          <h2>Sześć systemów AI. Każdy robi jedną rzecz doskonale.</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[#525252]">
            Wdrożenie w 2-4 tygodnie, pierwsze wyniki w pierwszym miesiącu. Hot Lead Catcher to nasz flagship - wychwytuje moment zakupowy zanim zrobi to konkurencja. Pozostałe 4 działają solo lub w kombinacji. Szósty - Indywidualne Wdrożenia - gdy potrzebujesz czegoś custom.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
          {PRODUCTS.map((p, i) => {
            const meta = MAP[i];
            const isPopular = p.badge === "NAJCZĘŚCIEJ WYBIERANY";
            const SceneComponent = SCENE_MAP[meta.slug];
            const isHovered = hoveredId === meta.slug;
            // If reduced motion is enabled, always show static thumbnail
            const showPlayer = !reducedMotion && isHovered && SceneComponent;

            return (
              <motion.article
                key={p.title}
                variants={cardVariants}
                className={`relative bg-[#FAFAFA] p-8 md:p-10 transition-colors duration-200 group ${i === 0 ? "lg:col-span-2" : ""} ${i === 5 ? "lg:col-span-3" : ""}`}
                style={
                  isPopular
                    ? { boxShadow: "inset 0 0 0 1px #B87333" }
                    : undefined
                }
                tabIndex={0}
                onMouseEnter={() => setHoveredId(meta.slug)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(meta.slug)}
                onBlur={() => setHoveredId(null)}
              >
                {isPopular && (
                  <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8B4513]">
                    · NAJCZĘŚCIEJ WYBIERANY
                  </span>
                )}

                <div className="mb-8">
                  {showPlayer ? (
                    <Player
                      component={SceneComponent}
                      compositionWidth={400}
                      compositionHeight={240}
                      durationInFrames={300}
                      fps={60}
                      loop
                      autoPlay
                      controls={false}
                      style={{ width: "100%", aspectRatio: "400/240" }}
                    />
                  ) : (
                    <ProductVisual kind={meta.visual} />
                  )}
                </div>

                <h3 className="text-[#0A0A0A]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#525252]">
                  {meta.short}
                </p>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-mono text-[28px] font-medium tracking-tight text-[#0A0A0A]">
                    {meta.metric}
                  </span>
                  <span className="text-[13px] text-[#525252]">{meta.metricLabel}</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={p.landingHref}
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0A0A0A] transition-colors duration-200 hover:text-[#8B4513]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Zobacz system
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function ProductVisual({ kind }: { kind: Visual }) {
  if (kind === "pipeline") {
    return (
      <div className="border border-[#E5E5E5] bg-white p-4 font-mono text-[11px] leading-[1.7]">
        <div className="text-[#737373]">icp.yaml</div>
        <div className="text-[#0A0A0A]">target: &quot;B2B SaaS PL&quot;</div>
        <div className="text-[#0A0A0A]">size: 50-500</div>
        <div className="mt-2 border-t border-[#E5E5E5] pt-2 text-[#525252]">
          <span className="text-[#B87333]">→</span> 147 leads matched
        </div>
        <div className="text-[#525252]">
          <span className="text-[#B87333]">→</span> 12 emails sent · 3 replies
        </div>
        <div className="text-[#047857]">
          <span className="text-[#B87333]">→</span> 1 meeting booked
        </div>
      </div>
    );
  }
  if (kind === "seo") {
    return (
      <div className="border border-[#E5E5E5] bg-white p-4">
        <SeoChart />
      </div>
    );
  }
  if (kind === "intent") {
    return (
      <div className="border border-[#E5E5E5] bg-white p-4 font-mono text-[11px] leading-[1.7]">
        <div className="text-[#737373]">intent-signals.log</div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[#0A0A0A]">news · &quot;hire DPO&quot;</span>
          <span className="text-[#047857]">score 87</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#0A0A0A]">reviews · Competitor X down</span>
          <span className="text-[#047857]">score 79</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#0A0A0A]">social · founder post</span>
          <span className="text-[#B87333]">score 64</span>
        </div>
        <div className="mt-2 border-t border-[#E5E5E5] pt-2 text-[#525252]">
          <span className="text-[#B87333]">→</span> 3 HOT leads · Telegram alert
        </div>
      </div>
    );
  }
  if (kind === "chatbot") {
    return (
      <div className="border border-[#E5E5E5] bg-white p-4 text-[12px] leading-[1.55]">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          <span className="font-mono text-[10px] text-[#737373]">online · 23:47</span>
        </div>
        <div className="inline-block bg-[#F5EDE6] px-3 py-1.5 text-[#0A0A0A]">
          Ile kosztuje generator ofert?
        </div>
        <div className="mt-2 text-right">
          <span className="inline-block bg-[#0A0A0A] px-3 py-1.5 text-white">
            Setup 5 000 PLN, potem od 900 PLN/mies. Umówić demo?
          </span>
        </div>
      </div>
    );
  }
  if (kind === "custom") {
    return (
      <div className="border border-[#E5E5E5] bg-white p-4 font-mono text-[11px] leading-[1.7]">
        <div className="text-[#737373]">discovery.yml</div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[#0A0A0A]">workflow: non-standard</span>
          <span className="text-[#B87333]">scope</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#0A0A0A]">integrations: ERP + CRM + DB</span>
          <span className="text-[#B87333]">mapped</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#0A0A0A]">budget: &gt; 15 000 PLN</span>
          <span className="text-[#047857]">qualified</span>
        </div>
        <div className="mt-2 border-t border-[#E5E5E5] pt-2 text-[#525252]">
          <span className="text-[#B87333]">&rarr;</span> fixed scope + fixed price
        </div>
      </div>
    );
  }
  return (
    <div className="border border-[#E5E5E5] bg-white p-4 font-mono text-[11px] leading-[1.7]">
      <div className="text-[#737373]">oferta-2026-04-17.pdf</div>
      <div className="mt-1 flex items-center gap-2">
        <span className="block h-1 w-24 bg-[#E5E5E5]" />
        <span className="text-[#525252]">generated</span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="block h-1 w-32 bg-[#E5E5E5]" />
        <span className="text-[#525252]">branded</span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="block h-1 w-40 bg-[#B87333]" />
        <span className="text-[#047857]">emailed \u2713</span>
      </div>
    </div>
  );
}

function SeoChart() {
  const pts = [8, 12, 16, 20, 28, 38, 52, 68, 86, 104, 118, 132];
  const w = 260;
  const h = 56;
  const max = Math.max(...pts);
  const step = w / (pts.length - 1);
  const path = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (v / max) * h}`)
    .join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="block">
      <path d={path} fill="none" stroke="#B87333" strokeWidth="1.5" />
      {pts.map((v, i) => (
        <circle
          key={i}
          cx={i * step}
          cy={h - (v / max) * h}
          r="1.5"
          fill="#B87333"
        />
      ))}
    </svg>
  );
}
