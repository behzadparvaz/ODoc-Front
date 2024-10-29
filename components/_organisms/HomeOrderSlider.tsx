import classNames from 'classnames';

import OrderItem from '@com/_molecules/OrderItem';
import QuickOrderStatus from '@com/_molecules/QuickOrderStatus';
import {
  useGetActiveOrderStatus,
  useGetCurrentOrder,
} from '@api/order/orderApis.rq';
import ScrollSlider from '@com/_molecules/ScrollSlider.nd';

const HomeOrderSlider = () => {
  const { data: quickOrderData } = useGetActiveOrderStatus();
  const { data: currentOrder } = useGetCurrentOrder();

  const quickOrderStatus = quickOrderData?.data?.statusId
    ? quickOrderData?.data?.statusId
    : quickOrderData?.data?.statusName;

  return (
    <>
      {quickOrderData || currentOrder ? (
        <div className="pr-4 py-4 bg-background-gradient.white-to-gray">
          <ScrollSlider
            className={classNames('gap-x-2', quickOrderData && 'pl-2')}
          >
            {currentOrder && currentOrder?.orderStatus?.name !== 'deliverd' && (
              <div
                className={classNames(
                  'w-[calc(100%-8px)]',
                  !quickOrderData && 'w-full',
                )}
              >
                <OrderItem data={currentOrder} />
              </div>
            )}

            {quickOrderData?.data && quickOrderStatus <= 5 && (
              <QuickOrderStatus
                data={quickOrderData?.data}
                status={quickOrderStatus}
              />
            )}
          </ScrollSlider>
        </div>
      ) : null}
    </>
  );
};
export default HomeOrderSlider;
