import dynamic from 'next/dynamic';

import HorizontalProductCard from '@com/_molecules/HorizontalProductCard';
import useProductNavigation from '@hooks/useNavigateToPdp';

const PrescriptionItem = dynamic(() => import('./PrescriptionItem'));

type BasketItemsProps = {
  products: any[];
  refetchGetBasket?: () => void;
  isSpecialPatient?: boolean;
};

const BasketItems = ({
  products,
  refetchGetBasket,
  isSpecialPatient,
}: BasketItemsProps) => {
  const { navigateToPdp } = useProductNavigation();

  return (
    <div className="flex flex-col md:px-0 h-full gap-2 justify-between">
      {products?.map((pr, index) => {
        return (
          <>
            {!!pr?.refrenceNumber ? (
              <div className="-order-1">
                <PrescriptionItem
                  refrenceNumber={pr?.refrenceNumber}
                  isSpecialPatient={isSpecialPatient}
                  hasDivider={products?.length > 1}
                />
              </div>
            ) : (
              <div key={pr.irc} className="flex flex-col gap-2">
                <HorizontalProductCard
                  prInfo={{
                    ...pr,
                    isOtc: true,
                    productType: pr.productType.id,
                  }}
                  onSuccessChanged={refetchGetBasket}
                  hasAddToCartButton
                  isInSearchPage
                  onClick={() =>
                    navigateToPdp({
                      item: pr,
                      ProductTypeId: pr.productType.id,
                    })
                  }
                />
                {products?.length !== index && (
                  <div className="w-full">
                    <div className="w-full h-[1px] bg-grey-50" />
                  </div>
                )}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default BasketItems;
