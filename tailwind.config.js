/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['VT323', 'monospace'],
      },
      colors: {
        terminator: {
          red: '#ff0000',
          dark: '#8b0000',
          black: '#0a0a0a',
        }
      }
    },
  },
  plugins: [],
}
