import dynamic from 'next/dynamic';
const OrderDetailsContainer = dynamic(() =>
  import('@containers/order').then((mod) => mod.OrderDetailsContainer),
);

const OrderDetailsPage = () => {
  return <OrderDetailsContainer />;
};

export default OrderDetailsPage;
