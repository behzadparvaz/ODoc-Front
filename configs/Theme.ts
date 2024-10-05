export const colors = {
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
  white: '#FFFFFF',
  black: '#000000',
};

export const getColors = (
  intent:
    | 'surface'
    | 'content'
    | 'border'
    | 'brand'
    | 'surface-Gradient'
    | 'background-gradient',
) => {
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
