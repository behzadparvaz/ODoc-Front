import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';
import { SearchIconOutline } from '@com/icons';
import { routeList } from '@routes/routeList';

const CategoryLevel3 = dynamic(() => import('./components/CategoryLevel3'));
const Products = dynamic(() => import('./components/Products'));
const Filter = dynamic(() => import('./components/Filter'));

const ProductsListContainer = () => {
  const { query, push } = useRouter();

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title={query?.categoryNameLevel2}
      hasBackButton
      backIconHandler={() => push(routeList.supplementPage)}
      hasBasketIcon
      leftSection={
        <span className="flex items-center justify-center">
          <SearchIconOutline width={24} height={24} fill={'black'} />
        </span>
      }
    >
      <div className="relative">
        <CategoryLevel3
          categoryCodeLevel2={query?.categoryCodeLevel2 as string}
        />

        <Filter />

        <Products />
      </div>
    </MainLayout>
  );
};

export default ProductsListContainer;
