import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-12 h-12 bg-gray-300 rounded"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{product.name}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-xl font-bold"
        >
          -
        </button>
        <span className="text-sm font-medium">{quantity}</span>
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
