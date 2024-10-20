import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import React from 'react';

type Props = {};

export default function Footer({}: Props) {
  return (
    <div
      className={`w-full flex  border-t border-grey-100 ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
    >
      <div className="flex flex-col w-full rounded-lg bg-grey-50 m-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-lg text-grey-800">تپسی دکتر</h1>
          <p className="font-medium text-tiny text-grey-700 hidden md:block">
            تپسی دکتر
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="font-normal text-2xs text-grey-600 leading-4">
            تپسی دکتر پلتفرم ارسال دارو می‌باشد که تامین دارو از نزدیک‌ترین
            .داروخانه را در کمترین زمان ممکن می‌سازد
          </p>
          <p className="font-normal text-2xs text-grey-600 leading-4">
            با تپسی دکتر راحت و در خانه نسخه پزشکی خود را دریافت کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
