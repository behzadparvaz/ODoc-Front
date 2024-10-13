import { useGetOrderInfo } from '@api/order/orderApis.rq';
import AddressBoxTypeTwo from '@com/_atoms/AddressBoxTypeTwo';
import QuickOrderItem from '@com/_atoms/QuickOrderItem';
import MainPageLayout from '@com/_template/MainPageLayout';
import { useRouter } from 'next/router';

const quickOrderDetail = () => {
  const { query, back } = useRouter();
  const orderId = String(query?.orderId);
  const { data, isLoading } = useGetOrderInfo(orderId);
  const orderData = data?.data;
  console.log(orderData);

  //   63db0dc584e145c08791cd5474f98f79
  return (
    <MainPageLayout
      hasBottomNavigation={false}
      hasBasketIcon={false}
      hasSearchIcon={false}
      hasFooter={false}
      hasAddress={false}
      title={'جزییات درخواست'}
      backButtonAction={back}
    >
      <div className="px-4">
        {orderData?.orderDetails?.map((item, index) => {
          return <QuickOrderItem data={item} key={index} />;
        })}
        <AddressBoxTypeTwo />
        <div className="border-t border-gray-200 py-4 mt-5 flex flex-col gap-y-11">
          {orderData?.orderDescription && (
            <div className="flex flex-col gap-y-2">
              توضیحات شما
              <p className="bg-gray-100 rounded-md text-grey-500 p-4 text-sm">
                {orderData?.orderDescription}
              </p>
            </div>
          )}
          {orderData?.doctorDescription && (
            <div className="flex flex-col gap-y-2">
              توضیحات پزشک
              <p className="bg-gray-100 rounded-md text-grey-500 p-4 text-sm">
                {orderData?.doctorDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainPageLayout>
  );
};
export default quickOrderDetail;
