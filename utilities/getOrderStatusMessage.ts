export const getOrderStatusMessage = (statusId) => {
  switch (statusId) {
    case 0:
      return 'در انتظار تایید داروخانه';
    case 2:
      return 'در انتظار پرداخت';
    case 3:
      return 'در حال جمع‌آوری نسخه';
    case 5:
      return 'اتمام جمع‌آوری';
    case 6:
      return 'در انتظار بایکر';
    case 7:
      return 'در حال ارسال توسط بایکر';
    case 8:
      return 'تحویل شده به مشتری';
    case 9:
      return 'مرجوع شده';
    case 10:
      return 'کنسل شده';
    default:
      return '';
  }
};
