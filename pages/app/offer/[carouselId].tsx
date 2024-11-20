import dynamic from 'next/dynamic';
const ProductListContainer = dynamic(() => import('@containers/offer'));

const ProductListPage = () => {
  return <ProductListContainer />;
};

export default ProductListPage;
