import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          950: '#0a0a0c',
          900: '#111114',
          850: '#161619',
          800: '#1c1c20',
          700: '#252529',
          600: '#2e2e36',
          500: '#3f3f48',
          400: '#52525b',
          300: '#71717a',
        },
        accent: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
          muted: '#1e3a5f',
        },
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.3)',
        'card': '0 2px 8px rgba(0,0,0,0.2)',
        'elevated': '0 8px 24px rgba(0,0,0,0.3)',
        'accent': '0 0 20px rgba(59,130,246,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
