import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import AddButton from '@com/_atoms/AddButton';
import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ScrollSlider from './ScrollSlider.nd';

type ProductCardProps<PrT> = {
  prInfo: PrT;
  hasAddToCartButton?: boolean;
  onSuccessChanged?: () => void;
  isInSearchPage?: boolean;
  isShowSlangs?: boolean;
  onClick?: () => void;
};

const HorizontalProductCard: React.FC<ProductCardProps<ProductInBasket>> = ({
  prInfo,
  hasAddToCartButton,
  onSuccessChanged,
  isInSearchPage,
  isShowSlangs = false,
  onClick,
}) => {
  const { query, push } = useRouter();
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<
    Basket & { productsById: any }
  >({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(
        res?.products?.map((pr) => [pr.irc, pr]),
      ),
    }),
    refetchOnMount: false,
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

  const onDeleteProduct = ({ irc }) =>
    popProductOfCart({ type: 'IRC', irc: irc });

  const onChangeCount = ({ irc, quantity, imageLink, productName, unit }) =>
    addToCart({
      irc: irc,
      quantity: quantity,
      imageLink: imageLink,
      productName: productName,
      unit: unit,
    });

  const onChange = (count: number) => {
    if (count > 0) {
      onChangeCount({
        ...prInfo,
        quantity: count,
        imageLink: prInfo?.imageLink,
        productName: prInfo?.productName || prInfo?.name,
        unit: prInfo?.unit,
      });
    } else {
      onDeleteProduct?.(prInfo);
    }
  };
  const renderLeftSection = () => {
    if (hasAddToCartButton) {
      if (isInSearchPage && !prInfo?.isOtc) {
        return (
          <Link
            href={`${routeList.otcMedicine}?searchText=${prInfo?.productName}`}
          >
            <span className="!min-w-[96px] h-[32px] px-1 bg-red-50 text-content-negative text-[10px] rounded-full flex justify-center items-center">
              نیاز به نسخه پزشک
            </span>
          </Link>
        );
      }
      return (
        <AddButton
          unitName={prInfo.unit}
          count={productBasketQuantity}
          onChangeCount={onChange}
          isLoading={isAddingToCart}
        />
      );
    }
    return (
      <div className="flex flex-col items-end">
        <div className="text-xs">{prInfo.quantity} ورق</div>
        <div className="text-sm">{prInfo.price} تومان</div>
      </div>
    );
  };
  return (
    <div className="w-full flex gap-x-6 justify-between items-center py-4">
      <div
        className={classNames(
          'grid grid-col-[68px_1fr] gap-x-2 items-center',
          isInSearchPage && 'cursor-pointer',
        )}
        onClick={() => {
          if (isInSearchPage) {
            if (onClick) {
              return onClick();
            }
            push(
              `${routeList.searchProductPage}?brandName=${prInfo?.brandName}&categoryCodeLevel3=${prInfo?.categoryCodeLevel3}&irc=${prInfo?.irc}`,
            );
          }
        }}
      >
        <div className="col-start-1 col-end-2 w-[68px] h-[68px] border-grey-50 rounded-xl flex justify-center items-center overflow-hidden">
          <NextImage
            unoptimized
            src={prInfo?.imageLink}
            alt={prInfo?.productName ?? ''}
            width={68}
            height={68}
          />
        </div>

        <h2 className="col-start-2 col-end-3 text-xs font-medium line-clamp-2">
          {prInfo?.productName ?? prInfo.name}
          <ScrollSlider>
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2 mt-2">
                <ScrollSlider className="w-full">
                  {isShowSlangs &&
                    prInfo.slangs?.map((slang, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-center rounded-full bg-surface-accentLight text-content-accent px-2 ml-1 py-0.5"
                      >
                        <span className="text-2xs max-w-[80px] truncate">
                          {slang}
                        </span>
                      </div>
                    ))}
                </ScrollSlider>
              </div>
            </div>
          </ScrollSlider>
        </h2>
      </div>

      {renderLeftSection()}
    </div>
  );
};

export default HorizontalProductCard;
