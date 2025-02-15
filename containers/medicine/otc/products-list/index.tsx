import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { routeList } from '@routes/routeList';
import { MainLayout } from '@com/Layout';
import { SearchIconOutline } from '@com/icons';

const Products = dynamic(() => import('./components/Products'));
const Categories = dynamic(() => import('./components/Categories'));

const ProductsListContainer = () => {
  const { push, query } = useRouter();

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title="داروی بدون نسخه"
      backIconHandler={() => push(routeList?.otcMedicine)}
      hasBackButton
      hasBasketIcon
      leftSection={
        <>
          <span
            className="flex items-center justify-center cursor-pointer"
            onClick={() =>
              push({
                pathname: routeList?.search,
                query: { section: 'otc-products', ...query },
              })
            }
          >
            <SearchIconOutline width={24} height={24} fill={'black'} />
          </span>
        </>
      }
    >
      <Categories />

      <Products />
    </MainLayout>
  );
};

export default ProductsListContainer;
