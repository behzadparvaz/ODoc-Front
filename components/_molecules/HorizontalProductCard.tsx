import React, { useEffect, useState } from 'react';
import AddButton from '@com/_atoms/AddButton';
import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import NextImage from '@com/_core/NextImage';
import AddToCartButton from './AddToCartButton';
import NextLink from '@com/_core/NextLink';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import classNames from 'classnames';

type ProductCardProps<PrT> = {
  prInfo: PrT;
  hasAddToCartButton?: boolean;
  hasCompleteAddToCartButton?: boolean;
  onSuccessChanged?: () => void;
  isInSearchPage?: boolean;
  otcLevel3?: string;
};

const HorizontalProductCard: React.FC<ProductCardProps<ProductInBasket>> = ({
  prInfo,
  hasAddToCartButton,
  hasCompleteAddToCartButton,
  onSuccessChanged,
  isInSearchPage,
  otcLevel3,
}) => {
  const { push } = useRouter();
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<
    Basket & { productsById: any }
  >({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(
        res?.products?.map((pr) => [pr.irc, pr]),
      ),
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

  const onChangeCount = ({ irc, quantity, categoryCode, otcLevel3 }) =>
    addToCart({
      type: 'IRC',
      orderType: 'OTC',
      irc: irc,
      quantity: quantity,
      categoryCode: categoryCode,
      otcLevel3: otcLevel3,
    });

  const onChange = (count: number) => {
    if (count > 0) {
      onChangeCount({
        ...prInfo,
        quantity: count,
        categoryCode: prInfo?.categoryCode,
        otcLevel3: otcLevel3,
      });
    } else {
      onDeleteProduct?.(prInfo);
    }
  };

  return (
    <div className="w-full flex gap-x-6 justify-between items-center">
      <div
        className={classNames(
          'grid grid-col-[68px_1fr] gap-x-2 items-center',
          isInSearchPage && 'cursor-pointer',
        )}
        onClick={() => {
          if (isInSearchPage) {
            push(
              `${routeList.searchProductPage}?brandName=${prInfo?.brandName}&categoryCodeLevel3=${prInfo?.categoryCodeLevel3}`,
            );
          }
        }}
      >
        <div className="col-start-1 col-end-2 w-[68px] h-[68px] border border-grey-50 rounded-xl flex justify-center items-center overflow-hidden">
          <NextImage
            unoptimized
            src={prInfo?.imageLink}
            alt={prInfo?.productName}
            width={68}
            height={68}
          />
        </div>

        <h2 className="col-start-2 col-end-3 text-sm font-medium line-clamp-2">
          {prInfo?.productName ?? prInfo.name}
        </h2>
      </div>

      {hasAddToCartButton ? (
        <>
          {!prInfo?.isOtc ? (
            <AddButton
              count={productBasketQuantity}
              onChangeCount={onChange}
              isLoading={isAddingToCart}
            />
          ) : null}
        </>
      ) : hasCompleteAddToCartButton ? (
        <AddToCartButton />
      ) : (
        <div className="flex flex-col items-end">
          <div className="text-sm">{prInfo.quantity} ورق</div>
          <div className="text-base">{prInfo.price} تومان</div>
        </div>
      )}
    </div>
  );
};

export default HorizontalProductCard;
