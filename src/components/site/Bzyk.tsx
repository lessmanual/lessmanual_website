// Bzyk: maskotka LessManual jako jeden lekki inline SVG (źródło: scripts/video/mascot_bzyk.py,
// eksport materialy/cto/strona-2026-11-10/bzyk-svg). Gradient korpusu jest zdefiniowany raz
// w <BzykDefs /> w layoutcie, żeby kilka Bzyków na stronie nie dublowało identyfikatorów.
// Mina przez atrybut data-mood (CSS w globals.css), więc działa też bez JS.

export type BzykMood = "neutral" | "happy" | "surprised";

type BzykProps = {
  mood?: BzykMood;
  width?: number;
  className?: string;
  title?: string;
};

export function Bzyk({ mood = "neutral", width = 56, className, title }: BzykProps) {
  const height = Math.round((width * 182) / 240);
  return (
    <svg
      viewBox="0 0 240 182"
      width={width}
      height={height}
      className={className ? `bzyk ${className}` : "bzyk"}
      data-mood={mood}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect x="46" y="34" width="10" height="56" rx="5" fill="#8B4513" />
      <rect x="184" y="34" width="10" height="56" rx="5" fill="#8B4513" />
      <rect x="46" y="80" width="148" height="12" rx="6" fill="#8B4513" />
      <ellipse className="bzyk-rotor" cx="51" cy="32" rx="42" ry="7" fill="#6E3510" opacity=".85" />
      <ellipse className="bzyk-rotor" cx="189" cy="32" rx="42" ry="7" fill="#6E3510" opacity=".85" />
      <circle cx="51" cy="32" r="7" fill="#E09A55" />
      <circle cx="189" cy="32" r="7" fill="#E09A55" />
      <rect x="92" y="150" width="12" height="24" rx="6" fill="#8B4513" />
      <rect x="136" y="150" width="12" height="24" rx="6" fill="#8B4513" />
      <ellipse cx="98" cy="176" rx="11" ry="6" fill="#3A1C08" />
      <ellipse cx="142" cy="176" rx="11" ry="6" fill="#3A1C08" />
      <rect x="62" y="66" width="116" height="92" rx="46" fill="url(#bzyk-g)" />
      <path d="M84 76 Q120 66 156 76" stroke="#F8D2AA" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".75" />
      <rect x="76" y="86" width="88" height="52" rx="26" fill="#141414" />
      <g className="bzyk-eyes" fill="#3FD0C2">
        <rect x="94" y="98" width="16" height="24" rx="8" />
        <rect x="130" y="98" width="16" height="24" rx="8" />
      </g>
      <g className="bzyk-happy" stroke="#3FD0C2" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M92 115 Q102 100 112 115" />
        <path d="M128 115 Q138 100 148 115" />
      </g>
      <path className="bzyk-mouth" d="M112 128 Q120 133 128 128" stroke="#E09A55" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse className="bzyk-mouth-o" cx="120" cy="130" rx="4.5" ry="5.5" fill="none" stroke="#E09A55" strokeWidth="3" />
    </svg>
  );
}

/** Wspólne definicje SVG Bzyka. Renderowane raz w layoutcie. */
export function BzykDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="bzyk-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EDB27A" />
          <stop offset=".5" stopColor="#B87333" />
          <stop offset="1" stopColor="#8B4513" />
        </linearGradient>
      </defs>
    </svg>
  );
}
