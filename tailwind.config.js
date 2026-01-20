/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['"Fredoka One"', 'cursive'],
        'nunito': ['Nunito', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'sky-light': '#87CEEB',
        'sky-dark': '#add8e6',
      }
    },
  },
  plugins: [],
}
