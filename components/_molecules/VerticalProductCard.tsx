import React from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import NextImage from '@com/_core/NextImage';
import AddButton from '@com/_atoms/AddButton';
import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { routeList } from '@routes/routeList';

import { Level3ProductsDataModel } from './OtcProductsSlider';

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
  brandName?: string;
  categoryCodeLevel3?: string;
};

type ProductDataModel = Level3ProductsDataModel & PromotionProductDataModel;

type VerticalProductCardProps<PrT> = {
  productData?: PrT;
  className?: string;
  hasAddToCart?: boolean;
  onSuccessChanged?: () => void;
  imageWidth?: number;
  imageHeight?: number;
  onClick?: () => void;
};

const VerticalProductCard = ({
  productData,
  className = '',
  hasAddToCart = false,
  onSuccessChanged,
  imageWidth = 100,
  imageHeight = 100,
  onClick,
}: VerticalProductCardProps<ProductDataModel>) => {
  const { push } = useRouter();
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket({
    select: (res: any) => ({
      ...res,
      productsById:
        res?.products &&
        Object.fromEntries(res?.products?.map((pr) => [pr?.irc, pr])),
    }),
    enabled: true,
  });
  const { mutate: addToCart, isPending: isAddingToCart } =
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
      className={classNames(
        `flex flex-col items-center h-full p-4 cursor-pointer`,
        className,
      )}
      onClick={
        onClick
          ? onClick
          : () => {
              push(
                `${routeList.searchProductPage}?brandName=${productData?.brandName}&categoryCodeLevel3=${productData?.categoryCodeLevel3}&irc=${productData?.irc || productData?.genericCode}`,
              );
            }
      }
    >
      <div className="flex justify-center relative mb-3">
        <NextImage
          src={productData?.imageLink}
          alt="تصویر محصول"
          width={imageWidth}
          height={imageHeight}
        />
        {hasAddToCart && (
          <div
            className={classNames(
              'flex justify-end items-center absolute right-3 bottom-0',
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

      <span className="text-xs leading-6 font-medium text-right line-clamp-3 h-[72px]">
        {productData?.productName}
      </span>
    </div>
  );
};

export default VerticalProductCard;
