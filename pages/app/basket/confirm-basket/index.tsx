import dynamic from 'next/dynamic';
const ConfirmBasketContainer = dynamic(
  () => import('@containers/basket/confirm-basket'),
);

const ConfirmBasketPage = () => {
  return <ConfirmBasketContainer />;
};
export default ConfirmBasketPage;
