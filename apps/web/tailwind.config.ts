import type { Config } from 'tailwindcss'

/**
 * Identidade GM Bovinos — azul institucional (`primary`) + couro (`accent`).
 * `brand` (teal) permanece reservado ao WhatsApp.
 */
const config: Partial<Config> = {
  theme: {
    extend: {
      borderRadius: {
        box: '0.75rem',
        control: '0.5rem',
        media: '0.5rem',
      },
      colors: {
        brand: {
          500: '#01a3a4',
          600: '#01898a',
          700: '#017174',
          contrast: '#079992',
        },
        primary: {
          300: '#60A5FA',
          500: '#2563EB',
          700: '#1E3A8A',
        },
        /** Couro / dourado terra — linhas, eyebrows e detalhes premium. */
        accent: {
          300: '#E6C589',
          400: '#D6A14A',
          500: '#B5832B',
          600: '#8A6320',
          700: '#6A4B17',
        },
        gray: {
          100: '#F3F4F6',
          300: '#D1D5DB',
          600: '#4B5563',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
