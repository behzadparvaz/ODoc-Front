import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useFinishOrderPayment } from '@api/order/orderApis.rq';
import { useGetTenderItems } from '@api/tender/tenderApis.rq';
import { Button } from '@com/_atoms/NewButton';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { TenderItemsListDataModel } from '@utilities/interfaces/tender';
import { convertRialToToman } from '@utilities/mainUtils';
import DeliveryType from '../components/delivery-type';

const PaymentDetail = dynamic(() => import('../components/PaymentDetail'));
const VendorDescriptionDetail = dynamic(
  () => import('../components/VendorDescriptionDetail'),
);
const OrderDetailItems = dynamic(
  () => import('@com/_molecules/OrderDetailItems'),
);
const VendorSection = dynamic(() => import('../components/VendorSection'));

export enum DeliveryTypeEnum {
  onDemand = 'onDemand',
  schedule = 'schedule',
}
interface IRefDeliveryType {
  type: { name: string; value: number };
  date: {
    date: string;
    dayOfWeek: string;
    timeSlots: { id: number; timeRange: string }[];
  };
  time: { id: number; timeRange: string };
}

const OfferPreviewContainer = () => {
  const vendorCodeHasSchedule = [''];
  const royalDelivaryPrice = 75000;
  const { query } = useRouter();
  const refDeliveryType = useRef<IRefDeliveryType | null>(null);

  const { mutate: mutatePayment, isPending: isLoadingPayment } =
    useFinishOrderPayment();

  const { data: tenderData, isLoading: tenderIsLoading } = useGetTenderItems(
    query?.orderCode as string,
  );
  const [selectedOffer, setSelectedOffer] =
    useState<TenderItemsListDataModel | null>(null);

  const [deliveryType, setDeliveryType] = useState<number>(2);

  useEffect(() => {
    if (tenderIsLoading) return;
    setSelectedOffer(
      tenderData?.queryResult?.find((item) => item?.id === query?.offerId),
    );
  }, [tenderData]);

  const onChangeDeliveryType = (value: number) => {
    setDeliveryType(value);
  };
  const calcDelivaryPrice = useMemo(() => {
    if (vendorCodeHasSchedule.includes(selectedOffer?.vendorCode)) {
      if (deliveryType === 1) {
        return {
          ...selectedOffer,
          delivery: {
            ...selectedOffer?.delivery,
            deliveryPrice: royalDelivaryPrice * 10,
            discount: {
              ...selectedOffer?.delivery.discount,
              amount: 0,
            },
          },
        };
      }
      if (deliveryType === 2) {
        return {
          ...selectedOffer,
          delivery: {
            ...selectedOffer?.delivery,
            deliveryPrice: royalDelivaryPrice * 10,
            discount: {
              ...selectedOffer?.delivery.discount,
              amount: royalDelivaryPrice * 10,
            },
          },
        };
      }
    }
    return selectedOffer;
  }, [deliveryType, selectedOffer]);

  const calcFinalPrice = useMemo(() => {
    if (vendorCodeHasSchedule.includes(selectedOffer?.vendorCode)) {
      if (deliveryType === 1) {
        return (
          selectedOffer?.finalPrice -
          selectedOffer?.delivery?.finalPrice +
          royalDelivaryPrice * 10
        );
      }
      if (deliveryType === 2) {
        return selectedOffer?.finalPrice - selectedOffer?.delivery?.finalPrice;
      }
    }
    return selectedOffer?.finalPrice;
  }, [deliveryType, selectedOffer]);

  const handleClickOnPaymentButton = () => {
    const body = {
      orderCode: query?.orderCode,
      finalPrice: calcFinalPrice,
      vendorCode: selectedOffer?.vendorCode,
      ...(vendorCodeHasSchedule.includes(selectedOffer?.vendorCode) && {
        isSchedule: deliveryType === 2,
      }),
      ...(vendorCodeHasSchedule.includes(selectedOffer?.vendorCode) &&
        deliveryType === 2 && {
          deliveryDate: refDeliveryType?.current?.date?.date,
          deliveryTimeId: refDeliveryType?.current?.time?.id,
        }),
    };
    mutatePayment(body);
  };

  return (
    <MainLayout
      title="تأیید نهایی و پرداخت"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
    >
      <div className="w-full pb-[120px] flex flex-col overflow-y-scroll">
        <VendorSection vendorCode={selectedOffer?.vendorCode} />

        <OrderDetailItems data={selectedOffer} />

        {!!selectedOffer?.description?.comment && (
          <VendorDescriptionDetail
            description={selectedOffer?.description?.comment}
          />
        )}
        {vendorCodeHasSchedule.includes(selectedOffer?.vendorCode) && (
          <DeliveryType
            ref={refDeliveryType}
            onChangeDeliveryType={onChangeDeliveryType}
            defaultSelectedIndex={1}
          />
        )}
        <PaymentDetail data={calcDelivaryPrice} isPaymentPage />
      </div>

      <ActionBar type="price" hasDivider className="z-10">
        <div className="w-full flex flex-col gap-y-2 z-20">
          <div className="w-full flex items-center justify-between">
            <span className="text-md">قابل پرداخت</span>

            {calcFinalPrice ? (
              <span className="text-sm font-semibold">
                {`${convertRialToToman(calcFinalPrice)}`}
              </span>
            ) : (
              <span className="text-sm font-semibold">رایگان</span>
            )}
          </div>

          <Button
            variant="brand"
            className="w-full"
            size="large"
            onClick={handleClickOnPaymentButton}
            isLoading={isLoadingPayment}
          >
            تأیید و پرداخت
          </Button>
        </div>
      </ActionBar>
    </MainLayout>
  );
};

export default OfferPreviewContainer;
