import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

// Kalkulator formularz scene - 400x240 px, 60 FPS, 300 frames loop
// 3 pola formularza slide-up, potem du\u017cy number + copper pulse

const COPPER = '#B87333';
const TEXT_PRIMARY = '#0A0A0A';
const TEXT_SECONDARY = '#525252';
const BG = '#FAFAFA';
const BORDER = '#E5E5E5';
const INTER = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const FIELDS = [
  { label: 'Liczba u\u017cytkownik\u00f3w', value: '120', frameStart: 0, frameEnd: 30 },
  { label: 'Typ projektu', value: 'Hot Lead Catcher', frameStart: 30, frameEnd: 60 },
  { label: 'Okres', value: '12 miesi\u0119cy', frameStart: 60, frameEnd: 90 },
];

export const GeneratorOfertScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopFrame = frame % durationInFrames;
  const easing = Easing.bezier(0.16, 1, 0.3, 1);

  // Wynik fade-in frames 150-180
  const resultProgress = easing(
    interpolate(loopFrame, [150, 180], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Copper highlight pulse frames 180-210
  const pulseProgress = interpolate(loopFrame, [180, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shadowAlpha = interpolate(pulseProgress, [0, 0.5, 1], [0.5, 0, 0]);
  const shadowSize = interpolate(pulseProgress, [0, 0.5, 1], [0, 20, 20]);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: INTER,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Label naglowka */}
      <div
        style={{
          fontSize: 10,
          fontFamily: MONO,
          color: '#737373',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Kalkulator wyceny
      </div>

      {/* Pola formularza */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FIELDS.map((field, idx) => {
          const fieldProgress = easing(
            interpolate(loopFrame, [field.frameStart, field.frameEnd], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          );

          if (loopFrame < field.frameStart) return null;

          return (
            <div
              key={idx}
              style={{
                opacity: fieldProgress,
                transform: `translateY(${interpolate(fieldProgress, [0, 1], [8, 0])}px)`,
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: 6,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>{field.label}</span>
              <span style={{ fontSize: 12, fontFamily: MONO, color: TEXT_PRIMARY }}>{field.value}</span>
            </div>
          );
        })}
      </div>

      {/* Wynik - duzy number */}
      {loopFrame >= 150 && (
        <div
          style={{
            marginTop: 'auto',
            opacity: resultProgress,
            transform: `translateY(${interpolate(resultProgress, [0, 1], [8, 0])}px)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              padding: '10px 12px',
              borderRadius: 4,
              boxShadow: loopFrame >= 180
                ? `0 0 ${shadowSize}px rgba(184,115,51,${shadowAlpha})`
                : 'none',
              transition: 'box-shadow 0.1s',
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 32,
                fontWeight: 700,
                color: COPPER,
                letterSpacing: '-0.02em',
              }}
            >
              12 400 PLN
            </span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>/rok</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
