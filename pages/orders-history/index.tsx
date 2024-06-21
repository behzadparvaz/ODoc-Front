import {
  useFinishOrderPayment,
  useGetOrdersHistory,
} from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import MainLayout from '@com/_template/MainLayout';
import { routeList } from '@routes/routeList';
import { convertGregorianToJalali } from '@utilities/mainUtils';
import { useRouter } from 'next/router';
const OrderHistory = () => {
  const { push } = useRouter();
  const { data, isLoading } = useGetOrdersHistory();
  const { mutate: mutatePayment } = useFinishOrderPayment();
  const orderHistoryData: any = data;
  const renderStatusMessage = (statusId) => {
    switch (statusId) {
      case 0:
        return 'ثبت شده';
      case 2:
        return 'در انتظار پرداخت';
      case 3:
        return 'شروع جمع آوری';
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
  const handleClikOnPaymentButton = (orderCode) => {
    const body = { orderCode: orderCode };
    mutatePayment(body);
  };

  return (
    <MainLayout title="تاریخچه سفارش ها">
      <div className="w-full px-6 pb-8 relative">
        <div className="py-4 sticky w-full flex justify-end inset-x-0 top-0 bg-white">
          <Button
            size="medium"
            buttonType="contained"
            handleClick={() => push(routeList?.orderRegisteration)}
            variant={'primary'}
            className='w-full'
          >
            ثبت سفارش جدید
          </Button>
        </div>
        {orderHistoryData?.map((item) => {
          return (
            <div
              key={item?.id}
              className="w-full border overflow-hidden mb-4 border-grey-200 rounded-lg"
            >
              <div className="text-left border-b px-4 py-2 bg-grey-50 flex justify-between border-grey-200">
                <div>تاریخ ثبت</div>
                <div>{convertGregorianToJalali(item?.createDateTime)}</div>
              </div>
              <div className="w-full flex flex-col gap-y-3 py-2 px-4">
                <div>کد سفارش:{item?.orderCode}</div>
                <div>نام ثبت کننده:{item?.customer?.name}</div>
                <div>شماره ملی ثبت کننده:{item?.customer?.nationalCode}</div>
              </div>
              <div className="flex items-center justify-between py-2 px-4">
                <div className="flex items-center">
                  وضعیت سفارش:{' '}
                  <p className="text-teal-600 mr-1">
                    {renderStatusMessage(item?.orderStatus?.id)}
                  </p>
                </div>

                {item?.orderStatus?.id === 2 && (
                  <Button
                    size="medium"
                    buttonType="contained"
                    handleClick={() =>
                      handleClikOnPaymentButton(item?.orderCode)
                    }
                    variant={'primary'}
                  >
                    پرداخت
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
};
export default OrderHistory;
