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
  const { query, push } = useRouter();
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title="مکمل"
      hasBackButton
      backIconHandler={() => push(routeList?.homeRoute)}
      hasBasketIcon
      leftSection={
        <span
          className="flex items-center justify-center cursor-pointer"
          onClick={() =>
            push({
              pathname: routeList?.search,
              query: { ...query, section: 'supplement' },
            })
          }
        >
          <SearchIconOutline width={24} height={24} fill={'black'} />
        </span>
      }
    >
      <CategoryLevel1 />

      <div
        className="cursor-pointer"
        onClick={() =>
          push(
            `${routeList?.supplementProductListPage}/?categoryCodeLevel1=10&categoryCodeLevel2=10_1267&categoryNameLevel2=مکمل+غذایی+و+دارویی&categoryCodeLevel3=10_1267_81`,
          )
        }
      >
        <Banner data={bannerData} className="py-6" />
      </div>
    </MainLayout>
  );
};

export default SupplementContainer;
