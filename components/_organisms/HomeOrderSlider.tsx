import classNames from 'classnames';

import {
  useGetActiveOrderStatus,
  useGetCurrentOrder,
} from '@api/order/orderApis.rq';
import OrderItem from '@com/_molecules/OrderItem';

const HomeOrderSlider = () => {
  // const { data: quickOrderData } = useGetActiveOrderStatus();
  const { data: currentOrder } = useGetCurrentOrder();
  return (
    <>
      {currentOrder ? (
        <div
          className={classNames(
            'py-4 bg-background-gradient.white-to-gray pr-2',
          )}
        >
          <div className={classNames('gap-x-2 pl-2')}>
            {currentOrder && currentOrder?.orderStatus?.name !== 'deliverd' && (
              <div className="w-full">
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
