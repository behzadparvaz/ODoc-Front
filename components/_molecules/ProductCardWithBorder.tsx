import CounterControl from '@com/_atoms/CounterControl';
import NextImage from '@com/_core/NextImage';
import formatNumberWithCommas from '@utilities/formatNumberWithComma';

const ProductCardWithBorder = ({
  title = 'نامشخص',
  imageUrl = '/static/images/staticImages/product-card-image.png',
  price,
  discountPercentage,
  isDiscount = false,
  discountPrice,
  onClick,
  productInfo = {},
  hasAddToCart = false,
}) => {
  return (
    <div onClick={onClick} className="flex justify-center border h-full">
      <div className="flex flex-col justify-start max-w-[180px] gap-1 px-4 py-2 bg-white">
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-center items-center relative">
            <NextImage
              src={imageUrl}
              alt="تصویر محصول"
              width={148}
              height={148}
            />
            {hasAddToCart && (
              <CounterControl
                count={1}
                min={0}
                max={10}
                onChange={() => console.log('up')}
                unitName="عدد"
                className="bottom-3 right-[8px] absolute"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-sm font-medium">{title}</div>
          <div className="w-full flex items-center justify-between">
            <div className="text-lg font-medium">
              {price ? (
                <span className="text-lg font-medium flex items-center gap-1">
                  {formatNumberWithCommas(price)}
                  <span className="text-xs">تومان</span>
                </span>
              ) : null}
              {isDiscount && (
                <>
                  <div className="flex items-start gap-1 text-grey-400">
                    <span className="flex items-center justify-center bg-surface-positive rounded-3xl px-2 py-1 font-thin text-sm text-white">
                      {discountPercentage}%
                    </span>
                    <span className="line-through font-thin">
                      {formatNumberWithCommas(discountPrice)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWithBorder;
