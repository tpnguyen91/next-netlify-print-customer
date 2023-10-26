/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.tsx'],
  theme: {
    screens: {
      sm: '360px', // => @media (min-width: 360px) { ... }
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '1280px' // => @media (min-width: 1280px) { ... }
    },
    extend: {}
  },
  plugins: []
})
