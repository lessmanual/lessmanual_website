'use client'

import React from 'react'
import { motion } from 'framer-motion'

/**
 * TypingIndicator component - "Bot is typing..." animation
 *
 * Three animated dots with fade in/out sequence
 */
export function TypingIndicator(): React.ReactElement {
  return (
    <div className="flex justify-start mb-4" data-testid="typing-indicator">
      <div className="bg-gray-800 px-4 py-3 rounded-2xl flex items-center gap-1">
        <motion.div
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  )
}
