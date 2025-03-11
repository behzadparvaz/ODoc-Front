import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';
import { routeList } from '@routes/routeList';

const Icon = dynamic(() => import('@utilities/icon'));
const CategoryLevel2 = dynamic(() => import('./components/CategoryLevel2'));
const CategoryLevel3 = dynamic(() => import('./components/CategoryLevel3'));
const Banner = dynamic(() => import('@com/_molecules/Banner'));

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

  const handleBackButtonClick = () => {
    if (query?.categoryCodeLevel2 && query?.categoryNameLevel2) {
      push(routeList.equipment);
    } else {
      push(routeList.homeRoute);
    }
  };

  const handleSearchClick = () => {
    push({
      pathname: routeList.search,
      query: { ...query, section: 'equipment' },
    });
  };

  const handleBannerClick = () => {
    push(
      `${routeList.equipmentProductsList}?categoryCodeLevel1=11&categoryCodeLevel2=11_1270&categoryNameLevel2=تجهیزات%20پزشکی&categoryCodeLevel3=11_1270_92&categoryNameLevel3=دستگاه%20های%20خانگی`,
    );
  };

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title={
        query?.categoryCodeLevel2
          ? query?.categoryNameLevel2
          : 'تجهیزات پزشکی و لوازم بهداشتی'
      }
      hasBackButton
      backIconHandler={handleBackButtonClick}
      hasBasketIcon
      leftSection={
        <span
          className="flex items-center justify-center cursor-pointer"
          onClick={handleSearchClick}
        >
          <Icon name="Magnifier" width={1.5} height={1.5} fill={'black'} />
        </span>
      }
    >
      <CategoryLevel2 />

      <div className="cursor-pointer" onClick={handleBannerClick}>
        <Banner data={bannerData} className="py-6" />
      </div>
    </MainLayout>
  );
};

export default EquipmentContainer;
