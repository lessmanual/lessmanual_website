"use client";

import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ChatPanel from "./ChatPanel";
import { useChatStore } from "./useChatStore";
import { trackEvent } from "@/lib/analytics";

export default function ChatWidget() {
  const { messages, isLoading, isOpen, userMessageCount, toggle, close, sendMessage } =
    useChatStore();

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => {
          if (!isOpen) {
            trackEvent("chat_opened", { page_location: window.location.pathname });
          }
          toggle();
        }}
        aria-label={isOpen ? "Zamknij czat" : "Otworz czat"}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-45 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
      >
        <MessageCircle size={24} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile: full screen overlay */}
            <motion.div
              key="chat-panel-mobile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-[60] md:hidden"
            >
              <ChatPanel
                messages={messages}
                isLoading={isLoading}
                userMessageCount={userMessageCount}
                onSend={sendMessage}
                onClose={close}
              />
            </motion.div>

            {/* Desktop: floating card */}
            <motion.div
              key="chat-panel-desktop"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="hidden md:block fixed bottom-24 right-8 z-45 w-[380px] h-[520px]"
            >
              <ChatPanel
                messages={messages}
                isLoading={isLoading}
                userMessageCount={userMessageCount}
                onSend={sendMessage}
                onClose={close}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
