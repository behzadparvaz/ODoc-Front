import classNames from 'classnames';
import { useGetCurrentOrder } from '@api/order/orderApis.rq';
import HomeOrderItem from '@com/_molecules/homeOrderItem';
import { useEffect, useRef, useState } from 'react';
import useStorage from '@hooks/useStorage';
import { motion, AnimatePresence } from 'framer-motion';

const HomeOrderSlider = () => {
  const {
    data: currentOrder,
    refetch,
    isFetched,
    isRefetching,
    status,
  }: any = useGetCurrentOrder();
  const refInterval = useRef(null);
  const { setItem, getItem } = useStorage();
  const currentOrderState = getItem('currentOrderState', 'local');

  const hiddenCurrentOrder = currentOrder?.orderCode === currentOrderState;

  // State to control visibility
  const [isVisible, setIsVisible] = useState<boolean>(
    !hiddenCurrentOrder || true,
  );

  useEffect(() => {
    if ((status === 'error' && isFetched) || hiddenCurrentOrder) {
      clearInterval(refInterval.current);
    }
    refInterval.current = setInterval(() => {
      if (status === 'success' && !isRefetching) {
        refetch();
      }
    }, 5000);

    return () => clearInterval(refInterval.current);
  }, [currentOrder, refetch, status, isRefetching, hiddenCurrentOrder]);

  const handleClose = () => {
    setIsVisible(false);
    setItem('currentOrderState', currentOrder?.orderCode, 'local');
  };

  if (hiddenCurrentOrder || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {currentOrder && currentOrder?.orderStatus?.name !== 'delivered' ? (
        <div
          className={classNames(
            'py-4 bg-background-gradient.white-to-gray pr-2 rounded-lg shadow-lg',
          )}
        >
          <div className={classNames('gap-x-2 pl-2')}>
            <div className="w-full">
              <HomeOrderItem data={currentOrder} onClose={handleClose} />
            </div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default HomeOrderSlider;
