import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { useGetPlpInfiniteContent } from '@api/plp/plpApi.rq';
import ActionBar from '@com/Layout/ActionBar';
import EmptyContent from '@com/_atoms/EmptyContent';
import { Button } from '@com/_atoms/NewButton';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import { productListPageTexts } from '@com/texts/productListPageTexts';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import useProductNavigation from '@hooks/useNavigateToPdp';

const HorizontalProductCard = dynamic(
  () => import('@com/_molecules/HorizontalProductCard'),
);

enum SearchTypeEnum {
  home = 1,
  otc = 2,
  supplement = 3,
}

type Props = {
  searchTerm?: string;
};

const ProductList = ({ searchTerm }: Props) => {
  const { query, push } = useRouter();
  const { navigateToPdp } = useProductNavigation();
  const [searchType, setSearchType] = useState<SearchTypeEnum>(
    SearchTypeEnum.home,
  );

  const { data: basket, refetch: refetchGetBasket } = useGetCurrentBasket<
    Basket & { productsById: any }
  >({
    select: (res: Basket) => ({
      ...res,
      productsById: Object.fromEntries(
        res?.products?.map((pr) => [pr.irc, pr]),
      ),
    }),
  });
  const [itemsInBasket, setItemsInBasket] = useState<any[] | null>(null);

  const body = {
    search: searchTerm,
    pageNumber: 1,
    pageSize: 10,
    searchType: searchType,
  };

  useEffect(() => {
    if (query?.section === 'supplement') {
      setSearchType(SearchTypeEnum.supplement);
    }
    if (query?.section === 'otc') {
      setSearchType(SearchTypeEnum.otc);
    }
  }, [query?.section]);

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
                  onClick={() =>
                    navigateToPdp({
                      item: product,
                      ProductTypeId: product.productType,
                    })
                  }
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
              imgSrc="/images/search-empty-content.png"
              title={mobileSearchTexts?.waiting}
            />
          ) : (
            <div className="flex flex-col justify-center gap-y-2 items-center w-full h-[200px] ">
              <span className="text-sm text-content-primary font-medium">
                محصولی با این نام یافت نشد
              </span>
              <span className="text-sm text-content-tertiary">
                جهت تهیه محصول ثبت سفارش نمایید.{' '}
              </span>

              <Button
                variant="brand"
                size="medium"
                className="w-max px-4 mt-2"
                onClick={() =>
                  push({
                    pathname: routeList.otcMedicine,
                    query: { searchText: searchTerm },
                  })
                }
              >
                ثبت سفارش
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
