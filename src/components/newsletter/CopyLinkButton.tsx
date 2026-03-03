"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText("https://lessmanual.ai/newsletter");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-text-secondary hover:border-accent/40 hover:text-accent transition-all duration-200"
    >
      {copied ? <Check size={16} /> : <Link2 size={16} />}
      {copied ? "Skopiowano!" : "Kopiuj link"}
    </button>
  );
}
