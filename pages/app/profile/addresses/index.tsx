import dynamic from 'next/dynamic';
const AddressesContainer = dynamic(() =>
  import('@containers/profile').then((mod) => mod.AddressesContainer),
);

const AddressesPage = () => {
  return <AddressesContainer />;
};
export default AddressesPage;
