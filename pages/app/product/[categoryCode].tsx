import dynamic from 'next/dynamic';
const OtcProductContainer = dynamic(() =>
  import('@containers/medicine').then((mod) => mod.OtcProductContainer),
);
const OtcProductPage = () => {
  return <OtcProductContainer />;
};
export default OtcProductPage;
