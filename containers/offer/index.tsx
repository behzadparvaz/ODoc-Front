import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';
import { routeList } from '@routes/routeList';

const Products = dynamic(() => import('./components/products'));

const ProductListContainer = () => {
  const { query, push } = useRouter();
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title={query?.title}
      hasBackButton
      hasBasketIcon
      backIconHandler={() => push(routeList.homeRoute)}
    >
      <Products />
    </MainLayout>
  );
};

export default ProductListContainer;
