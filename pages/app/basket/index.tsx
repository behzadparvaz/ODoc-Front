import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';
import {
  useDeleteCurrentBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useGetProfile } from '@api/user/user.rq';
import { useSelector } from 'react-redux';
import { RootState } from '@utilities/types';
import HorizontalProductCard from '@com/_molecules/HorizontalProductCard';
import { useCreateOrderDraft } from '@api/order/orderApis.rq';
import { TimerIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import prescriptionMedicine from '@static/images/staticImages/mainCategories/prescriptionMedicine.png';
import specialPatients from '@static/images/staticImages/mainCategories/nonPrescriptionMedicine.png';
import Address from '@com/_organisms/Address';
import useNotification from '@hooks/useNotification';
import FixBottomSection from '@com/_atoms/FixBottomSection';
import NextImage from '@com/_core/NextImage';
import { Button } from '@com/_atoms/NewButton';

const Page = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const { openNotification } = useNotification();
  const { user } = useSelector((state: RootState) => state?.user);
  const {
    data: basket,
    isLoading,
    refetch: refetchGetBasket,
  } = useGetCurrentBasket();
  const { mutate: deleteBasket, isLoading: isLoadingDeleteBasket } =
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
    isLoading: isLoadingcreateOrderDraft,
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
  const { data: profileQuery } = useGetProfile();

  const profile: any = profileQuery?.queryResult?.[0];

  const onSubmitBasket = () => {
    const { defaultAddress } = user;
    const products =
      basket?.products?.map((pr) => ({
        description: pr.name,
        irc: pr.irc,
        quantity: pr.quantity,
        gtin: pr.gtin,
        productName: pr.name,
      })) ?? [];

    if (!defaultAddress?.id) {
      openNotification({
        type: 'error',
        message: 'آدرس را انتخاب کنید',
        notifType: 'successOrFailedMessage',
      });
      return;
    }

    createOrderDraft({
      comment: '',
      customerName: [profile?.firstName, profile?.lastName].join(' '),
      nationalCode: profile?.nationalCode,

      deliveryDate: '',
      fromDeliveryTime: '',
      toDeliveryTime: '',

      homeUnit: defaultAddress?.homeUnit,
      houseNumber: defaultAddress?.houseNumber,
      latitude: defaultAddress?.latitude,
      longitude: defaultAddress?.longitude,
      titleAddress: defaultAddress?.name,
      valueAddress: defaultAddress?.description,

      referenceNumber: basket?.refrenceNumber,
      insuranceTypeId: basket?.insuranceType,
      supplementaryInsuranceTypeId: basket?.supplementaryInsuranceType,

      items: products,

      isSpecialPatient: basket?.isSpecialPatient,
      vendorCode: basket?.isSpecialPatient ? basket?.vendorCode : '',
    });
  };

  const products = useMemo(() => basket?.products ?? [], [basket]);

  return (
    <MainLayout
      title="سبد خرید"
      hasHeader
      hasBackButton
      handleClickRightIcon={() => {
        if (!isLoadingcreateOrderDraft || isLoadingDeleteBasket) {
          router?.push(routeList?.homeRoute);
        }
      }}
      hasBottomGap
    >
      <div className="relative h-full pb-14 pt-4 px-4 md:pb-20 overflow-auto">
        {!!draftData && <OrderInProgress />}

        {products?.length === 0 && !basket?.refrenceNumber && !draftData ? (
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

                <div className="flex flex-col px-4 md:px-0 h-full gap-2 justify-between">
                  {products?.map((pr, index) => (
                    <div key={pr.irc} className="flex flex-col gap-2">
                      <HorizontalProductCard
                        prInfo={{ ...pr }}
                        onSuccessChanged={refetchGetBasket}
                        hasAddToCartButton
                      />
                      {products?.length !== index && (
                        <div className="w-full px-4">
                          <div className="w-full h-[1px] bg-grey-200" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Address />
              </div>
            )}
          </>
        )}
      </div>
      <FixBottomSection>
        <div className="w-full h-full flex flex-col justify-between items-center p-4 gap-3 md:flex-row">
          {(basket?.products?.length > 0 || basket?.refrenceNumber) &&
            !draftData && (
              <>
                <Button
                  variant="primary"
                  className="w-full"
                  size="large"
                  onClick={onSubmitBasket}
                  isLoading={isLoadingcreateOrderDraft}
                  disabled={isLoadingDeleteBasket || isDisabled}
                >
                  ارسال به داروخانه ها
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  size="large"
                  onClick={deleteBasket}
                  disabled={isLoadingcreateOrderDraft}
                  isLoading={isLoadingDeleteBasket || isDisabled}
                >
                  حذف سبد خرید
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
        </div>
      </FixBottomSection>
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
        <TimerIcon width="32" height="32" fill={colors.white} />
      </span>
      <div className="text-sm font-light flex flex-col gap-4 items-center">
        <span className="text-md font-semibold">
          سفارش شما با موفقیت ثبت شد
        </span>
        <span>
          سفارش شما به داروخانه های اطراف ارسال شد، برای ادامه فرآیند خرید باید
          منتظر تأیید داروخانه باشید
        </span>
      </div>
    </div>
  );
};