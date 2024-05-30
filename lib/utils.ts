import Cookies from 'js-cookie';

export const getDataFromCookies = (key: string) => (Cookies.get(key) ? Cookies.get(key) : null);


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
  
export const convertPersianNumbersToEnglishNumbers = (persianNumbers) => {
    const persianNumbersString = typeof persianNumbers === 'number' ? persianNumbers?.toString() : persianNumbers;
    return persianNumbersString
      ?.replace(/[\u0660-\u0669]/g, function (character) {
        return character?.charCodeAt(0) - 0x0660;
      })
      ?.replace(/[\u06f0-\u06f9]/g, function (character) {
        return character?.charCodeAt(0) - 0x06f0;
      });
  };
  