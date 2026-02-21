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
 * Variant 5: Particle → Crystal
 * Rozproszone miedziane punkty/pył
 * → łączą się w geometryczną strukturę kryształu/diamentu
 */

const ACCENT = "#B87333";
const BG = "#F0EDEE";
const TEXT_SEC = "#4B5563";

// Crystal structure: hexagonal lattice
type Particle = {
  id: number;
  chaosX: number;
  chaosY: number;
  chaosSize: number;
  orderX: number;
  orderY: number;
  orderSize: number;
  delay: number;
  ring: number; // which ring (0=center, 1=inner, 2=outer)
};

const particles: Particle[] = [];

// Center
particles.push({
  id: 0, chaosX: 30, chaosY: -50, chaosSize: 2, orderX: 0, orderY: 0, orderSize: 8, delay: 3, ring: 0,
});

// Inner ring (6 points)
const INNER_R = 55;
for (let i = 0; i < 6; i++) {
  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
  particles.push({
    id: particles.length,
    chaosX: -200 + Math.random() * 400,
    chaosY: -200 + Math.random() * 400,
    chaosSize: 1 + Math.random() * 2,
    orderX: Math.cos(angle) * INNER_R,
    orderY: Math.sin(angle) * INNER_R,
    orderSize: 5,
    delay: 1 + i * 0.5,
    ring: 1,
  });
}

// Outer ring (12 points)
const OUTER_R = 110;
for (let i = 0; i < 12; i++) {
  const angle = (i / 12) * Math.PI * 2 - Math.PI / 6;
  particles.push({
    id: particles.length,
    chaosX: -220 + Math.random() * 440,
    chaosY: -220 + Math.random() * 440,
    chaosSize: 0.8 + Math.random() * 1.5,
    orderX: Math.cos(angle) * OUTER_R,
    orderY: Math.sin(angle) * OUTER_R,
    orderSize: 3.5,
    delay: 0.5 + i * 0.3,
    ring: 2,
  });
}

// Extra dust particles (decorative, don't form crystal)
const DUST_COUNT = 40;
const dust: { id: number; x: number; y: number; size: number; speed: number; alpha: number }[] = [];
for (let i = 0; i < DUST_COUNT; i++) {
  dust.push({
    id: i,
    x: -250 + Math.random() * 500,
    y: -220 + Math.random() * 440,
    size: 0.5 + Math.random() * 1.5,
    speed: 0.3 + Math.random() * 0.7,
    alpha: 0.1 + Math.random() * 0.3,
  });
}

// Crystal connections
const crystalEdges: [number, number][] = [];
// Center to inner ring
for (let i = 1; i <= 6; i++) {
  crystalEdges.push([0, i]);
}
// Inner ring connections
for (let i = 1; i <= 6; i++) {
  crystalEdges.push([i, i === 6 ? 1 : i + 1]);
}
// Inner to outer ring
for (let i = 1; i <= 6; i++) {
  const outerIdx1 = 7 + (i - 1) * 2;
  const outerIdx2 = 7 + (i - 1) * 2 + 1;
  if (outerIdx1 < particles.length) crystalEdges.push([i, outerIdx1]);
  if (outerIdx2 < particles.length) crystalEdges.push([i, outerIdx2]);
}
// Outer ring connections
for (let i = 7; i < 7 + 12; i++) {
  const next = i + 1 >= 7 + 12 ? 7 : i + 1;
  crystalEdges.push([i, next]);
}

export const ParticleCrystal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const CX = 270;
  const CY = 220;

  // Overall crystal rotation when formed
  const crystalRotation = interpolate(
    frame,
    [3 * fps, 5.5 * fps],
    [0, 15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 540 480">
        {/* Dust particles (background) */}
        {dust.map((d) => {
          const floatX = Math.sin((frame * d.speed * 0.02 + d.id * 1.7)) * 8;
          const floatY = Math.cos((frame * d.speed * 0.015 + d.id * 2.3)) * 6;

          // Dust fades as crystal forms
          const dustOpacity = interpolate(
            frame,
            [1 * fps, 3 * fps],
            [d.alpha, d.alpha * 0.2],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Dust returns when scattering
          const returnOpacity = interpolate(
            frame,
            [5.5 * fps, 6.5 * fps],
            [0, d.alpha],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <circle
              key={`dust-${d.id}`}
              cx={CX + d.x + floatX}
              cy={CY + d.y + floatY}
              r={d.size}
              fill={ACCENT}
              opacity={dustOpacity + returnOpacity}
            />
          );
        })}

        {/* Crystal edges */}
        <g transform={`rotate(${crystalRotation}, ${CX}, ${CY})`}>
          {crystalEdges.map(([fromId, toId], i) => {
            const from = particles[fromId];
            const to = particles[toId];
            const avgDelay = (from.delay + to.delay) / 2;

            const organizeStart = 1.5 * fps + avgDelay * 2;
            const organizeProgress = spring({
              frame: frame - organizeStart,
              fps,
              config: { damping: 20, stiffness: 70, mass: 1.3 },
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

            return (
              <line
                key={`edge-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={ACCENT}
                strokeWidth={interpolate(progress, [0, 1], [0.3, 1])}
                strokeOpacity={interpolate(progress, [0, 0.5, 1], [0.05, 0.1, 0.25])}
              />
            );
          })}

          {/* Particles / Nodes */}
          {particles.map((p) => {
            const organizeStart = 1 * fps + p.delay * 2.5;
            const organizeProgress = spring({
              frame: frame - organizeStart,
              fps,
              config: { damping: 14, stiffness: 80, mass: 1.2 },
            });
            const scatterStart = 5.5 * fps;
            const scatterProgress = spring({
              frame: frame - scatterStart,
              fps,
              config: { damping: 200 },
            });
            const progress = Math.max(0, Math.min(1, organizeProgress - scatterProgress));

            const x = interpolate(progress, [0, 1], [p.chaosX + CX, p.orderX + CX]);
            const y = interpolate(progress, [0, 1], [p.chaosY + CY, p.orderY + CY]);
            const size = interpolate(progress, [0, 1], [p.chaosSize, p.orderSize]);

            const floatY = Math.sin((frame + p.id * 20) / (fps * 0.7)) * 5 * (1 - progress);
            const floatX = Math.cos((frame + p.id * 15) / (fps * 0.5)) * 4 * (1 - progress);

            // Pulse for center
            const pulse = p.ring === 0
              ? Math.sin(frame / (fps * 0.4)) * 2 * progress
              : 0;

            return (
              <g key={p.id}>
                {/* Glow */}
                {p.ring <= 1 && progress > 0.5 && (
                  <circle
                    cx={x + floatX}
                    cy={y + floatY}
                    r={size * 3}
                    fill={ACCENT}
                    opacity={0.06 * progress}
                  />
                )}
                <circle
                  cx={x + floatX}
                  cy={y + floatY}
                  r={size + pulse}
                  fill={ACCENT}
                  opacity={interpolate(progress, [0, 1], [0.3, p.ring === 0 ? 0.9 : 0.6])}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Labels */}
      <div
        style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.08em",
          color: TEXT_SEC,
          opacity: interpolate(frame, [0, 0.5 * fps, 1.5 * fps, 2.5 * fps], [0, 1, 1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        rozproszone dane
      </div>
      <div
        style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.08em",
          color: ACCENT, fontWeight: 500,
          opacity: interpolate(frame, [3.2 * fps, 3.8 * fps, 5 * fps, 5.5 * fps], [0, 1, 1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        krystaliczna struktura
      </div>
    </AbsoluteFill>
  );
};
