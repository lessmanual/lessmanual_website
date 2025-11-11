'use client'

import { motion } from 'framer-motion'

/**
 * Range Slider Component
 *
 * Reusable slider input for ROI Calculator questions.
 *
 * Features:
 * - Animated value display
 * - Min/max labels
 * - Pear-colored thumb and track
 * - Responsive design
 *
 * @param {Object} props
 * @param {string} props.label - Question label
 * @param {number} props.value - Current value
 * @param {function} props.onChange - Change handler
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number} props.step - Step increment
 * @param {string} props.unit - Unit label (e.g., "PLN", "h", "%")
 * @returns {React.ReactElement}
 */

interface RangeSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
}

export function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = ''
}: RangeSliderProps): React.ReactElement {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-white mb-2">
        {label}
      </label>

      {/* Value Display */}
      <motion.div
        className="text-3xl font-bold text-pear mb-4"
        key={value}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {value.toLocaleString('pl-PL')} {unit}
      </motion.div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-pear focus:ring-offset-2 focus:ring-offset-night
          "
          style={{
            background: `linear-gradient(to right,
              #DDE000 0%,
              #DDE000 ${percentage}%,
              rgba(255,255,255,0.1) ${percentage}%,
              rgba(255,255,255,0.1) 100%)`
          }}
        />

      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-white/50 mt-2">
        <span>{min.toLocaleString('pl-PL')}</span>
        <span>{max.toLocaleString('pl-PL')}</span>
      </div>
    </div>
  )
}
