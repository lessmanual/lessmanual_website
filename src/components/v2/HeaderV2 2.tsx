"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CALENDLY_URL } from "@/lib/constants";

type ProductLink = { title: string; href: string; tagline: string };

const PRODUCT_LINKS: ProductLink[] = [
  {
    title: "Hot Lead Catcher",
    href: "/oferta/hot-lead-catcher",
    tagline: "Agent łapie gorące leady z 8 źródeł.",
  },
  {
    title: "Pipeline Machine",
    href: "/oferta/pipeline-machine",
    tagline: "Spotkania z decydentami B2B pay-per-meeting.",
  },
  {
    title: "Content Machine",
    href: "/oferta/content-machine",
    tagline: "Blog, który pisze się sam. 10-30 artykułów/mies.",
  },
  {
    title: "Obsługa Klienta",
    href: "/oferta/obsluga-klienta",
    tagline: "Chatbot + WhatsApp + email + voice. 24/7.",
  },
  {
    title: "Generator Ofert",
    href: "/oferta/generator-ofert",
    tagline: "Klient sam wycenia. PDF leci mailem w 5 min.",
  },
];

export function HeaderV2() {
  const pathname = usePathname() || "/";
  const onHome = pathname === "/";

  // Anchor links: na / scrollują, na podstronach linkują do /#anchor
  const anchor = (section: string) => (onHome ? `#${section}` : `/#${section}`);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E5E5] bg-[#FAFAFA]/85 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="LessManual"
            width={28}
            height={28}
            className="shrink-0"
            priority
          />
          <span className="text-[14px] font-medium tracking-tight text-[#0A0A0A]">
            lessmanual<span className="text-[#B87333]">.</span>ai
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px]">
          <Link href={anchor("systems")} className="v2-link py-3 inline-block">Systemy</Link>
          <OfertaDropdown />
          <Link href={anchor("proces")} className="v2-link py-3 inline-block">Proces</Link>
          <Link href={anchor("pricing")} className="v2-link py-3 inline-block">Cennik</Link>
          <Link href="/faq" className="v2-link py-3 inline-block">FAQ</Link>
          <Link href="/o-nas" className="v2-link py-3 inline-block">O nas</Link>
          <Link href="/kontakt" className="v2-link py-3 inline-block">Kontakt</Link>
        </nav>

        <Link
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#0A0A0A] px-4 py-3 text-[13px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2"
          style={{ borderRadius: 4 }}
        >
          Rozmowa <span>→</span>
        </Link>
      </div>
    </header>
  );
}

function OfertaDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("keydown", onEsc);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="v2-link inline-flex items-center gap-1 py-3"
      >
        Oferta
        <span
          aria-hidden="true"
          className="text-[10px] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 mt-2 w-[360px] border border-[#E5E5E5] bg-white shadow-[0_12px_40px_rgba(10,10,10,0.08)]"
          style={{ borderRadius: 6 }}
        >
          <ul className="flex flex-col py-2">
            {PRODUCT_LINKS.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-[#FAFAFA] transition-colors"
                >
                  <div className="text-[13px] font-medium text-[#0A0A0A]">
                    {p.title}
                  </div>
                  <div className="mt-0.5 text-[12px] leading-[1.45] text-[#525252]">
                    {p.tagline}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#E5E5E5] px-4 py-3">
            <Link
              href="/#systems"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]"
            >
              Zobacz wszystkie systemy →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
