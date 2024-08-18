import React from 'react';
import AddToCartButton from './AddToCartButton';

type Props = {
  product: any;
  hasAddToCartButton: boolean;
};

const ProductCard = ({ product, hasAddToCartButton }: Props) => {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-grey-300 rounded ml-2" />
        <span className="text-sm font-medium">{product.name}</span>
      </div>
      {hasAddToCartButton ? (
        <AddToCartButton initialQuantity={0} />
      ) : (
        <div className="flex flex-col items-end">
          <div className="text-sm">{product.quantity} ورق</div>
          <div className="text-base">{product.price} تومان</div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
