import classNames from 'classnames';

import {
  useGetActiveOrderStatus,
  useGetCurrentOrder,
} from '@api/order/orderApis.rq';
import OrderItem from '@com/_molecules/OrderItem';

const HomeOrderSlider = () => {
  const { data: quickOrderData } = useGetActiveOrderStatus();
  const { data: currentOrder } = useGetCurrentOrder();
  return (
    <>
      {quickOrderData || currentOrder ? (
        <div
          className={classNames(
            'py-4 bg-background-gradient.white-to-gray',
            quickOrderData ? 'pr-4' : 'pr-2',
          )}
        >
          <div className={classNames('gap-x-2', quickOrderData && 'pl-2')}>
            {currentOrder && currentOrder?.orderStatus?.name !== 'deliverd' && (
              <div
                className={classNames(
                  !quickOrderData ? 'w-full' : 'w-[calc(100%-8px)]',
                )}
              >
                <OrderItem data={currentOrder} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default HomeOrderSlider;
