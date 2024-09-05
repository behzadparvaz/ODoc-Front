import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRightIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import Button from '@com/_atoms/Button';
import { productListPageTexts } from '@com/texts/productListPageTexts';
import { useGetPlpInfiniteContent } from '@api/plp/plpApi.rq';
import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { routeList } from '@routes/routeList';
import useCheckPage from '@hooks/useCheckPage';
import NextLink from '@com/_core/NextLink';
import EmptyContent from '@com/_atoms/EmptyContent';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';

const ProductCard = dynamic(() => import('@com/_molecules/productCard'));

type Props = {};

export default function ProdictListPage({}: Props) {
  const { push, back, query } = useRouter();
  const { isInSearchPage } = useCheckPage();
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<
    Basket & { productsById: any }
  >({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(res.products.map((pr) => [pr.irc, pr])),
    }),
    enabled: true,
  });

  const searchTerm = query?.search;

  const categoryName = query?.category||query?.search;
  const body = {
    ...query,
    pageNumber: 1,
    pageSize: 10,
  };

  const { plpData } = useGetPlpInfiniteContent(body);

  const items = useMemo(
    () =>
      plpData
        ? plpData?.data?.pages
          ? plpData?.data?.pages?.reduce(
              (prev, current) => [
                ...prev,
                ...(current?.queryResult ? current?.queryResult : []),
              ],
              [],
            )
          : []
        : [],
    [plpData],
  );

  return (
    <div
      className={` ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''} bg-white h-screen`}
    >
      <div
        className={`${!isInSearchPage?'border border-grey-100':''} fixed inset-x-0 top-0 flex items-center bg-white py-4 px-4 gap-x-4  ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
      >
        <div onClick={() => back()}>
          <ArrowRightIconOutline height={24} width={24} fill={colors.black} />
        </div>
        {isInSearchPage ? (
          <NextLink href={routeList?.mobileSearch}>
            <a className="h-[52px] w-full flex items-center bg-grey-200 rounded-lg px-3">
              {searchTerm}
            </a>
          </NextLink>
        ) : (
          <p>{categoryName}</p>
        )}
      </div>
      {/* <div className="flex items-center justify-between m-4">
        <span className="text-sm font-medium text-grey-900">داروی کمیاب</span>
        <label className="cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-grey-300 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-grey-600"></div>
        </label>
      </div> */}
      <InfiniteScroll
        scrollableTarget="orderListScrollParent"
        style={{ overflow: 'hidden' }}
        next={() => {
          plpData?.fetchNextPage();
        }}
        hasMore={plpData?.hasNextPage}
        loader={
          <div className="flex items-center justify-center h-16">
            در حال بارگذاری...
          </div>
        }
        dataLength={items?.length}
        className="pt-[68px]"
      >
        <div className="p-4 space-y-4">
          {items?.length ? (
            items?.map((product, index) => (
              <ProductCard
                key={index}
                prInfo={{
                  ...product,
                  quantity:
                    basket?.productsById?.[Number(product.irc)]?.quantity ?? 0,
                }}
                hasAddToCartButton
                onSuccessChanged={refetchGetBasket}
              />
            ))
          ) : (
            <EmptyContent
              imgSrc="/static/images/staticImages/search-empty-content.png"
              title={mobileSearchTexts?.noSearchResult}
            />
          )}
        </div>
      </InfiniteScroll>

      <div
        className={`fixed inset-x-0 px-6 bottom-6 truncate z-10 ${
          shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
        } `}
      >
        <Button
          className="w-full !rounded-full"
          size="large"
          backgroundColor={colors.black}
          color={colors.white}
          handleClick={() => {
            push(routeList.basket);
          }}
        >
          {productListPageTexts?.seeBasket}
        </Button>
      </div>
    </div>
  );
}
