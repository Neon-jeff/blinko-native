/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        extralight: ['extralight'],
        light: ['light'],
        regular: ['regular'],
        medium: ['medium'],
        semibold: ['semibold'],
        bold: ['bold'],
        extrabold: ['extrabold']
      }
    },
  },
  plugins: [],
};
