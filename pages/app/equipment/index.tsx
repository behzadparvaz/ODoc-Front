import dynamic from 'next/dynamic';
const EquipmentContainer = dynamic(() => import('@containers/equipment'));

const EquipmentPage = () => {
  return <EquipmentContainer />;
};
export default EquipmentPage;
