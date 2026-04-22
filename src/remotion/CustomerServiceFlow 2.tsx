"use client";

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ── Element data ──
type FlowElement = {
  id: number;
  label: string;
  sublabel?: string;
  color: string;
  chaosX: number;
  chaosY: number;
  chaosRotate: number;
  chaosScale: number;
  orderX: number;
  orderY: number;
  delay: number;
};

const ACCENT = "#B87333";
const BG = "#FAFAFA";
const CARD_BG = "#FFFFFF";
const BORDER = "#E5E5E5";
const TEXT = "#0A0A0A";
const TEXT_SEC = "#525252";
const TEXT_MUTED = "#737373";

// 3 inputs + central AGENT + 3 outputs
const elements: FlowElement[] = [
  // inputs (left cluster)
  { id: 0, label: "WEB",      sublabel: "chatbot",  color: "#525252", chaosX: -170, chaosY: -160, chaosRotate: -22, chaosScale: 0.7,  orderX: -150, orderY: -110, delay: 0 },
  { id: 1, label: "WHATSAPP", sublabel: "kanał",    color: "#525252", chaosX: 130,  chaosY: -180, chaosRotate: 20,  chaosScale: 0.8,  orderX: -150, orderY: 0,    delay: 2 },
  { id: 2, label: "EMAIL",    sublabel: "triage",   color: "#525252", chaosX: -90,  chaosY: 160,  chaosRotate: -30, chaosScale: 0.65, orderX: -150, orderY: 110,  delay: 4 },
  // central AGENT
  { id: 3, label: "AGENT",    sublabel: "RAG + ROUTER", color: ACCENT, chaosX: 20, chaosY: -40,  chaosRotate: 0,   chaosScale: 0.5,  orderX: 0,    orderY: 0,    delay: 3 },
  // outputs (right cluster)
  { id: 4, label: "AUTO-RESOLVED", sublabel: "75%",     color: "#525252", chaosX: 160,  chaosY: 130,  chaosRotate: 28,  chaosScale: 0.7,  orderX: 150, orderY: -110, delay: 1 },
  { id: 5, label: "CSAT",          sublabel: "4.7 / 5", color: "#525252", chaosX: -140, chaosY: -60,  chaosRotate: -18, chaosScale: 0.75, orderX: 150, orderY: 0,    delay: 3 },
  { id: 6, label: "24/7 UPTIME",   sublabel: "non-stop", color: "#525252", chaosX: 90,  chaosY: -130, chaosRotate: 15,  chaosScale: 0.6,  orderX: 150, orderY: 110,  delay: 5 },
];

// connections: inputs → AGENT, AGENT → outputs
const connections: [number, number][] = [
  [0, 3], [1, 3], [2, 3],
  [3, 4], [3, 5], [3, 6],
];

function Card({
  element,
  progress,
  isCenter,
}: {
  element: FlowElement;
  progress: number;
  isCenter: boolean;
}) {
  const x = interpolate(progress, [0, 1], [element.chaosX, element.orderX]);
  const y = interpolate(progress, [0, 1], [element.chaosY, element.orderY]);
  const rotate = interpolate(progress, [0, 1], [element.chaosRotate, 0]);
  const scale = interpolate(progress, [0, 1], [element.chaosScale, 1]);

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
        width: isCenter ? 130 : 110,
        padding: isCenter ? "16px 12px" : "10px 8px",
        background: isCenter && progress > 0.8 ? ACCENT : CARD_BG,
        border: `1.5px solid ${isCenter && progress > 0.8 ? ACCENT : BORDER}`,
        borderRadius: 6,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 5,
        boxShadow:
          progress > 0.7
            ? isCenter
              ? "0 4px 24px rgba(184,115,51,0.25)"
              : "0 2px 8px rgba(0,0,0,0.04)"
            : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <span
        style={{
          fontSize: isCenter ? 11 : 10,
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: isCenter && progress > 0.8 ? "#fff" : TEXT,
          fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
          textAlign: "center" as const,
          lineHeight: 1.2,
        }}
      >
        {element.label}
      </span>
      {element.sublabel && (
        <span
          style={{
            fontSize: 9,
            color: isCenter && progress > 0.8 ? "rgba(255,255,255,0.8)" : TEXT_MUTED,
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            textAlign: "center" as const,
            opacity: interpolate(progress, [0.6, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {element.sublabel}
        </span>
      )}
      {!isCenter && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: ACCENT,
            opacity: interpolate(progress, [0.6, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      )}
    </div>
  );
}

export const CustomerServiceFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
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

      {/* Connection lines */}
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
              strokeWidth={1.2}
              strokeOpacity={0.35 * lineProgress * lineOpacity}
              strokeDasharray="3 3"
            />
          );
        })}
      </svg>

      {/* Cards */}
      {elements.map((el) => {
        const organizeStart = 1 * fps + el.delay * 3;
        const organizeProgress = spring({
          frame: frame - organizeStart,
          fps,
          config: { damping: 15, stiffness: 80, mass: 1.2 },
        });

        const scatterStart = 5.5 * fps;
        const scatterProgress = spring({
          frame: frame - scatterStart,
          fps,
          config: { damping: 200 },
        });

        const progress = Math.max(0, Math.min(1, organizeProgress - scatterProgress));

        return (
          <Card
            key={el.id}
            element={el}
            progress={progress}
            isCenter={el.id === 3}
          />
        );
      })}

      {/* Phase label: chaos */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: TEXT_SEC,
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [0, 0.5 * fps, 1 * fps, 2 * fps],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        }}
      >
        godziny odpowiedzi · kolejki · CSAT 3.2
      </div>

      {/* Phase label: organized */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: ACCENT,
          fontWeight: 500,
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [3 * fps, 3.5 * fps, 5 * fps, 5.5 * fps],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        }}
      >
        agent · 24/7 · CSAT 4.7
      </div>
    </AbsoluteFill>
  );
};
