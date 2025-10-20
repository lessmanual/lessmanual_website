import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#0C0D0A',      // Primary background (dark mode)
        white: '#FEFEFE',      // Primary text (dark mode)
        pear: '#DDE000',       // CTA, accents, logo
        tekhelet: '#5716A2',   // Decorative only (icons, borders)
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
