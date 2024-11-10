import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

import { useGetSupplementProducts } from '@api/supplement/supplementApis.rq';
import VerticalProductCard from '@com/_molecules/VerticalProductCard';
import VerticalProductCardShimmer from '@com/_atoms/verticalProductCardShimmer';
import { routeList } from '@routes/routeList';
import classNames from 'classnames';

const shimerItems = [1, 2, 3, 4, 5, 6, 7, 8];

const Products = () => {
  const { query, push } = useRouter();
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSupplementProducts(
    Object.fromEntries(
      Object.entries(query).filter(
        ([key, value]) =>
          value !== undefined &&
          key !== 'categoryCodeLevel2' &&
          key !== 'categoryNameLevel2',
      ),
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
    </div>
  );
};
export default Products;
