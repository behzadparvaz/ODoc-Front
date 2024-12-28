import { useRouter } from 'next/router';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import {
  useAddProductToBasket,
  useDeleteCurrentBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useCreateOrderDraft } from '@api/order/orderApis.rq';
import Icon from '@utilities/icon';
import { Button } from '@com/_atoms/NewButton';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { routeList } from '@routes/routeList';
import CarouselLine from '@com/_molecules/CarouselLine';
import { useGetCarousels } from '@api/promotion/promotion.rq';
import { colors } from '@configs/Theme';
import LoadingSpinner from '@com/_atoms/LoadingSpinner';

const Content = dynamic(() => import('./components/Content'));

const Page = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

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
    isFetching: isLoading,
    refetch: refetchGetBasket,
  } = useGetCurrentBasket({
    enabled: true,
  });

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
  const { data: draftData, isPending: isLoadingcreateOrderDraft } =
    useCreateOrderDraft({
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

  return (
    <MainLayout
      title="سبد خرید"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      backIconHandler={() => {
        if (!isLoadingcreateOrderDraft && !isLoadingDeleteBasket) {
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
            !(basket?.products?.length > 0 || !!basket?.refrenceNumber)
          }
        >
          {isLoadingDeleteBasket ? (
            <LoadingSpinner color="danger" />
          ) : (
            <Icon
              name="Trash"
              width={1.5}
              height={1.5}
              fill={
                basket?.products?.length > 0 || !!basket?.refrenceNumber
                  ? colors.red[400]
                  : colors.grey[400]
              }
            />
          )}
        </Button>
      }
    >
      <div className="pb-[85px]">
        <Content
          products={basket?.products}
          isLoading={isLoading}
          isSpecialPatient={basket?.isSpecialPatient}
          refetchBasketHandler={refetchGetBasket}
          isOrderInProgress={!!draftData}
          isEmpty={
            !basket?.products?.length && !basket?.refrenceNumber && !draftData
          }
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
            hasDivider={basket?.products?.length > 0}
            className="flex-row-reverse"
          >
            <>
              <Button
                variant="brand"
                className="w-full"
                size="large"
                onClick={() => router.push(`${routeList.confirmBasket}`)}
                isLoading={isLoadingcreateOrderDraft}
                disabled={isLoadingDeleteBasket || isLoadingDeleteBasket}
              >
                تأیید و ادامه خرید
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                size="large"
                onClick={() => router.push(`${routeList.homeRoute}`)}
                disabled={
                  isLoadingDeleteBasket ||
                  isLoadingcreateOrderDraft ||
                  isDisabled
                }
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
