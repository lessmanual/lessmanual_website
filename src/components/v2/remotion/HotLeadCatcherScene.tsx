import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

// Radar scene - 400x240 px, 60 FPS, 300 frames loop
// Centralny punkt copper z 3 rozchodzacymi sie kregami + pulsujacy label + overlay score

const COPPER = '#B87333';
const TEXT_PRIMARY = '#0A0A0A';
const BG = '#FAFAFA';
const MONO = "'JetBrains Mono', monospace";

function RadarRing({ startFrame, frame }: { startFrame: number; frame: number }) {
  const easing = Easing.bezier(0.16, 1, 0.3, 1);
  const localFrame = frame - startFrame;
  const duration = 120;

  if (localFrame < 0 || localFrame > duration) return null;

  const progress = easing(Math.min(localFrame / duration, 1));
  const scale = interpolate(progress, [0, 1], [0, 3]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: `1.5px solid ${COPPER}`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        pointerEvents: 'none',
      }}
    />
  );
}

export const HotLeadCatcherScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopFrame = frame % durationInFrames;
  const easing = Easing.bezier(0.16, 1, 0.3, 1);

  // Pulsujacy label - fade in/out z pulsem
  const labelPulse = Math.sin((loopFrame / 30) * Math.PI);
  const labelOpacity = interpolate(labelPulse, [-1, 1], [0.6, 1]);

  // Overlay slide-in od dolu po frame 150
  const overlayProgress = easing(
    interpolate(loopFrame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const overlayY = interpolate(overlayProgress, [0, 1], [20, 0]);
  const overlayOpacity = overlayProgress;

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: "'Inter', system-ui, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Centralny punkt + kreggi */}
      <div style={{ position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Ring 1: start frame 0 */}
        <RadarRing startFrame={0} frame={loopFrame} />
        {/* Ring 2: start frame 60 */}
        <RadarRing startFrame={60} frame={loopFrame} />
        {/* Ring 3: start frame 120 */}
        <RadarRing startFrame={120} frame={loopFrame} />

        {/* Centralny punkt */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: COPPER,
            position: 'relative',
            zIndex: 2,
          }}
        />
      </div>

      {/* Pulsujacy label pod srodkowym punktem */}
      <div
        style={{
          marginTop: 12,
          fontFamily: MONO,
          fontSize: 11,
          color: COPPER,
          opacity: labelOpacity,
          letterSpacing: '0.05em',
        }}
      >
        MATCH: Firma X
      </div>

      {/* Overlay slide-in od dolu */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: `translateX(-50%) translateY(${overlayY}px)`,
          opacity: overlayOpacity,
          border: `1px solid ${COPPER}`,
          background: BG,
          padding: '6px 16px',
          fontFamily: MONO,
          fontSize: 11,
          color: TEXT_PRIMARY,
          whiteSpace: 'nowrap',
          letterSpacing: '0.04em',
        }}
      >
        Score: 87/100
      </div>
    </AbsoluteFill>
  );
};
