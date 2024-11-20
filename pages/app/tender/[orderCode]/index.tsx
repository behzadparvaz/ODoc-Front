import dynamic from 'next/dynamic';
const TenderContainer = dynamic(() =>
  import('@containers/order').then((mod) => mod.TenderContainer),
);

const TenderPage = () => {
  return <TenderContainer />;
};

export default TenderPage;
