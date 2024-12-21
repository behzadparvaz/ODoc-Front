import classNames from 'classnames';

import { useGetCurrentOrder } from '@api/order/orderApis.rq';

import HomeOrderItem from '@com/_molecules/homeOrderItem';
import { useEffect, useRef } from 'react';

const HomeOrderSlider = () => {
  // const { data: quickOrderData } = useGetActiveOrderStatus();
  const {
    data: currentOrder,
    refetch,
    isFetched,
    isRefetching,
    status,
  }: any = useGetCurrentOrder();
  const refInterval = useRef(null);

  useEffect(() => {
    if (status === 'error' || isFetched) {
      clearInterval(refInterval.current);
    }
    refInterval.current = setInterval(() => {
      if (status === 'success' && !isRefetching) {
        refetch();
      }
    }, 30000);

    return () => clearInterval(refInterval.current);
  }, [currentOrder, refetch, status, isRefetching]);

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
                <HomeOrderItem data={currentOrder} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default HomeOrderSlider;
