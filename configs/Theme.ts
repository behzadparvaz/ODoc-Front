export const colors = {
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
    0: '#FFFFFF',
    50: '#F6F6F6',
    100: '#E7E7E7',
    200: '#D1D1D1',
    300: '#B0B0B0',
    400: '#888888',
    500: '#6D6D6D',
    600: '#5D5D5D',
    700: '#4F4F4F',
    800: '#3D3D3D',
    900: '#111111',
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
  white: '#FFFFFF',
  black: '#000000',
};

export const getColors = (intent: 'bg' | 'text' | 'border') => {
  return {
    //primary
    primary_50: `${intent}-red-50`,
    primary_100: `${intent}-red-100`,
    primary_200: `${intent}-red-200`,
    primary_300: `${intent}-red-300`,
    primary_400: `${intent}-red-400`,
    primary_500: `${intent}-red-500`,
    primary_600: `${intent}-red-600`,
    primary_700: `${intent}-red-700`,
    primary_800: `${intent}-red-800`,
    primary_900: `${intent}-red-900`,
    //secondary
    secondary_50: `${intent}-teal-50`,
    secondary_100: `${intent}-teal-100`,
    secondary_200: `${intent}-teal-200`,
    secondary_300: `${intent}-teal-300`,
    secondary_400: `${intent}-teal-400`,
    secondary_500: `${intent}-teal-500`,
    secondary_600: `${intent}-teal-600`,
    secondary_700: `${intent}-teal-700`,
    secondary_800: `${intent}-teal-800`,
    secondary_900: `${intent}-teal-900`,
    //tertiary
    tertiary_50: `${intent}-grey-50`,
    tertiary_100: `${intent}-grey-100`,
    tertiary_200: `${intent}-grey-200`,
    tertiary_300: `${intent}-grey-300`,
    tertiary_400: `${intent}-grey-400`,
    tertiary_500: `${intent}-grey-500`,
    tertiary_600: `${intent}-grey-600`,
    tertiary_700: `${intent}-grey-700`,
    tertiary_800: `${intent}-grey-800`,
    tertiary_900: `${intent}-grey-900`,
    white: `${intent}-white`,
    transparent: `${intent}-transparent`,
  };
};
