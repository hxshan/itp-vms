/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'actionBlue': '#4D49FF',
        'actionGreen':'#10971D',
        'actionRed':'#FF1212',
        'navGreen':'#37A000',
        'navHoverGreen':'#3AA701',
        'secondary':'#212529',
      },
    },
    
  },
  plugins: [],
}

