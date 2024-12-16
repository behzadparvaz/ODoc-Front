import dynamic from 'next/dynamic';
const MotherKidProductsContainer = dynamic(
  () => import('@containers/products-list/mother-kid'),
);

const MotherKidProductsPage = () => {
  return <MotherKidProductsContainer />;
};

export default MotherKidProductsPage;
