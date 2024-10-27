import { useCancelQuickOrder, useGetOrderInfo } from '@api/order/orderApis.rq';
import AddressBoxTypeTwo from '@com/_atoms/AddressBoxTypeTwo';
import Button from '@com/_atoms/Button';
import QuickOrderItem from '@com/_atoms/QuickOrderItem';
import MainPageLayout from '@com/_template/MainPageLayout';
import { WarninglineIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const QuickOrderDetail = () => {
  const { query, back } = useRouter();
  const orderId = String(query?.orderId);
  const { data, isLoading } = useGetOrderInfo(orderId);
  const { mutate, isLoading: mutateIsLoading } = useCancelQuickOrder();
  const { push } = useRouter();
  const orderData = data?.data;
  const orderStatus = orderData?.status;
  const showCancelOrderButton = orderStatus === 1 || orderStatus === 4;

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
      <div className={`px-4 ${showCancelOrderButton ? 'pb-[68px]' : ''}`}>
        {orderStatus === 3 || orderStatus === 5 ? (
          <div className="bg-red-50 text-gray-600 p-4 rounded-lg text-xs mb-6 items-center flex gap-x-2">
            <span className="bg-red-400 inline-block rounded-full ">
              <WarninglineIcon width={20} height={20} fill={colors.white} />
            </span>
            {orderStatus === 3
              ? 'پزشک درخواست شما را تأیید نکرد '
              : 'درخواست شما نیاز به نسخه دارد'}
          </div>
        ) : null}

        {orderData?.orderDetails?.map((item, index) => {
          return <QuickOrderItem data={item} key={index} />;
        })}
        <AddressBoxTypeTwo addressInfo={orderData?.addressInfo} justForShow={true} />
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
        {showCancelOrderButton && (
          <div className="absolute inset-x-0 bottom-4 px-4">
            <Button
              handleClick={() => {
                mutate(orderId, {
                  onSuccess: () => {
                    push(routeList?.homeRoute);
                  },
                });
              }}
              className="bg-red-50 text-red-400 w-full"
              size="large"
            >
              لغو درخواست
            </Button>
          </div>
        )}
      </div>
    </MainPageLayout>
  );
};
export default QuickOrderDetail;
