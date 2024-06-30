import {
  useFinishOrderPayment,
  useGetOrdersHistory,
} from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import Spinner from '@com/_atoms/Spinner';
import MainLayout from '@com/_template/MainLayout';
import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import { convertGregorianToJalali } from '@utilities/mainUtils';

const OrderHistory = () => {
  const { data ,isLoading} = useGetOrdersHistory();
  const { mutate: mutatePayment } = useFinishOrderPayment();
  const orderHistoryData: any = data;

  const handleClikOnPaymentButton = (orderCode) => {
    const body = { orderCode: orderCode };
    mutatePayment(body);
  };

  return (
    <MainLayout title="تاریخچه سفارش ها">
      {isLoading===false?<div className="w-full px-6 pb-8 relative pt-8">
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
                    {getOrderStatusMessage(item?.orderStatus?.id)}
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
      :
      <Spinner className='h-[calc(100vh-180px)] w-full flex justify-center items-center' />}
    </MainLayout>
  );
};
export default OrderHistory;
