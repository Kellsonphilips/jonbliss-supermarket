/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './frontend/**/*.{js,ts,jsx,tsx,mdx}',
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
        'primary': '#FF4500',
        // Social Media Brand Colors
        'google-blue': '#4285F4',
        'facebook-blue': '#1877F2',
        'facebook-hover': '#166FE5',
        'apple-black': '#000000',
        'twitter-blue': '#1DA1F2',
        'twitter-hover': '#1A91DA',
        'github-dark': '#24292E',
        'github-hover': '#1F2328',
        'microsoft-blue': '#00A4EF',
        'microsoft-hover': '#0098DB',
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