import dynamic from 'next/dynamic';
const QuickOrderDetailContainer = dynamic(
  () => import('@containers/medicine/request-drugs/detail/[orderId]'),
);

const QuickOrderDetailPage = () => {
  return <QuickOrderDetailContainer />;
};
export default QuickOrderDetailPage;
