/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          609: '#9963a3',
          610: '#ddc7e4',
          750: '#4a044e',
          752: '#e374bc',
          751: '#8d0171',
          753: '#f7daec'
        }
      }
    },
  },
  plugins: [],
}
