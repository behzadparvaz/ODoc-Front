import { MainLayout } from '@com/Layout';
import Button from '@com/_atoms/Button';
import {
  useDeleteCurrentBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import React, { useEffect, useMemo } from 'react';
import { useGetProfile, useGetUserLocations } from '@api/user/user.rq';
import SelectAddress from '@com/_organisms/SelectAddress';
import useModal from '@hooks/useModal';
import { useSelectAddressByCurrentLocation } from '@hooks/useSelectAddressByCurrentLocation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@utilities/types';
import { setUserAction } from '@redux/user/userActions';
import { homePageText } from '@com/texts/homePage';
import HorizontalProductCard from '@com/_molecules/HorizontalProductCard';
import { useCreateOrderDraft } from '@api/order/orderApis.rq';
import { TimerIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';

const Page = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state?.user);
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket();
  const { mutate: deleteBasket } = useDeleteCurrentBasket();
  const { mutate: createOrderDraft, data: draftData } = useCreateOrderDraft();
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

      referenceNumber: '',
      insuranceTypeId: 0,
      supplementaryInsuranceTypeId: 0,

      items: products,
    });
  };

  const products = useMemo(() => basket?.products ?? [], [basket]);

  return (
    <MainLayout
      title="سبد خرید"
      hasHeader
      hasBackButton
      handleClickRightIcon={() => router?.push(routeList?.homeRoute)}
      hasBottomGap
      footer={
        <div className="w-full h-full flex justify-between items-center px-4 gap-3">
          {basket?.products?.length > 0 && (
            <>
              <Button
                variant={'primary'}
                className="flex-1"
                size={'large'}
                handleClick={onSubmitBasket}
              >
                ارسال به داروخانه ها
              </Button>
              <Button
                variant={'primary'}
                className="flex-1"
                size={'large'}
                buttonType={'outlined'}
                handleClick={deleteBasket}
              >
                حذف سبد خرید
              </Button>
            </>
          )}
          {draftData && (
            <>
              <Button
                variant={'primary'}
                className="flex-1"
                size={'large'}
                handleClick={() =>
                  router.push(`${routeList.ordersHistory}/${draftData}`)
                }
              >
                مشاهده جزییات سفارش
              </Button>
              <Button
                variant={'primary'}
                className="flex-1"
                size={'large'}
                buttonType={'outlined'}
                handleClick={() => router.push(routeList.homeRoute)}
              >
                برگشت به خانه
              </Button>
            </>
          )}
        </div>
      }
    >
      <div className="relative h-full pb-14 pt-4 md:pb-20 overflow-auto">
        {!!draftData && <OrderInProgress />}
        {products?.length === 0 ? (
          <BasketEmptyPage />
        ) : (
          <>
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

              <Address />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Page;

const Address = () => {
  const { addModal } = useModal();
  const { data: addressDate } = useGetUserLocations();
  const { user } = useSelector((state: RootState) => state?.user);
  const { addressSelected } = useSelectAddressByCurrentLocation(addressDate);
  const dispatch = useDispatch();

  const defaultAddress: any = user?.defaultAddress ?? null;

  useEffect(() => {
    if (!defaultAddress) {
      if (addressSelected) {
        dispatch(
          setUserAction({
            defaultAddress: addressSelected,
          }),
        );
      } else {
        dispatch(
          setUserAction({
            defaultAddress: null,
          }),
        );
      }
    }
  }, [dispatch, addressSelected]);

  const onClickOpenModal = () => {
    addModal({
      modal: SelectAddress,
    });
  };

  return (
    <div className="border border-grey-200 rounded-lg py-3 px-4 my-4">
      <h3 className="font-medium text-right">ارسال به</h3>
      <div className="text-grey-500 font-normal py-2">
        {!!defaultAddress
          ? defaultAddress?.description
          : homePageText?.selectAddress}
      </div>
      <div className="flex justify-end">
        <Button
          buttonType={'contained'}
          className={'bg-grey-100 !rounded-full !h-11 mt-3'}
          handleClick={onClickOpenModal}
        >
          ویرایش یا تغییر آدرس
        </Button>
      </div>
    </div>
  );
};

const BasketEmptyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-1/2 w-full gap-3 p-10 text-center">
      <div>IMG</div>
      <h3 className="font-semibold text-lg">سبد خرید شما خالی است!</h3>
      <p className="font-light">
        در حال حاضر، هیچ کالایی برای خرید انتخاب نشده است.
      </p>
    </div>
  );
};

const OrderInProgress = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="bg-yellow-400 rounded-full w-[56px] h-[56px] flex justify-center items-center">
        <TimerIcon width="32" height="32" fill={colors.black} />
      </span>
      <div className="text-sm font-light flex flex-col gap-4 items-center">
        <span>سفارش شما با موفقیت ثبت شد</span>
        <span>
          سفارش شما به داروخانه های اطراف ارسال شد، برای ادامه فرآیند خرید باید
          منتظر تأیید داروخانه باشید
        </span>
      </div>
    </div>
  );
};
