import dynamic from 'next/dynamic';

const CanceledContainer = dynamic(
  () => import('@containers/basket/canceled/[draftId]'),
  {
    ssr: false,
  },
);
const Canceled = () => {
  return <CanceledContainer />;
};
export default Canceled;
