import dynamic from 'next/dynamic';
const NewAddressContainer = dynamic(() =>
  import('@containers/profile').then((mod) => mod.NewAddressContainer),
);

const NewAddressPage = () => {
  return <NewAddressContainer />;
};

export default NewAddressPage;
