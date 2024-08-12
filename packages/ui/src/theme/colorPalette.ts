export const colorPalette = {
  grey: {
    50: '#F4F4F4',
    100: '#E0E0E0',
    200: '#C1C1C1',
    400: '#9A9A9A',
    600: '#606060',
    1000: '#000000',
  },
  orange: {
    50: '#FFF7F5',
    100: '#FFEEEA',
    200: '#FFCFC2',
    300: '#FEAF99',
    400: '#FE805C',
    500: '#FF6136',
  },
  green: {
    50: '#D9FFCC',
    300: '#8CE16D',
    500: '#54BA30',
  },
  red: {
    50: '#FFD9D8',
    300: '#FBA5A2',
    500: '#EF6D68',
  },
  white: '#FFFFFF',
};

export const getColors = (intent: 'bg' | 'text' | 'border') => {
  return {
    //primary
    primary_50: `${intent}-orange-50`,
    primary_100: `${intent}-orange-100`,
    primary_200: `${intent}-orange-200`,
    primary_300: `${intent}-orange-300`,
    primary_400: `${intent}-orange-400`,
    primary_500: `${intent}-orange-500`,
    primary_600: `${intent}-orange-600`,
    //secondary
    secondary_50: `${intent}-grey-50`,
    secondary_100: `${intent}-grey-100`,
    secondary_200: `${intent}-grey-200`,
    secondary_400: `${intent}-grey-400`,
    secondary_600: `${intent}-grey-600`,
    secondary_1000: `${intent}-grey-1000`,
    //success
    success_50: `${intent}-green-50`,
    success_300: `${intent}-green-300`,
    success_500: `${intent}-green-500`,
    //error
    error_50: `${intent}-red-50`,
    error_300: `${intent}-red-300`,
    error_500: `${intent}-red-500`,
    //other
    white: `${intent}-white`,
    transparent: `${intent}-transparent`,
  };
};
