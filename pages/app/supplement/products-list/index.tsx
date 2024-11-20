import dynamic from 'next/dynamic';
const ProductsListContainer = dynamic(
  () => import('@containers/supplement/products-list'),
);

const ProductsListPage = () => {
  return <ProductsListContainer />;
};

export default ProductsListPage;
