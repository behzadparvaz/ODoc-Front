import { useGetCategories } from '@api/category/categoryApis.rq';
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
  const { data } = useGetCategories({
    parentCode: categoryCode,
    level: 4,
  });
  console.log(data);

  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton={true}
      className="!overflow-hidden"
    >
      ssssssssss
    </BottomModalContainer>
  );
}
