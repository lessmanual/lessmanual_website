interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-sans font-semibold uppercase tracking-wider bg-accent/10 text-accent rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
