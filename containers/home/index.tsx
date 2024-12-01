import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import { useGetBanners, useGetCarousels } from '@api/promotion/promotion.rq';
import Banner from '@com/_molecules/Banner';
import { MainLayout } from '@com/Layout';
import { getDataFromCookies } from '@utilities/cookiesUtils';
import { searchParamToObject } from '@utilities/queryBuilder';
import Link from 'next/link';
import { routeList } from '@routes/routeList';
import { useGetTenderPrepartionTime } from '@api/tender/tenderApis.rq';
import Icon from '@utilities/icon';
import classNames from 'classnames';
import useStorage from '@hooks/useStorage';

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
  const { getItem } = useStorage();
  const token = getItem('token', 'local');

  const getCarouselDataData = (position: number) => {
    const carouselData = carouselsData?.queryResult?.filter(
      (item) => item?.sectionPosition === position,
    )?.[0];
    return carouselData;
  };
  const userLatLng = useSelector(
    (state: any) => state?.user?.user?.defaultAddress,
  );

  const getTenderPrepartionTime = useGetTenderPrepartionTime();

  useEffect(() => {
    if (userLatLng?.latitude || userLatLng?.longitude)
      getTenderPrepartionTime.mutate({
        lat: userLatLng?.latitude,
        lng: userLatLng?.longitude,
      });
  }, [userLatLng?.latitude, userLatLng?.longitude]);

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
        hasHeader={!!token}
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
          <Link
            href={`${routeList?.supplementProductListPage}?categoryCodeLevel2=10_1267&categoryNameLevel2=مکمل%20غذایی%20و%20دارویی`}
          >
            <Banner
              className="px-3 py-3"
              data={[bannerData?.queryResult?.[2]]}
            />
          </Link>
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
