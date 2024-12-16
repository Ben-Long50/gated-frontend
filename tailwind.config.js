/** @type {import('tailwindcss').Config} */
import plugin from '@designbycode/tailwindcss-text-shadow';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Exo-regular'],
        logo: ['Omnitrinx', 'Rovelink', 'Inter'],
      },
      clipPath: {
        2: 'polygon(0.5rem 0px, 100% 0px, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0px 100%, 0px 0.5rem)',
        4: 'polygon(1rem 0px, 100% 0px, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0px 100%, 0px 1rem)',
        8: 'polygon(2rem 0px, 100% 0px, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0px 100%, 0px 2rem)',
        12: 'polygon(3rem 0px, 100% 0px, 100% calc(100% - 3rem), calc(100% - 3rem) 100%, 0px 100%, 0px 3rem)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
    function ({ addUtilities, theme }) {
      const clipPath = theme('clipPath');
      const utilities = Object.entries(clipPath).reduce((acc, [key, value]) => {
        acc[`.clip-${key}`] = { clipPath: value };
        return acc;
      }, {});
      addUtilities(utilities);
    },
  ],
};
