import {
  useGetSupplementProductById,
  useGetSupplementReview,
  useGetSupplementReviewSummery,
} from '@api/supplement/plp/plp.rq';
import Spinner from '@com/_atoms/Spinner';
import GalleryThumbnails from '@com/_molecules/GalleryThumbnails';
import { CloseIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import Carousel from './components/Carousel';
import Comments from './components/comments';
import Detail from './components/Detail';
import GeneralDetail from './components/GeneralDetail';
import ActionBar from '@com/Layout/ActionBar';
import AddButton from '@com/_atoms/AddButton';
import { Button } from '@com/_atoms/NewButton';
import {
  useAddProductToBasket,
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useEffect, useState } from 'react';

const SupplementProductContainer = () => {
  // routes
  const router = useRouter();
  const currentProductId = router.query.productId as string;

  // apis
  const product = useGetSupplementProductById(currentProductId);
  const summaryReviews = useGetSupplementReviewSummery(currentProductId);
  const reviews = useGetSupplementReview(currentProductId);

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
  const [selectedItem, setSelectedItem] = useState<any>();

  // const scrollToSection = (sectionRef) => {
  //   window.scrollTo({
  //     top: sectionRef.current.offsetTop,
  //     behavior: 'smooth',
  //   });
  // };

  const handleChangeCount = (count: number) => {
    if (count > 0) {
      addToCart({
        type: 'IRC',
        orderType: 'OTC',
        irc: selectedItem?.irc,
        quantity: count,
      });
    } else {
      popProductOfCart({ type: 'IRC', irc: selectedItem?.irc });
    }
  };

  const handleSelectDose = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    setSelectedItem(product.data?.drugDoses?.[0]);
  }, [product.data]);

  const rendeBottomSection = () => {
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
            className="w-1/2"
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
        className="w-full bg-[linear-gradient(91.39deg,_#FF7733_0%,_#FF5722_50.15%,_#E64917_100%)]"
        onClick={() =>
          addToCart({
            orderType: 'OTC',
            quantity: 1,
            type: 'IRC',
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
      title="سبد خرید"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      scrollToTop
      hasBasketIcon
      rightIcon={
        <div
          className="w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={() => router.push(routeList.homeRoute)}
        >
          <CloseIconOutline width={32} height={42} stroke={colors.black} />
        </div>
      }
    >
      {product?.isLoading && (
        <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
      )}
      {product?.isSuccess && (
        <div className="mb-24">
          <div className="w-full px-4">
            <div className="my-4">
              <GalleryThumbnails images={[product?.data?.imageLink]} />
            </div>
            <GeneralDetail
              title={product?.data?.shortProductName}
              comments={summaryReviews?.data?.commentsCount}
              rate={summaryReviews?.data?.ratingAverage}
              likes={summaryReviews?.data?.likesCount}
            />
          </div>
          <div className="h-[8px] bg-surface-secondary w-full my-4" />
          <Detail
            productDescription={product?.data?.medicalUses}
            producerCountry={product?.data?.countryFaName}
            productShape={product?.data?.shapeFa}
            licenseProvider={null}
          />
          <Carousel products={product?.data?.suggestProducts} />
          <Comments
            comments={reviews?.data}
            onSubmitReview={() => {
              reviews.refetch();
            }}
          />
        </div>
      )}
      <ActionBar type="singleAction" hasDivider>
        <div className="flex justify-between items-center w-full px-4 py-4">
          {rendeBottomSection()}
        </div>
      </ActionBar>
    </MainLayout>
  );
};

export default SupplementProductContainer;
