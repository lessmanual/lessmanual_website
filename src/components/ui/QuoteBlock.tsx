interface QuoteBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function QuoteBlock({ children, className = "" }: QuoteBlockProps) {
  return (
    <blockquote
      className={`bg-white border-l-[3px] border-l-accent rounded-r-[6px] px-8 py-6 italic text-lg text-text-secondary ${className}`}
    >
      {children}
    </blockquote>
  );
}
