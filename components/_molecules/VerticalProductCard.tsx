import React, { CSSProperties } from 'react';
import AddToCartButton from './AddToCartButton'; // Make sure the path is correct
import { colors } from '@configs/Theme';
import NextImage from '@com/_core/NextImage';
import Badge from './Badge';

type Props = {
  productData?: any;
  className?: string;
  style?: CSSProperties;
};

const VerticalProductCard = ({
  productData,
  className = '',
  style = {},
}: Props) => {
  return (
    <div
      className={`w-[157px] border border-grey-200 bg-white p-4 ${className}`}
      style={style}
    >
      {/* Product Image */}
      <div className="h-[80px] w-[80px] mx-auto mb-4">
        <NextImage
          src={'/static/images/staticImages/DefaultProductImage.png'}
          width={80}
          height={80}
        />
      </div>

      {/* Product Name */}
      <h2 className="text-sm font-medium text-center mb-2 min-h-[48px] line-clamp-2">
        ساشه منیزیم 400 یورویتال بسته 60 عدد
      </h2>

      {/* Price and Discount */}
      <div className="text-center mb-4">
        <span className="text-xl font-semibold">
          ۱۵۷,۰۰۰ <span className="text-xs font-medium">تومان</span>
        </span>
        <div className="flex items-center justify-between">
          <Badge
            value={32 + '%'}
            className="px-1.5"
            backgroundColor={colors.yellow[400]}
          />
          <span className="text-tiny font-normal line-through text-grey-400">
            ۲۳۷٬۰۰۰
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="flex justify-center items-center">
        <AddToCartButton />
      </div>
    </div>
  );
};

export default VerticalProductCard;
