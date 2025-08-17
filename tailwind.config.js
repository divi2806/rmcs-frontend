/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'game-black': '#000000',
        'game-red': '#C0413B',
        'game-red-light': '#C5504A',
        'game-gray': '#D7D7D7',
        'game-white': '#FFFFFF',
      },
      fontFamily: {
        'jersey': ['Jersey 25', 'cursive'],
        'niagara': ['Niagara Engraved', 'cursive'],
      },
    },
  },
  plugins: [],
}
