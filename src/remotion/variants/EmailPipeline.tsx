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
 * EmailPipeline — AI SDR hero animation
 * Rozrzucone koperty/kontakty (chaos)
 * → organizują się w pipeline: SEND → OPEN → REPLY → MEETING
 */

const ACCENT = "#B87333";
const ACCENT_20 = "rgba(184, 115, 51, 0.2)";
const BG = "#F0EDEE";
const TEXT_SEC = "#4B5563";

type PipelineNode = {
  id: number;
  label: string;
  icon: "envelope" | "open" | "reply" | "calendar" | "dot";
  chaosX: number;
  chaosY: number;
  orderX: number;
  orderY: number;
  delay: number;
  size: number;
};

const nodes: PipelineNode[] = [
  // Pipeline stages (left to right, top to bottom flow)
  { id: 0, label: "SEND",    icon: "envelope", chaosX: -140, chaosY: -150, orderX: 0,    orderY: -140, delay: 0, size: 36 },
  // Contacts scattered
  { id: 1, label: "",        icon: "dot",      chaosX: 160,  chaosY: -40,  orderX: -100, orderY: -60,  delay: 1, size: 22 },
  { id: 2, label: "",        icon: "dot",      chaosX: -150, chaosY: 60,   orderX: 100,  orderY: -60,  delay: 1, size: 22 },
  { id: 3, label: "",        icon: "dot",      chaosX: 80,   chaosY: 160,  orderX: -50,  orderY: -60,  delay: 2, size: 20 },
  { id: 4, label: "",        icon: "dot",      chaosX: -80,  chaosY: -80,  orderX: 50,   orderY: -60,  delay: 2, size: 20 },
  // Middle stage
  { id: 5, label: "OPEN",    icon: "open",     chaosX: 140,  chaosY: 120,  orderX: -80,  orderY: 30,   delay: 3, size: 32 },
  { id: 6, label: "REPLY",   icon: "reply",    chaosX: -120, chaosY: 150,  orderX: 80,   orderY: 30,   delay: 4, size: 32 },
  // Bottom — meeting
  { id: 7, label: "MEETING", icon: "calendar", chaosX: 40,   chaosY: -160, orderX: 0,    orderY: 140,  delay: 5, size: 38 },
];

const edges: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 5], [2, 5], [3, 6], [4, 6],
  [5, 7], [6, 7],
];

function getChaosControlPoints(
  x1: number, y1: number, x2: number, y2: number, seed: number
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const spread = 100;
  return {
    cp1x: mx + Math.sin(seed * 3.7) * spread,
    cp1y: my + Math.cos(seed * 2.3) * spread,
    cp2x: mx + Math.sin(seed * 5.1) * spread * -0.8,
    cp2y: my + Math.cos(seed * 4.2) * spread * 0.7,
  };
}

function EnvelopeIcon({ size, color }: { size: number; color: string }) {
  const s = size * 0.55;
  return (
    <g>
      <rect x={-s} y={-s * 0.7} width={s * 2} height={s * 1.4} rx={2} fill="none" stroke={color} strokeWidth={1.5} />
      <polyline points={`${-s},${-s * 0.7} 0,${s * 0.15} ${s},${-s * 0.7}`} fill="none" stroke={color} strokeWidth={1.5} />
    </g>
  );
}

function OpenIcon({ size, color }: { size: number; color: string }) {
  const s = size * 0.55;
  return (
    <g>
      <rect x={-s} y={-s * 0.3} width={s * 2} height={s * 1.1} rx={2} fill="none" stroke={color} strokeWidth={1.5} />
      <polyline points={`${-s},${-s * 0.3} 0,${-s * 0.9} ${s},${-s * 0.3}`} fill="none" stroke={color} strokeWidth={1.5} />
    </g>
  );
}

function CalendarIcon({ size, color }: { size: number; color: string }) {
  const s = size * 0.5;
  return (
    <g>
      <rect x={-s} y={-s * 0.8} width={s * 2} height={s * 1.8} rx={3} fill="none" stroke={color} strokeWidth={1.5} />
      <line x1={-s} y1={-s * 0.3} x2={s} y2={-s * 0.3} stroke={color} strokeWidth={1.5} />
      <line x1={-s * 0.45} y1={-s * 0.8} x2={-s * 0.45} y2={-s * 1.1} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={s * 0.45} y1={-s * 0.8} x2={s * 0.45} y2={-s * 1.1} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={0} cy={s * 0.35} r={s * 0.2} fill={color} />
    </g>
  );
}

function ReplyIcon({ size, color }: { size: number; color: string }) {
  const s = size * 0.45;
  return (
    <g>
      <path d={`M ${-s * 0.3} ${-s * 0.5} L ${-s} 0 L ${-s * 0.3} ${s * 0.5}`} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${-s} 0 L ${s * 0.3} 0 Q ${s} 0 ${s} ${s * 0.5} L ${s} ${s * 0.7}`} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

export const EmailPipeline: React.FC = () => {
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
        {/* Edges / Wires */}
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

          const cx1 = from.chaosX + CX;
          const cy1 = from.chaosY + CY;
          const cx2 = to.chaosX + CX;
          const cy2 = to.chaosY + CY;

          const ox1 = from.orderX + CX;
          const oy1 = from.orderY + CY;
          const ox2 = to.orderX + CX;
          const oy2 = to.orderY + CY;

          const x1 = interpolate(progress, [0, 1], [cx1, ox1]);
          const y1 = interpolate(progress, [0, 1], [cy1, oy1]);
          const x2 = interpolate(progress, [0, 1], [cx2, ox2]);
          const y2 = interpolate(progress, [0, 1], [cy2, oy2]);

          const chaos = getChaosControlPoints(cx1, cy1, cx2, cy2, i + 1);

          const cp1x = interpolate(progress, [0, 1], [chaos.cp1x, interpolate(0.33, [0, 1], [x1, x2])]);
          const cp1y = interpolate(progress, [0, 1], [chaos.cp1y, interpolate(0.33, [0, 1], [y1, y2])]);
          const cp2x = interpolate(progress, [0, 1], [chaos.cp2x, interpolate(0.66, [0, 1], [x1, x2])]);
          const cp2y = interpolate(progress, [0, 1], [chaos.cp2y, interpolate(0.66, [0, 1], [y1, y2])]);

          const strokeW = interpolate(progress, [0, 1], [1.2, 1.8]);
          const opacity = interpolate(progress, [0, 0.3], [0.2, 0.5], {
            extrapolateRight: "clamp",
          });

          const floatOffset = Math.sin((frame + i * 20) / (fps * 0.6)) * 6 * (1 - progress);

          return (
            <path
              key={`${fromId}-${toId}`}
              d={`M ${x1} ${y1 + floatOffset} C ${cp1x} ${cp1y + floatOffset}, ${cp2x} ${cp2y + floatOffset}, ${x2} ${y2 + floatOffset}`}
              fill="none"
              stroke={ACCENT}
              strokeWidth={strokeW}
              strokeOpacity={opacity}
              strokeLinecap="round"
            />
          );
        })}

        {/* Nodes */}
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
          const floatY = Math.sin((frame + node.id * 22) / (fps * 0.7)) * 5 * (1 - progress);

          const nodeScale = interpolate(progress, [0, 1], [0.6, 1]);
          const isStage = node.icon !== "dot";

          return (
            <g key={node.id} transform={`translate(${x}, ${y + floatY}) scale(${nodeScale})`}>
              {/* Glow for stages */}
              {isStage && progress > 0.5 && (
                <circle
                  r={node.size * 0.9}
                  fill={ACCENT}
                  opacity={0.08 * progress}
                />
              )}
              <circle
                r={node.size / 2}
                fill={isStage ? ACCENT : "#FBF9F7"}
                stroke={isStage ? ACCENT : ACCENT_20}
                strokeWidth={isStage ? 0 : 1.5}
              />
              {/* Icon inside stage nodes */}
              {node.icon === "envelope" && <EnvelopeIcon size={node.size} color="white" />}
              {node.icon === "open" && <OpenIcon size={node.size} color="white" />}
              {node.icon === "reply" && <ReplyIcon size={node.size} color="white" />}
              {node.icon === "calendar" && <CalendarIcon size={node.size} color="white" />}
              {/* Dot for contacts */}
              {node.icon === "dot" && (
                <circle r={3} fill={ACCENT} opacity={0.5 + progress * 0.5} />
              )}
            </g>
          );
        })}
      </svg>

      {/* Labels */}
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
        RĘCZNY PROSPECTING
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
        AI SDR PIPELINE
      </div>
    </AbsoluteFill>
  );
};
