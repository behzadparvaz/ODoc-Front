import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';
import { routeList } from '@routes/routeList';

const Icon = dynamic(() => import('@utilities/icon'));
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

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title="تجهیزات پزشکی"
      hasBackButton
      backIconHandler={() => push(routeList?.homeRoute)}
      hasBasketIcon
      leftSection={
        <span
          className="flex items-center justify-center cursor-pointer"
          onClick={() =>
            push({
              pathname: routeList?.search,
              query: { ...query, section: 'equipment' },
            })
          }
        >
          <Icon name="Magnifier" width={1.5} height={1.5} fill={'black'} />
        </span>
      }
    >
      <CategoryLevel3 />

      <div
        className="cursor-pointer"
        onClick={() =>
          push(
            `${routeList?.equipmentProductsList}?categoryCodeLevel1=11&categoryCodeLevel2=11_1270&categoryNameLevel2=تجهیزات%20پزشکی&categoryCodeLevel3=11_1270_92&categoryNameLevel3=دستگاه%20های%20خانگی`,
          )
        }
      >
        <Banner data={bannerData} className="py-6" />
      </div>
    </MainLayout>
  );
};

export default EquipmentContainer;
