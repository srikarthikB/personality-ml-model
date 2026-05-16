/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Outfit is the single unified font for ALL UI elements
        sans:    ['"Outfit"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        body:    ['"Outfit"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void:    '#050508',
        surface: '#0b0b12',
        panel:   '#0f0f1c',
        border:  '#1a1a2e',
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        plasma: '#c084fc',
        ember:  '#f472b6',
      },
      animation: {
        'pulse-slow':     'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':      'spin 8s linear infinite',
        'float':          'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
    },
  },
  plugins: [],
}
