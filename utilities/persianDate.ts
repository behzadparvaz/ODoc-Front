import moment from 'jalali-moment';

export const persianDate = (date: string) => {
  const persianMonths = {
    Farvardin: 'فروردین',
    Ordibehesht: 'اردیبهشت',
    Khordad: 'خرداد',
    Tir: 'تیر',
    Mordad: 'مرداد',
    Shahrivar: 'شهریور',
    Mehr: 'مهر',
    Aban: 'آبان',
    Azar: 'آذر',
    Dey: 'دی',
    Bahman: 'بهمن',
    Esfand: 'اسفند',
  };

  const persianDays = {
    Sunday: 'یکشنبه',
    Monday: 'دوشنبه',
    Tuesday: 'سه شنبه',
    Wednesday: 'چهارشنبه',
    Thursday: 'پنجشنبه',
    Friday: 'جمعه',
    Saturday: 'شنبه',
  };

  const jalaliDate = moment(date, 'MM/DD/YYYY h:mm:ss A').format(
    'dddd jD jMMMM jYYYY',
  );

  const resultArray = jalaliDate.split(' ');
  const persianDay = persianDays[resultArray[0]];
  const persianMonth = persianMonths[resultArray[2]];

  const toPersianNumber = (str) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/\d/g, (digit) => persianDigits[digit]);
  };

  const persianFinalDate = `${persianDay} ${toPersianNumber(resultArray[1])} ${persianMonth} ${toPersianNumber(resultArray[3])}`;

  return persianFinalDate;
};
