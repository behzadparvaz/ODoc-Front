import { useGetCategoryLevel4 } from '@api/category/categoryApis.rq';
import LoadingSpinner from '@com/_atoms/LoadingSpinner';
import HorizontalProductCard from '@com/_molecules/HorizontalProductCard';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  otcLevel3: string;
  categoryCode: string;
};

export default function ProductBottomSheet({ otcLevel3 }: Props) {
  const { query } = useRouter();
  const categoryCode = query?.categoryCode?.toString();
  const body = {
    otcLevel3: otcLevel3,
    categoryCodeLevel2: categoryCode,
  };
  const { data, isLoading } = useGetCategoryLevel4(body);
  const products = data?.queryResult;

  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton
      className=" p-4"
      title="انتخاب دوز دارو"
    >
      {isLoading && !products?.length ? (
        <LoadingSpinner color="black" className="mx-auto my-4" />
      ) : (
        products?.map((item) => {
          return (
            <div key={item?.id} className="mt-4">
              <HorizontalProductCard
                prInfo={item}
                hasAddToCartButton
                otcLevel3={otcLevel3}
              />
            </div>
          );
        })
      )}
    </BottomModalContainer>
  );
}
