import React from 'react';
import ProgressStepper from './ProgressBar';
import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import { useGetVendorDetails } from '@api/vendor/vendor.rq';
import { ClockIconOutline, LodingIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { useCountDownTimer } from '@hooks/useCountDownTimer';
import { getTime } from '@utilities/mainUtils';
type Props = {
  ordersData?: any;
  className?: string;
};
const OrderTracking = ({ ordersData, className = '' }: Props) => {
  const { data: vendorData } = useGetVendorDetails(ordersData?.vendorCode);
  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };
  const creationTime = getTime(ordersData?.createDateTime);
  const prepartionTime = getTime(ordersData?.prepartionTime);
  const createTime = parseTime(creationTime);
  const prepTime = parseTime(prepartionTime);
  const diffInMs = prepTime.getTime() - createTime.getTime();
  const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
  const { timer, ended } = useCountDownTimer({
    hours: 0,
    minutes: diffInMinutes,
    seconds: 0,
  });

  return (
    <div className={`shadow-lg bg-white rounded-xl p-4 ${className}`}>
      {ordersData?.orderStatus?.id === 0 && (
        <div className="flex justify-center pb-3">
          <LodingIcon width={40} height={40} />
        </div>
      )}
      {ordersData?.orderStatus?.id > 2 ? (
        <ProgressStepper activeStepId={ordersData?.orderStatus?.id + 2} />
      ) : (
        <p className="text-base font-semibold">
          {ordersData?.orderStatus?.id === 0
            ? ' سفارش شما به داروخانه ها ارسال شد'
            : ordersData?.orderStatus?.id === 2
              ? 'داروخانه سفارش شما را تأیید کرد'
              : ''}
        </p>
      )}
      {ordersData?.orderStatus?.id === 3 && (
        <p className="text-base font-semibold mt-3">{vendorData?.vendorName}</p>
      )}
      {ordersData?.orderStatus?.id === 7 && (
        <p className="text-base font-semibold mt-3">{'کاوه آهنگر'}</p>
      )}
      <p className="text-sm text-grey-600 mt-1">
        {getOrderStatusMessage(ordersData?.orderStatus?.id)}
      </p>

      <div className="flex justify-between border-t border-grey-100 pt-4 mt-3 cursor-pointer">
        <p className="text-sm font-medium">زمان باقی مانده</p>
        <div className="flex justify-between bg-grey-50 px-2 h-6 items-center rounded-full">
          <ClockIconOutline height={12} width={12} stroke={colors.grey[500]} />
          <p className="text-grey-500 text-xs mr-1">{`${timer?.minutes}:${timer?.seconds}`}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
