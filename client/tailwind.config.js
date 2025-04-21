// client/tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0d6efd',
          dark: '#0052cc',
        },
        secondary: {
          light: '#f39c12',
          DEFAULT: '#e67e22',
          dark: '#d35400',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}