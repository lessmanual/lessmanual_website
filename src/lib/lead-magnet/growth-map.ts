export type GrowthMapProductMode =
  | "content_machine"
  | "customer_operations_ai"
  | "premium_cold_email_plus"
  | "hot_lead_catcher"
  | "generator_ofert"
  | "custom_agentic_workflow"
  | "not_sure";

export type GrowthMapPriority =
  | "relieve_team_now"
  | "generate_more_leads"
  | "improve_customer_service"
  | "speed_up_offers"
  | "systemise_content"
  | "spot_buying_signals"
  | "custom_project";

export type GrowthMapAfterHoursCallHandling =
  | "answered_by_owner_or_team"
  | "mostly_missed"
  | "mixed"
  | "unknown"
  | "not_applicable";

export type GrowthMapPriorityOption = {
  value: GrowthMapPriority;
  label: string;
  description: string;
};

export type GrowthMapSubmission = {
  name: string;
  email: string;
  company: string;
  website: string;
  industry: string;
  currentSystems: string;
  productMode: "not_sure";
  priority: GrowthMapPriority;
  bottleneck: string;
  afterHoursCallHandling: GrowthMapAfterHoursCallHandling;
  weeklyProcessVolume: number;
  minutesPerOccurrence: number;
  notes: string;
  privacyConsent: boolean;
  researchConsent: boolean;
};

export type GrowthMapValidationResult =
  | { ok: true; value: GrowthMapSubmission }
  | { ok: false; fieldErrors: Record<string, string> };

export type GrowthMapManualEmail = {
  subject: string;
  body: string;
};

export type CloudCsoGrowthMapPayload = {
  recordType: "cloudcso_lead_magnet_request";
  source: "lessmanual_website";
  version: "2026-07-12-v11";
  requestId: string;
  submittedAt: string;
  lead: {
    name: string;
    email: string;
    company: string;
    website: string;
    industry: string;
  };
  request: {
    productMode: "not_sure";
    priority: GrowthMapPriority;
    currentSystems: ReadonlyArray<string>;
    bottleneck: string;
    afterHoursCallHandling: GrowthMapAfterHoursCallHandling;
    weeklyProcessVolume: number;
    minutesPerOccurrence: number;
    notes: string;
  };
  consent: {
    privacy: true;
    publicResearch: true;
  };
  delivery: {
    expectedDocument: "branded_pdf";
    expectedChannel: "email";
    cta: "cal_com_button_inside_pdf";
  };
};

export const GROWTH_MAP_PRIORITY_OPTIONS: ReadonlyArray<GrowthMapPriorityOption> = [
  {
    value: "relieve_team_now",
    label: "Odciążyć zespół teraz",
    description: "Brakuje czasu na nowych klientów, social media, follow-upy albo ręczną obsługę.",
  },
  {
    value: "generate_more_leads",
    label: "Pozyskiwać więcej zapytań",
    description: "Firma potrzebuje więcej rozmów z właściwymi klientami.",
  },
  {
    value: "improve_customer_service",
    label: "Usprawnić obsługę klienta",
    description: "Za dużo pytań wraca do ludzi, a odpowiedzi są wolne albo nierówne jakościowo.",
  },
  {
    value: "speed_up_offers",
    label: "Szybciej ofertować",
    description: "Wyceny i oferty zajmują za dużo czasu albo giną bez follow-upu.",
  },
  {
    value: "systemise_content",
    label: "Uporządkować tworzenie treści",
    description: "Firma publikuje nieregularnie albo treści nie wspierają sprzedaży.",
  },
  {
    value: "spot_buying_signals",
    label: "Wcześniej wykrywać zainteresowanie zakupem",
    description: "Firma chce zauważać sygnały zakupowe przed konkurencją.",
  },
  {
    value: "custom_project",
    label: "Usprawnić inny proces",
    description: "Masz nietypowy proces i chcesz sprawdzić, jak AI może go usprawnić lub przejąć jego powtarzalną część.",
  },
];

const PRIORITY_VALUES: ReadonlyArray<GrowthMapPriority> = GROWTH_MAP_PRIORITY_OPTIONS.map((option) => option.value);
const TELEPHONE_AFTER_HOURS_CALL_HANDLING_VALUES: ReadonlyArray<
  Exclude<GrowthMapAfterHoursCallHandling, "not_applicable">
> = ["answered_by_owner_or_team", "mostly_missed", "mixed", "unknown"];

export const GROWTH_MAP_MAX_WEEKLY_PROCESS_VOLUME = 1_000_000;
export const GROWTH_MAP_MAX_MINUTES_PER_OCCURRENCE = 1_440;
export const GROWTH_MAP_TEXT_LIMITS: Readonly<{
  name: number;
  email: number;
  company: number;
  website: number;
  industry: number;
  currentSystems: number;
  bottleneck: number;
  notes: number;
}> = {
  name: 100,
  email: 254,
  company: 160,
  website: 500,
  industry: 160,
  currentSystems: 500,
  bottleneck: 1_200,
  notes: 800,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENSITIVE_PATTERN = /\b(hasło|password|token|api key|apikey|secret|sekret|pesel|dowód|dowodu|karta|card number)\b/i;
const TELEPHONE_BOTTLENECK_PATTERN = /telefon|połącze|dzwon/iu;

export function requiresAfterHoursCallHandling(bottleneck: string): boolean {
  return TELEPHONE_BOTTLENECK_PATTERN.test(bottleneck);
}

export function parseGrowthMapSubmission(input: unknown): GrowthMapValidationResult {
  if (!isRecord(input)) {
    return {
      ok: false,
      fieldErrors: {
        form: "Nieprawidłowy format formularza.",
      },
    };
  }

  const fieldErrors: Record<string, string> = {};
  const name = readString(input, "name");
  const email = readString(input, "email");
  const company = readString(input, "company");
  const rawWebsite = readString(input, "website");
  const industry = readString(input, "industry");
  const currentSystems = readString(input, "currentSystems");
  const rawPriority = readString(input, "priority");
  const bottleneck = readString(input, "bottleneck");
  const rawAfterHoursCallHandling = readString(input, "afterHoursCallHandling");
  const weeklyProcessVolume = readNumber(input, "weeklyProcessVolume");
  const minutesPerOccurrence = readNumber(input, "minutesPerOccurrence");
  const notes = readString(input, "notes");
  const privacyConsent = input.privacyConsent === true;
  const researchConsent = input.researchConsent === true;
  addTextLengthError(fieldErrors, "name", name, GROWTH_MAP_TEXT_LIMITS.name);
  addTextLengthError(fieldErrors, "email", email, GROWTH_MAP_TEXT_LIMITS.email);
  addTextLengthError(fieldErrors, "company", company, GROWTH_MAP_TEXT_LIMITS.company);
  addTextLengthError(fieldErrors, "website", rawWebsite, GROWTH_MAP_TEXT_LIMITS.website);
  addTextLengthError(fieldErrors, "industry", industry, GROWTH_MAP_TEXT_LIMITS.industry);
  addTextLengthError(fieldErrors, "currentSystems", currentSystems, GROWTH_MAP_TEXT_LIMITS.currentSystems);
  addTextLengthError(fieldErrors, "bottleneck", bottleneck, GROWTH_MAP_TEXT_LIMITS.bottleneck);
  addTextLengthError(fieldErrors, "notes", notes, GROWTH_MAP_TEXT_LIMITS.notes);

  const website = fieldErrors.website ? "" : normaliseWebsite(rawWebsite);
  let afterHoursCallHandling: GrowthMapAfterHoursCallHandling = "not_applicable";

  if (!fieldErrors.email && !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Podaj poprawny adres e-mail.";
  }

  if (!fieldErrors.company && company.length < 2) {
    fieldErrors.company = "Podaj nazwę firmy.";
  }

  if (!fieldErrors.website && !website) {
    fieldErrors.website = "Podaj poprawny adres strony firmowej.";
  }

  if (!fieldErrors.currentSystems && parseCurrentSystems(currentSystems).length === 0) {
    fieldErrors.currentSystems = "Wymień systemy używane w firmie albo wpisz „brak”.";
  }

  if (!isOneOf(rawPriority, PRIORITY_VALUES)) {
    fieldErrors.priority = "Wybierz priorytet.";
  }

  if (!fieldErrors.bottleneck && bottleneck.length < 12) {
    fieldErrors.bottleneck = "Opisz krótko, co dziś najbardziej blokuje wzrost.";
  }

  if (!fieldErrors.bottleneck && requiresAfterHoursCallHandling(bottleneck)) {
    if (isOneOf(rawAfterHoursCallHandling, TELEPHONE_AFTER_HOURS_CALL_HANDLING_VALUES)) {
      afterHoursCallHandling = rawAfterHoursCallHandling;
    } else {
      fieldErrors.afterHoursCallHandling = "Wybierz, co dzieje się z telefonami poza godzinami pracy.";
    }
  }

  if (!isPositiveIntegerAtMost(weeklyProcessVolume, GROWTH_MAP_MAX_WEEKLY_PROCESS_VOLUME)) {
    fieldErrors.weeklyProcessVolume = "Podaj liczbę czynności lub elementów w tygodniu, od 1 do 1 000 000.";
  }

  if (!isPositiveIntegerAtMost(minutesPerOccurrence, GROWTH_MAP_MAX_MINUTES_PER_OCCURRENCE)) {
    fieldErrors.minutesPerOccurrence = "Podaj liczbę minut potrzebnych na jedną czynność, od 1 do 1440.";
  }

  if (!privacyConsent) {
    fieldErrors.privacyConsent = "Potwierdź zgodę na kontakt w sprawie mapy.";
  }

  if (!researchConsent) {
    fieldErrors.researchConsent = "Potwierdź zgodę na sprawdzenie publicznych źródeł firmy.";
  }

  if (
    !fieldErrors.currentSystems &&
    !fieldErrors.bottleneck &&
    !fieldErrors.notes &&
    SENSITIVE_PATTERN.test(`${currentSystems}\n${bottleneck}\n${notes}`)
  ) {
    fieldErrors.notes = "Nie wklejaj haseł, tokenów, danych dokumentów ani danych płatniczych.";
  }

  if (Object.keys(fieldErrors).length > 0 || !website || !isOneOf(rawPriority, PRIORITY_VALUES)) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      company,
      website,
      industry,
      currentSystems,
      productMode: "not_sure",
      priority: rawPriority,
      bottleneck,
      afterHoursCallHandling,
      weeklyProcessVolume,
      minutesPerOccurrence,
      notes,
      privacyConsent,
      researchConsent,
    },
  };
}

export function buildCloudCsoGrowthMapPayload(
  submission: GrowthMapSubmission,
  requestId: string,
  submittedAt: string,
): CloudCsoGrowthMapPayload {
  return {
    recordType: "cloudcso_lead_magnet_request",
    source: "lessmanual_website",
    version: "2026-07-12-v11",
    requestId,
    submittedAt,
    lead: {
      name: submission.name,
      email: submission.email,
      company: submission.company,
      website: submission.website,
      industry: submission.industry,
    },
    request: {
      productMode: submission.productMode,
      priority: submission.priority,
      currentSystems: parseCurrentSystems(submission.currentSystems),
      bottleneck: submission.bottleneck,
      afterHoursCallHandling: submission.afterHoursCallHandling,
      weeklyProcessVolume: submission.weeklyProcessVolume,
      minutesPerOccurrence: submission.minutesPerOccurrence,
      notes: submission.notes,
    },
    consent: {
      privacy: true,
      publicResearch: true,
    },
    delivery: {
      expectedDocument: "branded_pdf",
      expectedChannel: "email",
      cta: "cal_com_button_inside_pdf",
    },
  };
}

export function buildGrowthMapManualEmail(submission: GrowthMapSubmission): GrowthMapManualEmail {
  const priorityLabel =
    GROWTH_MAP_PRIORITY_OPTIONS.find((option) => option.value === submission.priority)?.label ??
    "Usprawnić proces";
  const afterHoursLine =
    submission.afterHoursCallHandling === "not_applicable"
      ? ""
      : `\nTelefony poza godzinami pracy: ${afterHoursCallHandlingLabel(submission.afterHoursCallHandling)}`;

  return {
    subject: `Mapa pierwszego procesu AI: ${submission.company}`,
    body: [
      "Cześć,",
      "",
      "chcę otrzymać mapę pierwszego procesu AI dla mojej firmy.",
      "",
      `Firma: ${submission.company}`,
      `Strona: ${submission.website}`,
      `Branża: ${submission.industry || "nie podano"}`,
      `Osoba kontaktowa: ${submission.name || "nie podano"}`,
      `Adres kontaktowy: ${submission.email}`,
      "",
      `Priorytet: ${priorityLabel}`,
      `Systemy: ${submission.currentSystems}`,
      `Największe ograniczenie: ${submission.bottleneck}${afterHoursLine}`,
      `Skala tygodniowa: ${submission.weeklyProcessVolume}`,
      `Czas jednego przypadku: ${submission.minutesPerOccurrence} min`,
      `Dodatkowy kontekst: ${submission.notes || "brak"}`,
      "",
      "Potwierdzam zgodę na kontakt w sprawie mapy oraz sprawdzenie publicznych źródeł firmy.",
    ].join("\n"),
  };
}

function addTextLengthError(
  fieldErrors: Record<string, string>,
  field: string,
  value: string,
  maximum: number,
) {
  if (value.length > maximum) {
    fieldErrors[field] = `To pole może mieć maksymalnie ${maximum} znaków.`;
  }
}

function afterHoursCallHandlingLabel(value: Exclude<GrowthMapAfterHoursCallHandling, "not_applicable">): string {
  switch (value) {
    case "answered_by_owner_or_team":
      return "odbiera właściciel lub zespół";
    case "mostly_missed":
      return "zwykle pozostają nieodebrane";
    case "mixed":
      return "część jest odbierana, część pozostaje nieodebrana";
    case "unknown":
      return "nie wiem, chcę to zmierzyć";
  }
}

function readString(input: Record<string, unknown>, field: string): string {
  const value = input[field];
  return typeof value === "string" ? value.trim() : "";
}

function readNumber(input: Record<string, unknown>, field: string): number {
  const value = input[field];
  return typeof value === "number" ? value : Number.NaN;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOneOf<T extends string>(value: string, allowed: ReadonlyArray<T>): value is T {
  return allowed.some((allowedValue) => allowedValue === value);
}

function isPositiveIntegerAtMost(value: number, maximum: number): boolean {
  return Number.isInteger(value) && value > 0 && value <= maximum;
}

function parseCurrentSystems(value: string): ReadonlyArray<string> {
  const systems: string[] = [];
  const seen = new Set<string>();

  for (const candidate of value.split(/[,;\n]+/)) {
    const system = candidate.trim();
    const key = system.toLocaleLowerCase("pl");
    if (system && !seen.has(key)) {
      systems.push(system);
      seen.add(key);
    }
  }

  return systems;
}

function normaliseWebsite(value: string): string {
  const candidate = value.includes("://") ? value : `https://${value}`;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}
