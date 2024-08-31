import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRightIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import router, { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode
} from '@configs/ControlMobileView';
import Button from '@com/_atoms/Button';
import { productListPageTexts } from '@com/texts/productListPageTexts';
import {
  useGetPlpInfiniteContent
} from '@api/plp/plpApi.rq';
import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import Basket from '../../pages/app/basket';
import { routeList } from '@routes/routeList';

const ProductCard = dynamic(() => import('@com/_molecules/productCard'));

type Props = {};

export default function ProdictListPage({}: Props) {
  const router = useRouter();
  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<Basket & { productsById: any }>({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(res.products.map(pr => [pr.irc, pr]))
    }),
    enabled: true
  });

  const searchTerm = router?.query?.search_text;
  const categoryName = router?.query?.categoryName;
  const body = {
    ...(searchTerm
      ? {
        productName: searchTerm
      }
      : { category: categoryName }),
    pageNumber: 1,
    pageSize: 10
  };

  const { plpData } = useGetPlpInfiniteContent(body);
  const items = useMemo(() =>
      plpData
        ? plpData?.data?.pages
          ? plpData?.data?.pages?.reduce(
            (prev, current) => [
              ...prev,
              ...(current?.queryResult ? current?.queryResult : [])
            ],
            []
          )
          : []
        : []
    , [plpData]);

console.log(basket?.productsById, items)
  return (
    <div>
      <div className="fixed inset-x-0 top-0 flex items-center bg-white pt-4">
        <div className="mr-4" onClick={() => router?.back()}>
          <ArrowRightIconOutline height={24} width={24} fill={colors.black}/>
        </div>
        {searchTerm ? (
          <div className="h-[52px] w-full flex items-center bg-grey-200 rounded-lg mx-4">
            <p className="mr-4"></p>
            {searchTerm}
          </div>
        ) : (
          <p className="mr-4">{categoryName}</p>
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
        loader={<div style={{ height: '100px' }}>در حال بارگذاری...</div>}
        dataLength={items?.length}
        className="pt-[68px]"
      >
        <div className="p-4 space-y-4">
          {items?.map((product, index) => (
              <ProductCard key={index}
                           prInfo={{ ...product, quantity: basket?.productsById?.[Number(product.irc)]?.quantity ?? 0 }}
                           hasAddToCartButton onSuccessChanged={refetchGetBasket}/>
            )
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
            router.push(routeList.basket);
          }}
        >
          {productListPageTexts?.seeBasket}
        </Button>
      </div>
    </div>
  );
}
