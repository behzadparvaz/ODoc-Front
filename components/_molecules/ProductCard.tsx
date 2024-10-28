import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const ProductCardWithBorder = dynamic(() => import('./ProductCardWithBorder'));
const ProductCardWithoutBorder = dynamic(
  () => import('./ProductCardWithoutBorder'),
);

interface IProps {
  title: string;
  imageUrl: string;
  price?: number;
  discountPercentage?: number;
  isDiscount?: boolean;
  discountPrice?: number;
  type?: 'withBorder' | 'withoutBorder';
  onClick?: () => void;
  hasAddToCart?: boolean;
  productInfo?: any;
  onSuccessChanged?: () => void;
}

const VerticalProductCard = ({
  title = 'نامشخص',
  imageUrl = '/static/images/staticImages/product-card-image.png',
  price,
  discountPercentage,
  isDiscount = false,
  discountPrice,
  type = 'withoutBorder',
  onClick,
  hasAddToCart = false,
  productInfo = {},
}: IProps) => {
  const RenderCard = useMemo(() => {
    if (type === 'withBorder') {
      return (
        <ProductCardWithBorder
          title={title}
          imageUrl={imageUrl}
          price={price}
          discountPercentage={discountPercentage}
          isDiscount={isDiscount}
          discountPrice={discountPrice}
          onClick={onClick}
          hasAddToCart={hasAddToCart}
          productInfo={productInfo}
        />
      );
    }
  }, []);

  return RenderCard;
};

export default VerticalProductCard;
