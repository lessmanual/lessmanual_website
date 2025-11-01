'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatContext } from '@/contexts/ChatContext'
import { ChatWindow } from './ChatWindow'
import { MessageCircle } from 'lucide-react'

/**
 * ChatWidget component - Floating button + chat window container
 *
 * Features:
 * - Fixed position: bottom-right (20px from edges)
 * - Z-index: 9999 (above all content)
 * - Mobile: full-screen when open
 * - Desktop: 400px × 600px window
 * - Animated open/close with Framer Motion
 */
export function ChatWidget(): JSX.Element {
  const { isOpen, toggleChat } = useChatContext()

  return (
    <>
      {/* Chat Window - conditionally rendered with AnimatePresence */}
      <AnimatePresence>
        {isOpen && <ChatWindow />}
      </AnimatePresence>

      {/* Floating Button - always visible unless chat is open on mobile */}
      <motion.button
        onClick={toggleChat}
        className={`
          fixed bottom-5 right-5
          w-14 h-14
          rounded-full
          bg-pear
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all
          z-[10000]
          ${isOpen ? 'md:flex hidden' : 'flex'}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Otwórz chatbota"
        data-testid="chat-widget-button"
      >
        <MessageCircle className="w-6 h-6 text-night" />
      </motion.button>
    </>
  )
}
