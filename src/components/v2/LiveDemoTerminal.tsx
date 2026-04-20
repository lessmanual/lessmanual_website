"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
// useState still used inside the typewriter hook; imports above are intentional.

export type Line =
  | { kind: "prompt"; text: string; delay?: number }
  | { kind: "out"; text: string; delay?: number; tone?: "default" | "muted" | "success" | "accent" }
  | { kind: "blank"; delay?: number };

const HLC_SCRIPT: Line[] = [
  { kind: "prompt", text: "lessmanual agent init --product=hot-lead-catcher" },
  { kind: "out", text: "Agent \"HLC-Demo\" created · Monitoring 4 sources", tone: "muted", delay: 360 },
  { kind: "out", text: "Sources: news · job boards · reviews · social mentions", tone: "muted", delay: 240 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual agent scan --interval=2x/week" },
  { kind: "out", text: "Scanning 4 sources for ICP signals...", tone: "muted", delay: 380 },
  { kind: "out", text: "147 potential leads scanned", tone: "muted", delay: 220 },
  { kind: "out", text: "✓ 12 HOT signals matched (score >75)", tone: "success", delay: 500 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual agent enrich --hot-only" },
  { kind: "out", text: "Enriching 12 HOT leads · company + decision maker + email", tone: "muted", delay: 420 },
  { kind: "out", text: "✓ Telegram alert sent · Drafts ready in Instantly", tone: "success", delay: 360 },
  { kind: "blank" },
  { kind: "out", text: "[ 2h 14m later ]", tone: "muted", delay: 280 },
  { kind: "out", text: "Hot signals  12   (avg score 84/100)", tone: "accent", delay: 180 },
  { kind: "out", text: "Drafts sent  9    (3 wymagały Twojej edycji)", tone: "accent", delay: 180 },
  { kind: "out", text: "→ Meeting booked: Tue 10:00 · Marketing Director at RetailCorp", tone: "success", delay: 260 },
];

const DEFAULT_CHROME_LABEL = "lessmanual-cli · hot-lead-catcher";

function useTypewriter(script: Line[], enabled: boolean) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;

    if (lineIdx >= script.length) {
      // loop after pause
      timerRef.current = setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
      }, 4200);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    const current = script[lineIdx];

    if (current.kind === "blank") {
      timerRef.current = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, current.delay ?? 200);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    const fullText = current.text;

    if (charIdx < fullText.length) {
      // vary typing speed: prompts ~22ms, output ~8ms
      const base = current.kind === "prompt" ? 22 : 9;
      const jitter = Math.random() * 18;
      timerRef.current = setTimeout(() => setCharIdx((c) => c + 1), base + jitter);
    } else {
      const pause = current.delay ?? (current.kind === "prompt" ? 260 : 180);
      timerRef.current = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, pause);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, lineIdx, charIdx, script]);

  // Reset pointers when the script identity changes (swap between products).
  useEffect(() => {
    setLineIdx(0);
    setCharIdx(0);
  }, [script]);

  return { lineIdx, charIdx };
}

function subscribeReducedMotion(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LiveDemoTerminal({
  script = HLC_SCRIPT,
  chromeLabel = DEFAULT_CHROME_LABEL,
}: {
  script?: Line[];
  chromeLabel?: string;
} = {}) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const motion = !reduced;

  const { lineIdx, charIdx } = useTypewriter(script, motion);

  const rendered = useMemo(() => {
    const output: Array<{ key: string; node: React.ReactNode }> = [];
    for (let i = 0; i < script.length; i++) {
      const line = script[i];

      if (i > lineIdx) break;

      if (line.kind === "blank") {
        output.push({
          key: `blank-${i}`,
          node: <div className="h-[0.5em]" aria-hidden="true" />,
        });
        continue;
      }

      const isActive = i === lineIdx;
      const shown = isActive ? line.text.slice(0, charIdx) : line.text;

      if (line.kind === "prompt") {
        output.push({
          key: `prompt-${i}`,
          node: (
            <div className="flex items-start gap-2">
              <span className="text-[#B87333] select-none">$</span>
              <span className="text-[#0A0A0A]">
                {shown}
                {isActive && motion && <span className="v2-cursor" />}
              </span>
            </div>
          ),
        });
      } else {
        const toneClass =
          line.tone === "success"
            ? "text-[#10B981]"
            : line.tone === "accent"
              ? "text-[#B87333]"
              : line.tone === "muted"
                ? "text-[#525252]"
                : "text-[#0A0A0A]";
        output.push({
          key: `out-${i}`,
          node: (
            <div className={`${toneClass} pl-4`}>
              {shown}
              {isActive && motion && <span className="v2-cursor" />}
            </div>
          ),
        });
      }
    }
    return output;
  }, [lineIdx, charIdx, motion, script]);

  if (!motion) {
    // reduced-motion: show full final state, no animation
    return <StaticTerminal script={script} chromeLabel={chromeLabel} />;
  }

  return (
    <div className="relative">
      <div
        className="border border-[#E5E5E5] bg-white"
        style={{ borderRadius: 6, boxShadow: "0 1px 0 0 rgba(10,10,10,0.02)" }}
      >
        {/* Chrome */}
        <div className="flex items-center justify-between border-b border-[#E5E5E5] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="block h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            <span className="block h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            <span className="block h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
          </div>
          <span className="font-mono text-[11px] tracking-tight text-[#A3A3A3]">
            {chromeLabel}
          </span>
          <span className="font-mono text-[11px] text-[#10B981]">● live</span>
        </div>
        {/* Body */}
        <div
          className="font-mono text-[13px] leading-[1.7] px-5 py-5"
          style={{ minHeight: 380 }}
        >
          {rendered.map((r) => (
            <div key={r.key}>{r.node}</div>
          ))}
        </div>
      </div>
      {/* Subtle shadow well */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 -bottom-3 h-6 bg-[#0A0A0A]/5 blur-xl"
      />
    </div>
  );
}

function StaticTerminal({ script, chromeLabel }: { script: Line[]; chromeLabel: string }) {
  return (
    <div className="border border-[#E5E5E5] bg-white" style={{ borderRadius: 6 }}>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
        </div>
        <span className="font-mono text-[11px] text-[#A3A3A3]">{chromeLabel}</span>
        <span className="font-mono text-[11px] text-[#10B981]">● live</span>
      </div>
      <div className="font-mono text-[13px] leading-[1.7] px-5 py-5" style={{ minHeight: 380 }}>
        {script.map((line, i) => {
          if (line.kind === "blank") return <div key={i} className="h-[0.5em]" />;
          if (line.kind === "prompt") {
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#B87333]">$</span>
                <span className="text-[#0A0A0A]">{line.text}</span>
              </div>
            );
          }
          const tone =
            line.tone === "success"
              ? "text-[#10B981]"
              : line.tone === "accent"
                ? "text-[#B87333]"
                : "text-[#525252]";
          return (
            <div key={i} className={`${tone} pl-4`}>
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
