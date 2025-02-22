import dynamic from 'next/dynamic';
const BasketSuccessContainer = dynamic(
  () => import('@containers/basket/success/[draftId]'),
  {
    ssr: false,
  },
);

const BasketSuccessPage = () => {
  return <BasketSuccessContainer />;
};
export default BasketSuccessPage;
