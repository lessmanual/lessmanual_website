import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  count: number;
  className?: string;
}

export function StarRating({ rating, count, className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "text-border"
            }
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="font-mono text-sm font-medium text-text">{rating}</span>
      <span className="text-[0.8125rem] text-text-light">
        · {count} opinii Google
      </span>
    </div>
  );
}
