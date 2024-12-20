import HorizontalProductCard from '@com/_molecules/HorizontalProductCard';

const BasketItems = ({ products, refetchGetBasket }) => (
  <div className="flex flex-col md:px-0 h-full gap-2 justify-between">
    {products?.map((pr, index) => {
      return (
        <div key={pr.irc} className="flex flex-col gap-2">
          <HorizontalProductCard
            prInfo={{ ...pr }}
            onSuccessChanged={refetchGetBasket}
            hasAddToCartButton
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

export default BasketItems;
