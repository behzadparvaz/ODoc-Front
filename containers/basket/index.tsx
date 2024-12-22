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
import CarouselLine from '@com/_molecules/CarouselLine';
import { useGetCarousels } from '@api/promotion/promotion.rq';
import { colors } from '@configs/Theme';
import Icon from '@utilities/icon';

const Content = dynamic(() => import('./components/Content'));

const Page = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);
  const [timeOutLoading, setTimeOutLoading] = useState(false);

  const { data: carouselsData, isLoading: carouselIsLoading } =
    useGetCarousels();

  const getCarouselDataData = (position: number) => {
    const carouselData = carouselsData?.queryResult?.filter(
      (item) => item?.sectionPosition === position,
    )?.[0];
    return carouselData;
  };

  const {
    data: basket,
    isLoading,
    refetch: refetchGetBasket,
  } = useGetCurrentBasket({ enabled: true });

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
      leftSection={
        <Button
          onClick={deleteBasket}
          className="h-full flex items-center justify-center cursor-pointer !p-2"
          variant="text"
          disabled={
            isLoadingDeleteBasket ||
            !(products.length > 0) ||
            !Boolean(basket?.refrenceNumber)
          }
        >
          <Icon
            name="Trash"
            width={1.5}
            height={1.5}
            fill={
              isLoadingDeleteBasket ||
              products.length > 0 ||
              Boolean(basket?.refrenceNumber)
                ? colors.red[400]
                : colors.grey[400]
            }
          />
        </Button>
      }
    >
      <div className="pb-[85px]">
        <Content
          products={products}
          isLoading={isLoading || !timeOutLoading}
          isSpecialPatient={basket?.isSpecialPatient}
          refetchBasketHandler={refetchGetBasket}
          isOrderInProgress={!!draftData}
          isEmpty={!products?.length && !basket?.refrenceNumber && !draftData}
          prescriptionId={basket?.refrenceNumber}
        />

        <CarouselLine
          data={getCarouselDataData(4)}
          carouselIsLoading={carouselIsLoading}
          isShowMoreButton={false}
          carouselCardClassName="bg-white rounded-md"
          containerClassName="bg-indigo-100 pb-5"
        />
      </div>

      {(basket?.products?.length > 0 || basket?.refrenceNumber) &&
        !draftData && (
          <ActionBar
            type="twoActionHorizontal"
            hasDivider={products.length > 0}
            className="flex-row-reverse"
          >
            <>
              <Button
                variant="primary"
                className="w-full bg-[linear-gradient(91.39deg,_#FF7733_0%,_#FF5722_50.15%,_#E64917_100%)]"
                size="large"
                onClick={() => router.push(`${routeList.confirmBasket}`)}
                isLoading={isLoadingcreateOrderDraft}
                disabled={isLoadingDeleteBasket}
              >
                تأیید و ادامه خرید
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                size="large"
                onClick={() => router.push(`${routeList.homeRoute}`)}
                isLoading={isLoadingDeleteBasket}
                disabled={isLoadingcreateOrderDraft || isDisabled}
              >
                افزودن کالای جدید
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
