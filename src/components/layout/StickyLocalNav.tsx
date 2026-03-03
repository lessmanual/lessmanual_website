"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItem {
  name: string;
  href: string;
}

export function StickyLocalNav({ items }: { items: NavItem[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Show local nav only after scrolling past the main hero
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Intersection Observer logic for highlighting active item
      const sections = items.map(item => item.href.replace("#", ""));
      let currentActive = "";
      
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset to account for fixed headers (64px main + ~50px local)
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentActive = id;
            break;
          }
        }
      }
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, activeSection]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      // header (64px) + local nav (~50px) = 114px offset
      const y = element.getBoundingClientRect().top + window.scrollY - 114;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          // Top 16 (64px) because the main header is h-16
          className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-sm hidden md:block"
        >
          <div className="max-w-[1240px] mx-auto px-6 h-12 flex items-center gap-6 overflow-x-auto scrollbar-hide">
            <span className="text-xs font-mono font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
              Na tej stronie:
            </span>
            <div className="w-px h-4 bg-border" />
            <nav className="flex items-center gap-6">
              {items.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-text-secondary hover:text-text"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}