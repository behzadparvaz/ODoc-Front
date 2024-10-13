import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';

import { Button } from '@com/_atoms/NewButton';
import { TimerIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import { convertRialToToman } from '@utilities/mainUtils';
import { routeList } from '@routes/routeList';
import { persianDate } from '@utilities/persianDate';

import OrderHistoryProgress from './OrderHistoryProgress';
import Countdown from './Countdows';

type OrderItemProps = {
  data: any;
};

const OrderItem = ({ data }: OrderItemProps) => {
  const router = useRouter();

  const acceptExpirationTime = useMemo(() => {
    const parsedDate = new Date(data?.createDateTime);

    parsedDate.setMinutes(parsedDate.getMinutes() + 30);

    return parsedDate.getTime();
  }, [data?.createDateTime]);

  const renderIcon = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
      case 'ack':
        return (
          <div className="w-[60px] h-[60px] rounded-full">
            <div className="w-[47px] h-[47px] rounded-full bg-surface-secondary flex justify-center items-center">
              <TimerIcon width={32} height={32} fill={colors?.black} />
            </div>
          </div>
        );

      case 'pick':
      case 'accept':
        return <OrderHistoryProgress activeStepId={0} />;

      case 'adelivery':
      case 'senddelivery':
        return <OrderHistoryProgress activeStepId={1} />;

      default:
        return <></>;
    }
  };

  const renderContent = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
      case 'ack':
        return (
          <span className="h-[48px] text-md text-content-tertiary">
            سفارش شما برای داروخانه های اطراف ارسال شد
          </span>
        );
      case 'apay':
      case 'nfc':
        return (
          <div className="flex flex-col gap-y-3">
            <div className="w-full h-full flex items-center justify-between">
              <span className="w-full h-[48px] text-md text-content-primary flex items-center">
                {`${data?.orderDetails?.length} داروخانه نسخه شما را تأیید کرد`}
              </span>

              <div className="w-max flex flex-row-reverse gap-0">
                {data?.orderDetails?.map((item, index) => (
                  <div
                    key={item?.id}
                    className={classNames(
                      'h-[32px] w-[32px] rounded-full bg-surface-background-secondary border border-surface-overlay-Light flex items-center justify-center',
                      index === 1 && `-translate-x-3`,
                      index === 2 && `-translate-x-6`,
                      index === 3 && `-translate-x-9`,
                      `z-${index - 10}`,
                    )}
                  >
                    {index < 3 && (
                      <Image
                        src={
                          '/static/images/staticImages/vendor-empty-logo.png'
                        }
                        width={20}
                        height={20}
                        alt="vendor-logo"
                      />
                    )}

                    {index === 3 && (
                      <span className="text-content-secondary">{`${data?.orderDetails?.length - 3}+`}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <span className="text-sm text-content-tertiary">
              حداکثر زمان شما برای پرداخت ۲ ساعت است
            </span>
          </div>
        );
      case 'pick':
      case 'accept':
        return (
          <div className="flex flex-col gap-y-3">
            <span className="text-content-primary">{data?.vendorName}</span>
            <div className="w-full flex items-center justify-between">
              <span className="text-sm text-content-tertiary">
                زمان باقی مانده برای آماده سازی سفارش
              </span>

              {acceptExpirationTime && (
                <Countdown expirationTime={acceptExpirationTime} />
              )}
            </div>
          </div>
        );
      case 'adelivery':
      case 'senddelivery':
        return (
          <div className="flex items-center justify-between">
            <span className="text-base text-content-primary">
              {'کاوه آهنگر'}
            </span>
            <span className="text-sm text-center text-content-tertiary border border-border-primary rounded-xl w-[63px] h-[50px] flex justify-center items-center overflow-hidden text-wrap ">
              123 56789
            </span>
          </div>
        );

      default:
        return <></>;
    }
  };

  const renderButom = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
      case 'ack':
        return (
          <div className="w-full h-full flex items-center justify-between">
            <span className="text-sm text-content-tertiary">
              زمان انتظار حداکثر ۳۰ دقیقه
            </span>

            {/* {acceptExpirationTime && (
              <Countdown expirationTime={acceptExpirationTime} />
            )} */}
          </div>
        );

      case 'apay':
      case 'nfc':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <Button
              variant="secondary"
              size="large"
              className="w-full"
              onClick={() =>
                router.push(`${routeList.tender}/${data?.orderCode}`)
              }
            >
              مشاهده داروخانه ها
            </Button>
          </div>
        );

      case 'pick':
      case 'accept':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <Button
              variant="secondary"
              size="large"
              className="w-full"
              onClick={() =>
                router.push(`${routeList.ordersHistory}/${data?.orderCode}`)
              }
            >
              مشاهده جزییات سفارش
            </Button>
          </div>
        );

      case 'adelivery':
      case 'senddelivery':
        return (
          <div className="w-full h-full flex items-center justify-between">
            <span className="text-base text-content-primary">
              کد تحویل سفارش
            </span>

            <div className="flex items-center gap-x-2">
              {data?.orderCode
                ?.toString()
                .split('')
                .map((item, index) => (
                  <span
                    key={index + item}
                    className="flex items-center justify-center bg-surface-disable h-[24px] w-[24px] rounded-lg text-content-secondary text-base"
                  >
                    {item}
                  </span>
                ))}
            </div>
          </div>
        );

      default:
        return <></>;
    }
  };

  if (
    data?.orderStatus?.name === 'deliverd' ||
    data?.orderStatus?.name === 'return' ||
    data?.orderStatus?.name === 'cancelcustomer' ||
    data?.orderStatus?.name === 'cancelvendor' ||
    data?.orderStatus?.name === 'reject'
  ) {
    return (
      <div className="w-full h-full flex flex-col gap-y-3 p-4">
        <div className="flex flex-col gap-y-3">
          {data?.orderStatus?.name === 'deliverd' && (
            <span className="text-base font-semibold">
              {'داروخانه ۱۳ آبان'}
            </span>
          )}
          <span className="text-sm text-content-tertiary">
            {persianDate(data?.createDateTime)}
          </span>
          <div className="flex items-center justify-between">
            {!data?.orderDetails?.length ? (
              <span> نسخه الکترونیک</span>
            ) : (
              data?.orderDetails?.map((item, index) => (
                <>
                  <div
                    key={item.irc}
                    className="flex items-center gap-x-2 overflow-hidden"
                  >
                    {index < 4 && (
                      <Image
                        src={item?.imageLink}
                        alt="order-items"
                        width={32}
                        height={32}
                      />
                    )}
                    {index === 4 && (
                      <span className="text-sm text-content-tertiary">{`${data?.orderDetails?.length - 4}+`}</span>
                    )}
                  </div>
                </>
              ))
            )}
            <span className="text-base text-content-primary">
              {data?.orderStatus?.name === 'deliverd'
                ? convertRialToToman(data?.finalPrice)
                : 'لغو شده'}
            </span>
          </div>
        </div>

        <div className="h-[0.5px] bg-border-primary" />
      </div>
    );
  }

  return (
    <div
      className={
        'w-full border border-0.5 border-border-primary overflow-hidden rounded-lg p-4 flex flex-col items-center gap-y-3'
      }
    >
      <div className="w-full flex px-4 items-center justify-center">
        {renderIcon()}
      </div>

      <span className="w-full h-[28px] text-content-primary text-base text-bold flex justify-center items-center">
        {getOrderStatusMessage(data.orderStatus?.name)}
      </span>

      <div className="w-full">{renderContent()}</div>

      <div className="w-full h-[1px] bg-border-primary" />

      <div className="h-[72px] w-full">{renderButom()}</div>
    </div>
  );
};
export default OrderItem;
