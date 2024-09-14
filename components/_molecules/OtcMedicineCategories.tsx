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
        <div className="h-10 flex items-center px-4">
          <ScrollSlider className="gap-x-2">
            {data?.queryResult?.map((item) => {
              return (
                <div
                  key={item?.categoryCodeLevel1}
                  onClick={() => handleSelectCategory(item)}
                  className={classNames(
                    'w-max h-8 flex items-center px-3 bg-white text-sm rounded-full cursor-pointer border border-grey-200',
                    item?.categoryCodeLevel1 ===
                      selectedCategory?.categoryCodeLevel1 &&
                      '!bg-grey-50 border-1.5 !border-black -order-1',
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
    <div className="flex px-4 flex-col gap-y-2">
      <span className="text-base font-medium">نوع دارو</span>

      <div className="w-full h-max grid grid-rows-4 grid-cols-2 gap-y-2 gap-x-2">
        {data?.queryResult?.map((item) => (
          <div
            key={item?.categoryCodeLevel1}
            onClick={() => handleSelectCategory(item)}
            className="h-[104px] flex flex-col items-center gap-2 px-4 py-2 rounded-lg bg-grey-50 cursor-pointer gap-y-2"
          >
            <div className="!w-[56px] !h-[56px] flex items-center justify-center overflow-hidden rounded-lg">
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
    </div>
  );
};

export default OtcMedicineCategories;
