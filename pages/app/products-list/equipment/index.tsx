import dynamic from 'next/dynamic';
const EquipmentProductsContainer = dynamic(
  () => import('@containers/products-list/equipment'),
);

const EquipmentProductsPage = () => {
  return <EquipmentProductsContainer />;
};

export default EquipmentProductsPage;
