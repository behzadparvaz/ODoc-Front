import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useGetSupplementCategoryLevel3 } from '@api/supplement/supplementApis.rq';
import ScrollSlider from '@com/_molecules/ScrollSlider.nd';

const CategoryLevel4 = dynamic(() => import('./CategoryLevel4'));

type CategoryLevel3Props = {
  categoryCodeLevel2?: string;
};
const shimerItems = [1, 2, 3, 4];

const CategoryLevel3 = ({ categoryCodeLevel2 }: CategoryLevel3Props) => {
  const { query, pathname, push } = useRouter();

  const { data: subCategories, isLoading: subCategoriesIsLoading } =
    useGetSupplementCategoryLevel3(categoryCodeLevel2);

  const [selectedCategory, setSelectedCategory] = useState({
    categoryCodeLevel3: '',
    categoryNameLevel3: 'همه',
  });

  const handleSelectCategory = (item) => {
    setSelectedCategory(item);
  };

  const renderCategoryItem = (item) => {
    return (
      <div
        onClick={() => {
          handleSelectCategory(item);
          if (
            selectedCategory?.categoryCodeLevel3 !== item?.categoryCodeLevel3
          ) {
            push(
              {
                pathname: pathname,
                query: item?.categoryCodeLevel3
                  ? {
                      categoryCodeLevel2: query?.categoryCodeLevel2,
                      categoryNameLevel2: query?.categoryNameLevel2,
                      categoryCodeLevel3: item?.categoryCodeLevel3,
                    }
                  : {
                      categoryCodeLevel2: query?.categoryCodeLevel2,
                      categoryNameLevel2: query?.categoryNameLevel2,
                    },
              },
              undefined,
              { shallow: true },
            );
          }
        }}
        key={item?.categoryCodeLevel3}
        className="w-full flex flex-col cursor-pointer"
      >
        <div className="min-w-max w-full flex justify-center px-4 pt-2 pb-1 flex-nowrap">
          {item?.categoryNameLevel3}
        </div>
        <div className="relative h-2 w-full bg-surface-secondary ">
          {selectedCategory?.categoryCodeLevel3 ===
            item?.categoryCodeLevel3 && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[calc(100%-32px)] bg-surface-Gradient.brand transition-all duration-300 rounded-full" />
          )}
        </div>
      </div>
    );
  };

  if (subCategoriesIsLoading) {
    return (
      <div className="w-full h-[44px] flex flex-col gap-0">
        <div className="h-full w-full flex">
          {shimerItems.map((item) => (
            <div
              key={item}
              className="h-full w-1/4 bg-surface-secondary animate-pulse"
            />
          ))}
        </div>
        <div className="h-[8px] w-full bg-surface-secondary" />
      </div>
    );
  }

  return (
    <div className=" flex flex-col z-1">
      <ScrollSlider className="flex flex-col">
        <div className="w-max min-w-full flex">
          <>
            {renderCategoryItem({
              categoryCodeLevel3: '',
              categoryNameLevel3: 'همه',
            })}
          </>
          {subCategories?.map((item) => <>{renderCategoryItem(item)}</>)}
        </div>
      </ScrollSlider>

      {!!selectedCategory?.categoryCodeLevel3 && (
        <CategoryLevel4
          categoryCodeLevel3={selectedCategory?.categoryCodeLevel3}
        />
      )}
    </div>
  );
};

export default CategoryLevel3;
