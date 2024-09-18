import React, { CSSProperties, useEffect, useState } from 'react';
import NextImage from '@com/_core/NextImage';
import AddButton from '@com/_atoms/AddButton';
import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { Level3ProductsDataModel } from './OtcProductsSlider';

type PromotionProductDataModel = {
  discountPercent?: number;
  discountPrice?: number;
  genericCode?: string;
  imageLink?: string;
  maxOrderLimit?: number;
  productName?: string;
  quantity?: number;
  shortDescription?: string | null;
};

type ProductDataModel = Level3ProductsDataModel & PromotionProductDataModel;

type VerticalProductCardProps<PrT> = {
  productData?: PrT;
  className?: string;
  style?: CSSProperties;
  hasAddToCart?: boolean;
  onSuccessChanged?: () => void;
};

const VerticalProductCard = ({
  productData,
  className = '',
  style = {},
  hasAddToCart = true,
  onSuccessChanged,
}: VerticalProductCardProps<ProductDataModel>) => {
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<
    Basket & { productsById: any }
  >({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(res?.products.map((pr) => [pr.irc, pr])),
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

  const [productBasketQuantity, setProductBasketQuantity] = useState<number>(
    () => {
      const findItem = basket?.products?.find(
        (basketItem) =>
          basketItem.irc === (productData?.irc || productData?.genericCode),
      );
      return findItem?.quantity ?? 0;
    },
  );

  const onDeleteProduct = ({ irc }) =>
    popProductOfCart({
      type: 'IRC',
      irc: irc ? irc : productData?.genericCode,
    });

  const onChangeCount = ({ quantity, ...rest }) =>
    addToCart({
      type: 'IRC',
      orderType: 'OTC',
      irc: rest?.irc ? rest?.irc : rest?.genericCode,
      quantity: quantity,
    });

  const onChange = (count: number) => {
    if (count > 0) {
      onChangeCount({ ...productData, quantity: count });
    } else {
      onDeleteProduct?.(productData);
    }
  };

  useEffect(() => {
    setProductBasketQuantity(
      basket?.products?.find(
        (basketItem) =>
          basketItem?.irc === (productData?.irc || productData?.genericCode),
      )?.quantity ?? 0,
    );
  }, [basket]);

  return (
    <div
      className={`w-[157px] h-[194px] shadow-[0_4px_16px_rgba(0,0,0,0.1)]  py-2 px-4 ${className} rounded-lg`}
      style={style}
    >
      <div className="h-[80px] w-[80px] mx-auto mb-4 rounded-lg overflow-hidden">
        <NextImage src={productData?.imageLink} width={80} height={80} />
      </div>

      <h2 className="text-sm font-medium text-center min-h-[46px] line-clamp-2 ">
        {productData?.productName}
      </h2>

      {/* <div className="text-center mb-4">
         {!hasAddToCart && (
          <span className="text-xl font-semibold flex items-center gap-x-1 justify-center w-full">
            {productData?.discountPrice?.toLocaleString('fa-IR')}
            <span className="text-xs font-medium">تومان</span>
          </span>
        )} 
          {!hasAddToCart && (
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
        )} 
      </div> */}

      {hasAddToCart ? (
        <div className="flex justify-end items-center pt-2">
          <AddButton
            count={productBasketQuantity}
            onChangeCount={onChange}
            isLoading={isAddingToCart}
          />
        </div>
      ) : null}
    </div>
  );
};

export default VerticalProductCard;
