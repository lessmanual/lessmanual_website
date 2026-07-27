export function normalizePublicProse(value: string): string {
  return value.replace(/\s*—\s*/g, " - ");
}
