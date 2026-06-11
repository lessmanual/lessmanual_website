export type SafeDraftInternalStatus = "READY_TO_SEND" | "NEEDS_REVIEW" | "BLOCKED_SAFETY";

export type SafeDraftPublicStatus =
  | "Gotowe do wysłania"
  | "Wymaga ręcznego review"
  | "Zatrzymane ze względów bezpieczeństwa";

export function publicStatusForInternalStatus(status: SafeDraftInternalStatus): SafeDraftPublicStatus {
  if (status === "READY_TO_SEND") {
    return "Gotowe do wysłania";
  }

  if (status === "BLOCKED_SAFETY") {
    return "Zatrzymane ze względów bezpieczeństwa";
  }

  return "Wymaga ręcznego review";
}
