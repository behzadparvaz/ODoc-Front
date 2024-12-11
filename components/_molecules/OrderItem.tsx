import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import { convertRialToToman } from '@utilities/mainUtils';
import { routeList } from '@routes/routeList';
import { persianDate } from '@utilities/persianDate';
import { useGetVendorDetails } from '@api/vendor/vendor.rq';
import { useGetDeliveryCode } from '@api/order/orderApis.rq';

import OrderHistoryProgress from './OrderHistoryProgress';
import Countdown from './Countdows';
import { Button } from '@com/_atoms/NewButton';
import classNames from 'classnames';
import { colors } from '@configs/Theme';
import { useAddListToBasket } from '@api/basket/basketApis.rq';
import NextImage from '@com/_core/NextImage';
import Icon from '@utilities/icon';
import moment from 'jalali-moment';

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
  const { mutate: addListToBasket, isPending: isAddListToBasketLoading } =
    useAddListToBasket();

  const acceptExpirationTime = useMemo(() => {
    const parsedDate = new Date(data?.createDateTime);

    parsedDate.setMinutes(parsedDate.getMinutes() + 60);

    return parsedDate.getTime();
  }, [data?.createDateTime]);

  const isHasQuickOrder = data?.orderDetails?.some(
    (item) => item?.type?.id === 3,
  );

  const handleCreateOrderAgain = (e) => {
    e?.stopPropagation();

    const filteredItems = data?.orderDetails?.filter(
      (item) => !item?.referenceNumber,
    );
    filteredItems?.forEach((item) => {
      if (!!item?.alternatives?.length) {
        return {
          description: item?.alternatives?.[0]?.description,
          irc: item?.alternatives?.[0]?.irc,
          quantity: item?.quantity,
          imageLink: item?.alternatives?.[0]?.imageLink,
          productName: item?.alternatives?.[0]?.productName,
          unit: item?.alternatives?.[0]?.unit,
          productType: item?.alternatives?.[0]?.type?.id,
        };
      } else {
        return {
          description: item?.description,
          irc: item?.irc,
          quantity: item?.quantity,
          imageLink: item?.imageLink,
          productName: item?.productName,
          unit: item?.unit,
          productType: item?.type?.id,
        };
      }
    });

    console.log('bodyItems', filteredItems);

    // addListToBasket({
    //   nationalCode: data?.customer?.nationalCode,
    //   items: bodyItems,
    // });
  };

  const renderIcon = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
        return (
          <OrderHistoryProgress
            activeStepId={0}
            isHasQuickOrder={isHasQuickOrder}
          />
        );
      case 'ack':
        return (
          <OrderHistoryProgress
            activeStepId={1}
            isHasQuickOrder={isHasQuickOrder}
          />
        );
      case 'apay':
      case 'nfc':
        return (
          <OrderHistoryProgress
            activeStepId={2}
            isHasQuickOrder={isHasQuickOrder}
          />
        );

      case 'pick':
      case 'accept':
        return (
          <OrderHistoryProgress
            activeStepId={3}
            isHasQuickOrder={isHasQuickOrder}
          />
        );

      case 'adelivery':
      case 'senddelivery':
        return (
          <OrderHistoryProgress
            activeStepId={4}
            isHasQuickOrder={isHasQuickOrder}
          />
        );

      case 'deliverd':
        return (
          <OrderHistoryProgress
            activeStepId={5}
            isHasQuickOrder={isHasQuickOrder}
          />
        );

      default:
        return <></>;
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
            {vendorData?.isShowName
              ? vendorData?.vendorName
              : vendorData?.secondaryName}
          </span>
        );
      case 'adelivery':
      case 'senddelivery':
        return (
          <div className="h-[40px] flex items-center justify-between">
            <span className="text-sm text-content-primary">پیک تپسی دکتر</span>
            {/* <span className="text-xs text-center text-content-tertiary border border-border-primary rounded-xl w-[63px] h-[50px] flex justify-center items-center overflow-hidden text-wrap ">
              123 56789
            </span> */}
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
            <span className="text-sm text-content-primary">کد تحویل سفارش</span>

            <div className="flex items-center flex-row-reverse gap-x-2">
              {deliveryCode
                ?.toString()
                ?.split('')
                ?.map((item, index) => (
                  <span
                    key={index + item}
                    className="flex items-center justify-center bg-surface-disable h-[24px] w-[24px] rounded-base text-content-secondary text-sm"
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
            <span className="text-sm font-semibold">
              {vendorData?.isShowName
                ? vendorData?.vendorName
                : vendorData?.secondaryName}
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
                    <div className="" key={item?.irc}>
                      <div className="flex items-center justify-center overflow-hidden">
                        {index < 4 && (
                          <NextImage
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
                  <span className="flex items-center gap-x-[20px] px-1">
                    <span
                      className={classNames(
                        'w-[24px] h-[24px] rounded-full flex items-center justify-center',
                      )}
                    >
                      {data?.orderStatus?.name === 'deliverd' ? (
                        <Icon
                          name="CircleCheckFill"
                          height={1.25}
                          width={1.25}
                          fill={colors.green[400]}
                        />
                      ) : (
                        <Icon
                          name="CircleCrossFill"
                          width={1.25}
                          height={1.25}
                          fill={colors.red[400]}
                        />
                      )}
                    </span>
                    <span className="text-content-primary text-sm">
                      {data?.orderStatus?.name === 'deliverd'
                        ? 'تحویل شده'
                        : 'لغو شده'}
                    </span>
                  </span>
                  <Button
                    variant="secondary"
                    size="medium"
                    className="z-10 w-40"
                    onClick={handleCreateOrderAgain}
                    isLoading={isAddListToBasketLoading}
                  >
                    سفارش مجدد
                  </Button>
                </div>
              </div>
            )}
          </>
        </div>

        {<div className="h-[0.5px] bg-border-primary" />}
      </div>
    );
  }

  return (
    <div
      className={
        'w-full border border-0.5 border-border-primary overflow-hidden rounded-base p-4 flex flex-col gap-y-2 cursor-pointer bg-surface-primary'
      }
      onClick={() =>
        router.push(`${routeList.ordersHistory}/${data?.orderCode}`)
      }
    >
      <div className="pb-2">{renderIcon()}</div>

      <div className="w-full flex items-center justify-between">
        <span className="text-content-primary text-sm text-bold ">
          {getOrderStatusMessage(data?.orderStatus?.name)}
        </span>

        {(data.orderStatus?.name === 'draft' ||
          data.orderStatus?.name === 'ack') &&
          acceptExpirationTime && (
            <Countdown expirationTime={acceptExpirationTime} />
          )}
      </div>

      {renderTimeLine}

      <div className="w-full">{renderContent()}</div>

      <div className="w-full h-[1px] bg-border-primary" />

      <div className="w-full">{renderButom()}</div>
    </div>
  );
};
export default OrderItem;
