import dynamic from 'next/dynamic';
const SupplementContainer = dynamic(
  () => import('@containers/supplement/supplement'),
);

const SuplementPage = () => {
  return <SupplementContainer />;
};

export default SuplementPage;
