import dynamic from 'next/dynamic';
const ConfirmRequestDrugsContainer = dynamic(
  () => import('@containers/medicine/request-drugs/confirm-request-drugs'),
);

const ConfirmRequestDrugsPage = () => {
  return <ConfirmRequestDrugsContainer />;
};
export default ConfirmRequestDrugsPage;
