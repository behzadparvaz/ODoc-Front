import ProductCard from '@com/_molecules/productCard';
import React, { useState } from 'react';

const ProductList = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const products = [
    {
      name: 'ژلوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
  ];
  const searchTerm = 'ژلوفن';
  return (
    <>
      <div className="flex items-center justify-between w-full h-14 border-b border-gray-300 p-2">
        <div className="flex text-center">
          <p className="ml-2">{'<--'}</p>
          {searchTerm}
        </div>
        <div>x</div>
      </div>
      <div className="flex items-center justify-between m-4">
        <span className="text-sm font-medium text-grey-900">داروی کمیاب</span>
        <label className="cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-grey-300 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-grey-600"></div>
        </label>
      </div>
      <div className="p-4 space-y-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
