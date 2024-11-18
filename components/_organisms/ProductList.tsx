import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { useGetPlpInfiniteContent } from '@api/plp/plpApi.rq';
import { routeList } from '@routes/routeList';
import { productListPageTexts } from '@com/texts/productListPageTexts';
import InfiniteScroll from 'react-infinite-scroll-component';
import EmptyContent from '@com/_atoms/EmptyContent';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import ActionBar from '@com/Layout/ActionBar';
import { Button } from '@com/_atoms/NewButton';

const HorizontalProductCard = dynamic(
  () => import('@com/_molecules/HorizontalProductCard'),
);

type Props = {
  searchTerm?: string;
};

const ProductList = ({ searchTerm }: Props) => {
  const { push } = useRouter();
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
  const [itemsInBasket, setItemsInBasket] = useState<any[] | null>(null);
  const body = {
    search: searchTerm,
    pageNumber: 1,
    pageSize: 10,
  };

  const { plpData } = useGetPlpInfiniteContent(body);

  const items = plpData
    ? plpData?.data?.pages
      ? plpData?.data?.pages?.reduce(
          (prev, current) => [
            ...prev,
            ...(current?.queryResult ? current?.queryResult : []),
          ],
          [],
        )
      : []
    : [];

  useEffect(() => {
    if (basket?.products?.length > 0 && plpData?.data) {
      const filteredProducts = plpData?.data?.pages[0]?.queryResult?.filter(
        (item) => basket?.products?.some((pr) => pr?.irc === item?.irc),
      );
      setItemsInBasket(filteredProducts);
    }
  }, [basket?.products, plpData?.data]);

  return (
    <>
      <InfiniteScroll
        scrollableTarget="orderListScrollParent"
        style={{ overflow: 'hidden' }}
        next={() => {
          plpData?.fetchNextPage();
        }}
        hasMore={plpData?.hasNextPage}
        loader={<></>}
        dataLength={items?.length}
      >
        <div className="p-4 space-y-4">
          {items?.length ? (
            items?.map((product, index) => (
              <div key={index}>
                <HorizontalProductCard
                  key={index}
                  onClick={() => {
                    if (product.categoryCodeLevel3.split('_')[0] === '10') {
                      return push(
                        `${routeList.supplementProduct}/${product.irc}`,
                      );
                    } else {
                      push(
                        `${routeList.searchProductPage}?brandName=${product?.brandName}&categoryCodeLevel3=${product?.categoryCodeLevel3}&irc=${product?.irc}`,
                      );
                    }
                  }}
                  prInfo={{
                    ...product,
                    quantity:
                      basket?.productsById?.[Number(product.irc)]?.quantity ??
                      0,
                  }}
                  hasAddToCartButton
                  onSuccessChanged={refetchGetBasket}
                  isInSearchPage
                  isShowSlangs
                />
              </div>
            ))
          ) : plpData?.isLoading || plpData?.isFetching ? (
            <EmptyContent
              imgSrc="/static/images/staticImages/search-empty-content.png"
              title={mobileSearchTexts?.waiting}
            />
          ) : (
            <div className="flex flex-col gap-y-2 items-center">
              <EmptyContent
                imgSrc="/static/images/staticImages/search-empty-content.png"
                title={mobileSearchTexts?.noSearchResult}
              />

              <Button
                variant="primary"
                size="medium"
                className="w-max px-4"
                onClick={() =>
                  push({
                    pathname: routeList.QuickOrder,
                    query: { searchText: searchTerm },
                  })
                }
              >
                سفارش سریع دارو
              </Button>
            </div>
          )}
        </div>
      </InfiniteScroll>

      {itemsInBasket && itemsInBasket?.length > 0 && (
        <ActionBar type="singleAction" hasDivider>
          <Button
            className="w-full"
            size="large"
            variant="primary"
            onClick={() => {
              push(routeList.basket);
            }}
          >
            {productListPageTexts?.seeBasket}
          </Button>
        </ActionBar>
      )}
    </>
  );
};

export default ProductList;
