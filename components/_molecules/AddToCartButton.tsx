import React, { useState } from 'react';

type Props = {
  initialQuantity?: number;
};

const AddToCartButton = ({}: Props) => {
  const [quantity, setQuantity] = useState<number>(0);

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
  );
};

export default AddToCartButton;
