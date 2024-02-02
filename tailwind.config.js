/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "0px",
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1440px",
      },
      colors: {
        'd-purple': '#6034b2',
        'w-purple': '#815fc1',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
  },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },

  plugins: [
    function({ addComponents }) {
      addComponents({
        '.btn': {
          '@apply relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' :{},
        },
        '.btn-in': {
          '@apply relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0': {},
        }
      })
    }
  ],
}