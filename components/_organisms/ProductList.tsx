import React, { useEffect, useMemo, useState } from 'react';
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
import FixBottomSection from '@com/_atoms/FixBottomSection';

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
          ) : plpData?.isLoading || plpData?.isFetching ? (
            <EmptyContent
              imgSrc="/static/images/staticImages/search-empty-content.png"
              title={mobileSearchTexts?.waiting}
            />
          ) : (
            <EmptyContent
              imgSrc="/static/images/staticImages/search-empty-content.png"
              title={mobileSearchTexts?.noSearchResult}
            />
          )}
        </div>
      </InfiniteScroll>

      {itemsInBasket && itemsInBasket?.length > 0 && (
        <FixBottomSection className="bg-white">
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
        </FixBottomSection>
      )}
    </>
  );
};

export default ProductList;
