import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import { useGetCategories } from '@api/category/categoryApis.rq';
import OtcMedicineFamilyNames from './OtcMedicineFamilyNames';
import Spinner from '@com/_atoms/Spinner';
import NextImage from '@com/_core/NextImage';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));

type CategoryItemsDataModel = {
  categoryNameLevel1: string;
  categoryCodeLevel1: string;
  iconLink?: string;
};

const OtcMedicineCategories = () => {
  const { push, query, pathname } = useRouter();
  const { data, isLoading } = useGetCategories({ level: 1 });

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryItemsDataModel | null>(null);

  const handleSelectCategory = (item: CategoryItemsDataModel) => {
    setSelectedCategory(item);
    push(
      {
        pathname: pathname,
        query: {
          ...query,
          categoryNameLevel1: item?.categoryNameLevel1,
          categoryCodeLevel1: item?.categoryCodeLevel1,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    if (query?.categoryNameLevel1 && query?.categoryCodeLevel1) {
      setSelectedCategory({
        categoryNameLevel1: query?.categoryNameLevel1 as string,
        categoryCodeLevel1: query.categoryCodeLevel1 as string,
      });
    } else {
      setSelectedCategory(null);
    }
  }, [query]);

  if (isLoading)
    return (
      <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
    );

  if (!!selectedCategory) {
    return (
      <div>
        <div className="absolute right-0 top-[56px] h-[58px] w-full flex items-center px-4 mb-2 z-10 bg-surface-primary">
          <ScrollSlider className="flex flex-col">
            <div className="w-max min-w-full flex">
              {data?.queryResult?.map((item) => {
                return (
                  <div
                    key={item?.categoryCodeLevel3}
                    className="w-full flex flex-col cursor-pointer"
                    onClick={() => handleSelectCategory(item)}
                  >
                    <div
                      className={classNames(
                        'min-w-max w-full flex justify-center px-4 pt-2 pb-1 flex-nowrap text-content-tertiary font-medium',
                        selectedCategory?.categoryCodeLevel1 ===
                          item?.categoryCodeLevel1 && '!text-content-primary',
                      )}
                    >
                      {item?.categoryNameLevel1}
                    </div>
                    <div className="relative h-1 w-full bg-surface-secondary ">
                      {selectedCategory?.categoryCodeLevel1 ===
                        item?.categoryCodeLevel1 && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[calc(100%-32px)] bg-surface-Gradient.brand transition-all duration-300 rounded-full" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollSlider>
        </div>

        <div className="pt-[58px]">
          <OtcMedicineFamilyNames
            categoryCode={selectedCategory?.categoryCodeLevel1}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 h-max grid grid-rows-4 grid-cols-2 gap-4">
      {data?.queryResult?.map((item) => (
        <div
          key={item?.categoryCodeLevel1}
          onClick={() => handleSelectCategory(item)}
          className="h-[104px] flex flex-col items-center gap-2 px-4 py-2 rounded-lg bg-surface-secondary cursor-pointer gap-y-2"
        >
          <div className="!w-[56px] !h-[56px] flex items-center justify-center overflow-hidden rounded-base">
            {item?.iconLink && (
              <NextImage
                src={item?.iconLink}
                width={56}
                height={56}
                alt={item?.categoryNameLevel1}
              />
            )}
          </div>

          <span className="text-2xs w-full text-center truncate">
            {item?.categoryNameLevel1}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OtcMedicineCategories;
