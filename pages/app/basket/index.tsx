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
import {
  ArrowRightIconOutline,
  ChevronLeftIconOutline,
  TickFillIcon,
  TickIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';
import Footer from '@com/Layout/Footer';

const Page = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state?.user);
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket();
  const { mutate: deleteBasket } = useDeleteCurrentBasket();
  const { mutate: createOrderDraft } = useCreateOrderDraft();
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
          <Button
            variant={'primary'}
            className="flex-1"
            size={'large'}
            handleClick={onSubmitBasket}
          >
            ارسال به داروخانه
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
        </div>
      }
    >
      <div className="relative h-[calc(100vh-73px)] mt-[73px] pb-14 md:pb-20 overflow-auto">
        <OrderInProgress />
        {products?.length === 0 ? (
          <BasketEmptyPage />
        ) : (
          <>
            <div className="flex flex-col px-4 md:px-0">
              {products?.map((pr) => (
                <HorizontalProductCard
                  prInfo={{ ...pr }}
                  key={pr.irc}
                  onSuccessChanged={refetchGetBasket}
                  hasAddToCartButton
                />
              ))}

              <Address />
            </div>

            <Footer>
              <div className="w-full flex justify-between gap-3">
                <Button
                  variant={'primary'}
                  className="flex-1"
                  size={'large'}
                  handleClick={onSubmitBasket}
                >
                  ارسال به داروخانه
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
              </div>
            </Footer>
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
  const router = useRouter();
  return (
    <div className="bg-surface-800 mx-4 rounded-lg px-3 py-4 text-white flex gap-3 items-start">
      <span className="bg-white rounded-full p-1">
        <TickIcon width={14} height={14} className="stroke-surface-800" />
      </span>
      <div className="text-sm font-light flex flex-col gap-4 items-start">
        <span>سفارش شما به داروخانه های اطراف با موفقیت ارسال شد.</span>

        <Button
          size={'small'}
          className="bg-surface-900 py-4"
          handleClick={() => router.push(routeList?.tender)}
        >
          <div className="flex text-sm items-center font-light">
            <span>جزییات سفارش</span>
            <ChevronLeftIconOutline width={24} height={24} fill={'white'} />
          </div>
        </Button>
      </div>
    </div>
  );
};
