import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { useGetCategories } from '@api/category/categoryApis.rq';
import Spinner from '@com/_atoms/Spinner';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const Filter = dynamic(() => import('./Filter'));

type CategoryItemsDataModel = {
  categoryNameLevel1: string;
  categoryCodeLevel1: string;
  iconLink?: string;
};

const shimerItems = [1, 2, 3, 4];

const Categories = () => {
  const { pathname, query, push } = useRouter();
  const { data, isLoading } = useGetCategories({ level: 1 });

  if (isLoading)
    return (
      <Spinner className="h-full w-full flex justify-center items-center" />
    );

  const renderCategoryItem = (item) => {
    return (
      <div
        onClick={() => {
          const { pageNumber, ...rest } = query;
          push(
            {
              pathname: pathname,
              query: {
                ...rest,
                categoryCodeLevel1: item?.categoryCodeLevel1,
              },
            },
            undefined,
            { shallow: true },
          );
        }}
        className="w-full flex flex-col cursor-pointer"
      >
        <div
          className={classNames(
            'whitespace-nowrap text-nowrap w-full flex justify-center px-4 pt-2 pb-1 flex-nowrap text-content-tertiary font-medium',
            query?.categoryCodeLevel1 === item?.categoryCodeLevel1 &&
              '!text-content-primary',
          )}
        >
          {item?.categoryNameLevel1}
        </div>
        <div className="relative h-1 w-full bg-surface-secondary ">
          {query?.categoryCodeLevel1 === item?.categoryCodeLevel1 && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[calc(100%-32px)] bg-surface-Gradient.brand transition-all duration-300 rounded-full" />
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-[100px] sticky top-0 left-0 w-full bg-surface-primary z-50">
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

        <Filter />
      </div>
    );
  }

  return (
    <div className="flex flex-col sticky top-0 left-0 w-full bg-surface-primary z-50">
      <ScrollSlider className="flex flex-col">
        <div className="w-max min-w-full flex">
          {data?.queryResult?.map((item) => renderCategoryItem(item))}
        </div>
      </ScrollSlider>

      <Filter />
    </div>
  );
};

export default Categories;
