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
 * Variant 4: Domino Cascade
 * Pochylone bloki / klocki przewracają się chaotycznie
 * → stają prosto, wyrównują się, kaskadowy ripple efekt
 */

const ACCENT = "#B87333";
const ACCENT_LIGHT = "rgba(184, 115, 51, 0.15)";
const BG = "#F0EDEE";
const CARD_BG = "#FBF9F7";
const BORDER = "#E2E0DF";
const TEXT_SEC = "#4B5563";

type Block = {
  id: number;
  chaosX: number;
  chaosY: number;
  chaosTilt: number; // 3D tilt perspective
  chaosRotateZ: number;
  orderX: number;
  orderY: number;
  delay: number;
  width: number;
  height: number;
  shade: number; // 0-1, darker = more copper
};

// 4x4 grid of blocks with some variation
const blocks: Block[] = [];
const GRID_COLS = 5;
const GRID_ROWS = 4;
const BLOCK_W = 56;
const BLOCK_H = 68;
const GAP = 8;

for (let r = 0; r < GRID_ROWS; r++) {
  for (let c = 0; c < GRID_COLS; c++) {
    const id = r * GRID_COLS + c;
    const orderX = (c - (GRID_COLS - 1) / 2) * (BLOCK_W + GAP);
    const orderY = (r - (GRID_ROWS - 1) / 2) * (BLOCK_H + GAP);

    // Scatter chaos
    const angle = (id / (GRID_ROWS * GRID_COLS)) * Math.PI * 2 + id * 0.7;
    const dist = 140 + Math.sin(id * 2.3) * 60;

    blocks.push({
      id,
      chaosX: Math.cos(angle) * dist,
      chaosY: Math.sin(angle) * dist,
      chaosTilt: -40 + Math.sin(id * 1.7) * 30,
      chaosRotateZ: -30 + Math.sin(id * 3.1) * 40,
      orderX,
      orderY,
      delay: (r + c) * 0.7, // diagonal wave
      width: BLOCK_W + Math.sin(id * 2.1) * 6,
      height: BLOCK_H + Math.cos(id * 1.8) * 8,
      shade: (r * GRID_COLS + c) / (GRID_ROWS * GRID_COLS),
    });
  }
}

export const DominoCascade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ripple wave (happens after organization)
  const rippleFrame = frame - 3.8 * fps;

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
        perspective: "800px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          transformStyle: "preserve-3d" as const,
        }}
      >
        {blocks.map((block) => {
          const organizeStart = 1 * fps + block.delay * 2.5;
          const organizeProgress = spring({
            frame: frame - organizeStart,
            fps,
            config: { damping: 16, stiffness: 90, mass: 1.1 },
          });
          const scatterStart = 5.5 * fps;
          const scatterProgress = spring({
            frame: frame - scatterStart,
            fps,
            config: { damping: 200 },
          });
          const progress = Math.max(0, Math.min(1, organizeProgress - scatterProgress));

          const x = interpolate(progress, [0, 1], [block.chaosX, block.orderX]);
          const y = interpolate(progress, [0, 1], [block.chaosY, block.orderY]);
          const tilt = interpolate(progress, [0, 1], [block.chaosTilt, 0]);
          const rotateZ = interpolate(progress, [0, 1], [block.chaosRotateZ, 0]);
          const scale = interpolate(progress, [0, 1], [0.6 + block.shade * 0.2, 1]);

          // Chaos float
          const floatY = Math.sin((frame + block.id * 18) / (fps * 0.6)) * 5 * (1 - progress);

          // Ripple: subtle scale pulse wave
          const distFromCenter = Math.sqrt(block.orderX ** 2 + block.orderY ** 2);
          const rippleDelay = distFromCenter * 0.015;
          const rippleScale = rippleFrame > 0
            ? Math.max(0, Math.sin((rippleFrame / fps - rippleDelay) * Math.PI * 2) * 0.06)
            * interpolate(frame, [5 * fps, 5.5 * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
            : 0;

          // Color: gradient from beige to copper
          const copperMix = interpolate(block.shade, [0, 1], [0.02, 0.12]);
          const bgColor = progress > 0.8
            ? `rgba(184, 115, 51, ${copperMix + rippleScale})`
            : CARD_BG;

          return (
            <div
              key={block.id}
              style={{
                position: "absolute",
                left: x,
                top: y + floatY,
                width: block.width,
                height: block.height,
                transform: `rotateX(${tilt}deg) rotateZ(${rotateZ}deg) scale(${scale + rippleScale})`,
                transformStyle: "preserve-3d" as const,
                background: bgColor,
                border: `1px solid ${progress > 0.8 ? `rgba(184,115,51,${0.1 + copperMix})` : BORDER}`,
                borderRadius: 6,
                boxShadow: progress > 0.7
                  ? `0 1px 4px rgba(0,0,0,0.04)`
                  : `0 4px 12px rgba(0,0,0,0.08)`,
                transition: "background 0.3s",
              }}
            >
              {/* Inner lines */}
              <div style={{ padding: "8px 6px", display: "flex", flexDirection: "column" as const, gap: 4 }}>
                <div style={{ height: 3, borderRadius: 1, width: "70%", background: `rgba(30,41,59,${0.06 + copperMix * 0.5})` }} />
                <div style={{ height: 3, borderRadius: 1, width: "50%", background: `rgba(30,41,59,${0.04 + copperMix * 0.3})` }} />
                <div style={{ height: 3, borderRadius: 1, width: "85%", background: `rgba(30,41,59,${0.04 + copperMix * 0.3})` }} />
              </div>
            </div>
          );
        })}
      </div>

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
        rozrzucone elementy
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
        precyzyjny układ
      </div>
    </AbsoluteFill>
  );
};
