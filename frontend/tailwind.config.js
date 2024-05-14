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
        'navBlue':'#7af0ff',
        'navPurple':"#504cfc",
        'navPurpleDarker':"#4844E2",
        'secondary':'#212529',
        'secondaryDark':'#11112c',
        'backgroundDark':'#000000',
        'backgroundDarkSecond':'#11112c',
        'dimWhite':" rgba(239, 239, 239, 0.75)",
      },
    },
  },
  plugins: [],
  darkMode:'selector'
}

