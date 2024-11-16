import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import { useGetBanners, useGetCarousels } from '@api/promotion/promotion.rq';
import Banner from '@com/_molecules/Banner';
import { MainLayout } from '@com/Layout';
import { getDataFromCookies } from '@utilities/cookiesUtils';
import { searchParamToObject } from '@utilities/queryBuilder';

const MainSlider = dynamic(() => import('@com/_molecules/MainSlider'));
const FooterContent = dynamic(() => import('@com/_molecules/FooterContent'));
const Categories = dynamic(() => import('@com/_molecules/Categories'));
const CarouselLine = dynamic(() => import('@com/_molecules/CarouselLine'));
const HomeOrderSlider = dynamic(
  () => import('@com/_organisms/HomeOrderSlider'),
);

const HomeContainer = () => {
  const loginWithTapsiSSO = getDataFromCookies('loginWithTapsiSSO');
  const { data: bannerData } = useGetBanners();
  const { data: carouselsData, isLoading: carouselIsLoading } =
    useGetCarousels();

  const getCarouselDataData = (position: number) => {
    const carouselData = carouselsData?.queryResult?.filter(
      (item) => item?.sectionPosition === position,
    )?.[0];
    return carouselData;
  };

  const tapsiLinkRef = useRef(null);
  const url =
    'https://accounts.tapsi.ir/login?client_id=doctor.tapsi&redirect_uri=https://tapsi.doctor/app&response_type=code&scope=tapsidoctor_access&prompt=none';
  useEffect(() => {
    const query: any = searchParamToObject(window?.location?.search);
    const isFromTapsi = query?.utm_source && query?.utm_source === 'TAPSI';
    if (isFromTapsi) {
      tapsiLinkRef?.current?.click();
    }
  }, []);

  return (
    <>
      <a href={url} ref={tapsiLinkRef} className="hidden" />
      <MainLayout
        hasHeader
        headerType="WithLogo"
        hasAddress
        hasBottomNavigation
      >
        <HomeOrderSlider />

        <Categories isHomePage />

        {bannerData?.queryResult && (
          <MainSlider
            autoPlay
            data={[bannerData?.queryResult?.[0], bannerData?.queryResult?.[1]]}
          />
        )}

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

        {bannerData?.queryResult && (
          <Banner className="px-4 py-6" data={[bannerData?.queryResult?.[2]]} />
        )}

        <CarouselLine
          data={getCarouselDataData(3)}
          carouselIsLoading={carouselIsLoading}
          carouselCardClassName="bg-white rounded-md"
          containerClassName="bg-indigo-50 pb-2"
        />

        {!loginWithTapsiSSO && (
          <div className={`overflow-auto w-full`}>
            <FooterContent />
          </div>
        )}
      </MainLayout>
    </>
  );
};
export default HomeContainer;
