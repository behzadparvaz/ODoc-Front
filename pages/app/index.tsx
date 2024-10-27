import { useGetBanners, useGetCarousels } from '@api/promotion/promotion.rq';
import Banner from '@com/_molecules/Banner';
import QuickOrderStatus from '@com/_molecules/QuickOrderStatus';
import { MainLayout } from '@com/Layout';
import { getDataFromCookies } from '@utilities/cookiesUtils';
import { searchParamToObject } from '@utilities/queryBuilder';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const MainSlider = dynamic(() => import('@com/_molecules/MainSlider'));
const FooterContent = dynamic(() => import('@com/_molecules/FooterContent'));
const SearchBox = dynamic(() => import('@com/_atoms/SearchBox'));
const Categories = dynamic(() => import('@com/_molecules/Categories'));
const CarouselLine = dynamic(() => import('@com/_molecules/CarouselLine'));

const HomePage = () => {
  const loginWithTapsiSSO = getDataFromCookies('loginWithTapsiSSO');
  const { data: bannerData } = useGetBanners();
  const { data: carouselsData, isLoading } = useGetCarousels();
  const getCarouselDataData = (position: number) => {
    const carouselData = carouselsData?.queryResult?.filter(
      (item) => item?.sectionPosition === position,
    )?.[0];
    return carouselData;
  };
  const dispatch = useDispatch();

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
        <div className="px-4">
          <SearchBox className="px-4 my-2" />
        </div>
        <QuickOrderStatus />
        <div className="my-4 px-2">
          <Categories isHomePage />
        </div>
        {/* <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">سفارشهای جاری</h2>
          <a href="#" className="text-blue-500">
          بیشتر
          </a>
        <OrderTracking />
        </div> */}
        {bannerData?.queryResult && (
          <MainSlider
            className="py-2 px-4"
            data={[bannerData?.queryResult?.[0], bannerData?.queryResult?.[1]]}
          />
        )}
        <CarouselLine data={getCarouselDataData(1)} className="my-4" />
        <CarouselLine data={getCarouselDataData(2)} className="my-4" />
        {bannerData?.queryResult && (
          <Banner
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F7F7 100%)',
            }}
            className="px-4 py-6"
            data={[bannerData?.queryResult?.[2]]}
          />
        )}
        <CarouselLine data={getCarouselDataData(3)} className="my-4" />

        {!loginWithTapsiSSO && (
          <div className={`overflow-auto w-full`}>
            <FooterContent />
          </div>
        )}
      </MainLayout>
    </>
  );
};
export default HomePage;
