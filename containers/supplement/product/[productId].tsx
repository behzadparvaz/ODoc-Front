import GalleryThumbnails from '@com/_molecules/GalleryThumbnails';
import { CloseIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import Carousel from './components/Carousel';
import Detail from './components/Detail';
import GeneralDetail from './components/GeneralDetail';

const images = [
  {
    id: 0,
    src: '/static/images/staticImages/DefaultProductImage.png',
  },
  {
    id: 1,
    src: '/static/images/staticImages/first-slide.png',
  },
  {
    id: 2,
    src: '/static/images/staticImages/Gel.png',
  },
];
const SupplementProductContainer = () => {
  const router = useRouter();

  return (
    <MainLayout
      title="سبد خرید"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
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
      <div className="w-full px-4">
        <div className="my-4">
          <GalleryThumbnails images={images} />
        </div>
        <GeneralDetail />
      </div>
      <div className="h-[8px] bg-surface-secondary w-full my-4" />
      <Detail />
      <Carousel />
    </MainLayout>
  );
};

export default SupplementProductContainer;
