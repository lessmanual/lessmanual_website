import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

// CLI mini-terminal scene - 400x240 px, 60 FPS, 300 frames loop
// Ciemne tlo #0A0A0A, typewriter lines sekwencyjne, cursor blink

const MONO = "'JetBrains Mono', monospace";
const BG_TERMINAL = '#0A0A0A';
const GREEN = '#10B981';
const MUTED = '#737373';
const WHITE = '#FAFAFA';

// Sekwencje tekstu z frame start/end
const LINES = [
  { text: '$ lessmanual pipeline scan', start: 0, end: 40, color: MUTED },
  { text: '\u2713 147 lead\u00f3w \u2192 12 HOT', start: 40, end: 100, color: GREEN },
  { text: '\u2713 9 email\u00f3w wys\u0142anych', start: 100, end: 160, color: GREEN },
  { text: '\u2713 3 responses', start: 160, end: 220, color: GREEN },
];

export const PipelineMachineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopFrame = frame % durationInFrames;
  const easing = Easing.bezier(0.16, 1, 0.3, 1);

  // Cursor blink - pulsuje co 30 frames po ostatniej linii (frame 220+)
  const cursorVisible = loopFrame >= 220 && Math.floor(loopFrame / 30) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        background: BG_TERMINAL,
        fontFamily: MONO,
        overflow: 'hidden',
      }}
    >
      {/* Terminal chrome header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 14px',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
      </div>

      {/* Terminal body */}
      <div style={{ padding: '14px 16px', fontSize: 12, lineHeight: 1.7 }}>
        {LINES.map((line, idx) => {
          const lineProgress = easing(
            interpolate(loopFrame, [line.start, line.end], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          );
          const charsToShow = Math.floor(lineProgress * line.text.length);
          const isLastLine = idx === LINES.length - 1;
          const isActive = loopFrame >= line.start && loopFrame < line.end;

          if (loopFrame < line.start) return null;

          return (
            <div key={idx} style={{ color: line.color, marginBottom: 2 }}>
              {line.text.slice(0, charsToShow)}
              {isActive && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 13,
                    background: MUTED,
                    marginLeft: 1,
                    verticalAlign: 'text-bottom',
                    opacity: Math.floor(loopFrame / 15) % 2 === 0 ? 1 : 0,
                  }}
                />
              )}
              {isLastLine && !isActive && cursorVisible && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 13,
                    background: MUTED,
                    marginLeft: 1,
                    verticalAlign: 'text-bottom',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
