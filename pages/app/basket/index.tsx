import React from 'react';
import dynamic from 'next/dynamic';
const BasketContainer = dynamic(() => import('@containers/basket'));

const BasketPage = () => {
  return <BasketContainer />;
};

export default BasketPage;
