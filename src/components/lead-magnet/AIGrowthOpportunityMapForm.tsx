"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { EMAIL } from "@/lib/constants";
import {
  GROWTH_MAP_MAX_MINUTES_PER_OCCURRENCE,
  GROWTH_MAP_MAX_WEEKLY_PROCESS_VOLUME,
  GROWTH_MAP_PRIORITY_OPTIONS,
  parseGrowthMapSubmission,
  requiresAfterHoursCallHandling,
} from "@/lib/lead-magnet/growth-map";
import type {
  GrowthMapAfterHoursCallHandling,
  GrowthMapPriority,
  GrowthMapSubmission,
} from "@/lib/lead-magnet/growth-map";

type FormStep = 1 | 2;
type TelephoneAfterHoursCallHandling = Exclude<GrowthMapAfterHoursCallHandling, "not_applicable">;
type GrowthMapFormValues = Omit<GrowthMapSubmission, "afterHoursCallHandling"> & {
  afterHoursCallHandling: TelephoneAfterHoursCallHandling | "";
};

type TextField =
  | "name"
  | "email"
  | "company"
  | "website"
  | "industry"
  | "currentSystems"
  | "bottleneck";

type NumericField = "weeklyProcessVolume" | "minutesPerOccurrence";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string; requestId: string; intakeStatus: string }
  | { status: "error"; message: string };

type IntakeResponse = {
  ok: boolean;
  message: string;
  requestId: string;
  status: string;
  fieldErrors: Record<string, string>;
};

const companyStepFields = ["email", "company", "website"];
const afterHoursCallHandlingOptions: ReadonlyArray<{
  value: TelephoneAfterHoursCallHandling;
  label: string;
}> = [
  { value: "answered_by_owner_or_team", label: "Odbiera właściciel lub zespół" },
  { value: "mostly_missed", label: "Zwykle pozostają nieodebrane" },
  { value: "mixed", label: "Część jest odbierana, część pozostaje nieodebrana" },
  { value: "unknown", label: "Nie wiem, chcę to zmierzyć" },
];

const initialState: GrowthMapFormValues = {
  name: "",
  email: "",
  company: "",
  website: "",
  industry: "",
  currentSystems: "",
  productMode: "not_sure",
  priority: "relieve_team_now",
  bottleneck: "",
  afterHoursCallHandling: "",
  weeklyProcessVolume: 0,
  minutesPerOccurrence: 0,
  notes: "",
  privacyConsent: false,
  researchConsent: false,
};

export function AIGrowthOpportunityMapForm() {
  const [step, setStep] = useState<FormStep>(1);
  const [values, setValues] = useState<GrowthMapFormValues>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [validationMessage, setValidationMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 1) {
      continueToProcessStep();
      return;
    }

    const parsed = parseGrowthMapSubmission(values);

    if (!parsed.ok) {
      setFieldErrors(parsed.fieldErrors);
      setValidationMessage("Uzupełnij oznaczone pola, żebyśmy mogli przygotować mapę na podstawie realnej skali procesu.");
      focusFirstError(parsed.fieldErrors);
      return;
    }

    setFieldErrors({});
    setValidationMessage("");
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/lead-magnet/growth-map", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(parsed.value),
      });
      const intake = normaliseIntakeResponse(await safeJson(response));

      if (!response.ok || !intake.ok) {
        setFieldErrors(intake.fieldErrors);
        setSubmitState({
          status: "error",
          message: intake.message || "Nie udało się przyjąć zgłoszenia. Spróbuj ponownie albo napisz bezpośrednio.",
        });
        focusFirstError(intake.fieldErrors);
        return;
      }

      setSubmitState({
        status: "success",
        message: intake.message,
        requestId: intake.requestId,
        intakeStatus: intake.status,
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Formularz jest chwilowo niedostępny. Spróbuj ponownie albo napisz bezpośrednio.",
      });
    }
  }

  function continueToProcessStep() {
    const parsed = parseGrowthMapSubmission(values);
    const contactErrors = parsed.ok ? {} : pickErrors(parsed.fieldErrors, companyStepFields);

    if (Object.keys(contactErrors).length > 0) {
      setFieldErrors(contactErrors);
      setValidationMessage("Uzupełnij dane firmy i kontakt, zanim przejdziesz dalej.");
      focusFirstError(contactErrors);
      return;
    }

    setFieldErrors({});
    setValidationMessage("");
    setStep(2);
    focusStepHeading();
  }

  function returnToCompanyStep() {
    setFieldErrors({});
    setValidationMessage("");
    setSubmitState({ status: "idle" });
    setStep(1);
    focusStepHeading();
  }

  function updateTextField(field: TextField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    clearFieldError(field);
    if (field === "bottleneck") {
      clearFieldError("afterHoursCallHandling");
    }
  }

  function updateNumericField(field: NumericField, value: number) {
    setValues((current) => ({ ...current, [field]: value }));
    clearFieldError(field);
  }

  function updatePriority(value: GrowthMapPriority) {
    setValues((current) => ({ ...current, priority: value }));
    clearFieldError("priority");
  }

  function updateAfterHoursCallHandling(value: TelephoneAfterHoursCallHandling) {
    setValues((current) => ({ ...current, afterHoursCallHandling: value }));
    clearFieldError("afterHoursCallHandling");
  }

  function updateConsent(field: "privacyConsent" | "researchConsent", checked: boolean) {
    setValues((current) => ({ ...current, [field]: checked }));
    clearFieldError(field);
  }

  function clearFieldError(field: string) {
    setFieldErrors((current) => ({ ...current, [field]: "" }));
    setValidationMessage("");
  }

  return (
    <form
      className="border border-[#E5E5E5] bg-white p-5 shadow-[0_18px_48px_rgba(10,10,10,0.05)] md:p-7"
      style={{ borderRadius: 6 }}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex items-start gap-3 border-b border-[#E5E5E5] pb-5">
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center bg-[#F5EDE6] text-[#8B4513]" style={{ borderRadius: 6 }}>
          <Sparkles size={18} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-[24px] leading-[1.15] text-[#0A0A0A]">Odbierz swoją mapę</h2>
          <p className="mt-2 text-[14px] leading-[1.55] text-[#525252]">
            Odpowiedz na kilka pytań. Gotowy PDF przyjdzie na email.
          </p>
        </div>
      </div>

      <div className="mt-5" aria-label="Postęp formularza">
        <div className="flex items-center justify-between gap-4 text-[12px]">
          <span className="font-medium text-[#0A0A0A]" aria-live="polite">
            {step === 1 ? "Krok 1 z 2" : "Krok 2 z 2"}
          </span>
          <span className="text-[#737373]">{step === 1 ? "Firma i kontakt" : "Proces i skala"}</span>
        </div>
        <div className="mt-2 grid h-1 grid-cols-2 gap-1 bg-[#F5F5F5]" aria-hidden="true">
          <span className="bg-[#B87333]" />
          <span className={step === 2 ? "bg-[#B87333]" : "bg-[#E5E5E5]"} />
        </div>
      </div>

      {step === 1 ? (
        <fieldset className="min-h-[540px] pt-6 md:min-h-[470px]">
          <legend className="sr-only">Dane firmy i kontakt</legend>
          <h3 id="growth-map-step-title" tabIndex={-1} className="text-[18px] font-medium text-[#0A0A0A] focus:outline-none">
            Zacznijmy od firmy
          </h3>
          <p className="mt-1 text-[13px] leading-[1.55] text-[#525252]">
            Strona firmy pozwoli oprzeć rekomendację na publicznie dostępnych faktach.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-x-4 md:grid-cols-2">
            <Field
              label="Imię (opcjonalnie)"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(value) => updateTextField("name", value)}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={fieldErrors.email}
              value={values.email}
              onChange={(value) => updateTextField("email", value)}
            />
            <Field
              label="Firma"
              name="company"
              autoComplete="organization"
              required
              error={fieldErrors.company}
              value={values.company}
              onChange={(value) => updateTextField("company", value)}
            />
            <Field
              label="Strona firmy"
              name="website"
              autoComplete="url"
              inputMode="url"
              placeholder="np. twojafirma.pl"
              required
              error={fieldErrors.website}
              value={values.website}
              onChange={(value) => updateTextField("website", value)}
            />
            <div className="md:col-span-2">
              <Field
                label="Branża (opcjonalnie)"
                name="industry"
                autoComplete="organization-title"
                placeholder="np. produkcja, usługi B2B, e-commerce"
                value={values.industry}
                onChange={(value) => updateTextField("industry", value)}
              />
            </div>
          </div>
        </fieldset>
      ) : (
        <fieldset className="min-h-[540px] pt-6 md:min-h-[470px]">
          <legend className="sr-only">Proces, skala pracy i zgody</legend>
          <h3 id="growth-map-step-title" tabIndex={-1} className="text-[18px] font-medium text-[#0A0A0A] focus:outline-none">
            Pokaż skalę ręcznej pracy
          </h3>
          <p className="mt-1 text-[13px] leading-[1.55] text-[#525252]">
            Przybliżone liczby wystarczą. Posłużą do wskazania procesu, którego efekt można później zmierzyć.
          </p>

          <div className="mt-5">
            <SelectField
              label="Co ma dać pierwsze wdrożenie?"
              name="priority"
              value={values.priority}
              error={fieldErrors.priority}
              onChange={updatePriority}
            />
            <Field
              label="Na jakich systemach pracuje dziś firma?"
              name="currentSystems"
              required
              error={fieldErrors.currentSystems}
              placeholder="np. ClickUp, Google Sheets, HubSpot"
              value={values.currentSystems}
              onChange={(value) => updateTextField("currentSystems", value)}
            />
            <TextAreaField
              label="Co dziś najbardziej blokuje pracę lub wzrost?"
              name="bottleneck"
              required
              error={fieldErrors.bottleneck}
              placeholder="np. każde zapytanie trzeba ręcznie przepisać, sprawdzić i przekazać dalej"
              value={values.bottleneck}
              onChange={(value) => updateTextField("bottleneck", value)}
            />
            {requiresAfterHoursCallHandling(values.bottleneck) ? (
              <AfterHoursCallHandlingField
                value={values.afterHoursCallHandling}
                error={fieldErrors.afterHoursCallHandling}
                onChange={updateAfterHoursCallHandling}
              />
            ) : null}
            <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
              <NumberField
                label="Ile razy w tygodniu ten proces się powtarza?"
                name="weeklyProcessVolume"
                required
                min={1}
                max={GROWTH_MAP_MAX_WEEKLY_PROCESS_VOLUME}
                error={fieldErrors.weeklyProcessVolume}
                placeholder="np. 120"
                value={values.weeklyProcessVolume}
                onChange={(value) => updateNumericField("weeklyProcessVolume", value)}
              />
              <NumberField
                label="Ile minut zajmuje jeden przypadek?"
                name="minutesPerOccurrence"
                required
                min={1}
                max={GROWTH_MAP_MAX_MINUTES_PER_OCCURRENCE}
                error={fieldErrors.minutesPerOccurrence}
                placeholder="np. 15"
                value={values.minutesPerOccurrence}
                onChange={(value) => updateNumericField("minutesPerOccurrence", value)}
              />
            </div>
          </div>

          <div className="mt-2 space-y-2">
            <ConsentCheckbox
              checked={values.privacyConsent}
              error={fieldErrors.privacyConsent}
              label={
                <>
                  Zgadzam się na kontakt w sprawie mapy i otrzymanie PDF na podany email. Zobacz{" "}
                  <Link
                    href="/legal/polityka-prywatnosci"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[#0A0A0A] underline underline-offset-2"
                  >
                    politykę prywatności
                  </Link>
                  .
                </>
              }
              name="privacyConsent"
              onChange={(checked) => updateConsent("privacyConsent", checked)}
            />
            <ConsentCheckbox
              checked={values.researchConsent}
              error={fieldErrors.researchConsent}
              label="Zgadzam się na sprawdzenie strony firmy i innych publicznych źródeł potrzebnych do przygotowania mapy."
              name="researchConsent"
              onChange={(checked) => updateConsent("researchConsent", checked)}
            />
          </div>
        </fieldset>
      )}

      <div className="min-h-[18px]" aria-live="assertive">
        {validationMessage ? (
          <p className="text-[12px] leading-[1.45] text-[#B42318]">{validationMessage}</p>
        ) : null}
      </div>

      <div className="mt-4 flex min-h-[52px] flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step === 2 ? (
          <button
            type="button"
            onClick={returnToCompanyStep}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-[#D4D4D4] bg-white px-5 py-3 text-[14px] font-medium text-[#0A0A0A] transition-[border-color,background-color] duration-200 hover:border-[#0A0A0A] hover:bg-[#FAFAFA]"
            style={{ borderRadius: 4 }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Wstecz
          </button>
        ) : (
          <span aria-hidden="true" />
        )}

        <button
          type="submit"
          disabled={submitState.status === "submitting"}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#0A0A0A] px-6 py-3 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-[1px] hover:bg-[#B87333] disabled:cursor-wait disabled:bg-[#737373] sm:w-auto"
          style={{ borderRadius: 4 }}
        >
          {submitState.status === "submitting" ? (
            <>
              <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden="true" />
              Przygotowuję zgłoszenie…
            </>
          ) : step === 1 ? (
            <>
              Dalej
              <ArrowRight size={16} aria-hidden="true" />
            </>
          ) : (
            <>
              Wyślij mi mapę
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <StatusMessage state={submitState} />

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#E5E5E5] pt-4 text-[12px] leading-[1.5] text-[#525252] md:grid-cols-2">
        <div className="flex items-start gap-2">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#8B4513]" aria-hidden="true" />
          <p>Nie wklejaj haseł, tokenów, danych dokumentów ani danych płatniczych.</p>
        </div>
        <div className="flex items-start gap-2">
          <FileText size={16} className="mt-0.5 shrink-0 text-[#8B4513]" aria-hidden="true" />
          <p>Gotowy PDF przyjdzie na email podany w pierwszym kroku.</p>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  placeholder,
  error,
}: {
  label: string;
  name: TextField;
  value: string;
  onChange: (value: string) => void;
  type?: "email" | "text";
  required?: boolean;
  autoComplete?: string;
  inputMode?: "url";
  placeholder?: string;
  error?: string;
}) {
  const inputId = `growth-map-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="block">
      <label htmlFor={inputId} className="mb-2 block text-[13px] font-medium text-[#0A0A0A]">
        {label}
        {required ? <span className="text-[#B87333]"> *</span> : null}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full border border-[#D4D4D4] bg-[#FAFAFA] px-3 py-3 text-[14px] text-[#0A0A0A] transition-[border-color,box-shadow] duration-200 focus:border-[#B87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333]/30"
        style={{ borderRadius: 6 }}
      />
      <FieldErrorSlot id={errorId} message={error} />
    </div>
  );
}

function NumberField({
  label,
  name,
  value,
  onChange,
  min,
  max,
  placeholder,
  required = false,
  error,
}: {
  label: string;
  name: NumericField;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  const inputId = `growth-map-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="block">
      <label htmlFor={inputId} className="mb-2 block text-[13px] font-medium leading-[1.45] text-[#0A0A0A]">
        {label}
        {required ? <span className="text-[#B87333]"> *</span> : null}
      </label>
      <input
        id={inputId}
        type="number"
        name={name}
        required={required}
        min={min}
        max={max}
        step={1}
        inputMode="numeric"
        placeholder={placeholder}
        value={value > 0 ? value : ""}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))}
        className="min-h-12 w-full border border-[#D4D4D4] bg-[#FAFAFA] px-3 py-3 text-[14px] text-[#0A0A0A] transition-[border-color,box-shadow] duration-200 focus:border-[#B87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333]/30"
        style={{ borderRadius: 6 }}
      />
      <FieldErrorSlot id={errorId} message={error} />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}: {
  label: string;
  name: "bottleneck";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  const inputId = `growth-map-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="block">
      <label htmlFor={inputId} className="mb-2 block text-[13px] font-medium text-[#0A0A0A]">
        {label}
        {required ? <span className="text-[#B87333]"> *</span> : null}
      </label>
      <textarea
        id={inputId}
        name={name}
        required={required}
        rows={3}
        placeholder={placeholder}
        value={value}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y border border-[#D4D4D4] bg-[#FAFAFA] px-3 py-3 text-[14px] text-[#0A0A0A] transition-[border-color,box-shadow] duration-200 focus:border-[#B87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333]/30"
        style={{ borderRadius: 6 }}
      />
      <FieldErrorSlot id={errorId} message={error} />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  error,
  onChange,
}: {
  label: string;
  name: "priority";
  value: GrowthMapPriority;
  error?: string;
  onChange: (value: GrowthMapPriority) => void;
}) {
  const inputId = `growth-map-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="block">
      <label htmlFor={inputId} className="mb-2 block text-[13px] font-medium text-[#0A0A0A]">
        {label} <span className="text-[#B87333]">*</span>
      </label>
      <select
        id={inputId}
        name={name}
        value={value}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        onChange={(event) => {
          const selected = GROWTH_MAP_PRIORITY_OPTIONS.find((option) => option.value === event.target.value);
          if (selected) {
            onChange(selected.value);
          }
        }}
        className="min-h-12 w-full border border-[#D4D4D4] bg-[#FAFAFA] px-3 py-3 text-[14px] text-[#0A0A0A] transition-[border-color,box-shadow] duration-200 focus:border-[#B87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333]/30"
        style={{ borderRadius: 6 }}
      >
        {GROWTH_MAP_PRIORITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldErrorSlot id={errorId} message={error} />
    </div>
  );
}

function AfterHoursCallHandlingField({
  value,
  error,
  onChange,
}: {
  value: TelephoneAfterHoursCallHandling | "";
  error?: string;
  onChange: (value: TelephoneAfterHoursCallHandling) => void;
}) {
  const inputId = "growth-map-afterHoursCallHandling";
  const errorId = `${inputId}-error`;

  return (
    <div className="block">
      <label htmlFor={inputId} className="mb-2 block text-[13px] font-medium text-[#0A0A0A]">
        Co dzieje się z telefonami poza godzinami pracy? <span className="text-[#B87333]">*</span>
      </label>
      <select
        id={inputId}
        name="afterHoursCallHandling"
        required
        value={value}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        onChange={(event) => {
          const selected = afterHoursCallHandlingOptions.find((option) => option.value === event.target.value);
          if (selected) {
            onChange(selected.value);
          }
        }}
        className="min-h-12 w-full border border-[#D4D4D4] bg-[#FAFAFA] px-3 py-3 text-[14px] text-[#0A0A0A] transition-[border-color,box-shadow] duration-200 focus:border-[#B87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333]/30"
        style={{ borderRadius: 6 }}
      >
        <option value="" disabled>
          Wybierz odpowiedź
        </option>
        {afterHoursCallHandlingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldErrorSlot id={errorId} message={error} />
    </div>
  );
}

function ConsentCheckbox({
  name,
  label,
  checked,
  error,
  onChange,
}: {
  name: "privacyConsent" | "researchConsent";
  label: ReactNode;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
}) {
  const inputId = `growth-map-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.55] text-[#525252]">
        <input
          id={inputId}
          type="checkbox"
          name={name}
          required
          checked={checked}
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#8B4513]"
        />
        <span>{label}</span>
      </label>
      <div className="pl-7">
        <FieldErrorSlot id={errorId} message={error} />
      </div>
    </div>
  );
}

function FieldErrorSlot({ id, message }: { id: string; message?: string }) {
  return (
    <span
      id={id}
      className="mt-1 block min-h-[18px] text-[12px] leading-[1.45] text-[#B42318]"
      role={message ? "alert" : undefined}
    >
      {message || ""}
    </span>
  );
}

function StatusMessage({ state }: { state: SubmitState }) {
  if (state.status === "idle" || state.status === "submitting") {
    return <div className="mt-5 min-h-[18px]" aria-live="polite" />;
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-5 border border-[#B87333]/40 bg-[#F5EDE6] p-4"
        style={{ borderRadius: 6 }}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#8B4513]" aria-hidden="true" />
          <div>
            <h3 className="text-[14px] font-medium text-[#0A0A0A]">
              {state.intakeStatus === "queued_for_cloudcso"
                ? "Zgłoszenie przyjęte. Analiza jest następna."
                : "Tryb testowy: zgłoszenie przyjęte"}
            </h3>
            <p className="mt-1 text-[12px] leading-[1.5] text-[#525252]">{state.message}</p>
            <p className="mt-2 text-[12px] leading-[1.5] text-[#525252]">
              Droga do pierwszego mierzalnego wdrożenia: analiza, mapa, decyzja, pilotaż i wynik.
            </p>
            <p className="mt-2 font-mono text-[11px] text-[#737373]">ID zgłoszenia: {state.requestId}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="mt-5 border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-[13px] leading-[1.55] text-[#7F1D1D]"
      style={{ borderRadius: 6 }}
    >
      {state.message} Możesz też napisać na{" "}
      <a href={`mailto:${EMAIL}`} className="font-medium underline-offset-2 hover:underline">
        {EMAIL}
      </a>
      .
    </div>
  );
}

function pickErrors(fieldErrors: Record<string, string>, fields: ReadonlyArray<string>): Record<string, string> {
  return Object.fromEntries(
    fields
      .map((field) => [field, fieldErrors[field]])
      .filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].length > 0),
  );
}

function focusFirstError(fieldErrors: Record<string, string>) {
  const firstField = Object.keys(fieldErrors).find((field) => fieldErrors[field]);
  if (!firstField) {
    return;
  }

  requestAnimationFrame(() => {
    document.getElementById(`growth-map-${firstField}`)?.focus();
  });
}

function focusStepHeading() {
  requestAnimationFrame(() => {
    document.getElementById("growth-map-step-title")?.focus();
  });
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function normaliseIntakeResponse(body: unknown): IntakeResponse {
  if (!isRecord(body)) {
    return {
      ok: false,
      message: "Nieprawidłowa odpowiedź formularza.",
      requestId: "",
      status: "",
      fieldErrors: {},
    };
  }

  return {
    ok: body.ok === true,
    message: readString(body, "message"),
    requestId: readString(body, "requestId"),
    status: readString(body, "status"),
    fieldErrors: readStringRecord(body.fieldErrors),
  };
}

function readString(input: Record<string, unknown>, field: string): string {
  const value = input[field];
  return typeof value === "string" ? value : "";
}

function readStringRecord(input: unknown): Record<string, string> {
  if (!isRecord(input)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(input).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
