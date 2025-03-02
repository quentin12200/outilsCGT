// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cgt-red': {
          DEFAULT: '#b71c1c',
          dark: '#7f0000',
          light: '#f05545',
        },
      },
    },
  },
  plugins: [],
}