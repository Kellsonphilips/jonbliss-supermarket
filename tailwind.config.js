/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './frontend/pages/**/*.{js,ts,jsx,tsx}',
    './frontend/components/**/*.{js,ts,jsx,tsx}',
    './frontend/utils/**/*.{js,ts,jsx,tsx}',
    './frontend/context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'jonbliss-green': '#16a34a',
        'jonbliss-green-dark': '#15803d',
        'jonbliss-green-light': '#22c55e',
        'jonbliss-yellow': '#eab308',
        'jonbliss-yellow-dark': '#ca8a04',
        'jonbliss-yellow-light': '#facc15',
        'red-orange': '#FF4500',
        primary: '#FF4500',
      },
      screens: {
        'xs': '400px',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 