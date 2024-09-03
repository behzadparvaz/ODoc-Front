import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRightIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import router, { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import Button from '@com/_atoms/Button';
import { productListPageTexts } from '@com/texts/productListPageTexts';
import { useGetPlpInfiniteContent } from '@api/plp/plpApi.rq';
import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import Basket from '../../pages/app/basket';
import { routeList } from '@routes/routeList';
import { MainLayout } from '@com/Layout';
import SearchBox from '@com/_atoms/SearchBox';

const ProductCard = dynamic(() => import('@com/_molecules/productCard'));

type Props = {};

export default function ProdictListPage({}: Props) {
  const router = useRouter();
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<
    Basket & { productsById: any }
  >({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(res.products.map((pr) => [pr.irc, pr])),
    }),
    enabled: true,
  });

  const searchTerm = router?.query?.search_text;
  const categoryName = router?.query?.categoryName;
  const body = {
    ...(searchTerm
      ? {
          productName: searchTerm,
        }
      : { category: categoryName }),
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
  console.log('categoryName', categoryName);
  return (
    <MainLayout
      title={!searchTerm && categoryName}
      hasHeader
      hasSerachSection={!!searchTerm}
      searchSection={<SearchBox defualtValue={searchTerm} />}
      hasBackButton
      hasBottomGap
      footer={
        <div className="h-full flex justify-center items-center p-4">
          <Button
            className="w-full !rounded-full"
            size="large"
            backgroundColor={colors.black}
            color={colors.white}
            handleClick={() => {
              router.push(routeList.basket);
            }}
          >
            {productListPageTexts?.seeBasket}
          </Button>
        </div>
      }
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
        loader={<div style={{ height: '100px' }}>در حال بارگذاری...</div>}
        dataLength={items?.length}
      >
        <div className="p-4 space-y-4">
          {items?.map((product, index) => (
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
          ))}
        </div>
      </InfiniteScroll>
    </MainLayout>
  );
}
