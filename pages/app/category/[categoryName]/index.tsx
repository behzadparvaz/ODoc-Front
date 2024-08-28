import ProdictListPage from '@com/_organisms/ProdictListPage';
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

  return (
    <>
      <ProdictListPage products={products} />
    </>
  );
};

export default ProductList;
