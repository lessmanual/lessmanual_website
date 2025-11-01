'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useChatContext } from '@/contexts/ChatContext'
import { X } from 'lucide-react'
import { MessageList } from './MessageList'
import { InputBar } from './InputBar'

/**
 * ChatWindow component - Main chat interface
 *
 * Desktop: 400px width × 600px height window with border radius
 * Mobile: Full-screen (100vw × 100vh) with no border radius
 */
export function ChatWindow(): JSX.Element {
  const { toggleChat } = useChatContext()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="
        fixed bottom-0 right-0
        w-full h-full
        md:bottom-20 md:right-5
        md:w-[400px] md:h-[600px]
        md:rounded-2xl
        bg-night
        shadow-2xl
        flex flex-col
        overflow-hidden
        z-[9999]
      "
      data-testid="chat-window"
    >
      {/* Header */}
      <header className="
        flex items-center justify-between
        px-4 py-3
        bg-night border-b border-gray-800
      ">
        <h2 className="text-white font-semibold text-lg">
          Chatbot LessManual.ai
        </h2>
        <button
          onClick={toggleChat}
          className="
            p-2 rounded-lg
            hover:bg-gray-800
            transition-colors
            text-gray-400 hover:text-white
          "
          aria-label="Zamknij chatbota"
          data-testid="close-chat-button"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Body - MessageList */}
      <MessageList />

      {/* Footer - InputBar */}
      <footer className="border-t border-gray-800 bg-night">
        <InputBar />
      </footer>
    </motion.div>
  )
}
