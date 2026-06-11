export type SafeDraftCostCapScope = "daily" | "monthly";

export type SafeDraftCostCapCheckInput = {
  now: Date;
  estimatedRunCostUsd: number;
};

export type SafeDraftCostCapRecordInput = {
  now: Date;
  estimatedCostUsd: number;
};

export type SafeDraftCostCapResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      scope: SafeDraftCostCapScope;
      currentCostUsd: number;
      limitUsd: number;
    };

export type SafeDraftCostCapPort = {
  check(input: SafeDraftCostCapCheckInput): Promise<SafeDraftCostCapResult>;
  record(input: SafeDraftCostCapRecordInput): Promise<void>;
};

export type SafeDraftMemoryCostCapOptions = {
  dailyLimitUsd: number;
  monthlyLimitUsd: number;
  initialDailyCostUsd?: number;
  initialMonthlyCostUsd?: number;
};

export function createMemorySafeDraftCostCap(options: SafeDraftMemoryCostCapOptions): SafeDraftCostCapPort {
  let dailyKey: string | undefined;
  let monthlyKey: string | undefined;
  let dailyCostUsd = options.initialDailyCostUsd ?? 0;
  let monthlyCostUsd = options.initialMonthlyCostUsd ?? 0;

  return {
    async check(input) {
      const keys = periodKeys(input.now);
      if (dailyKey !== undefined && dailyKey !== keys.day) {
        dailyCostUsd = 0;
      }
      if (monthlyKey !== undefined && monthlyKey !== keys.month) {
        monthlyCostUsd = 0;
      }
      dailyKey = keys.day;
      monthlyKey = keys.month;

      const nextDailyCostUsd = dailyCostUsd + Math.max(0, input.estimatedRunCostUsd);
      if (nextDailyCostUsd > options.dailyLimitUsd) {
        return {
          ok: false,
          scope: "daily",
          currentCostUsd: dailyCostUsd,
          limitUsd: options.dailyLimitUsd,
        };
      }

      const nextMonthlyCostUsd = monthlyCostUsd + Math.max(0, input.estimatedRunCostUsd);
      if (nextMonthlyCostUsd > options.monthlyLimitUsd) {
        return {
          ok: false,
          scope: "monthly",
          currentCostUsd: monthlyCostUsd,
          limitUsd: options.monthlyLimitUsd,
        };
      }

      return { ok: true };
    },
    async record(input) {
      const keys = periodKeys(input.now);
      if (dailyKey !== keys.day) {
        dailyCostUsd = 0;
        dailyKey = keys.day;
      }
      if (monthlyKey !== keys.month) {
        monthlyCostUsd = 0;
        monthlyKey = keys.month;
      }

      const costUsd = Math.max(0, input.estimatedCostUsd);
      dailyCostUsd += costUsd;
      monthlyCostUsd += costUsd;
    },
  };
}

function periodKeys(now: Date): { day: string; month: string } {
  const isoDate = now.toISOString();
  return {
    day: isoDate.slice(0, 10),
    month: isoDate.slice(0, 7),
  };
}
