import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';

import { useGetSupplementProducts } from '@api/supplement/supplementApis.rq';
import VerticalProductCard from '@com/_molecules/VerticalProductCard';
import VerticalProductCardShimmer from '@com/_atoms/verticalProductCardShimmer';
import { routeList } from '@routes/routeList';

enum SortEnum {
  BestSeller = 'BestSeller',
  MostVisited = 'MostVisited',
  MostDiscounted = 'MostDiscounted',
  MostExpensive = 'MostExpensive',
  Cheapest = 'Cheapest',
}

const Pagination = dynamic(() => import('./Pagination'));

const shimerItems = [1, 2, 3, 4, 5, 6, 7, 8];

const Products = () => {
  const { query, push } = useRouter();
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSupplementProducts(
      Object.fromEntries(
        Object.entries(query)
          .map(([key, value]) => {
            if (
              key === 'sort' &&
              (value === 'BestSeller' ||
                value === 'MostVisited' ||
                value === 'MostDiscounted' ||
                value === 'MostExpensive' ||
                value === 'Cheapest')
            ) {
              return [value, 1];
            }
            if (
              !!value &&
              key !== 'categoryNameLevel2' &&
              key !== 'shapeName'
            ) {
              return [key, value];
            }
            return null;
          })
          .filter((entry) => entry !== null),
      ),
    );

  const productList = useMemo(
    () =>
      data?.pages?.reduce(
        (prev, current) => [...prev, ...(current?.queryResult || [])],
        [],
      ),
    [data],
  );

  const isShownPagination = useMemo(
    () => data?.pages?.at(-1).pageNumber >= 10 || query?.page,
    [data?.pages?.at(-1)?.pageNumber, query?.page],
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if ((isLoading || isFetchingNextPage) && !productList?.length) {
    return (
      <div
        className={classNames(
          'h-full w-full grid grid-cols-2 overflow-y-scroll',
          query?.categoryCodeLevel3 ? 'mt-[180px]' : 'mt-[100px]',
        )}
      >
        {shimerItems.map((item) => (
          <div
            key={item}
            className="w-full flex justify-center border border-border-primary"
          >
            <VerticalProductCardShimmer />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={classNames(
        'h-full w-full grid grid-cols-2 overflow-y-scroll',
        query?.categoryCodeLevel3 ? 'mt-[180px]' : 'mt-[100px]',
        (data?.pages?.at(-1)?.pageNumber >= 10 || query?.page) && 'mb-[86px]',
      )}
    >
      {productList?.map((item) => (
        <VerticalProductCard
          onClick={() => push(`${routeList.supplementProduct}/${item?.id}`)}
          className="border border-border-primary"
          productData={item}
          key={item?.id}
          hasAddToCart
        />
      ))}

      {data?.pages?.at(-1)?.pageNumber < 10 && !query?.page && (
        <div ref={ref} className="w-full col-start-1 col-end-3">
          {hasNextPage && isFetchingNextPage && (
            <div className="h-full w-full grid grid-cols-2 overflow-y-scroll">
              {shimerItems.map((item) => (
                <div
                  key={item}
                  className="w-full flex justify-center border border-border-primary"
                >
                  <VerticalProductCardShimmer />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isShownPagination && (
        <Pagination
          lastPage={Math.floor(data?.pages?.[0]?.totalCount / 10) + 1}
        />
      )}
    </div>
  );
};
export default Products;
