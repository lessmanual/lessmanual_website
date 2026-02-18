interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  centered = true,
  light = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? "text-center" : ""} mb-16 ${className}`}>
      {eyebrow && (
        <div className={`flex items-center ${centered ? "justify-center" : ""} gap-3 mb-5`}>
          <span className="w-8 h-[2px] bg-accent" />
          <span className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-accent">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className={`font-serif ${light ? "text-white" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-5 text-xl max-w-[680px] ${centered ? "mx-auto" : ""} leading-relaxed ${light ? "text-white/70" : "text-text-secondary"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
