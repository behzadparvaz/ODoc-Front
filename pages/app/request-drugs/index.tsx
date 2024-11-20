import dynamic from 'next/dynamic';
const RequestDrugsContainer = dynamic(
  () => import('@containers/medicine/request-drugs/request-drugs'),
);

const RequestDrugsPage = () => {
  return <RequestDrugsContainer />;
};
export default RequestDrugsPage;
