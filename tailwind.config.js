const colors = require('tailwindcss/colors');
const clamp = require('@tailwindcss/line-clamp');
const plugin = require('tailwindcss/plugin');

const platform = process.env.NEXT_PUBLIC_PLATFORM;
const shouldShowMobileMode =
  platform === 'web' || platform === 'android' || platform === 'ios';

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
      backgroundImage: {
        'surface-Gradient.brand': `linear-gradient(to right, #FF7733, #FF5722,#E54917)`,
        'surface-Gradient.brand-light': `linear-gradient(to right, #FFF0E9, #F4F1F0)`,
        'surface-Gradient.blue': `linear-gradient(to right, #D8E1EB, #F0F5F4)`,
        'surface-Gradient.red': `linear-gradient(to right, #FFDEDC, #F8EEED)`,
        'surface-Gradient.gray': `linear-gradient(to right, #EAEDED, #F5F7F7)`,
        'surface-Gradient.white': `linear-gradient(to bottom,  #FFFFFF00,#FFFFFF)`,
        'surface-Gradient.tip': `linear-gradient(to right,  #DEF0E7,#DDE8EE,#EFEBE9)`,
        'background-gradient.white-to-gray': `linear-gradient(to bottom, ${colors.white}, ${colors.gray[50]})`,
        'gradient-nps-1-4': `linear-gradient(to right, ${colors.gray[50]}, ${colors.red[100]})`,
        'gradient-nps-5-6': `linear-gradient(to right, ${colors.gray[50]}, ${colors.yellow[100]})`,
        'gradient-nps-7-8': `linear-gradient(to right, ${colors.gray[50]}, ${colors.gray[100]})`,
        'gradient-nps-9-10': `linear-gradient(to right, ${colors.gray[50]}, ${colors.green[100]})`,
      },
    },
    screens: {
      xs: 0,
      sm: '412px',
      md: shouldShowMobileMode ? '100000px' : '510px',
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

      surface: {
        primary: colors.white,
        secondary: colors.gray[50],
        tertiary: colors.gray[100],
        background: {
          primary: colors.gray[50],
          secondary: colors.gray[100],
        },
        disabled: colors.gray[100],
        inverse: {
          primary: colors.black,
          secondary: colors.gray[700],
        },
        accent: colors.blue[400],
        nagative: colors.red[400],
        warning: colors.yellow[400],
        positive: colors.green[400],
        accentLight: colors.blue[50],
        nagativeLight: colors.red[50],
        warningLight: colors.yellow[50],
        positiveLight: colors.green[50],
        overlay: {
          dark: '#0000004D',
          light: '#0000001F',
        },
      },
      content: {
        primary: colors.black,
        secondary: colors.gray[600],
        tertiary: colors.gray[500],
        disabled: colors.gray[400],
        onInverse: colors.white,
        accent: colors.blue[400],
        nagative: colors.red[400],
        warning: colors.yellow[400],
        positive: colors.green[400],
        onBrand: colors.white,
        onAccent: colors.white,
        onNagative: colors.white,
        onWarning: colors.black,
        onPositive: colors.white,
      },
      border: {
        primary: colors.gray[200],
        inversePrimary: colors.gray[700],
        selected: colors.gray[700],
        focus: colors.gray[700],
        accent: colors.blue[200],
        nagative: colors.red[200],
        warning: colors.yellow[200],
        positive: colors.green[200],
      },
      brand: {
        tapsi: colors.orange[400],
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
      /// above color should be deleted

      red: {
        50: '#FFEFED',
        100: '#FED7D2',
        200: '#F1998E',
        300: '#E85C4A',
        400: '#E11900',
        500: '#AB1300',
        600: '#870F00',
        700: '#5A0A00',
        900: '#402926',
      },

      gray: {
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
      },

      grey: {
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
      },

      green: {
        50: '#E6F2ED',
        100: '#ADDEC9',
        200: '#66D19E',
        300: '#06C167',
        400: '#048848',
        500: '#03703C',
        600: '#03582F',
        700: '#10462D',
        900: '#24332C',
      },

      yellow: {
        50: '#FFFAF0',
        100: '#FFF2D9',
        200: '#FFE3AC',
        300: '#FFCF70',
        400: '#FFC043',
        500: '#E49E15',
        600: '#996F00',
        700: '#674D1B',
        900: '#332E24',
      },

      orange: {
        50: '#FFF0E9',
        100: '#FFD5C2',
        200: '#FFAC8A',
        300: '#FF8C61',
        400: '#FF7140',
        500: '#E55C2E',
        600: '#A64221',
        700: '#662A14',
        900: '#422E28',
      },

      indigo: {
        50: '#F3F2FE',
        100: '#C6C0F9',
        200: '#9B90F2',
        300: '#7163E8',
        400: '#4A38DB',
        500: '#483AB8',
        600: '#443997',
        700: '#3D3678',
        900: '#2C2942',
      },

      blue: {
        50: '#EFF3FE',
        100: '#D4E2FC',
        200: '#A0BFF8',
        300: '#5B91F5',
        400: '#276EF1',
        500: '#1E54B7',
        600: '#174291',
        700: '#143166',
        900: '#262F40',
      },
    },

    boxShadow: {
      sm: '0px 0px 1px rgba(22, 22, 22, 0.04), 0px 1px 2px rgba(22, 22, 22, 0.04)',
      practicalTop: '0 -1px 10px #dfdfdf',
      DEFAULT:
        '0px 1px 2px rgba(22, 22, 22, 0.04), 0px 1px 4px rgba(22, 22, 22, 0.04)',
      md: '0px 2px 4px -1px rgba(22, 22, 22, 0.04), 0px 4px 8px -1px rgba(22, 22, 22, 0.04)',
      lg: '0px 4px 6px -2px rgba(22, 22, 22, 0.06), 0px 8px 12px -4px rgba(22, 22, 22, 0.06)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      invert:
        '0px -2px 4px -1px rgba(22, 22, 22, 0.04), 0px -4px 8px -1px rgba(22, 22, 22, 0.04)',
      none: 'none',
      fab: '0x 4px 16px 0px rgba(0, 0, 0, 0.1)',
      card: '0x 4px 16px 0px rgba(0, 0, 0, 0.2)',
      'payment-card': '10x 40px 64px 12px rgba(17, 54, 129, 0.06)',
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
