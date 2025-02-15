import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { useGetCategories } from '@api/category/categoryApis.rq';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const Filter = dynamic(() => import('./Filter'));

const shimerItems = [1, 2];

const Categories = () => {
  const { pathname, query, push } = useRouter();
  const { data, isLoading } = useGetCategories({ level: 1 });

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
        className={classNames(
          'h-8 rounded-full border border-border-primary whitespace-nowrap text-nowrap w-full flex justify-center px-3 flex-nowrap text-content-primary font-normal text-sm items-center cursor-pointer',
          query?.categoryCodeLevel1 === item?.categoryCodeLevel1 &&
            '!bg-surface-secondary !border-border-inversePrimary',
        )}
      >
        {item?.categoryNameLevel1}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-x-2 h-max sticky top-0 left-0 w-full bg-surface-primary z-50 p-4">
        <Filter />

        {shimerItems.map((item) => (
          <div
            key={item}
            className="h-[32px] w-1/2 border border-border-primary rounded-full animate-pulse bg-surface-secondary"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col sticky top-0 left-0 w-full bg-surface-primary z-50">
      <ScrollSlider className="flex flex-col py-4">
        <div className="w-max min-w-full flex items-center gap-x-2 px-4">
          <Filter />

          {data?.queryResult?.map((item) => renderCategoryItem(item))}
        </div>
      </ScrollSlider>
    </div>
  );
};

export default Categories;
