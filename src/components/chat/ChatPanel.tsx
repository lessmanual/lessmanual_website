"use client";

import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatQuickReplies from "./ChatQuickReplies";
import type { ChatMessage as ChatMessageType } from "./useChatStore";

interface ChatPanelProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  userMessageCount: number;
  onSend: (text: string) => void;
  onClose: () => void;
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-bg border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export default function ChatPanel({
  messages,
  isLoading,
  userMessageCount,
  onSend,
  onClose,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-sans font-semibold text-sm text-text">
          LessManual AI
        </span>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-bg transition-colors cursor-pointer"
        >
          <X size={16} className="text-text-secondary" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <div className="text-center text-text-muted text-xs font-sans mt-4 mb-2">
            Czesc! Jak moge Ci pomoc?
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      {/* Quick replies */}
      {userMessageCount === 0 && <ChatQuickReplies onSelect={onSend} />}

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}
