import * as shamsi from 'shamsi-date-converter';
import moment from 'jalali-moment';

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

export const convertRialToToman = (rialPrice: number) => {
  if (rialPrice) {
    const tomanPrice = Math?.floor(rialPrice / 10);
    return `${tomanPrice?.toLocaleString('fa-IR')} تومان`;
  } else if (rialPrice === 0) return 0;
  else return null;
};

export const getDynamicText = (text: string, words: {}): string => {
  try {
    return Object?.keys(words)?.reduce((prev, current) => {
      const regex = new RegExp(`{${current}}`, 'g');
      return prev?.replace(regex, words[current]);
    }, text);
  } catch (err) {
    console.log(err);
  }
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

export const formattingDate = (date: Date) => {
  return moment(date).format('jYYYY/jMM/jDD');
};

export const convertDateToTimestamp = (date: string) => {
  return (new Date(moment.from(date, 'fa', 'YYYY/MM/DD').format())).getTime();
};
