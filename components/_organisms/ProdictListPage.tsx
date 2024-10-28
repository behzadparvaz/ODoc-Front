import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Button from '@com/_atoms/Button';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import useCheckPage from '@hooks/useCheckPage';
import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { useGetPlpInfiniteContent } from '@api/plp/plpApi.rq';
import { MainLayout } from '@com/Layout';
import SearchBox from '@com/_atoms/SearchBox';
import { routeList } from '@routes/routeList';
import { productListPageTexts } from '@com/texts/productListPageTexts';
import InfiniteScroll from 'react-infinite-scroll-component';
import EmptyContent from '@com/_atoms/EmptyContent';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import ActionBar from '@com/Layout/ActionBar';

const HorizontalProductCard = dynamic(
  () => import('@com/_molecules/HorizontalProductCard'),
);

type Props = {};

export default function ProdictListPage({}: Props) {
  const { push, back, query } = useRouter();
  const { isInSearchPage } = useCheckPage();
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<
    Basket & { productsById: any }
  >({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(
        res?.products?.map((pr) => [pr.irc, pr]),
      ),
    }),
    enabled: true,
  });

  const searchTerm = query?.search;

  const categoryName = query?.category || query?.search;
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
    <MainLayout
      title={!searchTerm && categoryName}
      hasHeader
      headerType="withoutLogo"
      searchSection={!!searchTerm && <SearchBox />}
      hasBackButton
    >
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
            {/* در حال بارگذاری... */}
          </div>
        }
        dataLength={items?.length}
      >
        <div className="p-4 space-y-4">
          {items?.length ? (
            items?.map((product, index) => (
              <HorizontalProductCard
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
      <ActionBar>
        <div className="w-full flex justify-center items-center p-4">
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
      </ActionBar>
    </MainLayout>
  );
}
