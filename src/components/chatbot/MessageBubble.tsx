'use client'

import React from 'react'
import { ChatMessage } from '@/contexts/ChatContext'
import ReactMarkdown from 'react-markdown'

/**
 * MessageBubble component - Individual message in chat
 *
 * Props:
 * - role: 'user' | 'assistant'
 * - content: Message text (supports markdown for bot messages)
 * - timestamp: Date of message
 *
 * Styling:
 * - User: align right, pear background, night text
 * - Bot: align left, dark gray background, white text
 */
export function MessageBubble({ role, content, timestamp }: ChatMessage): React.ReactElement {
  const isUser = role === 'user'

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      data-testid={`message-bubble-${role}`}
    >
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl
          ${isUser ? 'bg-pear text-night' : 'bg-gray-800 text-white'}
        `}
      >
        {/* Message content */}
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="text-sm prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-pear hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}

        {/* Timestamp */}
        <p className={`text-xs mt-1 ${isUser ? 'text-night/70' : 'text-gray-400'}`}>
          {timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}
