import { useGetCategories } from '@api/category/categoryApis.rq';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import OtcMedicineFamilyNames from './OtcMedicineFamilyNames';
import Image from 'next/image';
import Spinner from '@com/_atoms/Spinner';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));

type CategoryItemsDataModel = {
  categoryNameLevel1: string;
  categoryCodeLevel1: string;
};

const OtcMedicineCategories = () => {
  const { data, isLoading } = useGetCategories({ level: 1 });

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryItemsDataModel | null>(null);

  const handleSelectCategory = (item: CategoryItemsDataModel) => {
    setSelectedCategory(item);
  };

  if (isLoading)
    return (
      <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
    );

  if (!!selectedCategory) {
    return (
      <>
        <div className="h-10 flex items-center">
          <ScrollSlider className="px-4 gap-x-2">
            {data?.queryResult?.map((item) => {
              return (
                <div
                  key={item?.categoryCodeLevel1}
                  onClick={() => handleSelectCategory(item)}
                  className={classNames(
                    'w-max h-6 flex items-center px-2 bg-grey-50 text-xs rounded-full cursor-pointer',
                    item?.categoryCodeLevel1 ===
                      selectedCategory?.categoryCodeLevel1 &&
                      'bg-orange-500 text-white',
                  )}
                >
                  {item?.categoryNameLevel1}
                </div>
              );
            })}
          </ScrollSlider>
        </div>

        <div className="w-full">
          <OtcMedicineFamilyNames
            categoryCode={selectedCategory?.categoryCodeLevel1}
          />
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-max grid grid-rows-4 grid-cols-2 gap-y-2 gap-x-2">
      {data?.queryResult?.map((item) => (
        <div
          key={item?.categoryCodeLevel1}
          onClick={() => handleSelectCategory(item)}
          className="h-[100px] flex flex-col items-center gap-2 px-4 py-2 rounded-lg bg-grey-50 cursor-pointer"
        >
          <div className="w-[68px] h-[68px] flex items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={'/static/images/staticImages/emptyProduct.png'}
              width={68}
              height={68}
              alt={item?.categoryNameLevel1}
            />
          </div>

          <span className="text-xs w-full text-center truncate">
            {item?.categoryNameLevel1}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OtcMedicineCategories;
