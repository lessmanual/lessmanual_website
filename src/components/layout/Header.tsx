"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAVIGATION, CALENDLY_URL } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-mono font-medium text-lg tracking-tight">
          <span className="text-text">Less</span>
          <span className="text-accent">Manual</span>
          <span className="text-text">.ai</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAVIGATION.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-sans font-medium text-text-secondary hover:text-text transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-accent text-white text-sm font-sans font-semibold rounded-[6px] hover:bg-accent-hover hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(184,115,51,0.25)] transition-all duration-200"
        >
          Umów rozmowę
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
          aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-bg overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-sans font-medium text-text-secondary hover:text-text transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-accent text-white text-sm font-sans font-semibold rounded-[6px]"
              >
                Umów rozmowę
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
