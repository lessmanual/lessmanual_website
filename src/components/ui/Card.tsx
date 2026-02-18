"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
}

export function Card({ children, className = "", spotlight = false }: CardProps) {
  return (
    <div
      className={`bg-white border rounded-[6px] transition-colors duration-200 hover:border-accent ${
        spotlight ? "border-l-[3px] border-l-accent border-border" : "border-border"
      } ${className}`}
    >
      {children}
    </div>
  );
}
