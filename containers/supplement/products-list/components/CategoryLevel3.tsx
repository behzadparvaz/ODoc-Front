import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useGetSupplementCategoryLevel3 } from '@api/supplement/supplementApis.rq';
import classNames from 'classnames';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const FilterAndSort = dynamic(() => import('./FilterAndSort'));
const CategoryLevel4 = dynamic(() => import('./CategoryLevel4'));

type CategoryLevel3Props = {
  categoryCodeLevel2?: string;
};
const shimerItems = [1, 2, 3, 4];

const CategoryLevel3 = ({ categoryCodeLevel2 }: CategoryLevel3Props) => {
  const { query, pathname, push } = useRouter();

  const { data: categoryLevel3, isLoading: categoryLevel3IsLoading } =
    useGetSupplementCategoryLevel3(categoryCodeLevel2);

  const [selectedCategory, setSelectedCategory] = useState({
    categoryCodeLevel3: '',
    categoryNameLevel3: 'همه',
  });

  const handleSelectCategory = (item) => {
    setSelectedCategory(item);
  };

  useEffect(() => {
    if (!!query?.categoryCodeLevel3) {
      const fleteredCategories = categoryLevel3?.filter(
        (item) => item?.categoryCodeLevel3 === query?.categoryCodeLevel3,
      );
      if (fleteredCategories) {
        setSelectedCategory(fleteredCategories?.[0]);
      }
    }
  }, [query?.categoryCodeLevel3, categoryLevel3]);

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
                      categoryCodeLevel1: query?.categoryCodeLevel1,
                      categoryCodeLevel2: query?.categoryCodeLevel2,
                      categoryNameLevel2: query?.categoryNameLevel2,
                      categoryCodeLevel3: item?.categoryCodeLevel3,
                    }
                  : {
                      categoryCodeLevel1: query?.categoryCodeLevel1,
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
        className={classNames(
          'h-8 rounded-full border border-border-primary whitespace-nowrap text-nowrap w-full flex justify-center px-3 flex-nowrap text-content-primary font-normal text-sm items-center cursor-pointer',
          selectedCategory?.categoryCodeLevel3 === item?.categoryCodeLevel3 &&
            '!bg-surface-secondary !border-border-inversePrimary',
        )}
      >
        {item?.categoryNameLevel3}
      </div>
    );
  };

  if (categoryLevel3IsLoading) {
    return (
      <div className="flex flex-col h-[100px] sticky top-0 left-0 w-full bg-surface-primary z-50">
        <div className="w-full h-[32px] flex flex-col gap-0">
          <div className="h-full w-full flex gap-x-2 px-4">
            <FilterAndSort />
            {shimerItems.map((item) => (
              <div
                key={item}
                className="h-full w-1/4 border border-border-primary rounded-full animate-pulse bg-surface-secondary"
              />
            ))}
          </div>
          <div className="h-[8px] w-full bg-surface-secondary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sticky top-0 left-0 w-full bg-surface-primary z-50">
      <ScrollSlider className="flex flex-col py-4">
        <div className="w-max min-w-full flex items-center gap-x-2 px-4">
          <FilterAndSort />
          <>
            {renderCategoryItem({
              categoryCodeLevel3: '',
              categoryNameLevel3: 'همه',
            })}
          </>
          {categoryLevel3?.map((item) => (
            <>{item?.categoryCodeLevel3 && renderCategoryItem(item)}</>
          ))}
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
