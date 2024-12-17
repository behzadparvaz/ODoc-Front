import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';

const Products = dynamic(() => import('./components/products'));

const ProductListContainer = () => {
  const { query } = useRouter();
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      title={query?.title}
      hasBackButton
      hasBasketIcon
    >
      <Products />
    </MainLayout>
  );
};

export default ProductListContainer;
