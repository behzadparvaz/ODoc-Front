import { useMemo } from 'react';

import Countdown from '@com/_molecules/Countdows';
import OrderHistoryProgress from '@com/_molecules/OrderHistoryProgress';
import { CircleCheckFillIcon, CircleCrossFillIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import { persianDate } from '@utilities/persianDate';
import moment from 'jalali-moment';

type GeneralDetailProps = {
  data?: any;
};

const GeneralDetail = ({ data }: GeneralDetailProps) => {
  const acceptExpirationTime = useMemo(() => {
    const parsedDate = new Date(data?.createDateTime);

    parsedDate.setMinutes(parsedDate.getMinutes() + 60);

    return parsedDate.getTime();
  }, [data?.createDateTime]);

  const isHasQuickOrder = data?.orderDetails?.some(
    (item) => item?.type?.id === 3,
  );

  const renderStep = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
        return 0;
      case 'ack':
        return 1;
      case 'apay':
      case 'nfc':
        return 2;

      case 'pick':
      case 'accept':
        return 3;

      case 'adelivery':
      case 'senddelivery':
        return 4;

      case 'deliverd':
        return 5;

      default:
        return;
    }
  };

  const renderStepComponents = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
      case 'ack':
      case 'apay':
      case 'nfc':
      case 'pick':
      case 'accept':
      case 'adelivery':
      case 'senddelivery':
        return (
          <OrderHistoryProgress
            activeStepId={renderStep()}
            isHasQuickOrder={isHasQuickOrder}
          />
        );
      case 'deliverd':
        return (
          <div className="h-10 flex items-center px-4 gap-[22px]">
            <CircleCheckFillIcon
              width={24}
              height={24}
              fill={colors.green[400]}
            />

            <span className="text-sm text-content-primary font-medium">
              تحویل داده شده
            </span>
          </div>
        );
      case 'return':
      case 'cancelcustomer':
      case 'cancelvendor':
      case 'reject':
        return (
          <div className="h-10 flex items-center px-4 gap-[22px]">
            <CircleCrossFillIcon
              width={24}
              height={24}
              fill={colors.red[400]}
            />

            <span className="text-sm text-content-primary font-medium">
              لغو شده
            </span>
          </div>
        );
    }
  };

  const renderStatusComponent = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
      case 'ack':
      case 'apay':
      case 'nfc':
      case 'pick':
      case 'accept':
      case 'adelivery':
      case 'senddelivery':
        return (
          <div className="h-10 flex items-center justify-between px-4">
            {getOrderStatusMessage(data?.orderStatus?.name)}

            {data?.orderStatus?.name === 'draft' ||
              (data?.orderStatus?.name === 'ack' && (
                <Countdown
                  expirationTime={acceptExpirationTime}
                  className="bg-surface-secondary text-content-secondary rounded-none w-[56px] p-0"
                />
              ))}
          </div>
        );
      case 'deliverd':
      case 'return':
      case 'cancelcustomer':
      case 'cancelvendor':
      case 'reject':
        return;
    }
  };

  const renderTimeLine = useMemo(() => {
    switch (data?.orderStatus?.name) {
      case 'draft':
      case 'ack':
      case 'apay':
      case 'nfc':
        return (
          <span className="text-xs text-content-tertiary">
            {persianDate({ date: data?.createDateTime, isShownTime: true })}
          </span>
        );
      case 'pick':
      case 'accept':
      case 'adelivery':
      case 'senddelivery':
        return (
          <span className="text-xs text-content-tertiary flex gap-1">
            <span>تحویل تا ساعت</span>
            <span>
              {moment(data?.createDateTime, 'MM/DD/YYYY hh:mm:ss A')
                .add(2, 'hours')
                .format('HH:mm')}
            </span>
          </span>
        );
    }
  }, [data?.orderStatus?.name, data?.createDateTime]);

  return (
    <div className="w-full h-[104px] flex flex-col bg-background-gradient.white-to-gray">
      {renderStepComponents()}

      {renderStatusComponent()}

      <div className="h-[44px] flex items-center justify-between text-content-tertiary text-sm leading-5 px-4">
        <span>{`کد سفارش: ${data?.orderCode}`}</span>

        {data?.createDateTime && renderTimeLine}
      </div>
    </div>
  );
};

export default GeneralDetail;
