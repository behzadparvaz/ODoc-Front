import dynamic from 'next/dynamic';
const OrderHistoryContainer = dynamic(() =>
  import('@containers/order').then((mod) => mod.OrderHistoryContainer),
);

const OrderHistoryPage = () => {
  return <OrderHistoryContainer />;
};
export default OrderHistoryPage;
