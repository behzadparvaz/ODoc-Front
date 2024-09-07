const colors = require('tailwindcss/colors');
const clamp = require('@tailwindcss/line-clamp');
const plugin = require('tailwindcss/plugin');

const platform = process.env.NEXT_PUBLIC_PLATFORM;
const shouldShowMobileMode = platform === 'web' || platform === 'android' || platform === 'ios';

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{html,css,js}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      aspectRatio: {
        23: '23',
      },
    },
    screens: {
      xs: 0,
      sm: '412px',
      md: shouldShowMobileMode ? '100000px' : '960px',
      lg: shouldShowMobileMode ? '110000px' : '1280px',
      xl: shouldShowMobileMode ? '120000px' : '1920px',
      infinite: '130000px',
    },
    fontSize: {
      '2xs': '.625rem',
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: shouldShowMobileMode ? '1.125rem' : '1.25rem',
      '2xl': shouldShowMobileMode ? '1.125rem' : '1.5rem',
      '3xl': shouldShowMobileMode ? '1.125rem' : '1.875rem',
      '4xl': shouldShowMobileMode ? '1.125rem' : '2.25rem',
      '5xl': shouldShowMobileMode ? '1.125rem' : '3rem',
      '6xl': shouldShowMobileMode ? '1.125rem' : '4rem',
      '7xl': shouldShowMobileMode ? '1.125rem' : '5rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      background: '#F6F6F6',
      primary: {
        DEFAULT: '#02A0A4',
        default: '#02A0A4',
        dark: '#046b6d',
        light: 'rgba(2, 160, 164, 0.04)',
        100: '#D0E5E6',
        300: '#CBE4EB',
        400: '#A9DBDC',
        800: '#008385'
      },
      red: {
        50: '#FAECEE',
        100: '#FCDBE0',
        200: '#FFC1C9',
        300: '#FF9BAA',
        400: '#FF627A',
        500: '#FF3151',
        600: '#F01436',
        700: '#CA0B29',
        800: '#A70D25',
        900: '#8A1225',
        950: '#4B040F',
      },
      teal: {
        50: '#E5F8F8',
        100: '#BEFAF4',
        200: '#87F9F0',
        300: '#4CF0E9',
        400: '#1CDCD9',
        500: '#07C4C5',
        600: '#02A0A4',
        700: '#07797E',
        800: '#0B6064',
        900: '#0E5053',
        950: '#002F33',
      },
      grey: {
        0: '#E0E0E0',
        50: '#F5F7F7',
        100: '#EAEDED',
        200: '#E1E3E3',
        300: '#CACCCC',
        400: '#B1B2B2',
        500: '#747575',
        600: '#535454',
        700: '#323333',
        800: '#1F1F1F',
        900: '#141414',
        950: '#060606',
      },
      green: {
        50: '#E8F5E9',
        100: '#C8E6C8',
        200: '#A5D7A5',
        300: '#81C882',
        400: '#66BC67',
        500: '#4CB04C',
        600: '#43A143',
        700: '#378F38',
        800: '#2D7E2E',
        900: '#195F1C',
      },
      surface: {
        50: '#E8F5E9',
        100: '#C8E6C8',
        200: '#A5D7A5',
        300: '#81C882',
        400: '#66BC67',
        500: '#4CB04C',
        600: '#43A143',
        700: '#378F38',
        800: '#048848',
        900: '#03703C',
      },
      orange: {
        50: '#fff8ed',
        100: '#fff0d4',
        200: '#ffdca8',
        300: '#ffc271',
        400: '#ff9e38',
        500: '#fd8012',
        600: '#f7690a',
        700: '#c54b09',
        800: '#9d3b0f',
        900: '#7e3210',
        950: '#441706',
      },
      yellow: {
        50: '#fefce8',
        100: '#fdfac4',
        200: '#fdf28b',
        300: '#fbe349',
        400: '#f8d018',
        500: '#e8b70a',
        600: '#c88d06',
        700: '#a06508',
        800: '#84500f',
        900: '#704113',
        950: '#412107',
      },
      blue: {
        50: '#ebf6ff',
        100: '#dbecff',
        200: '#bedcff',
        300: '#97c3ff',
        400: '#6e9fff',
        500: '#4d7bff',
        600: '#284efe',
        700: '#2140e1',
        800: '#1e38b5',
        900: '#21378e',
        950: '#131e53',
      },
    },
    boxShadow: {
      sm: '0px 0px 1px rgba(22, 22, 22, 0.04), 0px 1px 2px rgba(22, 22, 22, 0.04)',
      practicalTop: '0 -1px 10px #dfdfdf',
      DEFAULT: '0px 1px 2px rgba(22, 22, 22, 0.04), 0px 1px 4px rgba(22, 22, 22, 0.04)',
      md: '0px 2px 4px -1px rgba(22, 22, 22, 0.04), 0px 4px 8px -1px rgba(22, 22, 22, 0.04)',
      lg: '0px 4px 6px -2px rgba(22, 22, 22, 0.06), 0px 8px 12px -4px rgba(22, 22, 22, 0.06)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      invert: '0px -2px 4px -1px rgba(22, 22, 22, 0.04), 0px -4px 8px -1px rgba(22, 22, 22, 0.04)',
      none: 'none',
    },
    animation: {
      'pulse-fast': 'pulse 1s infinite',
    },
  },
  variants: {
    padding: ['responsive', 'important'],
    boxShadow: ['responsive', 'important'],
    fill: ['hover', 'focus'],
    height: ['responsive', 'hover', 'focus', 'important'],
    minHeight: ['responsive', 'hover', 'focus', 'important'],
  },
  plugins: [
    clamp,
    plugin(function ({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
};
