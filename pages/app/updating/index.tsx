import dynamic from 'next/dynamic';

const UpdatingContainer = dynamic(() => import('@containers/updating'));

const UpdatingPage = () => {
  return <UpdatingContainer />;
};

export default UpdatingPage;
