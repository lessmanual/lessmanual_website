import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "LessManual.ai: systemy AI, które ograniczają ręczną pracę w firmie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Grafika udostępniania w nowej palecie (tło #FAFAFA, tekst #0A0A0A, miedź #B87333).
// Bez starych produktów i obietnic godzinowych; liczby jak pasek dowodów (TEKSTY v3, stan 11.11.2026).
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FAFAFA",
          color: "#0A0A0A",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>
          <span>LessManual</span>
          <span style={{ color: "#B87333" }}>.ai</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 900 }}>
            Mniej ręcznej pracy, więcej kontroli nad firmą.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#3F3F46", maxWidth: 940, lineHeight: 1.4 }}>
            Systemy AI budowane etapami, z ceną każdego etapu podaną przed startem.
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#3F3F46" }}>
          <span>5,0 w Google (6 opinii)</span>
          <span style={{ color: "#B87333" }}>·</span>
          <span>24+ firm</span>
          <span style={{ color: "#B87333" }}>·</span>
          <span>31 wdrożeń</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
