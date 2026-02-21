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
 * Scattered Papers — Final version
 * - Usunięty napis "rozproszone dokumenty"
 * - Napis "uporządkowany system" wyżej + większa czcionka
 */

const ACCENT = "#B87333";
const BG = "#F0EDEE";
const CARD_BG = "#FBF9F7";
const BORDER = "#E2E0DF";

type Paper = {
  id: number;
  chaosX: number;
  chaosY: number;
  chaosRotate: number;
  chaosScale: number;
  orderX: number;
  orderY: number;
  orderRotate: number;
  delay: number;
  lines: number[];
  accent: boolean;
};

const papers: Paper[] = [
  { id: 0, chaosX: -120, chaosY: -140, chaosRotate: -32, chaosScale: 0.75, orderX: -8, orderY: -70, orderRotate: -1.5, delay: 0, lines: [0.8, 0.6, 0.9, 0.4], accent: false },
  { id: 1, chaosX: 140,  chaosY: -110, chaosRotate: 22,  chaosScale: 0.65, orderX: -4, orderY: -62, orderRotate: 0.8,  delay: 1, lines: [0.7, 0.85, 0.5, 0.65, 0.3], accent: false },
  { id: 2, chaosX: -90,  chaosY: 150,  chaosRotate: -45, chaosScale: 0.7,  orderX: 0,  orderY: -54, orderRotate: -0.5, delay: 2, lines: [0.9, 0.55, 0.75], accent: false },
  { id: 3, chaosX: 110,  chaosY: 120,  chaosRotate: 38,  chaosScale: 0.6,  orderX: 4,  orderY: -46, orderRotate: 0.3,  delay: 3, lines: [0.6, 0.8, 0.45, 0.7, 0.55, 0.3], accent: true },
  { id: 4, chaosX: -150, chaosY: 20,   chaosRotate: 15,  chaosScale: 0.8,  orderX: 0,  orderY: -38, orderRotate: -0.2, delay: 4, lines: [0.75, 0.5, 0.85, 0.4], accent: false },
  { id: 5, chaosX: 40,   chaosY: -170, chaosRotate: -28, chaosScale: 0.55, orderX: -2, orderY: -30, orderRotate: 0.6,  delay: 5, lines: [0.65, 0.9, 0.5], accent: false },
  { id: 6, chaosX: -40,  chaosY: -50,  chaosRotate: 50,  chaosScale: 0.7,  orderX: 2,  orderY: -22, orderRotate: -0.8, delay: 2, lines: [0.8, 0.7, 0.6, 0.85], accent: false },
];

function PaperSheet({
  paper,
  progress,
}: {
  paper: Paper;
  progress: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const x = interpolate(progress, [0, 1], [paper.chaosX, paper.orderX]);
  const y = interpolate(progress, [0, 1], [paper.chaosY, paper.orderY]);
  const rotate = interpolate(progress, [0, 1], [paper.chaosRotate, paper.orderRotate]);
  const scale = interpolate(progress, [0, 1], [paper.chaosScale, 1]);

  const floatY = Math.sin((frame + paper.id * 25) / (fps * 0.7)) * 5 * (1 - progress);
  const floatX = Math.cos((frame + paper.id * 18) / (fps * 0.5)) * 4 * (1 - progress);

  const shadowBlur = interpolate(progress, [0, 1], [12, 3]);
  const shadowY = interpolate(progress, [0, 1], [8, 1]);

  const stackShadow = progress > 0.8
    ? `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.04), inset 0 0 0 1px ${BORDER}`
    : `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.08)`;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(${x + floatX}px, ${y + floatY}px) translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        width: 110,
        height: 143,
        background: CARD_BG,
        border: `1px solid ${paper.accent && progress > 0.8 ? ACCENT : BORDER}`,
        borderRadius: 4,
        padding: "12px 10px",
        boxShadow: stackShadow,
        display: "flex",
        flexDirection: "column" as const,
        gap: 5,
      }}
    >
      {paper.lines.map((width, i) => (
        <div
          key={i}
          style={{
            height: 3.5,
            borderRadius: 2,
            width: `${width * 100}%`,
            background:
              paper.accent && i === 0 && progress > 0.8
                ? ACCENT
                : `rgba(30, 41, 59, ${0.07 + (i === 0 ? 0.03 : 0)})`,
          }}
        />
      ))}

      {paper.accent && (
        <div
          style={{
            position: "absolute",
            top: 7,
            right: 7,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: ACCENT,
            opacity: interpolate(progress, [0.7, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

export const ScatteredPapersFinal: React.FC = () => {
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
      {papers.map((paper) => {
        const organizeStart = 1 * fps + paper.delay * 3;
        const organizeProgress = spring({
          frame: frame - organizeStart,
          fps,
          config: { damping: 14, stiffness: 70, mass: 1.3 },
        });

        const scatterStart = 5.5 * fps;
        const scatterProgress = spring({
          frame: frame - scatterStart,
          fps,
          config: { damping: 200 },
        });

        const progress = Math.max(0, Math.min(1, organizeProgress - scatterProgress));

        return <PaperSheet key={paper.id} paper={paper} progress={progress} />;
      })}

      {/* "uporządkowany system" — wyżej i większa czcionka */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 15,
          letterSpacing: "0.06em",
          color: ACCENT,
          fontWeight: 600,
          whiteSpace: "nowrap" as const,
          opacity: interpolate(
            frame,
            [3 * fps, 3.6 * fps, 5 * fps, 5.5 * fps],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        }}
      >
        uporządkowany system
      </div>
    </AbsoluteFill>
  );
};
