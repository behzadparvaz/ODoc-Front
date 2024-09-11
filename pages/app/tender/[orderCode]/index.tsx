'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ProgressStepper from '@com/_molecules/ProgressBar';
import MainLayout from '@com/_template/MainLayout';
import Button from '@com/_atoms/Button';
import { ArrowRightIconOutline, CloseIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import Footer from '@com/Layout/Footer';
import { IconButton } from '@com/_atoms/IconButton';
import { useGetTenderItems } from '@api/tender/tenderApis.rq';
import TenderCard from '@com/_organisms/TenderCard';

const Tender = () => {
  const router = useRouter();

  const { orderCode } = router.query;

  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const { data: tenderData, isLoading: tenderIsLoading } = useGetTenderItems(
    orderCode as string,
  );

  const renderTenderCard = () => {
    if (tenderIsLoading)
      return <div className="w-full text-center">در حال بارگذادی...</div>;

    if (!tenderIsLoading && !tenderData?.queryResult)
      return <div className="w-full text-center">هیچ پیشنهادی یافت نشد</div>;

    return (
      <div className="relative h-[calc(100vh-148px)] overflow-auto px-4 md:px-0 pb-20">
        <div className="flex flex-col gap-3 mt-4">
          {tenderData?.queryResult?.map((item) => (
            <TenderCard key={item?.id} data={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <MainLayout
        className="md:px-6"
        headerChildren={
          <div className="flex items-center gap-3">
            <Button
              buttonType="text"
              size="small"
              handleClick={() => router.back()}
            >
              <ArrowRightIconOutline
                height={24}
                width={24}
                fill={colors.black}
              />
            </Button>
            <h2 className="text-black text-base">لیست داروخانه ها</h2>
          </div>
        }
        hasBottomNavigation={false}
      >
        <div className="relative mt-[70px] pb-2 border-b border-b-grey-100 mx-4 md:mx-0">
          <ProgressStepper activeStepId={2} />
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

        <Footer>
          <div className="w-full flex justify-between gap-3">
            <Button
              variant={'danger-light'}
              className="flex-1"
              size={'large'}
              handleClick={() => {}}
            >
              لغو سفارش
            </Button>
            <Button
              variant={'primary'}
              className="flex-1"
              size={'large'}
              handleClick={() => {}}
            >
              ویرایش سفارش
            </Button>
          </div>
        </Footer>
      </MainLayout>
    </div>
  );
};

export default Tender;
