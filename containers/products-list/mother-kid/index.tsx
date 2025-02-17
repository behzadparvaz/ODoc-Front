import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { MainLayout } from '@com/Layout';
import { routeList } from '@routes/routeList';
import { SearchIconOutline } from '@com/icons';

const Products = dynamic(() => import('../components/Products'));
const FilterAndSort = dynamic(() => import('../components/FilterAndSort'));

const MotherKidProductsContainer = () => {
  const { query, push } = useRouter();

  return (
    <MainLayout
      headerType="withoutLogo"
      title="مادر و کودک"
      hasHeader
      hasBackButton
      backIconHandler={() => push(routeList?.homeRoute)}
      hasBasketIcon
      leftSection={
        <span
          className="flex items-center justify-center cursor-pointer"
          onClick={() =>
            push({
              pathname: routeList?.search,
              query: { ...query, section: 'mother-kid' },
            })
          }
        >
          <SearchIconOutline width={24} height={24} fill={'black'} />
        </span>
      }
    >
      <div className="sticky top-0 right-0 w-full bg-surface-primary z-50 p-4">
        <FilterAndSort />
      </div>

      <Products />
    </MainLayout>
  );
};

export default MotherKidProductsContainer;
