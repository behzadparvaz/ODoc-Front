import NextImage from '@com/_core/NextImage';
import React from 'react';
import { useGetCategories } from '@api/category/categoryApis.rq';
import { useRouter } from 'next/router';
import useModal from '@hooks/useModal';
import ProductBottomSheet from '@com/_organisms/ProductBottomSheet';

type Props = {};

export default function DrugShapesBox({}: Props) {
  const { query } = useRouter();
  const { addModal } = useModal();
  const categoryCode = query?.categoryCode?.toString();
  const categoryName = query?.categoryName;
  const { data } = useGetCategories({
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

  return (
    <div className="grid grid-cols-2 gap-5 mt-4 px-4">
      {data?.queryResult?.map((item) => {
        return (
          <div
            className="flex items-center border border-grey-200 h-10 rounded-lg px-2"
            onClick={() => handleClickOnDrugShape(item?.otcLevel3)}
          >
            <NextImage
              src={'/static/images/staticImages/DefaultProductImage.png'}
              height={35}
              width={35}
            />
            <p className="text-sm font-medium truncate mr-2">{item?.shape}</p>
          </div>
        );
      })}
      {data?.queryResult?.length && (
        <div className="flex items-center border border-grey-200 h-10 rounded-md px-4">
          <NextImage
            src={'/static/images/staticImages/DefaultProductImage.png'}
            height={35}
            width={35}
          />
          <p className="text-sm font-medium mr-2">سایر</p>
        </div>
      )}
    </div>
  );
}
