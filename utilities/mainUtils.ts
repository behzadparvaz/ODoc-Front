import * as shamsi from 'shamsi-date-converter';
import moment from 'moment-jalaali';

export const convertPersianNumbersToEnglishNumbers = (persianNumbers) => {
  const persianNumbersString =
    typeof persianNumbers === 'number'
      ? persianNumbers?.toString()
      : persianNumbers;
  return persianNumbersString
    ?.replace(/[\u0660-\u0669]/g, function (character) {
      return character?.charCodeAt(0) - 0x0660;
    })
    ?.replace(/[\u06f0-\u06f9]/g, function (character) {
      return character?.charCodeAt(0) - 0x06f0;
    });
};

export const convertGregorianToJalali = (date: string) => {
  const shamsiDate = date
    ? shamsi?.gregorianToJalali(new Date(date))?.join('/')
    : null;
  return shamsiDate;
};

export const getTime = (time: string) => {
  const formattedTime = time ? moment(time).format('HH:mm') : null;
  return formattedTime;
};
