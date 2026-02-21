"use client";

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// ── Element data ──
type ChaosElement = {
  id: number;
  icon: string;
  label: string;
  color: string;
  // Chaos position (scattered)
  chaosX: number;
  chaosY: number;
  chaosRotate: number;
  chaosScale: number;
  // Ordered position (grid)
  orderX: number;
  orderY: number;
  // Timing offset (stagger)
  delay: number;
};

const ACCENT = "#B87333";
const ACCENT_LIGHT = "rgba(184, 115, 51, 0.08)";
const BG = "#F0EDEE";
const CARD_BG = "#FBF9F7";
const BORDER = "#E2E0DF";
const TEXT = "#1E293B";
const TEXT_SEC = "#4B5563";

const elements: ChaosElement[] = [
  // Row 1
  { id: 0, icon: "📧", label: "Cold emails",      color: "#ef4444", chaosX: -120, chaosY: -180, chaosRotate: -25, chaosScale: 0.7, orderX: -130, orderY: -135, delay: 0 },
  { id: 1, icon: "📊", label: "Raporty",           color: "#3b82f6", chaosX: 150,  chaosY: -200, chaosRotate: 18,  chaosScale: 0.85, orderX: 0,    orderY: -135, delay: 2 },
  { id: 2, icon: "💬", label: "Zapytania",         color: "#8b5cf6", chaosX: -80,  chaosY: 180,  chaosRotate: -35, chaosScale: 0.6, orderX: 130,  orderY: -135, delay: 4 },
  // Row 2
  { id: 3, icon: "📋", label: "Oferty",            color: "#f59e0b", chaosX: 180,  chaosY: 100,  chaosRotate: 30,  chaosScale: 0.75, orderX: -130, orderY: -5,   delay: 1 },
  { id: 4, icon: "🤖", label: "AI System",         color: ACCENT,    chaosX: 0,    chaosY: -50,  chaosRotate: 0,   chaosScale: 0.5, orderX: 0,    orderY: -5,   delay: 3 },
  { id: 5, icon: "📅", label: "Follow-upy",        color: "#10b981", chaosX: -170, chaosY: 50,   chaosRotate: 22,  chaosScale: 0.8, orderX: 130,  orderY: -5,   delay: 5 },
  // Row 3
  { id: 6, icon: "🔔", label: "Notyfikacje",       color: "#ec4899", chaosX: 100,  chaosY: -120, chaosRotate: -18, chaosScale: 0.65, orderX: -130, orderY: 125,  delay: 2 },
  { id: 7, icon: "📞", label: "Spotkania",         color: "#06b6d4", chaosX: -140, chaosY: -30,  chaosRotate: 40,  chaosScale: 0.7, orderX: 0,    orderY: 125,  delay: 4 },
  { id: 8, icon: "✅", label: "Wyniki",            color: "#22c55e", chaosX: 60,   chaosY: 200,  chaosRotate: -28, chaosScale: 0.6, orderX: 130,  orderY: 125,  delay: 6 },
];

// ── Connection lines between ordered elements ──
const connections: [number, number][] = [
  [0, 1], [1, 2],
  [0, 3], [1, 4], [2, 5],
  [3, 4], [4, 5],
  [3, 6], [4, 7], [5, 8],
  [6, 7], [7, 8],
];

function Card({
  element,
  progress,
  isCenter,
}: {
  element: ChaosElement;
  progress: number;
  isCenter: boolean;
}) {
  const x = interpolate(progress, [0, 1], [element.chaosX, element.orderX]);
  const y = interpolate(progress, [0, 1], [element.chaosY, element.orderY]);
  const rotate = interpolate(progress, [0, 1], [element.chaosRotate, 0]);
  const scale = interpolate(progress, [0, 1], [element.chaosScale, 1]);
  const borderOpacity = interpolate(progress, [0.5, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chaos state: slight random floating
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const floatY = Math.sin((frame + element.id * 20) / (fps * 0.8)) * 4 * (1 - progress);
  const floatX = Math.cos((frame + element.id * 15) / (fps * 0.6)) * 3 * (1 - progress);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(${x + floatX}px, ${y + floatY}px) translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        width: 110,
        padding: "12px 8px",
        background: isCenter && progress > 0.8 ? ACCENT : CARD_BG,
        border: `1px solid ${isCenter && progress > 0.8 ? ACCENT : BORDER}`,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 4,
        boxShadow:
          progress > 0.7
            ? isCenter
              ? `0 4px 20px rgba(184, 115, 51, 0.25)`
              : `0 2px 8px rgba(0,0,0,0.06)`
            : `0 2px 12px rgba(0,0,0,0.08)`,
        transition: "box-shadow 0.3s",
      }}
    >
      <span style={{ fontSize: 22 }}>{element.icon}</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: isCenter && progress > 0.8 ? "#fff" : TEXT_SEC,
          fontFamily: "'Inter', sans-serif",
          textAlign: "center" as const,
          lineHeight: 1.2,
        }}
      >
        {element.label}
      </span>
      {/* Status dot */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: isCenter && progress > 0.8 ? "#fff" : element.color,
          opacity: interpolate(progress, [0.6, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          marginTop: 2,
        }}
      />
    </div>
  );
}

export const ChaosToSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Timeline (in seconds) ──
  // 0-1s: chaos floating
  // 1-3.5s: elements organize (staggered)
  // 3.5-5.5s: hold organized + connections draw
  // 5.5-6.5s: elements scatter back to chaos
  // 6.5-7.5s: chaos floating (loop transition)

  const totalDuration = durationInFrames / fps;

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(184,115,51,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,115,51,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          opacity: interpolate(
            frame,
            [1 * fps, 3 * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        }}
      />

      {/* Connection lines (visible when organized) */}
      <svg
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          overflow: "visible",
        }}
      >
        {connections.map(([from, to], i) => {
          const fromEl = elements[from];
          const toEl = elements[to];

          const lineProgress = interpolate(
            frame,
            [3 * fps + i * 2, 3.5 * fps + i * 2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Fade out during scatter phase
          const lineOpacity = interpolate(
            frame,
            [5.5 * fps, 6 * fps],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <line
              key={`${from}-${to}`}
              x1={fromEl.orderX + 200}
              y1={fromEl.orderY + 200}
              x2={interpolate(lineProgress, [0, 1], [fromEl.orderX + 200, toEl.orderX + 200])}
              y2={interpolate(lineProgress, [0, 1], [fromEl.orderY + 200, toEl.orderY + 200])}
              stroke={ACCENT}
              strokeWidth={1.5}
              strokeOpacity={0.2 * lineProgress * lineOpacity}
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>

      {/* Cards */}
      {elements.map((el) => {
        // Organize phase (staggered)
        const organizeStart = 1 * fps + el.delay * 3;
        const organizeEnd = organizeStart + 1.5 * fps;

        const organizeProgress = spring({
          frame: frame - organizeStart,
          fps,
          config: { damping: 15, stiffness: 80, mass: 1.2 },
        });

        // Scatter phase (reverse)
        const scatterStart = 5.5 * fps;
        const scatterProgress = spring({
          frame: frame - scatterStart,
          fps,
          config: { damping: 200 },
        });

        // Combined: organize then scatter
        const progress = Math.max(0, Math.min(1, organizeProgress - scatterProgress));

        return (
          <Card
            key={el.id}
            element={el}
            progress={progress}
            isCenter={el.id === 4}
          />
        );
      })}

      {/* Phase labels */}
      {/* "Chaos" label */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: TEXT_SEC,
          opacity: interpolate(
            frame,
            [0, 0.5 * fps, 1 * fps, 2 * fps],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        }}
      >
        ręcznie · wolno · chaotycznie
      </div>

      {/* "System" label */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: ACCENT,
          fontWeight: 500,
          opacity: interpolate(
            frame,
            [3 * fps, 3.5 * fps, 5 * fps, 5.5 * fps],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        }}
      >
        automatycznie · szybko · systematycznie
      </div>
    </AbsoluteFill>
  );
};
