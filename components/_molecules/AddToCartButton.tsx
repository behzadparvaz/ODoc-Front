import { MinusIconOutline, PlusIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
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
    <div className="flex items-center" style={{ direction: 'ltr' }}>
      {quantity > 0 ? (
        <>
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-grey-50 text-xl font-bold"
          >
            <MinusIconOutline width={20} height={20} fill={colors.black} />
          </button>
          <span className="mx-4">{quantity}</span>
        </>
      ) : null}
      <button
        onClick={handleIncrement}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-grey-50 text-xl font-bold"
      >
        <PlusIconOutline width={20} height={20} fill={colors.black} />
      </button>
    </div>
  );
};

export default AddToCartButton;
