'use client'

/**
 * Number Input Component
 *
 * Reusable number input for ROI Calculator questions (e.g., hourly wage).
 *
 * Features:
 * - Formatted number display
 * - Unit suffix
 * - Pear accent on focus
 *
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {number} props.value - Current value
 * @param {function} props.onChange - Change handler
 * @param {string} props.unit - Unit suffix (e.g., "PLN/h")
 * @param {string} props.placeholder - Placeholder text
 * @returns {JSX.Element}
 */

interface NumberInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  unit?: string
  placeholder?: string
}

export function NumberInput({
  label,
  value,
  onChange,
  unit = '',
  placeholder = '0'
}: NumberInputProps): React.ReactElement {
  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-white mb-2">
        {label}
      </label>

      {/* Input Container */}
      <div className="relative">
        <input
          type="number"
          min="0"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          placeholder={placeholder}
          className="
            w-full px-4 py-3 bg-white/5 border-2 border-pear/20
            rounded-lg text-white text-lg font-semibold
            focus:outline-none focus:border-pear focus:ring-2 focus:ring-pear/50
            transition-all duration-300
            placeholder:text-white/30
          "
        />

        {/* Unit Suffix */}
        {unit && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-sm pointer-events-none">
            {unit}
          </div>
        )}
      </div>
    </div>
  )
}
