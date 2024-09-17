import { useGetCarousels, useGetBanners } from '@api/promotion/promotion.rq';
import Banner from '@com/_molecules/Banner';
import MainPageLayout from '@com/_template/MainPageLayout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const MainSlider = dynamic(() => import('@com/_molecules/MainSlider'));
const SearchBox = dynamic(() => import('@com/_atoms/SearchBox'));
const Categories = dynamic(() => import('@com/_molecules/Categories'));
const SectionTitle = dynamic(() => import('@com/_molecules/SectionTitle.nd'));
const CarouselLine = dynamic(() => import('@com/_molecules/CarouselLine'));

const HomePage = () => {
  const { query } = useRouter();
  const [showLayout, setShowLayout] = useState<boolean>(false);
  const { data: bannerData } = useGetBanners();
  const { data: carouselsData, isLoading } = useGetCarousels();
  const getCarouselDataData = (position: number) => {
    const carouselData = carouselsData?.queryResult?.filter(
      (item) => item?.sectionPosition === position,
    )?.[0];
    return carouselData;
  };
  const isFromTapsi = query?.utm_source && query?.utm_source === 'TAPSI';
  const url = isFromTapsi
    ? 'https://accounts.tapsi.ir/login?client_id=doctor.tapsi&redirect_uri=https://tapsi.doctor/app&response_type=code&scope=tapsidoctor_access&prompt=none'
    : null;
  const tapsiLinkRef = useRef(null);
  useEffect(() => {
    url ? tapsiLinkRef?.current?.click() : null;
    setTimeout(() => {
      setShowLayout(true);
    }, 500);
  }, [url]);

  return (
    <>
      <a href={url} ref={tapsiLinkRef} className="hidden" />
      {showLayout ? (
        <MainPageLayout
          hasBottomNavigation
          hasFooter
          hasAddress
          hasSearchIcon={false}
        >
          <div className="px-4">
            <SearchBox className="px-4 my-2" />
          </div>
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
          <MainSlider
            className="py-2 px-4"
            data={[bannerData?.queryResult?.[0], bannerData?.queryResult?.[1]]}
          />
          <CarouselLine data={getCarouselDataData(1)} className="my-4" />
          <CarouselLine data={getCarouselDataData(2)} className="my-4" />
          <Banner
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F7F7 100%)',
            }}
            className="px-4 py-6"
            data={[bannerData?.queryResult?.[2]]}
          />
          <CarouselLine data={getCarouselDataData(3)} className="my-4" />
        </MainPageLayout>
      ) : null}
    </>
  );
};
export default HomePage;
