/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        dark: {
          DEFAULT: '#0a0a0a',
          950: '#050505',
          900: '#0a0a0a',
          800: '#111111',
          700: '#161616',
          600: '#1c1c1c',
          500: '#242424',
          400: '#3a3a3a',
          300: '#555555',
          200: '#888888',
          100: '#aaaaaa',
        },
        brand: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          light: '#3b82f6',
          accent: '#60a5fa',
        },
      },
      boxShadow: {
        'header': '0 4px 32px rgba(99,102,241,0.25), 0 2px 16px rgba(168,85,247,0.2), 0 1px 8px rgba(236,72,153,0.15)',
        'header-scrolled': '0 6px 40px rgba(99,102,241,0.45), 0 4px 24px rgba(168,85,247,0.35), 0 2px 16px rgba(236,72,153,0.3)',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marqueeReverse 35s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
