import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';

import VerticalProductCard from '@com/_molecules/VerticalProductCard';
import VerticalProductCardShimmer from '@com/_atoms/verticalProductCardShimmer';
import { routeList } from '@routes/routeList';
import { useGetOtcMedicineProducts } from '@api/product/productApis.rq';

const Pagination = dynamic(() => import('@com/_molecules/Pagination'));

const Products = () => {
  const { query, push } = useRouter();
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetOtcMedicineProducts(
      Object.fromEntries(
        Object.entries(query).filter(
          ([key, value]) => value !== null && key !== 'shapeName',
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

  const isShownPagination = useMemo(
    () => data?.pages?.at(-1).pageNumber >= 10 || query?.pageNumber,
    [data?.pages?.at(-1)?.pageNumber, query?.pageNumber],
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if ((isLoading || isFetchingNextPage) && !productList?.length) {
    return (
      <div className={classNames('w-full grid grid-cols-2 overflow-y-scroll')}>
        {[...Array(8).keys()].map((item) => (
          <div
            key={item}
            className="w-full flex justify-center border-border-primary first:!border-t [&:nth-child(2)]:border-t h-[217px] odd:border-r odd:border-l odd:border-b even:border-l even:border-b"
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
        'h-full w-full grid grid-cols-2 ',
        (data?.pages?.at(-1)?.pageNumber >= 10 || query?.pageNumber) &&
          'mb-[86px]',
      )}
    >
      {productList?.map((item) => (
        <VerticalProductCard
          onClick={() =>
            push({
              pathname: `${routeList?.searchProductPage}`,
              query: {
                brandName: item.brandName,
                categoryCodeLevel3: item.categoryCodeLevel3,
                irc: item?.irc ?? item.genericCode,
              },
            })
          }
          className="!h-[217px] border-border-primary odd:border odd:border-t-0 first:!border-t even:border-l even:border-b [&:nth-child(2)]:border-t"
          productData={item}
          key={item?.irc}
          hasAddToCart
        />
      ))}

      {data?.pages?.at(-1)?.pageNumber < 10 && !query?.pageNumber && (
        <div ref={ref} className="w-full col-start-1 col-end-3">
          {hasNextPage && (
            <div className="h-full w-full grid grid-cols-2 overflow-y-scroll">
              {[...Array(8).keys()].map((item) => (
                <div
                  key={item}
                  className="w-full flex justify-center border-border-primary h-[217px] odd:border-r odd:border-l odd:border-b even:border-l even:border-b"
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
