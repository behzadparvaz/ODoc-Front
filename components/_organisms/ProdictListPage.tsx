import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { useGetPlpInfiniteContent } from '@api/plp/plpApi.rq';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import Button from '@com/_atoms/Button';
import EmptyContent from '@com/_atoms/EmptyContent';
import SearchBox from '@com/_atoms/SearchBox';
import Spinner from '@com/_atoms/Spinner';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import { productListPageTexts } from '@com/texts/productListPageTexts';
import { colors } from '@configs/Theme';
import useProductNavigation from '@hooks/useNavigateToPdp';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalProductCard from '../_molecules/VerticalProductCard';

type Props = {};

export default function ProdictListPage({}: Props) {
  const { push, back, query } = useRouter();
  const { navigateToPdp } = useProductNavigation();
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
      hasBasketIcon
    >
      {/* <div className="flex items-center justify-between m-4">
        <span className="text-xs font-medium text-grey-900">داروی کمیاب</span>
        <label className="cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="relative w-11 h-6 bg-grey-300 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-grey-600"></div>
        </label>
        </div> */}

      {plpData.status === 'pending' && (
        <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
      )}
      {plpData.status === 'success' && (
        <>
          <InfiniteScroll
            scrollableTarget="orderListScrollParent"
            style={{ overflow: 'hidden' }}
            next={() => {
              plpData?.fetchNextPage();
            }}
            hasMore={plpData?.hasNextPage}
            loader={
              <div className="flex flex-wrap items-center justify-center h-16">
                {/* در حال بارگذاری... */}
              </div>
            }
            dataLength={items?.length}
          >
            <>
              {items?.length ? (
                <div className="flex flex-wrap mb-5">
                  {items?.map((product, index) => {
                    return (
                      <div className="w-1/2 cursor-pointer" key={index}>
                        <VerticalProductCard
                          productData={{
                            ...product,
                            quantity:
                              basket?.productsById?.[Number(product.irc)]
                                ?.quantity ?? 0,
                          }}
                          hasAddToCart
                          onClick={() =>
                            navigateToPdp({
                              item: product,
                              ProductTypeId: product.productType,
                            })
                          }
                          onSuccessChanged={refetchGetBasket}
                          className={`
                      ${index % 2 === 0 ? 'border-l border-t' : 'border-t'} 
                      ${index >= items.length - 2 ? 'border-b' : ''}
                    `}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <EmptyContent
                    imgSrc="/images/search-empty-content.png"
                    title={mobileSearchTexts?.noSearchResult}
                  />
                </div>
              )}
            </>
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
        </>
      )}
    </MainLayout>
  );
}
