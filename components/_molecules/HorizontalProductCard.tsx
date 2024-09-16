import React, { useEffect, useState } from 'react';
import AddButton from '@com/_atoms/AddButton';
import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import NextImage from '@com/_core/NextImage';
import { SkeletonSvg, toBase64 } from '@utilities/SkeletonSvg';
import AddToCartButton from './AddToCartButton';

type ProductCardProps<PrT> = {
  prInfo: PrT;
  hasAddToCartButton?: boolean;
  hasCompleteAddToCartButton?: boolean;
  onSuccessChanged?: () => void;
};

const HorizontalProductCard: React.FC<ProductCardProps<ProductInBasket>> = ({
  prInfo,
  hasAddToCartButton,
  hasCompleteAddToCartButton,
  onSuccessChanged,
}) => {
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<
    Basket & { productsById: any }
  >({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(res.products.map((pr) => [pr.irc, pr])),
    }),
    enabled: true,
  });
  const [productBasketQuantity, setProductBasketQuantity] = useState<number>(
    () => {
      const findItem = basket?.products?.find(
        (basketItem) => basketItem.irc === prInfo?.irc,
      );
      return findItem?.quantity ?? 0;
    },
  );

  useEffect(() => {
    setProductBasketQuantity(
      basket?.products?.find((basketItem) => basketItem.irc === prInfo?.irc)
        ?.quantity ?? 0,
    );
  }, [basket]);

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

  const onDeleteProduct = ({ irc }) =>
    popProductOfCart({ type: 'IRC', irc: irc });

  const onChangeCount = ({ irc, quantity }) =>
    addToCart({
      type: 'IRC',
      orderType: 'OTC',
      irc: irc,
      quantity: quantity,
    });

  const onChange = (count: number) => {
    if (count > 0) {
      onChangeCount({ ...prInfo, quantity: count });
    } else {
      onDeleteProduct?.(prInfo);
    }
  };

  return (
    <div className="w-full flex gap-x-2 items-center">
      <div className="w-[68px] border border-grey-500 rounded-xl flex">
        <NextImage
          unoptimized
          src={prInfo?.image}
          alt={prInfo?.productName}
          width={66}
          height={66}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(66, 66))}`}
        />
      </div>
      <div className="w-[calc(100%-68px)] flex justify-between items-center gap-x-2">
        <h2 className="text-sm font-medium line-clamp-2">
          {prInfo?.productName ?? prInfo.name}
        </h2>
        {hasAddToCartButton ? (
          <AddButton
            count={productBasketQuantity}
            onChangeCount={onChange}
            isLoading={isAddingToCart}
          />
        ) : hasCompleteAddToCartButton ? (
          <AddToCartButton />
        ) : (
          <div className="flex flex-col items-end">
            <div className="text-sm">{prInfo.quantity} ورق</div>
            <div className="text-base">{prInfo.price} تومان</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalProductCard;
