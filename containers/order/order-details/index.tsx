import { useRouter } from 'next/router';
import OrderItemCard from '@com/_molecules/OrderItemCard';
import OrderStatus from '@com/_molecules/OrderStatus';
import { MainLayout } from '@com/Layout';
import ProgressStepper from '@com/_molecules/ProgressBar';
import { TenderItemsOrderDataModel } from '@utilities/interfaces/tender';
import { useGetOrderDetails } from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import NextImage from '@com/_core/NextImage';
import { generalTexts } from '@com/texts/generalTexts';
import CancelOrderModal from '@com/_molecules/CancelOrderModal';
import useModal from '@hooks/useModal';
import { Button } from '@com/_atoms/NewButton';
import OrderHistoryProgress from '@com/_molecules/OrderHistoryProgress';
import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import Countdown from '@com/_molecules/Countdows';
import { useMemo, useState } from 'react';
import { persianDate } from '@utilities/persianDate';
import { motion } from 'framer-motion';
import {
  ChevronDownIcon,
  ChevronLeftIconOutline,
  ChevronUpIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import Divider from '@com/_atoms/Divider';
import OrderDetailItems from '@com/_molecules/OrderDetailItems';
import TenderCard from '@com/_organisms/TenderCard';

const OrderDetailsContainer = () => {
  const { query } = useRouter();

  const { addModal } = useModal();

  const handleCancelOrder = () => {
    addModal({
      modal: CancelOrderModal,
      props: { orderCode: query?.orderCode as string, step: 'draft' },
    });
  };

  const { data, isLoading } = useGetOrderDetails(query?.orderCode as string);

  const [policiesCollapseOpen, setPoliciesCollapseOpen] = useState(true);

  const acceptExpirationTime = useMemo(() => {
    const parsedDate = new Date(data?.createDateTime);

    parsedDate.setMinutes(parsedDate.getMinutes() + 60);

    return parsedDate.getTime();
  }, [data?.createDateTime]);

  const renderStep = () => {
    switch (data?.orderStatus?.name) {
      case 'draft':
      case 'ack':
        return 0;
      case 'apay':
      case 'nfc':
        return 1;

      case 'pick':
      case 'accept':
        return 2;

      case 'adelivery':
      case 'senddelivery':
        return 3;

      case 'deliverd':
        return 4;

      default:
        return;
    }
  };

  const policiesAnimate = {
    transition: { type: 'tween' },
    height: policiesCollapseOpen ? 'auto' : 0,
  };

  return (
    <MainLayout
      title="جزئیات سفارش"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
    >
      {isLoading ? (
        <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
      ) : (
        <div className="w-full h-max rounded-t-lg flex flex-col">
          <div className="w-full h-[104px] flex flex-col bg-background-gradient.white-to-gray">
            <OrderHistoryProgress
              className="h-[40px]"
              activeStepId={renderStep()}
            />
            <div className="h-10 flex items-center justify-between px-4">
              {getOrderStatusMessage(data?.orderStatus?.name)}

              {data?.orderStatus?.name === 'draft' && (
                <Countdown
                  expirationTime={acceptExpirationTime}
                  className="bg-surface-secondary text-content-secondary rounded-none w-[56px] p-0"
                />
              )}
            </div>

            <div className="h-[44px] flex items-center justify-between text-content-tertiary text-sm leading-5 px-4">
              <span>{`کد سفارش: ${data?.orderCode}`}</span>

              {persianDate({ date: data?.createDateTime, isShownTime: true })}
            </div>
          </div>

          <div className="h-[78px] w-full flex flex-col justify-center px-4">
            <span className="text-base leading-6 font-medium">آدرس</span>
            <span className="text-sm text-content-tertiary">
              {data?.customer?.addresses[0]?.valueAddress}
            </span>
          </div>

          {/* <OrderStatus data={data} /> */}

          {/* {data?.orderStatus?.name !== 'apay' && (
            data?.
            <TenderCard />
          )} */}

          <OrderDetailItems data={data} />

          {data?.description && (
            <>
              <Divider />

              <div className="flex flex-col justify-center py-3 px-4">
                <span className="text-md font-semibold">توضیحات</span>
                <span className="text-sm font-normal text-content-secondary">
                  {data?.description}
                </span>
              </div>
            </>
          )}

          <Divider />

          <div className="flex flex-col justify-center">
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => setPoliciesCollapseOpen(!policiesCollapseOpen)}
            >
              <span className="text-sm font-semibold">
                {generalTexts.policiesTitle}
              </span>

              {policiesCollapseOpen ? (
                <ChevronUpIcon width={20} height={20} fill={colors.gray[400]} />
              ) : (
                <ChevronDownIcon
                  width={20}
                  height={20}
                  stroke={colors.gray[400]}
                />
              )}
            </div>

            <motion.div
              style={{ overflow: 'hidden', padding: '0 16px' }}
              initial={{ height: 0, opacity: 1 }}
              animate={policiesAnimate}
              exit={{ height: 0, opacity: 1 }}
            >
              <div className="py-3">
                <span className="text-sm font-normal text-content-secondary">
                  {generalTexts.policiesDesc}
                </span>
              </div>
            </motion.div>
          </div>

          <Divider />

          <div className="py-3 px-4 text-content-primary text-base leading-6">
            تماس با پشتیبانی
          </div>

          <Divider />

          {(data?.orderStatus?.name === 'draft' ||
            data?.orderStatus?.name === 'apay') && (
            <div
              className="py-3 px-4 text-content-negative cursor-pointer"
              onClick={handleCancelOrder}
            >
              لغو سفارش
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default OrderDetailsContainer;
