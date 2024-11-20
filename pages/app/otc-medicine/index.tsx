import dynamic from 'next/dynamic';
const OtcMedicineContainer = dynamic(() =>
  import('@containers/medicine').then((mod) => mod.OtcMedicineContainer),
);

const OtcMedicinePage = () => {
  return <OtcMedicineContainer />;
};

export default OtcMedicinePage;
