/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    // Le reset "preflight" est désactivé pour ne pas modifier l'apparence
    // des pages déjà stylées avec les CSS modules : seules les classes
    // utilitaires (bg-*, flex, grid, rounded...) sont générées.
    preflight: false
  },
  theme: {
    extend: {}
  },
  plugins: []
};
