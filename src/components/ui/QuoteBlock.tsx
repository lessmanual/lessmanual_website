interface QuoteBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function QuoteBlock({ children, className = "" }: QuoteBlockProps) {
  return (
    <blockquote
      className={`bg-white border-l-[3px] border-l-accent rounded-r-[6px] px-6 py-5 italic text-text-secondary ${className}`}
    >
      {children}
    </blockquote>
  );
}
