"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { OBS_KLIENTA_FAQ_ITEMS, OBS_KLIENTA_CALENDLY_URL } from "@/lib/obsluga-klienta-constants";

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-sans font-medium text-text pr-4 group-hover:text-accent transition-colors">
          {q}
        </span>
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          className={`text-text-light shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-text-secondary text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="FAQ" title="Pytania, które dostajemy najczęściej" />
        </FadeUp>

        <div className="space-y-10 mb-12">
          {OBS_KLIENTA_FAQ_ITEMS.map((category, catIdx) => (
            <FadeUp key={category.category}>
              <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-text-light mb-4">
                {category.category}
              </h3>
              <div>
                {category.items.map((item, itemIdx) => (
                  <FAQItem
                    key={item.q}
                    q={item.q}
                    a={item.a}
                    defaultOpen={catIdx === 0 && itemIdx === 0}
                  />
                ))}
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-4">Masz inne pytanie?</p>
            <Button href={OBS_KLIENTA_CALENDLY_URL} external>
              Masz inne pytanie? Porozmawiajmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
