import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

// Chat bubble scene - 400x240 px, 60 FPS, 300 frames loop
// User message -> typing indicator -> bot response -> badge "Rozwi\u0105zane"

const COPPER = '#B87333';
const TEXT_PRIMARY = '#0A0A0A';
const BG = '#FAFAFA';
const BORDER = '#E5E5E5';
const SUCCESS = '#10B981';
const INTER = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

export const ObslugaKlientaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopFrame = frame % durationInFrames;
  const easing = Easing.bezier(0.16, 1, 0.3, 1);

  // User message fade-in frames 0-30
  const userMsgOpacity = easing(
    interpolate(loopFrame, [0, 30], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Typing indicator visible frames 30-90
  const typingVisible = loopFrame >= 30 && loopFrame < 90;
  const dot1Pulse = typingVisible ? Math.sin(((loopFrame - 30) / 15) * Math.PI) * 0.5 + 0.5 : 0;
  const dot2Pulse = typingVisible ? Math.sin(((loopFrame - 35) / 15) * Math.PI) * 0.5 + 0.5 : 0;
  const dot3Pulse = typingVisible ? Math.sin(((loopFrame - 40) / 15) * Math.PI) * 0.5 + 0.5 : 0;

  // Bot response slide-in od lewej frames 90-150
  const botProgress = easing(
    interpolate(loopFrame, [90, 150], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const botX = interpolate(botProgress, [0, 1], [-30, 0]);
  const botOpacity = botProgress;

  // Badge "Rozwi\u0105zane" frames 180-210
  const badgeProgress = easing(
    interpolate(loopFrame, [180, 210], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: INTER,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
      }}
    >
      {/* User message - po prawej */}
      <div
        style={{
          alignSelf: 'flex-end',
          opacity: userMsgOpacity,
          maxWidth: '70%',
        }}
      >
        <div
          style={{
            background: BORDER,
            color: TEXT_PRIMARY,
            borderRadius: 12,
            padding: '8px 12px',
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          Cze\u015b\u0107, mam problem z faktur\u0105
        </div>
      </div>

      {/* Typing indicator - po lewej */}
      {typingVisible && (
        <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
          <div
            style={{
              background: BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            {[dot1Pulse, dot2Pulse, dot3Pulse].map((pulse, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#A3A3A3',
                  opacity: 0.3 + pulse * 0.7,
                  transform: `translateY(${interpolate(pulse, [0, 1], [0, -3])}px)`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bot response - po lewej, slide-in */}
      {loopFrame >= 90 && (
        <div
          style={{
            alignSelf: 'flex-start',
            maxWidth: '70%',
            opacity: botOpacity,
            transform: `translateX(${botX}px)`,
          }}
        >
          <div
            style={{
              background: COPPER,
              color: '#FAFAFA',
              borderRadius: 12,
              padding: '8px 12px',
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            Widz\u0119, chodzi o faktur\u0119 nr 2384
          </div>
        </div>
      )}

      {/* Badge "Rozwi\u0105zane" */}
      {loopFrame >= 180 && (
        <div
          style={{
            alignSelf: 'flex-start',
            opacity: badgeProgress,
            transform: `translateY(${interpolate(badgeProgress, [0, 1], [4, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: SUCCESS,
              border: `1px solid ${SUCCESS}`,
              padding: '2px 8px',
              borderRadius: 4,
              letterSpacing: '0.03em',
            }}
          >
            \u2713 Rozwi\u0105zane
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
