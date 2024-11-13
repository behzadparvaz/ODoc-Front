import NextLink from '@com/_core/NextLink';
import React, { useState, useEffect } from 'react';

const OrderTracking = () => {
  const [orderStatusss, setOrderStatus] = useState({});
  const orderStatus = {
    step: 3,
    pharmacyName: 'دکتر ستاری',
    pharmacyBranch: 'بهشتی',
    orderStatus: 'در حال آماده سازی سفارش',
  };

  return (
    <div className="w-full mx-auto p-4 bg-grey-100 rounded-base mb-4">
      <div className="flex justify-between text-2xs text-gray-600 mb-4">
        <span
          className={orderStatus.step >= 1 ? 'text-black' : 'text-gray-400'}
        >
          ثبت دارو
        </span>
        <span
          className={orderStatus.step >= 2 ? 'text-black' : 'text-gray-400'}
        >
          تایید داروخانه
        </span>
        <span
          className={orderStatus.step >= 3 ? 'text-black' : 'text-gray-400'}
        >
          پرداخت
        </span>
        <span
          className={orderStatus.step >= 4 ? 'text-black' : 'text-gray-400'}
        >
          آماده سازی
        </span>
        <span
          className={orderStatus.step >= 5 ? 'text-black' : 'text-gray-400'}
        >
          ارسال
        </span>
      </div>

      <div className="bg-gray-100 p-3 rounded-base">
        <div className="text-xs font-bold">
          داروخانه {orderStatus.pharmacyName} ({orderStatus.pharmacyBranch})
        </div>
        <div className="text-2xs text-gray-600">{orderStatus.orderStatus}</div>
      </div>
      <NextLink href={'/app/orderDetail'}>
        <div className="flex justify-end mt-4">
          <button className="text-blue-500 text-2xs">جزئیات</button>
        </div>
      </NextLink>
    </div>
  );
};

export default OrderTracking;
