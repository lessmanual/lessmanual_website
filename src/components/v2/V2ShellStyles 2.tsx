// V2ShellStyles - deduplicated CSS shell for all v2-scope layouts
// Single source of truth: v2-scope base styles, animations, font vars.
// Root layout (src/app/layout.tsx) already sets --font-inter and
// --font-jetbrains-mono on <body>; we just consume them here.
// Usage: import { V2ShellStyles, v2FontClasses } from '@/components/v2/V2ShellStyles'

// v2FontClasses is intentionally empty - font CSS variables are injected by
// the root RootLayout via next/font className on <body>. Keeping the export
// so layouts can safely spread it without knowing this detail.
export const v2FontClasses = "";

export function V2ShellStyles() {
  return (
    <style>{`
      .v2-scope {
        background: #FAFAFA;
        color: #0A0A0A;
        font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
        font-feature-settings: "cv11", "ss01", "ss03";
        min-height: 100vh;
      }
      .v2-scope ::selection {
        background: #B87333;
        color: #FFFFFF;
      }
      .v2-scope h1, .v2-scope h2, .v2-scope h3, .v2-scope h4 {
        font-family: var(--font-inter), system-ui, sans-serif;
        font-weight: 600;
        letter-spacing: -0.035em;
        line-height: 1.05;
        color: #0A0A0A;
      }
      .v2-scope h1 { font-size: clamp(2.75rem, 6vw, 4.75rem); }
      .v2-scope h2 { font-size: clamp(2rem, 4.5vw, 3.25rem); }
      .v2-scope h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); letter-spacing: -0.025em; }
      .v2-scope .font-mono { font-family: var(--font-jetbrains-mono), ui-monospace, monospace; }
      .v2-scope .v2-link { color: #0A0A0A; transition: color 150ms ease; }
      .v2-scope .v2-link:hover { color: #B87333; }

      @keyframes v2-cursor-blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      .v2-cursor {
        display: inline-block;
        width: 8px;
        height: 1.1em;
        background: #B87333;
        vertical-align: text-bottom;
        animation: v2-cursor-blink 1s step-end infinite;
        margin-left: 2px;
      }

      @keyframes v2-marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .v2-marquee-track { animation: v2-marquee 45s linear infinite; }

      @media (prefers-reduced-motion: reduce) {
        .v2-cursor, .v2-marquee-track {
          animation: none !important;
        }
      }
    `}</style>
  );
}
