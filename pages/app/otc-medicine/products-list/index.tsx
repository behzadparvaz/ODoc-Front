import dynamic from 'next/dynamic';

const ProductsListContainer = dynamic(
  () => import('@containers/medicine/otc/products-list'),
);

const ProductsListPage = () => {
  return <ProductsListContainer />;
};

export default ProductsListPage;
