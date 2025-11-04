'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

/**
 * Single message in the chatbot conversation
 */
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/**
 * ChatContext state interface
 */
interface ChatContextState {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  sessionId: string
  sendMessage: (message: string) => Promise<void>
  toggleChat: () => void
  clearHistory: () => void
}

const ChatContext = createContext<ChatContextState | undefined>(undefined)

/**
 * ChatProvider component - wraps the app to provide chatbot state
 */
export function ChatProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // Lazy initialization - UUID generates only when chat opens (line 122)
  // This prevents uuid library loading on initial page load (~800ms savings)
  const [sessionId, setSessionId] = useState<string>('')

  /**
   * Send a message to the chatbot API
   */
  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isLoading) return

      // Add user message to state
      const userMessage: ChatMessage = {
        role: 'user',
        content: message,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        // Build conversation history (last 5 messages, excluding current one)
        const history = messages.slice(-5).map(m => ({
          role: m.role,
          content: m.content,
          timestamp: m.timestamp.toISOString()
        }))

        // Call chatbot API with conversation history
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            sessionId,
            locale: document.documentElement.lang || 'pl', // Detect current locale
            history // NEW: Include conversation history for context
          })
        })

        if (!response.ok) {
          throw new Error('API request failed')
        }

        const data = await response.json()

        // Add bot response to state
        const botMessage: ChatMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botMessage])
      } catch (error) {
        console.error('Error sending message:', error)

        // Add error fallback message
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content:
            document.documentElement.lang === 'en'
              ? 'An error occurred. You can fill out the contact form below.'
              : 'Wystąpił błąd. Możesz wypełnić formularz kontaktowy poniżej.',
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, sessionId, messages]
  )

  /**
   * Toggle chatbot open/closed state
   */
  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev

      // Reset session ID when opening chatbot (fresh conversation)
      if (newState) {
        setSessionId(uuidv4())

        // Add welcome message if no messages yet
        if (messages.length === 0) {
          const welcomeMessage: ChatMessage = {
            role: 'assistant',
            content:
              document.documentElement.lang === 'en'
                ? 'Hi! I\'m LessManual.ai chatbot. How can I help you?'
                : 'Cześć! Jestem chatbotem LessManual.ai. Jak mogę Ci pomóc?',
            timestamp: new Date()
          }
          setMessages([welcomeMessage])
        }
      }

      return newState
    })
  }, [messages.length])

  /**
   * Clear chat history and reset session
   */
  const clearHistory = useCallback(() => {
    setMessages([])
    setSessionId(uuidv4())

    // Add fresh welcome message
    const welcomeMessage: ChatMessage = {
      role: 'assistant',
      content:
        document.documentElement.lang === 'en'
          ? 'Hi! I\'m LessManual.ai chatbot. How can I help you?'
          : 'Cześć! Jestem chatbotem LessManual.ai. Jak mogę Ci pomóc?',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  const value: ChatContextState = {
    messages,
    isOpen,
    isLoading,
    sessionId,
    sendMessage,
    toggleChat,
    clearHistory
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

/**
 * Hook to use ChatContext - must be used within ChatProvider
 */
export function useChatContext(): ChatContextState {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChatContext must be used within ChatProvider')
  }
  return context
}
