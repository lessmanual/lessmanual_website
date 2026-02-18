"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function TextRotator({
  words,
  interval = 3000,
  className = "",
}: TextRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-accent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
