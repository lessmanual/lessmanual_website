"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center justify-center px-9 py-4 bg-accent text-white font-sans font-semibold text-base rounded-lg hover:bg-accent-hover hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(184,115,51,0.3)] transition-all duration-200",
  secondary:
    "inline-flex items-center justify-center px-8 py-3.5 border-2 border-border text-text font-sans font-medium text-base rounded-lg hover:border-accent hover:text-accent transition-all duration-200",
  text: "inline-flex items-center gap-1.5 font-sans font-medium text-base text-text-secondary hover:text-accent transition-colors duration-200 group",
};

function getEventName(href: string): string | null {
  if (href.includes("cal.com")) return "cta_book_meeting";
  if (href.startsWith("mailto:")) return "cta_email";
  if (href.includes("#kalkulator") || href.includes("#roi-calculator"))
    return "cta_calculator";
  if (href.includes("#wyniki")) return "cta_see_results";
  return null;
}

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const cls = `${variants[variant]} ${className}`;

  const handleClick = () => {
    const eventName = getEventName(href);
    if (eventName) {
      trackEvent(eventName, {
        button_variant: variant,
        button_url: href,
        page_location:
          typeof window !== "undefined" ? window.location.pathname : "",
      });
    }
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={handleClick}
      >
        {children}
        {variant === "text" && (
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={handleClick}>
      {children}
      {variant === "text" && (
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </Link>
  );
}
