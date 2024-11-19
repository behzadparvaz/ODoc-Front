import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { SearchIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';
import Banner from '@com/_molecules/Banner';
import { routeList } from '@routes/routeList';

const CategoryLevel1 = dynamic(() => import('./components/CategoryLevel1'));

const bannerData = [
  {
    backgroundColor: null,
    carouselType: 2,
    endDateTime: null,
    icon: '/images/supplement-banner.png',
    isActive: true,
    products: null,
    recId: 18,
    sectionPosition: 1,
    startDateTime: null,
    subTitle: null,
    title: 'بنر',
  },
];

const SupplementContainer = () => {
  const { push } = useRouter();
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title="مکمل"
      hasBackButton
      backIconHandler={() => push(routeList?.homeRoute)}
      hasBasketIcon
      leftSection={
        <span className="flex items-center justify-center">
          <SearchIconOutline width={24} height={24} fill={'black'} />
        </span>
      }
    >
      <CategoryLevel1 />

      <div
        onClick={() =>
          push(
            `${routeList?.supplementProductListPage}?categoryCodeLevel2=10_1269&categoryNameLevel2=مکمل%20ورزشی`,
          )
        }
      >
        <Banner data={bannerData} className="py-6" />
      </div>
    </MainLayout>
  );
};

export default SupplementContainer;
