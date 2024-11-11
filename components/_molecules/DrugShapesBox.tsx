import React, { useEffect, useState } from 'react';
import { useGetCategories } from '@api/category/categoryApis.rq';
import { useRouter } from 'next/router';
import useModal from '@hooks/useModal';
import ProductBottomSheet from '@com/_organisms/ProductBottomSheet';
import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import AddButton from '@com/_atoms/AddButton';

type Props = {
  productData: any;
  onSuccessChanged?: () => void;
};

export default function DrugShapesBox({
  productData,
  onSuccessChanged,
}: Props) {
  const { query } = useRouter();
  const { addModal } = useModal();
  const categoryCode = query?.categoryCode?.toString();
  const categoryName = query?.categoryName;
  const { data: drugShapesData } = useGetCategories({
    level: 3,
    parentCode: categoryCode,
  });

  const handleClickOnDrugShape = (otcLevel3) => {
    addModal({
      modal: ProductBottomSheet,
      props: {
        otcLevel3: otcLevel3,
        categoryCode: categoryCode,
      },
    });
  };

  const { data: basketData, refetch: refetchGetBasket } = useGetCurrentBasket<{
    productsById: any;
    products: any;
  }>({
    select: (res: Basket) => ({
      ...res,
      productsById:
        res?.products &&
        Object.fromEntries((res?.products || [])?.map((pr) => [pr.irc, pr])),
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

  const onDeleteProduct = ({ irc }) =>
    popProductOfCart({ type: 'IRC', irc: irc });

  const onChange = (count, otcLevel3, irc, imageLink, productName) => {
    const productToUpdate = basketData?.products?.find(
      (product) => product.irc === irc,
    );
    if (count > 0) {
      onChangeCount({
        ...productToUpdate,
        quantity: count,
        categoryCode: productToUpdate?.categoryCode,
        otcLevel3: otcLevel3,
        imageLink,
        productName,
      });
    } else {
      onDeleteProduct?.(productToUpdate);
    }
  };

  const onChangeCount = ({
    irc,
    quantity,
    categoryCode,
    otcLevel3,
    imageLink,
    productName,
  }) =>
    addToCart({
      type: 'IRC',
      orderType: 'OTC',
      irc: irc,
      quantity: quantity,
      categoryCode: categoryCode,
      otcLevel3: otcLevel3,
      imageLink: imageLink,
      productName: productName,
    });

  const filteredProducts = basketData?.products?.filter((product) =>
    drugShapesData?.queryResult.find(
      (queryItem) => queryItem?.otcLevel3 === product?.otcLevel,
    ),
  );

  return (
    <div className="w-full mt-4 border-t-8 border-b-8 border-grey-50 px-4 py-3">
      <p className="font-semibold">شکل دارو را انتخاب کنید</p>
      {drugShapesData?.queryResult?.map((item, index) => {
        const matchedProducts = filteredProducts?.filter(
          (product) => product?.otcLevel === item?.otcLevel3,
        );
        return (
          <div
            key={index}
            className={`flex flex-col border-[1px] py-5 rounded-xl px-2 mt-4 ${matchedProducts?.length > 0 ? 'border-black' : 'border-grey-200'}`}
            onClick={() => handleClickOnDrugShape(item?.otcLevel3)}
          >
            <p className="text-xs font-medium truncate mr-2">{item?.shape}</p>
            {matchedProducts?.length > 0 && (
              <div className="flex flex-col">
                {matchedProducts.map((matchedProduct, idx) => {
                  const productBasketQuantity =
                    basketData?.products?.find(
                      (basketItem) => basketItem.irc === matchedProduct?.irc,
                    )?.quantity ?? 0;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between mt-4 mx-3 gap-x-3"
                    >
                      <p className="text-grey-500 text-xs">
                        {matchedProduct?.name}
                      </p>
                      <AddButton
                        unitName={item?.unit}
                        count={productBasketQuantity}
                        onChangeCount={(count) =>
                          onChange(
                            count,
                            item?.otcLevel3,
                            matchedProduct?.irc,
                            matchedProduct?.imageLink,
                            matchedProduct?.name,
                          )
                        }
                        isLoading={isAddingToCart}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
