import React, { CSSProperties } from 'react';
import NextImage from '@com/_core/NextImage';
import AddButton from '@com/_atoms/AddButton';
import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { Level3ProductsDataModel } from './OtcProductsSlider';
import classNames from 'classnames';

type PromotionProductDataModel = {
  discountPercent?: number;
  discountPrice?: number;
  genericCode?: string;
  imageLink?: string;
  maxOrderLimit?: number;
  productName?: string;
  quantity?: number;
  categoryCode?: number;
  shortDescription?: string | null;
};

type ProductDataModel = Level3ProductsDataModel & PromotionProductDataModel;

type VerticalProductCardProps<PrT> = {
  productData?: PrT;
  className?: string;
  hasAddToCart?: boolean;
  onSuccessChanged?: () => void;
  imageWidth?: string;
  imageHeight?: string;
};

const VerticalProductCard = ({
  productData,
  className = '',
  hasAddToCart = false,
  onSuccessChanged,
  imageWidth = '148px',
  imageHeight = '112px',
}: VerticalProductCardProps<ProductDataModel>) => {
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket({
    select: (res: any) => ({
      ...res,
      productsById:
        res?.products &&
        Object.fromEntries(res?.products?.map((pr) => [pr?.irc, pr])),
    }),
    enabled: true,
  });
  const { mutate: addToCart, isLoading: isAddingToCart } =
    useAddProductToBasket({
      onSuccess: () => {
        onSuccessChanged?.();
        refetchGetBasket();
      },
    });

  const { mutate: popProductOfCart } = useDeleteProductBasket({
    onSuccess: () => {
      onSuccessChanged?.();
      refetchGetBasket();
    },
  });

  const onDeleteProduct = () =>
    popProductOfCart({
      type: 'IRC',
      irc: productData.irc || productData?.genericCode,
    });

  const onChangeCount = (count) =>
    addToCart({
      type: 'IRC',
      orderType: 'OTC',
      irc: productData?.irc || productData?.genericCode,
      quantity: count,
      categoryCode: productData?.categoryCode,
    });

  const onChange = (count) => {
    if (count > 0) {
      onChangeCount(count);
    } else {
      onDeleteProduct();
    }
  };

  const productBasketQuantity =
    basket?.products?.find(
      (basketItem) =>
        basketItem?.irc === (productData?.irc || productData?.genericCode),
    )?.quantity ?? 0;

  return (
    <div
      className={classNames(`flex flex-col items-center h-full p-4`, className)}
    >
      <div className="flex justify-center relative">
        <NextImage
          src={productData?.imageLink}
          alt="تصویر محصول"
          width={imageWidth}
          height={imageHeight}
        />
        {hasAddToCart && (
          <div
            className={classNames(
              'flex justify-end items-center absolute right-3 bottom-3',
              productBasketQuantity > 0 && '!right-1/2 !translate-x-1/2',
            )}
          >
            <AddButton
              unitName={productData.unit}
              count={productBasketQuantity}
              onChangeCount={onChange}
              isLoading={isAddingToCart}
            />
          </div>
        )}
      </div>

      <span className="text-sm leading-6 font-medium text-right line-clamp-3 h-[72px]">
        {productData?.productName}
      </span>
    </div>
  );
};

export default VerticalProductCard;
