import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import {
  useGetSupplementProductByIrc,
  useGetSupplementReview,
  useGetSupplementReviewSummery,
} from '@api/supplement/plp/plp.rq';
import AddButton from '@com/_atoms/AddButton';
import { Button } from '@com/_atoms/NewButton';
import GalleryThumbnails from '@com/_molecules/GalleryThumbnails';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { routeList } from '@routes/routeList';
import Carousel from './components/Carousel';
import Comments from './components/comments';
import Detail from './components/Detail';
import GeneralDetail from './components/GeneralDetail';

const SupplementProductContainer = () => {
  // routes
  const router = useRouter();
  const irc = router.query.irc as string;

  // apis
  const product = useGetSupplementProductByIrc(irc);
  const summaryReviews = useGetSupplementReviewSummery(irc);
  const reviews = useGetSupplementReview(irc);

  const { mutate: popProductOfCart } = useDeleteProductBasket({
    onSuccess: () => {
      refetchGetBasket();
    },
  });

  const { data: basketDatat, refetch: refetchGetBasket } =
    useGetCurrentBasket();

  const { mutate: addToCart, isPending: isAddingToCart } =
    useAddProductToBasket({
      onSuccess: () => {
        refetchGetBasket();
      },
    });

  const basketFilteredProducts = basketDatat?.products?.filter((item) =>
    product.data?.drugDoses?.some((product) => product?.irc === item?.irc),
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleChangeCount = (count: number) => {
    if (count > 0) {
      addToCart({
        ...product.data,
        irc: selectedItem?.irc,
        quantity: count,
      });
    } else {
      popProductOfCart({ type: 'IRC', irc: selectedItem?.irc });
    }
  };

  useEffect(() => {
    setSelectedItem(product.data?.drugDoses?.[0]);
  }, [product.data]);

  const renderBottomSection = () => {
    const selectedDoseCount = basketFilteredProducts?.find(
      (item) => item?.irc === selectedItem?.irc,
    )?.quantity;

    if (selectedDoseCount) {
      return (
        <>
          <div className="flex px-4 py-4">
            <AddButton
              unitName={product.data.unit}
              count={
                basketFilteredProducts?.find(
                  (item) => item?.irc === selectedItem?.irc,
                )?.quantity
              }
              onChangeCount={handleChangeCount}
              isLoading={isAddingToCart}
              className="px-2 py-2"
            />
          </div>
          <Button
            variant="primary"
            size="large"
            className="w-1/2 bg-surface-Gradient.brand whitespace-nowrap"
            onClick={() => router.push(routeList.basket)}
          >
            مشاهده سبد خرید
          </Button>
        </>
      );
    }
    return (
      <Button
        variant="primary"
        size="large"
        className="w-full bg-surface-Gradient.brand whitespace-nowrap"
        onClick={() =>
          addToCart({
            ...product.data,
            quantity: 1,
            irc: selectedItem?.irc,
          })
        }
      >
        افزودن به سبد خرید
      </Button>
    );
  };

  return (
    <MainLayout
      title="محصول"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      scrollToTop
      hasBasketIcon
    >
      <div className="mb-24">
        <div className="w-full px-4">
          <div className="my-4">
            {product?.isLoading ? (
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-center">
                  <div className="w-[140px] h-[140px] bg-surface-secondary animate-pulse rounded-xl" />
                </div>

                <div className="w-[55px] h-[55px] bg-surface-secondary animate-pulse rounded-xl" />
              </div>
            ) : (
              <>
                {product?.isSuccess && (
                  <GalleryThumbnails images={[product?.data?.imageLink]} />
                )}
              </>
            )}
          </div>
          {product?.isLoading ? (
            <div className="flex flex-col gap-y-3 mt-5">
              <div className="h-[80px] flex items-center">
                <div className="h-6 w-80 bg-surface-secondary animate-pulse rounded-xl" />
              </div>

              <div className="h-6 flex items-center gap-x-3">
                <div className="w-20 h-6 bg-surface-secondary animate-pulse rounded-xl" />
                <div className="w-20 h-6 bg-surface-secondary animate-pulse rounded-xl" />
              </div>
            </div>
          ) : (
            <GeneralDetail
              title={product?.data?.shortProductName}
              comments={summaryReviews?.data?.commentsCount}
              rate={summaryReviews?.data?.ratingAverage}
              likes={summaryReviews?.data?.likesCount}
            />
          )}
        </div>
        <div className="h-[8px] bg-surface-secondary w-full my-4" />
        {product?.isLoading ? (
          <div className="w-full h-[76px] px-4 flex flex-col justify-between gap-y-2">
            <div className="w-24 h-6 bg-surface-secondary animate-pulse rounded-xl" />
            <div className="w-full flex justify-end">
              <div className="w-24 h-6 bg-surface-secondary animate-pulse rounded-xl" />
            </div>
          </div>
        ) : (
          <Detail
            productDescription={product?.data?.medicalUses}
            producerCountry={product?.data?.countryFaName}
            productShape={product?.data?.shapeFa}
            licenseProvider={null}
          />
        )}

        <Carousel products={product?.data?.suggestProducts} />

        {product?.isSuccess && (
          <Comments
            comments={reviews?.data}
            onSubmitReview={() => {
              reviews.refetch();
            }}
          />
        )}
      </div>

      <ActionBar type="singleAction" hasDivider>
        <div className="flex justify-between items-center w-full px-4 py-4">
          {renderBottomSection()}
        </div>
      </ActionBar>
    </MainLayout>
  );
};

export default SupplementProductContainer;
