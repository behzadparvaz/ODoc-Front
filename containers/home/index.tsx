import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { useGetBanners, useGetCarousels } from '@api/promotion/promotion.rq';
import { useGetOrderPrepartionTime } from '@api/tender/tenderApis.rq';
import Banner from '@com/_molecules/Banner';
import { MainLayout } from '@com/Layout';
import { routeList } from '@routes/routeList';
import NextImage from '@com/_core/NextImage';

const MainSlider = dynamic(() => import('@com/_molecules/MainSlider'));
const Categories = dynamic(() => import('@com/_molecules/Categories'));
const CarouselLine = dynamic(() => import('@com/_molecules/CarouselLine'));
const HomeOrderSlider = dynamic(
  () => import('@com/_organisms/HomeOrderSlider'),
);
const FooterContent = dynamic(() => import('@com/_molecules/FooterContent'));

const HomeContainer = () => {
  const { data: bannerData, isLoading: bannerIsLoading } = useGetBanners();
  const { data: carouselsData, isLoading: carouselIsLoading } =
    useGetCarousels();

  const getCarouselDataData = (position: number) => {
    const carouselData = carouselsData?.queryResult?.filter(
      (item) => item?.sectionPosition === position,
    )?.[0];
    return carouselData;
  };
  const userLatLng = useSelector(
    (state: any) => state?.user?.user?.defaultAddress,
  );

  const getTenderPrepartionTime = useGetOrderPrepartionTime({
    lat: userLatLng?.latitude,
    lng: userLatLng?.longitude,
  });

  return (
    <>
      <MainLayout
        hasHeader
        headerType="WithLogo"
        hasAddress
        hasBottomNavigation
        leftSection={
          <div className="h-full flex items-center">
            <span
              className={classNames(
                ' h-[24px] w-max max-w-[107px] px-2 text-[10px] text-content-accent rounded-full truncate flex items-center',
                getTenderPrepartionTime?.data?.message &&
                  'bg-surface-accentLight',
              )}
            >
              {getTenderPrepartionTime?.data?.message}
            </span>
          </div>
        }
      >
        <NextImage
          src={'/images/banner-delay.svg'}
          alt="banner-delay"
          width={360}
          height={40}
          style={{ width: '100%', height: 'auto' }}
        />
        <HomeOrderSlider />

        <Categories isHomePage />

        <MainSlider
          autoPlay
          isLoading={bannerIsLoading}
          data={[bannerData?.queryResult?.[0], bannerData?.queryResult?.[1]]}
        />

        <CarouselLine
          data={getCarouselDataData(1)}
          twoRow
          className="my-4"
          carouselIsLoading={carouselIsLoading}
        />

        <CarouselLine
          data={getCarouselDataData(2)}
          className="my-4"
          carouselIsLoading={carouselIsLoading}
          carouselCardClassName="bg-white rounded-md"
          containerClassName="bg-indigo-50 pb-2"
        />

        {bannerData?.queryResult ? (
          <Link
            href={`${routeList?.supplementProductListPage}?categoryCodeLevel1=10&categoryCodeLevel2=10_1267&categoryNameLevel2=مکمل%20غذایی%20و%20دارویی`}
          >
            <Banner
              className="px-3 py-3"
              data={[bannerData?.queryResult?.[2]]}
            />
          </Link>
        ) : (
          <div className="w-full h-[192px] px-4 py-3">
            <div className="w-full h-full rounded-xl bg-surface-secondary animate-pulse" />
          </div>
        )}

        <CarouselLine
          data={getCarouselDataData(3)}
          carouselIsLoading={carouselIsLoading}
          carouselCardClassName="bg-white rounded-md"
          containerClassName="bg-indigo-50 pb-2"
        />

        <div className={`overflow-auto w-full`}>
          <FooterContent />
        </div>
      </MainLayout>
    </>
  );
};
export default HomeContainer;
