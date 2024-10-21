import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ProgressStepper from '@com/_molecules/ProgressBar';
import { CloseIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { IconButton } from '@com/_atoms/IconButton';
import { useGetTenderItems } from '@api/tender/tenderApis.rq';
import TenderCard from '@com/_organisms/TenderCard';
import { MainLayout } from '@com/Layout';
import useModal from '@hooks/useModal';
import { Button } from '@com/_atoms/NewButton';
import Spinner from '@com/_atoms/Spinner';
import CancelOrderModal from '@com/_molecules/CancelOrderModal';

const Tender = () => {
  const router = useRouter();

  const { orderCode } = router.query;
  const { addModal } = useModal();

  const handleCancelOrder = () => {
    addModal({
      modal: CancelOrderModal,
      props: { orderCode: orderCode, step: 'apay' },
    });
  };

  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const { data: tenderData, isLoading: tenderIsLoading } = useGetTenderItems(
    orderCode as string,
  );

  const renderTenderCard = () => {
    if (tenderIsLoading)
      return (
        <div className="w-full text-center">
          <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
        </div>
      );

    if (!tenderIsLoading && !tenderData?.queryResult)
      return <div className="w-full text-center">هیچ پیشنهادی یافت نشد</div>;

    return (
      <div className="relative h-full overflow-auto px-4">
        <div className="flex flex-col gap-3 mt-4">
          {tenderData?.queryResult?.map((item) => (
            <TenderCard
              key={item?.id}
              data={item}
              offerId={item?.id}
              orderCode={orderCode as string}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <MainLayout
        title="لیست داروخانه ها"
        hasHeader
        hasBackButton
        leftIcon={
          <Button
            variant="danger"
            className="w-max ml-4"
            size="small"
            onClick={handleCancelOrder}
          >
            لغو سفارش
          </Button>
        }
      >
        <div className="relative pb-2 border-b border-b-grey-100 mx-4 md:mx-0">
          <ProgressStepper
            activeStepId={tenderData?.queryResult[0]?.orderStatus?.id + 1}
          />
        </div>

        {isBannerOpen && (
          <div className="p-4">
            <div className="flex justify-between items-center w-full h-[80px] bg-grey-200 p-4 rounded-xl gap-x-4">
              <span className="text-sm">
                شما میتوانید سبد خرید خود را مشاهده کنید و یک داروخانه را برای
                پرداخت و ادامه فرآیند ارسال انتخاب کنید.
              </span>
              <IconButton
                handleClick={() => setIsBannerOpen(false)}
                buttonType="outlined"
              >
                <CloseIconOutline
                  width={30}
                  height={30}
                  stroke={colors.black}
                />
              </IconButton>
            </div>
          </div>
        )}

        {renderTenderCard()}
      </MainLayout>
    </div>
  );
};

export default Tender;
