import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetCarouselProduct } from '@api/promotion/promotion.rq';
import useProductNavigation from '@hooks/useNavigateToPdp';
import SearchBox from '@com/_atoms/SearchInput';

const VerticalProductCardShimmer = dynamic(
  () => import('@com/_atoms/verticalProductCardShimmer'),
);
const Pagination = dynamic(() => import('@com/_molecules/Pagination'));
const VerticalProductCard = dynamic(
  () => import('@com/_molecules/VerticalProductCard'),
);

const Products = () => {
  const { query, push } = useRouter();
  const { ref, inView } = useInView();
  const { navigateToPdp } = useProductNavigation();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetCarouselProduct({
      carouselId: query?.carouselId,
      search: query?.search,
    });

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

  const onChangeSearchInput = (value: string) => {
    push({ query: { ...query, search: value } }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-4 mb-4">
          <SearchBox
            handleChange={onChangeSearchInput}
            defualtValue={query?.search}
          />
        </div>
      </div>
      {(isLoading || isFetchingNextPage) && !productList?.length ? (
        <div
          className={classNames(
            'h-full w-full grid grid-cols-2 overflow-y-scroll',
          )}
        >
          {[...Array(8).keys()].map((item) => (
            <div
              key={item}
              className="w-full flex justify-center border-border-primary first:!border-t [&:nth-child(2)]:border-t h-[217px] odd:border-r odd:border-l odd:border-b even:border-l even:border-b"
            >
              <VerticalProductCardShimmer />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={classNames(
            'h-max w-full grid grid-cols-2 overflow-y-scroll',
            (data?.pages?.at(-1)?.pageNumber >= 10 || query?.pageNumber) &&
              'mb-[86px]',
          )}
        >
          {productList?.map((item) => (
            <VerticalProductCard
              onClick={() =>
                navigateToPdp({ item, ProductTypeId: item.productType })
              }
              className="!h-[217px] border-border-primary odd:border odd:!border-t-0 first:!border-t even:border-l even:border-b"
              productData={item}
              key={item?.irc}
              hasAddToCart
            />
          ))}

          {data?.pages?.at(-1)?.pageNumber < 10 && !query?.pageNumber && (
            <div ref={ref} className="w-full col-start-1 col-end-3">
              {hasNextPage && isFetchingNextPage && (
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
      )}
    </div>
  );
};
export default Products;
