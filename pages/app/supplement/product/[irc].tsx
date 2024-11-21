import dynamic from 'next/dynamic';
const SupplementProductContainer = dynamic(
  () => import('@containers/supplement/product/[irc]'),
);

const SupplementProductPage = () => {
  return <SupplementProductContainer />;
};
export default SupplementProductPage;
