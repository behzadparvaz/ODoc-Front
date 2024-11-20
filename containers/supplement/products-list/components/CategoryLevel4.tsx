import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import { useGetSupplementCategoryLevel4 } from '@api/supplement/supplementApis.rq';
import NextImage from '@com/_core/NextImage';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));

type CategoryLevel4Props = {
  categoryCodeLevel3?: string;
};

const shimerItems = [1, 2, 3, 4];

const CategoryLevel4 = ({ categoryCodeLevel3 }: CategoryLevel4Props) => {
  const { query, pathname, push } = useRouter();

  const { data: categoryLevel4, isLoading: categoryLevel4IsLoading } =
    useGetSupplementCategoryLevel4(categoryCodeLevel3);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (item) => {
    if (selectedCategory?.categoryCodeLevel4 === item?.categoryCodeLevel4) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(item);
    }
  };

  useEffect(() => {
    if (!!query?.categoryCodeLevel3) {
      const fleteredCategories = categoryLevel4?.filter(
        (item) => item?.categoryCodeLevel4 === query?.categoryCodeLevel4,
      );
      if (fleteredCategories) {
        setSelectedCategory(fleteredCategories?.[0]);
      }
    }
  }, [query?.categoryCodeLevel4, categoryLevel4]);

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
        className="w-full flex flex-col items-center cursor-pointer px-4 gap-y-1"
      >
        <div
          className={classNames(
            'w-[48px] h-[48px] flex items-center justify-center overflow-hidden rounded-full',
            selectedCategory?.categoryCodeLevel4 === item?.categoryCodeLevel4 &&
              'bg-surface-Gradient.brand',
          )}
        >
          <div className="h-[48px] w-[48px] flex justify-center items-center overflow-hidden rounded-full object-fill">
            <NextImage
              alt="supplement-category-l4"
              src={item?.iconLink}
              width={48}
              height={48}
            />
          </div>
        </div>

        <span
          className={classNames(
            'min-w-max w-full text-content-tertiary text-xs text-center',
            selectedCategory?.categoryCodeLevel4 === item?.categoryCodeLevel4 &&
              '!text-content-primary font-medium',
          )}
        >
          {item?.categoryNameLevel4}
        </span>
      </div>
    );
  };

  if (
    !categoryLevel4IsLoading &&
    categoryLevel4?.length === 1 &&
    categoryLevel4?.[0]?.categoryCodeLevel4 === null
  ) {
    return;
  }

  if (categoryLevel4IsLoading) {
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
    <div className="h-[80px] bg-surface-secondary flex flex-col justify-center items-center">
      <ScrollSlider className="flex flex-col justify-center h-full">
        <div className="w-max min-w-full flex items-center bg-surface-secondary">
          {categoryLevel4?.map((item) => (
            <>{item?.categoryCodeLevel4 && renderCategoryItem(item)}</>
          ))}
        </div>
      </ScrollSlider>
    </div>
  );
};

export default CategoryLevel4;
