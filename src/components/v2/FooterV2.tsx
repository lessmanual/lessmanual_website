"use client";

import Image from "next/image";
import Link from "next/link";
import { CALENDLY_URL, EMAIL } from "@/lib/constants";

export function FooterV2() {
  return (
    <footer className="bg-white border-t border-[#E5E5E5]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolumna 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/v2" className="flex items-center gap-2 w-fit">
              <Image
                src="/logo-icon.png"
                alt="LessManual"
                width={24}
                height={24}
                className="shrink-0"
              />
              <span className="text-[14px] font-medium tracking-tight text-[#0A0A0A]">
                lessmanual<span className="text-[#B87333]">.</span>ai
              </span>
            </Link>
            <p className="text-[13px] leading-[1.55] text-[#525252]">
              Agenci AI dla firm B2B.
            </p>
            <p className="font-mono text-[11px] text-[#A3A3A3]">
              © 2026 LessManual.ai
            </p>
          </div>

          {/* Kolumna 2: Systemy */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#525252] mb-1">
              Systemy
            </div>
            <FooterLink href="/oferta/hot-lead-catcher">Hot Lead Catcher</FooterLink>
            <FooterLink href="/oferta/pipeline-machine">Pipeline Machine</FooterLink>
            <FooterLink href="/oferta/seo-content">SEO Content</FooterLink>
            <FooterLink href="/oferta/obsluga-klienta">Obsługa Klienta</FooterLink>
            <FooterLink href="/oferta/generator-ofert">Generator Ofert</FooterLink>
          </div>

          {/* Kolumna 3: Firma */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#525252] mb-1">
              Firma
            </div>
            <FooterLink href="/o-nas">O nas</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/kontakt">Kontakt</FooterLink>
          </div>

          {/* Kolumna 4: Kontakt */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#525252] mb-1">
              Kontakt
            </div>
            <Link
              href={`mailto:${EMAIL}`}
              className="text-[13px] text-[#525252] hover:text-[#B87333] transition-colors duration-200"
            >
              {EMAIL}
            </Link>
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#525252] hover:text-[#B87333] transition-colors duration-200"
            >
              Zarezerwuj rozmowę →
            </Link>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-[#E5E5E5] mt-12 pt-6 flex flex-col md:flex-row justify-between gap-2">
          <span className="font-mono text-[11px] text-[#A3A3A3]">
            Cendrowice · NIP 1231589909
          </span>
          <span className="font-mono text-[11px] text-[#A3A3A3]">
            Built with Claude · Vercel · Supabase
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[13px] text-[#525252] hover:text-[#B87333] transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
