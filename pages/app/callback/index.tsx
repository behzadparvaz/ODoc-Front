import { useVerifyPaymentOrder } from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import FailurePayment from '@com/_organisms/FailurePayment';
import SuccessPayment from '@com/_organisms/SuccessPayment';
import MainLayout from '@com/_template/MainLayout';
import { isEmpty } from '@utilities/isEmptyObject';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NextImage from '@com/_core/NextImage';

import tapsiLogo from '@static/images/staticImages/tapsi-daroo-logo.png';

const CallBack = () => {
  const { query } = useRouter();

  const [paymentStatus, setPaymentStatus] = useState<boolean>(null);

  const { mutate, isLoading } = useVerifyPaymentOrder();

  useEffect(() => {
    const body = {
      trackId: query?.trackId,
      orderCode: query?.orderId,
    };
    if (!isEmpty(query)) {
      mutate(body, {
        onSuccess: (data: any) => {
          if (data?.status === 400) {
            setPaymentStatus(false);
          } else {
            setPaymentStatus(true);
          }
        },
      });
    }
  }, [query]);
  const headerChildrenElement = (
    <NextImage src={tapsiLogo} height={30} width={125} />
  );

  return (
    <MainLayout
      headerChildren={headerChildrenElement}
      title="وضعیت پرداخت"
      className="w-full min-h-screen flex justify-center flex-col items-center"
    >
      {isLoading ? (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      ) : (
        <>
          {paymentStatus ? (
            <SuccessPayment className="w-full flex flex-col items-center" />
          ) : (
            <FailurePayment className="w-full flex flex-col items-center" />
          )}
        </>
      )}
    </MainLayout>
  );
};
export default CallBack;
