import dynamic from 'next/dynamic';
const QuickOrderSuccessContainer = dynamic(
  () => import('@containers/medicine/request-drugs/success/[orderId]'),
);

const QuickOrderSuccessPage = () => {
  return <QuickOrderSuccessContainer />;
};
export default QuickOrderSuccessPage;
