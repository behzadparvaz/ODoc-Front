import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import { convertRialToToman } from '@utilities/mainUtils';
import { routeList } from '@routes/routeList';
import { persianDate } from '@utilities/persianDate';
import { useGetVendorDetails } from '@api/vendor/vendor.rq';
import { useGetDeliveryCode } from '@api/order/orderApis.rq';

import OrderHistoryProgress from './OrderHistoryProgress';
import Countdown from './Countdows';

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

    parsedDate.setMinutes(parsedDate.getMinutes() + 30);

    return parsedDate.getTime();
  }, [data?.createDateTime]);

  const orderPrepartionTime = useMemo(() => {
    const parsedDate = new Date(data?.prepartionTime);
    return parsedDate.getTime();
  }, []);

  const renderIcon = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
      case 'ack':
        return <OrderHistoryProgress activeStepId={0} />;
      case 'apay':
      case 'nfc':
        return <OrderHistoryProgress activeStepId={1} />;

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
          <span className="text-content-primary text-sm text-medium">
            {vendorData?.vendorName}
          </span>
        );
      case 'adelivery':
      case 'senddelivery':
        return (
          <div className="flex items-center justify-between">
            <span className="text-base text-content-primary">مجتبی فرجی</span>
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
      case 'nfc':
      case 'pick':
      case 'accept':
        return (
          <span className="w-full h-[40px] flex justify-center items-center">
            مشاهده جزییات سفارش
          </span>
        );
      case 'apay':
        return (
          <span className="w-full h-[40px] flex justify-center items-center">
            مشاهده داروخانه ها
          </span>
        );
      case 'adelivery':
      case 'senddelivery':
        return (
          <div className="w-full h-full flex items-center justify-between">
            <span className="text-base text-content-primary">
              کد تحویل سفارش
            </span>

            <div className="flex items-center gap-x-2">
              {deliveryCode
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
      <div
        className="w-full h-full flex flex-col gap-y-3 p-4 cursor-pointer"
        onClick={() =>
          router.push(`${routeList.ordersHistory}/${data?.orderCode}`)
        }
      >
        <div className="flex flex-col gap-y-3">
          {data?.orderStatus?.name === 'deliverd' && (
            <span className="text-base font-semibold">
              {vendorData?.vendorName}
            </span>
          )}
          <span className="text-sm text-content-tertiary">
            {persianDate(data?.createDateTime)}
          </span>
          <div className="flex items-center justify-between">
            {!data?.orderDetails?.length ? (
              <span> نسخه الکترونیک</span>
            ) : (
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
                        <span className="text-sm text-content-tertiary">{`${data?.orderDetails?.length - 4}+`}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
        'w-full border border-0.5 border-border-primary overflow-hidden rounded-lg p-4 flex flex-col gap-y-2 cursor-pointer bg-surface-primary'
      }
      onClick={() =>
        router.push(
          data?.orderStatus?.name === 'apay'
            ? `${routeList.tender}/${data?.orderCode}`
            : `${routeList.ordersHistory}/${data?.orderCode}`,
        )
      }
    >
      <div className="pb-2">{renderIcon()}</div>

      <div className="w-full flex items-center justify-between">
        <span className="text-content-primary text-base text-bold ">
          {getOrderStatusMessage(data.orderStatus?.name)}
        </span>

        {(data.orderStatus?.name === 'draft' ||
          data.orderStatus?.name === 'ack') &&
          acceptExpirationTime && (
            <Countdown expirationTime={acceptExpirationTime} />
          )}

        {data.orderStatus?.name === 'pick' && (
          <Countdown expirationTime={orderPrepartionTime} />
        )}
      </div>

      <span className="text-sm text-content-tertiary">{`کد سفارش ${data?.orderCode}`}</span>

      <div className="w-full">{renderContent()}</div>

      <div className="w-full h-[1px] bg-border-primary" />

      <div className="w-full">{renderButom()}</div>
    </div>
  );
};
export default OrderItem;
