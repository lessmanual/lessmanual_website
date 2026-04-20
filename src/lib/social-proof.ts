// src/lib/social-proof.ts
// SINGLE SOURCE OF TRUTH dla social proof numbers LessManual.ai
// NIE pisz liczb proof inline w JSX/MDX - importuj stąd
// Source autoryzacji: Bartek Chudzik, 2026-04-20

export const SOCIAL_PROOF = {
  companiesEngaged: 20,         // firm B2B z którymi współpracowaliśmy
  implementationsDelivered: 24, // dostarczonych projektów
  systemsLive: 24,              // obecnie w produkcji
  googleReviews: 6,             // liczba opinii 5.0 na Google
  googleRating: 5.0,            // średnia ocena
  maxProjectsMonthly: 3,        // kapacytet agencji
} as const;

// Helper strings - importowane przez komponenty
export const PROOF_FULL = `${SOCIAL_PROOF.companiesEngaged}+ firm B2B · ${SOCIAL_PROOF.implementationsDelivered} wdrożeń · ${SOCIAL_PROOF.systemsLive} systemów live · ${SOCIAL_PROOF.googleRating} na Google`;

export const PROOF_COMPACT = `${SOCIAL_PROOF.companiesEngaged}+ firm B2B · ${SOCIAL_PROOF.implementationsDelivered} wdrożeń · ${SOCIAL_PROOF.googleRating} na Google`;

export const PROOF_WITH_CAPACITY = `${SOCIAL_PROOF.companiesEngaged}+ firm B2B · ${SOCIAL_PROOF.implementationsDelivered} wdrożeń · ${SOCIAL_PROOF.googleRating} na Google · Max ${SOCIAL_PROOF.maxProjectsMonthly} projekty miesięcznie`;

export const PROOF_OFFER_META = `${SOCIAL_PROOF.implementationsDelivered} wdrożeń | ${SOCIAL_PROOF.googleRating} na Google | Max ${SOCIAL_PROOF.maxProjectsMonthly} projekty miesięcznie`;
