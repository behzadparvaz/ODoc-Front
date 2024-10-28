import moment from 'jalali-moment';

type PersianDateProps = {
  date: string;
  isShownTime?: boolean;
};

export const persianDate = ({ date, isShownTime }: PersianDateProps) => {
  const persianMonths = {
    Farvardin: 'فروردین',
    Ordibehesht: 'اردیبهشت',
    Khordaad: 'خرداد',
    Tir: 'تیر',
    Amordaad: 'مرداد',
    Shahrivar: 'شهریور',
    Mehr: 'مهر',
    Aabaan: 'آبان',
    Aazar: 'آذر',
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

  const toPersianNumber = (str) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/\d/g, (digit) => persianDigits[digit]);
  };
  const timeDate = moment(date, 'MM/DD/YYYY h:mm:ss A').locale('fa');
  const jalaliDate = moment(date, 'MM/DD/YYYY h:mm:ss A').format(
    'dddd jD jMMMM jYYYY',
  );

  const today = moment().startOf('day');
  const inputDate = moment(date, 'MM/DD/YYYY h:mm:ss A').startOf('day');
  const diffDays = today.diff(inputDate, 'days');

  const time = toPersianNumber(timeDate.format('HH:mm'));

  if (diffDays === 0) {
    return `امروز ${isShownTime ? '- ساعت ' + time : ''}`;
  } else if (diffDays === 1) {
    return `دیروز ${isShownTime ? '- ساعت ' + time : ''}`;
  } else if (diffDays < 7) {
    const resultArray = jalaliDate.split(' ');
    const persianDay = persianDays[resultArray[0]];
    const persianMonth = persianMonths[resultArray[2]];
    return `${persianDay} ${toPersianNumber(resultArray[1])} ${persianMonth} ${isShownTime ? '- ساعت ' + time : ''}`;
  } else {
    const resultArray = jalaliDate.split(' ');
    const persianDay = persianDays[resultArray[0]];
    const persianMonth = persianMonths[resultArray[2]];
    return `${persianDay} ${toPersianNumber(resultArray[1])} ${persianMonth} ${toPersianNumber(resultArray[3])} ${isShownTime ? '- ساعت ' + time : ''}`;
  }
};
