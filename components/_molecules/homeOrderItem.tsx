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
import OrderHistoryProgress from './OrderHistoryProgress';
import moment from 'jalali-moment';

type HomeOrderItemProps = {
  data: any;
};

const HomeOrderItem = ({ data }: HomeOrderItemProps) => {
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

  const isHasQuickOrder = data?.orderDetails?.some(
    (item) => item?.type?.id === 3,
  );
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

  const renderButom = () => {
    return (
      <div className="flex items-center justify-between">
        <div
          className="w-[32px] h-[32px] flex justify-center items-center bg-surface-tertiary rounded-full cursor-pointer"
          onClick={() =>
            router.push(
              `${routeList.ordersHistory}/${data?.orderCode}?previousPage=home`,
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
        className="w-full h-full flex flex-col gap-y-3 p-4"
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
          </div>

          {renderTimeLine}
        </div>
        {renderButom()}
      </div>
    </div>
  );
};
export default HomeOrderItem;
