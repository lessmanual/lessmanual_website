export type SafeDraftKillSwitchPort = {
  isEnabled(): boolean | Promise<boolean>;
};

export function createSafeDraftKillSwitch(enabled: boolean): SafeDraftKillSwitchPort {
  return {
    isEnabled() {
      return enabled;
    },
  };
}

export function isSafeDraftKillSwitchEnvEnabled(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  const normalisedValue = value.trim().toLowerCase();
  return normalisedValue === "1" || normalisedValue === "true" || normalisedValue === "yes" || normalisedValue === "on";
}
