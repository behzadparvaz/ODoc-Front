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
      if (!!categoryLevel4?.length) {
        const fleteredCategories = categoryLevel4?.filter(
          (item) => item?.categoryCodeLevel4 === query?.categoryCodeLevel4,
        );
        if (fleteredCategories) {
          setSelectedCategory(fleteredCategories?.[0]);
        }
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
                      categoryCodeLevel1: query?.categoryCodeLevel1,
                      categoryCodeLevel2: query?.categoryCodeLevel2,
                      categoryNameLevel2: query?.categoryNameLevel2,
                      categoryCodeLevel3: query?.categoryCodeLevel3,
                      categoryCodeLevel4: item?.categoryCodeLevel4,
                    }
                  : {
                      categoryCodeLevel1: query?.categoryCodeLevel1,
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
        className="w-[70px] h-[116px] flex flex-col cursor-pointer"
      >
        <div
          className={classNames(
            'flex items-center justify-center overflow-hidden rounded-lg bg-surface-secondary',
            selectedCategory?.categoryCodeLevel4 === item?.categoryCodeLevel4 &&
              'border border-border-inversePrimary',
          )}
        >
          <div className="h-[68px] w-[70px] flex justify-center items-center  object-fill rounded-lg">
            <NextImage
              alt="supplement-category-l4"
              src={item?.iconLink}
              width={56}
              height={56}
            />
          </div>
        </div>

        <span
          className={classNames(
            'w-full text-content-primary text-xs font-medium text-center leading-6 line-clamp-2',
          )}
        >
          {item?.categoryNameLevel4}
        </span>
      </div>
    );
  };

  if (
    (!categoryLevel4IsLoading &&
      categoryLevel4?.length === 1 &&
      categoryLevel4?.[0]?.categoryCodeLevel4 === null) ||
    !categoryLevel4?.length
  ) {
    return;
  }

  if (categoryLevel4IsLoading) {
    return (
      <div className="w-full h-[116px] flex justify-center items-center">
        {shimerItems?.map((item) => (
          <div
            key={item}
            className="h-full w-1/4 bg-surface-secondary animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-[116px] flex flex-col justify-center items-center px-4 overflow-hidden">
      <ScrollSlider className="flex flex-col justify-center h-full">
        <div className="w-max min-w-full flex items-center gap-x-4">
          {categoryLevel4.length > 0 &&
            categoryLevel4?.map((item) => (
              <>{item?.categoryCodeLevel4 && renderCategoryItem(item)}</>
            ))}
        </div>
      </ScrollSlider>
    </div>
  );
};

export default CategoryLevel4;
