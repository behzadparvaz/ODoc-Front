import dynamic from 'next/dynamic';

const PrescriptionContainer = dynamic(
  () => import('@containers/medicine/prescription'),
);

const PrescriptionPage = () => {
  return <PrescriptionContainer />;
};
export default PrescriptionPage;
