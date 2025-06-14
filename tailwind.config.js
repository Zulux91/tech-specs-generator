/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a202c',
        'card-bg': '#374151',
        'card-border': '#4b5563',
      }
    },
  },
  plugins: [],
}
