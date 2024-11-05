import { useMemo } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { useGetOrdersHistory } from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import OrderItem from '@com/_molecules/OrderItem';
import { MainLayout } from '@com/Layout';
import ScrollSlider from '@com/_molecules/ScrollSlider.nd';

const OrderHistoryContainer = () => {
  const { push, query } = useRouter();
  const statusId = Number(query?.statusId ?? '-1');
  const { data: orderHistoryData, isLoading } = useGetOrdersHistory(statusId);

  const handleChangeFilter = (item) => {
    push({ query: { ...query, statusId: item.id } }, undefined, {
      shallow: true,
    });
  };

  const previousOrders = useMemo(() => {
    return orderHistoryData?.filter((item) => {
      switch (item?.orderStatus?.name) {
        case 'deliverd':
        case 'return':
        case 'cancelcustomer':
        case 'cancelvendor':
        case 'reject':
          return true;
        default:
          return false;
      }
    });
  }, [orderHistoryData]);

  const currentOrders = useMemo(() => {
    return orderHistoryData?.filter((item) => {
      switch (item?.orderStatus?.name) {
        case 'draft':
        case 'ack':
        case 'apay':
        case 'nfc':
        case 'pick':
        case 'accept':
        case 'adelivery':
        case 'senddelivery':
          return true;
        default:
          return false;
      }
    });
  }, [orderHistoryData]);

  const filterOptions = [
    {
      id: -1,
      name: 'همه',
    },
    {
      id: 0,
      name: 'جاری',
    },
    {
      id: 1,
      name: 'تحویل داده شده',
    },
    {
      id: 2,
      name: 'لغو شده',
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      );
    }
    return (
      <div className="w-full flex flex-col gap-y-3">
        {currentOrders?.length > 0 && (statusId === -1 || statusId === 0) && (
          <div className="flex flex-col gap-y-4 bg-background-gradient.white-to-gray p-4">
            <span className="text-xs text-content-tertiary">{`سفارش فعال ${currentOrders?.length}`}</span>
            {currentOrders?.map((item) => {
              return <OrderItem key={item?.id} data={item} />;
            })}
          </div>
        )}

        {previousOrders?.length > 0 &&
          (statusId === -1 || statusId === 1 || statusId === 2) && (
            <div className="flex flex-col gap-y-4 p-4">
              <span className="text-xs text-content-tertiary">
                سفارش‌های پیشین
              </span>
              {previousOrders?.map((item) => {
                return <OrderItem key={item?.id} data={item} />;
              })}
            </div>
          )}
      </div>
    );
  };

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      title="سفارشات من"
      hasBottomNavigation
    >
      <div className="w-full flex flex-col">
        <ScrollSlider className="gap-x-2 py-2 px-4">
          {filterOptions?.map((item) => {
            return (
              <div
                key={item?.id}
                onClick={() => handleChangeFilter(item)}
                className={classNames(
                  'w-max h-8 flex items-center px-3 bg-white text-xs rounded-full cursor-pointer border border-grey-200',
                  (item?.id === Number(query?.statusId) ||
                    (item?.id === -1 && !query?.statusId)) &&
                    '!bg-grey-50 border-1.5 !border-black -order-1',
                )}
              >
                {item?.name}
              </div>
            );
          })}
        </ScrollSlider>

        {renderContent()}
      </div>
    </MainLayout>
  );
};
export default OrderHistoryContainer;
