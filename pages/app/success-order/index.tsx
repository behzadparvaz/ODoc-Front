import dynamic from 'next/dynamic';
const SuccessOrderContainer = dynamic(() =>
  import('@containers/order').then((mod) => mod.SuccessOrderContainer),
);

const SuccessOrderPage = () => {
  return <SuccessOrderContainer />;
};
export default SuccessOrderPage;
