import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';
import { useFinishOrderPayment } from '@api/order/orderApis.rq';
import { useGetTenderItems } from '@api/tender/tenderApis.rq';
import { TenderItemsListDataModel } from '@utilities/interfaces/tender';
import { convertRialToToman } from '@utilities/mainUtils';
import { Button } from '@com/_atoms/NewButton';
import ActionBar from '@com/Layout/ActionBar';

const PaymentDetail = dynamic(() => import('../components/PaymentDetail'));
const VendorDescriptionDetail = dynamic(
  () => import('../components/VendorDescriptionDetail'),
);
const OrderDetailItems = dynamic(
  () => import('@com/_molecules/OrderDetailItems'),
);
const VendorSection = dynamic(() => import('../components/VendorSection'));

const OfferPreviewContainer = () => {
  const { query } = useRouter();
  const { mutate: mutatePayment, isPending: isLoadingPayment } =
    useFinishOrderPayment();

  const { data: tenderData, isLoading: tenderIsLoading } = useGetTenderItems(
    query?.orderCode as string,
  );
  const [selectedOffer, setSelectedOffer] =
    useState<TenderItemsListDataModel | null>(null);

  const handleClickOnPaymentButton = (orderCode, finalPrice, vendorCode) => {
    const body = {
      orderCode: orderCode,
      finalPrice: finalPrice,
      vendorCode: vendorCode,
    };

    mutatePayment(body);
  };

  useEffect(() => {
    if (tenderIsLoading) return;
    setSelectedOffer(
      tenderData?.queryResult?.find((item) => item?.id === query?.offerId),
    );
  }, [tenderData]);

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

        <PaymentDetail data={selectedOffer} isPaymentPage />
      </div>

      <ActionBar type="price" hasDivider>
        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full flex items-center justify-between">
            <span className="text-md">قابل پرداخت</span>

            {selectedOffer?.finalPrice ? (
              <span className="text-sm font-semibold">
                {`${convertRialToToman(selectedOffer?.finalPrice)}`}
              </span>
            ) : (
              <span className="text-sm font-semibold">رایگان</span>
            )}
          </div>

          <Button
            variant="brand"
            className="w-full"
            size="large"
            onClick={() =>
              handleClickOnPaymentButton(
                query?.orderCode,
                selectedOffer?.finalPrice,
                selectedOffer?.vendorCode,
              )
            }
            isLoading={isLoadingPayment}
          >
            پرداخت
          </Button>
        </div>
      </ActionBar>
    </MainLayout>
  );
};

export default OfferPreviewContainer;
