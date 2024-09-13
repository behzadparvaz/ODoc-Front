import dynamic from 'next/dynamic';
import React from 'react';

const HorizontalProductCard = dynamic(
  () => import('@com/_molecules/HorizontalProductCard'),
);
const OrderTracking = dynamic(() => import('@com/_molecules/OrderTracking'));

const OrderDetailPage = () => {
  const products = [
    {
      id: 1,
      name: 'ژلوفن',
      manufacturer: 'شرکت سازنده: داروکیش',
      quantity: 1,
      price: '۸۰,۰۰۰',
    },
    {
      id: 2,
      name: 'ژلوفن',
      manufacturer: 'شرکت سازنده: داروکیش',
      quantity: 1,
      price: '۸۰,۰۰۰',
    },
    {
      id: 3,
      name: 'ژلوفن',
      manufacturer: 'شرکت سازنده: داروکیش',
      quantity: 1,
      price: '۸۰,۰۰۰',
    },
  ];

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Map Section */}
      <div className="relative">
        <img
          src="/path-to-map-image.jpg"
          alt="Map"
          className="w-full h-64 object-cover"
        />
        <p className="flex justify-start pr-4 bg-white w-full text-sm font-bold">
          کوی نصر، خیابان صانعی، خیابان ایزدی
        </p>
      </div>

      {/* Order Tracking Section */}
      <div className="p-4">
        <OrderTracking />
      </div>

      {/* Order Details Section */}
      <div className="p-4 bg-gray-100">
        <h3 className="text-lg font-bold mb-4">جزئیات سفارش</h3>
        <p className="text-sm text-gray-600 mb-4">
          سه شنبه ۲۳ مرداد ساعت ۱۴:۱۷
        </p>

        {/* {products.map((product) => (
          <HorizontalProductCard
            key={product.id}
            // product={product}
            hasAddToCartButton={false}
          />
        ))} */}
      </div>
    </div>
  );
};

export default OrderDetailPage;
