import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import {
  useDeleteCurrentBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useCreateOrderDraft } from '@api/order/orderApis.rq';
import { Button } from '@com/_atoms/NewButton';
import Spinner from '@com/_atoms/Spinner';
import NextImage from '@com/_core/NextImage';
import HorizontalProductCard from '@com/_molecules/HorizontalProductCard';
import { TimerIcon } from '@com/icons';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import specialPatients from '@static/images/staticImages/mainCategories/nonPrescriptionMedicine.png';
import prescriptionMedicine from '@static/images/staticImages/mainCategories/prescriptionMedicine.png';

const Page = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const {
    data: basket,
    isLoading,
    refetch: refetchGetBasket,
  } = useGetCurrentBasket();
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

  const products = useMemo(() => basket?.products ?? [], [basket]);
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
      <div className="relative h-full pb-[180px] pt-4 px-4 md:pb-[94px] overflow-auto">
        {!!draftData && <OrderInProgress />}

        {isLoading ? (
          <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
        ) : products?.length === 0 && !basket?.refrenceNumber && !draftData ? (
          <BasketEmptyPage />
        ) : (
          <>
            {!draftData && (
              <div className="w-full min-h-[400px] flex flex-col gap-y-4">
                {!!basket?.refrenceNumber && (
                  <>
                    <div className="w-full h-20 flex items-center justify-start gap-x-4">
                      <NextImage
                        src={
                          basket?.isSpecialPatient
                            ? specialPatients
                            : prescriptionMedicine
                        }
                        alt="rx-image"
                        width={72}
                        height={72}
                      />
                      <div className="flex flex-col gap-y-1">
                        <span className="text-base font-semibold">
                          {basket?.isSpecialPatient
                            ? 'نسخه بیماری خاص'
                            : 'دارو با نسخه'}
                        </span>
                        <span className="text-base font-semibold">{`کد نسخه ${basket?.refrenceNumber}`}</span>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="w-full h-[1px] bg-grey-200" />
                    </div>
                  </>
                )}

                <div className="flex flex-col md:px-0 h-full gap-2 justify-between">
                  {products?.map((pr, index) => {
                    return (
                      <div key={pr.irc} className="flex flex-col gap-2">
                        <HorizontalProductCard
                          prInfo={{ ...pr }}
                          onSuccessChanged={refetchGetBasket}
                          hasAddToCartButton
                        />
                        {products?.length !== index && (
                          <div className="w-full">
                            <div className="w-full h-[1px] bg-grey-50" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ActionBar type="twoActionHorizontal" hasDivider={products.length > 0}>
        {(basket?.products?.length > 0 || basket?.refrenceNumber) &&
          !draftData && (
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
            </>
          )}
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
    </MainLayout>
  );
};

export default Page;

const BasketEmptyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-1/2 w-full gap-3 p-10 text-center">
      <h3 className="font-semibold text-lg">سبد خرید شما خالی است!</h3>
      <p className="font-light">
        در حال حاضر، هیچ کالایی برای خرید انتخاب نشده است.
      </p>
    </div>
  );
};

const OrderInProgress = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-20">
      <span className="bg-yellow-400 rounded-full w-[56px] h-[56px] flex justify-center items-center">
        <TimerIcon width={32} height={32} fill={colors.white} />
      </span>
      <div className="text-sm font-light flex flex-col gap-4 items-center">
        <span className="text-md font-semibold text-center">
          سفارش شما با موفقیت ثبت شد
        </span>
        <span className="text-center">
          سفارش شما به داروخانه های اطراف ارسال شد، برای ادامه فرآیند خرید باید
          منتظر تأیید داروخانه باشید
        </span>
      </div>
    </div>
  );
};
