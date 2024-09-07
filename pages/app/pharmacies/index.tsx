'use client';

import React from 'react';
import ProgressStepper from '@com/_molecules/ProgressBar';
import MainLayout from '@com/_template/MainLayout';
import Button from '@com/_atoms/Button';
import { ArrowRightIconOutline, Shop, ThreeDots } from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import NextImage from '@com/_core/NextImage';
import Footer from '@com/Layout/Footer';

const Pharmacies = () => {
  const router = useRouter();

  return <div>
    <MainLayout className="md:px-6" headerChildren={
      <div className="flex items-center gap-3">
        <Button buttonType="text" size="small" handleClick={() => router.back()}>
          <ArrowRightIconOutline height={24} width={24} fill={colors.black}/>
        </Button>
        <h2 className="text-black text-base">جزییات سفارش</h2>
      </div>
    } hasBottomNavigation={false}>
      <div className="relative mt-[70px] pb-2 border-b border-b-grey-100 mx-4 md:mx-0">
        <ProgressStepper activeStepId={2}/>
      </div>
      <div className="relative h-[calc(100vh-148px)] overflow-auto px-4 md:px-0 pb-20">
        <div className="flex flex-col gap-3 mt-4">
          {[...new Array(3)].map((_, index) => <PharmacyCard key={index}/>)}
        </div>
      </div>
      <Footer>
        <div className="w-full flex justify-between gap-3">
          <Button
            variant={'danger-light'}
            className="flex-1"
            size={'large'}
            handleClick={() => {
            }}
          >
            لغو سفارش
          </Button>
          <Button
            variant={'primary'}
            className="flex-1"
            size={'large'}
            handleClick={() => {
            }}
          >
            ویرایش سفارش
          </Button>
        </div>
      </Footer>
    </MainLayout>
  </div>;
};

export default Pharmacies;

const PharmacyCard = () => {
  return <div className="border border-grey-200 rounded-xl">

    <div className="px-4 py-2 flex items-center gap-2">
      <span className="p-1 rounded-full border border-orange-600"><Shop/></span>
      <h3>داروخانه دکتر ستاری (بهشتی)</h3>
    </div>

    <div className="px-4 py-2 flex justify-between items-center">
      <div className="flex gap-2">
        <div className="border border-grey-400 rounded-md h-[32px] overflow-hidden">
          <NextImage width={32} height={32} src={'/static/images/staticImages/doctor.svg'}/>
        </div>
        <div className="border border-grey-400 rounded-md h-[32px] overflow-hidden">
          <NextImage width={32} height={32} src={'/static/images/staticImages/doctor.svg'}/>
        </div>
        <div className="border border-grey-400 rounded-md h-[32px] overflow-hidden">
          <NextImage width={32} height={32} src={'/static/images/staticImages/doctor.svg'}/>
        </div>

        <div
          className="border border-grey-400 bg-grey-100 rounded-md w-[32px] h-[32px] flex items-center justify-center">
          <ThreeDots/>
        </div>
      </div>

      <div className="text-grey-500 text-sm">۲۶۰،۰۰۰ تومان</div>
    </div>

    <div className="border-t border-t-grey-200 grid grid-cols-2 text-center font-medium">
      <div className="border-l border-l-grey-200 p-3">جزییات سفارش</div>
      <div className="p-3">پرداخت</div>
    </div>
  </div>;
};
