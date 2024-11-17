import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useGetDeliveryCode } from '@api/order/orderApis.rq';
import { useGetVendorDetails } from '@api/vendor/vendor.rq';
import { routeList } from '@routes/routeList';
import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import { convertRialToToman } from '@utilities/mainUtils';
import { persianDate } from '@utilities/persianDate';

import { Button } from '@com/_atoms/NewButton';
import {
  ArrowLeftIconOutline,
  CloseIconOutline,
  NewTickIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import classNames from 'classnames';
import Countdown from './Countdows';
import OrderHistoryProgress from './OrderHistoryProgress';

type OrderItemProps = {
  data: any;
};

const OrderItem = ({ data }: OrderItemProps) => {
  const router = useRouter();
  const { data: vendorData } = useGetVendorDetails(data?.vendorCode);
  const { data: deliveryCode } = useGetDeliveryCode(
    (data?.orderStatus?.name === 'adelivery' ||
      data?.orderStatus?.name === 'senddelivery') &&
      data?.orderCode,
  );

  const acceptExpirationTime = useMemo(() => {
    const parsedDate = new Date(data?.createDateTime);

    parsedDate.setMinutes(parsedDate.getMinutes() + 60);

    return parsedDate.getTime();
  }, [data?.createDateTime]);

  const renderIcon = () => {
    switch (data?.orderStatus?.name) {
      case 'ack':
        return <OrderHistoryProgress activeStepId={0} />;
      case 'apay':
      case 'nfc':
        return <OrderHistoryProgress activeStepId={1} />;
      case 'draft':
        return <OrderHistoryProgress activeStepId={2} />;
      case 'pick':
      case 'accept':
        return <OrderHistoryProgress activeStepId={2} />;

      case 'adelivery':
      case 'senddelivery':
        return <OrderHistoryProgress activeStepId={3} />;

      case 'deliverd':
        return <OrderHistoryProgress activeStepId={4} />;

      default:
        return <></>;
    }
  };

  const renderContent = () => {
    switch (data?.orderStatus?.name) {
      case 'apay':
      case 'nfc':
        return (
          <div className="flex flex-col gap-y-3">
            <span className="w-full h-[48px] text-md text-content-primary flex items-center">
              داروخانه نسخه شما را تأیید کرد
            </span>
          </div>
        );
      case 'pick':
      case 'accept':
        return (
          <span className="text-content-primary text-xs text-medium">
            {vendorData?.vendorName}
          </span>
        );
      case 'adelivery':
      case 'senddelivery':
        return (
          <div className="flex items-center justify-between">
            <span className="text-sm text-content-primary">مجتبی فرجی</span>
            <span className="text-xs text-center text-content-tertiary border border-border-primary rounded-xl w-[63px] h-[50px] flex justify-center items-center overflow-hidden text-wrap ">
              123 56789
            </span>
          </div>
        );

      default:
        return <></>;
    }
  };

  const renderButom = () => {
    return (
      <div className="flex items-center justify-between">
        <div
          className="w-[32px] h-[32px] flex justify-center items-center bg-surface-tertiary rounded-full cursor-pointer"
          onClick={() =>
            router.push(
              data?.orderStatus?.name === 'apay'
                ? `${routeList.tender}/${data?.orderCode}`
                : `${routeList.ordersHistory}/${data?.orderCode}`,
            )
          }
        >
          <ArrowLeftIconOutline width={24} height={24} fill={colors.black} />
        </div>
      </div>
    );
  };

  if (
    data?.orderStatus?.name === 'deliverd' ||
    data?.orderStatus?.name === 'return' ||
    data?.orderStatus?.name === 'cancelcustomer' ||
    data?.orderStatus?.name === 'cancelvendor' ||
    data?.orderStatus?.name === 'reject'
  ) {
    return (
      <div
        className="w-full h-full flex flex-col gap-y-3 p-4 cursor-pointer"
        onClick={() =>
          router.push(`${routeList.ordersHistory}/${data?.orderCode}`)
        }
      >
        <div className="flex flex-col gap-y-3">
          {data?.orderStatus?.name === 'deliverd' && (
            <span className="text-sm font-semibold">
              {vendorData?.vendorName}
            </span>
          )}
          <span className="text-xs text-content-tertiary">
            {persianDate({ date: data?.createDateTime, isShownTime: true })}
          </span>

          <>
            {!data?.orderDetails?.length ? (
              <div className="flex items-center justify-between">
                <span> نسخه الکترونیک</span>
                <span className="text-sm text-content-primary">
                  {data?.orderStatus?.name === 'deliverd'
                    ? convertRialToToman(data?.finalPrice)
                    : 'لغو شده'}
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                  {data?.orderDetails?.map((item, index) => (
                    <div className="" key={item.irc}>
                      <div className="flex items-center justify-center overflow-hidden">
                        {index < 4 && (
                          <Image
                            src={item?.imageLink}
                            alt="order-items"
                            width={32}
                            height={32}
                          />
                        )}
                        {index === 4 && (
                          <span className="text-xs text-content-tertiary">{`${data?.orderDetails?.length - 4}+`}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-x-[22px]">
                    <span
                      className={classNames(
                        'w-[24px] h-[24px] rounded-full flex items-center justify-center',
                        data?.orderStatus?.name === 'deliverd'
                          ? 'bg-content-positive'
                          : 'bg-content-negative',
                      )}
                    >
                      {data?.orderStatus?.name === 'deliverd' ? (
                        <NewTickIcon
                          width={20}
                          height={20}
                          stroke={colors.white}
                        />
                      ) : (
                        <CloseIconOutline
                          width={20}
                          height={20}
                          stroke={colors.white}
                        />
                      )}
                    </span>
                    <span className="text-content-primary text-sm">
                      {data?.orderStatus?.name === 'deliverd'
                        ? 'تحویل شده'
                        : 'لغو شده'}
                    </span>
                  </span>
                  <Button variant="secondary" size="medium">
                    سفارش مجدد
                  </Button>
                </div>
              </div>
            )}
          </>
        </div>

        <div className="h-[0.5px] bg-border-primary" />
      </div>
    );
  }

  return (
    <div
      className={
        'w-full border border-0.5 border-border-primary overflow-hidden rounded-lg py-2 px-3 flex flex-col gap-y-2 cursor-pointer bg-surface-primary'
      }
    >
      <div className="w-full">{renderIcon()}</div>
      <div className="flex justify-between">
        <div>
          <div className="w-full flex items-center justify-between">
            <span className="text-content-primary text-sm text-bold ">
              {getOrderStatusMessage(data.orderStatus?.name)}
            </span>

            {(data.orderStatus?.name === 'draft' ||
              data.orderStatus?.name === 'ack') &&
              acceptExpirationTime && (
                <Countdown expirationTime={acceptExpirationTime} />
              )}
          </div>

          <span className="text-xs text-content-tertiary">
            {persianDate({ date: data?.createDateTime, isShownTime: true })}
          </span>
        </div>
        {renderContent()}
        {renderButom()}
      </div>
    </div>
  );
};
export default OrderItem;
