import { useGetActiveOrder } from '@api/order/orderApis.rq';
import { useGetCarousels, useGetBanners } from '@api/promotion/promotion.rq';
import Banner from '@com/_molecules/Banner';
import OrderTracking from '@com/_molecules/OrderTracking';
import MainPageLayout from '@com/_template/MainPageLayout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const MainSlider = dynamic(() => import('@com/_molecules/MainSlider'));
const SearchBox = dynamic(() => import('@com/_atoms/SearchBox'));
const Categories = dynamic(() => import('@com/_molecules/Categories'));
const CarouselLine = dynamic(() => import('@com/_molecules/CarouselLine'));

const HomePage = () => {
  const { query } = useRouter();
  const [showLayout, setShowLayout] = useState<boolean>(false);
  const { data: bannerData } = useGetBanners();
  const { data: carouselsData, isLoading } = useGetCarousels();

  const { data: ordersData, refetch: refetchActiveOrder } = useGetActiveOrder();
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
          {ordersData ? (
            <div className="my-4">
              <OrderTracking ordersData={ordersData} className="mx-4" />
            </div>
          ) : null}

          <div className="my-4 px-2">
            <Categories isHomePage />
          </div>
          {bannerData?.queryResult && (
            <MainSlider
              className="py-2 px-4"
              data={[
                bannerData?.queryResult?.[0],
                bannerData?.queryResult?.[1],
              ]}
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
        </MainPageLayout>
      ) : null}
    </>
  );
};
export default HomePage;
