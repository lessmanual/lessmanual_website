"use client";

// Isolated module so that @remotion/player + HotLeadCatcherFlow are only loaded
// when this component is actually rendered (after hydration, via dynamic import).
// This keeps them out of the initial JS bundle for /oferta/hot-lead-catcher.

import { Player } from "@remotion/player";
import { HotLeadCatcherFlow } from "@/remotion/HotLeadCatcherFlow";

interface Props {
  reducedMotion: boolean;
}

export function HotLeadCatcherPlayer({ reducedMotion }: Props) {
  return (
    <>
      <Player
        component={HotLeadCatcherFlow}
        durationInFrames={240}
        fps={30}
        compositionWidth={640}
        compositionHeight={640}
        autoPlay={!reducedMotion}
        loop={!reducedMotion}
        controls={reducedMotion}
        acknowledgeRemotionLicense
        style={{ width: "100%", aspectRatio: "1/1", borderRadius: 8 }}
      />
      {reducedMotion && (
        <p className="mt-3 text-center font-mono text-[11px] text-[#737373]">
          Animacja wstrzymana (prefers-reduced-motion). Kliknij play, aby odtworzyc.
        </p>
      )}
    </>
  );
}
