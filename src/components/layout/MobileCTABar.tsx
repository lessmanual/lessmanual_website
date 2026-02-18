"use client";

import { CALENDLY_URL } from "@/lib/constants";

export function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-bg/95 backdrop-blur-md border-t border-border px-4 py-3">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full px-5 py-3 bg-accent text-white text-sm font-sans font-semibold rounded-[6px]"
      >
        Umów bezpłatną rozmowę
      </a>
    </div>
  );
}
