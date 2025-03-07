import Spinner from '@com/_atoms/Spinner';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const OrderInProgress = dynamic(() => import('./OrderInProgress'));
const BasketItems = dynamic(() => import('./BasketItems'));
const BasketEmpty = dynamic(() => import('./BasketEmpty'));

interface IRenderContentProps {
  products: any[];

  isSpecialPatient: boolean;
  isLoading: boolean;
  isOrderInProgress: boolean;
  isEmpty: boolean;
  refetchBasketHandler: () => void;
}

const Content = ({
  products,
  isSpecialPatient,
  isLoading,
  isOrderInProgress,
  isEmpty,
  refetchBasketHandler,
}: IRenderContentProps) => {
  const renderContent = useMemo(() => {
    return (
      <div className="relative pt-4 px-4 overflow-auto">
        {!isOrderInProgress && (
          <div className="w-full  flex flex-col gap-y-4">
            <BasketItems
              isSpecialPatient={isSpecialPatient}
              products={products}
              refetchGetBasket={refetchBasketHandler}
            />
          </div>
        )}
      </div>
    );
  }, [isOrderInProgress, isSpecialPatient, products]);

  if (isLoading) {
    return (
      <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
    );
  }

  if (isOrderInProgress) {
    return <OrderInProgress />;
  }

  if (isEmpty) {
    return <BasketEmpty />;
  }

  return renderContent;
};

export default Content;
