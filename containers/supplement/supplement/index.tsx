import dynamic from 'next/dynamic';
import { SearchIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';

const Categories = dynamic(() => import('@com/_molecules/Categories'));
const CategoryLevel1 = dynamic(() => import('./components/CategoryLevel1'));

const SupplementContainer = () => {
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title="مکمل"
      hasBackButton
      hasBasketIcon
      leftSection={
        <span className="flex items-center justify-center">
          <SearchIconOutline width={24} height={24} fill={'black'} />
        </span>
      }
    >
      <Categories />

      <CategoryLevel1 />
    </MainLayout>
  );
};

export default SupplementContainer;
