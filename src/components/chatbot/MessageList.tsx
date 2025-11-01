'use client'

import React, { useEffect, useRef } from 'react'
import { useChatContext } from '@/contexts/ChatContext'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

/**
 * MessageList component - Scrollable message history
 *
 * Features:
 * - Auto-scroll to bottom on new message
 * - Shows TypingIndicator when bot is thinking
 * - Displays MessageBubble components for each message
 */
export function MessageList(): JSX.Element {
  const { messages, isLoading } = useChatContext()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-6"
      data-testid="message-list"
    >
      {messages.length === 0 && !isLoading && (
        <div className="flex items-center justify-center h-full text-gray-500 text-center px-4">
          <p>Zadaj pytanie, aby rozpocząć rozmowę</p>
        </div>
      )}

      {messages.map((message, index) => (
        <MessageBubble key={index} {...message} />
      ))}

      {isLoading && <TypingIndicator />}

      {/* Invisible div for auto-scroll */}
      <div ref={messagesEndRef} />
    </div>
  )
}
