"use client";

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

/**
 * ChatSupport — Obsługa Klienta hero animation
 * Rozrzucone kanały obsługi (chaos)
 * → organizują się w uporządkowany system supportu
 */

const ACCENT = "#B87333";
const ACCENT_20 = "rgba(184, 115, 51, 0.2)";
const BG = "#F0EDEE";
const TEXT_SEC = "#4B5563";
const WHITE = "#FBF9F7";

type SupportNode = {
  id: number;
  label: string;
  chaosX: number;
  chaosY: number;
  chaosRotate: number;
  orderX: number;
  orderY: number;
  delay: number;
  width: number;
  height: number;
};

const nodes: SupportNode[] = [
  // Top row — 3 channel cards
  { id: 0, label: "Chat\nna stronie",     chaosX: -160, chaosY: -140, chaosRotate: -25, orderX: -150, orderY: -120, delay: 0, width: 100, height: 70 },
  { id: 1, label: "WhatsApp\nBot",        chaosX: 150,  chaosY: -60,  chaosRotate: 18,  orderX: -20,  orderY: -120, delay: 1, width: 100, height: 70 },
  { id: 2, label: "Email\nTriage",        chaosX: -80,  chaosY: 160,  chaosRotate: -12, orderX: 110,  orderY: -120, delay: 2, width: 100, height: 70 },
  // Middle row — processing nodes
  { id: 3, label: "Baza\nwiedzy",         chaosX: 140,  chaosY: 120,  chaosRotate: 30,  orderX: -150, orderY: 10,   delay: 3, width: 100, height: 70 },
  { id: 4, label: "Eskalacja\ndo ludzi",  chaosX: -140, chaosY: 50,   chaosRotate: -20, orderX: -20,  orderY: 10,   delay: 3, width: 110, height: 70 },
  { id: 5, label: "Voice\nAgent",         chaosX: 60,   chaosY: -150, chaosRotate: 15,  orderX: 110,  orderY: 10,   delay: 4, width: 100, height: 70 },
  // Bottom — result
  { id: 6, label: "<30s\nodpowiedź",      chaosX: -50,  chaosY: -30,  chaosRotate: -8,  orderX: -20,  orderY: 130,  delay: 5, width: 130, height: 55 },
];

// Flow connections
const edges: [number, number][] = [
  [0, 1], [1, 2],
  [0, 3], [1, 4], [2, 5],
  [3, 6], [4, 6], [5, 6],
];

function DocIcon({ width, height, color }: { width: number; height: number; color: string }) {
  const w = width * 0.35;
  const h = height * 0.4;
  return (
    <g>
      <rect x={-w} y={-h} width={w * 2} height={h * 2} rx={3} fill="none" stroke={color} strokeWidth={1.5} />
      {/* Text lines */}
      <line x1={-w + 5} y1={-h + 8} x2={w - 5} y2={-h + 8} stroke={color} strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
      <line x1={-w + 5} y1={-h + 14} x2={w - 10} y2={-h + 14} stroke={color} strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
      <line x1={-w + 5} y1={-h + 20} x2={w - 15} y2={-h + 20} stroke={color} strokeWidth={1.2} opacity={0.3} strokeLinecap="round" />
    </g>
  );
}

export const ChatSupport: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const CX = 270;
  const CY = 240;

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 540 480">
        {/* Edges */}
        {edges.map(([fromId, toId], i) => {
          const from = nodes[fromId];
          const to = nodes[toId];
          const avgDelay = (from.delay + to.delay) / 2;

          const organizeStart = 1 * fps + avgDelay * 3;
          const organizeProgress = spring({
            frame: frame - organizeStart,
            fps,
            config: { damping: 18, stiffness: 60, mass: 1.5 },
          });
          const scatterStart = 5.5 * fps;
          const scatterProgress = spring({
            frame: frame - scatterStart,
            fps,
            config: { damping: 200 },
          });
          const progress = Math.max(0, Math.min(1, organizeProgress - scatterProgress));

          const x1 = interpolate(progress, [0, 1], [from.chaosX + CX, from.orderX + CX]);
          const y1 = interpolate(progress, [0, 1], [from.chaosY + CY, from.orderY + CY]);
          const x2 = interpolate(progress, [0, 1], [to.chaosX + CX, to.orderX + CX]);
          const y2 = interpolate(progress, [0, 1], [to.chaosY + CY, to.orderY + CY]);

          const opacity = interpolate(progress, [0, 0.4], [0.1, 0.4], {
            extrapolateRight: "clamp",
          });

          const floatOffset = Math.sin((frame + i * 18) / (fps * 0.6)) * 5 * (1 - progress);

          return (
            <line
              key={`${fromId}-${toId}`}
              x1={x1}
              y1={y1 + floatOffset}
              x2={x2}
              y2={y2 + floatOffset}
              stroke={ACCENT}
              strokeWidth={1.5}
              strokeOpacity={opacity}
              strokeDasharray={progress < 0.8 ? "4 4" : "none"}
            />
          );
        })}

        {/* Support nodes */}
        {nodes.map((node) => {
          const organizeStart = 1 * fps + node.delay * 3;
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

          const x = interpolate(progress, [0, 1], [node.chaosX + CX, node.orderX + CX]);
          const y = interpolate(progress, [0, 1], [node.chaosY + CY, node.orderY + CY]);
          const rotate = interpolate(progress, [0, 1], [node.chaosRotate, 0]);
          const floatY = Math.sin((frame + node.id * 22) / (fps * 0.7)) * 5 * (1 - progress);
          const nodeScale = interpolate(progress, [0, 1], [0.7, 1]);

          const isResult = node.id === 6;
          const fillColor = isResult ? ACCENT : WHITE;
          const strokeColor = isResult ? ACCENT : ACCENT_20;
          const textColor = isResult ? "white" : TEXT_SEC;

          return (
            <g
              key={node.id}
              transform={`translate(${x}, ${y + floatY}) rotate(${rotate}) scale(${nodeScale})`}
            >
              {/* Card glow */}
              {progress > 0.5 && (
                <rect
                  x={-node.width / 2 - 4}
                  y={-node.height / 2 - 4}
                  width={node.width + 8}
                  height={node.height + 8}
                  rx={8}
                  fill={ACCENT}
                  opacity={0.06 * progress}
                />
              )}
              {/* Card */}
              <rect
                x={-node.width / 2}
                y={-node.height / 2}
                width={node.width}
                height={node.height}
                rx={6}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={isResult ? 0 : 1.5}
              />
              {/* Doc icon for non-result cards */}
              {!isResult && progress < 0.5 && (
                <DocIcon width={node.width} height={node.height} color={ACCENT} />
              )}
              {/* Label */}
              {(progress > 0.3 || isResult) && (
                <text
                  textAnchor="middle"
                  fill={textColor}
                  fontSize={isResult ? 14 : 11}
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight={isResult ? 700 : 500}
                  opacity={interpolate(progress, [0.3, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                >
                  {node.label.split("\n").map((line, li) => (
                    <tspan key={li} x={0} dy={li === 0 ? "-0.4em" : "1.3em"}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Phase labels */}
      <div
        style={{
          position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 15, letterSpacing: "0.12em",
          fontWeight: 600,
          textTransform: "uppercase" as const,
          color: TEXT_SEC,
          opacity: interpolate(frame, [0, 0.5 * fps, 1.5 * fps, 2.5 * fps], [0, 1, 1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        RĘCZNA OBSŁUGA
      </div>
      <div
        style={{
          position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 15, letterSpacing: "0.12em",
          fontWeight: 600,
          textTransform: "uppercase" as const,
          color: ACCENT,
          opacity: interpolate(frame, [3.2 * fps, 3.8 * fps, 5 * fps, 5.5 * fps], [0, 1, 1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        AI SUPPORT 24/7
      </div>
    </AbsoluteFill>
  );
};
