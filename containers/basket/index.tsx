import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import {
  useDeleteCurrentBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useCreateOrderDraft } from '@api/order/orderApis.rq';
import { Button } from '@com/_atoms/NewButton';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { routeList } from '@routes/routeList';
import Content from './components/Content';

const Page = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);
  const [timeOutLoading, setTimeOutLoading] = useState(false);

  const {
    data: basket,
    isLoading,
    refetch: refetchGetBasket,
  } = useGetCurrentBasket();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeOutLoading(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
    const basketProducts = basket?.products?.map((item) => {
      if (item?.productType?.id === 3) {
        return {
          ...item,
          imageLink: '/images/fast-order.png',
        };
      } else return item;
    });

    return basketProducts ?? [];
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
        isLoading={isLoading || !timeOutLoading}
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
