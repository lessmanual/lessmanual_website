import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

// Title typewriter scene - 400x240 px, 60 FPS, 240 frames loop
// Tytu\u0142 ro\u015bnie litera po literze, potem fade-in meta badge

const COPPER = '#B87333';
const TEXT_PRIMARY = '#0A0A0A';
const TEXT_SECONDARY = '#525252';
const BG = '#FAFAFA';
const INTER = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const TITLE = 'Jak automatyzowa\u0107 cold email w 2026';
const META = '7 min read \u00b7 SEO score 94';

// 2 frames per char
const CHARS_PER_FRAME = 0.5; // 1 char co 2 frames

export const ContentMachineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopFrame = frame % durationInFrames;
  const easing = Easing.bezier(0.16, 1, 0.3, 1);

  const charsToShow = Math.min(Math.floor(loopFrame * CHARS_PER_FRAME), TITLE.length);
  const titleVisible = TITLE.slice(0, charsToShow);

  // Badge fade-in po frame 120
  const badgeProgress = easing(
    interpolate(loopFrame, [120, 150], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: INTER,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '28px 32px',
        overflow: 'hidden',
      }}
    >
      {/* Miniaturka posta blog */}
      <div
        style={{
          fontSize: 10,
          fontFamily: MONO,
          color: '#737373',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        SEO / Automatyzacja
      </div>

      {/* Tytu\u0142 typewriter */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: TEXT_PRIMARY,
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          minHeight: 52,
        }}
      >
        {titleVisible}
        {charsToShow < TITLE.length && (
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: 22,
              background: TEXT_PRIMARY,
              marginLeft: 2,
              verticalAlign: 'text-bottom',
              opacity: Math.floor(loopFrame / 20) % 2 === 0 ? 1 : 0,
            }}
          />
        )}
      </div>

      {/* Meta badge */}
      <div
        style={{
          marginTop: 16,
          opacity: badgeProgress,
          transform: `translateY(${interpolate(badgeProgress, [0, 1], [6, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: TEXT_SECONDARY,
            border: `1px solid ${COPPER}`,
            padding: '4px 10px',
            borderRadius: 4,
            letterSpacing: '0.02em',
          }}
        >
          {META}
        </span>
      </div>
    </AbsoluteFill>
  );
};
