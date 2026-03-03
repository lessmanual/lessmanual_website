"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";

export function NewsletterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rodoConsent, setRodoConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rodoConsent) return;

    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase.from("newsletter_subscribers").insert([
      {
        name: name.trim() || null,
        email: email.trim().toLowerCase(),
        source: "landing_page",
        status: "active",
        rodo_consent: true,
      },
    ]);

    if (error) {
      if (error.code === "23505") {
        trackEvent("newsletter_subscribe_duplicate", { source: "landing_page" });
        router.push("/newsletter/dziekujemy");
        return;
      }
      setStatus("error");
      setErrorMsg("Coś poszło nie tak. Spróbuj ponownie.");
      return;
    }

    trackEvent("newsletter_subscribe", { source: "landing_page" });
    router.push("/newsletter/dziekujemy");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-border rounded-[6px] p-8 md:p-10"
    >
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Imię"
          autoComplete="given-name"
          className="sm:w-[140px] border border-border rounded-lg px-5 py-3.5 text-text font-sans placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Twój najlepszy email"
          autoComplete="email"
          className="flex-1 border border-border rounded-lg px-5 py-3.5 text-text font-sans placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={status === "loading" || !rodoConsent}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-sans font-semibold text-base rounded-lg hover:bg-accent-hover hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.3)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none whitespace-nowrap"
        >
          {status === "loading" ? "Zapisuję..." : "Zapisz się za darmo"}
        </button>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={rodoConsent}
          onChange={(e) => setRodoConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-accent cursor-pointer"
        />
        <span className="text-xs text-text-light leading-relaxed">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
          otrzymywania newslettera AI Insider. Możesz się wypisać w dowolnym
          momencie.{" "}
          <a
            href="/legal/polityka-prywatnosci"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Polityka prywatności
          </a>
        </span>
      </label>

      <p className="mt-3 text-xs text-text-muted">
        Zero spamu. Wypisz się jednym klikiem.
      </p>

      {errorMsg && (
        <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
      )}
    </form>
  );
}
