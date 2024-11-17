export const getOrderStatusMessage = (statusId) => {
  switch (statusId) {
    case 'draft':
      return 'در انتظار تایید پزشک';
    case 'ack':
      return 'در انتظار تایید داروخانه';
    case 'apay':
    case 'nfc':
      return 'در انتظار پرداخت';
    case 'pick':
    case 'accept':
      return 'در حال آماده سازی سفارش';
    case 'adelivery':
      return 'در حال جمع آوری سفارش';
    case 'senddelivery':
      return 'ارسال توسط پیک';
    case 'deliverd':
    case 'return':
    case 'cancelcustomer':
    case 'cancelvendor':
    case 'reject':
      return '';

    default:
      return '';
  }
};
