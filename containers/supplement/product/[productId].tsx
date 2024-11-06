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

const SupplementProductContainer = () => {
  // routes
  const router = useRouter();
  const productId = router.query.productId as string;

  // apis
  const product = useGetSupplementProductById(productId);
  const summeryReviews = useGetSupplementReviewSummery(productId);
  const reviews = useGetSupplementReview(productId);

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
        <>
          <div className="w-full px-4">
            <div className="my-4">
              <GalleryThumbnails images={[product?.data?.imageLink]} />
            </div>
            <GeneralDetail
              title={product?.data?.shortProductName}
              comments={summeryReviews?.data?.commentsCount}
              rate={summeryReviews?.data?.ratingAverage}
              likes={summeryReviews?.data?.likesCount}
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
          <Comments comments={reviews?.data} />
        </>
      )}
    </MainLayout>
  );
};

export default SupplementProductContainer;
