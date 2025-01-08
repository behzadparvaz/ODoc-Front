import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetCarouselProduct } from '@api/promotion/promotion.rq';
import useProductNavigation from '@hooks/useNavigateToPdp';
import SearchBox from '@com/_atoms/SearchInput';
import { debounce } from '@utilities/debounce';

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
  const [searchInput, setSearchInput] = useState('');
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetCarouselProduct({
    carouselId: query?.carouselId,
    search: searchInput,
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    console.log(searchInput);
    refetch();
  }, [searchInput]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const render = useMemo(() => {
    if ((isLoading || isFetchingNextPage) && !productList?.length) {
      return (
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
      );
    } else {
      return (
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
              className="!h-[217px] border-border-primary odd:border odd:border-t-0 first:!border-t even:border-l even:border-b [&:nth-child(2)]:border-t"
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
      );
    }
  }, [data, searchInput, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col gap-y-lg">
      <div className="flex w-full justify-center items-center p-4">
        <SearchBox
          handleChange={handleSearchChange}
          defualtValue={searchInput}
        />
      </div>
      {render}
    </div>
  );
};
export default Products;
