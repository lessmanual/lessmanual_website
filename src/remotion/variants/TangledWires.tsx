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
 * Variant 2: Tangled Wires
 * Plątanina miedzianych nici/kabli
 * → rozplątują się w czysty flowchart/pipeline
 */

const ACCENT = "#B87333";
const ACCENT_20 = "rgba(184, 115, 51, 0.2)";
const BG = "#F0EDEE";
const TEXT_SEC = "#4B5563";

// Nodes for the flowchart
type FlowNode = {
  id: number;
  label: string;
  chaosX: number;
  chaosY: number;
  orderX: number;
  orderY: number;
  delay: number;
  size: number;
};

const nodes: FlowNode[] = [
  // Top row
  { id: 0, label: "IN",  chaosX: -80,  chaosY: -170, orderX: 0,    orderY: -150, delay: 0, size: 36 },
  // Second row
  { id: 1, label: "",     chaosX: 150,  chaosY: -60,  orderX: -90,  orderY: -70,  delay: 1, size: 28 },
  { id: 2, label: "",     chaosX: -160, chaosY: 80,   orderX: 90,   orderY: -70,  delay: 2, size: 28 },
  // Third row
  { id: 3, label: "",     chaosX: 60,   chaosY: 170,  orderX: -130, orderY: 20,   delay: 2, size: 24 },
  { id: 4, label: "",     chaosX: -130, chaosY: -100, orderX: 0,    orderY: 20,   delay: 3, size: 32 },
  { id: 5, label: "",     chaosX: 170,  chaosY: 100,  orderX: 130,  orderY: 20,   delay: 3, size: 24 },
  // Bottom
  { id: 6, label: "OUT",  chaosX: -40,  chaosY: 190,  orderX: 0,    orderY: 120,  delay: 5, size: 36 },
];

const edges: [number, number][] = [
  [0, 1], [0, 2],
  [1, 3], [1, 4],
  [2, 4], [2, 5],
  [3, 6], [4, 6], [5, 6],
];

// Generate chaotic bezier control points for tangled wires
function getChaosControlPoints(
  x1: number, y1: number, x2: number, y2: number, seed: number
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const spread = 120;
  return {
    cp1x: mx + Math.sin(seed * 3.7) * spread,
    cp1y: my + Math.cos(seed * 2.3) * spread,
    cp2x: mx + Math.sin(seed * 5.1) * spread * -0.8,
    cp2y: my + Math.cos(seed * 4.2) * spread * 0.7,
  };
}

export const TangledWires: React.FC = () => {
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

          // Chaos positions
          const cx1 = from.chaosX + CX;
          const cy1 = from.chaosY + CY;
          const cx2 = to.chaosX + CX;
          const cy2 = to.chaosY + CY;

          // Ordered positions
          const ox1 = from.orderX + CX;
          const oy1 = from.orderY + CY;
          const ox2 = to.orderX + CX;
          const oy2 = to.orderY + CY;

          // Interpolate endpoints
          const x1 = interpolate(progress, [0, 1], [cx1, ox1]);
          const y1 = interpolate(progress, [0, 1], [cy1, oy1]);
          const x2 = interpolate(progress, [0, 1], [cx2, ox2]);
          const y2 = interpolate(progress, [0, 1], [cy2, oy2]);

          // Control points: from chaotic curves to straight lines
          const chaos = getChaosControlPoints(cx1, cy1, cx2, cy2, i + 1);
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;

          const cp1x = interpolate(progress, [0, 1], [chaos.cp1x, interpolate(0.33, [0, 1], [x1, x2])]);
          const cp1y = interpolate(progress, [0, 1], [chaos.cp1y, interpolate(0.33, [0, 1], [y1, y2])]);
          const cp2x = interpolate(progress, [0, 1], [chaos.cp2x, interpolate(0.66, [0, 1], [x1, x2])]);
          const cp2y = interpolate(progress, [0, 1], [chaos.cp2y, interpolate(0.66, [0, 1], [y1, y2])]);

          // Wire thickness and opacity
          const strokeW = interpolate(progress, [0, 1], [1.5, 2]);
          const opacity = interpolate(progress, [0, 0.3], [0.3, 0.6], {
            extrapolateRight: "clamp",
          });

          // Animated float for chaos
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
          const isEndpoint = node.label !== "";

          return (
            <g key={node.id} transform={`translate(${x}, ${y + floatY}) scale(${nodeScale})`}>
              {/* Glow for endpoints */}
              {isEndpoint && progress > 0.5 && (
                <circle
                  r={node.size * 0.8}
                  fill={ACCENT}
                  opacity={0.08 * progress}
                />
              )}
              <circle
                r={node.size / 2}
                fill={isEndpoint ? ACCENT : "#FBF9F7"}
                stroke={isEndpoint ? ACCENT : ACCENT_20}
                strokeWidth={isEndpoint ? 0 : 1.5}
              />
              {/* Inner dot for non-endpoints */}
              {!isEndpoint && (
                <circle r={3} fill={ACCENT} opacity={0.5 + progress * 0.5} />
              )}
              {isEndpoint && (
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={11}
                  fontWeight={600}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Labels — above animation, bigger, CAPS */}
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
        SPLĄTANE PROCESY
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
        CZYTELNY PIPELINE
      </div>
    </AbsoluteFill>
  );
};
