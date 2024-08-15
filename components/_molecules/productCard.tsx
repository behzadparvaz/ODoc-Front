import React, { useState } from 'react';

type Props = {
  product: any;
};

const ProductCard = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-grey-300 rounded ml-2" />
        <span className="text-sm font-medium">{product.name}</span>
      </div>
      <div className="flex items-center">
        {quantity > 0 ? (
          <>
            <button
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-xl font-bold"
            >
              -
            </button>
            <span className="mx-2">{quantity}</span>
          </>
        ) : null}
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-xl font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
