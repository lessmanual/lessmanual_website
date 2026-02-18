"use client";

const QUICK_REPLIES = [
  "Czym sie zajmujecie?",
  "Ile to kosztuje?",
  "Jak szybko zobacze wyniki?",
  "Chce umowic rozmowe",
];

interface ChatQuickRepliesProps {
  onSelect: (text: string) => void;
}

export default function ChatQuickReplies({ onSelect }: ChatQuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {QUICK_REPLIES.map((text) => (
        <button
          key={text}
          onClick={() => onSelect(text)}
          className="border border-accent text-accent text-xs font-sans px-3 py-1.5 rounded-full transition-colors hover:bg-accent hover:text-white cursor-pointer"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
