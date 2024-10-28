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
};

const VerticalProductCard = ({
  productData,
  className = '',
  hasAddToCart = false,
  onSuccessChanged,
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
      irc: productData?.genericCode,
    });

  const onChangeCount = (count) =>
    addToCart({
      type: 'IRC',
      orderType: 'OTC',
      irc: productData?.genericCode,
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
        `flex flex-col items-center h-full p-4 mb-5`,
        className,
      )}
    >
      <div className="flex justify-center mb-2 relative">
        <NextImage
          src={productData?.imageLink}
          alt="تصویر محصول"
          width={148}
          height={148}
        />
        {hasAddToCart && (
          <div className="flex justify-end items-center absolute right-3 bottom-3">
            <AddButton
              unitName={productData.unit}
              count={productBasketQuantity}
              onChangeCount={onChange}
              isLoading={isAddingToCart}
            />
          </div>
        )}
      </div>

      <h2 className="text-sm font-medium text-right">
        {productData?.productName}
      </h2>

      <div className="flex flex-col items-center justify-center mt-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-medium">
            {productData?.discountPrice ? (
              <span className="line-through text-grey-400">
                {productData.discountPrice.toLocaleString('fa-IR')} تومان
              </span>
            ) : null}
            {/* <span className="text-lg font-medium flex items-center gap-1">
              {productData.price.toLocaleString('fa-IR')} تومان
            </span> */}
          </span>

          {/* {productData.discountPercent && (
            <span className="bg-surface-positive text-white rounded-full px-2 py-1 text-sm">
              {productData.discountPercent}%
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default VerticalProductCard;
