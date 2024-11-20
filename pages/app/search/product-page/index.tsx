import dynamic from 'next/dynamic';

const ProductPageContainer = dynamic(
  () => import('@containers/search/product-page'),
);

const ProductPage = () => {
  return <ProductPageContainer />;
};

export default ProductPage;
