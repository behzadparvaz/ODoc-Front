import { useGetOrderState } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import MainLayout from '@com/_template/MainLayout';
import { TickFillIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import { useRouter } from 'next/router';

const SuccessOrder = () => {
  const { push, query } = useRouter();
  const orderCode = query?.order_Code;
  const { data } = useGetOrderState(orderCode);

  return (
    <MainLayout className="relative w-full min-h-screen flex justify-center flex-col items-center">
      <Button
        handleClick={() => push('/')}
        size="small"
        buttonType="contained"
        variant="primary"
        className=" absolute top-6 left-6 text-xs"
      >
        ثبت سفارش جدید
      </Button>
      <TickFillIcon
        width={100}
        height={100}
        fill={colors?.teal[600]}
        stroke="red"
      />
      <h1 className="text-md text-grey-700 mt-4">سفارش شما با موفقیت ثبت شد</h1>
      <p className="mt-4">مشخصات سفارش:</p>
      <p className="text-sm text text-grey-800">{`کد سفارش: ${data?.orderCode}`}</p>
      <p className="text-sm text text-grey-800">{`نام تحویل گیرنده: ${data?.customer?.name}`}</p>
      <Button
        handleClick={() => push(routeList?.ordersHistory)}
        size="small"
        buttonType="contained"
        variant="primary"
        className="text-sm mb-3 mt-2"
      >
        پیگیری سفارش
      </Button>
      <p className="mt-4">وضعیت سفارش:</p>
      <p className="text-sm text text-grey-800">
        {getOrderStatusMessage(data?.orderStatus?.id)}
      </p>
    </MainLayout>
  );
};
export default SuccessOrder;
