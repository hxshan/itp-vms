/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'actionBlue': '#2962ff',
        'actionGreen':'#00c853',
        'actionRed':'#D50000',
        'navGreen':'#00bfa5',
        'navHoverGreen':'#00bfa5',
        'secondary':'#212529',
        'secondaryDark':'#141414',
        'backgroundDark':'#282828',
        'dimWhite':" rgba(239, 239, 239, 0.75)",
      },
    },
  },
  plugins: [],
  darkMode:'selector'
}

