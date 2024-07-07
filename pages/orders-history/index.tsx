import {
  useFinishOrderPayment,
  useGetOrdersHistory,
} from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import OrderItem from '@com/_molecules/OrderItem';
import MainLayout from '@com/_template/MainLayout';

const OrderHistory = () => {
  const { data, isLoading } = useGetOrdersHistory();
  const { mutate: mutatePayment } = useFinishOrderPayment();
  const orderHistoryData: any = data;

  const handleClikOnPaymentButton = (orderCode, finalPrice) => {
    const body = {
      orderCode: orderCode,
      finalPrice: finalPrice,
    };
    mutatePayment(body);
  };
  const headerChildrenElement = (
    <div className="text-[#ff5722] text-2xl font-bold">
      TAPSI <span className="text-teal-600">Doctor</span>
    </div>
  );

  return (
    <MainLayout headerChildren={headerChildrenElement} title="تاریخچه سفارش ها">
      {isLoading === false ? <div className="w-full px-6 pb-8 relative pt-10">
        {orderHistoryData?.map((item) => {
          return (
            <OrderItem key={item?.id} handleClikOnPaymentButton={() => handleClikOnPaymentButton(item?.orderCode, item?.finalPrice)} data={item} />
          );
        })}
      </div>
        :
        <Spinner className='h-[calc(100vh-180px)] w-full flex justify-center items-center' />}
    </MainLayout>
  );
};
export default OrderHistory;
