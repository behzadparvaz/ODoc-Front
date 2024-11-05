const colors = require('tailwindcss/colors');
const clamp = require('@tailwindcss/line-clamp');
const plugin = require('tailwindcss/plugin');
const { colors: colorPallete } = require('./configs/Theme');

const platform = process.env.NEXT_PUBLIC_PLATFORM;
const shouldShowMobileMode =
  platform === 'web' || platform === 'android' || platform === 'ios';

module.exports = {
  mode: 'jit',
  content: [
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
        'background-gradient.white-to-gray': `linear-gradient(to bottom, ${colorPallete.white}, ${colorPallete.gray[50]})`,
        'gradient-nps-1-4': `linear-gradient(to right, ${colorPallete.gray[50]}, ${colorPallete.red[100]})`,
        'gradient-nps-5-6': `linear-gradient(to right, ${colorPallete.gray[50]}, ${colorPallete.yellow[100]})`,
        'gradient-nps-7-8': `linear-gradient(to right, ${colorPallete.gray[50]}, ${colorPallete.gray[100]})`,
        'gradient-nps-9-10': `linear-gradient(to right, ${colorPallete.gray[50]}, ${colorPallete.green[100]})`,
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

      surface: {
        primary: colorPallete.white,
        secondary: colorPallete.gray[50],
        tertiary: colorPallete.gray[100],
        background: {
          primary: colorPallete.gray[50],
          secondary: colorPallete.gray[100],
        },
        disable: colorPallete.gray[50],
        inverse: {
          primary: colorPallete.black,
          secondary: colorPallete.gray[700],
        },
        accent: colorPallete.blue[400],
        negative: colorPallete.red[400],
        warning: colorPallete.yellow[400],
        positive: colorPallete.green[400],
        accentLight: colorPallete.blue[50],
        negativeLight: colorPallete.red[50],
        warningLight: colorPallete.yellow[50],
        positiveLight: colorPallete.green[50],
        overlay: {
          dark: '#0000004D',
          light: '#0000001F',
        },
      },
      content: {
        primary: colorPallete.black,
        secondary: colorPallete.gray[600],
        tertiary: colorPallete.gray[500],
        disabled: colorPallete.gray[400],
        onInverse: colorPallete.white,
        accent: colorPallete.blue[400],
        negative: colorPallete.red[400],
        warning: colorPallete.yellow[400],
        positive: colorPallete.green[400],
        onBrand: colorPallete.white,
        onAccent: colorPallete.white,
        onNegative: colorPallete.white,
        onWarning: colorPallete.black,
        onPositive: colorPallete.white,
      },
      border: {
        primary: colorPallete.gray[200],
        inversePrimary: colorPallete.gray[700],
        selected: colorPallete.gray[700],
        focus: colorPallete.gray[700],
        accent: colorPallete.blue[200],
        negative: colorPallete.red[200],
        warning: colorPallete.yellow[200],
        positive: colorPallete.green[200],
      },
      brand: {
        tapsi: colorPallete.orange[400],
      },
      ...colorPallete,
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
