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
 * Variant 3: Sticky Notes → Kanban
 * Kolorowe karteczki latają chaotycznie
 * → wskakują w kolumny kanban board
 */

const ACCENT = "#B87333";
const BG = "#F0EDEE";
const TEXT_SEC = "#4B5563";
const BORDER = "#E2E0DF";

const COLORS = [
  "#FEF3C7", // amber-100
  "#DBEAFE", // blue-100
  "#D1FAE5", // emerald-100
  "#FCE7F3", // pink-100
  "#E0E7FF", // indigo-100
  "#FEE2E2", // red-100
  "#F3E8FF", // purple-100
  "#ECFDF5", // green-50
];

const BORDER_COLORS = [
  "#FDE68A",
  "#BFDBFE",
  "#A7F3D0",
  "#FBCFE8",
  "#C7D2FE",
  "#FECACA",
  "#DDD6FE",
  "#BBF7D0",
];

type Sticky = {
  id: number;
  color: number;
  chaosX: number;
  chaosY: number;
  chaosRotate: number;
  column: number; // 0=Do zrobienia, 1=W toku, 2=Gotowe
  row: number;
  delay: number;
  lineWidths: number[];
};

const stickies: Sticky[] = [
  // Column 0: Do zrobienia
  { id: 0, color: 0, chaosX: -150, chaosY: -140, chaosRotate: -35, column: 0, row: 0, delay: 0, lineWidths: [0.8, 0.6] },
  { id: 1, color: 5, chaosX: 140,  chaosY: 170,  chaosRotate: 28,  column: 0, row: 1, delay: 2, lineWidths: [0.7, 0.5, 0.4] },
  { id: 2, color: 4, chaosX: -80,  chaosY: 190,  chaosRotate: -50, column: 0, row: 2, delay: 4, lineWidths: [0.9, 0.55] },
  // Column 1: W toku
  { id: 3, color: 1, chaosX: 170,  chaosY: -100, chaosRotate: 42,  column: 1, row: 0, delay: 1, lineWidths: [0.75, 0.85] },
  { id: 4, color: 6, chaosX: -170, chaosY: 60,   chaosRotate: -18, column: 1, row: 1, delay: 3, lineWidths: [0.6, 0.8, 0.3] },
  // Column 2: Gotowe
  { id: 5, color: 2, chaosX: 60,   chaosY: -180, chaosRotate: 55,  column: 2, row: 0, delay: 2, lineWidths: [0.85, 0.5] },
  { id: 6, color: 7, chaosX: -120, chaosY: -30,  chaosRotate: 30,  column: 2, row: 1, delay: 4, lineWidths: [0.7, 0.65, 0.45] },
  { id: 7, color: 3, chaosX: 100,  chaosY: 120,  chaosRotate: -40, column: 2, row: 2, delay: 5, lineWidths: [0.55, 0.8] },
];

// Kanban column positions
const COL_X = [-135, 0, 135];
const COL_NAMES = ["Do zrobienia", "W toku", "Gotowe"];
const ROW_START_Y = -50;
const ROW_GAP = 78;
const STICKY_SIZE = 72;

function StickyNote({
  sticky,
  progress,
}: {
  sticky: Sticky;
  progress: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const orderX = COL_X[sticky.column];
  const orderY = ROW_START_Y + sticky.row * ROW_GAP;

  const x = interpolate(progress, [0, 1], [sticky.chaosX, orderX]);
  const y = interpolate(progress, [0, 1], [sticky.chaosY, orderY]);
  const rotate = interpolate(progress, [0, 1], [sticky.chaosRotate, -1 + sticky.id * 0.5]);
  const scale = interpolate(progress, [0, 1], [0.7 + Math.random() * 0.2, 1]);

  const floatY = Math.sin((frame + sticky.id * 20) / (fps * 0.7)) * 6 * (1 - progress);
  const floatX = Math.cos((frame + sticky.id * 15) / (fps * 0.5)) * 4 * (1 - progress);

  const isComplete = sticky.column === 2 && progress > 0.8;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(${x + floatX}px, ${y + floatY}px) translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        width: STICKY_SIZE,
        height: STICKY_SIZE,
        background: COLORS[sticky.color],
        border: `1px solid ${BORDER_COLORS[sticky.color]}`,
        borderRadius: 3,
        padding: "10px 8px",
        boxShadow: progress > 0.7
          ? "0 1px 3px rgba(0,0,0,0.06)"
          : "0 3px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column" as const,
        gap: 5,
      }}
    >
      {/* Tape at top */}
      <div
        style={{
          position: "absolute",
          top: -4,
          left: "50%",
          transform: "translateX(-50%)",
          width: 24,
          height: 8,
          background: "rgba(0,0,0,0.04)",
          borderRadius: 1,
        }}
      />

      {/* Fake handwritten lines */}
      {sticky.lineWidths.map((w, i) => (
        <div
          key={i}
          style={{
            height: 3,
            borderRadius: 1,
            width: `${w * 100}%`,
            background: `rgba(30, 41, 59, 0.12)`,
          }}
        />
      ))}

      {/* Checkmark for "Gotowe" column */}
      {isComplete && (
        <div
          style={{
            position: "absolute",
            bottom: 6,
            right: 6,
            opacity: interpolate(progress, [0.8, 1], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            }),
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="6" fill={ACCENT} />
            <path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
}

export const StickyNotes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Column headers opacity
  const colHeaderOpacity = interpolate(
    frame,
    [2.5 * fps, 3.2 * fps, 5 * fps, 5.5 * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Column dividers
  const dividerOpacity = interpolate(
    frame,
    [2 * fps, 3 * fps, 5 * fps, 5.5 * fps],
    [0, 0.15, 0.15, 0],
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
      {/* Column dividers */}
      {[-68, 68].map((xPos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `calc(50% + ${xPos}px)`,
            top: "15%",
            height: "70%",
            width: 1,
            background: ACCENT,
            opacity: dividerOpacity,
          }}
        />
      ))}

      {/* Column headers */}
      {COL_NAMES.map((name, i) => (
        <div
          key={name}
          style={{
            position: "absolute",
            left: `calc(50% + ${COL_X[i]}px)`,
            top: 50,
            transform: "translateX(-50%)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.05em",
            color: i === 2 ? ACCENT : TEXT_SEC,
            opacity: colHeaderOpacity,
            textTransform: "uppercase" as const,
          }}
        >
          {name}
        </div>
      ))}

      {/* Stickies */}
      {stickies.map((sticky) => {
        const organizeStart = 1 * fps + sticky.delay * 3;
        const organizeProgress = spring({
          frame: frame - organizeStart,
          fps,
          config: { damping: 12, stiffness: 90, mass: 1.1 },
        });
        const scatterStart = 5.5 * fps;
        const scatterProgress = spring({
          frame: frame - scatterStart,
          fps,
          config: { damping: 200 },
        });
        const progress = Math.max(0, Math.min(1, organizeProgress - scatterProgress));

        return <StickyNote key={sticky.id} sticky={sticky} progress={progress} />;
      })}

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
        chaos zadań
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
        przejrzysty kanban
      </div>
    </AbsoluteFill>
  );
};
