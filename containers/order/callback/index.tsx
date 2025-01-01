import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useVerifyPaymentOrder } from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import FailurePayment from '@com/_organisms/FailurePayment';
import SuccessPayment from '@com/_organisms/SuccessPayment';
import { MainLayout } from '@com/Layout';
import { isEmpty } from '@utilities/isEmptyObject';

const CallBackContainer = () => {
  const { query } = useRouter();

  const [paymentStatus, setPaymentStatus] = useState<
    'failed' | 'success' | null
  >(null);

  const { mutate, isPending } = useVerifyPaymentOrder();

  useEffect(() => {
    const body = {
      trackId: query?.trackId,
      orderCode: query?.orderId,
    };
    if (!isEmpty(query)) {
      mutate(body, {
        onSuccess: (data: any) => {
          setPaymentStatus('success');
        },
        onError: (error: any) => {
          setPaymentStatus('failed');
        },
      });
    }
  }, [query]);

  const renderContent = () => {
    if (isPending) {
      return (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      );
    }

    if (!isPending && paymentStatus === 'success') {
      return <SuccessPayment className="w-full flex flex-col items-center" />;
    }

    if (!isPending && paymentStatus === 'failed') {
      return <FailurePayment className="w-full flex flex-col items-center" />;
    }
  };

  return <MainLayout>{renderContent()}</MainLayout>;
};
export default CallBackContainer;
