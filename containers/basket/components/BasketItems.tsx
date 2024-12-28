import HorizontalProductCard from '@com/_molecules/HorizontalProductCard';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

type BasketItemsProps = {
  products: any[];
  refetchGetBasket?: () => void;
};

const BasketItems = ({ products, refetchGetBasket }: BasketItemsProps) => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col md:px-0 h-full gap-2 justify-between">
      {products?.map((pr, index) => {
        return (
          <div key={pr.irc} className="flex flex-col gap-2">
            <HorizontalProductCard
              prInfo={{ ...pr, isOtc: pr.productType.name === 'otc' }}
              onSuccessChanged={refetchGetBasket}
              hasAddToCartButton
              isInSearchPage
              onClick={() => {
                if (pr.productType.id === 1) {
                  push({
                    pathname: `${routeList?.searchProductPage}`,
                    query: {
                      brandName: pr.brandName,
                      categoryCodeLevel3: pr.categoryCodeLevel3,
                      irc: pr.genericCode,
                    },
                  });
                }
                if (pr.productType.id === 2) {
                  push({
                    pathname: `${routeList?.supplementProduct}/${pr.genericCode || pr.irc}`,
                  });
                }
              }}
            />
            {products?.length !== index && (
              <div className="w-full">
                <div className="w-full h-[1px] bg-grey-50" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BasketItems;
