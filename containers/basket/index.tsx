import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import {
  useDeleteCurrentBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useCreateOrderDraft } from '@api/order/orderApis.rq';

import { Button } from '@com/_atoms/NewButton';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';

import { routeList } from '@routes/routeList';

const Content = dynamic(() => import('./components/Content'));

const Page = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);
  const [timeOutLoading, setTimeOutLoading] = useState(false);

  const {
    data: basket,
    isLoading,
    refetch: refetchGetBasket,
  } = useGetCurrentBasket({ enabled: true });

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeOutLoading(true);
  //   }, 100);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);
  console.log('isLoading', isLoading);
  const { mutate: deleteBasket, isPending: isLoadingDeleteBasket } =
    useDeleteCurrentBasket({
      onMutate: () => {
        setIsDisabled(true);
      },
      onSuccess: () => {
        refetchGetBasket();
        setTimeout(() => {
          setIsDisabled(false);
        }, 2000);
      },
    });
  const {
    mutate: createOrderDraft,
    data: draftData,
    isPending: isLoadingcreateOrderDraft,
  } = useCreateOrderDraft({
    onMutate: () => {
      setIsDisabled(true);
    },
    onSuccess: () => {
      refetchGetBasket();
      setTimeout(() => {
        setIsDisabled(false);
      }, 2000);
    },
  });

  const products = useMemo(() => {
    return basket?.products ?? [];
  }, [basket]);

  return (
    <MainLayout
      title="سبد خرید"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      backIconHandler={() => {
        if (!isLoadingcreateOrderDraft || isLoadingDeleteBasket) {
          router?.push(routeList?.homeRoute);
        }
      }}
    >
      <Content
        products={products}
        isLoading={
          isLoading
          // || !timeOutLoading
        }
        isSpecialPatient={basket?.isSpecialPatient}
        refetchBasketHandler={refetchGetBasket}
        isOrderInProgress={!!draftData}
        isEmpty={!products?.length && !basket?.refrenceNumber && !draftData}
        prescriptionId={basket?.refrenceNumber}
      />
      {(basket?.products?.length > 0 || basket?.refrenceNumber) &&
        !draftData && (
          <ActionBar
            type="twoActionHorizontal"
            hasDivider={products.length > 0}
          >
            <>
              <Button
                variant="primary"
                className="w-full"
                size="large"
                onClick={() => router.push(`${routeList.confirmBasket}`)}
                isLoading={isLoadingcreateOrderDraft}
                disabled={isLoadingDeleteBasket}
              >
                تأیید و ادامه
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                size="large"
                onClick={deleteBasket}
                isLoading={isLoadingDeleteBasket}
                disabled={isLoadingcreateOrderDraft || isDisabled}
              >
                حذف سبد خرید
              </Button>
            </>

            {draftData && (
              <>
                <Button
                  variant="primary"
                  className="w-full"
                  size="large"
                  onClick={() =>
                    router.push(`${routeList.ordersHistory}/${draftData}`)
                  }
                >
                  مشاهده جزییات سفارش
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  size="large"
                  onClick={() => router.push(routeList.homeRoute)}
                >
                  برگشت به خانه
                </Button>
              </>
            )}
          </ActionBar>
        )}
    </MainLayout>
  );
};

export default Page;
