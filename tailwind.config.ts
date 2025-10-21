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
