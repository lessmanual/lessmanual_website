import type { Config } from 'tailwindcss'
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  breakpoints,
  zIndex,
  container,
} from './src/lib/design-tokens'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Safelist classes used in dynamic content from Supabase (blog posts)
  safelist: [
    'text-night',
    'bg-pear',
    'bg-pear/90',
    'text-pear',
    'text-white',
    'text-white/80',
    'text-white/70',
    'text-white/50',
    'bg-gradient-to-r',
    'from-pear/10',
    'to-tekhelet/10',
    'border-pear/30',
    'hover:underline',
    'hover:bg-pear/90',
  ],
  theme: {
    extend: {
      colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      spacing,
      borderRadius,
      boxShadow: shadows,
      transitionDuration: animations.duration,
      transitionTimingFunction: animations.easing,
      screens: breakpoints,
      zIndex,
      container: {
        center: true,
        padding: '1rem',
        screens: container,
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
