import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import React from 'react';

type Props = {};

export default function Footer({}: Props) {
  return (
    <div
      className={`w-full h-12 absolute bottom-24 flex items-center justify-center border-t border-grey-100 ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
    >
      <p className='text-xs text-grey-500 mx-6'>
        تپسی دکتر پلتفرم ارسال دارو می‌باشد که تامین دارو از نزدیک‌ترین داروخانه
        را در کمترین زمان ممکن می‌سازد.با تپسی دکتر راحت و در خانه نسخه پزشکی
        خود را دریافت کنید.
      </p>
    </div>
  );
}
