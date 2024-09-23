import { useRouter } from 'next/router';

import CheckBox from '@com/_atoms/CheckBox.nd';
import Map from '@com/_molecules/Map';
import useMapApiCalls from '@hooks/useMapApiCalls';
import { MainLayout } from '@com/Layout';
import { useFinishOrderPayment } from '@api/order/orderApis.rq';
import useModal from '@hooks/useModal';
import SelectAddress from '@com/_organisms/SelectAddress';
import { useGetTenderItems } from '@api/tender/tenderApis.rq';
import { useEffect, useState } from 'react';
import { ArrowRightIconOutline, TickIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import Input from '@com/_atoms/Input.nd';
import { useFormik } from 'formik';
import { VoucherCodeSchema } from '@utilities/validationSchemas';
import { TenderItemsListDataModel } from '@utilities/interfaces/tender';
import Address from '@com/_organisms/Address';
import { convertRialToToman } from '@utilities/mainUtils';
import FixBottomSection from '@com/_atoms/FixBottomSection';
import { Button } from '@com/_atoms/NewButton';

const Preview = () => {
  const { push, query } = useRouter();
  // const { addModal } = useModal();
  const { mutate: mutatePayment, isLoading: isLoadingPayment } =
    useFinishOrderPayment();
  // const { parsiMapLocationAddress, isLoadingMapsAddress } = useMapApiCalls(0);
  const { removeLastModal } = useModal();

  const { data: tenderData, isLoading: tenderIsLoading } = useGetTenderItems(
    query?.orderCode as string,
  );
  const [selectedOffer, setSelectedOffer] =
    useState<TenderItemsListDataModel | null>(null);

  const [initialValues] = useState({
    VoucherCode: '',
  });

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: VoucherCodeSchema,
  //   onSubmit: (value) => {
  //     const body = {
  //       voucherCode: value?.VoucherCode,
  //     };
  //     console.log('body', body);
  //   },
  // });

  const handleClickOnPaymentButton = (orderCode, finalPrice) => {
    const body = {
      orderCode: orderCode,
      finalPrice: finalPrice,
    };
    mutatePayment(body);
  };

  // const handleOpenModal = () => {
  //   addModal({
  //     modal: SelectAddress,
  //   });
  // };

  useEffect(() => {
    if (tenderIsLoading) return;
    setSelectedOffer(
      tenderData?.queryResult?.find((item) => item?.id === query?.offerId),
    );
  }, [tenderData]);

  useEffect(() => {
    removeLastModal();
  }, []);

  return (
    <MainLayout
      title="تأیید نهایی و پرداخت"
      hasHeader
      hasBackButton
      hasBottomGap
      handleClickRightIcon={() => push('/app/orders-history')}
    >
      {/* <div className="w-full h-60 flex justify-center items-center">
        <Map
          addressData={parsiMapLocationAddress}
          loadingAddress={isLoadingMapsAddress}
          addressId={0}
          latitude={35.69976003841564}
          longitude={51.33808390275898}
        />
      </div> */}
      <div className="w-full h-full flex flex-col justify-between gap-y-5 rounded-t-xl -translate-y-[10px] bg-white">
        <Address buttonTitle="تغییر آدرس" />

        <div className="px-4">
          <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />
        </div>

        <div className="flex flex-col gap-3 px-4">
          <p className="text-base font-semibold">روش پرداخت</p>
          <CheckBox
            handleChange={() => {
              return;
            }}
            label="آنلاین"
            labelClassName="text-md mr-8 font-semibold text-black"
            icon={
              <TickIcon
                width={15}
                height={15}
                stroke={colors.white}
                className="mx-auto mt-[1px]"
              />
            }
            checkedClassName="!bg-black"
            boxClassName="w-6 h-6 rounded-full border-black"
            checked={true}
            className="w-full mt-3 z-0"
          />
          <span className="text-xs text-grey-500 font-normal">
            پرداخت آنلاین با تمامی کارت های بانکی
          </span>
        </div>

        {/* <div className="px-4">
          <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />
        </div> */}

        {/* <div className="flex flex-col gap-y-2 px-4">
            <span className="text-md">کد تخفیف را وارد کنید:</span>

            <div className="w-full h-max flex items-center justify-between gap-8 items-center px-5">
              <Input
                required
                type="text"
                placeholder={'کد تخفیف'}
                className="flex-auto"
                inputClassName="placeholder-grey-400 bg-grey-50 text-grey-600 text-sm px-4 custom-input"
                id="VoucherCode"
                name="VoucherCode"
                value={formik.values.VoucherCode}
                onChange={formik.handleChange}
                isTouched={
                  formik.touched.VoucherCode &&
                  Boolean(formik.errors.VoucherCode)
                }
                errorMessage={formik.errors.VoucherCode}
              />

              <Button
                onClick={formik.handleSubmit}
                size="large"
                variant="primary"
                type='submit'
              >
                ثبت کد تخفیف
              </Button>
            </div>
          </div> */}

        <div className="flex flex-col gap-5 bg-grey-50 px-4 py-2">
          <p className="text-base font-semibold">جزییات پرداخت </p>

          <div className="flex flex-col gap-3">
            <div className="w-full h-max flex flex-col gap-y-2">
              <div className="flex items-center justify-between">
                <span className="flex justify-center items-center">
                  {`جمع سفارش ${selectedOffer?.orderDetails?.length > 1 ? `(${selectedOffer?.orderDetails?.length})` : ''}`}
                </span>

                <span className="flex items-center text-md gap-x-1">
                  {!!selectedOffer?.totalPrice &&
                    convertRialToToman(selectedOffer?.totalPrice)}
                  <span className="text-sm text-grey-800">
                    {!!selectedOffer?.totalPrice ? 'تومان' : 'رایگان'}
                  </span>
                </span>
              </div>
            </div>

            <div className="w-full h-max flex flex-col gap-y-2">
              <div className="flex items-center justify-between">
                <span className="flex justify-center items-center">
                  هزینه بسته بندی
                </span>

                <span className="flex items-center text-md gap-x-1">
                  {!!selectedOffer?.packingPrice && selectedOffer?.packingPrice}
                  <span className="text-sm text-grey-800">
                    {!!selectedOffer?.packingPrice ? 'تومان' : 'رایگان'}
                  </span>
                </span>
              </div>
            </div>

            <div className="w-full h-max flex flex-col gap-y-2">
              <div className="flex items-center justify-between">
                <span className="flex justify-center items-center">
                  هزینه ارسال
                </span>

                <span className="flex items-center text-md gap-x-1">
                  {!!selectedOffer?.delivery?.deliveryPrice &&
                    selectedOffer?.delivery?.deliveryPrice}
                  <span className="text-sm text-grey-800">
                    {!!selectedOffer?.delivery?.deliveryPrice
                      ? 'تومان'
                      : 'رایگان'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FixBottomSection>
        <div className="w-full flex justify-between gap-3 px-4 py-4">
          <div className="w-1/2 flex flex-col gap-y-2">
            <span className="text-base font-semibold">
              {`${convertRialToToman(selectedOffer?.finalPrice)}`}
            </span>
            <span className="text-md">قابل پرداخت</span>
          </div>
          <Button
            variant="brand"
            className="w-1/2"
            size="large"
            onClick={() =>
              handleClickOnPaymentButton(
                query?.orderCode,
                selectedOffer?.finalPrice,
              )
            }
            isLoading={isLoadingPayment}
          >
            پرداخت
          </Button>
        </div>
      </FixBottomSection>
    </MainLayout>
  );
};

export default Preview;
