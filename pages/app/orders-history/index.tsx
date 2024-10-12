import {
  useFinishOrderPayment,
  useGetOrdersHistory,
  useGetOrderStatuses,
} from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import OrderItem from '@com/_molecules/OrderItem';
import { MainLayout } from '@com/Layout';
import Select from '@com/_atoms/Select';
import { useMemo } from 'react';
import { useRouter } from 'next/router';


const statusesDictionary = {
  draft: 'سفارشات جدید',
  ack: 'همه',
  apay: 'در انتظار پرداخت',
  pick: 'در حال جمع آوری',
  nfc: 'نیاز به تماس',
  accept: 'پذیرفته شده',
  adelivery: 'آماده تحویل',
  senddelivery: 'در حال ارسال',
  deliverd: 'تحویل داده شده',
  return: 'مرجوع',
  cancelcustomer: 'لغو',
  cancelvendor: 'لغو داروخانه',
  reject: 'عدم تایید',
};

const OrderHistory = () => {
  const { push, query } = useRouter();
  const statusId = Number(query?.statusId ?? '-1');
  const { data: orderHistoryData, isLoading } = useGetOrdersHistory(statusId);
  const { data: orderStatuses } = useGetOrderStatuses();
  const { mutate: mutatePayment } = useFinishOrderPayment();

  const onChangeFilter = (event) => {
    push({ query: { ...query, statusId: event.target.value } }, undefined, {
      shallow: true,
    });
  };

  const transformDataToOptions = useMemo(
    () =>
      orderStatuses?.map((item) => ({
        name: statusesDictionary[item.name],
        id: item.id,
      })) ?? [],
    [orderStatuses],
  );

  const handleClickOnPaymentButton = (orderCode, finalPrice) => {
    const body = {
      orderCode: orderCode,
      finalPrice: finalPrice,
    };
    mutatePayment(body);
  };

  return (
    <MainLayout title="تاریخچه سفارش ها" hasBottomNavigation>
      <div className="my-10 px-6 flex justify-end items-center gap-3">
        <span>فیلتر:</span>
        <Select
          name={'statusId'}
          value={statusId}
          options={transformDataToOptions}
          onChange={onChangeFilter}
          className={'w-full sm:w-1/3'}
        />
      </div>
      {isLoading === false ? (
        <div className="w-full px-6 pb-8 relative">
          {orderHistoryData?.map((item) => {
            return (
              <OrderItem
                key={item?.id}
                handleClikOnPaymentButton={() =>
                  handleClickOnPaymentButton(item?.orderCode, item?.finalPrice)
                }
                data={item}
              />
            );
          })}
        </div>
      ) : (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      )}
    </MainLayout>
  );
};
export default OrderHistory;
