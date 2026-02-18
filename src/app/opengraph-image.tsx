import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "LessManual.ai — Systemy AI dla firm B2B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#F0EDEE",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Copper accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#B87333",
            marginBottom: 32,
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#1E293B" }}>Less</span>
          <span style={{ color: "#B87333" }}>Manual</span>
          <span style={{ color: "#1E293B" }}>.ai</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#1E293B",
            fontWeight: 400,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          Systemy AI dla firm B2B
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 18,
            color: "#4B5563",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.6,
          }}
        >
          AI SDR | SEO Content | Chatbot 24/7 | Generator Ofert
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 32,
            fontSize: 16,
            color: "#6B7280",
          }}
        >
          <span>Gwarancja wyników</span>
          <span style={{ color: "#B87333" }}>|</span>
          <span>20-40h oszczednosci/mies</span>
          <span style={{ color: "#B87333" }}>|</span>
          <span>5.0 na Google</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
