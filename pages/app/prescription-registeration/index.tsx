import dynamic from 'next/dynamic';
const PrescriptionContainer = dynamic(() =>
  import('@containers/medicine').then((mod) => mod.PrescriptionContainer),
);

const PrescriptionPage = () => {
  return <PrescriptionContainer />;
};
export default PrescriptionPage;
