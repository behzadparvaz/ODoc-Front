import { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { useGetSupplementCategoryLevel4 } from '@api/supplement/supplementApis.rq';
import NextImage from '@com/_core/NextImage';
import ScrollSlider from '@com/_molecules/ScrollSlider.nd';

type CategoryLevel4Props = {
  categoryCodeLevel3?: string;
};

const shimerItems = [1, 2, 3, 4];

const CategoryLevel4 = ({ categoryCodeLevel3 }: CategoryLevel4Props) => {
  const { query, pathname, push } = useRouter();

  const { data: subCategories, isLoading: subCategoriesIsLoading } =
    useGetSupplementCategoryLevel4(categoryCodeLevel3);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (item) => {
    if (selectedCategory?.categoryCodeLevel4 === item?.categoryCodeLevel4) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(item);
    }
  };

  const renderCategoryItem = (item) => {
    return (
      <div
        onClick={() => {
          handleSelectCategory(item);
          push(
            {
              pathname: pathname,
              query:
                selectedCategory?.categoryCodeLevel4 !==
                item?.categoryCodeLevel4
                  ? {
                      categoryCodeLevel2: query?.categoryCodeLevel2,
                      categoryNameLevel2: query?.categoryNameLevel2,
                      categoryCodeLevel3: query?.categoryCodeLevel3,
                      categoryCodeLevel4: item?.categoryCodeLevel4,
                    }
                  : {
                      categoryCodeLevel2: query?.categoryCodeLevel2,
                      categoryNameLevel2: query?.categoryNameLevel2,
                      categoryCodeLevel3: query?.categoryCodeLevel3,
                    },
            },
            undefined,
            { shallow: true },
          );
        }}
        key={item?.categoryCodeLevel4}
        className="w-full flex flex-col items-center cursor-pointer px-4 py-3 gap-y-1"
      >
        <div
          className={classNames(
            'w-[33.5px] h-[33.5px] flex items-center justify-center overflow-hidden rounded-full',
            selectedCategory?.categoryCodeLevel4 === item?.categoryCodeLevel4 &&
              'bg-surface-Gradient.brand',
          )}
        >
          <div className="flex items-center justify-center w-[32px] h-[32px] overflow-hidden rounded-full">
            <NextImage
              alt="supplement-category-l4"
              src={item?.iconImage}
              width={32}
              height={32}
            />
          </div>
        </div>

        <span className="min-w-max w-full text-content-tertiary text-xs text-center">
          {item?.categoryNameLevel4}
        </span>
      </div>
    );
  };

  if (
    !subCategoriesIsLoading &&
    subCategories?.length === 1 &&
    subCategories?.[0]?.categoryCodeLevel4 === null
  ) {
    return;
  }

  if (subCategoriesIsLoading) {
    return (
      <div className="w-full h-[80px] flex justify-center items-center">
        {shimerItems.map((item) => (
          <div
            key={item}
            className="h-full w-1/4 bg-surface-secondary animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-[80px] bg-surface-secondary flex flex-col">
      <ScrollSlider className="flex flex-col">
        <div className="w-max min-w-full flex bg-surface-secondary">
          {subCategories?.map((item) => <>{renderCategoryItem(item)}</>)}
        </div>
      </ScrollSlider>
    </div>
  );
};

export default CategoryLevel4;
