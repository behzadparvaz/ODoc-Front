import React, { CSSProperties } from 'react';
import AddToCartButton from './AddToCartButton'; // Make sure the path is correct
import { colors } from '@configs/Theme';
import NextImage from '@com/_core/NextImage';
import Badge from './Badge';

type Props = {
  productData?: any;
  className?: string;
  style?: CSSProperties;
  hasAddToCart?: boolean;
};

const VerticalProductCard = ({
  productData,
  className = '',
  style = {},
  hasAddToCart = true,
}: Props) => {
  return (
    <div className={`w-[157px] bg-white px-4 ${className}`} style={style}>
      {/* Product Image */}
      <div className="h-[80px] w-[80px] mx-auto mb-4">
        <NextImage src={productData?.imageLink} width={80} height={80} />
      </div>

      {/* Product Name */}
      <h2 className="text-sm font-medium text-center mb-2 min-h-[48px] line-clamp-2">
        {productData?.productName}
      </h2>

      {/* Price and Discount */}
      <div className="text-center mb-4">
        <span className="text-xl font-semibold flex items-center gap-x-1 justify-center w-full">
          {productData?.discountPrice?.toLocaleString('fa-IR')}
          <span className="text-xs font-medium">تومان</span>
        </span>
        <div className="flex items-center justify-between">
          <Badge
            value={productData?.discountPercent + '%'}
            className="px-1.5"
            backgroundColor={colors.yellow[400]}
          />
          <span className="text-tiny font-normal line-through text-grey-400">
            {(237000)?.toLocaleString('fa-IR')}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      {hasAddToCart ? (
        <div className="flex justify-center items-center">
          <AddToCartButton />
        </div>
      ) : null}
    </div>
  );
};

export default VerticalProductCard;
