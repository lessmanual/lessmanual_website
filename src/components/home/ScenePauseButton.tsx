"use client";

import { useState } from "react";
import { Pause, Play } from "@/components/site/Icons";

// WCAG 2.2.2: ruch dłuższy niż 5 s musi dać się zatrzymać. Przycisk ustawia
// data-paused na najbliższej scenie; CSS zatrzymuje wszystkie animacje w środku.
export function ScenePauseButton({ className }: { className?: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      className={className}
      aria-pressed={paused}
      aria-label={paused ? "Wznów animację sceny" : "Zatrzymaj animację sceny"}
      onClick={(event) => {
        const scene = event.currentTarget.closest("[data-scene]");
        const next = !paused;
        if (scene) {
          scene.setAttribute("data-paused", String(next));
        }
        setPaused(next);
      }}
    >
      {paused ? <Play size={14} /> : <Pause size={14} />}
    </button>
  );
}
