import dynamic from 'next/dynamic';

const EditAddressContainer = dynamic(
  () => import('@containers/profile/edit-address'),
);

const EditAddressPage = () => {
  return <EditAddressContainer />;
};

export default EditAddressPage;
