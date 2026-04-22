"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSpring, useTransform, motion, useInView, useReducedMotion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

// ---- CONFIG DATA (source of truth: context/cennik.md + research 2026-04-20) ----

interface ScenarioConfig {
  id: string;
  label: string;
  shortName: string;
  agentSetup: number;
  agentMonthly: number;
  alternativeRole: string;
  alternativeCost: number;
  alternativeSource: string;
  slider1: {
    key: string;
    label: string;
    displayUnit: string;
    min: number;
    max: number;
    step: number;
    default: number;
  };
  slider2: {
    key: string;
    label: string;
    displayUnit: string;
    min: number;
    max: number;
    step: number;
    default: number;
  };
  calcPotentialRevenue?: (s1: number, s2: number) => number;
  potentialRevenueLabel?: string;
}

const SCENARIOS: ScenarioConfig[] = [
  {
    id: "hlc",
    label: "Hot Lead Catcher",
    shortName: "Intent intelligence",
    agentSetup: 3000,
    agentMonthly: 1300,
    alternativeRole: "Lead Researcher",
    alternativeCost: 10000,
    alternativeSource: "SalaryExpert + Sedlak 2025 (partial data gap)",
    slider1: {
      key: "signals",
      label: "Intent signals/mies.",
      displayUnit: "sygn.",
      min: 10,
      max: 200,
      step: 5,
      default: 50,
    },
    slider2: {
      key: "convToMeeting",
      label: "Konwersja signal - spotkanie",
      displayUnit: "%",
      min: 5,
      max: 40,
      step: 1,
      default: 15,
    },
    calcPotentialRevenue: (signals, conv) =>
      signals * (conv / 100) * 30000 * 0.3,
    potentialRevenueLabel:
      "Potencjał przychodów/mies. (ACV 30k, close 30%)",
  },
  {
    id: "pipeline",
    label: "Pipeline Machine",
    shortName: "Cold email B2B",
    agentSetup: 5000,
    agentMonthly: 1800,
    alternativeRole: "Handlowiec B2B",
    alternativeCost: 11000,
    alternativeSource: "Sedlak & Sedlak + ManpowerGroup 2025",
    slider1: {
      key: "leads",
      label: "Leadów/mies.",
      displayUnit: "leadów",
      min: 10,
      max: 500,
      step: 10,
      default: 100,
    },
    slider2: {
      key: "convRate",
      label: "Konwersja lead - klient",
      displayUnit: "%",
      min: 1,
      max: 20,
      step: 1,
      default: 5,
    },
    calcPotentialRevenue: (leads, conv) => leads * (conv / 100) * 30000,
    potentialRevenueLabel: "Potencjał przychodów/mies. (przy ACV 30 000)",
  },
  {
    id: "seo",
    label: "Content Machine",
    shortName: "Content B2B",
    agentSetup: 5000,
    agentMonthly: 1800,
    alternativeRole: "Copywriter B2B",
    alternativeCost: 9500,
    alternativeSource: "Sedlak & Sedlak + Hays + SAR 2025",
    slider1: {
      key: "articles",
      label: "Artykułów/mies.",
      displayUnit: "art.",
      min: 2,
      max: 30,
      step: 1,
      default: 8,
    },
    slider2: {
      key: "costPerArticle",
      label: "Stawka rynkowa za artykuł",
      displayUnit: "PLN",
      min: 200,
      max: 2500,
      step: 50,
      default: 800,
    },
    calcPotentialRevenue: (articles, costPerArt) => articles * costPerArt,
    potentialRevenueLabel: "Koszt freelance przy tym wolumenie",
  },
  {
    id: "support",
    label: "Obsługa Klienta",
    shortName: "Chatbot B2B",
    agentSetup: 10000,
    agentMonthly: 1500,
    alternativeRole: "BOK / Customer Support",
    alternativeCost: 9500,
    alternativeSource: "Sedlak & Sedlak + OLX Zawodowo 2025",
    slider1: {
      key: "conversations",
      label: "Rozmów/mies.",
      displayUnit: "rozmów",
      min: 100,
      max: 5000,
      step: 100,
      default: 800,
    },
    slider2: {
      key: "avgMinutes",
      label: "Średni czas rozmowy",
      displayUnit: "min",
      min: 2,
      max: 30,
      step: 1,
      default: 8,
    },
  },
  {
    id: "ofert",
    label: "Generator Ofert",
    shortName: "Kalkulator wycen",
    agentSetup: 9000,
    agentMonthly: 1500,
    alternativeRole: "Ofertowiec / Sales Ops",
    alternativeCost: 11000,
    alternativeSource: "Sedlak & Sedlak + ManpowerGroup 2025",
    slider1: {
      key: "offers",
      label: "Ofert/mies.",
      displayUnit: "ofert",
      min: 10,
      max: 300,
      step: 5,
      default: 50,
    },
    slider2: {
      key: "hoursPerOffer",
      label: "Godzin na ofertę (manualnie)",
      displayUnit: "h",
      min: 0.5,
      max: 8,
      step: 0.5,
      default: 2,
    },
    calcPotentialRevenue: (offers, hours) => offers * hours * 69,
    potentialRevenueLabel: "Oszczędność czasu = PLN/mies.",
  },
];

// ---- Formatters ----

function formatPLN(value: number): string {
  return new Intl.NumberFormat("pl-PL").format(Math.round(value));
}

function formatSliderValue(val: number, displayUnit: string): string {
  if (displayUnit === "PLN") return `${formatPLN(val)} PLN`;
  if (displayUnit === "%") return `${val}%`;
  return `${val} ${displayUnit}`;
}

// ---- SliderRow ----

interface SliderRowProps {
  label: string;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}

function SliderRow({
  label,
  displayValue,
  min,
  max,
  step,
  value,
  onChange,
}: SliderRowProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
          {label}
        </span>
        <span className="font-mono text-[14px] font-medium text-[#0A0A0A]">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className={[
          "mt-3 w-full cursor-pointer appearance-none bg-transparent",
          "focus-visible:outline-none",
          "[&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#E5E5E5]",
          "[&::-webkit-slider-thumb]:mt-[-7px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B87333] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-none",
          "focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-[#B87333] focus-visible:[&::-webkit-slider-thumb]:ring-offset-2",
          "[&::-moz-range-track]:h-[2px] [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[#E5E5E5]",
          "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-[#B87333] [&::-moz-range-thumb]:cursor-pointer",
          "focus-visible:[&::-moz-range-thumb]:ring-2 focus-visible:[&::-moz-range-thumb]:ring-[#B87333]",
        ].join(" ")}
      />
    </div>
  );
}

// ---- OutputRow ----

interface OutputRowProps {
  label: string;
  valueNode: React.ReactNode;
  muted?: boolean;
  success?: boolean;
  big?: boolean;
  mono?: boolean;
  noBorder?: boolean;
}

function OutputRow({
  label,
  valueNode,
  muted,
  success,
  big,
  mono,
  noBorder,
}: OutputRowProps) {
  return (
    <div
      className={[
        "flex items-baseline justify-between py-3",
        !noBorder && "border-b border-[#E5E5E5]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={[
          "text-[13px]",
          muted ? "text-[#737373]" : "text-[#525252]",
        ].join(" ")}
      >
        {label}
      </span>
      <span
        className={[
          mono ? "font-mono" : "",
          big ? "text-[20px] font-semibold" : "text-[14px] font-medium",
          success ? "text-[#047857]" : "text-[#0A0A0A]",
        ].join(" ")}
      >
        {valueNode}
      </span>
    </div>
  );
}

// ---- AnimatedValue (count-up via Framer Motion) ----

interface AnimatedValueProps {
  target: number;
  formatter: (v: number) => string;
}

function AnimatedValue({ target, formatter }: AnimatedValueProps) {
  const springValue = useSpring(target, { stiffness: 80, damping: 18 });
  const display = useTransform(springValue, (latest) => formatter(latest));

  useEffect(() => {
    springValue.set(target);
  }, [target, springValue]);

  return <motion.span>{display}</motion.span>;
}

// ---- Dynamic Bar Chart ----

interface MiniBarChartProps {
  agentMonthly: number;
  alternativeRole: string;
  alternativeCost: number;
}

function MiniBarChart({
  agentMonthly,
  alternativeRole,
  alternativeCost,
}: MiniBarChartProps) {
  const barData = [
    {
      name: "Agent AI",
      koszt: agentMonthly,
      fill: "#0A0A0A",
      label: `${formatPLN(agentMonthly)} PLN`,
    },
    {
      name: alternativeRole,
      koszt: alternativeCost,
      fill: "#B87333",
      label: `${formatPLN(alternativeCost)} PLN`,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={barData}
        barSize={48}
        margin={{ top: 48, right: 16, left: 16, bottom: 0 }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fontFamily: "inherit", fill: "#737373" }}
        />
        <YAxis hide />
        <Bar
          dataKey="koszt"
          radius={[2, 2, 0, 0]}
          animationDuration={900}
          cursor="default"
          isAnimationActive
        >
          {barData.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
          <LabelList
            dataKey="label"
            position="top"
            style={{
              fontSize: 11,
              fontFamily: "inherit",
              fill: "#525252",
              fontWeight: 500,
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ---- ROICalculator (eksportowany komponent) ----

export function ROICalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  const [activeId, setActiveId] = useState<string>("hlc");

  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === activeId)!,
    [activeId]
  );

  const [slider1Value, setSlider1Value] = useState(scenario.slider1.default);
  const [slider2Value, setSlider2Value] = useState(scenario.slider2.default);

  useEffect(() => {
    setSlider1Value(scenario.slider1.default);
    setSlider2Value(scenario.slider2.default);
  }, [activeId, scenario.slider1.default, scenario.slider2.default]);

  const calc = useMemo(() => {
    const monthlySavings = scenario.alternativeCost - scenario.agentMonthly;
    const paybackDays =
      monthlySavings > 0
        ? Math.round((scenario.agentSetup / monthlySavings) * 30)
        : 0;
    const yearlyAgent = scenario.agentSetup + scenario.agentMonthly * 12;
    const yearlyAlternative = scenario.alternativeCost * 12;
    const yearlySavings = yearlyAlternative - yearlyAgent;
    const potentialRevenue = scenario.calcPotentialRevenue
      ? scenario.calcPotentialRevenue(slider1Value, slider2Value)
      : null;
    return {
      monthlySavings,
      paybackDays,
      yearlyAgent,
      yearlyAlternative,
      yearlySavings,
      potentialRevenue,
    };
  }, [scenario, slider1Value, slider2Value]);

  return (
    <motion.section
      ref={sectionRef}
      id="kalkulator"
      className="border-t border-[#E5E5E5] bg-[#FAFAFA] py-[80px] md:py-[120px]"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Naglowek sekcji */}
        <div className="mb-10 max-w-[720px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
            Kalkulator
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] md:text-[48px]">
            Ile zaoszczędzisz na agencie AI?
          </h2>
          <p className="mt-4 text-[17px] text-[#525252]">
            Wybierz produkt z naszej oferty i zobacz oszczędność vs etatowiec.
            Dane z raportów płacowych PL 2025 (Sedlak, ManpowerGroup, Hays).
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Scenariusz kalkulatora"
          className="flex flex-wrap gap-2 md:gap-3 mb-10 border-b border-[#E5E5E5] pb-1"
        >
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`roi-tab-${s.id}`}
              aria-selected={activeId === s.id}
              aria-controls={`roi-panel-${s.id}`}
              tabIndex={activeId === s.id ? 0 : -1}
              onClick={() => setActiveId(s.id)}
              className={[
                "px-4 py-3 text-[13px] font-medium transition-colors rounded-t-[4px]",
                "border-b-2 -mb-[1px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]",
                activeId === s.id
                  ? "border-[#B87333] text-[#0A0A0A]"
                  : "border-transparent text-[#525252] hover:text-[#0A0A0A]",
              ].join(" ")}
            >
              <span className="block">{s.label}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#737373] mt-0.5">
                {s.shortName}
              </span>
            </button>
          ))}
        </div>

        {/* Grid: sliders po lewej, outputs po prawej */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* LEWA: slidery */}
          <div className="space-y-8">
            <SliderRow
              label={scenario.slider1.label}
              displayValue={formatSliderValue(
                slider1Value,
                scenario.slider1.displayUnit
              )}
              min={scenario.slider1.min}
              max={scenario.slider1.max}
              step={scenario.slider1.step}
              value={slider1Value}
              onChange={setSlider1Value}
            />
            <SliderRow
              label={scenario.slider2.label}
              displayValue={formatSliderValue(
                slider2Value,
                scenario.slider2.displayUnit
              )}
              min={scenario.slider2.min}
              max={scenario.slider2.max}
              step={scenario.slider2.step}
              value={slider2Value}
              onChange={setSlider2Value}
            />

            {/* Kontekst pomocniczy */}
            <div className="border border-[#E5E5E5] bg-white p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                Jak czytać wyniki?
              </p>
              <ul className="mt-3 space-y-2 text-[13px] text-[#525252]">
                <li>
                  - Miesięczna oszczędność: różnica TCO etatowca vs koszt
                  agenta
                </li>
                <li>
                  - Roczna oszczędność: po odliczeniu setup fee z cennika
                </li>
                <li>
                  - Payback setupu: ile dni potrzebujesz na zwrot kosztów
                  wdrożenia z samych oszczędności
                </li>
              </ul>
            </div>
          </div>

          {/* PRAWA: outputs */}
          <div
            className="border border-[#E5E5E5] bg-white p-6"
            role="tabpanel"
            id={`roi-panel-${activeId}`}
            aria-labelledby={`roi-tab-${activeId}`}
            aria-live="polite"
            tabIndex={0}
          >
            <OutputRow
              label={`Agent AI (cennik GROWTH)`}
              valueNode={`${formatPLN(scenario.agentSetup)} PLN setup + ${formatPLN(scenario.agentMonthly)} PLN/mies.`}
              muted
            />
            <OutputRow
              label={`${scenario.alternativeRole} (TCO PL 2025)*`}
              valueNode={`${formatPLN(scenario.alternativeCost)} PLN/mies.`}
              muted
            />

            {/* Separator */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E5E5]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#737373]">
                  Twój scenariusz
                </span>
              </div>
            </div>

            <OutputRow
              label="Miesięczna oszczędność"
              valueNode={
                <AnimatedValue
                  target={calc.monthlySavings}
                  formatter={(v) => `${formatPLN(v)} PLN`}
                />
              }
              success
              big
            />
            <OutputRow
              label="Roczna oszczędność"
              valueNode={
                <AnimatedValue
                  target={calc.yearlySavings}
                  formatter={(v) => `${formatPLN(v)} PLN`}
                />
              }
              success
            />
            <OutputRow
              label="Payback setupu"
              valueNode={
                <AnimatedValue
                  target={calc.paybackDays}
                  formatter={(v) => `${Math.round(v)} dni`}
                />
              }
              mono
            />
            {calc.potentialRevenue !== null &&
              scenario.potentialRevenueLabel && (
                <OutputRow
                  label={scenario.potentialRevenueLabel}
                  valueNode={
                    <AnimatedValue
                      target={calc.potentialRevenue}
                      formatter={(v) => `${formatPLN(v)} PLN`}
                    />
                  }
                  mono
                  noBorder
                />
              )}

            {/* Mini bar chart */}
            <div className="mt-6 border-t border-[#E5E5E5] pt-4">
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                Koszt miesięczny: porównanie
              </p>
              <MiniBarChart
                agentMonthly={scenario.agentMonthly}
                alternativeRole={scenario.alternativeRole}
                alternativeCost={scenario.alternativeCost}
              />
            </div>

            {/* Przypis */}
            <p className="mt-3 font-mono text-[10px] leading-[1.6] text-[#737373]">
              * Kalkulacja zakłada tier GROWTH z cennika LessManual (
              {formatPLN(scenario.agentSetup)} PLN setup +{" "}
              {formatPLN(scenario.agentMonthly)} PLN/mies.). Koszt{" "}
              {scenario.alternativeRole.toLowerCase()} (TCO = pensja brutto +
              ZUS 19.48% + benefity + narzędzia) wg:{" "}
              {scenario.alternativeSource}. Liczby orientacyjne, konkretną
              wycenę dla Twojego przypadku ustalimy na rozmowie.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
