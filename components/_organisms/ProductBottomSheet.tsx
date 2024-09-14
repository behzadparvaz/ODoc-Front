import { useGetCategoryLevel4 } from '@api/category/categoryApis.rq';
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
  const { data } = useGetCategoryLevel4(body);
  const products = data?.queryResult;

  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton={false}
      className=" p-4"
      title="محصولات"
    >
      {products?.map((item) => {
        return (
          <div className="mt-4">
            <HorizontalProductCard prInfo={item} hasCompleteAddToCartButton />
          </div>
        );
      })}
    </BottomModalContainer>
  );
}
