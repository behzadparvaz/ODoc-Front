import NextLink from '@com/_core/NextLink';
import React from 'react';
import ProgressStepper from './ProgressBar';
type Props = {
  data?: any;
};
const OrderTracking = ({ data }: Props) => {
  const orderStatus = {
    step: 3,
    pharmacyName: 'دکتر ستاری',
    pharmacyBranch: 'بهشتی',
    orderStatus: 'در حال آماده سازی سفارش',
  };

  return (
    <div className="border border-grey-400 bg-white rounded-lg mx-4">
      <ProgressStepper activeStepId={2} />
      <p className="text-sm font-normal px-4 mt-3">
        داروخانه {orderStatus.pharmacyName} ({orderStatus.pharmacyBranch})
      </p>
      <p className="text-sm text-grey-500 px-4 mt-4">
        {orderStatus.orderStatus}
      </p>
      <div className="flex justify-center border-t border-grey-400 py-4 mt-2 cursor-pointer">
        <NextLink href={`/app/orders-history/${data?.orderCode}`}>
          <p className="text-base font-semibold">جزئیات</p>
        </NextLink>
      </div>
    </div>
  );
};

export default OrderTracking;
