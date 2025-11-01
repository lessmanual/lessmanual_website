'use client'

import React, { useState, useRef, KeyboardEvent } from 'react'
import { useChatContext } from '@/contexts/ChatContext'
import { Send } from 'lucide-react'

/**
 * InputBar component - Text input + send button
 *
 * Features:
 * - Auto-resize textarea (1-4 lines)
 * - Enter to send, Shift+Enter for new line
 * - Max 1000 characters
 * - Disabled while bot is typing
 */
export function InputBar(): JSX.Element {
  const { sendMessage, isLoading } = useChatContext()
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = async () => {
    if (!message.trim() || isLoading) return

    await sendMessage(message)
    setMessage('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    // Max 1000 characters
    if (value.length > 1000) return

    setMessage(value)

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px` // Max 4 lines (~96px)
    }
  }

  return (
    <div className="p-4 flex items-end gap-2" data-testid="input-bar">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Zadaj pytanie..."
        disabled={isLoading}
        rows={1}
        className="
          flex-1 px-3 py-2
          bg-gray-800 text-white
          rounded-lg
          resize-none
          outline-none
          focus:ring-2 focus:ring-pear
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder:text-gray-500
        "
        data-testid="chat-input"
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        className="
          p-3 rounded-lg
          bg-pear text-night
          hover:bg-pear/90
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        "
        aria-label="Wyślij wiadomość"
        data-testid="send-button"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  )
}
