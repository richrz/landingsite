/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'urbanist': ['Urbanist', 'sans-serif'],
      },
      animation: {
        typing: 'typing 3.5s steps(40, end) infinite'
      },
      keyframes: {
        typing: {
          '0%': { width: '0ch' },
          '100%': { width: '40ch' }
        }
      }
    },
  },
  plugins: [],
} 