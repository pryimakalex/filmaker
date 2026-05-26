/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#0A0A0B',
        surface: '#141416',
        'surface-elevated': '#1C1C1F',
        border: '#2A2A2E',
        muted: '#8A8A93',
        accent: '#C9A962',
        'accent-muted': '#8B7340',
        danger: '#E05A5A',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
