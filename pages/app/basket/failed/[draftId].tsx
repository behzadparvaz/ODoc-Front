import dynamic from 'next/dynamic';

const FailedContainer = dynamic(
  () => import('@containers/basket/failed/[draftId]'),
  {
    ssr: false,
  },
);
const Failed = () => {
  return <FailedContainer />;
};
export default Failed;
