import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { SearchIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';
import { routeList } from '@routes/routeList';
import { useCallback } from 'react';

const Banner = dynamic(() => import('@com/_molecules/Banner'), {
  ssr: false,
});
const CategoryLevel3 = dynamic(() => import('./components/CategoryLevel3'), {
  ssr: false,
});

const bannerData = [
  {
    backgroundColor: null,
    carouselType: 2,
    endDateTime: null,
    icon: '/images/MedicineEquipmentsBanner.png',
    isActive: true,
    products: null,
    recId: 18,
    sectionPosition: 1,
    startDateTime: null,
    subTitle: null,
    title: 'بنر',
  },
];

const EquipmentContainer = () => {
  const { query, push } = useRouter();

  const handleBackButtonClick = useCallback(() => {
    push(routeList.homeRoute);
  }, [push]);

  const handleSearchClick = useCallback(() => {
    push({
      pathname: routeList.search,
      query: { ...query, section: 'equipment' },
    });
  }, [push, query]);

  const handleBannerClick = useCallback(() => {
    push(
      `${routeList.equipmentProductsList}?categoryCodeLevel1=11&categoryCodeLevel2=11_1270&categoryNameLevel2=تجهیزات%20پزشکی&categoryCodeLevel3=11_1270_92&categoryNameLevel3=دستگاه%20های%20خانگی`,
    );
  }, [push]);

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title="تجهیزات پزشکی"
      hasBackButton
      backIconHandler={handleBackButtonClick}
      hasBasketIcon
      leftSection={
        <span
          className="flex items-center justify-center cursor-pointer"
          onClick={handleSearchClick}
        >
          <SearchIconOutline width={24} height={24} fill={'black'} />
        </span>
      }
    >
      <CategoryLevel3 />

      <div className="cursor-pointer" onClick={handleBannerClick}>
        <Banner data={bannerData} className="py-6" />
      </div>
    </MainLayout>
  );
};

export default EquipmentContainer;
