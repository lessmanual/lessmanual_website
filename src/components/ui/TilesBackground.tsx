"use client";

import { useState, useEffect } from "react";

export function TilesBackground() {
  const [grid, setGrid] = useState<{ cols: number; rows: number }>({
    cols: 0,
    rows: 0,
  });
  useEffect(() => {
    function calc() {
      setGrid({
        cols: Math.ceil(window.innerWidth / 48) + 2,
        rows: Math.ceil(window.innerHeight / 48) + 2,
      });
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  if (grid.cols === 0) return null;
  return (
    <div className="absolute inset-0 z-0 flex justify-center overflow-hidden pointer-events-none">
      {Array.from({ length: grid.cols }).map((_, c) => (
        <div
          key={c}
          className="shrink-0"
          style={{ borderLeft: "1px solid rgba(184,115,51,0.045)" }}
        >
          {Array.from({ length: grid.rows }).map((_, r) => (
            <div
              key={r}
              className="w-12 h-12"
              style={{
                borderRight: "1px solid rgba(184,115,51,0.045)",
                borderTop: "1px solid rgba(184,115,51,0.045)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
