"use client";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const LINK_REGEX = /(https?:\/\/[^\s]+)/g;

function renderContent(text: string) {
  const parts = text.split(LINK_REGEX);
  return parts.map((part, i) => {
    if (LINK_REGEX.test(part)) {
      LINK_REGEX.lastIndex = 0;
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-accent text-white rounded-2xl rounded-br-sm"
            : "bg-bg border border-border text-text rounded-2xl rounded-bl-sm"
        }`}
      >
        {renderContent(content)}
      </div>
    </div>
  );
}
