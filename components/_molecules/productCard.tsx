import React from 'react';
import AddToCartButton from './AddToCartButton';
import AddButton from '@com/_atoms/AddButton';
import { useAddProductToBasket, useDeleteProductBasket } from '@api/basket/basketApis.rq';

type ProductCardProps<PrT> = {
  prInfo: PrT;
  hasAddToCartButton?: boolean;
  onSuccessChanged?: () => void;
};

const ProductCard: React.FC<ProductCardProps<ProductInBasket>> = ({ prInfo, hasAddToCartButton, onSuccessChanged }) => {
  const { mutate: addToCart, isLoading: isAddingToCart } = useAddProductToBasket({
    onSuccess: () => {
      onSuccessChanged?.();
    }
  });

  const { mutate: popProductOfCart } = useDeleteProductBasket(
    {
      onSuccess: () => {
        onSuccessChanged?.();
      }
    }
  );

  const onDeleteProduct = ({ irc }) => popProductOfCart({ type: 'IRC', irc: irc });

  const onChangeCount = ({ irc, quantity }) => addToCart({
    type: 'IRC',
    orderType: 'OTC',
    irc: irc,
    quantity: quantity
  });

  const onChange = (count: number) => {
    console.log(count)
    if (count > 0) {
      onChangeCount({ ...prInfo, quantity: count });
    } else {
      onDeleteProduct?.(prInfo);
    }
  };

  return (
    <div className="border-b border-grey-100 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-[68px] h-[68px] bg-grey-300 rounded-lg ml-2"/>
        <span className="text-sm font-medium">{prInfo?.persianName ?? prInfo.name}</span>
      </div>
      {hasAddToCartButton ? (
        <AddButton count={prInfo.quantity} onChangeCount={onChange} isLoading={isAddingToCart}/>
      ) : (
        <div className="flex flex-col items-end">
          <div className="text-sm">{prInfo.quantity} ورق</div>
          <div className="text-base">{prInfo.price} تومان</div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
