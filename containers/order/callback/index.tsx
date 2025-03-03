import { useVerifyPaymentOrder } from '@api/order/orderApis.rq';
import { MainLayout } from '@com/Layout';
import { isEmpty } from '@utilities/isEmptyObject';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { routeList } from '@routes/routeList';
const StatusPayment = dynamic(() => import('@com/_organisms/statusPayment'), {
  ssr: false,
});
interface IData {
  vendorCode: string;
  isSuccess: boolean;
  trackId: string;
  dateTime: string;
  amount: number;
}
const CallBackContainer = () => {
  const { mutate, isPending } = useVerifyPaymentOrder();
  const [data, setData] = useState<IData>({
    vendorCode: '',
    isSuccess: false,
    trackId: '',
    dateTime: '',
    amount: 0,
  });
  const { query, push } = useRouter();

  useEffect(() => {
    const body = {
      trackId: query?.trackId,
      orderCode: query?.orderId,
    };
    if (!isEmpty(query)) {
      mutate(body, {
        onSuccess: (data: any) => {
          setData(data);
        },
        onError: (error: any) => {
          console.error(error);
          push(routeList.ordersHistory);
        },
      });
    }
  }, [query]);

  return (
    <MainLayout>
      <StatusPayment data={data} isLoading={isPending} />
    </MainLayout>
  );
};
export default CallBackContainer;
