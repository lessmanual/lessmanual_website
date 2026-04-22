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
  color: string;
  chaosX: number;
  chaosY: number;
  chaosRotate: number;
  chaosScale: number;
  orderX: number;
  orderY: number;
  delay: number;
  isOutput?: boolean;
};

const ACCENT = "#B87333";
const BG = "#FAFAFA";
const CARD_BG = "#FFFFFF";
const BORDER = "#E5E5E5";
const TEXT = "#0A0A0A";
const TEXT_MUTED = "#737373";
const TEXT_SEC = "#525252";

// 5 pipeline stages + 1 central AGENT + 3 outputs
const elements: FlowElement[] = [
  // Pipeline stages (sources)
  { id: 0, label: "KEYWORD\nRESEARCH", color: "#525252", chaosX: -170, chaosY: -190, chaosRotate: -20, chaosScale: 0.68, orderX: -175, orderY: -100, delay: 0 },
  { id: 1, label: "CLUSTERS",          color: "#525252", chaosX: 150,  chaosY: -160, chaosRotate: 16,  chaosScale: 0.8,  orderX: -75,  orderY: -100, delay: 2 },
  { id: 2, label: "BRIEF",             color: "#525252", chaosX: -80,  chaosY: 190,  chaosRotate: -32, chaosScale: 0.65, orderX: 25,   orderY: -100, delay: 4 },
  { id: 3, label: "ARTICLE",           color: "#525252", chaosX: 180,  chaosY: 80,   chaosRotate: 26,  chaosScale: 0.75, orderX: 125,  orderY: -100, delay: 1 },
  { id: 4, label: "SCHEMA",            color: "#525252", chaosX: -140, chaosY: -50,  chaosRotate: 38,  chaosScale: 0.7,  orderX: 225,  orderY: -100, delay: 3 },
  // Central agent
  { id: 5, label: "AGENT",             color: ACCENT,    chaosX: 10,   chaosY: -30,  chaosRotate: 0,   chaosScale: 0.5,  orderX: 25,   orderY: 30,   delay: 4 },
  // Outputs
  { id: 6, label: "30\nARTICLES",      color: "#525252", chaosX: -150, chaosY: 60,   chaosRotate: 22,  chaosScale: 0.7,  orderX: -115, orderY: 155,  delay: 6, isOutput: true },
  { id: 7, label: "CMS\nPUBLISHED",    color: "#525252", chaosX: 90,   chaosY: -130, chaosRotate: -18, chaosScale: 0.6,  orderX: 25,   orderY: 155,  delay: 6, isOutput: true },
  { id: 8, label: "RANKING\n+237%",    color: "#525252", chaosX: 140,  chaosY: 180,  chaosRotate: -24, chaosScale: 0.7,  orderX: 165,  orderY: 155,  delay: 6, isOutput: true },
];

const connectionsIn: [number, number][] = [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5]];
const connectionsOut: [number, number][] = [[5, 6], [5, 7], [5, 8]];

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

  const lines = element.label.split("\n");

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(${x + floatX}px, ${y + floatY}px) translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        width: isCenter ? 118 : 95,
        padding: isCenter ? "14px 10px" : "9px 7px",
        background: isCenter && progress > 0.8 ? ACCENT : CARD_BG,
        border: `1.5px solid ${isCenter && progress > 0.8 ? ACCENT : BORDER}`,
        borderRadius: 6,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 4,
        boxShadow:
          progress > 0.7
            ? isCenter
              ? `0 4px 24px rgba(184, 115, 51, 0.25)`
              : `0 2px 8px rgba(0,0,0,0.04)`
            : `0 2px 12px rgba(0,0,0,0.06)`,
      }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          style={{
            fontSize: isCenter ? 11 : 9,
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: isCenter && progress > 0.8 ? "#fff" : TEXT,
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            textAlign: "center" as const,
            lineHeight: 1.2,
          }}
        >
          {line}
        </span>
      ))}
      {isCenter && (
        <span
          style={{
            fontSize: 8,
            color: progress > 0.8 ? "rgba(255,255,255,0.85)" : TEXT_MUTED,
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            opacity: interpolate(progress, [0.7, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            textAlign: "center" as const,
            lineHeight: 1.3,
          }}
        >
          WRITER{"\n"}BRAND VOICE
        </span>
      )}
      {!isCenter && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: element.isOutput ? "#10B981" : ACCENT,
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

export const ContentMachineFlow: React.FC = () => {
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

      {/* Connection lines: pipeline stages to AGENT */}
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
        {connectionsIn.map(([from, to], i) => {
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
              key={`in-${from}-${to}`}
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
        {connectionsOut.map(([from, to], i) => {
          const fromEl = elements[from];
          const toEl = elements[to];
          const lineProgress = interpolate(
            frame,
            [3.5 * fps + i * 2, 4 * fps + i * 2],
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
              key={`out-${from}-${to}`}
              x1={fromEl.orderX + 200}
              y1={fromEl.orderY + 200}
              x2={interpolate(lineProgress, [0, 1], [fromEl.orderX + 200, toEl.orderX + 200])}
              y2={interpolate(lineProgress, [0, 1], [fromEl.orderY + 200, toEl.orderY + 200])}
              stroke="#10B981"
              strokeWidth={1.2}
              strokeOpacity={0.4 * lineProgress * lineOpacity}
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
            isCenter={el.id === 5}
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
          whiteSpace: "nowrap" as const,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
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
        kopiuj-wklej ChatGPT · generic · slop
      </div>

      {/* Phase label: agent */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap" as const,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
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
        agent · research · brand voice · ranking
      </div>
    </AbsoluteFill>
  );
};
